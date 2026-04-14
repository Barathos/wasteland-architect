import { calculateBodyPartHP } from "../../lib/falloutData";
import { getPerSlotArmorDR } from "../../lib/apparelArmorResolver";

const STATES = ['empty', 'healthy', 'treated', 'injured'];

const STATE_STYLE = {
  empty:   { background: '#0a2a0a', border: '1px solid #1a5a1a' },
  healthy: { background: '#22cc22', border: '1px solid #44ee44' },
  treated: { background: '#cc8822', border: '1px solid #aa6611' },
  injured: { background: '#cc2222', border: '1px solid #8a1111' },
};

function parseBoxes(str) {
  try { return JSON.parse(str || ''); } catch { return null; }
}

function getBoxes(character, part) {
  const key = `boxes_${part}`;
  const parsed = parseBoxes(character[key]);
  if (Array.isArray(parsed) && parsed.length === 5) return parsed;
  return ['healthy', 'healthy', 'healthy', 'healthy', 'healthy'];
}

// Compact panel matching the reference image style
function BodyPartBoxes({ label, range, boxes, onBoxClick, dr }) {
  const hasInjury  = boxes.some(b => b === 'injured');
  const hasTreated = boxes.some(b => b === 'treated');
  const borderColor = hasInjury ? '#cc2222' : hasTreated ? '#cc8822' : '#1e4a6a';

  return (
    <div style={{
      background: 'rgba(0,10,20,0.82)',
      border: `1px solid ${borderColor}`,
      borderRadius: '2px',
      padding: '4px 6px',
      minWidth: '100px',
      textAlign: 'left',
    }}>
      {/* Label + range on one line */}
      <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#e8e8e8', marginBottom: '3px', whiteSpace: 'nowrap' }}>
        {label} <span style={{ color: '#4a7a9a', fontWeight: '400' }}>{range}</span>
      </p>
      {/* HP boxes */}
      <div style={{ display: 'flex', gap: '2px', marginBottom: '4px' }}>
        {boxes.map((state, i) => (
          <div
            key={i}
            onClick={() => onBoxClick(i)}
            title={state}
            style={{ width: '14px', height: '14px', cursor: 'pointer', flexShrink: 0, ...STATE_STYLE[state] }}
          />
        ))}
      </div>
      {/* DR row */}
      <div
        style={{ display: 'flex', gap: '6px', cursor: dr?.worn && dr?.name ? 'help' : 'default' }}
        title={dr?.worn && dr?.name ? dr.name : undefined}
      >
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: dr?.physical  > 0 ? '#e8e8e8' : '#3a5a6a', fontWeight: '700' }}>⚡ {dr?.physical  ?? 0}</span>
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: dr?.energy    > 0 ? '#4ab8ff' : '#3a5a6a', fontWeight: '700' }}>👊 {dr?.energy    ?? 0}</span>
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: dr?.radiation > 0 ? '#22cc22' : '#3a5a6a', fontWeight: '700' }}>☢ {dr?.radiation ?? 0}</span>
      </div>
    </div>
  );
}

export default function BodyDiagram({ character, updateField }) {
  const bodyParts = calculateBodyPartHP(character);

  const cycleBox = (part, idx) => {
    const boxes = getBoxes(character, part);
    const next = STATES[(STATES.indexOf(boxes[idx]) + 1) % STATES.length];
    const updated = [...boxes];
    updated[idx] = next;
    updateField({ [`boxes_${part}`]: JSON.stringify(updated) });
  };

  const slotDR = getPerSlotArmorDR(character);

  const getProps = (key) => ({
    label: bodyParts[key].label,
    range: bodyParts[key].range,
    boxes: getBoxes(character, key),
    onBoxClick: (idx) => cycleBox(key, idx),
    dr: slotDR[key],
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Legend — compact single row */}
      <div style={{ display: 'flex', gap: '12px', padding: '6px 10px', borderBottom: '1px solid #1e3a5f', flexShrink: 0 }}>
        {[
          { state: 'healthy', label: 'Healthy' },
          { state: 'treated', label: 'Treated injury (Right Click)' },
          { state: 'injured', label: 'Injury (Left Click)' },
        ].map(({ state, label }) => (
          <span key={state} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#a8c8d8' }}>
            <span style={{ display: 'inline-block', width: '10px', height: '10px', flexShrink: 0, ...STATE_STYLE[state] }} />
            {label}
          </span>
        ))}
      </div>

      {/* Main body layout — fills remaining space */}
      <div style={{ position: 'relative', flex: 1, minHeight: '380px' }}>

        {/* Vault Boy silhouette — fills center */}
        <img
          src="https://media.base44.com/images/public/69d801affddb6cf5e785d3ab/d04204214_VaultBoyingoldenoutline.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '88%',
            width: 'auto',
            objectFit: 'contain',
            opacity: 0.22,
            filter: 'saturate(0.25) brightness(1.1) hue-rotate(175deg)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        />

        {/* HEAD — top center */}
        <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
          <BodyPartBoxes {...getProps('head')} />
        </div>

        {/* LEFT ARM — left side, arm level */}
        <div style={{ position: 'absolute', top: '130px', left: '8px', zIndex: 1 }}>
          <BodyPartBoxes {...getProps('left_arm')} />
        </div>

        {/* TORSO — center, chest level */}
        <div style={{ position: 'absolute', top: '145px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
          <BodyPartBoxes {...getProps('torso')} />
        </div>

        {/* RIGHT ARM — right side, arm level */}
        <div style={{ position: 'absolute', top: '130px', right: '8px', zIndex: 1 }}>
          <BodyPartBoxes {...getProps('right_arm')} />
        </div>

        {/* LEFT LEG — lower left */}
        <div style={{ position: 'absolute', bottom: '30px', left: '8px', zIndex: 1 }}>
          <BodyPartBoxes {...getProps('left_leg')} />
        </div>

        {/* RIGHT LEG — lower right */}
        <div style={{ position: 'absolute', bottom: '30px', right: '8px', zIndex: 1 }}>
          <BodyPartBoxes {...getProps('right_leg')} />
        </div>

        {/* Encumbrance — small badge bottom center */}
        <div style={{
          position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 1, display: 'flex', alignItems: 'center', gap: '4px',
          background: 'rgba(0,10,20,0.75)', border: '1px solid #1e3a5f',
          padding: '2px 8px', borderRadius: '2px', whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#f5c518' }}>ENC</span>
          <input
            type="number"
            value={character.encumbrance || 0}
            onChange={e => updateField({ encumbrance: parseInt(e.target.value) || 0 })}
            style={{ width: '36px', textAlign: 'center', fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: '700', background: 'transparent', border: 'none', color: '#e8e8e8', outline: 'none', padding: '0' }}
          />
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#4a6a8a' }}>/ {character.carry_weight || 150}</span>
        </div>

      </div>
    </div>
  );
}