import { useState } from "react";
import CombatDiceDisplay from "../ui/CombatDiceDisplay";
import WeaponEffectTags from "./WeaponEffectTags";
import { MR_HANDY_ARMS } from "../../lib/falloutData";
import { CORE_WEAPONS } from "../../lib/sourceTruthData";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip";

const EMPTY_WEAPON = {
  name: '', damage: '', damageEffect: '', damageType: 'Physical',
  fireModes: [], range: 'Short', qualities: '', weight: '', ammoType: '', ammoCurrent: '',
  sourceName: '', key: ''
};

const DAMAGE_TYPES = ['Physical', 'Energy', 'Energy/Radiation', 'Radiation', 'Poison'];
const FIRE_MODES = ['Single', 'Burst', 'Auto'];
const RANGES = ['Melee', 'Close', 'Short', 'Medium', 'Long', 'Extreme'];

const ALL_REF_WEAPONS = CORE_WEAPONS;

const TYPE_ORDER = ['Small Guns', 'Energy Weapons', 'Big Guns', 'Bow', 'Melee', 'Unarmed', 'Throwing', 'Explosive'];

function normalizeWeaponType(type = '') {
  const raw = String(type || '').trim().toLowerCase();
  if (!raw) return '';

  if (raw.startsWith('small gun')) return 'Small Guns';
  if (raw.startsWith('energy weapon')) return 'Energy Weapons';
  if (raw.startsWith('big gun')) return 'Big Guns';
  if (raw.startsWith('bow')) return 'Bow';
  if (raw.startsWith('melee')) return 'Melee';
  if (raw.startsWith('unarmed')) return 'Unarmed';
  if (raw.startsWith('throw')) return 'Throwing';
  if (raw.startsWith('explosive')) return 'Explosive';

  return type;
}

function rarityColor(r) {
  if (!r) return '#6a8a9a';
  if (r <= 2) return '#6a8a9a';
  if (r === 3) return '#22cc22';
  if (r === 4) return '#4488ff';
  return '#f5c518';
}

function WeaponReferenceModal({ onSelect, onClose }) {
  const [filter, setFilter] = useState('');
  const lower = filter.toLowerCase();
  const grouped = TYPE_ORDER.reduce((acc, t) => {
    acc[t] = ALL_REF_WEAPONS.filter(w => normalizeWeaponType(w.type) === t && (!lower || w.label.toLowerCase().includes(lower) || (w.source || '').toLowerCase().includes(lower)));
    return acc;
  }, {});

  const sourceBadge = (w) => {
    if (w.source === 'Wanderers') return { bg: 'rgba(180,120,255,0.12)', border: 'rgba(170,102,255,0.35)', color: '#aa66ff', label: 'Wanderers' };
    if (w.source === 'Settlers') return { bg: 'rgba(245,197,24,0.1)', border: 'rgba(245,197,24,0.3)', color: '#f5c518', label: 'Settlers' };
    return { bg: 'rgba(106,154,186,0.1)', border: 'rgba(106,154,186,0.3)', color: '#6a9aba', label: 'Core' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <div className="w-full max-w-3xl max-h-[85vh] flex flex-col m-4"
        style={{ background: '#0d2137', border: '2px solid #f5c518' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
          <p className="text-sm font-bold tracking-widest" style={{ color: '#f5c518' }}>WEAPON REFERENCE — Click to Add</p>
          <div className="flex items-center gap-3">
            <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search..."
              style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none', padding: '3px 8px', fontSize: '11px', width: '120px' }}
              onClick={e => e.stopPropagation()} />
            <button onClick={onClose} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>✕</button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {TYPE_ORDER.map(type => {
            const weapons = grouped[type];
            if (!weapons?.length) return null;
            const typeLabel = type === 'Bow' ? 'BOWS — AGI + Athletics to attack' : type.toUpperCase();
            return (
              <div key={type}>
                <div className="px-4 py-1.5 sticky top-0" style={{ background: '#091525', borderBottom: '1px solid #1e3a5f', zIndex: 1 }}>
                  <p className="text-[10px] font-bold tracking-widest" style={{ color: type === 'Bow' ? '#22cc22' : '#4a6a8a' }}>{typeLabel}</p>
                </div>
                {weapons.map((w, i) => {
                  const badge = sourceBadge(w);
                  return (
                    <button key={i} onClick={() => onSelect(w)}
                      className="w-full px-4 text-left hover:opacity-80 transition-opacity"
                      style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #091525', cursor: 'pointer' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 110px 80px 90px', gap: '10px', alignItems: 'center', padding: '6px 0 4px' }}>
                        <span className="font-heading font-semibold text-sm" style={{ color: '#e8e8e8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.label}</span>
                        <span className="text-xs font-mono text-center" style={{ whiteSpace: 'nowrap' }}><CombatDiceDisplay value={w.damage} /></span>
                        <span className="text-[10px] font-mono text-center" style={{ color: '#6a8a9a', whiteSpace: 'nowrap' }}>{w.damageType}</span>
                        <span className="text-[10px] font-mono text-center" style={{ color: '#4a6a8a', whiteSpace: 'nowrap' }}>{w.range}</span>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <span className="text-[9px] px-1.5 py-0.5 font-bold"
                            style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color, whiteSpace: 'nowrap' }}>
                            {badge.label}
                          </span>
                        </div>
                      </div>
                      {w.note && (
                        <p className="text-[10px] font-mono italic pb-1" style={{ color: '#6a8a9a' }}>{w.note}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WeaponRow({ weapon, index, onChange, onRemove }) {
  const [editingAlias, setEditingAlias] = useState(false);

  const toggleMode = (mode) => {
    const modes = weapon.fireModes || [];
    const updated = modes.includes(mode) ? modes.filter(m => m !== mode) : [...modes, mode];
    onChange({ ...weapon, fireModes: updated });
  };

  const cleanDisplay = (v) => (!v || v === '-' || v === '—' || v.trim() === '') ? '' : v;

  const field = (key, value, style = {}) => (
    <input
      type="text"
      value={key === 'qualities' || key === 'damageEffect' ? cleanDisplay(value) : (value ?? '')}
      onChange={e => onChange({ ...weapon, [key]: e.target.value })}
      style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: '11px', ...style }}
    />
  );

  const displayName = weapon.name || weapon.sourceName || 'Unnamed Weapon';
  const description = weapon.note || '';
  const sourceDisplay = weapon.sourceName || '';
  const linkedToReference = Boolean(weapon.key || weapon.sourceName);

  return (
    <div className="p-3 mb-2" style={{ background: '#0a1a2d', border: '1px solid #1e3a5f' }}>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-[10px] font-bold w-4" style={{ color: '#f5c518' }}>#{index + 1}</span>
        <div className="flex items-center gap-1" style={{ flex: 1, minWidth: '120px' }}>
          {editingAlias ? (
            <input
              type="text"
              value={weapon.name ?? ''}
              onChange={e => onChange({ ...weapon, name: e.target.value })}
              onBlur={() => setEditingAlias(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setEditingAlias(false);
                if (e.key === 'Escape') setEditingAlias(false);
              }}
              autoFocus
              style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', outline: 'none', padding: '3px 6px', fontSize: '11px', flex: 1, minWidth: '80px' }}
            />
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  style={{
                    background: '#060f1c',
                    border: '1px solid #1e3a5f',
                    color: '#e8e8e8',
                    padding: '3px 6px',
                    fontSize: '11px',
                    textAlign: 'left',
                    flex: 1,
                    minWidth: '80px',
                    cursor: description ? 'help' : 'default',
                  }}
                >
                  {displayName}
                </button>
              </TooltipTrigger>
              {description && (
                <TooltipContent side="top" align="start" style={{ maxWidth: '420px', background: '#060f1c', border: '1px solid #1e3a5f', color: '#a8c8d8' }}>
                  {sourceDisplay && <p className="text-[10px] font-bold mb-1" style={{ color: '#f5c518' }}>{sourceDisplay}</p>}
                  <p className="text-[10px] font-mono whitespace-pre-wrap">{description}</p>
                </TooltipContent>
              )}
            </Tooltip>
          )}
          <button
            type="button"
            onClick={() => setEditingAlias(v => !v)}
            title={editingAlias ? 'Finish alias edit' : 'Edit weapon alias'}
            className="text-[10px] px-1.5 py-0.5 font-bold"
            style={{ background: 'rgba(106,154,186,0.08)', border: '1px solid rgba(106,154,186,0.35)', color: '#6a9aba', cursor: 'pointer' }}
          >
            {editingAlias ? 'Done' : 'Alias'}
          </button>
          {linkedToReference && !editingAlias && (
            <span className="text-[9px] px-1.5 py-0.5 font-bold" style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.25)', color: '#f5c518' }}>
              Ref
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {field('damage', weapon.damage, { width: '55px' })}
          <span className="text-xs font-mono flex-shrink-0" style={{ minWidth: '30px' }}><CombatDiceDisplay value={weapon.damage} /></span>
        </div>
        <select value={weapon.damageType} onChange={e => onChange({ ...weapon, damageType: e.target.value })}
          style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', fontSize: '11px', padding: '3px 4px' }}>
          {DAMAGE_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={weapon.range} onChange={e => onChange({ ...weapon, range: e.target.value })}
          style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#e8e8e8', fontSize: '11px', padding: '3px 4px' }}>
          {RANGES.map(r => <option key={r}>{r}</option>)}
        </select>
        <button onClick={onRemove} className="text-xs font-bold ml-auto" style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Effects:</span>
            {field('damageEffect', weapon.damageEffect, { flex: 1, minWidth: '100px' })}
          </div>
          <div className="flex items-center gap-1 flex-1">
            <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Qualities:</span>
            {field('qualities', weapon.qualities, { flex: 1, minWidth: '80px' })}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <WeaponEffectTags value={weapon.damageEffect} />
          <WeaponEffectTags value={weapon.qualities} />
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 items-center">
          <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Fire:</span>
          {FIRE_MODES.map(m => (
            <button key={m} onClick={() => toggleMode(m)}
              className="text-[10px] px-1.5 py-0.5 font-bold"
              style={{ background: weapon.fireModes?.includes(m) ? '#22aa22' : '#0a1a2d', border: '1px solid #1e3a5f', color: weapon.fireModes?.includes(m) ? '#fff' : '#4a6a8a', cursor: 'pointer' }}>
              {m}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Ammo:</span>
          {field('ammoType', weapon.ammoType, { width: '80px' })}
          {field('ammoCurrent', weapon.ammoCurrent, { width: '40px' })}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Wt:</span>
          {field('weight', weapon.weight, { width: '40px' })}
        </div>
      </div>
    </div>
  );
}

const CAPACITOR_OPTIONS = [
  { label: 'Mk III', damage: '+1 CD', shots: 3 },
  { label: 'Mk IV',  damage: '+2 CD', shots: 4 },
  { label: 'Mk V',   damage: '+3 CD', shots: 5 },
  { label: 'Mk VI',  damage: '+4 CD', shots: 6 },
];

export default function WeaponsTab({ character, updateField }) {
  const [weapons, setWeapons] = useState(() => {
    try { return JSON.parse(character.equipment || '[]'); } catch { return []; }
  });
  const [showRef, setShowRef] = useState(false);
  const [laserShots, setLaserShots] = useState(0);
  const isAssaultron = character.origin === 'Assaultron';
  const isMrHandy = character.origin === 'Mister Handy';
  const mrHandyArmKeys = (() => { try { return JSON.parse(character.mr_handy_arms || '[]'); } catch { return []; } })();
  const selectedMrHandyArms = MR_HANDY_ARMS.filter(a => mrHandyArmKeys.includes(a.key));
  const capacitorLevel = character.assaultron_capacitor || 'Mk III';
  const capacitorInfo = CAPACITOR_OPTIONS.find(c => c.label === capacitorLevel) || CAPACITOR_OPTIONS[0];

  const save = (updated) => {
    setWeapons(updated);
    updateField({ equipment: JSON.stringify(updated) });
  };

  const addWeapon = () => {
    if (weapons.length >= 5) return;
    save([...weapons, { ...EMPTY_WEAPON }]);
  };

  const addFromRef = (refWeapon) => {
    if (weapons.length >= 5) return;
    const w = {
      ...EMPTY_WEAPON,
      name: refWeapon.label,
      sourceName: refWeapon.label,
      key: refWeapon.key || '',
      damage: refWeapon.damage || '',
      damageEffect: refWeapon.damageEffect || '',
      damageType: refWeapon.damageType || 'Physical',
      range: refWeapon.range || 'Short',
      qualities: refWeapon.qualities || '',
      weight: refWeapon.weight ? String(refWeapon.weight) : '',
      ammoType: refWeapon.ammo || '',
      note: refWeapon.note || '',
    };
    save([...weapons, w]);
    setShowRef(false);
  };

  const updateWeapon = (i, data) => save(weapons.map((w, idx) => idx === i ? data : w));
  const removeWeapon = (i) => save(weapons.filter((_, idx) => idx !== i));

  return (
    <div className="p-4" style={{ color: '#a8c8d8' }}>
      {/* Mister Handy Built-in Arms */}
      {isMrHandy && (
        <div className="mb-5 p-3" style={{ background: '#0a1525', border: '1px solid #cc7722' }}>
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#cc7722' }}>BUILT-IN ARM ATTACHMENTS</p>
          {selectedMrHandyArms.length === 0 ? (
            <p className="text-xs font-mono" style={{ color: '#4a6a8a' }}>No arms configured. Edit character to select arm attachments.</p>
          ) : (
            selectedMrHandyArms.map(arm => (
              <div key={arm.key} className="py-2" style={{ borderBottom: '1px solid #1e3a5f' }}>
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold text-sm" style={{ color: '#e8e8e8' }}>{arm.label}</span>
                  <span className="text-xs font-mono" style={{ color: '#22cc22' }}><CombatDiceDisplay value={arm.damage} /> {arm.damageType}</span>
                </div>
                <p className="text-[10px] font-mono mt-0.5" style={{ color: '#4a6a8a' }}>{arm.qualities} • {arm.range}{arm.damageEffect ? ` • ${arm.damageEffect}` : ''}</p>
                {arm.note && <p className="text-[10px] font-mono mt-0.5 italic" style={{ color: '#f5c518' }}>{arm.note}</p>}
              </div>
            ))
          )}
          {mrHandyArmKeys.length > 0 && !mrHandyArmKeys.includes('pincer_arm') && (
            <p className="text-[10px] font-mono mt-2 px-2 py-1" style={{ background: 'rgba(245,197,24,0.06)', border: '1px solid rgba(245,197,24,0.25)', color: '#f5c518' }}>⚠ No Pincer: cannot use Lockpick, Repair, or Throwing skills, or manipulate objects.</p>
          )}
        </div>
      )}

      {/* Assaultron Built-in Weapons */}
      {isAssaultron && (
        <div className="mb-5 p-3" style={{ background: '#0a1525', border: '1px solid #4488ff' }}>
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#4488ff' }}>BUILT-IN WEAPONS</p>
          {/* Claws */}
          <div className="py-2" style={{ borderBottom: '1px solid #1e3a5f' }}>
            <div className="flex items-center justify-between">
              <span className="font-heading font-semibold text-sm" style={{ color: '#e8e8e8' }}>Claws</span>
              <span className="text-xs font-mono" style={{ color: '#22cc22' }}>4 CD Physical</span>
            </div>
            <p className="text-[10px] font-mono mt-0.5" style={{ color: '#4a6a8a' }}>Unarmed • Melee • +1 CD already included from trait</p>
          </div>
          {/* Head Laser */}
          <div className="py-2" style={{ borderBottom: '1px solid #1e3a5f' }}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-heading font-semibold text-sm" style={{ color: '#e8e8e8' }}>Assaultron Head Laser</span>
              <span className="text-xs font-mono" style={{ color: '#22cc22' }}>5{capacitorInfo.damage !== '+1 CD' ? ` (${capacitorInfo.damage})` : ''} CD Piercing Energy</span>
            </div>
            <p className="text-[10px] font-mono mt-0.5 mb-2" style={{ color: '#4a6a8a' }}>Range: Close • Costs 2 Fusion Cell per shot</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Capacitor:</span>
              {CAPACITOR_OPTIONS.map(cap => (
                <button key={cap.label} onClick={() => updateField({ assaultron_capacitor: cap.label })}
                  className="text-[10px] px-2 py-0.5 font-bold"
                  style={{ background: capacitorLevel === cap.label ? 'rgba(68,136,255,0.15)' : '#0a1525', border: `1px solid ${capacitorLevel === cap.label ? '#4488ff' : '#1e3a5f'}`, color: capacitorLevel === cap.label ? '#4488ff' : '#4a6a8a', cursor: 'pointer' }}>
                  {cap.label} ({cap.damage}, {cap.shots} shots)
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px]" style={{ color: '#4a6a8a' }}>Shots used:</span>
              <button onClick={() => setLaserShots(Math.max(0, laserShots - 1))} className="w-5 h-5 flex items-center justify-center text-xs" style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#a8c8d8' }}>-</button>
              <span className="text-xs font-mono" style={{ color: laserShots >= capacitorInfo.shots ? '#cc4444' : '#e8e8e8' }}>{laserShots}/{capacitorInfo.shots}</span>
              <button onClick={() => setLaserShots(Math.min(capacitorInfo.shots, laserShots + 1))} className="w-5 h-5 flex items-center justify-center text-xs" style={{ background: '#0a1525', border: '1px solid #1e3a5f', color: '#a8c8d8' }}>+</button>
              <button onClick={() => setLaserShots(0)} className="text-[10px] px-2 py-0.5" style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>Recharge</button>
            </div>
          </div>
          {/* Self-Destruct */}
          <div className="py-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-semibold text-sm" style={{ color: '#cc4444' }}>Self-Destruct</span>
              <span className="text-xs font-mono" style={{ color: '#22cc22' }}>6 CD Blast Energy</span>
            </div>
            <p className="text-[10px] font-mono mt-0.5" style={{ color: '#4a6a8a' }}>Range: Close • END + Explosives</p>
            <p className="text-[10px] font-mono mt-1 px-2 py-1" style={{ background: 'rgba(204,68,68,0.12)', border: '1px solid rgba(204,68,68,0.4)', color: '#cc4444' }}>
              ⚠ DESTROYS YOU PERMANENTLY. Cannot be repaired.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>WEAPONS ({weapons.length}/5)</p>
        <div className="flex gap-2">
          <button onClick={() => setShowRef(true)} className="text-xs px-3 py-1 font-bold"
            style={{ background: '#0a1525', border: '1px solid #4a6a8a', color: '#a8c8d8', cursor: 'pointer' }}>
            📋 Add from Reference
          </button>
          {weapons.length < 5 && (
            <button onClick={addWeapon} className="text-xs px-3 py-1 font-bold"
              style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>
              + ADD BLANK
            </button>
          )}
        </div>
      </div>
      <TooltipProvider delayDuration={150}>
        {weapons.length === 0 ? (
          <div className="text-center py-8" style={{ color: '#4a6a8a' }}>
            <p className="font-mono text-sm">No weapons equipped.</p>
          </div>
        ) : (
          weapons.map((w, i) => (
            <WeaponRow key={i} weapon={w} index={i} onChange={d => updateWeapon(i, d)} onRemove={() => removeWeapon(i)} />
          ))
        )}
      </TooltipProvider>
      {showRef && <WeaponReferenceModal onSelect={addFromRef} onClose={() => setShowRef(false)} />}
    </div>
  );
}
