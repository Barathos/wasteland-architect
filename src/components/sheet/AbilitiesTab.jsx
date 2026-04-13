import { useState } from "react";
import { SPECIAL_ATTRIBUTES, SKILLS, PERKS, WANDERERS_PERKS, NCR_TRAITS, WANDERERS_TRIBAL_TRAITS, SURVIVOR_TRAITS, ORIGIN_TRAIT_SUMMARIES, calculateDerivedStats, isRobotCharacter } from "../../lib/falloutData";

const SPECIAL_KEY_MAP = { STR: 'strength', PER: 'perception', END: 'endurance', CHA: 'charisma', INT: 'intelligence', AGI: 'agility', LCK: 'luck' };
const ALL_PERKS = [
  ...PERKS,
  ...WANDERERS_PERKS.map(p => ({
    key: p.key, label: p.label, description: p.description, source: p.source, maxRanks: p.ranks, rank: 1,
    requirement: Object.fromEntries(Object.entries(p.requirements).map(([k, v]) => k === 'level' ? [k, v] : [SPECIAL_KEY_MAP[k] || k.toLowerCase(), v])),
  }))
];

function rollD20() { return Math.floor(Math.random() * 20) + 1; }

function InlineRollPanel({ skill, target, apCurrent, onSpendAP, onClose }) {
  const [rolls, setRolls] = useState([]);

  const doRoll = (extraDie) => {
    if (extraDie && apCurrent <= 0) return;
    const count = extraDie ? 3 : 2;
    setRolls(Array.from({ length: count }, rollD20));
    if (extraDie) onSpendAP();
  };

  const successes = rolls.filter(r => r <= target).length;

  return (
    <div className="mx-2 mb-1 p-3" style={{ background: '#060f1c', border: '1px solid #4a6a8a', borderTop: 'none' }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold tracking-wider" style={{ color: '#f5c518' }}>TN: {target}</span>
        <button onClick={onClose} className="text-[10px] font-mono px-2 py-0.5"
          style={{ color: '#4a6a8a', background: 'none', border: '1px solid #1e3a5f', cursor: 'pointer' }}>CLOSE</button>
      </div>
      <div className="flex gap-2 mb-3">
        <button onClick={() => doRoll(false)} className="flex-1 py-1.5 text-xs font-bold"
          style={{ background: '#0a1a2d', border: '1px solid #f5c518', color: '#f5c518', cursor: 'pointer' }}>
          ROLL 2d20
        </button>
        <button onClick={() => doRoll(true)} disabled={apCurrent <= 0} className="flex-1 py-1.5 text-xs font-bold"
          style={{
            background: apCurrent > 0 ? '#0a1525' : '#060f1c',
            border: `1px solid ${apCurrent > 0 ? '#4a6a8a' : '#1e3a5f'}`,
            color: apCurrent > 0 ? '#6a9aba' : '#2a4a6a',
            cursor: apCurrent > 0 ? 'pointer' : 'not-allowed',
          }}>
          +1d20 &mdash; 1 AP {apCurrent > 0 ? `(${apCurrent} left)` : '(none)'}
        </button>
      </div>
      {rolls.length > 0 && (
        <div>
          <div className="flex gap-2 mb-2 flex-wrap">
            {rolls.map((r, i) => {
              const hit = r <= target;
              return (
                <div key={i} className="w-12 h-12 flex items-center justify-center text-lg font-bold"
                  style={{ background: hit ? '#0a2a0a' : '#2a0a0a', border: `2px solid ${hit ? '#22cc22' : '#cc4444'}`, color: hit ? '#22cc22' : '#cc4444' }}>
                  {r}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: successes > 0 ? '#22cc22' : '#cc4444' }}>
              {successes > 0 ? `${successes} SUCCESS${successes > 1 ? 'ES' : ''}` : 'FAILURE'}
            </span>
            {rolls.some(r => r === 1) && <span className="text-[10px]" style={{ color: '#f5c518' }}>&#9889; CRIT!</span>}
            {rolls.some(r => r === 20) && <span className="text-[10px]" style={{ color: '#cc4444' }}>&#128128; COMPLICATION!</span>}
          </div>
        </div>
      )}
    </div>
  );
}

const STAT_COLORS = {
  strength:     { bar: '#cc4444', text: '#cc6666' },
  perception:   { bar: '#cc7722', text: '#dd8833' },
  endurance:    { bar: '#ccaa00', text: '#ddbb11' },
  charisma:     { bar: '#22aa22', text: '#33bb33' },
  intelligence: { bar: '#2244cc', text: '#4466dd' },
  agility:      { bar: '#4422cc', text: '#6644dd' },
  luck:         { bar: '#8822cc', text: '#aa44dd' },
};

function parseJson(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

export default function AbilitiesTab({ character, updateField }) {
  const [openSkill, setOpenSkill] = useState(null);

  const derived = calculateDerivedStats(character);
  const apMax = derived.action_points ?? 2;
  const apCurrent = character.action_points_current ?? apMax;
  const spendAP = () => updateField({ action_points_current: Math.max(0, apCurrent - 1) });

  const isRobot = isRobotCharacter(character);
  const skills = parseJson(character.skills, {});
  const tagSkills = parseJson(character.tag_skills, []);
  const selectedPerks = parseJson(character.perks, []);
  const perkDetails = selectedPerks.map(pk => ALL_PERKS.find(p => p.key === pk)).filter(Boolean);
  const selectedNcrTraitKeys = parseJson(character.ncr_traits, []);
  const ncrTraitDetails = selectedNcrTraitKeys.map(k => NCR_TRAITS.find(t => t.key === k)).filter(Boolean);

  // Wanderers Tribal traits
  const selectedTribalTraitKeys = parseJson(character.tribal_traits, []).filter(k => k !== '_perk_slot_');
  const tribalTraitDetails = selectedTribalTraitKeys.map(k => {
    const fromTribal = WANDERERS_TRIBAL_TRAITS.find(t => t.key === k);
    const fromNcr = NCR_TRAITS.find(t => t.key === k);
    return fromTribal || fromNcr;
  }).filter(Boolean);
  const allOriginTraits = [...ncrTraitDetails, ...tribalTraitDetails];

  return (
    <div style={{ background: '#0d2137', color: '#a8c8d8' }}>
      {isRobot && (
        <div className="px-4 py-2" style={{ background: '#1a0d2d', borderBottom: '2px solid #cc7722' }}>
          <p className="text-xs font-bold font-mono" style={{ color: '#f5a818' }}>
            ⚙ ROBOT CHARACTER — Immune to radiation, poison, and disease. Cannot use chems, food, drink, or rest. Must receive repairs to heal.
          </p>
        </div>
      )}
      <div className="flex flex-wrap">

        {/* SPECIAL */}
        <div style={{ width: '260px', flexShrink: 0, borderRight: '1px solid #1e3a5f' }}>
          <div className="px-3 py-2" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
            <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>S.P.E.C.I.A.L.</p>
          </div>
          <div className="p-3 space-y-3">
            {SPECIAL_ATTRIBUTES.map(attr => {
              const value = character[attr.key] || 5;
              const colors = STAT_COLORS[attr.key];
              const pct = ((value - 4) / 8) * 100;
              return (
                <div key={attr.key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold" style={{ color: colors.text }}>{attr.abbr}</span>
                      <span className="font-heading text-sm" style={{ color: '#c8dde8' }}>{attr.label}</span>
                    </div>
                    <span className="font-heading font-bold text-lg" style={{ color: '#e8e8e8' }}>{value}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: '#0a1a2d' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: colors.bar }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills */}
        <div className="flex-1" style={{ borderRight: '1px solid #1e3a5f', minWidth: '240px' }}>
          <div className="px-3 py-2" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>SKILLS</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono" style={{ color: '#6a9aba' }}>&#9889; {apCurrent} AP</span>
                <p className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>click to roll</p>
              </div>
            </div>
          </div>
          <div className="p-2">
            {SKILLS.map(skill => {
              const value = skills[skill.key] || 0;
              const isTag = tagSkills.includes(skill.key);
              const attrVal = character[skill.attribute] || 5;
              const target = value + attrVal + (isTag ? 2 : 0);
              const attrAttr = SPECIAL_ATTRIBUTES.find(a => a.key === skill.attribute);
              const isOpen = openSkill === skill.key;

              return (
                <div key={skill.key}>
                  <div
                    onClick={() => setOpenSkill(isOpen ? null : skill.key)}
                    className="flex items-center justify-between py-1.5 px-2 rounded cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      background: isOpen ? '#0a1525' : isTag ? 'rgba(245,197,24,0.05)' : 'transparent',
                      borderBottom: isOpen ? 'none' : '1px solid #091525',
                      border: isOpen ? '1px solid #4a6a8a' : undefined,
                      borderBottomLeftRadius: isOpen ? 0 : undefined,
                      borderBottomRightRadius: isOpen ? 0 : undefined,
                    }}>
                    <div className="flex items-center gap-2">
                      {isTag && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#f5c518' }} />}
                      <span className="font-heading text-sm" style={{ color: '#c8dde8' }}>{skill.label}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>
                        {attrAttr?.abbr} {attrVal}+{value}{isTag ? '+2' : ''}
                      </span>
                      <span className="font-heading font-bold text-sm w-6 text-right" style={{ color: isTag ? '#f5c518' : '#e8e8e8' }}>
                        {target}
                      </span>
                      <span className="text-[10px]" style={{ color: '#4a6a8a' }}>{isOpen ? '▲' : '⚄'}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <InlineRollPanel
                      skill={skill}
                      target={target}
                      apCurrent={apCurrent}
                      onSpendAP={spendAP}
                      onClose={() => setOpenSkill(null)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Origin Trait */}
        {ORIGIN_TRAIT_SUMMARIES[character.origin] && (
          <div style={{ width: '240px', flexShrink: 0, borderRight: '1px solid #1e3a5f' }}>
            <div className="px-3 py-2" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
              <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>ORIGIN TRAIT</p>
            </div>
            <div className="p-3">
              {(() => {
                const t = ORIGIN_TRAIT_SUMMARIES[character.origin];
                return (
                  <div className="p-2.5 rounded mb-2" style={{ background: '#0a1a2d', border: `1px solid ${t.color}44` }}>
                    <h4 className="font-heading font-semibold text-sm mb-1.5" style={{ color: t.color }}>{t.name}</h4>
                    {(t.benefits || []).map((b, i) => <p key={i} className="text-[10px] font-mono mb-1" style={{ color: '#4ade80' }}>✦ {b}</p>)}
                    {(t.penalties || []).map((p, i) => <p key={i} className="text-[10px] font-mono mb-1" style={{ color: '#f97316' }}>✦ {p}</p>)}
                    {(t.notes || []).map((n, i) => <p key={i} className="text-[10px] font-mono mt-1 italic" style={{ color: '#6a8a9a' }}>{n}</p>)}
                  </div>
                );
              })()}
              {/* Survivor selected traits */}
              {character.origin === 'Survivor' && (() => {
                const keys = (() => { try { return JSON.parse(character.survivor_traits || '[]'); } catch { return []; } })();
                return keys.filter(k => k !== '_perk_slot_').map(k => {
                  const tr = SURVIVOR_TRAITS.find(t => t.key === k);
                  if (!tr) return null;
                  return (
                    <div key={k} className="p-2 rounded mb-1" style={{ background: '#0a1a2d', border: '1px solid #1e3a5f' }}>
                      <p className="text-[10px] font-bold" style={{ color: '#6a9aba' }}>{tr.label}</p>
                      <p className="text-[10px] font-mono" style={{ color: '#4ade80' }}>✦ {tr.benefit}</p>
                      <p className="text-[10px] font-mono" style={{ color: '#f97316' }}>✦ {tr.penalty}</p>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {/* Chosen Origin Traits (NCR / Tribal) */}
        {allOriginTraits.length > 0 && (
          <div style={{ width: '240px', flexShrink: 0, borderRight: '1px solid #1e3a5f' }}>
            <div className="px-3 py-2" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
              <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>CHOSEN TRAITS</p>
            </div>
            <div className="p-3 space-y-3">
              {allOriginTraits.map(trait => (
                <div key={trait.key} className="p-2.5 rounded" style={{ background: '#0a1a2d', border: '1px solid #1e3a5f' }}>
                  <h4 className="font-heading font-semibold text-sm mb-1" style={{ color: '#f5c518' }}>{trait.label}</h4>
                  <p className="text-[10px] font-mono mb-1" style={{ color: '#4ade80' }}>✦ {trait.benefit}</p>
                  <p className="text-[10px] font-mono" style={{ color: '#f97316' }}>✦ {trait.penalty}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perks */}
        <div style={{ width: '240px', flexShrink: 0 }}>
          <div className="px-3 py-2" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
            <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>PERKS ({perkDetails.length})</p>
          </div>
          <div className="p-3 space-y-2">
            {perkDetails.length === 0 ? (
              <p className="text-xs font-mono" style={{ color: '#4a6a8a' }}>No perks selected.</p>
            ) : perkDetails.map(perk => (
              <div key={perk.key} className="p-2.5 rounded" style={{ background: '#0a1a2d', border: '1px solid #1e3a5f' }}>
                <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                  <h4 className="font-heading font-semibold text-sm" style={{ color: '#f5c518' }}>{perk.label}</h4>
                  {perk.source === 'Wanderers' && (
                    <span className="text-[9px] font-mono px-1 py-0.5" style={{ background: 'rgba(180,120,255,0.12)', color: '#aa66ff', border: '1px solid rgba(170,102,255,0.35)' }}>Wanderers</span>
                  )}
                  {perk.source === 'Settlers' && (
                    <span className="text-[9px] font-mono px-1 py-0.5" style={{ background: 'rgba(168,200,216,0.1)', color: '#6a9aba', border: '1px solid rgba(106,154,186,0.3)' }}>Settlers</span>
                  )}
                </div>
                <p className="text-xs mt-0.5" style={{ color: '#6a8a9a' }}>{perk.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}