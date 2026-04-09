import { Link } from "react-router-dom";
import { User, Zap, Heart, Shield, ChevronRight } from "lucide-react";
import { ORIGINS, calculateDerivedStats } from "../lib/falloutData";

export default function CharacterCard({ character }) {
  const origin = ORIGINS.find(o => o.label === character.origin);
  const derived = calculateDerivedStats(character);
  const totalSpecial = (character.strength || 5) + (character.perception || 5) + (character.endurance || 5) +
    (character.charisma || 5) + (character.intelligence || 5) + (character.agility || 5) + (character.luck || 5);

  return (
    <Link
      to={`/character/${character.id}`}
      className="group block"
    >
      <div className="border border-border rounded-lg bg-card hover:border-primary/40 transition-all duration-300 glow-border hover:shadow-[0_0_20px_hsl(120_60%_35%/0.1)] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center">
                {character.portrait_url ? (
                  <img src={character.portrait_url} alt="" className="w-full h-full rounded-lg object-cover" />
                ) : (
                  <User className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {character.name}
                </h3>
                <p className="text-xs font-mono text-secondary">
                  {character.origin} · LVL {character.level || 1}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="p-4 sm:p-5 grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-destructive" />
            <div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">HP</p>
              <p className="text-sm font-heading font-bold text-foreground">{derived.hp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-secondary" />
            <div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">DEF</p>
              <p className="text-sm font-heading font-bold text-foreground">{derived.defense}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">S.P.E.C.I.A.L</p>
              <p className="text-sm font-heading font-bold text-foreground">{totalSpecial}</p>
            </div>
          </div>
        </div>

        {/* SPECIAL Bar */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <div className="flex gap-1">
            {[
              { v: character.strength, c: 'bg-red-500' },
              { v: character.perception, c: 'bg-orange-500' },
              { v: character.endurance, c: 'bg-yellow-500' },
              { v: character.charisma, c: 'bg-green-500' },
              { v: character.intelligence, c: 'bg-blue-500' },
              { v: character.agility, c: 'bg-indigo-500' },
              { v: character.luck, c: 'bg-purple-500' },
            ].map((stat, i) => (
              <div key={i} className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${stat.c} transition-all`}
                  style={{ width: `${((stat.v || 5) / 10) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}