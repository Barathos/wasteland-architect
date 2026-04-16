import { Check } from 'lucide-react';

function safeJson(str, fb) {
  try { return JSON.parse(str || ''); } catch { return fb; }
}

export default function EquipmentChoices({ character, onResolve }) {
  const pending = safeJson(character.pending_equipment_choices, []);
  const unresolved = pending.filter(c => !c.resolved);
  const total = pending.length;
  const done = total - unresolved.length;

  if (total === 0 || !character.sub_origin) return null;

  return (
    <div className="mt-4 p-4" style={{ background: '#060f1c', border: '1px solid #f5c518' }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>CHOOSE YOUR STARTING GEAR</p>
        <span className="text-[10px] font-mono" style={{ color: done === total ? '#22cc22' : '#f5c518' }}>
          {done} of {total} choices made
        </span>
      </div>

      {unresolved.length === 0 ? (
        <p className="text-xs font-mono" style={{ color: '#22cc22' }}>✓ All choices resolved.</p>
      ) : (
        <div className="space-y-4">
          {unresolved.map(choice => (
            <div key={choice.optionKey}>
              <p className="text-[10px] font-mono mb-1.5" style={{ color: '#a8c8d8' }}>{choice.optionLabel}:</p>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(choice.options) && choice.options.length > 1 && (
                  <button
                    onClick={() => {
                      const idx = Math.floor(Math.random() * choice.options.length);
                      onResolve(choice.optionKey, choice.options[idx]);
                    }}
                    className="text-xs font-mono px-3 py-1.5 transition-all hover:opacity-80"
                    style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.35)', color: '#f5c518', cursor: 'pointer' }}
                  >
                    Roll Random
                  </button>
                )}
                {(choice.options || []).map(opt => (
                  <button
                    key={opt}
                    onClick={() => onResolve(choice.optionKey, opt)}
                    className="text-xs font-mono px-3 py-1.5 transition-all hover:opacity-80"
                    style={{ background: 'rgba(34,204,34,0.06)', border: '1px solid rgba(34,204,34,0.3)', color: '#22cc22', cursor: 'pointer' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {done > 0 && (
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid #1e3a5f' }}>
          <p className="text-[10px] font-mono mb-1" style={{ color: '#4a6a8a' }}>Resolved:</p>
          <div className="flex flex-wrap gap-1">
            {pending.filter(c => c.resolved).map(c => (
              <span key={c.optionKey} className="text-[9px] font-mono px-1.5 py-0.5 flex items-center gap-1"
                style={{ background: 'rgba(34,204,34,0.08)', border: '1px solid rgba(34,204,34,0.25)', color: '#22cc22' }}>
                <Check className="w-2.5 h-2.5" /> {c.optionLabel}: {c.resolvedValue}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
