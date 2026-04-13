import { useState } from "react";
import { getNextLevelXP } from "../../lib/falloutData";

export default function DataTab({ character, updateField }) {
  const [xpInput, setXpInput] = useState('');
  const [showXpInput, setShowXpInput] = useState(false);

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
      <div>
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
    </div>
  );
}