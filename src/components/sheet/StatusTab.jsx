import { useState } from "react";
import { X } from "lucide-react";
import DerivedPanel from "./DerivedPanel";
import BodyDiagram from "./BodyDiagram";
import HealthPanel from "./HealthPanel";
import { isRobotCharacter } from "../../lib/falloutData";

function parseJson(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

function BottomSection({ character, updateField }) {
  const isRobot = isRobotCharacter(character);
  const addictions = parseJson(character.addictions, []);
  const diseases = parseJson(character.diseases, []);
  const conditions = parseJson(character.conditions, { hunger: 'Full', thirst: 'Quenched', rest: 'Rested' });
  const [newAddiction, setNewAddiction] = useState('');
  const [newDisease, setNewDisease] = useState('');

  const addItem = (list, item, field, setInput) => {
    if (!item.trim()) return;
    updateField({ [field]: JSON.stringify([...list, item.trim()]) });
    setInput('');
  };
  const removeItem = (list, idx, field) => {
    updateField({ [field]: JSON.stringify(list.filter((_, i) => i !== idx)) });
  };
  const updateCondition = (key, value) => {
    updateField({ conditions: JSON.stringify({ ...conditions, [key]: value }) });
  };

  return (
    <div className="flex flex-wrap" style={{ borderTop: '1px solid #1e3a5f' }}>
      {/* Addictions + Diseases — hidden for robots */}
      {!isRobot && (
        <div className="flex-1 p-3" style={{ borderRight: '1px solid #1e3a5f', minWidth: '200px' }}>
          {/* Addictions */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>🔗 ADDICTIONS</p>
              <div className="flex items-center gap-1">
                <input value={newAddiction} onChange={e => setNewAddiction(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addItem(addictions, newAddiction, 'addictions', setNewAddiction)}
                  placeholder="Add..." className="text-xs px-2 py-0.5"
                  style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#a8c8d8', width: '80px', outline: 'none' }} />
                <button onClick={() => addItem(addictions, newAddiction, 'addictions', setNewAddiction)}
                  className="text-xs px-1.5 py-0.5 font-bold" style={{ background: '#1e3a5f', color: '#f5c518' }}>+Add</button>
              </div>
            </div>
            {addictions.map((a, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-0.5">
                <span style={{ color: '#a8c8d8' }}>{a}</span>
                <button onClick={() => removeItem(addictions, i, 'addictions')} style={{ color: '#cc4444' }}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          {/* Diseases */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>DISEASES</p>
              <div className="flex items-center gap-1">
                <input value={newDisease} onChange={e => setNewDisease(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addItem(diseases, newDisease, 'diseases', setNewDisease)}
                  placeholder="Add..." className="text-xs px-2 py-0.5"
                  style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#a8c8d8', width: '80px', outline: 'none' }} />
                <button onClick={() => addItem(diseases, newDisease, 'diseases', setNewDisease)}
                  className="text-xs px-1.5 py-0.5 font-bold" style={{ background: '#1e3a5f', color: '#f5c518' }}>+Add</button>
              </div>
            </div>
            {diseases.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-0.5">
                <span style={{ color: '#a8c8d8' }}>{d}</span>
                <button onClick={() => removeItem(diseases, i, 'diseases')} style={{ color: '#cc4444' }}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conditions — hidden for robots */}
      {!isRobot && (
        <div className="p-3" style={{ minWidth: '180px' }}>
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#f5c518' }}>CONDITIONS</p>
          {[
            { key: 'hunger', icon: '🍎', options: ['Full', 'Hungry', 'Starving'] },
            { key: 'thirst', icon: '💧', options: ['Quenched', 'Thirsty', 'Dehydrated'] },
            { key: 'rest', icon: '🛏', options: ['Rested', 'Tired', 'Exhausted'] },
          ].map(({ key, icon, options }) => (
            <div key={key} className="flex items-center gap-2 mb-2">
              <span className="text-base">{icon}</span>
              <select
                value={conditions[key] || options[0]}
                onChange={e => updateCondition(key, e.target.value)}
                className="flex-1 text-xs py-1 px-2"
                style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none' }}
              >
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Nightkin Stealth Boy Tracker */}
      {character.origin === 'Nightkin' && (
        <div className="p-3" style={{ minWidth: '220px', borderLeft: '1px solid #1e3a5f' }}>
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#aa44dd' }}>STEALTH BOY DOSES</p>
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => updateField({ stealth_boy_doses: Math.max(0, (character.stealth_boy_doses ?? 0) - 1) })}
              className="w-6 h-6 flex items-center justify-center text-xs" style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#a8c8d8' }}>-</button>
            <span className="font-mono font-bold text-lg" style={{ color: '#aa44dd' }}>{character.stealth_boy_doses ?? 0}</span>
            <button onClick={() => updateField({ stealth_boy_doses: (character.stealth_boy_doses ?? 0) + 1 })}
              className="w-6 h-6 flex items-center justify-center text-xs" style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#a8c8d8' }}>+</button>
            <span className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>doses this session</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateField({ stealth_boy_addicted: !character.stealth_boy_addicted })}
              className="px-3 py-1 text-xs font-bold transition-all"
              style={{ background: character.stealth_boy_addicted ? 'rgba(204,68,68,0.15)' : '#0a1525', border: `1px solid ${character.stealth_boy_addicted ? '#cc4444' : '#1e3a5f'}`, color: character.stealth_boy_addicted ? '#cc4444' : '#4a6a8a', cursor: 'pointer' }}>
              {character.stealth_boy_addicted ? '⚠ ADDICTED' : 'Not Addicted'}
            </button>
          </div>
          {character.stealth_boy_addicted && (
            <p className="text-[10px] font-mono mt-2" style={{ color: '#cc4444' }}>+2 difficulty to PER & INT tests. +1 to CHA tests.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function StatusTab({ character, updateField }) {
  return (
    <div style={{ background: '#0d2137' }}>
      <div className="flex" style={{ borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ width: '220px', flexShrink: 0, borderRight: '1px solid #1e3a5f' }}>
          <DerivedPanel character={character} updateField={updateField} />
        </div>
        <div className="flex-1 overflow-auto">
          <BodyDiagram character={character} updateField={updateField} />
        </div>
        <div style={{ width: '210px', flexShrink: 0, borderLeft: '1px solid #1e3a5f' }}>
          <HealthPanel character={character} updateField={updateField} />
        </div>
      </div>
      <BottomSection character={character} updateField={updateField} />
    </div>
  );
}