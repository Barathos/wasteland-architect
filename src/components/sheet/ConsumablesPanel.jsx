import { useState } from "react";
import { CORE_FOOD, CORE_CHEMS, CORE_OTHER_CONSUMABLES } from "../../lib/falloutData";

function parseJ(str) { try { return JSON.parse(str || '[]'); } catch { return []; } }

function RefPickerModal({ title, items, onSelect, onClose, renderItem }) {
  const [filter, setFilter] = useState('');
  const lower = filter.toLowerCase();
  const filtered = items.filter(i => i.label.toLowerCase().includes(lower));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <div className="w-full max-w-xl max-h-[80vh] flex flex-col m-4" style={{ background: '#0d2137', border: '2px solid #f5c518' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
          <p className="text-sm font-bold tracking-widest" style={{ color: '#f5c518' }}>{title} — Click to Add</p>
          <div className="flex items-center gap-3">
            <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search..."
              style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none', padding: '3px 8px', fontSize: '11px', width: '120px' }}
              onClick={e => e.stopPropagation()} />
            <button onClick={onClose} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>✕</button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {filtered.map((item, i) => (
            <button key={i} onClick={() => { onSelect(item); onClose(); }}
              className="w-full px-4 py-2 text-left hover:opacity-80"
              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #091525', cursor: 'pointer' }}>
              {renderItem(item)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ title, color, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-3" style={{ border: `1px solid ${color}44` }}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2"
        style={{ background: '#060f1c', border: 'none', cursor: 'pointer', borderBottom: open ? `1px solid ${color}44` : 'none' }}>
        <span className="text-xs font-bold tracking-widest" style={{ color }}>{title}</span>
        <span className="text-xs" style={{ color }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="p-3">{children}</div>}
    </div>
  );
}

export default function ConsumablesPanel({ character, updateField }) {
  const [foodList, setFoodList] = useState(() => parseJ(character.food_inventory));
  const [chemsList, setChemsList] = useState(() => parseJ(character.chems_inventory));
  const [otherList, setOtherList] = useState(() => parseJ(character.other_consumables_inventory));
  const [activeChems, setActiveChems] = useState(() => parseJ(character.active_chems));
  const [addictions, setAddictions] = useState(() => parseJ(character.character_addictions));
  const [showFoodPicker, setShowFoodPicker] = useState(false);
  const [showChemsPicker, setShowChemsPicker] = useState(false);
  const [showOtherPicker, setShowOtherPicker] = useState(false);

  const saveFood = (updated) => { setFoodList(updated); updateField({ food_inventory: JSON.stringify(updated) }); };
  const saveChems = (updated) => { setChemsList(updated); updateField({ chems_inventory: JSON.stringify(updated) }); };
  const saveOther = (updated) => { setOtherList(updated); updateField({ other_consumables_inventory: JSON.stringify(updated) }); };
  const saveActiveChems = (updated) => { setActiveChems(updated); updateField({ active_chems: JSON.stringify(updated) }); };
  const saveAddictions = (updated) => { setAddictions(updated); updateField({ character_addictions: JSON.stringify(updated) }); };

  const addFood = (item) => saveFood([...foodList, { key: item.key, label: item.label, quantity: 1, ref: item }]);
  const addChem = (item) => saveChems([...chemsList, { key: item.key, label: item.label, quantity: 1, ref: item }]);
  const addOther = (item) => saveOther([...otherList, { key: item.key, label: item.label, quantity: 1, ref: item }]);

  const consumeFood = (i) => {
    const updated = foodList.map((f, idx) => idx === i ? { ...f, quantity: Math.max(0, (f.quantity || 1) - 1) } : f).filter(f => f.quantity > 0);
    saveFood(updated);
  };
  const consumeChem = (i) => {
    const chem = chemsList[i];
    const ref = CORE_CHEMS.find(c => c.key === chem.key);
    const updated = chemsList.map((c, idx) => idx === i ? { ...c, quantity: Math.max(0, (c.quantity || 1) - 1) } : c).filter(c => c.quantity > 0);
    saveChems(updated);
    if (ref && ref.duration !== 'Instant') {
      saveActiveChems([...activeChems, { key: ref.key, label: ref.label, effect: ref.effect, duration: ref.duration }]);
    }
  };
  const consumeOther = (i) => {
    const updated = otherList.map((o, idx) => idx === i ? { ...o, quantity: Math.max(0, (o.quantity || 1) - 1) } : o).filter(o => o.quantity > 0);
    saveOther(updated);
  };

  const clearActiveChem = (i) => saveActiveChems(activeChems.filter((_, idx) => idx !== i));

  const toggleAddiction = (chemKey, addictionEffect) => {
    const exists = addictions.find(a => a.key === chemKey);
    if (exists) saveAddictions(addictions.filter(a => a.key !== chemKey));
    else {
      const ref = CORE_CHEMS.find(c => c.key === chemKey);
      saveAddictions([...addictions, { key: chemKey, label: ref?.label || chemKey, effect: addictionEffect }]);
    }
  };

  const C = '#a8c8d8';

  return (
    <div className="p-3" style={{ color: C }}>
      {/* Active Chems */}
      {activeChems.length > 0 && (
        <div className="mb-4 p-3" style={{ background: '#0d1a0d', border: '1px solid #22cc22' }}>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#22cc22' }}>ACTIVE CHEM EFFECTS</p>
          {activeChems.map((ac, i) => (
            <div key={i} className="flex items-center justify-between py-1" style={{ borderBottom: '1px solid #1e3a5f' }}>
              <div>
                <span className="text-xs font-bold" style={{ color: '#f5c518' }}>{ac.label}</span>
                <span className="text-[10px] font-mono ml-2" style={{ color: '#4ade80' }}>{ac.effect}</span>
                <span className="text-[10px] font-mono ml-2 px-1" style={{ background: 'rgba(34,204,34,0.1)', border: '1px solid #22cc2244', color: '#22cc22' }}>{ac.duration}</span>
              </div>
              <button onClick={() => clearActiveChem(i)}
                className="text-[10px] px-2 py-0.5 ml-2"
                style={{ background: 'rgba(204,68,68,0.1)', border: '1px solid #cc4444', color: '#cc4444', cursor: 'pointer' }}>
                Clear
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Active Addictions */}
      {addictions.length > 0 && (
        <div className="mb-4 p-3" style={{ background: '#1a0000', border: '1px solid #cc4444' }}>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#cc4444' }}>⚠ ACTIVE ADDICTIONS</p>
          {addictions.map((ad, i) => (
            <div key={i} className="flex items-center justify-between py-1" style={{ borderBottom: '1px solid #cc444422' }}>
              <div>
                <span className="text-xs font-bold" style={{ color: '#ff6666' }}>{ad.label}</span>
                <p className="text-[10px] font-mono mt-0.5" style={{ color: '#ff8888' }}>{ad.effect}</p>
              </div>
              <button onClick={() => saveAddictions(addictions.filter((_, idx) => idx !== i))}
                className="text-[10px] px-2 py-0.5 ml-2 flex-shrink-0"
                style={{ background: 'rgba(34,204,34,0.1)', border: '1px solid #22cc22', color: '#22cc22', cursor: 'pointer' }}>
                Cure
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Food */}
      <Section title="FOOD" color="#f5c518">
        <button onClick={() => setShowFoodPicker(true)} className="text-xs px-3 py-1 font-bold mb-3"
          style={{ background: '#0a1525', border: '1px solid #4a6a8a', color: '#a8c8d8', cursor: 'pointer' }}>
          📋 Add Food Item
        </button>
        {foodList.length === 0 ? (
          <p className="text-xs font-mono" style={{ color: '#4a6a8a' }}>No food in inventory.</p>
        ) : foodList.map((f, i) => {
          const ref = CORE_FOOD.find(r => r.key === f.key) || f.ref || {};
          return (
            <div key={i} className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid #1e3a5f' }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold" style={{ color: '#e8e8e8' }}>{f.label}</span>
                  {ref.irradiated && <span className="text-[9px] px-1 py-0.5 font-bold" style={{ background: 'rgba(34,204,34,0.1)', color: '#22cc22', border: '1px solid #22cc2244' }}>☢ Irradiated</span>}
                </div>
                <p className="text-[10px] font-mono" style={{ color: '#4ade80' }}>+{ref.hp || '?'} HP{ref.effect && ref.effect !== '-' ? ` · ${ref.effect}` : ''}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1">
                  <button onClick={() => saveFood(foodList.map((item, idx) => idx === i ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item))}
                    className="w-5 h-5 flex items-center justify-center text-xs"
                    style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: C, cursor: 'pointer' }}>-</button>
                  <span className="text-xs font-mono w-5 text-center" style={{ color: '#e8e8e8' }}>{f.quantity}</span>
                  <button onClick={() => saveFood(foodList.map((item, idx) => idx === i ? { ...item, quantity: item.quantity + 1 } : item))}
                    className="w-5 h-5 flex items-center justify-center text-xs"
                    style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: C, cursor: 'pointer' }}>+</button>
                </div>
                <button onClick={() => consumeFood(i)} className="text-[10px] px-2 py-0.5 font-bold"
                  style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>Use</button>
                <button onClick={() => saveFood(foodList.filter((_, idx) => idx !== i))}
                  style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
              </div>
            </div>
          );
        })}
      </Section>

      {/* Chems */}
      <Section title="CHEMS" color="#aa66ff">
        <button onClick={() => setShowChemsPicker(true)} className="text-xs px-3 py-1 font-bold mb-3"
          style={{ background: '#0a1525', border: '1px solid #4a6a8a', color: '#a8c8d8', cursor: 'pointer' }}>
          📋 Add Chem
        </button>
        {chemsList.length === 0 ? (
          <p className="text-xs font-mono" style={{ color: '#4a6a8a' }}>No chems in inventory.</p>
        ) : chemsList.map((c, i) => {
          const ref = CORE_CHEMS.find(r => r.key === c.key) || c.ref || {};
          const isAddicted = addictions.some(a => a.key === c.key);
          return (
            <div key={i} className="py-1.5" style={{ borderBottom: '1px solid #1e3a5f' }}>
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold" style={{ color: '#e8e8e8' }}>{c.label}</span>
                    {ref.duration && <span className="text-[9px] px-1 py-0.5" style={{ background: 'rgba(170,102,255,0.1)', color: '#aa66ff', border: '1px solid #aa66ff44' }}>{ref.duration}</span>}
                    {ref.addictive && <span className="text-[9px] px-1 py-0.5 font-bold" style={{ background: 'rgba(204,68,68,0.1)', color: '#ff6666', border: '1px solid #cc444444' }}>Addictive ({ref.addictionNumber})</span>}
                  </div>
                  <p className="text-[10px] font-mono mt-0.5" style={{ color: '#a8c8d8' }}>{ref.effect}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <div className="flex items-center gap-1">
                    <button onClick={() => saveChems(chemsList.map((item, idx) => idx === i ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item))}
                      className="w-5 h-5 flex items-center justify-center text-xs"
                      style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: C, cursor: 'pointer' }}>-</button>
                    <span className="text-xs font-mono w-5 text-center" style={{ color: '#e8e8e8' }}>{c.quantity}</span>
                    <button onClick={() => saveChems(chemsList.map((item, idx) => idx === i ? { ...item, quantity: item.quantity + 1 } : item))}
                      className="w-5 h-5 flex items-center justify-center text-xs"
                      style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: C, cursor: 'pointer' }}>+</button>
                  </div>
                  <button onClick={() => consumeChem(i)} className="text-[10px] px-2 py-0.5 font-bold"
                    style={{ background: '#1a0a2a', border: '1px solid #aa66ff', color: '#aa66ff', cursor: 'pointer' }}>Use</button>
                  <button onClick={() => saveChems(chemsList.filter((_, idx) => idx !== i))}
                    style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
                </div>
              </div>
              {ref.addictive && (
                <div className="flex items-center gap-2 mt-1">
                  <input type="checkbox" checked={isAddicted} onChange={() => toggleAddiction(c.key, ref.addictionEffect)}
                    id={`addict-${i}`} style={{ accentColor: '#cc4444', width: '12px', height: '12px' }} />
                  <label htmlFor={`addict-${i}`} className="text-[10px] font-mono cursor-pointer" style={{ color: isAddicted ? '#ff6666' : '#6a8a9a' }}>
                    {isAddicted ? '⚠ Addicted' : 'Mark addicted'}
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </Section>

      {/* Other Consumables */}
      <Section title="OTHER CONSUMABLES" color="#6a9aba">
        <button onClick={() => setShowOtherPicker(true)} className="text-xs px-3 py-1 font-bold mb-3"
          style={{ background: '#0a1525', border: '1px solid #4a6a8a', color: '#a8c8d8', cursor: 'pointer' }}>
          📋 Add Item
        </button>
        {otherList.length === 0 ? (
          <p className="text-xs font-mono" style={{ color: '#4a6a8a' }}>No other consumables.</p>
        ) : otherList.map((o, i) => {
          const ref = CORE_OTHER_CONSUMABLES.find(r => r.key === o.key) || o.ref || {};
          return (
            <div key={i} className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid #1e3a5f' }}>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold" style={{ color: '#e8e8e8' }}>{o.label}</span>
                <p className="text-[10px] font-mono mt-0.5" style={{ color: '#a8c8d8' }}>{ref.effect}</p>
                {ref.note && <p className="text-[10px] font-mono italic" style={{ color: '#f5c518' }}>{ref.note}</p>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <div className="flex items-center gap-1">
                  <button onClick={() => saveOther(otherList.map((item, idx) => idx === i ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item))}
                    className="w-5 h-5 flex items-center justify-center text-xs"
                    style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: C, cursor: 'pointer' }}>-</button>
                  <span className="text-xs font-mono w-5 text-center" style={{ color: '#e8e8e8' }}>{o.quantity}</span>
                  <button onClick={() => saveOther(otherList.map((item, idx) => idx === i ? { ...item, quantity: item.quantity + 1 } : item))}
                    className="w-5 h-5 flex items-center justify-center text-xs"
                    style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: C, cursor: 'pointer' }}>+</button>
                </div>
                <button onClick={() => consumeOther(i)} className="text-[10px] px-2 py-0.5 font-bold"
                  style={{ background: '#0a1525', border: '1px solid #6a9aba', color: '#6a9aba', cursor: 'pointer' }}>Use</button>
                <button onClick={() => saveOther(otherList.filter((_, idx) => idx !== i))}
                  style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>✕</button>
              </div>
            </div>
          );
        })}
      </Section>

      {/* Modals */}
      {showFoodPicker && (
        <RefPickerModal title="FOOD REFERENCE" items={CORE_FOOD} onSelect={addFood} onClose={() => setShowFoodPicker(false)}
          renderItem={item => (
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-semibold text-sm" style={{ color: '#e8e8e8' }}>{item.label}</span>
                {item.irradiated && <span className="text-[9px] px-1" style={{ color: '#22cc22', border: '1px solid #22cc2244' }}>☢</span>}
              </div>
              <p className="text-[10px] font-mono" style={{ color: '#4ade80' }}>+{item.hp} HP{item.effect !== '-' ? ` · ${item.effect}` : ''}</p>
            </div>
          )} />
      )}
      {showChemsPicker && (
        <RefPickerModal title="CHEMS REFERENCE" items={CORE_CHEMS} onSelect={addChem} onClose={() => setShowChemsPicker(false)}
          renderItem={item => (
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-semibold text-sm" style={{ color: '#e8e8e8' }}>{item.label}</span>
                <span className="text-[9px] px-1" style={{ color: '#aa66ff', border: '1px solid #aa66ff44' }}>{item.duration}</span>
                {item.addictive && <span className="text-[9px] px-1" style={{ color: '#ff6666', border: '1px solid #cc444444' }}>Addictive</span>}
              </div>
              <p className="text-[10px] font-mono" style={{ color: '#a8c8d8' }}>{item.effect}</p>
            </div>
          )} />
      )}
      {showOtherPicker && (
        <RefPickerModal title="OTHER CONSUMABLES" items={CORE_OTHER_CONSUMABLES} onSelect={addOther} onClose={() => setShowOtherPicker(false)}
          renderItem={item => (
            <div>
              <span className="font-heading font-semibold text-sm" style={{ color: '#e8e8e8' }}>{item.label}</span>
              <p className="text-[10px] font-mono" style={{ color: '#a8c8d8' }}>{item.effect}</p>
            </div>
          )} />
      )}
    </div>
  );
}