import { NCR_TRAITS } from "../../lib/falloutData";

export default function NCRTraitsPanel({ ncrTraits, onNcrTraitsChange }) {
  const toggle = (key) => {
    if (ncrTraits.includes(key)) {
      onNcrTraitsChange(ncrTraits.filter(k => k !== key));
    } else if (ncrTraits.length < 2) {
      onNcrTraitsChange([...ncrTraits, key]);
    } else {
      // Deselect first, add new
      onNcrTraitsChange([ncrTraits[1], key]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider">
          NCR Traits
        </label>
        <span className={`text-xs font-mono font-bold ${ncrTraits.length === 2 ? 'text-secondary' : 'text-primary'}`}>
          {ncrTraits.length}/2 selected
        </span>
      </div>
      <p className="text-[11px] font-mono text-muted-foreground">
        Choose exactly 2 traits. Each grants a benefit and a penalty.
      </p>
      <div className="grid grid-cols-1 gap-2">
        {NCR_TRAITS.map((trait) => {
          const isSelected = ncrTraits.includes(trait.key);
          return (
            <button
              key={trait.key}
              onClick={() => toggle(trait.key)}
              className={`text-left p-3 rounded-lg border transition-all duration-200 ${
                isSelected
                  ? "border-primary/50 bg-primary/10"
                  : "border-border bg-card hover:border-primary/30 hover:bg-muted"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`font-heading font-semibold text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {trait.label}
                </span>
                {isSelected && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/20 text-primary">SELECTED</span>
                )}
              </div>
              <p className="text-[11px] font-mono mb-1" style={{ color: '#4ade80' }}>
                ✦ {trait.benefit}
              </p>
              <p className="text-[11px] font-mono" style={{ color: '#f97316' }}>
                ✦ {trait.penalty}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}