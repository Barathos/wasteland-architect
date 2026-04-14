import { ORIGIN_PACKS } from '../../lib/falloutData';
import { Check } from 'lucide-react';

const TYPE_ICONS = {
  weapon: '⚔', apparel: '🧥', ammo: '💥', consumable: '💊',
  food: '🍖', robot_armor: '🤖', robot_mod: '⚙', miscellany: '🎒', currency: '💰',
};

function EquipPreview({ equipment }) {
  return (
    <div className="flex flex-wrap gap-1 mt-1.5">
      {equipment.map((item, i) => (
        <span key={i} className="text-[9px] font-mono px-1 py-0.5 flex items-center gap-0.5"
          style={{ background: 'rgba(168,200,216,0.06)', border: '1px solid rgba(168,200,216,0.15)', color: '#6a9aba' }}>
          {TYPE_ICONS[item.type] || '•'} {item.name}{item.quantity > 1 ? ` ×${item.quantity}` : ''}{item.optional ? ' (choice)' : ''}
        </span>
      ))}
    </div>
  );
}

export default function SubOriginSelector({ character, onChange }) {
  const packs = ORIGIN_PACKS[character.origin];
  if (!packs || packs.length === 0) return null;

  const selected = character.sub_origin;
  const isAutoSelect = packs.length === 1;

  // Auto-select single-pack origins display only
  if (isAutoSelect) {
    const pack = packs[0];
    return (
      <div className="mt-4 pt-4" style={{ borderTop: '1px solid #1e3a5f' }}>
        <p className="text-[10px] font-bold tracking-widest mb-2" style={{ color: '#f5c518' }}>STARTING EQUIPMENT</p>
        <div className="px-3 py-2" style={{ background: 'rgba(34,204,34,0.04)', border: '1px solid rgba(34,204,34,0.2)' }}>
          <p className="text-xs font-mono" style={{ color: '#a8d8a8' }}>{pack.description}</p>
          <EquipPreview equipment={pack.equipment} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4" style={{ borderTop: '1px solid #1e3a5f' }}>
      <p className="text-[10px] font-bold tracking-widest mb-2" style={{ color: '#f5c518' }}>CHOOSE YOUR BACKGROUND</p>
      <p className="text-[10px] font-mono mb-3" style={{ color: '#4a6a8a' }}>Select a background to set your starting equipment.</p>
      <div className="space-y-2">
        {packs.map(pack => {
          const isSel = selected === pack.key;
          return (
            <button
              key={pack.key}
              onClick={() => onChange({ sub_origin: isSel ? '' : pack.key })}
              className="w-full text-left px-3 py-2.5 transition-all"
              style={{
                background: isSel ? 'rgba(245,197,24,0.08)' : 'rgba(0,0,0,0.2)',
                border: `1px solid ${isSel ? '#f5c518' : '#1e3a5f'}`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold" style={{ color: isSel ? '#f5c518' : '#e8e8e8' }}>
                  {isSel && <Check className="inline w-3 h-3 mr-1" />}
                  {pack.label}
                </span>
              </div>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: '#6a9aba' }}>{pack.description}</p>
              <EquipPreview equipment={pack.equipment} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
