import { useState } from "react";

const EMPTY = { name: '', hp_current: 10, hp_max: 10, str: 5, per: 5, end: 5, cha: 5, int: 5, agi: 5, lck: 5, notes: '' };

function parse(str, fb) { try { return JSON.parse(str || ''); } catch { return fb; } }

export default function CompanionsTab({ character, updateField }) {
  const [companions, setCompanions] = useState(() => parse(character.companions, []));
  const [expanded, setExpanded] = useState(null);

  const save = (updated) => { setCompanions(updated); updateField({ companions: JSON.stringify(updated) }); };
  const add = () => { const c = [...companions, { ...EMPTY }]; save(c); setExpanded(c.length - 1); };
  const remove = (i) => { save(companions.filter((_, idx) => idx !== i)); if (expanded === i) setExpanded(null); };
  const update = (i, field, val) => save(companions.map((c, idx) => idx === i ? { ...c, [field]: val } : c));

  const inp = (val, onChange, width = '100%', placeholder = '') => (
    <input value={val} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width, background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: '11px' }} />
  );

  const SPECIALS = ['str','per','end','cha','int','agi','lck'];

  return (
    <div className="p-4" style={{ color: '#a8c8d8' }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>COMPANIONS & NPCs ({companions.length})</p>
        <button onClick={add} className="text-xs px-3 py-1 font-bold"
          style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>
          + ADD COMPANION
        </button>
      </div>

      {companions.length === 0 && (
        <div className="text-center py-8" style={{ color: '#4a6a8a' }}>
          <p className="font-mono text-sm">No companions tracked.</p>
        </div>
      )}

      {companions.map((c, i) => (
        <div key={i} className="mb-3" style={{ border: '1px solid #1e3a5f', background: '#0a1a2d' }}>
          {/* Header row */}
          <div className="flex items-center gap-2 p-2 cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}
            style={{ borderBottom: expanded === i ? '1px solid #1e3a5f' : 'none' }}>
            <span className="text-xs font-bold flex-1" style={{ color: '#f5c518' }}>{c.name || 'Unnamed'}</span>
            <span className="text-xs font-mono" style={{ color: c.hp_current <= 0 ? '#cc4444' : '#22cc22' }}>
              HP {c.hp_current}/{c.hp_max}
            </span>
            <button onClick={(e) => { e.stopPropagation(); remove(i); }}
              style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>✕</button>
            <span style={{ color: '#4a6a8a', fontSize: '10px' }}>{expanded === i ? '▲' : '▼'}</span>
          </div>

          {expanded === i && (
            <div className="p-3 space-y-3">
              {/* Name + HP */}
              <div className="flex gap-2 flex-wrap items-center">
                <div className="flex items-center gap-1">
                  <span className="text-[10px]" style={{ color: '#4a6a8a' }}>NAME:</span>
                  {inp(c.name, v => update(i, 'name', v), '140px', 'Companion name')}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px]" style={{ color: '#4a6a8a' }}>HP:</span>
                  <input type="number" value={c.hp_current} onChange={e => update(i, 'hp_current', parseInt(e.target.value) || 0)}
                    style={{ width: '45px', background: '#060f1c', border: '1px solid #22aa22', color: '#22cc22', outline: 'none', padding: '3px 4px', fontSize: '11px', textAlign: 'center' }} />
                  <span style={{ color: '#4a6a8a' }}>/</span>
                  <input type="number" value={c.hp_max} onChange={e => update(i, 'hp_max', parseInt(e.target.value) || 0)}
                    style={{ width: '45px', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 4px', fontSize: '11px', textAlign: 'center' }} />
                </div>
              </div>

              {/* SPECIAL mini */}
              <div>
                <p className="text-[10px] mb-1" style={{ color: '#4a6a8a' }}>S.P.E.C.I.A.L.</p>
                <div className="flex gap-2 flex-wrap">
                  {SPECIALS.map(stat => (
                    <div key={stat} className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] uppercase font-bold" style={{ color: '#4a6a8a' }}>{stat}</span>
                      <input type="number" value={c[stat] || 5} onChange={e => update(i, stat, parseInt(e.target.value) || 5)}
                        style={{ width: '36px', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '2px', fontSize: '12px', textAlign: 'center' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-[10px] mb-1" style={{ color: '#4a6a8a' }}>NOTES</p>
                <textarea value={c.notes} onChange={e => update(i, 'notes', e.target.value)}
                  placeholder="Companion notes, abilities, status..."
                  rows={3}
                  style={{ width: '100%', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '4px 6px', fontSize: '11px', resize: 'vertical' }} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}