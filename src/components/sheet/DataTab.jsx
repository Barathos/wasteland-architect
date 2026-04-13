import { useState } from "react";
import { getNextLevelXP } from "../../lib/falloutData";

function parseLog(str) { try { return JSON.parse(str || '[]'); } catch { return []; } }

export default function DataTab({ character, updateField }) {
  const [xpInput, setXpInput] = useState('');
  const [showXpInput, setShowXpInput] = useState(false);
  const [sessionLog, setSessionLog] = useState(() => parseLog(character.session_log));
  const [newEntry, setNewEntry] = useState({ date: new Date().toISOString().split('T')[0], notes: '', xp: '' });
  const [showLogForm, setShowLogForm] = useState(false);

  const addLogEntry = () => {
    if (!newEntry.notes.trim()) return;
    const entry = { ...newEntry, xp: parseInt(newEntry.xp) || 0, id: Date.now() };
    const updated = [entry, ...sessionLog];
    setSessionLog(updated);
    updateField({ session_log: JSON.stringify(updated) });
    if (entry.xp > 0) updateField({ xp: xp + entry.xp });
    setNewEntry({ date: new Date().toISOString().split('T')[0], notes: '', xp: '' });
    setShowLogForm(false);
  };

  const removeLogEntry = (id) => {
    const updated = sessionLog.filter(e => e.id !== id);
    setSessionLog(updated);
    updateField({ session_log: JSON.stringify(updated) });
  };

  const level = character.level || 1;
  const xp = character.xp || 0;
  const nextLevelXP = getNextLevelXP(level);
  const canLevelUp = xp >= nextLevelXP && level < 50;

  const addXP = () => {
    const amount = parseInt(xpInput) || 0;
    if (amount > 0) {
      updateField({ xp: xp + amount });
      setXpInput('');
      setShowXpInput(false);
    }
  };

  const levelUp = () => {
    updateField({ level: level + 1 });
  };

  const inputStyle = {
    background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8',
    outline: 'none', padding: '6px 10px', fontSize: '13px', width: '100%', resize: 'vertical',
  };

  const sectionHeader = (title) => (
    <div className="px-3 py-2 mb-3" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
      <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>{title}</p>
    </div>
  );

  return (
    <div style={{ color: '#a8c8d8' }}>
      {/* XP Tracker */}
      <div className="mb-0" style={{ borderBottom: '1px solid #1e3a5f' }}>
        {sectionHeader('XP TRACKER')}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-6 mb-3 flex-wrap">
            <div>
              <p className="text-[10px]" style={{ color: '#4a6a8a' }}>CURRENT XP</p>
              <p className="text-2xl font-bold" style={{ color: '#e8e8e8' }}>{xp.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px]" style={{ color: '#4a6a8a' }}>NEXT LEVEL</p>
              <p className="text-2xl font-bold" style={{ color: '#f5c518' }}>{nextLevelXP.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px]" style={{ color: '#4a6a8a' }}>LEVEL</p>
              <p className="text-2xl font-bold" style={{ color: '#22cc22' }}>{level}</p>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              {showXpInput ? (
                <>
                  <input type="number" value={xpInput} onChange={e => setXpInput(e.target.value)}
                    placeholder="XP amount" autoFocus
                    style={{ width: '100px', background: '#060f1c', border: '1px solid #f5c518', color: '#f5c518', outline: 'none', padding: '4px 8px', fontSize: '13px' }}
                    onKeyDown={e => e.key === 'Enter' && addXP()}
                  />
                  <button onClick={addXP} className="px-3 py-1 text-xs font-bold"
                    style={{ background: '#1a1500', border: '1px solid #f5c518', color: '#f5c518', cursor: 'pointer' }}>ADD</button>
                  <button onClick={() => setShowXpInput(false)} className="text-xs" style={{ color: '#4a6a8a', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
                </>
              ) : (
                <button onClick={() => setShowXpInput(true)} className="px-3 py-1.5 text-xs font-bold"
                  style={{ background: '#1a1500', border: '1px solid #f5c518', color: '#f5c518', cursor: 'pointer' }}>+ ADD XP</button>
              )}
              {canLevelUp && (
                <button onClick={levelUp} className="px-3 py-1.5 text-xs font-bold animate-pulse"
                  style={{ background: '#0a2a0a', border: '2px solid #22cc22', color: '#22cc22', cursor: 'pointer' }}>
                  ⬆ LEVEL UP!
                </button>
              )}
            </div>
          </div>
          {/* XP progress bar */}
          <div className="h-2 rounded-full overflow-hidden" style={{ background: '#0a1a2d' }}>
            <div className="h-full transition-all" style={{ width: `${Math.min(100, (xp / nextLevelXP) * 100)}%`, background: '#f5c518' }} />
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="mb-0" style={{ borderBottom: '1px solid #1e3a5f' }}>
        {sectionHeader('BACKGROUND STORY')}
        <div className="px-4 pb-4">
          <textarea
            value={character.background || ''}
            onChange={e => updateField({ background: e.target.value })}
            placeholder="Enter your character's background story..."
            rows={6}
            style={{ ...inputStyle, minHeight: '120px' }}
          />
        </div>
      </div>

      {/* Notes */}
      <div style={{ borderBottom: '1px solid #1e3a5f' }}>
        {sectionHeader('NOTES')}
        <div className="px-4 pb-4">
          <textarea
            value={character.notes || ''}
            onChange={e => updateField({ notes: e.target.value })}
            placeholder="Session notes, reminders, lore..."
            rows={6}
            style={{ ...inputStyle, minHeight: '120px' }}
          />
        </div>
      </div>

      {/* Session Log */}
      <div>
        {sectionHeader('SESSION LOG')}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono" style={{ color: '#4a6a8a' }}>{sessionLog.length} entries</span>
            <button onClick={() => setShowLogForm(f => !f)} className="text-xs px-3 py-1 font-bold"
              style={{ background: '#1a1500', border: '1px solid #f5c518', color: '#f5c518', cursor: 'pointer' }}>
              + ADD SESSION
            </button>
          </div>
          {showLogForm && (
            <div className="mb-3 p-3" style={{ background: '#0a1a2d', border: '1px solid #1e3a5f' }}>
              <div className="flex gap-2 mb-2 flex-wrap">
                <input type="date" value={newEntry.date} onChange={e => setNewEntry(p => ({ ...p, date: e.target.value }))}
                  style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: '11px' }} />
                <input type="number" value={newEntry.xp} onChange={e => setNewEntry(p => ({ ...p, xp: e.target.value }))}
                  placeholder="XP earned" style={{ width: '90px', background: '#060f1c', border: '1px solid #f5c518', color: '#f5c518', outline: 'none', padding: '3px 6px', fontSize: '11px' }} />
              </div>
              <textarea value={newEntry.notes} onChange={e => setNewEntry(p => ({ ...p, notes: e.target.value }))}
                placeholder="What happened this session?" rows={3}
                style={{ width: '100%', background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '4px 6px', fontSize: '12px', resize: 'vertical', marginBottom: '8px' }} />
              <div className="flex gap-2">
                <button onClick={addLogEntry} className="px-3 py-1 text-xs font-bold"
                  style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>SAVE</button>
                <button onClick={() => setShowLogForm(false)} className="text-xs"
                  style={{ color: '#4a6a8a', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {sessionLog.map(entry => (
              <div key={entry.id} className="p-3" style={{ background: '#0a1525', border: '1px solid #1e3a5f' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono" style={{ color: '#f5c518' }}>{entry.date}</span>
                  <div className="flex items-center gap-2">
                    {entry.xp > 0 && <span className="text-xs font-bold" style={{ color: '#22cc22' }}>+{entry.xp} XP</span>}
                    <button onClick={() => removeLogEntry(entry.id)}
                      style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px' }}>✕</button>
                  </div>
                </div>
                <p className="text-xs" style={{ color: '#a8c8d8', lineHeight: '1.5' }}>{entry.notes}</p>
              </div>
            ))}
            {sessionLog.length === 0 && <p className="text-xs font-mono text-center py-4" style={{ color: '#4a6a8a' }}>No sessions logged yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}