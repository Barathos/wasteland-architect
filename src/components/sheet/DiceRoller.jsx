import { useState } from "react";

const DICE = [
  { label: '1d20', sides: 20, count: 1 },
  { label: '2d20', sides: 20, count: 2 },
  { label: '1d6',  sides: 6,  count: 1 },
  { label: '2d6',  sides: 6,  count: 2 },
  { label: '1d4',  sides: 4,  count: 1 },
];

function roll(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

export default function DiceRoller() {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);

  const rollDice = (die) => {
    const rolls = Array.from({ length: die.count }, () => roll(die.sides));
    const total = rolls.reduce((a, b) => a + b, 0);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setResults(prev => [{ label: die.label, rolls, total, time }, ...prev].slice(0, 5));
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 100 }}>
      {open && (
        <div className="mb-2 p-3" style={{ background: '#060f1c', border: '2px solid #f5c518', width: '220px', boxShadow: '0 0 20px rgba(245,197,24,0.15)' }}>
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#f5c518' }}>DICE ROLLER</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {DICE.map(d => (
              <button key={d.label} onClick={() => rollDice(d)}
                className="px-2.5 py-1.5 text-xs font-bold transition-all hover:scale-105"
                style={{ background: '#0a1a2d', border: '1px solid #f5c518', color: '#f5c518', cursor: 'pointer' }}>
                {d.label}
              </button>
            ))}
          </div>
          {results.length > 0 && (
            <div>
              <p className="text-[10px] mb-1" style={{ color: '#4a6a8a' }}>LAST ROLLS:</p>
              {results.map((r, i) => (
                <div key={i} className="flex items-center justify-between py-1" style={{ borderBottom: '1px solid #0d2137', opacity: 1 - i * 0.15 }}>
                  <span className="text-[10px]" style={{ color: '#4a6a8a' }}>{r.label}</span>
                  <span className="text-[10px]" style={{ color: '#a8c8d8' }}>[{r.rolls.join('+')}]</span>
                  <span className="text-sm font-bold" style={{ color: r.total >= (r.rolls.length * (r.label.includes('20') ? 15 : r.label.includes('6') ? 5 : 3)) ? '#22cc22' : '#e8e8e8' }}>{r.total}</span>
                  <span className="text-[10px]" style={{ color: '#4a6a8a' }}>{r.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-12 h-12 flex items-center justify-center text-xl font-bold transition-all hover:scale-110"
        style={{ background: open ? '#1a1500' : '#060f1c', border: '2px solid #f5c518', color: '#f5c518', cursor: 'pointer', borderRadius: '4px', boxShadow: '0 0 15px rgba(245,197,24,0.2)' }}
        title="Dice Roller"
      >
        ⚄
      </button>
    </div>
  );
}