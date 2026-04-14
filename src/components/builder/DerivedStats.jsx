import { calculateDerivedStats, getActiveTraitEffects } from "../../lib/falloutData";
import { Heart, Shield, Zap, Swords, Weight, Clover, Timer } from "lucide-react";

export default function DerivedStats({ character }) {
  const derived = calculateDerivedStats(character);
  const traits = getActiveTraitEffects(character);

  const stats = [
    { label: "Hit Points", value: derived.hp, icon: Heart, color: "text-red-400" },
    { label: "Initiative", value: derived.initiative, icon: Timer, color: "text-orange-400" },
    { label: "Defense", value: derived.defense, icon: Shield, color: "text-blue-400" },
    { label: "Melee Bonus", value: `+${derived.melee_bonus}`, icon: Swords, color: "text-yellow-400" },
    { label: "Carry Weight", value: `${derived.carry_weight} lbs`, icon: Weight, color: "text-green-400" },
    { label: "Luck Points", value: `${derived.luck_points}${traits.luckPointPenalty ? ' (−1 Gifted)' : ''}`, icon: Clover, color: "text-purple-400" },
    { label: "Action Points", value: derived.action_points, icon: Zap, color: "text-primary" },
  ];

  return (
    <div className="border border-border rounded-lg bg-card p-4">
      <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
        Derived Statistics
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex items-center gap-2.5">
            <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
            <div className="min-w-0">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider truncate">{label}</p>
              <p className="font-heading font-bold text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}