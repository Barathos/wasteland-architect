import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { calculateDerivedStats, SPECIAL_ATTRIBUTES, SKILLS, PERKS } from "../lib/falloutData";
import {
  ArrowLeft, Trash2, Edit, Heart, Shield, Zap, Swords,
  Weight, Clover, Timer, User, Radiation
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const STAT_COLORS = {
  strength: { bar: 'bg-red-500', text: 'text-red-400' },
  perception: { bar: 'bg-orange-500', text: 'text-orange-400' },
  endurance: { bar: 'bg-yellow-500', text: 'text-yellow-400' },
  charisma: { bar: 'bg-green-500', text: 'text-green-400' },
  intelligence: { bar: 'bg-blue-500', text: 'text-blue-400' },
  agility: { bar: 'bg-indigo-500', text: 'text-indigo-400' },
  luck: { bar: 'bg-purple-500', text: 'text-purple-400' },
};

export default function CharacterSheet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacter();
  }, [id]);

  const loadCharacter = async () => {
    const chars = await base44.entities.Character.filter({ id });
    if (chars.length > 0) {
      setCharacter(chars[0]);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    await base44.entities.Character.delete(id);
    toast.success("Character deleted from vault records");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Radiation className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="text-center py-20">
        <p className="font-mono text-muted-foreground">Character not found in vault records.</p>
        <Link to="/" className="text-primary font-mono text-sm hover:underline mt-2 inline-block">
          Return to dashboard
        </Link>
      </div>
    );
  }

  const derived = calculateDerivedStats(character);
  const skills = (() => { try { return JSON.parse(character.skills || "{}"); } catch { return {}; } })();
  const tagSkills = (() => { try { return JSON.parse(character.tag_skills || "[]"); } catch { return []; } })();
  const selectedPerks = (() => { try { return JSON.parse(character.perks || "[]"); } catch { return []; } })();

  const perkDetails = selectedPerks.map(pk => PERKS.find(p => p.key === pk)).filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All Characters
        </Link>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 font-mono text-xs gap-1.5">
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-heading text-foreground">Delete Character?</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground font-mono text-sm">
                  This will permanently remove {character.name} from the vault records.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="font-mono text-sm">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground font-mono text-sm">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Character Header */}
      <div className="border border-border rounded-lg bg-card p-5 sm:p-6 mb-6 glow-border">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-muted border border-border flex items-center justify-center flex-shrink-0">
            {character.portrait_url ? (
              <img src={character.portrait_url} alt="" className="w-full h-full rounded-xl object-cover" />
            ) : (
              <User className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-primary glow-text truncate">
              {character.name}
            </h1>
            <p className="font-mono text-sm text-secondary mt-0.5">
              {character.origin} · Level {character.level || 1}
            </p>
            {character.background && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{character.background}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: S.P.E.C.I.A.L. */}
        <div className="space-y-4">
          <div className="border border-border rounded-lg bg-card p-4">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
              S.P.E.C.I.A.L.
            </h3>
            <div className="space-y-3">
              {SPECIAL_ATTRIBUTES.map(attr => {
                const value = character[attr.key] || 5;
                const colors = STAT_COLORS[attr.key];
                const pct = ((value - 4) / 6) * 100;
                return (
                  <div key={attr.key}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs font-bold ${colors.text}`}>{attr.abbr}</span>
                        <span className="font-heading text-sm text-foreground">{attr.label}</span>
                      </div>
                      <span className="font-heading font-bold text-lg text-foreground">{value}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${colors.bar} transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Derived Stats */}
          <div className="border border-border rounded-lg bg-card p-4">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
              Derived Stats
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "HP", value: derived.hp, icon: Heart, color: "text-red-400" },
                { label: "Initiative", value: derived.initiative, icon: Timer, color: "text-orange-400" },
                { label: "Defense", value: derived.defense, icon: Shield, color: "text-blue-400" },
                { label: "Melee", value: `+${derived.melee_bonus}`, icon: Swords, color: "text-yellow-400" },
                { label: "Carry", value: `${derived.carry_weight}`, icon: Weight, color: "text-green-400" },
                { label: "Luck Pts", value: derived.luck_points, icon: Clover, color: "text-purple-400" },
                { label: "AP", value: derived.action_points, icon: Zap, color: "text-primary" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                  <div>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase">{label}</p>
                    <p className="font-heading font-bold text-sm text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Skills */}
        <div className="border border-border rounded-lg bg-card p-4">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
            Skills
          </h3>
          <div className="space-y-2">
            {SKILLS.map(skill => {
              const value = skills[skill.key] || 0;
              const isTag = tagSkills.includes(skill.key);
              const attrAttr = SPECIAL_ATTRIBUTES.find(a => a.key === skill.attribute);
              const attrVal = character[skill.attribute] || 5;
              const targetNumber = value + attrVal + (isTag ? 2 : 0);

              return (
                <div
                  key={skill.key}
                  className={`flex items-center justify-between py-1.5 px-2 rounded ${
                    isTag ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {isTag && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    )}
                    <span className="font-heading text-sm text-foreground truncate">{skill.label}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {attrAttr?.abbr} {attrVal}+{value}{isTag ? "+2" : ""}
                    </span>
                    <span className={`font-heading font-bold text-sm w-6 text-right ${
                      isTag ? "text-primary" : "text-foreground"
                    }`}>
                      {targetNumber}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Perks & Notes */}
        <div className="space-y-4">
          <div className="border border-border rounded-lg bg-card p-4">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
              Perks ({perkDetails.length})
            </h3>
            {perkDetails.length === 0 ? (
              <p className="text-sm text-muted-foreground font-mono">No perks selected.</p>
            ) : (
              <div className="space-y-2">
                {perkDetails.map(perk => (
                  <div key={perk.key} className="p-2.5 rounded-lg bg-muted/50 border border-border/50">
                    <h4 className="font-heading font-semibold text-sm text-primary">{perk.label}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{perk.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {character.notes && (
            <div className="border border-border rounded-lg bg-card p-4">
              <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                Notes
              </h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{character.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}