import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetailsPanel from "../components/builder/DetailsPanel";
import SpecialStats from "../components/builder/SpecialStats";
import SkillsPanel from "../components/builder/SkillsPanel";
import PerksPanel from "../components/builder/PerksPanel";
import DerivedStats from "../components/builder/DerivedStats";
import { calculateDerivedStats, SPECIAL_ATTRIBUTES, SPECIAL_TOTAL_POINTS, ORIGIN_PACKS } from "../lib/falloutData";
import { buildStartingEquipment, resolveEquipmentChoice } from "../lib/startingEquipment";
import EquipmentChoices from "../components/builder/EquipmentChoices";
import { Save, ChevronLeft, ChevronRight, User, Dumbbell, BookOpen, Star } from "lucide-react";
import { toast } from "sonner";

const STEPS = [
  { id: "details", label: "Details", icon: User },
  { id: "special", label: "S.P.E.C.I.A.L.", icon: Dumbbell },
  { id: "skills", label: "Skills", icon: BookOpen },
  { id: "perks", label: "Perks", icon: Star },
];

export default function CharacterBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const [activeTab, setActiveTab] = useState("details");
  const [saving, setSaving] = useState(false);

  const [character, setCharacter] = useState({
    name: "", origin: "Wastelander", level: 1,
    strength: 5, perception: 5, endurance: 5, charisma: 5, intelligence: 5, agility: 5, luck: 5,
    background: "",
  });
  const [skills, setSkills] = useState({});
  const [tagSkills, setTagSkills] = useState([]);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [ncrTraits, setNcrTraits] = useState([]);
  const [tribalTraits, setTribalTraits] = useState([]);
  const [outcastTagSkill, setOutcastTagSkill] = useState('');
  const [brotherhoodTagSkill, setBrotherhoodTagSkill] = useState('');
  const [vaultTagSkill, setVaultTagSkill] = useState('');
  const [vaultExperiment, setVaultExperiment] = useState('');
  const [ghoulVaultDweller, setGhoulVaultDweller] = useState(false);
  const [survivorTraits, setSurvivorTraits] = useState([]);
  const [mrHandyArms, setMrHandyArms] = useState([]);

  // Keep survivor_traits synced on character so getActiveTraitEffects works during creation
  const handleSurvivorTraitsChange = (updated) => {
    setSurvivorTraits(updated);
    setCharacter(prev => ({ ...prev, survivor_traits: JSON.stringify(updated) }));
  };

  useEffect(() => {
    if (editId) {
      base44.entities.Character.filter({ id: editId }).then(chars => {
        if (chars.length > 0) {
          const c = chars[0];
          setCharacter(c);
          if (c.skills) { try { setSkills(JSON.parse(c.skills)); } catch {} }
          if (c.tag_skills) { try { setTagSkills(JSON.parse(c.tag_skills)); } catch {} }
          if (c.perks) { try { setSelectedPerks(JSON.parse(c.perks)); } catch {} }
          if (c.ncr_traits) { try { setNcrTraits(JSON.parse(c.ncr_traits)); } catch {} }
          if (c.tribal_traits) { try { setTribalTraits(JSON.parse(c.tribal_traits)); } catch {} }
          if (c.outcast_tag_skill) setOutcastTagSkill(c.outcast_tag_skill);
          if (c.brotherhood_tag_skill) setBrotherhoodTagSkill(c.brotherhood_tag_skill);
          if (c.vault_tag_skill) setVaultTagSkill(c.vault_tag_skill);
          if (c.vault_experiment) setVaultExperiment(c.vault_experiment);
          if (c.ghoul_vault_dweller) setGhoulVaultDweller(c.ghoul_vault_dweller);
          if (c.survivor_traits) { try { setSurvivorTraits(JSON.parse(c.survivor_traits)); } catch {} }
          if (c.mr_handy_arms) { try { setMrHandyArms(JSON.parse(c.mr_handy_arms)); } catch {} }
        }
      });
    }
  }, [editId]);

  const updateCharacter = (updates) => {
    setCharacter(prev => {
      const next = { ...prev, ...updates };
      // When sub_origin changes, auto-apply starting equipment
      if (updates.sub_origin && updates.sub_origin !== prev.sub_origin) {
        const result = buildStartingEquipment(next, updates.sub_origin, tagSkills);
        if (result) return { ...next, ...result.updates };
      }
      return next;
    });
  };

  const handleResolveChoice = (choiceKey, chosenValue) => {
    const updates = resolveEquipmentChoice(character, choiceKey, chosenValue);
    if (updates) setCharacter(prev => ({ ...prev, ...updates }));
  };
  const currentStepIndex = STEPS.findIndex(s => s.id === activeTab);
  const goNext = () => { if (currentStepIndex < STEPS.length - 1) setActiveTab(STEPS[currentStepIndex + 1].id); };
  const goPrev = () => { if (currentStepIndex > 0) setActiveTab(STEPS[currentStepIndex - 1].id); };

  const handleSave = async () => {
    if (!character.name.trim()) { toast.error("Please enter a character name"); setActiveTab("details"); return; }
    const specialTotal = SPECIAL_ATTRIBUTES.reduce((sum, attr) => sum + (character[attr.key] || 5), 0);
    if (specialTotal > SPECIAL_TOTAL_POINTS) { toast.error("Too many S.P.E.C.I.A.L. points allocated"); setActiveTab("special"); return; }

    setSaving(true);
    try {
      const fullChar = { ...character, survivor_traits: JSON.stringify(survivorTraits) };
      const derived = calculateDerivedStats(fullChar);
      const charData = {
        ...character,
        skills: JSON.stringify(skills),
        tag_skills: JSON.stringify(tagSkills),
        perks: JSON.stringify(selectedPerks),
        ncr_traits: JSON.stringify(ncrTraits),
        tribal_traits: JSON.stringify(tribalTraits),
        outcast_tag_skill: outcastTagSkill,
        brotherhood_tag_skill: brotherhoodTagSkill,
        vault_tag_skill: vaultTagSkill,
        vault_experiment: vaultExperiment,
        ghoul_vault_dweller: ghoulVaultDweller,
        survivor_traits: JSON.stringify(survivorTraits),
        mr_handy_arms: JSON.stringify(mrHandyArms),
        sub_origin: character.sub_origin || '',
        gifted_bonuses: character.gifted_bonuses || '[]',
        pending_equipment_choices: character.pending_equipment_choices || '[]',
        miscellany: character.miscellany || '[]',
        equipment: character.equipment || '[]',
        ammo_inventory: character.ammo_inventory || '[]',
        armor_equipped: character.armor_equipped || '[]',
        chems_inventory: character.chems_inventory || '[]',
        food_inventory: character.food_inventory || '[]',
        robot_mods: character.robot_mods || '[]',
        caps: character.caps || 0,
        hp_current: derived.hp, hp_max: derived.hp,
        defense: derived.defense, initiative: derived.initiative,
        melee_bonus: derived.melee_bonus, carry_weight: derived.carry_weight,
        luck_points: derived.luck_points,
      };

      if (editId) {
        await base44.entities.Character.update(editId, charData);
        toast.success("Character updated!");
        navigate(`/character/${editId}`);
      } else {
        const created = await base44.entities.Character.create(charData);
        toast.success("Character saved to vault records!");
        navigate(`/character/${created.id}`);
      }
    } catch {
      toast.error("Failed to save character. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
            {editId ? 'Edit Character' : 'Create Character'}
          </h2>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            Step {currentStepIndex + 1} of {STEPS.length}: {STEPS[currentStepIndex].label}
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-muted border border-border w-full justify-start gap-0 h-auto p-1 mb-6">
              {STEPS.map(({ id, label, icon: Icon }) => (
                <TabsTrigger key={id} value={id} className="font-mono text-xs data-[state=active]:bg-primary/15 data-[state=active]:text-primary px-3 py-2 gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="details" className="mt-0">
              <DetailsPanel character={character} onChange={updateCharacter}
                ncrTraits={ncrTraits} onNcrTraitsChange={setNcrTraits}
                tribalTraits={tribalTraits} onTribalTraitsChange={setTribalTraits}
                outcastTagSkill={outcastTagSkill} onOutcastTagSkillChange={setOutcastTagSkill}
                brotherhoodTagSkill={brotherhoodTagSkill} onBrotherhoodTagSkillChange={setBrotherhoodTagSkill}
                vaultTagSkill={vaultTagSkill} onVaultTagSkillChange={setVaultTagSkill}
                vaultExperiment={vaultExperiment} onVaultExperimentChange={setVaultExperiment}
                ghoulVaultDweller={ghoulVaultDweller} onGhoulVaultDwellerChange={setGhoulVaultDweller}
                survivorTraits={survivorTraits} onSurvivorTraitsChange={handleSurvivorTraitsChange}
                mrHandyArms={mrHandyArms} onMrHandyArmsChange={setMrHandyArms}
              />
              <EquipmentChoices character={character} onResolve={handleResolveChoice} />
            </TabsContent>
            <TabsContent value="special" className="mt-0">
              <SpecialStats character={character} onChange={updateCharacter} />
            </TabsContent>
            <TabsContent value="skills" className="mt-0">
              <SkillsPanel character={character} skills={skills} tagSkills={tagSkills} onSkillsChange={setSkills} onTagSkillsChange={setTagSkills} ncrTraits={ncrTraits} outcastTagSkill={outcastTagSkill} />
            </TabsContent>
            <TabsContent value="perks" className="mt-0">
              <PerksPanel character={character} selectedPerks={selectedPerks} onPerksChange={setSelectedPerks} />
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <Button variant="ghost" onClick={goPrev} disabled={currentStepIndex === 0} className="font-mono text-sm gap-1.5">
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            {currentStepIndex < STEPS.length - 1 ? (
              <Button onClick={goNext} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-mono text-sm gap-1.5">
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold gap-2">
                <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Character"}
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <DerivedStats character={character} />
          <div className="border border-border rounded-lg bg-card p-4">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Character Preview</h3>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] font-mono text-muted-foreground">NAME</p>
                <p className="font-heading font-semibold text-foreground">{character.name || "Unnamed"}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-muted-foreground">ORIGIN</p>
                <p className="font-heading text-sm text-secondary">{character.origin}</p>
              </div>
              {tagSkills.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground">TAG SKILLS</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tagSkills.map(s => (
                      <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/15 text-primary">{s.replace(/_/g, ' ')}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedPerks.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground">PERKS</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedPerks.map(p => (
                      <span key={p} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary/20 text-secondary">{p.replace(/_/g, ' ')}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}