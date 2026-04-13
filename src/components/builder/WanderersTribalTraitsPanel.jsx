import { useState } from "react";
import { WANDERERS_TRIBAL_TRAITS, NCR_TRAITS } from "../../lib/falloutData";
import { Check } from "lucide-react";

// Tribal traits: choose 2 from Tribal OR Survivor (NCR), or 1 from each.
// "1 + perk" mode is tracked by parent setting tribalTraits to ['_perk_slot_', key].
export default function WanderersTribalTraitsPanel({ tribalTraits, onTribalTraitsChange }) {
  const [tab, setTab] = useState('tribal');

  const selected = tribalTraits || [];
  const hasPerkSlot = selected.includes('_perk_slot_');
  const traitKeys = selected.filter(k => k !== '_perk_slot_');

  const totalChoices = selected.length; // perk slot counts as one choice

  const toggle = (key) => {
    if (traitKeys.includes(key)) {
      // deselect
      onTribalTraitsChange(selected.filter(k => k !== key));
    } else {
      if (totalChoices >= 2) return; // already full
      onTribalTraitsChange([...selected, key]);
    }
  };

  const togglePerkSlot = () => {
    if (hasPerkSlot) {
      onTribalTraitsChange(selected.filter(k => k !== '_perk_slot_'));
    } else {
      if (totalChoices >= 2) return;
      onTribalTraitsChange([...selected, '_perk_slot_']);
    }
  };

  const renderTrait = (trait) => {
    const isSelected = traitKeys.includes(trait.key);
    const full = totalChoices >= 2 && !isSelected;
    return (
      <button key={trait.key} onClick={() => toggle(trait.key)} disabled={full}
        className="w-full text-left p-3 rounded-lg border transition-all"
        style={{
          background: isSelected ? 'rgba(245,197,24,0.08)' : 'rgba(10,26,45,0.6)',
          border: `1px solid ${isSelected ? '#f5c518' : '#1e3a5f'}`,
          opacity: full ? 0.5 : 1,
          cursor: full ? 'not-allowed' : 'pointer',
        }}>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <span className="font-heading font-semibold text-sm" style={{ color: isSelected ? '#f5c518' : '#c8dde8' }}>{trait.label}</span>
          {isSelected && <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#f5c518' }} />}
        </div>
        <p className="text-[10px] font-mono mb-1" style={{ color: '#4ade80' }}>✦ {trait.benefit}</p>
        <p className="text-[10px] font-mono" style={{ color: '#f97316' }}>✦ {trait.penalty}</p>
      </button>
    );
  };

  return (
    <div className="mt-4 p-4 rounded-lg" style={{ background: '#060f1c', border: '1px solid #f5c518' }}>
      <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#f5c518' }}>TRIBAL TRAITS</p>
      <p className="text-[10px] font-mono mb-3" style={{ color: '#4a6a8a' }}>
        Choose 2 traits total, or 1 trait + 1 extra perk slot ({totalChoices}/2 chosen)
      </p>

      {/* Tab toggle */}
      <div className="flex gap-2 mb-3">
        {['tribal', 'survivor'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-3 py-1.5 text-xs font-bold transition-all"
            style={{
              background: tab === t ? 'rgba(245,197,24,0.12)' : 'transparent',
              border: `1px solid ${tab === t ? '#f5c518' : '#1e3a5f'}`,
              color: tab === t ? '#f5c518' : '#4a6a8a',
            }}>
            {t === 'tribal' ? 'Tribal Traits' : 'Survivor Traits'}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {tab === 'tribal' && WANDERERS_TRIBAL_TRAITS.map(renderTrait)}
        {tab === 'survivor' && NCR_TRAITS.map(renderTrait)}
      </div>

      {/* Extra perk slot option */}
      <div className="mt-3 pt-3" style={{ borderTop: '1px solid #1e3a5f' }}>
        <button onClick={togglePerkSlot}
          disabled={totalChoices >= 2 && !hasPerkSlot}
          className="w-full text-left p-3 rounded-lg border transition-all"
          style={{
            background: hasPerkSlot ? 'rgba(34,170,34,0.08)' : 'transparent',
            border: `1px solid ${hasPerkSlot ? '#22aa22' : '#1e3a5f'}`,
            opacity: (totalChoices >= 2 && !hasPerkSlot) ? 0.5 : 1,
            cursor: (totalChoices >= 2 && !hasPerkSlot) ? 'not-allowed' : 'pointer',
          }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: hasPerkSlot ? '#22cc22' : '#6a8a9a' }}>+ Extra Perk Slot (instead of 2nd trait)</span>
            {hasPerkSlot && <Check className="w-4 h-4" style={{ color: '#22cc22' }} />}
          </div>
        </button>
      </div>
    </div>
  );
}