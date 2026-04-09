import { PERKS } from "../../lib/falloutData";
import { Check, Lock } from "lucide-react";

export default function PerksPanel({ character, selectedPerks, onPerksChange }) {
  const level = character.level || 1;

  const meetsRequirements = (perk) => {
    const req = perk.requirement;
    if (level < req.level) return false;
    for (const [key, val] of Object.entries(req)) {
      if (key === 'level') continue;
      if ((character[key] || 5) < val) return false;
    }
    return true;
  };

  const togglePerk = (perkKey) => {
    if (selectedPerks.includes(perkKey)) {
      onPerksChange(selectedPerks.filter(p => p !== perkKey));
    } else {
      onPerksChange([...selectedPerks, perkKey]);
    }
  };

  // Group perks by level requirement
  const perksByLevel = PERKS.reduce((acc, perk) => {
    const lvl = perk.requirement.level;
    if (!acc[lvl]) acc[lvl] = [];
    acc[lvl].push(perk);
    return acc;
  }, {});

  const maxPerks = 1 + Math.floor((level - 1) / 2); // 1 perk at level 1, +1 every 2 levels

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Perks Selected
        </span>
        <span className={`font-heading font-bold text-xl ${selectedPerks.length < maxPerks ? 'text-primary glow-text' : 'text-secondary glow-green'}`}>
          {selectedPerks.length}/{maxPerks}
        </span>
      </div>

      <p className="text-xs text-muted-foreground font-mono">
        Select perks your character has earned. Locked perks require higher level or attributes.
      </p>

      {/* Perks by Level */}
      {Object.entries(perksByLevel)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([reqLevel, perks]) => (
        <div key={reqLevel}>
          <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-bold text-primary">
              {reqLevel}
            </span>
            Level {reqLevel}+ Perks
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {perks.map((perk) => {
              const isSelected = selectedPerks.includes(perk.key);
              const isAvailable = meetsRequirements(perk);
              const isLocked = !isAvailable;

              return (
                <button
                  key={perk.key}
                  onClick={() => !isLocked && selectedPerks.length < maxPerks && togglePerk(perk.key)}
                  disabled={isLocked || (!isSelected && selectedPerks.length >= maxPerks)}
                  className={`
                    text-left p-3 rounded-lg border transition-all duration-200
                    ${isSelected
                      ? "border-primary/50 bg-primary/10"
                      : isLocked
                        ? "border-border/50 bg-card/50 opacity-50 cursor-not-allowed"
                        : "border-border bg-card hover:border-primary/30"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className={`font-heading font-semibold text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {perk.label}
                    </h5>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : isLocked ? (
                      <Lock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{perk.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {Object.entries(perk.requirement).filter(([k]) => k !== 'level').map(([key, val]) => (
                      <span key={key} className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        (character[key] || 5) >= val ? 'bg-secondary/20 text-secondary' : 'bg-destructive/20 text-destructive'
                      }`}>
                        {key.toUpperCase().slice(0, 3)} {val}+
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}