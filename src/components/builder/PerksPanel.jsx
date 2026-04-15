import { useState } from "react";
import { RARE_BOOKS } from "../../lib/falloutData";
import { CORE_PERKS } from "../../lib/sourceTruthData";
import { Check, Lock } from "lucide-react";

// Normalize SPECIAL abbr → character key
const SPECIAL_KEY_MAP = { STR: 'strength', PER: 'perception', END: 'endurance', CHA: 'charisma', INT: 'intelligence', AGI: 'agility', LCK: 'luck' };

// SPECIAL order for grouping
const SPECIAL_ORDER = ['STR', 'PER', 'END', 'CHA', 'INT', 'AGI', 'LCK'];
const SPECIAL_LABELS = { STR: 'Strength', PER: 'Perception', END: 'Endurance', CHA: 'Charisma', INT: 'Intelligence', AGI: 'Agility', LCK: 'Luck' };

// Normalize requirements to character key format
function normalizeReqs(req) {
  if (!req) return {};
  const out = {};
  for (const [k, v] of Object.entries(req)) {
    if (k === 'level' || k === 'note') { out[k] = v; continue; }
    const mapped = SPECIAL_KEY_MAP[k] || k;
    out[mapped] = v;
  }
  return out;
}

// Determine primary SPECIAL grouping key (abbr) from raw requirements
function getPrimarySpecial(rawReq) {
  for (const abbr of SPECIAL_ORDER) {
    if (rawReq[abbr] !== undefined) return abbr;
  }
  return null;
}

const ALL_PERKS = [
  ...CORE_PERKS.map(p => {
    const normalized = normalizeReqs(p.requirements);
    return {
      key: p.key,
      label: p.label,
      description: p.description,
      source: p.source || 'Core',
      maxRanks: p.ranks || p.maxRanks || 1,
      rawReq: p.requirements || {},
      requirement: normalized
    };
  }),
];

// Remove duplicates by key (first wins = Core first)
const seen = new Set();
const DEDUPED_PERKS = ALL_PERKS.filter(p => { if (seen.has(p.key)) return false; seen.add(p.key); return true; });

// Group by primary SPECIAL attribute
function groupPerksBySpecial(perks) {
  const groups = {};
  for (const abbr of SPECIAL_ORDER) groups[abbr] = [];
  groups['General'] = [];
  for (const perk of perks) {
    const primary = getPrimarySpecial(perk.rawReq || {});
    if (primary) groups[primary].push(perk);
    else groups['General'].push(perk);
  }
  return groups;
}

function buildRareBookPerks(character) {
  const foundRolls = (() => { try { return JSON.parse(character.rare_books_found || '[]'); } catch { return []; } })();
  return RARE_BOOKS
    .filter(b => foundRolls.includes(b.roll))
    .map(b => ({
      key: `rare_book_${b.roll}`, label: b.perk, description: b.perkDescription, source: 'Rare Book',
      maxRanks: 1, rawReq: {}, requirement: { level: 1 }, bookTitle: b.title,
    }));
}

function SourceBadge({ source }) {
  if (source === 'Wanderers') return <span className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: 'rgba(180,120,255,0.12)', color: '#aa66ff', border: '1px solid rgba(170,102,255,0.35)' }}>Wanderers</span>;
  if (source === 'Settlers') return <span className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: 'rgba(168,200,216,0.1)', color: '#6a9aba', border: '1px solid rgba(106,154,186,0.3)' }}>Settlers</span>;
  if (source === 'Rare Book') return <span className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: 'rgba(34,204,34,0.1)', color: '#22cc22', border: '1px solid rgba(34,204,34,0.3)' }}>📚 Book</span>;
  // Core — no badge (clean look)
  return null;
}

export default function PerksPanel({ character, selectedPerks, onPerksChange }) {
  const level = character.level || 1;
  const [statFilter, setStatFilter] = useState('ALL');
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL');

  const meetsRequirements = (perk) => {
    const req = perk.requirement;
    if ((req.level || 1) > level) return false;
    for (const [key, val] of Object.entries(req)) {
      if (key === 'level') continue;
      if ((character[key] || 5) < val) return false;
    }
    return true;
  };

  const togglePerk = (perkKey) => {
    if (selectedPerks.includes(perkKey)) onPerksChange(selectedPerks.filter(p => p !== perkKey));
    else onPerksChange([...selectedPerks, perkKey]);
  };

  const rareBookPerks = buildRareBookPerks(character);
  const maxPerks = 1 + Math.floor((level - 1) / 2) + rareBookPerks.length;
  const canAdd = selectedPerks.length < maxPerks;

  const filteredPerks = DEDUPED_PERKS
    .filter(perk => {
      if (statFilter === 'ALL') return true;
      const primary = getPrimarySpecial(perk.rawReq || {}) || 'General';
      return primary === statFilter;
    })
    .filter(perk => {
      if (availabilityFilter === 'ALL') return true;
      const available = meetsRequirements(perk);
      return availabilityFilter === 'AVAILABLE' ? available : !available;
    });

  const grouped = groupPerksBySpecial(filteredPerks);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Perks Selected</span>
        <span className={`font-heading font-bold text-xl ${selectedPerks.length < maxPerks ? 'text-primary glow-text' : 'text-secondary glow-green'}`}>
          {selectedPerks.length}/{maxPerks}
        </span>
      </div>

      <p className="text-xs text-muted-foreground font-mono">
        Select perks your character has earned. Locked perks require higher level or attributes. Perks are grouped by primary SPECIAL attribute.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-lg bg-muted border border-border">
        <div>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Filter By Stat</p>
          <select
            value={statFilter}
            onChange={(e) => setStatFilter(e.target.value)}
            className="w-full h-8 px-2 text-xs font-mono bg-card border border-border rounded text-foreground outline-none"
          >
            <option value="ALL">All Stats</option>
            {SPECIAL_ORDER.map(abbr => (
              <option key={abbr} value={abbr}>{SPECIAL_LABELS[abbr]} ({abbr})</option>
            ))}
            <option value="General">General</option>
          </select>
        </div>
        <div>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Filter By Requirements</p>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="w-full h-8 px-2 text-xs font-mono bg-card border border-border rounded text-foreground outline-none"
          >
            <option value="ALL">All Perks</option>
            <option value="AVAILABLE">Available (Meets Requirements)</option>
            <option value="UNAVAILABLE">Unavailable (Missing Requirements)</option>
          </select>
        </div>
      </div>

      {/* Rare Book Perks */}
      {rareBookPerks.length > 0 && (
        <div>
          <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs">📚</span>
            Rare Perks (Books Found)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {rareBookPerks.map(perk => {
              const isSelected = selectedPerks.includes(perk.key);
              return (
                <button key={perk.key}
                  onClick={() => isSelected ? onPerksChange(selectedPerks.filter(p => p !== perk.key)) : onPerksChange([...selectedPerks, perk.key])}
                  className={`text-left p-3 rounded-lg border transition-all duration-200 ${isSelected ? 'border-primary/50 bg-primary/10' : 'border-border bg-card hover:border-primary/30'}`}>
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

      {/* Grouped perk sections */}
      {[...SPECIAL_ORDER.map(abbr => ({ key: abbr, label: `${SPECIAL_LABELS[abbr]} (${abbr})` })), { key: 'General', label: 'General' }].map(({ key: groupKey, label: groupLabel }) => {
        const perks = grouped[groupKey];
        if (!perks || perks.length === 0) return null;
        return (
          <div key={groupKey}>
            <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-bold text-primary">{groupKey === 'General' ? '★' : groupKey}</span>
              {groupLabel}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {perks.map(perk => {
                const isSelected = selectedPerks.includes(perk.key);
                const isLocked = !meetsRequirements(perk);
                return (
                  <button
                    key={perk.key}
                    onClick={() => !isLocked && (isSelected || canAdd) && togglePerk(perk.key)}
                    disabled={isLocked || (!isSelected && !canAdd)}
                    className={`text-left p-3 rounded-lg border transition-all duration-200 ${
                      isSelected ? 'border-primary/50 bg-primary/10' : isLocked ? 'border-border/50 bg-card/50 opacity-50 cursor-not-allowed' : 'border-border bg-card hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h5 className={`font-heading font-semibold text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>{perk.label}</h5>
                        <SourceBadge source={perk.source} />
                        {perk.maxRanks > 1 && <span className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: 'rgba(245,197,24,0.08)', color: '#a89040', border: '1px solid rgba(245,197,24,0.2)' }}>{perk.maxRanks}R</span>}
                      </div>
                      <div className="flex-shrink-0">
                        {isSelected ? <Check className="w-4 h-4 text-primary" /> : isLocked ? <Lock className="w-3.5 h-3.5 text-muted-foreground" /> : null}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{perk.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {Object.entries(perk.requirement).filter(([k]) => k !== 'level').map(([key, val]) => (
                        <span key={key} className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${(character[key] || 5) >= val ? 'bg-secondary/20 text-secondary' : 'bg-destructive/20 text-destructive'}`}>
                          {key.slice(0, 3).toUpperCase()} {val}+
                        </span>
                      ))}
                      {perk.requirement.level > 1 && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${level >= perk.requirement.level ? 'bg-secondary/20 text-secondary' : 'bg-destructive/20 text-destructive'}`}>
                          LVL {perk.requirement.level}+
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {filteredPerks.length === 0 && (
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="text-xs font-mono text-muted-foreground">No perks match the current filters.</p>
        </div>
      )}
    </div>
  );
}
