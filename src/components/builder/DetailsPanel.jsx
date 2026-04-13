import { Input } from "@/components/ui/input";
import NCRTraitsPanel from "./NCRTraitsPanel";
import WanderersTribalTraitsPanel from "./WanderersTribalTraitsPanel";
import { Textarea } from "@/components/ui/textarea";
import { ORIGINS, SKILLS } from "../../lib/falloutData";
import { Check } from "lucide-react";

const OUTCAST_TAG_OPTIONS = ['energy_weapons', 'science', 'repair'];

export default function DetailsPanel({ character, onChange, ncrTraits, onNcrTraitsChange, tribalTraits, onTribalTraitsChange, outcastTagSkill, onOutcastTagSkillChange }) {
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

      {/* Tribal Traits (Wanderers) */}
      {character.origin === 'Tribal' && (
        <WanderersTribalTraitsPanel tribalTraits={tribalTraits || []} onTribalTraitsChange={onTribalTraitsChange} />
      )}

      {/* Brotherhood Outcast — The Chain that Breaks */}
      {character.origin === 'Brotherhood Outcast' && (
        <div className="mt-4 p-4 rounded-lg" style={{ background: '#060f1c', border: '1px solid #cc7722' }}>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#cc7722' }}>THE CHAIN THAT BREAKS</p>
          <div className="text-[10px] font-mono mb-3 px-3 py-2" style={{ background: 'rgba(204,119,34,0.08)', border: '1px solid rgba(204,119,34,0.3)', color: '#f5c518' }}>
            Starting bonus: +1d20 junk. Spend 1 AP (up to 3×) for 1 Uncommon material per AP. One extra loot roll without spending AP.
          </div>
          <p className="text-xs font-mono mb-2" style={{ color: '#6a8a9a' }}>Extra Tag Skill (choose one):</p>
          <div className="flex gap-2">
            {OUTCAST_TAG_OPTIONS.map(key => {
              const skill = SKILLS.find(s => s.key === key);
              const sel = outcastTagSkill === key;
              return (
                <button key={key} onClick={() => onOutcastTagSkillChange(sel ? '' : key)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded transition-all"
                  style={{ background: sel ? 'rgba(204,119,34,0.15)' : 'transparent', border: `1px solid ${sel ? '#cc7722' : '#1e3a5f'}`, color: sel ? '#cc7722' : '#4a6a8a' }}>
                  {sel && <Check className="w-3 h-3" />}
                  {skill?.label || key}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Child of Atom — Rad Sponge */}
      {character.origin === 'Child of Atom' && (
        <div className="mt-4 p-4 rounded-lg" style={{ background: '#060f1c', border: '1px solid #22cc22' }}>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#22cc22' }}>TRAIT: RAD SPONGE</p>
          <ul className="space-y-1.5">
            {[
              'Extra perk at level 1.',
              'Base Radiation damage resistance: 1.',
              'Once per scene, intercept Radiation damage for a nearby ally.',
              'Gain Radiation Points (0–5) when taking rad damage; spend on melee attacks for +2 CD Radiation damage per point.',
              'Lose 1 Radiation Point per sleep.',
            ].map((line, i) => (
              <li key={i} className="text-[10px] font-mono flex items-start gap-1.5" style={{ color: '#a8c8d8' }}>
                <span style={{ color: '#22cc22' }}>✦</span>{line}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Nightkin — Stealth Boy Addict */}
      {character.origin === 'Nightkin' && (
        <div className="mt-4 p-4 rounded-lg" style={{ background: '#060f1c', border: '1px solid #8822cc' }}>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#aa44dd' }}>TRAIT: STEALTH BOY ADDICT</p>
          <ul className="space-y-1.5">
            {[
              'STR and END +2 at creation (applied automatically in S.P.E.C.I.A.L.).',
              'Max STR and END raised to 12; max INT and CHA reduced to 8.',
              'Maximum 4 ranks in any skill.',
              'Immune to Radiation and Poison.',
              'Can only wear super mutant armor.',
              'Roll 1 CD per Stealth Boy dose used this session. On any Effect result: Addiction triggered.',
              'Addiction: +2 difficulty to PER and INT tests, +1 to CHA tests until cured.',
            ].map((line, i) => (
              <li key={i} className="text-[10px] font-mono flex items-start gap-1.5" style={{ color: '#a8c8d8' }}>
                <span style={{ color: '#aa44dd' }}>✦</span>{line}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assaultron */}
      {character.origin === 'Assaultron' && (
        <div className="mt-4 p-4 rounded-lg" style={{ background: '#060f1c', border: '1px solid #4488ff' }}>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#4488ff' }}>ASSAULTRON COMBAT CHASSIS</p>
          <ul className="space-y-1.5">
            {[
              'Robot: Immune to radiation, poison, and disease.',
              'Cannot use chems, food, drink, or rest. Must receive repairs to heal.',
              'Carry weight 150 lbs.',
              'Built-in Claws (4 CD Physical, Unarmed). Head Laser (5 CD Piercing Energy, Close). Self-Destruct (6 CD Blast Energy — permanent).',
              'Head Laser Capacitor upgrades: Mk III–Mk VI for additional damage and shots.',
            ].map((line, i) => (
              <li key={i} className="text-[10px] font-mono flex items-start gap-1.5" style={{ color: '#a8c8d8' }}>
                <span style={{ color: '#4488ff' }}>✦</span>{line}
              </li>
            ))}
          </ul>
        </div>
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