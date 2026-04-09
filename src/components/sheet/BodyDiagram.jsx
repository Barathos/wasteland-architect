import { calculateBodyPartHP } from "../../lib/falloutData";

const BODY_PARTS_LAYOUT = [
  { key: 'head', label: 'Head', range: '1-2', row: 0, col: 1 },
  { key: 'left_arm', label: 'Left Arm', range: '9-11', row: 1, col: 0 },
  { key: 'torso', label: 'Torso', range: '3-8', row: 1, col: 1 },
  { key: 'right_arm', label: 'Right Arm', range: '12-14', row: 1, col: 2 },
  { key: 'left_leg', label: 'Left Leg', range: '15-17', row: 2, col: 0 },
  { key: 'right_leg', label: 'Right Leg', range: '18-20', row: 2, col: 2 },
];

function HpSegments({ current, max, onSet }) {
  const segments = Math.min(max, 8);
  return (
    <div className="flex gap-px justify-center">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          onClick={() => onSet(i < current ? i : i + 1)}
          className="cursor-pointer transition-colors"
          title={`Set HP to ${i < current ? i : i + 1}`}
          style={{
            width: '14px',
            height: '10px',
            background: i < current ? '#22cc22' : '#0a2a0a',
            border: '1px solid #1a5a1a',
          }}
        />
      ))}
    </div>
  );
}

function BodyPart({ partKey, label, range, current, max, onSet }) {
  const isInjured = current < max;
  return (
    <div className="p-2 text-center" style={{
      background: '#0a1a2d',
      border: `1px solid ${isInjured ? '#cc4444' : '#1e3a5f'}`,
      borderRadius: '2px',
      minWidth: '90px',
    }}>
      <p className="text-[10px] font-bold mb-0.5 leading-tight" style={{ color: '#f5c518' }}>
        {label}
      </p>
      <p className="text-[9px] mb-1.5" style={{ color: '#4a6a8a' }}>{range}</p>
      <HpSegments current={current} max={max} onSet={onSet} />
      <p className="text-[10px] mt-1 font-bold" style={{ color: current === 0 ? '#cc4444' : current < max ? '#f5c518' : '#22cc22' }}>
        {current}/{max}
      </p>
    </div>
  );
}

export default function BodyDiagram({ character, updateField }) {
  const maxValues = calculateBodyPartHP(character);

  const setPartHP = (part, value) => {
    updateField({ [`hp_${part}`]: Math.max(0, Math.min(value, maxValues[part].max)) });
  };

  const getPartProps = (key) => ({
    partKey: key,
    label: maxValues[key].label,
    range: maxValues[key].range,
    max: maxValues[key].max,
    current: character[`hp_${key}`] ?? maxValues[key].max,
    onSet: (v) => setPartHP(key, v),
  });

  return (
    <div className="p-3">
      {/* Legend */}
      <div className="flex gap-4 mb-4 text-xs" style={{ color: '#a8c8d8' }}>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3" style={{ background: '#22cc22' }} />
          Healthy (click to damage)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 border" style={{ background: '#0a2a0a', borderColor: '#1a5a1a' }} />
          Injured (click to heal)
        </span>
      </div>

      {/* Body layout */}
      <div className="flex flex-col items-center gap-2">
        {/* Row 0: Head */}
        <BodyPart {...getPartProps('head')} />

        {/* Row 1: Left Arm + Torso + Right Arm */}
        <div className="flex gap-2 items-start">
          <BodyPart {...getPartProps('left_arm')} />
          <BodyPart {...getPartProps('torso')} />
          <BodyPart {...getPartProps('right_arm')} />
        </div>

        {/* Row 2: Left Leg + gap + Right Leg */}
        <div className="flex gap-2">
          <BodyPart {...getPartProps('left_leg')} />
          <div style={{ minWidth: '90px' }} />
          <BodyPart {...getPartProps('right_leg')} />
        </div>
      </div>

      {/* Encumbrance */}
      <div className="mt-4 pt-3 flex items-center gap-2 text-xs" style={{ borderTop: '1px solid #1e3a5f', color: '#a8c8d8' }}>
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