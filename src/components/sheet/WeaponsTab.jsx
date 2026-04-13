import { useState } from "react";
import { SETTLERS_WEAPONS } from "../../lib/falloutData";

const EMPTY_WEAPON = {
  name: '', damage: '', damageEffect: '', damageType: 'Physical',
  fireModes: [], range: 'Short', qualities: '', weight: '', ammoType: '', ammoCurrent: ''
};

const DAMAGE_TYPES = ['Physical', 'Energy', 'Energy/Radiation', 'Radiation', 'Poison'];
const FIRE_MODES = ['Single', 'Burst', 'Auto'];
const RANGES = ['Melee', 'Close', 'Short', 'Medium', 'Long', 'Extreme'];

const ALL_REF_WEAPONS = [
  // Core weapons
  { label: 'Pipe Pistol', type: 'Small Guns', damage: '2 CD', damageEffect: '', damageType: 'Physical', range: 'Short', qualities: 'Inaccurate', ammo: '10mm' },
  { label: '10mm Pistol', type: 'Small Guns', damage: '3 CD', damageEffect: '', damageType: 'Physical', range: 'Short', qualities: '—', ammo: '10mm' },
  { label: 'Hunting Rifle', type: 'Small Guns', damage: '4 CD', damageEffect: '', damageType: 'Physical', range: 'Long', qualities: 'Two-Handed', ammo: '.308' },
  { label: 'Combat Shotgun', type: 'Small Guns', damage: '3 CD', damageEffect: 'Spread', damageType: 'Physical', range: 'Short', qualities: 'Two-Handed', ammo: 'Shotgun Shell' },
  { label: 'Laser Pistol', type: 'Energy Weapons', damage: '3 CD', damageEffect: '', damageType: 'Energy', range: 'Medium', qualities: '—', ammo: 'Microfusion Cell' },
  { label: 'Plasma Pistol', type: 'Energy Weapons', damage: '4 CD', damageEffect: 'Vicious', damageType: 'Energy', range: 'Short', qualities: '—', ammo: 'Plasma Cartridge' },
  { label: 'Laser Rifle', type: 'Energy Weapons', damage: '4 CD', damageEffect: '', damageType: 'Energy', range: 'Long', qualities: 'Two-Handed', ammo: 'Fusion Cell' },
  { label: 'Minigun', type: 'Big Guns', damage: '3 CD', damageEffect: '', damageType: 'Physical', range: 'Short', qualities: 'Two-Handed, Inaccurate', ammo: '5mm' },
  { label: 'Fat Man', type: 'Big Guns', damage: '10 CD', damageEffect: 'Blast, Vicious', damageType: 'Radiation', range: 'Long', qualities: 'Two-Handed, Inaccurate', ammo: 'Mini Nuke' },
  { label: 'Flamer', type: 'Big Guns', damage: '4 CD', damageEffect: 'Persistent, Spread', damageType: 'Energy', range: 'Close', qualities: 'Two-Handed, Inaccurate', ammo: 'Flamer Fuel' },
  { label: 'Baseball Bat', type: 'Melee', damage: '4 CD', damageEffect: '', damageType: 'Physical', range: 'Melee', qualities: '—', ammo: null },
  { label: 'Super Sledge', type: 'Melee', damage: '7 CD', damageEffect: 'Knockdown', damageType: 'Physical', range: 'Melee', qualities: 'Two-Handed', ammo: null },
  { label: 'Combat Knife', type: 'Melee', damage: '3 CD', damageEffect: '', damageType: 'Physical', range: 'Melee', qualities: 'Stealthy', ammo: null },
  ...SETTLERS_WEAPONS,
];

const TYPE_ORDER = ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'];

function rarityColor(r) {
  if (!r) return '#6a8a9a';
  if (r <= 2) return '#6a8a9a';
  if (r === 3) return '#22cc22';
  if (r === 4) return '#4488ff';
  return '#f5c518';
}

function WeaponReferenceModal({ onSelect, onClose }) {
  const grouped = TYPE_ORDER.reduce((acc, t) => {
    acc[t] = ALL_REF_WEAPONS.filter(w => w.type === t);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <div className="w-full max-w-3xl max-h-[80vh] overflow-y-auto m-4"
        style={{ background: '#0d2137', border: '2px solid #f5c518' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
          <p className="text-sm font-bold tracking-widest" style={{ color: '#f5c518' }}>WEAPON REFERENCE — Click to Add</p>
          <button onClick={onClose} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>✕</button>
        </div>
        {TYPE_ORDER.map(type => {
          const weapons = grouped[type];
          if (!weapons?.length) return null;
          return (
            <div key={type}>
              <div className="px-4 py-1.5" style={{ background: '#091525', borderBottom: '1px solid #1e3a5f' }}>
                <p className="text-[10px] font-bold tracking-widest" style={{ color: '#4a6a8a' }}>{type.toUpperCase()}</p>
              </div>
              {weapons.map((w, i) => (
                <button key={i} onClick={() => onSelect(w)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:opacity-80 transition-opacity"
                  style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #091525', cursor: 'pointer' }}>
                  <span className="font-heading font-semibold text-sm flex-1 text-left" style={{ color: '#e8e8e8' }}>{w.label}</span>
                  <span className="text-xs font-mono" style={{ color: '#22cc22', minWidth: '50px' }}>{w.damage}</span>
                  <span className="text-[10px] font-mono" style={{ color: '#6a8a9a', minWidth: '60px' }}>{w.damageType}</span>
                  <span className="text-[10px] font-mono" style={{ color: '#4a6a8a', minWidth: '50px' }}>{w.range}</span>
                  {w.source ? (
                    <span className="text-[9px] px-1.5 py-0.5 font-bold"
                      style={{ background: 'rgba(245,197,24,0.1)', border: '1px solid rgba(245,197,24,0.3)', color: '#f5c518' }}>
                      {w.source}
                    </span>
                  ) : (
                    <span className="text-[9px] px-1.5 py-0.5 font-bold"
                      style={{ background: 'rgba(106,154,186,0.1)', border: '1px solid rgba(106,154,186,0.3)', color: '#6a9aba' }}>
                      Core
                    </span>
                  )}
                  {w.rarity != null && (
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: rarityColor(w.rarity), flexShrink: 0, display: 'inline-block' }} />
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeaponRow({ weapon, index, onChange, onRemove }) {
  const toggleMode = (mode) => {
    const modes = weapon.fireModes || [];
    const updated = modes.includes(mode) ? modes.filter(m => m !== mode) : [...modes, mode];
    onChange({ ...weapon, fireModes: updated });
  };

  const field = (key, value, style = {}) => (
    <input
      type="text"
      value={value ?? ''}
      onChange={e => onChange({ ...weapon, [key]: e.target.value })}
      style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: '11px', ...style }}
    />
  );

  return (
    <div className="p-3 mb-2" style={{ background: '#0a1a2d', border: '1px solid #1e3a5f' }}>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-[10px] font-bold w-4" style={{ color: '#f5c518' }}>#{index + 1}</span>
        {field('name', weapon.name, { flex: 1, minWidth: '120px' })}
        {field('damage', weapon.damage, { width: '60px' })}
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
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <div className="flex items-center gap-1">
          <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Effects:</span>
          {field('damageEffect', weapon.damageEffect, { flex: 1, minWidth: '100px' })}
        </div>
        <div className="flex items-center gap-1 flex-1">
          <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Qualities:</span>
          {field('qualities', weapon.qualities, { flex: 1, minWidth: '80px' })}
        </div>
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
      </div>
    </div>
  );
}

export default function WeaponsTab({ character, updateField }) {
  const [weapons, setWeapons] = useState(() => {
    try { return JSON.parse(character.equipment || '[]'); } catch { return []; }
  });
  const [showRef, setShowRef] = useState(false);

  const save = (updated) => {
    setWeapons(updated);
    updateField({ equipment: JSON.stringify(updated) });
  };

  const addWeapon = () => {
    if (weapons.length >= 5) return;
    save([...weapons, { ...EMPTY_WEAPON }]);
  };

  const addFromRef = (refWeapon) => {
    if (weapons.length >= 5) return;
    const w = {
      ...EMPTY_WEAPON,
      name: refWeapon.label,
      damage: refWeapon.damage || '',
      damageEffect: refWeapon.damageEffect || '',
      damageType: refWeapon.damageType || 'Physical',
      range: refWeapon.range || 'Short',
      qualities: refWeapon.qualities || '',
      weight: refWeapon.weight ? String(refWeapon.weight) : '',
      ammoType: refWeapon.ammo || '',
    };
    save([...weapons, w]);
    setShowRef(false);
  };

  const updateWeapon = (i, data) => save(weapons.map((w, idx) => idx === i ? data : w));
  const removeWeapon = (i) => save(weapons.filter((_, idx) => idx !== i));

  return (
    <div className="p-4" style={{ color: '#a8c8d8' }}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>WEAPONS ({weapons.length}/5)</p>
        <div className="flex gap-2">
          <button onClick={() => setShowRef(true)} className="text-xs px-3 py-1 font-bold"
            style={{ background: '#0a1525', border: '1px solid #4a6a8a', color: '#a8c8d8', cursor: 'pointer' }}>
            📋 Add from Reference
          </button>
          {weapons.length < 5 && (
            <button onClick={addWeapon} className="text-xs px-3 py-1 font-bold"
              style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>
              + ADD BLANK
            </button>
          )}
        </div>
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
      {showRef && <WeaponReferenceModal onSelect={addFromRef} onClose={() => setShowRef(false)} />}
    </div>
  );
}