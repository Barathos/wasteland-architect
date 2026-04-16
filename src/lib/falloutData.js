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
export const TAG_SKILL_BONUS = 2;
const GOOD_NATURED_EXEMPT_SKILLS = ['speech', 'medicine', 'repair', 'science', 'barter'];

export const ORIGINS = [
  {
    key: 'vault_dweller',
    label: 'Vault Dweller',
    description: 'Raised in the safety of a Vault-Tec vault, you emerged into the wasteland with education but little practical experience. You know the old world only from lessons, though your vault\'s experiment shaped you in ways you\'re still discovering.',
    bonuses: { intelligence: 1 },
    bonusSkills: ['science', 'repair'],
    traitName: 'Vault Kid',
    source: 'Core',
  },
  {
    key: 'brotherhood_initiate',
    label: 'Brotherhood Initiate',
    description: 'A member of the Brotherhood of Steel, bound by the Chain That Binds. You are trained in advanced technology and disciplined combat, but your loyalty to the order is absolute — or you risk expulsion and the loss of all you carry.',
    bonuses: { endurance: 1 },
    bonusSkills: ['energy_weapons', 'big_guns'],
    traitName: 'The Chain That Binds',
    source: 'Core',
  },
  {
    key: 'ghoul',
    label: 'Ghoul',
    description: 'Irradiated and transformed by centuries of radiation exposure, you are a walking relic of the pre-war world. Your body is necrotic but resilient — radiation heals rather than harms you — though many smoothskins fear or despise your kind.',
    bonuses: { endurance: 1 },
    bonusSkills: ['survival', 'medicine'],
    traitName: 'Necrotic Post-Human',
    source: 'Core',
  },
  {
    key: 'super_mutant',
    label: 'Super Mutant',
    description: 'Transformed by the Forced Evolutionary Virus, you stand over seven feet tall with incredible strength and resilience. Your intellect is diminished, your charisma limited, and you can only wear armor built for your kind — but few enemies can match your raw power.',
    bonuses: { strength: 2, endurance: 2 },
    penalties: { intelligence: -1, charisma: -1 },
    bonusSkills: ['melee_weapons', 'unarmed'],
    traitName: 'Forced Evolution',
    source: 'Core',
  },
  {
    key: 'mister_handy',
    label: 'Mister Handy',
    description: 'A General Atomics domestic robot still running after the bombs fell. Loyal, versatile, and slightly eccentric, your three arms handle everything from combat to cooking — though your precision depends entirely on what attachments you carry.',
    bonuses: { intelligence: 1 },
    bonusSkills: ['repair', 'science'],
    traitName: 'Mister Handy Robot',
    source: 'Core',
  },
  {
    key: 'survivor',
    label: 'Survivor',
    description: 'A pre-war human who survived cryogenic freezing or another preservation method. The world is alien and terrifying, but your old-world knowledge and adaptability give you an edge — if you can survive long enough to use it.',
    bonuses: { charisma: 1 },
    bonusSkills: ['speech', 'barter'],
    traitName: 'Choose Two Traits',
    source: 'Core',
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
  // Wanderers supplement
  {
    key: 'assaultron',
    label: 'Assaultron',
    description: 'A sleek RobCo combat android built for rapid close-quarters engagement. Your advanced chassis and integrated weapons make you a lethal force on the battlefield.',
    bonusSkills: ['unarmed', 'energy_weapons'],
    special: 'Robot: Immune to radiation, poison, disease. Cannot use chems, food, drink, or rest. Must receive repairs to heal. Built-in Claws (4CD), Head Laser (5CD Piercing Energy), and Self-Destruct. Carry weight 150 lbs.',
    source: 'Wanderers',
  },
  {
    key: 'brotherhood_outcast_wanderers',
    label: 'Brotherhood Outcast',
    description: 'Expelled or defected from the Brotherhood of Steel, you carry their training but not their loyalty. The Chain that Breaks — you forge your own path with their technology.',
    bonusSkills: ['energy_weapons', 'repair'],
    special: 'The Chain that Breaks: +1d20 junk at start. Spend 1 AP (up to 3×) for 1 Uncommon material per AP. One extra loot roll without spending AP. Gain one extra Tag skill from: Energy Weapons, Science, or Repair.',
    source: 'Wanderers',
  },
  {
    key: 'child_of_atom',
    label: 'Child of Atom',
    description: 'A devoted worshipper of the great Atom, you have learned to embrace radiation as a divine gift rather than a curse that destroys.',
    bonusSkills: ['survival', 'speech'],
    special: 'Rad Sponge: Extra perk at level 1. Base Radiation resistance: 1. Once per scene, intercept Radiation damage for a nearby ally. Gain Radiation Points (0–5) from rad damage for +2 CD melee bonus per point. Lose 1 point per sleep.',
    source: 'Wanderers',
  },
  {
    key: 'tribal',
    label: 'Tribal',
    description: 'Raised in an isolated tribe far from Old World influence, you have learned ancient wisdom and survival skills that technology cannot replicate.',
    bonusSkills: ['survival', 'unarmed'],
    special: 'Choose 2 traits from Tribal Traits or Survivor Traits (NCR list), or 1 trait + 1 extra perk slot.',
    source: 'Wanderers',
  },
];

export function getOriginSpecialAdjustment(originLabel = '') {
  const normalizedOriginLabel = originLabel === 'Nightkin' ? 'Super Mutant' : originLabel;
  const origin = ORIGINS.find((entry) => entry.label === normalizedOriginLabel);
  const bonuses = origin?.bonuses || {};
  const penalties = origin?.penalties || {};

  const adjustment = {
    strength: 0,
    perception: 0,
    endurance: 0,
    charisma: 0,
    intelligence: 0,
    agility: 0,
    luck: 0,
  };

  for (const [key, value] of Object.entries(bonuses)) {
    if (key in adjustment) adjustment[key] += Number(value || 0);
  }
  for (const [key, value] of Object.entries(penalties)) {
    if (key in adjustment) adjustment[key] += Number(value || 0);
  }

  return adjustment;
}

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

export const ROBOT_ORIGINS = ['Protectron', 'Robobrain', 'Securitron', 'Mister Handy', 'Assaultron'];
export function isRobotCharacter(character) {
  return ROBOT_ORIGINS.includes(character.origin);
}

export function isNightkinCharacter(character = {}) {
  const origin = String(character.origin || '');
  const subOrigin = String(character.sub_origin || '').toLowerCase();
  if (origin === 'Nightkin') return true; // legacy records
  return origin === 'Super Mutant' && subOrigin === 'nightkin';
}

export function getSkillRankCapForCharacter(character = {}, skillKey = '') {
  if (isNightkinCharacter(character) || character.origin === 'Super Mutant') return 4;
  const traits = getActiveTraitEffects(character);
  if (traits.hasGoodNatured && !GOOD_NATURED_EXEMPT_SKILLS.includes(skillKey)) return 4;
  return 6;
}

export function getEffectiveSkillRank(baseRank = 0, isTag = false, cap = 6) {
  const rank = Number(baseRank || 0) + (isTag ? TAG_SKILL_BONUS : 0);
  return Math.min(cap, Math.max(0, rank));
}

const ROBOT_CARRY_WEIGHTS = { Protectron: 225, Robobrain: 150, Securitron: 150, 'Mister Handy': 150 };
export function getRobotCarryWeight(character) {
  return ROBOT_CARRY_WEIGHTS[character.origin] ?? 150;
}

export const FACTIONS = [
  {
    key: 'brotherhood_of_steel',
    label: 'Brotherhood of Steel',
    description: 'Dedicated to rebuilding civilization through military tactics and technocracy.',
    positiveInfluences: [
      'Completing a quest for the Brotherhood',
      'Acquiring pre-War technology and turning it over',
      'Killing mutated creatures',
      'Killing synths',
    ],
    negativeInfluences: [
      'Failing to achieve a Brotherhood goal',
      'Disobeying or disrespecting authority figures',
      'Destroying pre-War technology',
      'Sharing technology with those that could abuse it',
      'Sparing the lives of mutants and synths',
    ],
    ranks: [
      { rank: 0, label: 'Hostile', effect: 'Attack on sight. Full offensive capabilities deployed. +3 difficulty on Speech tests.' },
      { rank: 1, label: 'Cautious', effect: 'May reject negotiation. Views your technology possession skeptically.' },
      { rank: 2, label: 'Neutral', effect: 'Indifferent. You have yet to prove yourself in any meaningful way.' },
      { rank: 3, label: 'Friendly', effect: 'Will listen and may negotiate for their own gain. May offer information.' },
      { rank: 4, label: 'Trusting', effect: 'May provide supplies, armor, or weapons. May offer membership.' },
      { rank: 5, label: 'Allied', effect: 'Full access to weapons and technology. Brotherhood members will die for you.' },
    ],
  },
  {
    key: 'children_of_atom',
    label: 'Children of Atom',
    description: 'A religious organization worshipping Atom, revering radiation as a divine blessing.',
    positiveInfluences: [
      'Completing a quest for the church',
      'Pursuing Division by radioactive means',
      'Receiving a Revelation by way of vision or message',
      'Defending the church from enemies',
      'Providing charity to the church',
    ],
    negativeInfluences: [
      'Purging radiation or disposing of radioactive devices',
      'Healing radiation poisoning from others',
      'Exhibiting materialistic or greedy behavior',
      'Refusing to follow commandments from a confessor or mother of the church',
    ],
    ranks: [
      { rank: 0, label: 'Hostile', effect: 'Attack with religious fervor. Will try to forcibly irradiate you.' },
      { rank: 1, label: 'Cautious', effect: 'Question your intentions. May demand conversion or ask you to leave by force.' },
      { rank: 2, label: 'Neutral', effect: 'Warm and welcoming but pushy in their recruitment attempts.' },
      { rank: 3, label: 'Friendly', effect: 'Recognized by name. Offered special treatment and active assistance.' },
      { rank: 4, label: 'Trusting', effect: 'Allocate resources to you. Revered by lower congregation members.' },
      { rank: 5, label: 'Allied', effect: "One of Atom's chosen. Full backing of the church including sacrifice on your behalf." },
    ],
  },
  {
    key: 'minutemen',
    label: 'Commonwealth Minutemen',
    description: 'A militia devoted to protecting the safety and liberty of Commonwealth settlers.',
    positiveInfluences: [
      'Completing a quest for the Minutemen',
      'Rescuing Minutemen or those they protect',
      'Offering charity to those that cannot help themselves',
      'Dealing a significant defeat to the Gunners',
      'Refusing payment from the Minutemen for completing a quest',
      'Donating or repairing Minutemen weapons and armor',
    ],
    negativeInfluences: [
      "Stealing from settlements, caravans, or survivors' camps",
      'Harming settlers and traders',
      'Allying with raiders, super mutants, Gunners, or other nefarious factions',
      'Not protecting those that cannot protect themselves',
    ],
    ranks: [
      { rank: 0, label: 'Hostile', effect: 'Would prefer you leave settlements they protect. May not attack on sight.' },
      { rank: 1, label: 'Cautious', effect: '"What do you want?" Met with disdain. Stay out of their way.' },
      { rank: 2, label: 'Neutral', effect: 'Generally welcoming. Will defend you if needed at no cost.' },
      { rank: 3, label: 'Friendly', effect: 'Special treatment, supplies, assistance in a fight. May recruit you.' },
      { rank: 4, label: 'Trusting', effect: 'Commit serious resources. Will follow you to the end of a quest.' },
      { rank: 5, label: 'Allied', effect: 'May uproot stations to defend a settlement of your choice. Will sacrifice themselves for your cause.' },
    ],
  },
  {
    key: 'ncr',
    label: 'New California Republic',
    description: 'The largest democratic nation on the West Coast — democracy, liberty, and rule of law.',
    positiveInfluences: [
      'Completing a quest for the NCR',
      'Promoting the values of democracy and liberty',
      'Enacting a significant defeat on an NCR enemy',
      'Refusing payment for an NCR job',
      'Protecting NCR trade caravans or settlements from attack',
      'Negotiating the annexation of a settlement',
    ],
    negativeInfluences: [
      'Failing to complete an NCR quest',
      'Harming the republic through direct action or working with enemies',
      'Enslaving others',
      'Gambling',
      'Prostitution',
      'Openly carrying weapons',
      'Disorderly intoxication in public',
    ],
    ranks: [
      { rank: 0, label: 'Hostile', effect: 'Wanted criminal. NCR military will try to capture you.' },
      { rank: 1, label: 'Cautious', effect: 'Reputation for acting against NCR pillars. Viewed with unease.' },
      { rank: 2, label: 'Neutral', effect: 'Welcoming of outsiders who keep the peace and do legitimate business.' },
      { rank: 3, label: 'Friendly', effect: 'Councillors and local leaders may offer favors or seek your help.' },
      { rank: 4, label: 'Trusting', effect: 'May have the ear of a senate representative. NCR Army protection available.' },
      { rank: 5, label: 'Allied', effect: 'Influential within the republic. Military will fight alongside you without question.' },
    ],
  },
  {
    key: 'institute',
    label: 'The Institute',
    description: 'An isolationist, technologically advanced organization operating from deep below the Commonwealth.',
    positiveInfluences: [
      'Completing a quest for the Institute',
      'Retrieving a runaway third-generation synth',
      'Retrieving valuable technology for the Institute',
      'Enacting a meaningful defeat to the Brotherhood of Steel',
      'Enacting a meaningful defeat to the Railroad',
    ],
    negativeInfluences: [
      'Assisting the Railroad in escaping a third-generation synth',
      'Granting the Brotherhood technology the Institute coveted',
      'Sabotaging an Institute operation',
      "Revealing the Institute's secrets to the wider world",
    ],
    ranks: [
      { rank: 0, label: 'Hostile', effect: 'Waves of Gen 1 synths or a deadly courser may be sent against you.' },
      { rank: 1, label: 'Cautious', effect: 'Watching you but not engaging. Previous access to assets may be cut.' },
      { rank: 2, label: 'Neutral', effect: 'Institute looks down on surface dwellers. May keep an eye on notable characters.' },
      { rank: 3, label: 'Friendly', effect: 'Short-term affiliation for Institute benefit. Access to surface agents.' },
      { rank: 4, label: 'Trusting', effect: 'Equipment and backup provided for Institute missions. Possible Gen 3 synth support.' },
      { rank: 5, label: 'Allied', effect: 'Inducted as operative or scientist. Full Institute backing including advanced combat androids.' },
    ],
  },
  {
    key: 'railroad',
    label: 'The Railroad',
    description: 'A secretive network devoted to freeing synths from Institute control.',
    positiveInfluences: [
      'Completing a quest for the Railroad',
      'Helping a third-generation synth escape the Institute',
      'Living by the values that self-aware androids deserve freedom',
      'Harboring or helping Railroad agents',
      'Dealing a meaningful defeat to the Institute',
      'Donating weapons, armor, and ammunition',
    ],
    negativeInfluences: [
      'Recalling a synth for the Institute',
      'Enslaving others',
      'Demonstrating bigoted views about synths',
      'Dealing a meaningful defeat to the Railroad',
      'Outing one of its agents or getting an agent killed',
    ],
    ranks: [
      { rank: 0, label: 'Hostile', effect: 'Agents will try to assassinate you quickly and quietly.' },
      { rank: 1, label: 'Cautious', effect: 'Keeping tabs on you. May sabotage quests that interfere with operations.' },
      { rank: 2, label: 'Neutral', effect: 'The Railroad barely acknowledges most people. Follow the Freedom Trail.' },
      { rank: 3, label: 'Friendly', effect: '"Tourist" status. May carry messages, provide safehouses, receive small support.' },
      { rank: 4, label: 'Trusting', effect: 'Access to HQ. May become a field agent with support of runners and safehouse owners.' },
      { rank: 5, label: 'Allied', effect: 'HQ member. Full Railroad support including heavies and top agents for aligned quests.' },
    ],
  },
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

export const WANDERERS_TRIBAL_TRAITS = [
  {
    key: 'mother_wasteland',
    label: 'Mother Wasteland',
    benefit: 'Spend 1 Luck point to gain insight into the quest, situation, or scene as if you had spent 3 AP to use Obtain Information 3 times. This information is often cryptic and mystical in nature.',
    penalty: 'Complications make scenes involving pre-War artifacts harder to understand, limiting your use of them.',
  },
  {
    key: 'nomad',
    label: 'Nomad',
    benefit: 'Re-roll 1d20 on Survival tests to travel, set up camp, and forage for food and water. Ignore the first complication rolled when making these tests.',
    penalty: 'Barter and Speech tests increase difficulty and complication range by 1 when dealing with inhabitants of a static settlement. Science cannot be a Tag skill.',
  },
  {
    key: 'rite_of_passage',
    label: 'Rite of Passage',
    benefit: 'The first time you spend Luck in a scene, roll 1 CD. If you roll an effect you have not spent that Luck point.',
    penalty: 'You view everyone who has not gone through your rite of passage as lesser. You cannot assist another PC without spending 1 AP first.',
  },
  {
    key: 'tools_of_the_old_world',
    label: 'Tools of the Old World',
    benefit: 'You may use Survival instead of Repair or Science to repair or make use of pre-War tech.',
    penalty: 'The complication range of tests involving pre-War technology (not weapons) is increased by 2.',
  },
  {
    key: 'the_chosen_one',
    label: 'The Chosen One',
    benefit: "The first d20 you purchase is free on tests relating to your tribe's quest, and you can always succeed at a cost.",
    penalty: 'The GM adds 2 AP to their pool when your quest comes up.',
  },
];

export const WANDERERS_PERKS = [
  // STRENGTH
  { key: 'blocker', label: 'Blocker', ranks: 3, requirements: { STR: 6, level: 1 }, source: 'Wanderers', description: 'When struck by a melee attack, count your Physical or Energy damage resistance (matching attack type) as +1 higher. Increases to +2 at rank 2, +3 at rank 3. Level requirement increases by 5 per rank.' },
  { key: 'bullet_shield', label: 'Bullet Shield', ranks: 3, requirements: { STR: 8, level: 8 }, source: 'Wanderers', description: 'When wielding a big gun, increase your damage resistance by +2. Increases to +3 at rank 2, +4 at rank 3. Level requirement increases by 6 per rank.' },
  { key: 'gladiator', label: 'Gladiator', ranks: 3, requirements: { STR: 6, level: 2 }, source: 'Wanderers', description: 'When wielding a one-handed melee weapon, increase damage by +1 CD. Increases to +2 CD at rank 2, +3 CD at rank 3. Level requirement increases by 5 per rank.' },
  { key: 'incisor', label: 'Incisor', ranks: 2, requirements: { STR: 6, level: 2 }, source: 'Wanderers', description: 'Melee weapon gains Piercing 1, or +1 to existing Piercing X rating. At rank 2, Piercing 2 or +2 to existing. Level requirement increases by 9 per rank.' },
  { key: 'lock_and_load_w', label: 'Lock and Load', ranks: 3, requirements: { STR: 7, level: 7 }, source: 'Wanderers', description: 'When wielding a big gun with Fire Rate 2+, Fire Rate increases by +1. At rank 2, increases by +2. Level requirement increases by 5 per rank.' },
  { key: 'martial_artist', label: 'Martial Artist', ranks: 1, requirements: { STR: 6, level: 8 }, source: 'Wanderers', description: 'When making a melee attack, you may take an additional major action for 1 AP instead of 2 AP, so long as it is also a melee attack with the same or another equipped weapon.' },
  { key: 'pack_rat', label: 'Pack Rat', ranks: 1, requirements: { STR: 6, level: 4 }, source: 'Wanderers', description: 'Junk items you carry count as half their listed weight.' },
  { key: 'scattershot', label: 'Scattershot', ranks: 1, requirements: { STR: 7, level: 10 }, source: 'Wanderers', description: 'When making a ranged attack with a shotgun, you may take an additional major action for 1 AP instead of 2 AP, so long as it is also a ranged attack with the same shotgun.' },
  { key: 'sturdy_frame', label: 'Sturdy Frame', ranks: 3, requirements: { STR: 8, level: 5 }, source: 'Wanderers', description: 'Armor worn (except Power Armor) counts as three-quarters its listed weight. At rank 2, half. At rank 3, one-quarter. Level requirement increases by 8 per rank.' },
  // PERCEPTION
  { key: 'archer', label: 'Archer', ranks: 3, requirements: { PER: 6, level: 1 }, source: 'Wanderers', description: 'When wielding a bow or crossbow, increase damage by +1 CD. +2 CD at rank 2, +3 CD at rank 3. Level requirement increases by 7 per rank.' },
  { key: 'bow_before_me', label: 'Bow Before Me', ranks: 1, requirements: { PER: 8, level: 4 }, source: 'Wanderers', description: 'When wielding a bow or crossbow, the weapon gains Piercing 1, or +1 to existing Piercing X rating.' },
  { key: 'butchers_bounty', label: "Butcher's Bounty", ranks: 3, requirements: { PER: 8, level: 3 }, source: 'Wanderers', description: 'When butchering a dead animal, roll +1 CD and find additional meat portions equal to total rolled. +2 CD at rank 2, +3 CD at rank 3. Level requirement increases by 5 per rank.' },
  { key: 'crack_shot', label: 'Crack Shot', ranks: 2, requirements: { PER: 7, level: 7 }, source: 'Wanderers', description: 'When making a ranged attack with a one-handed ranged weapon after aiming, range increases by one step. At rank 2, weapon also gains Accurate if it lacked it. Level requirement increases by 7 per rank.' },
  { key: 'fire_in_the_hole', label: 'Fire in the Hole', ranks: 1, requirements: { PER: 8, level: 8 }, source: 'Wanderers', description: 'When making a ranged attack with a thrown weapon with the Blast quality, the base difficulty is 1 rather than 2.' },
  { key: 'glow_sight', label: 'Glow Sight', ranks: 3, requirements: { PER: 8, level: 3 }, source: 'Wanderers', description: 'When attacking a Glowing enemy, inflict +1 CD damage. +2 CD at rank 2, +3 CD at rank 3. Level requirement increases by 8 per rank.' },
  { key: 'night_eyes', label: 'Night Eyes', ranks: 1, requirements: { PER: 8, level: 7 }, source: 'Wanderers', description: 'When trying to avoid attention or hide, you may ignore difficulty increases caused by poor lighting or darkness.' },
  // ENDURANCE
  { key: 'cannibal_w', label: 'Cannibal', ranks: 3, requirements: { END: 8, level: 10 }, source: 'Wanderers', description: 'May butcher a dead human (END + Survival, difficulty 0) for 1 human flesh: heals 4 HP, Irradiated (1 CD). At rank 2 also works on ghouls; at rank 3 also on super mutants. Addictive — roll CD per flesh eaten this session; 2+ Effects = addicted. Level requirement increases by 9 per rank.' },
  { key: 'cola_nut', label: 'Cola Nut', ranks: 1, requirements: { END: 6, level: 14 }, source: 'Wanderers', description: 'When you drink a Nuka-Cola beverage, you regain twice as many HP as normal.' },
  { key: 'dromedary', label: 'Dromedary', ranks: 1, requirements: { END: 7, level: 3 }, source: 'Wanderers', description: 'When you drink a beverage, it moves your Thirst state back up by one extra step than normal (two steps total, or three for purified water).' },
  { key: 'fireproof', label: 'Fireproof', ranks: 3, requirements: { END: 6, level: 7 }, source: 'Wanderers', description: '+1 Energy damage resistance against fire-based weapons and Blast quality weapons. +2 at rank 2, +3 at rank 3. Level requirement increases by 7 per rank.' },
  { key: 'ghoulish', label: 'Ghoulish', ranks: 3, requirements: { END: 9, level: 7 }, source: 'Wanderers', description: 'Your body heals when exposed to radiation: regain 1 HP per 4 Radiation damage. At rank 2, 1 HP per 3. At rank 3, 1 HP per 2. Max HP still reduced by Radiation damage. Level requirement increases by 8 per rank.' },
  { key: 'ironclad', label: 'Ironclad', ranks: 3, requirements: { END: 7, level: 5 }, source: 'Wanderers', description: 'While wearing armor (except Power Armor), add +1 to Physical and Energy damage resistance. +2 at rank 2, +3 at rank 3. Level requirement increases by 5 per rank.' },
  { key: 'natural_resistance', label: 'Natural Resistance', ranks: 1, requirements: { END: 7, level: 10 }, source: 'Wanderers', description: 'Breathing toxic fumes and sleeping rough no longer poses a risk of catching a disease.' },
  { key: 'radicool', label: 'Radicool', ranks: 1, requirements: { END: 6, level: 12 }, source: 'Wanderers', description: 'At 1/4 max HP in Radiation damage: re-roll 1d20 on STR tests and +1 CD melee. At 1/2: re-roll 2d20 and +2 CD. At 3/4: re-roll 3d20 and +3 CD.' },
  { key: 'revenant', label: 'Revenant', ranks: 1, requirements: { END: 8, level: 12 }, source: 'Wanderers', description: 'When revived, increase damage of all attacks by +2 CD for the rest of the scene or until reduced to 0 HP again.' },
  { key: 'slow_metabolizer', label: 'Slow Metabolizer', ranks: 1, requirements: { END: 7, level: 5 }, source: 'Wanderers', description: 'When you eat a food item, it moves your Hunger state back up by one extra step than normal (two steps for uncooked, three for cooked).' },
  { key: 'thirst_quencher', label: 'Thirst Quencher', ranks: 1, requirements: { END: 7, level: 6 }, source: 'Wanderers', description: 'Drinking dirty water no longer poses a risk of catching a disease.' },
  { key: 'vaccinated', label: 'Vaccinated', ranks: 1, requirements: { END: 7, level: 16 }, source: 'Wanderers', description: 'Taking damage from the claws or bite of a mammal, lizard, or insect no longer poses a risk of catching a disease.' },
  // CHARISMA
  { key: 'bloodsucker', label: 'Bloodsucker', ranks: 1, requirements: { CHA: 6, level: 11 }, source: 'Wanderers', description: 'Blood Packs now heal twice as many HP and move Thirst state up by one step. When consuming Irradiated Blood, only roll 1 CD for Radiation damage.' },
  { key: 'field_surgeon', label: 'Field Surgeon', ranks: 1, requirements: { CHA: 8, INT: 8, level: 15 }, source: 'Wanderers', description: 'When using a Stimpak as part of First Aid, heal 3 HP per AP spent. When using RadAway as part of First Aid, remove 1 additional Radiation damage per AP spent.' },
  { key: 'happy_go_lucky', label: 'Happy Go Lucky', ranks: 1, requirements: { CHA: 9, level: 17 }, source: 'Wanderers', description: 'The first time in a scene you consume an alcoholic beverage, regain 1 Luck point up to your normal maximum.' },
  { key: 'healing_hands', label: 'Healing Hands', ranks: 1, requirements: { CHA: 8, INT: 7, level: 18 }, source: 'Wanderers', description: 'When you succeed at a First Aid action to stabilize a dying ally, that ally also removes Radiation damage equal to your Medicine skill rank.' },
  { key: 'overly_generous', label: 'Overly Generous', ranks: 1, requirements: { CHA: 7, level: 12 }, source: 'Wanderers', description: 'When you have Radiation damage equal to or greater than one-quarter your maximum HP, your melee attacks gain the Radioactive damage effect.' },
  { key: 'responder', label: 'Responder', ranks: 3, requirements: { CHA: 8, INT: 7, level: 9 }, source: 'Wanderers', description: 'When you succeed at a First Aid action to stabilize a dying ally, you no longer need to spend 1 AP to wake them. The patient heals 2 HP at the start of their next turn. 4 HP over two turns at rank 2; 6 HP over three turns at rank 3. Level requirement increases by 7 per rank.' },
  { key: 'spiritual_healer', label: 'Spiritual Healer', ranks: 3, requirements: { CHA: 7, level: 6 }, source: 'Wanderers', description: 'When you succeed at a First Aid action to stabilize a dying ally, you regain 1 HP. At rank 2, regain 2 HP plus 2 HP at the start of your next turn. At rank 3, regain 3 HP and 3 HP at the start of your next two turns. Level requirement increases by 9 per rank.' },
  { key: 'suppressor', label: 'Suppressor', ranks: 3, requirements: { CHA: 6, level: 10 }, source: 'Wanderers', description: 'After successfully attacking an enemy, spend 1 AP to suppress them until end of their next turn: they reduce damage by 1 CD. 2 CD at rank 2, 3 CD at rank 3. Level requirement increases by 10 per rank.' },
  { key: 'tenderizer', label: 'Tenderizer', ranks: 3, requirements: { CHA: 7, level: 8 }, source: 'Wanderers', description: 'When you hit an enemy, spend 1 AP to make them vulnerable until end of their next turn: +1 CD damage from all attacks against them. +2 CD at rank 2, +3 CD at rank 3. Level requirement increases by 10 per rank.' },
  // INTELLIGENCE
  { key: 'licensed_plumber', label: 'Licensed Plumber', ranks: 1, requirements: { INT: 6, level: 5 }, source: 'Wanderers', description: 'Pipe weapons you use do not have the Unreliable quality.' },
  { key: 'power_patcher', label: 'Power Patcher', ranks: 3, requirements: { INT: 6, level: 5 }, source: 'Wanderers', description: 'When you repair the HP of a piece of Power Armor, repair an additional 2 HP. 3 HP at rank 2, 4 HP at rank 3. Level requirement increases by 7 per rank.' },
  { key: 'power_user', label: 'Power User', ranks: 3, requirements: { INT: 9, level: 10 }, source: 'Wanderers', description: 'Fusion Cores contain 3 additional charges. 6 at rank 2, 10 at rank 3. Level requirement increases by 10 per rank.' },
  { key: 'stabilized', label: 'Stabilized', ranks: 1, requirements: { INT: 7, level: 16 }, source: 'Wanderers', description: 'When wearing Power Armor, re-roll 1d20 on any big gun attack. Any big gun you wield gains Piercing 1, or +1 to existing Piercing X.' },
  // AGILITY
  { key: 'born_survivor', label: 'Born Survivor', ranks: 3, requirements: { AGI: 8, level: 3 }, source: 'Wanderers', description: 'When damage would reduce your HP below one-quarter maximum, you may automatically use a Stimpak once per scene. Twice per scene at rank 2, three times at rank 3. Level requirement increases by 8 per rank.' },
  { key: 'dead_man_sprinting', label: 'Dead Man Sprinting', ranks: 1, requirements: { AGI: 7, level: 8 }, source: 'Wanderers', description: 'When you take the Sprint action with current HP below half maximum, spend 1 AP to move one additional zone.' },
  { key: 'escape_artist', label: 'Escape Artist', ranks: 1, requirements: { AGI: 8, level: 15 }, source: 'Wanderers', description: 'In combat, if no enemy can see you when you start your turn, attempt AGI + Sneak test to hide. Once hidden, enemies no longer know your location.' },
  { key: 'evasive', label: 'Evasive', ranks: 1, requirements: { AGI: 7, level: 7 }, source: 'Wanderers', description: 'Physical and Energy damage resistance on all hit locations increase based on Agility (not while in Power Armor or encumbered). AGI 7-8: +1. AGI 9-10: +2. AGI 11+: +3.' },
  { key: 'goat_legs', label: 'Goat Legs', ranks: 3, requirements: { AGI: 7, level: 7 }, source: 'Wanderers', description: '+2 Physical damage resistance against falling damage. +4 at rank 2, +6 at rank 3. Level requirement increases by 5 per rank.' },
  { key: 'modern_renegade', label: 'Modern Renegade', ranks: 3, requirements: { AGI: 7, level: 8 }, source: 'Wanderers', description: 'When attacking with a one-handed ranged weapon without aiming, a successful attack scores +1 bonus AP. +2 AP at rank 2, +3 AP at rank 3. Level requirement increases by 5 per rank.' },
  { key: 'secret_agent', label: 'Secret Agent', ranks: 3, requirements: { AGI: 9, level: 7 }, source: 'Wanderers', description: 'When you use a Stealth Boy, it lasts 1 additional turn. 2 additional at rank 2, 3 additional at rank 3. Level requirement increases by 5 per rank.' },
  // LUCK
  { key: 'dry_nurse', label: 'Dry Nurse', ranks: 1, requirements: { LCK: 8, level: 13 }, source: 'Wanderers', description: 'When you succeed at First Aid to stabilize a dying ally using a Stimpak, roll 1 CD. If you roll an Effect, the Stimpak is not consumed.' },
  { key: 'junk_shield', label: 'Junk Shield', ranks: 3, requirements: { LCK: 7, level: 1 }, source: 'Wanderers', description: 'For every 5 items of Junk carried, add +1 to Physical and Energy damage resistance (max equal to perk rank). No bonus while wearing Power Armor. Level requirement increases by 8 per rank.' },
  { key: 'mysterious_savior', label: 'Mysterious Savior', ranks: 1, requirements: { LCK: 7, level: 1 }, source: 'Wanderers', description: 'At the start of a combat encounter, spend 1 Luck point. If you do, the first time you start dying in that scene, the Mysterious Savior may appear, revive you (stabilize + 4 HP), and vanish.' },
  { key: 'psychopath', label: 'Psychopath', ranks: 3, requirements: { LCK: 8, level: 11 }, source: 'Wanderers', description: 'When you kill an enemy, roll a number of CD equal to your perk rank. For each Effect rolled, regain 1 Luck point up to your maximum. Level requirement increases by 6 per rank.' },
  { key: 'serendipity', label: 'Serendipity', ranks: 3, requirements: { LCK: 7, level: 5 }, source: 'Wanderers', description: 'When your current HP is below one-third maximum and you are attacked, spend 1 Luck point before any dice roll to have the attack miss. Once per scene per rank. Level requirement increases by 6 per rank.' },
  { key: 'storm_chaser', label: 'Storm Chaser', ranks: 1, requirements: { LCK: 6, level: 15 }, source: 'Wanderers', description: 'When it is raining or during a rad storm, regain 1 HP at the start of each of your turns in combat. Out of combat, regain HP equal to half your Luck score (rounded up) every hour of rain.' },
];

function safeParseJSON(str, fallback) {
  if (Array.isArray(str)) return str;
  if (str && typeof str === 'object') return str;
  if (typeof str === 'string') {
    try { return JSON.parse(str || ''); } catch { return fallback; }
  }
  return fallback;
}

export function getActiveTraitEffects(character) {
  const survivorTraits = safeParseJSON(character.survivor_traits, []);
  const origin = character.origin || '';
  const extraTagFromOrigin = ['Vault Dweller', 'Brotherhood Initiate', 'Brotherhood Outcast'].includes(origin) ? 1 : 0;
  return {
    extraTagSkills: (survivorTraits.includes('educated') ? 1 : 0) + extraTagFromOrigin,
    hasGifted: survivorTraits.includes('gifted'),
    giftedBonuses: safeParseJSON(character.gifted_bonuses, []),
    luckPointPenalty: survivorTraits.includes('gifted') ? 1 : 0,
    carryWeightMultiplier: survivorTraits.includes('small_frame') ? 5 : 10,
    meleeComplicationRange: survivorTraits.includes('heavy_handed') ? 19 : 20,
    meleeDamageBonus: survivorTraits.includes('heavy_handed') ? 1 : 0,
    canAim: !survivorTraits.includes('fast_shot'),
    hasGoodNatured: survivorTraits.includes('good_natured') || safeParseJSON(character.ncr_traits, []).includes('good_natured'),
  };
}

export function getEffectiveSpecialStats(character = {}) {
  const effective = {};
  for (const attr of SPECIAL_ATTRIBUTES) {
    effective[attr.key] = Number(character[attr.key] || 5);
  }

  const traits = getActiveTraitEffects(character);
  if (traits.hasGifted && Array.isArray(traits.giftedBonuses)) {
    const uniqueBonuses = new Set(
      traits.giftedBonuses
        .map((key) => String(key || '').toLowerCase())
        .filter((key) => key in effective)
    );
    for (const key of uniqueBonuses) effective[key] += 1;
  }

  return effective;
}

export function getSpecialAttributeBounds(character = {}) {
  const origin = String(character.origin || '');
  const isNightkin = isNightkinCharacter(character);
  const bounds = {
    strength: { min: SPECIAL_MIN, max: SPECIAL_MAX },
    perception: { min: SPECIAL_MIN, max: SPECIAL_MAX },
    endurance: { min: SPECIAL_MIN, max: SPECIAL_MAX },
    charisma: { min: SPECIAL_MIN, max: SPECIAL_MAX },
    intelligence: { min: SPECIAL_MIN, max: SPECIAL_MAX },
    agility: { min: SPECIAL_MIN, max: SPECIAL_MAX },
    luck: { min: SPECIAL_MIN, max: SPECIAL_MAX },
  };

  if (origin === 'Super Mutant') {
    bounds.strength.max = 12;
    bounds.endurance.max = 12;
    bounds.intelligence.max = 6;
    bounds.charisma.max = 6;
  }
  if (isNightkin) {
    bounds.strength.max = 12;
    bounds.endurance.max = 12;
    bounds.intelligence.max = 8;
    bounds.charisma.max = 8;
  }

  return bounds;
}

export function calculateDerivedStats(character) {
  const special = getEffectiveSpecialStats(character);
  const str = special.strength;
  const end = special.endurance;
  const agi = special.agility;
  const lck = special.luck;
  const per = special.perception;

  const traits = getActiveTraitEffects(character);
  const meleeBonus = Math.max(0, Math.floor((str - 5) / 2)) + traits.meleeDamageBonus;

  return {
    hp: end + lck,
    initiative: per + agi,
    defense: 1,
    melee_bonus: meleeBonus,
    carry_weight: str * traits.carryWeightMultiplier + 150,
    luck_points: Math.max(0, lck - traits.luckPointPenalty),
    action_points: 2,
  };
}

export function calculateBodyPartHP(character) {
  const special = getEffectiveSpecialStats(character);
  const end = special.endurance;
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

export const SETTLERS_WEAPONS = [
  // Small Guns
  { key: 'm79_grenade_launcher', label: 'M79 Grenade Launcher', type: 'Small Guns', damage: '6 CD', damageEffect: '', damageType: 'Physical', fireRate: 0, range: 'Long', qualities: 'Blast, Inaccurate, Slow Load, Two-Handed', weight: 6, cost: 300, rarity: 3, ammo: '40mm Grenade Round', source: 'Settlers' },
  { key: 'smoke_claw', label: 'Smoke Claw', type: 'Small Guns', damage: '4 CD', damageEffect: 'Persistent', damageType: 'Poison', fireRate: 0, range: 'Medium', qualities: 'Blast, Inaccurate', weight: 3, cost: 80, rarity: 3, ammo: 'Gas Grenade', source: 'Settlers' },
  // Energy Weapons
  { key: 'acid_soaker', label: 'Acid Soaker', type: 'Energy Weapons', damage: '3 CD', damageEffect: 'Breaking, Persistent', damageType: 'Poison', fireRate: 2, range: 'Close', qualities: 'Debilitating, Inaccurate', weight: 3, cost: 125, rarity: 3, ammo: 'Acid Concentrate', source: 'Settlers' },
  { key: 'alien_blaster', label: 'Alien Blaster', type: 'Energy Weapons', damage: '5 CD', damageEffect: 'Vicious', damageType: 'Energy/Radiation', fireRate: 2, range: 'Close', qualities: 'Close Quarters, Inaccurate', weight: 2, cost: 90, rarity: 5, ammo: 'Alien Blaster Round', source: 'Settlers' },
  { key: 'assaultron_head_laser', label: 'Assaultron Head Laser', type: 'Energy Weapons', damage: '5 CD', damageEffect: 'Piercing 1', damageType: 'Energy', fireRate: 0, range: 'Close', qualities: '—', weight: 8, cost: 115, rarity: 4, ammo: 'Fusion Cell', source: 'Settlers' },
  { key: 'cryojet', label: 'Cryojet', type: 'Energy Weapons', damage: '3 CD', damageEffect: 'Burst, Freeze', damageType: 'Energy', fireRate: 3, range: 'Close', qualities: 'Inaccurate', weight: 8, cost: 261, rarity: 4, ammo: 'Cryo Cell', source: 'Settlers' },
  { key: 'mesmetron', label: 'Mesmetron', type: 'Energy Weapons', damage: '3 CD', damageEffect: 'Stun', damageType: 'Energy', fireRate: 1, range: 'Medium', qualities: '—', weight: 2, cost: 120, rarity: 4, ammo: 'Fusion Cell', source: 'Settlers' },
  { key: 'tesla_rifle', label: 'Tesla Rifle', type: 'Energy Weapons', damage: '4 CD', damageEffect: 'Arc', damageType: 'Energy', fireRate: 2, range: 'Medium', qualities: 'Two-Handed', weight: 8, cost: 180, rarity: 4, ammo: 'Fusion Cell', source: 'Settlers' },
  // Big Guns
  { key: 'broadsider', label: 'Broadsider', type: 'Big Guns', damage: '8 CD', damageEffect: 'Blast', damageType: 'Physical', fireRate: 0, range: 'Medium', qualities: 'Inaccurate, Slow Load, Two-Handed', weight: 15, cost: 250, rarity: 5, ammo: 'Cannonball', source: 'Settlers' },
  { key: 'cryolator', label: 'Cryolator', type: 'Big Guns', damage: '4 CD', damageEffect: 'Burst, Freeze, Spread', damageType: 'Energy', fireRate: 4, range: 'Close', qualities: 'Inaccurate, Two-Handed', weight: 14, cost: 300, rarity: 4, ammo: 'Cryo Cell', source: 'Settlers' },
  { key: 'harpoon_gun', label: 'Harpoon Gun', type: 'Big Guns', damage: '12 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: 0, range: 'Medium', qualities: 'Debilitating, Inaccurate, Two-Handed', weight: 16, cost: 120, rarity: 5, ammo: 'Harpoon', source: 'Settlers' },
  // Melee / Unarmed
  { key: 'buzz_saw', label: 'Buzz Saw', type: 'Melee', damage: '3 CD', damageEffect: 'Piercing', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: '—', weight: 3, cost: 25, rarity: 2, ammo: null, source: 'Settlers' },
  { key: 'robot_claw', label: 'Claw (Robot)', type: 'Unarmed', damage: '3 CD', damageEffect: '—', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: '—', weight: 2, cost: 25, rarity: 1, ammo: null, source: 'Settlers' },
  { key: 'construction_claw', label: 'Construction Claw', type: 'Unarmed', damage: '4 CD', damageEffect: 'Breaking', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: '—', weight: 3, cost: 25, rarity: 0, ammo: null, source: 'Settlers' },
  { key: 'drill', label: 'Drill', type: 'Unarmed', damage: '5 CD', damageEffect: 'Vicious', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: 'Debilitating', weight: 20, cost: 50, rarity: 1, ammo: null, source: 'Settlers' },
  { key: 'vice_grip', label: 'Vice Grip', type: 'Unarmed', damage: '4 CD', damageEffect: 'Breaking', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: '—', weight: 15, cost: 30, rarity: 2, ammo: null, source: 'Settlers' },
];

export const SETTLERS_AMMO = [
  { key: '40mm_grenade_round', label: '40mm Grenade Round', weight: '<1', cost: 2, rarity: 4, source: 'Settlers' },
  { key: 'acid_concentrate', label: 'Acid Concentrate', weight: '<1', cost: 2, rarity: 3, source: 'Settlers' },
  { key: 'alien_blaster_round', label: 'Alien Blaster Round', weight: '<1', cost: 1, rarity: 6, source: 'Settlers' },
  { key: 'cannonball', label: 'Cannonball', weight: '4', cost: 8, rarity: 5, source: 'Settlers' },
  { key: 'cryo_cell', label: 'Cryo Cell', weight: '<1', cost: 10, rarity: 5, source: 'Settlers' },
  { key: 'gas_grenade', label: 'Gas Grenade', weight: '<1', cost: 2, rarity: 4, source: 'Settlers' },
  { key: 'harpoon', label: 'Harpoon', weight: '<1', cost: 3, rarity: 4, source: 'Settlers' },
];

export const STANDARD_AMMO = [
  { key: '10mm', label: '10mm', weight: '<1', rarity: 1 },
  { key: '308', label: '.308', weight: '<1', rarity: 2 },
  { key: '44', label: '.44', weight: '<1', rarity: 2 },
  { key: '45', label: '.45', weight: '<1', rarity: 2 },
  { key: '50', label: '.50', weight: '<1', rarity: 3 },
  { key: '5mm', label: '5mm', weight: '<1', rarity: 1 },
  { key: '5_56mm', label: '5.56mm', weight: '<1', rarity: 1 },
  { key: 'fusion_cell', label: 'Fusion Cell', weight: '<1', rarity: 2 },
  { key: 'fusion_core', label: 'Fusion Core', weight: '4', rarity: 3 },
  { key: 'microfusion_cell', label: 'Microfusion Cell', weight: '<1', rarity: 2 },
  { key: 'plasma_cartridge', label: 'Plasma Cartridge', weight: '<1', rarity: 2 },
  { key: 'railway_spike', label: 'Railway Spike', weight: '1', rarity: 2 },
  { key: 'shotgun_shell', label: 'Shotgun Shell', weight: '<1', rarity: 1 },
  { key: 'flamer_fuel', label: 'Flamer Fuel', weight: '<1', rarity: 3 },
  { key: 'missile', label: 'Missile', weight: '3', rarity: 4 },
  { key: 'mini_nuke', label: 'Mini Nuke', weight: '3', rarity: 5 },
];

export const SETTLERS_DAMAGE_EFFECTS = [
  { key: 'arc', label: 'Arc', description: 'Each Effect rolled automatically hits one additional target within Close range of the primary target for half the rolled damage.' },
  { key: 'freeze', label: 'Freeze', description: 'Enemies hit are Frozen if Effects rolled ≥ half the target\'s END. A Frozen creature cannot take actions on its next turn.' },
];

export const SETTLERS_WEAPON_QUALITIES = [
  { key: 'slow_load', label: 'Slow Load', description: 'After this weapon has been fired, you must spend a minor action to reload before it can be fired again.' },
];

export const WANDERERS_AMMO = [
  { key: '357_magnum', label: '.357 Magnum', weight: '<1', cost: 2, rarity: 1, source: 'Wanderers' },
  { key: '127mm', label: '12.7mm', weight: '<1', cost: 2, rarity: 2, source: 'Wanderers' },
  { key: '9mm', label: '9mm', weight: '<1', cost: 1, rarity: 0, source: 'Wanderers' },
  { key: '50_ball', label: '.50 Ball', weight: '<1', cost: 1, rarity: 3, source: 'Wanderers' },
  { key: '25mm_grenade', label: '25mm Grenade', weight: '<1', cost: 8, rarity: 4, source: 'Wanderers' },
  { key: 'alien_power_cells', label: 'Alien Power Cells', weight: '<1', cost: 5, rarity: 5, source: 'Wanderers' },
  { key: 'alien_power_module', label: 'Alien Power Module', weight: '<1', cost: 10, rarity: 6, source: 'Wanderers' },
  { key: 'arrow', label: 'Arrow', weight: '<1', cost: 2, rarity: 1, source: 'Wanderers' },
  { key: 'arrow_cryo', label: 'Arrow — Cryo', weight: '<1', cost: 10, rarity: 4, source: 'Wanderers', note: 'Gains Freeze damage effect' },
  { key: 'arrow_explosive', label: 'Arrow — Explosive', weight: '<1', cost: 8, rarity: 3, source: 'Wanderers', note: 'Loses Suppressed, gains Blast' },
  { key: 'arrow_flaming', label: 'Arrow — Flaming', weight: '<1', cost: 4, rarity: 2, source: 'Wanderers', note: 'Gains Persistent (Energy)' },
  { key: 'arrow_serrated', label: 'Arrow — Serrated', weight: '<1', cost: 6, rarity: 2, source: 'Wanderers', note: 'Gains Persistent (Physical) and Piercing 1' },
  { key: 'arrow_plasma', label: 'Arrow — Plasma', weight: '<1', cost: 11, rarity: 5, source: 'Wanderers', note: '+2 CD damage, Physical/Energy; reduced by lower resistance' },
  { key: 'arrow_poison', label: 'Arrow — Poison', weight: '<1', cost: 5, rarity: 2, source: 'Wanderers', note: 'Gains Persistent (Poison)' },
  { key: 'crossbow_bolt', label: 'Crossbow Bolt', weight: '<1', cost: 3, rarity: 2, source: 'Wanderers' },
  { key: 'plasma_core', label: 'Plasma Core', weight: '4', cost: 200, rarity: 5, source: 'Wanderers', note: 'Contains 500 shots for Gatling Plasma. Consumed at 10× normal rate.' },
];

export const WANDERERS_ARMOR = [
  // Headgear
  { key: 'beer_hat', label: 'Beer Hat', type: 'Headgear', physRes: 0, enerRes: 0, radRes: 0, locations: ['Head'], weight: 1, cost: 15, rarity: 2, special: 'Can hold 1 beverage; consume as minor action in combat.', source: 'Wanderers' },
  { key: 'marine_tactical_helmet', label: 'Marine Tactical Helmet', type: 'Headgear', physRes: 2, enerRes: 2, radRes: 2, locations: ['Head'], weight: 2, cost: 25, rarity: 3, special: 'Can breathe underwater when worn with Marine Wetsuit.', source: 'Wanderers' },
  { key: 'spacesuit_helmet', label: 'Spacesuit Helmet', type: 'Headgear', physRes: 1, enerRes: 4, radRes: 2, locations: ['Head'], weight: 5, cost: 85, rarity: 3, source: 'Wanderers' },
  { key: 'hunters_hood', label: "Hunter's Hood", type: 'Headgear', physRes: 1, enerRes: 1, radRes: 0, locations: ['Head'], weight: 2, cost: 15, rarity: 2, special: 'Shadowed.', source: 'Wanderers' },
  // Clothing
  { key: 'marine_wetsuit', label: 'Marine Wetsuit', type: 'Clothing', physRes: 1, enerRes: 1, radRes: 1, locations: ['Arms', 'Legs', 'Torso'], weight: 2, cost: 25, rarity: 3, special: 'No cold water exposure penalty while worn.', source: 'Wanderers' },
  { key: 'underarmor_suit', label: 'Underarmor Suit', type: 'Clothing', physRes: 0, enerRes: 0, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 1, cost: 30, rarity: 2, special: 'Re-roll 1d20 on one STR or PER test per scene. Can be fitted with lining mods.', source: 'Wanderers' },
  // Outfits
  { key: 'bos_armored_battlecoat', label: 'BOS Armored Battlecoat', type: 'Outfit', physRes: 4, enerRes: 1, radRes: 1, locations: ['Arms', 'Legs', 'Torso'], weight: 20, cost: 400, rarity: 4, special: 'Can be reinforced with Ballistic Weave.', source: 'Wanderers' },
  { key: 'bos_bomber_jacket', label: 'BOS Bomber Jacket', type: 'Outfit', physRes: 2, enerRes: 5, radRes: 1, locations: ['Arms', 'Legs', 'Torso'], weight: 4, cost: 40, rarity: 3, special: 'Can be reinforced with Ballistic Weave.', source: 'Wanderers' },
  { key: 'cleanroom_suit', label: 'Cleanroom Suit', type: 'Outfit', physRes: 0, enerRes: 0, radRes: 6, locations: ['All'], weight: 5, cost: 65, rarity: 2, special: 'Re-roll 1d20 on all END tests while hood is up and mask in place.', source: 'Wanderers' },
  { key: 'hunters_pelt_outfit', label: "Hunter's Pelt Outfit", type: 'Outfit', physRes: 2, enerRes: 2, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 15, cost: 50, rarity: 2, special: 'Shadowed. Counts as wearing 4 pieces of shadowed armor.', source: 'Wanderers' },
  { key: 'spacesuit_costume', label: 'Spacesuit Costume', type: 'Outfit', physRes: 1, enerRes: 4, radRes: 2, locations: ['Arms', 'Legs', 'Torso'], weight: 8, cost: 100, rarity: 4, special: 'When worn with Spacesuit Helmet: breathe underwater. Re-roll 1d20 on one CHA test per scene.', source: 'Wanderers' },
  // Armor
  { key: 'chinese_stealth_armor', label: 'Chinese Stealth Armor', type: 'Light Armor', physRes: 4, enerRes: 4, radRes: 6, locations: ['All'], weight: 5, cost: 750, rarity: 6, special: 'Re-roll 1d20 on Sneak tests. Activate stealth field as minor action: enemies +2 difficulty to spot; defense +2 while invisible. Attacking disables the field. Cannot be modded.', source: 'Wanderers' },
  { key: 'diving_suit', label: 'Diving Suit', type: 'Heavy Armor', physRes: 3, enerRes: 3, radRes: 9, locations: ['All'], weight: 8, cost: 350, rarity: 3, special: 'Breathe underwater. Immune to extreme water pressure and cold water damage. Cannot be modded.', source: 'Wanderers' },
  { key: 'recon_armor', label: 'Recon Armor', type: 'Light Armor', physRes: 3, enerRes: 3, radRes: 2, locations: ['All'], weight: 3, cost: 360, rarity: 4, special: 'Cannot accept mods.', source: 'Wanderers' },
  // Power Armor
  { key: 'excavator_chest', label: 'Excavator Chest Piece', type: 'Power Armor', physRes: 6, enerRes: 5, radRes: 11, hp: 14, locations: ['Torso'], weight: 15, cost: 113, rarity: 3, source: 'Wanderers' },
  { key: 'excavator_arm', label: 'Excavator Arm', type: 'Power Armor', physRes: 3, enerRes: 2, radRes: 8, hp: 7, locations: ['Arm'], weight: 12, cost: 61, rarity: 3, source: 'Wanderers' },
  { key: 'excavator_leg', label: 'Excavator Leg', type: 'Power Armor', physRes: 3, enerRes: 2, radRes: 8, hp: 7, locations: ['Leg'], weight: 12, cost: 81, rarity: 3, source: 'Wanderers' },
  { key: 'excavator_helmet', label: 'Excavator Helmet', type: 'Power Armor', physRes: 5, enerRes: 3, radRes: 8, hp: 7, locations: ['Head'], weight: 10, cost: 49, rarity: 3, special: 'Full suit: +100 carry weight. Each Arm: +2 CD ore found when mining.', source: 'Wanderers' },
  { key: 'hellcat_chest', label: 'Hellcat Chest Piece', type: 'Power Armor', physRes: 9, enerRes: 4, radRes: 9, hp: 15, locations: ['Torso'], weight: 12, cost: 146, rarity: 3, source: 'Wanderers' },
  { key: 'hellcat_arm', label: 'Hellcat Arm', type: 'Power Armor', physRes: 5, enerRes: 3, radRes: 8, hp: 9, locations: ['Arm'], weight: 8, cost: 105, rarity: 3, source: 'Wanderers' },
  { key: 'hellcat_leg', label: 'Hellcat Leg', type: 'Power Armor', physRes: 5, enerRes: 3, radRes: 8, hp: 9, locations: ['Leg'], weight: 10, cost: 105, rarity: 3, source: 'Wanderers' },
  { key: 'hellcat_helmet', label: 'Hellcat Helmet', type: 'Power Armor', physRes: 6, enerRes: 4, radRes: 8, hp: 9, locations: ['Head'], weight: 8, cost: 65, rarity: 3, special: '+1 Physical DR against ranged attacks (full suit).', source: 'Wanderers' },
  { key: 't65_chest', label: 'T-65 Chest Piece', type: 'Power Armor', physRes: 10, enerRes: 9, radRes: 9, hp: 22, locations: ['Torso'], weight: 15, cost: 230, rarity: 5, source: 'Wanderers' },
  { key: 't65_arm', label: 'T-65 Arm', type: 'Power Armor', physRes: 7, enerRes: 6, radRes: 8, hp: 10, locations: ['Arm'], weight: 12, cost: 160, rarity: 5, source: 'Wanderers' },
  { key: 't65_leg', label: 'T-65 Leg', type: 'Power Armor', physRes: 7, enerRes: 6, radRes: 8, hp: 10, locations: ['Leg'], weight: 14, cost: 160, rarity: 5, source: 'Wanderers' },
  { key: 't65_helmet', label: 'T-65 Helmet', type: 'Power Armor', physRes: 9, enerRes: 7, radRes: 8, hp: 12, locations: ['Head'], weight: 11, cost: 100, rarity: 5, source: 'Wanderers' },
];

export const WANDERERS_DAMAGE_EFFECTS = [
  // Arc and Freeze already defined in Settlers supplement
];

export const LEGENDARY_WEAPON_PROPERTIES = [
  { key: 'assassins', label: "Assassin's", appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Against human characters, attacks gain the Vicious damage effect (or +2 damage per Effect if already Vicious).' },
  { key: 'berserkers', label: "Berserker's", appliesTo: ['Melee', 'Unarmed'], description: 'When wielded by a character with less than 6 Physical damage resistance on their torso, inflicts +1 CD damage for every point of Physical resistance below 6.' },
  { key: 'blazing', label: 'Blazing', appliesTo: ['Melee'], description: 'When the wielder uses the Defend action and is missed by a melee attack, the attacker immediately suffers 4 CD Persistent Energy damage.' },
  { key: 'bloodied', label: 'Bloodied', appliesTo: ['Melee', 'Unarmed'], description: 'Inflicts +1 CD below max HP; +2 CD below 3/4 HP; +3 CD below 1/2 HP; +4 CD below 1/4 HP.' },
  { key: 'cavaliers', label: "Cavalier's", appliesTo: ['Melee', 'Unarmed'], description: 'When the wielder takes the Defend or Sprint actions, gain +2 Physical damage resistance until start of next turn.' },
  { key: 'charged', label: 'Charged', appliesTo: ['Melee'], description: 'When the wielder uses the Defend action and is missed by a melee attack, the attacker immediately suffers 4 CD Stun Energy damage.' },
  { key: 'crippling', label: 'Crippling', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: "When used to attack a target's arm or leg, causes an injury if it inflicts 4 or more damage in one hit (after damage resistance)." },
  { key: 'deadeye', label: 'Deadeye', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns'], description: 'When you take the Aim action, additional minor and major actions cost 1 AP less for the rest of your turn (does not stack with Jet).' },
  { key: 'defiant', label: 'Defiant', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns'], description: 'Once per scene, when you spend the maximum ammo for Fire Rate, you may declare the weapon Empty: +2 CD damage but must reload before firing again.' },
  { key: 'duelists', label: "Duelist's", appliesTo: ['Melee', 'Unarmed'], description: 'When the wielder uses Defend and is missed by a melee attack, roll 1 CD. On an Effect, the attacker is disarmed.' },
  { key: 'enraging', label: 'Enraging', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'When this weapon inflicts damage on an enemy, spend 1 Luck point to enrage them: they must attack the nearest enemy for the rest of the scene.' },
  { key: 'explosive', label: 'Explosive', appliesTo: ['Small Guns'], description: 'Each Effect on the damage roll hits a secondary target within Close range for half the damage. Closest targets (within Reach) are hit first.' },
  { key: 'exterminators', label: "Exterminator's", appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Against insects, arachnids, and mirelurks, attacks gain Vicious (or +2 per Effect if already Vicious).' },
  { key: 'freezing', label: 'Freezing', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Spend 1 Luck point when attacking to add the Freeze damage effect.' },
  { key: 'frigid', label: 'Frigid', appliesTo: ['Melee'], description: 'When the wielder uses Defend and is missed by a melee attack, the attacker immediately suffers 4 CD Freeze Energy damage.' },
  { key: 'furious', label: 'Furious', appliesTo: ['Melee', 'Unarmed'], description: 'When attacking an enemy who has already been hit by this weapon this scene, add +1 CD damage (cumulative).' },
  { key: 'ghoul_slayers', label: "Ghoul Slayer's", appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Against ghouls, attacks gain Vicious (or +2 per Effect if already Vicious).' },
  { key: 'hitmans', label: "Hitman's", appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns'], description: 'When you take the Aim action, inflict +1 CD damage (stacks with Accurate quality).' },
  { key: 'hunters', label: "Hunter's", appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Against mammals and lizards, attacks gain Vicious (or +2 per Effect if already Vicious).' },
  { key: 'incendiary', label: 'Incendiary', appliesTo: ['Small Guns'], description: 'This weapon gains the Persistent (Energy) damage effect.' },
  { key: 'instigating', label: 'Instigating', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'When attacking a target at their maximum HP, the weapon inflicts +3 CD damage.' },
  { key: 'irradiated', label: 'Irradiated', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'The weapon gains the Radioactive damage effect.' },
  { key: 'junkies', label: "Junkie's", appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Inflicts +1 CD damage for each addiction you are currently suffering from.' },
  { key: 'kneecapper', label: 'Kneecapper', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: "When attacking a target's leg, causes a critical hit if it inflicts 3 or more damage (after damage resistance)." },
  { key: 'lucky', label: 'Lucky', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'After using this weapon to attack, if you spent Luck points to re-roll dice, roll 1 CD: on an Effect, regain 1 spent Luck point.' },
  { key: 'mighty', label: 'Mighty', appliesTo: ['Melee', 'Unarmed'], description: 'Attacks with this weapon inflict +2 CD damage.' },
  { key: 'mutant_slayers', label: "Mutant Slayer's", appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Against super mutants, attacks gain Vicious (or +2 per Effect if already Vicious).' },
  { key: 'nimble', label: 'Nimble', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns'], description: 'When you take the Aim action, you may also take a free Move minor action.' },
  { key: 'nocturnal', label: 'Nocturnal', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Between sunset and sunrise, attacks gain Vicious (or +2 per Effect if already Vicious).' },
  { key: 'penetrating', label: 'Penetrating', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Attacks gain Piercing 2, or +2 to existing Piercing X rating.' },
  { key: 'plasma_infused', label: 'Plasma Infused', appliesTo: ['Small Guns'], description: '+2 CD damage; weapon deals both Physical and Energy damage. Reduce total by whichever resistance is lower.' },
  { key: 'poisoners', label: "Poisoner's", appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Attacks gain the Persistent (Poison) damage effect.' },
  { key: 'powerful', label: 'Powerful', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns'], description: 'Attacks inflict +2 CD damage.' },
  { key: 'quickdraw', label: 'Quickdraw', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Drawing this weapon with the Draw Item minor action does not count as one of your minor actions for the turn and costs no AP.' },
  { key: 'rapid', label: 'Rapid', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns'], description: 'This weapon gains +3 Fire Rate (can exceed 6).' },
  { key: 'relentless', label: 'Relentless', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'When you inflict a critical hit, spend 1 Luck point to immediately regain all AP spent on that attack.' },
  { key: 'sentinels_w', label: "Sentinel's", appliesTo: ['Melee', 'Unarmed'], description: '+2 Physical and Energy damage resistance so long as you did not move in your previous turn. +3 if the weapon has the Parry quality.' },
  { key: 'staggering', label: 'Staggering', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'This weapon gains the Stun damage effect.' },
  { key: 'stalkers', label: "Stalker's", appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns'], description: 'When making a sneak attack with only an Aim minor action taken this turn, you may replace 1d20 in your pool with a d20 that counts as rolling a 1.' },
  { key: 'steadfast', label: 'Steadfast', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns'], description: 'When you take the Aim action, increase your Physical damage resistance by +2 until the start of your next turn.' },
  { key: 'troubleshooters_w', label: "Troubleshooter's", appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'Against robots, attacks gain Vicious (or +2 per Effect if already Vicious).' },
  { key: 'two_shot', label: 'Two-Shot', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns'], description: 'Gains Vicious and +2 CD damage, but gains Ammo-Hungry (2).' },
  { key: 'violent', label: 'Violent', appliesTo: ['Small Guns'], description: '+2 CD damage; causes an injury if it inflicts 4+ damage in one hit. Gains Recoil (7) or +1 to existing Recoil.' },
  { key: 'wounding', label: 'Wounding', appliesTo: ['Small Guns', 'Energy Weapons', 'Big Guns', 'Melee', 'Unarmed'], description: 'The weapon gains the Persistent (Physical) damage effect.' },
];

export const LEGENDARY_ARMOR_PROPERTIES = [
  { key: 'acrobats', label: "Acrobat's", appliesTo: ['Leg'], description: 'Halve falling damage after resistance. With two pieces, take no falling damage.' },
  { key: 'assassins_a', label: "Assassin's", appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: '+2 Physical and Energy damage resistance against attacks from human enemies.' },
  { key: 'auto_stim', label: 'Auto Stim', appliesTo: ['Torso'], description: 'Once per scene, when HP drops below 1/4 maximum, automatically use a Stimpak (requires one in inventory).' },
  { key: 'bolstering', label: 'Bolstering', appliesTo: ['Torso'], description: '+2 Physical and Energy damage resistance to all locations when below half HP. +3 below 1/4 HP.' },
  { key: 'cavaliers_a', label: "Cavalier's", appliesTo: ['Arm'], description: 'When you take Defend or Sprint, gain +2 Physical damage resistance to all locations until start of next turn.' },
  { key: 'chameleon', label: 'Chameleon', appliesTo: ['Torso'], description: 'While hidden and not moving, enemies attempting to find you add +1 to their difficulty.' },
  { key: 'champion', label: 'Champion', appliesTo: ['Arm'], description: 'Once per scene, on any STR or END test, take 1d20 from your pool and set it to count as rolling a 1.' },
  { key: 'cloaking', label: 'Cloaking', appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: 'Once per scene, when hit by a melee attack, become invisible (functions like Stealth Boy).' },
  { key: 'cryogenic', label: 'Cryogenic', appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: 'Enemy melee attacks increase complication range by 1. On a complication, attacker suffers X CD Freeze Energy damage (X = their damage dice count).' },
  { key: 'cunning', label: 'Cunning', appliesTo: ['Head', 'Leg'], description: 'Once per scene, on any AGI or PER test, take 1d20 from your pool and set it to count as rolling a 1.' },
  { key: 'duelists_a', label: "Duelist's", appliesTo: ['Arm'], description: "Enemy melee attacks increase complication range by 1. On a complication, attacker's weapon is knocked from their hand." },
  { key: 'exterminators_a', label: "Exterminator's", appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: '+2 Physical and Energy damage resistance against insects, arachnids, and mirelurk enemies.' },
  { key: 'ghoul_slayers_a', label: "Ghoul Slayer's", appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: '+2 Physical, Energy, and Radiation damage resistance against ghoul enemies.' },
  { key: 'hunters_a', label: "Hunter's", appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: '+2 Physical and Energy damage resistance against mammal and lizard enemies.' },
  { key: 'incendiary_a', label: 'Incendiary', appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: 'Enemy melee attacks increase complication range by 1. On a complication, attacker suffers X CD Persistent Energy damage (X = their damage dice count).' },
  { key: 'lucky_a', label: 'Lucky', appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: 'Once per day, when spending a Luck point to re-roll a die, instead set it to count as rolling a 1 (d20) or all Effects (CD).' },
  { key: 'martyrs', label: "Martyr's", appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: 'When your HP is below 1/4 maximum, reduce AP cost of extra combat actions by 1 (does not stack with Jet).' },
  { key: 'mutant_slayers_a', label: "Mutant Slayer's", appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: '+2 Physical and Energy damage resistance against super mutant enemies.' },
  { key: 'poisoners_a', label: "Poisoner's", appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: '+4 Poison damage resistance.' },
  { key: 'powered', label: 'Powered', appliesTo: ['Head', 'Arm', 'Leg'], description: 'Add 1 AP to the group pool at the start of each of your turns in combat.' },
  { key: 'punishing', label: 'Punishing', appliesTo: ['Torso', 'Leg'], description: 'When hit by a melee attack, each Effect on the damage roll inflicts 1 damage of the same type back to the attacker.' },
  { key: 'rad_powered', label: 'Rad Powered', appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: 'Once per scene per 5 Radiation damage you have, on a STR test take 1d20 from your pool and set it to count as rolling a 1.' },
  { key: 'safecrackers', label: "Safecracker's", appliesTo: ['Arm'], description: 'Once per scene, on a Lockpick test, take 1d20 from your pool and set it to count as rolling a 1.' },
  { key: 'sentinels_a', label: "Sentinel's", appliesTo: ['Arm'], description: '+3 Physical and Energy damage resistance so long as you did not move in your previous turn.' },
  { key: 'sharp', label: 'Sharp', appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: 'Once per scene, on any INT or CHA test, take 1d20 from your pool and set it to count as rolling a 1.' },
  { key: 'sprinters', label: "Sprinter's", appliesTo: ['Head', 'Leg'], description: 'Reduce AP cost to cross difficult terrain or obstacles by 1 (minimum 0).' },
  { key: 'troubleshooters_a', label: "Troubleshooter's", appliesTo: ['Head', 'Arm', 'Torso', 'Leg'], description: '+2 Physical and Energy damage resistance against robot enemies.' },
  { key: 'unyielding', label: 'Unyielding', appliesTo: ['Torso'], description: 'While your HP are below 1/4 maximum, re-roll 1d20 on any test you attempt.' },
];

export const RARE_BOOKS = [
  { roll: 1, title: '101 Heroic Last Stands', perk: 'Blood Sacrifice!', perkDescription: 'When reduced to 0 HP, all party members and companions gain +2 Physical/Energy damage resistance and regain 4 HP. Ranks 3, Level 6+.' },
  { roll: 2, title: 'Atomic Command (Holotape)', perk: 'Nuclear Proliferator', perkDescription: 'Unlock recipe for a short-lived Lightweight Mini-Nuke (6 CD Radioactive, Blast, Thrown M). Each lasts 6–24 hours depending on rank. Ranks 3, Level 11+.' },
  { roll: 3, title: 'Automatron (Holotape)', perk: 'Electric Absorption', perkDescription: 'Once per scene (per rank), as a robot or in Power Armor, when hit by Energy damage spend 1 Luck point to absorb it: take no damage, regain HP equal to Effects rolled. Ranks 3, Level 9+.' },
  { roll: 4, title: 'Big Book of Science', perk: 'Brawling Chemist', perkDescription: 'Unlocks Super Chem Mk I recipe (+2 CD melee, +3 Physical resistance; lasts 6–24 hours per rank). Ranks 3, Level 11+.' },
  { roll: 5, title: 'Chinese Army: Special Ops Training Manual', perk: 'Follow-Through', perkDescription: 'When you succeed at a ranged sneak attack, all attacks against that enemy until start of your next turn inflict +1/+2/+3 CD damage. Ranks 3, Level 8+.' },
  { roll: 6, title: 'Dress to Survive', perk: 'Funky Duds', perkDescription: 'When wearing a full matching armor set on all locations, gain +5/+8/+10 Poison damage resistance. Ranks 3, Level 7+.' },
  { roll: 7, title: 'Duck and Cover Annual', perk: 'Detonation Contagion', perkDescription: 'When you kill an enemy with a thrown explosive, spend 1 Luck point to make them explode for bonus damage to nearby enemies. Ranks 1, Level 9+.' },
  { roll: 8, title: 'Grognak and the Ruby Ruins (Holotape)', perk: 'Collateral Damage', perkDescription: 'When you kill an enemy with a melee weapon, spend 1 Luck point to make them explode for bonus damage. Ranks 1, Level 9+.' },
  { roll: 9, title: 'Guns and Bullets Annual', perk: 'Ammo Factory', perkDescription: 'When you craft ammunition, double the amount produced. Ranks 1, Level 5+.' },
  { roll: 10, title: 'Hot Summer Fashions', perk: 'Sizzling Style', perkDescription: 'When wearing a full matching armor set, gain +5/+8/+10 Energy damage resistance against fire. Ranks 3, Level 7+.' },
  { roll: 11, title: 'Journal of Internal Medicine', perk: 'Survival Shortcut', perkDescription: 'Unlocks Survival Syringe recipe (heals 4 HP, cures all illness, restores Hunger/Thirst to full). Ranks 3, Level 11+.' },
  { roll: 12, title: 'Nikola Tesla and You', perk: 'Power Armor Reboot', perkDescription: 'Once per day, if reduced to 0 HP in Power Armor, spend 1 Luck point to be revived at full HP with half Power Armor HP restored. Ranks 1, Level 10+.' },
  { roll: 13, title: 'Pipfall (Holotape)', perk: 'What Rads?', perkDescription: 'Radiation damage resistance +5. Also heal 1 Radiation damage each time you heal one or more HP. Ranks 1, Level 9+.' },
  { roll: 14, title: 'Pugilism Illustrated', perk: 'Exploding Palm', perkDescription: 'When making a melee unarmed attack, spend 1 AP to make it Exploding Palm: each Effect hits one nearby enemy for 3/4/5 CD physical damage. Ranks 3, Level 9+.' },
  { roll: 15, title: 'Red Menace (Holotape)', perk: 'Power Sprinter', perkDescription: 'While in Power Armor, reduce AP cost to move through difficult terrain by 2 (min 0). Ranks 1, Level 8+.' },
  { roll: 16, title: 'Scout Handbook', perk: 'Botany Buddy', perkDescription: 'When foraging for food, spend 1 Luck point: you and allies regain 4 HP and gain +2 Physical damage resistance until end of next scene. Ranks 1, Level 6+.' },
  { roll: 17, title: 'The Collected Adventures of Grognak the Barbarian', perk: 'Hack and Slash', perkDescription: 'When you kill an enemy with a melee weapon, spend AP to hit 1/2/3 additional enemies within Reach. Ranks 3, Level 8+.' },
  { roll: 18, title: 'The Pointy End: A Guide to Swords', perk: 'Arms Breaking', perkDescription: 'In Power Armor or as super mutant, spend 3/2/1 AP after a successful melee hit to break the target\'s weapon. Ranks 3, Level 7+.' },
  { roll: 19, title: 'U.S. Army: 30 Handy Flamethrower Recipes', perk: 'Far-Flung Fireworks', perkDescription: 'When you kill an enemy with a ranged weapon, spend 1 Luck point to make them explode for bonus damage. Ranks 1, Level 9+.' },
  { roll: 20, title: 'Zeta Invaders (Holotape)', perk: 'Retribution', perkDescription: 'When using Defend and an enemy misses you with a melee attack, regain 2/3/4 HP and add 1/2/3 AP to the group pool. Ranks 3, Level 12+.' },
];

export const CORE_WEAPONS = [
  // Small Guns
  { key: '44_pistol', label: '.44 Pistol', type: 'Small Guns', damage: '6 CD', damageEffect: 'Vicious', damageType: 'Physical', fireRate: 1, range: 'Close', qualities: 'Close Quarters', weight: 4, cost: 99, rarity: 2, ammo: '.44', source: 'Core' },
  { key: '10mm_pistol', label: '10mm Pistol', aliases: ['10mm Auto Pistol', '10mm Automatic Pistol'], type: 'Small Guns', damage: '4 CD', damageEffect: '-', damageType: 'Physical', fireRate: 2, range: 'Close', qualities: 'Close Quarters, Reliable', weight: 4, cost: 50, rarity: 1, ammo: '10mm', source: 'Core' },
  { key: 'flare_gun', label: 'Flare Gun', type: 'Small Guns', damage: '3 CD', damageEffect: '-', damageType: 'Physical', fireRate: 0, range: 'Medium', qualities: 'Reliable', weight: 2, cost: 50, rarity: 1, ammo: 'Flare', source: 'Core' },
  { key: 'assault_rifle', label: 'Assault Rifle', type: 'Small Guns', damage: '5 CD', damageEffect: 'Burst', damageType: 'Physical', fireRate: 2, range: 'Medium', qualities: 'Two-Handed', weight: 13, cost: 144, rarity: 2, ammo: '5.56mm', source: 'Core' },
  { key: 'combat_rifle', label: 'Combat Rifle', type: 'Small Guns', damage: '5 CD', damageEffect: '-', damageType: 'Physical', fireRate: 2, range: 'Medium', qualities: 'Two-Handed', weight: 11, cost: 117, rarity: 2, ammo: '.45', source: 'Core' },
  { key: 'gauss_rifle', label: 'Gauss Rifle', type: 'Small Guns', damage: '10 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: 1, range: 'Long', qualities: 'Two-Handed', weight: 16, cost: 228, rarity: 4, ammo: '2mm EC', source: 'Core' },
  { key: 'hunting_rifle', label: 'Hunting Rifle', type: 'Small Guns', damage: '6 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: 0, range: 'Medium', qualities: 'Two-Handed', weight: 10, cost: 55, rarity: 2, ammo: '.308', source: 'Core' },
  { key: 'submachine_gun', label: 'Submachine Gun', type: 'Small Guns', damage: '3 CD', damageEffect: 'Burst', damageType: 'Physical', fireRate: 3, range: 'Close', qualities: 'Inaccurate, Two-Handed', weight: 12, cost: 109, rarity: 1, ammo: '10mm', source: 'Core' },
  { key: 'combat_shotgun', label: 'Combat Shotgun', type: 'Small Guns', damage: '5 CD', damageEffect: 'Spread', damageType: 'Physical', fireRate: 2, range: 'Close', qualities: 'Inaccurate, Two-Handed', weight: 11, cost: 87, rarity: 2, ammo: 'Shotgun Shells', source: 'Core' },
  { key: 'double_barrel_shotgun', label: 'Double-Barrel Shotgun', type: 'Small Guns', damage: '5 CD', damageEffect: 'Spread, Vicious', damageType: 'Physical', fireRate: 0, range: 'Close', qualities: 'Inaccurate, Two-Handed', weight: 9, cost: 39, rarity: 1, ammo: 'Shotgun Shells', source: 'Core' },
  { key: 'pipe_bolt_action', label: 'Pipe Bolt-Action', aliases: ['Pipe Bolt Action', 'Pipe Bolt-Action Rifle', 'Bolt-Action Pipe Gun'], type: 'Small Guns', damage: '5 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: 0, range: 'Close', qualities: 'Unreliable', weight: 3, cost: 30, rarity: 0, ammo: '.38', source: 'Core' },
  { key: 'pipe_gun', label: 'Pipe Gun', aliases: ['Pipe Rifle', 'Pipe Pistol'], type: 'Small Guns', damage: '3 CD', damageEffect: '-', damageType: 'Physical', fireRate: 2, range: 'Close', qualities: 'Close Quarters, Unreliable', weight: 2, cost: 30, rarity: 0, ammo: '.38', source: 'Core' },
  { key: 'pipe_revolver', label: 'Pipe Revolver', type: 'Small Guns', damage: '4 CD', damageEffect: '-', damageType: 'Physical', fireRate: 1, range: 'Close', qualities: 'Close Quarters, Unreliable', weight: 4, cost: 25, rarity: 0, ammo: '.38', source: 'Core' },
  { key: 'railway_rifle', label: 'Railway Rifle', type: 'Small Guns', damage: '10 CD', damageEffect: 'Breaking', damageType: 'Physical', fireRate: 0, range: 'Medium', qualities: 'Debilitating, Two-Handed, Unreliable', weight: 14, cost: 290, rarity: 4, ammo: 'Railway Spikes', source: 'Core' },
  { key: 'syringer', label: 'Syringer', type: 'Small Guns', damage: '3 CD', damageEffect: '-', damageType: 'Physical', fireRate: 0, range: 'Medium', qualities: 'Two-Handed', weight: 6, cost: 132, rarity: 2, ammo: 'Syringer Ammo', source: 'Core' },
  // Energy Weapons
  { key: 'institute_laser', label: 'Institute Laser', aliases: ['Institute Laser Pistol', 'Institute Laser Rifle'], type: 'Energy Weapons', damage: '3 CD', damageEffect: 'Burst', damageType: 'Energy', fireRate: 3, range: 'Close', qualities: 'Close Quarters, Inaccurate', weight: 4, cost: 50, rarity: 2, ammo: 'Fusion Cell', source: 'Core' },
  { key: 'laser_musket', label: 'Laser Musket', type: 'Energy Weapons', damage: '5 CD', damageEffect: 'Piercing 1', damageType: 'Energy', fireRate: 0, range: 'Medium', qualities: 'Two-Handed', weight: 13, cost: 57, rarity: 1, ammo: 'Fusion Cell', source: 'Core', note: 'Consumes 2 Fusion Cells per shot.' },
  { key: 'laser_gun', label: 'Laser Gun', aliases: ['Laser Pistol', 'Laser Rifle'], type: 'Energy Weapons', damage: '4 CD', damageEffect: 'Piercing 1', damageType: 'Energy', fireRate: 2, range: 'Close', qualities: 'Close Quarters', weight: 4, cost: 69, rarity: 2, ammo: 'Fusion Cell', source: 'Core' },
  { key: 'plasma_gun', label: 'Plasma Gun', aliases: ['Plasma Pistol', 'Plasma Rifle'], type: 'Energy Weapons', damage: '6 CD', damageEffect: '-', damageType: 'Physical/Energy', fireRate: 1, range: 'Close', qualities: 'Close Quarters', weight: 4, cost: 123, rarity: 3, ammo: 'Plasma Cartridge', source: 'Core', note: 'Reduce total by lower resistance.' },
  { key: 'gamma_gun', label: 'Gamma Gun', type: 'Energy Weapons', damage: '3 CD', damageEffect: 'Piercing 1, Stun', damageType: 'Radiation', fireRate: 1, range: 'Medium', qualities: 'Blast, Inaccurate', weight: 3, cost: 156, rarity: 5, ammo: 'Gamma Rounds', source: 'Core' },
  // Big Guns
  { key: 'fat_man', label: 'Fat Man', type: 'Big Guns', damage: '21 CD', damageEffect: 'Breaking, Radioactive, Vicious', damageType: 'Physical', fireRate: 0, range: 'Medium', qualities: 'Blast, Inaccurate, Two-Handed', weight: 31, cost: 512, rarity: 4, ammo: 'Mini-Nuke', source: 'Core' },
  { key: 'flamer', label: 'Flamer', type: 'Big Guns', damage: '3 CD', damageEffect: 'Burst, Persistent, Spread', damageType: 'Energy', fireRate: 4, range: 'Close', qualities: 'Debilitating, Inaccurate, Two-Handed', weight: 16, cost: 137, rarity: 3, ammo: 'Flamer Fuel', source: 'Core' },
  { key: 'gatling_laser', label: 'Gatling Laser', type: 'Big Guns', damage: '3 CD', damageEffect: 'Burst, Piercing 1', damageType: 'Energy', fireRate: 6, range: 'Medium', qualities: 'Gatling, Inaccurate, Two-Handed', weight: 19, cost: 804, rarity: 3, ammo: 'Fusion Core', source: 'Core' },
  { key: 'heavy_incinerator', label: 'Heavy Incinerator', type: 'Big Guns', damage: '5 CD', damageEffect: 'Burst, Persistent, Spread', damageType: 'Energy', fireRate: 3, range: 'Medium', qualities: 'Debilitating, Two-Handed', weight: 20, cost: 350, rarity: 4, ammo: 'Flamer Fuel', source: 'Core' },
  { key: 'junk_jet', label: 'Junk Jet', type: 'Big Guns', damage: '6 CD', damageEffect: '-', damageType: 'Physical', fireRate: 1, range: 'Medium', qualities: 'Two-Handed', weight: 30, cost: 285, rarity: 3, ammo: 'Junk', source: 'Core' },
  { key: 'minigun', label: 'Minigun', type: 'Big Guns', damage: '3 CD', damageEffect: 'Burst, Spread', damageType: 'Physical', fireRate: 5, range: 'Medium', qualities: 'Gatling, Inaccurate, Two-Handed', weight: 27, cost: 382, rarity: 2, ammo: '5mm', source: 'Core' },
  { key: 'missile_launcher', label: 'Missile Launcher', type: 'Big Guns', damage: '11 CD', damageEffect: '-', damageType: 'Physical', fireRate: 0, range: 'Long', qualities: 'Blast, Two-Handed', weight: 21, cost: 314, rarity: 4, ammo: 'Missile', source: 'Core' },
  // Melee / Unarmed
  { key: 'unarmed_strike', label: 'Unarmed Strike', type: 'Unarmed', damage: '2 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 0, cost: 0, rarity: 0, source: 'Core' },
  { key: 'handy_rock', label: 'Handy Rock', type: 'Unarmed', damage: '2 CD', damageEffect: 'Vicious', damageType: 'Physical', range: 'Melee', qualities: 'Thrown (C)', weight: 1, cost: 0, rarity: 0, source: 'Core' },
  { key: 'boxing_glove', label: 'Boxing Glove', type: 'Unarmed', damage: '3 CD', damageEffect: 'Stun', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 1, cost: 10, rarity: 1, source: 'Core' },
  { key: 'deathclaw_gauntlet', label: 'Deathclaw Gauntlet', type: 'Unarmed', damage: '5 CD', damageEffect: 'Piercing 1', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 10, cost: 75, rarity: 3, source: 'Core' },
  { key: 'knuckles', label: 'Knuckles', type: 'Unarmed', damage: '3 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: 'Concealed', weight: 0.5, cost: 10, rarity: 1, source: 'Core' },
  { key: 'power_fist', label: 'Power Fist', type: 'Unarmed', damage: '4 CD', damageEffect: 'Stun', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 4, cost: 100, rarity: 2, source: 'Core' },
  { key: 'sword', label: 'Sword', type: 'Melee', damage: '4 CD', damageEffect: 'Piercing 1', damageType: 'Physical', range: 'Melee', qualities: 'Parry', weight: 3, cost: 50, rarity: 2, source: 'Core' },
  { key: 'combat_knife', label: 'Combat Knife', type: 'Melee', damage: '3 CD', damageEffect: 'Piercing 1', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 1, cost: 25, rarity: 1, source: 'Core' },
  { key: 'machete', label: 'Machete', type: 'Melee', damage: '3 CD', damageEffect: 'Piercing 1', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 2, cost: 25, rarity: 1, source: 'Core' },
  { key: 'ripper', label: 'Ripper', type: 'Melee', damage: '4 CD', damageEffect: 'Vicious', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 6, cost: 50, rarity: 2, source: 'Core' },
  { key: 'shishkebab', label: 'Shishkebab', type: 'Melee', damage: '5 CD', damageEffect: 'Piercing 1', damageType: 'Energy', range: 'Melee', qualities: 'Parry', weight: 3, cost: 200, rarity: 3, source: 'Core' },
  { key: 'switchblade', label: 'Switchblade', type: 'Melee', damage: '2 CD', damageEffect: 'Piercing 1', damageType: 'Physical', range: 'Melee', qualities: 'Concealed', weight: 1, cost: 20, rarity: 0, source: 'Core' },
  { key: 'baseball_bat', label: 'Baseball Bat', type: 'Melee', damage: '4 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: 'Two-Handed', weight: 3, cost: 25, rarity: 1, source: 'Core' },
  { key: 'aluminum_bat', label: 'Aluminum Baseball Bat', type: 'Melee', damage: '5 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: 'Two-Handed', weight: 2, cost: 32, rarity: 2, source: 'Core' },
  { key: 'board', label: 'Board', type: 'Melee', damage: '4 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: 'Two-Handed', weight: 3, cost: 20, rarity: 0, source: 'Core' },
  { key: 'lead_pipe', label: 'Lead Pipe', type: 'Melee', damage: '3 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 3, cost: 15, rarity: 0, source: 'Core' },
  { key: 'pipe_wrench', label: 'Pipe Wrench', type: 'Melee', damage: '3 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 2, cost: 30, rarity: 1, source: 'Core' },
  { key: 'pool_cue', label: 'Pool Cue', type: 'Melee', damage: '3 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: 'Two-Handed', weight: 1, cost: 10, rarity: 0, source: 'Core' },
  { key: 'rolling_pin', label: 'Rolling Pin', type: 'Melee', damage: '3 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 1, cost: 10, rarity: 0, source: 'Core' },
  { key: 'baton', label: 'Baton', type: 'Melee', damage: '3 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 2, cost: 15, rarity: 1, source: 'Core' },
  { key: 'sledgehammer', label: 'Sledgehammer', type: 'Melee', damage: '5 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 12, cost: 40, rarity: 2, source: 'Core' },
  { key: 'super_sledge', label: 'Super Sledge', type: 'Melee', damage: '6 CD', damageEffect: 'Breaking', damageType: 'Physical', range: 'Melee', qualities: 'Two-Handed', weight: 20, cost: 180, rarity: 3, source: 'Core' },
  { key: 'tire_iron', label: 'Tire Iron', type: 'Melee', damage: '3 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 2, cost: 25, rarity: 1, source: 'Core' },
  { key: 'walking_cane', label: 'Walking Cane', type: 'Melee', damage: '3 CD', damageEffect: '-', damageType: 'Physical', range: 'Melee', qualities: '-', weight: 2, cost: 10, rarity: 0, source: 'Core' },
  // Throwing
  { key: 'throwing_knives', label: 'Throwing Knives', type: 'Throwing', damage: '3 CD', damageEffect: 'Piercing 1', damageType: 'Physical', range: 'Close', qualities: 'Concealed, Suppressed, Thrown (C)', weight: 0.5, cost: 10, rarity: 1, source: 'Core' },
  { key: 'tomahawk', label: 'Tomahawk', type: 'Throwing', damage: '4 CD', damageEffect: 'Piercing 1', damageType: 'Physical', range: 'Close', qualities: 'Suppressed, Thrown (C)', weight: 0.5, cost: 15, rarity: 2, source: 'Core' },
  { key: 'javelin', label: 'Javelin', type: 'Throwing', damage: '4 CD', damageEffect: 'Piercing 1', damageType: 'Physical', range: 'Medium', qualities: 'Suppressed, Thrown (M)', weight: 4, cost: 10, rarity: 1, source: 'Core' },
  // Explosives
  { key: 'baseball_grenade', label: 'Baseball Grenade', type: 'Explosive', damage: '5 CD', damageEffect: '-', damageType: 'Physical', range: 'Thrown', qualities: 'Blast, Thrown (M)', weight: 1, cost: 40, rarity: 1, source: 'Core' },
  { key: 'frag_grenade', label: 'Frag Grenade', type: 'Explosive', damage: '6 CD', damageEffect: '-', damageType: 'Physical', range: 'Thrown', qualities: 'Blast, Thrown (M)', weight: 0.5, cost: 50, rarity: 2, source: 'Core' },
  { key: 'molotov_cocktail', label: 'Molotov Cocktail', type: 'Explosive', damage: '4 CD', damageEffect: 'Persistent', damageType: 'Energy', range: 'Thrown', qualities: 'Blast, Thrown (M)', weight: 1, cost: 20, rarity: 1, source: 'Core' },
  { key: 'nuka_grenade', label: 'Nuka-Grenade', type: 'Explosive', damage: '9 CD', damageEffect: 'Breaker, Radioactive, Vicious', damageType: 'Energy', range: 'Thrown', qualities: 'Blast, Thrown (M)', weight: 1, cost: 100, rarity: 4, source: 'Core' },
  { key: 'plasma_grenade', label: 'Plasma Grenade', type: 'Explosive', damage: '9 CD', damageEffect: '-', damageType: 'Energy', range: 'Thrown', qualities: 'Blast, Thrown (M)', weight: 0.5, cost: 135, rarity: 3, source: 'Core', note: 'Physical/Energy; reduce by lower resistance.' },
  { key: 'pulse_grenade', label: 'Pulse Grenade', type: 'Explosive', damage: '6 CD', damageEffect: 'Stun', damageType: 'Energy', range: 'Thrown', qualities: 'Blast, Thrown (M)', weight: 0.5, cost: 100, rarity: 3, source: 'Core', note: 'Only damages robots, synths, Power Armor, and mechanical targets.' },
  { key: 'bottlecap_mine', label: 'Bottlecap Mine', type: 'Explosive', damage: '6 CD', damageEffect: '-', damageType: 'Physical', range: 'Placed', qualities: 'Blast, Mine', weight: 1, cost: 75, rarity: 2, source: 'Core', note: 'Every 10 caps added: +1 CD.' },
  { key: 'frag_mine', label: 'Frag Mine', type: 'Explosive', damage: '6 CD', damageEffect: '-', damageType: 'Physical', range: 'Placed', qualities: 'Blast, Mine', weight: 1, cost: 50, rarity: 2, source: 'Core' },
  { key: 'nuke_mine', label: 'Nuke Mine', type: 'Explosive', damage: '9 CD', damageEffect: 'Breaker, Radioactive, Vicious', damageType: 'Energy', range: 'Placed', qualities: 'Blast, Mine', weight: 1, cost: 100, rarity: 4, source: 'Core' },
  { key: 'plasma_mine', label: 'Plasma Mine', type: 'Explosive', damage: '9 CD', damageEffect: '-', damageType: 'Energy', range: 'Placed', qualities: 'Blast, Mine', weight: 0.5, cost: 135, rarity: 3, source: 'Core', note: 'Physical/Energy; reduce by lower resistance.' },
  { key: 'pulse_mine', label: 'Pulse Mine', type: 'Explosive', damage: '6 CD', damageEffect: 'Stun', damageType: 'Energy', range: 'Placed', qualities: 'Blast, Mine', weight: 0.5, cost: 100, rarity: 3, source: 'Core', note: 'Only damages robots, synths, Power Armor, and mechanical targets.' },
];

export const CORE_AMMO = [
  { key: '10mm', label: '10mm', weight: '<1', cost: 1, rarity: 1, source: 'Core' },
  { key: '38', label: '.38', weight: '<1', cost: 1, rarity: 0, source: 'Core' },
  { key: '44', label: '.44', weight: '<1', cost: 2, rarity: 2, source: 'Core' },
  { key: '45', label: '.45', weight: '<1', cost: 1, rarity: 1, source: 'Core' },
  { key: '308', label: '.308', weight: '<1', cost: 2, rarity: 2, source: 'Core' },
  { key: '50_caliber', label: '.50 Caliber', weight: '<1', cost: 2, rarity: 3, source: 'Core' },
  { key: '5mm', label: '5mm', weight: '<1', cost: 1, rarity: 1, source: 'Core' },
  { key: '5_56mm', label: '5.56mm', weight: '<1', cost: 1, rarity: 1, source: 'Core' },
  { key: '2mm_ec', label: '2mm EC', weight: '<1', cost: 8, rarity: 4, source: 'Core' },
  { key: 'fusion_cell', label: 'Fusion Cell', weight: '<1', cost: 3, rarity: 2, source: 'Core' },
  { key: 'fusion_core', label: 'Fusion Core', weight: 4, cost: 50, rarity: 3, source: 'Core', note: '500 charges for Power Armor or Gatling Laser.' },
  { key: 'plasma_cartridge', label: 'Plasma Cartridge', weight: '<1', cost: 5, rarity: 3, source: 'Core' },
  { key: 'gamma_rounds', label: 'Gamma Rounds', weight: '<1', cost: 4, rarity: 4, source: 'Core' },
  { key: 'flamer_fuel', label: 'Flamer Fuel', weight: '<1', cost: 3, rarity: 2, source: 'Core' },
  { key: 'mini_nuke', label: 'Mini-Nuke', weight: 4, cost: 125, rarity: 5, source: 'Core' },
  { key: 'missile', label: 'Missile', weight: 6, cost: 50, rarity: 3, source: 'Core' },
  { key: 'shotgun_shells', label: 'Shotgun Shells', weight: '<1', cost: 1, rarity: 1, source: 'Core' },
  { key: 'railway_spikes', label: 'Railway Spikes', weight: '<1', cost: 1, rarity: 2, source: 'Core' },
  { key: 'syringer_ammo', label: 'Syringer Ammo', weight: '<1', cost: 5, rarity: 2, source: 'Core' },
];

export const CORE_APPAREL = [
  // Clothing
  { key: 'bos_uniform', label: 'Brotherhood of Steel Uniform', type: 'Clothing', physRes: 1, enerRes: 1, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 2, cost: 20, rarity: 2, source: 'Core' },
  { key: 'casual_clothing', label: 'Casual Clothing', type: 'Clothing', physRes: 0, enerRes: 0, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 2, cost: 20, rarity: 1, special: 'Re-roll 1d20 on one STR or AGI test per scene. Can be reinforced with Ballistic Weave.', source: 'Core' },
  { key: 'harness', label: 'Harness', type: 'Clothing', physRes: 0, enerRes: 0, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 1, cost: 5, rarity: 0, source: 'Core' },
  { key: 'military_fatigues', label: 'Military Fatigues', type: 'Clothing', physRes: 0, enerRes: 1, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 3, cost: 12, rarity: 1, special: 'Re-roll 1d20 on one STR or AGI test per scene. Can be reinforced with Ballistic Weave.', source: 'Core' },
  { key: 'road_leathers', label: 'Road Leathers', type: 'Clothing', physRes: 1, enerRes: 1, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 1, cost: 5, rarity: 1, source: 'Core' },
  { key: 'tough_clothing', label: 'Tough Clothing', type: 'Clothing', physRes: 1, enerRes: 1, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 3, cost: 20, rarity: 1, source: 'Core' },
  { key: 'vault_jumpsuit', label: 'Vault Jumpsuit', type: 'Clothing', physRes: 0, enerRes: 1, radRes: 2, locations: ['Arms', 'Legs', 'Torso'], weight: 1, cost: 20, rarity: 2, special: 'Can be fitted with Lining mods.', source: 'Core' },
  // Outfits
  { key: 'bos_fatigues', label: 'Brotherhood of Steel Fatigues', type: 'Outfit', physRes: 2, enerRes: 2, radRes: 2, locations: ['Arms', 'Legs', 'Torso'], weight: 4, cost: 20, rarity: 3, source: 'Core' },
  { key: 'bos_scribes_armor', label: "Brotherhood Scribe's Armor", type: 'Outfit', physRes: 1, enerRes: 2, radRes: 2, locations: ['Arms', 'Legs', 'Torso'], weight: 4, cost: 20, rarity: 2, source: 'Core' },
  { key: 'cage_armor', label: 'Cage Armor', type: 'Outfit', physRes: 3, enerRes: 4, radRes: 0, locations: ['Head', 'Arms', 'Legs', 'Torso'], weight: 33, cost: 110, rarity: 3, source: 'Core' },
  { key: 'drifter_outfit', label: 'Drifter Outfit', type: 'Outfit', physRes: 1, enerRes: 2, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 10, cost: 35, rarity: 1, source: 'Core' },
  { key: 'engineers_armor', label: "Engineer's Armor", type: 'Outfit', physRes: 1, enerRes: 1, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 2, cost: 15, rarity: 1, source: 'Core' },
  { key: 'formal_clothing', label: 'Formal Clothing', type: 'Outfit', physRes: 0, enerRes: 0, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 2, cost: 30, rarity: 2, special: 'Re-roll 1d20 on one CHA test per scene. Can be reinforced with Ballistic Weave.', source: 'Core' },
  { key: 'hazmat_suit', label: 'Hazmat Suit', type: 'Outfit', physRes: 0, enerRes: 0, radRes: 99, locations: ['Head', 'Arms', 'Legs', 'Torso'], weight: 5, cost: 85, rarity: 3, special: 'Essentially immune to radiation damage.', source: 'Core' },
  { key: 'heavy_coat', label: 'Heavy Coat', type: 'Outfit', physRes: 1, enerRes: 1, radRes: 1, locations: ['Arms', 'Legs', 'Torso'], weight: 2, cost: 20, rarity: 1, special: 'Re-roll 1d20 on one END test per scene. Can be reinforced with Ballistic Weave.', source: 'Core' },
  { key: 'hides', label: 'Hides', type: 'Outfit', physRes: 1, enerRes: 0, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 4, cost: 13, rarity: 0, source: 'Core' },
  { key: 'lab_coat', label: 'Lab Coat', type: 'Outfit', physRes: 0, enerRes: 0, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 2, cost: 10, rarity: 1, special: 'Re-roll 1d20 on one INT test per scene. Can be reinforced with Ballistic Weave.', source: 'Core' },
  { key: 'spike_armor', label: 'Spike Armor', type: 'Outfit', physRes: 2, enerRes: 2, radRes: 0, locations: ['Head', 'Arms', 'Legs', 'Torso'], weight: 17, cost: 65, rarity: 2, source: 'Core' },
  { key: 'utility_coveralls', label: 'Utility Coveralls', type: 'Outfit', physRes: 2, enerRes: 0, radRes: 0, locations: ['Arms', 'Legs', 'Torso'], weight: 2, cost: 12, rarity: 1, special: '+5 carry weight.', source: 'Core' },
  // Headgear
  { key: 'army_helmet', label: 'Army Helmet', type: 'Headgear', physRes: 2, enerRes: 0, radRes: 0, locations: ['Head'], weight: 3, cost: 20, rarity: 1, source: 'Core' },
  { key: 'bos_hood', label: 'Brotherhood of Steel Hood', type: 'Headgear', physRes: 0, enerRes: 1, radRes: 0, locations: ['Head'], weight: 0.5, cost: 12, rarity: 2, source: 'Core' },
  { key: 'bos_scribes_hat', label: "Brotherhood Scribe's Hat", type: 'Headgear', physRes: 0, enerRes: 2, radRes: 0, locations: ['Head'], weight: 0.5, cost: 8, rarity: 2, source: 'Core' },
  { key: 'casual_hat', label: 'Casual Hat', type: 'Headgear', physRes: 0, enerRes: 0, radRes: 0, locations: ['Head'], weight: 0.5, cost: 15, rarity: 1, special: 'Ignore difficulty from extremely bright light.', source: 'Core' },
  { key: 'formal_hat', label: 'Formal Hat', type: 'Headgear', physRes: 0, enerRes: 0, radRes: 0, locations: ['Head'], weight: 0.5, cost: 15, rarity: 2, special: 'Re-roll 1d20 on one CHA test per scene.', source: 'Core' },
  { key: 'gas_mask', label: 'Gas Mask', type: 'Headgear', physRes: 1, enerRes: 0, radRes: 3, locations: ['Head'], weight: 3, cost: 10, rarity: 2, special: '+3 Poison DR vs airborne poisons. +1 Speech difficulty while worn.', source: 'Core' },
  { key: 'hard_hat', label: 'Hard Hat', type: 'Headgear', physRes: 2, enerRes: 0, radRes: 0, locations: ['Head'], weight: 0.5, cost: 15, rarity: 1, source: 'Core' },
  { key: 'hood_or_cowl', label: 'Hood or Cowl', type: 'Headgear', physRes: 1, enerRes: 0, radRes: 1, locations: ['Head'], weight: 2, cost: 5, rarity: 1, source: 'Core' },
  { key: 'sack_hood', label: 'Sack Hood', type: 'Headgear', physRes: 0, enerRes: 0, radRes: 2, locations: ['Head'], weight: 1, cost: 5, rarity: 0, source: 'Core' },
  { key: 'welders_visor', label: "Welder's Visor", type: 'Headgear', physRes: 2, enerRes: 2, radRes: 0, locations: ['Head'], weight: 4, cost: 20, rarity: 2, source: 'Core' },
  // Dog Armor (for Dogmeat)
  { key: 'dog_armor_light', label: 'Dog Armor (Light)', type: 'Dog Armor', physRes: 1, enerRes: 1, radRes: 0, locations: ['Dog'], weight: 2, cost: 15, rarity: 1, special: 'For Dogmeat / canine companions only.', source: 'Core' },
  { key: 'dog_armor_heavy', label: 'Dog Armor (Heavy)', type: 'Dog Armor', physRes: 3, enerRes: 2, radRes: 0, locations: ['Dog'], weight: 4, cost: 40, rarity: 3, special: 'For Dogmeat / canine companions only.', source: 'Core' },
];

export const CORE_ARMOR = [
  // Raider
  { key: 'raider_chest', label: 'Raider Chest Piece', set: 'Raider', type: 'Light Armor', physRes: 1, enerRes: 1, radRes: 0, locations: ['Torso'], weight: 7, cost: 18, rarity: 0, source: 'Core' },
  { key: 'raider_leg', label: 'Raider Leg', set: 'Raider', type: 'Light Armor', physRes: 1, enerRes: 1, radRes: 0, locations: ['Leg'], weight: 3, cost: 8, rarity: 0, source: 'Core' },
  { key: 'raider_arm', label: 'Raider Arm', set: 'Raider', type: 'Light Armor', physRes: 1, enerRes: 1, radRes: 0, locations: ['Arm'], weight: 3, cost: 6, rarity: 0, source: 'Core' },
  { key: 'sturdy_raider_chest', label: 'Sturdy Raider Chest Piece', set: 'Raider', type: 'Light Armor', physRes: 2, enerRes: 2, radRes: 0, locations: ['Torso'], weight: 12, cost: 33, rarity: 1, source: 'Core' },
  { key: 'sturdy_raider_leg', label: 'Sturdy Raider Leg', set: 'Raider', type: 'Light Armor', physRes: 2, enerRes: 2, radRes: 0, locations: ['Leg'], weight: 7, cost: 13, rarity: 1, source: 'Core' },
  { key: 'sturdy_raider_arm', label: 'Sturdy Raider Arm', set: 'Raider', type: 'Light Armor', physRes: 2, enerRes: 2, radRes: 0, locations: ['Arm'], weight: 7, cost: 8, rarity: 1, source: 'Core' },
  { key: 'heavy_raider_chest', label: 'Heavy Raider Chest Piece', set: 'Raider', type: 'Heavy Armor', physRes: 3, enerRes: 3, radRes: 0, locations: ['Torso'], weight: 17, cost: 48, rarity: 2, source: 'Core' },
  { key: 'heavy_raider_leg', label: 'Heavy Raider Leg', set: 'Raider', type: 'Heavy Armor', physRes: 3, enerRes: 3, radRes: 0, locations: ['Leg'], weight: 10, cost: 18, rarity: 2, source: 'Core' },
  { key: 'heavy_raider_arm', label: 'Heavy Raider Arm', set: 'Raider', type: 'Heavy Armor', physRes: 3, enerRes: 3, radRes: 0, locations: ['Arm'], weight: 10, cost: 15, rarity: 2, source: 'Core' },
  // Leather
  { key: 'leather_chest', label: 'Leather Chest Piece', set: 'Leather', type: 'Light Armor', physRes: 1, enerRes: 2, radRes: 0, locations: ['Torso'], weight: 5, cost: 25, rarity: 1, source: 'Core' },
  { key: 'leather_leg', label: 'Leather Leg', set: 'Leather', type: 'Light Armor', physRes: 1, enerRes: 2, radRes: 0, locations: ['Leg'], weight: 2, cost: 10, rarity: 1, source: 'Core' },
  { key: 'leather_arm', label: 'Leather Arm', set: 'Leather', type: 'Light Armor', physRes: 1, enerRes: 2, radRes: 0, locations: ['Arm'], weight: 2, cost: 8, rarity: 1, source: 'Core' },
  { key: 'sturdy_leather_chest', label: 'Sturdy Leather Chest Piece', set: 'Leather', type: 'Light Armor', physRes: 2, enerRes: 3, radRes: 0, locations: ['Torso'], weight: 10, cost: 50, rarity: 2, source: 'Core' },
  { key: 'sturdy_leather_leg', label: 'Sturdy Leather Leg', set: 'Leather', type: 'Light Armor', physRes: 2, enerRes: 3, radRes: 0, locations: ['Leg'], weight: 5, cost: 20, rarity: 2, source: 'Core' },
  { key: 'sturdy_leather_arm', label: 'Sturdy Leather Arm', set: 'Leather', type: 'Light Armor', physRes: 2, enerRes: 3, radRes: 0, locations: ['Arm'], weight: 5, cost: 18, rarity: 2, source: 'Core' },
  { key: 'heavy_leather_chest', label: 'Heavy Leather Chest Piece', set: 'Leather', type: 'Heavy Armor', physRes: 3, enerRes: 4, radRes: 0, locations: ['Torso'], weight: 15, cost: 75, rarity: 3, source: 'Core' },
  { key: 'heavy_leather_leg', label: 'Heavy Leather Leg', set: 'Leather', type: 'Heavy Armor', physRes: 3, enerRes: 4, radRes: 0, locations: ['Leg'], weight: 7, cost: 30, rarity: 3, source: 'Core' },
  { key: 'heavy_leather_arm', label: 'Heavy Leather Arm', set: 'Leather', type: 'Heavy Armor', physRes: 3, enerRes: 4, radRes: 0, locations: ['Arm'], weight: 7, cost: 28, rarity: 3, source: 'Core' },
  // Metal
  { key: 'metal_helmet', label: 'Metal Helmet', set: 'Metal', type: 'Light Armor', physRes: 2, enerRes: 1, radRes: 0, locations: ['Head'], weight: 3, cost: 15, rarity: 1, source: 'Core' },
  { key: 'metal_chest', label: 'Metal Chest Piece', set: 'Metal', type: 'Light Armor', physRes: 2, enerRes: 1, radRes: 0, locations: ['Torso'], weight: 6, cost: 40, rarity: 1, source: 'Core' },
  { key: 'metal_leg', label: 'Metal Leg', set: 'Metal', type: 'Light Armor', physRes: 2, enerRes: 1, radRes: 0, locations: ['Leg'], weight: 3, cost: 15, rarity: 1, source: 'Core' },
  { key: 'metal_arm', label: 'Metal Arm', set: 'Metal', type: 'Light Armor', physRes: 2, enerRes: 1, radRes: 0, locations: ['Arm'], weight: 3, cost: 15, rarity: 1, source: 'Core' },
  { key: 'sturdy_metal_helmet', label: 'Sturdy Metal Helmet', set: 'Metal', type: 'Heavy Armor', physRes: 3, enerRes: 2, radRes: 0, locations: ['Head'], weight: 8, cost: 65, rarity: 2, source: 'Core' },
  { key: 'sturdy_metal_chest', label: 'Sturdy Metal Chest Piece', set: 'Metal', type: 'Heavy Armor', physRes: 3, enerRes: 2, radRes: 0, locations: ['Torso'], weight: 16, cost: 115, rarity: 2, source: 'Core' },
  { key: 'sturdy_metal_leg', label: 'Sturdy Metal Leg', set: 'Metal', type: 'Heavy Armor', physRes: 3, enerRes: 2, radRes: 0, locations: ['Leg'], weight: 8, cost: 65, rarity: 2, source: 'Core' },
  { key: 'sturdy_metal_arm', label: 'Sturdy Metal Arm', set: 'Metal', type: 'Heavy Armor', physRes: 3, enerRes: 2, radRes: 0, locations: ['Arm'], weight: 8, cost: 65, rarity: 2, source: 'Core' },
  { key: 'heavy_metal_helmet', label: 'Heavy Metal Helmet', set: 'Metal', type: 'Heavy Armor', physRes: 4, enerRes: 3, radRes: 0, locations: ['Head'], weight: 12, cost: 115, rarity: 3, source: 'Core' },
  { key: 'heavy_metal_chest', label: 'Heavy Metal Chest Piece', set: 'Metal', type: 'Heavy Armor', physRes: 4, enerRes: 3, radRes: 0, locations: ['Torso'], weight: 23, cost: 190, rarity: 3, source: 'Core' },
  { key: 'heavy_metal_leg', label: 'Heavy Metal Leg', set: 'Metal', type: 'Heavy Armor', physRes: 4, enerRes: 3, radRes: 0, locations: ['Leg'], weight: 12, cost: 115, rarity: 3, source: 'Core' },
  { key: 'heavy_metal_arm', label: 'Heavy Metal Arm', set: 'Metal', type: 'Heavy Armor', physRes: 4, enerRes: 3, radRes: 0, locations: ['Arm'], weight: 12, cost: 115, rarity: 3, source: 'Core' },
  // Combat
  { key: 'combat_helmet', label: 'Combat Helmet', set: 'Combat', type: 'Light Armor', physRes: 2, enerRes: 2, radRes: 0, locations: ['Head'], weight: 4, cost: 25, rarity: 2, source: 'Core' },
  { key: 'combat_chest', label: 'Combat Chest Piece', set: 'Combat', type: 'Light Armor', physRes: 2, enerRes: 2, radRes: 0, locations: ['Torso'], weight: 8, cost: 60, rarity: 2, source: 'Core' },
  { key: 'combat_leg', label: 'Combat Leg', set: 'Combat', type: 'Light Armor', physRes: 2, enerRes: 2, radRes: 0, locations: ['Leg'], weight: 2, cost: 25, rarity: 2, source: 'Core' },
  { key: 'combat_arm', label: 'Combat Arm', set: 'Combat', type: 'Light Armor', physRes: 2, enerRes: 2, radRes: 0, locations: ['Arm'], weight: 2, cost: 25, rarity: 2, source: 'Core' },
  { key: 'sturdy_combat_helmet', label: 'Sturdy Combat Helmet', set: 'Combat', type: 'Heavy Armor', physRes: 3, enerRes: 3, radRes: 0, locations: ['Head'], weight: 5, cost: 105, rarity: 3, source: 'Core' },
  { key: 'sturdy_combat_chest', label: 'Sturdy Combat Chest Piece', set: 'Combat', type: 'Heavy Armor', physRes: 3, enerRes: 3, radRes: 0, locations: ['Torso'], weight: 12, cost: 140, rarity: 3, source: 'Core' },
  { key: 'sturdy_combat_leg', label: 'Sturdy Combat Leg', set: 'Combat', type: 'Heavy Armor', physRes: 3, enerRes: 3, radRes: 0, locations: ['Leg'], weight: 5, cost: 105, rarity: 3, source: 'Core' },
  { key: 'sturdy_combat_arm', label: 'Sturdy Combat Arm', set: 'Combat', type: 'Heavy Armor', physRes: 3, enerRes: 3, radRes: 0, locations: ['Arm'], weight: 5, cost: 105, rarity: 3, source: 'Core' },
  { key: 'heavy_combat_helmet', label: 'Heavy Combat Helmet', set: 'Combat', type: 'Heavy Armor', physRes: 4, enerRes: 4, radRes: 0, locations: ['Head'], weight: 7, cost: 185, rarity: 4, source: 'Core' },
  { key: 'heavy_combat_chest', label: 'Heavy Combat Chest Piece', set: 'Combat', type: 'Heavy Armor', physRes: 4, enerRes: 4, radRes: 0, locations: ['Torso'], weight: 16, cost: 220, rarity: 4, source: 'Core' },
  { key: 'heavy_combat_leg', label: 'Heavy Combat Leg', set: 'Combat', type: 'Heavy Armor', physRes: 4, enerRes: 4, radRes: 0, locations: ['Leg'], weight: 7, cost: 185, rarity: 4, source: 'Core' },
  { key: 'heavy_combat_arm', label: 'Heavy Combat Arm', set: 'Combat', type: 'Heavy Armor', physRes: 4, enerRes: 4, radRes: 0, locations: ['Arm'], weight: 7, cost: 145, rarity: 4, source: 'Core' },
  // Synth
  { key: 'synth_helmet', label: 'Synth Helmet', set: 'Synth', type: 'Light Armor', physRes: 2, enerRes: 3, radRes: 0, locations: ['Head'], weight: 3, cost: 33, rarity: 3, source: 'Core' },
  { key: 'synth_chest', label: 'Synth Chest Piece', set: 'Synth', type: 'Light Armor', physRes: 2, enerRes: 3, radRes: 0, locations: ['Torso'], weight: 7, cost: 75, rarity: 3, source: 'Core' },
  { key: 'synth_leg', label: 'Synth Leg', set: 'Synth', type: 'Light Armor', physRes: 2, enerRes: 3, radRes: 0, locations: ['Leg'], weight: 3, cost: 30, rarity: 3, source: 'Core' },
  { key: 'synth_arm', label: 'Synth Arm', set: 'Synth', type: 'Light Armor', physRes: 2, enerRes: 3, radRes: 0, locations: ['Arm'], weight: 3, cost: 30, rarity: 4, source: 'Core' },
  { key: 'sturdy_synth_helmet', label: 'Sturdy Synth Helmet', set: 'Synth', type: 'Heavy Armor', physRes: 3, enerRes: 4, radRes: 0, locations: ['Head'], weight: 7, cost: 70, rarity: 4, source: 'Core' },
  { key: 'sturdy_synth_chest', label: 'Sturdy Synth Chest Piece', set: 'Synth', type: 'Heavy Armor', physRes: 3, enerRes: 4, radRes: 0, locations: ['Torso'], weight: 12, cost: 125, rarity: 4, source: 'Core' },
  { key: 'sturdy_synth_leg', label: 'Sturdy Synth Leg', set: 'Synth', type: 'Heavy Armor', physRes: 3, enerRes: 4, radRes: 0, locations: ['Leg'], weight: 7, cost: 80, rarity: 4, source: 'Core' },
  { key: 'sturdy_synth_arm', label: 'Sturdy Synth Arm', set: 'Synth', type: 'Heavy Armor', physRes: 3, enerRes: 4, radRes: 0, locations: ['Arm'], weight: 7, cost: 70, rarity: 4, source: 'Core' },
  { key: 'heavy_synth_helmet', label: 'Heavy Synth Helmet', set: 'Synth', type: 'Heavy Armor', physRes: 4, enerRes: 5, radRes: 0, locations: ['Head'], weight: 10, cost: 110, rarity: 5, source: 'Core' },
  { key: 'heavy_synth_chest', label: 'Heavy Synth Chest Piece', set: 'Synth', type: 'Heavy Armor', physRes: 4, enerRes: 5, radRes: 0, locations: ['Torso'], weight: 17, cost: 175, rarity: 5, source: 'Core' },
  { key: 'heavy_synth_leg', label: 'Heavy Synth Leg', set: 'Synth', type: 'Heavy Armor', physRes: 4, enerRes: 5, radRes: 0, locations: ['Leg'], weight: 10, cost: 130, rarity: 5, source: 'Core' },
  { key: 'heavy_synth_arm', label: 'Heavy Synth Arm', set: 'Synth', type: 'Heavy Armor', physRes: 4, enerRes: 5, radRes: 0, locations: ['Arm'], weight: 10, cost: 110, rarity: 5, source: 'Core' },
  // Vault-Tec Security
  { key: 'vault_security_helmet', label: 'Vault-Tec Security Helmet', set: 'Vault-Tec Security', type: 'Light Armor', physRes: 2, enerRes: 0, radRes: 0, locations: ['Head'], weight: 2, cost: 20, rarity: 1, source: 'Core' },
  { key: 'vault_security_armor', label: 'Vault-Tec Security Armor', set: 'Vault-Tec Security', type: 'Light Armor', physRes: 2, enerRes: 0, radRes: 2, locations: ['Arms', 'Legs', 'Torso'], weight: 8, cost: 16, rarity: 1, source: 'Core' },
];

export const CORE_POWER_ARMOR = [
  { key: 'armor_frame', label: 'Armor Frame', set: 'Frame', type: 'Power Armor', physRes: 0, enerRes: 0, radRes: 0, hp: 0, locations: ['All'], weight: 4500, cost: 150, rarity: 4, special: 'STR 11 while worn. Fusion Core powered. Impact Landing: no fall damage. Sealed Environment. Ablative armor HP. Cannot be modded.', source: 'Core' },
  { key: 'raider_pa_helm', label: 'Raider Power Helm', set: 'Raider Power', type: 'Power Armor', physRes: 6, enerRes: 4, radRes: 7, hp: 7, locations: ['Head'], weight: 50, cost: 14, rarity: 2, source: 'Core' },
  { key: 'raider_pa_chest', label: 'Raider Power Chest Piece', set: 'Raider Power', type: 'Power Armor', physRes: 8, enerRes: 6, radRes: 9, hp: 10, locations: ['Torso'], weight: 100, cost: 22, rarity: 2, source: 'Core' },
  { key: 'raider_pa_arm', label: 'Raider Power Arm', set: 'Raider Power', type: 'Power Armor', physRes: 4, enerRes: 3, radRes: 7, hp: 7, locations: ['Arm'], weight: 75, cost: 16, rarity: 2, source: 'Core' },
  { key: 'raider_pa_leg', label: 'Raider Power Leg', set: 'Raider Power', type: 'Power Armor', physRes: 4, enerRes: 3, radRes: 7, hp: 7, locations: ['Leg'], weight: 75, cost: 17, rarity: 2, source: 'Core' },
  { key: 't45_helm', label: 'T-45 Helm', set: 'T-45', type: 'Power Armor', physRes: 6, enerRes: 4, radRes: 7, hp: 7, locations: ['Head'], weight: 60, cost: 12, rarity: 2, source: 'Core' },
  { key: 't45_chest', label: 'T-45 Chest Piece', set: 'T-45', type: 'Power Armor', physRes: 8, enerRes: 7, radRes: 9, hp: 14, locations: ['Torso'], weight: 140, cost: 20, rarity: 2, source: 'Core' },
  { key: 't45_arm', label: 'T-45 Arm', set: 'T-45', type: 'Power Armor', physRes: 4, enerRes: 3, radRes: 7, hp: 7, locations: ['Arm'], weight: 100, cost: 15, rarity: 2, source: 'Core' },
  { key: 't45_leg', label: 'T-45 Leg', set: 'T-45', type: 'Power Armor', physRes: 4, enerRes: 3, radRes: 7, hp: 7, locations: ['Leg'], weight: 100, cost: 15, rarity: 2, source: 'Core' },
  { key: 't51_helm', label: 'T-51 Helm', set: 'T-51', type: 'Power Armor', physRes: 6, enerRes: 5, radRes: 7, hp: 9, locations: ['Head'], weight: 80, cost: 12, rarity: 3, source: 'Core' },
  { key: 't51_chest', label: 'T-51 Chest Piece', set: 'T-51', type: 'Power Armor', physRes: 8, enerRes: 7, radRes: 9, hp: 18, locations: ['Torso'], weight: 180, cost: 20, rarity: 3, source: 'Core' },
  { key: 't51_arm', label: 'T-51 Arm', set: 'T-51', type: 'Power Armor', physRes: 5, enerRes: 4, radRes: 7, hp: 9, locations: ['Arm'], weight: 130, cost: 15, rarity: 3, source: 'Core' },
  { key: 't51_leg', label: 'T-51 Leg', set: 'T-51', type: 'Power Armor', physRes: 5, enerRes: 4, radRes: 7, hp: 9, locations: ['Leg'], weight: 10, cost: 15, rarity: 3, source: 'Core' },
  { key: 't60_helm', label: 'T-60 Helm', set: 'T-60', type: 'Power Armor', physRes: 7, enerRes: 6, radRes: 7, hp: 10, locations: ['Head'], weight: 650, cost: 12, rarity: 4, source: 'Core' },
  { key: 't60_chest', label: 'T-60 Chest Piece', set: 'T-60', type: 'Power Armor', physRes: 9, enerRes: 8, radRes: 9, hp: 21, locations: ['Torso'], weight: 750, cost: 20, rarity: 4, source: 'Core' },
  { key: 't60_arm', label: 'T-60 Arm', set: 'T-60', type: 'Power Armor', physRes: 6, enerRes: 5, radRes: 7, hp: 10, locations: ['Arm'], weight: 700, cost: 15, rarity: 4, source: 'Core' },
  { key: 't60_leg', label: 'T-60 Leg', set: 'T-60', type: 'Power Armor', physRes: 6, enerRes: 5, radRes: 7, hp: 10, locations: ['Leg'], weight: 700, cost: 15, rarity: 4, source: 'Core' },
  { key: 'x01_helm', label: 'X-01 Helm', set: 'X-01', type: 'Power Armor', physRes: 8, enerRes: 7, radRes: 7, hp: 12, locations: ['Head'], weight: 60, cost: 12, rarity: 5, source: 'Core' },
  { key: 'x01_chest', label: 'X-01 Chest Piece', set: 'X-01', type: 'Power Armor', physRes: 10, enerRes: 8, radRes: 9, hp: 24, locations: ['Torso'], weight: 140, cost: 20, rarity: 5, source: 'Core' },
  { key: 'x01_arm', label: 'X-01 Arm', set: 'X-01', type: 'Power Armor', physRes: 7, enerRes: 6, radRes: 7, hp: 12, locations: ['Arm'], weight: 100, cost: 15, rarity: 5, source: 'Core' },
  { key: 'x01_leg', label: 'X-01 Leg', set: 'X-01', type: 'Power Armor', physRes: 7, enerRes: 6, radRes: 7, hp: 12, locations: ['Leg'], weight: 100, cost: 15, rarity: 5, source: 'Core' },
];

export const CORE_FOOD = [
  { key: 'baked_bloatfly', label: 'Baked Bloatfly', hp: 6, effect: '+2 Radiation damage resistance', irradiated: false, weight: 0.5, cost: 15, rarity: 1 },
  { key: 'blamco_mac_cheese', label: 'BlamCo Brand Mac and Cheese', hp: 4, effect: '-', irradiated: true, weight: 0.5, cost: 10, rarity: 1 },
  { key: 'bloatfly_meat', label: 'Bloatfly Meat', hp: 2, effect: '-', irradiated: true, weight: 0.5, cost: 8, rarity: 0 },
  { key: 'bloodbug_meat', label: 'Bloodbug Meat', hp: 7, effect: '-', irradiated: true, weight: 0.5, cost: 8, rarity: 1 },
  { key: 'bloodbug_steak', label: 'Bloodbug Steak', hp: 10, effect: 'Max HP +3 until end of following scene', irradiated: false, weight: 0.5, cost: 18, rarity: 2 },
  { key: 'brahmin_meat', label: 'Brahmin Meat', hp: 3, effect: '-', irradiated: true, weight: 1, cost: 28, rarity: 1 },
  { key: 'brain_fungus', label: 'Brain Fungus', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 6, rarity: 1 },
  { key: 'canned_dog_food', label: 'Canned Dog Food', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 6, rarity: 0 },
  { key: 'carrot', label: 'Carrot', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 3, rarity: 1 },
  { key: 'cooked_softshell', label: 'Cooked Softshell Meat', hp: 9, effect: 'Gain +1 AP at start of next scene', irradiated: false, weight: 0.5, cost: 40, rarity: 3 },
  { key: 'corn', label: 'Corn', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 6, rarity: 1 },
  { key: 'cram', label: 'Cram', hp: 5, effect: '-', irradiated: true, weight: 0.5, cost: 25, rarity: 1 },
  { key: 'crispy_squirrel_bits', label: 'Crispy Squirrel Bits', hp: 6, effect: '-', irradiated: false, weight: 0.5, cost: 6, rarity: 2 },
  { key: 'dandy_boy_apples', label: 'Dandy Boy Apples', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 7, rarity: 0 },
  { key: 'deathclaw_egg', label: 'Deathclaw Egg', hp: 7, effect: '-', irradiated: true, weight: 0.5, cost: 69, rarity: 3 },
  { key: 'deathclaw_meat', label: 'Deathclaw Meat', hp: 9, effect: '-', irradiated: true, weight: 1, cost: 110, rarity: 3 },
  { key: 'deathclaw_omelette', label: 'Deathclaw Omelette', hp: 11, effect: 'If next scene is combat, regain 1 HP at the start of each turn', irradiated: false, weight: 0.5, cost: 80, rarity: 4 },
  { key: 'deathclaw_steak', label: 'Deathclaw Steak', hp: 14, effect: 'Re-roll 1d20 on all STR tests until end of next scene', irradiated: false, weight: 1, cost: 130, rarity: 4 },
  { key: 'fancy_lads', label: 'Fancy Lads Snack Cakes', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 18, rarity: 0 },
  { key: 'food_paste', label: 'Food Paste', hp: 7, effect: 'Re-roll 1d20 on all END tests until end of next scene', irradiated: false, weight: 0.5, cost: 0, rarity: 2 },
  { key: 'gourd', label: 'Gourd', hp: 3, effect: '-', irradiated: true, weight: 1, cost: 6, rarity: 1 },
  { key: 'grilled_radroach', label: 'Grilled Radroach', hp: 5, effect: '-', irradiated: false, weight: 0.5, cost: 7, rarity: 1 },
  { key: 'grilled_radstag', label: 'Grilled Radstag', hp: 11, effect: 'Carry weight +25 until end of next scene', irradiated: false, weight: 1, cost: 60, rarity: 2 },
  { key: 'gum_drops', label: 'Gum Drops', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 5, rarity: 0 },
  { key: 'iguana_bits', label: 'Iguana Bits', hp: 4, effect: '-', irradiated: true, weight: 0.5, cost: 8, rarity: 1 },
  { key: 'iguana_on_a_stick', label: 'Iguana on a Stick', hp: 6, effect: '-', irradiated: false, weight: 0.5, cost: 33, rarity: 2 },
  { key: 'iguana_soup', label: 'Iguana Soup', hp: 10, effect: '-', irradiated: false, weight: 1, cost: 21, rarity: 3 },
  { key: 'instamash', label: 'InstaMash', hp: 4, effect: '-', irradiated: true, weight: 0.5, cost: 20, rarity: 0 },
  { key: 'institute_food_packet', label: 'Institute Food Packet', hp: 5, effect: '-', irradiated: false, weight: 0.5, cost: 10, rarity: 2 },
  { key: 'melon', label: 'Melon', hp: 3, effect: '-', irradiated: true, weight: 1, cost: 6, rarity: 1 },
  { key: 'mirelurk_cake', label: 'Mirelurk Cake', hp: 12, effect: 'Can breathe underwater until end of next scene', irradiated: false, weight: 0.5, cost: 35, rarity: 3 },
  { key: 'mirelurk_egg', label: 'Mirelurk Egg', hp: 3, effect: '-', irradiated: true, weight: 1, cost: 0, rarity: 2 },
  { key: 'mirelurk_egg_omelette', label: 'Mirelurk Egg Omelette', hp: 7, effect: 'Immediately add 2 AP to the group pool', irradiated: false, weight: 0.5, cost: 30, rarity: 3 },
  { key: 'mirelurk_meat', label: 'Mirelurk Meat', hp: 6, effect: '-', irradiated: true, weight: 0.5, cost: 18, rarity: 1 },
  { key: 'mirelurk_queen_steak', label: 'Mirelurk Queen Steak', hp: 14, effect: 'Reduce difficulty of all END tests by 1 until end of next scene', irradiated: false, weight: 1, cost: 130, rarity: 5 },
  { key: 'mole_rat_chunks', label: 'Mole Rat Chunks', hp: 7, effect: '+1 Maximum AP in group pool until end of current scene', irradiated: false, weight: 0.5, cost: 8, rarity: 1 },
  { key: 'mole_rat_meat', label: 'Mole Rat Meat', hp: 5, effect: '-', irradiated: true, weight: 0.5, cost: 5, rarity: 0 },
  { key: 'mongrel_dog_meat', label: 'Mongrel Dog Meat', hp: 4, effect: '-', irradiated: true, weight: 0.5, cost: 8, rarity: 0 },
  { key: 'mutant_hound_chops', label: 'Mutant Hound Chops', hp: 8, effect: 'Heals 2 Radiation damage', irradiated: false, weight: 0.5, cost: 12, rarity: 3 },
  { key: 'mutant_hound_meat', label: 'Mutant Hound Meat', hp: 5, effect: '-', irradiated: true, weight: 0.5, cost: 8, rarity: 2 },
  { key: 'mutfruit', label: 'Mutfruit', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 8, rarity: 0 },
  { key: 'mutt_chops', label: 'Mutt Chops', hp: 6, effect: '-', irradiated: false, weight: 0.5, cost: 12, rarity: 1 },
  { key: 'noodle_cup', label: 'Noodle Cup', hp: 6, effect: '-', irradiated: false, weight: 0.5, cost: 20, rarity: 2 },
  { key: 'perfectly_preserved_pie', label: 'Perfectly Preserved Pie', hp: 5, effect: '-', irradiated: false, weight: 0.5, cost: 20, rarity: 3 },
  { key: 'pork_n_beans', label: "Pork 'n' Beans", hp: 4, effect: '-', irradiated: true, weight: 0.5, cost: 10, rarity: 0 },
  { key: 'potato_crisps', label: 'Potato Crisps', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 7, rarity: 0 },
  { key: 'potted_meat', label: 'Potted Meat', hp: 6, effect: 'Roll 2 CD for Radiation damage when consumed', irradiated: true, weight: 1, cost: 25, rarity: 0 },
  { key: 'queen_mirelurk_meat', label: 'Queen Mirelurk Meat', hp: 10, effect: 'Re-roll 1d20 on all END tests until end of next scene', irradiated: true, weight: 0.5, cost: 22, rarity: 4 },
  { key: 'radroach_meat', label: 'Radroach Meat', hp: 4, effect: '-', irradiated: true, weight: 0.5, cost: 3, rarity: 0 },
  { key: 'radscorpion_egg', label: 'Radscorpion Egg', hp: 6, effect: '-', irradiated: true, weight: 0.5, cost: 48, rarity: 3 },
  { key: 'radscorpion_egg_omelette', label: 'Radscorpion Egg Omelette', hp: 9, effect: 'Cure all addictions', irradiated: false, weight: 0.5, cost: 65, rarity: 4 },
  { key: 'radscorpion_meat', label: 'Radscorpion Meat', hp: 9, effect: '-', irradiated: true, weight: 1, cost: 55, rarity: 2 },
  { key: 'radscorpion_steak', label: 'Radscorpion Steak', hp: 12, effect: '+2 Energy damage resistance until end of next scene', irradiated: false, weight: 1, cost: 65, rarity: 3 },
  { key: 'radstag_meat', label: 'Radstag Meat', hp: 8, effect: '-', irradiated: true, weight: 1, cost: 50, rarity: 1 },
  { key: 'radstag_stew', label: 'Radstag Stew', hp: 12, effect: '+3 Energy damage resistance until end of next scene', irradiated: false, weight: 1, cost: 60, rarity: 3 },
  { key: 'razorgrain', label: 'Razorgrain', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 5, rarity: 1 },
  { key: 'ribeye_steak', label: 'Ribeye Steak', hp: 10, effect: '-', irradiated: false, weight: 1, cost: 40, rarity: 2 },
  { key: 'roasted_mirelurk_meat', label: 'Roasted Mirelurk Meat', hp: 8, effect: 'Gain +1 AP at start of next scene', irradiated: false, weight: 0.5, cost: 40, rarity: 2 },
  { key: 'salisbury_steak', label: 'Salisbury Steak', hp: 5, effect: '-', irradiated: true, weight: 0.5, cost: 20, rarity: 0 },
  { key: 'silt_bean', label: 'Silt Bean', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 6, rarity: 1 },
  { key: 'softshell_mirelurk_meat', label: 'Softshell Mirelurk Meat', hp: 6, effect: '-', irradiated: true, weight: 0.5, cost: 22, rarity: 2 },
  { key: 'squirrel_bits', label: 'Squirrel Bits', hp: 4, effect: '-', irradiated: true, weight: 0.5, cost: 4, rarity: 1 },
  { key: 'squirrel_on_a_stick', label: 'Squirrel on a Stick', hp: 7, effect: '-', irradiated: false, weight: 0.5, cost: 15, rarity: 2 },
  { key: 'squirrel_stew', label: 'Squirrel Stew', hp: 10, effect: '-', irradiated: false, weight: 1, cost: 24, rarity: 2 },
  { key: 'stingwing_filet', label: 'Stingwing Filet', hp: 11, effect: 'Re-roll 1d20 on all PER tests until end of next scene', irradiated: false, weight: 0.5, cost: 35, rarity: 2 },
  { key: 'stingwing_meat', label: 'Stingwing Meat', hp: 8, effect: '-', irradiated: true, weight: 0.5, cost: 30, rarity: 1 },
  { key: 'sugar_bombs', label: 'Sugar Bombs', hp: 4, effect: 'Gain +1 AP at start of next scene', irradiated: true, weight: 0.5, cost: 11, rarity: 0 },
  { key: 'sweet_roll', label: 'Sweet Roll', hp: 4, effect: '-', irradiated: true, weight: 0.5, cost: 9, rarity: 1 },
  { key: 'tarberry', label: 'Tarberry', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 5, rarity: 3 },
  { key: 'tato', label: 'Tato', hp: 3, effect: '-', irradiated: true, weight: 0.5, cost: 7, rarity: 1 },
  { key: 'vegetable_soup', label: 'Vegetable Soup', hp: 7, effect: '+2 Radiation damage resistance until end of next scene', irradiated: false, weight: 1, cost: 13, rarity: 2 },
  { key: 'yao_guai_meat', label: 'Yao Guai Meat', hp: 9, effect: '-', irradiated: true, weight: 1, cost: 85, rarity: 3 },
  { key: 'yao_guai_ribs', label: 'Yao Guai Ribs', hp: 13, effect: '+2 Physical damage resistance until end of next scene', irradiated: false, weight: 1, cost: 90, rarity: 4 },
  { key: 'yao_guai_roast', label: 'Yao Guai Roast', hp: 14, effect: '+2 CD to melee attacks until end of next scene', irradiated: false, weight: 1, cost: 110, rarity: 4 },
  { key: 'yum_yum_deviled_eggs', label: 'Yum-Yum Deviled Eggs', hp: 4, effect: '-', irradiated: true, weight: 0.5, cost: 20, rarity: 0 },
];

export const CORE_CHEMS = [
  { key: 'addictol', label: 'Addictol', effect: 'Removes all addictions', duration: 'Instant', addictive: false, weight: 0.5, cost: 125, rarity: 3 },
  { key: 'antibiotics', label: 'Antibiotics', effect: 'Cures all illnesses', duration: 'Instant', addictive: false, weight: 0.5, cost: 75, rarity: 3 },
  { key: 'berry_mentats', label: 'Berry Mentats', effect: 'Reduce difficulty of INT tests by 2 (min 0)', duration: 'Lasting', addictive: true, addictionNumber: 2, addictionEffect: 'Mentat Addiction: +1 difficulty to all CHA tests when not on Mentats.', weight: 0.5, cost: 60, rarity: 3 },
  { key: 'buffjet', label: 'Buffjet', effect: 'Reduce difficulty of STR/END tests by 1; +4 Max HP; gain 3 AP immediately; extra actions cost 1 less AP', duration: 'Brief', addictive: true, addictionNumber: 1, addictionEffect: 'Buffout Addiction: +1 difficulty to STR/END tests when not on Buffout-type.', weight: 0.5, cost: 75, rarity: 4 },
  { key: 'buffout', label: 'Buffout', effect: 'Re-roll 1d20 on all STR and END tests; +3 Max HP', duration: 'Lasting', addictive: true, addictionNumber: 2, addictionEffect: 'Buffout Addiction: +1 difficulty to STR/END tests when not on Buffout-type.', weight: 0.5, cost: 45, rarity: 2 },
  { key: 'bufftats', label: 'Bufftats', effect: 'Reduce difficulty of STR, PER, and END tests by 1 (min 0); +4 Max HP', duration: 'Lasting', addictive: true, addictionNumber: 1, addictionEffect: 'Buffout Addiction: +1 difficulty to STR/END tests when not on Buffout-type.', weight: 0.5, cost: 75, rarity: 4 },
  { key: 'calmex', label: 'Calmex', effect: 'Re-roll 1d20 on PER and AGI tests; +2 CD to sneak attack damage', duration: 'Lasting', addictive: true, addictionNumber: 1, addictionEffect: 'Calmex Addiction: Complications on AGI tests on rolls of 18+ when not on Calmex.', weight: 0.5, cost: 100, rarity: 4 },
  { key: 'daddy_o', label: 'Daddy-O', effect: 'Reduce difficulty of PER and INT tests by 1 (min 0); +1 difficulty to CHA tests', duration: 'Lasting', addictive: true, addictionNumber: 1, addictionEffect: 'Daddy-O Addiction: +1 difficulty to PER/INT tests when not on Daddy-O.', weight: 0.5, cost: 50, rarity: 2 },
  { key: 'day_tripper', label: 'Day Tripper', effect: 'Reduce difficulty of CHA and LCK tests by 1 (min 0); +1 difficulty to STR tests', duration: 'Lasting', addictive: true, addictionNumber: 1, addictionEffect: 'Day Tripper Addiction: +1 difficulty to CHA/LCK tests when not on Day Tripper.', weight: 0.5, cost: 40, rarity: 3 },
  { key: 'fury', label: 'Fury', effect: '+3 Physical damage resistance; +3 CD to melee damage; +2 difficulty to all PER tests', duration: 'Lasting', addictive: true, addictionNumber: 1, addictionEffect: 'Fury Addiction: +1 difficulty to STR/PER tests when not on Fury.', weight: 0.5, cost: 30, rarity: 4 },
  { key: 'grape_mentats', label: 'Grape Mentats', effect: 'Reduce difficulty of CHA tests by 2 (min 0); re-roll 1d20 on Barter tests', duration: 'Lasting', addictive: true, addictionNumber: 2, addictionEffect: 'Mentat Addiction: +1 difficulty to all CHA tests when not on Mentats.', weight: 0.5, cost: 60, rarity: 3 },
  { key: 'healing_salve', label: 'Healing Salve', effect: 'Heals 2 HP (or +2 to a First Aid action)', duration: 'Instant', addictive: false, weight: 0.5, cost: 20, rarity: 1 },
  { key: 'jet', label: 'Jet', effect: 'Extra actions cost 1 less AP', duration: 'Brief', addictive: true, addictionNumber: 2, addictionEffect: 'Jet Addiction: +1 difficulty to AGI tests when not on Jet-type.', weight: 0.5, cost: 50, rarity: 2 },
  { key: 'jet_fuel', label: 'Jet Fuel', effect: 'Gain 1 free AP at the start of each turn', duration: 'Lasting', addictive: true, addictionNumber: 1, addictionEffect: 'Jet Addiction: +1 difficulty to AGI tests when not on Jet-type.', weight: 0.5, cost: 60, rarity: 3 },
  { key: 'med_x', label: 'Med-X', effect: '+3 Physical damage resistance', duration: 'Lasting', addictive: true, addictionNumber: 2, addictionEffect: 'Med-X Addiction: +1 difficulty to AGI tests; +1 CD damage from physical attacks when not on Med-X.', weight: 0.5, cost: 50, rarity: 2 },
  { key: 'mentats', label: 'Mentats', effect: 'Re-roll 1d20 on PER and INT tests', duration: 'Lasting', addictive: true, addictionNumber: 3, addictionEffect: 'Mentat Addiction: +1 difficulty to all CHA tests when not on Mentats.', weight: 0.5, cost: 50, rarity: 2 },
  { key: 'orange_mentats', label: 'Orange Mentats', effect: 'Reduce difficulty of PER tests by 2 (min 0); re-roll one extra d20 after Aiming', duration: 'Lasting', addictive: true, addictionNumber: 2, addictionEffect: 'Mentat Addiction: +1 difficulty to all CHA tests when not on Mentats.', weight: 0.5, cost: 60, rarity: 3 },
  { key: 'overdrive', label: 'Overdrive', effect: '+3 CD damage to all attacks; re-roll up to 3 CD per damage roll', duration: 'Lasting', addictive: true, addictionNumber: 1, addictionEffect: 'Overdrive Addiction: +1 difficulty to STR/AGI tests when not on Overdrive.', weight: 0.5, cost: 55, rarity: 3 },
  { key: 'psycho', label: 'Psycho', effect: '+2 CD damage to all attacks; +3 Physical damage resistance', duration: 'Lasting', addictive: true, addictionNumber: 2, addictionEffect: 'Psycho Addiction: +1 difficulty to STR tests; +1 CD damage from physical attacks when not on Psycho-type.', weight: 0.5, cost: 50, rarity: 2 },
  { key: 'psycho_jet', label: 'Psycho Jet', effect: '+2 CD damage; +4 Physical damage resistance; gain 4 AP immediately', duration: 'Brief', addictive: true, addictionNumber: 1, addictionEffect: 'Psycho Addiction: +1 difficulty to STR tests; +1 CD damage from physical attacks when not on Psycho-type.', weight: 0.5, cost: 70, rarity: 4 },
  { key: 'psychobuff', label: 'Psychobuff', effect: '+2 CD damage; +4 Max HP; reduce difficulty of STR/END tests by 1', duration: 'Lasting', addictive: true, addictionNumber: 1, addictionEffect: 'Psycho Addiction: +1 difficulty to STR tests; +1 CD damage from physical attacks when not on Psycho-type.', weight: 0.5, cost: 70, rarity: 4 },
  { key: 'psychotats', label: 'Psychotats', effect: '+2 CD damage; +2 Physical damage resistance; reduce PER difficulty by 1', duration: 'Lasting', addictive: true, addictionNumber: 1, addictionEffect: 'Psycho Addiction: +1 difficulty to STR tests; +1 CD damage from physical attacks when not on Psycho-type.', weight: 0.5, cost: 70, rarity: 4 },
  { key: 'rad_x', label: 'Rad-X', effect: '+6 Radiation damage resistance', duration: 'Lasting', addictive: false, weight: 0.5, cost: 40, rarity: 2 },
  { key: 'rad_x_diluted', label: 'Rad-X (Diluted)', effect: '+3 Radiation damage resistance', duration: 'Lasting', addictive: false, weight: 0.5, cost: 25, rarity: 1 },
  { key: 'radaway', label: 'RadAway', effect: 'Heals 4 Radiation damage (or as part of First Aid)', duration: 'Instant', addictive: false, weight: 0.5, cost: 80, rarity: 2 },
  { key: 'radaway_diluted', label: 'RadAway (Diluted)', effect: 'Heals 2 Radiation damage', duration: 'Instant', addictive: false, weight: 0.5, cost: 50, rarity: 1 },
  { key: 'skeeto_spit', label: 'Skeeto Spit', effect: '+2 Max HP', duration: 'Lasting', addictive: false, weight: 0.5, cost: 40, rarity: 2 },
  { key: 'stimpak', label: 'Stimpak', effect: 'Heals 4 HP or treats an Injury (Take Chem or First Aid bonus)', duration: 'Instant', addictive: false, weight: 0.5, cost: 50, rarity: 2 },
  { key: 'stimpak_diluted', label: 'Stimpak (Diluted)', effect: 'Heals 2 HP or treats an Injury', duration: 'Instant', addictive: false, weight: 0.5, cost: 30, rarity: 1 },
  { key: 'super_stimpak', label: 'Super Stimpak', effect: 'Heals 8 HP or treats up to 2 Injuries', duration: 'Instant', addictive: false, weight: 0.5, cost: 90, rarity: 4 },
  { key: 'stimpak_diffuser', label: 'Stimpak Diffuser', effect: 'Heals 4 HP to all within Close range (consumes a Super Stimpak)', duration: 'Instant', addictive: false, weight: 1, cost: 100, rarity: 5 },
  { key: 'ultra_jet', label: 'Ultra Jet', effect: 'Gain 6 AP immediately; extra actions cost 1 less AP', duration: 'Brief', addictive: true, addictionNumber: 3, addictionEffect: 'Ultra Jet Addiction: +1 difficulty to AGI tests; generate 1 fewer AP on successful tests. PERMANENT.', weight: 0.5, cost: 67, rarity: 2 },
  { key: 'x_cell', label: 'X-Cell', effect: 'First d20 bought on all tests is free', duration: 'Lasting', addictive: true, addictionNumber: 1, addictionEffect: 'X-Cell Addiction: +1 difficulty to all tests when not on X-Cell.', weight: 0.5, cost: 60, rarity: 4 },
];

export const CORE_OTHER_CONSUMABLES = [
  { key: 'robot_repair_kit', label: 'Robot Repair Kit', effect: 'Heals 4 HP or treats an Injury on a Robot or Power Armor. Uses Repair skill instead of Medicine. Use as Take Chem or part of First Aid.', weight: 0.5, cost: 48, rarity: 2 },
  { key: 'stealth_boy', label: 'Stealth Boy', effect: 'Activate as Interact minor action. Lasts 3 full turns. Enemies add +2 difficulty to spot you. Defense +2. Making an attack ends invisibility.', weight: 1, cost: 100, rarity: 3, note: 'Long-term use may cause neurological changes (GM discretion).' },
];

export const CORE_PERKS = [
  { key: 'animal_friend', label: 'Animal Friend', ranks: 2, requirements: { CHA: 6, level: 2 }, source: 'Core', description: 'Rank 1: Attempt CHA + Survival (difficulty 2) as a minor action to stop an animal attacking you. Rank 2: As a major action, make it treat you as friendly and attack anyone attacking you.' },
  { key: 'aquaboy', label: 'Aquaboy/Aquagirl', ranks: 2, requirements: { END: 5, level: 1 }, source: 'Core', description: 'Rank 1: No radiation damage from irradiated water; hold breath twice as long. Rank 2: Enemies add +2 difficulty to detect you while submerged.' },
  { key: 'armorer', label: 'Armorer', ranks: 4, requirements: { STR: 5, INT: 6, level: 2 }, source: 'Core', description: 'Modify armor with armor mods. Each rank unlocks the matching rank of mods.' },
  { key: 'awareness', label: 'Awareness', ranks: 1, requirements: { PER: 7 }, source: 'Core', description: 'When you take the Aim minor action at a target within Close range, your next attack gains Piercing 1, or improves existing Piercing X by 1.' },
  { key: 'barbarian', label: 'Barbarian', ranks: 1, requirements: { STR: 7, level: 4 }, source: 'Core', description: 'Physical DR on all locations based on STR (not in Power Armor). STR 7-8: +1; STR 9-10: +2; STR 11+: +3.' },
  { key: 'basher', label: 'Basher', ranks: 1, requirements: { STR: 6 }, source: 'Core', description: 'When you bash with a gun as a melee attack, the attack gains the Vicious damage effect.' },
  { key: 'better_criticals', label: 'Better Criticals', ranks: 1, requirements: { LCK: 9 }, source: 'Core', description: 'When you inflict 1+ damage, spend 1 Luck point to automatically inflict a critical hit, causing an injury.' },
  { key: 'big_leagues', label: 'Big Leagues', ranks: 1, requirements: { STR: 8 }, source: 'Core', description: 'When making a melee attack with a two-handed melee weapon, the weapon gains the Vicious damage effect.' },
  { key: 'black_widow', label: 'Black Widow/Lady Killer', ranks: 1, requirements: { CHA: 6 }, source: 'Core', description: 'Re-roll 1d20 on CHA tests to influence characters of the chosen gender. Attacks inflict +1 CD against characters of the chosen gender.' },
  { key: 'blacksmith', label: 'Blacksmith', ranks: 3, requirements: { STR: 6, level: 2 }, source: 'Core', description: 'Modify melee weapons with weapon mods. Each rank unlocks the matching rank of mods.' },
  { key: 'blitz', label: 'Blitz', ranks: 2, requirements: { AGI: 9, level: 1 }, source: 'Core', description: 'When you move into reach and make a melee attack in one turn, re-roll 1d20. Rank 2: also inflict +1 CD.' },
  { key: 'bloody_mess', label: 'Bloody Mess', ranks: 1, requirements: { LCK: 6 }, source: 'Core', description: 'When you inflict a critical hit, roll 1 CD. On an Effect, inflict one additional injury to a random location.' },
  { key: 'can_do', label: 'Can Do!', ranks: 1, requirements: { LCK: 5 }, source: 'Core', description: 'When scavenging a location containing food, gain 1 additional random food item without spending AP.' },
  { key: 'cap_collector', label: 'Cap Collector', ranks: 1, requirements: { CHA: 5 }, source: 'Core', description: 'When buying or selling items, increase or decrease the price of goods traded by 10%.' },
  { key: 'cautious_nature', label: 'Cautious Nature', ranks: 1, requirements: { PER: 7 }, source: 'Core', description: 'Whenever you buy d20s by spending AP, re-roll 1d20 on that test. Cannot have if you have Daring Nature.' },
  { key: 'center_mass', label: 'Center Mass', ranks: 1, requirements: { AGI: 7 }, source: 'Core', description: 'When making a ranged attack, target the Torso without increasing difficulty. Re-roll 1d20 on the attack test.' },
  { key: 'chem_resistant', label: 'Chem Resistant', ranks: 2, requirements: { END: 7, level: 1 }, source: 'Core', description: 'Rank 1: Roll 1 fewer CD for chem addiction. Rank 2: Cannot become addicted to chems.' },
  { key: 'chemist', label: 'Chemist', ranks: 1, requirements: { INT: 7 }, source: 'Core', description: 'Chems you create last twice as long. Unlocks chem recipes requiring this perk.' },
  { key: 'commando', label: 'Commando', ranks: 2, requirements: { AGI: 8, level: 2 }, source: 'Core', description: 'When making a ranged attack with a weapon with Fire Rate 3+ (except heavy weapons), add +1 CD per rank.' },
  { key: 'comprehension', label: 'Comprehension', ranks: 1, requirements: { INT: 6 }, source: 'Core', description: 'After using the bonus from reading a magazine, roll 1 CD. On an Effect, use that bonus one additional time.' },
  { key: 'concentrated_fire', label: 'Concentrated Fire', ranks: 1, requirements: { PER: 8, AGI: 6 }, source: 'Core', description: 'When making a ranged attack and spending ammo to increase damage, re-roll up to 3 CD on the damage roll.' },
  { key: 'daring_nature', label: 'Daring Nature', ranks: 1, requirements: { LCK: 7 }, source: 'Core', description: 'Whenever you give the GM AP to buy d20s, re-roll 1d20 on that test. Cannot have if you have Cautious Nature.' },
  { key: 'demolition_expert', label: 'Demolition Expert', ranks: 1, requirements: { PER: 6, LCK: 6 }, source: 'Core', description: 'Attacks using weapons with the Blast quality gain the Vicious damage effect. Unlocks explosives recipes.' },
  { key: 'dodger', label: 'Dodger', ranks: 2, requirements: { AGI: 6, level: 4 }, source: 'Core', description: 'Rank 1: When taking the Defend major action, reduce difficulty by 1. Rank 2: AP cost to increase Defense further reduced to 1.' },
  { key: 'dogmeat', label: 'Dogmeat', ranks: 1, requirements: { CHA: 5 }, source: 'Core', description: 'You have a loyal companion dog. Dogmeat is a level-scaling NPC with Bite (2 CD Vicious Physical), Keen Senses, and Attack Dog.' },
  { key: 'entomologist', label: 'Entomologist', ranks: 1, requirements: { INT: 7 }, source: 'Core', description: 'Attacks against NPCs with the Insect keyword gain Piercing 1, or +1 to existing Piercing X.' },
  { key: 'fast_metabolism', label: 'Fast Metabolism', ranks: 3, requirements: { END: 6, level: 1 }, source: 'Core', description: 'When regaining HP from any source other than rest, increase total HP regained by +1 per rank.' },
  { key: 'faster_healing', label: 'Faster Healing', ranks: 1, requirements: { END: 6 }, source: 'Core', description: 'When making END + Survival to heal own injuries, the first additional d20 you buy is free.' },
  { key: 'finesse', label: 'Finesse', ranks: 1, requirements: { AGI: 9 }, source: 'Core', description: 'Once per combat encounter, re-roll all the CD on a single damage roll without spending Luck points.' },
  { key: 'fortune_finder', label: 'Fortune Finder', ranks: 3, requirements: { LCK: 5, level: 2 }, source: 'Core', description: 'When rolling to determine caps found: Rank 1: +3 CD. Rank 2: +6 CD. Rank 3: +10 CD.' },
  { key: 'ghost', label: 'Ghost', ranks: 1, requirements: { PER: 5, AGI: 6 }, source: 'Core', description: 'When attempting AGI + Sneak in shadows or darkness, the first additional d20 bought is free.' },
  { key: 'grim_reapers_sprint', label: "Grim Reaper's Sprint", ranks: 1, requirements: { LCK: 8 }, source: 'Core', description: 'When making an attack that kills one or more enemies, roll 1 CD. On an Effect, add 2 AP to the group pool.' },
  { key: 'gun_fu', label: 'Gun Fu', ranks: 3, requirements: { AGI: 10, level: 1 }, source: 'Core', description: 'After a successful ranged attack, spend 1 AP + 1 ammo to hit a second target in Close range for the same damage. Rank 2: up to 2 targets. Rank 3: up to 3.' },
  { key: 'gun_nut', label: 'Gun Nut', ranks: 4, requirements: { INT: 6, level: 2 }, source: 'Core', description: 'Modify small guns and heavy weapons with weapon mods. Each rank unlocks the matching rank of mods.' },
  { key: 'gunslinger', label: 'Gunslinger', ranks: 2, requirements: { AGI: 7, level: 2 }, source: 'Core', description: 'When attacking with a one-handed ranged weapon with Fire Rate 2 or lower, increase damage by +1 CD per rank. Re-roll the hit location die.' },
  { key: 'hacker', label: 'Hacker', ranks: 1, requirements: { INT: 8 }, source: 'Core', description: 'Difficulty of tests to hack computers is decreased by 1 (minimum 0).' },
  { key: 'healer', label: 'Healer', ranks: 3, requirements: { INT: 7, level: 1 }, source: 'Core', description: 'When healing a patient\'s HP using the First Aid action, increase HP healed by +1 per rank.' },
  { key: 'heave_ho', label: 'Heave Ho!', ranks: 1, requirements: { STR: 8 }, source: 'Core', description: 'When making a thrown weapon attack, spend 1 AP to increase the range by one step.' },
  { key: 'hunter', label: 'Hunter', ranks: 1, requirements: { END: 6 }, source: 'Core', description: 'When attacking a Mutated Mammal, Lizard, or Insect NPC, the attack gains the Vicious damage effect.' },
  { key: 'infiltrator', label: 'Infiltrator', ranks: 1, requirements: { PER: 8 }, source: 'Core', description: 'When attempting Lockpick to unlock a door or container, re-roll 1d20.' },
  { key: 'inspirational', label: 'Inspirational', ranks: 1, requirements: { CHA: 8 }, source: 'Core', description: 'The maximum number of AP the group may save is increased by 1.' },
  { key: 'intense_training', label: 'Intense Training', ranks: 10, requirements: { level: 2 }, source: 'Core', description: 'Increase any one SPECIAL attribute by 1 (max 10).' },
  { key: 'iron_fist', label: 'Iron Fist', ranks: 2, requirements: { STR: 6, level: 1 }, source: 'Core', description: 'Rank 1: Unarmed attacks inflict +1 CD. Rank 2: Unarmed attacks also gain Vicious.' },
  { key: 'junktown_jerky_vendor', label: 'Junktown Jerky Vendor', ranks: 1, requirements: { CHA: 8 }, source: 'Core', description: 'Difficulty of any CHA + Barter test to buy or sell is reduced by 1 (minimum 0).' },
  { key: 'jury_rigging', label: 'Jury Rigging', ranks: 1, requirements: {}, source: 'Core', description: 'Repair an item without expending components. The repair is temporary — breaks on the next complication. Complication range of tests using the item increases by 1.' },
  { key: 'laser_commander', label: 'Laser Commander', ranks: 2, requirements: { PER: 8, level: 2 }, source: 'Core', description: 'When attacking with a ranged energy weapon, damage increases by +1 CD per rank.' },
  { key: 'lead_belly', label: 'Lead Belly', ranks: 2, requirements: { END: 6, level: 1 }, source: 'Core', description: 'Rank 1: Re-roll CD to determine radiation from irradiated food/drink. Rank 2: Immune to radiation from consuming irradiated food/drink.' },
  { key: 'life_giver', label: 'Life Giver', ranks: 5, requirements: { level: 5 }, source: 'Core', description: 'Increase maximum HP by your Endurance rank.' },
  { key: 'light_step', label: 'Light Step', ranks: 1, requirements: {}, source: 'Core', description: 'Ignore one complication per 1 AP spent on Agility-based tests. Re-roll 1d20 on AGI + Athletics to avoid pressure-plate traps.' },
  { key: 'master_thief', label: 'Master Thief', ranks: 1, requirements: { PER: 8, AGI: 9 }, source: 'Core', description: 'When picking a lock or pickpocketing, the difficulty of the opponent\'s detection test increases by +1.' },
  { key: 'medic', label: 'Medic', ranks: 1, requirements: { INT: 8 }, source: 'Core', description: 'When using the First Aid action to treat an injury, re-roll 1d20.' },
  { key: 'meltdown', label: 'Meltdown', ranks: 1, requirements: { PER: 10 }, source: 'Core', description: 'When you kill an enemy with an energy weapon, they explode. Roll CD equal to half the weapon\'s damage rating, each Effect hits one nearby enemy for energy damage.' },
  { key: 'mister_sandman', label: 'Mister Sandman', ranks: 1, requirements: { AGI: 9 }, source: 'Core', description: 'When making a sneak attack with a silenced/suppressed weapon, damage increases by +2 CD. No benefit in Power Armor.' },
  { key: 'moving_target', label: 'Moving Target', ranks: 1, requirements: { AGI: 6 }, source: 'Core', description: 'When you take the Sprint action, your Defense increases by +1 until the start of your next turn.' },
  { key: 'mysterious_stranger', label: 'Mysterious Stranger', ranks: 1, requirements: { LCK: 7 }, source: 'Core', description: 'At the start of a combat encounter, spend 1 Luck point. The Mysterious Stranger may appear, make a single attack (8 CD Piercing 1 Vicious Physical), then vanish.' },
  { key: 'nerd_rage', label: 'Nerd Rage!', ranks: 3, requirements: { INT: 8, level: 2 }, source: 'Core', description: 'While HP is below 1/4 maximum: Rank 1: +1 Physical DR, +1 Energy DR, +1 CD all attacks. Rank 2: +2. Rank 3: +3.' },
  { key: 'night_person', label: 'Night Person', ranks: 1, requirements: { PER: 7 }, source: 'Core', description: 'Reduce any difficulty increases caused by darkness by 1.' },
  { key: 'ninja', label: 'Ninja', ranks: 1, requirements: { AGI: 8 }, source: 'Core', description: 'When making a sneak attack with a melee or unarmed attack, damage increases by +2 CD. No benefit in Power Armor.' },
  { key: 'nuclear_physicist', label: 'Nuclear Physicist', ranks: 1, requirements: { INT: 9 }, source: 'Core', description: 'Weapons inflicting radiation damage: each Effect inflicts +1 additional radiation damage. Fusion cores have 3 extra charges.' },
  { key: 'pain_train', label: 'Pain Train', ranks: 2, requirements: { STR: 9, END: 7, level: 1 }, source: 'Core', description: 'In Power Armor or as super mutant, Charge (STR + Athletics diff 2) to hit enemy in Medium range: unarmed damage + knockdown. Rank 2: +1 CD and Stun.' },
  { key: 'paralyzing_palm', label: 'Paralyzing Palm', ranks: 1, requirements: { STR: 8 }, source: 'Core', description: 'When making an unarmed attack targeting a specific location, the attack gains the Stun damage effect.' },
  { key: 'party_boy', label: 'Party Boy/Party Girl', ranks: 1, requirements: { END: 6, CHA: 7 }, source: 'Core', description: 'Cannot become addicted to alcoholic drinks. When drinking alcohol, heal +2 HP.' },
  { key: 'pathfinder', label: 'Pathfinder', ranks: 1, requirements: { PER: 6, END: 6 }, source: 'Core', description: 'A successful PER + Survival test when travelling reduces travel time by half.' },
  { key: 'pharma_farma', label: 'Pharma Farma', ranks: 1, requirements: { LCK: 6 }, source: 'Core', description: 'When scavenging a location containing medicine or chems, find one additional item without spending AP.' },
  { key: 'pickpocket', label: 'Pickpocket', ranks: 3, requirements: { PER: 8, AGI: 8, level: 1 }, source: 'Core', description: 'Rank 1: Ignore first complication on pickpocket tests. Rank 2: Re-roll 1d20. Rank 3: Reduce difficulty by 1.' },
  { key: 'piercing_strike', label: 'Piercing Strike', ranks: 1, requirements: { STR: 7 }, source: 'Core', description: 'Unarmed attacks and bladed melee weapons gain Piercing 1, or add +1 to existing Piercing X.' },
  { key: 'pyromaniac', label: 'Pyromaniac', ranks: 3, requirements: { END: 6, level: 2 }, source: 'Core', description: 'Damage with fire-based weapons increases by +1 CD per rank.' },
  { key: 'quick_draw', label: 'Quick Draw', ranks: 1, requirements: { AGI: 6 }, source: 'Core', description: 'Each turn, draw a single weapon or item without using a minor action.' },
  { key: 'quick_hands', label: 'Quick Hands', ranks: 1, requirements: { AGI: 8 }, source: 'Core', description: 'When making a ranged attack, spend 2 AP to double the Fire Rate of your gun for that attack.' },
  { key: 'rad_resistance', label: 'Rad Resistance', ranks: 2, requirements: { END: 8, level: 1 }, source: 'Core', description: 'Radiation DR on all locations increases by +1 per rank.' },
  { key: 'refractor', label: 'Refractor', ranks: 2, requirements: { PER: 6, LCK: 7, level: 1 }, source: 'Core', description: 'Energy DR on all locations increases by +1 per rank.' },
  { key: 'ricochet', label: 'Ricochet', ranks: 1, requirements: { LCK: 10, level: 5 }, source: 'Core', description: 'If an enemy makes a ranged attack and rolls a complication, spend 1 Luck point to have the ricochet hit them instead.' },
  { key: 'rifleman', label: 'Rifleman', ranks: 2, requirements: { AGI: 7, level: 2 }, source: 'Core', description: 'When making a ranged attack with a two-handed weapon with Fire Rate 2 or lower (not heavy weapons), add +1 CD per rank. Rank 2: also Piercing 1.' },
  { key: 'robotics_expert', label: 'Robotics Expert', ranks: 3, requirements: { INT: 8, level: 2 }, source: 'Core', description: 'Rank 1: Modify robots with rank 1 mods. Rank 2: Rank 2 mods; -1 difficulty to repair robots. Rank 3: Rank 3 mods; reprogram robots.' },
  { key: 'science', label: 'Science!', ranks: 3, requirements: { INT: 6, level: 2 }, source: 'Core', description: 'Modify energy weapons and craft advanced armor mods. Each rank unlocks matching rank mods.' },
  { key: 'scoundrel', label: 'Scoundrel', ranks: 1, requirements: { CHA: 7 }, source: 'Core', description: 'When making CHA + Speech to convince someone of a lie, ignore the first complication you roll.' },
  { key: 'scrapper', label: 'Scrapper', ranks: 2, requirements: { level: 3 }, source: 'Core', description: 'Rank 1: Salvage uncommon components when scrapping. Rank 2: Also salvage rare materials.' },
  { key: 'scrounger', label: 'Scrounger', ranks: 3, requirements: { LCK: 6, level: 1 }, source: 'Core', description: 'When rolling to determine ammo found: Rank 1: +3 CD. Rank 2: +6 CD. Rank 3: +10 CD.' },
  { key: 'shotgun_surgeon', label: 'Shotgun Surgeon', ranks: 1, requirements: { STR: 5, AGI: 7 }, source: 'Core', description: 'Ranged attacks using shotguns gain Piercing 1, or add +1 to any existing Piercing X.' },
  { key: 'size_matters', label: 'Size Matters', ranks: 3, requirements: { END: 7, AGI: 6 }, source: 'Core', description: 'When making a ranged attack with any heavy weapon, add +1 CD per rank.' },
  { key: 'skilled', label: 'Skilled', ranks: 10, requirements: { level: 3 }, source: 'Core', description: 'Add +1 rank to two skills, or +2 ranks to one skill. No skill may exceed 6 ranks.' },
  { key: 'slayer', label: 'Slayer', ranks: 1, requirements: { STR: 8 }, source: 'Core', description: 'When you inflict any damage with an unarmed or melee attack, spend 1 Luck point to immediately inflict a critical hit (injury) on the location hit.' },
  { key: 'smooth_talker', label: 'Smooth Talker', ranks: 1, requirements: { CHA: 6 }, source: 'Core', description: 'When making a Barter or Speech test as part of an opposed test, re-roll 1d20.' },
  { key: 'snakeater', label: 'Snakeater', ranks: 1, requirements: { END: 7 }, source: 'Core', description: 'Poison damage resistance increases by +2.' },
  { key: 'sniper', label: 'Sniper', ranks: 1, requirements: { PER: 8, AGI: 6 }, source: 'Core', description: 'When taking the Aim minor action before attacking with a two-handed Accurate weapon, specify a hit location without increasing difficulty.' },
  { key: 'solar_powered', label: 'Solar Powered', ranks: 1, requirements: { END: 7 }, source: 'Core', description: 'For every hour in direct sunlight, heal 1 radiation damage.' },
  { key: 'steady_aim', label: 'Steady Aim', ranks: 1, requirements: { STR: 8, AGI: 7 }, source: 'Core', description: 'When taking the Aim minor action, either re-roll 2d20 on the first attack, or re-roll 1d20 on all attacks this turn.' },
  { key: 'strong_back', label: 'Strong Back', ranks: 3, requirements: { STR: 5, level: 1 }, source: 'Core', description: 'Maximum carry weight increases by +25 lbs per rank.' },
  { key: 'tag_perk', label: 'Tag!', ranks: 1, requirements: { level: 5 }, source: 'Core', description: 'Select one additional Tag skill. Increase it by 2 ranks (max 6) and mark it as a Tag skill.' },
  { key: 'terrifying_presence', label: 'Terrifying Presence', ranks: 2, requirements: { STR: 6, CHA: 8, level: 3 }, source: 'Core', description: 'Rank 1: Re-roll 1d20 on Speech tests to threaten or scare. Rank 2: Use a major action to force an enemy within Medium range to move away on their next turn.' },
  { key: 'toughness', label: 'Toughness', ranks: 2, requirements: { END: 6, LCK: 6, level: 1 }, source: 'Core', description: 'Physical DR on all locations increases by +1 per rank.' },
];

export const SURVIVOR_TRAITS = [
  { key: 'educated', label: 'Educated', benefit: 'One additional Tag skill of your choice.', penalty: 'When you fail a test using a non-Tag skill, the GM gains 1 AP.' },
  { key: 'fast_shot', label: 'Fast Shot', benefit: 'A second major action ranged attack costs 1 AP instead of 2.', penalty: 'Cannot benefit from the Aim minor action.' },
  { key: 'gifted', label: 'Gifted', benefit: 'Choose two SPECIAL attributes; each increases by +1 at creation.', penalty: 'Maximum Luck points reduced by 1.' },
  { key: 'heavy_handed', label: 'Heavy Handed', benefit: '+1 CD to your melee damage bonus.', penalty: 'Melee and unarmed attacks trigger a complication on 19–20 instead of only 20.' },
  { key: 'small_frame', label: 'Small Frame', benefit: 'Re-roll 1d20 on AGI tests involving balance or contortion.', penalty: 'Carry weight = 150 + 5×STR instead of 150 + 10×STR.' },
];

export const MR_HANDY_ARMS = [
  { key: 'pistol_10mm', label: '10mm Auto Pistol', damage: '2 CD', damageType: 'Physical', range: 'Short', qualities: 'Ranged', note: 'Standard issue arm weapon.' },
  { key: 'buzz_saw_arm', label: 'Buzz-Saw', damage: '3 CD', damageEffect: 'Piercing 1', damageType: 'Physical', range: 'Melee', qualities: 'Melee', note: '' },
  { key: 'flamer_arm', label: 'Flamer (built-in)', damage: '4 CD', damageEffect: 'Persistent, Spread', damageType: 'Energy', range: 'Close', qualities: 'Ranged, Inaccurate', note: '' },
  { key: 'laser_emitter_arm', label: 'Laser Emitter', damage: '3 CD', damageType: 'Energy', range: 'Medium', qualities: 'Ranged', note: '' },
  { key: 'pincer_arm', label: 'Pincer', damage: '2 CD', damageType: 'Physical', range: 'Melee', qualities: 'Unarmed', note: 'Required for Lockpick, Repair, Throwing, and object manipulation.' },
];

export const RESTRICTED_ARMOR_ORIGINS = ['Super Mutant'];

export const ORIGIN_PACKS = {
  'Brotherhood Initiate': [
    { key: 'bos_initiate', label: 'Brotherhood Initiate', description: "A new recruit training to fight the Brotherhood's battles, aspiring to become a Knight.", equipment: [
      { type: 'apparel', name: 'Brotherhood Fatigues', quantity: 1 },
      { type: 'apparel', name: 'Brotherhood Hood', quantity: 1 },
      { type: 'weapon', name: 'Combat Knife', quantity: 1 },
      { type: 'weapon', name: 'Laser Pistol', quantity: 1, optional: true, optionKey: 'bos_initiate_ranged', optionLabel: 'Choose sidearm', options: ['Laser Pistol + Fusion Cell (10+5CD shots)', '10mm Pistol + 10mm Ammo (10+5CD)'] },
      { type: 'ammo', name: 'Fusion Cell', quantity: 10, note: '+5CD shots', conditional: 'Laser Pistol' },
      { type: 'miscellany', name: 'Brotherhood Holotags', quantity: 1 },
    ]},
    { key: 'bos_scribe', label: 'Brotherhood Scribe', description: "One of the Brotherhood's best and brightest, dedicated to research and technology.", equipment: [
      { type: 'apparel', name: "Brotherhood Scribe's Armor", quantity: 1 },
      { type: 'apparel', name: "Brotherhood Scribe's Hat", quantity: 1 },
      { type: 'weapon', name: 'Combat Knife', quantity: 1 },
      { type: 'weapon', name: 'Laser Pistol', quantity: 1, optional: true, optionKey: 'bos_scribe_ranged', optionLabel: 'Choose sidearm', options: ['Laser Pistol + Fusion Cell (6+3CD shots)', '10mm Pistol + 10mm Ammo (6+3CD)'] },
      { type: 'ammo', name: 'Fusion Cell', quantity: 6, note: '+3CD shots', conditional: 'Laser Pistol' },
      { type: 'miscellany', name: 'Brotherhood Holotags', quantity: 1 },
    ]},
  ],
  'Ghoul': [
    { key: 'ghoul_mercenary', label: 'Mercenary', description: 'A hired gun, fighting for whoever pays. You live by a code when times are good.', equipment: [
      { type: 'apparel', name: 'Tough Clothing', quantity: 1 },
      {
        type: 'apparel',
        name: 'Leather Armor Choice',
        quantity: 1,
        optional: true,
        optionKey: 'ghoul_merc_armor',
        optionLabel: 'Choose leather armor',
        options: [
          'Leather Chest Piece',
          'Leather Left Arm + Leather Left Leg',
          'Leather Left Arm + Leather Right Leg',
          'Leather Right Arm + Leather Left Leg',
          'Leather Right Arm + Leather Right Leg',
        ],
        optionItems: {
          'Leather Chest Piece': [{ type: 'apparel', name: 'Leather Chest Piece', quantity: 1 }],
          'Leather Left Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Left Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
          'Leather Right Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Right Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
        },
      },
      { type: 'weapon', name: 'Melee Weapon', quantity: 1, optional: true, optionKey: 'mercenary_melee', optionLabel: 'Choose melee', options: ['Machete', 'Baseball Bat', 'Tire Iron'] },
      { type: 'weapon', name: 'Ranged Weapon', quantity: 1, optional: true, optionKey: 'mercenary_ranged', optionLabel: 'Choose ranged', options: ['10mm Pistol', '.44 Pistol', 'Hunting Rifle', 'Pipe Bolt-Action'] },
      { type: 'ammo', name: 'Ammo (for chosen weapon)', quantity: 10, note: '+5CD' },
      { type: 'miscellany', name: 'Job offer note (50 caps reward)', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 15 },
    ]},
    { key: 'ghoul_raider', label: 'Raider', description: 'Might makes right. You take what you need.', equipment: [
      { type: 'apparel', name: 'Harness', quantity: 1 },
      {
        type: 'apparel',
        name: 'Raider Armor Choice',
        quantity: 1,
        optional: true,
        optionKey: 'ghoul_raider_armor',
        optionLabel: 'Choose raider armor',
        options: ['Raider Chest Piece + Raider Left Arm', 'Raider Chest Piece + Raider Right Arm'],
        optionItems: {
          'Raider Chest Piece + Raider Left Arm': [{ type: 'apparel', name: 'Raider Chest Piece', quantity: 1 }, { type: 'apparel', name: 'Raider Left Arm', quantity: 1 }],
          'Raider Chest Piece + Raider Right Arm': [{ type: 'apparel', name: 'Raider Chest Piece', quantity: 1 }, { type: 'apparel', name: 'Raider Right Arm', quantity: 1 }],
        },
      },
      { type: 'weapon', name: 'Melee Weapon', quantity: 1, optional: true, optionKey: 'raider_melee', optionLabel: 'Choose melee', options: ['Lead Pipe', 'Pool Cue', 'Tire Iron'] },
      { type: 'weapon', name: 'Pipe Gun', quantity: 1 },
      { type: 'ammo', name: '.38', quantity: 10, note: '+5CD rounds' },
      { type: 'consumable', name: 'Chem', quantity: 1, optional: true, optionKey: 'raider_chem', optionLabel: 'Choose chem', options: ['Jet', 'RadAway'] },
      {
        type: 'miscellany',
        name: 'Raider Throwables',
        quantity: 1,
        optional: true,
        optionKey: 'ghoul_raider_throwable',
        optionLabel: 'Choose bonus item',
        options: ['Molotov Cocktail', 'Stimpak'],
        optionItems: {
          'Molotov Cocktail': [{ type: 'weapon', name: 'Molotov Cocktail', quantity: 1 }],
          'Stimpak': [{ type: 'consumable', name: 'Stimpak', quantity: 1 }],
        },
      },
      { type: 'currency', name: 'Caps', quantity: 15 },
    ]},
    { key: 'ghoul_settler', label: 'Settler', description: 'You carved out something like a home in the wasteland.', equipment: [
      { type: 'apparel', name: 'Tough Clothing', quantity: 1 },
      { type: 'weapon', name: 'Melee Weapon', quantity: 1, optional: true, optionKey: 'settler_melee', optionLabel: 'Choose melee', options: ['Switchblade', 'Pipe Wrench', 'Rolling Pin', 'Knuckles'] },
      { type: 'weapon', name: 'Pipe Gun', quantity: 1 },
      { type: 'ammo', name: '.38', quantity: 6, note: '+3CD rounds' },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 45 },
    ]},
    { key: 'ghoul_trader', label: 'Trader', description: 'A travelling merchant with brahmin and wares.', equipment: [
      { type: 'apparel', name: 'Tough Clothing', quantity: 1 },
      {
        type: 'apparel',
        name: 'Leather Armor Choice',
        quantity: 1,
        optional: true,
        optionKey: 'ghoul_trader_armor',
        optionLabel: 'Choose leather armor',
        options: [
          'Leather Chest Piece',
          'Leather Left Arm + Leather Left Leg',
          'Leather Left Arm + Leather Right Leg',
          'Leather Right Arm + Leather Left Leg',
          'Leather Right Arm + Leather Right Leg',
        ],
        optionItems: {
          'Leather Chest Piece': [{ type: 'apparel', name: 'Leather Chest Piece', quantity: 1 }],
          'Leather Left Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Left Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
          'Leather Right Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Right Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
        },
      },
      { type: 'weapon', name: 'Pipe Gun', quantity: 1 },
      { type: 'ammo', name: '.38', quantity: 8, note: '+4CD rounds' },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
      { type: 'miscellany', name: 'Pack Brahmin', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 50 },
    ]},
    { key: 'ghoul_wanderer', label: 'Wanderer', description: 'A scavenger who travels between settlements.', equipment: [
      { type: 'apparel', name: 'Drifter Outfit', quantity: 1 },
      { type: 'weapon', name: 'Melee Weapon', quantity: 1, optional: true, optionKey: 'wanderer_melee', optionLabel: 'Choose melee', options: ['Switchblade', 'Pipe Wrench', 'Rolling Pin', 'Knuckles'] },
      { type: 'weapon', name: 'Pipe Gun', quantity: 1 },
      { type: 'ammo', name: '.38', quantity: 8, note: '+4CD rounds' },
      { type: 'consumable', name: 'Chem', quantity: 1, optional: true, optionKey: 'wanderer_chem', optionLabel: 'Choose chem', options: ['Jet', 'RadAway'] },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 30 },
    ]},
  ],
  'Super Mutant': [
    { key: 'sm_brute', label: 'Brute', description: 'Big, tough, and surviving on brute force and determination.', equipment: [
      { type: 'apparel', name: 'Raider Chest Piece', quantity: 1 },
      { type: 'weapon', name: 'Pipe Rifle', quantity: 1 },
      { type: 'ammo', name: '.38', quantity: 6, note: '+3CD rounds' },
      { type: 'weapon', name: 'Melee Weapon', quantity: 1, optional: true, optionKey: 'brute_melee', optionLabel: 'Choose melee', options: ['Baseball Bat', 'Machete'] },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 5 },
    ]},
    { key: 'sm_skirmisher', label: 'Skirmisher', description: 'Bigger and tougher than most mutants, with punchier gear.', equipment: [
      { type: 'apparel', name: 'Raider Chest Piece', quantity: 1 },
      { type: 'weapon', name: 'Pipe Bolt-Action', quantity: 1, note: 'Hardened receiver' },
      { type: 'ammo', name: '.308', quantity: 8, note: '+4CD rounds' },
      { type: 'weapon', name: 'Board', quantity: 1 },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 5 },
    ]},
    { key: 'nightkin', label: 'Nightkin', description: 'Stealth, silence, safety - a survivor who trusts nothing more than a Stealth Boy.', equipment: [
      { type: 'weapon', name: 'Laser Rifle', quantity: 1 },
      { type: 'ammo', name: 'Fusion Cell', quantity: 8, note: '+6CD shots' },
      { type: 'weapon', name: 'Bumper Sword', quantity: 1 },
      { type: 'apparel', name: 'Raider Chest Piece', quantity: 1 },
      { type: 'apparel', name: 'Raider Arm', quantity: 1, optional: true, optionKey: 'nightkin_arm', optionLabel: 'Choose raider arm', options: ['Raider Left Arm', 'Raider Right Arm'] },
      { type: 'apparel', name: 'Raider Leg', quantity: 1, optional: true, optionKey: 'nightkin_leg', optionLabel: 'Choose raider leg', options: ['Raider Left Leg', 'Raider Right Leg'] },
      { type: 'consumable', name: 'Stealth Boy', quantity: 1 },
    ]},
  ],
  'Mister Handy': [
    { key: 'mh_miss_nanny', label: 'Miss Nanny', description: 'A domestic caretaker model with a feminine voice and persona.', equipment: [
      { type: 'weapon', name: 'Third Arm Attachment', quantity: 1, optional: true, optionKey: 'miss_nanny_arm3', optionLabel: 'Choose third arm', options: ['Pincer', 'Buzz-Saw', 'Laser Emitter', '10mm Auto Pistol'] },
      { type: 'robot_armor', name: 'Standard Plating', quantity: 1 },
      { type: 'robot_mod', name: 'Behavioral Analysis Mod', quantity: 1 },
      { type: 'robot_mod', name: 'Hazard Detection Mod', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 10 },
    ]},
    { key: 'mh_farmhand', label: 'Mister Farmhand', description: 'Built to assist on a farm, tending crops and herds.', equipment: [
      { type: 'robot_armor', name: 'Standard Plating', quantity: 1 },
      { type: 'miscellany', name: 'Bag of Fertilizer', quantity: 1 },
      { type: 'food', name: 'Mutfruit', quantity: 2 },
      { type: 'currency', name: 'Caps', quantity: 25 },
    ]},
    { key: 'mh_gutsy', label: 'Mister Gutsy', description: 'A military combat model with heavier arms and armor.', equipment: [
      { type: 'robot_armor', name: 'Mister Gutsy Plating', quantity: 1 },
      { type: 'robot_mod', name: 'Recon Sensors Mod', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 10 },
    ]},
    { key: 'mh_standard', label: 'Mister Handy', description: 'The standard domestic robotic butler model.', equipment: [
      { type: 'robot_armor', name: 'Standard Plating', quantity: 1 },
      { type: 'consumable', name: 'Robot Repair Kit', quantity: 1 },
      { type: 'robot_mod', name: 'Integral Boiler Mod', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 10 },
    ]},
    { key: 'mh_nurse', label: 'Nurse Handy', description: 'A medical model intended as medic, nurse, or orderly.', equipment: [
      { type: 'robot_armor', name: 'Standard Plating', quantity: 1 },
      { type: 'consumable', name: 'Stimpak', quantity: 1 },
      { type: 'robot_mod', name: 'Diagnosis Mod', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 10 },
    ]},
  ],
  'Survivor': [
    { key: 'surv_mercenary', label: 'Mercenary', description: 'A hired gun living by a code when times allow.', equipment: [
      { type: 'apparel', name: 'Tough Clothing', quantity: 1 },
      {
        type: 'apparel',
        name: 'Leather Armor Choice',
        quantity: 1,
        optional: true,
        optionKey: 'surv_merc_armor',
        optionLabel: 'Choose leather armor',
        options: [
          'Leather Chest Piece',
          'Leather Left Arm + Leather Left Leg',
          'Leather Left Arm + Leather Right Leg',
          'Leather Right Arm + Leather Left Leg',
          'Leather Right Arm + Leather Right Leg',
        ],
        optionItems: {
          'Leather Chest Piece': [{ type: 'apparel', name: 'Leather Chest Piece', quantity: 1 }],
          'Leather Left Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Left Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
          'Leather Right Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Right Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
        },
      },
      { type: 'weapon', name: 'Melee Weapon', quantity: 1, optional: true, optionKey: 'surv_merc_melee', optionLabel: 'Choose melee', options: ['Machete', 'Baseball Bat', 'Tire Iron'] },
      { type: 'weapon', name: 'Ranged Weapon', quantity: 1, optional: true, optionKey: 'surv_merc_ranged', optionLabel: 'Choose ranged', options: ['10mm Pistol', '.44 Pistol', 'Hunting Rifle', 'Pipe Bolt-Action'] },
      { type: 'ammo', name: 'Ammo (for chosen weapon)', quantity: 10, note: '+5CD' },
      { type: 'miscellany', name: 'Job offer note (50 caps reward)', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 15 },
    ]},
    { key: 'surv_raider', label: 'Raider', description: 'Might makes right — you take what you need.', equipment: [
      { type: 'apparel', name: 'Harness', quantity: 1 },
      {
        type: 'apparel',
        name: 'Raider Armor Choice',
        quantity: 1,
        optional: true,
        optionKey: 'surv_raider_armor',
        optionLabel: 'Choose raider armor',
        options: ['Raider Chest Piece + Raider Left Arm', 'Raider Chest Piece + Raider Right Arm'],
        optionItems: {
          'Raider Chest Piece + Raider Left Arm': [{ type: 'apparel', name: 'Raider Chest Piece', quantity: 1 }, { type: 'apparel', name: 'Raider Left Arm', quantity: 1 }],
          'Raider Chest Piece + Raider Right Arm': [{ type: 'apparel', name: 'Raider Chest Piece', quantity: 1 }, { type: 'apparel', name: 'Raider Right Arm', quantity: 1 }],
        },
      },
      { type: 'weapon', name: 'Melee Weapon', quantity: 1, optional: true, optionKey: 'surv_raider_melee', optionLabel: 'Choose melee', options: ['Lead Pipe', 'Pool Cue', 'Tire Iron'] },
      { type: 'weapon', name: 'Pipe Gun', quantity: 1 },
      { type: 'ammo', name: '.38', quantity: 10, note: '+5CD rounds' },
      { type: 'consumable', name: 'Chem', quantity: 1, optional: true, optionKey: 'surv_raider_chem', optionLabel: 'Choose chem', options: ['Jet', 'RadAway'] },
      {
        type: 'miscellany',
        name: 'Raider Throwables',
        quantity: 1,
        optional: true,
        optionKey: 'surv_raider_throwable',
        optionLabel: 'Choose bonus item',
        options: ['Molotov Cocktail', 'Stimpak'],
        optionItems: {
          'Molotov Cocktail': [{ type: 'weapon', name: 'Molotov Cocktail', quantity: 1 }],
          'Stimpak': [{ type: 'consumable', name: 'Stimpak', quantity: 1 }],
        },
      },
      { type: 'currency', name: 'Caps', quantity: 15 },
    ]},
    { key: 'surv_settler', label: 'Settler', description: 'Carved out a home in the wasteland through hard work.', equipment: [
      { type: 'apparel', name: 'Tough Clothing', quantity: 1 },
      { type: 'weapon', name: 'Melee Weapon', quantity: 1, optional: true, optionKey: 'surv_settler_melee', optionLabel: 'Choose melee', options: ['Switchblade', 'Pipe Wrench', 'Rolling Pin', 'Knuckles'] },
      { type: 'weapon', name: 'Pipe Gun', quantity: 1 },
      { type: 'ammo', name: '.38', quantity: 6, note: '+3CD rounds' },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 45 },
    ]},
    { key: 'surv_trader', label: 'Trader', description: 'A travelling caravan merchant.', equipment: [
      { type: 'apparel', name: 'Tough Clothing', quantity: 1 },
      {
        type: 'apparel',
        name: 'Leather Armor Choice',
        quantity: 1,
        optional: true,
        optionKey: 'surv_trader_armor',
        optionLabel: 'Choose leather armor',
        options: [
          'Leather Chest Piece',
          'Leather Left Arm + Leather Left Leg',
          'Leather Left Arm + Leather Right Leg',
          'Leather Right Arm + Leather Left Leg',
          'Leather Right Arm + Leather Right Leg',
        ],
        optionItems: {
          'Leather Chest Piece': [{ type: 'apparel', name: 'Leather Chest Piece', quantity: 1 }],
          'Leather Left Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Left Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
          'Leather Right Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Right Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
        },
      },
      { type: 'weapon', name: 'Pipe Gun', quantity: 1 },
      { type: 'ammo', name: '.38', quantity: 8, note: '+4CD rounds' },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
      { type: 'miscellany', name: 'Pack Brahmin', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 50 },
    ]},
    { key: 'surv_wanderer', label: 'Wanderer', description: 'Travels between settlements, scavenging ruins.', equipment: [
      { type: 'apparel', name: 'Drifter Outfit', quantity: 1 },
      { type: 'weapon', name: 'Melee Weapon', quantity: 1, optional: true, optionKey: 'surv_wand_melee', optionLabel: 'Choose melee', options: ['Switchblade', 'Pipe Wrench', 'Rolling Pin', 'Knuckles'] },
      { type: 'weapon', name: 'Pipe Gun', quantity: 1 },
      { type: 'ammo', name: '.38', quantity: 8, note: '+4CD rounds' },
      { type: 'consumable', name: 'Chem', quantity: 1, optional: true, optionKey: 'surv_wand_chem', optionLabel: 'Choose chem', options: ['Jet', 'RadAway'] },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 30 },
    ]},
  ],
  'Vault Dweller': [
    { key: 'vd_resident', label: 'Vault-Tec Resident', description: 'A vault inhabitant who survived underground until now.', equipment: [
      { type: 'apparel', name: 'Vault Jumpsuit', quantity: 1 },
      { type: 'miscellany', name: 'Pip-Boy', quantity: 1 },
      { type: 'miscellany', name: 'Vault-Tec Canteen (1 Purified Water)', quantity: 1 },
      { type: 'weapon', name: 'Switchblade', quantity: 1 },
      { type: 'weapon', name: '10mm Pistol', quantity: 1 },
      { type: 'ammo', name: '10mm', quantity: 6, note: '+3CD rounds' },
      { type: 'consumable', name: 'Stimpak', quantity: 2 },
      { type: 'currency', name: 'Caps', quantity: 10 },
    ]},
    { key: 'vd_security', label: 'Vault-Tec Security', description: 'A vault security officer trusted with maintaining safety.', equipment: [
      { type: 'apparel', name: 'Vault Jumpsuit', quantity: 1 },
      { type: 'apparel', name: 'Vault-Tec Security Armor', quantity: 1 },
      { type: 'apparel', name: 'Vault-Tec Security Helmet', quantity: 1 },
      { type: 'miscellany', name: 'Pip-Boy', quantity: 1 },
      { type: 'miscellany', name: 'Vault-Tec Canteen (1 Purified Water)', quantity: 1 },
      { type: 'weapon', name: 'Baton', quantity: 1 },
      { type: 'weapon', name: '10mm Pistol', quantity: 1 },
      { type: 'ammo', name: '10mm', quantity: 8, note: '+4CD rounds' },
      { type: 'consumable', name: 'Stimpak', quantity: 1 },
    ]},
  ],
  'Commonwealth Minuteman': [
    { key: 'mm_rifleman', label: 'Rifleman', description: "Core militia, trained in marksmanship and responding at a moment's notice.", equipment: [
      { type: 'apparel', name: 'Casual Clothing', quantity: 1 },
      { type: 'apparel', name: 'Casual Hat', quantity: 1 },
      {
        type: 'apparel',
        name: 'Leather Armor Choice',
        quantity: 1,
        optional: true,
        optionKey: 'mm_rif_armor',
        optionLabel: 'Choose leather armor',
        options: ['Leather Chest Piece', 'Leather Left Arm', 'Leather Right Arm'],
        optionItems: {
          'Leather Chest Piece': [{ type: 'apparel', name: 'Leather Chest Piece', quantity: 1 }],
          'Leather Left Arm': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }],
          'Leather Right Arm': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }],
        },
      },
      { type: 'weapon', name: 'Primary Weapon', quantity: 1, optional: true, optionKey: 'mm_rif_weapon', optionLabel: 'Choose weapon', options: ['Laser Musket', 'Hunting Rifle'] },
      { type: 'ammo', name: 'Fusion Cell', quantity: 14, note: '+7CD (if Laser Musket)', conditional: 'Laser Musket' },
      { type: 'ammo', name: '.308', quantity: 6, note: '+3CD (if Hunting Rifle)', conditional: 'Hunting Rifle' },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 5 },
    ]},
    { key: 'mm_tough', label: 'Tough', description: 'A close-range fighter using shotguns or SMGs to flank pinned enemies.', equipment: [
      { type: 'apparel', name: 'Casual Clothing', quantity: 1 },
      { type: 'apparel', name: 'Army Helmet', quantity: 1 },
      { type: 'apparel', name: 'Metal Chest Piece', quantity: 1 },
      { type: 'weapon', name: 'Primary Weapon', quantity: 1, optional: true, optionKey: 'mm_tough_weapon', optionLabel: 'Choose weapon', options: ['Double-Barrel Shotgun', 'Submachine Gun'] },
      { type: 'ammo', name: 'Shotgun Shells', quantity: 6, note: '+3CD (if Shotgun)' },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 5 },
    ]},
  ],
  'New California Republic': [
    { key: 'ncr_trooper', label: 'Trooper', description: 'A volunteer or conscript to the NCR Army.', equipment: [
      { type: 'apparel', name: 'Military Fatigues', quantity: 1 },
      { type: 'apparel', name: 'Army Helmet', quantity: 1 },
      { type: 'weapon', name: 'Primary Weapon', quantity: 1, optional: true, optionKey: 'ncr_tr_weapon', optionLabel: 'Choose primary', options: ['Combat Rifle', 'Combat Shotgun'] },
      { type: 'weapon', name: 'Secondary', quantity: 1, optional: true, optionKey: 'ncr_tr_secondary', optionLabel: 'Choose secondary', options: ['10mm Pistol', 'Combat Knife'] },
      { type: 'food', name: 'Food (random roll)', quantity: 1 },
      { type: 'miscellany', name: 'Purified Water', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 10 },
    ]},
    { key: 'ncr_marksman', label: 'Marksman', description: 'A sniper supporting NCR tactical operations from range.', equipment: [
      { type: 'apparel', name: 'Military Fatigues', quantity: 1 },
      { type: 'apparel', name: 'Army Helmet', quantity: 1 },
      { type: 'weapon', name: 'Hunting Rifle', quantity: 1, note: 'Hardened, Long Scope' },
      { type: 'ammo', name: '.308', quantity: 6, note: '+3CD rounds' },
      { type: 'consumable', name: 'Calmex', quantity: 1 },
      { type: 'food', name: 'Food (random roll)', quantity: 1 },
    ]},
    { key: 'ncr_caravaneer', label: 'Crimson Caravaneer', description: 'A convoy driver making money on routes less traveled.', equipment: [
      { type: 'apparel', name: 'Tough Clothing', quantity: 1 },
      {
        type: 'apparel',
        name: 'Leather Armor Choice',
        quantity: 1,
        optional: true,
        optionKey: 'ncr_car_armor',
        optionLabel: 'Choose leather armor',
        options: [
          'Leather Chest Piece',
          'Leather Left Arm + Leather Left Leg',
          'Leather Left Arm + Leather Right Leg',
          'Leather Right Arm + Leather Left Leg',
          'Leather Right Arm + Leather Right Leg',
        ],
        optionItems: {
          'Leather Chest Piece': [{ type: 'apparel', name: 'Leather Chest Piece', quantity: 1 }],
          'Leather Left Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Left Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
          'Leather Right Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Right Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
        },
      },
      { type: 'weapon', name: 'Primary Weapon', quantity: 1, optional: true, optionKey: 'ncr_car_weapon', optionLabel: 'Choose weapon', options: ['Double-Barrel Shotgun', '.44 Pistol'] },
      { type: 'weapon', name: 'Melee', quantity: 1, optional: true, optionKey: 'ncr_car_melee', optionLabel: 'Choose melee', options: ['Combat Knife', 'Knuckles'] },
      { type: 'miscellany', name: 'Pack Brahmin', quantity: 1 },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
      { type: 'miscellany', name: 'Deck of Cards', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 10 },
    ]},
  ],
  'Protectron': [
    { key: 'prot_standard', label: 'Protectron', description: 'Baseline security or general-purpose laborer.', equipment: [
      { type: 'robot_armor', name: 'Standard Plating', quantity: 1 },
      { type: 'ammo', name: 'Fusion Cell', quantity: 14, note: '+7CD shots' },
      { type: 'robot_mod', name: 'Recon Sensors', quantity: 1 },
      { type: 'robot_mod', name: 'Hazard Detection Mod', quantity: 1 },
      { type: 'consumable', name: 'Robot Repair Kit', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 20 },
    ]},
    { key: 'prot_fire', label: 'Fire Brigadier', description: 'Built to suppress fires and identify hazards.', equipment: [
      { type: 'robot_armor', name: 'Standard Plating', quantity: 1 },
      { type: 'ammo', name: 'Cryo Cell', quantity: 14, note: '+7CD shots' },
      { type: 'robot_mod', name: 'Protectron Sensors', quantity: 1, optional: true, optionKey: 'prot_fire_sensor', optionLabel: 'Choose sensor mod', options: ['Hazard Detection Mod', 'Sensor Array'] },
      { type: 'consumable', name: 'Stimpak', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 10 },
    ]},
    { key: 'prot_medic', label: 'Protectron Medic', description: 'Built for emergency medical response.', equipment: [
      { type: 'robot_armor', name: 'Standard Plating', quantity: 1 },
      { type: 'robot_mod', name: 'Diagnosis Mod', quantity: 1 },
      { type: 'consumable', name: 'Stimpak', quantity: 2 },
      { type: 'consumable', name: 'RadAway', quantity: 1 },
    ]},
  ],
  'Robobrain': [
    { key: 'rb_servomech', label: 'Servomech', description: 'Salvaged from a factory model, jury-rigged and more personable.', equipment: [
      { type: 'ammo', name: 'Fusion Cell', quantity: 14, note: '+7CD shots' },
      { type: 'consumable', name: 'Robot Repair Kit', quantity: 2 },
      { type: 'apparel', name: 'Hat', quantity: 1, optional: true, optionKey: 'rb_servomech_hat', optionLabel: 'Choose hat', options: ['Casual Hat', 'Formal Hat'] },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
    ]},
    { key: 'rb_us_army', label: 'U.S. Army Model', description: 'Standard military configuration.', equipment: [
      { type: 'ammo', name: 'Fusion Cell', quantity: 14, note: '+7CD shots' },
      { type: 'weapon', name: 'Combat Rifle', quantity: 1 },
      { type: 'ammo', name: '.45', quantity: 8, note: '+4CD rounds' },
      { type: 'robot_armor', name: 'Factory Armor', quantity: 1 },
    ]},
    { key: 'rb_errant', label: 'Errant Personality', description: 'Changed enough by wasteland travel to be unrecognizable from factory defaults.', equipment: [
      { type: 'ammo', name: 'Fuel/Energy', quantity: 14, optional: true, optionKey: 'rb_erra_ammo', optionLabel: 'Choose ammo', options: ['Fusion Cell (14+7CD)', 'Flamer Fuel (12+6CD)'] },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 2 },
      { type: 'currency', name: 'Caps', quantity: 10 },
    ]},
  ],
  'Securitron': [
    { key: 'securitron', label: 'Securitron', description: 'Built for security, outfitted for its original purpose.', equipment: [
      { type: 'ammo', name: 'Fusion Cell', quantity: 14, note: '+7CD shots' },
      { type: 'ammo', name: '.45', quantity: 8, note: '+4CD rounds' },
      { type: 'robot_armor', name: 'Factory Armor', quantity: 1 },
      { type: 'miscellany', name: 'Built-in Printer', quantity: 1 },
    ]},
  ],
  'Generation 3 Synth': [
    { key: 'synth_infiltrator', label: 'Synth Infiltrator', description: 'Created to infiltrate settlements for the Institute.', equipment: [
      { type: 'apparel', name: 'Tough Clothing', quantity: 1 },
      { type: 'weapon', name: 'Melee', quantity: 1, optional: true, optionKey: 'si_melee', optionLabel: 'Choose melee', options: ['Baseball Bat', 'Switchblade'] },
      { type: 'weapon', name: 'Ranged', quantity: 1, optional: true, optionKey: 'si_ranged', optionLabel: 'Choose ranged', options: ['Pipe Gun', '10mm Pistol'] },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
    ]},
    { key: 'synth_seeker', label: 'Synth Seeker', description: 'Designed to travel the Commonwealth seeking resources and fugitives.', equipment: [
      { type: 'apparel', name: 'Tough Clothing', quantity: 1 },
      {
        type: 'apparel',
        name: 'Leather Armor Choice',
        quantity: 1,
        optional: true,
        optionKey: 'synth_seeker_armor',
        optionLabel: 'Choose leather armor',
        options: [
          'Leather Chest Piece',
          'Leather Left Arm + Leather Left Leg',
          'Leather Left Arm + Leather Right Leg',
          'Leather Right Arm + Leather Left Leg',
          'Leather Right Arm + Leather Right Leg',
        ],
        optionItems: {
          'Leather Chest Piece': [{ type: 'apparel', name: 'Leather Chest Piece', quantity: 1 }],
          'Leather Left Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Left Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Left Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
          'Leather Right Arm + Leather Left Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Left Leg', quantity: 1 }],
          'Leather Right Arm + Leather Right Leg': [{ type: 'apparel', name: 'Leather Right Arm', quantity: 1 }, { type: 'apparel', name: 'Leather Right Leg', quantity: 1 }],
        },
      },
      { type: 'weapon', name: 'Melee', quantity: 1, optional: true, optionKey: 'ss_melee', optionLabel: 'Choose melee', options: ['Knuckles', 'Lead Pipe'] },
      { type: 'weapon', name: 'Ranged', quantity: 1, optional: true, optionKey: 'ss_ranged', optionLabel: 'Choose ranged', options: ['10mm Pistol', 'Flare Gun', 'Hunting Rifle'] },
      { type: 'ammo', name: 'Ammo (for chosen ranged)', quantity: 3, note: '+3CD' },
    ]},
  ],
  'Assaultron': [
    { key: 'ass_military', label: 'U.S. Military Model', description: 'Built for rapid close-range engagement.', equipment: [
      { type: 'robot_armor', name: 'Standard Plating', quantity: 1 },
      { type: 'robot_armor', name: 'Actuated Frame', quantity: 1, optional: true, optionKey: 'ass_military_frame', optionLabel: 'Choose actuated frame fit', options: ['Actuated Frame Body', 'Actuated Frame Arm + Actuated Frame Leg'] },
      { type: 'ammo', name: 'Fusion Cell', quantity: 8, note: '+7CD shots' },
      { type: 'robot_mod', name: 'Recon Sensors', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 15 },
    ]},
    { key: 'ass_caravan', label: 'Caravan Guard', description: 'Reinforced with heavier armor to protect a caravan.', equipment: [
      { type: 'robot_armor', name: 'Factory Storage Armor', quantity: 1 },
      { type: 'ammo', name: 'Fusion Cell', quantity: 14, note: '+7CD shots' },
      { type: 'robot_mod', name: 'Behavioral Analysis Module', quantity: 1 },
    ]},
    { key: 'ass_devil', label: 'Assaultron Devil', description: "Rebuilt by the Rust Devils — every part designed for violence.", equipment: [
      { type: 'robot_armor', name: 'Serrated Plate', quantity: 1 },
      { type: 'robot_armor', name: 'Serrated Plating Fit', quantity: 1, optional: true, optionKey: 'ass_devil_plate_fit', optionLabel: 'Choose serrated plate fit', options: ['Serrated Plate Body', 'Serrated Plate Arm + Serrated Plate Leg'] },
      { type: 'robot_mod', name: 'Hazard Detection Mod', quantity: 1 },
      { type: 'ammo', name: 'Fusion Cell', quantity: 6, note: '+6CD shots' },
      { type: 'consumable', name: 'Robot Repair Kit', quantity: 1 },
    ]},
  ],
  'Brotherhood Outcast': [
    { key: 'bo_knight', label: 'Ex-Knight', description: 'Military-minded, armed and ready.', equipment: [
      { type: 'weapon', name: 'Laser Rifle', quantity: 1 },
      { type: 'ammo', name: 'Fusion Cell', quantity: 8, note: '+6CD shots' },
      { type: 'apparel', name: 'Brotherhood of Steel Fatigues', quantity: 1 },
      { type: 'miscellany', name: 'Military Canteen', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 10 },
    ]},
    { key: 'bo_scribe', label: 'Ex-Scribe', description: 'A knowledge-focused outcast who left with their expertise.', equipment: [
      { type: 'weapon', name: 'Laser Pistol', quantity: 1 },
      { type: 'ammo', name: 'Fusion Cell', quantity: 8, note: '+4CD shots' },
      { type: 'apparel', name: "Brotherhood Scribe's Armor", quantity: 1 },
      { type: 'miscellany', name: 'Multitool', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 15 },
    ]},
  ],
  'Child of Atom': [
    { key: 'coa_missionary', label: 'Missionary', description: "Wandering the Wasteland to spread Atom's word.", equipment: [
      { type: 'apparel', name: 'Tough Clothing', quantity: 1 },
      { type: 'weapon', name: 'Walking Cane', quantity: 1 },
      { type: 'weapon', name: 'Gamma Gun', quantity: 1 },
      { type: 'ammo', name: 'Gamma Rounds', quantity: 4, note: '+2CD rounds' },
      { type: 'consumable', name: 'Stimpak', quantity: 1 },
      { type: 'currency', name: 'Caps', quantity: 10 },
    ]},
    { key: 'coa_zealot', label: 'Zealot', description: "Seeking out and bringing Atom's wrath upon the Church's enemies.", equipment: [
      { type: 'apparel', name: 'Clothing', quantity: 1, optional: true, optionKey: 'zealot_cloth', optionLabel: 'Choose clothing', options: ['Tough Clothing', 'Drifter Outfit'] },
      { type: 'weapon', name: 'Machete', quantity: 1 },
      { type: 'weapon', name: 'Gamma Gun', quantity: 1 },
      { type: 'ammo', name: 'Gamma Rounds', quantity: 4, note: '+2CD rounds' },
      { type: 'apparel', name: 'Gas Mask', quantity: 1 },
    ]},
  ],
  'Tribal': [
    { key: 'tribal_modernist', label: 'Modernist', description: 'Embraces old-world relics and repurposes pre-War equipment.', equipment: [
      { type: 'weapon', name: 'Primary Weapon', quantity: 1, optional: true, optionKey: 'trib_mod_weapon', optionLabel: 'Choose weapon', options: ['9mm Pistol', 'Pump-Action Shotgun'] },
      { type: 'apparel', name: 'Underarmor Suit', quantity: 1 },
      { type: 'apparel', name: 'Combat Armor Choice', quantity: 1, optional: true, optionKey: 'trib_mod_armor', optionLabel: 'Choose combat armor', options: ['Combat Chest Piece', 'Combat Left Arm + Combat Left Leg', 'Combat Left Arm + Combat Right Leg', 'Combat Right Arm + Combat Left Leg', 'Combat Right Arm + Combat Right Leg'], optionItems: { 'Combat Chest Piece': [{ type: 'apparel', name: 'Combat Chest Piece', quantity: 1 }], 'Combat Left Arm + Combat Left Leg': [{ type: 'apparel', name: 'Combat Left Arm', quantity: 1 }, { type: 'apparel', name: 'Combat Left Leg', quantity: 1 }], 'Combat Left Arm + Combat Right Leg': [{ type: 'apparel', name: 'Combat Left Arm', quantity: 1 }, { type: 'apparel', name: 'Combat Right Leg', quantity: 1 }], 'Combat Right Arm + Combat Left Leg': [{ type: 'apparel', name: 'Combat Right Arm', quantity: 1 }, { type: 'apparel', name: 'Combat Left Leg', quantity: 1 }], 'Combat Right Arm + Combat Right Leg': [{ type: 'apparel', name: 'Combat Right Arm', quantity: 1 }, { type: 'apparel', name: 'Combat Right Leg', quantity: 1 }] } },
      { type: 'miscellany', name: 'Multitool', quantity: 1 },
    ]},
    { key: 'tribal_ritualist', label: 'Ritualist', description: 'Carries equipment tied to tribal customs and traditions.', equipment: [
      { type: 'weapon', name: 'Primary Weapon', quantity: 1, optional: true, optionKey: 'trib_rit_weapon', optionLabel: 'Choose weapon', options: ['Hunting Rifle', 'Black Powder Blunderbuss', 'Pipe Gun'] },
      { type: 'apparel', name: 'Tough Clothing', quantity: 1 },
      { type: 'apparel', name: 'Leather Chest Piece', quantity: 1 },
      { type: 'miscellany', name: 'Personal Trinket', quantity: 1 },
    ]},
    { key: 'tribal_naturalist', label: 'Naturalist', description: 'Lives in harmony with the wasteland, taking only what is needed.', equipment: [
      { type: 'weapon', name: 'Bow', quantity: 1 },
      { type: 'ammo', name: 'Arrow', quantity: 10, note: '+6CD arrows' },
      { type: 'weapon', name: 'Machete', quantity: 1 },
      { type: 'weapon', name: 'Combat Knife', quantity: 1 },
      { type: 'apparel', name: "Hunter's Pelt Outfit", quantity: 1 },
      { type: 'apparel', name: "Hunter's Hood", quantity: 1 },
      { type: 'apparel', name: 'Wood Armor Chest Piece', quantity: 1 },
      { type: 'apparel', name: 'Wood Armor Side Piece', quantity: 1, optional: true, optionKey: 'trib_nat_wood_side', optionLabel: 'Choose wood armor side piece', options: ['Wood Armor Arm', 'Wood Armor Leg'] },
    ]},
  ],
};

export const TAG_SKILL_ITEMS = {
  'Athletics':       [{ type: 'apparel', name: 'Casual Clothing', quantity: 1 }, { type: 'consumable', name: 'Buffout', quantity: 1 }],
  'Barter':          [{ type: 'currency', name: 'Caps', quantityDice: '2d20', note: 'additional caps' }],
  'Big Guns':        [{ type: 'ammo', name: 'Flamer Fuel', quantity: 4, note: '+2 DC shots' }],
  'Energy Weapons':  [{ type: 'ammo', name: 'Fusion Cell', quantity: 6, note: '+3 DC shots' }],
  'Explosives':      [{
    type: 'weapon',
    name: 'Explosive',
    quantity: 1,
    optional: true,
    optionKey: 'tag_exp',
    optionLabel: 'Choose explosive',
    options: ['2 Molotov Cocktails', '2 Baseball Grenades'],
    optionItems: {
      '2 Molotov Cocktails': [{ type: 'weapon', name: 'Molotov Cocktail', quantity: 2 }],
      '2 Baseball Grenades': [{ type: 'weapon', name: 'Baseball Grenade', quantity: 2 }],
    },
  }],
  'Lockpick':        [{ type: 'miscellany', name: 'Bobby Pins', quantity: 4, note: '+2 DC bobby pins' }],
  'Medicine':        [{ type: 'miscellany', name: 'First Aid Kit', quantity: 1 }, { type: 'consumable', name: 'Stimpak', quantity: 1 }],
  'Melee Weapons':   [{ type: 'weapon', name: 'Melee Weapon', quantity: 1, optional: true, optionKey: 'tag_melee', optionLabel: 'Choose melee weapon', options: ['Machete', 'Baseball Bat'] }],
  'Pilot':           [{ type: 'miscellany', name: 'Broken Car Parts (5 common scrap)', quantity: 1 }],
  'Repair':          [{ type: 'miscellany', name: 'Multi-Tool', quantity: 1 }],
  'Science':         [{ type: 'apparel', name: 'Lab Coat', quantity: 1 }, { type: 'consumable', name: 'Mentats', quantity: 1 }],
  'Small Guns':      [{ type: 'ammo', name: 'Small Guns Ammo', quantity: 6, note: '+3 DC additional shots (ammo type you already possess)' }],
  'Sneak':           [{ type: 'consumable', name: 'Calmex', quantity: 1 }],
  'Speech':          [{ type: 'apparel', name: 'Formal Hat', quantity: 1 }, { type: 'apparel', name: 'Formal Clothing', quantity: 1 }],
  'Survival':        [{ type: 'miscellany', name: 'Purified Water', quantity: 2 }, { type: 'food', name: 'Iguana on a Stick', quantity: 1 }],
  'Throwing':        [{
    type: 'weapon',
    name: 'Thrown Weapon',
    quantity: 1,
    optional: true,
    optionKey: 'tag_throw',
    optionLabel: 'Choose thrown weapon',
    options: ['4 Throwing Knives (+2 DC)', '2 Tomahawks (+1 DC)'],
    optionItems: {
      '4 Throwing Knives (+2 DC)': [{ type: 'weapon', name: 'Throwing Knife', quantity: 4, note: '+2 DC' }],
      '2 Tomahawks (+1 DC)': [{ type: 'weapon', name: 'Tomahawk', quantity: 2, note: '+1 DC' }],
    },
  }],
  'Unarmed':         [{ type: 'weapon', name: 'Knuckles', quantity: 1 }],
};

export const ORIGIN_TRAIT_SUMMARIES = {
  'Vault Dweller': {
    name: 'Vault Kid',
    color: '#4488ff',
    benefits: [
      'Reduce difficulty of all END tests to resist disease.',
      'One additional Tag skill of your choice.',
      'Once per quest, if the GM introduces a vault-related complication, you immediately regain 1 Luck Point.',
    ],
    penalties: [],
    notes: ['With GM permission, may be a Ghoul — replaces Vault Kid with Necrotic Post-Human.'],
  },
  'Brotherhood Initiate': {
    name: 'The Chain That Binds',
    color: '#cc7722',
    benefits: [
      'One additional Tag skill: Energy Weapons, Science, or Repair.',
    ],
    penalties: [
      'Must follow the Brotherhood command structure. Disobedience risks expulsion and loss of all Brotherhood technology.',
    ],
  },
  'Ghoul': {
    name: 'Necrotic Post-Human',
    color: '#22cc22',
    benefits: [
      'Immune to radiation damage; instead regain 1 HP per 3 radiation damage received.',
      'When resting in an irradiated location, re-roll dice when checking whether injuries heal.',
      'Survival is always a Tag skill (+2 bonus ranks).',
    ],
    penalties: [
      'Smoothskins may treat you with hostility (+difficulty or +complication range on CHA tests per NPC beliefs).',
      'Sterile. Ages at greatly decreased rate.',
    ],
  },
  'Super Mutant': {
    name: 'Forced Evolution',
    color: '#cc4444',
    benefits: [
      'STR and END +2 at creation; max STR and END raised to 12.',
      'Immune to radiation and poison damage.',
    ],
    penalties: [
      'Max INT and CHA reduced to 6. Max 4 ranks in any skill.',
      'Can only wear Raider Armor. Sterile.',
    ],
  },
  'Mister Handy': {
    name: 'Mister Handy Robot',
    color: '#cc7722',
    benefits: [
      '360° vision: reduce difficulty of PER tests relying on sight or smell by 1.',
      'Immune to radiation, poison, and disease. Cannot eat, drink, or rest.',
      'Three arm attachments chosen from equipment pack.',
    ],
    penalties: [
      'Must receive repairs to heal. Carry weight 150 lbs (fixed, not modified by STR).',
      'Without a Pincer arm, cannot use Lockpick, Repair, or Throwing skills, or manipulate objects.',
    ],
  },
  'Survivor': {
    name: 'Choose Two Traits',
    color: '#6a9aba',
    benefits: [
      'Select any two Survivor traits from the list, OR one trait + one additional perk slot.',
    ],
    penalties: [],
  },
  'Wastelander': {
    name: 'Wasteland Born',
    color: '#aa8844',
    benefits: ['+1 Luck. Bonus to Survival and Small Guns Tag skills from origin.'],
    penalties: [],
  },
};

export const WANDERERS_WEAPON_QUALITIES = [
  { key: 'ammo_hungry', label: 'Ammo-Hungry (X)', description: 'Each time the weapon is fired it spends X ammo. Extra damage costs X ammo per +1 CD. Additional ammo uses (e.g. Burst) also spend X ammo per 1 normally spent.' },
  { key: 'bombard', label: 'Bombard', description: 'Functions like Blast, plus you may spend 2 extra ammo per additional zone targeted (adjacent zones only, limited by Fire Rate).' },
  { key: 'delay', label: 'Delay (X)', description: 'Weapon operates on a timer. Delay (1) detonates at the start of the next round after thrown/triggered. Delay (2) the round after that, etc.' },
  { key: 'placed', label: 'Placed', description: 'Device is placed at a specific location. Requires PER + Explosives (difficulty 1, or 2 if attacked recently). Success = properly set. Failure = not set.' },
  { key: 'recoil', label: 'Recoil (X)', description: "If the user's STR is less than X, all attacks with the weapon increase in difficulty by 1. Ignore if wielding two-handed or braced against a solid object/bipod." },
  { key: 'surge', label: 'Surge', description: 'Gains the Vicious damage effect against robots, enemies in Power Armor, and other mechanical/electronic targets.' },
];

export const WANDERERS_WEAPONS = [
  // Small Guns
  { key: '357_revolver', label: '.357 Magnum Revolver', type: 'Small Guns', damage: '5 CD', damageEffect: 'Vicious', damageType: 'Physical', fireRate: 1, range: 'Close', qualities: 'Close Quarters, Reliable', weight: 2, cost: 110, rarity: 2, ammo: '.357 Magnum', source: 'Wanderers' },
  { key: '127mm_pistol', label: '12.7mm Pistol', type: 'Small Guns', damage: '6 CD', damageEffect: '-', damageType: 'Physical', fireRate: 1, range: 'Close', qualities: 'Close Quarters, Recoil (7)', weight: 4, cost: 400, rarity: 4, ammo: '12.7mm', source: 'Wanderers' },
  { key: '127mm_smg', label: '12.7mm SMG', type: 'Small Guns', damage: '5 CD', damageEffect: 'Burst', damageType: 'Physical', fireRate: 3, range: 'Close', qualities: 'Inaccurate, Recoil (7), Two-Handed', weight: 5, cost: 510, rarity: 4, ammo: '12.7mm', source: 'Wanderers' },
  { key: '25mm_grenade_apw', label: '25mm Grenade APW', type: 'Small Guns', damage: '4 CD', damageEffect: '-', damageType: 'Physical', fireRate: 1, range: 'Long', qualities: 'Blast, Two-Handed', weight: 8, cost: 420, rarity: 4, ammo: '25mm Grenade', source: 'Wanderers' },
  { key: '9mm_pistol', label: '9mm Pistol', type: 'Small Guns', damage: '3 CD', damageEffect: '-', damageType: 'Physical', fireRate: 2, range: 'Close', qualities: 'Close Quarters, Concealed, Reliable', weight: 2, cost: 50, rarity: 2, ammo: '9mm', source: 'Wanderers' },
  { key: 'anti_materiel_rifle', label: 'Anti-Materiel Rifle', type: 'Small Guns', damage: '8 CD', damageEffect: 'Vicious', damageType: 'Physical', fireRate: 0, range: 'Long', qualities: 'Reliable, Two-Handed, Recoil (8)', weight: 20, cost: 560, rarity: 4, ammo: '.50', source: 'Wanderers' },
  { key: 'battle_rifle', label: 'Battle Rifle', type: 'Small Guns', damage: '7 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: 1, range: 'Medium', qualities: 'Reliable, Two-Handed', weight: 10, cost: 150, rarity: 3, ammo: '.308', source: 'Wanderers' },
  { key: 'black_powder_blunderbuss', label: 'Black Powder Blunderbuss', type: 'Small Guns', damage: '7 CD', damageEffect: 'Vicious', damageType: 'Physical', fireRate: 0, range: 'Close', qualities: 'Close Quarters, Inaccurate, Recoil (7), Slow Load', weight: 3, cost: 90, rarity: 3, ammo: '.50 Ball', source: 'Wanderers' },
  { key: 'black_powder_pistol', label: 'Black Powder Pistol', type: 'Small Guns', damage: '7 CD', damageEffect: 'Vicious', damageType: 'Physical', fireRate: 0, range: 'Close', qualities: 'Recoil (7), Slow Load', weight: 3, cost: 60, rarity: 3, ammo: '.50 Ball', source: 'Wanderers' },
  { key: 'black_powder_rifle', label: 'Black Powder Rifle', type: 'Small Guns', damage: '8 CD', damageEffect: 'Vicious', damageType: 'Physical', fireRate: 0, range: 'Medium', qualities: 'Recoil (7), Slow Load', weight: 6, cost: 60, rarity: 3, ammo: '.50 Ball', source: 'Wanderers' },
  { key: 'gauss_pistol', label: 'Gauss Pistol', type: 'Small Guns', damage: '8 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: 1, range: 'Medium', qualities: '-', weight: 6, cost: 334, rarity: 5, ammo: '2mm EC', source: 'Wanderers' },
  { key: 'gauss_shotgun', label: 'Gauss Shotgun', type: 'Small Guns', damage: '7 CD', damageEffect: 'Piercing 1, Spread', damageType: 'Physical', fireRate: 0, range: 'Close', qualities: 'Ammo-Hungry (10), Two-Handed', weight: 14, cost: 400, rarity: 5, ammo: '2mm EC', source: 'Wanderers' },
  { key: 'lever_action_rifle', label: 'Lever-Action Rifle', type: 'Small Guns', damage: '7 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: 0, range: 'Medium', qualities: '-', weight: 9, cost: 201, rarity: 3, ammo: '.308', source: 'Wanderers' },
  { key: 'light_machine_gun', label: 'Light Machine Gun', type: 'Small Guns', damage: '5 CD', damageEffect: 'Burst', damageType: 'Physical', fireRate: 4, range: 'Medium', qualities: 'Inaccurate, Recoil (8), Two-Handed', weight: 15, cost: 150, rarity: 3, ammo: '5.56mm', source: 'Wanderers' },
  { key: 'pump_action_shotgun', label: 'Pump-Action Shotgun', type: 'Small Guns', damage: '5 CD', damageEffect: 'Spread', damageType: 'Physical', fireRate: 1, range: 'Close', qualities: 'Inaccurate, Two-Handed', weight: 11, cost: 70, rarity: 1, ammo: 'Shotgun Shells', source: 'Wanderers' },
  { key: 'radium_rifle', label: 'Radium Rifle', type: 'Small Guns', damage: '4 CD', damageEffect: 'Radioactive', damageType: 'Physical', fireRate: 3, range: 'Medium', qualities: 'Two-Handed', weight: 11, cost: 110, rarity: 3, ammo: '.45', source: 'Wanderers' },
  { key: 'sniper_rifle', label: 'Sniper Rifle', type: 'Small Guns', damage: '7 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: 0, range: 'Long', qualities: 'Accurate, Two-Handed', weight: 10, cost: 300, rarity: 4, ammo: '.308', source: 'Wanderers' },
  // Energy Weapons
  { key: 'alien_atomizer', label: 'Alien Atomizer', type: 'Energy Weapons', damage: '6 CD', damageEffect: 'Vicious', damageType: 'Energy', fireRate: 3, range: 'Close', qualities: 'Close Quarters, Reliable', weight: 3, cost: 1536, rarity: 5, ammo: 'Alien Power Cells', source: 'Wanderers' },
  { key: 'alien_disintegrator', label: 'Alien Disintegrator', type: 'Energy Weapons', damage: '8 CD', damageEffect: 'Vicious', damageType: 'Energy', fireRate: 2, range: 'Medium', qualities: 'Two-Handed, Reliable', weight: 7, cost: 921, rarity: 5, ammo: 'Alien Power Cells', source: 'Wanderers' },
  { key: 'arc_welder', label: 'Arc Welder', type: 'Energy Weapons', damage: '3 CD', damageEffect: 'Stun', damageType: 'Energy', fireRate: 4, range: 'Close', qualities: 'Surge, Two-Handed', weight: 15, cost: 370, rarity: 4, ammo: 'Electron Charge Packs', source: 'Wanderers' },
  { key: 'assaultron_head_salvaged', label: 'Assaultron Head (Salvaged)', type: 'Energy Weapons', damage: '5 CD', damageEffect: 'Piercing 1', damageType: 'Energy', fireRate: 0, range: 'Close', qualities: 'Special: consumes 2 Fusion Cell per shot', weight: 8, cost: 500, rarity: 3, ammo: 'Fusion Cell', source: 'Wanderers' },
  { key: 'microwave_emitter', label: 'Microwave Emitter', type: 'Energy Weapons', damage: '6 CD', damageEffect: 'Persistent, Piercing 3', damageType: 'Energy', fireRate: 1, range: 'Medium', qualities: 'Two-Handed', weight: 8, cost: 500, rarity: 5, ammo: 'Fusion Cell', source: 'Wanderers' },
  { key: 'tesla_rifle_w', label: 'Tesla Rifle', type: 'Energy Weapons', damage: '5 CD', damageEffect: 'Arc', damageType: 'Energy', fireRate: 2, range: 'Medium', qualities: 'Two-Handed', weight: 8, cost: 180, rarity: 4, ammo: 'Fusion Cell', source: 'Wanderers' },
  // Big Guns
  { key: '50_cal_machine_gun', label: '.50 Cal Machine Gun', type: 'Big Guns', damage: '7 CD', damageEffect: 'Burst', damageType: 'Physical', fireRate: 3, range: 'Medium', qualities: 'Two-Handed, Recoil (9)', weight: 31, cost: 350, rarity: 3, ammo: '.50', source: 'Wanderers' },
  { key: 'auto_grenade_launcher', label: 'Auto Grenade Launcher', type: 'Big Guns', damage: '6 CD', damageEffect: 'Breaking', damageType: 'Physical', fireRate: 2, range: 'Long', qualities: 'Bombard, Inaccurate', weight: 30, cost: 450, rarity: 4, ammo: '40mm Grenade', source: 'Wanderers' },
  { key: 'drone_cannon', label: 'Drone Cannon', type: 'Big Guns', damage: '8 CD', damageEffect: 'Breaking', damageType: 'Energy', fireRate: 0, range: 'Medium', qualities: 'Ammo-Hungry (20), Blast, Inaccurate, Slow Load', weight: 18, cost: 600, rarity: 5, ammo: 'Alien Power Module', source: 'Wanderers' },
  { key: 'gatling_gun', label: 'Gatling Gun', type: 'Big Guns', damage: '3 CD', damageEffect: 'Burst, Spread', damageType: 'Physical', fireRate: 3, range: 'Medium', qualities: 'Gatling, Inaccurate, Recoil (6), Two-Handed', weight: 20, cost: 350, rarity: 1, ammo: '5mm', source: 'Wanderers' },
  { key: 'gatling_plasma', label: 'Gatling Plasma', type: 'Big Guns', damage: '4 CD', damageEffect: 'Burst', damageType: 'Physical/Energy', fireRate: 4, range: 'Medium', qualities: 'Gatling, Inaccurate, Two-Handed', weight: 24, cost: 1000, rarity: 4, ammo: 'Plasma Cartridge or Plasma Core', source: 'Wanderers' },
  { key: 'gauss_minigun', label: 'Gauss Minigun', type: 'Big Guns', damage: '6 CD', damageEffect: 'Burst, Piercing 1', damageType: 'Physical', fireRate: 3, range: 'Long', qualities: 'Gatling, Two-Handed', weight: 38, cost: 912, rarity: 6, ammo: '2mm EC', source: 'Wanderers' },
  { key: 'plasma_caster', label: 'Plasma Caster', type: 'Big Guns', damage: '8 CD', damageEffect: 'Burst', damageType: 'Physical/Energy', fireRate: 3, range: 'Medium', qualities: 'Inaccurate, Recoil (8), Two-Handed', weight: 30, cost: 700, rarity: 5, ammo: 'Plasma Cartridge', source: 'Wanderers' },
  { key: 'tesla_cannon', label: 'Tesla Cannon', type: 'Big Guns', damage: '8 CD', damageEffect: 'Arc, Piercing 2', damageType: 'Energy', fireRate: 0, range: 'Long', qualities: 'Accurate, Ammo-Hungry (5), Surge, Two-Handed', weight: 24, cost: 870, rarity: 5, ammo: 'Fusion Cell', source: 'Wanderers' },
  // Bows
  { key: 'bow', label: 'Bow', type: 'Bow', damage: '3 CD', damageEffect: '-', damageType: 'Physical', fireRate: 2, range: 'Medium', qualities: 'Suppressed, Recoil (6), Two-Handed', weight: 3, cost: 44, rarity: 1, ammo: 'Arrow', source: 'Wanderers', note: 'AGI + Athletics to attack. Cannot be used in Power Armor.' },
  { key: 'crossbow', label: 'Crossbow', type: 'Bow', damage: '5 CD', damageEffect: '-', damageType: 'Physical', fireRate: 0, range: 'Medium', qualities: 'Suppressed, Two-Handed, Slow Load', weight: 3, cost: 44, rarity: 2, ammo: 'Crossbow Bolt', source: 'Wanderers', note: 'AGI + Athletics to attack. Cannot be used in Power Armor.' },
  // Melee
  { key: 'assaultron_blade', label: 'Assaultron Blade', type: 'Melee', damage: '4 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: '-', weight: 3, cost: 50, rarity: 3, ammo: null, source: 'Wanderers' },
  { key: 'auto_axe', label: 'Auto-Axe', type: 'Melee', damage: '5 CD', damageEffect: 'Vicious', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: 'Two-Handed', weight: 20, cost: 100, rarity: 3, ammo: null, source: 'Wanderers' },
  { key: 'ballistic_fist', label: 'Ballistic Fist', type: 'Unarmed', damage: '6 CD', damageEffect: 'Stun, Vicious', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: 'Slow Load', weight: 6, cost: 150, rarity: 4, ammo: 'Shotgun Shells', source: 'Wanderers', note: 'Consumes 1 shotgun shell per attack. Without ammo, makes a normal unarmed attack.' },
  { key: 'bumper_sword', label: 'Bumper Sword', type: 'Melee', damage: '6 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: 'Recoil (7), Two-Handed', weight: 12, cost: 125, rarity: 2, ammo: null, source: 'Wanderers' },
  { key: 'cattle_prod', label: 'Cattle Prod', type: 'Melee', damage: '7 CD', damageEffect: 'Stun', damageType: 'Energy', fireRate: null, range: 'Melee', qualities: '-', weight: 3, cost: 90, rarity: 4, ammo: null, source: 'Wanderers' },
  { key: 'chainsaw', label: 'Chainsaw', type: 'Melee', damage: '6 CD', damageEffect: 'Vicious', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: 'Two-Handed', weight: 12, cost: 140, rarity: 3, ammo: null, source: 'Wanderers', note: 'Does not benefit from normal melee damage bonus.' },
  { key: 'death_tambo', label: 'Death Tambo', type: 'Unarmed', damage: '4 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: '-', weight: 1, cost: 40, rarity: 2, ammo: null, source: 'Wanderers', note: 'Sneak attacks increase complication range by 1 (noise).' },
  { key: 'displacer_glove', label: 'Displacer Glove', type: 'Unarmed', damage: '6 CD', damageEffect: 'Piercing 1, Stun', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: '-', weight: 6, cost: 175, rarity: 4, ammo: null, source: 'Wanderers' },
  { key: 'guitar_sword', label: 'Guitar Sword', type: 'Melee', damage: '4 CD', damageEffect: 'Piercing 1', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: 'Parry', weight: 3, cost: 45, rarity: 3, ammo: null, source: 'Wanderers', note: 'Sneak attacks increase complication range by 1 (noise).' },
  { key: 'mr_handy_buzz_blade', label: 'Mr. Handy Buzz Blade', type: 'Melee', damage: '4 CD', damageEffect: 'Vicious', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: 'Two-Handed', weight: 10, cost: 50, rarity: 2, ammo: null, source: 'Wanderers' },
  { key: 'multi_purpose_axe', label: 'Multi-Purpose Axe', type: 'Melee', damage: '5 CD', damageEffect: '-', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: 'Two-Handed', weight: 4, cost: 40, rarity: 2, ammo: null, source: 'Wanderers' },
  { key: 'proton_axe', label: 'Proton Axe', type: 'Melee', damage: '5 CD', damageEffect: 'Piercing 1', damageType: 'Energy', fireRate: null, range: 'Melee', qualities: 'Surge', weight: 8, cost: 175, rarity: 5, ammo: null, source: 'Wanderers' },
  { key: 'war_drum', label: 'War Drum', type: 'Melee', damage: '5 CD', damageEffect: 'Stun', damageType: 'Physical', fireRate: null, range: 'Melee', qualities: 'Two-Handed', weight: 20, cost: 115, rarity: 3, ammo: null, source: 'Wanderers', note: 'Sneak attacks increase complication range by 1 (noise).' },
  // Explosives
  { key: 'cryogenic_grenade', label: 'Cryogenic Grenade', type: 'Explosive', damage: '6 CD', damageEffect: 'Freeze', damageType: 'Energy', fireRate: null, range: 'Thrown', qualities: 'Blast, Thrown (M)', weight: 1, cost: 50, rarity: 3, ammo: null, source: 'Wanderers' },
  { key: 'cryo_mine', label: 'Cryo Mine', type: 'Explosive', damage: '6 CD', damageEffect: 'Freeze', damageType: 'Energy', fireRate: null, range: 'Thrown', qualities: 'Blast, Mine', weight: 1, cost: 50, rarity: 3, ammo: null, source: 'Wanderers' },
  { key: 'dynamite', label: 'Dynamite', type: 'Explosive', damage: '5 CD', damageEffect: '-', damageType: 'Physical', fireRate: null, range: 'Thrown', qualities: 'Blast, Thrown (M)', weight: 0.5, cost: 25, rarity: 2, ammo: null, source: 'Wanderers', note: 'Short fuse detonates same turn. Can add Delay (X) with PER + Explosives test.' },
  { key: 'dynamite_bundle', label: 'Dynamite Bundle', type: 'Explosive', damage: '9 CD', damageEffect: 'Breaking', damageType: 'Physical', fireRate: null, range: 'Placed', qualities: 'Blast, Delay (X), Placed', weight: 2, cost: 150, rarity: 3, ammo: null, source: 'Wanderers' },
  { key: 'frag_grenade_mirv', label: 'Frag Grenade MIRV', type: 'Explosive', damage: '5 CD', damageEffect: 'Spread', damageType: 'Physical', fireRate: null, range: 'Thrown', qualities: 'Blast, Thrown (M)', weight: 1, cost: 75, rarity: 4, ammo: null, source: 'Wanderers' },
  { key: 'plastic_explosives', label: 'Plastic Explosives', type: 'Explosive', damage: '10 CD', damageEffect: 'Breaking, Piercing 1', damageType: 'Physical', fireRate: null, range: 'Placed', qualities: 'Blast, Delay (X), Placed', weight: 2, cost: 200, rarity: 4, ammo: null, source: 'Wanderers' },
  { key: 'powder_charge', label: 'Powder Charge', type: 'Explosive', damage: '4 CD', damageEffect: '-', damageType: 'Physical', fireRate: null, range: 'Placed', qualities: 'Blast, Mine', weight: 1, cost: 25, rarity: 1, ammo: null, source: 'Wanderers' },
];
