import { SKILLS, TAG_SKILL_COUNT, SPECIAL_ATTRIBUTES } from "../../lib/falloutData";
import { Minus, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SkillsPanel({ character, skills, tagSkills, onSkillsChange, onTagSkillsChange }) {
  const totalSkillPoints = 9 + (character.intelligence || 5);
  const usedPoints = Object.values(skills).reduce((sum, v) => sum + v, 0);
  const remaining = totalSkillPoints - usedPoints;
  const tagCount = tagSkills.length;

  const handleSkillChange = (key, delta) => {
    const current = skills[key] || 0;
    const newVal = current + delta;
    if (newVal < 0 || newVal > 6) return;
    if (delta > 0 && remaining <= 0) return;
    onSkillsChange({ ...skills, [key]: newVal });
  };

  const toggleTagSkill = (key) => {
    if (tagSkills.includes(key)) {
      onTagSkillsChange(tagSkills.filter(s => s !== key));
    } else if (tagCount < TAG_SKILL_COUNT) {
      onTagSkillsChange([...tagSkills, key]);
    }
  };

  const getAttributeValue = (attrKey) => character[attrKey] || 5;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Skill Points</span>
            <span className={`font-heading font-bold text-lg ${remaining > 0 ? 'text-primary' : 'text-secondary'}`}>
              {remaining}
            </span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Tag Skills</span>
            <span className={`font-heading font-bold text-lg ${tagCount < TAG_SKILL_COUNT ? 'text-primary' : 'text-secondary'}`}>
              {tagCount}/{TAG_SKILL_COUNT}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground font-mono">
        Tag {TAG_SKILL_COUNT} skills for bonus expertise. Skill rank + attribute = target number for 2d20 tests.
      </p>

      {/* Skills Grid */}
      <div className="space-y-2">
        {SKILLS.map((skill) => {
          const value = skills[skill.key] || 0;
          const isTag = tagSkills.includes(skill.key);
          const attrAttr = SPECIAL_ATTRIBUTES.find(a => a.key === skill.attribute);
          const attrVal = getAttributeValue(skill.attribute);
          const targetNumber = value + attrVal + (isTag ? 2 : 0);

          return (
            <div
              key={skill.key}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                isTag
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card hover:border-border"
              }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <button
                  onClick={() => toggleTagSkill(skill.key)}
                  className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                    isTag
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
                  }`}
                  title={isTag ? "Remove tag" : "Set as tag skill"}
                >
                  <Tag className="w-3 h-3" />
                </button>
                <div className="min-w-0">
                  <span className="font-heading text-sm text-foreground block truncate">{skill.label}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {attrAttr?.abbr} {attrVal} + {value}{isTag ? " +2 tag" : ""} = <span className="text-secondary font-bold">{targetNumber}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 rounded hover:bg-destructive/20 hover:text-destructive"
                  onClick={() => handleSkillChange(skill.key, -1)}
                  disabled={value <= 0}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="font-heading font-bold text-sm w-6 text-center">{value}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 rounded hover:bg-primary/20 hover:text-primary"
                  onClick={() => handleSkillChange(skill.key, 1)}
                  disabled={value >= 6 || remaining <= 0}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}