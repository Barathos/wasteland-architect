import { useState } from "react";
import { calculateDerivedStats, isRobotCharacter } from "../../lib/falloutData";

function parseJson(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

function SlotBox({ value, onChange }) {
  const [editing, setEditing] = useState(false);
  const has = value != null && value !== '';
  if (editing) {
    return (
      <input
        autoFocus
        type="number"
        defaultValue={value || ''}
        onBlur={e => { onChange(e.target.value !== '' ? parseInt(e.target.value) : null); setEditing(false); }}
        className="text-center text-xs font-bold"
        style={{ width: '32px', height: '32px', background: '#060f1c', border: '1px solid #4a6a8a', color: '#e8e8e8', outline: 'none' }}
      />
    );
  }
  return (
    <div
      onClick={() => setEditing(true)}
      className="flex items-center justify-center cursor-pointer text-xs font-bold"
      style={{ width: '32px', height: '32px', background: has ? '#1a2a4a' : '#0a1525', border: `1px solid ${has ? '#4a6a8a' : '#1e3a5f'}`, color: has ? '#e8e8e8' : '#2a4a6a' }}
      title="Click to edit"
    >
      {has ? value : ''}
    </div>
  );
}

function PowerArmorGrid({ powerArmor, updateField }) {
  const update = (key, val) => {
    updateField({ power_armor_health: JSON.stringify({ ...powerArmor, [key]: val }) });
  };
  return (
    <div className="flex flex-col items-center gap-1">
      <SlotBox value={powerArmor.head} onChange={v => update('head', v)} />
      <div className="flex gap-1 items-center">
        <SlotBox value={powerArmor.left_arm} onChange={v => update('left_arm', v)} />
        <div className="flex flex-col items-center justify-center px-1" style={{ minWidth: '40px', height: '32px', background: '#1a2a4a', border: '1px solid #4a6a8a', color: '#e8e8e8', fontSize: '11px', fontWeight: 'bold' }}>
          {powerArmor.torso != null ? powerArmor.torso : ''}
        </div>
        <SlotBox value={powerArmor.right_arm} onChange={v => update('right_arm', v)} />
      </div>
      <div className="flex gap-4">
        <SlotBox value={powerArmor.left_leg} onChange={v => update('left_leg', v)} />
        <SlotBox value={powerArmor.right_leg} onChange={v => update('right_leg', v)} />
      </div>
    </div>
  );
}

const BODY_PARTS = ['head', 'torso', 'left_arm', 'right_arm', 'left_leg', 'right_leg'];

function countInjuries(character) {
  let count = 0;
  for (const part of BODY_PARTS) {
    try {
      const boxes = JSON.parse(character[`boxes_${part}`] || '[]');
      count += boxes.filter(b => b === 'injured').length;
    } catch {}
  }
  return count;
}

export default function HealthPanel({ character, updateField }) {
  const derived = calculateDerivedStats(character);
  const adj = (field, val, min = 0, max = 9999) => updateField({ [field]: Math.max(min, Math.min(max, val)) });
  const isRobot = isRobotCharacter(character);

  const currentHp = character.hp_current ?? derived.hp;
  const maxHp = character.hp_max ?? derived.hp;
  const radiation = character.radiation ?? 0;
  const powerArmor = parseJson(character.power_armor_health, {});
  const injuryCount = countInjuries(character);

  return (
    <div>
      {/* Health */}
      <div className="p-3" style={{ background: '#c06018', borderBottom: '1px solid #1e3a5f' }}>
        <p className="text-xl font-bold italic mb-2" style={{ color: '#fff', fontFamily: 'var(--font-heading)' }}>Health</p>
        <div className="flex items-center gap-1.5">
          <button onClick={() => adj('hp_current', currentHp - 1, 0, maxHp)}
            className="w-6 h-7 flex items-center justify-center font-bold text-sm"
            style={{ background: '#0a1a2d', border: '1px solid #2a4a6a', color: '#e8e8e8' }}>−</button>
          <input
            type="number"
            value={currentHp}
            onChange={e => adj('hp_current', parseInt(e.target.value) || 0, 0, maxHp)}
            className="w-12 h-7 text-center text-base font-bold"
            style={{ background: '#060f1c', border: '1px solid #2a4a6a', color: '#e8e8e8', outline: 'none' }}
          />
          <span style={{ color: '#fff', fontWeight: 'bold' }}>/</span>
          <div className="w-12 h-7 flex items-center justify-center text-base font-bold"
            style={{ background: '#060f1c', border: '1px solid #2a4a6a', color: '#e8e8e8' }}>{maxHp}</div>
          <button onClick={() => adj('hp_current', currentHp + 1, 0, maxHp)}
            className="w-6 h-7 flex items-center justify-center font-bold text-sm"
            style={{ background: '#0a1a2d', border: '1px solid #2a4a6a', color: '#e8e8e8' }}>+</button>
        </div>
      </div>

      {/* Repair note for robots */}
      {isRobot && (
        <div className="px-3 py-2" style={{ background: '#1a0a2d', borderBottom: '1px solid #1e3a5f' }}>
          <p className="text-[10px] font-mono" style={{ color: '#cc7722' }}>⚙ Heals through Repairs only. Medicine cannot restore HP.</p>
        </div>
      )}

      {/* Radiation / Power Cell */}
      <div className="flex items-center justify-between px-3 py-2" style={{ background: isRobot ? '#1a1500' : '#0d3a1a', borderBottom: '1px solid #1e3a5f' }}>
        <div className="flex items-center gap-1.5">
          <span>{isRobot ? '🔋' : '☢'}</span>
          <span className="text-xs font-bold tracking-wider" style={{ color: isRobot ? '#f5c518' : '#22cc22' }}>
            {isRobot ? 'POWER CELL %' : 'RADIATION'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => adj('radiation', (character.radiation ?? 0) - 1, 0, isRobot ? 100 : 9999)} className="w-5 h-5 flex items-center justify-center text-xs"
            style={{ background: '#0a1a2d', border: '1px solid #2a4a6a', color: '#a8c8d8' }}>−</button>
          <div className="w-10 h-6 flex items-center justify-center text-sm font-bold"
            style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8' }}>{character.radiation ?? 0}{isRobot ? '%' : ''}</div>
          <button onClick={() => adj('radiation', (character.radiation ?? 0) + 1, 0, isRobot ? 100 : 9999)} className="w-5 h-5 flex items-center justify-center text-xs"
            style={{ background: '#0a1a2d', border: '1px solid #2a4a6a', color: '#a8c8d8' }}>+</button>
        </div>
      </div>

      {/* Radiation Points — Child of Atom */}
      {character.origin === 'Child of Atom' && (
        <div className="px-3 py-2" style={{ background: '#0a2a0a', borderBottom: '1px solid #1e3a5f' }}>
          <p className="text-xs font-bold tracking-wider mb-2" style={{ color: '#22cc22' }}>☢ RADIATION POINTS</p>
          <div className="flex items-center gap-2">
            {[0,1,2,3,4,5].map(n => {
              const active = (character.radiation_points ?? 0) >= n && n > 0;
              return (
                <button key={n} onClick={() => updateField({ radiation_points: n })}
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold transition-all"
                  style={{ background: active ? '#0a3a0a' : '#060f1c', border: `1px solid ${active ? '#22cc22' : '#1e3a5f'}`, color: active ? '#22cc22' : '#2a4a6a' }}>
                  {n}
                </button>
              );
            })}
            <span className="text-[10px] font-mono" style={{ color: '#4a6a8a' }}>+{(character.radiation_points ?? 0) * 2} CD melee</span>
          </div>
        </div>
      )}

      {/* Injuries */}
      <div className="flex items-center justify-between px-3 py-2" style={{ background: '#3a0d0d', borderBottom: '1px solid #1e3a5f' }}>
        <div className="flex items-center gap-1.5">
          <span>💀</span>
          <span className="text-xs font-bold tracking-wider" style={{ color: '#cc4444' }}>
            INJURIES: {injuryCount}
          </span>
        </div>
      </div>

      {/* Power Armor */}
      <div className="p-3">
        <p className="text-xs font-bold tracking-wider mb-3" style={{ color: '#f5c518' }}>POWER ARMOR HEALTH</p>
        <p className="text-[10px] mb-2" style={{ color: '#4a6a8a' }}>Click slot to set HP</p>
        <PowerArmorGrid powerArmor={powerArmor} updateField={updateField} />
      </div>
    </div>
  );
}