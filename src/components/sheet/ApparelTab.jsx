import { useState } from "react";

const SLOTS = [
  { key: 'head',       label: 'Head' },
  { key: 'torso',      label: 'Torso' },
  { key: 'left_arm',   label: 'Left Arm' },
  { key: 'right_arm',  label: 'Right Arm' },
  { key: 'left_leg',   label: 'Left Leg' },
  { key: 'right_leg',  label: 'Right Leg' },
  { key: 'power_armor',label: 'Power Armor Frame' },
];

const EMPTY_SLOT = { name: '', physDR: 0, energyDR: 0, radDR: 0, worn: false };

function parseApparel(str) {
  try { const p = JSON.parse(str || '{}'); return p; } catch { return {}; }
}

export default function ApparelTab({ character, updateField }) {
  const [apparel, setApparel] = useState(() => parseApparel(character.apparel));

  const save = (updated) => {
    setApparel(updated);
    updateField({ apparel: JSON.stringify(updated) });
  };

  const updateSlot = (key, field, val) => {
    const slot = { ...EMPTY_SLOT, ...(apparel[key] || {}), [field]: val };
    save({ ...apparel, [key]: slot });
  };

  // Totals from worn items
  const totals = { physDR: 0, energyDR: 0, radDR: 0 };
  SLOTS.forEach(({ key }) => {
    const s = apparel[key] || EMPTY_SLOT;
    if (s.worn) {
      totals.physDR += parseInt(s.physDR) || 0;
      totals.energyDR += parseInt(s.energyDR) || 0;
      totals.radDR += parseInt(s.radDR) || 0;
    }
  });

  const numInput = (key, field, val) => (
    <input type="number" value={val}
      onChange={e => updateSlot(key, field, parseInt(e.target.value) || 0)}
      style={{ width: '42px', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 4px', fontSize: '11px', textAlign: 'center' }}
    />
  );

  return (
    <div className="p-4" style={{ color: '#a8c8d8' }}>
      {/* DR Summary */}
      <div className="flex gap-4 mb-4 p-3" style={{ background: '#0a2a0a', border: '1px solid #22aa22' }}>
        <span className="text-xs font-bold" style={{ color: '#f5c518' }}>DR TOTALS (worn):</span>
        <span className="text-xs font-mono">PHYS <b style={{ color: '#e8e8e8' }}>{totals.physDR}</b></span>
        <span className="text-xs font-mono">ENERGY <b style={{ color: '#e8e8e8' }}>{totals.energyDR}</b></span>
        <span className="text-xs font-mono">RAD <b style={{ color: '#e8e8e8' }}>{totals.radDR}</b></span>
      </div>

      {/* Header */}
      <div className="grid gap-2" style={{ gridTemplateColumns: '100px 1fr 50px 50px 50px 50px' }}>
        <span className="text-[10px] font-bold" style={{ color: '#f5c518' }}>SLOT</span>
        <span className="text-[10px]" style={{ color: '#4a6a8a' }}>ITEM NAME</span>
        <span className="text-[10px] text-center" style={{ color: '#4a6a8a' }}>PHYS</span>
        <span className="text-[10px] text-center" style={{ color: '#4a6a8a' }}>ENERGY</span>
        <span className="text-[10px] text-center" style={{ color: '#4a6a8a' }}>RAD</span>
        <span className="text-[10px] text-center" style={{ color: '#4a6a8a' }}>WORN</span>
      </div>

      {SLOTS.map(({ key, label }) => {
        const s = { ...EMPTY_SLOT, ...(apparel[key] || {}) };
        return (
          <div key={key} className="grid gap-2 items-center py-2"
            style={{ gridTemplateColumns: '100px 1fr 50px 50px 50px 50px', borderBottom: '1px solid #0d2137' }}>
            <span className="text-xs font-bold" style={{ color: s.worn ? '#f5c518' : '#4a6a8a' }}>{label}</span>
            <input value={s.name} onChange={e => updateSlot(key, 'name', e.target.value)}
              placeholder="—"
              style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: '11px', width: '100%' }}
            />
            {numInput(key, 'physDR', s.physDR)}
            {numInput(key, 'energyDR', s.energyDR)}
            {numInput(key, 'radDR', s.radDR)}
            <div className="flex justify-center">
              <input type="checkbox" checked={s.worn} onChange={e => updateSlot(key, 'worn', e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#22cc22' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}