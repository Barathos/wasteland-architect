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
    key: 'nightkin',
    label: 'Nightkin',
    description: 'An elite super mutant trained in stealth by the Master\'s army. Your Stealth Boy addiction grants tremendous power at a terrible, maddening cost.',
    bonusSkills: ['sneak', 'melee_weapons'],
    special: 'Stealth Boy Addict: STR/END +2 at creation. Max STR/END 12, max INT/CHA 8. Max 4 skill ranks. Immune to Radiation and Poison. Super mutant armor only.',
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