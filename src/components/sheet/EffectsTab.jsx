import { useState } from "react";

const STANDARD_INJURIES = [
  'Bleeding', 'Dazed', 'Stunned', 'Slowed', 'Prone', 'Blinded',
  'Deafened', 'Weakened', 'Exhausted', 'Frightened',
];

function parse(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

export default function EffectsTab({ character, updateField }) {
  const [effects, setEffects] = useState(() => parse(character.conditions_effects, {
    chems: [], injuries: [], conditions: []
  }));
  const [newChem, setNewChem] = useState({ name: '', effect: '', duration: '' });
  const [newCondition, setNewCondition] = useState('');

  const save = (updated) => {
    setEffects(updated);
    updateField({ conditions_effects: JSON.stringify(updated) });
  };

  const addChem = () => {
    if (!newChem.name.trim()) return;
    save({ ...effects, chems: [...(effects.chems || []), { ...newChem }] });
    setNewChem({ name: '', effect: '', duration: '' });
  };

  const removeChem = (i) => save({ ...effects, chems: effects.chems.filter((_, idx) => idx !== i) });

  const toggleInjury = (inj) => {
    const injuries = effects.injuries || [];
    const updated = injuries.includes(inj) ? injuries.filter(x => x !== inj) : [...injuries, inj];
    save({ ...effects, injuries: updated });
  };

  const addCondition = () => {
    if (!newCondition.trim()) return;
    save({ ...effects, conditions: [...(effects.conditions || []), newCondition] });
    setNewCondition('');
  };

  const removeCondition = (i) => save({ ...effects, conditions: effects.conditions.filter((_, idx) => idx !== i) });

  const sectionHeader = (title) => (
    <div className="px-3 py-2 mb-3" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
      <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>{title}</p>
    </div>
  );

  const inputSm = (val, onChange, placeholder, width = '100%') => (
    <input value={val} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width, background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: '11px' }}
    />
  );

  return (
    <div style={{ color: '#a8c8d8' }}>
      {/* Active Chems */}
      <div style={{ borderBottom: '1px solid #1e3a5f' }}>
        {sectionHeader('ACTIVE CHEMS')}
        <div className="px-4 pb-4">
          {(effects.chems || []).map((c, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5" style={{ borderBottom: '1px solid #0d2137' }}>
              <span className="font-bold text-xs" style={{ color: '#22cc22', minWidth: '80px' }}>{c.name}</span>
              <span className="text-xs flex-1" style={{ color: '#a8c8d8' }}>{c.effect}</span>
              <span className="text-xs" style={{ color: '#f5c518', minWidth: '60px' }}>{c.duration}</span>
              <button onClick={() => removeChem(i)} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
            </div>
          ))}
          <div className="flex gap-2 mt-3 flex-wrap">
            {inputSm(newChem.name, v => setNewChem(p => ({ ...p, name: v })), 'Chem name', '120px')}
            {inputSm(newChem.effect, v => setNewChem(p => ({ ...p, effect: v })), 'Effect', '1')}
            {inputSm(newChem.duration, v => setNewChem(p => ({ ...p, duration: v })), 'Duration', '80px')}
            <button onClick={addChem} className="px-3 py-1 text-xs font-bold"
              style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer', whiteSpace: 'nowrap' }}>+ ADD</button>
          </div>
        </div>
      </div>

      {/* Injuries */}
      <div style={{ borderBottom: '1px solid #1e3a5f' }}>
        {sectionHeader('INJURIES')}
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {STANDARD_INJURIES.map(inj => {
              const active = (effects.injuries || []).includes(inj);
              return (
                <button key={inj} onClick={() => toggleInjury(inj)}
                  className="px-3 py-1.5 text-xs font-bold"
                  style={{
                    background: active ? '#3a0d0d' : '#0a1a2d',
                    border: `1px solid ${active ? '#cc4444' : '#1e3a5f'}`,
                    color: active ? '#cc4444' : '#4a6a8a',
                    cursor: 'pointer',
                  }}>
                  {active && '⚠ '}{inj}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Special Conditions */}
      <div>
        {sectionHeader('SPECIAL CONDITIONS')}
        <div className="px-4 pb-4">
          {(effects.conditions || []).map((c, i) => (
            <div key={i} className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid #0d2137' }}>
              <span className="text-sm" style={{ color: '#a8c8d8' }}>{c}</span>
              <button onClick={() => removeCondition(i)} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
            </div>
          ))}
          <div className="flex gap-2 mt-3">
            <input value={newCondition} onChange={e => setNewCondition(e.target.value)}
              placeholder="Add condition..."
              onKeyDown={e => e.key === 'Enter' && addCondition()}
              style={{ flex: 1, background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '4px 8px', fontSize: '12px' }}
            />
            <button onClick={addCondition} className="px-3 py-1 text-xs font-bold"
              style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer', whiteSpace: 'nowrap' }}>+ ADD</button>
          </div>
        </div>
      </div>
    </div>
  );
}