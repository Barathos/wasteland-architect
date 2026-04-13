import { useState } from "react";

const EMPTY_WEAPON = { name: '', damage: '', damageType: 'Physical', fireModes: [], range: 'Short', qualities: '', weight: '', ammoType: '', ammoCurrent: '' };
const DAMAGE_TYPES = ['Physical', 'Energy', 'Radiation', 'Poison'];
const FIRE_MODES = ['Single', 'Burst', 'Auto'];
const RANGES = ['Short', 'Medium', 'Long', 'Extreme'];

function WeaponRow({ weapon, index, onChange, onRemove }) {
  const toggleMode = (mode) => {
    const modes = weapon.fireModes || [];
    const updated = modes.includes(mode) ? modes.filter(m => m !== mode) : [...modes, mode];
    onChange({ ...weapon, fireModes: updated });
  };

  const field = (key, value, style = {}) => (
    <input
      type={typeof value === 'number' ? 'number' : 'text'}
      value={value}
      onChange={e => onChange({ ...weapon, [key]: e.target.value })}
      style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: '11px', ...style }}
    />
  );

  return (
    <div className="p-3 mb-2" style={{ background: '#0a1a2d', border: '1px solid #1e3a5f' }}>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-[10px] font-bold w-4" style={{ color: '#f5c518' }}>#{index + 1}</span>
        {field('name', weapon.name, { flex: 1, minWidth: '120px' })}
        {field('damage', weapon.damage, { width: '70px' })}
        <select value={weapon.damageType} onChange={e => onChange({ ...weapon, damageType: e.target.value })}
          style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', fontSize: '11px', padding: '3px 4px' }}>
          {DAMAGE_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={weapon.range} onChange={e => onChange({ ...weapon, range: e.target.value })}
          style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', fontSize: '11px', padding: '3px 4px' }}>
          {RANGES.map(r => <option key={r}>{r}</option>)}
        </select>
        <button onClick={onRemove} className="text-xs font-bold ml-auto" style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 items-center">
          <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Fire:</span>
          {FIRE_MODES.map(m => (
            <button key={m} onClick={() => toggleMode(m)}
              className="text-[10px] px-1.5 py-0.5 font-bold"
              style={{ background: weapon.fireModes?.includes(m) ? '#22aa22' : '#0a1a2d', border: '1px solid #1e3a5f', color: weapon.fireModes?.includes(m) ? '#fff' : '#4a6a8a', cursor: 'pointer' }}>
              {m}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Ammo:</span>
          {field('ammoType', weapon.ammoType, { width: '80px' })}
          {field('ammoCurrent', weapon.ammoCurrent, { width: '40px' })}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Wt:</span>
          {field('weight', weapon.weight, { width: '40px' })}
        </div>
        <div className="flex items-center gap-1 flex-1">
          <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Qualities:</span>
          {field('qualities', weapon.qualities, { flex: 1, minWidth: '80px' })}
        </div>
      </div>
    </div>
  );
}

export default function WeaponsTab({ character, updateField }) {
  const [weapons, setWeapons] = useState(() => {
    try { return JSON.parse(character.equipment || '[]'); } catch { return []; }
  });

  const save = (updated) => {
    setWeapons(updated);
    updateField({ equipment: JSON.stringify(updated) });
  };

  const addWeapon = () => {
    if (weapons.length >= 5) return;
    save([...weapons, { ...EMPTY_WEAPON }]);
  };

  const updateWeapon = (i, data) => {
    const updated = weapons.map((w, idx) => idx === i ? data : w);
    save(updated);
  };

  const removeWeapon = (i) => save(weapons.filter((_, idx) => idx !== i));

  return (
    <div className="p-4" style={{ color: '#a8c8d8' }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>WEAPONS ({weapons.length}/5)</p>
        <div className="text-[10px] flex gap-4" style={{ color: '#4a6a8a' }}>
          <span>NAME</span><span>DAMAGE</span><span>TYPE</span><span>RANGE</span>
        </div>
        {weapons.length < 5 && (
          <button onClick={addWeapon} className="text-xs px-3 py-1 font-bold"
            style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>
            + ADD WEAPON
          </button>
        )}
      </div>
      {weapons.length === 0 ? (
        <div className="text-center py-8" style={{ color: '#4a6a8a' }}>
          <p className="font-mono text-sm">No weapons equipped.</p>
        </div>
      ) : (
        weapons.map((w, i) => (
          <WeaponRow key={i} weapon={w} index={i} onChange={d => updateWeapon(i, d)} onRemove={() => removeWeapon(i)} />
        ))
      )}
    </div>
  );
}