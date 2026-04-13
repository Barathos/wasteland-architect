import { useState } from "react";
import { SPECIAL_ATTRIBUTES, SKILLS, PERKS, calculateDerivedStats } from "../../lib/falloutData";

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

  const skills = parseJson(character.skills, {});
  const tagSkills = parseJson(character.tag_skills, []);
  const selectedPerks = parseJson(character.perks, []);
  const perkDetails = selectedPerks.map(pk => PERKS.find(p => p.key === pk)).filter(Boolean);

  return (
    <div style={{ background: '#0d2137', color: '#a8c8d8' }}>
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
                <h4 className="font-heading font-semibold text-sm" style={{ color: '#f5c518' }}>{perk.label}</h4>
                <p className="text-xs mt-0.5" style={{ color: '#6a8a9a' }}>{perk.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}