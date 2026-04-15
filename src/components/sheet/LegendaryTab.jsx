import { useState } from "react";
import CombatDiceDisplay from "../ui/CombatDiceDisplay";
import {
  LEGENDARY_WEAPON_PROPERTIES, LEGENDARY_ARMOR_PROPERTIES,
  RARE_BOOKS
} from "../../lib/falloutData";
import { CORE_WEAPONS, CORE_APPAREL, CORE_ARMOR, CORE_POWER_ARMOR } from "../../lib/sourceTruthData";

const WEAPON_TYPES = ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'];
const ARMOR_SLOTS = ['Head', 'Arm', 'Torso', 'Leg'];
const ALL_WEAPON_REF = [...CORE_WEAPONS];
const ALL_ARMOR_REF = [...CORE_APPAREL, ...CORE_ARMOR, ...CORE_POWER_ARMOR];

function parse(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

function WeaponRefModal({ onSelect, onClose }) {
  const [filter, setFilter] = useState('');
  const lower = filter.toLowerCase();
  const filtered = ALL_WEAPON_REF.filter(w => !lower || w.label.toLowerCase().includes(lower));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <div className="w-full max-w-xl max-h-[75vh] flex flex-col m-4" style={{ background: '#0d2137', border: '2px solid #f5c518' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
          <p className="text-sm font-bold tracking-widest" style={{ color: '#f5c518' }}>WEAPON REFERENCE</p>
          <div className="flex gap-2 items-center">
            <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search..." onClick={e => e.stopPropagation()}
              style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none', padding: '3px 8px', fontSize: '11px', width: '110px' }} />
            <button onClick={onClose} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>✕</button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {filtered.map((w, i) => (
            <button key={i} onClick={() => onSelect(w)} className="w-full px-4 py-2 text-left hover:opacity-80"
              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #091525', cursor: 'pointer' }}>
              <div className="flex items-center justify-between">
                <span className="font-heading font-semibold text-sm" style={{ color: '#e8e8e8' }}>{w.label}</span>
                <div className="flex gap-2">
                  <CombatDiceDisplay value={w.damage} />
                  <span className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>{w.type}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArmorRefModal({ onSelect, onClose }) {
  const [filter, setFilter] = useState('');
  const lower = filter.toLowerCase();
  const filtered = ALL_ARMOR_REF.filter(a => !lower || a.label.toLowerCase().includes(lower));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <div className="w-full max-w-xl max-h-[75vh] flex flex-col m-4" style={{ background: '#0d2137', border: '2px solid #f5c518' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
          <p className="text-sm font-bold tracking-widest" style={{ color: '#f5c518' }}>ARMOR REFERENCE</p>
          <div className="flex gap-2 items-center">
            <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search..." onClick={e => e.stopPropagation()}
              style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none', padding: '3px 8px', fontSize: '11px', width: '110px' }} />
            <button onClick={onClose} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>✕</button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {filtered.map((a, i) => (
            <button key={i} onClick={() => onSelect(a)} className="w-full px-4 py-2 text-left hover:opacity-80"
              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #091525', cursor: 'pointer' }}>
              <div className="flex items-center justify-between">
                <span className="font-heading font-semibold text-sm" style={{ color: '#e8e8e8' }}>{a.label}</span>
                <span className="text-xs font-mono" style={{ color: '#22cc22' }}>P:{a.physRes} E:{a.enerRes} R:{a.radRes}</span>
              </div>
              <p className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>{a.type} — {(a.locations || []).join(', ')}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LegendaryItemRow({ item, index, onChange, onRemove }) {
  const [showWeaponRef, setShowWeaponRef] = useState(false);
  const [showArmorRef, setShowArmorRef] = useState(false);

  const isArmor = ARMOR_SLOTS.includes(item.subType);
  const isWeapon = WEAPON_TYPES.includes(item.subType);

  const availableProps = item.subType
    ? (isArmor
        ? LEGENDARY_ARMOR_PROPERTIES.filter(p => p.appliesTo.includes(item.subType))
        : LEGENDARY_WEAPON_PROPERTIES.filter(p => p.appliesTo.includes(item.subType)))
    : [];

  const selectedProp = availableProps.find(p => p.key === item.legendaryKey);

  const update = (field, val) => onChange({ ...item, [field]: val });

  const selectSubType = (val) => onChange({ ...item, subType: val, legendaryKey: '' });

  return (
    <div className="p-3 mb-2" style={{ background: '#0a1a2d', border: '2px solid rgba(245,197,24,0.4)' }}>
      {/* Row 1: name + type + ref button + remove */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-[10px] font-bold" style={{ color: '#f5c518' }}>#{index + 1}</span>
        <input value={item.name || ''} onChange={e => update('name', e.target.value)}
          placeholder="Item name..."
          style={{ flex: 1, minWidth: '120px', background: '#060f1c', border: '1px solid #f5c518', color: '#f5c518', outline: 'none', padding: '3px 6px', fontSize: '12px', fontWeight: 'bold' }} />
        <select value={item.subType || ''} onChange={e => selectSubType(e.target.value)}
          style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', fontSize: '11px', padding: '3px 4px' }}>
          <option value="">— type —</option>
          <optgroup label="Weapons">
            {WEAPON_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </optgroup>
          <optgroup label="Armor Slots">
            {ARMOR_SLOTS.map(s => <option key={s} value={s}>{s} (Armor)</option>)}
          </optgroup>
        </select>
        <button onClick={() => isArmor ? setShowArmorRef(true) : setShowWeaponRef(true)}
          className="text-[10px] px-2 py-1 font-bold"
          style={{ background: '#1a1500', border: '1px solid rgba(245,197,24,0.4)', color: '#f5c518', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          📋 Ref
        </button>
        <button onClick={onRemove} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>✕</button>
      </div>

      {/* Row 2: Legendary property select */}
      {item.subType && (
        <div className="mb-2">
          <select value={item.legendaryKey || ''} onChange={e => update('legendaryKey', e.target.value)}
            style={{ width: '100%', background: '#060f1c', border: '1px solid rgba(245,197,24,0.5)', color: '#f5c518', fontSize: '11px', padding: '4px 6px', fontWeight: 'bold' }}>
            <option value="">— Select Legendary Property —</option>
            {availableProps.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
        </div>
      )}

      {/* Property description */}
      {selectedProp && (
        <div className="mb-2 px-3 py-2" style={{ background: 'rgba(245,197,24,0.06)', border: '1px solid rgba(245,197,24,0.2)' }}>
          <p className="text-[10px] font-mono" style={{ color: '#f5c518' }}>{selectedProp.description}</p>
          {isArmor && (
            <p className="text-[10px] font-mono mt-1" style={{ color: '#22cc22' }}>+1 Physical DR, +1 Energy DR on this piece. Rarity +2, Cost ×5.</p>
          )}
          {isWeapon && (
            <p className="text-[10px] font-mono mt-1" style={{ color: '#22cc22' }}>Rarity +2, Cost ×5.</p>
          )}
        </div>
      )}

      {/* Notes */}
      <input value={item.notes || ''} onChange={e => update('notes', e.target.value)}
        placeholder="Notes (e.g. base weapon, found location)..."
        style={{ width: '100%', background: '#060f1c', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none', padding: '3px 6px', fontSize: '11px' }} />

      {showWeaponRef && (
        <WeaponRefModal
          onSelect={w => { update('name', w.label); setShowWeaponRef(false); }}
          onClose={() => setShowWeaponRef(false)}
        />
      )}
      {showArmorRef && (
        <ArmorRefModal
          onSelect={a => { update('name', a.label); setShowArmorRef(false); }}
          onClose={() => setShowArmorRef(false)}
        />
      )}
    </div>
  );
}

function BookPickerModal({ foundRolls, onToggle, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col m-4" style={{ background: '#0d2137', border: '2px solid #22cc22' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
          <p className="text-sm font-bold tracking-widest" style={{ color: '#22cc22' }}>RARE BOOKS & HOLOTAPES — Toggle to Mark as Found</p>
          <button onClick={onClose} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>✕</button>
        </div>
        <div className="overflow-y-auto flex-1 p-3 space-y-2">
          {RARE_BOOKS.map(book => {
            const found = foundRolls.includes(book.roll);
            return (
              <button key={book.roll} onClick={() => onToggle(book.roll)}
                className="w-full text-left p-3 transition-all"
                style={{ background: found ? 'rgba(34,204,34,0.08)' : '#0a1525', border: `1px solid ${found ? '#22cc22' : '#1e3a5f'}`, cursor: 'pointer' }}>
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono font-bold flex-shrink-0 w-7 text-center mt-0.5 py-0.5"
                    style={{ background: found ? '#0a2a0a' : '#060f1c', border: `1px solid ${found ? '#22cc22' : '#1e3a5f'}`, color: found ? '#22cc22' : '#4a6a8a' }}>
                    {book.roll}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-semibold text-sm" style={{ color: found ? '#22cc22' : '#e8e8e8' }}>{book.title}</span>
                      {found && <span className="text-[9px] font-bold px-1.5 py-0.5" style={{ background: 'rgba(34,204,34,0.15)', border: '1px solid #22cc22', color: '#22cc22' }}>FOUND</span>}
                    </div>
                    <p className="text-[10px] font-bold mt-0.5" style={{ color: '#f5c518' }}>Perk: {book.perk}</p>
                    <p className="text-[10px] font-mono mt-0.5" style={{ color: '#6a8a9a' }}>{book.perkDescription}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function LegendaryTab({ character, updateField }) {
  const [legendaryItems, setLegendaryItems] = useState(() => parse(character.legendary_items, []));
  const [foundBooks, setFoundBooks] = useState(() => parse(character.rare_books_found, []));
  const [showBookPicker, setShowBookPicker] = useState(false);

  const saveLegendary = (updated) => {
    setLegendaryItems(updated);
    updateField({ legendary_items: JSON.stringify(updated) });
  };

  const addItem = () => saveLegendary([...legendaryItems, { name: '', subType: '', legendaryKey: '', notes: '' }]);
  const removeItem = (i) => saveLegendary(legendaryItems.filter((_, idx) => idx !== i));
  const updateItem = (i, data) => saveLegendary(legendaryItems.map((item, idx) => idx === i ? data : item));

  const toggleBook = (roll) => {
    const updated = foundBooks.includes(roll) ? foundBooks.filter(r => r !== roll) : [...foundBooks, roll];
    setFoundBooks(updated);
    updateField({ rare_books_found: JSON.stringify(updated) });
  };

  const foundBookDetails = RARE_BOOKS.filter(b => foundBooks.includes(b.roll));

  return (
    <div style={{ color: '#a8c8d8' }}>
      {/* Legendary Items Section */}
      <div style={{ borderBottom: '2px solid #f5c518' }}>
        <div className="px-4 py-3" style={{ background: '#1a1500', borderBottom: '1px solid rgba(245,197,24,0.3)' }}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>⚡ LEGENDARY ITEMS ({legendaryItems.length})</p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: '#6a8a9a' }}>Legendary items increase rarity by 2 and multiply cost × 5. Armor also gains +1 Physical and +1 Energy DR per piece.</p>
            </div>
            <button onClick={addItem} className="text-xs px-3 py-1.5 font-bold"
              style={{ background: '#1a1500', border: '1px solid #f5c518', color: '#f5c518', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              + ADD LEGENDARY ITEM
            </button>
          </div>
        </div>
        <div className="p-4">
          {legendaryItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-mono text-sm" style={{ color: '#4a6a8a' }}>No legendary items carried.</p>
              <p className="text-[10px] font-mono mt-1" style={{ color: '#2a4a6a' }}>These are rare, one-of-a-kind items with unique properties.</p>
            </div>
          ) : (
            legendaryItems.map((item, i) => (
              <LegendaryItemRow key={i} item={item} index={i}
                onChange={data => updateItem(i, data)}
                onRemove={() => removeItem(i)} />
            ))
          )}
        </div>
      </div>

      {/* Rare Books Section */}
      <div>
        <div className="px-4 py-3" style={{ background: '#0a1a0a', borderBottom: '1px solid rgba(34,204,34,0.3)' }}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-xs font-bold tracking-widest" style={{ color: '#22cc22' }}>📚 RARE BOOKS & HOLOTAPES ({foundBooks.length}/20)</p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: '#6a8a9a' }}>Discovered books unlock special perks available in the character builder.</p>
            </div>
            <button onClick={() => setShowBookPicker(true)} className="text-xs px-3 py-1.5 font-bold"
              style={{ background: '#0a2a0a', border: '1px solid #22cc22', color: '#22cc22', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              📋 Manage Found Books
            </button>
          </div>
        </div>
        <div className="p-4">
          {foundBookDetails.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-mono text-sm" style={{ color: '#4a6a8a' }}>No rare books found.</p>
              <p className="text-[10px] font-mono mt-1" style={{ color: '#2a4a6a' }}>Roll d20 on the Rare Books table or discover them during play.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {foundBookDetails.map(book => (
                <div key={book.roll} className="p-3" style={{ background: 'rgba(34,204,34,0.06)', border: '1px solid rgba(34,204,34,0.3)' }}>
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold flex-shrink-0 w-7 text-center py-0.5"
                      style={{ background: '#0a2a0a', border: '1px solid #22cc22', color: '#22cc22' }}>{book.roll}</span>
                    <div>
                      <p className="font-heading font-semibold text-sm" style={{ color: '#22cc22' }}>{book.title}</p>
                      <p className="text-[10px] font-bold mt-0.5" style={{ color: '#f5c518' }}>Unlocks: {book.perk}</p>
                      <p className="text-[10px] font-mono mt-0.5" style={{ color: '#6a8a9a' }}>{book.perkDescription}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showBookPicker && (
        <BookPickerModal foundRolls={foundBooks} onToggle={toggleBook} onClose={() => setShowBookPicker(false)} />
      )}
    </div>
  );
}
