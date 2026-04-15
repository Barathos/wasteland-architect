import { User } from "lucide-react";
import { getNextLevelXP } from "../../lib/falloutData";

export default function SheetHeader({ character, updateField }) {
  const level = character.level || 1;
  const currentXP = character.xp || 0;
  const nextLevelXP = getNextLevelXP(level);
  const luckPoints = character.luck_points ?? (character.luck || 5);

  return (
    <div style={{ background: '#0a1a2d', borderBottom: '2px solid #1e3a5f' }}>
      <div className="flex items-center gap-4 px-4 py-3 flex-wrap">
        {/* Portrait */}
        <div
          className="w-20 h-20 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center"
          style={{ border: '3px solid #f5c518', background: '#060f1c' }}
        >
          {character.portrait_url
            ? <img src={character.portrait_url} alt="" className="w-full h-full object-cover" />
            : <User className="w-10 h-10" style={{ color: '#4a6a8a' }} />
          }
        </div>

        {/* Name + Origin */}
        <div className="flex-1 min-w-0">
          <h1 className="font-heading font-bold italic text-3xl sm:text-4xl truncate" style={{ color: '#f5c518' }}>
            {character.name}
          </h1>
          <div className="mt-1.5">
            <p className="text-[10px] tracking-widest uppercase" style={{ color: '#4a6a8a' }}>Origin</p>
            <p className="text-sm font-heading pb-1" style={{ color: '#a8c8d8', borderBottom: '1px dashed #1e3a5f' }}>
              {character.origin}
            </p>
          </div>
        </div>

        {/* Level + XP */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-sm font-bold italic tracking-wider" style={{ color: '#f5c518' }}>Level</p>
            <div className="w-12 h-9 flex items-center justify-center text-xl font-bold"
              style={{ background: '#060f1c', border: '1px solid #2a4a6a', color: '#e8e8e8' }}>
              {level}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs">
            <p style={{ color: '#a8c8d8' }}>Current XP</p>
            <p style={{ color: '#a8c8d8' }}>Next Level XP</p>
            <p className="font-bold" style={{ color: '#e8e8e8' }}>{currentXP}</p>
            <p className="font-bold" style={{ color: '#e8e8e8' }}>{nextLevelXP}</p>
          </div>
        </div>

        {/* Luck Points */}
        <div className="flex-shrink-0 px-4 py-2" style={{ border: '2px solid #22aa22', background: '#0a1f0a', borderRadius: '4px' }}>
          <div className="flex items-center gap-2 justify-center mb-1">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: '#22aa22', color: '#0a1f0a' }}>☘</div>
            <p className="text-sm font-bold italic" style={{ color: '#22cc22' }}>Luck</p>
          </div>
          <p className="text-[10px] text-center mb-1" style={{ color: '#4a8a4a' }}>Points</p>
          <div className="flex items-center gap-1 justify-center">
            <button onClick={() => updateField({ luck_points: Math.max(0, luckPoints - 1) })}
              className="w-5 h-5 flex items-center justify-center text-xs font-bold"
              style={{ background: '#060f1c', border: '1px solid #2a4a6a', color: '#a8c8d8' }}>-</button>
            <div className="w-10 h-8 flex items-center justify-center text-xl font-bold"
              style={{ background: '#060f1c', border: '1px solid #2a4a6a', color: '#e8e8e8' }}>
              {luckPoints}
            </div>
            <button onClick={() => updateField({ luck_points: luckPoints + 1 })}
              className="w-5 h-5 flex items-center justify-center text-xs font-bold"
              style={{ background: '#060f1c', border: '1px solid #2a4a6a', color: '#a8c8d8' }}>+</button>
          </div>
        </div>

      </div>
    </div>
  );
}
