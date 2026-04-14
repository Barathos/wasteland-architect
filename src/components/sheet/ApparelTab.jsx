import { useState } from "react";
import { getArmorForSlot, SLOT_LABELS } from "../../lib/armorSlotUtils";
import { getTotalApparelDR } from "../../lib/apparelArmorResolver";
import { SETTLERS_AMMO, WANDERERS_AMMO, WANDERERS_ARMOR } from "../../lib/falloutData";
import { CORE_AMMO, CORE_APPAREL, CORE_ARMOR, CORE_POWER_ARMOR } from "../../lib/sourceTruthData";

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

const ARMOR_TYPE_ORDER = ['Headgear', 'Clothing', 'Outfit', 'Dog Armor', 'Raider', 'Leather', 'Metal', 'Combat', 'Synth', 'Vault-Tec Security', 'Raider Power', 'T-45', 'T-51', 'T-60', 'X-01', 'Power Armor (Wanderers)'];
const POWER_ARMOR_SETS = new Set(['Raider Power', 'T-45', 'T-51', 'T-60', 'X-01', 'Power Armor (Wanderers)']);

const ALL_ARMOR_GROUPS = (() => {
  const groups = {};
  const add = (key, item) => { if (!groups[key]) groups[key] = []; groups[key].push(item); };
  CORE_APPAREL.forEach(a => add(a.type, a));
  CORE_ARMOR.forEach(a => add(a.set, a));
  CORE_POWER_ARMOR.forEach(a => add(a.set === 'Frame' ? 'T-45' : a.set, a));
  WANDERERS_ARMOR.forEach(a => add(a.type === 'Power Armor' ? 'Power Armor (Wanderers)' : a.type, a));
  return groups;
})();

function parseJ(str, fb) { try { return JSON.parse(str || ''); } catch { return fb; } }

function ArmorRefModal({ onSelect, onClose }) {
  const [filter, setFilter] = useState('');
  const lower = filter.toLowerCase();
  const sourceBadge = (a) => {
    if (a.source === 'Wanderers') return { bg: 'rgba(180,120,255,0.12)', border: 'rgba(170,102,255,0.35)', color: '#aa66ff' };
    if (a.source === 'Settlers') return { bg: 'rgba(245,197,24,0.1)', border: 'rgba(245,197,24,0.3)', color: '#f5c518' };
    return { bg: 'rgba(106,154,186,0.1)', border: 'rgba(106,154,186,0.3)', color: '#6a9aba' };
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col m-4" style={{ background: '#0d2137', border: '2px solid #f5c518' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
          <p className="text-sm font-bold tracking-widest" style={{ color: '#f5c518' }}>ARMOR REFERENCE — Click to Add to Inventory</p>
          <div className="flex items-center gap-3">
            <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search..."
              style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none', padding: '3px 8px', fontSize: '11px', width: '120px' }}
              onClick={e => e.stopPropagation()} />
            <button onClick={onClose} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>✕</button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {ARMOR_TYPE_ORDER.map(type => {
            const items = (ALL_ARMOR_GROUPS[type] || []).filter(a => !lower || a.label.toLowerCase().includes(lower));
            if (!items.length) return null;
            const isPowerArmor = POWER_ARMOR_SETS.has(type);
            return (
              <div key={type}>
                <div className="px-4 py-1.5 sticky top-0" style={{ background: isPowerArmor ? '#0d1a0d' : '#091525', borderBottom: '1px solid #1e3a5f', zIndex: 1 }}>
                  <p className="text-[10px] font-bold tracking-widest" style={{ color: isPowerArmor ? '#f5a818' : '#4a6a8a' }}>
                    {isPowerArmor ? `⚡ POWER ARMOR — ${type.toUpperCase()}` : type.toUpperCase()}
                  </p>
                </div>
                {items.map((a, i) => {
                  const badge = sourceBadge(a);
                  return (
                    <button key={i} onClick={() => onSelect(a)}
                      className="w-full px-4 py-2 text-left hover:opacity-80 transition-opacity"
                      style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #091525', cursor: 'pointer' }}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-heading font-semibold text-sm" style={{ color: '#e8e8e8' }}>{a.label}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] font-mono" style={{ color: '#22cc22' }}>P:{a.physRes} E:{a.enerRes} R:{a.radRes}</span>
                          {a.hp != null && a.hp > 0 && <span className="text-[10px] font-mono" style={{ color: '#f5c518' }}>HP:{a.hp}</span>}
                          <span className="text-[9px] px-1.5 py-0.5 font-bold" style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}>{a.source}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>{(a.locations || []).join(', ')}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ApparelTab({ character, updateField }) {
  const [apparel, setApparel] = useState(() => parseJ(character.apparel, {}));
  const [armorList, setArmorList] = useState(() => parseJ(character.armor_equipped, []));
  const [showRef, setShowRef] = useState(false);

  // Save both fields together
  const saveApparel = (updated) => {
    setApparel(updated);
    updateField({ apparel: JSON.stringify(updated) });
  };

  const saveArmorList = (updated) => {
    setArmorList(updated);
    updateField({ armor_equipped: JSON.stringify(updated) });
  };

  // Add from reference modal
  const addFromRef = (a) => {
    const item = { name: a.label, physRes: a.physRes, enerRes: a.enerRes, radRes: a.radRes, locations: (a.locations || []).join(', '), special: a.special || '', hp: a.hp || null, source: a.source };
    saveArmorList([...armorList, item]);
    setShowRef(false);
  };

  // Remove from inventory — also clear any slot using it
  const removeArmorItem = (idx) => {
    const item = armorList[idx];
    const updated = armorList.filter((_, i) => i !== idx);
    saveArmorList(updated);
    // Clear any slot linked to this item
    const newApparel = { ...apparel };
    let changed = false;
    SLOTS.forEach(({ key }) => {
      if (newApparel[key]?.linkedArmorName === item.name) {
        newApparel[key] = { ...EMPTY_SLOT };
        changed = true;
      }
    });
    if (changed) saveApparel(newApparel);
  };

  // Resolve live slot data (sync from linked gear item)
  const getSlotData = (key) => {
    const s = { ...EMPTY_SLOT, ...(apparel[key] || {}) };
    if (s.linkedArmorName) {
      const item = armorList.find(a => a.name === s.linkedArmorName);
      if (item) {
        s.physDR = item.physRes ?? s.physDR;
        s.energyDR = item.enerRes ?? s.energyDR;
        s.radDR = item.radRes ?? s.radDR;
        s.name = item.name;
      } else {
        s.linkedArmorName = null;
      }
    }
    return s;
  };

  // Assign armor to slot — auto-mark worn
  const assignSlot = (slotKey, armorName) => {
    const current = { ...EMPTY_SLOT, ...(apparel[slotKey] || {}) };
    if (!armorName) {
      saveApparel({ ...apparel, [slotKey]: { ...EMPTY_SLOT } });
      return;
    }
    const item = armorList.find(a => a.name === armorName);
    if (!item) return;
    saveApparel({
      ...apparel,
      [slotKey]: {
        ...current,
        linkedArmorName: armorName,
        name: item.name,
        physDR: item.physRes ?? 0,
        energyDR: item.enerRes ?? 0,
        radDR: item.radRes ?? 0,
        worn: true, // auto-worn on assignment
      }
    });
  };

  const toggleWorn = (slotKey, val) => {
    const s = { ...EMPTY_SLOT, ...(apparel[slotKey] || {}) };
    saveApparel({ ...apparel, [slotKey]: { ...s, worn: val } });
  };

  // DR totals (worn only)
  const totals = getTotalApparelDR({ apparel: JSON.stringify(apparel), armor_equipped: JSON.stringify(armorList) });

  // Which slot is each armor item assigned to?
  const getItemSlot = (name) => {
    for (const { key, label } of SLOTS) {
      if (apparel[key]?.linkedArmorName === name) return label;
    }
    return null;
  };

  return (
    <div className="p-4" style={{ color: '#a8c8d8' }}>
      {/* Worn DR Summary */}
      <div className="flex flex-wrap gap-4 mb-5 p-3" style={{ background: '#0a2a0a', border: '1px solid #22aa22' }}>
        <span className="text-xs font-bold" style={{ color: '#f5c518' }}>WORN TOTALS:</span>
        <span className="text-xs font-mono">PHYS <b style={{ color: '#e8e8e8' }}>{totals.phys}</b></span>
        <span className="text-xs font-mono">ENERGY <b style={{ color: '#4ab8ff' }}>{totals.energy}</b></span>
        <span className="text-xs font-mono">RAD <b style={{ color: '#22cc22' }}>{totals.rad}</b></span>
      </div>

      {/* ── SECTION 1: OWNED ARMOR ── */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>ARMOR INVENTORY ({armorList.length})</p>
          <button onClick={() => setShowRef(true)} className="text-xs px-3 py-1 font-bold"
            style={{ background: '#0a1525', border: '1px solid #4a6a8a', color: '#a8c8d8', cursor: 'pointer' }}>
            📋 Add from Reference
          </button>
        </div>

        {armorList.length === 0 ? (
          <p className="text-xs font-mono py-3 text-center" style={{ color: '#4a6a8a' }}>No armor owned. Add from Reference above.</p>
        ) : (
          <div className="space-y-1.5">
            {armorList.map((a, i) => {
              const assignedSlot = getItemSlot(a.name);
              return (
                <div key={i} className="p-2.5" style={{ background: '#0a1a2d', border: `1px solid ${assignedSlot ? '#22aa2255' : '#1e3a5f'}` }}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-heading font-semibold text-sm truncate" style={{ color: '#e8e8e8' }}>{a.name}</span>
                      {assignedSlot
                        ? <span className="text-[9px] font-mono px-1.5 py-0.5 flex-shrink-0" style={{ background: 'rgba(34,204,34,0.1)', border: '1px solid #22cc2244', color: '#22cc22' }}>📌 {assignedSlot}</span>
                        : <span className="text-[9px] font-mono px-1.5 py-0.5 flex-shrink-0" style={{ background: 'rgba(74,106,138,0.1)', border: '1px solid #1e3a5f', color: '#4a6a8a' }}>unassigned</span>
                      }
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-mono" style={{ color: '#6a9aba' }}>P:{a.physRes ?? 0} E:{a.enerRes ?? 0} R:{a.radRes ?? 0}{a.hp ? ` HP:${a.hp}` : ''}</span>
                      <button onClick={() => removeArmorItem(i)} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
                    </div>
                  </div>
                  {(a.locations || a.special) && (
                    <p className="text-[10px] font-mono mt-0.5" style={{ color: '#4a6a8a' }}>
                      {a.locations}{a.special ? ` — ${a.special}` : ''}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── SECTION 2: SLOT ASSIGNMENT ── */}
      <div>
        <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#f5c518' }}>ARMOR SLOTS</p>

        {/* Header */}
        <div className="grid gap-2 mb-1 px-1" style={{ gridTemplateColumns: '80px 1fr 36px 36px 36px 44px' }}>
          {['SLOT', 'ASSIGNED ARMOR', 'P', 'E', 'R', 'WORN'].map((h, i) => (
            <span key={i} className={`text-[10px] font-bold ${i >= 2 ? 'text-center' : ''}`} style={{ color: '#4a6a8a' }}>{h}</span>
          ))}
        </div>

        {SLOTS.map(({ key, label }) => {
          const s = getSlotData(key);
          const compatible = getArmorForSlot(armorList, key);

          return (
            <div key={key} className="grid gap-2 items-center py-2 px-1" style={{ gridTemplateColumns: '80px 1fr 36px 36px 36px 44px', borderBottom: '1px solid #0d2137' }}>
              {/* Slot label */}
              <span className="text-xs font-bold" style={{ color: s.worn ? '#f5c518' : '#6a8a9a' }}>{label}</span>

              {/* Armor select */}
              <select
                value={s.linkedArmorName || ''}
                onChange={e => assignSlot(key, e.target.value)}
                style={{
                  background: '#060f1c',
                  border: `1px solid ${s.linkedArmorName ? '#22aa22' : '#1e3a5f'}`,
                  color: s.linkedArmorName ? '#22cc22' : '#6a8a9a',
                  fontSize: '10px', padding: '3px 4px', outline: 'none', width: '100%',
                }}>
                <option value="">— none —</option>
                {compatible.map((item, idx) => (
                  <option key={idx} value={item.name}>{item.name}</option>
                ))}
                {/* Also allow any owned armor as fallback */}
                {armorList.filter(a => !compatible.find(c => c.name === a.name)).map((item, idx) => (
                  <option key={`all-${idx}`} value={item.name}>{item.name} *</option>
                ))}
              </select>

              {/* DR values (read-only from linked item or manual) */}
              {[['physDR', '#e8e8e8'], ['energyDR', '#4ab8ff'], ['radDR', '#22cc22']].map(([field, color]) => (
                <div key={field} className="flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-center" style={{ color: s.linkedArmorName ? color : '#4a6a8a' }}>
                    {s[field] ?? 0}
                  </span>
                </div>
              ))}

              {/* Worn toggle */}
              <div className="flex justify-center">
                <input type="checkbox" checked={!!s.worn} onChange={e => toggleWorn(key, e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#22cc22' }} />
              </div>
            </div>
          );
        })}
      </div>

      {showRef && <ArmorRefModal onSelect={addFromRef} onClose={() => setShowRef(false)} />}
    </div>
  );
}
