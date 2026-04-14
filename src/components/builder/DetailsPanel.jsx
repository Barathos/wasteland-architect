import { Input } from "@/components/ui/input";
import NCRTraitsPanel from "./NCRTraitsPanel";
import WanderersTribalTraitsPanel from "./WanderersTribalTraitsPanel";
import SubOriginSelector from "./SubOriginSelector";
import { Textarea } from "@/components/ui/textarea";
import { ORIGINS, SKILLS, SURVIVOR_TRAITS, MR_HANDY_ARMS } from "../../lib/falloutData";
import { Check } from "lucide-react";

const OUTCAST_TAG_OPTIONS = ['energy_weapons', 'science', 'repair'];

function OriginChoices({ character, onChange, selectedOrigin,
  ncrTraits, onNcrTraitsChange,
  tribalTraits, onTribalTraitsChange,
  outcastTagSkill, onOutcastTagSkillChange,
  brotherhoodTagSkill, onBrotherhoodTagSkillChange,
  vaultTagSkill, onVaultTagSkillChange,
  vaultExperiment, onVaultExperimentChange,
  ghoulVaultDweller, onGhoulVaultDwellerChange,
  survivorTraits, onSurvivorTraitsChange,
  mrHandyArms, onMrHandyArmsChange,
}) {
  const origin = character.origin;

  if (origin === 'Vault Dweller') return (
    <div className="mt-4 pt-3 space-y-3" style={{ borderTop: '1px solid #1e3a5f' }}>
      <p className="text-[10px] font-mono mb-2" style={{ color: '#6a8a9a' }}>Extra Tag Skill (any):</p>
      <select value={vaultTagSkill || ''} onChange={e => onVaultTagSkillChange(e.target.value)}
        className="w-full text-xs px-2 py-1.5" style={{ background: '#0a1525', border: '1px solid #4488ff', color: '#e8e8e8', outline: 'none' }}>
        <option value="">— select a skill —</option>
        {SKILLS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
      </select>
      <div>
        <p className="text-[10px] font-mono mb-1" style={{ color: '#6a8a9a' }}>Vault Experiment Type (optional):</p>
        <input value={vaultExperiment || ''} onChange={e => onVaultExperimentChange(e.target.value)}
          placeholder="e.g. Social isolation, forced drug trials, FEV exposure..."
          className="w-full text-xs px-2 py-1.5" style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none' }} />
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" id="ghoul-vd" checked={!!ghoulVaultDweller} onChange={e => onGhoulVaultDwellerChange(e.target.checked)}
          style={{ accentColor: '#22cc22', width: '14px', height: '14px' }} />
        <label htmlFor="ghoul-vd" className="text-[10px] font-mono cursor-pointer" style={{ color: '#22cc22' }}>
          Ghoul Vault Dweller (GM permission — replaces Vault Kid with Necrotic Post-Human)
        </label>
      </div>
    </div>
  );

  if (origin === 'Brotherhood Initiate') return (
    <div className="mt-4 pt-3" style={{ borderTop: '1px solid #1e3a5f' }}>
      <p className="text-[10px] font-mono mb-2" style={{ color: '#6a8a9a' }}>Extra Tag Skill (choose one):</p>
      <div className="flex gap-2 flex-wrap">
        {OUTCAST_TAG_OPTIONS.map(key => {
          const skill = SKILLS.find(s => s.key === key);
          const sel = brotherhoodTagSkill === key;
          return (
            <button key={key} onClick={() => onBrotherhoodTagSkillChange(sel ? '' : key)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all"
              style={{ background: sel ? 'rgba(204,119,34,0.15)' : 'transparent', border: `1px solid ${sel ? '#cc7722' : '#1e3a5f'}`, color: sel ? '#cc7722' : '#4a6a8a' }}>
              {sel && <Check className="w-3 h-3" />}
              {skill?.label || key}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (origin === 'Brotherhood Outcast') return (
    <div className="mt-4 pt-3" style={{ borderTop: '1px solid #1e3a5f' }}>
      <p className="text-[10px] font-mono mb-2" style={{ color: '#6a8a9a' }}>Extra Tag Skill (choose one):</p>
      <div className="flex gap-2 flex-wrap">
        {OUTCAST_TAG_OPTIONS.map(key => {
          const skill = SKILLS.find(s => s.key === key);
          const sel = outcastTagSkill === key;
          return (
            <button key={key} onClick={() => onOutcastTagSkillChange(sel ? '' : key)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all"
              style={{ background: sel ? 'rgba(204,119,34,0.15)' : 'transparent', border: `1px solid ${sel ? '#cc7722' : '#1e3a5f'}`, color: sel ? '#cc7722' : '#4a6a8a' }}>
              {sel && <Check className="w-3 h-3" />}
              {skill?.label || key}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (origin === 'New California Republic') return (
    <div className="mt-4 pt-3" style={{ borderTop: '1px solid #1e3a5f' }}>
      <NCRTraitsPanel ncrTraits={ncrTraits || []} onNcrTraitsChange={onNcrTraitsChange} />
    </div>
  );

  if (origin === 'Tribal') return (
    <div className="mt-4 pt-3" style={{ borderTop: '1px solid #1e3a5f' }}>
      <WanderersTribalTraitsPanel tribalTraits={tribalTraits || []} onTribalTraitsChange={onTribalTraitsChange} />
    </div>
  );

  if (origin === 'Survivor') {
    const giftedBonuses = (() => { try { return JSON.parse(character.gifted_bonuses || '[]'); } catch { return []; } })();
    const ATTR_KEYS = [
      { abbr: 'STR', key: 'strength' }, { abbr: 'PER', key: 'perception' }, { abbr: 'END', key: 'endurance' },
      { abbr: 'CHA', key: 'charisma' }, { abbr: 'INT', key: 'intelligence' }, { abbr: 'AGI', key: 'agility' },
      { abbr: 'LCK', key: 'luck' },
    ];
    const isGiftedSelected = (survivorTraits || []).includes('gifted');
    return (
      <div className="mt-4 pt-3" style={{ borderTop: '1px solid #1e3a5f' }}>
        <p className="text-[10px] font-mono mb-2" style={{ color: '#6a8a9a' }}>Choose up to 2 traits — or 1 trait + Extra Perk Slot:</p>
        <div className="space-y-1.5">
          {[...SURVIVOR_TRAITS, { key: '_perk_slot_', label: '+ Extra Perk Slot', benefit: 'Gain one additional perk instead of a second trait.', penalty: '' }].map(trait => {
            const sel = (survivorTraits || []).includes(trait.key);
            const atLimit = (survivorTraits || []).length >= 2 && !sel;
            return (
              <div key={trait.key}>
                <button onClick={() => {
                  if (atLimit) return;
                  const updated = sel ? (survivorTraits || []).filter(k => k !== trait.key) : [...(survivorTraits || []), trait.key];
                  onSurvivorTraitsChange(updated);
                }} className="w-full text-left px-3 py-2 transition-all"
                  style={{ background: sel ? 'rgba(106,154,186,0.1)' : 'rgba(0,0,0,0.2)', border: `1px solid ${sel ? '#6a9aba' : '#1e3a5f'}`, opacity: atLimit ? 0.4 : 1, cursor: atLimit ? 'not-allowed' : 'pointer' }}>
                  <span className="text-xs font-bold" style={{ color: sel ? '#6a9aba' : '#e8e8e8' }}>{sel ? '✓ ' : ''}{trait.label}</span>
                  {trait.benefit && <p className="text-[10px] font-mono mt-0.5" style={{ color: '#4ade80' }}>✦ {trait.benefit}</p>}
                  {trait.penalty && <p className="text-[10px] font-mono" style={{ color: '#f97316' }}>✦ {trait.penalty}</p>}
                </button>
                {/* Gifted inline attribute picker */}
                {trait.key === 'gifted' && isGiftedSelected && (
                  <div style={{ marginTop: 6, padding: '8px 10px', border: '1px solid rgba(240,165,0,0.5)', borderTop: 'none', background: 'rgba(240,165,0,0.05)' }}>
                    <div className="text-[10px] font-mono mb-2" style={{ color: '#f0a500' }}>
                      Choose 2 attributes to boost +1 each ({giftedBonuses.length}/2 selected)
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {ATTR_KEYS.map(({ abbr, key }) => {
                        const isSelected = giftedBonuses.includes(key);
                        const canSelect = isSelected || giftedBonuses.length < 2;
                        return (
                          <button key={key}
                            onClick={() => {
                              const updated = isSelected
                                ? giftedBonuses.filter(a => a !== key)
                                : canSelect ? [...giftedBonuses, key] : giftedBonuses;
                              onChange({ gifted_bonuses: JSON.stringify(updated) });
                            }}
                            className="text-[10px] font-mono px-2 py-1 transition-all"
                            style={{
                              background: isSelected ? 'rgba(240,165,0,0.25)' : 'transparent',
                              color: isSelected ? '#f0a500' : canSelect ? '#c8a060' : '#555',
                              border: `1px solid ${isSelected ? '#f0a500' : canSelect ? 'rgba(240,165,0,0.4)' : '#333'}`,
                              cursor: canSelect ? 'pointer' : 'not-allowed',
                            }}>
                            {isSelected ? '✓ ' : ''}{abbr}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (origin === 'Mister Handy') return (
    <div className="mt-4 pt-3" style={{ borderTop: '1px solid #1e3a5f' }}>
      <p className="text-[10px] font-mono mb-2" style={{ color: '#6a8a9a' }}>Arm Attachments — choose 3:</p>
      <div className="space-y-1.5">
        {MR_HANDY_ARMS.map(arm => {
          const sel = (mrHandyArms || []).includes(arm.key);
          const atLimit = (mrHandyArms || []).length >= 3 && !sel;
          return (
            <button key={arm.key} onClick={() => {
              if (atLimit) return;
              const updated = sel ? (mrHandyArms || []).filter(k => k !== arm.key) : [...(mrHandyArms || []), arm.key];
              onMrHandyArmsChange(updated);
            }} className="w-full text-left px-3 py-2 transition-all"
              style={{ background: sel ? 'rgba(204,119,34,0.12)' : 'rgba(0,0,0,0.2)', border: `1px solid ${sel ? '#cc7722' : '#1e3a5f'}`, opacity: atLimit ? 0.4 : 1, cursor: atLimit ? 'not-allowed' : 'pointer' }}>
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
        <p className="text-[10px] font-mono mt-2 px-2 py-1.5" style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.3)', color: '#f5c518' }}>
          ⚠ Without a Pincer, you cannot use Lockpick, Repair, or Throwing skills, or manipulate objects.
        </p>
      )}
    </div>
  );

  return null;
}

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

      {/* Origin Selection — two-pane master/detail */}
      <div>
        <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
          Origin
        </label>
        <div className="flex flex-col sm:flex-row gap-3" style={{ minHeight: '380px' }}>

          {/* LEFT: compact selectable list */}
          <div className="sm:w-[32%] flex-shrink-0 overflow-y-auto" style={{ maxHeight: '520px', borderRight: '1px solid #1e3a5f' }}>
            {ORIGINS.map((origin) => {
              const isSelected = character.origin === origin.label;
              return (
                <button
                  key={origin.key}
                  onClick={() => onChange({ origin: origin.label })}
                  className="w-full text-left px-3 py-2.5 transition-all duration-150 flex flex-col gap-1"
                  style={{
                    background: isSelected ? 'rgba(245,197,24,0.08)' : 'transparent',
                    borderLeft: `3px solid ${isSelected ? '#f5c518' : 'transparent'}`,
                    borderBottom: '1px solid #0d2137',
                  }}
                >
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`font-heading font-semibold text-sm leading-tight ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {origin.label}
                    </span>
                    {isSelected && <Check className="w-3 h-3 text-primary flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {origin.source && (
                      <span className="text-[9px] font-mono px-1 py-0.5" style={{ background: 'rgba(168,200,216,0.08)', color: '#6a9aba', border: '1px solid rgba(106,154,186,0.25)' }}>{origin.source}</span>
                    )}
                    {origin.bonusSkills && origin.bonusSkills.map(s => (
                      <span key={s} className="text-[9px] font-mono px-1 py-0.5" style={{ background: 'rgba(120,60,140,0.1)', color: '#aa77dd', border: '1px solid rgba(170,102,255,0.2)' }}>
                        +{s.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: full detail panel + origin-specific choices */}
          <div className="flex-1 overflow-y-auto px-4 py-3" style={{ maxHeight: '520px', background: '#06111f', border: '1px solid #1e3a5f' }}>
            {selectedOrigin ? (
              <>
                {/* Header */}
                <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid #1e3a5f' }}>
                  <p className="font-heading font-bold text-base tracking-widest" style={{ color: '#f5c518' }}>{selectedOrigin.label.toUpperCase()}</p>
                  {selectedOrigin.source && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5" style={{ background: 'rgba(168,200,216,0.1)', color: '#6a9aba', border: '1px solid rgba(106,154,186,0.3)' }}>{selectedOrigin.source}</span>
                  )}
                </div>

                {/* Full description */}
                <p className="text-xs font-mono leading-relaxed mb-4" style={{ color: '#a8c8d8' }}>
                  {selectedOrigin.description}
                </p>

                {/* SPECIAL bonuses/penalties */}
                {(selectedOrigin.bonuses || selectedOrigin.penalties) && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedOrigin.bonuses && Object.entries(selectedOrigin.bonuses).map(([k, v]) => (
                      <span key={k} className="text-[10px] font-mono px-1.5 py-0.5" style={{ background: 'rgba(34,204,34,0.12)', border: '1px solid rgba(34,204,34,0.3)', color: '#22cc22' }}>
                        {k.slice(0,3).toUpperCase()} +{v}
                      </span>
                    ))}
                    {selectedOrigin.penalties && Object.entries(selectedOrigin.penalties).map(([k, v]) => (
                      <span key={k} className="text-[10px] font-mono px-1.5 py-0.5" style={{ background: 'rgba(204,68,68,0.12)', border: '1px solid rgba(204,68,68,0.3)', color: '#cc6666' }}>
                        {k.slice(0,3).toUpperCase()} {v}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bonus skills */}
                {selectedOrigin.bonusSkills && selectedOrigin.bonusSkills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    <span className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>Bonus skills:</span>
                    {selectedOrigin.bonusSkills.map(s => (
                      <span key={s} className="text-[10px] font-mono px-1.5 py-0.5" style={{ background: 'rgba(120,60,140,0.15)', border: '1px solid rgba(170,102,255,0.3)', color: '#cc99ff' }}>
                        +{s.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                )}

                {/* Trait name */}
                {selectedOrigin.traitName && (
                  <p className="text-[10px] font-bold tracking-widest mb-2" style={{ color: '#22cc22' }}>
                    TRAIT: {selectedOrigin.traitName.toUpperCase()}
                  </p>
                )}

                {/* Special / effect summary */}
                {selectedOrigin.special && (
                  <div className="text-[10px] font-mono leading-relaxed px-3 py-2.5" style={{ background: 'rgba(34,204,34,0.04)', border: '1px solid rgba(34,204,34,0.18)', color: '#a8d8a8' }}>
                    {selectedOrigin.special}
                  </div>
                )}

                {/* Sub-origin / background selection + starting equipment */}
                <SubOriginSelector character={character} onChange={onChange} />

                {/* Origin-specific interactive choices — inline, no separate section */}
                <OriginChoices
                  character={character}
                  onChange={onChange}
                  selectedOrigin={selectedOrigin}
                  ncrTraits={ncrTraits} onNcrTraitsChange={onNcrTraitsChange}
                  tribalTraits={tribalTraits} onTribalTraitsChange={onTribalTraitsChange}
                  outcastTagSkill={outcastTagSkill} onOutcastTagSkillChange={onOutcastTagSkillChange}
                  brotherhoodTagSkill={brotherhoodTagSkill} onBrotherhoodTagSkillChange={onBrotherhoodTagSkillChange}
                  vaultTagSkill={vaultTagSkill} onVaultTagSkillChange={onVaultTagSkillChange}
                  vaultExperiment={vaultExperiment} onVaultExperimentChange={onVaultExperimentChange}
                  ghoulVaultDweller={ghoulVaultDweller} onGhoulVaultDwellerChange={onGhoulVaultDwellerChange}
                  survivorTraits={survivorTraits} onSurvivorTraitsChange={onSurvivorTraitsChange}
                  mrHandyArms={mrHandyArms} onMrHandyArmsChange={onMrHandyArmsChange}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-xs font-mono" style={{ color: '#4a6a8a' }}>← Select an origin to view details</p>
              </div>
            )}
          </div>

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