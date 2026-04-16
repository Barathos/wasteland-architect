import { useState } from "react";
import ConsumablesPanel from "./ConsumablesPanel";
import { CORE_AMMO, CORE_WEAPON_MODS, CORE_APPAREL_MODS } from "../../lib/sourceTruthData";

const ALL_AMMO = [...CORE_AMMO];
const AMMO_BY_SOURCE = ALL_AMMO.reduce((acc, ammo) => {
  const key = ammo?.source || 'Core';
  if (!acc[key]) acc[key] = [];
  acc[key].push(ammo);
  return acc;
}, {});

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
const EMPTY_MOD = { key: '', name: '', modCategory: 'weapon', modType: '', quantity: 1, weight: 0, source: 'Core', note: '', effect: '', perks: '' };

function normalizeName(input = '') {
  return String(input).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function sortByLabel(a, b) {
  return String(a?.label || '').localeCompare(String(b?.label || ''));
}

const REF_WEAPON_MODS = [...CORE_WEAPON_MODS].sort(sortByLabel);
const REF_APPAREL_MODS = [...CORE_APPAREL_MODS].sort(sortByLabel);

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

function getModDescription(mod = {}) {
  const textParts = [mod.effect, mod.summary, mod.note].filter((value) => String(value || '').trim().length > 0);
  if (textParts.length > 0) return textParts.join(' ').trim();

  const parts = [];

  const pushSigned = (value, label) => {
    const num = Number(value || 0);
    if (!Number.isFinite(num) || num === 0) return;
    const sign = num > 0 ? '+' : '';
    parts.push(`${sign}${num} ${label}`);
  };

  if (Array.isArray(mod.addQualities) && mod.addQualities.length > 0) {
    parts.push(`Adds qualities: ${mod.addQualities.join(', ')}`);
  }
  if (Array.isArray(mod.removeQualities) && mod.removeQualities.length > 0) {
    parts.push(`Removes qualities: ${mod.removeQualities.join(', ')}`);
  }
  if (Array.isArray(mod.addEffects) && mod.addEffects.length > 0) {
    parts.push(`Adds effects: ${mod.addEffects.join(', ')}`);
  }
  if (Array.isArray(mod.removeEffects) && mod.removeEffects.length > 0) {
    parts.push(`Removes effects: ${mod.removeEffects.join(', ')}`);
  }

  // Weapon mod mechanical fields
  pushSigned(mod.damageDelta, 'CD damage');
  pushSigned(mod.fireRateDelta, 'fire rate');
  pushSigned(mod.rangeDelta, 'range step');

  const damageTypeFlags = mod.damageTypeFlags || {};
  const enabledDamageTypes = Object.entries(damageTypeFlags)
    .filter(([, enabled]) => Boolean(enabled))
    .map(([type]) => type.charAt(0).toUpperCase() + type.slice(1));
  if (enabledDamageTypes.length > 0) {
    parts.push(`Damage type: ${enabledDamageTypes.join('/')}`);
  }

  // Apparel mod mechanical fields
  pushSigned(mod.healthDelta, 'armor HP');
  const resist = mod.resistanceDelta || {};
  pushSigned(resist.physical, 'Physical DR');
  pushSigned(resist.energy, 'Energy DR');
  pushSigned(resist.radiation, 'Radiation DR');
  if (mod.shadowed) parts.push('Grants Shadowed');

  return parts.join(' | ').trim();
}

function ModsReferenceModal({ onSelect, onClose }) {
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('weapon');
  const lower = normalizeName(filter);

  const rows = (category === 'weapon' ? REF_WEAPON_MODS : REF_APPAREL_MODS)
    .filter((row) => {
      if (!lower) return true;
      return normalizeName(row.label).includes(lower)
        || normalizeName(row.modType).includes(lower)
        || normalizeName(row.source).includes(lower);
    });

  const grouped = rows.reduce((acc, row) => {
    const key = row.modType || 'Mod';
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <div
        className="w-full max-w-3xl max-h-[85vh] flex flex-col m-4"
        style={{ background: '#0d2137', border: '2px solid #f5c518' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
          <p className="text-sm font-bold tracking-widest" style={{ color: '#f5c518' }}>MOD REFERENCE — Click to Add</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCategory('weapon')}
              className="text-[10px] px-2 py-1 font-bold"
              style={{ background: category === 'weapon' ? 'rgba(68,136,255,0.2)' : '#0a1525', border: '1px solid #1e3a5f', color: category === 'weapon' ? '#6ab0ff' : '#6a8a9a' }}
            >
              Weapon Mods
            </button>
            <button
              onClick={() => setCategory('apparel')}
              className="text-[10px] px-2 py-1 font-bold"
              style={{ background: category === 'apparel' ? 'rgba(34,204,34,0.2)' : '#0a1525', border: '1px solid #1e3a5f', color: category === 'apparel' ? '#22cc22' : '#6a8a9a' }}
            >
              Apparel Mods
            </button>
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search..."
              style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none', padding: '3px 8px', fontSize: '11px', width: '130px' }}
            />
            <button onClick={onClose} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>✕</button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {Object.keys(grouped).sort((a, b) => a.localeCompare(b)).map((slotType) => (
            <div key={slotType}>
              <div className="px-4 py-1.5 sticky top-0" style={{ background: '#091525', borderBottom: '1px solid #1e3a5f', zIndex: 1 }}>
                <p className="text-[10px] font-bold tracking-widest" style={{ color: '#4a6a8a' }}>{slotType.toUpperCase()}</p>
              </div>
              {grouped[slotType].map((mod) => (
                <button
                  key={mod.key}
                  onClick={() => onSelect({ ...mod, modCategory: category })}
                  className="w-full px-4 py-2 text-left hover:opacity-80 transition-opacity"
                  style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #091525', cursor: 'pointer' }}
                  title={getModDescription(mod) || 'No description available yet'}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-heading font-semibold text-sm truncate" style={{ color: '#e8e8e8' }}>{mod.label}</p>
                      <p className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>{mod.perks || 'No perk requirement listed'}</p>
                      <p
                        className="text-[10px] font-mono mt-0.5"
                        style={{ color: '#8fb3c7', lineHeight: 1.35, whiteSpace: 'normal' }}
                      >
                        {getModDescription(mod) || 'No description available yet'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-mono" style={{ color: '#6a9aba' }}>Wt {mod.weight ?? 0}</span>
                      <span className="text-[9px] px-1.5 py-0.5 font-bold" style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.2)', color: '#f5c518' }}>
                        {mod.source || 'Core'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StartingEquipmentSection({ character }) {
  const [open, setOpen] = useState(false);

  const weapons = parseInventory(character.equipment).filter(i => i.source === 'starting_equipment');
  const ammo = parseInventory(character.ammo_inventory).filter(i => i.source === 'starting_equipment');
  const armor = parseInventory(character.armor_equipped).filter(i => i.source === 'starting_equipment');
  const chems = parseInventory(character.chems_inventory).filter(i => i.source === 'starting_equipment');
  const food = parseInventory(character.food_inventory).filter(i => i.source === 'starting_equipment');
  const misc = parseInventory(character.miscellany).filter(i => i.source === 'starting_equipment');
  const mods = parseInventory(character.gear_mods).filter(i => i.source === 'starting_equipment');

  const allItems = [
    ...weapons.map(i => ({ ...i, cat: 'Weapon' })),
    ...ammo.map(i => ({ ...i, name: i.type || i.name, cat: 'Ammo' })),
    ...armor.map(i => ({ ...i, cat: 'Armor' })),
    ...chems.map(i => ({ ...i, name: i.label || i.name, cat: 'Consumable' })),
    ...food.map(i => ({ ...i, name: i.label || i.name, cat: 'Food' })),
    ...misc.map(i => ({ ...i, cat: 'Misc' })),
    ...mods.map(i => ({ ...i, cat: 'Mod' })),
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
  const [modList, setModList] = useState(() => parseInventory(character.gear_mods));
  const [caps, setCaps] = useState(character.caps || 0);
  const [showModsRef, setShowModsRef] = useState(false);

  const modWeightTotal = (mods) => mods.reduce((sum, mod) => {
    const weight = parseFloat(mod?.weight) || 0;
    const qty = parseInt(mod?.quantity, 10) || 0;
    return sum + (weight * qty);
  }, 0);

  const saveItems = (updated) => {
    setItems(updated);
    const w = updated.reduce((s, i) => s + (parseFloat(i.weight) || 0) * (parseInt(i.quantity) || 1), 0);
    const ammoW = ammoList.reduce((s, a) => {
      const def = ALL_AMMO.find(x => x.label === a.type);
      return s + ammoWeightNum(def?.weight) * (parseInt(a.quantity) || 0);
    }, 0);
    updateField({ inventory: JSON.stringify(updated), encumbrance: parseFloat((w + ammoW + modWeightTotal(modList)).toFixed(1)) });
  };

  const saveAmmo = (updated) => {
    setAmmoList(updated);
    const ammoW = updated.reduce((s, a) => {
      const def = ALL_AMMO.find(x => x.label === a.type);
      return s + ammoWeightNum(def?.weight) * (parseInt(a.quantity) || 0);
    }, 0);
    const itemW = items.reduce((s, i) => s + (parseFloat(i.weight) || 0) * (parseInt(i.quantity) || 1), 0);
    updateField({ ammo_inventory: JSON.stringify(updated), encumbrance: parseFloat((itemW + ammoW + modWeightTotal(modList)).toFixed(1)) });
  };

  const saveMods = (updated) => {
    setModList(updated);
    const ammoW = ammoList.reduce((s, a) => {
      const def = ALL_AMMO.find(x => x.label === a.type);
      return s + ammoWeightNum(def?.weight) * (parseInt(a.quantity) || 0);
    }, 0);
    const itemW = items.reduce((s, i) => s + (parseFloat(i.weight) || 0) * (parseInt(i.quantity) || 1), 0);
    updateField({ gear_mods: JSON.stringify(updated), encumbrance: parseFloat((itemW + ammoW + modWeightTotal(updated)).toFixed(1)) });
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

  const addMod = () => saveMods([...modList, { ...EMPTY_MOD }]);
  const removeMod = (idx) => saveMods(modList.filter((_, i) => i !== idx));
  const updateMod = (idx, field, value) => {
    saveMods(modList.map((mod, i) => i === idx ? { ...mod, [field]: value } : mod));
  };

  const addModFromReference = (refMod) => {
    const existingIdx = modList.findIndex((entry) => normalizeName(entry.key) === normalizeName(refMod.key));
    if (existingIdx >= 0) {
      const next = [...modList];
      next[existingIdx] = { ...next[existingIdx], quantity: (parseInt(next[existingIdx].quantity, 10) || 1) + 1 };
      saveMods(next);
    } else {
      saveMods([
        ...modList,
        {
          key: refMod.key || '',
          name: refMod.label || '',
          modCategory: refMod.modCategory || 'weapon',
          modType: refMod.modType || '',
          quantity: 1,
          weight: parseFloat(refMod.weight) || 0,
          source: refMod.source || 'Core',
          note: refMod.note || '',
          effect: refMod.effect || '',
          perks: refMod.perks || '',
        }
      ]);
    }
    setShowModsRef(false);
  };

  const itemWeight = items.reduce((s, i) => s + (parseFloat(i.weight) || 0) * (parseInt(i.quantity) || 1), 0);
  const ammoWeight = ammoList.reduce((s, a) => {
    const def = ALL_AMMO.find(x => x.label === a.type);
    return s + ammoWeightNum(def?.weight) * (parseInt(a.quantity) || 0);
  }, 0);
  const modsWeight = modWeightTotal(modList);
  const totalWeight = itemWeight + ammoWeight + modsWeight;
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
                      {Object.entries(AMMO_BY_SOURCE).map(([source, rows]) => (
                        <optgroup key={source} label={source}>
                          {rows.map(am => <option key={am.key} value={am.label}>{am.label}{am.note ? ` — ${am.note}` : ''}</option>)}
                        </optgroup>
                      ))}
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

      {/* Mods Section */}
      <div className="mb-5 p-3" style={{ background: '#0a1525', border: '1px solid #1e3a5f' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>MODS ({modList.length})</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModsRef(true)}
              className="text-xs px-3 py-1 font-bold"
              style={{ background: '#0a1525', border: '1px solid #4a6a8a', color: '#a8c8d8', cursor: 'pointer' }}
            >
              📋 Add from Reference
            </button>
            <button
              onClick={addMod}
              className="text-xs px-3 py-1 font-bold"
              style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}
            >
              + ADD BLANK
            </button>
          </div>
        </div>

        {modList.length === 0 ? (
          <p className="text-xs font-mono text-center py-2" style={{ color: '#4a6a8a' }}>No weapon/armor mods in inventory.</p>
        ) : (
          <>
            <div className="grid gap-2 mb-1" style={{ gridTemplateColumns: '1fr 90px 60px 45px 28px' }}>
              {['MOD NAME', 'SLOT', 'CATEGORY', 'QTY', ''].map((h, i) => (
                <span key={i} className="text-[10px]" style={{ color: '#4a6a8a' }}>{h}</span>
              ))}
            </div>
            {modList.map((mod, i) => (
              <div key={`${mod.key || mod.name || 'mod'}-${i}`} className="grid gap-2 items-center py-1" style={{ gridTemplateColumns: '1fr 90px 60px 45px 28px', borderBottom: '1px solid #0d2137' }}>
                <input
                  value={mod.name || ''}
                  onChange={(e) => updateMod(i, 'name', e.target.value)}
                  placeholder="Mod name"
                  style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: '11px' }}
                />
                <input
                  value={mod.modType || ''}
                  onChange={(e) => updateMod(i, 'modType', e.target.value)}
                  placeholder="Slot"
                  style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none', padding: '3px 6px', fontSize: '11px' }}
                />
                <select
                  value={mod.modCategory || 'weapon'}
                  onChange={(e) => updateMod(i, 'modCategory', e.target.value)}
                  style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', fontSize: '11px', padding: '3px 4px' }}
                >
                  <option value="weapon">Weapon</option>
                  <option value="apparel">Apparel</option>
                </select>
                <input
                  type="number"
                  value={mod.quantity ?? 1}
                  onChange={(e) => updateMod(i, 'quantity', parseInt(e.target.value, 10) || 0)}
                  style={{ width: '100%', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 4px', fontSize: '11px', textAlign: 'center' }}
                />
                <button onClick={() => removeMod(i)} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
              </div>
            ))}
            <p className="text-[10px] font-mono mt-2" style={{ color: '#4a6a8a' }}>Mods weight: {modsWeight.toFixed(1)} lbs</p>
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
      {showModsRef && <ModsReferenceModal onSelect={addModFromReference} onClose={() => setShowModsRef(false)} />}
    </div>
  );
}
