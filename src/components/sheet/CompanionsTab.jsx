import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const COMPANION_RANKS = [
  { rank: 0, label: 'Hostile', effect: 'Leaves and actively works against you.' },
  { rank: 1, label: 'Cautious', effect: 'Wary and may refuse commands.' },
  { rank: 2, label: 'Neutral', effect: 'Default starting relationship.' },
  { rank: 3, label: 'Friendly', effect: 'Shares supplies and proactively helps.' },
  { rank: 4, label: 'Trusting', effect: 'Will not disobey, can be talked around.' },
  { rank: 5, label: 'Allied', effect: 'CHA+Speech tests assisted by companion: difficulty -1.' },
];

const INJURY_STATES = ['empty', 'healthy', 'treated', 'injured'];
const INJURY_COLORS = { empty: '#1e3a5f', healthy: '#22cc22', treated: '#f5c518', injured: '#cc4444' };

const SPECIAL_KEYS = ['str','per','end','cha','int','agi','lck'];
const SPECIAL_LABELS = ['S','P','E','C','I','A','L'];

const TYPES = ['Humanoid', 'Creature', 'Robot'];

function rankColor(rank) {
  if (rank === 0) return '#cc4444';
  if (rank === 1) return '#cc7722';
  if (rank === 2) return '#ccaa00';
  return '#22cc22';
}

function makeCompanion(type = 'Humanoid') {
  return {
    name: '',
    type,
    str: 5, per: 5, end: 5, cha: 5, int: 5, agi: 5, lck: 5,
    skills: '',
    hp_current: 10,
    hp_max: 10,
    perks: '',
    relationship: 2,
    injuries: ['empty','empty','empty','empty','empty'],
    notes: '',
  };
}

function parse(str, fb) { try { return JSON.parse(str || ''); } catch { return fb; } }

function PipRow({ rank, onChange }) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onChange(Math.max(0, rank - 1))}
        style={{ color: '#4a6a8a', background: 'none', border: '1px solid #1e3a5f', cursor: 'pointer', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Minus size={8} />
      </button>
      {[0,1,2,3,4,5].map(i => (
        <button key={i} onClick={() => onChange(i)}
          style={{
            width: 14, height: 14, borderRadius: 2, cursor: 'pointer',
            background: i <= rank ? rankColor(rank) : '#0a1a2d',
            border: `1px solid ${i <= rank ? rankColor(rank) : '#1e3a5f'}`,
          }}
        />
      ))}
      <button onClick={() => onChange(Math.min(5, rank + 1))}
        style={{ color: '#4a6a8a', background: 'none', border: '1px solid #1e3a5f', cursor: 'pointer', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Plus size={8} />
      </button>
    </div>
  );
}

function CompanionCard({ companion, characterLevel, onChange, onRemove }) {
  const isRobot = companion.type === 'Robot';
  const rankInfo = COMPANION_RANKS[companion.relationship ?? 2];
  const color = rankColor(companion.relationship ?? 2);

  const cycleInjury = (idx) => {
    const injuries = [...(companion.injuries || ['empty','empty','empty','empty','empty'])];
    const current = injuries[idx] || 'empty';
    const next = INJURY_STATES[(INJURY_STATES.indexOf(current) + 1) % INJURY_STATES.length];
    injuries[idx] = next;
    onChange({ ...companion, injuries });
  };

  const field = (label, children) => (
    <div>
      <p className="text-[9px] font-mono font-bold mb-1 tracking-wider" style={{ color: '#4a6a8a' }}>{label}</p>
      {children}
    </div>
  );

  const numBtn = (val, onVal, color2 = '#1e3a5f', textColor = '#e8e8e8') => (
    <input type="number" value={val}
      onChange={e => onVal(parseInt(e.target.value) || 0)}
      style={{ width: 44, background: '#060f1c', border: `1px solid ${color2}`, color: textColor, outline: 'none', padding: '3px 4px', fontSize: '12px', textAlign: 'center' }}
    />
  );

  return (
    <div style={{ background: '#0a1525', border: '1px solid #1e3a5f', padding: 12, marginBottom: 8 }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3" style={{ borderBottom: '1px solid #1e3a5f', paddingBottom: 8 }}>
        <input value={companion.name || ''} onChange={e => onChange({ ...companion, name: e.target.value })}
          placeholder="Companion name..."
          className="flex-1 font-heading font-bold text-sm"
          style={{ background: 'none', border: 'none', color: '#f5c518', outline: 'none' }} />
        <select value={companion.type || 'Humanoid'} onChange={e => onChange({ ...companion, type: e.target.value })}
          style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none', fontSize: 10, padding: '2px 4px' }}>
          {TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <button onClick={onRemove}
          style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 'bold' }}>✕</button>
      </div>

      <div className="space-y-3">
        {/* Level + HP */}
        <div className="flex gap-4 flex-wrap items-start">
          {field('LEVEL',
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg" style={{ color: '#e8e8e8' }}>{characterLevel}</span>
              <span className="text-[9px] font-mono" style={{ color: '#4a6a8a' }}>matches your level</span>
            </div>
          )}
          {field(isRobot ? 'STRUCTURAL INTEGRITY' : 'HIT POINTS',
            <div className="flex items-center gap-1">
              <button onClick={() => onChange({ ...companion, hp_current: Math.max(0, (companion.hp_current || 0) - 1) })}
                style={{ color: '#cc4444', background: 'none', border: '1px solid #cc4444', cursor: 'pointer', width: 18, height: 18, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              {numBtn(companion.hp_current || 0, v => onChange({ ...companion, hp_current: v }), '#22aa22', '#22cc22')}
              <span style={{ color: '#4a6a8a' }}>/</span>
              {numBtn(companion.hp_max || 10, v => onChange({ ...companion, hp_max: v }))}
              <button onClick={() => onChange({ ...companion, hp_current: Math.min(companion.hp_max || 10, (companion.hp_current || 0) + 1) })}
                style={{ color: '#22cc22', background: 'none', border: '1px solid #22aa22', cursor: 'pointer', width: 18, height: 18, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              {isRobot && <span className="text-[9px] font-mono ml-1" style={{ color: '#4a6a8a' }}>repair to restore</span>}
            </div>
          )}
        </div>

        {/* SPECIAL */}
        {field('S.P.E.C.I.A.L.',
          <div className="flex gap-2 flex-wrap">
            {SPECIAL_KEYS.map((k, idx) => (
              <div key={k} className="flex flex-col items-center gap-0.5">
                <span className="text-[9px] font-bold font-mono" style={{ color: '#6a9aba' }}>{SPECIAL_LABELS[idx]}</span>
                <div className="flex flex-col items-center">
                  <button onClick={() => onChange({ ...companion, [k]: Math.min(12, (companion[k] || 5) + 1) })}
                    style={{ color: '#4a6a8a', background: 'none', border: 'none', cursor: 'pointer', fontSize: 9, lineHeight: 1 }}>▲</button>
                  <span className="font-heading font-bold text-sm w-6 text-center" style={{ color: '#e8e8e8' }}>{companion[k] || 5}</span>
                  <button onClick={() => onChange({ ...companion, [k]: Math.max(1, (companion[k] || 5) - 1) })}
                    style={{ color: '#4a6a8a', background: 'none', border: 'none', cursor: 'pointer', fontSize: 9, lineHeight: 1 }}>▼</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {field('KEY SKILLS',
          <input value={companion.skills || ''} onChange={e => onChange({ ...companion, skills: e.target.value })}
            placeholder="e.g. Small Guns 3, Speech 2, Survival 4"
            style={{ width: '100%', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: 11 }} />
        )}

        {/* Perks */}
        {field('COMPANION PERKS',
          <textarea value={companion.perks || ''} onChange={e => onChange({ ...companion, perks: e.target.value })}
            placeholder="List perks, abilities, special traits..."
            rows={2}
            style={{ width: '100%', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '4px 6px', fontSize: 11, resize: 'vertical' }} />
        )}

        {/* Relationship */}
        {field('RELATIONSHIP',
          <div className="space-y-1">
            <PipRow rank={companion.relationship ?? 2} onChange={r => onChange({ ...companion, relationship: r })} />
            <div className="flex items-center gap-2">
              <span className="text-xs font-heading font-bold" style={{ color }}>{rankInfo.label}</span>
              <span className="text-[10px] font-mono" style={{ color: '#6a8a9a' }}>— {rankInfo.effect}</span>
            </div>
          </div>
        )}

        {/* Injuries */}
        {field('INJURIES',
          <div className="flex gap-1.5">
            {(companion.injuries || ['empty','empty','empty','empty','empty']).map((state, idx) => (
              <button key={idx} onClick={() => cycleInjury(idx)}
                title={state}
                style={{
                  width: 22, height: 22, borderRadius: 2, cursor: 'pointer',
                  background: state === 'empty' ? 'transparent' : INJURY_COLORS[state],
                  border: `2px solid ${INJURY_COLORS[state] || '#1e3a5f'}`,
                }} />
            ))}
            <span className="text-[9px] font-mono self-center ml-1" style={{ color: '#4a6a8a' }}>click to cycle</span>
          </div>
        )}

        {/* Notes */}
        {field('SESSION NOTES',
          <textarea value={companion.notes || ''} onChange={e => onChange({ ...companion, notes: e.target.value })}
            placeholder="Notes about this companion..."
            rows={2}
            style={{ width: '100%', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '4px 6px', fontSize: 11, resize: 'vertical' }} />
        )}
      </div>
    </div>
  );
}

function EmptySlot({ label, onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 mb-3"
      style={{ border: '1px dashed #1e3a5f', background: '#060f1c' }}>
      <p className="text-[10px] font-mono mb-2" style={{ color: '#4a6a8a' }}>{label}</p>
      <button onClick={onAdd} className="text-xs font-bold px-4 py-1.5"
        style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>
        + ADD COMPANION
      </button>
    </div>
  );
}

export default function CompanionsTab({ character, updateField }) {
  const [companions, setCompanions] = useState(() => parse(character.companions, []));

  const save = (updated) => {
    setCompanions(updated);
    updateField({ companions: JSON.stringify(updated) });
  };

  const humanoid = companions.find(c => c.slot === 'humanoid');
  const robot = companions.find(c => c.slot === 'robot');

  const addSlot = (slot, defaultType) => {
    const c = { ...makeCompanion(defaultType), slot };
    save([...companions.filter(c2 => c2.slot !== slot), c]);
  };

  const updateSlot = (slot, data) => {
    save(companions.map(c => c.slot === slot ? data : c));
  };

  const removeSlot = (slot) => {
    save(companions.filter(c => c.slot !== slot));
  };

  const sectionHeader = (title) => (
    <div className="px-3 py-2 mb-3" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
      <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>{title}</p>
    </div>
  );

  return (
    <div style={{ color: '#a8c8d8' }}>
      {sectionHeader('HUMANOID / CREATURE COMPANION')}
      <div className="px-4 pb-2">
        <p className="text-[9px] font-mono mb-3" style={{ color: '#4a6a8a' }}>Requires: Hired Help perk</p>
        {humanoid ? (
          <CompanionCard
            companion={humanoid}
            characterLevel={character.level || 1}
            onChange={(data) => updateSlot('humanoid', data)}
            onRemove={() => removeSlot('humanoid')}
          />
        ) : (
          <EmptySlot label="No humanoid or creature companion" onAdd={() => addSlot('humanoid', 'Humanoid')} />
        )}
      </div>

      <div style={{ borderTop: '1px solid #1e3a5f' }}>
        {sectionHeader('ROBOT COMPANION')}
        <div className="px-4 pb-4">
          <p className="text-[9px] font-mono mb-3" style={{ color: '#4a6a8a' }}>Requires: Robot Wrangler perk</p>
          {robot ? (
            <CompanionCard
              companion={robot}
              characterLevel={character.level || 1}
              onChange={(data) => updateSlot('robot', data)}
              onRemove={() => removeSlot('robot')}
            />
          ) : (
            <EmptySlot label="No robot companion" onAdd={() => addSlot('robot', 'Robot')} />
          )}
        </div>
      </div>
    </div>
  );
}