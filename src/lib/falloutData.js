// Fallout 2d20 Game Data

export const SPECIAL_ATTRIBUTES = [
  { key: 'strength', label: 'Strength', abbr: 'STR', description: 'Physical power and raw force' },
  { key: 'perception', label: 'Perception', abbr: 'PER', description: 'Awareness and sensory acuity' },
  { key: 'endurance', label: 'Endurance', abbr: 'END', description: 'Stamina, resilience, and overall health' },
  { key: 'charisma', label: 'Charisma', abbr: 'CHA', description: 'Force of personality and ability to lead' },
  { key: 'intelligence', label: 'Intelligence', abbr: 'INT', description: 'Mental acuity and ability to learn' },
  { key: 'agility', label: 'Agility', abbr: 'AGI', description: 'Speed, reflexes, and coordination' },
  { key: 'luck', label: 'Luck', abbr: 'LCK', description: 'Fortune and the ability to defy odds' },
];

export const SPECIAL_TOTAL_POINTS = 40; // 5 base per stat = 35, plus 5 extra to distribute
export const SPECIAL_MIN = 4;
export const SPECIAL_MAX = 10;

export const SKILLS = [
  { key: 'athletics', label: 'Athletics', attribute: 'strength' },
  { key: 'big_guns', label: 'Big Guns', attribute: 'endurance' },
  { key: 'energy_weapons', label: 'Energy Weapons', attribute: 'perception' },
  { key: 'explosives', label: 'Explosives', attribute: 'perception' },
  { key: 'lockpick', label: 'Lockpick', attribute: 'perception' },
  { key: 'medicine', label: 'Medicine', attribute: 'intelligence' },
  { key: 'melee_weapons', label: 'Melee Weapons', attribute: 'strength' },
  { key: 'pilot', label: 'Pilot', attribute: 'perception' },
  { key: 'repair', label: 'Repair', attribute: 'intelligence' },
  { key: 'science', label: 'Science', attribute: 'intelligence' },
  { key: 'small_guns', label: 'Small Guns', attribute: 'agility' },
  { key: 'sneak', label: 'Sneak', attribute: 'agility' },
  { key: 'speech', label: 'Speech', attribute: 'charisma' },
  { key: 'survival', label: 'Survival', attribute: 'endurance' },
  { key: 'throwing', label: 'Throwing', attribute: 'agility' },
  { key: 'unarmed', label: 'Unarmed', attribute: 'strength' },
  { key: 'barter', label: 'Barter', attribute: 'charisma' },
];

export const SKILL_POINTS_INITIAL = 9; // 9 + tag skill bonuses
export const TAG_SKILL_COUNT = 3;

export const ORIGINS = [
  {
    key: 'vault_dweller',
    label: 'Vault Dweller',
    description: 'Raised in the safety of a Vault-Tec vault, you emerged into the wasteland with education but little practical experience.',
    bonuses: { intelligence: 1 },
    bonusSkills: ['science', 'repair'],
  },
  {
    key: 'brotherhood_outcast',
    label: 'Brotherhood Outcast',
    description: 'A former member of the Brotherhood of Steel who left or was expelled. You know technology and warfare.',
    bonuses: { endurance: 1 },
    bonusSkills: ['energy_weapons', 'big_guns'],
  },
  {
    key: 'ghoul',
    label: 'Ghoul',
    description: 'Irradiated and transformed, you have lived for centuries. Radiation heals you but you are shunned by many.',
    bonuses: { endurance: 1 },
    bonusSkills: ['survival', 'medicine'],
    special: 'Radiation heals instead of harms. -2 CHA with non-ghouls.',
  },
  {
    key: 'super_mutant',
    label: 'Super Mutant',
    description: 'Transformed by FEV, you are immensely strong but intellectually diminished. Few trust your kind.',
    bonuses: { strength: 2 },
    penalties: { intelligence: -1, charisma: -1 },
    bonusSkills: ['melee_weapons', 'unarmed'],
    special: '+2 Physical DR. Cannot wear normal armor.',
  },
  {
    key: 'wastelander',
    label: 'Wastelander',
    description: 'Born and raised in the wasteland, you know how to survive by any means necessary.',
    bonuses: { luck: 1 },
    bonusSkills: ['survival', 'small_guns'],
  },
  {
    key: 'mister_handy',
    label: 'Mister Handy',
    description: 'A General Atomics robot still running after the bombs fell. Loyal, versatile, and slightly eccentric.',
    bonuses: { intelligence: 1 },
    bonusSkills: ['repair', 'science'],
    special: 'Robot: Does not eat, drink, or breathe. Immune to radiation and poison. Repaired, not healed.',
  },
  {
    key: 'survivor',
    label: 'Survivor',
    description: 'A pre-war human who survived cryogenic freezing or another preservation method. The world is new and terrifying.',
    bonuses: { charisma: 1 },
    bonusSkills: ['speech', 'barter'],
  },
];

export const PERKS = [
  // Level 1 Perks
  { key: 'toughness', label: 'Toughness', description: '+2 to max HP.', requirement: { level: 1, endurance: 5 }, rank: 1, maxRanks: 3 },
  { key: 'quick_hands', label: 'Quick Hands', description: 'Draw or holster a weapon as a free action.', requirement: { level: 1, agility: 6 }, rank: 1, maxRanks: 1 },
  { key: 'awareness', label: 'Awareness', description: 'You can spend 1 AP to learn a target\'s DT and HP.', requirement: { level: 1, perception: 6 }, rank: 1, maxRanks: 1 },
  { key: 'educated', label: 'Educated', description: '+2 skill points when you level up.', requirement: { level: 1, intelligence: 6 }, rank: 1, maxRanks: 1 },
  { key: 'fortune_finder', label: 'Fortune Finder', description: 'Find more caps in containers.', requirement: { level: 1, luck: 6 }, rank: 1, maxRanks: 1 },
  { key: 'strong_back', label: 'Strong Back', description: '+50 carry weight.', requirement: { level: 1, strength: 6 }, rank: 1, maxRanks: 3 },
  { key: 'smooth_talker', label: 'Smooth Talker', description: 'Re-roll 1d20 on Speech tests.', requirement: { level: 1, charisma: 6 }, rank: 1, maxRanks: 1 },
  { key: 'lead_belly', label: 'Lead Belly', description: 'Take less radiation from food and drink.', requirement: { level: 1, endurance: 5 }, rank: 1, maxRanks: 1 },
  { key: 'gunslinger', label: 'Gunslinger', description: '+1 damage with one-handed ranged weapons.', requirement: { level: 1, agility: 6 }, rank: 1, maxRanks: 3 },
  { key: 'iron_fist', label: 'Iron Fist', description: '+1 damage with unarmed attacks.', requirement: { level: 1, strength: 6 }, rank: 1, maxRanks: 3 },
  // Level 3+ Perks
  { key: 'sniper', label: 'Sniper', description: 'Reduce range difficulty by 1 step.', requirement: { level: 3, perception: 7 }, rank: 1, maxRanks: 1 },
  { key: 'medic', label: 'Medic', description: 'Heal +2 HP when using stimpaks.', requirement: { level: 3, intelligence: 7 }, rank: 1, maxRanks: 3 },
  { key: 'demolition_expert', label: 'Demolition Expert', description: '+2 damage with explosives.', requirement: { level: 3, perception: 6 }, rank: 1, maxRanks: 3 },
  { key: 'commando', label: 'Commando', description: '+1 damage with two-handed ranged weapons.', requirement: { level: 3, agility: 7 }, rank: 1, maxRanks: 3 },
  { key: 'ninja', label: 'Ninja', description: 'Sneak attacks deal +1 damage per CD.', requirement: { level: 3, agility: 7 }, rank: 1, maxRanks: 1 },
  { key: 'cannibal', label: 'Cannibal', description: 'Eating corpses heals HP.', requirement: { level: 3, endurance: 6 }, rank: 1, maxRanks: 1 },
  // Level 5+ Perks
  { key: 'action_hero', label: 'Action Hero', description: '+1 max AP.', requirement: { level: 5, agility: 8 }, rank: 1, maxRanks: 2 },
  { key: 'cyborg', label: 'Cyborg', description: '+1 to DT, +1 to Energy Resistance.', requirement: { level: 5, intelligence: 8 }, rank: 1, maxRanks: 1 },
  { key: 'life_giver', label: 'Life Giver', description: '+5 max HP.', requirement: { level: 5, endurance: 8 }, rank: 1, maxRanks: 2 },
  { key: 'mysterious_stranger', label: 'Mysterious Stranger', description: 'A chance for an ally to appear in combat to help.', requirement: { level: 5, luck: 8 }, rank: 1, maxRanks: 1 },
  { key: 'concentrated_fire', label: 'Concentrated Fire', description: 'Each consecutive attack on same target gains +1d20.', requirement: { level: 5, perception: 8 }, rank: 1, maxRanks: 1 },
  { key: 'bloody_mess', label: 'Bloody Mess', description: '+1 damage on all attacks.', requirement: { level: 5, luck: 7 }, rank: 1, maxRanks: 1 },
];

export function calculateDerivedStats(character) {
  const str = character.strength || 5;
  const end = character.endurance || 5;
  const agi = character.agility || 5;
  const lck = character.luck || 5;
  const per = character.perception || 5;

  return {
    hp: end + lck, // Base HP formula
    initiative: per + agi,
    defense: 1, // Base defense
    melee_bonus: Math.max(0, Math.floor((str - 5) / 2)),
    carry_weight: str * 10 + 150,
    luck_points: lck,
    action_points: 2, // Base AP
  };
}