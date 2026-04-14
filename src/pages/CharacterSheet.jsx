import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { calculateBodyPartHP } from "../lib/falloutData";
import SheetHeader from "../components/sheet/SheetHeader";
import StatusTab from "../components/sheet/StatusTab";
import AbilitiesTab from "../components/sheet/AbilitiesTab";
import WeaponsTab from "../components/sheet/WeaponsTab";
import ApparelTab from "../components/sheet/ApparelTab";
import GearTab from "../components/sheet/GearTab";
import DataTab from "../components/sheet/DataTab";
import EffectsTab from "../components/sheet/EffectsTab";
import LegendaryTab from "../components/sheet/LegendaryTab";
import DiceRoller from "../components/sheet/DiceRoller";
import CompanionsTab from "../components/sheet/CompanionsTab";
import ReputationTab from "../components/sheet/ReputationTab";
import CombatTracker from "../components/sheet/CombatTracker";
import { ArrowLeft, Trash2, Radiation, Edit2, Swords, Printer, Download } from "lucide-react";
import { exportToFoundry } from "../lib/foundryExport";
import {
  exportFoundryScavengingImportScript,
  getFoundryScavengingScriptFilename,
} from "../lib/foundryScavengingExport";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TABS = ['STATUS', 'COMPANIONS', 'ABILITIES', 'WEAPONS', 'APPAREL', 'GEAR', 'DATA', 'REPUTATION', 'EFFECTS', 'LEGENDARY'];

export default function CharacterSheet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('STATUS');
  const [showCombat, setShowCombat] = useState(false);

  useEffect(() => { loadCharacter(); }, [id]);

  const loadCharacter = async () => {
    try {
      const chars = await base44.entities.Character.filter({ id });
      if (chars.length > 0) {
        const char = chars[0];
        const bodyParts = calculateBodyPartHP(char);
        const initialized = { ...char };
        Object.entries(bodyParts).forEach(([part, data]) => {
          if (initialized[`hp_${part}`] == null) initialized[`hp_${part}`] = data.max;
        });
        setCharacter(initialized);
      }
    } catch {
      toast.error("Failed to load character.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = async (updates) => {
    const prev = character;
    setCharacter(p => ({ ...p, ...updates }));
    try {
      await base44.entities.Character.update(id, updates);
    } catch {
      setCharacter(prev);
      toast.error("Failed to save changes.");
    }
  };

  const handleDelete = async () => {
    try {
      await base44.entities.Character.delete(id);
      toast.success("Character deleted");
      navigate("/");
    } catch {
      toast.error("Failed to delete character.");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: '#0d2137' }}>
      <Radiation className="w-10 h-10 animate-spin" style={{ color: '#f5c518' }} />
    </div>
  );

  if (!character) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ background: '#0d2137', color: '#a8c8d8' }}>
      <p className="font-mono">Character not found in vault records.</p>
      <Link to="/" style={{ color: '#f5c518' }} className="font-mono text-sm hover:underline">Return to dashboard</Link>
    </div>
  );

  return (
    <div style={{ background: '#0d2137', minHeight: '100vh', fontFamily: 'var(--font-mono)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2" style={{ background: '#060f1c', borderBottom: '1px solid #1e3a5f' }}>
        <Link to="/" className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: '#a8c8d8' }}>
          <ArrowLeft className="w-4 h-4" /> All Characters
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const script = exportFoundryScavengingImportScript();
              const blob = new Blob([script], { type: "application/javascript" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = getFoundryScavengingScriptFilename();
              a.click();
              URL.revokeObjectURL(url);
            }}
            title="Run this macro in Foundry as GM to create scavenging loot roll tables and auto-assign category mappings"
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 transition-colors hover:opacity-80 print:hidden"
            style={{ color: '#6ab0ff', background: 'rgba(68,136,255,0.08)', border: '1px solid rgba(68,136,255,0.3)' }}>
            <Download className="w-3.5 h-3.5" /> Export Scavenging Tables Script
          </button>
          <button
            onClick={() => {
              const data = exportToFoundry(character);
              const json = JSON.stringify(data, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `fvtt-Actor-${(character.name || 'character').replace(/\s+/g, '-')}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            title="Import in Foundry: right-click Actor directory → Import Data"
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 transition-colors hover:opacity-80 print:hidden"
            style={{ color: '#22cc22', background: 'rgba(34,204,34,0.08)', border: '1px solid rgba(34,204,34,0.3)' }}>
            <Download className="w-3.5 h-3.5" /> Export to Foundry VTT
          </button>
          <button onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 transition-colors hover:opacity-80 print:hidden"
            style={{ color: '#a8c8d8', background: 'rgba(168,200,216,0.08)', border: '1px solid rgba(168,200,216,0.3)' }}>
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
          <button onClick={() => setShowCombat(true)}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 transition-colors hover:opacity-80"
            style={{ color: '#cc4444', background: 'rgba(204,68,68,0.08)', border: '1px solid rgba(204,68,68,0.3)' }}>
            <Swords className="w-3.5 h-3.5" /> Combat
          </button>
          <button onClick={() => navigate(`/builder?edit=${id}`)}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 transition-colors hover:opacity-80"
            style={{ color: '#f5c518', background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.3)' }}>
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-900/20 font-mono text-xs gap-1.5">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-heading text-foreground">Delete Character?</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground font-mono text-sm">
                  Permanently remove {character.name} from vault records.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <SheetHeader character={character} updateField={updateField} />

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto" style={{ background: '#060f1c', borderBottom: '2px solid #f5c518' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="px-5 py-3 text-xs font-bold tracking-widest whitespace-nowrap transition-all"
            style={{
              color: activeTab === tab ? '#f5c518' : '#4a6a8a',
              background: activeTab === tab ? 'rgba(245,197,24,0.08)' : 'transparent',
              borderBottom: activeTab === tab ? '2px solid #f5c518' : '2px solid transparent',
              marginBottom: '-2px',
            }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'STATUS'    && <StatusTab character={character} updateField={updateField} />}
      {activeTab === 'ABILITIES' && <AbilitiesTab character={character} updateField={updateField} />}
      {activeTab === 'WEAPONS'   && <WeaponsTab character={character} updateField={updateField} />}
      {activeTab === 'APPAREL'   && <ApparelTab character={character} updateField={updateField} />}
      {activeTab === 'GEAR'      && <GearTab character={character} updateField={updateField} />}
      {activeTab === 'DATA'      && <DataTab character={character} updateField={updateField} />}
      {activeTab === 'REPUTATION'  && <ReputationTab character={character} updateField={updateField} />}
      {activeTab === 'EFFECTS'     && <EffectsTab character={character} updateField={updateField} />}
      {activeTab === 'LEGENDARY'   && <LegendaryTab character={character} updateField={updateField} />}
      {activeTab === 'COMPANIONS'  && <CompanionsTab character={character} updateField={updateField} />}

      <DiceRoller character={character} />
      {showCombat && <CombatTracker character={character} onClose={() => setShowCombat(false)} />}
    </div>
  );
}
