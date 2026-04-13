import { Input } from "@/components/ui/input";
import NCRTraitsPanel from "./NCRTraitsPanel";
import { Textarea } from "@/components/ui/textarea";
import { ORIGINS } from "../../lib/falloutData";
import { Check } from "lucide-react";

export default function DetailsPanel({ character, onChange, ncrTraits, onNcrTraitsChange }) {
  const selectedOrigin = ORIGINS.find(o => o.label === character.origin);

  return (
    <div className="space-y-6">
      {/* Character Name */}
      <div>
        <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
          Character Name
        </label>
        <Input
          value={character.name || ""}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Enter name..."
          className="bg-muted border-border font-heading text-lg h-12"
        />
      </div>

      {/* Origin Selection */}
      <div>
        <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
          Origin
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ORIGINS.map((origin) => {
            const isSelected = character.origin === origin.label;
            return (
              <button
                key={origin.key}
                onClick={() => onChange({ origin: origin.label })}
                className={`
                  text-left p-4 rounded-lg border transition-all duration-200
                  ${isSelected
                    ? "border-primary/50 bg-primary/10"
                    : "border-border bg-card hover:border-primary/30 hover:bg-muted"
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                  <h4 className={`font-heading font-semibold text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {origin.label}
                  </h4>
                  {origin.source && (
                    <span className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: 'rgba(168,200,216,0.1)', color: '#6a9aba', border: '1px solid rgba(106,154,186,0.3)' }}>{origin.source}</span>
                  )}
                </div>
                  {isSelected && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {origin.description}
                </p>
                {origin.bonusSkills && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {origin.bonusSkills.map(s => (
                      <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary/20 text-secondary">
                        +{s.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                )}
                {origin.special && (
                  <p className="text-[10px] font-mono text-primary/80 mt-1.5 italic">
                    {origin.special}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Portrait URL */}
      <div>
        <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
          Portrait URL (Optional)
        </label>
        <div className="flex gap-3 items-start">
          <Input
            value={character.portrait_url || ""}
            onChange={(e) => onChange({ portrait_url: e.target.value })}
            placeholder="https://..."
            className="bg-muted border-border font-mono text-sm"
          />
          {character.portrait_url && (
            <img src={character.portrait_url} alt="Portrait preview"
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              style={{ border: '2px solid hsl(var(--primary))' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          )}
        </div>
      </div>

      {/* NCR Traits */}
      {character.origin === 'New California Republic' && (
        <NCRTraitsPanel ncrTraits={ncrTraits || []} onNcrTraitsChange={onNcrTraitsChange} />
      )}

      {/* Background */}
      <div>
        <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
          Background Story (Optional)
        </label>
        <Textarea
          value={character.background || ""}
          onChange={(e) => onChange({ background: e.target.value })}
          placeholder="Tell the tale of your character..."
          rows={4}
          className="bg-muted border-border font-mono text-sm resize-none"
        />
      </div>
    </div>
  );
}