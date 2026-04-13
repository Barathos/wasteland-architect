import { Input } from "@/components/ui/input";
import NCRTraitsPanel from "./NCRTraitsPanel";
import WanderersTribalTraitsPanel from "./WanderersTribalTraitsPanel";
import { Textarea } from "@/components/ui/textarea";
import { ORIGINS, SKILLS, SURVIVOR_TRAITS, MR_HANDY_ARMS } from "../../lib/falloutData";
import { Check } from "lucide-react";

const OUTCAST_TAG_OPTIONS = ['energy_weapons', 'science', 'repair'];

export default function DetailsPanel({ character, onChange, ncrTraits, onNcrTraitsChange, tribalTraits, onTribalTraitsChange, outcastTagSkill, onOutcastTagSkillChange, brotherhoodTagSkill, onBrotherhoodTagSkillChange, vaultTagSkill, onVaultTagSkillChange, vaultExperiment, onVaultExperimentChange, ghoulVaultDweller, onGhoulVaultDwellerChange, survivorTraits, onSurvivorTraitsChange, mrHandyArms, onMrHandyArmsChange }) {
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

      {/* Brotherhood Initiate — The Chain That Binds */}
      {character.origin === 'Brotherhood Initiate' && (
        <div className="mt-4 p-4 rounded-lg" style={{ background: '#060f1c', border: '1px solid #cc7722' }}>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#cc7722' }}>THE CHAIN THAT BINDS</p>
          <div className="text-[10px] font-mono mb-3 px-3 py-2" style={{ background: 'rgba(204,119,34,0.08)', border: '1px solid rgba(204,119,34,0.3)', color: '#f5c518' }}>
            You must follow the Brotherhood command structure. Disobedience risks expulsion and reclamation of all Brotherhood technology.
          </div>
          <p className="text-xs font-mono mb-2" style={{ color: '#6a8a9a' }}>Extra Tag Skill (choose one):</p>
          <div className="flex gap-2">
            {OUTCAST_TAG_OPTIONS.map(key => {
              const skill = SKILLS.find(s => s.key === key);
              const sel = brotherhoodTagSkill === key;
              return (
                <button key={key} onClick={() => onBrotherhoodTagSkillChange(sel ? '' : key)}
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

      {/* Brotherhood Outcast (Wanderers) — The Chain That Breaks */}
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

      {/* Vault Dweller — Vault Kid */}
      {character.origin === 'Vault Dweller' && (
        <div className="mt-4 p-4 rounded-lg space-y-4" style={{ background: '#060f1c', border: '1px solid #4488ff' }}>
          <p className="text-xs font-bold tracking-widest" style={{ color: '#4488ff' }}>TRAIT: VAULT KID</p>
          <ul className="space-y-1">
            {['Reduce difficulty of END tests to resist disease.', 'One additional Tag skill of your choice.', 'Once per quest, if the GM introduces a vault complication, you regain 1 Luck Point.'].map((l, i) => (
              <li key={i} className="text-[10px] font-mono flex gap-1.5" style={{ color: '#a8c8d8' }}><span style={{ color: '#4488ff' }}>✦</span>{l}</li>
            ))}
          </ul>
          <div>
            <p className="text-xs font-mono mb-2" style={{ color: '#6a8a9a' }}>Extra Tag Skill (any):</p>
            <select value={vaultTagSkill || ''} onChange={e => onVaultTagSkillChange(e.target.value)}
              className="w-full text-xs px-2 py-1.5" style={{ background: '#0a1525', border: '1px solid #4488ff', color: '#e8e8e8', outline: 'none' }}>
              <option value="">— select a skill —</option>
              {SKILLS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <p className="text-xs font-mono mb-1" style={{ color: '#6a8a9a' }}>Vault Experiment Type (optional):</p>
            <input value={vaultExperiment || ''} onChange={e => onVaultExperimentChange(e.target.value)}
              placeholder="e.g. Social isolation, forced drug trials, FEV exposure..."
              className="w-full text-xs px-2 py-1.5" style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none' }} />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="ghoul-vd" checked={!!ghoulVaultDweller} onChange={e => onGhoulVaultDwellerChange(e.target.checked)}
              style={{ accentColor: '#22cc22', width: '14px', height: '14px' }} />
            <label htmlFor="ghoul-vd" className="text-xs font-mono cursor-pointer" style={{ color: '#22cc22' }}>Ghoul Vault Dweller (GM permission — replaces Vault Kid with Necrotic Post-Human)</label>
          </div>
        </div>
      )}

      {/* Ghoul — Necrotic Post-Human */}
      {character.origin === 'Ghoul' && (
        <div className="mt-4 p-4 rounded-lg" style={{ background: '#060f1c', border: '1px solid #22cc22' }}>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#22cc22' }}>TRAIT: NECROTIC POST-HUMAN</p>
          <ul className="space-y-1">
            {['Immune to radiation damage — instead regain 1 HP per 3 radiation damage received.', 'When resting in an irradiated area, re-roll dice when checking whether injuries heal.', 'Survival is always a Tag skill (+2 bonus ranks).', 'CHA tests with smoothskins may face increased difficulty or complication range based on NPC attitudes.'].map((l, i) => (
              <li key={i} className="text-[10px] font-mono flex gap-1.5 mt-1" style={{ color: '#a8c8d8' }}><span style={{ color: '#22cc22' }}>✦</span>{l}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Super Mutant — Forced Evolution */}
      {character.origin === 'Super Mutant' && (
        <div className="mt-4 p-4 rounded-lg" style={{ background: '#060f1c', border: '1px solid #cc4444' }}>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#cc4444' }}>TRAIT: FORCED EVOLUTION</p>
          <ul className="space-y-1">
            {['STR and END +2 at creation; max STR and END raised to 12.', 'Max INT and CHA reduced to 6. Max 4 ranks in any skill.', 'Immune to radiation and poison damage.', 'Over 7 feet tall. Can only wear Raider Armor. Sterile.'].map((l, i) => (
              <li key={i} className="text-[10px] font-mono flex gap-1.5 mt-1" style={{ color: '#a8c8d8' }}><span style={{ color: '#cc4444' }}>✦</span>{l}</li>
            ))}
          </ul>
          <p className="text-[10px] font-mono mt-2 px-2 py-1" style={{ background: 'rgba(204,68,68,0.1)', border: '1px solid rgba(204,68,68,0.3)', color: '#cc4444' }}>⚠ Armor: Raider Armor variants only. Standard armor cannot be worn.</p>
        </div>
      )}

      {/* Mister Handy — Arm Attachments */}
      {character.origin === 'Mister Handy' && (
        <div className="mt-4 p-4 rounded-lg" style={{ background: '#060f1c', border: '1px solid #cc7722' }}>
          <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#cc7722' }}>ARM ATTACHMENTS (choose 3)</p>
          <p className="text-[10px] font-mono mb-3" style={{ color: '#6a8a9a' }}>360° vision reduces difficulty of PER tests by 1. Carry weight 150 lbs fixed.</p>
          <div className="space-y-2">
            {MR_HANDY_ARMS.map(arm => {
              const sel = (mrHandyArms || []).includes(arm.key);
              const atLimit = (mrHandyArms || []).length >= 3 && !sel;
              return (
                <button key={arm.key} onClick={() => {
                  if (atLimit) return;
                  const updated = sel ? (mrHandyArms || []).filter(k => k !== arm.key) : [...(mrHandyArms || []), arm.key];
                  onMrHandyArmsChange(updated);
                }} className="w-full text-left px-3 py-2 transition-all"
                  style={{ background: sel ? 'rgba(204,119,34,0.12)' : '#0a1525', border: `1px solid ${sel ? '#cc7722' : '#1e3a5f'}`, opacity: atLimit ? 0.4 : 1, cursor: atLimit ? 'not-allowed' : 'pointer' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: sel ? '#cc7722' : '#e8e8e8' }}>{sel ? '✓ ' : ''}{arm.label}</span>
                    <span className="text-[10px] font-mono" style={{ color: '#22cc22' }}>{arm.damage} {arm.damageType}</span>
                  </div>
                  {arm.note && <p className="text-[10px] font-mono mt-0.5" style={{ color: '#6a8a9a' }}>{arm.note}</p>}
                </button>
              );
            })}
          </div>
          {(mrHandyArms || []).length > 0 && !(mrHandyArms || []).includes('pincer_arm') && (
            <p className="text-[10px] font-mono mt-3 px-2 py-1.5" style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.3)', color: '#f5c518' }}>⚠ Without a Pincer, you cannot use Lockpick, Repair, or Throwing skills, or manipulate objects.</p>
          )}
        </div>
      )}

      {/* Survivor — Choose Two Traits */}
      {character.origin === 'Survivor' && (
        <div className="mt-4 p-4 rounded-lg" style={{ background: '#060f1c', border: '1px solid #6a9aba' }}>
          <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#6a9aba' }}>CHOOSE TWO TRAITS (or 1 trait + 1 perk)</p>
          <p className="text-[10px] font-mono mb-3" style={{ color: '#6a8a9a' }}>Select up to 2 traits. Or select 1 trait and check "Extra Perk" for one additional perk slot.</p>
          <div className="space-y-2">
            {[...SURVIVOR_TRAITS, { key: '_perk_slot_', label: '+ Extra Perk Slot', benefit: 'Gain one additional perk instead of a second trait.', penalty: '' }].map(trait => {
              const sel = (survivorTraits || []).includes(trait.key);
              const atLimit = (survivorTraits || []).length >= 2 && !sel;
              return (
                <button key={trait.key} onClick={() => {
                  if (atLimit) return;
                  const updated = sel ? (survivorTraits || []).filter(k => k !== trait.key) : [...(survivorTraits || []), trait.key];
                  onSurvivorTraitsChange(updated);
                }} className="w-full text-left px-3 py-2 transition-all"
                  style={{ background: sel ? 'rgba(106,154,186,0.1)' : '#0a1525', border: `1px solid ${sel ? '#6a9aba' : '#1e3a5f'}`, opacity: atLimit ? 0.4 : 1, cursor: atLimit ? 'not-allowed' : 'pointer' }}>
                  <span className="text-xs font-bold" style={{ color: sel ? '#6a9aba' : '#e8e8e8' }}>{sel ? '✓ ' : ''}{trait.label}</span>
                  {trait.benefit && <p className="text-[10px] font-mono mt-0.5" style={{ color: '#4ade80' }}>✦ {trait.benefit}</p>}
                  {trait.penalty && <p className="text-[10px] font-mono" style={{ color: '#f97316' }}>✦ {trait.penalty}</p>}
                </button>
              );
            })}
          </div>
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