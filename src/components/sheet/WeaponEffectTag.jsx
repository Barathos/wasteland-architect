import { useState } from "react";
import { getWeaponEffectDescription } from "../../lib/weaponEffectDescriptions";

export default function WeaponEffectTag({ label }) {
  const [show, setShow] = useState(false);
  const description = getWeaponEffectDescription(label);
  const trimmed = label.trim();
  if (!trimmed) return null;

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span
        tabIndex={0}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        style={{
          display: 'inline-block',
          padding: '1px 6px',
          fontSize: '10px',
          fontFamily: 'var(--font-mono)',
          background: description ? 'rgba(245,197,24,0.07)' : 'rgba(74,106,138,0.12)',
          border: `1px solid ${description ? 'rgba(245,197,24,0.25)' : 'rgba(74,106,138,0.3)'}`,
          color: description ? '#c8a820' : '#6a8a9a',
          borderRadius: '2px',
          cursor: description ? 'help' : 'default',
          outline: 'none',
          transition: 'border-color 0.15s',
        }}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShow(s => !s); }}
        aria-describedby={description ? `wet-${trimmed}` : undefined}
      >
        {trimmed}
      </span>
      {show && description && (
        <span
          id={`wet-${trimmed}`}
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 5px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#060f1c',
            border: '1px solid #f5c518',
            color: '#a8c8d8',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            padding: '5px 8px',
            borderRadius: '2px',
            whiteSpace: 'nowrap',
            zIndex: 200,
            pointerEvents: 'none',
            maxWidth: '240px',
            whiteSpace: 'normal',
            lineHeight: '1.4',
            boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}>
          <strong style={{ color: '#f5c518', display: 'block', marginBottom: '2px' }}>{trimmed}</strong>
          {description}
        </span>
      )}
    </span>
  );
}