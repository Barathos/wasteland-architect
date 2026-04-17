import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import {
  SKILLS,
  TAG_SKILL_BONUS,
  getMergedTagSkills,
  getNextLevelXP,
  getSkillRankCapForCharacter,
} from "../../lib/falloutData";
import { CORE_PERKS } from "../../lib/sourceTruthData";
import {
  evaluatePerkEligibility,
  getSelectedPerkRank,
  normalizePerkRequirements,
} from "../../lib/perkEligibility";

function parseJson(str, fallback) {
  try { return JSON.parse(str || ""); } catch { return fallback; }
}

function normalizePerk(perk) {
  return {
    key: perk.key,
    label: perk.label,
    source: perk.source || "Core",
    description: perk.description || "",
    requirements: normalizePerkRequirements(perk.requirements || {}),
    requirementFlags: perk.requirementFlags || {},
    maxRanks: Number(perk.ranks || perk.maxRanks || 1),
  };
}

const ALL_PERKS = CORE_PERKS.map(normalizePerk);

export default function LevelUpPanel({ character, onApply, onClose }) {
  const level = Number(character.level || 1);
  const nextLevel = level + 1;
  const xp = Number(character.xp || 0);
  const xpCost = getNextLevelXP(level);
  const canLevelUp = xp >= xpCost && level < 50;
  const baselineSkills = useMemo(() => parseJson(character.skills, {}), [character.skills]);
  const [skills, setSkills] = useState({ ...baselineSkills });
  const [chosenPerk, setChosenPerk] = useState("");
  const [saving, setSaving] = useState(false);

  const tagSkills = parseJson(character.tag_skills, []);
  const allTags = getMergedTagSkills(character, tagSkills);
  const baselinePerks = parseJson(character.perks, []);
  const readMagazines = parseJson(character.read_magazines, []);

  const spentSkillPoints = SKILLS.reduce((sum, skill) => {
    const key = skill.key;
    const base = Math.max(0, Number(baselineSkills[key] || 0));
    const current = Math.max(0, Number(skills[key] || 0));
    return sum + Math.max(0, current - base);
  }, 0);
  const remainingSkillPoints = Math.max(0, 1 - spentSkillPoints);

  const changeSkill = (key, delta) => {
    const current = Number(skills[key] || 0);
    const base = Number(baselineSkills[key] || 0);
    const isTagged = allTags.includes(key);
    const absMax = Number(getSkillRankCapForCharacter(character, key) || 0);
    const maxBase = Math.max(0, absMax - (isTagged ? TAG_SKILL_BONUS : 0));

    const next = current + delta;
    if (next < base) return;
    if (delta > 0 && remainingSkillPoints <= 0) return;
    if (next > maxBase) return;
    setSkills((prev) => ({ ...prev, [key]: next }));
  };

  const perkRows = useMemo(() => {
    return ALL_PERKS.map((perk) => {
      const currentRank = getSelectedPerkRank(baselinePerks, perk.key);
      const eligibility = evaluatePerkEligibility({
        perk: {
          key: perk.key,
          ranks: perk.maxRanks,
          maxRanks: perk.maxRanks,
          requirements: perk.requirements,
          requirementFlags: perk.requirementFlags,
        },
        character,
        selectedPerks: baselinePerks,
        readMagazines,
        currentLevel: nextLevel,
      });
      const maxed = currentRank >= perk.maxRanks;
      return {
        ...perk,
        currentRank,
        maxed,
        available: eligibility.eligible && !maxed,
        levelRequired: eligibility.levelRequired,
        missing: eligibility.missing || [],
      };
    });
  }, [baselinePerks, character, nextLevel, readMagazines]);

  const applyLevelUp = async () => {
    if (!canLevelUp) {
      toast.error(`You need ${Math.max(0, xpCost - xp)} more XP to level up.`);
      return;
    }
    if (remainingSkillPoints > 0) {
      toast.error("Spend your 1 skill point before applying level up.");
      return;
    }
    if (!chosenPerk) {
      toast.error("Choose one perk rank for this level.");
      return;
    }

    const hpMax = Number(character.hp_max || 0);
    const hpCurrent = Number(character.hp_current ?? hpMax);
    const nextPerks = [...baselinePerks, chosenPerk];
    const updates = {
      level: nextLevel,
      xp: Math.max(0, xp - xpCost),
      hp_max: hpMax + 1,
      hp_current: Math.min(hpMax + 1, hpCurrent + 1),
      skills: JSON.stringify(skills),
      perks: JSON.stringify(nextPerks),
    };

    setSaving(true);
    try {
      const ok = await onApply?.(updates);
      if (ok === false) return;
      toast.success("Level up applied.");
      onClose?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" style={{ background: "rgba(2,8,15,0.8)" }}>
      <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden" style={{ background: "#0d2137", border: "1px solid #1e3a5f" }}>
        <div className="flex items-center justify-between px-4 py-3" style={{ background: "#06111f", borderBottom: "1px solid #1e3a5f" }}>
          <div>
            <h3 className="font-heading font-bold text-lg" style={{ color: "#f5c518" }}>Level Up</h3>
            <p className="text-[11px] font-mono" style={{ color: "#6a8a9a" }}>
              Level {level} → {nextLevel} | Spend XP: {xpCost.toLocaleString()} | Gain: +1 HP, +1 skill point, +1 perk rank
            </p>
          </div>
          <button onClick={onClose} className="p-1.5" style={{ color: "#6a8a9a", border: "1px solid #1e3a5f", background: "#0a1525" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="p-4" style={{ borderRight: "1px solid #1e3a5f" }}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold tracking-widest" style={{ color: "#f5c518" }}>SKILLS (+1)</p>
              <p className="text-xs font-mono" style={{ color: remainingSkillPoints > 0 ? "#f5c518" : "#22cc22" }}>
                Remaining: {remainingSkillPoints}
              </p>
            </div>
            <div className="max-h-[56vh] overflow-y-auto space-y-1.5 pr-1">
              {SKILLS.map((skill) => {
                const key = skill.key;
                const base = Number(baselineSkills[key] || 0);
                const current = Number(skills[key] || 0);
                const isTagged = allTags.includes(key);
                const absMax = Number(getSkillRankCapForCharacter(character, key) || 0);
                const maxBase = Math.max(0, absMax - (isTagged ? TAG_SKILL_BONUS : 0));
                return (
                  <div key={key} className="flex items-center justify-between px-2.5 py-2 rounded" style={{ background: "#0a1525", border: "1px solid #1e3a5f" }}>
                    <div>
                      <p className="text-sm font-heading" style={{ color: "#e8e8e8" }}>{skill.label}</p>
                      <p className="text-[10px] font-mono" style={{ color: "#6a8a9a" }}>
                        {base} → {current}{isTagged ? ` (+${TAG_SKILL_BONUS} tag)` : ""} | max base {maxBase}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => changeSkill(key, -1)}
                        disabled={current <= base}
                        className="w-6 h-6 text-xs font-bold"
                        style={{ background: "#060f1c", border: "1px solid #1e3a5f", color: current > base ? "#a8c8d8" : "#2a4a6a" }}
                      >-</button>
                      <span className="w-7 text-center font-heading font-bold" style={{ color: "#f5c518" }}>{current}</span>
                      <button
                        onClick={() => changeSkill(key, 1)}
                        disabled={remainingSkillPoints <= 0 || current >= maxBase}
                        className="w-6 h-6 text-xs font-bold"
                        style={{ background: "#060f1c", border: "1px solid #1e3a5f", color: (remainingSkillPoints > 0 && current < maxBase) ? "#22cc22" : "#2a4a6a" }}
                      >+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold tracking-widest" style={{ color: "#f5c518" }}>PERKS (+1 RANK)</p>
              <p className="text-xs font-mono" style={{ color: chosenPerk ? "#22cc22" : "#f5c518" }}>
                {chosenPerk ? "Selected" : "Choose 1"}
              </p>
            </div>
            <div className="max-h-[56vh] overflow-y-auto space-y-1.5 pr-1">
              {perkRows.map((perk) => {
                const selected = chosenPerk === perk.key;
                return (
                  <button
                    key={perk.key}
                    disabled={!perk.available && !selected}
                    onClick={() => setChosenPerk(selected ? "" : perk.key)}
                    className="w-full text-left p-2.5 rounded"
                    style={{
                      background: selected ? "rgba(34,204,34,0.1)" : "#0a1525",
                      border: `1px solid ${selected ? "rgba(34,204,34,0.4)" : "#1e3a5f"}`,
                      opacity: (!perk.available && !selected) ? 0.5 : 1,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-heading" style={{ color: selected ? "#22cc22" : "#e8e8e8" }}>{perk.label}</p>
                      <span className="text-[10px] font-mono px-1.5 py-0.5" style={{ color: "#f5c518", border: "1px solid rgba(245,197,24,0.3)", background: "rgba(245,197,24,0.08)" }}>
                        {perk.currentRank}/{perk.maxRanks}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono mt-1" style={{ color: "#6a8a9a" }}>
                      {perk.source} • Next rank req level {perk.levelRequired}+
                    </p>
                    {!perk.available && perk.missing.length > 0 && (
                      <p className="text-[10px] font-mono mt-1" style={{ color: "#cc4444" }}>
                        Locked: {perk.missing.map((m) => m.type).join(", ")}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: "1px solid #1e3a5f", background: "#06111f" }}>
          <p className="text-xs font-mono" style={{ color: canLevelUp ? "#6a8a9a" : "#cc4444" }}>
            {canLevelUp ? `Ready to apply level ${nextLevel}.` : `Need ${Math.max(0, xpCost - xp)} more XP to level up.`}
          </p>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-3 py-1.5 text-xs font-bold" style={{ background: "#0a1525", border: "1px solid #1e3a5f", color: "#6a8a9a" }}>
              Cancel
            </button>
            <button
              onClick={applyLevelUp}
              disabled={saving || !canLevelUp}
              className="px-3 py-1.5 text-xs font-bold"
              style={{
                background: (saving || !canLevelUp) ? "#0a1525" : "#0a2a0a",
                border: `1px solid ${(saving || !canLevelUp) ? "#1e3a5f" : "#22cc22"}`,
                color: (saving || !canLevelUp) ? "#4a6a8a" : "#22cc22",
              }}
            >
              {saving ? "Applying..." : "Apply Level Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

