import { useState } from "react";
import { SETTLERS_AMMO, WANDERERS_AMMO, WANDERERS_ARMOR, CORE_AMMO, CORE_APPAREL, CORE_ARMOR, CORE_POWER_ARMOR } from "../../lib/falloutData";

const ALL_AMMO = [
  ...CORE_AMMO,
  ...SETTLERS_AMMO,
  ...WANDERERS_AMMO,
];

const ARMOR_TYPE_ORDER = ['Headgear', 'Clothing', 'Outfit', 'Dog Armor', 'Raider', 'Leather', 'Metal', 'Combat', 'Synth', 'Vault-Tec Security', 'Raider Power', 'T-45', 'T-51', 'T-60', 'X-01', 'Power Armor (Wanderers)'];

// Build all armor items, grouped by set or type
const ALL_ARMOR_GROUPS = (() => {
  const groups = {};
  const add = (key, item) => { if (!groups[key]) groups[key] = []; groups[key].push(item); };
  CORE_APPAREL.forEach(a => add(a.type, a));
  CORE_ARMOR.forEach(a => add(a.set, a));
  CORE_POWER_ARMOR.forEach(a => add(a.set === 'Frame' ? 'T-45' : a.set, a)); // Frame goes with T-45 section
  WANDERERS_ARMOR.forEach(a => add(a.type === 'Power Armor' ? 'Power Armor (Wanderers)' : a.type, a));
  return groups;
})();

const POWER_ARMOR_SETS = new Set(['Raider Power', 'T-45', 'T-51', 'T-60', 'X-01', 'Power Armor (Wanderers)']);

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
          <p className="text-sm font-bold tracking-widest" style={{ color: '#f5c518' }}>ARMOR REFERENCE — Click to Add</p>
          <div className="flex items-center gap-3">
            <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search..."
              style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none', padding: '3px 8px', fontSize: '11px', width: '120px' }}
              onClick={e => e.stopPropagation()} />
            <button onClick={onClose} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>✕</button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {ARMOR_TYPE_ORDER.map(type => {
            const sectionItems = (ALL_ARMOR_GROUPS[type] || []).filter(a => !lower || a.label.toLowerCase().includes(lower));
            if (!sectionItems.length) return null;
            const isPowerArmor = POWER_ARMOR_SETS.has(type);
            return (
              <div key={type}>
                <div className="px-4 py-1.5 sticky top-0" style={{ background: isPowerArmor ? '#0d1a0d' : '#091525', borderBottom: '1px solid #1e3a5f', zIndex: 1 }}>
                  <p className="text-[10px] font-bold tracking-widest" style={{ color: isPowerArmor ? '#f5a818' : '#4a6a8a' }}>
                    {isPowerArmor ? `⚡ POWER ARMOR — ${type.toUpperCase()}` : type.toUpperCase()}
                  </p>
                  {isPowerArmor && type === 'T-45' && (
                    <p className="text-[9px] font-mono" style={{ color: '#4a6a8a' }}>Requires Armor Frame. STR 11 while worn. Ablative HP. Fusion Core powered.</p>
                  )}
                </div>
                {sectionItems.map((a, i) => {
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
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>{(a.locations || []).join(', ')}</span>
                        {a.special && <span className="text-[10px] font-mono italic" style={{ color: '#6a8a9a' }}>{a.special}</span>}
                      </div>
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

function ammoWeightNum(w) {
  if (!w || w === '<1') return 0.1;
  return parseFloat(w) || 0;
}

function rarityDot(rarity) {
  let color = '#6a8a9a';
  if (rarity === 3) color = '#22cc22';
  else if (rarity === 4) color = '#4488ff';
  else if (rarity >= 5) color = '#f5c518';
  return <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: color, marginRight: 4, flexShrink: 0 }} />;
}

function parseInventory(str) {
  try { return JSON.parse(str || '[]'); } catch { return []; }
}

const EMPTY_ITEM = { name: '', quantity: 1, weight: 0, notes: '' };
const EMPTY_AMMO = { type: '', quantity: 10 };

export default function GearTab({ character, updateField }) {
  const [items, setItems] = useState(() => parseInventory(character.inventory));
  const [ammoList, setAmmoList] = useState(() => parseInventory(character.ammo_inventory));
  const [caps, setCaps] = useState(character.caps || 0);
  const [armorList, setArmorList] = useState(() => parseInventory(character.armor_equipped));
  const [showArmorRef, setShowArmorRef] = useState(false);

  const saveArmor = (updated) => {
    setArmorList(updated);
    updateField({ armor_equipped: JSON.stringify(updated) });
  };
  const addArmorFromRef = (a) => {
    saveArmor([...armorList, { name: a.label, physRes: a.physRes, enerRes: a.enerRes, radRes: a.radRes, locations: (a.locations || []).join(', '), special: a.special || '', hp: a.hp || null, source: a.source }]);
    setShowArmorRef(false);
  };
  const removeArmor = (i) => saveArmor(armorList.filter((_, idx) => idx !== i));

  const saveItems = (updated) => {
    setItems(updated);
    const w = updated.reduce((s, i) => s + (parseFloat(i.weight) || 0) * (parseInt(i.quantity) || 1), 0);
    const ammoW = ammoList.reduce((s, a) => {
      const def = ALL_AMMO.find(x => x.label === a.type);
      return s + ammoWeightNum(def?.weight) * (parseInt(a.quantity) || 0);
    }, 0);
    updateField({ inventory: JSON.stringify(updated), encumbrance: parseFloat((w + ammoW).toFixed(1)) });
  };

  const saveAmmo = (updated) => {
    setAmmoList(updated);
    const ammoW = updated.reduce((s, a) => {
      const def = ALL_AMMO.find(x => x.label === a.type);
      return s + ammoWeightNum(def?.weight) * (parseInt(a.quantity) || 0);
    }, 0);
    const itemW = items.reduce((s, i) => s + (parseFloat(i.weight) || 0) * (parseInt(i.quantity) || 1), 0);
    updateField({ ammo_inventory: JSON.stringify(updated), encumbrance: parseFloat((itemW + ammoW).toFixed(1)) });
  };

  const saveCaps = (val) => { setCaps(val); updateField({ caps: val }); };

  const addItem = () => saveItems([...items, { ...EMPTY_ITEM }]);
  const removeItem = (i) => saveItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, field, val) => saveItems(items.map((item, idx) => idx === i ? { ...item, [field]: val } : item));

  const addAmmo = () => saveAmmo([...ammoList, { ...EMPTY_AMMO }]);
  const removeAmmo = (i) => saveAmmo(ammoList.filter((_, idx) => idx !== i));
  const updateAmmo = (i, field, val) => saveAmmo(ammoList.map((a, idx) => idx === i ? { ...a, [field]: val } : a));

  const itemWeight = items.reduce((s, i) => s + (parseFloat(i.weight) || 0) * (parseInt(i.quantity) || 1), 0);
  const ammoWeight = ammoList.reduce((s, a) => {
    const def = ALL_AMMO.find(x => x.label === a.type);
    return s + ammoWeightNum(def?.weight) * (parseInt(a.quantity) || 0);
  }, 0);
  const totalWeight = itemWeight + ammoWeight;
  const carryWeight = character.carry_weight || 150;

  return (
    <div className="p-4" style={{ color: '#a8c8d8' }}>
      {/* Caps */}
      <div className="flex items-center gap-3 mb-4 p-3" style={{ background: '#1a1500', border: '1px solid #f5c518' }}>
        <span className="text-base font-bold" style={{ color: '#f5c518' }}>💰 CAPS</span>
        <input type="number" value={caps} onChange={e => saveCaps(parseInt(e.target.value) || 0)}
          style={{ width: '80px', background: '#060f1c', border: '1px solid #f5c518', color: '#f5c518', outline: 'none', padding: '4px 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}
        />
      </div>

      {/* Ammunition Section */}
      <div className="mb-5 p-3" style={{ background: '#0a1525', border: '1px solid #1e3a5f' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>AMMUNITION ({ammoList.length})</p>
          <button onClick={addAmmo} className="text-xs px-3 py-1 font-bold"
            style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>
            + ADD AMMO
          </button>
        </div>
        {ammoList.length === 0 ? (
          <p className="text-xs font-mono text-center py-2" style={{ color: '#4a6a8a' }}>No ammo tracked.</p>
        ) : (
          <>
            <div className="grid gap-2 mb-1" style={{ gridTemplateColumns: '1fr 60px 28px' }}>
              {['AMMO TYPE', 'QTY', ''].map((h, i) => (
                <span key={i} className="text-[10px]" style={{ color: '#4a6a8a' }}>{h}</span>
              ))}
            </div>
            {ammoList.map((a, i) => {
              const def = ALL_AMMO.find(x => x.label === a.type);
              return (
                <div key={i} className="grid gap-2 items-center py-1" style={{ gridTemplateColumns: '1fr 60px 28px', borderBottom: '1px solid #0d2137' }}>
                  <div className="flex items-center gap-1">
                    {def && rarityDot(def.rarity)}
                    <select value={a.type} onChange={e => updateAmmo(i, 'type', e.target.value)}
                      style={{ flex: 1, background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 4px', fontSize: '11px' }}>
                      <option value="">— select —</option>
                      <optgroup label="Core">
                        {CORE_AMMO.map(am => <option key={am.key} value={am.label}>{am.label}</option>)}
                      </optgroup>
                      <optgroup label="Settlers Supplement">
                        {SETTLERS_AMMO.map(am => <option key={am.key} value={am.label}>{am.label}</option>)}
                      </optgroup>
                      <optgroup label="Wanderers Supplement">
                        {WANDERERS_AMMO.map(am => <option key={am.key} value={am.label}>{am.label}{am.note ? ` — ${am.note}` : ''}</option>)}
                      </optgroup>
                    </select>
                  </div>
                  <input type="number" value={a.quantity} onChange={e => updateAmmo(i, 'quantity', parseInt(e.target.value) || 0)}
                    style={{ width: '100%', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 4px', fontSize: '11px', textAlign: 'center' }}
                  />
                  <button onClick={() => removeAmmo(i)} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
                </div>
              );
            })}
            <p className="text-[10px] font-mono mt-2" style={{ color: '#4a6a8a' }}>Ammo weight: {ammoWeight.toFixed(1)} lbs</p>
          </>
        )}
      </div>

      {/* Armor Section */}
      <div className="mb-5 p-3" style={{ background: '#0a1525', border: '1px solid #1e3a5f' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>EQUIPPED ARMOR ({armorList.length})</p>
          <button onClick={() => setShowArmorRef(true)} className="text-xs px-3 py-1 font-bold"
            style={{ background: '#0a1525', border: '1px solid #4a6a8a', color: '#a8c8d8', cursor: 'pointer' }}>
            📋 Add from Reference
          </button>
        </div>
        {armorList.length === 0 ? (
          <p className="text-xs font-mono text-center py-2" style={{ color: '#4a6a8a' }}>No armor equipped.</p>
        ) : (
          armorList.map((a, i) => (
            <div key={i} className="p-2 mb-1.5" style={{ background: '#060f1c', border: '1px solid #1e3a5f' }}>
              <div className="flex items-center justify-between">
                <span className="font-heading font-semibold text-sm" style={{ color: '#e8e8e8' }}>{a.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono" style={{ color: '#22cc22' }}>P:{a.physRes} E:{a.enerRes} R:{a.radRes}{a.hp ? ` HP:${a.hp}` : ''}</span>
                  <button onClick={() => removeArmor(i)} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
                </div>
              </div>
              <div className="flex gap-2 mt-0.5">
                {a.locations && <span className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>{a.locations}</span>}
                {a.special && <span className="text-[10px] font-mono italic" style={{ color: '#6a8a9a' }}>{a.special}</span>}
              </div>
            </div>
          ))
        )}
      </div>

      {showArmorRef && <ArmorRefModal onSelect={addArmorFromRef} onClose={() => setShowArmorRef(false)} />}

      {/* Weight summary */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>INVENTORY ({items.length} items)</p>
        <span className="text-xs font-mono" style={{ color: totalWeight > carryWeight ? '#cc4444' : '#22cc22' }}>
          {totalWeight > carryWeight ? '⚠ OVER LIMIT: ' : ''}Weight: {totalWeight.toFixed(1)} / {carryWeight} lbs
        </span>
        <button onClick={addItem} className="text-xs px-3 py-1 font-bold"
          style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>
          + ADD ITEM
        </button>
      </div>

      {/* Inventory Header */}
      <div className="grid gap-2 mb-1" style={{ gridTemplateColumns: '1fr 45px 55px 1fr 30px' }}>
        {['ITEM NAME', 'QTY', 'WEIGHT', 'NOTES', ''].map((h, i) => (
          <span key={i} className="text-[10px]" style={{ color: '#4a6a8a' }}>{h}</span>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8" style={{ color: '#4a6a8a' }}>
          <p className="font-mono text-sm">Inventory empty.</p>
        </div>
      ) : (
        items.map((item, i) => (
          <div key={i} className="grid gap-2 items-center py-1.5" style={{ gridTemplateColumns: '1fr 45px 55px 1fr 30px', borderBottom: '1px solid #0d2137' }}>
            <input value={item.name} onChange={e => updateItem(i, 'name', e.target.value)}
              placeholder="Item name"
              style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: '11px', width: '100%' }}
            />
            <input type="number" value={item.quantity} onChange={e => updateItem(i, 'quantity', parseInt(e.target.value) || 1)}
              style={{ width: '100%', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 4px', fontSize: '11px', textAlign: 'center' }}
            />
            <input type="number" value={item.weight} onChange={e => updateItem(i, 'weight', parseFloat(e.target.value) || 0)}
              step="0.1"
              style={{ width: '100%', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 4px', fontSize: '11px', textAlign: 'center' }}
            />
            <input value={item.notes} onChange={e => updateItem(i, 'notes', e.target.value)}
              placeholder="notes..."
              style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: '11px', width: '100%' }}
            />
            <button onClick={() => removeItem(i)} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
          </div>
        ))
      )}
    </div>
  );
}