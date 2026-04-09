import { SPECIAL_ATTRIBUTES, SPECIAL_TOTAL_POINTS, SPECIAL_MIN, SPECIAL_MAX } from "../../lib/falloutData";
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
  const currentTotal = SPECIAL_ATTRIBUTES.reduce(
    (sum, attr) => sum + (character[attr.key] || 5), 0
  );
  const remaining = SPECIAL_TOTAL_POINTS - currentTotal;

  const handleChange = (key, delta) => {
    const current = character[key] || 5;
    const newVal = current + delta;
    if (newVal < SPECIAL_MIN || newVal > SPECIAL_MAX) return;
    if (delta > 0 && remaining <= 0) return;
    onChange({ [key]: newVal });
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
          const value = character[attr.key] || 5;
          const percentage = ((value - SPECIAL_MIN) / (SPECIAL_MAX - SPECIAL_MIN)) * 100;
          const color = STAT_COLORS[attr.key];

          return (
            <div key={attr.key} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary w-8">{attr.abbr}</span>
                  <span className="font-heading text-sm text-foreground">{attr.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 rounded-md hover:bg-destructive/20 hover:text-destructive"
                    onClick={() => handleChange(attr.key, -1)}
                    disabled={value <= SPECIAL_MIN}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="font-heading font-bold text-lg w-8 text-center text-foreground">
                    {value}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 rounded-md hover:bg-primary/20 hover:text-primary"
                    onClick={() => handleChange(attr.key, 1)}
                    disabled={value >= SPECIAL_MAX || remaining <= 0}
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
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}