import { PERKS, WANDERERS_PERKS, RARE_BOOKS } from "../../lib/falloutData";
import { Check, Lock } from "lucide-react";

// Map SPECIAL abbr to character key
const SPECIAL_KEY_MAP = { STR: 'strength', PER: 'perception', END: 'endurance', CHA: 'charisma', INT: 'intelligence', AGI: 'agility', LCK: 'luck' };

const ALL_PERKS = [
  ...PERKS,
  ...WANDERERS_PERKS.map(p => ({
    key: p.key,
    label: p.label,
    description: p.description,
    source: p.source,
    maxRanks: p.ranks,
    rank: 1,
    requirement: Object.fromEntries(
      Object.entries(p.requirements).map(([k, v]) =>
        k === 'level' ? [k, v] : [SPECIAL_KEY_MAP[k] || k.toLowerCase(), v]
      )
    ),
  }))
];

function buildRareBookPerks(character) {
  const foundRolls = (() => { try { return JSON.parse(character.rare_books_found || '[]'); } catch { return []; } })();
  return RARE_BOOKS
    .filter(b => foundRolls.includes(b.roll))
    .map(b => ({
      key: `rare_book_${b.roll}`,
      label: b.perk,
      description: b.perkDescription,
      source: 'Rare Book',
      maxRanks: 1,
      rank: 1,
      requirement: { level: 1 },
      bookTitle: b.title,
    }));
}

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

  const rareBookPerks = buildRareBookPerks(character);

  const perksByLevel = ALL_PERKS.reduce((acc, perk) => {
    const lvl = perk.requirement.level;
    if (!acc[lvl]) acc[lvl] = [];
    acc[lvl].push(perk);
    return acc;
  }, {});

  const maxPerks = 1 + Math.floor((level - 1) / 2) + rareBookPerks.length;

  return (
    <div className="space-y-5">
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

      {/* Rare Book Perks */}
      {rareBookPerks.length > 0 && (
        <div>
          <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs">📚</span>
            Rare Perks (Books Found)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {rareBookPerks.map((perk) => {
              const isSelected = selectedPerks.includes(perk.key);
              return (
                <button key={perk.key}
                  onClick={() => isSelected ? onPerksChange(selectedPerks.filter(p => p !== perk.key)) : onPerksChange([...selectedPerks, perk.key])}
                  className={`text-left p-3 rounded-lg border transition-all duration-200 ${
                    isSelected ? 'border-primary/50 bg-primary/10' : 'border-border bg-card hover:border-primary/30'
                  }`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h5 className={`font-heading font-semibold text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>{perk.label}</h5>
                      <span className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: 'rgba(34,204,34,0.1)', color: '#22cc22', border: '1px solid rgba(34,204,34,0.3)' }}>📚 {perk.bookTitle}</span>
                    </div>
                    {isSelected && <span className="text-primary text-sm">✓</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{perk.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

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
                const isWanderers = perk.source === 'Wanderers';
                const isSettlers = perk.source === 'Settlers';

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
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h5 className={`font-heading font-semibold text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {perk.label}
                        </h5>
                        {isWanderers && (
                          <span className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: 'rgba(180,120,255,0.12)', color: '#aa66ff', border: '1px solid rgba(170,102,255,0.35)' }}>Wanderers</span>
                        )}
                        {isSettlers && (
                          <span className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: 'rgba(168,200,216,0.1)', color: '#6a9aba', border: '1px solid rgba(106,154,186,0.3)' }}>Settlers</span>
                        )}
                        {perk.maxRanks > 1 && (
                          <span className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: 'rgba(245,197,24,0.08)', color: '#a89040', border: '1px solid rgba(245,197,24,0.2)' }}>{perk.maxRanks}R</span>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <Check className="w-4 h-4 text-primary" />
                        ) : isLocked ? (
                          <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                        ) : null}
                      </div>
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