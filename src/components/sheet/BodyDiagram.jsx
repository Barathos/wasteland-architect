import { calculateBodyPartHP } from "../../lib/falloutData";
import { getPerSlotArmorDR } from "../../lib/apparelArmorResolver";



// Each box cycles: empty -> healthy -> treated -> injured -> empty
const STATES = ['empty', 'healthy', 'treated', 'injured'];

const STATE_STYLE = {
  empty:   { background: '#0a2a0a', border: '1px solid #1a5a1a' },
  healthy: { background: '#22cc22', border: '1px solid #1a8a1a' },
  treated: { background: '#cc8822', border: '1px solid #aa6611' },
  injured: { background: '#cc2222', border: '1px solid #8a1111' },
};

const BODY_PARTS = ['head', 'torso', 'left_arm', 'right_arm', 'left_leg', 'right_leg'];

function parseBoxes(str) {
  try { return JSON.parse(str || ''); } catch { return null; }
}

function getBoxes(character, part) {
  const key = `boxes_${part}`;
  const parsed = parseBoxes(character[key]);
  if (Array.isArray(parsed) && parsed.length === 5) return parsed;
  return ['healthy', 'healthy', 'healthy', 'healthy', 'healthy'];
}

function BodyPartBoxes({ label, range, boxes, onBoxClick, dr }) {
  const hasInjury = boxes.some(b => b === 'injured');
  const hasTreated = boxes.some(b => b === 'treated');
  const borderColor = hasInjury ? '#cc2222' : hasTreated ? '#cc8822' : '#1e3a5f';

  return (
    <div className="p-2 text-center" style={{
      background: '#0a1a2d',
      border: `1px solid ${borderColor}`,
      borderRadius: '2px',
      minWidth: '90px',
    }}>
      <p className="text-[10px] font-bold mb-0.5" style={{ color: '#f5c518' }}>{label}</p>
      <p className="text-[9px] mb-1.5" style={{ color: '#4a6a8a' }}>{range}</p>
      <div className="flex gap-0.5 justify-center">
        {boxes.map((state, i) => (
          <div
            key={i}
            onClick={() => onBoxClick(i)}
            title={state}
            className="cursor-pointer transition-colors"
            style={{ width: '13px', height: '13px', ...STATE_STYLE[state] }}
          />
        ))}
      </div>
      <div
        className="flex gap-1.5 justify-center mt-1.5"
        title={dr?.worn && dr?.name ? dr.name : undefined}
        style={{ cursor: dr?.worn && dr?.name ? 'help' : 'default' }}
      >
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: dr?.physical > 0 ? '#e8e8e8' : '#5a7a8a', fontWeight: '700' }}>P{dr?.physical ?? 0}</span>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: dr?.energy > 0 ? '#4ab8ff' : '#5a7a8a', fontWeight: '700' }}>E{dr?.energy ?? 0}</span>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: dr?.radiation > 0 ? '#22cc22' : '#5a7a8a', fontWeight: '700' }}>R{dr?.radiation ?? 0}</span>
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
    <div className="p-3">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4 text-[10px]" style={{ color: '#a8c8d8' }}>
        {[
          { state: 'healthy', label: 'Healthy' },
          { state: 'treated', label: 'Treated' },
          { state: 'injured', label: 'Injured' },
          { state: 'empty',   label: 'None' },
        ].map(({ state, label }) => (
          <span key={state} className="flex items-center gap-1">
            <span className="inline-block w-3 h-3" style={STATE_STYLE[state]} />
            {label}
          </span>
        ))}
        <span style={{ color: '#4a6a8a' }}>(click to cycle)</span>
      </div>

      {/* Body layout with Vault Boy background */}
      <div className="relative flex flex-col items-center gap-2" style={{ minHeight: '240px' }}>
        {/* Vault Boy decorative background — purely visual, no pointer events */}
        <img
          src="https://media.base44.com/images/public/69d801affddb6cf5e785d3ab/518e365ca_Gemini_Generated_Image_rkg1d0rkg1d0rkg1.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '220px',
            width: 'auto',
            objectFit: 'contain',
            opacity: 0.18,
            filter: 'saturate(0.4) brightness(0.75)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        />
        {/* Body part indicators — sit above the background */}
        <div className="relative" style={{ zIndex: 1 }}>
          <BodyPartBoxes {...getProps('head')} />
        </div>
        <div className="relative flex gap-2 items-start" style={{ zIndex: 1 }}>
          <BodyPartBoxes {...getProps('left_arm')} />
          <BodyPartBoxes {...getProps('torso')} />
          <BodyPartBoxes {...getProps('right_arm')} />
        </div>
        <div className="relative flex gap-2" style={{ zIndex: 1 }}>
          <BodyPartBoxes {...getProps('left_leg')} />
          <div style={{ minWidth: '90px' }} />
          <BodyPartBoxes {...getProps('right_leg')} />
        </div>
      </div>

      {/* Encumbrance — compact inline row */}
      <div className="mt-2 pt-2 flex items-center gap-2 text-xs" style={{ borderTop: '1px solid #1e3a5f', color: '#a8c8d8' }}>
        <span style={{ color: '#f5c518' }}>Encumbrance:</span>
        <input
          type="number"
          value={character.encumbrance || 0}
          onChange={e => updateField({ encumbrance: parseInt(e.target.value) || 0 })}
          className="w-14 text-center text-xs font-bold"
          style={{ background: '#060f1c', border: '1px solid #2a4a6a', color: '#e8e8e8', outline: 'none', padding: '2px 4px' }}
        />
        <span>/ {character.carry_weight || 150} lbs</span>
      </div>
    </div>
  );
}