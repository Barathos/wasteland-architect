import { useState } from "react";
import { X, Plus, RotateCcw, ChevronUp, ChevronDown } from "lucide-react";

const DEFAULT_AP = 3;

export default function CombatTracker({ character, onClose }) {
  const initCombatants = character ? [{
    id: 0,
    name: character.name || 'Player',
    initiative: character.initiative || 0,
    ap: DEFAULT_AP,
    apMax: DEFAULT_AP,
    acted: false,
    isPlayer: true,
  }] : [];

  const [combatants, setCombatants] = useState(initCombatants);
  const [round, setRound] = useState(1);
  const [newName, setNewName] = useState('');
  const [newInit, setNewInit] = useState('');
  const [newAP, setNewAP] = useState(DEFAULT_AP);

  const sorted = [...combatants].sort((a, b) => b.initiative - a.initiative);

  const addCombatant = () => {
    if (!newName.trim()) return;
    setCombatants(prev => [...prev, {
      id: Date.now(), name: newName, initiative: parseInt(newInit) || 0,
      ap: parseInt(newAP) || DEFAULT_AP, apMax: parseInt(newAP) || DEFAULT_AP, acted: false, isPlayer: false,
    }]);
    setNewName(''); setNewInit(''); setNewAP(DEFAULT_AP);
  };

  const remove = (id) => setCombatants(prev => prev.filter(c => c.id !== id));

  const toggleActed = (id) => setCombatants(prev =>
    prev.map(c => c.id === id ? { ...c, acted: !c.acted } : c)
  );

  const adjustAP = (id, delta) => setCombatants(prev =>
    prev.map(c => c.id === id ? { ...c, ap: Math.max(0, Math.min(c.apMax, c.ap + delta)) } : c)
  );

  const nextRound = () => {
    setRound(r => r + 1);
    setCombatants(prev => prev.map(c => ({ ...c, ap: c.apMax, acted: false })));
  };

  const adjustInit = (id, delta) => setCombatants(prev =>
    prev.map(c => c.id === id ? { ...c, initiative: c.initiative + delta } : c)
  );

  const acted = sorted.filter(c => c.acted).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div className="w-full max-w-lg mx-4" style={{ background: '#060f1c', border: '2px solid #f5c518', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ background: '#0a1a2d', borderBottom: '1px solid #1e3a5f' }}>
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold tracking-widest" style={{ color: '#f5c518' }}>⚔ COMBAT TRACKER</p>
            <span className="text-xs font-mono px-2 py-0.5" style={{ background: '#1a2a0a', border: '1px solid #22aa22', color: '#22cc22' }}>
              ROUND {round}
            </span>
            <span className="text-xs font-mono" style={{ color: '#4a6a8a' }}>{acted}/{sorted.length} acted</span>
          </div>
          <button onClick={onClose} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Combatants */}
        <div className="overflow-y-auto flex-1">
          {sorted.map((c, idx) => (
            <div key={c.id} className="px-4 py-2.5 flex items-center gap-3"
              style={{ borderBottom: '1px solid #091525', background: c.acted ? 'rgba(0,0,0,0.3)' : c.isPlayer ? 'rgba(245,197,24,0.04)' : 'transparent', opacity: c.acted ? 0.6 : 1 }}>
              {/* Turn order */}
              <span className="text-xs font-bold w-5 text-center" style={{ color: '#4a6a8a' }}>{idx + 1}</span>

              {/* Name */}
              <span className="flex-1 text-sm font-bold" style={{ color: c.isPlayer ? '#f5c518' : '#c8dde8', textDecoration: c.acted ? 'line-through' : 'none' }}>
                {c.name}
              </span>

              {/* Initiative */}
              <div className="flex items-center gap-1">
                <button onClick={() => adjustInit(c.id, -1)} style={{ color: '#4a6a8a', background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px' }}>▼</button>
                <div className="text-center" style={{ minWidth: '28px' }}>
                  <div className="text-[9px]" style={{ color: '#4a6a8a' }}>INIT</div>
                  <div className="text-xs font-bold" style={{ color: '#a8c8d8' }}>{c.initiative}</div>
                </div>
                <button onClick={() => adjustInit(c.id, 1)} style={{ color: '#4a6a8a', background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px' }}>▲</button>
              </div>

              {/* AP */}
              <div className="flex items-center gap-1">
                <button onClick={() => adjustAP(c.id, -1)} className="w-5 h-5 flex items-center justify-center text-xs font-bold"
                  style={{ background: '#1e3a5f', color: '#a8c8d8', border: 'none', cursor: 'pointer' }}>−</button>
                <div className="text-center" style={{ minWidth: '32px' }}>
                  <div className="text-[9px]" style={{ color: '#4a6a8a' }}>AP</div>
                  <div className="text-xs font-bold" style={{ color: c.ap === 0 ? '#cc4444' : '#22cc22' }}>{c.ap}/{c.apMax}</div>
                </div>
                <button onClick={() => adjustAP(c.id, 1)} className="w-5 h-5 flex items-center justify-center text-xs font-bold"
                  style={{ background: '#1e3a5f', color: '#a8c8d8', border: 'none', cursor: 'pointer' }}>+</button>
              </div>

              {/* Acted toggle */}
              <button onClick={() => toggleActed(c.id)}
                className="text-xs px-2 py-1 font-bold"
                style={{ background: c.acted ? '#2a0a0a' : '#0a2a0a', border: `1px solid ${c.acted ? '#cc4444' : '#22aa22'}`, color: c.acted ? '#cc4444' : '#22cc22', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {c.acted ? 'DONE' : 'ACT'}
              </button>

              <button onClick={() => remove(c.id)} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px' }}>✕</button>
            </div>
          ))}
        </div>

        {/* Add combatant */}
        <div className="px-4 py-3" style={{ borderTop: '1px solid #1e3a5f', background: '#0a1525' }}>
          <div className="flex gap-2 flex-wrap items-center mb-3">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Name"
              onKeyDown={e => e.key === 'Enter' && addCombatant()}
              style={{ flex: 1, minWidth: '100px', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '4px 8px', fontSize: '12px' }} />
            <input type="number" value={newInit} onChange={e => setNewInit(e.target.value)} placeholder="Init"
              style={{ width: '55px', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '4px 6px', fontSize: '12px' }} />
            <input type="number" value={newAP} onChange={e => setNewAP(e.target.value)} placeholder="AP"
              style={{ width: '45px', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '4px 6px', fontSize: '12px' }} />
            <button onClick={addCombatant} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold"
              style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>
              <Plus className="w-3 h-3" /> ADD
            </button>
          </div>
          <div className="flex justify-between">
            <button onClick={() => { setCombatants(prev => prev.map(c => ({ ...c, ap: c.apMax, acted: false }))); setRound(1); }}
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5"
              style={{ background: '#2a0a0a', border: '1px solid #cc4444', color: '#cc4444', cursor: 'pointer' }}>
              <RotateCcw className="w-3 h-3" /> RESET
            </button>
            <button onClick={nextRound}
              className="text-xs font-bold px-4 py-1.5"
              style={{ background: '#0a1a2d', border: '1px solid #f5c518', color: '#f5c518', cursor: 'pointer' }}>
              NEXT ROUND →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}