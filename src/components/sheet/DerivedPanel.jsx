import { calculateDerivedStats } from "../../lib/falloutData";

function parseJson(str, fb) { try { return JSON.parse(str || ''); } catch { return fb; } }
const APPAREL_SLOTS = ['head','torso','left_arm','right_arm','left_leg','right_leg','power_armor'];
function getApparelDR(character) {
  const apparel = parseJson(character.apparel, {});
  let phys = 0, energy = 0, rad = 0;
  APPAREL_SLOTS.forEach(k => {
    const s = apparel[k];
    if (s?.worn) { phys += parseInt(s.physDR) || 0; energy += parseInt(s.energyDR) || 0; rad += parseInt(s.radDR) || 0; }
  });
  return { phys, energy, rad };
}

function SectionHeader({ label }) {
  return (
    <div className="px-3 py-1.5" style={{ background: '#06111f', borderTop: '1px solid #1e3a5f', borderBottom: '1px solid #1e3a5f' }}>
      <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>{label}</p>
    </div>
  );
}

function StatRow({ label, icon, value, editable, onChange, type = 'number' }) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5" style={{ borderBottom: '1px solid #091525' }}>
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-sm leading-none">{icon}</span>}
        <span className="text-xs font-bold" style={{ color: '#f5c518' }}>{label}</span>
      </div>
      {editable && type === 'boolean' ? (
        <input
          type="checkbox"
          checked={!!value}
          onChange={e => onChange(e.target.checked)}
          className="w-4 h-4 cursor-pointer"
          style={{ accentColor: '#22cc22' }}
        />
      ) : editable ? (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onChange(Math.max(0, (value || 0) - 1))}
            className="w-5 h-5 flex items-center justify-center text-xs font-bold"
            style={{ background: '#1e3a5f', color: '#a8c8d8' }}>−</button>
          <div className="w-8 h-6 flex items-center justify-center text-sm font-bold"
            style={{ background: '#060f1c', border: '1px solid #2a4a6a', color: '#e8e8e8' }}>
            {value ?? 0}
          </div>
          <button
            onClick={() => onChange((value || 0) + 1)}
            className="w-5 h-5 flex items-center justify-center text-xs font-bold"
            style={{ background: '#1e3a5f', color: '#a8c8d8' }}>+</button>
        </div>
      ) : (
        <div className="w-10 h-7 flex items-center justify-center text-sm font-bold"
          style={{ background: '#060f1c', border: '1px solid #2a4a6a', color: '#e8e8e8' }}>
          {value}
        </div>
      )}
    </div>
  );
}

export default function DerivedPanel({ character, updateField }) {
  const derived = calculateDerivedStats(character);
  const apparelDR = getApparelDR(character);

  return (
    <div>
      <SectionHeader label="DERIVED" />
      <StatRow label="MELEE DAMAGE" value={derived.melee_bonus} />
      <StatRow label="DEFENSE" value={derived.defense} />
      <StatRow label="INITIATIVE" value={derived.initiative} />

      <SectionHeader label="RESISTANCES" />
      <div className="px-3 py-1" style={{ borderBottom: '1px solid #091525' }}>
        <p className="text-[9px] font-mono" style={{ color: '#4a6a8a' }}>BONUS + APPAREL DR = TOTAL</p>
      </div>
      <StatRow label={`PHYSICAL (${(character.resistance_physical ?? 0) + apparelDR.phys})`} icon="🛡" value={character.resistance_physical ?? 0} editable
        onChange={v => updateField({ resistance_physical: v })} />
      <StatRow label={`ENERGY (${(character.resistance_energy ?? 0) + apparelDR.energy})`} icon="⚡" value={character.resistance_energy ?? 0} editable
        onChange={v => updateField({ resistance_energy: v })} />
      <StatRow label={`RADIATION (${(character.resistance_radiation ?? 0) + apparelDR.rad})`} icon="☢" value={character.resistance_radiation ?? 0} editable
        onChange={v => updateField({ resistance_radiation: v })} />
      <StatRow label="POISON" icon="☠" value={character.resistance_poison ?? 0} editable
        onChange={v => updateField({ resistance_poison: v })} />

      <SectionHeader label="STATUS" />
      <StatRow label="FATIGUE" value={character.fatigue ?? 0} editable
        onChange={v => updateField({ fatigue: Math.min(5, Math.max(0, v)) })} />
      <StatRow label="INTOXICATION" value={character.intoxication ?? 0} editable
        onChange={v => updateField({ intoxication: Math.min(5, Math.max(0, v)) })} />
      <StatRow label="ALCOHOLIC" value={character.is_alcoholic ?? false} editable type="boolean"
        onChange={v => updateField({ is_alcoholic: v })} />
      <StatRow label="WELL RESTED" value={character.is_well_rested ?? false} editable type="boolean"
        onChange={v => updateField({ is_well_rested: v })} />
    </div>
  );
}