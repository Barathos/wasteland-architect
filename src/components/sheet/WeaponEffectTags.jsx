import WeaponEffectTag from "./WeaponEffectTag";

export default function WeaponEffectTags({ value }) {
  if (!value || value === '-' || value === '—') return null;
  const parts = value.split(',').map(s => s.trim()).filter(Boolean);
  if (parts.length === 0) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '3px' }}>
      {parts.map((p, i) => <WeaponEffectTag key={i} label={p} />)}
    </div>
  );
}