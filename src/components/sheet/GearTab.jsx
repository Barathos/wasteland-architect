import { useState } from "react";

function parseInventory(str) {
  try { return JSON.parse(str || '[]'); } catch { return []; }
}

const EMPTY_ITEM = { name: '', quantity: 1, weight: 0, notes: '' };

export default function GearTab({ character, updateField }) {
  const [items, setItems] = useState(() => parseInventory(character.inventory));
  const [caps, setCaps] = useState(character.caps || 0);

  const saveItems = (updated) => {
    setItems(updated);
    const newTotal = updated.reduce((sum, item) => sum + (parseFloat(item.weight) || 0) * (parseInt(item.quantity) || 1), 0);
    updateField({ inventory: JSON.stringify(updated), encumbrance: parseFloat(newTotal.toFixed(1)) });
  };

  const saveCaps = (val) => {
    setCaps(val);
    updateField({ caps: val });
  };

  const addItem = () => saveItems([...items, { ...EMPTY_ITEM }]);
  const removeItem = (i) => saveItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, field, val) => saveItems(items.map((item, idx) => idx === i ? { ...item, [field]: val } : item));

  const totalWeight = items.reduce((sum, item) => sum + (parseFloat(item.weight) || 0) * (parseInt(item.quantity) || 1), 0);
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

      {/* Header */}
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