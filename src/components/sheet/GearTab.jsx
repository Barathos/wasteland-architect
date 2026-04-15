import { useState } from "react";
import ConsumablesPanel from "./ConsumablesPanel";
import { SETTLERS_AMMO, WANDERERS_AMMO } from "../../lib/falloutData";
import { CORE_AMMO } from "../../lib/sourceTruthData";

const ALL_AMMO = [
  ...CORE_AMMO,
  ...SETTLERS_AMMO,
  ...WANDERERS_AMMO,
];

const AMMO_DEFAULT_SHOTS_PER_UNIT = {
  'Fusion Cell': 20,
};

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
const EMPTY_AMMO = { type: '', quantity: 1, shotsPerUnit: 1 };

function pickAmmoShots(entry) {
  const candidate = parseInt(entry?.shotsPerUnit ?? entry?.shots_per_unit ?? entry?.shots, 10);
  return Number.isFinite(candidate) ? candidate : NaN;
}

function normalizeAmmoEntry(entry) {
  const quantity = parseInt(entry?.quantity, 10);
  const normalizedQuantity = Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
  const fallbackShots = AMMO_DEFAULT_SHOTS_PER_UNIT[entry?.type] || 1;
  const rawShots = pickAmmoShots(entry);
  const normalizedShots = Number.isFinite(rawShots) && rawShots > 0 ? rawShots : fallbackShots;
  return {
    ...entry,
    type: entry?.type || '',
    quantity: normalizedQuantity,
    shotsPerUnit: normalizedShots,
  };
}

function StartingEquipmentSection({ character }) {
  const [open, setOpen] = useState(false);

  const weapons = parseInventory(character.equipment).filter(i => i.source === 'starting_equipment');
  const ammo = parseInventory(character.ammo_inventory).filter(i => i.source === 'starting_equipment');
  const armor = parseInventory(character.armor_equipped).filter(i => i.source === 'starting_equipment');
  const chems = parseInventory(character.chems_inventory).filter(i => i.source === 'starting_equipment');
  const food = parseInventory(character.food_inventory).filter(i => i.source === 'starting_equipment');
  const misc = parseInventory(character.miscellany).filter(i => i.source === 'starting_equipment');

  const allItems = [
    ...weapons.map(i => ({ ...i, cat: 'Weapon' })),
    ...ammo.map(i => ({ ...i, name: i.type || i.name, cat: 'Ammo' })),
    ...armor.map(i => ({ ...i, cat: 'Armor' })),
    ...chems.map(i => ({ ...i, name: i.label || i.name, cat: 'Consumable' })),
    ...food.map(i => ({ ...i, name: i.label || i.name, cat: 'Food' })),
    ...misc.map(i => ({ ...i, cat: 'Misc' })),
  ];

  if (!character.sub_origin && allItems.length === 0) return null;

  return (
    <div className="mb-4" style={{ border: '1px solid #1e3a5f' }}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 text-left"
        style={{ background: '#06111f' }}>
        <span className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>
          ★ STARTING EQUIPMENT {character.sub_origin ? `— ${character.sub_origin.replace(/_/g, ' ').toUpperCase()}` : ''}
        </span>
        <span className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>{open ? '▲' : '▼'} {allItems.length} items</span>
      </button>
      {open && (
        <div className="px-3 py-2" style={{ background: 'rgba(6,17,31,0.6)' }}>
          {allItems.length === 0 ? (
            <p className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>No starting gear recorded.</p>
          ) : (
            <div className="space-y-1">
              {allItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs font-mono" style={{ color: '#a8c8d8' }}>{item.name}</span>
                  <div className="flex items-center gap-2">
                    {item.quantity > 1 && <span className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>×{item.quantity}</span>}
                    <span className="text-[9px] font-mono px-1 py-0.5" style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.2)', color: '#f5c518' }}>{item.cat}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GearTab({ character, updateField }) {
  const [items, setItems] = useState(() => parseInventory(character.inventory));
  const [ammoList, setAmmoList] = useState(() => parseInventory(character.ammo_inventory).map(normalizeAmmoEntry));
  const [caps, setCaps] = useState(character.caps || 0);

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
  const updateAmmo = (i, field, val) => {
    const updated = ammoList.map((a, idx) => {
      if (idx !== i) return a;
      if (field === 'type') {
        const fallbackShots = AMMO_DEFAULT_SHOTS_PER_UNIT[val] || 1;
        const currentShots = parseInt(a.shotsPerUnit, 10) || 1;
        const shouldResetShots = !a.type || currentShots === (AMMO_DEFAULT_SHOTS_PER_UNIT[a.type] || 1);
        return { ...a, type: val, shotsPerUnit: shouldResetShots ? fallbackShots : currentShots };
      }
      return { ...a, [field]: val };
    });
    saveAmmo(updated.map(normalizeAmmoEntry));
  };

  const itemWeight = items.reduce((s, i) => s + (parseFloat(i.weight) || 0) * (parseInt(i.quantity) || 1), 0);
  const ammoWeight = ammoList.reduce((s, a) => {
    const def = ALL_AMMO.find(x => x.label === a.type);
    return s + ammoWeightNum(def?.weight) * (parseInt(a.quantity) || 0);
  }, 0);
  const totalWeight = itemWeight + ammoWeight;
  const carryWeight = character.carry_weight || 150;

  return (
    <div className="p-4" style={{ color: '#a8c8d8' }}>
      {/* Starting Equipment */}
      <StartingEquipmentSection character={character} />

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
            <div className="grid gap-2 mb-1" style={{ gridTemplateColumns: '1fr 60px 70px 28px' }}>
              {['AMMO TYPE', 'QTY', 'SHOTS', ''].map((h, i) => (
                <span key={i} className="text-[10px]" style={{ color: '#4a6a8a' }}>{h}</span>
              ))}
            </div>
            {ammoList.map((a, i) => {
              const def = ALL_AMMO.find(x => x.label === a.type);
              const totalShots = (parseInt(a.quantity, 10) || 0) * (parseInt(a.shotsPerUnit, 10) || 0);
              return (
                <div key={i} className="grid gap-2 items-center py-1" style={{ gridTemplateColumns: '1fr 60px 70px 28px', borderBottom: '1px solid #0d2137' }}>
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
                  <div>
                    <input type="number" value={a.shotsPerUnit} onChange={e => updateAmmo(i, 'shotsPerUnit', parseInt(e.target.value) || 1)}
                      style={{ width: '100%', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 4px', fontSize: '11px', textAlign: 'center' }}
                    />
                    <div className="text-[9px] font-mono text-center mt-0.5" style={{ color: '#4a6a8a' }}>
                      {totalShots} total
                    </div>
                  </div>
                  <button onClick={() => removeAmmo(i)} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
                </div>
              );
            })}
            <p className="text-[10px] font-mono mt-2" style={{ color: '#4a6a8a' }}>Ammo weight: {ammoWeight.toFixed(1)} lbs</p>
          </>
        )}
      </div>

      {/* Consumables */}
      <ConsumablesPanel character={character} updateField={updateField} />

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
