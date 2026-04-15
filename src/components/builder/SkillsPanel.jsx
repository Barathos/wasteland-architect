import { SKILLS, TAG_SKILL_COUNT, SPECIAL_ATTRIBUTES, getActiveTraitEffects, getEffectiveSkillRank, getSkillRankCapForCharacter, isNightkinCharacter, TAG_SKILL_BONUS } from "../../lib/falloutData";
import { Minus, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOOD_NATURED_EXEMPT = ['speech', 'medicine', 'repair', 'science', 'barter'];
const CREATION_MAX_RANK = 3;

export default function SkillsPanel({ character, skills, tagSkills, onSkillsChange, onTagSkillsChange, ncrTraits, outcastTagSkill }) {
  const traits = getActiveTraitEffects(character);
  const hasGoodNatured = traits.hasGoodNatured || (ncrTraits || []).includes('good_natured');
  const isNightkin = isNightkinCharacter(character);
  const isSuperMutant = character.origin === 'Super Mutant' && !isNightkin;

  const totalSkillPoints = 9 + (character.intelligence || 5);
  const usedPoints = Object.values(skills).reduce((sum, v) => sum + v, 0);
  const remaining = totalSkillPoints - usedPoints;
  const level = Number(character.level || 1);
  const isCreationCapped = level < 3;

  // Tag limit: base 3 + educated + vault/bos/outcast origin bonuses
  const tagLimit = TAG_SKILL_COUNT + traits.extraTagSkills;
  const tagCount = tagSkills.length;

  const getAbsoluteMaxRank = (key) => getSkillRankCapForCharacter(character, key);

  const handleSkillChange = (key, delta) => {
    const current = skills[key] || 0;
    const newVal = current + delta;
    const isTagged = tagSkills.includes(key);
    const absMax = getAbsoluteMaxRank(key);
    const nextEffective = getEffectiveSkillRank(newVal, isTagged, absMax);
    // Core rules: during character creation, cannot increase any skill above rank 3 (unless starting level 3+).
    if (delta > 0 && isCreationCapped && nextEffective > CREATION_MAX_RANK) return;
    if (delta > 0 && nextEffective > absMax) return;
    if (newVal < 0) return;
    if (delta > 0 && remaining <= 0) return;
    onSkillsChange({ ...skills, [key]: newVal });
  };

  const toggleTagSkill = (key) => {
    if (tagSkills.includes(key)) {
      onTagSkillsChange(tagSkills.filter(s => s !== key));
    } else if (tagCount < tagLimit) {
      const absMax = getAbsoluteMaxRank(key);
      const current = Number(skills[key] || 0);
      const maxBaseWithTag = Math.max(0, absMax - TAG_SKILL_BONUS);
      if (current > maxBaseWithTag) {
        onSkillsChange({ ...skills, [key]: maxBaseWithTag });
      }
      onTagSkillsChange([...tagSkills, key]);
    }
  };

  const getAttributeValue = (attrKey) => character[attrKey] || 5;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Skill Points</span>
            <span className={`font-heading font-bold text-lg ${remaining > 0 ? 'text-primary' : 'text-secondary'}`}>
              {remaining}
            </span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Tag Skills</span>
            <span className={`font-heading font-bold text-lg ${tagCount < tagLimit ? 'text-primary' : 'text-secondary'}`}>
              {tagCount}/{tagLimit}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground font-mono">
        Tag {tagLimit} skills for bonus expertise. During character creation (Level 1-2), no skill can exceed <strong>rank 3</strong>; starting at Level 3+, skills can increase normally up to their caps.
        {isNightkin && <span className="block mt-1" style={{ color: '#aa44dd' }}>⚠ Nightkin: All skills capped at rank 4.</span>}
        {isSuperMutant && <span className="block mt-1" style={{ color: '#cc4444' }}>⚠ Super Mutant: All skills capped at rank 4 (Forced Evolution).</span>}
        {traits.extraTagSkills > 0 && <span className="block mt-1" style={{ color: '#22cc22' }}>✦ +{traits.extraTagSkills} extra Tag skill(s) from trait/origin.</span>}
        {(() => { try { return JSON.parse(character.survivor_traits || '[]'); } catch { return []; } })().includes('educated') && (
          <span className="block mt-0.5" style={{ color: '#aaa', fontSize: 11 }}>+1 from Educated trait</span>
        )}
      </p>

      {/* Skills Grid */}
      <div className="space-y-2">
        {SKILLS.map((skill) => {
          const value = skills[skill.key] || 0;
          const absMax = getAbsoluteMaxRank(skill.key);
          const isGoodNaturedCapped = hasGoodNatured && !GOOD_NATURED_EXEMPT.includes(skill.key);
          const isTag = tagSkills.includes(skill.key);
          const attrAttr = SPECIAL_ATTRIBUTES.find(a => a.key === skill.attribute);
          const attrVal = getAttributeValue(skill.attribute);
          const effectiveRank = getEffectiveSkillRank(value, isTag, absMax);
          const targetNumber = attrVal + effectiveRank;

          const atCreationCap = isCreationCapped && effectiveRank >= CREATION_MAX_RANK;
          const canIncrease = remaining > 0
            && getEffectiveSkillRank(value + 1, isTag, absMax) <= absMax
            && (!isCreationCapped || getEffectiveSkillRank(value + 1, isTag, absMax) <= CREATION_MAX_RANK);
          const canDecrease = value > 0;

          return (
            <div
              key={skill.key}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                isTag ? "border-primary/40 bg-primary/5" : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <button
                  onClick={() => toggleTagSkill(skill.key)}
                  className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                    isTag
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground border border-border"
                  }`}
                  title={isTag ? "Remove tag" : "Set as tag skill"}
                >
                  <Tag className="w-3 h-3" />
                </button>
                <div className="min-w-0">
                  <span className="font-heading text-sm text-foreground block truncate">
                    {skill.label}
                    {isGoodNaturedCapped && <span className="ml-1 text-[9px] font-mono px-1 rounded" style={{ color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)' }}>MAX 4</span>}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {attrAttr?.abbr} {attrVal} + {effectiveRank}{isTag ? ` (${value}+${TAG_SKILL_BONUS} tag)` : ""} = <span className="text-secondary font-bold">{targetNumber}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 rounded hover:bg-destructive/20 hover:text-destructive"
                  onClick={() => handleSkillChange(skill.key, -1)}
                  disabled={!canDecrease}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="font-heading font-bold text-sm w-6 text-center">{effectiveRank}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 rounded hover:bg-primary/20 hover:text-primary"
                  onClick={() => handleSkillChange(skill.key, 1)}
                  disabled={!canIncrease}
                  title={atCreationCap ? "Character creation cap: skill rank 3 max (Level 1-2)" : undefined}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
