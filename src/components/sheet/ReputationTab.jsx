import { useState } from "react";
import { FACTIONS } from "../../lib/falloutData";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";

const COMPANION_RANKS = [
  { rank: 0, label: 'Hostile', effect: 'Leaves and actively works against you.' },
  { rank: 1, label: 'Cautious', effect: 'Wary and may refuse commands.' },
  { rank: 2, label: 'Neutral', effect: 'Default starting relationship.' },
  { rank: 3, label: 'Friendly', effect: 'Shares supplies and proactively helps.' },
  { rank: 4, label: 'Trusting', effect: 'Will not disobey, can be talked around.' },
  { rank: 5, label: 'Allied', effect: 'Difficulty of CHA+Speech tests assisted by companion decreases by 1.' },
];

function rankColor(rank) {
  if (rank === 0) return '#cc4444';
  if (rank === 1) return '#cc7722';
  if (rank === 2) return '#ccaa00';
  return '#22cc22';
}

function PipRow({ rank, maxRank = 5, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      <button onClick={() => onChange(Math.max(0, rank - 1))}
        className="w-5 h-5 flex items-center justify-center"
        style={{ color: '#4a6a8a', background: 'none', border: '1px solid #1e3a5f', cursor: 'pointer' }}>
        <Minus size={10} />
      </button>
      <div className="flex gap-1">
        {Array.from({ length: maxRank + 1 }, (_, i) => (
          <button key={i} onClick={() => onChange(i)}
            title={`Set rank ${i}`}
            className="w-4 h-4 rounded-sm transition-all hover:opacity-80"
            style={{
              background: i <= rank ? rankColor(rank) : '#0a1a2d',
              border: `1px solid ${i <= rank ? rankColor(rank) : '#1e3a5f'}`,
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
      <button onClick={() => onChange(Math.min(maxRank, rank + 1))}
        className="w-5 h-5 flex items-center justify-center"
        style={{ color: '#4a6a8a', background: 'none', border: '1px solid #1e3a5f', cursor: 'pointer' }}>
        <Plus size={10} />
      </button>
    </div>
  );
}

function FactionCard({ faction, data, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const rank = data.rank ?? 2;
  const rankInfo = faction.ranks[rank];
  const color = rankColor(rank);

  return (
    <div style={{ background: '#0a1525', border: '1px solid #1e3a5f', marginBottom: '8px' }}>
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-heading font-bold text-sm" style={{ color: '#e8e8e8' }}>{faction.label}</h3>
            <p className="text-[10px] font-mono mt-0.5" style={{ color: '#4a6a8a' }}>{faction.description}</p>
          </div>
          <button onClick={() => setExpanded(e => !e)}
            style={{ color: '#4a6a8a', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <PipRow rank={rank} onChange={(r) => onUpdate({ ...data, rank: r })} />

        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs font-bold font-heading" style={{ color }}>{rankInfo?.label}</span>
          <span className="text-[10px] font-mono" style={{ color: '#6a8a9a' }}>— {rankInfo?.effect}</span>
        </div>

        {expanded && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[9px] font-mono font-bold mb-1" style={{ color: '#22cc22' }}>POSITIVE INFLUENCES</p>
              {faction.positiveInfluences.map((inf, i) => (
                <p key={i} className="text-[10px] font-mono mb-0.5" style={{ color: '#4a8a5a' }}>+ {inf}</p>
              ))}
            </div>
            <div>
              <p className="text-[9px] font-mono font-bold mb-1" style={{ color: '#cc4444' }}>NEGATIVE INFLUENCES</p>
              {faction.negativeInfluences.map((inf, i) => (
                <p key={i} className="text-[10px] font-mono mb-0.5" style={{ color: '#8a4a4a' }}>− {inf}</p>
              ))}
            </div>
          </div>
        )}

        <textarea
          value={data.notes || ''}
          onChange={e => onUpdate({ ...data, notes: e.target.value })}
          placeholder="Session notes..."
          rows={1}
          className="mt-2 w-full text-[11px] font-mono resize-none"
          style={{ background: '#060f1c', border: '1px solid #1e3a5f', color: '#a8c8d8', outline: 'none', padding: '4px 6px' }}
        />
      </div>
    </div>
  );
}

function CompanionCard({ companion, onUpdate, onRemove }) {
  const rank = companion.rank ?? 2;
  const rankInfo = COMPANION_RANKS[rank];
  const color = rankColor(rank);

  return (
    <div style={{ background: '#0a1525', border: '1px solid #1e3a5f', marginBottom: '8px' }}>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <input
            value={companion.name || ''}
            onChange={e => onUpdate({ ...companion, name: e.target.value })}
            placeholder="Companion name..."
            className="flex-1 text-sm font-heading font-bold"
            style={{ background: 'none', border: 'none', color: '#e8e8e8', outline: 'none' }}
          />
          <button onClick={onRemove} style={{ color: '#cc4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>✕</button>
        </div>
        <PipRow rank={rank} onChange={(r) => onUpdate({ ...companion, rank: r })} />
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs font-bold font-heading" style={{ color }}>{rankInfo?.label}</span>
          <span className="text-[10px] font-mono" style={{ color: '#6a8a9a' }}>— {rankInfo?.effect}</span>
        </div>
      </div>
    </div>
  );
}

function parse(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

export default function ReputationTab({ character, updateField }) {
  const [repData, setRepData] = useState(() => parse(character.faction_reputations, {
    factions: {},
    companions: [],
  }));

  const save = (updated) => {
    setRepData(updated);
    updateField({ faction_reputations: JSON.stringify(updated) });
  };

  const updateFaction = (key, data) => {
    save({ ...repData, factions: { ...repData.factions, [key]: data } });
  };

  const updateCompanion = (i, data) => {
    const companions = [...(repData.companions || [])];
    companions[i] = data;
    save({ ...repData, companions });
  };

  const addCompanion = () => {
    if ((repData.companions || []).length >= 2) return;
    save({ ...repData, companions: [...(repData.companions || []), { name: '', rank: 2 }] });
  };

  const removeCompanion = (i) => {
    const companions = (repData.companions || []).filter((_, idx) => idx !== i);
    save({ ...repData, companions });
  };

  const sectionHeader = (title) => (
    <div className="px-3 py-2 mb-3" style={{ background: '#06111f', borderBottom: '1px solid #1e3a5f' }}>
      <p className="text-xs font-bold tracking-widest" style={{ color: '#f5c518' }}>{title}</p>
    </div>
  );

  return (
    <div style={{ color: '#a8c8d8' }}>
      {/* Faction Reputation */}
      <div style={{ borderBottom: '1px solid #1e3a5f' }}>
        {sectionHeader('FACTION REPUTATION')}
        <div className="px-4 pb-4">
          {FACTIONS.map(faction => (
            <FactionCard
              key={faction.key}
              faction={faction}
              data={repData.factions?.[faction.key] || { rank: 2 }}
              onUpdate={(data) => updateFaction(faction.key, data)}
            />
          ))}
        </div>
      </div>

      {/* Companion Reputation */}
      <div>
        {sectionHeader('COMPANION REPUTATION')}
        <div className="px-4 pb-4">
          {(repData.companions || []).map((comp, i) => (
            <CompanionCard
              key={i}
              companion={comp}
              onUpdate={(data) => updateCompanion(i, data)}
              onRemove={() => removeCompanion(i)}
            />
          ))}
          {(repData.companions || []).length < 2 && (
            <button onClick={addCompanion} className="text-xs font-bold px-3 py-1.5 w-full mt-1"
              style={{ background: '#0a2a0a', border: '1px solid #22aa22', color: '#22cc22', cursor: 'pointer' }}>
              + TRACK COMPANION
            </button>
          )}
        </div>
      </div>
    </div>
  );
}