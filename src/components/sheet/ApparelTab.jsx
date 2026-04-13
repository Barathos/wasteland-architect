import { useState } from "react";
import { getArmorForSlot, SLOT_LABELS } from "../../lib/armorSlotUtils";

const SLOTS = [
  { key: 'head',        label: 'Head' },
  { key: 'torso',       label: 'Torso' },
  { key: 'left_arm',    label: 'Left Arm' },
  { key: 'right_arm',   label: 'Right Arm' },
  { key: 'left_leg',    label: 'Left Leg' },
  { key: 'right_leg',   label: 'Right Leg' },
  { key: 'power_armor', label: 'Power Armor' },
];

const EMPTY_SLOT = { name: '', physDR: 0, energyDR: 0, radDR: 0, worn: false, linkedArmorName: null };

function parseJ(str, fb) { try { return JSON.parse(str || ''); } catch { return fb; } }

export default function ApparelTab({ character, updateField }) {
  const [apparel, setApparel] = useState(() => parseJ(character.apparel, {}));
  const armorList = parseJ(character.armor_equipped, []);

  const save = (updated) => {
    setApparel(updated);
    updateField({ apparel: JSON.stringify(updated) });
  };

  const updateSlot = (key, field, val) => {
    const slot = { ...EMPTY_SLOT, ...(apparel[key] || {}), [field]: val };
    save({ ...apparel, [key]: slot });
  };

  const linkGearItem = (slotKey, armorName) => {
    const current = { ...EMPTY_SLOT, ...(apparel[slotKey] || {}) };
    if (!armorName) {
      // Unlink
      save({ ...apparel, [slotKey]: { ...current, linkedArmorName: null } });
      return;
    }
    const item = armorList.find(a => a.name === armorName);
    if (!item) return;
    save({
      ...apparel,
      [slotKey]: {
        ...current,
        linkedArmorName: armorName,
        name: item.name,
        physDR: item.physRes ?? current.physDR,
        energyDR: item.enerRes ?? current.energyDR,
        radDR: item.radRes ?? current.radDR,
      }
    });
  };

  // Sync linked slots with current gear data
  const getSlotData = (key) => {
    const s = { ...EMPTY_SLOT, ...(apparel[key] || {}) };
    if (s.linkedArmorName) {
      const item = armorList.find(a => a.name === s.linkedArmorName);
      if (item) {
        s.name = item.name;
        s.physDR = item.physRes ?? s.physDR;
        s.energyDR = item.enerRes ?? s.energyDR;
        s.radDR = item.radRes ?? s.radDR;
      } else {
        // Linked item removed from gear — clear link
        s.linkedArmorName = null;
      }
    }
    return s;
  };

  const totals = { physDR: 0, energyDR: 0, radDR: 0 };
  SLOTS.forEach(({ key }) => {
    const s = getSlotData(key);
    if (s.worn) {
      totals.physDR += parseInt(s.physDR) || 0;
      totals.energyDR += parseInt(s.energyDR) || 0;
      totals.radDR += parseInt(s.radDR) || 0;
    }
  });

  const numInput = (key, field, val, linked) => (
    <input type="number" value={val} readOnly={!!linked}
      onChange={e => !linked && updateSlot(key, field, parseInt(e.target.value) || 0)}
      style={{
        width: '42px', background: linked ? '#050d18' : '#060f1c',
        border: `1px solid ${linked ? '#0d2a3a' : '#1e3a5f'}`,
        color: linked ? '#4a6a8a' : '#e8e8e8',
        outline: 'none', padding: '3px 4px', fontSize: '11px', textAlign: 'center',
        cursor: linked ? 'default' : 'text',
      }}
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

      {armorList.length > 0 && (
        <p className="text-[10px] font-mono mb-3" style={{ color: '#4a6a8a' }}>
          💡 Select gear items from the dropdowns to auto-fill DR values. Add armor in the Gear tab first.
        </p>
      )}

      {/* Header */}
      <div className="grid gap-2 mb-1" style={{ gridTemplateColumns: '90px 1fr 44px 44px 44px 40px' }}>
        <span className="text-[10px] font-bold" style={{ color: '#f5c518' }}>SLOT</span>
        <span className="text-[10px]" style={{ color: '#4a6a8a' }}>ITEM / LINK FROM GEAR</span>
        <span className="text-[10px] text-center" style={{ color: '#4a6a8a' }}>PHYS</span>
        <span className="text-[10px] text-center" style={{ color: '#4a6a8a' }}>ENRG</span>
        <span className="text-[10px] text-center" style={{ color: '#4a6a8a' }}>RAD</span>
        <span className="text-[10px] text-center" style={{ color: '#4a6a8a' }}>WORN</span>
      </div>

      {SLOTS.map(({ key, label }) => {
        const s = getSlotData(key);
        const compatible = getArmorForSlot(armorList, key);
        const isLinked = !!s.linkedArmorName;

        return (
          <div key={key} className="py-2" style={{ borderBottom: '1px solid #0d2137' }}>
            <div className="grid gap-2 items-center" style={{ gridTemplateColumns: '90px 1fr 44px 44px 44px 40px' }}>
              <span className="text-xs font-bold" style={{ color: s.worn ? '#f5c518' : '#4a6a8a' }}>{label}</span>

              <div className="flex flex-col gap-1">
                {/* Gear link dropdown */}
                {compatible.length > 0 && (
                  <select
                    value={s.linkedArmorName || ''}
                    onChange={e => linkGearItem(key, e.target.value)}
                    style={{ background: '#060f1c', border: `1px solid ${isLinked ? '#22aa22' : '#1e3a5f'}`, color: isLinked ? '#22cc22' : '#a8c8d8', fontSize: '10px', padding: '2px 4px', outline: 'none', width: '100%' }}>
                    <option value="">— manual / none —</option>
                    {compatible.map((item, idx) => (
                      <option key={idx} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                )}
                {/* Manual name fallback */}
                {!isLinked && (
                  <input value={s.name} onChange={e => updateSlot(key, 'name', e.target.value)}
                    placeholder="—"
                    style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '2px 6px', fontSize: '11px', width: '100%' }}
                  />
                )}
              </div>

              {numInput(key, 'physDR', s.physDR, isLinked)}
              {numInput(key, 'energyDR', s.energyDR, isLinked)}
              {numInput(key, 'radDR', s.radDR, isLinked)}

              <div className="flex justify-center">
                <input type="checkbox" checked={s.worn} onChange={e => updateSlot(key, 'worn', e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#22cc22' }} />
              </div>
            </div>

            {isLinked && (
              <p className="text-[10px] font-mono mt-1 ml-1" style={{ color: '#22cc22' }}>
                🔗 Linked from Gear — DR auto-filled
                {s.worn && <span style={{ color: '#f5c518', marginLeft: '6px' }}>✓ Worn</span>}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}