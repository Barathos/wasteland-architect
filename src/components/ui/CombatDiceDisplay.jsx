/**
 * CombatDiceDisplay
 * Renders a damage string like "3 CD" or "4 CD+2" as a visual
 * combat-die icon with the count. Falls back to plain text.
 *
 * Usage:  <CombatDiceDisplay value="3 CD" />
 *         <CombatDiceDisplay value="4 CD" color="#22cc22" size={14} />
 */

const CombatDieIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    {/* Outer octagon shape — Fallout-style combat die */}
    <polygon
      points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    {/* Center burst / crosshair dot */}
    <circle cx="10" cy="10" r="1.6" fill={color} />
    {/* Four corner pips representing Effects */}
    <circle cx="5.5"  cy="5.5"  r="1" fill={color} />
    <circle cx="14.5" cy="5.5"  r="1" fill={color} />
    <circle cx="5.5"  cy="14.5" r="1" fill={color} />
    <circle cx="14.5" cy="14.5" r="1" fill={color} />
  </svg>
);

/**
 * Parse "3 CD", "4 CD+2", "3 CD Vicious" → { count: 3, rest: '+2', raw: '3 CD' }
 * Returns null if pattern not matched (plain text fallback).
 */
function parseDamage(value) {
  if (!value || typeof value !== 'string') return null;
  // Match: optional number, space, CD, optional trailing modifier
  const match = value.match(/^(\d+)\s*CD(.*)$/i);
  if (!match) return null;
  const count = parseInt(match[1], 10);
  const rest = match[2].trim(); // e.g. "+2", "", " Vicious"
  return { count, rest };
}

export default function CombatDiceDisplay({ value, color = '#22cc22', size = 13 }) {
  const parsed = parseDamage(value);

  if (!parsed) {
    // Fallback: plain text unchanged
    return (
      <span style={{ color, fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold' }}>
        {value}
      </span>
    );
  }

  const { count, rest } = parsed;
  const tooltip = `Roll ${count} combat ${count === 1 ? 'die' : 'dice'}`;

  return (
    <span
      title={tooltip}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        color,
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        fontWeight: 'bold',
        lineHeight: 1,
        cursor: 'default',
        whiteSpace: 'nowrap',
      }}
    >
      <span>{count}</span>
      <CombatDieIcon size={size} color={color} />
      {rest && (
        <span style={{ color, fontWeight: 'bold' }}>{rest}</span>
      )}
    </span>
  );
}

export { CombatDieIcon };