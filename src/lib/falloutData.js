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
  // Settlers supplement
  {
    key: 'commonwealth_minuteman',
    label: 'Commonwealth Minuteman',
    description: 'A defender of the Commonwealth who protects settlements at a moment\'s notice. Veterans of countless engagements against raiders, super mutants, and worse.',
    bonusSkills: ['energy_weapons', 'small_guns'],
    special: '+1 DR while in cover. +1 CD damage when outnumbered with companions. Trade caravans arrive every 5 days instead of 7. Established settlements start with base Defense 4.',
    source: 'Settlers',
  },
  {
    key: 'new_california_republic',
    label: 'New California Republic',
    description: 'A citizen of the NCR, the largest democratic nation in the post-war west. You carry the values of civilization — democracy, liberty, and rule of law — into the wasteland.',
    bonusSkills: ['speech', 'barter'],
    special: 'Choose two traits from the NCR trait list (Good Natured, Grunt, Home on the Range, Trigger Discipline, or Brahmin Baron), or two Survivor traits, or one from either list plus one extra perk.',
    source: 'Settlers',
  },
  {
    key: 'protectron',
    label: 'Protectron',
    description: 'An inexpensive RobCo work drone built for construction, security, or administrative tasks. Centuries of wasteland survival have given you purpose beyond your original programming.',
    bonusSkills: ['repair', 'science'],
    special: 'Immune to disease, radiation, and poison. Cannot use chems, food, drink, or rest. Must receive repairs to heal. Carry weight 225 lbs. Built-in weapons vary by model. First AP spent on skill tests related to your model\'s purpose costs 0.',
    source: 'Settlers',
  },
  {
    key: 'robobrain',
    label: 'Robobrain',
    description: 'A cybernetic amalgamation of human brain and robotic body. You have no memory of your former life but have developed a sense of self.',
    bonusSkills: ['science', 'medicine'],
    special: 'Visual sensors ignore darkness penalties on Perception tests. Immune to radiation and poison. Cannot use chems, food, drink, or rest. Must receive repairs to heal. Carry weight 150 lbs. Built-in mesmetron for ranged attacks.',
    source: 'Settlers',
  },
  {
    key: 'securitron',
    label: 'Securitron',
    description: 'A PDQ-88b Securitron built by RobCo Industries to protect the New Vegas Strip. Powerful, versatile, and loyal — though your allegiances may have shifted.',
    bonusSkills: ['small_guns', 'energy_weapons'],
    special: 'Immune to radiation and poison. Cannot use chems, food, drink, or rest. Must receive repairs to heal. Single tire movement increases difficulty of balance tests by 1. Carry weight 150 lbs. Integrated concealed weapons in arms.',
    source: 'Settlers',
  },
  {
    key: 'generation_3_synth',
    label: 'Generation 3 Synth',
    description: 'A bio-synthetic humanoid created by the Institute, virtually indistinguishable from humans. Your engineered body makes you something entirely new.',
    bonusSkills: ['speech', 'science'],
    special: 'Gain one additional tag skill. Cannot suffer starvation or dehydration. Does not need sleep. Immune to Poison, Radiation, and disease. When NPCs know you are a synth, CHA test difficulty increases by +2. Has a recall code that incapacitates you if spoken.',
    source: 'Settlers',
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
  // Settlers supplement
  { key: 'all_night_long', label: 'All Night Long', description: 'During nighttime hours your hunger and thirst states do not reduce. Every two days starving you gain 1 Fatigue instead of every day.', requirement: { level: 16 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'ammosmith', label: 'Ammosmith', description: 'Craft ammo at a weapons workbench. Rank 1: up to rarity 1. Rank 2: up to rarity 3, can dismantle ammo. Rank 3: up to rarity 5, roll CD equal to 6 minus rarity for bonus ammo.', requirement: { level: 2, intelligence: 7 }, rank: 1, maxRanks: 3, source: 'Settlers' },
  { key: 'bodyguards', label: 'Bodyguards', description: 'Each player character and companion (other than you) within Close range increases your Damage Resistance and Energy Resistance by +1.', requirement: { level: 5, charisma: 8 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'community_organizer', label: 'Community Organizer', description: 'Your community gains +1 Food and +1 Defense per day per rank. +1 CD on Hunting, Gathering, and Scavenging settlement actions.', requirement: { level: 1, charisma: 5, endurance: 5 }, rank: 1, maxRanks: 3, source: 'Settlers' },
  { key: 'contractor', label: 'Contractor', description: 'Rank 1: Reduce settlement construction materials by half. Rank 2: Allow unskilled settlers to construct. Rank 3: Allow settlers without required perk to construct.', requirement: { level: 2, charisma: 5, intelligence: 5 }, rank: 1, maxRanks: 3, source: 'Settlers' },
  { key: 'covert_operator', label: 'Covert Operator', description: 'When you make a ranged sneak attack with a small gun or energy weapon, damage is increased by +2 CD. Cannot benefit while in Power Armor.', requirement: { level: 1, agility: 8 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'enforcer', label: 'Enforcer', description: 'When you make a ranged attack with a shotgun and target a specific location, your attack gains the Debilitating quality.', requirement: { level: 12, agility: 9 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'green_thumb', label: 'Green Thumb', description: 'When foraging, you gather 2 items plus an additional 2 for every AP spent.', requirement: { level: 4, perception: 4 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'gun_runner', label: 'Gun Runner', description: 'When you take the Sprint action with a one-handed ranged weapon in hand, you may spend 1 AP to move one additional zone.', requirement: { level: 4, agility: 6 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'happy_camper', label: 'Happy Camper', description: 'Rank 1: Hunger does not deteriorate at a camp with heat. Rank 2: Thirst does not deteriorate at a camp with heat.', requirement: { level: 3, charisma: 7, endurance: 6 }, rank: 1, maxRanks: 2, source: 'Settlers' },
  { key: 'hired_help', label: 'Hired Help', description: 'You gain the ability to recruit a humanoid companion who follows your commands.', requirement: { level: 1, charisma: 7 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'home_defense', label: 'Home Defense', description: 'Rank 1: Craft traps (complexity 2). Rank 2: Failed tests create a complication instead of misfiring on you.', requirement: { level: 5, intelligence: 6 }, rank: 1, maxRanks: 2, source: 'Settlers' },
  { key: 'homebody', label: 'Homebody', description: 'Rank 1: Spend 1 hour in settlement to roll END CD and regain that much HP. Rank 2: Regain +1 HP per Effect; injury recovery difficulty capped at 2.', requirement: { level: 5, endurance: 6 }, rank: 1, maxRanks: 2, source: 'Settlers' },
  { key: 'local_leader', label: 'Local Leader', description: 'Rank 1: Establish supply lines between settlements you are Friendly with. Rank 2: Request construction of stores and crafting tables.', requirement: { level: 2, charisma: 6 }, rank: 1, maxRanks: 2, source: 'Settlers' },
  { key: 'lock_and_load', label: 'Lock and Load', description: 'When you attack with a big gun with fire rate greater than 0, its fire rate increases by 1 per rank.', requirement: { level: 2, strength: 7 }, rank: 1, maxRanks: 3, source: 'Settlers' },
  { key: 'mechanical_menace', label: 'Mechanical Menace', description: 'Whenever a robot NPC would attack you, roll 1 CD — on any non-Effect result, it chooses not to attack you. Re-roll 1d20 on CHA tests to influence robots.', requirement: { level: 1, charisma: 6, intelligence: 5 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'class_freak', label: 'Class Freak', description: 'Whenever a mutated human NPC would attack you, roll 1 CD — on any non-Effect result, it chooses not to attack you. Re-roll 1d20 on CHA tests to influence mutated humans.', requirement: { level: 1, charisma: 6, intelligence: 5 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'nocturnal_fortitude', label: 'Nocturnal Fortitude', description: 'At night, your maximum HP increases by your END and you gain that much current HP. When the effect ends, max HP returns to normal but current HP stays unless over maximum.', requirement: { level: 12, endurance: 6 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'pannapictagraphist', label: 'Pannapictagraphist', description: 'Whenever you randomly obtain a duplicate magazine you have already found, you may re-roll the result.', requirement: { level: 1, luck: 5 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'pharmacist', label: 'Pharmacist', description: 'RadAway you administer heals additional Radiation damage. Rank 1: +2. Rank 2: +3. Rank 3: +4.', requirement: { level: 2, intelligence: 8 }, rank: 1, maxRanks: 3, source: 'Settlers' },
  { key: 'photosynthetic', label: 'Photosynthetic', description: 'When in direct sunlight you regenerate 1 HP every hour. Rank 2: 2 HP every hour.', requirement: { level: 5, endurance: 7 }, rank: 1, maxRanks: 2, source: 'Settlers' },
  { key: 'quack_surgeon', label: 'Quack Surgeon', description: 'When performing First Aid on an ally, use an alcoholic beverage as part of the action. The patient heals additional HP equal to the beverage\'s normal heal value and heals 2 HP per AP spent.', requirement: { level: 12, charisma: 7 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'rejuvenated', label: 'Rejuvenated', description: 'When full: +2 max HP, re-roll 1d20 on STR tests, full state lasts twice as long. When quenched: re-roll 1d20 on END tests, generate 1 free AP at combat turn start, quenched lasts twice as long.', requirement: { level: 12, endurance: 7 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'retribution', label: 'Retribution', description: 'If you take no damage from an attack due to your Damage Reduction, recover +1 HP and add 1 AP to the group pool. Triggers once per round per rank.', requirement: { level: 2, endurance: 8, luck: 8 }, rank: 1, maxRanks: 3, source: 'Settlers' },
  { key: 'robot_wrangler', label: 'Robot Wrangler', description: 'You gain a robot companion that follows your commands. Robots cannot heal without repairs and do not require food/beverages.', requirement: { level: 1, intelligence: 5 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'squad_maneuvers', label: 'Squad Maneuvers', description: 'Rank 1: Maintain hurried travel pace for one extra hour or two extra hours (2 AP). Rank 2: Spend 1 AP when you move to bring an ally to within reach by spending another 1 AP.', requirement: { level: 1, charisma: 7 }, rank: 1, maxRanks: 2, source: 'Settlers' },
  { key: 'super_duper', label: 'Super Duper', description: 'When crafting, roll 1 CD per rank. On any Effect result, regain half the components spent (rounded down per rarity).', requirement: { level: 3, luck: 6 }, rank: 1, maxRanks: 3, source: 'Settlers' },
  { key: 'taking_one_for_the_team', label: 'Taking One for the Team', description: 'Rank 1: When a creature NPC would damage an ally in your zone, roll 1 CD — on non-Effect you take the damage instead. Rank 2: Add 1 AP to pool. Rank 3: You and ally may re-roll 1d20 on next attack against that target.', requirement: { level: 1, endurance: 7, charisma: 6 }, rank: 1, maxRanks: 3, source: 'Settlers' },
  { key: 'tinkerer', label: 'Tinkerer', description: 'Reduce difficulty of repairing a robot via first aid to the number of injuries it has sustained. Tinker for 1 hour to increase robot max HP by +2 for 24 hours.', requirement: { level: 1, endurance: 5, intelligence: 5 }, rank: 1, maxRanks: 1, source: 'Settlers' },
  { key: 'true_friends', label: 'True Friends', description: 'Rank 1: Roll CD equal to current reputation when it would decrease — on at least one Effect, it does not decrease. Rank 2: CHA+Speech difficulty 3 to increase affinity by 2 instead of 1.', requirement: { level: 1, perception: 6, charisma: 6 }, rank: 1, maxRanks: 2, source: 'Settlers' },
];

export const NCR_TRAITS = [
  {
    key: 'good_natured',
    label: 'Good Natured',
    benefit: 'Tag two additional skills from: Speech, Medicine, Repair, Science, or Barter.',
    penalty: 'The maximum rank for all other skills not listed above is reduced from 6 to 4.',
  },
  {
    key: 'grunt',
    label: 'Grunt',
    benefit: '+1 CD damage with submachine guns, combat rifles, assault rifles, frag grenades, and combat knives.',
    penalty: 'Complication range of tests when attacking with big guns or energy weapons is increased by 2.',
  },
  {
    key: 'home_on_the_range',
    label: 'Home on the Range',
    benefit: 'When sleeping by a campfire for at least 6 hours, difficulty to recover from injuries through rest is decreased by 1.',
    penalty: 'You cannot gain the Well Rested bonus.',
  },
  {
    key: 'trigger_discipline',
    label: 'Trigger Discipline',
    benefit: 'When making ranged attacks using small guns or energy weapons you may re-roll 1d20.',
    penalty: 'While wielding small guns and energy weapons, reduce their fire rate by 1.',
  },
  {
    key: 'brahmin_baron',
    label: 'Brahmin Baron',
    benefit: 'Each Brahmin Feed Trough provides upkeep for 3 Brahmin. When performing Tend Crops, gain an additional +1 CD Brahmin milk per feed trough.',
    penalty: "Roll +1d20 when determining risk of attack to your settlement if its Food resource exceeds the settlement's People.",
  },
];

// NCR Survivor traits use the same list — Survivor origin characters may also pick from NCR_TRAITS.
export const NCR_SURVIVOR_TRAITS = NCR_TRAITS;

export function calculateDerivedStats(character) {
  const str = character.strength || 5;
  const end = character.endurance || 5;
  const agi = character.agility || 5;
  const lck = character.luck || 5;
  const per = character.perception || 5;

  return {
    hp: end + lck,
    initiative: per + agi,
    defense: 1,
    melee_bonus: Math.max(0, Math.floor((str - 5) / 2)),
    carry_weight: str * 10 + 150,
    luck_points: lck,
    action_points: 2,
  };
}

export function calculateBodyPartHP(character) {
  const end = character.endurance || 5;
  return {
    head:      { max: 2,       label: 'Head',      range: '1-2'   },
    torso:     { max: end + 2, label: 'Torso',     range: '3-8'   },
    left_arm:  { max: end,     label: 'Left Arm',  range: '9-11'  },
    right_arm: { max: end,     label: 'Right Arm', range: '12-14' },
    left_leg:  { max: end + 1, label: 'Left Leg',  range: '15-17' },
    right_leg: { max: end + 1, label: 'Right Leg', range: '18-20' },
  };
}

export const XP_TABLE = [
  0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700,
  3250, 3850, 4500, 5200, 5950, 6750, 7600, 8500, 9450, 10450,
  11500, 12600, 13750, 14950, 16200, 17500, 18850, 20250, 21700, 23200,
  24750, 26350, 28000, 29700, 31450, 33250, 35100, 37000, 38950, 40950,
  43000, 45100, 47250, 49450, 51700, 54000, 56350, 58750, 61200, 63700,
];

export function getNextLevelXP(level) {
  return XP_TABLE[Math.min(level, XP_TABLE.length - 1)] || 0;
}