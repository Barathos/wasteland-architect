import { SPECIAL_ATTRIBUTES, SPECIAL_TOTAL_POINTS, getActiveTraitEffects, getOriginSpecialAdjustment, getSpecialAttributeBounds } from "../../lib/falloutData";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const STAT_COLORS = {
  strength: 'bg-red-500',
  perception: 'bg-orange-500',
  endurance: 'bg-yellow-500',
  charisma: 'bg-green-500',
  intelligence: 'bg-blue-500',
  agility: 'bg-indigo-500',
  luck: 'bg-purple-500',
};

export default function SpecialStats({ character, onChange }) {
  const traits = getActiveTraitEffects(character);
  const giftedBonuses = traits.giftedBonuses;
  const bounds = getSpecialAttributeBounds(character);
  const originAdjustment = getOriginSpecialAdjustment(character.origin);

  const currentTotal = SPECIAL_ATTRIBUTES.reduce(
    (sum, attr) => sum + (character[attr.key] || 5), 0
  );
  const totalOriginAdjustment = SPECIAL_ATTRIBUTES.reduce(
    (sum, attr) => sum + Number(originAdjustment[attr.key] || 0),
    0
  );
  const spentBaseTotal = currentTotal - totalOriginAdjustment;
  const remaining = SPECIAL_TOTAL_POINTS - spentBaseTotal;

  const handleChange = (key, delta) => {
    const current = character[key] || 5;
    const newVal = current + delta;
    const { min, max } = bounds[key] || { min: 4, max: 10 };
    if (newVal < min || newVal > max) return;
    if (delta > 0 && remaining <= 0) return;
    onChange({ [key]: newVal });
  };

  const toggleGiftedBonus = (key) => {
    const already = giftedBonuses.includes(key);
    let updated;
    if (already) {
      updated = giftedBonuses.filter(k => k !== key);
    } else if (giftedBonuses.length < 2) {
      updated = [...giftedBonuses, key];
    } else {
      return; // already 2 selected
    }
    onChange({ gifted_bonuses: JSON.stringify(updated) });
  };

  return (
    <div className="space-y-5">
      {/* Points Header */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Points Remaining
        </span>
        <span className={`font-heading font-bold text-xl ${remaining > 0 ? 'text-primary glow-text' : remaining === 0 ? 'text-secondary glow-green' : 'text-destructive'}`}>
          {remaining}
        </span>
      </div>

      {/* Stat Rows */}
      <div className="space-y-3">
        {SPECIAL_ATTRIBUTES.map((attr) => {
          const baseValue = character[attr.key] || 5;
          const { min, max } = bounds[attr.key] || { min: 4, max: 10 };
          const giftedBoost = traits.hasGifted && giftedBonuses.includes(attr.key) ? 1 : 0;
          const displayValue = baseValue + giftedBoost;
          const percentage = ((baseValue - min) / Math.max(1, (max - min))) * 100;
          const color = STAT_COLORS[attr.key];

          return (
            <div key={attr.key} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary w-8">{attr.abbr}</span>
                  <span className="font-heading text-sm text-foreground">{attr.label}</span>
                  {giftedBoost > 0 && (
                    <span className="text-[9px] font-mono px-1 py-0.5" style={{ background: 'rgba(120,60,200,0.15)', border: '1px solid rgba(170,102,255,0.4)', color: '#cc99ff' }}>+1 Gifted</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 rounded-md hover:bg-destructive/20 hover:text-destructive"
                    onClick={() => handleChange(attr.key, -1)}
                    disabled={baseValue <= min}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="font-heading font-bold text-lg w-8 text-center text-foreground">
                    {displayValue}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 rounded-md hover:bg-primary/20 hover:text-primary"
                    onClick={() => handleChange(attr.key, 1)}
                    disabled={baseValue >= max || remaining <= 0}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${color} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                {attr.description}
                <span className="ml-1">({min}-{max})</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Gifted trait bonus selector */}
      {traits.hasGifted && (
        <div className="p-3 rounded-lg" style={{ background: 'rgba(120,60,200,0.08)', border: '1px solid rgba(170,102,255,0.35)' }}>
          <p className="text-xs font-bold tracking-wider mb-1" style={{ color: '#cc99ff' }}>
            GIFTED — Choose 2 attributes to boost +1
            <span className="ml-2 text-[10px] font-mono" style={{ color: giftedBonuses.length === 2 ? '#22cc22' : '#f5c518' }}>
              ({giftedBonuses.length}/2 selected)
            </span>
          </p>
          <p className="text-[10px] font-mono mb-2" style={{ color: '#cc4444' }}>
            ⚠ Penalty: Max Luck Points reduced by 1
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SPECIAL_ATTRIBUTES.map(attr => {
              const sel = giftedBonuses.includes(attr.key);
              const locked = !sel && giftedBonuses.length >= 2;
              return (
                <button key={attr.key}
                  onClick={() => toggleGiftedBonus(attr.key)}
                  disabled={locked}
                  className="text-[10px] font-mono px-2 py-1 transition-all"
                  style={{
                    background: sel ? 'rgba(120,60,200,0.25)' : 'rgba(0,0,0,0.2)',
                    border: `1px solid ${sel ? 'rgba(170,102,255,0.7)' : 'rgba(170,102,255,0.2)'}`,
                    color: sel ? '#cc99ff' : locked ? '#4a3a5a' : '#a88acc',
                    cursor: locked ? 'not-allowed' : 'pointer',
                  }}>
                  {sel ? '✓ ' : ''}{attr.abbr}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
