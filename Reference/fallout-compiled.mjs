const SYSTEM_ID$1 = "fallout";
const SYSTEM_NAME$1 = "Fallout RPG";

const FALLOUT = {};

globalThis.systemPath = path => `systems/${SYSTEM_ID$1}/${path ?? ""}`;
globalThis.templatePath = path => path ? systemPath(`templates/${path}.hbs`) : systemPath("templates");

FALLOUT.LEVEL_UP_TOOL_ENABLED = false;

// Some consts used for timing purposes
//
FALLOUT.ONE_HOUR_IN_SECONDS = 60 * 60;
FALLOUT.TWO_HOURS_IN_SECONDS = 60 * 60 * 2;
FALLOUT.FOUR_HOURS_IN_SECONDS = 60 * 60 * 4;
FALLOUT.EIGHT_HOURS_IN_SECONDS = 60 * 60 * 8;
FALLOUT.SIXTEEN_HOURS_IN_SECONDS = 60 * 60 * 16;
FALLOUT.ONE_DAY_IN_SECONDS = 60 * 60 * 24;

FALLOUT.DEFAULT_ATTRIBUTES_TOTAL = 40;
FALLOUT.DEFAULT_COMPREHENSION_DICE = 1;
FALLOUT.DEFAULT_CONSUMABLE_RAD_DICE = 1;
FALLOUT.DEFAULT_JUNK_SALVAGE_MINS = 10;
FALLOUT.DEFAULT_MAX_MAGAZINE_USES = 2;

FALLOUT.APPAREL_MOD_TYPES = {
	legendary: "FALLOUT.APPAREL_MOD.type.legendary",
	lining: "FALLOUT.APPAREL_MOD.type.lining",
	material: "FALLOUT.APPAREL_MOD.type.material",
	plating: "FALLOUT.APPAREL_MOD.type.plating",
	system: "FALLOUT.APPAREL_MOD.type.system",
	upgrade: "FALLOUT.APPAREL_MOD.type.upgrade",
};

FALLOUT.APPAREL_TYPES = {
	armor: "FALLOUT.APPAREL.armor",
	clothing: "FALLOUT.APPAREL.clothing",
	headgear: "FALLOUT.APPAREL.headgear",
	outfit: "FALLOUT.APPAREL.outfit",
	powerArmor: "FALLOUT.APPAREL.powerArmor",
};

FALLOUT.ATTRIBUTES = {
	str: "FALLOUT.AbilityStr",
	per: "FALLOUT.AbilityPer",
	end: "FALLOUT.AbilityEnd",
	cha: "FALLOUT.AbilityCha",
	int: "FALLOUT.AbilityInt",
	agi: "FALLOUT.AbilityAgi",
	luc: "FALLOUT.AbilityLuc",
};

FALLOUT.BODY_LOCATION_LABELS = {
	Head_Optics_Head_Head: "FALLOUT.BODYLOCATION.labels.Head_Optics_Head_Head",
	LeftArm_Arm1_LeftFrontLeg_LeftWingAsLeg: "FALLOUT.BODYLOCATION.labels.LeftArm_Arm1_LeftFrontLeg_LeftWingAsLeg",
	LeftLeg_Arm3_LeftHindLeg_Legs: "FALLOUT.BODYLOCATION.labels.LeftLeg_Arm3_LeftHindLeg_Legs",
	RightArm_Arm2_RightFrontLeg_RightWingAsLeg: "FALLOUT.BODYLOCATION.labels.RightArm_Arm2_RightFrontLeg_RightWingAsLeg",
	RightLeg_Thruster_RightHindLeg_Legs: "FALLOUT.BODYLOCATION.labels.RightLeg_Thruster_RightHindLeg_Legs",
	Torso_MainBody_Torso_Torso: "FALLOUT.BODYLOCATION.labels.Torso_MainBody_Torso_Torso",
};

FALLOUT.BODY_TYPES = {
	humanoid: "FALLOUT.BodyTypes.humanoid.label",
	robot: "FALLOUT.BodyTypes.robot.label",
	quadruped: "FALLOUT.BodyTypes.quadruped.label",
	flyingInsect: "FALLOUT.BodyTypes.flyingInsect.label",
};

FALLOUT.BODY_VALUES = {
	head: "1-2",
	torso: "3-8",
	armL: "9-11",
	armR: "12-14",
	legL: "15-17",
	legR: "18-20",
};

FALLOUT.CHEM_DURATIONS = {
	instant: "FALLOUT.ChemDuration.instant",
	brief: "FALLOUT.ChemDuration.brief",
	lasting: "FALLOUT.ChemDuration.lasting",
};

FALLOUT.CONDITIONS = {
	fuel: {
		quenched: 0,
		hydrated: 1,
		thirsty: 2,
		dehydrated: 3,
	},
	hunger: {
		full: 0,
		sated: 1,
		peckish: 2,
		hungry: 3,
		starving: 4,
	},
	thirst: {
		quenched: 0,
		hydrated: 1,
		thirsty: 2,
		dehydrated: 3,
	},
	sleep: {
		rested: 0,
		tired: 1,
		weary: 2,
		exhausted: 3,
	},
};

FALLOUT.CONSUMABLE_TYPES = {
	food: "FALLOUT.FOOD",
	beverage: "FALLOUT.BEVERAGE",
	chem: "FALLOUT.CHEM",
	other: "FALLOUT.OTHER",
};

FALLOUT.CONSUMABLE_USE_ICONS = {
	food: "fas fa-pizza-slice",
	beverage: "fas fa-mug-hot",
	chem: "fas fa-flask",
	other: "fas fa-pizza-slice",
};

FALLOUT.CREATURE_ATTRIBUTES = {
	body: "FALLOUT.CREATURE.body",
	mind: "FALLOUT.CREATURE.mind",
};

FALLOUT.CREATURE_CATEGORIES = {
	minion: "FALLOUT.NPC_TYPES.minion",
	normal: "FALLOUT.NPC_TYPES.normal",
	mighty: "FALLOUT.NPC_TYPES.mighty",
	legendary: "FALLOUT.NPC_TYPES.legendary",
};

FALLOUT.CREATURE_SKILLS = {
	melee: "FALLOUT.CREATURE.melee",
	guns: "FALLOUT.CREATURE.guns",
	other: "FALLOUT.CREATURE.other",
};

FALLOUT.DAMAGE_EFFECTS = {
	arc: "FALLOUT.WEAPONS.damageEffect.arc",
	breaking: "FALLOUT.WEAPONS.damageEffect.breaking",
	burst: "FALLOUT.WEAPONS.damageEffect.burst",
	freeze: "FALLOUT.WEAPONS.damageEffect.freeze",
	persistent: "FALLOUT.WEAPONS.damageEffect.persistent",
	piercing_x: "FALLOUT.WEAPONS.damageEffect.piercing_x",
	radioactive: "FALLOUT.WEAPONS.damageEffect.radioactive",
	spread: "FALLOUT.WEAPONS.damageEffect.spread",
	stun: "FALLOUT.WEAPONS.damageEffect.stun",
	tranquilize_x: "FALLOUT.WEAPONS.damageEffect.tranquilize_x",
	vicious: "FALLOUT.WEAPONS.damageEffect.vicious",
};

FALLOUT.DAMAGE_TYPES = {
	physical: "FALLOUT.WEAPONS.damageType.physical",
	energy: "FALLOUT.WEAPONS.damageType.energy",
	radiation: "FALLOUT.WEAPONS.damageType.radiation",
	poison: "FALLOUT.WEAPONS.damageType.poison",
};

FALLOUT.DEFAULT_ICONS = {
	addiction: "systems/fallout/assets/icons/items/addiction.svg",
	ammo: "systems/fallout/assets/icons/items/ammo.svg",
	apparel: "systems/fallout/assets/icons/items/apparel.svg",
	apparel_mod: "systems/fallout/assets/icons/items/apparel_mod.svg",
	books_and_magz: "systems/fallout/assets/icons/items/books_and_magz.svg",
	consumable: "systems/fallout/assets/icons/items/consumable.svg",
	disease: "systems/fallout/assets/icons/items/disease.svg",
	miscellany: "systems/fallout/assets/icons/items/miscellany.svg",
	object_or_structure: "systems/fallout/assets/icons/items/object_or_structure.svg",
	origin: "systems/fallout/assets/icons/items/origin.svg",
	perk: "systems/fallout/assets/icons/items/perk.svg",
	robot_armor: "systems/fallout/assets/icons/items/robot_armor.svg",
	robot_mod: "systems/fallout/assets/icons/items/robot_mod.svg",
	skill: "systems/fallout/assets/icons/items/skill.webp",
	special_ability: "systems/fallout/assets/icons/items/special_ability.svg",
	trait: "systems/fallout/assets/icons/items/trait.svg",
	weapon: "systems/fallout/assets/icons/items/weapon.svg",
	weapon_mod: "systems/fallout/assets/icons/items/weapon_mod.svg",
};

FALLOUT.DEFAULT_TOKENS = {
	character: "systems/fallout/assets/tokens/character.webp",
	creature: "systems/fallout/assets/tokens/creature.webp",
	npc: "systems/fallout/assets/tokens/npc.webp",
	robot: "systems/fallout/assets/tokens/robot.webp",
	scavenging_location: "systems/fallout/assets/tokens/scavenging_location.webp",
	settlement: "systems/fallout/assets/tokens/settlement.webp",
	vehicle: "systems/fallout/assets/tokens/vehicle.webp",
};

FALLOUT.FUEL_BY_NUMBER = {
	0: "FALLOUT.TEMPLATES.conditions.quenched",
	1: "FALLOUT.TEMPLATES.conditions.hydrated",
	2: "FALLOUT.TEMPLATES.conditions.thirsty",
	3: "FALLOUT.TEMPLATES.conditions.dehydrated",
};

FALLOUT.HIT_LOCATIONS = {
	flyingInsect: [
		{
			min: 1,
			max: 2,
			name: "FALLOUT.HitLocation.Head",
			pos: "",
		},
		{
			min: 3,
			max: 8,
			name: "FALLOUT.HitLocation.Torso",
			pos: "",
		},
		{
			min: 9,
			max: 11,
			name: "FALLOUT.HitLocation.LeftWing",
			pos: "",
		},
		{
			min: 12,
			max: 14,
			name: "FALLOUT.HitLocation.RightWing",
			pos: "",
		},
		{
			min: 15,
			max: 20,
			name: "FALLOUT.HitLocation.Legs",
			pos: "",
		},
	],
	humanoid: [
		{
			min: 1,
			max: 2,
			name: "FALLOUT.HitLocation.Head",
			pos: "left: 50px; top: 30px;",
		},
		{
			min: 3,
			max: 8,
			name: "FALLOUT.HitLocation.Torso",
			pos: "left: 170px; top: 110px;",
		},
		{
			min: 9,
			max: 11,
			name: "FALLOUT.HitLocation.LeftArm",
			pos: "left: 10px; top: 190px;",
		},
		{
			min: 12,
			max: 14,
			name: "FALLOUT.HitLocation.RightArm",
			pos: "right: 10px; top: 190px;",
		},
		{
			min: 15,
			max: 17,
			name: "FALLOUT.HitLocation.LeftLeg",
			pos: "left: 10px; top: 300px;",
		},
		{
			min: 18,
			max: 20,
			name: "FALLOUT.HitLocation.RightLeg",
			pos: "right: 10px; top: 300px;",
		},
	],
	mr_handy: [
		{
			min: 1,
			max: 2,
			name: "FALLOUT.HitLocation.Optics",
			pos: "left: 50px; top: 30px;",
		},
		{
			min: 3,
			max: 8,
			name: "FALLOUT.HitLocation.MainBody",
			pos: "left: 170px; top: 110px;",
		},
		{
			min: 9,
			max: 11,
			name: "FALLOUT.HitLocation.Arm1",
			pos: "left: 10px; top: 190px;",
		},
		{
			min: 12,
			max: 14,
			name: "FALLOUT.HitLocation.Arm2",
			pos: "left: 140px; top: 210px;",
		},
		{
			min: 15,
			max: 17,
			name: "FALLOUT.HitLocation.Arm3",
			pos: "right: 10px; top: 190px;",
		},
		{
			min: 18,
			max: 20,
			name: "FALLOUT.HitLocation.Thruster",
			pos: "left: 140px; top: 300px;",
		},
	],
	quadruped: [
		{
			min: 1,
			max: 2,
			name: "FALLOUT.HitLocation.Head",
			pos: "",
		},
		{
			min: 3,
			max: 8,
			name: "FALLOUT.HitLocation.Torso",
			pos: "",
		},
		{
			min: 9,
			max: 11,
			name: "FALLOUT.HitLocation.LeftFrontLeg",
			pos: "",
		},
		{
			min: 12,
			max: 14,
			name: "FALLOUT.HitLocation.RightFrontLeg",
			pos: "",
		},
		{
			min: 15,
			max: 17,
			name: "FALLOUT.HitLocation.LeftHindLeg",
			pos: "",
		},
		{
			min: 18,
			max: 20,
			name: "FALLOUT.HitLocation.RightHindLeg",
			pos: "",
		},
	],
};

FALLOUT.HUNGER_BY_NUMBER = {
	0: "FALLOUT.TEMPLATES.conditions.full",
	1: "FALLOUT.TEMPLATES.conditions.sated",
	2: "FALLOUT.TEMPLATES.conditions.peckish",
	3: "FALLOUT.TEMPLATES.conditions.hungry",
	4: "FALLOUT.TEMPLATES.conditions.starving",
};

FALLOUT.ITEM_TYPES = {
	addiction: "TYPES.Item.addiction",
	ammo: "TYPES.Item.ammo",
	apparel_mod: "TYPES.Item.apparel_mod",
	apparel: "TYPES.Item.apparel",
	books_and_magz: "TYPES.Item.books_and_magz",
	consumable: "TYPES.Item.consumable",
	disease: "TYPES.Item.disease",
	miscellany: "TYPES.Item.miscellany",
	object_or_structure: "TYPES.Item.object_or_structure",
	perk: "TYPES.Item.perk",
	robot_armor: "TYPES.Item.robot_armor",
	robot_mod: "TYPES.Item.robot_mod",
	skill: "TYPES.Item.skill",
	special_ability: "TYPES.Item.special_ability",
	trait: "TYPES.Item.trait",
	weapon_mod: "TYPES.Item.weapon_mod",
	weapon: "TYPES.Item.weapon",
};

FALLOUT.JOURNAL_UUIDS = {
	releaseNotes: "Compendium.fallout.system_documentation.JournalEntry.7650UDxM6aehgB21",
};

FALLOUT.ITEM_UUIDS = {
	junk: "Compendium.fallout.miscellany.Item.O9gGqJE0CfsOYccB",
	prewar_money: "Compendium.fallout.miscellany.Item.opho9zlvwqcLUPcK",
};

FALLOUT.SCAVENGING_LOCATION_DATA = {
	agriculture: {
		ammunition: 0,
		armor: 0,
		beverages: 1,
		chems: 0,
		clothing: 0,
		food: 3,
		junk: 1,
		other: 1,
		weapons: 0,
	},
	commercial: {
		ammunition: 0,
		armor: 0,
		beverages: 1,
		chems: 0,
		clothing: 0,
		food: 1,
		junk: 2,
		other: 2,
		weapons: 0,
	},
	industry: {
		ammunition: 0,
		armor: 1,
		beverages: 1,
		chems: 0,
		clothing: 1,
		food: 0,
		junk: 2,
		other: 1,
		weapons: 0,
	},
	medical: {
		ammunition: 0,
		armor: 0,
		beverages: 0,
		chems: 2,
		clothing: 1,
		food: 0,
		junk: 2,
		other: 1,
		weapons: 0,
	},
	military: {
		ammunition: 1,
		armor: 1,
		beverages: 0,
		chems: 0,
		clothing: 1,
		food: 0,
		junk: 0,
		other: 2,
		weapons: 1,
	},
	residential: {
		ammunition: 0,
		armor: 0,
		beverages: 1,
		chems: 0,
		clothing: 1,
		food: 1,
		junk: 2,
		other: 1,
		weapons: 0,
	},
};

FALLOUT.LOCATION_CATEGORY = {
	agriculture: "FALLOUT.LOCATION_CATEGORY.agriculture",
	commercial: "FALLOUT.LOCATION_CATEGORY.commercial",
	industry: "FALLOUT.LOCATION_CATEGORY.industry",
	medical: "FALLOUT.LOCATION_CATEGORY.medical",
	military: "FALLOUT.LOCATION_CATEGORY.military",
	residential: "FALLOUT.LOCATION_CATEGORY.residential",
};

FALLOUT.LOCATION_SCALE = {
	tiny: "FALLOUT.LOCATION_SCALE.tiny",
	small: "FALLOUT.LOCATION_SCALE.small",
	average: "FALLOUT.LOCATION_SCALE.average",
	large: "FALLOUT.LOCATION_SCALE.large",
};

FALLOUT.LOCATION_TIME_TAKEN = {
	tiny: "FALLOUT.LOCATION_TIME_TAKEN.tiny",
	small: "FALLOUT.LOCATION_TIME_TAKEN.small",
	average: "FALLOUT.LOCATION_TIME_TAKEN.average",
	large: "FALLOUT.LOCATION_TIME_TAKEN.large",
};

FALLOUT.LOCATION_SCALE_MULTIPLIER = {
	tiny: 1,
	small: 2,
	average: 3,
	large: 4,
};

FALLOUT.NPC_CATEGORIES = {
	minion: "FALLOUT.NPC_TYPES.minion",
	normal: "FALLOUT.NPC_TYPES.normal",
	notable: "FALLOUT.NPC_TYPES.notable",
	major: "FALLOUT.NPC_TYPES.major",
};

FALLOUT.OFFICIAL_SOURCES = {
	aat_fully_operational: "FALLOUT.SOURCE_TITLE.aat_fully_operational",
	aat_hunted: "FALLOUT.SOURCE_TITLE.aat_hunted",
	aat_into_the_abyss: "FALLOUT.SOURCE_TITLE.aat_into_the_abyss",
	aat_one_to_four: "FALLOUT.SOURCE_TITLE.aat_one_to_four",
	aat_orange_sky: "FALLOUT.SOURCE_TITLE.aat_orange_sky",
	aat_skull_canyon: "FALLOUT.SOURCE_TITLE.aat_skull_canyon",
	core_rulebook: "FALLOUT.SOURCE_TITLE.core_rulebook",
	enclave_remnants: "FALLOUT.SOURCE_TITLE.enclave_remnants",
	gm_toolkit: "FALLOUT.SOURCE_TITLE.gm_toolkit",
	hollywood_heroes: "FALLOUT.SOURCE_TITLE.hollywood_heroes",
	map_pack_vault: "FALLOUT.SOURCE_TITLE.map_pack_vault",
	map_pack_wasteland_locales: "FALLOUT.SOURCE_TITLE.map_pack_wasteland_locales",
	mariposa_military_base: "FALLOUT.SOURCE_TITLE.mariposa_military_base",
	quickstart: "FALLOUT.SOURCE_TITLE.quickstart",
	reillys_rangers: "FALLOUT.SOURCE_TITLE.reillys_rangers",
	rust_devils: "FALLOUT.SOURCE_TITLE.rust_devils",
	settlers_guide: "FALLOUT.SOURCE_TITLE.settlers_guide",
	wanderers_guide: "FALLOUT.SOURCE_TITLE.wanderers_guide",
	winter_of_atom: "FALLOUT.SOURCE_TITLE.winter_of_atom",
};

FALLOUT.RANGES = {
	close: "FALLOUT.RANGE.close",
	medium: "FALLOUT.RANGE.medium",
	long: "FALLOUT.RANGE.long",
	extreme: "FALLOUT.RANGE.extreme",
};

FALLOUT.RARITIES = {
	common: "FALLOUT.actor.inventory.materials.common",
	uncommon: "FALLOUT.actor.inventory.materials.uncommon",
	rare: "FALLOUT.actor.inventory.materials.rare",
};

FALLOUT.ROBOT_APPAREL_TYPE = {
	armor: "FALLOUT.APPAREL.armor",
	plating: "FALLOUT.APPAREL.plating",
};

FALLOUT.ROBOT_BODY_TYPES = {
	humanoid: "",
	mr_handy: "",
	robobrain: "",
	securitron: "",
};

FALLOUT.SCAVENGING_ITEM_TYPES = {
	ammunition: "FALLOUT.SCAVENGING_ITEM_TYPE.ammunition",
	armor: "FALLOUT.SCAVENGING_ITEM_TYPE.armor",
	beverages: "FALLOUT.SCAVENGING_ITEM_TYPE.beverages",
	chems: "FALLOUT.SCAVENGING_ITEM_TYPE.chems",
	clothing: "FALLOUT.SCAVENGING_ITEM_TYPE.clothing",
	food: "FALLOUT.SCAVENGING_ITEM_TYPE.food",
	junk: "FALLOUT.SCAVENGING_ITEM_TYPE.junk",
	other: "FALLOUT.SCAVENGING_ITEM_TYPE.other",
	weapons: "FALLOUT.SCAVENGING_ITEM_TYPE.weapons",
};

FALLOUT.SEARCHED_DEGREE = {
	untouched: "FALLOUT.SEARCHED_DEGREE.untouched",
	partly_searched: "FALLOUT.SEARCHED_DEGREE.partly_searched",
	mostly_searched: "FALLOUT.SEARCHED_DEGREE.mostly_searched",
	heavily_searched: "FALLOUT.SEARCHED_DEGREE.heavily_searched",
};

FALLOUT.SEARCHED_DEGREE_REDUCTION = {
	untouched: 2,
	partly_searched: 3,
	mostly_searched: 4,
	heavily_searched: 5,
};

FALLOUT.SEARCHED_DEGREE_DIFFICULTY = {
	untouched: 0,
	partly_searched: 1,
	mostly_searched: 2,
	heavily_searched: 3,
};

FALLOUT.SETTLEMENT_ITEM_ICONS = {
	crafting_table: "fa-solid fa-screwdriver-wrench",
	defense: "fa-solid fa-shield-halved",
	power: "fa-solid fa-bolt",
	resource: "fa-solid fa-box",
	room: "fa-solid fa-door-open",
	store: "fa-solid fa-store",
	structure: "fa-solid fa-building",
};

FALLOUT.SETTLEMENT_ACTION_ICONS = {
	build: "fa-solid fa-screwdriver-wrench",
	business: "fa-solid fa-store",
	guard: "fa-solid fa-shield-halved",
	hunting_and_gathering: "fa-solid fa-person-rifle",
	scavenging: "fa-brands fa-searchengin",
	tend_crops: "fa-solid fa-seedling",
	trade_caravan: "fa-solid fa-caravan",
	unnasigned: "fa-regular fa-user",
};

FALLOUT.SETTLEMENT_ACTIONS = {
	build: "FALLOUT.SETTLEMENT_ACTION.Build",
	business: "FALLOUT.SETTLEMENT_ACTION.Business",
	guard: "FALLOUT.SETTLEMENT_ACTION.Guard",
	hunting_and_gathering: "FALLOUT.SETTLEMENT_ACTION.HuntingAndGathering",
	scavenging: "FALLOUT.SETTLEMENT_ACTION.Scavenging",
	tend_crops: "FALLOUT.SETTLEMENT_ACTION.TendCrops",
	trade_caravan: "FALLOUT.SETTLEMENT_ACTION.TradeCaravan",
	unnasigned: "FALLOUT.SETTLEMENT_ACTION.Unnasigned",
};

FALLOUT.SETTLEMENT_ITEMS = {
	crafting_table: "FALLOUT.SETTLEMENT_ITEM.CraftingTable",
	defense: "FALLOUT.SETTLEMENT_ITEM.Defense",
	power: "FALLOUT.SETTLEMENT_ITEM.Power",
	resource: "FALLOUT.SETTLEMENT_ITEM.Resource",
	room: "FALLOUT.SETTLEMENT_ITEM.Room",
	store: "FALLOUT.SETTLEMENT_ITEM.Store",
	structure: "FALLOUT.SETTLEMENT_ITEM.Structure",
};

FALLOUT.SLEEP_BY_NUMBER = {
	0: "FALLOUT.TEMPLATES.conditions.rested",
	1: "FALLOUT.TEMPLATES.conditions.tired",
	2: "FALLOUT.TEMPLATES.conditions.weary",
	3: "FALLOUT.TEMPLATES.conditions.exhausted",
};

FALLOUT.statusEffects = [
	{
		id: "bleeding",
		img: "systems/fallout/assets/icons/conditions/bleeding.svg",
		name: "FALLOUT.EFFECT.StatusBleeding",
	},
	{
		id: "blind",
		img: "systems/fallout/assets/icons/conditions/blind.svg",
		name: "FALLOUT.EFFECT.StatusBlind",
	},
	{
		id: "burning",
		img: "systems/fallout/assets/icons/conditions/burning.svg",
		name: "FALLOUT.EFFECT.StatusBurning",
	},
	{
		id: "dead",
		img: "systems/fallout/assets/icons/conditions/dead.svg",
		name: "FALLOUT.EFFECT.StatusDead",
	},
	{
		id: "deaf",
		img: "systems/fallout/assets/icons/conditions/deaf.svg",
		name: "FALLOUT.EFFECT.StatusDeaf",
	},
	{
		id: "diseased",
		img: "systems/fallout/assets/icons/conditions/diseased.svg",
		name: "FALLOUT.EFFECT.StatusDiseased",
	},
	{
		id: "drugged",
		img: "systems/fallout/assets/icons/conditions/drugged.svg",
		name: "FALLOUT.EFFECT.StatusDrugged",
	},
	{
		id: "injured",
		img: "systems/fallout/assets/icons/conditions/injured.svg",
		name: "FALLOUT.EFFECT.StatusInjured",
	},
	{
		id: "poisoned",
		img: "systems/fallout/assets/icons/conditions/poisoned.svg",
		name: "FALLOUT.EFFECT.StatusPoisoned",
	},
	{
		id: "prone",
		img: "systems/fallout/assets/icons/conditions/prone.svg",
		name: "FALLOUT.EFFECT.StatusProne",
	},
	{
		id: "radiation",
		img: "systems/fallout/assets/icons/conditions/radiation.svg",
		name: "FALLOUT.EFFECT.StatusRadiation",
	},
	{
		id: "restrained",
		img: "systems/fallout/assets/icons/conditions/restrained.svg",
		name: "FALLOUT.EFFECT.StatusRestrained",
	},
	{
		id: "stunned",
		img: "systems/fallout/assets/icons/conditions/stunned.svg",
		name: "FALLOUT.EFFECT.StatusStunned",
	},
	{
		id: "unconscious",
		img: "systems/fallout/assets/icons/conditions/unconscious.svg",
		name: "FALLOUT.EFFECT.StatusUnconscious",
	},
];

FALLOUT.THIRST_BY_NUMBER = {
	0: "FALLOUT.TEMPLATES.conditions.quenched",
	1: "FALLOUT.TEMPLATES.conditions.hydrated",
	2: "FALLOUT.TEMPLATES.conditions.thirsty",
	3: "FALLOUT.TEMPLATES.conditions.dehydrated",
};

FALLOUT.VEHICLE_QUALITIES = {
	cargo_x: "FALLOUT.VEHICLE.vehicleQuality.cargo_x",
	cumbersome: "FALLOUT.VEHICLE.vehicleQuality.cumbersome",
	enclosed: "FALLOUT.VEHICLE.vehicleQuality.enclosed",
	exposed: "FALLOUT.VEHICLE.vehicleQuality.exposed",
	high_performance: "FALLOUT.VEHICLE.vehicleQuality.high_performance",
	rugged: "FALLOUT.VEHICLE.vehicleQuality.rugged",
	single_seat: "FALLOUT.VEHICLE.vehicleQuality.single_seat",
	flying: "FALLOUT.VEHICLE.vehicleQuality.flying",
	watercraft: "FALLOUT.VEHICLE.vehicleQuality.watercraft",
};

FALLOUT.VEHICLE_ATTRIBUTES = {
	zone_speed: "FALLOUT.VEHICLE.zone_speed",
	travel_speed: "FALLOUT.VEHICLE.travel_speed",
	scale: "FALLOUT.VEHICLE.scale",
	cover: "FALLOUT.VEHICLE.cover",
	impact: "FALLOUT.VEHICLE.impact",
	passengers: "FALLOUT.VEHICLE.passengers",
};

FALLOUT.VEHICLE_CATEGORIES = {
	apc: "FALLOUT.VEHICLE_TYPES.apc",
	armored: "FALLOUT.VEHICLE_TYPES.armored",
	bus: "FALLOUT.VEHICLE_TYPES.bus",
	carTruck: "FALLOUT.VEHICLE_TYPES.carTruck",
	motorcycle: "FALLOUT.VEHICLE_TYPES.motorcycle",
	sportsCar: "FALLOUT.VEHICLE_TYPES.sportsCar",
	vertibird: "FALLOUT.VEHICLE_TYPES.vertibird",
};

FALLOUT.VEHICLE_CARTRUCK_VALUES = {
	chassis: "1-8",
	wheelFL: "9-10",
	wheelFR: "11-12",
	engine: "13-16",
	wheelRL: "17-18",
	wheelRR: "19-20",
};

FALLOUT.VEHICLE_MOTORCYCLE_VALUES = {
	chassis: "1-7",
	wheelF: "8-11",
	engine: "12-16",
	wheelR: "17-20",
};

FALLOUT.VEHICLE_SPORTSCAR_VALUES = {
	chassis: "1-7",
	wheelFL: "8-9",
	wheelFR: "10-11",
	engine: "12-16",
	wheelRL: "17-18",
	wheelRR: "19-20",
};

FALLOUT.VEHICLE_BUS_VALUES = {
	chassis: "1-8",
	wheelFL: "9-10",
	wheelFR: "11-12",
	engine: "13-16",
	wheelRL1: "17",
	wheelRR1: "18",
	wheelRL2: "19",
	wheelRR2: "20",
};

FALLOUT.VEHICLE_ARMORED_VALUES = {
	chassis: "1-8",
	wheelFL: "9-10",
	wheelFR: "11-12",
	engine: "13-16",
	wheelRL: "17-18",
	wheelRR: "19-20",
};

FALLOUT.VEHICLE_APC_VALUES = {
	chassis: "1-10",
	wheelFL: "11",
	wheelFR: "12",
	engine: "13-16",
	wheelML: "17",
	wheelMR: "18",
	wheelRL: "19",
	wheelRR: "20",
};

FALLOUT.VEHICLE_VERTIBIRD_VALUES = {
	engineL: "1-2",
	engineR: "3-4",
	chassis: "5-10",
	wingL: "11-13",
	wingR: "14-16",
	weaponNG: "17-18",
	weaponDG: "19-20",
};

FALLOUT.WEAPON_QUALITIES = {
	accurate: "FALLOUT.WEAPONS.weaponQuality.accurate",
	ammo_hungry_x: "FALLOUT.WEAPONS.weaponQuality.ammo_hungry_x",
	aquatic: "FALLOUT.WEAPONS.weaponQuality.aquatic",
	blast: "FALLOUT.WEAPONS.weaponQuality.blast",
	bombard: "FALLOUT.WEAPONS.weaponQuality.bombard",
	close_quarters: "FALLOUT.WEAPONS.weaponQuality.close_quarters",
	concealed: "FALLOUT.WEAPONS.weaponQuality.concealed",
	debilitating: "FALLOUT.WEAPONS.weaponQuality.debilitating",
	delay_x: "FALLOUT.WEAPONS.weaponQuality.delay_x",
	fuel_x: "FALLOUT.WEAPONS.weaponQuality.fuel_x",
	gatling: "FALLOUT.WEAPONS.weaponQuality.gatling",
	inaccurate: "FALLOUT.WEAPONS.weaponQuality.inaccurate",
	limited: "FALLOUT.WEAPONS.weaponQuality.limited",
	mine: "FALLOUT.WEAPONS.weaponQuality.mine",
	night_vision: "FALLOUT.WEAPONS.weaponQuality.night_vision",
	parry: "FALLOUT.WEAPONS.weaponQuality.parry",
	placed: "FALLOUT.WEAPONS.weaponQuality.placed",
	recoil_x: "FALLOUT.WEAPONS.weaponQuality.recoil_x",
	recon: "FALLOUT.WEAPONS.weaponQuality.recon",
	reliable: "FALLOUT.WEAPONS.weaponQuality.reliable",
	slow_load: "FALLOUT.WEAPONS.weaponQuality.slow_load",
	suppressed: "FALLOUT.WEAPONS.weaponQuality.suppressed",
	surge: "FALLOUT.WEAPONS.weaponQuality.surge",
	thrown: "FALLOUT.WEAPONS.weaponQuality.thrown",
	two_handed: "FALLOUT.WEAPONS.weaponQuality.two_handed",
	unreliable: "FALLOUT.WEAPONS.weaponQuality.unreliable",
	unstable_radiation: "FALLOUT.WEAPONS.weaponQuality.unstable_radiation",
	wrangle: "FALLOUT.WEAPONS.weaponQuality.wrangle",
};

FALLOUT.WEAPON_ATTRIBUTE_OVERRIDE = {
	bows: "agi",
};

FALLOUT.WEAPON_SKILLS = {
	bigGuns: "Big Guns",
	bows: "Athletics",
	energyWeapons: "Energy Weapons",
	explosives: "Explosives",
	meleeWeapons: "Melee Weapons",
	smallGuns: "Small Guns",
	throwing: "Throwing",
	unarmed: "Unarmed",
};

FALLOUT.DEFAULT_CREATURE_WEAPON_ATTRIBUTE = {
	bigGuns: "body",
	bows: "body",
	energyWeapons: "body",
	explosives: "body",
	meleeWeapons: "body",
	smallGuns: "body",
	throwing: "body",
	unarmed: "body",
};

FALLOUT.DEFAULT_CREATURE_WEAPON_SKILL = {
	bigGuns: "guns",
	bows: "guns",
	energyWeapons: "guns",
	explosives: "melee",
	meleeWeapons: "melee",
	smallGuns: "guns",
	throwing: "guns",
	unarmed: "melee",
};

FALLOUT.WEAPON_TYPES = {
	bigGuns: "FALLOUT.WEAPONS.weaponType.bigGuns",
	bows: "FALLOUT.WEAPONS.weaponType.bows",
	custom: "FALLOUT.WEAPONS.weaponType.custom",
	energyWeapons: "FALLOUT.WEAPONS.weaponType.energyWeapons",
	explosives: "FALLOUT.WEAPONS.weaponType.explosives",
	meleeWeapons: "FALLOUT.WEAPONS.weaponType.meleeWeapons",
	smallGuns: "FALLOUT.WEAPONS.weaponType.smallGuns",
	throwing: "FALLOUT.WEAPONS.weaponType.throwing",
	unarmed: "FALLOUT.WEAPONS.weaponType.unarmed",
};

FALLOUT.WEAPON_MOD_TYPES = {
	barrel:	"FALLOUT.WEAPON_MOD.type.barrel",
	cannister: "FALLOUT.WEAPON_MOD.type.cannister",
	capacitor: "FALLOUT.WEAPON_MOD.type.capacitor",
	concentrate: "FALLOUT.WEAPON_MOD.type.concentrate",
	container: "FALLOUT.WEAPON_MOD.type.container",
	dish: "FALLOUT.WEAPON_MOD.type.dish",
	frame: "FALLOUT.WEAPON_MOD.type.frame",
	fuel: "FALLOUT.WEAPON_MOD.type.fuel",
	grip: "FALLOUT.WEAPON_MOD.type.grip",
	legendary: "FALLOUT.WEAPON_MOD.type.legendary",
	magazine: "FALLOUT.WEAPON_MOD.type.magazine",
	melee: "FALLOUT.WEAPON_MOD.type.melee",
	muzzle: "FALLOUT.WEAPON_MOD.type.muzzle",
	nozzle: "FALLOUT.WEAPON_MOD.type.nozzle",
	propellantTank: "FALLOUT.WEAPON_MOD.type.propellantTank",
	receiver: "FALLOUT.WEAPON_MOD.type.receiver",
	sight: "FALLOUT.WEAPON_MOD.type.sight",
	stock: "FALLOUT.WEAPON_MOD.type.stock",
};


async function discoverAvailableAmmoTypes() {
	const ammo = await fallout.compendiums.ammo();

	CONFIG.FALLOUT.AMMO_BY_UUID = {};
	let ammoTypes = [];
	for (const ammoType of ammo) {
		ammoTypes.push(ammoType.name);
		CONFIG.FALLOUT.AMMO_BY_UUID[ammoType.uuid] = ammoType.name;
	}
	ammoTypes = [...new Set(ammoTypes)]; // de-dupe

	CONFIG.FALLOUT.AMMO_TYPES = ammoTypes.sort((a, b) => a.localeCompare(b));
}

async function generateEnrichedTooltips() {
	CONFIG.FALLOUT.WEAPON_QUALITY_TOOLTIPS = {};
	CONFIG.FALLOUT.WEAPON_QUALITY_HAS_RANK = {};
	for (const key in CONFIG.FALLOUT.WEAPON_QUALITIES) {
		CONFIG.FALLOUT.WEAPON_QUALITY_TOOLTIPS[key] =
			await foundry.applications.ux.TextEditor.enrichHTML(
				game.i18n.localize(
					`FALLOUT.TOOLTIPS.WeaponQuality.${key}`
				)
			);

		CONFIG.FALLOUT.WEAPON_QUALITY_HAS_RANK[key] = key.endsWith("_x");
	}

	CONFIG.FALLOUT.VEHICLE_QUALITY_TOOLTIPS = {};
	CONFIG.FALLOUT.VEHICLE_QUALITY_HAS_RANK = {};
	for (const key in CONFIG.FALLOUT.VEHICLE_QUALITIES) {
		CONFIG.FALLOUT.VEHICLE_QUALITY_TOOLTIPS[key] =
			await foundry.applications.ux.TextEditor.enrichHTML(
				game.i18n.localize(
					`FALLOUT.TOOLTIPS.VehicleQuality.${key}`
				)
			);

		CONFIG.FALLOUT.VEHICLE_QUALITY_HAS_RANK[key] = key.endsWith("_x");
	}

	CONFIG.FALLOUT.DAMAGE_EFFECT_HAS_RANK = {};
	CONFIG.FALLOUT.DAMAGE_EFFECT_TOOLTIPS = [];
	for (const key in CONFIG.FALLOUT.DAMAGE_EFFECTS) {
		CONFIG.FALLOUT.DAMAGE_EFFECT_TOOLTIPS[key] =
			await foundry.applications.ux.TextEditor.enrichHTML(
				game.i18n.localize(
					`FALLOUT.TOOLTIPS.DamageEffect.${key}`
				)
			);

		CONFIG.FALLOUT.DAMAGE_EFFECT_HAS_RANK[key] = key.endsWith("_x");
	}
}

class FalloutChemDoses extends FormApplication {

	constructor(object, options={}) {
		super(object, options);

		this.actor = object;
	}

	/** @inheritdoc */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["fallout", "chem-doses"],
			height: "auto",
			resizable: true,
			submitOnChange: true,
			submitOnClose: true,
			width: 333,
		});
	}

	/** @inheritdoc */
	get template() {
		return "systems/fallout/templates/apps/chem-doses.hbs";
	}

	/** @inheritdoc */
	get title() {
		const title = game.i18n.localize("FALLOUT.APP.ChemDoseManager.title");
		return `${title}: ${this.actor.name}`;
	}

	/** @override */
	getData() {
		const context = super.getData();

		context.chemDoses = this.actor.system.chemDoses;

		return context;
	}

	activateListeners(html) {
		html.find(".chem-delete").click(
			event => this._onDeleteChem(event)
		);

		html.find(".reset-all-button").click(
			async event => this._onResetAllDoses(event)
		);

		super.activateListeners(html);
	}

	async _onDeleteChem(event) {
		event.preventDefault();
		const chemId = $(event.currentTarget).data("chemId");

		const updateData = {};
		updateData[`system.chemDoses.-=${chemId}`] = null;

		this.actor.update(updateData);
	}

	/** @inheritdoc */
	async _onSubmit(event) {
		let formData = this._getSubmitData();

		const updateData = {};

		for (const chemId in formData) {
			updateData[`system.chemDoses.${chemId}.doses`] = formData[chemId];
		}

		this.actor.update(updateData);
	}

	async _onResetAllDoses(event) {
		event.preventDefault();

		const html = await foundry.applications.handlebars.renderTemplate(
			"systems/fallout/templates/dialogs/are-you-sure.hbs"
		);

		new Dialog({
			title: `${game.i18n.localize("FALLOUT.UI.ChemDoses.ConfirmReset")}`,
			content: html,
			buttons: {
				Yes: {
					icon: '<i class="fa fa-check"></i>',
					label: `${game.i18n.localize("FALLOUT.UI.Yes")}`,
					callback: async () => {
						this.actor.resetChemDoses();
					},
				},
				Cancel: {
					icon: '<i class="fa fa-times"></i>',
					label: `${game.i18n.localize("FALLOUT.UI.Cancel")}`,
				},
			},
			default: "Yes",
		}).render(true);
	}

}

const { ApplicationV2: ApplicationV2$1, HandlebarsApplicationMixin: HandlebarsApplicationMixin$1 } = foundry.applications.api;

class FalloutLevelUp extends HandlebarsApplicationMixin$1(ApplicationV2$1) {

	actor = undefined;

	constructor(actor, options={}) {
		super();

		this.actor = actor;
	}


	/** @override */
	static DEFAULT_OPTIONS = {
		tag: "form",
		window: {
			contentClasses: [
				"standard-form",
			],
			resizable: true,
		},
		position: {
			width: 400,
			height: "auto",
		},
		form: {
			closeOnSubmit: false,
			submitOnChange: true,
			handler: FalloutLevelUp.#onSubmit,
		},
		actions: {
		},
	};


	/** @override */
	static PARTS = {
		newLevel: {
			template: "systems/fallout/templates/apps/level-up/new-level.hbs",
		},
		maxHP: {
			template: "systems/fallout/templates/apps/level-up/max-hp.hbs",
		},
		perkSelection: {
			template: "systems/fallout/templates/apps/level-up/perk-selection.hbs",
		},
		footer: {
			template: "templates/generic/form-footer.hbs",
		},
	};


	get title() {
		return `${game.i18n.localize("FALLOUT.LevelUp.AppTitle")}: ${this.actor.name}`;
	}


	async _getMaxHpContextData(context) {
		context.maxHP = this.actor.system.health.max;
		context.newMaxHP = context.maxHP + 1;

		return context;
	}


	async _getNewLevelContextData(context) {
		context.level = this.actor.system.level.value;
		context.newLevel = context.level + 1;

		return context;
	}


	async _getPerkSelectionContextData(context) {
		context.availablePerks = await this.actor.perkManager.getAvailablePerks();

		return context;
	}


	async _preparePartContext(partId, context) {
		switch (partId) {
			case "maxHP":
				return this._getMaxHpContextData(context);
			case "newLevel":
				return this._getNewLevelContextData(context);
			case "perkSelection":
				return this._getPerkSelectionContextData(context);
			default:
				return super._preparePartContext(partId, context);
		}
	}


	async #onChange(event, form, formData) {
		// TODO Implement
	}


	static async #onSubmit(event, form, formData) {
		if (event.type === "change") {
			return this.#onChange(event, form, formData);
		}

		// TODO Implement

		return this.close();
	}

}

class FalloutPartySleep extends Application {

	constructor(object, options={}) {
		super(object, options);

		this.lengthOfSleep = 6;
		this.safeLocation = false;
	}

	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			id: "party-sleep",
			classes: ["fallout", "party-sleep"],
			template: "systems/fallout/templates/apps/party-sleep.hbs",
			width: 300,
			height: "auto",
			// width: "auto",
			submitOnChange: false,
		});
	}

	get title() {
		return `${game.i18n.localize("FALLOUT.APP.PartySleep.title")}`;
	}

	activateListeners(html) {
		super.activateListeners(html);

		html.find("#lengthOfSleep").on("input", event => {
			event.preventDefault();
			this.lengthOfSleep = parseInt(event.target.value);
			html.find("#sleepSubmitButton").html(this._buttonText());
		});

		html.find("#safeLocation").on("input", event => {
			event.preventDefault();
			this.safeLocation = event.target.value === "on" ? true : false;
		});

		html.find("#lengthOfSleep").keyup(event => {
			event.preventDefault();

			let currentValue = this.lengthOfSleep;

			if (event.keyCode === 37) {
				currentValue = currentValue > 1
					? currentValue--
					: currentValue;
			}
			else if (event.keyCode === 39) {
				currentValue = currentValue < 25
					? currentValue++
					: currentValue;
			}

			if (currentValue !== this.lengthOfSleep) {
				this.lengthOfSleep = currentValue;
				html.find("#sleepSubmitButton").html(this._buttonText());
			}
		});

		html.find("#lengthOfSleep").on("wheel", event => {
			event.preventDefault();

			let currentValue = this.lengthOfSleep;

			if (event.originalEvent.deltaY > 0) {
				currentValue--;
			}
			if (event.originalEvent.deltaY < 0) {
				currentValue++;
			}

			if (currentValue < 1) {
				currentValue = 1;
			}
			if (currentValue > 24) {
				currentValue = 24;
			}

			if (currentValue !== this.lengthOfSleep) {
				this.lengthOfSleep = currentValue;
				html.find("#sleepSubmitButton").html(this._buttonText());
			}
		});

		html.find("#sleepSubmitButton").click(event => {
			event.preventDefault();
			this._applyPartySleep();
		});
	}

	getData() {
		const data = {
			lengthOfSleep: this.lengthOfSleep,
			safeLocation: this.safeLocation,
		};

		return data;
	}

	_buttonText() {
		return `<i class="fa-solid fa-bed"></i>&nbsp;${this._durationText()}`;
	}

	_durationText() {
		if (this.lengthOfSleep > 1) {
			return game.i18n.format("FALLOUT.APP.PartySleep.hours", {
				length: this.lengthOfSleep,
			});
		}
		else {
			return game.i18n.format("FALLOUT.APP.PartySleep.hour");
		}
	}

	async _applyPartySleep() {
		fallout.debug(`Party Sleep: The party sleeps for ${this.lengthOfSleep} hours`);

		const actors = game.actors.filter(
			a => a.hasPlayerOwner && a.type === "character"
		).sort(
			(a, b) => a.name.localeCompare(b.name)
		);

		const skipMissingPlayers = game.settings.get(
			SYSTEM_ID$1, "conditionsSkipMissingPlayers"
		);

		const newRestedStatus = [];

		const hasActiveFatigue = {};

		// Flag these actors as sleeping to avoid spurious sleep condition
		// changes while we're processing the sleep period
		//
		for (const actor of actors) {
			actor.isSleeping = true;

			const hungerFatigue = actor.system.conditions.hunger
				>= CONFIG.FALLOUT.CONDITIONS.hunger.starving;

			const thirstFatigue = actor.system.conditions.thirst
				>= CONFIG.FALLOUT.CONDITIONS.thirst.dehydrated;

			const activeEffectFatigue = actor.isFieldOverridden(
				"system.conditions.fatigue"
			);

			hasActiveFatigue[actor._id] =
				hungerFatigue || thirstFatigue || activeEffectFatigue;

		}

		await game.time.advance(this.lengthOfSleep * 60 * 60);

		for (const actor of actors) {
			let actorCanBeProcessed = true;

			if (skipMissingPlayers) {
				actorCanBeProcessed = actor.ownerIsOnline;
			}

			if (actorCanBeProcessed) {
				await actor.sleep(
					this.lengthOfSleep,
					this.safeLocation,
					hasActiveFatigue[actor._id]
				);

				const newSleep = actor.system.conditions?.sleep ?? 0;

				newRestedStatus.push({
					fatigue: actor.system.conditions?.fatigue ?? 0,
					name: actor.name,
					sleep: CONFIG.FALLOUT.SLEEP_BY_NUMBER[newSleep],
					wellRested: actor.isWellRested,
				});
			}
			else {
				fallout.debug(
					`Party Sleep: The owner of ${actor.name} is not online so they will not sleep.`
				);
			}

			actor.isSleeping = false;
		}

		fallout.chat.renderPartySleepMessage({
			title: this.title,
			body: game.i18n.format(
				"FALLOUT.APP.PartySleep.chat_message",
				{
					duration: this._durationText(),
				}
			),
			actors: newRestedStatus,
		});

		this.close();
	}
}

class CompendiumItemSelector extends FormApplication {

	availableItems = [];

	closeOnSelection = false;

	maxChoices = 0;

	itemsLoaded = false;

	uuid = foundry.utils.randomID();

	constructor(object={}, options={}) {
		super(object, options);
	}

	static get defaultOptions() {
		const options = super.defaultOptions;

		foundry.utils.mergeObject(options, {
			classes: ["fallout"],
			height: "auto",
			width: 320,
			closeOnSubmit: false,
			submitOnChange: true,
		});

		return options;
	}

	get prompt() {
		return game.i18n.localize("FALLOUT.Form.SelectCompendiumItem.prompt");
	}

	get template() {
		return "systems/fallout/templates/apps/compendium-item-selector.hbs";
	}

	get title() {
		return game.i18n.localize("FALLOUT.Form.SelectCompendiumItem.title");
	}

	async _autoCloseWhenRendered() {
		while (!this.rendered) {
			await fallout.utils.sleep(100); // millisecs
		}

		this.close({force: true});
	}

	async _getAvailableItems() {
		const loadingDialog = new fallout.FalloutLoading().render(true);

		const availableItems = await this.getAvailableItems() ?? [];
		this.itemsLoaded = true;

		const itemsAvailable = availableItems?.size > 0 ?? false;

		if (itemsAvailable) {
			for (const item of availableItems) {
				item.decoratedName = await this.decorateName(item);
			}

			this.availableItems = Array.from(availableItems).sort(
				(a, b) => a.decoratedName.localeCompare(b.decoratedName)
			);
		}
		else {
			ui.notifications.warn(
				game.i18n.localize("FALLOUT.Form.SelectCompendiumItem.Error.NoItemsFound")
			);

			this._autoCloseWhenRendered();
		}

		loadingDialog.close({force: true});
	}

	activateListeners(html) {
		html.find(".remove-item").click(event => this._onRemoveItem(event));

		super.activateListeners(html);
	}

	async decorateName(item) {
		// By default we just use the name, but this can be overriden by each
		// selector class if needed
		return item.name;
	}

	async getCurrentItemData() {
		this.currentItemUuids = await this.getUuids() ?? [];
		this.currentItems = await this.getCurrentItems() ?? [];
	}

	async getCurrentItems() {
		const items = [];
		for (const uuid of this.currentItemUuids) {
			const item = await fromUuid(uuid);
			items.push(item);
		}

		return items.sort((a, b) => {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			return 0;
		});
	}

	async getData() {
		if (!this.itemsLoaded) {
			await this._getAvailableItems();
		}

		await this.getCurrentItemData();

		const context = {
			currentItems: this.currentItems,
			itemChoices: [],
			prompt: this.prompt,
			uuid: this.uuid,
		};

		// Don't include already selected items
		for (const item of this.availableItems) {
			if (!this.currentItemUuids.includes(item.uuid)) {
				context.itemChoices.push(item);
			}
		}

		return context;
	}

	async _onRemoveItem(event) {
		event.preventDefault();
		event.stopPropagation();

		let itemIndex = $(event.currentTarget).data("item-index");

		const newItemUuids = [];

		for (let i = 0; i < this.currentItems.length; i++) {
			if (itemIndex === i) {
				continue;
			}
			newItemUuids.push(this.currentItems[i].uuid);
		}

		await this._saveSelected(newItemUuids);
	}

	async _saveSelected(uuids) {
		await this.saveSelected(uuids);

		this.render(false);
	}

	async _updateObject(event, formData) {
		let newUuids = this.currentItemUuids;

		const currentItemCount = this.currentItemUuids.length;
		if (this.maxChoices === 1 && currentItemCount === 1 && formData["item-selected"] !== "") {
			for (const item of this.availableItems) {
				if (item.decoratedName === formData["item-selected"]) {
					newUuids = [item.uuid];
					break;
				}
			}

			await this._saveSelected(newUuids);
		}
		else if (this.maxChoices === 0 || this.maxChoices > currentItemCount) {
			for (const item of this.availableItems) {
				if (item.decoratedName === formData["item-selected"]) {
					newUuids.push(item.uuid);
					break;
				}
			}

			await this._saveSelected(newUuids);
		}
		else {
			ui.notifications.warn(
				game.i18n.format("FALLOUT.Form.SelectCompendiumItem.Error.MaxChoicesReached",
					{maxChoices: this.maxChoices}
				)
			);

			return this.render(true);
		}

		if (this.closeOnSelection) {
			return this.close({force: true});
		}
	}
}

class ItemSelector extends CompendiumItemSelector {

	closeOnSelection = true;

	maxChoices = 1;

	constructor(object={}, options={}) {
		super(object, options);

		this.itemType = options.itemType;
	}

	get prompt() {
		return game.i18n.localize("FALLOUT.Form.SelectCompendiumItem.prompt");
	}

	get title() {
		let i18nKey;

		switch (this.itemType) {
			case "armor":
			case "clothing":
			case "headgear":
			case "outfit":
			case "powerArmor":
				i18nKey = `FALLOUT.APPAREL.${this.itemType}`;
				break;
			case "armor_robot":
				i18nKey = "TYPES.Item.robot_armor";
				break;
			case "plating_robot":
				i18nKey = "FALLOUT.APPAREL.plating";
				break;
			default:
				i18nKey = `TYPES.Item.${this.itemType}`;
		}

		return game.i18n.format(
			"FALLOUT.Form.SelectItem.title",
			{
				type: game.i18n.localize(i18nKey),
			}
		);
	}

	async decorateName(item) {
		switch (item.type) {
			case "apparel_mod": {
				const apparelType = CONFIG.FALLOUT.APPAREL_TYPES[
					item.system.apparelType
				];

				const modType = CONFIG.FALLOUT.APPAREL_MOD_TYPES[
					item.system.modType
				];

				return `${item.name} (${apparelType} ${modType})`;
			}
			case "books_and_magz": {
				if (item.system.publication !== "") {
					return `${item.system.publication}: ${item.name}`;
				}
				else {
					return `${item.name}`;
				}
			}
			case "consumable": {
				const consumableType = CONFIG.FALLOUT.CONSUMABLE_TYPES[
					item.system.consumableType
				];

				return `${item.name} (${consumableType})`;
			}
			case "skill": {
				return fallout.utils.getLocalizedSkillName(item);
			}
			case "weapon": {
				const weaponType = CONFIG.FALLOUT.WEAPON_TYPES[item.system.weaponType];
				return `${item.name} (${weaponType})`;
			}
			case "weapon_mod": {
				const weaponType = CONFIG.FALLOUT.WEAPON_TYPES[item.system.weaponType];
				const modType = item.system.modType;
				return `${item.name} (${weaponType}, ${modType})`;
			}
			default:
				return super.decorateName(item);
		}
	}

	async getAvailableItems() {
		switch (this.itemType) {
			case "addiction":
				return await fallout.compendiums.addictions();
			case "ammo":
				return await fallout.compendiums.ammo();
			case "apparel_mod":
				return await fallout.compendiums.apparel_mods();
			case "armor":
				return await fallout.compendiums.armor();
			case "apparel":
				return await fallout.compendiums.apparel();
			case "armor_robot":
				return await fallout.compendiums.armor_robot();
			case "books_and_magz":
				return await fallout.compendiums.books_and_magz();
			case "clothing":
				return await fallout.compendiums.clothing();
			case "consumable":
				return await fallout.compendiums.consumables();
			case "disease":
				return await fallout.compendiums.diseases();
			case "headgear":
				return await fallout.compendiums.headgear();
			case "miscellany":
				return await fallout.compendiums.miscellany();
			case "object_or_structure":
				return await fallout.compendiums.structures();
			case "outfit":
				return await fallout.compendiums.outfit();
			case "perk":
				return await fallout.compendiums.perks();
			case "plating_robot":
				return await fallout.compendiums.plating_robot();
			case "powerArmor":
				return await fallout.compendiums.powerArmor();
			case "robot_armor":
				return await fallout.compendiums.robot_armor();
			case "robot_mod":
				return await fallout.compendiums.robot_mods();
			case "skill":
				return await fallout.compendiums.skills();
			case "special_ability":
				return await fallout.compendiums.special_abilities();
			case "trait":
				return await fallout.compendiums.traits();
			case "weapon":
				return await fallout.compendiums.weapons();
			case "weapon_mod":
				return await fallout.compendiums.weapon_mods();
			default:
				console.log(this.itemType);
		}
	}

	async getCurrentItems() {}

	async getUuids() {}

	async saveSelected(uuids) {
		const uuid = uuids[0] ?? "";

		if (uuid !== "") {
			const item = await fromUuid(uuid);
			const itemData = item.toObject();
			itemData._stats.compendiumSource = uuid;
			this.object.createEmbeddedDocuments("Item", [itemData]);
		}
	}
}

class ItemTypeMenu extends Application {

	constructor(object, options={}) {
		super(object, options);

		this.actor = object;

		this.physicalItemTypes = [
			"ammo",
			"apparel_mod",
			"apparel",
			"books_and_magz",
			"consumable",
			"miscellany",
			"robot_mod",
			"robot_armor",
			"weapon_mod",
			"weapon",
		];
	}

	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["fallout"],
			resizable: false,
			width: 100,
		});
	}

	get template() {
		return "systems/fallout/templates/apps/item-type-menu.hbs";
	}

	get title() {
		return game.i18n.localize("FALLOUT.APP.ItemTypeMenu.title");
	}

	async _onFindFromCompendium(event) {
		event.preventDefault();
		const itemType = event.currentTarget.dataset.type;
		new fallout.apps.ItemSelector(this.actor, {itemType}).render(true);
	}

	activateListeners(html) {
		html.find(".find-from-compendium").click(this._onFindFromCompendium.bind(this));
	}

	async getData(options={}) {
		const context = super.getData(options);

		const itemTypes = [];

		for (const type of this.physicalItemTypes) {
			itemTypes.push({key: type, name: CONFIG.FALLOUT.ITEM_TYPES[type]});
		}

		context.itemTypes = itemTypes.sort((a, b) => a.name.localeCompare(b.name));

		return context;
	}
}

class SalvageJunk extends FormApplication {
	constructor(object, options={}) {
		super(object, options);

		this.actor = object;

		this.maxJunk = this.actor.system?.materials?.junk ?? 0;
		this.maxJunk += this.actor.items.filter(
			i => i.system.canBeScrapped && i.system.isJunk
		).length;

		this.minJunk = this.maxJunk > 0 ? 1 : 0;

		this.junkedItems = 0;
		this.junkToProcess = this.minJunk;
	}

	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["fallout", "salvage-junk"],
			width: 400,
			height: "auto",
			submitOnChange: true,
			closeOnSubmit: false,
		});
	}

	/** @inheritdoc */
	get template() {
		return "systems/fallout/templates/apps/salvage-junk.hbs";
	}

	/** @inheritdoc */
	get title() {
		return `${game.i18n.localize("FALLOUT.APP.SalvageJunk.title")}`;
	}

	activateListeners(html) {
		super.activateListeners(html);

		html.find(".start-salvaging-button").click(async event => {
			await this._onStartSalvaging();
			this.close();
		});
	}

	getData() {
		const context = super.getData();

		context.minJunk = this.minJunk;
		context.maxJunk = this.maxJunk;

		context.junkToProcess = this.junkToProcess;
		context.timeToProcess = this.timeToSalvageDisplay(this.junkToProcess);

		return context;
	}

	timeToSalvage() {
		return this.junkToProcess * CONFIG.FALLOUT.DEFAULT_JUNK_SALVAGE_MINS;
	}

	timeToSalvageDisplay() {
		return fallout.utils.minsToString(
			this.timeToSalvage()
		);
	}

	async _onStartSalvaging() {
		const junkItems = this.actor.items.filter(
			i => i.system.canBeScrapped && i.system.isJunk
		);

		this.junkedItems = 0;
		for (const junkItem of junkItems) {
			if (this.junkedItems >= this.junkToProcess) {
				break;
			}

			this.junkedItems++;

			junkItem.delete();
		}

		const skillItem = this.actor.items.find(i => i.name === "Repair");

		const intelligence = this.actor?.system?.attributes?.int?.value ?? 0;
		const repair = skillItem?.system?.value ?? 0;
		const tag = skillItem?.system?.tag ?? false;

		const salvageConfig = {
			critSuccess: tag ? repair : 1,
			scrapper: this.actor.perkLevel("scrapper"),
			tn: intelligence + repair,
		};

		return this._salvage(salvageConfig);
	}

	async _performMaterialRolls(config, rollData) {
		const diceToRoll = this.junkToProcess
			+ rollData.repair.successes
			+ rollData.repair.criticals;

		let rollInstance = new Roll(`${diceToRoll}dc`);
		let salvageRoll = await rollInstance.roll();

		await fallout.Roller2D20.showDiceSoNice(salvageRoll);

		const results = {
			common: 0,
			uncommon: 0,
			rare: 0,
		};

		let effects = 0;

		salvageRoll.terms[0].results.forEach(roll => {
			const effect = roll.result >= 5 ? 1 : 0;
			const value = roll.result <= 2 ? roll.result : 0;

			results.common += value + effect;
			effects += effect;
		});

		if (config.scrapper >= 1) {
			results.uncommon = effects;
		}
		if (config.scrapper >= 2) {
			results.rare = Math.floor(effects / 2);
		}

		return results;
	}

	async _performRepairRolls(config) {
		const results = {
			successes: 0,
			criticals: 0,
			complications: 0,
		};

		const numDice = this.junkToProcess * 2;

		let rollInstance = new Roll(`${numDice}d20cs<=${config.tn}cf>=20`);
		let salvageRoll = await rollInstance.roll();

		await fallout.Roller2D20.showDiceSoNice(salvageRoll);

		salvageRoll.terms[0].results.forEach(roll => {
			const critical = roll.result <= config.critSuccess;

			results.successes += roll.success ? 1 : 0;
			results.criticals += critical ? 1 : 0;
			results.complications += roll.failure ? 1 : 0;
		});

		return results;
	}

	async _salvage(config) {
		const rollData = { config };

		rollData.repair = await this._performRepairRolls(config);
		rollData.materials = await this._performMaterialRolls(config, rollData);

		rollData.junkToProcess = this.junkToProcess;
		rollData.junkedItems = this.junkedItems;
		rollData.type = "salvage-junk";
		rollData.timeToSalvage = this.timeToSalvageDisplay(this.junkToProcess);
		rollData.timeToSalvageMins = this.timeToSalvage(this.junkToProcess);

		// Update the actor
		const actorMaterials = this.actor.system.materials;

		actorMaterials.junk -= (this.junkToProcess - this.junkedItems);
		actorMaterials.common += rollData.materials.common;
		actorMaterials.uncommon += rollData.materials.uncommon;
		actorMaterials.rare += rollData.materials.rare;

		this.actor.update({"system.materials": actorMaterials});

		// Send a chat message
		const content = await foundry.applications.handlebars.renderTemplate(
			"systems/fallout/templates/chat/salvage-results.hbs",
			rollData
		);

		let chatData = {
			content,
			"flags.data": rollData,
			"rollMode": game.settings.get("core", "rollMode"),
			"user": game.user.id,
		};

		ChatMessage.applyRollMode(chatData, game.settings.get("core", "rollMode"));

		await ChatMessage.create(chatData);

		fallout.utils.playDiceSound();
	}

	/** @inheritdoc */
	async _updateObject(event, formData) {
		this.junkToProcess = formData.junkToProcess;
		this.render(false);
	}
}

class ScavengingTableSettings extends FormApplication {
	constructor(object, options) {
		super(object, options);

		this.selectedTables = game.settings.get(SYSTEM_ID, "scavengingCategoryTables") ?? {};
	}

	/** @inheritdoc */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			title: game.i18n.localize("FALLOUT.Form.ScavengingSettings.title"),
			template: "systems/fallout/templates/apps/scavenging-settings.hbs",
			width: 450,
			height: "auto",
			resizable: false,
			closeOnSubmit: false,
			submitOnChange: true,
		});
	}

	get selectedCompendium() {
		return game.settings.get(SYSTEM_ID, "scavengingCompendium") ?? "";
	}

	static registerSetting() {
		game.settings.register(SYSTEM_ID, "scavengingCompendium", {
			name: game.i18n.localize("FALLOUT.Form.ScavengingCompendium.title"),
			hint: game.i18n.localize("FALLOUT.Form.ScavengingCompendium.hint"),
			config: false,
			scope: "world",
			type: String,
			default: "",
		});
		game.settings.register(SYSTEM_ID, "scavengingCategoryTables", {
			name: game.i18n.localize("FALLOUT.Form.ScavengingCategoryTables.title"),
			hint: game.i18n.localize("FALLOUT.Form.ScavengingCategoryTables.hint"),
			config: false,
			scope: "world",
			type: Object,
			default: {
				ammunition: "",
				armor: "",
				beverages: "",
				chems: "",
				clothing: "",
				food: "",
				junk: "",
				other: "",
				weapons: "",
			},
		});
	}

	activateListeners(html) {
		super.activateListeners(html);
	}

	async getData() {
		const data = await super.getData();

		data.FALLOUT = CONFIG.FALLOUT;

		data.compendiums = {};
		for (let pack of game.packs) {
			if (pack.metadata.type !== "RollTable") {
				continue;
			}

			data.compendiums[pack.metadata.id] =
				`[${pack.metadata.packageName}] ${pack.metadata.label}`;
		}

		data.selectedCompendium = this.selectedCompendium;

		const tables = await fallout.compendiums.scavengingRolltables();

		data.tables = {};

		for (const table of tables) {
			data.tables[table.uuid] = table.name;
		}

		data.selectedTables = this.selectedTables;

		return data;
	}

	async _onChangeInput(event) {
		const currentTarget = event.currentTarget;
		const name = currentTarget.name;
		const value = currentTarget.value;

		fallout.debug(`${name} :: ${value}`);
		if (name === "scavenging_compendium") {
			await game.settings.set(SYSTEM_ID, "scavengingCompendium", value);

			for (const category of Object.keys(this.selectedTables)) {
				this.selectedTables[category] = "";
			}
			await game.settings.set(
				SYSTEM_ID, "scavengingCategoryTables", this.selectedTables
			);
		}
		else {
			this.selectedTables[name] = value;
			await game.settings.set(
				SYSTEM_ID, "scavengingCategoryTables", this.selectedTables
			);
		}

		return this.render(true);
	}

	async _updateObject(event, data) {}
}

class SourceFilterSettings extends FormApplication {
	constructor(object, options) {
		super(object, options);

		this.filtered = game.settings.get(SYSTEM_ID, "sourceFilters") ?? [];
	}

	/** @inheritdoc */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			title: game.i18n.localize("FALLOUT.Form.SourceFilters.title"),
			template: "systems/fallout/templates/apps/source-filter.hbs",
			width: 450,
			height: "auto",
			resizable: false,
			closeOnSubmit: true,
		});
	}

	static registerSetting() {
		game.settings.register(SYSTEM_ID, "sourceFilters", {
			name: game.i18n.localize("FALLOUT.Form.SourceFilters.title"),
			hint: game.i18n.localize("FALLOUT.Form.SourceFilters.hint"),
			config: false,
			scope: "world",
			type: Array,
			requiresReload: true,
			default: [],
		});
	}

	activateListeners(html) {
		html.find(".delete-choice").click(event => this._deleteChoiceItem(event));

		super.activateListeners(html);
	}

	async getData() {
		const data = await super.getData();

		const sources = await fallout.compendiums.sources();

		const sourceLut = {};
		for (const source of sources) {
			sourceLut[source.uuid] = source.name;
		}

		data.selectedSources = this.filtered.map(
			choice => ({uuid: choice, name: sourceLut[choice]})
		);

		data.hasSelectedSources = data.selectedSources.length > 0;

		data.unselectedSources = sources.map(
			({uuid, name}) => ({name, uuid})
		).filter(source => !this.filtered.includes(source.uuid));

		return data;
	}

	async _deleteChoiceItem(event) {
		event.preventDefault();
		event.stopPropagation();

		const deleteUuid = $(event.currentTarget).data("uuid");

		const newChoices = [];
		for (const itemUuid of this.filtered) {
			if (itemUuid === deleteUuid) {
				continue;
			}
			newChoices.push(itemUuid);
		}

		this.filtered = newChoices;

		return this.render(true);
	}

	async _onChangeInput(event) {
		const options = event.target.list.options;
		const value = event.target.value;

		let uuid = null;
		for (const option of options) {
			if (option.value === value) {
				uuid = option.getAttribute("data-uuid");
				break;
			}
		}

		if (uuid === null) {
			return;
		}

		if (this.filtered.includes(uuid)) {
			return;
		} // No duplicates

		this.filtered.push(uuid);

		this.filtered.sort((a, b) => a.localeCompare(b));

		return this.render(true);
	}

	async _updateObject(event, data) {
		game.settings.set(SYSTEM_ID, "sourceFilters", this.filtered);
	}
}

var apps = /*#__PURE__*/Object.freeze({
	__proto__: null,
	FalloutChemDoses: FalloutChemDoses,
	FalloutLevelUp: FalloutLevelUp,
	FalloutPartySleep: FalloutPartySleep,
	ItemSelector: ItemSelector,
	ItemTypeMenu: ItemTypeMenu,
	SalvageJunk: SalvageJunk,
	ScavengingTableSettings: ScavengingTableSettings,
	SourceFilterSettings: SourceFilterSettings
});

class FalloutPerkManager {
	constructor(actor, options={}) {
		this.actor = actor;
		this.actorOwnedPerksLut = {};
		this.actorAttributes = [];
		this.actorReadMagazines = [];
	}

	async getAvailablePerks(nextLevel=true) {
		this.actorAttributes = foundry.utils.duplicate(
			this.actor.system.attributes
		);

		this.actorReadMagazines = foundry.utils.duplicate(
			this.actor.system.readMagazines
		);

		await this.getKnownPerks();

		const selectedPerks = new Collection();

		const allPerks = await fallout.compendiums.perks();
		for (const perk of allPerks) {
			perk.system.multiRank = perk.system.rank.max > 1;
			perk.system.perkIdentifier = perk.name.slugify();

			// Make sure we meet the requirements
			const meetsRequirements = await this._meetsRequirements(perk, nextLevel);

			if (meetsRequirements) {
				let rank = 1;

				if (Object.hasOwn(
					this.actorOwnedPerksLut, perk.system.perkIdentifier
				)) {
					const current = this.actorOwnedPerksLut[
						perk.system.perkIdentifier
					];

					rank = current + 1;
				}

				selectedPerks.set(perk._id, {item: perk, rank});
			}
		}

		return selectedPerks;
	}

	async getKnownPerks() {
		this.actorOwnedPerksLut = {};

		for (const item of this.actor.items) {
			if (item.type === "perk") {
				this.actorOwnedPerksLut[item.name.slugify()] = item.system.rank.value;
			}
		}
	}

	async setActorAttributes(attributes) {
		this.actorAttributes = attributes;
	}

	async setActorReadMagazines(readMagazines) {
		this.actorReadMagazines = readMagazines;
	}

	async setKnownPerks(perks) {
		this.actorOwnedPerksLut = {};

		for (const perk of perks) {
			this.actorOwnedPerksLut[perk.identifier] = perk.rank;
		}
	}

	async _meetsRequirements(perk, nextLevel) {
		let requirementsMet = true;

		const requirements = perk.system.requirementsEx;

		// First make sure that if the character already knows the talent that
		// they have not maxed it out
		const knownTalent = this.actorOwnedPerksLut[
			perk.system.perkIdentifier
		];

		if (knownTalent) {
			if (knownTalent >= perk.system.rank.max) {
				requirementsMet = false;
			}
		}

		// Are we the correct level for the next rank of the perk?
		//
		const currentLevel = this.actor.system.level.value;
		const playerLevel = nextLevel ? currentLevel + 1 : currentLevel;

		if (perk.system.multiRank) {
			const nextPerkRank = (knownTalent ?? 0) + 1;

			const startLevel = requirements.level ?? 1;
			const rankLevelStep = requirements.levelIncrease ?? 1;

			const levelRequired = startLevel + ((nextPerkRank - 1) * rankLevelStep);

			if (playerLevel < levelRequired) {
				requirementsMet = false;
			}
		}
		else if (playerLevel < requirements.level ?? 1) {
			requirementsMet = false;
		}


		// Do we meet the attribute requirements?
		//
		for (const attribute in requirements.attributes) {
			const actorValue = this.actorAttributes[attribute].value ?? 0;
			const perkValue = requirements.attributes[attribute].value ?? 0;

			if (actorValue < perkValue) {
				requirementsMet = false;
				break;
			}
		}

		// Have we read any required magazines?
		for (const uuid of requirements.magazineUuids ?? []) {
			if (!this.actorReadMagazines.includes(uuid)) {
				requirementsMet = false;
				break;
			}
		}

		return requirementsMet;
	}
}

class FalloutActor extends Actor {

	isSleeping = false;

	constructor(object, options = {}) {
		super(object, options);
	}


	/**
	 * Update any settlement sheets that may be linked to the deleted Actor
	 *
	 * @static
	 * @param {*} actor
	 * @param {*} options
	 * @param {*} userId
	 */
	static async updateLinkedSettlementSheets(actor, options, userId) {
		if (!game.user.isGM) {
			return;
		}
		if (actor.type !== "npc") {
			return;
		}

		const settlementUuid = actor.system.settlement.uuid;

		if (settlementUuid === "") {
			return;
		}

		const settlement = await fromUuid(settlementUuid);
		if (settlement) {
			if (settlement.system.leader === actor.uuid) {
				await settlement.update({ "system.leader": "" });
				settlement.sheet.render(false);
			}
		}
	}


	get attributeTotals() {
		const totals = {
			bonus: 0,
			max: CONFIG.FALLOUT.DEFAULT_ATTRIBUTES_TOTAL,
			total: 0,
		};

		for (const key in this.system.attributes) {
			const attribute = this.system.attributes[key];

			totals.bonus += attribute.bonus;
			totals.max += attribute.bonus;
			totals.total += attribute.value + attribute.bonus;
		}

		totals.diff = totals.max - totals.total;

		return totals;
	}


	get deleteExhaustedConsumables() {
		return game.settings.get("fallout", "deleteExhaustedConsumables");
	}


	get isAlcoholic() {
		return this.system.conditions.alcoholic;
	}


	get isCreature() {
		return this.type === "creature";
	}


	get isNotCreature() {
		return !this.isCreature;
	}

	get isVehicle() {
		return this.type === "vehicle";
	}

	get isNotVehicle() {
		return !this.isVehicle;
	}

	get isNotRobot() {
		return !this.isRobot;
	}

	get isNotWellRested() {
		return !this.isWellRested;
	}

	get isPlayerCharacter() {
		return ["character", "robot"].includes(this.type);
	}

	get isRobot() {
		return this.type === "robot";
	}

	get isTinkeredWith() {
		return this.type === "robot" && this.system.conditions.tinkeredWith;
	}

	get isWellRested() {
		return this.type === "character" && this.system.conditions.wellRested;
	}

	get overriddenFields() {
		return Object.keys(
			foundry.utils.flattenObject(this.overrides)
		);
	}

	get ownerIsOffline() {
		return !this.ownerIsOnline;
	}

	get ownerIsOnline() {
		const onlineUsers = game.users.filter(
			user => !user.isGM && user.active
		);

		let hasActiveOwner = false;

		for (const user of onlineUsers) {
			if (this.ownership[user._id] === CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER
				|| this.ownership.default === CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER
			) {
				hasActiveOwner = true;
				break;
			}
		}

		return hasActiveOwner;
	}

	get shouldHaveSkillsAdded() {
		return ["character", "npc", "robot"].includes(this.type);
	}

	get useKgs() {
		return game.settings.get("fallout", "carryUnit") === "kgs";
	}

	// _initializeSource(source, options={}) {
	// 	source = super._initializeSource(source, options);
	// }

	incrementJunk() {
		const newJunk = this.system.materials.junk + 1;
		this.update({ "system.materials.junk": newJunk });
	}

	isFieldOverridden(fieldName) {
		return this.overriddenFields.includes(fieldName);
	}

	// Returns the current perk level, or zero if the player doesn't have the
	// perk (or can't have perks)
	//
	perkLevel(perkName) {
		if (!["character", "robot", "npc"].includes(this.type)) {
			return 0;
		}

		const perk = this.items.find(i => {
			const hasBabeleTranslation = i.flags?.babele?.hasTranslation === true;
			const nameToCompare = hasBabeleTranslation ? i.flags.babele.originalName : i.name;
			return i.type === "perk" && nameToCompare.toLowerCase() === perkName.toLowerCase();
		});

		return perk?.system?.rank?.value ?? 0;
	}

	prepareData() {
		super.prepareData();

		if (this.isPlayerCharacter) {
			this._preparePerkManager();
		}

		this.system.currency.caps = Math.round(this.system.currency.caps);
	}

	/**
	* @override
	* Augment the basic actor data with additional dynamic data. Typically,
	* you'll want to handle most of your calculated/derived data in this step.
	* Data calculated in this step should generally not exist in template.json
	* (such as ability modifiers rather than ability scores) and should be
	* available both inside and outside of character sheets (such as if an actor
	* is queried and has a roll executed directly from it).
	*/
	prepareDerivedData() {
		// Make separate methods for each Actor type (character, npc, etc.) to keep
		// things organized.
		const disableAutoDerivedStats = game.settings.get(
			SYSTEM_ID, "disableAutoDerivedStats"
		);

		if (!disableAutoDerivedStats && (this.type === "character" || this.type === "robot")) {
			this._calculateDefense();
			this._calculateInitiative();
			this._calculateMaxHp();
			this._calculateMeleeDamage();
			this._calculateNextLevelXp();
		}

		this._prepareCharacterData();
		this._prepareNpcData();
		this._prepareRobotData();
		this._prepareSettlementData();

		if (["character", "npc", "robot"].includes(this.type)) {
			const athletics = this.items.find(
				i => i.name.toLowerCase() === "athletics" && i.type === "skill"
			);

			const athleticsValue = athletics !== undefined
				? athletics.system.value
				: 0;

			this.system.unofficalSpeed =
				this.system.attributes.agi.value + athleticsValue;
		}
		else if (this.type === "creature") {
			this.system.unofficalSpeed =
				this.system.body.value + this.system.body.mod;
		}
	}

	/**
   * Prepare Character type specific data
   */

	// CHARACTER
	_prepareCharacterData() {
		if (!["character"].includes(this.type)) {
			return;
		}

		this._calculateCharacterBodyResistance();
		this._calculateEncumbrance();
	}

	_calculateEncumbrance() {
		let strWeight = parseInt(this.system.attributes.str.value) * 10;
		if (this.useKgs) {
			strWeight = Math.round(fallout.utils.lbsToKgs(strWeight));
		}

		this.system.carryWeight.base = strWeight + parseInt(
			game.settings.get("fallout", "carryBase")
		);

		this.system.carryWeight.value =
			this.system.carryWeight.base + parseInt(this.system.carryWeight.mod);

		this.system.carryWeight.total = this._getItemsTotalWeight();

		this.system.encumbranceLevel = 0;
		if (this.system.carryWeight.total > this.system.carryWeight.value) {
			let dif = this.system.carryWeight.total - this.system.carryWeight.value;
			this.system.encumbranceLevel = Math.ceil(dif / 50);
		}
	}

	_calculateCharacterBodyResistance() {
		//  ! CHECK for the OUTFIT
		// Prep Body Locations
		let outfittedLocations = {};
		for (let [k] of Object.entries(
			this.system.body_parts
		)) {
			outfittedLocations[k] = false;
		}

		// ! CHECK POWER ARMOR PIECES
		for (let [k, v] of Object.entries(outfittedLocations)) {
			if (!v) {
				let pow = this.items.find(
					i => i.type === "apparel"
						&& i.system.apparelType === "powerArmor"
						&& i.system.equipped
						&& i.system.powerArmor.powered
						&& i.system.powerArmor.isFrame === false
						&& i.system.location[k] === true
						&& i.system.stashed === false
				);
				if (pow && !outfittedLocations[k]) {
					outfittedLocations[k] = foundry.utils.duplicate(pow.toObject());
				}
			}
		}

		// ! CHECK ARMOR PIECES
		for (let [k, v] of Object.entries(outfittedLocations)) {
			if (!v) {
				let armor = this.items.find(
					i => i.type === "apparel"
						&& i.system.apparelType === "armor"
						&& i.system.equipped
						&& i.system.location[k] === true
						&& i.system.stashed === false
				);
				if (armor && !outfittedLocations[k]) {
					outfittedLocations[k] = foundry.utils.duplicate(armor.toObject());
				}
			}
		}

		// ! CHECK OUTFIT
		if (!outfittedLocations.torso
			&& !outfittedLocations.armR
			&& !outfittedLocations.armL
			&& !outfittedLocations.legL
			&& !outfittedLocations.legR
		) {
			let outfit = this.items.find(
				i =>
					i.type === "apparel"
					&& i.system.apparelType === "outfit"
					&& i.system.equipped
			);
			if (outfit) {
				for (let [k, v] of Object.entries(outfit.system.location)) {
					if (v) {
						outfittedLocations[k] = foundry.utils.duplicate(outfit.toObject());
					}
				}
			}
		}

		// ! CHECK HEADGEAR
		if (!outfittedLocations.head) {
			let headgear = this.items.find(i => i.type === "apparel"
				&& i.system.apparelType === "headgear"
				&& i.system.equipped
			);

			if (headgear) {
				outfittedLocations.head = foundry.utils.duplicate(headgear.toObject());
			}
		}

		// ! ADD CLOTHING VALUES
		let clothing = this.items.find(
			i =>
				i.type === "apparel"
				&& i.system.apparelType === "clothing"
				&& i.system.equipped
		);

		if (clothing) {
			for (let [k, v] of Object.entries(clothing.system.location)) {
				if (outfittedLocations[k] && v) {
					outfittedLocations[k].name += ` over ${clothing.name}`;
					outfittedLocations[k].system.resistance.physical = Math.max(
						parseInt(outfittedLocations[k].system.resistance.physical),
						parseInt(clothing.system.resistance.physical)
					);
					outfittedLocations[k].system.resistance.energy = Math.max(
						parseInt(outfittedLocations[k].system.resistance.energy),
						parseInt(clothing.system.resistance.energy)
					);
					outfittedLocations[k].system.resistance.radiation = Math.max(
						parseInt(outfittedLocations[k].system.resistance.radiation),
						parseInt(clothing.system.resistance.radiation)
					);
				}
				else if (!outfittedLocations[k] && v) {
					outfittedLocations[k] = foundry.utils.duplicate(clothing.toObject());
				}
			}
		}

		// ! SET BODY PARTS TO OUTFIT ADD CHARACTER BONUSES
		for (let [k, bodyPart] of Object.entries(this.system.body_parts)) {
			// Armor can't provide poison resistance, so this should always be
			// set to the base character resistance
			//
			bodyPart.resistance.poison = parseInt(this.system.resistance.poison);

			if (outfittedLocations[k]) {
				bodyPart.resistance.physical =
					parseInt(outfittedLocations[k].system.resistance.physical)
					+ parseInt(this.system.resistance.physical);
				bodyPart.resistance.energy =
					parseInt(outfittedLocations[k].system.resistance.energy)
					+ parseInt(this.system.resistance.energy);
				bodyPart.resistance.radiation =
					parseInt(outfittedLocations[k].system.resistance.radiation)
					+ parseInt(this.system.resistance.radiation);
			}
			else {
				bodyPart.resistance.physical = parseInt(this.system.resistance.physical);
				bodyPart.resistance.energy = parseInt(this.system.resistance.energy);
				bodyPart.resistance.radiation = parseInt(this.system.resistance.radiation);
			}
		}
		// ADD OUTFITED LIST FOR DISPLAY
		this.system.outfittedLocations = outfittedLocations;
	}

	_calculateDefense() {
		const defense = this.system.attributes.agi.value <= 8 ? 1 : 2;

		this.system.defense.value = defense + this.system.defense.bonus;
	}

	_calculateInitiative() {
		this.system.initiative.value = this.system.attributes.per.value
			+ this.system.attributes.agi.value
			+ this.system.initiative.bonus;
	}

	_calculateMaxHp() {
		const currentLevel = parseInt(this.system.level.value);

		this.system.health.max = this.system.attributes.end.value
			+ this.system.attributes.luc.value
			+ currentLevel - 1
			- this.system.radiation
			+ this.system.health.bonus;

		if (this.isWellRested || this.isTinkeredWith) {
			this.system.health.max += 2;
		}

		this.system.health.value = Math.min(
			this.system.health.value,
			this.system.health.max
		);
	}

	_calculateMeleeDamage() {
		const strength = this.system.attributes.str.value;

		let meleeDamage = 0;

		if (strength <= 8 && strength >= 7) {
			meleeDamage = 1;
		}
		else if (strength <= 10 && strength >= 9) {
			meleeDamage = 2;
		}
		else if (strength >= 11) {
			meleeDamage = 3;
		}

		this.system.meleeDamage.value =
			meleeDamage + this.system.meleeDamage.bonus;
	}

	_calculateNextLevelXp() {
		const disableAutoXpTarget = game.settings.get(
			SYSTEM_ID, "disableAutoXpTarget"
		);

		if (disableAutoXpTarget) {
			return;
		}

		const currentLevel = parseInt(this.system.level.value);

		let nextLevelXp = 0;
		if (currentLevel > 0) {
			const nextLevel = currentLevel + 1;

			nextLevelXp = nextLevel * currentLevel / 2 * 100;
		}

		this.system.level.nextLevelXP = nextLevelXp;
	}

	_prepareRobotData() {
		if (this.type !== "robot") {
			return;
		}

		this._calculateRobotBodyResistance();

		this.system.favoriteWeapons = this.items.filter(
			i => i.type === "weapon" && i.system.favorite
		);

		this.system.equippedRobotMods = this.items.filter(
			i => i.type === "robot_mod" && i.system.equipped
		).slice(0, 3);

		let robotArmors = this.items.filter(i => {
			return i.type === "robot_armor";
		});

		let _robotArmorsCarryModifier = 0;
		for (let i of robotArmors) {
			if (i.system.equipped && !i.system.stashed) {
				_robotArmorsCarryModifier += parseInt(i.system.carry);
			}
		}
		this.system.carryWeight.base +=
			parseInt(game.settings.get("fallout", "carryBaseRobot")) + _robotArmorsCarryModifier;

		this.system.carryWeight.value =
			parseInt(this.system.carryWeight.base) + parseInt(this.system.carryWeight.mod);

		this.system.carryWeight.total = this._getItemsTotalWeight();
		this.system.encumbranceLevel = 0;
		if (this.system.carryWeight.total > this.system.carryWeight.value) {
			let diff = this.system.carryWeight.total - this.system.carryWeight.value;
			this.system.encumbranceLevel = Math.ceil(diff / 50);
		}
	}

	_prepareSettlementData() {
		if (this.type !== "settlement") {
			return;
		}

		this.system.storage.base =
			parseInt(game.settings.get("fallout", "baseSettlementStorage"));

		this.system.storage.value =
			parseInt(this.system.storage.base) + parseInt(this.system.storage.mod);

		this.system.people.max = 0;
		if (this.system.leader !== "") {
			const leader = fromUuidSync(this.system.leader);

			this.system.people.max = parseInt(leader.system.attributes.cha.value) + 10;
		}

		const settlers = game.actors.filter(a => a.type === "npc"
			&& a.system.settlement.uuid === this.uuid
		);

		const people = this.system.people.value =
			settlers.length + this.system.people.mod;

		let happiness = 10;
		for (const attribute of ["beds", "defense", "food", "water"]) {
			this.system[attribute].min = people;
			if (this.system[attribute].value < people) {
				happiness--;
			}
		}

		this.system.happiness.value = happiness;
		this.system.happiness.total = this.system.happiness.value + this.system.happiness.mod;

		if (this.system.happiness.total < 1) {
			this.system.happiness.total = 1;
		}
		if (this.system.happiness.total > 20) {
			this.system.happiness.total = 20;
		}

		this.system.storage.total = this._getItemsTotalWeight();
	}

	_calculateRobotBodyResistance() {
		let outfittedLocations = {};
		for (let [k] of Object.entries(
			this.system.body_parts
		)) {
			outfittedLocations[k] = false;
		}

		// ADD ROBOT ARMOR
		for (let [k, v] of Object.entries(outfittedLocations)) {
			if (!v) {
				let armor = this.items.find(i => i.type === "robot_armor"
					&& i.system.apparelType === "armor"
					&& i.system.equipped
					&& i.system.location[k] === true
				);

				if (armor && !outfittedLocations[k]) {
					outfittedLocations[k] = foundry.utils.duplicate(armor.toObject());
				}
			}
		}
		// ADD PLATING AND RESISTANCE BONUSES
		let plating = this.items.find(i => i.type === "robot_armor"
			&& i.system.apparelType === "plating"
			&& i.system.equipped
		);

		if (plating) {
			for (let [k, v] of Object.entries(plating.system.location)) {
				if (outfittedLocations[k] && v) {
					outfittedLocations[k].name += ` over ${plating.name}`;
					outfittedLocations[k].system.resistance.physical =
						parseInt(outfittedLocations[k].system.resistance.physical)
						+ parseInt(plating.system.resistance.physical);
					outfittedLocations[k].system.resistance.energy =
						parseInt(outfittedLocations[k].system.resistance.energy)
						+ parseInt(plating.system.resistance.energy);
					outfittedLocations[k].system.resistance.radiation =
						parseInt(outfittedLocations[k].system.resistance.radiation)
						+ parseInt(plating.system.resistance.radiation);
				}
				else if (!outfittedLocations[k] && v) {
					outfittedLocations[k] = foundry.utils.duplicate(plating.toObject());
				}
			}
		}

		// ! SET BODY PARTS TO OUTFIT AND ADD CHARACTER BONUSES
		for (let [k, bodyPart] of Object.entries(this.system.body_parts)) {
			if (outfittedLocations[k]) {
				bodyPart.resistance.physical =
					parseInt(outfittedLocations[k].system.resistance.physical)
					+ parseInt(this.system.resistance.physical);
				bodyPart.resistance.energy =
					parseInt(outfittedLocations[k].system.resistance.energy)
					+ parseInt(this.system.resistance.energy);
				bodyPart.resistance.radiation =
					parseInt(outfittedLocations[k].system.resistance.radiation)
					+ parseInt(this.system.resistance.radiation);
			}
			else {
				bodyPart.resistance.physical = parseInt(this.system.resistance.physical);
				bodyPart.resistance.energy = parseInt(this.system.resistance.energy);
				bodyPart.resistance.radiation = parseInt(this.system.resistance.radiation);
			}
		}
		// ADD OUTFITED LIST FOR DISPLAY
		this.system.outfittedLocations = outfittedLocations;
	}

	_getAvailableAmmoType(name) {
		const ammoItems = this.items.filter(
			i => i.name === name && i.type === "ammo"
		);

		// Ensure we always use the ammo item with the least amount of shots
		// remaining first.
		ammoItems.sort((a, b) => {
			const aTotalShots =
				((a.system.quantity - 1) * a.system.shots.max) + a.system.shots.current;

			const bTotalShots =
				((b.system.quantity - 1) * b.system.shots.max) + b.system.shots.current;

			if (aTotalShots > bTotalShots) {
				return 1;
			}
			else if (bTotalShots > aTotalShots) {
				return -1;
			}
			else {
				return 0;
			}
		});

		let shotsAvailable = 0;

		if (ammoItems) {
			shotsAvailable = ammoItems.reduce(
				(accumulator, ammoItem) => {
					const maxShots = ammoItem.system.shots.max;
					const currentShots = ammoItem.system.shots.current;
					const reserveQuantity = ammoItem.system.quantity - 1;

					const shots = currentShots + (reserveQuantity * maxShots);

					return accumulator + shots;
				},
				0
			);
		}

		return [ammoItems, shotsAvailable];
	}

	// Calculate Total Weight Of Items
	_getItemsTotalWeight() {
		let physicalItems = this.items.filter(i => {
			return !i.system.stashed && i.system.weight != null;
		});
		// remove powered powerArmor pieces for characters
		if (this.type === "character") {
			physicalItems = physicalItems.filter(i => {
				if (i.system.apparelType === "powerArmor") {
					return !i.system.powerArmor.powered;
				}
				else {
					return true;
				}
			});
		}
		else if (this.isCreature) {
			// remove butchery items from calculation
			physicalItems = physicalItems.filter(i => {
				if (i.type === "consumable") {
					return !i.system.butchery;
				}
				else {
					return true;
				}
			});
		}

		let physicalItemsMap = physicalItems.map(i => i.toObject());

		let junkWeight = this.system.materials.junk * 2;
		let materialWeight = 0;
		for (const material of ["common", "uncommon", "rare"]) {
			materialWeight += this.system.materials[material] ?? 0;
		}

		if (this.useKgs) {
			junkWeight = fallout.utils.lbsToKgs(junkWeight);
			materialWeight = fallout.utils.lbsToKgs(materialWeight);
		}

		let itemsWeight = 0;

		for (let i of physicalItemsMap) {
			let itemWeight = parseFloat(i.system.weight);
			itemWeight = isNaN(itemWeight) ? 0 : itemWeight;

			let itemQuantity = parseFloat(i.system.quantity);
			itemQuantity = isNaN(itemQuantity) ? 0 : itemQuantity;

			if (i.system.isJunk) {
				junkWeight += itemWeight * itemQuantity;
			}
			else {
				itemsWeight += itemWeight * itemQuantity;
			}
		}

		if (this.perkLevel("Pack Rat") > 0) {
			// Junk counts as half weight for players with the "Pack Rat"
			// perk
			junkWeight /= 2;
		}

		const totalWeight = itemsWeight + junkWeight + materialWeight;

		return parseFloat(totalWeight.toFixed(2));
	}

	/**
   * Prepare NPC type specific data.
   */
	_prepareNpcData() {
		if (!["creature", "npc", "vehicle"].includes(this.type)) {
			return;
		}

		const disableAutoXpReward = game.settings.get(
			SYSTEM_ID, "disableAutoXpReward"
		);

		if (disableAutoXpReward) {
			return;
		}

		this.system.level.rewardXP = fallout.utils.calculateXpReward(
			this.system.level.value,
			this.system.category
		);

		if (this.isCreature || this.isVehicle) {
			this.system.carryWeight.total = this._getItemsTotalWeight();
		}
		else {
			this._calculateEncumbrance();
		}

		if (this.isVehicle) {
			if (this.system.vehicleQuality.cargo_x.value) {
				this.system.carryWeight.base = this.system.vehicleQuality.cargo_x.rank;
			}
			else {
				this.system.carryWeight.base = 0;
			}
		}

	}

	getLastConditionChanges() {
		return {
			hunger: this.system.conditions.lastChange.hunger,
			sleep: this.system.conditions.lastChange.sleep,
			thirst: this.system.conditions.lastChange.thirst,
		};
	}

	setLastConditionChanges(lastChanges) {
		this.updateSource({
			"system.conditions.lastChange.hunger": lastChanges.hunger,
			"system.conditions.lastChange.sleep": lastChanges.sleep,
			"system.conditions.lastChange.thirst": lastChanges.thirst,
		});
	}

	/**
   * Override getRollData() that's supplied to rolls.
   */
	getRollData() {
		const data = super.getRollData();

		if (this.type === "character" || this.type === "robot") {
			this._getCharacterRollData(data);
		}

		if (this.type === "npc") {
			this._getNpcRollData(data);
		}

		return data;
	}

	/**
   * Prepare character roll data.
   */
	_getCharacterRollData(data) {
		// Copy the ability scores to the top level, so that rolls can use
		// formulas like `@str.mod + 4`.
		if (data.attributes) {
			for (let [k, v] of Object.entries(data.attributes)) {
				data[k] = foundry.utils.deepClone(v);
			}
		}

		// Add level for easier access, or fall back to 0.
		if (data.level) {
			data.lvl = data.level.value ?? 0;
		}
	}

	/**
   * Prepare NPC roll data.
   */
	_getNpcRollData(data) { }

	async _preCreate(data, options, user) {
		await super._preCreate(data, options, user);

		// If prototypeToken already exists in data then we are copying an
		// actor and really shouldn't mess with any values
		//
		if (data.prototypeToken) {
			return;
		}

		const update = {};

		const prototypeToken = {
			actorLink: false,
			disposition: CONST.TOKEN_DISPOSITIONS.HOSTILE,
			name: data.name, // Set token name to actor name
			sight: {
				enabled: true,
			},
			texture: foundry.utils.duplicate(this.prototypeToken.texture),
		};

		if (["character", "robot", "settlement"].includes(data.type)) {
			prototypeToken.actorLink = true;
			prototypeToken.disposition = CONST.TOKEN_DISPOSITIONS.FRIENDLY;
		}

		if (data.type === "scavenging_location") {
			prototypeToken.disposition = CONST.TOKEN_DISPOSITIONS.NEUTRAL;
		}

		update.prototypeToken = prototypeToken;

		if (!data.img) {
			const image = CONFIG.FALLOUT.DEFAULT_TOKENS[data.type] ?? undefined;

			if (image) {
				update.img = image;
				update.prototypeToken.texture = {
					src: image,
				};
			}
		}

		// Add Skills to Characters, NPCs and Robots
		if (this.shouldHaveSkillsAdded) {
			// If the Actor data already contains skill items then this is an
			// Actor being duplicated and we don't want to touch their
			// items at all
			//
			const alreadyHasSkills = Array.isArray(data.items)
				&& data.items.filter(i => i.type === "skill").length > 0;

			if (!alreadyHasSkills) {
				let packSkills =
					await game.packs.get("fallout.skills").getDocuments();

				update.items = this.items.map(i => i.toObject());

				packSkills.forEach(s => {
					update.items.push(s.toObject());
				});
			}
		}

		await this.updateSource(update);

		// Seed the lastUsed timestamp for consumables
		if (this.type === "character") {
			const currentWorldTime = game.time.worldTime;

			await this.updateSource({
				"system.conditions.lastChanged.hunger": currentWorldTime,
				"system.conditions.lastChanged.sleep": currentWorldTime,
				"system.conditions.lastChanged.thirst": currentWorldTime,
			});
		}

		if (this.type === "scavenging_location") {
			const categoryTableDefaults = game.settings.get(
				SYSTEM_ID, "scavengingCategoryTables"
			) ?? {};

			const scavengingLocationUpdate = {};

			for (const category of Object.keys(categoryTableDefaults)) {
				const key = `system.item_types.${category}.table`;
				scavengingLocationUpdate[key] = categoryTableDefaults[category];
			}

			await this.updateSource(scavengingLocationUpdate);
		}

	}

	_preparePerkManager() {
		this.perkManager = new FalloutPerkManager(this);

		// this.perkManager.setActorAttributes(
		// 	foundry.utils.duplicate(this.system.attributes)
		// );

		// const knownPerks = [];

		// for (const item of this.items) {
		// 	if (item.type === "perk") {
		// 		knownPerks.push({
		// 			identifier: item.name.slugify(),
		// 			rank: item.system.rank.value,
		// 		});
		// 	}
		// }

		// this.perkManager.setKnownPerks(knownPerks);

		// this.perkManager.setActorReadMagazines(
		// 	foundry.utils.duplicate(this.system.readMagazines)
		// );
	}

	async _toggleImmunity(type) {
		if (!["poison", "radiation"].includes(type)) {
			return;
		}

		const currentValue = this.system.immunities[type];
		const updateData = {};
		updateData[`system.immunities.${type}`] = !currentValue;
		this.update(updateData);
	}

	async _updateHunger(currentWorldTime) {
		let lastChange = this.system.conditions?.lastChanged?.hunger;

		let timeElapsed = currentWorldTime - Math.abs(lastChange);
		let changed = false;

		if (lastChange < 0 || timeElapsed <= 0) {
			return changed;
		}

		let hunger = this.system.conditions.hunger;
		let fatigue = this.system.conditions.fatigue;

		let keepChecking = true;
		while (keepChecking) {
			switch (hunger) {
				case CONFIG.FALLOUT.CONDITIONS.hunger.full:
					if (timeElapsed >= CONFIG.FALLOUT.ONE_HOUR_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Hunger] ${this.name} Full > Sated`);
						hunger = CONFIG.FALLOUT.CONDITIONS.hunger.sated;
						lastChange += CONFIG.FALLOUT.ONE_HOUR_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.ONE_HOUR_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				case CONFIG.FALLOUT.CONDITIONS.hunger.sated:
					if (timeElapsed >= CONFIG.FALLOUT.FOUR_HOURS_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Hunger] ${this.name} Sated > Peckish`);
						hunger = CONFIG.FALLOUT.CONDITIONS.hunger.peckish;
						lastChange += CONFIG.FALLOUT.FOUR_HOURS_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.FOUR_HOURS_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				case CONFIG.FALLOUT.CONDITIONS.hunger.peckish:
					if (timeElapsed >= CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Hunger] ${this.name} Peckish > Hungry`);
						hunger = CONFIG.FALLOUT.CONDITIONS.hunger.hungry;
						lastChange += CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				case CONFIG.FALLOUT.CONDITIONS.hunger.hungry:
					if (timeElapsed >= CONFIG.FALLOUT.SIXTEEN_HOURS_IN_SECONDS) {
						hunger = CONFIG.FALLOUT.CONDITIONS.hunger.starving;
						fallout.debug(`Condition Tracker: [Hunger] ${this.name} Hungry > Starving`);
						if (!this.isSleeping) {
							fallout.debug(
								`Condition Tracker: [Hunger] ${this.name} Fatigue ${fatigue} > ${fatigue + 1}`
							);
							fatigue++;
						}
						lastChange += CONFIG.FALLOUT.SIXTEEN_HOURS_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.SIXTEEN_HOURS_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				case CONFIG.FALLOUT.CONDITIONS.hunger.starving:
					if (timeElapsed >= CONFIG.FALLOUT.ONE_DAY_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Hunger] ${this.name} Starving`);
						if (!this.isSleeping) {
							fallout.debug(
								`Condition Tracker: [Hunger] ${this.name} Fatigue ${fatigue} > ${fatigue + 1}`
							);
							fatigue++;
						}
						lastChange += CONFIG.FALLOUT.ONE_DAY_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.ONE_DAY_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				default:
					keepChecking = false;
			}
		}

		if (changed) {
			await this.update({
				"system.conditions.lastChanged.hunger": lastChange,
				"system.conditions.hunger": hunger,
				"system.conditions.fatigue": fatigue,

			});
		}

		return changed;
	}

	async _updateThirst(currentWorldTime) {
		let lastChange = this.system.conditions?.lastChanged?.thirst;

		let timeElapsed = currentWorldTime - Math.abs(lastChange);
		let changed = false;

		if (timeElapsed <= 0) {
			return changed;
		}

		let thirst = this.system.conditions.thirst;
		let fatigue = this.system.conditions.fatigue;

		let keepChecking = true;
		while (keepChecking) {
			switch (thirst) {
				case CONFIG.FALLOUT.CONDITIONS.thirst.quenched:
					if (timeElapsed >= CONFIG.FALLOUT.ONE_HOUR_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Thirst] ${this.name} Quenched > Hydrated`);
						thirst = CONFIG.FALLOUT.CONDITIONS.thirst.hydrated;
						lastChange += CONFIG.FALLOUT.ONE_HOUR_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.ONE_HOUR_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				case CONFIG.FALLOUT.CONDITIONS.thirst.hydrated:
					if (timeElapsed >= CONFIG.FALLOUT.TWO_HOURS_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Thirst] ${this.name} Hydrated > Thirsty`);
						thirst = CONFIG.FALLOUT.CONDITIONS.thirst.thirsty;
						lastChange += CONFIG.FALLOUT.TWO_HOURS_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.TWO_HOURS_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				case CONFIG.FALLOUT.CONDITIONS.thirst.thirsty:
					if (timeElapsed >= CONFIG.FALLOUT.FOUR_HOURS_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Thirst] ${this.name} Thirsty > Dehydrated`);
						thirst = CONFIG.FALLOUT.CONDITIONS.thirst.dehydrated;
						if (!this.isSleeping) {
							fallout.debug(
								`Condition Tracker: [Thirst] ${this.name} Fatigue ${fatigue} > ${fatigue + 1}`
							);
							fatigue++;
						}
						lastChange += CONFIG.FALLOUT.FOUR_HOURS_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.FOUR_HOURS_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				case CONFIG.FALLOUT.CONDITIONS.thirst.dehydrated:
					if (timeElapsed >= CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Thirst] ${this.name} Dehydrated`);
						if (!this.isSleeping) {
							fallout.debug(
								`Condition Tracker: [Thirst] ${this.name} Fatigue ${fatigue} > ${fatigue + 1}`
							);
							fatigue++;
						}
						lastChange += CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				default:
					keepChecking = false;
			}
		}

		if (changed) {
			await this.update({
				"system.conditions.lastChanged.thirst": lastChange,
				"system.conditions.thirst": thirst,
				"system.conditions.fatigue": fatigue,

			});
		}

		return changed;
	}

	async _updateSleep(currentWorldTime) {
		let lastChange = this.system.conditions?.lastChanged?.sleep;

		let timeElapsed = currentWorldTime - Math.abs(lastChange);
		let changed = false;

		if (timeElapsed <= 0) {
			return changed;
		}

		let sleep = this.system.conditions.sleep;
		let fatigue = this.system.conditions.fatigue;

		let keepChecking = true;
		const maxIterations = 10;
		let iterations = 0;
		while (keepChecking) {
			iterations++;
			if (iterations > maxIterations) {
				fallout.error(`Condition Tracker: [Sleep] Actor ${this.name} exceeded maximum iterations.`);
				console.log(`currentWorldTime: ${currentWorldTime}`);
				console.log(`timeElapsed: ${timeElapsed}`);
				fallout.error(this.system.conditions);
				break;
			}
			switch (sleep) {
				case CONFIG.FALLOUT.CONDITIONS.sleep.rested:
					if (timeElapsed >= CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Sleep] ${this.name} Rested > Tired`);
						sleep = CONFIG.FALLOUT.CONDITIONS.sleep.tired;
						lastChange += CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				case CONFIG.FALLOUT.CONDITIONS.sleep.tired:
					if (timeElapsed >= CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Sleep] ${this.name} Tired > Weary`);
						sleep = CONFIG.FALLOUT.CONDITIONS.sleep.weary;
						if (!this.isSleeping) {
							fatigue++;
						}
						lastChange += CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				case CONFIG.FALLOUT.CONDITIONS.sleep.weary:
					if (timeElapsed >= CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Sleep] ${this.name} Weary > Exhausted`);
						sleep = CONFIG.FALLOUT.CONDITIONS.sleep.exhausted;
						if (!this.isSleeping) {
							fallout.debug(
								`Condition Tracker: [Sleep] ${this.name} Fatigue ${fatigue} > ${fatigue + 1}`
							);
							fatigue++;
						}
						lastChange += CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.EIGHT_HOURS_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				case CONFIG.FALLOUT.CONDITIONS.sleep.exhausted:
					if (timeElapsed >= CONFIG.FALLOUT.FOUR_HOURS_IN_SECONDS) {
						fallout.debug(`Condition Tracker: [Sleep] ${this.name} Exhausted`);
						if (!this.isSleeping) {
							fallout.debug(
								`Condition Tracker: [Sleep] ${this.name} Fatigue ${fatigue} > ${fatigue + 1}`
							);
							fatigue++;
						}
						lastChange += CONFIG.FALLOUT.FOUR_HOURS_IN_SECONDS;
						changed = true;
						timeElapsed -= CONFIG.FALLOUT.FOUR_HOURS_IN_SECONDS;
					}
					else {
						keepChecking = false;
					}
					break;
				default:
					keepChecking = false;
			}
		}

		if (changed) {
			await this.update({
				"system.conditions.lastChanged.sleep": lastChange,
				"system.conditions.sleep": sleep,
				"system.conditions.fatigue": fatigue,

			});
		}

		return changed;
	}

	async checkConditions(currentWorldTime) {
		await this._checkForConditionTimeJumps(currentWorldTime);

		let currentFatigue = this.system.conditions.fatigue;
		const hungerChanged = await this._updateHunger(currentWorldTime);
		const hungerFatigueChange = this.system.conditions.fatigue - currentFatigue;

		currentFatigue = this.system.conditions.fatigue;
		const thirstChanged = await this._updateThirst(currentWorldTime);
		const thirstFatigueChange = this.system.conditions.fatigue - currentFatigue;

		let sleepChanged = false;
		currentFatigue = this.system.conditions.fatigue;
		if (!this.isSleeping) {
			sleepChanged = await this._updateSleep(currentWorldTime);
		}
		const sleepFatigueChange = this.system.conditions.fatigue - currentFatigue;

		const fatigueChanged = hungerFatigueChange > 0 || thirstFatigueChange > 0;

		if (hungerChanged || thirstChanged || sleepChanged) {
			const chatData = {
				title: game.i18n.localize(
					"FALLOUT.CHAT_MESSAGE.condition-change.title"
				),
				body: game.i18n.format("FALLOUT.CHAT_MESSAGE.condition-change.body",
					{
						actorName: this.name,
						hungerLevel: CONFIG.FALLOUT.HUNGER_BY_NUMBER[this.system.conditions.hunger],
						thirstLevel: CONFIG.FALLOUT.THIRST_BY_NUMBER[this.system.conditions.thirst],
						sleepLevel: CONFIG.FALLOUT.SLEEP_BY_NUMBER[this.system.conditions.sleep],
					}
				),
				fatigue: this.system.conditions.fatigue,
				fatigueChanged,
				hungerFatigueChange,
				sleepFatigueChange,
				thirstFatigueChange,
			};

			fallout.chat.renderConditionChangeMessage(this, chatData);
		}
	}

	async _checkForConditionTimeJumps(currentWorldTime) {
		const updateData = {};
		for (const condition of ["hunger", "sleep", "thirst"]) {
			const wasTimeJump = fallout.utils.checkForTimeJump(
				this.system.conditions.lastChanged[condition]
			);

			if (wasTimeJump) {
				fallout.log(`Condition Tracker: ${this.name} max time jump exceeded for ${condition}, updating lastChange value`);
				const key = `system.conditions.lastChanged.${condition}`;
				updateData[key] = currentWorldTime;
			}
		}
		if (!foundry.utils.isEmpty(updateData)) {
			await this.updateSource(updateData);
		}
	}

	async consumeItem(item) {
		if (this.type !== "character") {
			return false;
		}

		if (item.system.quantity <= 0) {
			ui.notifications.warn(
				game.i18n.format(
					"FALLOUT.CHAT_MESSAGE.consumed.warn_none_available",
					{ itemName: item.name }
				)
			);

			return false;
		}

		const consumableType = item.system.consumableType;

		const newQuantity = item.system.quantity - 1;

		const allUsed = newQuantity <= 0 ? true : false;

		const isFull = this.system.conditions.hunger === 0;

		if (consumableType === "food" && isFull) {
			ui.notifications.warn(
				game.i18n.localize("FALLOUT.CHAT_MESSAGE.consumed.food.warn_full")
			);

			return false;
		}

		const currentWorldTime = game.time.worldTime;

		const actorUpdateData = {};

		if (consumableType !== "other") {
			// Heal HP
			const hpHeal = item.system.hp ?? 0;

			if (hpHeal > 0) {
				let newHp = this.system.health.value + hpHeal;
				const cappedHp = Math.min(newHp, this.system.health.max);

				actorUpdateData["system.health.value"] = cappedHp;
			}

			// Heal Radiation
			const radiationHeal = item.system.radiation ?? 0;

			if (radiationHeal > 0) {
				let newRadiation = this.system.radiation - radiationHeal;
				const cappedRadiation = Math.max(newRadiation, 0);

				actorUpdateData["system.radiation"] = cappedRadiation;
			}

			if (consumableType === "beverage" && item.system.alcoholic) {

				let newIntoxication = this.system.conditions.intoxication + 1;
				actorUpdateData["system.conditions.intoxication"] = newIntoxication;

				// We don't need to roll for alcoholism if we are already an
				// alcoholic.
				//
				// Also, no need to roll a check unless we've had at least two
				// drinks this session, as that's the minimum possible dice that
				// can roll the required 2 effects.
				//
				if (!this.system.conditions.alcoholic && newIntoxication >= 2) {
					let formula = `${newIntoxication}dccs>=5`;
					let roll = new Roll(formula);

					let alcoholicRoll = await roll.evaluate();

					fallout.Roller2D20.showDiceSoNice(alcoholicRoll);

					if (parseInt(roll.result) >= 2) {
						actorUpdateData["system.conditions.alcoholic"] = true;
						actorUpdateData["system.conditions.intoxication"] = 1;

						fallout.chat.renderGeneralMessage(
							this,
							{
								title: game.i18n.localize("FALLOUT.CHAT_MESSAGE.alcoholic.title"),
								body: game.i18n.format("FALLOUT.CHAT_MESSAGE.alcoholic.body",
									{
										actorName: this.name,
										itemName: item.name,
									}
								),
							},
							CONST.DICE_ROLL_MODES.PRIVATE
						);
					}
				}
			}

			if (consumableType !== "chem" && item.system.irradiated) {
				if (!(consumableType === "food" && isFull)) {
					const radDice = item.system.radiationDamage
						?? CONFIG.FALLOUT.DEFAULT_CONSUMABLE_RAD_DICE;

					let formula = `${radDice}dccs>=5`;
					let roll = new Roll(formula);

					let radiationDamageRoll = await roll.evaluate();

					fallout.Roller2D20.showDiceSoNice(radiationDamageRoll);

					const baseRadDamage = parseInt(roll.result);
					if (baseRadDamage > 0) {
						const radResistance = this.system.resistance?.radiation ?? 0;
						const radsTaken = Math.max(0, baseRadDamage - radResistance);

						const newRadiation = this.system.immunities.radiation
							? 0
							: this.system.radiation + radsTaken;

						if (newRadiation > 0) {
							actorUpdateData["system.radiation"] = newRadiation;

							fallout.chat.renderGeneralMessage(
								this,
								{
									title: game.i18n.localize("FALLOUT.CHAT_MESSAGE.radiation_from_consumable.title"),
									body: game.i18n.format("FALLOUT.CHAT_MESSAGE.radiation_from_consumable.body",
										{
											actorName: this.name,
											itemName: item.name,
											radsTaken,
										}
									),
								},
								CONST.DICE_ROLL_MODES.PRIVATE
							);
						}
						else {
							fallout.chat.renderGeneralMessage(
								this,
								{
									title: game.i18n.localize("FALLOUT.CHAT_MESSAGE.radiation_from_consumable_resisted.title"),
									body: game.i18n.format("FALLOUT.CHAT_MESSAGE.radiation_from_consumable_resisted.body",
										{
											actorName: this.name,
											baseRadDamage,
											itemName: item.name,
										}
									),
								},
								CONST.DICE_ROLL_MODES.PRIVATE
							);
						}
					}
				}
			}

			if (consumableType === "chem" && item.system.addictive) {
				const addictionName = item.system.consumableGroup !== ""
					? item.system.consumableGroup
					: item.name;

				const alreadyAddicted = await this.isAddictedToChem(addictionName);

				const chemId = item.name.slugify();
				const dosageKey = `system.chemDoses.${chemId}`;

				let scenes = item.system.duration === "lasting" ? 2 : 1;

				let newDosage = this.system.chemDoses[chemId]?.doses ?? 0;
				newDosage = alreadyAddicted ? 1 : newDosage + 1;

				const addictionNumberExceeded =
					newDosage >= item.system.addiction;

				if (addictionNumberExceeded && !alreadyAddicted) {
					let formula = `${newDosage}dccs>=5`;
					let roll = new Roll(formula);

					let addictedRoll = await roll.evaluate();

					fallout.Roller2D20.showDiceSoNice(addictedRoll);

					if (parseInt(roll.result) >= item.system.addiction) {
						newDosage = 1;

						// Automatically add Addiction item of the correct type
						// to the character
						//
						const addiction = (
							await fallout.compendiums.addictions()
						).find(
							a => a.name === addictionName
						);

						if (addiction) {
							this.createEmbeddedDocuments("Item", [addiction]);
						}
						else {
							fallout.warn(`Unable to fund addiction with the name ${addictionName}`);
						}

						fallout.chat.renderGeneralMessage(
							this,
							{
								title: game.i18n.localize("FALLOUT.CHAT_MESSAGE.addiction.title"),
								body: game.i18n.format(
									"FALLOUT.CHAT_MESSAGE.addiction.body",
									{
										actorName: this.name,
										itemName: addictionName,
									}
								),
							},
							CONST.DICE_ROLL_MODES.PRIVATE
						);
					}
				}

				actorUpdateData[dosageKey] = {
					addiction: item.system.addiction,
					addictionName,
					doses: newDosage,
					id: chemId,
					name: item.name,
					scenes,
				};

			}
		}

		if (["beverage", "food"].includes(consumableType)) {
			if (!(consumableType === "food" && isFull)) {
				const currentThirst = parseInt(this.system.conditions.thirst) ?? 0;
				const thirstReduction = item.system.thirstReduction ?? 0;

				if (thirstReduction > 0) {
					actorUpdateData["system.conditions.lastChanged.thirst"] =
						currentWorldTime;
				}

				actorUpdateData["system.conditions.thirst"] =
					Math.max(currentThirst - thirstReduction, 0);

				if (item.system.providesCap) {
					actorUpdateData["system.currency.caps"] =
						this.system.currency.caps + 1;
				}
			}
		}

		if (consumableType === "food") {
			const currentHunger = parseInt(this.system.conditions.hunger) ?? 0;
			const hungerReduction = item.system.prepared ? 2 : 1;

			actorUpdateData["system.conditions.lastChanged.hunger"] =
				currentWorldTime;

			actorUpdateData["system.conditions.hunger"] =
				Math.max(currentHunger - hungerReduction, 0);
		}

		await this.update(actorUpdateData);

		{
			fallout.chat.renderConsumptionMessage(
				this,
				{
					title: game.i18n.localize(
						`FALLOUT.CHAT_MESSAGE.consumed.${consumableType}.title`
					),
					body: game.i18n.format("FALLOUT.CHAT_MESSAGE.consumed.body",
						{
							actorName: this.name,
							itemName: item.name,
						}
					),
					effect: item.system.effect,
					gainedCap: item.system.providesCap,
					showHungerAndThirst: ["beverage", "food"].includes(consumableType),
					hunger: this.system.conditions.hunger,
					thirst: this.system.conditions.thirst,
				}
			);

			if (allUsed && this.deleteExhaustedConsumables) {
				await item.delete();
			}
			else {
				await item.update({
					"system.quantity": Math.max(0, newQuantity),
				});
			}

			return allUsed;
		}
	}

	async drinkDirtyWater() {
		if (this.type !== "character") {
			return false;
		}

		const currentWorldTime = game.time.worldTime;

		const actorUpdateData = {};

		let newHp = this.system.health.value + 2;
		const cappedHp = Math.min(newHp, this.system.health.max);

		actorUpdateData["system.health.value"] = cappedHp;

		const currentThirst = parseInt(this.system.conditions.thirst) ?? 0;
		const thirstReduction = 1;

		actorUpdateData["system.conditions.lastChanged.thirst"] =
			currentWorldTime;

		actorUpdateData["system.conditions.thirst"] =
			Math.max(currentThirst - thirstReduction, 0);

		let formula = "1dccs>=5";
		let roll = new Roll(formula);

		let radiationDamageRoll = await roll.evaluate();

		fallout.Roller2D20.showDiceSoNice(radiationDamageRoll);

		const baseRadDamage = parseInt(roll.result);
		if (baseRadDamage > 0) {
			const radResistance = this.system.resistance?.radiation ?? 0;
			const radsTaken = Math.max(0, baseRadDamage - radResistance);

			const newRadiation = this.system.immunities.radiation
				? 0
				: this.system.radiation + radsTaken;

			if (newRadiation > 0) {
				actorUpdateData["system.radiation"] = newRadiation;

				fallout.chat.renderGeneralMessage(
					this,
					{
						title: game.i18n.localize("FALLOUT.CHAT_MESSAGE.radiation_from_consumable.title"),
						body: game.i18n.format("FALLOUT.CHAT_MESSAGE.radiation_from_dirty_water.body",
							{
								actorName: this.name,
								radsTaken,
							}
						),
					},
					CONST.DICE_ROLL_MODES.PRIVATE
				);
			}
			else {
				fallout.chat.renderGeneralMessage(
					this,
					{
						title: game.i18n.localize("FALLOUT.CHAT_MESSAGE.radiation_from_consumable_resisted.title"),
						body: game.i18n.format("FALLOUT.CHAT_MESSAGE.radiation_from_dirty_water_resisted.body",
							{
								actorName: this.name,
								baseRadDamage,
								itemName: item.name,
							}
						),
					},
					CONST.DICE_ROLL_MODES.PRIVATE
				);
			}
		}

		await this.update(actorUpdateData);

		fallout.chat.renderConsumptionMessage(
			this,
			{
				title: game.i18n.localize(
					"FALLOUT.CHAT_MESSAGE.consumed.beverage.title"
				),
				body: game.i18n.format("FALLOUT.CHAT_MESSAGE.consumed_dirty_water.body",
					{
						actorName: this.name,
					}
				),
				showHungerAndThirst: true,
				hunger: this.system.conditions.hunger,
				thirst: this.system.conditions.thirst,
			}
		);
	}

	async isAddictedToChem(addictionName) {
		const addiction = this.items.filter(
			i => i.type === "addiction"
		).find(
			i => i.name === addictionName
		);

		return addiction ? true : false;
	}


	async readMagazine(item) {
		if (!this.isPlayerCharacter) {
			return;
		}

		const compendiumVersion =
			(await fallout.compendiums.books_and_magz(false)).find(
				i => i.name.slugify() === item.name.slugify()
			);

		if (!compendiumVersion) {
			return ui.notifications.error(
				game.i18n.format(
					"FALLOUT.ERRORS.UnableToFindCompendiumVersionOfItem",
					{
						itemType: item.type,
						name: item.name,
					}
				)
			);
		}

		if (item.system.uses.value >= item.system.uses.max) {
			return ui.notifications.warn(
				game.i18n.localize("FALLOUT.ERRORS.MagazineUsedMaximumTimes")
			);
		}

		const itemUpdate = {
			"system.uses.value": item.system.uses.value + 1,
			"system.read": true,
		};

		// Roll to see if this benefit can be used one extra time if the
		// character has the Comprehension perk
		//
		const comprehensionLevel = this.perkLevel("comprehension");
		let comprehensionSuccess = false;
		if (comprehensionLevel > 0
			&& item.system.uses.max < CONFIG.FALLOUT.DEFAULT_MAX_MAGAZINE_USES
		) {
			const comprehensionDice = CONFIG.FALLOUT.DEFAULT_COMPREHENSION_DICE;

			let formula = `${comprehensionDice}dccs>=5`;
			let roll = new Roll(formula);

			let comprehensionRoll = await roll.evaluate();

			fallout.Roller2D20.showDiceSoNice(comprehensionRoll);

			const result = parseInt(roll.result);
			if (result > 0) {
				comprehensionSuccess = true;
				itemUpdate["system.uses.max"] = item.system.uses.max + 1;
			}
		}

		item.update(itemUpdate);

		const readMagazines = this.system.readMagazines ?? [];

		if (!readMagazines.includes(compendiumVersion.uuid)) {
			readMagazines.push(compendiumVersion.uuid);
		}

		fallout.chat.renderReadMagazineMessage(
			this,
			{
				title: game.i18n.localize(
					"FALLOUT.CHAT_MESSAGE.readMagazine.title"
				),
				body: game.i18n.format("FALLOUT.CHAT_MESSAGE.readMagazine.body",
					{
						actorName: this.name,
						itemName: item.name,
					}
				),
				benefit: item.system.effect,
				comprehensionSuccess,
			}
		);

		this.update({"system.readMagazines": readMagazines});
	}

	// Reduce Ammo
	async reduceAmmo(ammoName = "", roundsToUse = 0) {
		const [ammoItems, shotsAvailable] = this._getAvailableAmmoType(ammoName);

		if (shotsAvailable <= 0) {
			return;
		}

		for (const ammoItem of ammoItems) {
			if (roundsToUse === 0) {
				break;
			}

			const currentShots = ammoItem.system.shots.current;
			const currentCharges = ammoItem.system.charges.current;
			const quantity = ammoItem.system.quantity;

			const max = ammoItem.system.shots.max > 0
				? ammoItem.system.shots.max
				: 1;

			const shotsAvailable = ((quantity - 1) * max) + currentShots;

			let newCurrentShots = currentShots;
			let newCurrentCharges = currentCharges;
			let newQuantity = ammoItem.system.quantity;

			if (roundsToUse >= shotsAvailable) {
				roundsToUse -= shotsAvailable;

				this.deleteEmbeddedDocuments("Item", [ammoItem._id]);
				continue;
			}
			else {
				newCurrentShots -= roundsToUse;

				if (newCurrentShots <= 0) {
					const overflow = Math.abs(newCurrentShots);
					const usedQuantity = Math.floor(overflow / max) + 1;

					newQuantity -= usedQuantity;
					newCurrentShots = max - (overflow % max);

					if (ammoItem.system.fusionCore) {
						newCurrentCharges = Math.min(
							ammoItem.system.charges.max,
							Math.ceil(newCurrentShots / 50)
						);
					}
				}

				roundsToUse = 0;
			}

			await this.updateEmbeddedDocuments("Item", [{
				"_id": ammoItem._id,
				"system.charges.current": newCurrentCharges,
				"system.shots.current": newCurrentShots,
				"system.quantity": newQuantity,
			}]);
		}
	}

	async updateAddictions() {
		const updateData = {};

		if (this.isAlcoholic) {
			updateData["system.conditions.intoxication"] = 0;
		}

		for (const doseKey in this.system.chemDoses) {
			const dose = this.system.chemDoses[doseKey];

			const isAddicted = await this.isAddictedToChem(
				dose.addictionName
			);

			const scenesRemaining = dose.scenes - 1;

			if (isAddicted) {
				if (scenesRemaining <= 0) {
					updateData[`system.chemDoses.-=${doseKey}`] = null;
				}
				else {
					dose.scenes = scenesRemaining;
					updateData[`system.chemDoses.${doseKey}`] = dose;
				}
			}
			else {
				updateData[`system.chemDoses.${doseKey}`] = dose;
			}
		}

		this.update(updateData);
	}

	async resetChemDoses() {
		const updateData = {};

		for (const chemId in this.system.chemDoses) {
			updateData[`system.chemDoses.-=${chemId}`] = null;
		}

		this.update(updateData);
	}

	async rollAvailabilityCheck() {
		const luckDice = this.system.attributes?.luc?.value ?? 1;

		const formula = `${luckDice}dccs>=5`;
		let roll = new Roll(formula);

		let availabilityRoll = await roll.evaluate();

		fallout.Roller2D20.showDiceSoNice(availabilityRoll);

		const rarity = parseInt(roll.result);

		fallout.chat.renderGeneralMessage(
			this,
			{
				title: game.i18n.localize("FALLOUT.AvailabilityRoll.result.title"),
				body: game.i18n.format("FALLOUT.AvailabilityRoll.result.body", { rarity }),
			},
			CONST.DICE_ROLL_MODES.PRIVATE
		);
	}

	async sleep(hours, safe, hasActiveFatigue) {
		const currentSleepStatus = this.system.conditions?.sleep ?? 0;

		if (hasActiveFatigue) {
			fallout.debug(
				`Party Sleep: Actor ${this.name} has currently active fatigue sources`
			);
		}

		let currentFatigue = this.system.conditions?.fatigue ?? 0;
		let newFatigue = currentFatigue;

		let newSleepStatus = currentSleepStatus;
		let newWellRested = false;

		if (hours >= 8 && safe) {
			newWellRested = true;
		}

		if (hours >= 6) {
			newSleepStatus = CONFIG.FALLOUT.CONDITIONS.sleep.rested;

			// If there are active fatigue states we don't reset fatgue to zero
			newFatigue = hasActiveFatigue ? currentFatigue : 0;
		}
		else if (hours >= 1) {
			if (newSleepStatus > 0) {
				newSleepStatus--;
			}
		}

		const updateData = {
			"system.conditions.fatigue": newFatigue,
			"system.conditions.lastChanged.sleep": game.time.worldTime,
			"system.conditions.sleep": newSleepStatus,
			"system.conditions.wellRested": newWellRested,
		};

		await this.updateAddictions();

		if (newWellRested && this.isNotWellRested) {
			updateData["system.health.value"] = this.system.health.value + 2;
		}

		await this.update(updateData);
	}
}

class FalloutItem extends Item {

	get currentWeaponDamage() {
		if (this.type !== "weapon") {
			return undefined;
		}

		let damageDice = parseInt(this.system.damage?.rating ?? 0);

		if (["meleeWeapons", "unarmed"].includes(this.system.weaponType)) {
			let damageBonus = this.actor.system?.meleeDamage?.value ?? 0;
			damageDice += damageBonus;
		}

		if (game.settings.get(SYSTEM_ID, "applyWearAndTearToWeaponDamage")) {
			let wearAndTear = Number(this.system.tear);
			if (isNaN(wearAndTear)) {
				wearAndTear = 0;
			}

			damageDice -= wearAndTear;
		}

		return damageDice;
	}


	get isOwnedByCreature() {
		return this.isOwned && this.actor.type === "creature";
	}


	get isWeaponBroken() {
		if (this.type !== "weapon") {
			return false;
		}
		if (!game.settings.get(SYSTEM_ID, "applyWearAndTearToWeaponDamage")) {
			return false;
		}

		let damageDice = parseInt(this.system.damage?.rating ?? 0);

		let wearAndTear = Number(this.system.tear);
		if (isNaN(wearAndTear)) {
			wearAndTear = 0;
		}

		damageDice -= wearAndTear;

		return damageDice <= 0;
	}

	get shotsAvailable() {
		if (!this.actor) {
			return null;
		}

		if (this.type === "ammo") {
			let shotsAvailable = (this.system.quantity - 1) * this.system.shots.max;
			shotsAvailable += this.system.shots.current;

			return shotsAvailable;
		}
		else if (this.type === "weapon") {
			let shotsAvailable = 0;

			if (this.system.ammo !== "") {
				[, shotsAvailable] =
					this.actor._getAvailableAmmoType(
						this.system.ammo
					);
			}
			else if (this.system.consumedOnUse) {
				shotsAvailable = this.system.quantity;
			}

			return shotsAvailable;
		}
		else {
			return null;
		}
	}

	async _preCreate(data, options, user) {
		await super._preCreate(data, options, user);

		if (data.img) {
			return;
		} // Already had an image set so we won"t change it

		const img = CONFIG.FALLOUT.DEFAULT_ICONS[data.type] ?? undefined;

		if (img) {
			this.updateSource({img});
		}
	}

	async deleteSettlementStructure() {
		if (!this.actor) {
			return null;
		}

		const directDescendants = this.actor.items.filter(
			i => i.system.parentItem === this._id
		);

		for (const item of directDescendants) {
			await item.update({"system.parentItem": ""});
		}
	}

	/**
	 * Prepare a data object which is passed to any Roll formulas which are
	 * created related to this Item
	 * @private
	 */
	getRollData() {
		// If present, return the actor's roll data.
		if (!this.actor) {
			return null;
		}
		const rollData = this.actor.getRollData();
		rollData.item = foundry.utils.deepClone(this.system);

		return rollData;
	}


	hasWeaponQuality(quality) {
		if (this.type !== "weapon") {
			return false;
		}

		return this.system.damage.weaponQuality[quality].value > 0;
	}


	/**
	 * Augment the basic Item data model with additional dynamic data.
	 */
	prepareData() {
		// As with the actor class, items are documents that can have their data
		// preparation methods overridden (such as prepareBaseData()).
		super.prepareData();

		switch (this.type) {
			case "ammo":
				this._prepareAmmoData();
				break;
			case "consumable":
				this._prepareConsumableData();
				break;
			case "skill":
				this._prepareSkillData();
				break;
		}
	}

	async rollQuantity(mode) {
		const formula = this.system.quantityRoll;

		const roll = new Roll(formula);
		const quantityRoll = await roll.evaluate();

		await fallout.Roller2D20.showDiceSoNice(quantityRoll);

		const quantity = parseInt(roll.total);

		switch (mode) {
			case "update":
				const update = {};
				if (this.system.multishot) {
					update["system.shots.current"] = quantity;
					update["system.shots.max"] = quantity;
				}
				else {
					update["system.quantity"] = quantity;
				}
				return this.update(update);
			case "create":
				const data = this.toObject();
				data.system.quantity = quantity;
				if (this.actor) {
					return this.actor.createEmbeddedDocuments("Item", [data]);
				}
				else {
					return Item.create(data);
				}
			case "chat":
				return fallout.chat.renderGeneralMessage(
					this,
					{
						title: game.i18n.localize("FALLOUT.dialog.roll_quantity.title"),
						body: game.i18n.format("FALLOUT.dialog.roll_quantity.chat.body",
							{
								itemName: this.name,
								quantity,
							}
						),
					}
				);
		}
	}

	/**
   * Handle send to chat clicks.
   * @param {Event} event   The originating click event
   * @private
   */
	async sendToChat(showQuantity=true) {

		const itemData = foundry.utils.duplicate(this.system);
		itemData._id = this._id;
		itemData.img = this.img;

		itemData.isApparel = this.type === "apparel";
		itemData.isApparelMod = this.type === "apparel_mod";
		itemData.isBook = this.type === "books_and_magz";
		itemData.isConsumable = this.type === "consumable";
		itemData.isDisease = this.type === "disease";
		itemData.isPerk = this.type === "perk";
		itemData.isPhysical = this.system.hasOwnProperty("weight");
		itemData.isRobotArmor = this.type === "robot_armor";
		itemData.isRobotMod = this.type === "robot_mod";
		itemData.isSettlementItem = this.type === "object_or_structure";
		itemData.isSkill = this.type === "skill";
		itemData.isWeapon = this.type === "weapon";
		itemData.isWeaponMod = this.type === "weapon_mod";

		if (itemData.isWeaponMod) {
			itemData.modSummary = await this._sheet.getWeaponModSummary(this);
		}

		itemData.name = this.name;
		itemData.showQuantity = showQuantity;
		itemData.type = this.type;

		if (itemData.isWeapon) {
			itemData.weaponQualities = this.weaponQualitiesString();
		}

		if (itemData.isSettlementItem) {
			itemData.materials = [];
			for (const material of ["common", "uncommon", "rare"]) {
				itemData.materials.push({
					label: game.i18n.localize(`FALLOUT.actor.inventory.materials.${material}`),
					value: this.system.materials[material] ?? 0,
				});
			}
		}

		const html = await foundry.applications.handlebars.renderTemplate("systems/fallout/templates/chat/item.hbs", itemData);
		const chatData = {
			user: game.user.id,
			rollMode: game.settings.get("core", "rollMode"),
			content: html,
		};
		if (["gmroll", "blindroll"].includes(chatData.rollMode)) {
			chatData.whisper = ChatMessage.getWhisperRecipients("GM");
		}
		else if (chatData.rollMode === "selfroll") {
			chatData.whisper = [game.user];
		}
		ChatMessage.create(chatData);
	}

	weaponQualitiesString() {
		if (this.type !== "weapon") {
			return "";
		}

		const qualities = [];
		for (const key in CONFIG.FALLOUT.WEAPON_QUALITIES) {
			if (this.system.damage?.weaponQuality[key]?.value) {
				qualities.push(CONFIG.FALLOUT.WEAPON_QUALITIES[key]);
			}
		}

		return qualities.join(", ");
	}

	/** @inheritdoc */
	_initializeSource(source, options={}) {
		source = super._initializeSource(source, options);

		if (!source._id || !options.pack || fallout.moduleArt.suppressArt) {
			return source;
		}

		const uuid = `Compendium.${options.pack}.Item.${source._id}`;

		const art = fallout.moduleArt.map.get(uuid);

		if (art?.img) {
			if (art.img) {
				source.img = art.img;
			}
		}
		return source;
	}

	_prepareAmmoData() {
		if (this.system.fusionCore) {
			// Fusion Cores provide 50 shots per charge
			this.system.shots.max = this.system.charges.max * 50;

			// Cap current shots to max in case it's changed
			this.system.shots.current = Math.min(
				this.system.shots.max,
				this.system.shots.current
			);

			this.system.charges.current = Math.min(
				this.system.charges.max,
				this.system.charges.current,
				Math.ceil(this.system.shots.current / 50)
			);
		}
	}


	_prepareConsumableData() {
		this.system.consumeIcon = CONFIG.FALLOUT.CONSUMABLE_USE_ICONS[
			this.system.consumableType
		];
	}

	_prepareSkillData() {
		this.localizedName = fallout.utils.getLocalizedSkillName(this);
		this.localizedDefaultAttribute = fallout.utils.getLocalizedSkillAttribute(this);
	}

}

/**
 * Manage Active Effect instances through the Actor Sheet via effect control buttons.
 * @param {MouseEvent} event      The left-click event on the effect control
 * @param {Actor|Item} owner      The owning entity which manages this effect
 */
function onManageActiveEffect(event, owner) {
	event.preventDefault();

	const a = event.currentTarget;
	const li = a.closest("li");
	const effectId = li.dataset.effectId;

	let effect = null;
	if (owner.documentName === "Actor") {
		effect = effectId
			? owner.allApplicableEffects().find(effect => effect.id === effectId)
			: null;
	}
	else if (owner.documentName === "Item") {
		effect = effectId
			? owner.transferredEffects.find(effect => effect.id === effectId)
			: null;
	}

	switch (a.dataset.action) {
		case "create":
			return owner.createEmbeddedDocuments("ActiveEffect", [{
				"disabled": li.dataset.effectType === "inactive",
				"duration.rounds": li.dataset.effectType === "temporary" ? 1 : undefined,
				"icon": "icons/svg/aura.svg",
				"name": "New Effect",
				"origin": owner.uuid,
			}]);
		case "edit":
			return effect.sheet.render(true);
		case "delete":
			return effect.delete();
		case "toggle":
			return effect.update({disabled: !effect.disabled});
	}
}

/**
 * Prepare the data structure for Active Effects which are currently applied to
 * an Actor or Item.
 * @param {ActiveEffect[]} effects    The array of Active Effect instances to prepare sheet data for
 * @return {object}                   Data for rendering
 */
function prepareActiveEffectCategories(effects) {
	const categories = {
		temporary: {
			type: "temporary",
			label: "Temporary Effects",
			effects: [],
		},
		passive: {
			type: "passive",
			label: "Passive Effects",
			effects: [],
		},
		inactive: {
			type: "inactive",
			label: "Inactive Effects",
			effects: [],
		},
	};

	for (const e of effects) {
		if (e.disabled) {
			categories.inactive.effects.push(e);
		}
		else if (e.isTemporary) {
			categories.temporary.effects.push(e);
		}
		else {
			categories.passive.effects.push(e);
		}
	}

	return categories;
}

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
class FalloutBaseActorSheet
	extends foundry.appv1.sheets.ActorSheet {

	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["fallout", "sheet", "actor"],
			width: 865,
			height: 955,
			tabs: [
				{
					navSelector: ".sheet-tabs",
					contentSelector: ".sheet-body",
					initial: this.initialTab,
				},
			],
		});
	}

	get initialTab() {
		return "status";
	}

	get ignoredInventoryItems() {
		return [];
	}

	get inventorySections() {
		return [];
	}

	/** @override */
	get template() {
		return `systems/fallout/templates/actor/${this.actor.type}-sheet.hbs`;
	}

	/** @inheritdoc */
	get title() {
		const type = game.i18n.localize(`TYPES.Actor.${this.actor.type}`);
		return `[${type}] ${this.actor.name}`;
	}

	/* -------------------------------------------- */

	/** @override */
	async getData(options) {

		// Use a safe clone of the actor data for further operations.
		const source = this.actor.toObject();
		const actorData = this.actor.toObject(false);

		// Sort all items alphabetically for display on the character sheet
		actorData.items.sort((a, b) => a.name.localeCompare(b.name));

		const context = {
			actor: actorData,
			editable: this.isEditable,
			effects: prepareActiveEffectCategories(this.actor.allApplicableEffects()),
			FALLOUT: CONFIG.FALLOUT,
			hasCategory: ["creature", "npc"].includes(this.actor.type),
			isPlayerCharacter: ["character", "robot"].includes(this.actor.type),
			isCharacter: this.actor.type === "character",
			isCreature: this.actor.type === "creature",
			isNPC: this.actor.type === "npc",
			isRobot: this.actor.type === "robot",
			isSettlement: this.actor.type === "settlement",
			isVehicle: this.actor.type === "vehicle",
			items: this.actor.items,
			limited: this.actor.limited,
			options: this.options,
			owner: this.actor.isOwner,
			rollData: this.actor.getRollData.bind(this.actor),
			source: source.system,
			system: actorData.system,
			type: this.actor.type,
			useKgs: this.actor.useKgs,
		};

		await this._prepareItems(context);
		await this._prepareMaterials(context);

		// Biography HTML enrichment
		if (context.system.biography) {
			context.biographyHTML = await foundry.applications.ux.TextEditor.enrichHTML(
				context.system.biography,
				{
					secrets: this.actor.isOwner,
					rollData: context.rollData,
					async: true,
				}
			);
		}

		return context;
	}

	/**
	 * Organize and classify Items for Character sheets.
	 *
	 * @param {Object} actorData The actor to prepare.
	 *
	 * @return {undefined}
	 */
	async _prepareItems(context) {
		context.itemsByType = {};

		if (this.actor.isCreature) {
			context.butcheryItems = [];
		}

		// Different Actor types require specific inventory sections which
		// are filtered from the full list of items
		//
		for (const inventorySection of this.inventorySections) {
			context.itemsByType[inventorySection] = [];
		}

		this._getFilteredApparelSections(context);

		// Build the inventory and its sections by processing each item,
		// decorating it where required and storing it in the correct inventory
		// location
		//
		context.inventory = [];

		for (const i of context.actor.items) {
			i.img = i.img || DEFAULT_TOKEN;

			// Make sure Robots can't equip Character armor, and vice-versa
			//
			i.canBeEquipped = i.system.equippable ?? false;
			if (i.type === "apparel" && this.actor.isRobot) {
				i.canBeEquipped = false;
			}

			if (i.type === "consumable" && this.actor.isCreature) {
				if (i.system.butchery) {
					context.butcheryItems.push(i);
					continue;
				}
			}

			if (i.type === "robot_armor" && this.actor.isNotRobot) {
				i.canBeEquipped = false;
			}
			if (i.type === "robot_mod" && this.actor.isNotRobot) {
				i.canBeEquipped = false;
			}

			if (i.type === "skill") {
				i.localizedName = fallout.utils.getLocalizedSkillName(i);
				i.localizedDefaultAttribute = fallout.utils.getLocalizedSkillAttribute(i);
			}

			if (i.type === "weapon") {
				const weapon = this.actor.items.find(item => item._id === i._id);
				i.currentWeaponDamage = weapon.currentWeaponDamage;
				i.shotsAvailable = weapon.shotsAvailable;

				i.damageTooltip = await foundry.applications.handlebars.renderTemplate(
					"systems/fallout/templates/ui/weapon-damage-tooltip.hbs",
					{
						actor: this.actor,
						item: i,
					}
				);
			}

			// Skip moving this into its own section if it's not going to be
			// separated into a specific inventory section
			//
			// Items that don't have their own section just go into the main
			// inventory to appear in the "Unsorted" section
			//
			// Some inventory items are completely ignored, for example apparel
			// and robot_armor as these are handled differently
			//
			if (this.inventorySections.includes(i.type)) {
				context.itemsByType[i.type].push(i);
			}
			else if (!this.ignoredInventoryItems.includes(i.type)) {
				context.inventory.push(i);
			}

		}

		// Sort skills by their localized name for convenience of non-English
		// speakers
		//
		if (context.itemsByType.skill) {
			context.itemsByType.skill.sort(
				(a, b) => a.localizedName.localeCompare(b.localizedName)
			);
		}
	}

	_getFilteredApparelSections(context) {}

	/* -------------------------------------------- */

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		// SWITCH TABS
		html.find(".tab-switch").click(evt => {
			evt.preventDefault();
			const el = evt.currentTarget;
			const tab = el.dataset.tab;
			this._tabs[0].activate(tab);
		});

		// Render the item sheet for viewing/editing prior to the editable check.
		html.find(".item-edit").click(ev => {
			const li = $(ev.currentTarget).parents(".item");
			const item = this.actor.items.get(li.data("itemId"));
			item.sheet.render(true);
		});

		// -------------------------------------------------------------
		// ! Everything below here is only needed if the sheet is editable
		if (!this.isEditable) {
			return;
		}

		// * SKILLS LISTENERS [clic, right-click, value change, tag ]
		// Click Skill Item
		html.find(".skill .item-name").click(ev => {
			const li = $(ev.currentTarget).parents(".item");
			const item = this.actor.items.get(li.data("itemId"));
			this._onRollSkill(
				item.localizedName,
				item.system.value,
				this.actor.system.attributes[item.system.defaultAttribute].value,
				item.system.tag
			);
		});

		// Change Skill Rank value
		html.find(".skill .item-skill-value input").change(async ev => {
			let newRank = parseInt($(ev.currentTarget).val());
			const li = $(ev.currentTarget).parents(".item");
			const item = this.actor.items.get(li.data("itemId"));
			let updatedItem = { _id: item.id, system: { value: newRank } };
			await this.actor.updateEmbeddedDocuments("Item", [updatedItem]);
		});

		// Toggle Tag value
		html.find(".skill .item-skill-tag").click(async ev => {
			const li = $(ev.currentTarget).parents(".item");
			const item = this.actor.items.get(li.data("itemId"));
			let updatedItem = { _id: item.id, system: { tag: !item.system.tag } };
			await this.actor.updateEmbeddedDocuments("Item", [updatedItem]);
		});

		// * AMMO COUNT UPDATE
		html.find(".item-quantity").change(async ev => {
			ev.preventDefault();
			let newQuantity = parseInt($(ev.currentTarget).val());
			const li = $(ev.currentTarget).parents(".item");
			const item = this.actor.items.get(li.data("itemId"));
			let updatedItem = { _id: item.id, system: { quantity: newQuantity } };
			await this.actor.updateEmbeddedDocuments("Item", [updatedItem]);
		});

		// * CLICK TO EXPAND
		html.find(".expandable-info").click(async event => this._onItemSummary(event));

		html.find(".immune-toggle").click(this._onImmunityToggle.bind(this));

		// * Add Inventory Item
		html.find(".item-create").click(this._onItemCreate.bind(this));

		html.find(
			".find-from-compendium"
		).each((i, el) => {
			el.title = game.i18n.localize("FALLOUT.Form.SelectCompendiumItem.tooltip");
		});

		html.find(".find-from-compendium").click(this._onFindFromCompendium.bind(this));

		html.find(".find-any-from-compendium").click(this._onFindAnyFromCompendium.bind(this));

		// * Delete Inventory Item
		html.find(".item-delete").click(async ev => {
			event.preventDefault();

			const me = this;

			const li = $(ev.currentTarget).parents(".item");
			const itemId = li.data("item-id") ?? "";
			const item = this.actor.items.get(itemId);

			if (item.canBeScrapped) {
				const html = await foundry.applications.handlebars.renderTemplate(
					"systems/fallout/templates/dialogs/delete-or-junk.hbs"
				);

				const dialog = new Dialog({
					title: `${game.i18n.localize("FALLOUT.UI.DeleteOrJunk.title")}`,
					content: html,
					buttons: {
						Delete: {
							icon: '<i class="fa fa-trash"></i>',
							label: `${game.i18n.localize("FALLOUT.TEMPLATES.Delete")}`,
							callback: async () => {
								await me._onItemDelete(item);
								li.slideUp(200, () => me.render(false));
							},
						},
						Junk: {
							icon: '<i class="fa fa-screwdriver-wrench"></i>',
							label: `${game.i18n.localize("FALLOUT.TEMPLATES.Junk")}`,
							callback: async () => {
								me.actor.incrementJunk();
								await me._onItemDelete(item);
								li.slideUp(200, () => me.render(false));
							},
						},
					},
					default: "Delete",
				});
				dialog.render(true);
			}
			else {
				await this._onItemDelete(item);
				li.slideUp(200, () => this.render(false));
			}

		});

		// * Toggle Favorite Inventory Item
		html.find(".item-favorite").click(async ev => {
			const li = $(ev.currentTarget).parents(".item");
			const item = this.actor.items.get(li.data("item-id"));

			item.update({"system.favorite": !item.system.favorite});
		});

		// * Toggle Stash Inventory Item
		html.find(".item-stash").click(async ev => {
			const li = $(ev.currentTarget).parents(".item");
			const attachedToId = li.data("item-attached") ?? "";

			const itemId = li.data("item-id") ?? "";
			const item = this.actor.items.get(itemId);

			const newValue = !item.system.stashed;

			const isFrame = item.system.powerArmor?.isFrame ?? false;

			if (attachedToId !== "" || isFrame) {
				const myFrameId = isFrame ? itemId : attachedToId;

				const updateData = [{
					"_id": myFrameId,
					"system.stashed": newValue,
					"system.equipped": newValue ? false : item.system.equipped,
				}];

				const attachments = this.actor.items.filter(
					i => i.type === "apparel"
						&& i.system.powerArmor.frameId === myFrameId
				).map(i => i._id);

				for (const attachmentId of attachments) {
					updateData.push({
						"_id": attachmentId,
						"system.stashed": newValue,
						"system.equipped": newValue ? false : item.system.equipped,
					});
				}

				await Item.updateDocuments(updateData, {parent: this.actor});

				if (item.type === "apparel") {
					this.actor._calculateCharacterBodyResistance();
				}
			}
			else {
				item.update({
					"system.stashed": newValue,
					"system.equipped": newValue ? false : item.system.equipped,
				});
			}
		});

		// * Active Effect management
		html.find(".effect-control")
			.click(ev => onManageActiveEffect(ev, this.actor));

		// * ROLL WEAPON SKILL
		html.find(".weapon-roll").click(async event => this._onWeaponRoll(event));

		// * ROLL WEAPON DAMAGE
		html.find(".weapon-roll-damage").click(async event => this._onWeaponDamageRoll(event));

		// Drag events for macros.
		if (this.actor.isOwner) {
			let handler = ev => this._onDragStart(ev);
			html.find("li.item").each((i, li) => {
				if (li.classList.contains("inventory-header")) {
					return;
				}
				if (li.classList.contains("skill")) {
					return;
				}
				li.setAttribute("draggable", true);
				li.addEventListener("dragstart", handler, false);
			});
		}


		// ! DON'T LET NUMBER FIELDS EMPTY
		const numInputs = document.querySelectorAll("input[type=number]");
		numInputs.forEach(function(input) {
			input.addEventListener("change", function(e) {
				if (e.target.value === "") {
					e.target.value = 0;
				}
			});
		});

		// Disable any fields that have been overridden by Active Effects and
		// add a tooltip explaining why
		//
		for (const override of this.actor.overriddenFields) {
			html.find(
				`input[name="${override}"],select[name="${override}"]`
			).each((i, el) => {
				el.disabled = true;
				el.dataset.tooltip = "FALLOUT.Actor.Warnings.ActiveEffectOverride";
			});
		}

		let menuSkills = [
			{
				icon: '<i class="fas fa-dice"></i>',
				name: "FALLOUT.TEMPLATES.Use_Strength",
				callback: t => {
					this._onRightClickSkill(t.dataset?.itemId, "str");
				},
			},
			{
				icon: '<i class="fas fa-dice"></i>',
				name: "FALLOUT.TEMPLATES.Use_Perception",
				callback: t => {
					this._onRightClickSkill(t.dataset?.itemId, "per");
				},
			},
			{
				icon: '<i class="fas fa-dice"></i>',
				name: "FALLOUT.TEMPLATES.Use_Endurance",
				callback: t => {
					this._onRightClickSkill(t.dataset?.itemId, "end");
				},
			},
			{
				icon: '<i class="fas fa-dice"></i>',
				name: "FALLOUT.TEMPLATES.Use_Charisma",
				callback: t => {
					this._onRightClickSkill(t.dataset?.itemId, "cha");
				},
			},
			{
				icon: '<i class="fas fa-dice"></i>',
				name: "FALLOUT.TEMPLATES.Use_Intelligence",
				callback: t => {
					this._onRightClickSkill(t.dataset?.itemId, "int");
				},
			},
			{
				icon: '<i class="fas fa-dice"></i>',
				name: "FALLOUT.TEMPLATES.Use_Agility",
				callback: t => {
					this._onRightClickSkill(t.dataset?.itemId, "agi");
				},
			},
			{
				icon: '<i class="fas fa-dice"></i>',
				name: "FALLOUT.TEMPLATES.Use_Luck",
				callback: t => {
					this._onRightClickSkill(t.dataset?.itemId, "luc");
				},
			},
			{
				icon: '<i class="fas fa-trash" style="color:red"></i>',
				name: "FALLOUT.TEMPLATES.Delete",
				callback: t => {
					this._onRightClickDelete(t.dataset?.itemId);
				},
			},
		];

		new foundry.applications.ux.ContextMenu.implementation(
			html.get(0), ".skill", menuSkills, {jQuery: false}
		);
	}

	async _onImmunityToggle(event) {
		event.preventDefault();
		const immunityType = $(event.currentTarget).data("immunityType");
		this.actor._toggleImmunity(immunityType);
	}

	async _onFindAnyFromCompendium(event) {
		event.preventDefault();
		new fallout.apps.ItemTypeMenu(this.actor).render(true);
	}

	async _onFindFromCompendium(event) {
		event.preventDefault();
		const itemType = event.currentTarget.dataset.type;
		new fallout.apps.ItemSelector(this.actor, {itemType}).render(true);
	}

	/**
	 * Handle creating a new Owned Item for the actor using initial data defined
	 * in the HTML dataset
	 * @param {Event} event	 The originating click event
	 * @private
	 */
	async _onItemCreate(event) {
		event.preventDefault();
		const header = event.currentTarget;
		// Get the type of item to create.
		const type = header.dataset.type;
		// Grab any data associated with this control.
		const data = foundry.utils.duplicate(header.dataset);
		// Initialize a default name.
		const name = `New ${type.capitalize()}`;
		// Prepare the item object.
		const itemData = {
			name: name,
			type: type,
			system: data,
		};
		// Remove the type from the dataset since it's in the itemData.type prop.
		delete itemData.system.type;
		// Finally, create the item!
		const newItem = await Item.create(itemData, { parent: this.actor });
		if (newItem) {
			newItem.sheet.render(true);
		}
	}

	async _onItemDelete(item) {
		if (item.type === "apparel" && item.system.powerArmor.isFrame) {
			const attachedItems = this.actor.items.filter(
				i => i.type === "apparel"
						&& i.system.powerArmor.frameId === item.id
			);

			const updateData = [];

			for (const attachedItem of attachedItems) {
				updateData.push({
					"_id": attachedItem._id,
					"system.powerArmor.frameId": "",
				});
			}

			if (updateData.length > 0) {
				await Item.updateDocuments(updateData, {parent: this.actor});

				if (this.actor.type === "character") {
					this.actor._calculateCharacterBodyResistance();
				}
			}
		}

		await item.delete();

		const frames = this.actor.items.filter(i =>
			i.type === "apparel"
					&& i.system.apparelType === "powerArmor"
					&& i.system.powerArmor.isFrame
		);

		for (const frame of frames) {
			frame.sheet.render(false);
		}

	}

	async _onRightClickDelete(itemId) {
		const item = this.actor.items.get(itemId);
		await item.delete();
	}

	_onRightClickSkill(itemId, attribute) {
		const item = this.actor.items.get(itemId);
		this._onRollSkill(
			item.name,
			item.system.value,
			this.actor.system.attributes[attribute].value,
			item.system.tag
		);
	}

	_onRollSkill(skillName, rank, attribute, tag) {
		fallout.Dialog2d20.createDialog({
			rollName: skillName,
			diceNum: 2,
			attribute: attribute,
			skill: rank,
			tag: tag,
			complication: parseInt(this.actor.system.complication),
		});
	}

	async _onItemSummary(event) {
		event.preventDefault();
		let li = $(event.currentTarget).parents(".item");
		let item = this.actor.items.get(li.data("itemId"));
		let moreInfo = "";

		if (item.system.effect && item.system.effect !== "") {
			moreInfo = await foundry.applications.ux.TextEditor.enrichHTML(
				item.system.effect,
				{
					secrets: item.isOwner,
					async: true,
				}
			);
		}
		else {
			moreInfo = await foundry.applications.ux.TextEditor.enrichHTML(
				item.system.description,
				{
					secrets: item.isOwner,
					async: true,
				}
			);
		}
		// Toggle summary
		if (li.hasClass("expanded")) {
			let summary = li.children(".item-summary");
			summary.slideUp(200, () => {
				summary.remove();
			});
		}
		else {
			let div = $(
				`<div class="item-summary"><div class="item-summary-wrapper"><div>${moreInfo}</div></div></div>`
			);
			li.append(div.hide());
			div.slideDown(200);
		}
		li.toggleClass("expanded");
	}

	async _onWeaponDamageRoll(event) {
		const li = $(event.currentTarget).parents(".item");
		const item = this.actor.items.get(li.data("item-id"));

		const numOfDice = item.currentWeaponDamage;

		if (item.isWeaponBroken) {
			return ui.notifications.warn(
				game.i18n.localize("FALLOUT.ERRORS.ThisWeaponIsBroken")
			);
		}

		let rollName = item.name;

		let actorUUID;
		let _token = this.actor.token;
		if (_token) {
			actorUUID = this.actor.token.uuid;
		}
		else {
			actorUUID = this.actor.uuid;
		}

		// console.warn(fromUuidSync(actorUUID).actor)

		fallout.DialogD6.createDialog({
			rollName: rollName,
			diceNum: numOfDice,
			actor: actorUUID,
			weapon: item,
		});
	}

	async _onWeaponRoll(event) {
		const li = $(event.currentTarget).parents(".item");
		const item = this.actor.items.get(li.data("item-id"));

		if (item.isWeaponBroken) {
			return ui.notifications.warn(
				game.i18n.localize("FALLOUT.ERRORS.ThisWeaponIsBroken")
			);
		}

		let attribute;
		let rollName = item.name;
		let skill;

		if (item.isOwnedByCreature) {
			const creatureAttribute = item.system.creatureAttribute ?? "";
			const creatureSkill = item.system.creatureSkill ?? "";

			if (creatureSkill === "" || creatureAttribute === "") {
				return ui.notifications.warn(
					game.i18n.localize("FALLOUT.ERRORS.WeaponHasMissingCreatureConfiguration")
				);
			}

			attribute = item.actor.system[creatureAttribute];

			skill = item.actor.system[creatureSkill];
			skill.tag = true;
		}
		else {
			const skillName = item.system.weaponType === "custom"
				? item.system.skill ?? ""
				: CONFIG.FALLOUT.WEAPON_SKILLS[item.system.weaponType];

			const customAttribute = item.system.weaponType === "custom"
				? item.system.attribute ?? ""
				: false;

			if (skillName === "") {
				return ui.notifications.error(
					game.i18n.localize("FALLOUT.ERRORS.UnableToDetermineWeaponSkill")
				);
			}

			const skillItem = item.actor.items.find(i => i.name === skillName);

			if (skillItem) {
				skill = skillItem.system;
			}
			else {
				skill = { value: 0, tag: false, defaultAttribute: "str"};
			}

			const attributeOverride = CONFIG.FALLOUT.WEAPON_ATTRIBUTE_OVERRIDE[
				item.system.weaponType
			];

			if (customAttribute) {
				attribute = item.actor.system.attributes[customAttribute];
			}
			else if (attributeOverride) {
				attribute = item.actor.system.attributes[attributeOverride];
			}
			else {
				attribute = item.actor.system.attributes[skill.defaultAttribute];
			}

			if (!attribute) {
				return ui.notifications.error(
					game.i18n.localize("FALLOUT.ERRORS.UnableToDetermineWeaponAttribute")
				);
			}
		}

		// REDUCE AMMO
		const autoCalculateAmmo = game.settings.get(
			"fallout", "automaticAmmunitionCalculation"
		);

		const actorCanUseAmmo =
			["character", "robot"].includes(this.actor.type);

		const ammoPopulated = item.system.ammo !== "";

		if (autoCalculateAmmo && actorCanUseAmmo && ammoPopulated) {
			const [ammo, shotsAvailable] = this.actor._getAvailableAmmoType(
				item.system.ammo
			);

			if (!ammo) {
				ui.notifications.warn(`Ammo ${item.system.ammo} not found`);
				return;
			}

			if (shotsAvailable < item.system.ammoPerShot) {
				ui.notifications.warn(`Not enough ${item.system.ammo} ammo`);
				return;
			}
		}
		else if (item.system.consumedOnUse && item.system.quantity < 1) {
			ui.notifications.warn(`You don't have any ${item.name}'s left`);
			return;
		}

		// Check for unreliable weapon quality
		let complication = parseInt(this.actor.system.complication);
		if (item.system.damage.weaponQuality.unreliable.value) {
			complication -= 1;
		}

		fallout.Dialog2d20.createDialog({
			rollName: rollName,
			diceNum: 2,
			attribute: attribute.value,
			skill: skill.value,
			tag: skill.tag,
			complication: complication,
			rollLocation: true,
			actor: this.actor,
			item: item,
		});
	}

	async _prepareButcheryMaterials(context) {
		context.butcheryMaterials = [];

		for (const material of ["common", "uncommon", "rare"]) {
			context.butcheryMaterials.push({
				label: game.i18n.localize(`FALLOUT.actor.inventory.materials.${material}`),
				key: `system.butchery.${material}`,
				value: this.actor.system.butchery[material] ?? 0,
			});
		}
	}

	async _prepareMaterials(context) {
		context.inventoryMaterials = [];

		for (const material of ["junk", "common", "uncommon", "rare"]) {
			context.inventoryMaterials.push({
				label: game.i18n.localize(`FALLOUT.actor.inventory.materials.${material}`),
				key: `system.materials.${material}`,
				value: this.actor.system.materials[material] ?? 0,
			});
		}
	}
}

/**
 * @extends {FalloutBaseActorSheet}
 */
class FalloutNpcSheet extends FalloutBaseActorSheet {

	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["fallout", "sheet", "npc"],
			width: 815,
			height: 790,
			tabs: [
				{
					navSelector: ".sheet-tabs",
					contentSelector: ".sheet-body",
					initial: this.initialTab,
				},
			],
		});
	}

	/** @override */
	get initialTab() {
		return "abilities";
	}

	/** @override */
	get inventorySections() {
		return [
			"skill",
			"special_ability",
			"perk",
			"weapon",
		];
	}

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		html.find(".roll-wealth").click(this._onRollWealth.bind(this));
	}

	async getData(options) {
		const context = await super.getData(options);

		const bodyPartData = this.actor.system.body_parts;

		context.bodyParts = [];

		let bodyType = "humanoid";
		let valueConfig = {};

		if (this.actor.isVehicle) {
			bodyType = "vehicle";
			switch (this.actor.system.bodyType) {
				case "apc":
					valueConfig = CONFIG.FALLOUT.VEHICLE_APC_VALUES;
					break;
				case "armored":
					valueConfig = CONFIG.FALLOUT.VEHICLE_ARMORED_VALUES;
					break;
				case "bus":
					valueConfig = CONFIG.FALLOUT.VEHICLE_BUS_VALUES;
					break;
				case "carTruck":
					valueConfig = CONFIG.FALLOUT.VEHICLE_CARTRUCK_VALUES;
					break;
				case "motorcycle":
					valueConfig = CONFIG.FALLOUT.VEHICLE_MOTORCYCLE_VALUES;
					break;
				case "sportsCar":
					valueConfig = CONFIG.FALLOUT.VEHICLE_SPORTSCAR_VALUES;
					break;
				case "vertibird":
					valueConfig = CONFIG.FALLOUT.VEHICLE_VERTIBIRD_VALUES;
					break;
				default:
					valueConfig = CONFIG.FALLOUT.VEHICLE_CARTRUCK_VALUES;
			}
		}
		else {
			bodyType = this.actor.system.bodyType;
			valueConfig = CONFIG.FALLOUT.BODY_VALUES;
		}


		for (const part in valueConfig) {
			const name = game.i18n.localize(
				`FALLOUT.BodyTypes.${bodyType}.${part}`
			);
			context.bodyParts.push({
				name: name,
				roll: valueConfig[part],
				basePath: `system.body_parts.${part}`,
				resistanceValues: bodyPartData[part].resistance,
				injuryOpenCount: bodyPartData[part].injuryOpenCount ?? 0,
				injuryTreatedCount: bodyPartData[part].injuryTreatedCount ?? 0,
			});
		}

		if (this.actor.isCreature) {
			await this._prepareButcheryMaterials(context);
		}

		if (this.actor.isVehicle) {
			await this._getVehicleQualities(context, this.actor);
		}

		context.disableAutoXpReward = game.settings.get(
			SYSTEM_ID, "disableAutoXpReward"
		);

		context.settlements = [];

		const settlements = game.actors.filter(a => a.type === "settlement");
		settlements.sort((a, b) => a.name.localeCompare(b.name));

		for (const settlement of settlements) {
			context.settlements.push({
				uuid: settlement.uuid,
				name: settlement.name,
			});
		}

		return context;
	}

	async _onRollWealth(event) {
		event.preventDefault();
		const wealthLevel = Math.max(1, this.actor.system.wealth ?? 1);

		const formula = `${wealthLevel}d20`;
		const roll = new Roll(formula);

		const wealthRoll = await roll.evaluate();

		await fallout.Roller2D20.showDiceSoNice(wealthRoll);

		const caps = parseInt(roll.total);

		this.actor.update({"system.currency.caps": caps});
	}

	async _updateObject(event, formData) {
		if (this.actor.type === "settlement") {
			const originalSettlement = this.actor.system.settlement.uuid;
			const newSettlement = formData["system.settlement.uuid"];

			await super._updateObject(event, formData);

			if (originalSettlement !== newSettlement) {
				for (const uuid of [originalSettlement, newSettlement]) {
					if (uuid === "") {
						continue;
					}
					const settlement = await fromUuid(uuid);

					if (settlement) {
						settlement.sheet.render(false);
					}
				}
			}
			else if (newSettlement !== "") {
				const settlement = await fromUuid(newSettlement);
				if (settlement) {
					settlement.sheet.render(false);
				}
			}
		}
		else {
			for (const resistanceType of ["energy", "physical", "poison", "radiation"]) {
				const key = `_all_${resistanceType}`;
				const val = formData[key] ?? null;

				if (val !== null && val >= 0) {
					// Update all locations
					for (const bodyPart in this.actor.system.body_parts) {
						const bodyPartKey = `system.body_parts.${bodyPart}.resistance.${resistanceType}`;
						formData[bodyPartKey] = val;
					}
				}

				delete formData[key];
			}

			return super._updateObject(event, formData);
		}
	}

	async _getVehicleQualities(context, actor) {

		const vehicleQualities = [];
		for (const key in CONFIG.FALLOUT.VEHICLE_QUALITIES) {
			vehicleQualities.push({
				active: actor.system?.vehicleQuality[key].value ?? false,
				hasRank: CONFIG.FALLOUT.VEHICLE_QUALITY_HAS_RANK[key],
				rank: actor.system?.vehicleQuality[key].rank,
				key,
				label: CONFIG.FALLOUT.VEHICLE_QUALITIES[key],
			});
		}

		context.vehicleQualities = vehicleQualities.sort(
			(a, b) => a.label.localeCompare(b.label)
		);
	}
}

class FalloutCreatureSheet extends FalloutNpcSheet {

	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["fallout", "sheet", "creature"],
			width: 690,
			height: 635,
		});
	}
}

/**
 * @extends {ItemSheet}
 */
class FalloutItemSheet
	extends foundry.appv1.sheets.ItemSheet {

	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["fallout", "sheet", "item"],
			width: 600,
			height: "auto",
			tabs: [{
				navSelector: ".sheet-tabs",
				contentSelector: ".sheet-body",
				initial: "attributes",
			}],
			dragDrop: [{ dropSelector: "form.itemDrop" }],
		});
	}

	/** @override */
	get template() {
		const path = "systems/fallout/templates/item";
		return `${path}/${this.item.type}-sheet.hbs`;
	}

	/** @inheritdoc */
	get title() {
		const type = game.i18n.localize(`TYPES.Item.${this.item.type}`);
		return `[${type}] ${this.item.name}`;
	}

	/** @inheritdoc */
	_canDragDrop(selector) {
		return this.isEditable;
	}

	/** @inheritdoc */
	_onDragStart(event) {
		const itemId = event.currentTarget.dataset.itemId;
		const dragData = { type: "Item", id: itemId };
		// event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
		console.log("_onDragStart data:", dragData);
	}

	/** @inheritdoc */
	async _onDrop(event) {
		const data = foundry.applications.ux.TextEditor.getDragEventData(event);

		switch (data.type) {
			case "Item":
				return this._onDropItem(event, data);
			default:
				return super._onDrop();
		}
	}

	async _onDropItem(event, data) {

		const myType = this.item.type;

		// Allow the dropping of spells onto the followin Item types to make
		// creating them easier
		//
		// const allowedType = ["Potion", "Scroll", "Wand"].includes(myType);

		// Get dropped item
		const droppedItem = await fromUuid(data.uuid);

		switch (droppedItem.type) {
			case "apparel_mod":
				if (myType === "apparel") {
					const updateData = {};
					updateData[`system.mods.${droppedItem._id}`] = foundry.utils.duplicate(droppedItem);
					this.item.update(updateData);
				}
				break;
			case "perk":
				break;
			case "robot_mod":
				break;
			case "weapon_mod":
				if (myType === "weapon") {
					const updateData = {};
					updateData[`system.mods.${droppedItem._id}`] = foundry.utils.duplicate(droppedItem);
					this.item.update(updateData);
				}
				break;
		}

	}
	/* -------------------------------------------- */

	/** @override */
	async getData(options) {
		// Retrieve base data structure.
		const context = await super.getData(options);
		const item = context.item;
		const source = item.toObject();

		foundry.utils.mergeObject(context, {
			descriptionHTML: await foundry.applications.ux.TextEditor.enrichHTML(
				item.system.description,
				{
					secrets: item.isOwner,
					async: true,
				}
			),
			effects: prepareActiveEffectCategories(item.transferredEffects),
			FALLOUT: CONFIG.FALLOUT,
			flags: item.flags,
			isEmbedded: item.isEmbedded,
			isGM: game.user.isGM,
			source: source.system,
			system: item.system,
			type: item.type,
			useKgs: game.settings.get("fallout", "carryUnit") === "kgs",
		});

		context.allSources = await fallout.compendiums.sources();

		// Enrich Effect Text
		if (item.system.effect) {
			foundry.utils.mergeObject(context, {
				effectHTML: await foundry.applications.ux.TextEditor.enrichHTML(
					item.system.effect,
					{
						secrets: item.isOwner,
						async: true,
					}
				),
			});
		}

		// Enrich Weapon Mod Effect Text
		if (item.system.modEffects?.effect) {
			foundry.utils.mergeObject(context, {
				effectHTML: await foundry.applications.ux.TextEditor.enrichHTML(
					item.system.modEffects.effect,
					{
						secrets: item.isOwner,
						async: true,
					}
				),
			});
		}

		// Gather any additional data required for specific item types
		switch (item.type) {
			case "apparel":
				await this.getPowerArmorPieceData(context);
				await this.getApparelData(context, item);
				break;
			case "apparel_mod":
				await this.getApparelModData(context, item);
				break;
			case "object_or_structure":
				await this.getObjectOrStructureData(context, source, item);
				break;
			case "origin":
				await this.getOriginSelectorConfigs(context);
				break;
			case "perk":
				await this.getPerkSelectorConfigs(context);
				break;
			case "weapon":
				await this.getWeaponData(context, item);
				break;
			case "weapon_mod":
				await this.getWeaponModData(context, item);
				break;
		}

		return context;
	}

	async getApparelData(context, item) {
		// Add all apparel data to context

		// Get apparel mods attached to the apparel. Group by modType
		let modsByType = await this._getApparelModsByType(item);


		context.modsByType = modsByType;
		context.modded = item.system.mods.modded;
	}

	async getPowerArmorPieceData(context) {
		if (!this.item.isOwned) {
			return;
		}

		const item = context.item;

		let availablePieces = foundry.utils.duplicate(
			this.item.actor.items.filter(
				i => i.type === "apparel"
					&& i.system.apparelType === "powerArmor"
					&& (i.system.powerArmor.frameId === ""
						|| i.system.powerArmor.frameId === this.item._id
					)
					&& !i.system.powerArmor.isFrame
			)
		);

		availablePieces = availablePieces.sort(
			(a, b) => a.name.localeCompare(b.name)
		);

		availablePieces = availablePieces.sort(
			(a, b) => {
				const aIsAttached = a.system.powerArmor.frameId === item._id;
				const bIsAttached = b.system.powerArmor.frameId === item._id;

				return (bIsAttached ? 1 : 0) - (aIsAttached ? 1 : 0);
			}
		);

		context.powerArmorPieces = availablePieces;
	}

	async getApparelModData(context, item) {
		// Add all apparel mod data to context

		// context.damageTypes = [];
		// for (const key in CONFIG.FALLOUT.DAMAGE_TYPES) {
		//	context.damageTypes.push({
		//		active: item.system?.modEffects?.damage?.damageType[key] ?? 0,
		//		key,
		//		label: CONFIG.FALLOUT.DAMAGE_TYPES[key],
		//	});
		// }


		context.modSummary = await this.getApparelModSummary(item);

	}

	async getOriginSelectorConfigs(context) {

		const [fixedTraits, availableFixedTraits] =
			await fallout.utils.getDedupedSelectedItems(
				await fallout.compendiums.traits(),
				this.item.system.traits.fixed ?? []
			);

		context.traitSelectionConfig = {
			availableItems: availableFixedTraits,
			choicesKey: "traits.fixed",
			isItem: true,
			label: game.i18n.localize("FALLOUT.Item.Origin.Traits.label"),
			name: "system.traits.fixed",
			prompt: game.i18n.localize("FALLOUT.Item.Origin.Traits.prompt"),
			selectedItems: fixedTraits,
		};
	}

	async getObjectOrStructureData(context, source, item) {
		context.materials = [];
		for (const material of ["common", "uncommon", "rare"]) {
			context.materials.push({
				label: game.i18n.localize(`FALLOUT.actor.inventory.materials.${material}`),
				key: `system.materials.${material}`,
				value: source.system.materials[material] ?? 0,
			});
		}

		const __getDescendants = function(output, actor, item) {
			const descendants = actor.items.filter(
				i => i.system.parentItem === item._id
			);

			for (const nextDescendant of descendants) {
				output.push(nextDescendant);
				__getDescendants(output, actor, nextDescendant);
			}
		};

		if (context.isEmbedded) {
			const descendants = [];
			__getDescendants(descendants, this.item.actor, item);

			let possibleParents = await this.item.actor.items.filter(i => ["structure", "room", "store"].includes(i.system.itemType)
				&& item._id !== i._id
				&& (!descendants.find(d => d._id === i._id))
			) ?? [];

			if (this.item.system.itemType === "structure") {
				possibleParents = [];
			}

			if (this.item.system.itemType === "room") {
				possibleParents = possibleParents.filter(
					i => i.system.itemType === "structure"
				);
			}

			const parentChoices = [];
			for (const possibleParent of possibleParents) {
				parentChoices.push({
					id: possibleParent._id,
					name: possibleParent.name,
				});
			}

			context.parentChoices = parentChoices.sort(
				(a, b) => a.name.localeCompare(b.name)
			);
		}
	}

	async getPerkSelectorConfigs(context) {
		const [selectedMagazines, availableMagazines] =
			await fallout.utils.getDedupedSelectedItems(
				await fallout.compendiums.books_and_magz(false),
				this.item.system.requirementsEx.magazineUuids ?? []
			);

		context.magazineSelectionConfig = {
			availableItems: availableMagazines,
			choicesKey: "requirementsEx.magazineUuids",
			isItem: true,
			label: game.i18n.localize("FALLOUT.Item.Perk.Magazine.label"),
			name: "system.requirementsEx.magazineUuids",
			prompt: game.i18n.localize("FALLOUT.Item.Perk.Magazine.prompt"),
			selectedItems: selectedMagazines,
		};
	}

	async getWeaponData(context, item) {
		context.isWeaponBroken = this.item.isWeaponBroken;

		for (const [uuid, name] of Object.entries(CONFIG.FALLOUT.AMMO_BY_UUID)) {
			if (name === this.item.system.ammo) {
				context.weaponAmmo = await fromUuid(uuid);
				break;
			}
		}
		context.ammoTypes = CONFIG.FALLOUT.AMMO_TYPES;

		context.damageTypes = [];
		for (const key in CONFIG.FALLOUT.DAMAGE_TYPES) {
			context.damageTypes.push({
				active: item.system?.damage?.damageType[key] ?? false,
				key,
				label: CONFIG.FALLOUT.DAMAGE_TYPES[key],
			});
		}

		const weaponQualities = [];
		for (const key in CONFIG.FALLOUT.WEAPON_QUALITIES) {
			weaponQualities.push({
				active: item.system?.damage?.weaponQuality[key].value ?? 0,
				hasRank: CONFIG.FALLOUT.WEAPON_QUALITY_HAS_RANK[key],
				rank: item.system?.damage?.weaponQuality[key].rank,
				key,
				label: CONFIG.FALLOUT.WEAPON_QUALITIES[key],
			});
		}

		context.weaponQualities = weaponQualities.sort(
			(a, b) => a.label.localeCompare(b.label)
		);

		const damageEffects = [];
		for (const key in CONFIG.FALLOUT.DAMAGE_EFFECTS) {
			damageEffects.push({
				active: item.system?.damage?.damageEffect[key].value ?? 0,
				hasRank: CONFIG.FALLOUT.DAMAGE_EFFECT_HAS_RANK[key],
				rank: item.system?.damage?.damageEffect[key].rank,
				key,
				label: CONFIG.FALLOUT.DAMAGE_EFFECTS[key],
			});
		}

		context.damageEffects = damageEffects.sort(
			(a, b) => a.label.localeCompare(b.label)
		);

		context.isOwnedByCreature = item.isOwnedByCreature;

		const allSkills = await fallout.compendiums.skills();
		context.availableSkills = {};

		let availableSkillNames = [];
		for (const skill of allSkills) {
			availableSkillNames.push(skill.name);
		}

		availableSkillNames = availableSkillNames.sort(
			(a, b) => a.localeCompare(b)
		);

		for (const skillName of availableSkillNames) {
			context.availableSkills[skillName] = skillName;
		}

		// Weapon Mods
		let modsByType = await this._getWeaponModsByType(item);


		context.modsByType = modsByType;
		context.modded = item.system.mods.modded;

		// End Weapon Mods
	}

	async getWeaponModData(context, item) {


		for (const [uuid, name] of Object.entries(CONFIG.FALLOUT.AMMO_BY_UUID)) {
			if (name === this.item.system.modEffects.ammo) {
				context.weaponAmmo = await fromUuid(uuid);
				break;
			}
		}
		context.ammoTypes = CONFIG.FALLOUT.AMMO_TYPES;

		context.damageTypes = [];
		for (const key in CONFIG.FALLOUT.DAMAGE_TYPES) {
			context.damageTypes.push({
				active: item.system?.modEffects?.damage?.damageType[key] ?? 0,
				key,
				label: CONFIG.FALLOUT.DAMAGE_TYPES[key],
			});
		}

		const weaponQualities = [];
		for (const key in CONFIG.FALLOUT.WEAPON_QUALITIES) {
			weaponQualities.push({
				active: item.system?.modEffects?.damage?.weaponQuality[key].value ?? 0,
				hasRank: CONFIG.FALLOUT.WEAPON_QUALITY_HAS_RANK[key],
				rank: item.system?.modEffects?.damage?.weaponQuality[key].rank,
				key,
				label: CONFIG.FALLOUT.WEAPON_QUALITIES[key],
			});
		}

		context.weaponQualities = weaponQualities.sort(
			(a, b) => a.label.localeCompare(b.label)
		);

		const damageEffects = [];
		for (const key in CONFIG.FALLOUT.DAMAGE_EFFECTS) {
			damageEffects.push({
				active: item.system?.modEffects?.damage?.damageEffect[key].value ?? 0,
				hasRank: CONFIG.FALLOUT.DAMAGE_EFFECT_HAS_RANK[key],
				rank: item.system?.modEffects?.damage?.damageEffect[key].rank,
				key,
				label: CONFIG.FALLOUT.DAMAGE_EFFECTS[key],
			});
		}

		context.damageEffects = damageEffects.sort(
			(a, b) => a.label.localeCompare(b.label)
		);

		const allSkills = await fallout.compendiums.skills();
		context.availableSkills = {};

		let availableSkillNames = [];
		for (const skill of allSkills) {
			availableSkillNames.push(skill.name);
		}

		availableSkillNames = availableSkillNames.sort(
			(a, b) => a.localeCompare(b)
		);

		for (const skillName of availableSkillNames) {
			context.availableSkills[skillName] = skillName;
		}
		context.overrideDamage = item.system.modEffects.damage.overrideDamage;

		context.modSummary = await this.getWeaponModSummary(item);


	}

	/* -------------------------------------------- */

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		html.find("[data-action='delete-choice']").click(
			async event => this._deleteChoiceItem(event)
		);

		// Send To Chat
		html.find(".chaty").click(ev => {
			this.item.sendToChat();
		});

		// Everything below here is only needed if the sheet is editable
		if (!this.isEditable) {
			return;
		}

		html.find(".quantity-roll").click(this._rollQuantity.bind(this));

		// Effects.
		html.find(".effect-control").click(ev => {
			if (this.item.isOwned) {
				return ui.notifications.warn("Managing Active Effects within an Owned Item is not currently supported and will be added in a subsequent update.");
			}
			onManageActiveEffect(ev, this.item);
		});

		// DON't LET NUMBER FIELDS EMPTY
		const numInputs = document.querySelectorAll("input[type=number]");
		numInputs.forEach(function(input) {
			input.addEventListener("change", function(e) {
				if (e.target.value === "") {
					e.target.value = 0;
				}
			});
		});

		html.find(".item-attach").click(async event => {
			event.preventDefault();

			const li = $(event.currentTarget).parents(".item");

			const itemId = li.data("itemId");
			const item = this.actor.items.get(itemId);

			const newFrameId = item.system.powerArmor.frameId === ""
				? this.item._id
				: "";

			await item.update({
				"system.equipped": this.item.system.equipped,
				"system.powerArmor.frameId": newFrameId,
				"system.powerArmor.powered": this.item.system.powerArmor.powered,
				"system.stashed": this.item.system.stashed,
			});

			const frames = this.actor.items.filter(i =>
				i.type === "apparel"
				&& i.system.apparelType === "powerArmor"
				&& i.system.powerArmor.isFrame
			);

			for (const frame of frames) {
				frame.sheet.render(false);
			}

			this.actor.sheet.render(false);
		});


		// * MODS
		html.find(".toggle-label").click(async ev => {
			if (!["weapon_mod", "weapon"].includes(this.item.type)) {
				return;
			}
			if (ev.target.className === "num-short-2") {
				return;
			}
			if (this.item.system.mods?.modded) {
				return;
			}

			const dataSets = ev.currentTarget.dataset;

			let active = parseInt(dataSets.active) ?? 0;
			const name = dataSets.name;
			const type = dataSets.type;

			if (name === undefined) {
				return;
			}

			active = active === 1 ? 0 : 1;

			let dataPath = "";
			if (this.item.type === "weapon_mod") {
				dataPath = type === "quality"
					? `system.modEffects.damage.weaponQuality.${name}.value`
					: `system.modEffects.damage.damageEffect.${name}.value`;
			}
			else {
				dataPath = type === "quality"
					? `system.damage.weaponQuality.${name}.value`
					: `system.damage.damageEffect.${name}.value`;
			}


			let dataUpdate = {};
			dataUpdate[dataPath] = active;

			await this.item.update(dataUpdate);
		});

		html.find(".toggle-label").contextmenu(async ev => {
			if (!this.item.type === "weapon_mod") {
				return;
			}
			if (ev.target.className === "num-short-2") {
				return;
			}

			const dataSets = ev.currentTarget.dataset;

			let active = parseInt(dataSets.active) ?? 0;
			const name = dataSets.name;
			const type = dataSets.type;

			active = active === -1 ? 0 : -1;

			let dataPath = type === "quality"
				? `system.modEffects.damage.weaponQuality.${name}.value`
				: `system.modEffects.damage.damageEffect.${name}.value`;


			let dataUpdate = {};
			dataUpdate[dataPath] = active;

			await this.item.update(dataUpdate);
		});

		// Install weapon mod
		html.find(".toggle-weapon-mod").click(async event => this._onToggleWeaponMod(event));

		// Install weapon mod
		html.find(".toggle-apparel-mod").click(async event => this._onToggleApparelMod(event));

		// Delete mod
		html.find(".item-delete").click(async ev => {
			ev.preventDefault();
			let li;
			if (this.item.type === "weapon") {
				li = $(ev.currentTarget).parents(".weapon_mod");
			}
			else if (this.item.type === "apparel") {
				li = $(ev.currentTarget).parents(".apparel_mod");
			}
			else {
				return;
			}

			li.slideUp(200, () => this.render(false));

			const updateData = {};

			let mod = this.item.system.mods[li.data("itemId")];
			updateData[`system.mods.-=${mod._id}`] = null;

			await this.item.update(updateData);
		});
		// * END MODS

	}

	async _getApparelModsByType(item) {

		// Apparel Mods
		let modsByType = {};

		for (let mod in item.system.mods) {
			if (item.system.mods[mod]?.system?.modType in CONFIG.FALLOUT.APPAREL_MOD_TYPES) {
				if (!(item.system.mods[mod].system?.modType in modsByType)) {
					modsByType[item.system.mods[mod].system?.modType] = [];
					modsByType[item.system.mods[mod].system?.modType].installed = false;
				}
				item.system.mods[mod].system.summary =
					await this.getApparelModSummary(item.system.mods[mod]);
				modsByType[item.system.mods[mod].system?.modType].push(item.system.mods[mod]);

				if (item.system.mods[mod].system.attached) {
					modsByType[item.system.mods[mod].system?.modType].installed = true;
				}
			}
		}

		for (let key in modsByType) {
			modsByType[key] = modsByType[key].sort(
				(a, b) => a.name.localeCompare(b.name)
			);
		}

		let sortedModsByType = {};

		for (const key in CONFIG.FALLOUT.APPAREL_MOD_TYPES) {
			if (modsByType.hasOwnProperty(key)) {
				sortedModsByType[key] = modsByType[key];
			}
		}

		return sortedModsByType;
	}

	async _getWeaponModsByType(item) {

		// Weapon Mods
		let modsByType = {};

		for (let mod in item.system.mods) {
			if (item.system.mods[mod]?.system?.modType in CONFIG.FALLOUT.WEAPON_MOD_TYPES) {
				if (!(item.system.mods[mod].system?.modType in modsByType)) {
					modsByType[item.system.mods[mod].system?.modType] = [];
					modsByType[item.system.mods[mod].system?.modType].installed = false;
				}
				item.system.mods[mod].system.modEffects.summary =
					await this.getWeaponModSummary(item.system.mods[mod]);
				modsByType[item.system.mods[mod].system?.modType].push(item.system.mods[mod]);

				if (item.system.mods[mod].system.attached) {
					modsByType[item.system.mods[mod].system?.modType].installed = true;
				}
			}
		}


		for (let key in modsByType) {
			modsByType[key] = modsByType[key].sort(
				(a, b) => a.name.localeCompare(b.name)
			);
		}

		let sortedModsByType = {};

		for (const key in CONFIG.FALLOUT.WEAPON_MOD_TYPES) {
			if (modsByType.hasOwnProperty(key)) {
				sortedModsByType[key] = modsByType[key];
			}
		}

		return sortedModsByType;
	}

	async _onToggleApparelMod(event) {
		event.preventDefault();
		let li = $(event.currentTarget).parents(".apparel_mod");
		let mod = this.item.system.mods[li.data("itemId")];
		const updateData = {};

		const installed = !mod.system.attached;

		// Check if this type is already installed.
		let modsByType = await this._getApparelModsByType(this.item);
		if (modsByType[mod.system.modType].installed && installed) {
			ui.notifications.warn("Only one mod per type allowed to be installed.");
			return;
		}

		updateData[`system.mods.${mod._id}.system.attached`] = installed;

		// Keep track of the name of installed mods for the chat output.
		if (installed) {
			// Add mod.system.name if it's not already in the list
			updateData["system.mods.installedMods"] = this.item.system.mods.installedMods
				? `${this.item.system.mods.installedMods}, ${mod.name}`.split(", ")
					.filter((item, index, arr) => arr.indexOf(item) === index)
					.join(", ")
				: mod.name;
		}
		else {
			// Remove mod.system.name if it exists
			updateData["system.mods.installedMods"] = this.item.system.mods.installedMods
				.split(", ")
				.filter(item => item.trim() !== mod.name)
				.join(", ");
		}

		// Health
		if (mod.system.health.value !== 0) {
			if (installed) {
				updateData["system.health.value"] = this.item.system.health.value + mod.system.health.value;
				updateData["system.health.max"] = this.item.system.health.max + mod.system.health.value;
			}
			else {
				updateData["system.health.value"] = this.item.system.health.value - mod.system.health.value;
				updateData["system.health.max"] = this.item.system.health.max - mod.system.health.value;
			}
		}

		// Resistances
		if (mod.system.resistance.energy !== 0) {
			if (installed) {
				updateData["system.resistance.energy"] = this.item.system.resistance.energy + mod.system.resistance.energy;
			}
			else {
				updateData["system.resistance.energy"] = this.item.system.resistance.energy - mod.system.resistance.energy;
			}
		}

		if (mod.system.resistance.physical !== 0) {
			if (installed) {
				updateData["system.resistance.physical"] = this.item.system.resistance.physical + mod.system.resistance.physical;
			}
			else {
				updateData["system.resistance.physical"] = this.item.system.resistance.physical - mod.system.resistance.physical;
			}
		}

		if (mod.system.resistance.radiation !== 0) {
			if (installed) {
				updateData["system.resistance.radiation"] = this.item.system.resistance.radiation + mod.system.resistance.radiation;
			}
			else {
				updateData["system.resistance.radiation"] = this.item.system.resistance.radiation - mod.system.resistance.radiation;
			}
		}

		// Shadowed
		if (mod.system.shadowed) {
			if (installed) {
				updateData["system.shadowed"] = true;
			}
			else {
				updateData["system.shadowed"] = false;
			}
		}

		// Cost
		if (mod.system.cost > 0) {
			if (installed) {
				updateData["system.cost"] = this.item.system.cost + mod.system.cost;
			}
			else {
				updateData["system.cost"] = this.item.system.cost - mod.system.cost;
			}
		}

		// Weight
		if (mod.system.weight > 0) {
			if (installed) {
				updateData["system.weight"] = this.item.system.weight + mod.system.weight;
			}
			else {
				updateData["system.weight"] = this.item.system.weight - mod.system.weight;
			}
		}

		// Lock if mod is attached.
		if (installed) {
			updateData["system.mods.modded"] = true;
		}
		else {
			// Unlock if all mods removed.
			updateData["system.mods.modded"] = false;
			for (const key in this.item.system.mods) {
				if (this.item.system.mods[key].system?.attached && mod._id !== key) {
					updateData["system.mods.modded"] = true;
					break;
				}
			}
		}

		await this.item.update(updateData);
	}

	async _onToggleWeaponMod(event) {
		event.preventDefault();
		let li = $(event.currentTarget).parents(".weapon_mod");
		let mod = this.item.system.mods[li.data("itemId")];
		const updateData = {};

		const installed = !mod.system.attached;

		// Check if this type is already installed.
		let modsByType = await this._getWeaponModsByType(this.item);
		if (modsByType[mod.system.modType].installed && installed) {
			ui.notifications.warn("Only one mod per type allowed to be installed.");
			return;
		}

		updateData[`system.mods.${mod._id}.system.attached`] = installed;

		// Keep track of the name of installed mods for the chat output.
		if (installed) {
			// Add mod.system.name if it's not already in the list
			updateData["system.mods.installedMods"] = this.item.system.mods.installedMods
				? `${this.item.system.mods.installedMods}, ${mod.name}`.split(", ")
					.filter((item, index, arr) => arr.indexOf(item) === index)
					.join(", ")
				: mod.name;
		}
		else {
			// Remove mod.system.name if it exists
			updateData["system.mods.installedMods"] = this.item.system.mods.installedMods
				.split(", ")
				.filter(item => item.trim() !== mod.name)
				.join(", ");
		}


		// weapon damage
		if (mod.system.modEffects.damage.rating !== 0) {
			if (installed) {
				updateData["system.damage.originalRating"] = this.item.system.damage.rating;
				if (mod.system.modEffects.damage.overrideDamage === "modify") {
					updateData["system.damage.rating"] = this.item.system.damage.rating + mod.system.modEffects.damage.rating;
				}
				else {
					updateData["system.damage.rating"] = mod.system.modEffects.damage.rating;
				}
			}
			else {
				updateData["system.damage.rating"] = this.item.system.damage.originalRating;
			}
		}

		// ammo type
		if (mod.system.modEffects.ammo !== "") {
			updateData["system.ammo"] = mod.system.modEffects.ammo;
		}

		// ammo per shot
		if (mod.system.modEffects.ammoPerShot !== 0) {
			if (installed) {
				updateData["system.originalAmmoPerShot"] = this.item.system.ammoPerShot;
				updateData["system.ammoPerShot"] = mod.system.modEffects.ammoPerShot;
			}
			else {
				updateData["system.ammoPerShot"] = this.item.system.originalAmmoPerShot;
			}
		}

		// fire rate
		if (mod.system.modEffects.fireRate !== 0) {
			if (installed) {
				updateData["system.fireRate"] = this.item.system.fireRate + mod.system.modEffects.fireRate;
			}
			else {
				updateData["system.fireRate"] = this.item.system.fireRate - mod.system.modEffects.fireRate;
			}
		}

		// weapon range
		if (mod.system.modEffects.range !== 0) {
			if (installed) {
				updateData["system.range"] = this._updateRange(this.item.system.range, mod.system.modEffects.range);
			}
			else {
				updateData["system.range"] = this._updateRange(this.item.system.range, -mod.system.modEffects.range);
			}
		}


		// Damage type
		const modDamageType = mod.system?.modEffects?.damage?.damageType ?? {};

		if (modDamageType.energy
			|| modDamageType.physical
			|| modDamageType.poison
			|| modDamageType.radiation
		) {
			if (installed) {
				updateData["system.damage.originalDamageType"] = this.item.system.damage.damageType;
				updateData["system.damage.damageType"] = modDamageType;
			}
			else {
				updateData["system.damage.damageType"] = this.item.system.damage.originalDamageType;
			}
		}

		// Damage Effects
		for (const key in mod.system.modEffects.damage.damageEffect) {
			const modDamageEffect = mod.system.modEffects.damage.damageEffect[key];
			const weaponDamageEffect = this.item.system.damage.damageEffect[key];

			// Only run if enabling or disabling a damage effect.
			// (value = 1 for enable. value = -1 for disable)
			if (modDamageEffect.value !== 0) {
				if (installed) {
					const newValue = weaponDamageEffect.value + modDamageEffect.value;
					updateData[`system.damage.damageEffect.${key}.value`] = newValue;
					if (newValue === 1) {
						updateData[`system.damage.damageEffect.${key}.rank`] = modDamageEffect.rank;
					}
					else {
						updateData[`system.damage.damageEffect.${key}.rank`] = weaponDamageEffect.rank + modDamageEffect.rank;
					}
				}
				else {
					const newValue = weaponDamageEffect.value - modDamageEffect.value;
					updateData[`system.damage.damageEffect.${key}.value`] = newValue;
					if (newValue === 0) {
						updateData[`system.damage.damageEffect.${key}.rank`] = 1;
					}
					else {
						updateData[`system.damage.damageEffect.${key}.rank`] = weaponDamageEffect.rank - modDamageEffect.rank;
					}
				}
			}
		}


		// Weapon Qualities
		for (const key in mod.system.modEffects.damage.weaponQuality) {
			const modWeaponQualities = mod.system.modEffects.damage.weaponQuality[key];
			const weaponWeaponQualities = this.item.system.damage.weaponQuality[key];

			// Only run if enabling or disabling a weapon quality.
			// (value = 1 for enable. value = -1 for disable)
			if (modWeaponQualities.value !== 0) {
				if (installed) {
					const newValue = weaponWeaponQualities.value + modWeaponQualities.value;
					updateData[`system.damage.weaponQuality.${key}.value`] = newValue;
					if (newValue === 1) {
						updateData[`system.damage.weaponQuality.${key}.rank`] = modWeaponQualities.rank;
					}
					else {
						updateData[`system.damage.weaponQuality.${key}.rank`] = weaponWeaponQualities.rank + modWeaponQualities.rank;
					}
				}
				else {
					const newValue = weaponWeaponQualities.value - modWeaponQualities.value;
					updateData[`system.damage.weaponQuality.${key}.value`] = newValue;
					if (newValue === 0) {
						updateData[`system.damage.weaponQuality.${key}.rank`] = 1;
					}
					else {
						updateData[`system.damage.weaponQuality.${key}.rank`] = weaponWeaponQualities.rank - modWeaponQualities.rank;
					}
				}
			}
		}

		// cost
		if (mod.system.cost !== 0) {
			if (installed) {
				updateData["system.cost"] = this.item.system.cost + mod.system.cost;
			}
			else {
				updateData["system.cost"] = this.item.system.cost - mod.system.cost;
			}
		}

		// weight
		if (mod.system.weight !== 0) {
			if (installed) {
				updateData["system.weight"] = this.item.system.weight + mod.system.weight;
			}
			else {
				updateData["system.weight"] = this.item.system.weight - mod.system.weight;
			}
		}

		// Weapon name prefix
		if (mod.system.namePrefix !== "") {
			if (installed) {
				updateData.name = `${mod.system.namePrefix} ${this.item.name}`;
			}
			else {
				updateData.name = this.item.name.replace(`${mod.system.namePrefix} `, "");
			}
		}

		// Lock if mod is attached.
		if (installed) {
			updateData["system.mods.modded"] = true;
		}
		else {
			// Unlock if all mods removed.
			updateData["system.mods.modded"] = false;
			for (const key in this.item.system.mods) {
				if (this.item.system.mods[key].system?.attached && mod._id !== key) {
					updateData["system.mods.modded"] = true;
					break;
				}
			}
		}

		await this.item.update(updateData);
	}

	_updateRange(currentRange, step) {
		const keys = Object.keys(CONFIG.FALLOUT.RANGES);
		let currentIndex = keys.indexOf(currentRange);

		// Compute the new index, clamping to bounds
		let newIndex = Math.min(Math.max(currentIndex + step, 0), keys.length - 1);

		return keys[newIndex];
	}

	async getApparelModSummary(mod) {
		let modSummary = [];

		// Health
		if (mod.system.health.value !== 0) {
			modSummary.push(`${game.i18n.localize("FALLOUT.HEALTH.health")} ${mod.system.health.value > 0 ? "+" : ""}${mod.system.health.value}`);
		}

		// Resistances
		let resistances = [];
		if (mod.system.resistance.energy !== 0) {
			resistances.push(`${game.i18n.localize("FALLOUT.RESISTANCE.energy")} ${mod.system.resistance.energy > 0 ? "+" : ""}${mod.system.resistance.energy}`);
		}

		if (mod.system.resistance.physical !== 0) {
			resistances.push(`${game.i18n.localize("FALLOUT.RESISTANCE.physical")} ${mod.system.resistance.physical > 0 ? "+" : ""}${mod.system.resistance.physical}`);
		}

		if (mod.system.resistance.radiation !== 0) {
			resistances.push(`${game.i18n.localize("FALLOUT.RESISTANCE.radiation")} ${mod.system.resistance.radiation > 0 ? "+" : ""}${mod.system.resistance.radiation}`);
		}

		if (resistances.length > 1) {
			modSummary.push(`${resistances.join(", ")}`);
		}
		else if (resistances.length === 1) {
			modSummary.push(`${resistances}`);
		}

		// Shadowed
		if (mod.system.shadowed) {
			modSummary.push(game.i18n.localize("FALLOUT.APPAREL_MOD.shadowed"));
		}

		// Extra Effects
		if (mod.system.effect !== "") {
			modSummary.push(mod.system.effect);
		}

		if (modSummary.length > 1) {
			return await foundry.applications.ux.TextEditor.enrichHTML(modSummary.join(", "), {
				async: true,
			});
		}

		else {
			return await foundry.applications.ux.TextEditor.enrichHTML(modSummary, {
				async: true,
			});
		}
	}

	async getWeaponModSummary(mod) {
		let modSummary = [];
		let modEffects = mod.system.modEffects;

		if (modEffects.damage.rating !== 0) {

			if (modEffects.damage.overrideDamage === "modify") {
				modSummary.push(`${modEffects.damage.rating > 0 ? "+" : ""}${modEffects.damage.rating} CD ${game.i18n.localize("FALLOUT.UI.Damage")}`);
			}
			else {
				modSummary.push(game.i18n.format("FALLOUT.WEAPON_MOD.summary.damageRatingOverride", { rating: modEffects.damage.rating }));
			}
		}

		if (modEffects.ammo !== "") {
			modSummary.push(game.i18n.format("FALLOUT.WEAPON_MOD.summary.ammo", { ammo: modEffects.ammo }));
		}

		if (modEffects.ammoPerShot !== 0) {
			modSummary.push(game.i18n.format("FALLOUT.WEAPON_MOD.summary.ammoPerShot", { ammoPerShot: modEffects.ammoPerShot }));
		}

		if (modEffects.fireRate !== 0) {
			modSummary.push(`${modEffects.fireRate > 0 ? "+" : ""}${modEffects.fireRate} ${game.i18n.localize("FALLOUT.WEAPON_MOD.summary.fireRate")}`);
		}

		if (modEffects.range > 0) {
			modSummary.push(game.i18n.format("FALLOUT.WEAPON_MOD.summary.rangeIncrease", { range: modEffects.range }));
		}
		else if (modEffects.range < 0) {
			modSummary.push(game.i18n.format("FALLOUT.WEAPON_MOD.summary.rangeDecrease", { range: modEffects.range }));
		}

		// Damage type
		if (modEffects.damage.damageType.energy
			|| modEffects.damage.damageType.physical
			|| modEffects.damage.damageType.poison
			|| modEffects.damage.damageType.radiation
		) {
			let damageTypes = [];
			if (modEffects.damage.damageType.energy) {
				damageTypes.push("Energy");
			}
			if (modEffects.damage.damageType.physical) {
				damageTypes.push("Physical");
			}
			if (modEffects.damage.damageType.poison) {
				damageTypes.push("Poison");
			}
			if (modEffects.damage.damageType.radiation) {
				damageTypes.push("Radiation");
			}

			modSummary.push(game.i18n.format("FALLOUT.WEAPON_MOD.summary.damageType", { damageType: damageTypes.join(", ") }));
		}

		// Damage Effects
		let damageEffects = [];
		for (const key in modEffects.damage.damageEffect) {
			const tmpDamageEffect = modEffects.damage.damageEffect[key];
			if (tmpDamageEffect.value === 1) {
				damageEffects.push(`${game.i18n.localize("FALLOUT.WEAPON_MOD.summary.gain")} ${game.i18n.localize(CONFIG.FALLOUT.DAMAGE_EFFECTS[key])}${tmpDamageEffect.rank > 0 ? ` ${tmpDamageEffect.rank}` : ""}`);
			}
			else if (tmpDamageEffect.value === -1) {
				damageEffects.push(`${game.i18n.localize("FALLOUT.WEAPON_MOD.summary.remove")} ${game.i18n.localize(CONFIG.FALLOUT.DAMAGE_EFFECTS[key])}`);
			}
		}
		if (damageEffects.length > 0) {
			modSummary.push(`${damageEffects.join(", ")}`);
		}


		// Weapon Qualities
		let weaponQuality = [];
		for (const key in modEffects.damage.weaponQuality) {
			const tmpWeaponQualities = modEffects.damage.weaponQuality[key];
			if (tmpWeaponQualities.value === 1) {
				weaponQuality.push(`${game.i18n.localize("FALLOUT.WEAPON_MOD.summary.gain")} ${game.i18n.localize(CONFIG.FALLOUT.WEAPON_QUALITIES[key])}${tmpWeaponQualities.rank > 0 ? ` Rank ${tmpWeaponQualities.rank} ` : ""}`);
			}
			else if (tmpWeaponQualities.value === -1) {
				weaponQuality.push(`${game.i18n.localize("FALLOUT.WEAPON_MOD.summary.remove")} ${game.i18n.localize(CONFIG.FALLOUT.WEAPON_QUALITIES[key])}`);
			}
		}
		if (weaponQuality.length > 0) {
			modSummary.push(`${weaponQuality.join(", ")}`);
		}

		// Extra Effects
		if (modEffects.effect !== "") {
			modSummary.push(modEffects.effect);
		}

		if (modSummary.length > 1) {
			return await foundry.applications.ux.TextEditor.enrichHTML(modSummary.join(", "), {
				async: true,
			});
		}

		else {
			return await foundry.applications.ux.TextEditor.enrichHTML(modSummary, {
				async: true,
			});
		}
	}

	async _deleteChoiceItem(event) {
		event.preventDefault();
		event.stopPropagation();

		const deleteUuid = event.currentTarget.dataset.uuid;
		const choicesKey = event.currentTarget.dataset.choicesKey;

		let currentChoices = choicesKey
			.split(".")
			.reduce((obj, path) => obj ? obj[path] : [], this.item.system);

		const newChoices = [];
		for (const itemUuid of currentChoices) {
			if (itemUuid === deleteUuid) {
				continue;
			}
			newChoices.push(itemUuid);
		}

		const updateData = {};
		updateData[`system.${choicesKey}`] = newChoices;

		await this.item.update(updateData);

		return this.render(true);
	}

	async _onChangeChoiceList(event, choicesKey, isItem) {
		const options = event.target.list.options;
		const value = event.target.value;

		let uuid = null;
		for (const option of options) {
			if (option.value === value) {
				uuid = option.getAttribute("data-uuid");
				break;
			}
		}

		if (uuid === null) {
			return;
		}

		// handles cases where choicesKey is nested property.
		let currentChoices = choicesKey
			.split(".")
			.reduce((obj, path) => obj ? obj[path] : [], this.item.system);

		if (currentChoices.includes(uuid)) {
			return;
		} // No duplicates

		currentChoices.push(uuid);

		const choiceItems = [];
		for (const itemUuid of currentChoices) {
			if (isItem) {
				choiceItems.push(await fromUuid(itemUuid));
			}
			else {
				choiceItems.push(itemUuid);
			}
		}

		if (isItem) {
			choiceItems.sort((a, b) => a.name.localeCompare(b.name));
		}
		else {
			choiceItems.sort((a, b) => a.localeCompare(b));
		}

		const sortedChoiceUuids = isItem
			? choiceItems.map(item => item.uuid)
			: choiceItems;

		return this.item.update({ [event.target.name]: sortedChoiceUuids });
	}

	async _onChangeInput(event) {
		const choicesKey = $(event.currentTarget).data("choices-key");
		const isItem = $(event.currentTarget).data("is-item") === "true";
		if (event.target.list && choicesKey) {
			return await this._onChangeChoiceList(event, choicesKey, isItem);
		}

		await super._onChangeInput(event);
	}

	async _onSubmit(event) {
		if (!this.isEditable) {
			return;
		}

		switch (this.item.type) {
			case "ammo": {
				const updateData = this._getSubmitData();

				if (this.item.system.fusionCore) {
					const sourceCharges = this.item.system.charges;

					updateData["system.shots.max"] =
						updateData["system.charges.max"] * 50;

					const diff = updateData["system.charges.current"] - sourceCharges.current;

					if (diff !== 0) {
						updateData["system.shots.current"] += diff * 50;
					}

					updateData["system.charges.current"] = Math.ceil(
						updateData["system.shots.current"] / 50
					);

					updateData["system.shots.current"] = Math.min(
						updateData["system.shots.current"],
						updateData["system.charges.current"] * 50,
						updateData["system.charges.max"] * 50
					);
				}
				else {
					if (!updateData["system.shots.max"]) {
						updateData["system.shots.max"] = 1;
					}
					if (!updateData["system.shots.current"]) {
						updateData["system.shots.current"] = 1;
					}
				}

				this.item.update(updateData);

				break;
			}
			case "origin": {
				const updateData = this._getSubmitData();

				delete updateData["system.traits.fixed"];
				delete updateData["system.traits.selectOptions"];
				delete updateData["system.traits"];

				this.item.update(updateData);

				break;
			}
			case "perk": {
				const updateData = this._getSubmitData();

				delete updateData["system.requirementsEx.magazineUuids"];

				this.item.update(updateData);
				break;
			}
			case "weapon": {
				const updateData = this._getSubmitData();

				const weaponType = updateData["system.weaponType"];
				if (weaponType !== this.item.system.weaponType) {
					updateData["system.creatureAttribute"] =
						CONFIG.FALLOUT.DEFAULT_CREATURE_WEAPON_ATTRIBUTE[
							weaponType
						];
					updateData["system.creatureSkill"] =
						CONFIG.FALLOUT.DEFAULT_CREATURE_WEAPON_SKILL[
							weaponType
						];
				}

				this.item.update(updateData);
				break;
			}
			default:
				super._onSubmit(event);
		}
	}

	async _rollQuantity(event) {
		if (!["ammo", "consumable", "miscellany", "weapon"].includes(this.item.type)) {
			return;
		}

		event.preventDefault();

		if (this.item.system.quantityRoll === "") {
			return ui.notifications.warn(`No roll formula set on item ${this.item.name}`);
		}


		const content = await foundry.applications.handlebars.renderTemplate(
			"systems/fallout/templates/dialogs/roll-quantity.hbs"
		);

		const dialogData = {
			title: game.i18n.localize("FALLOUT.dialog.roll_quantity.title"),
			content,
			buttons: {
				create: {
					label: game.i18n.localize("FALLOUT.dialog.roll_quantity.button.create"),
					callback: () => "create",
				},
				update: {
					label: game.i18n.localize("FALLOUT.dialog.roll_quantity.button.update"),
					callback: () => "update",
				},
				chat: {
					label: game.i18n.localize("FALLOUT.dialog.roll_quantity.button.chat"),
					callback: () => "chat",
				},
			},
			close: () => null,
			default: "update",
		};

		const mode = await Dialog.wait(dialogData);

		if (mode) {
			await this.item.rollQuantity(mode);
		}
	}

}

class FalloutPcSheet extends FalloutBaseActorSheet {

	chemDoseManager;

	/** @override */
	get ignoredInventoryItems() {
		if (this.actor.isRobot) {
			return ["robot_armor"];
		}
		else {
			return ["apparel"];
		}
	}

	/** @override */
	get inventorySections() {
		return [
			"addiction",
			"ammo",
			"apparel_mod",
			"books_and_magz",
			"consumable",
			"disease",
			"miscellany",
			"perk",
			"robot_mod",
			"skill",
			"trait",
			"weapon_mod",
			"weapon",
		];
	}

	/** @override */
	get template() {
		return "systems/fallout/templates/actor/pc-sheet.hbs";
	}

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		html.find("[data-action='levelUp']").click(
			async event => this._openlevelUpTool(event)
		);

		html.find(".availability-roll").click(async event => {
			event.preventDefault();
			this.actor.rollAvailabilityCheck();
		});

		html.find(".power-armor-monitor-health-value").change(event => {
			event.preventDefault();

			const apparelId = $(event.currentTarget).data("itemId");
			const newHealthValue = $(event.currentTarget).val();

			let apparel = this.actor.items.get(apparelId);

			if (apparel && apparel.system.apparelType === "powerArmor") {
				apparel.update({ "system.health.value": newHealthValue });
			}
		});

		html.find(".manage-session-doses").click(event => {
			event.preventDefault();
			this.chemDoseManager.render(true);
		});

		// * Toggle Power on Power Armor Item
		html.find(".salvage-junk").click(async event => {
			event.preventDefault();

			if (this.actor.system.materials.junk > 0) {
				return new fallout.apps.SalvageJunk(this.actor).render(true);
			}
			else {
				return ui.notifications.warn(
					game.i18n.localize("FALLOUT.APP.SalvageJunk.error.noJunkToSalvage"),
					{permanent: false}
				);
			}
		});

		html.find(".item-powered").click(async event => {
			event.preventDefault();
			const li = $(event.currentTarget).parents(".item");

			const attachedToId = li.data("item-attached") ?? "";

			const itemId = li.data("item-id") ?? "";
			const item = this.actor.items.get(itemId);

			const newValue = !item.system.powerArmor.powered;

			const isFrame = item.system.powerArmor.isFrame;
			if (attachedToId !== "" || isFrame) {
				const myFrameId = isFrame ? itemId : attachedToId;

				const updateData = [{
					"_id": myFrameId,
					"system.powerArmor.powered": newValue,
				}];

				const attachments = this.actor.items.filter(
					i => i.type === "apparel"
						&& i.system.powerArmor.frameId === myFrameId
				).map(i => i._id);

				for (const attachmentId of attachments) {
					updateData.push({
						"_id": attachmentId,
						"system.powerArmor.powered": newValue,
					});
				}

				await Item.updateDocuments(updateData, {parent: this.actor});

				if (item.type === "apparel") {
					this.actor._calculateCharacterBodyResistance();
				}
			}
			else {
				item.update({
					"system.powerArmor.powered": newValue,
				});
			}
		});

		// * Toggle Equip Inventory Item
		html.find(".item-toggle").click(async event => {
			event.preventDefault();

			const li = $(event.currentTarget).parents(".item");

			const attachedToId = li.data("item-attached") ?? "";

			const itemId = li.data("item-id") ?? "";
			const item = this.actor.items.get(itemId);

			const newValue = !item.system.equipped;

			const isFrame = item.system.powerArmor?.isFrame ?? false;

			if (attachedToId !== "" || isFrame) {
				const myFrameId = isFrame ? itemId : attachedToId;

				const updateData = [{
					"_id": myFrameId,
					"system.equipped": newValue,
					"system.stashed": newValue ? false : item.system.stashed,
				}];

				const attachments = this.actor.items.filter(
					i => i.type === "apparel"
						&& i.system.powerArmor.frameId === myFrameId
				).map(i => i._id);

				for (const attachmentId of attachments) {
					updateData.push({
						"_id": attachmentId,
						"system.equipped": newValue,
						"system.stashed": newValue ? false : item.system.stashed,
					});
				}

				await Item.updateDocuments(updateData, {parent: this.actor});

				if (item.type === "apparel") {
					this.actor._calculateCharacterBodyResistance();
				}
			}
			else {
				item.update({
					"system.equipped": newValue,
					"system.stashed": newValue ? false : item.system.stashed,
				});
			}
		});

		// * INJURIES
		html.find(".injury-mark").click(async ev => {
			let status = parseInt(ev.currentTarget.dataset.status);
			// if (status === 2)
			// return;
			let index = ev.currentTarget.dataset.index;
			let bodypart = ev.currentTarget.dataset.bodypart;
			let injuries = this.actor.system.body_parts[bodypart].injuries;
			let newInjuries = [...injuries];
			newInjuries[index] = status === 2 ? 0 : 2;
			// newInjuries[index] = 2;
			let newStatus = this._getBodyPartStatus(newInjuries);
			let _update = {};
			let _dataInjuries = `system.body_parts.${bodypart}.injuries`;
			let _dataStatus = `system.body_parts.${bodypart}.status`;
			_update[_dataInjuries] = newInjuries;
			_update[_dataStatus] = newStatus;
			await this.actor.update(_update);
		});

		//
		html.find(".item-consume").click(async ev => {
			const li = $(ev.currentTarget).parents(".item");
			const item = this.actor.items.get(li.data("itemId"));

			const allUsed = await this.actor.consumeItem(item);

			if (allUsed) {
				li.slideUp(200, () => this.render(false));
			}
		});

		html.find("[data-action='readMagazine']").click(async ev => {
			const li = $(ev.currentTarget).parents(".item");
			const item = this.actor.items.get(li.data("itemId"));

			const allUsed = await this.actor.readMagazine(item);

			if (allUsed) {
				li.slideUp(200, () => this.render(false));
			}
		});

		html.find(".injury-mark").contextmenu(async ev => {
			let status = parseInt(ev.currentTarget.dataset.status);
			// if (status === 0)
			// return;
			let index = ev.currentTarget.dataset.index;
			let bodypart = ev.currentTarget.dataset.bodypart;
			let injuries = this.actor.system.body_parts[bodypart].injuries;
			let newInjuries = [...injuries];
			newInjuries[index] = status === 1 ? 0 : 1;
			let newStatus = this._getBodyPartStatus(newInjuries);
			let _dataInjuries = `system.body_parts.${bodypart}.injuries`;
			let _dataStatus = `system.body_parts.${bodypart}.status`;
			let _update = {};
			_update[_dataInjuries] = newInjuries;
			_update[_dataStatus] = newStatus;
			await this.actor.update(_update);
		});
		// * END INJURIES


		// * END SKILLS
	}


	async getData(options) {
		const context = await super.getData(options);

		await this._prepareCharacterData(context);
		// await this._prepareMaterials(context);
		await this._prepareRobotModDescriptions(context);

		context.disableAutoXpTarget = game.settings.get(
			SYSTEM_ID, "disableAutoXpTarget"
		);

		context.disableAutoDerivedStats = game.settings.get(
			SYSTEM_ID, "disableAutoDerivedStats"
		);

		this._updateChemDoseManager();

		// ADD FAVOURITE ITEMS
		context.favoriteWeapons = context.itemsByType.weapon.filter(
			i => i.system.favorite
		);

		return context;
	}


	_getBodyPartStatus(injuries) {
		let maxStatus = Math.max(...injuries);
		let newStatus = "healthy";
		if (maxStatus === 1) {
			newStatus = "wounded";
		}
		else if (maxStatus === 2) {
			newStatus = "crippled";
		}
		return newStatus;
	}


	async _openlevelUpTool(event) {
		return new fallout.apps.FalloutLevelUp(this.actor).render(true);
	}

	/**
	 * Organize and classify Items for Character sheets.
	 *
	 * @param {Object} actorData The actor to prepare.
	 * @return {undefined}
	 */
	async _prepareCharacterData(context) {
		let allInjuries = [];

		for (const [, bp] of Object.entries(this.actor.system.body_parts)) {
			allInjuries.push(...bp.injuries);
		}

		context.treatedInjuriesCount = allInjuries.filter(i => i === 1).length;
		context.openInjuriesCount = allInjuries.filter(i => i === 2).length;

		context.levelUp = CONFIG.FALLOUT.LEVEL_UP_TOOL_ENABLED
			&& this.actor.system.level.currentXP
				>= this.actor.system.level.nextLevelXP;
	}


	async _prepareRobotModDescriptions(context) {
		if (this.actor.isNotRobot) {
			return;
		}

		context.itemsEnrichedDescriptions = {};

		for (let item of context.itemsByType.robot_mod ?? []) {
			const descriptionRich = await foundry.applications.ux.TextEditor.enrichHTML(
				item.system.effect, {async: true}
			);

			context.itemsEnrichedDescriptions[item._id] = descriptionRich;
		}
	}


	_getFilteredApparelSections(context) {
		context.allApparel = [];

		const __filteredApparel = function(type, subType) {
			const list = context.items.filter(
				i => i.type === type
			).filter(
				i => i.system.apparelType === subType
			);

			return {
				apparelType: subType,
				list,
			};
		};

		let apparelSubTypes;
		if (this.actor.isRobot) {
			apparelSubTypes = ["armor", "plating"];
		}
		else {
			apparelSubTypes = [
				"armor",
				"clothing",
				"headgear",
				"outfit",
				"powerArmor",
			];
		}

		for (const subType of apparelSubTypes) {
			context.allApparel.push(
				__filteredApparel(
					this.actor.isRobot ? "robot_armor" : "apparel",
					subType
				)
			);
		}

		if (this.actor.isNotRobot) {
			this._preparePowerArmor(context);
		}
	}

	_onSubmit(event) {
		if (!this.isEditable) {
			return;
		}
		if (this.actor.type !== "character") {
			return super._onSubmit(event);
		}

		const updateData = this._getSubmitData();

		// Update the lastChanged timestamp any changed conditions
		//
		const currentTime = game.time.worldTime;
		for (const condition of ["hunger", "thirst", "sleep"]) {
			const currentValue = this.actor.system.conditions[condition];
			const newValue = updateData[`system.conditions.${condition}`];

			if (newValue !== currentValue) {
				updateData[`system.conditions.lastChanged.${condition}`] = currentTime;
			}
		}

		this.actor.update(updateData);
	}

	// Goes through all power armor in an inventory and if necessary groups them
	// by frame so they can be displayed together easily
	//
	_preparePowerArmor(context) {
		context.powerArmor = {
			frames: [],
			framePieces: {},
			pieces: [],
		};

		const allPowerArmor = context.allApparel.find(
			group => group.apparelType === "powerArmor"
		).list;

		context.powerArmor.frames = allPowerArmor.filter(
			i => i.system.powerArmor.isFrame
		);

		let newPowerArmorList = [];

		for (const frame of context.powerArmor.frames) {
			newPowerArmorList.push(
				frame,
				...allPowerArmor.filter(
					i => i.system.powerArmor.frameId === frame._id
				)
			);
		}

		newPowerArmorList = [
			...newPowerArmorList,
			...allPowerArmor.filter(
				i => i.system.powerArmor.frameId === ""
					&& !i.system.powerArmor.isFrame
			),
		];

		context.allApparel.find(
			group => group.apparelType === "powerArmor"
		).list = newPowerArmorList;
	}


	async _updateChemDoseManager() {
		if (this.actor.isRobot) {
			return;
		}

		if (!this.chemDoseManager) {
			this.chemDoseManager = new fallout.apps.FalloutChemDoses(this.actor);
		}

		this.chemDoseManager.render(false);
	}

}

class FalloutScavengingLocationSheet extends FalloutBaseActorSheet {

	drawItemsLut;

	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			submitOnChange: true,
		});
	}

	/** @override */
	get initialTab() {
		return "details";
	}

	activateListeners(html) {
		super.activateListeners(html);

		// -------------------------------------------------------------
		// ! Everything below here is only needed if the sheet is editable
		if (!this.isEditable) {
			return;
		}

		html.find(".reset-ap-spend").click(event => {
			event.preventDefault();
			const update = {};

			for (const category of Object.keys(CONFIG.FALLOUT.SCAVENGING_ITEM_TYPES)) {
				update[`system.item_types.${category}.spend`] = 0;
			}

			this.actor.update(update);
		});

		html.find("#clearScavengingResults").click(event => {
			event.preventDefault();
			this._clearResults();
		});

		html.find("#scavengeLocationButton").click(event => {
			event.preventDefault();
			this._scavengeLocation();
		});
	}

	/** @override */
	async getData(options) {
		const context = await super.getData(options);

		// const rollTables = await fallout.compendiums.rolltables();
		const rollTables = await fallout.compendiums.scavengingRolltables();

		context.itemTables = {};
		for (const rollTable of rollTables) {
			context.itemTables[rollTable.uuid] = rollTable.name;
		}

		context.notesHTML = await foundry.applications.ux.TextEditor.enrichHTML(
			context.system.notes, {
				secrets: this.actor.isOwner,
				rollData: context.rollData,
				async: true,
			}
		);

		return context;
	}


	async _prepareMaterials(context) {
		context.simpleItems = [];

		context.simpleItems.push({
			label: game.i18n.localize("FALLOUT.UI.CAPS"),
			key: "system.currency.caps",
			value: this.actor.system.currency.caps ?? 0,
		});

		for (const material of ["common", "uncommon", "rare"]) {
			context.simpleItems.push({
				label: game.i18n.localize(`FALLOUT.actor.inventory.materials.${material}`),
				key: `system.materials.${material}`,
				value: this.actor.system.materials[material] ?? 0,
			});
		}
	}


	async _clearResults() {
		foundry.applications.handlebars.renderTemplate(
			"systems/fallout/templates/dialogs/are-you-sure.hbs"
		).then(html => {
			new Dialog({
				title: `${game.i18n.localize("FALLOUT.SCAVENGING_LOCATION.ClearResults.title")}`,
				content: html,
				buttons: {
					Yes: {
						icon: '<i class="fa fa-check"></i>',
						label: `${game.i18n.localize("FALLOUT.UI.Yes")}`,
						callback: async () => {
							const ids = this.actor.items.map(i => i._id);
							Item.deleteDocuments(ids, {parent: this.actor});

							this.actor.update({
								"system.currency.caps": 0,
								"system.materials.common": 0,
								"system.materials.rare": 0,
								"system.materials.uncommon": 0,
							});

							ui.notifications.notify(
								game.i18n.localize("FALLOUT.SCAVENGING_LOCATION.ClearResults.notify")
							);
						},
					},
					Cancel: {
						icon: '<i class="fa fa-times"></i>',
						label: `${game.i18n.localize("FALLOUT.UI.Cancel")}`,
					},
				},
				default: "Yes",
			}).render(true);
		});
	}


	async _rollLocationItemsForCategory(category, count, tableUuid) {
		const table = await fromUuid(tableUuid);

		if (!table && category !== "junk") {
			const message = game.i18n.format(
				"FALLOUT.SCAVENGING_LOCATION.Error.MissingTable",
				{ category, tableUuid }
			);

			fallout.error(message);
			ui.notifications.error(message);
		}

		const items = [];

		if (table) {
			for (let i = 0; i < count; i++) {
				const draw = await table.draw({displayChat: false});
				const result = draw.results.find(r => r.type === "document");

				if (!result) {
					continue;
				}

				let itemUuid = result.documentUuid;

				this.drawItemsLut[itemUuid] = true;

				const item = await fromUuid(itemUuid);

				if (item) {
					const itemData = item.toObject();
					itemData._stats.compendiumSource = itemUuid;
					items.push(itemData);
				}
				else {
					const message = game.i18n.format(
						"FALLOUT.SCAVENGING_LOCATION.Error.MissingItem",
						{
							itemUuid,
							name: result.text,
						}
					);

					fallout.error(message);
					ui.notifications.error(message);
				}
			}
		}
		else if (category === "junk") {
			const junkDiceCount = 2 * count;
			const formula = `${junkDiceCount}d20`;
			const roll = new Roll(formula);
			await roll.evaluate();

			const item = await fromUuid(CONFIG.FALLOUT.ITEM_UUIDS.junk);

			if (item) {
				const itemData = item.toObject();
				itemData._stats.compendiumSource = CONFIG.FALLOUT.ITEM_UUIDS.junk;
				itemData.system.quantity = parseInt(roll.result);

				items.push(itemData);
			}
		}

		await this.actor.createEmbeddedDocuments("Item", items);
	}

	async _scavengeLocation() {
		this.drawItemsLut = {};

		for (const category of Object.keys(this.actor.system.item_types)) {
			const categoryDetails = this.actor.system.item_types[category];

			const rollCount = categoryDetails.min + categoryDetails.spend;

			if (rollCount <= 0) {
				continue;
			}

			if (categoryDetails.table === "" && category !== "junk") {
				const message = game.i18n.format(
					"FALLOUT.SCAVENGING_LOCATION.Warn.NoItemTableSet",
					{ category }
				);

				fallout.warn(message);
				ui.notifications.warn(message);
			}
			else {
				await this._rollLocationItemsForCategory(
					category,
					rollCount,
					categoryDetails.table
				);
			}
		}

		// Update ammo counts if needed
		for (const item of this.actor.items) {
			if (item.system.quantityRoll && item.system.quantityRoll !== "") {
				item.rollQuantity("update");
			}
		}

		// Roll for caps if necessary
		//
		const capsRollFormula = this.actor.system.caps_roll ?? "";
		if (capsRollFormula !== "") {
			const roll = new Roll(capsRollFormula);
			try {
				await roll.evaluate();

				this.actor.update({
					"system.currency.caps": parseInt(roll.result),
				});
			}
			catch(e) {
				fallout.error(e);
			}
		}

		// Roll for pre-war money if necessary
		//
		const prewarRollFormula = this.actor.system.prewar_roll ?? "";
		if (prewarRollFormula !== "") {
			const roll = new Roll(prewarRollFormula);
			try {
				await roll.evaluate();

				const item = await fromUuid(CONFIG.FALLOUT.ITEM_UUIDS.prewar_money);

				if (item) {
					const itemData = item.toObject();
					itemData._stats.compendiumSource = CONFIG.FALLOUT.ITEM_UUIDS.prewar_money;
					itemData.system.quantity = parseInt(roll.result);

					await this.actor.createEmbeddedDocuments("Item", [itemData]);
				}
			}
			catch(e) {
				fallout.error(e);
			}
		}

		fallout.chat.renderGeneralMessage(
			this,
			{
				title: game.i18n.localize("FALLOUT.CHAT_MESSAGE.scavenging.title"),
				body: game.i18n.format("FALLOUT.CHAT_MESSAGE.scavenging.body",
					{
						location: this.actor.name,
						time: CONFIG.FALLOUT.LOCATION_TIME_TAKEN[this.actor.system.scale],
					}
				),
			},
			CONST.DICE_ROLL_MODES.PUBLIC
		);
	}


	async _updateObject(event, formData) {

		if (formData["system.category"] === "") {
			// We won't automatically updated min/max values ever for custom
			// category scavenging locations
			//
			return await super._updateObject(event, formData);
		}

		const categoryChanged = formData["system.category"] !== this.actor.system.category;
		const degreeChanged = formData["system.degree"] !== this.actor.system.degree;
		const scaleChanged = formData["system.scale"] !== this.actor.system.scale;

		if (categoryChanged || degreeChanged || scaleChanged) {
			// Only recalculate min/max values if one of these changed
			console.log(formData);
			const itemTypes = this.actor.system.item_types;

			const locationData = CONFIG.FALLOUT.SCAVENGING_LOCATION_DATA[
				formData["system.category"]
			] ?? {};

			const sizeMultiplier = CONFIG.FALLOUT.LOCATION_SCALE_MULTIPLIER[
				formData["system.scale"]
			] ?? 1;

			for (const category of Object.keys(CONFIG.FALLOUT.SCAVENGING_ITEM_TYPES)) {
				const baseline = locationData[category] * sizeMultiplier;

				formData[`system.item_types.${category}.min`] = baseline;
				formData[`system.item_types.${category}.max`] = baseline;
			}

			let reduction = (CONFIG.FALLOUT.SEARCHED_DEGREE_REDUCTION[
				formData["system.degree"]
			] ?? 1) * sizeMultiplier;

			while (reduction > 0) {
				for (const category of Object.keys(CONFIG.FALLOUT.SCAVENGING_ITEM_TYPES)) {
					const max = formData[`system.item_types.${category}.max`];
					let min = formData[`system.item_types.${category}.min`];

					if (min > 0) {
						min--;
						reduction--;

						formData[`system.item_types.${category}.min`] = min;
						formData[`system.item_types.${category}.spend`] =
							Math.min((max - min), (itemTypes[category]?.spend ?? 0));
					}

					if (reduction === 0) {
						break;
					}
				}
			}

			console.log(formData);
		}

		// update maxSpend value
		for (const category of Object.keys(CONFIG.FALLOUT.SCAVENGING_ITEM_TYPES)) {
			const max = formData[`system.item_types.${category}.max`];
			const min = formData[`system.item_types.${category}.min`];

			formData[`system.item_types.${category}.maxSpend`] = max - min;
		}

		return await super._updateObject(event, formData);
	}


}

class FalloutSettlementSheet extends FalloutBaseActorSheet {

	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			submitOnChange: true,
		});
	}

	/** @override */
	get initialTab() {
		return "status";
	}

	get settlers() {
		return game.actors.filter(a => a.type === "npc"
			&& a.system.settlement.uuid === this.actor.uuid
		);
	}

	activateListeners(html) {
		super.activateListeners(html);

		// -------------------------------------------------------------
		// ! Everything below here is only needed if the sheet is editable
		if (!this.isEditable) {
			return;
		}

		html.find(".settler-create").click(this._onSettlerCreate.bind(this));

		html.find(".settler-delete").click(async event => {
			const settlerUuid = $(event.currentTarget).data("settlerId");
			this._deleteSettler(settlerUuid);
		});
		html.find(".settler-open").click(async event => {
			const settlerUuid = $(event.currentTarget).data("settlerId");
			const actor = await fromUuid(settlerUuid);

			if (actor) {
				actor.sheet.render(true);
			}
		});
	}

	/** @override */
	async getData(options) {
		const context = await super.getData(options);

		await this._prepareMaterials(context);

		const actions = [];
		for (const action in CONFIG.FALLOUT.SETTLEMENT_ACTIONS) {
			actions.push({
				id: action,
				name: CONFIG.FALLOUT.SETTLEMENT_ACTIONS[action],
			});
		}
		context.actions = actions.sort((a, b) => a.name.localeCompare(b.name));

		context.candidates = [...context.settlers];

		const playerCharacters = game.actors.filter(
			a => a.type === "character" && a.hasPlayerOwner
		);

		for (const character of playerCharacters) {
			context.candidates.push({
				uuid: character.uuid,
				name: character.name,
			});
		}

		context.candidates = context.candidates.sort(
			(a, b) => a.name.localeCompare(b.name)
		);

		return context;
	}


	async _addSettler(newSettler) {
		await newSettler.update({
			"system.settlement.uuid": this.actor.uuid,
			"system.settlement.action": "unnasigned",
		});

		this.actor._prepareSettlementData();

		this.render(true);
	}


	async _deleteSettler(uuid) {
		const settler = await fromUuid(uuid);

		await settler.update({
			"system.settlement.uuid": "",
			"system.settlement.action": "unnasigned",
		});

		this.actor._prepareSettlementData();

		this.render(true);
	}


	/** @override */
	async _onDropActor(event, data) {
		if (!game.user.isGM) {
			return;
		}

		const droppedActor = data?.uuid ? await fromUuid(data.uuid) : null;

		// Only NPCs can be dropped
		if (droppedActor.type !== "npc") {
			return;
		}

		if (droppedActor) {
			this._addSettler(droppedActor);
		}
	}


	/** @override */
	async _onDropItem(event, data) {
		if (!this.actor.isOwner) {
			return false;
		}

		const item = await Item.implementation.fromDropData(data);
		const source = item.toObject();

		if (this.actor.uuid === item.parent?.uuid) {
			return this._onSortItem(event, source);
		}

		if (source.type !== "object_or_structure") {
			return super._onDropItem(event, data);
		}

		const dropTarget = event.target.closest("[data-item-id]");
		if (!dropTarget) {
			return super._onDropItem(event, data);
		}

		const target = this.actor.items.get(dropTarget.dataset.itemId);

		const targetIsCorrectType = target.type === "object_or_structure";
		const targetIsContainer =
			["structure", "room", "store"].includes(target.system?.itemType ?? "");

		const sourceIsNotStructure =
			source.system.itemType !== "structure";

		if (targetIsCorrectType && targetIsContainer && sourceIsNotStructure) {
			source.system.parentItem = target._id;

			return this._onDropItemCreate(source);
		}
		else {
			return super._onDropItem(event, data);
		}
	}


	async _onSettlerCreate(event) {
		event.preventDefault();

		const actorData = {
			"name": "New Settler",
			"type": "npc",
			"system.settlement.uuid": this.actor.uuid,
		};

		const newSettler = await Actor.create(actorData);

		if (newSettler) {
			await this._addSettler(newSettler);
			newSettler.sheet.render(true);
		}
	}


	/** @override */
	_onSortItem(event, itemData) {
		const items = this.actor.items;

		const source = items.get(itemData._id);

		const dropTarget = event.target.closest("[data-item-id]");
		if ( !dropTarget ) {
			return source.update({
				"system.parentItem": "",
			});
		}

		const target = items.get(dropTarget.dataset.itemId);

		if (source.type === "object_or_structure" && target.type === "object_or_structure") {
			const targetIsContainerType =
				["structure", "room", "store"].includes(target.system.itemType);

			const sourceIsNotStructure =
				source.system.itemType !== "structure";

			if (targetIsContainerType && sourceIsNotStructure) {
				return source.update({
					"system.parentItem": target._id,
				});
			}
		}

		return super._onSortItem(event, itemData);
	}


	async _prepareItems(context) {
		context.settlers = [];

		const assignments = foundry.utils.duplicate(this.actor.system.assignments ?? {});

		context.settlerActionCounts = foundry.utils.mergeObject({
			build: 0,
			business: 0,
			guard: 0,
			hunting_and_gathering: 0,
			scavenging: 0,
			tend_crops: 0,
			trade_caravan: 0,
			unnasigned: 0,
		}, assignments);

		context.stockpile = [];
		context.stockpileUsed = 0;

		const settlers = this.settlers;
		for (const settler of settlers) {
			const action = settler.system.settlement?.action ?? "unnasigned";
			context.settlerActionCounts[action]++;
		}

		context.settlers = settlers.sort((a, b) => a.name.localeCompare(b.name));
		context.settlers.sort((a, b) => a.system.settlement.action.localeCompare(
			b.system.settlement.action
		));

		const groupedSettlementItems = {
			crafting_table: [],
			defense: [],
			power: [],
			resource: [],
			room: [],
			store: [],
			structure: [],
			unknown: [],
		};

		for (const i of context.items) {
			if (i.type === "object_or_structure") {
				if (groupedSettlementItems[i.system.itemType]) {
					groupedSettlementItems[i.system.itemType].push(i);
				}
				else {
					groupedSettlementItems.unknown.push(i);
				}
			}
			else {
				context.stockpile.push(i);
			}
		}

		context.stockpile.sort((a, b) => {
			const aTypeLocalized = CONFIG.FALLOUT.ITEM_TYPES[a.type];
			const bTypeLocalized = CONFIG.FALLOUT.ITEM_TYPES[b.type];

			return aTypeLocalized.localeCompare(bTypeLocalized);
		});

		const settlementItems = [
			...groupedSettlementItems.structure,
			...groupedSettlementItems.room,
			...groupedSettlementItems.store,
			...groupedSettlementItems.defense,
			...groupedSettlementItems.power,
			...groupedSettlementItems.crafting_table,
			...groupedSettlementItems.resource,
			...groupedSettlementItems.unknown,
		];

		for (const i of settlementItems) {
			i.hasNoParent = i.system.parentItem === "";
			i.hasChildren = false;
			i.children = [];

			if (["room", "store", "structure"].includes(i.system.itemType)) {
				i.children = settlementItems.filter(
					item => item.system.parentItem === i._id
				);

				i.hasChildren = i.children.length > 0;
			}
		}

		const topLevelItems = settlementItems.filter(i => i.hasNoParent);

		const __calcDepth = async function(item, depth) {
			item.depth = depth;

			for (const child of item.children) {
				__calcDepth(child, depth + 1);
			}
		};

		for (const item of topLevelItems) {
			__calcDepth(item, 0);
		}

		context.settlementObjects = topLevelItems;
	}


	async _updateObject(event, formData) {
		const settlerActions = {};
		const re = /^action__(.*)$/;

		for (const dataKey in formData) {
			const result = dataKey.match(re);

			if (result) {
				settlerActions[result[1]] = formData[dataKey];
				delete formData[dataKey];
			}
		}

		await this._updateSettlerActions(settlerActions);

		await super._updateObject(event, formData);

		this.render(false);
	}


	async _updateSettlerActions(settlerActions) {
		for (const settler of this.settlers) {
			const action = settlerActions[settler.uuid];
			await settler.update({"system.settlement.action": action});
		}
	}
}

class FalloutVehicleSheet extends FalloutBaseActorSheet {

	/** @override */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["fallout", "sheet", "vehicle"],
			width: 700,
			height: 710,
			tabs: [
				{
					navSelector: ".sheet-tabs",
					contentSelector: ".sheet-body",
					initial: this.initialTab,
				},
			],
		});
	}


	/** @override */
	get initialTab() {
		return "abilities";
	}


	/** @override */
	get inventorySections() {
		return [
			"weapon",
			"ammo",
		];
	}


	/** @override */
	get template() {
		return "systems/fallout/templates/actor/vehicle-sheet.hbs";
	}


	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		html.find("[data-action='roll-vehicle-cover']").click(
			async event => this._onVehicleCoverRoll(event)
		);

		html.find("[data-action='roll-vehicle-impact']").click(
			async event => this._onVehicleImpactRoll(event)
		);

		html.find("[data-action='roll-vehicle-weapon-attack']").click(
			async event => this._onVehicleWeaponRoll(event)
		);

	}


	async getData(options) {
		const context = await super.getData(options);

		const bodyPartData = this.actor.system.body_parts;

		context.bodyParts = [];

		let bodyType = "vehicle";
		let valueConfig = {};

		switch (this.actor.system.bodyType) {
			case "apc":
				valueConfig = CONFIG.FALLOUT.VEHICLE_APC_VALUES;
				break;
			case "armored":
				valueConfig = CONFIG.FALLOUT.VEHICLE_ARMORED_VALUES;
				break;
			case "bus":
				valueConfig = CONFIG.FALLOUT.VEHICLE_BUS_VALUES;
				break;
			case "carTruck":
				valueConfig = CONFIG.FALLOUT.VEHICLE_CARTRUCK_VALUES;
				break;
			case "motorcycle":
				valueConfig = CONFIG.FALLOUT.VEHICLE_MOTORCYCLE_VALUES;
				break;
			case "sportsCar":
				valueConfig = CONFIG.FALLOUT.VEHICLE_SPORTSCAR_VALUES;
				break;
			case "vertibird":
				valueConfig = CONFIG.FALLOUT.VEHICLE_VERTIBIRD_VALUES;
				break;
			default:
				valueConfig = CONFIG.FALLOUT.VEHICLE_CARTRUCK_VALUES;
		}


		for (const part in valueConfig) {
			const name = game.i18n.localize(
				`FALLOUT.BodyTypes.${bodyType}.${part}`
			);
			context.bodyParts.push({
				name: name,
				roll: valueConfig[part],
				basePath: `system.body_parts.${part}`,
				resistanceValues: bodyPartData[part].resistance,
				injuryOpenCount: bodyPartData[part].injuryOpenCount ?? 0,
				injuryTreatedCount: bodyPartData[part].injuryTreatedCount ?? 0,
			});
		}

		await this._getVehicleQualities(context, this.actor);


		context.settlements = [];

		const settlements = game.actors.filter(a => a.type === "settlement");
		settlements.sort((a, b) => a.name.localeCompare(b.name));

		for (const settlement of settlements) {
			context.settlements.push({
				uuid: settlement.uuid,
				name: settlement.name,
			});
		}

		// ADD FAVOURITE ITEMS
		context.favoriteWeapons = context.itemsByType.weapon.filter(
			i => i.system.favorite
		);

		return context;
	}


	async _updateObject(event, formData) {
		for (const resistanceType of ["energy", "physical"]) {
			const key = `_all_${resistanceType}`;
			const val = formData[key] ?? null;

			if (val !== null && val >= 0) {
				// Update all locations
				for (const bodyPart in this.actor.system.body_parts) {
					const bodyPartKey = `system.body_parts.${bodyPart}.resistance.${resistanceType}`;
					formData[bodyPartKey] = val;
				}
			}

			delete formData[key];
		}

		return super._updateObject(event, formData);

	}


	async _getVehicleQualities(context, actor) {
		const vehicleQualities = [];
		for (const key in CONFIG.FALLOUT.VEHICLE_QUALITIES) {
			vehicleQualities.push({
				active: actor.system?.vehicleQuality[key].value ?? false,
				hasRank: CONFIG.FALLOUT.VEHICLE_QUALITY_HAS_RANK[key],
				rank: actor.system?.vehicleQuality[key].rank,
				key,
				label: CONFIG.FALLOUT.VEHICLE_QUALITIES[key],
			});
		}

		context.vehicleQualities = vehicleQualities.sort(
			(a, b) => a.label.localeCompare(b.label)
		);
	}


	async _onVehicleCoverRoll(event) {
		const numOfDice = this.actor.system.cover.value;

		let rollName = `${game.i18n.localize("TYPES.Actor.vehicle")} ${game.i18n.localize("FALLOUT.VEHICLE.cover")}`;

		let actorUUID;
		let _token = this.actor.token;
		if (_token) {
			actorUUID = this.actor.token.uuid;
		}
		else {
			actorUUID = this.actor.uuid;
		}

		// console.warn(fromUuidSync(actorUUID).actor)

		fallout.DialogD6.createDialog({
			rollName: rollName,
			diceNum: numOfDice,
			actor: actorUUID,
		});
	}


	async _onVehicleImpactRoll(event) {
		const numOfDice = this.actor.system.impact.value;

		let rollName = `${game.i18n.localize("TYPES.Actor.vehicle")} ${game.i18n.localize("FALLOUT.VEHICLE.impact")}`;

		let actorUUID;
		let _token = this.actor.token;
		if (_token) {
			actorUUID = this.actor.token.uuid;
		}
		else {
			actorUUID = this.actor.uuid;
		}

		// console.warn(fromUuidSync(actorUUID).actor)

		fallout.DialogD6.createDialog({
			rollName: rollName,
			diceNum: numOfDice,
			actor: actorUUID,
		});
	}


	async _onVehicleWeaponRoll(event) {
		const li = $(event.currentTarget).parents(".item");
		const item = this.actor.items.get(li.data("item-id"));

		if (item.isWeaponBroken) {
			return ui.notifications.warn(
				game.i18n.localize("FALLOUT.ERRORS.ThisWeaponIsBroken")
			);
		}

		let attribute;
		let rollName = item.name;
		let skill;

		let actor = await fallout.utils.getActorForUser();

		if (!actor || actor.type === "vehicle") {
			return ui.notifications.warn(
				game.i18n.localize("FALLOUT.ERRORS.NoUsableCharacterFound")
			);
		}

		if (actor.type === "creature") {
			const creatureAttribute = item.system.creatureAttribute ?? "";
			const creatureSkill = item.system.creatureSkill ?? "";

			if (creatureSkill === "" || creatureAttribute === "") {
				return ui.notifications.warn(
					game.i18n.localize("FALLOUT.ERRORS.WeaponHasMissingCreatureConfiguration")
				);
			}

			attribute = actor.system[creatureAttribute];

			skill = actor.system[creatureSkill];
			skill.tag = true;
		}
		else {
			const skillName = item.system.weaponType === "custom"
				? item.system.skill ?? ""
				: CONFIG.FALLOUT.WEAPON_SKILLS[item.system.weaponType];

			const customAttribute = item.system.weaponType === "custom"
				? item.system.attribute ?? ""
				: false;

			if (skillName === "") {
				return ui.notifications.error(
					game.i18n.localize("FALLOUT.ERRORS.UnableToDetermineWeaponSkill")
				);
			}

			const skillItem = actor.items.find(i => i.name === skillName);

			if (skillItem) {
				skill = skillItem.system;
			}
			else {
				skill = { value: 0, tag: false, defaultAttribute: "str" };
			}

			const attributeOverride = CONFIG.FALLOUT.WEAPON_ATTRIBUTE_OVERRIDE[
				item.system.weaponType
			];

			if (customAttribute) {
				attribute = actor.system.attributes[customAttribute];
			}
			else if (attributeOverride) {
				attribute = actor.system.attributes[attributeOverride];
			}
			else {
				attribute = actor.system.attributes[skill.defaultAttribute];
			}

			if (!attribute) {
				attribute = { value: 0 };
			}
		}

		// REDUCE AMMO
		const autoCalculateAmmo = game.settings.get(
			"fallout", "automaticAmmunitionCalculation"
		);

		const actorCanUseAmmo =
			["character", "robot", "vehicle"].includes(this.actor.type);

		const ammoPopulated = item.system.ammo !== "";

		if (autoCalculateAmmo && actorCanUseAmmo && ammoPopulated) {
			const [ammo, shotsAvailable] = this.actor._getAvailableAmmoType(
				item.system.ammo
			);

			if (!ammo) {
				ui.notifications.warn(`Ammo ${item.system.ammo} not found`);
				return;
			}

			if (shotsAvailable < item.system.ammoPerShot) {
				ui.notifications.warn(`Not enough ${item.system.ammo} ammo`);
				return;
			}
		}

		// Check for unreliable weapon quality
		let complication = parseInt(this.actor.system.complication);
		if (item.system.damage.weaponQuality.unreliable.value) {
			complication -= 1;
		}

		fallout.Dialog2d20.createDialog({
			rollName: rollName,
			diceNum: 2,
			attribute: attribute.value,
			skill: skill.value,
			tag: skill.tag,
			complication: complication,
			rollLocation: true,
			actor: this.actor,
			item: item,
		});
	}

}

class Dialog2d20 extends Dialog {

	constructor(
		rollName,
		diceNum,
		attribute,
		skill,
		tag,
		complication,
		rollLocation,
		actor,
		item,
		dialogData={},
		options={}
	) {
		super(dialogData, options);
		this.rollName = rollName;
		this.diceNum = diceNum;
		this.attribute = attribute;
		this.skill = skill;
		this.tag = tag;
		this.complication = complication;
		this.rollLocation = rollLocation;
		this.actor = actor;
		this.item = item;
		this.options.classes = ["dice-icon"];
		this.deferred = new Deferred();
	}

	activateListeners(html) {
		super.activateListeners(html);

		html.ready(e => {
			this.markDiceNumber(html, this.diceNum);
		});

		html.on("click", ".dice-icon", (e, i, a) => {
			let index = e.currentTarget.dataset.index;
			this.diceNum = parseInt(index);
			this.markDiceNumber(html, this.diceNum);
		});
		this.data.buttons.roll.callback=this.rollButton.bind(this);
	}

	rollButton() {
		let attr = this.element.find('[name="attribute"]').val();
		let skill = this.element.find('[name="skill"]').val();
		let complication = this.element.find('[name="complication"]').val();
		let isTag = this.element.find('[name="tag"]').is(":checked");

		this.rolling = true;
		fallout.Roller2D20.rollD20({
			rollname: this.rollName,
			dicenum: this.diceNum,
			attribute: attr,
			skill: skill,
			tag: isTag,
			complication: complication,
			rollLocation: this.rollLocation,
			item: this.item,
			actor: this.actor,
		}).then(result => this.deferred.resolve(result));

		if (this.actor && game.settings.get("fallout", "automaticAmmunitionCalculation")) {
			const actorType = this.actor?.type;
			if (actorType !== "character" && actorType !== "robot" && actorType !== "vehicle") {
				return;
			}

			// REDUCE AMMO
			if (this.item?.system?.ammo !== "") {
				try {
					this.actor.reduceAmmo(
						this.item.system.ammo,
						this.item.system.ammoPerShot
					);
				}
				catch(er) {
					console.warn(er);
				}
			}
			else if (this.item?.system?.consumedOnUse) {
				const newQuantity = parseInt(this.item.system.quantity) - 1;

				this.item.update({
					"system.quantity": newQuantity,
				});
			}
		}
	}

	async close(options={}) {
		super.close(options);
		if (!this.rolling) {
			this.deferred.resolve(null);
		}
	}

	markDiceNumber(html) {
		$(html).find(".dice-icon").removeClass("marked");
		$(html).find(`[data-index="${this.diceNum}"]`).addClass("marked");
	}

	static async createDialog({ rollName = "Roll D20", diceNum = 2, attribute = 0, skill = 0, tag = false, complication = 20, rollLocation=false, actor=null, item=null } = {}) {
		let dialogData = {};

		dialogData.rollName = rollName;
		dialogData.diceNum = diceNum;
		dialogData.attribute = attribute;
		dialogData.skill = skill;
		dialogData.tag = tag;
		dialogData.complication = complication;
		dialogData.rollLocation = rollLocation;
		dialogData.actor = actor;
		dialogData.item = item;

		const html = await foundry.applications.handlebars.renderTemplate("systems/fallout/templates/dialogs/dialog2d20.hbs", dialogData);

		let d = new Dialog2d20(
			rollName,
			diceNum,
			attribute,
			skill,
			tag,
			complication,
			rollLocation,
			actor,
			item,
			{
				title: rollName,
				content: html,
				buttons: {
					roll: {
						icon: '<i class="fas fa-check"></i>',
						label: "ROLL",
					},
				},
			}
		);
		d.options.classes.push("themed", "themed-light");

		d.render(true);
		return d.deferred.promise;
	}
}

class Deferred {
	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.reject = reject;
			this.resolve = resolve;
		});
	}
}

class DialogD6 extends Dialog {

	constructor(rollName, diceNum, actor, weapon, falloutRoll, dialogData = {}, options = {}) {
		super(dialogData, options);
		this.rollName = rollName;
		this.diceNum = diceNum;
		this.actor = actor;
		this.weapon = weapon;
		this.falloutRoll = falloutRoll;
		this.options.classes = ["dice-icon"];
	}

	activateListeners(html) {
		const me = this;

		super.activateListeners(html);

		html.on("click", ".roll", async event => {
			let extraDiceNum = parseInt(html.find(".extra-dice")[0]?.value ?? 0);
			let fireRate = parseInt(html.find(".fire-rate")[0]?.value ?? 0);
			let diceNum = parseInt(html.find(".damage-dice")[0]?.value ?? 1);

			me.weapon = me.weapon?.constructor.name === "Object"
				? await fromUuid(me.weapon.uuid)
				: me.weapon;

			const gatlingWeapon = me.weapon?.hasWeaponQuality("gatling") ?? false;
			let multiplier = gatlingWeapon ? 2 : 1;

			if (!diceNum) {
				diceNum = me.diceNum;
			}

			if (fireRate && fireRate > 0) {
				diceNum += (fireRate * multiplier);
			}

			let additionalAmmo = 0;
			// CHECK IF THERE IS ENOUGH AMMO TO TRIGGER THE ROLL
			if (game.settings.get("fallout", "automaticAmmunitionCalculation")) {
				if (me.weapon?.system.ammo) {
					let initDmg = me.falloutRoll
						? 0
						: me.weapon.system.damage.rating;

					additionalAmmo = await me.checkAmmo(diceNum, initDmg);

					if (additionalAmmo < 0) {
						return;
					}
				}
			}

			if (!me.falloutRoll) {
				fallout.Roller2D20.rollD6({
					rollname: me.rollName,
					dicenum: diceNum + extraDiceNum,
					weapon: me.weapon,
					actor: me.actor,
				});
			}
			else {
				fallout.Roller2D20.addD6({
					rollname: me.rollName,
					dicenum: diceNum + extraDiceNum,
					weapon: me.weapon,
					actor: me.actor,
					falloutRoll: me.falloutRoll,
				});
			}

			// REDUCE AMMO FOR CHARACTER AND ROBOT
			if (game.settings.get("fallout", "automaticAmmunitionCalculation")) {
				if (!me.actor) {
					return;
				}

				let _actor;
				if (me.actor.startsWith("Actor")) {
					_actor = fromUuidSync(me.actor);
				}
				else if (me.actor.startsWith("Scene")) {
					_actor = fromUuidSync(me.actor).actor;
				}

				if (["character", "robot", "vehicle"].includes(_actor.type)) {
					if (additionalAmmo > 0) {
						await _actor.reduceAmmo(me.weapon.system.ammo, additionalAmmo);
					}
				}
			}
		});
	}

	async rollD6() {

	}

	async addD6() {

	}

	static async createDialog({
		rollName = "DC Roll",
		diceNum = 2,
		falloutRoll = null,
		actor = null,
		weapon = null,
	} = {}) {
		let dialogData = {};

		dialogData.rollName = rollName;
		dialogData.diceNum = diceNum;
		dialogData.falloutRoll = falloutRoll;
		dialogData.weapon = weapon;
		dialogData.actor = actor;

		let html;
		let dialogWidth = 300;
		if (weapon && !falloutRoll) {
			html = await foundry.applications.handlebars.renderTemplate("systems/fallout/templates/dialogs/dialogd6.hbs", dialogData);
			dialogWidth = 465;
		}
		else {
			html = await foundry.applications.handlebars.renderTemplate("systems/fallout/templates/dialogs/dialogd6-simple.hbs", dialogData);
		}

		let d = new DialogD6(rollName, diceNum, actor, weapon, falloutRoll, {
			title: rollName,
			content: html,
			buttons: {
				roll: {
					icon: '<i class="fas fa-check"></i>',
					label: "ROLL",
				},
			},
			close: () => { },
		}, {width: dialogWidth});
		d.render(true);
	}

	async checkAmmo(diceNum, initDmg) {
		if (!game.settings.get("fallout", "automaticAmmunitionCalculation")) {
			return 0;
		}

		if (!this.actor) {
			return 0;
		}

		if (!this.weapon) {
			return 0;
		}

		if (this.weapon.system.ammo === "") {
			return 0;
		}

		// Check if there is ammo at all
		let _actor;
		if (this.actor.startsWith("Actor")) {
			_actor = fromUuidSync(this.actor);
		}
		else if (this.actor.startsWith("Scene")) {
			_actor = fromUuidSync(this.actor).actor;
		}

		if (!_actor) {
			return 0;
		}

		if (!["character", "robot", "vehicle"].includes(_actor.type)) {
			return 0;
		}

		const [ammoItems, shotsAvailable] =
			_actor._getAvailableAmmoType(
				this.weapon.system.ammo
			);

		if (!ammoItems) {
			ui.notifications.warn(`Ammo ${this.weapon.system.ammo} not found`);
			return -1;
		}

		const weaponType = this.weapon?.system?.weaponType ?? "";

		// Check if there is enough ammo
		const totalDice = parseInt(diceNum);
		const weaponDmg = parseInt(initDmg);

		// Don't include bonus melee damage dice in the calculation
		const bonusDamage = ["meleeWeapons", "unarmed"].includes(weaponType)
			? _actor.system.meleeDamage.value
			: 0;

		let additionalAmmo = Math.max(0, totalDice - weaponDmg - bonusDamage)
			* this.weapon.system.ammoPerShot;

		// Gatling weird shit where you need to add 2DC and spend 10 ammmo...
		if (this.weapon && this.weapon.hasWeaponQuality("gatling")) {
			additionalAmmo = Math.floor(additionalAmmo * 0.5);
		}

		if (shotsAvailable < additionalAmmo) {
			ui.notifications.warn(`Not enough ${this.weapon.system.ammo} ammo`);
			return -1;
		}

		return additionalAmmo;
	}
}

class DieFalloutDamage extends foundry.dice.terms.Die {
	constructor(termData) {
		termData.faces = 6;
		super(termData);
	}

	/* -------------------------------------------- */

	/** @override */
	static DENOMINATION = "c";


	/* -------------------------------------------- */

	/** @override */
	getResultLabel(result) {
		return {
			1: '<img src="systems/fallout/assets/dice/d1.webp" />',
			2: '<img src="systems/fallout/assets/dice/d2.webp" />',
			3: '<img src="systems/fallout/assets/dice/d3.webp" />',
			4: '<img src="systems/fallout/assets/dice/d4.webp" />',
			5: '<img src="systems/fallout/assets/dice/d5.webp" />',
			6: '<img src="systems/fallout/assets/dice/d6.webp" />',
		}[result.result];
	}

	static values = {
		1: 1,
		2: 2,
		3: 0,
		4: 0,
		5: "<img width='24' height='24' style='border: none' src='systems/conan2d20/assets/dice/d5.webp'/>",
		6: "<img width='24' height='24' style='border: none' src='systems/conan2d20/assets/dice/d6.webp'/>",
	};

	get total() {
		if (!this._evaluated) {
			return null;
		}
		return this.results.reduce((t, r) => {
			if (!r.active) {
				return t;
			}
			if (r.count !== undefined) {
				return t + r.count;
			}
			return t + DieFalloutDamage.getValue(r.result);
		}, 0);
	}

	/** @override */
	roll(options) {
		const roll = super.roll(options);
		roll.effect = roll.result === 5 || roll.result === 6;
		return roll;
	}

	get resultValues() {
		return this.results.map(result => {
			return DieFalloutDamage.getResultLabel(result.result);
		});
	}

	static getValue(dieSide) {
		// 1 if Effect, otherwise take the value
		return typeof DieFalloutDamage.values[dieSide] === "string"
			? 1
			: DieFalloutDamage.values[dieSide];
	}
}

class DieFalloutLocation extends foundry.dice.terms.Die {
	constructor(termData) {
		termData.faces = 20;
		super(termData);
	}

	/* -------------------------------------------- */

	/** @override */
	static DENOMINATION = "h";


	/* -------------------------------------------- */

	/** @override */
	getResultLabel(result) {
		return {
			1: "Head_Optics_Head_Head",
			2: "Head_Optics_Head_Head",
			3: "Torso_MainBody_Torso_Torso",
			4: "Torso_MainBody_Torso_Torso",
			5: "Torso_MainBody_Torso_Torso",
			6: "Torso_MainBody_Torso_Torso",
			7: "Torso_MainBody_Torso_Torso",
			8: "Torso_MainBody_Torso_Torso",
			9: "LeftArm_Arm1_LeftFrontLeg_LeftWingAsLeg",
			10: "LeftArm_Arm1_LeftFrontLeg_LeftWingAsLeg",
			11: "LeftArm_Arm1_LeftFrontLeg_LeftWingAsLeg",
			12: "RightArm_Arm2_RightFrontLeg_RightWingAsLeg",
			13: "RightArm_Arm2_RightFrontLeg_RightWingAsLeg",
			14: "RightArm_Arm2_RightFrontLeg_RightWingAsLeg",
			15: "LeftLeg_Arm3_LeftHindLeg_Legs",
			16: "LeftLeg_Arm3_LeftHindLeg_Legs",
			17: "LeftLeg_Arm3_LeftHindLeg_Legs",
			18: "RightLeg_Thruster_RightHindLeg_Legs",
			19: "RightLeg_Thruster_RightHindLeg_Legs",
			20: "RightLeg_Thruster_RightHindLeg_Legs",
		}[result.result];
	}

	static values = {
		1: "Head_Optics_Head_Head",
		2: "Head_Optics_Head_Head",
		3: "Torso_MainBody_Torso_Torso",
		4: "Torso_MainBody_Torso_Torso",
		5: "Torso_MainBody_Torso_Torso",
		6: "Torso_MainBody_Torso_Torso",
		7: "Torso_MainBody_Torso_Torso",
		8: "Torso_MainBody_Torso_Torso",
		9: "LeftArm_Arm1_LeftFrontLeg_LeftWingAsLeg",
		10: "LeftArm_Arm1_LeftFrontLeg_LeftWingAsLeg",
		11: "LeftArm_Arm1_LeftFrontLeg_LeftWingAsLeg",
		12: "RightArm_Arm2_RightFrontLeg_RightWingAsLeg",
		13: "RightArm_Arm2_RightFrontLeg_RightWingAsLeg",
		14: "RightArm_Arm2_RightFrontLeg_RightWingAsLeg",
		15: "LeftLeg_Arm3_LeftHindLeg_Legs",
		16: "LeftLeg_Arm3_LeftHindLeg_Legs",
		17: "LeftLeg_Arm3_LeftHindLeg_Legs",
		18: "RightLeg_Thruster_RightHindLeg_Legs",
		19: "RightLeg_Thruster_RightHindLeg_Legs",
		20: "RightLeg_Thruster_RightHindLeg_Legs",
	};
}

const conditionTrackerHook = {
	attach: () => {
		fallout.debug("Condition Tracker: attaching updateWorldTime hook");
		const tracker = fallout.conditionTracker;

		Hooks.on("updateWorldTime", tracker.onUpdateWorldTime.bind(tracker));
	},
};

const diceSoNiceReadyHook = {
	attach: () => {
		fallout.debug("Attaching diceSoNiceReadyHook hook");

		Hooks.once("diceSoNiceReady", async dice3d => {
			fallout.debug("Running diceSoNiceReady hook");

			dice3d.addSystem({ id: "fallout", name: "Fallout 2d20" }, true);

			dice3d.addColorset({
				name: "fallout",
				description: "Fallout 2d20",
				category: "Colors",
				foreground: "#fcef71",
				background: "#008cd1",
				outline: "gray",
				texture: "none",
			});

			dice3d.addDicePreset({
				type: "dc",
				labels: [
					"systems/fallout/assets/dice/d1.webp",
					"systems/fallout/assets/dice/d2.webp",
					"systems/fallout/assets/dice/d3.webp",
					"systems/fallout/assets/dice/d4.webp",
					"systems/fallout/assets/dice/d5.webp",
					"systems/fallout/assets/dice/d6.webp",
				],
				system: "fallout",

			});

			dice3d.addDicePreset({
				type: "dh",
				fontScale: 0.9,
				labels: [
					"systems/fallout/assets/dice-locations/head.webp",
					"systems/fallout/assets/dice-locations/head.webp",
					"systems/fallout/assets/dice-locations/body.webp",
					"systems/fallout/assets/dice-locations/body.webp",
					"systems/fallout/assets/dice-locations/body.webp",
					"systems/fallout/assets/dice-locations/body.webp",
					"systems/fallout/assets/dice-locations/body.webp",
					"systems/fallout/assets/dice-locations/body.webp",
					"systems/fallout/assets/dice-locations/arm-l.webp",
					"systems/fallout/assets/dice-locations/arm-l.webp",
					"systems/fallout/assets/dice-locations/arm-l.webp",
					"systems/fallout/assets/dice-locations/arm-r.webp",
					"systems/fallout/assets/dice-locations/arm-r.webp",
					"systems/fallout/assets/dice-locations/arm-r.webp",
					"systems/fallout/assets/dice-locations/leg-l.webp",
					"systems/fallout/assets/dice-locations/leg-l.webp",
					"systems/fallout/assets/dice-locations/leg-l.webp",
					"systems/fallout/assets/dice-locations/leg-r.webp",
					"systems/fallout/assets/dice-locations/leg-r.webp",
					"systems/fallout/assets/dice-locations/leg-r.webp",
				],
				system: "fallout",
				colorset: "fallout",
			});
		});
	},
};

const getChatLogEntryContextHook = {
	attach: () => {
		fallout.debug("Attaching getChatLogEntryContext hook");

		Hooks.on("getChatLogEntryContext", (html, options) => {
			fallout.debug("Running getChatLogEntryContext hook");

			const canAdvanceTime = function(li) {
				const message = game.messages.get(li.attr("data-message-id"));
				const messageData = message.flags.data;

				return (game.user.isGM && messageData?.type === "salvage-junk");
			};

			options.push({
				name: game.i18n.localize("FALLOUT.APP.SalvageJunk.AdvanceGameTime"),
				icon: "<i class=\"fas fa-clock\"></i>",
				condition: canAdvanceTime,
				callback: li => {
					const message = game.messages.get(li.attr("data-message-id"));
					const messageData = message.flags.data;

					if (messageData.type !== "salvage-junk") {
						return;
					}

					game.time.advance(messageData.timeToSalvageMins * 60);

					return ui.notifications.info(
						game.i18n.format(
							"FALLOUT.APP.SalvageJunk.gameTimeAdvanced",
							{time: messageData.timeToSalvage}
						),
						{permanent: false}
					);
				},
			});

			options.sort((a, b) => a.name.localeCompare(b.name));
		});
	},
};

class FalloutMacros {

	// Work out which actor to use.  If the user running the macro is the GM use
	// the selected token.
	//
	// Players running a script always use their own character Actor unless one
	// isn't assigned, in which case it will use the.
	//
	static async _getMacroActor() {
		let actor = null;

		if (game.user.isGM) {
			const controlledTokenCount = canvas.tokens.controlled.length;
			if (controlledTokenCount > 0) {
				if (controlledTokenCount !== 1) {
					ui.notifications.warn(
						game.i18n.format("FALLOUT.MACRO.Error.TooManyTokensSelected", {
							max: 1,
						})
					);
				}
				else {
					actor = canvas.tokens.controlled[0].actor;
				}
			}
			else {
				ui.notifications.warn(
					game.i18n.format("FALLOUT.MACRO.Error.NoTokensSelected")
				);
			}
		}
		else if (game.user.character) {
			actor = game.user.character;
		}
		else {
			ui.notifications.warn(
				game.i18n.format("FALLOUT.MACRO.Error.NoPLayerCharacterAssigned")
			);
		}

		return actor;
	}


	// Work out which actors to use.  GMs need at least one token selected.
	//
	// Players always use their own character Actor.
	//
	static async _getMacroActors() {
		let actors = [];

		if (game.user.isGM) {
			const controlledTokenCount = canvas.tokens.controlled.length;
			if (controlledTokenCount > 0) {
				for (const token of canvas.tokens.controlled) {
					actors.push(token.actor);
				}
			}
			else {
				ui.notifications.warn(
					game.i18n.format("FALLOUT.MACRO.Error.NoTokensSelected")
				);
			}
		}
		else if (game.user.character) {
			actors.push(game.user.character);
		}
		else {
			ui.notifications.warn(
				game.i18n.format("FALLOUT.MACRO.Error.NoPLayerCharacterAssigned")
			);
		}

		return actors;
	}


	static async drinkDirtyWater() {
		const actor = await FalloutMacros._getMacroActor();

		if (!actor) {
			return;
		}

		foundry.applications.handlebars.renderTemplate(
			"systems/fallout/templates/dialogs/are-you-sure.hbs"
		).then(html => {
			new Dialog({
				title: `${game.i18n.localize("FALLOUT.MACRO.DrinkDirtyWater.name")}`,
				content: html,
				buttons: {
					Yes: {
						icon: '<i class="fa fa-check"></i>',
						label: `${game.i18n.localize("FALLOUT.UI.Yes")}`,
						callback: async () => {
							actor.drinkDirtyWater();
						},
					},
					Cancel: {
						icon: '<i class="fa fa-times"></i>',
						label: `${game.i18n.localize("FALLOUT.UI.Cancel")}`,
					},
				},
				default: "Yes",
			}).render(true);
		});
	}


	static async newScene() {
		const macroName = game.i18n.localize("FALLOUT.MACRO.NewScene.name");

		if (!game.user.isGM) {
			return ui.notifications.error(
				game.i18n.format("FALLOUT.MACRO.Error.GameMasterRoleRequired", {
					macro: macroName,
				})
			);
		}
		else {
			try {
				const players = game.users.players;

				for (const player of players) {
					const actor = player.character;

					if (actor) {
						actor.updateAddictions();
					}
				}

				return ui.notifications.info(
					game.i18n.format("FALLOUT.MACRO.Success", {
						macro: macroName,
					})
				);
			}
			catch(e) {
				return ui.notifications.error(
					game.i18n.format("FALLOUT.MACRO.Error.CaughtError", {
						macro: macroName,
						error: e,
					})
				);
			}
		}
	}


	static async newSession() {
		const macroName = game.i18n.localize("FALLOUT.MACRO.NewSession.name");

		if (!game.user.isGM) {
			return ui.notifications.error(
				game.i18n.format("FALLOUT.MACRO.Error.GameMasterRoleRequired", {
					macro: macroName,
				})
			);
		}
		else {
			try {
				const players = game.users.players;

				let startingAp = 0;

				for (const player of players) {
					const actor = player.character;

					if (!actor) {
						continue;
					} // Player doesn't own a character

					const updateData = {
						"system.conditions.intoxication": 0,
					};

					for (const doseKey in actor.system.chemDoses) {
						updateData[`system.chemDoses.-=${doseKey}`] = null;
					}

					actor.update(updateData);

					startingAp++;
				}

				fallout.APTrackerV2.setAP("partyAP", 0);
				fallout.APTrackerV2.setAP("gmAP", startingAp);

				return ui.notifications.info(
					game.i18n.format("FALLOUT.MACRO.Success", {
						macro: macroName,
					})
				);
			}
			catch(e) {
				return ui.notifications.error(
					game.i18n.format("FALLOUT.MACRO.Error.CaughtError", {
						macro: macroName,
						error: e,
					})
				);
			}
		}
	}


	static async partySleep() {
		const macroName = game.i18n.localize("FALLOUT.APP.PartySleep.title");

		if (!game.user.isGM) {
			return ui.notifications.error(
				game.i18n.format("FALLOUT.MACRO.Error.GameMasterRoleRequired", {
					macro: macroName,
				})
			);
		}
		else {
			return new fallout.apps.FalloutPartySleep().render(true);
		}
	}


	static async resetLuckPoints() {
		const macroName = game.i18n.localize("FALLOUT.MACRO.ResetLuckPoints.name");

		if (!game.user.isGM) {
			return ui.notifications.error(
				game.i18n.format("FALLOUT.MACRO.Error.GameMasterRoleRequired", {
					macro: macroName,
				})
			);
		}
		else {
			try {
				const affectedActors = [];
				for (const actor of fallout.utils.getPlayerCharacters()) {
					const newLuckPoints =
						actor.system?.attributes?.luc?.value ?? 0;

					affectedActors.push(
						{
							name: actor.name,
							newLuckPoints,
						}
					);

					actor.update({
						"system.luckPoints": newLuckPoints,
					});
				}

				if (affectedActors.length > 0) {
					fallout.chat.renderResetLuckPointsMessage(
						{
							title: game.i18n.localize("FALLOUT.MACRO.ResetLuckPoints.name"),
							actors: affectedActors,
						},
						CONST.DICE_ROLL_MODES.PUBLIC
					);
				}

				return ui.notifications.info(
					game.i18n.format("FALLOUT.MACRO.Success", {
						macro: macroName,
					})
				);
			}
			catch(e) {
				return ui.notifications.error(
					game.i18n.format("FALLOUT.MACRO.Error.CaughtError", {
						macro: macroName,
						error: e,
					})
				);
			}
		}
	}
}

async function createItemMacro(data, slot) {
	// TODO Implement proper item macro creation
	return false;
}

const hotbarDropHook = {
	attach: () => {
		fallout.debug("Attaching hotbarDrop hook");

		Hooks.on("hotbarDrop", (bar, data, slot) => {
			fallout.debug("Running hotbarDrop hook");

			if (data.type === "Item") {
				createItemMacro();
				return false;
			}
		});
	},
};

const initiativeHooks = {
	attach: () => {
		fallout.debug("Attaching createCombatant hook");

		Hooks.on("createCombatant", (combatant, options, userId) => {
			fallout.debug("Running createCombatant hook");

			if (!game.user.isGM) {
				return;
			}

			if (game.settings.get(SYSTEM_ID, "useVariableInitiative")) {
				return;
			}

			combatant.combat.setInitiative(
				combatant._id,
				combatant.actor?.system?.initiative?.value ?? 0
			);
		});

		fallout.debug("Attaching updateActor hook");

		Hooks.on("updateActor", (actor, updateData, options, userId) => {
			if (!game.user.isGM) {
				return;
			}
			if (!actor.inCombat) {
				return;
			}

			if (game.settings.get(SYSTEM_ID, "useVariableInitiative")) {
				return;
			}

			let newInitiative = updateData.system?.initiative?.value ?? null;

			const updateInititive = Number.isInteger(parseInt(newInitiative))
				|| Object.hasOwn(updateData.system ?? {}, "attributes");

			if (updateInititive) {
				for (const combat of game.combats) {
					const combatant = combat.combatants.find(
						c => c.actor.id === actor.id
					);

					if (combatant) {
						combatant.combat.setInitiative(
							combatant._id,
							actor.system.initiative.value
						);
					}
				}
			}
		});
	},
};

const itemPilesReadyHook = {
	attach: () => {
		fallout.debug("Attaching itemPilesReadyHook hook");

		Hooks.once("item-piles-ready", async () => {
			fallout.debug("Running itemPilesReadyHook hook");

			// See docs for more info:
			// https://github.com/fantasycalendar/FoundryVTT-ItemPiles/blob/master/docs/api.md
			game.itempiles.API.addSystemIntegration({

				VERSION: "1.0.5",

				// The actor class type is the type of actor that will be used
				// for the default item pile actor that is created on first item drop.
				ACTOR_CLASS_TYPE: "character",

				// The item quantity attribute is the path to the attribute on
				// items that denote how many of that item that exists
				ITEM_QUANTITY_ATTRIBUTE: "system.quantity",

				// The item price attribute is the path to the attribute on each
				// item that determine how much it costs
				ITEM_PRICE_ATTRIBUTE: "system.cost",

				// Item types and the filters actively remove items from the
				// item pile inventory UI that users cannot loot, such as spells,
				// feats, and classes
				ITEM_FILTERS: [
					{
						path: "type",
						filters: "addiction,disease,perk,skill,special_ability,trait",
					},
					{
						path: "system.naturalWeapon",
						filters: "true",
					},
				],

				UNSTACKABLE_ITEM_TYPES: [],

				// Item similarities determines how item piles detect
				// similarities and differences in the system
				ITEM_SIMILARITIES: ["name", "type"],

				// Currencies in item piles is a versatile system that can
				// accept actor attributes (a number field on the actor's sheet)
				// or items (actual items in their inventory)
				//
				// In the case of attributes, the path is relative to the
				// "actor.system"
				// In the case of items, it is recommended you export the item
				// with `.toObject()` and strip out any module data
				CURRENCIES: [
					{
						type: "attribute",
						name: "FALLOUT.UI.CAPS",
						img: "icons/commodities/currency/coins-engraved-copper.webp",
						abbreviation: "{#}C",
						data: {
							path: "system.currency.caps",
						},
						primary: true,
						exchangeRate: 1,
					},
				],

				CURRENCY_DECIMAL_DIGITS: 0.01,
			});
		});
	},
};

const preCreateItemHook = {
	attach: () => {
		fallout.debug("Attaching preCreateItem hook");

		/* -------------------------------------------- */
		/*  Omit Specific Items on Specific Actors      */
		/* -------------------------------------------- */
		Hooks.on("preCreateItem", item => {
			fallout.debug("Running preCreateItem hook");

			if (item.parent) {
				const parentType = item.parent.type;

				let warningMessage = null;

				switch (item.type) {
					case "addiction":
						if (parentType === "character") {
							return true;
						}
						warningMessage = "ONLY CHARACTERS CAN HAVE ADDICTIONS";
						break;
					case "disease":
						if (parentType === "character") {
							return true;
						}
						warningMessage = "ONLY CHARACTERS CAN HAVE DISEASES";
						break;
					case "object_or_structure":
						if (parentType === "settlement") {
							return true;
						}
						warningMessage = "ONLY SETTLEMENTS CAN HAVE OBJECTS OR STRUCTURES";
						break;
					case "perk":
						if (["character", "creature", "robot", "npc"].includes(parentType)) {
							return true;
						}
						warningMessage = "ONLY PLAYERS CAN HAVE PERKS";
						break;
					case "trait":
						if (["character", "robot"].includes(parentType)) {
							return true;
						}
						warningMessage = "ONLY PLAYERS CAN HAVE TRAITS";
						break;
					case "skill":
						const correctParentType =
							["character", "robot", "npc"].includes(parentType);

						const existingItem = item.parent.items.find(i =>
							i.name === item.name && i.type === item.type
						);

						if (correctParentType && !existingItem) {
							return true;
						}

						if (!correctParentType) {
							warningMessage = "ONLY CHARACTERS, ROBOTS AND NPCs CAN HAVE SKILLS";
						}
						else if (existingItem) {
							warningMessage = "THERE IS ALREADY A SKILL WITH THAT NAME";
						}
						break;
					case "special_ability":
						if (["creature", "npc"].includes(parentType)) {
							return true;
						}
						warningMessage = "ONLY NPCs AND CREATURES CAN HAVE SPECIAL ABILITIES";
						break;
				}

				if (warningMessage !== null) {
					ui.notifications.warn(warningMessage);
					return false;
				}
			}
		});
	},
};

class FalloutUpdateBase {

	static version;

	version = this.constructor["version"]; // eslint-disable-line

	// Update the actor to the latest schema version.
	//
	async updateActor(actorData) {}

	// Update the item to the latest schema version.
	//
	async updateItem(itemData, actorData) {}

	// And updates required to system settings can be performed here.
	//
	async updateSettings() {}

}

class Update_231130_1 extends FalloutUpdateBase {

	static version = 231130.1;

	async updateActor(actorData) {
		// These values are either unnused, dynamically calculated or created
		// by item pollution
		//
		const updateData = {
			"system.-=quantity": null,
			"system.defense.-=base": null,
			"system.defense.-=mod": null,
			"system.health.-=max": null,
			"system.health.-=min": null,
			"system.health.-=mod": null,
			"system.initiative.-=base": null,
			"system.initiative.-=mod": null,
			"system.level.-=nextLevelXP": null,
			"system.meleeDamage.-=base": null,
			"system.meleeDamage.-=mod": null,
		};

		// This information is no longer needed
		//
		const bodyParts = ["armL", "armR", "head", "legL", "legR", "torso"];
		for (const bodyPart of bodyParts) {
			updateData[`system.body_parts.${bodyPart}.-=hit`] = null;
		}

		// Make sure caps is stored as an Integer
		//
		let caps = parseInt(actorData.system.currency.caps);
		caps = isNaN(caps) ? 0 : caps;

		updateData["system.currency.caps"] = caps;

		return updateData;
	}

	async updateItem(itemData, actorData) {
		if (itemData.type !== "ammo") {
			return;
		}

		const updateData = {
			"system.-=type": null,
		};

		return updateData;
	}
}

class Update_231230_1 extends FalloutUpdateBase {

	static version = 231230.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "consumable") {
			return;
		}

		let newAddictive = itemData.system.addictive !== ""
			? parseInt(itemData.system.addictive)
			: 0;

		if (isNaN(newAddictive)) {
			newAddictive = 0;

			let message;
			if (actorData) {
				message = game.i18n.format(
					"Failed to update addictive value '{value}' for Item '{itemName}' owned by Actor '{actorName}'. You will need to update this item manually.",
					{
						value: itemData.system.addictive,
						itemName: itemData.name,
						actorName: actorData.name,
					}
				);
			}
			else {
				message = game.i18n.format(
					"Failed to update addictive value '{value}' for Item '{itemName}'. You will need to update this item manually.",
					{
						value: itemData.system.addictive,
						itemName: itemData.name,
					}
				);
			}

			ui.notifications.warn(message, {permanent: true});
		}

		const updateData = {
			"system.addictive": newAddictive,
		};

		return updateData;
	}
}

class Update_231231_1 extends FalloutUpdateBase {

	static version = 231231.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "consumable") {
			return;
		}

		const addiction = itemData.system.addictive ?? 0;
		const addictive = addiction > 0 ? true : false;

		const updateData = {
			"system.addiction": addiction,
			"system.addictive": addictive,
		};

		return updateData;
	}
}

class Update_240105_1 extends FalloutUpdateBase {

	static version = 240105.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "consumable") {
			return;
		}

		const updateData = {};

		let duration = itemData.system.duration;

		// Make an attempt to sanitize any input, as long as the name matches
		// somewhere (case insensite), then we'll use that, otherwise we'll
		// default to "instant" the same as the template
		//
		if (duration.match(/instant/i)) {
			updateData["system.duration"] = "instant";
		}
		else if (duration.match(/brief/i)) {
			updateData["system.duration"] = "brief";
		}
		else if (duration.match(/lasting/i)) {
			updateData["system.duration"] = "lasting";
		}
		else {
			updateData["system.duration"] = "instant";
		}

		return updateData;
	}
}

// Dummy update due to issues with initial migrations
class Update_240112_1 extends FalloutUpdateBase {
	static version = 240112.1;
}

class Update_240114_1 extends FalloutUpdateBase {

	static version = 240114.1;

	async updateActor(actorData) {
		if (actorData.type !== "settlement") {
			return;
		}

		const settlement = game.actors.find(a => a._id === "Sqm5Z8qgg9y8iXZk");

		for (const settler of actorData.system.settlers) {
			const actorUuid = settler.actorUuid;
			const action = settler.action ?? "unnasigned";

			// Make sure the actor exists
			const actor = await fromUuid(actorUuid);

			if (actor) {
				actor.update({
					"system.settlement.action": action,
					"system.settlement.uuid": settlement.uuid,
				});
			}
			else {
				game.i18n.format("FALLOUT.Actor.Warnings.NpcMissing", {
					uuid: settler.actorUuid,
					settlementName: settlement.name,
				});
			}
		}

		const updateData = {
			"system.-=settlers": null,
		};

		return updateData;
	}

}

class Update_240104_1 extends FalloutUpdateBase {

	static version = 240104.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon") {
			return;
		}

		const updateData = {};

		for (const key in CONFIG.FALLOUT.DAMAGE_EFFECTS) {
			updateData[`system.damage.damageEffect.${key}.-=description`] = null;
			updateData[`system.damage.damageEffect.${key}.-=label`] = null;
		}

		return updateData;
	}
}

class Update_240217_1 extends FalloutUpdateBase {

	static version = 240217.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon") {
			return;
		}

		const updateData = {};

		for (const key in itemData.system.damage.weaponQuality) {
			updateData[`system.damage.weaponQuality.${key}.-=description`] = null;
			updateData[`system.damage.weaponQuality.${key}.-=label`] = null;
		}

		return updateData;
	}
}

class Update_240217_2 extends FalloutUpdateBase {

	static version = 240217.2;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon") {
			return;
		}

		const updateData = {};

		for (const key in itemData.system.damage.weaponQuality) {
			const value = itemData.system.damage.weaponQuality[key].value;

			switch (key) {
				case "closeQuarters":
					updateData[`system.damage.weaponQuality.-=${key}`] = null;
					updateData["system.damage.weaponQuality.close_quarters"] = {
						value,
					};
					break;
				case "nightVision":
					updateData[`system.damage.weaponQuality.-=${key}`] = null;
					updateData["system.damage.weaponQuality.night_vision"] = {
						value,
					};
					break;
				case "twoHanded":
					updateData[`system.damage.weaponQuality.-=${key}`] = null;
					updateData["system.damage.weaponQuality.two_handed"] = {
						value,
					};
					break;
			}
		}

		return updateData;
	}
}

class Update_240217_3 extends FalloutUpdateBase {

	static version = 240217.3;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon") {
			return;
		}

		const updateData = {};

		for (const key in itemData.system.damage.damageEffect) {
			const value = itemData.system.damage.damageEffect[key].value;
			let rank =  itemData.system.damage.damageEffect[key].rank;
			rank = rank >= 0 ? rank : 0;

			switch (key) {
				case "piercing":
					updateData[`system.damage.damageEffect.-=${key}`] = null;
					updateData["system.damage.damageEffect.piercing_x"] = {
						rank,
						value,
					};
					break;
				default:
					updateData[`system.damage.damageEffect.${key}.-=description`] = null;
					updateData[`system.damage.damageEffect.${key}.-=hasRanks`] = null;
					updateData[`system.damage.damageEffect.${key}.-=label`] = null;
			}
		}

		return updateData;
	}
}

class Update_240217_4 extends FalloutUpdateBase {

	static version = 240217.4;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon") {
			return;
		}

		const badQualities = [
			"arc",
			"breaking",
			"burst",
			"freeze",
			"persistent",
			"piercing_x",
			"radioactive",
			"spread",
			"stun",
			"vicious",
		];

		const updateData = {};

		for (const key of badQualities) {
			updateData[`system.damage.weaponQuality.-=${key}`] = null;
		}

		return updateData;
	}
}

class Update_240217_5 extends FalloutUpdateBase {

	static version = 240217.5;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "consumable") {
			return;
		}

		let thirstReduction = itemData.system.thirstReduction;

		if (itemData.system.consumableType === "beverage") {
			if (thirstReduction < 1) {
				thirstReduction = 1;
			}
		}
		else {
			thirstReduction = 0;
		}

		const updateData = {
			"system.thirstReduction": thirstReduction,
		};

		return updateData;
	}
}

class Update_240218_1 extends FalloutUpdateBase {

	static version = 240218.1;

	async updateItem(itemData, actorData) {
		if (!itemData.system.hasOwnProperty("cost")) {
			return;
		}

		let parsedInt = parseInt(itemData.system.cost);
		parsedInt = isNaN(parsedInt) ? 0 : parsedInt;

		const updateData = {
			"system.cost": parsedInt,
		};

		return updateData;
	}
}

class Update_240218_2 extends FalloutUpdateBase {

	static version = 240218.2;

	async updateActor(actorData) {
		if (!["creature", "npc"].includes(actorData.type)) {
			return;
		}

		const updateData = {};

		const level = actorData.system.level?.value ?? 0;
		const currentXP = actorData.system.level?.currentXP;

		let categories;
		if (actorData.type === "creature") {
			categories = ["normal", "mighty", "legendary"];
		}
		else {
			categories = ["normal", "notable", "major"];
		}

		let newCategory = "";
		for (const category of categories) {
			const expectedXP = fallout.utils.calculateXpReward(level, category);
			if (currentXP === expectedXP) {
				newCategory = category;
				break;
			}
		}

		if (newCategory === "") {
			newCategory = "normal";
			ui.notifications.warn(
				game.i18n.format(
					"Failed to derive the category of level {level} {type} named '{name}' with an XP reward value of '{xp}'. Setting to category 'normal'",
					{
						level,
						type: actorData.type,
						name: actorData.name,
						xp: currentXP,
					}
				),
				{permanent: true}
			);
		}

		updateData["system.category"] = newCategory;

		return updateData;
	}

}

class Update_240302_1 extends FalloutUpdateBase {

	static version = 240302.1;

	async updateActor(actorData) {
		if (actorData.type !== "character") {
			return;
		}

		const currentWorldTime = game.time.worldTime;

		const hunger = parseInt(actorData.system.conditions.hunger) ?? 0;
		const sleep = parseInt(actorData.system.conditions.sleep) ?? 0;
		const thirst = parseInt(actorData.system.conditions.thirst) ?? 0;

		const updateData = {
			"system.conditions.hunger": hunger,
			"system.conditions.lastChanged.hunger": currentWorldTime,
			"system.conditions.lastChanged.sleep": currentWorldTime,
			"system.conditions.lastChanged.thirst": currentWorldTime,
			"system.conditions.sleep": sleep,
			"system.conditions.thirst": thirst,
		};

		return updateData;
	}
}

class Update_240309_1 extends FalloutUpdateBase {

	static version = 240309.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon") {
			return;
		}
		if (itemData.system.ammo === "") {
			return;
		}

		const ammo = await fallout.compendiums.ammo();

		const ammoUuid = ammo.find(
			a => a.name === itemData.system.ammo
		)?.uuid ?? "";

		if (ammoUuid === "") {
			const updateData = {};

			const suffix = `is configured with ammo type '${itemData.system.ammo}' which doesn't exist within a compendium.`;

			let message;
			if (actorData) {
				message = `Weapon '${itemData.name}' belonging to '${actorData.name}' ${suffix}`;
			}
			else {
				message = `Weapon '${itemData.name}' ${suffix}`;
			}

			ui.notifications.warn(message, {permanent: true});

			updateData["system.ammo"] = "";

			return updateData;
		}
	}
}

class Update_240311_1 extends FalloutUpdateBase {

	static version = 240311.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "ammo") {
			return;
		}
		if (itemData.system.quantityRoll !== "") {
			return;
		}

		const ammoMap = {
			".308 Round": "6+3dc",
			".38 Round": "10+5dc",
			".44 Magnum Round": "4+2dc",
			".45 Round": "8+4dc",
			".50 Round": "4+2dc",
			"10mm Round": "8+4dc",
			"2mm Electromagnetic Cartridge": "6+3dc",
			"5.56mm Round": "8+4dc",
			"5mm Round": "10*12+6dc",
			"Baseball Grenade": "1",
			"Bottlecap Mine": "1",
			"Flamer Fuel": "12+6dc",
			"Flare": "2+1dc",
			"Frag Grenade": "1",
			"Frag Mine": "1",
			"Fusion Cell": "14+7dc",
			"Fusion Core": "1",
			"Gamma Round": "4+2dc",
			"Javelin": "1",
			"Mini-Nuke": "1+1dc",
			"Missile": "2+1dc",
			"Molotov Cocktail": "1",
			"Nuka Grenade": "1",
			"Nuke Mine": "1",
			"Plasma Cartridge": "10+5dc",
			"Plasma Grenade": "1",
			"Plasma Mine": "1",
			"Pulse Grenade": "1",
			"Pulse Mine": "1",
			"Railway Spike": "6+3dc",
			"Shotgun Shell": "6+3dc",
			"Syringer Ammo": "4+2dc",
			"Throwing Knife": "1",
			"Tomahawk": "1",
		};

		const updateData = {};

		const newFormula = ammoMap[itemData.name];

		if (newFormula) {
			updateData["system.quantityRoll"] = newFormula;
		}

		return updateData;
	}
}

class Update_240316_1 extends FalloutUpdateBase {

	static version = 240316.1;

	async updateActor(actorData) {
		if (!["creature", "npc"].includes(actorData.type)) {
			return;
		}

		let poisonResistance = actorData.system?.resistance?.poison?.value;
		if (poisonResistance === undefined) {
			poisonResistance = 0;
		}

		const validResistance = parseInt(poisonResistance);

		const updateData = {};

		if (isNaN(validResistance)) {
			ui.notifications.warn(
				`Unable to migrate the poison resistance '${poisonResistance}' of Actor '${actorData.name}', this will need to be done manually.`,
				{permanent: true}
			);
		}
		else {
			for (const bodyPart in CONFIG.FALLOUT.BODY_VALUES) {
				updateData[`system.body_parts.${bodyPart}.resistance.poison`] = validResistance;
			}
		}

		return updateData;
	}
}

class Update_240425_1 extends FalloutUpdateBase {

	static version = 240425.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon") {
			return;
		}
		if (itemData.system.weaponType !== "creatureAttack") {
			return;
		}

		const updateData = {
			"system.attribute": "",
			"system.creatureAttribute": itemData.system.attribute,
			"system.creatureSkill": itemData.system.skill,
			"system.skill": "",
			"system.weaponType": "",
		};

		return updateData;
	}
}

class Update_240425_2 extends FalloutUpdateBase {

	static version = 240425.2;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon") {
			return;
		}

		const updateData = {};

		if (itemData.system.creatureAttribute === "") {
			updateData["system.creatureAttribute"] =
				CONFIG.FALLOUT.DEFAULT_CREATURE_WEAPON_ATTRIBUTE[
					itemData.system.weaponType
				];
		}

		if (itemData.system.creatureSkill === "") {
			updateData["system.creatureSkill"] =
				CONFIG.FALLOUT.DEFAULT_CREATURE_WEAPON_SKILL[
					itemData.system.weaponType
				];
		}

		return updateData;
	}
}

class Update_240426_1 extends FalloutUpdateBase {

	static version = 240426.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "apparel") {
			return;
		}

		const updateData = {
			"system.-=armorType": null,
			"system.-=appareltype": null,
			"system.apparelType": itemData.system.appareltype,
		};

		return updateData;
	}
}

class Update_240426_2 extends FalloutUpdateBase {

	static version = 240426.2;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "robot_armor") {
			return;
		}

		const updateData = {
			"system.-=appareltype": null,
			"system.apparelType": itemData.system.appareltype,
		};

		return updateData;
	}
}

class Update_240510_1 extends FalloutUpdateBase {

	static version = 240510.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon") {
			return;
		}

		let newTear = Number(itemData.system.tear ?? "");

		if (isNaN(newTear)) {
			newTear = 1;
		}

		const updateData = {
			"system.tear": newTear,
		};

		return updateData;
	}
}

class Update_240511_1 extends FalloutUpdateBase {

	static version = 240511.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "apparel") {
			return;
		}

		const updateData = {
			"system.-=damaged": null,
			"system.-=powered": null,
			"system.-=powerStr": null,
			"system.-=powerSystems": null,
			"system.-=special": null,
			"system.powerArmor.powered": itemData.system.powered ?? false,
		};

		return updateData;
	}
}

class Update_240511_2 extends FalloutUpdateBase {

	static version = 240511.2;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "apparel") {
			return;
		}

		const updateData = {
			"system.powerArmor.-=attachedItems": null,
		};

		return updateData;
	}
}

class Update_240930_1 extends FalloutUpdateBase {

	static version = 240930.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "robot_armor") {
			return;
		}

		const updateData = {
			"system.-=mods": null,
		};

		return updateData;
	}
}

class Update_241212_1 extends FalloutUpdateBase {

	static version = 241212.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "perk") {
			return;
		}

		// Nothing needs doing
		if (itemData.system.requirements === "") {
			return;
		}

		const legacyRequirements =
			`\n<p><strong>Requirements</strong>: ${itemData.system.requirements}</p>`;

		const newDescription = itemData.system.description + legacyRequirements;

		const updateData = {
			"system.description": newDescription,
			"system.requirements": "",
		};

		return updateData;
	}
}

class Update_241218_1 extends FalloutUpdateBase {

	static version = 241218.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "books_and_magz") {
			return;
		}

		const updateData = {
			"system.-=issue": null,
			"system.-=learned": null,
			"system.-=perk": null,
			"system.read": itemData.system.learned ?? false,
		};

		return updateData;
	}
}

class Update_241225_1 extends FalloutUpdateBase {

	static version = 241225.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon_mod") {
			return;
		}

		const effect = itemData.system.effect;
		const perks = itemData.system.perks;
		let tmpModType = itemData.system.modType;
		let modType = "";

		// Attempt to match mod type.
		if (tmpModType.toLowerCase() in CONFIG.FALLOUT.WEAPON_MOD_TYPES) {
			modType = tmpModType.toLowerCase();
		}
		else {
			tmpModType = tmpModType.toLowerCase().replace(" mod", "");
			if (tmpModType.toLowerCase() in CONFIG.FALLOUT.WEAPON_MOD_TYPES) {
				modType = tmpModType.toLowerCase();
			}
		}

		const updateData = {
			"system.crafting.perks": perks,
			"system.-=perks": null,
			"system.modEffects.effect": effect,
			"system.-=effect": null,
			"system.modType": modType,
			"system.-=canBeScrapped": null,
			"system.-=isJunk": null,
			"system.modEffects.damage.damageEffect.-=undefined": null,
		};

		return updateData;
	}
}

class Update_250103_1 extends FalloutUpdateBase {

	static version = 250103.1;

	async updateItem(itemData, actorData) {

		if (itemData.type !== "weapon") {
			return;
		}

		const updateData = {};

		// Damage Effects
		for (const key in itemData.system.damage?.damageEffect) {
			const value = itemData.system.damage?.damageEffect[key]?.value ?? false;

			if (Number.isInteger(value)) {
				continue;
			}

			const newValue = value === true ? 1 : 0;

			updateData[`system.damage.damageEffect.${key}.value`] = newValue;
		}

		// Weapon Qualities
		for (const key in itemData.system.damage?.weaponQuality) {
			const value = itemData.system.damage?.weaponQuality[key]?.value;

			if (Number.isInteger(value)) {
				continue;
			}

			const newValue = value === true ? 1 : 0;

			updateData[`system.damage.weaponQuality.${key}.value`] = newValue;
		}

		return updateData;
	}
}

class Update_250424_1 extends FalloutUpdateBase {

	static version = 250424.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "consumable"
			|| itemData.system.consumableType !== "beverage"
		) {
			return;
		}

		const updateData = {};

		const beveragesThatProvideCaps = [
			"Beer",
			"Nuka-Cherry",
			"Nuka-Cola Quantum",
			"Nuka-Cola",
		];

		if (beveragesThatProvideCaps.includes(itemData.name)) {
			updateData["system.providesCap"] = true;
		}

		return updateData;
	}
}

class Update_250426_1 extends FalloutUpdateBase {

	static version = 250426.1;

	async updateItem(itemData, actorData) {
		// Only attempt to upgrade Perk items owned by Actors
		if (itemData.type !== "perk" || !actorData) {
			return;
		}

		const allPerks = await fallout.compendiums.perks(false);

		// see if we can find compendium version of perk with the same name
		const newPerk = allPerks.find(perk => perk.name === itemData.name);

		const updateData = {};

		if (newPerk) {
			updateData["system.requirementsEx"] = newPerk.system.requirementsEx;
		}
		else {
			ui.notifications.warn(
				`Failed to update Perk '${itemData.name}' belonging to Actor '${actorData.name}'. Unable find appropriate Perk in compendium; this Perk's requirements will need to be updated manually.`,
				{ permanent: true }
			);
		}

		return updateData;
	}

}

class Update_250430_1 extends FalloutUpdateBase {

	static version = 250430.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "ammo") {
			return;
		}

		const updateData = {
			"system.-=multishot": null,
		};

		if (itemData.name.match(/fusion\s+core/i)) {
			updateData["system.fusionCore"] = true;

			if (actorData) {
				const skill = actorData.items.find(
					item => item.type === "skill" && item.name.match(/science/i)
				);

				if (skill) {
					const science = skill.system.value;

					updateData["system.charges.max"] = 10 + science;
					updateData["system.shots.max"] = (10 + science) * 50;
					updateData["system.charges.current"] = Math.ceil(
						itemData.system.shots.current / 50
					);
				}
			}
		}

		return updateData;
	}

}

class Update_250501_1 extends FalloutUpdateBase {

	static version = 250501.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon") {
			return;
		}

		const weaponQualities = itemData.system?.damage?.weaponQuality ?? {};
		const isGatling = weaponQualities.gatling?.value > 0;

		if (!isGatling) {
			return;
		}

		const updateData = {
			"system.ammoPerShot": 10,
		};

		return updateData;
	}

}

class Update_260111_1 extends FalloutUpdateBase {

	static version = 260111.1;

	async updateItem(itemData, actorData) {
		if (itemData.type !== "ammo") {
			return;
		}

		const updateData = {};

		updateData["system.charges.current"] =
			Number.isInteger(itemData?.system?.charges?.current ?? undefined)
				? itemData.system.charges.current
				: 0;

		updateData["system.charges.max"] =
			Number.isInteger(itemData?.system?.charges?.max ?? undefined)
				? itemData.system.charges.max
				: 0;

		updateData["system.shots.current"] =
			Number.isInteger(itemData?.system?.shots?.current ?? undefined)
				? itemData.system.shots.current
				: 1;

		updateData["system.shots.max"] =
			Number.isInteger(itemData?.system?.shots?.max ?? undefined)
				? itemData.system.shots.max
				: 1;

		return updateData;
	}

}

class Update_260119_1 extends FalloutUpdateBase {

	static version = 260119.1;


	async updateItem(itemData, actorData) {
		if (itemData.type !== "weapon") {
			return;
		}

		const weaponsToUpdate = {
			"baseball-grenade": 1,
			"bottlecap-mine": 0.5,
			"frag-grenade": 0.5,
			"frag-mine": 0.5,
			"javelin": 4,
			"molotov-cocktail": 0.5,
			"nuka-grenade": 0.5,
			"nuke-mine": 0.5,
			"plasma-grenade": 0.5,
			"plasma-mine": 0.5,
			"pulse-grenade": 0.5,
			"pulse-mine": 0.5,
			"throwing-knives": 0.5,
			"tomahawk": 0.5,
		};

		const weaponSlug = itemData.name.slugify();
		const weaponWeight = weaponsToUpdate[weaponSlug];

		if (!weaponWeight) {
			return;
		}

		const updateData = {
			"system.ammo": "",
			"system.consumedOnUse": true,
			"system.weight": weaponWeight,
		};

		if (actorData) {
			const actor = game.actors.find(a => a._id === actorData._id);

			let quantity = 0;
			const migratedItems = [];
			for (const item of actor.items) {
				if (item.name.slugify() === weaponSlug && item.type === "ammo") {
					quantity += parseInt(item.system.quantity);

					if (!updateData["system.quantityRoll"]) {
						updateData["system.quantityRoll"] = item.system.quantityRoll;
					}

					migratedItems.push(item._id);
				}
			}

			updateData["system.quantity"] = quantity;
			actor.deleteEmbeddedDocuments("Item", migratedItems);
		}

		return updateData;
	}

}

var migrations = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Update_231130_1: Update_231130_1,
	Update_231230_1: Update_231230_1,
	Update_231231_1: Update_231231_1,
	Update_240105_1: Update_240105_1,
	Update_240112_1: Update_240112_1,
	Update_240114_1: Update_240114_1,
	Update_240204_1: Update_240104_1,
	Update_240217_1: Update_240217_1,
	Update_240217_2: Update_240217_2,
	Update_240217_3: Update_240217_3,
	Update_240217_4: Update_240217_4,
	Update_240217_5: Update_240217_5,
	Update_240218_1: Update_240218_1,
	Update_240218_2: Update_240218_2,
	Update_240302_1: Update_240302_1,
	Update_240309_1: Update_240309_1,
	Update_240311_1: Update_240311_1,
	Update_240316_1: Update_240316_1,
	Update_240425_1: Update_240425_1,
	Update_240425_2: Update_240425_2,
	Update_240426_1: Update_240426_1,
	Update_240426_2: Update_240426_2,
	Update_240510_1: Update_240510_1,
	Update_240511_1: Update_240511_1,
	Update_240511_2: Update_240511_2,
	Update_240930_1: Update_240930_1,
	Update_241212_1: Update_241212_1,
	Update_241218_1: Update_241218_1,
	Update_241225_1: Update_241225_1,
	Update_250103_1: Update_250103_1,
	Update_250424_1: Update_250424_1,
	Update_250426_1: Update_250426_1,
	Update_250430_1: Update_250430_1,
	Update_250501_1: Update_250501_1,
	Update_260111_1: Update_260111_1,
	Update_260119_1: Update_260119_1
});

class FalloutMigrationRunner {
	allMigrations;

	currentMigrationTask;

	latestVersion = 0;

	async buildMigrations() {
		const unsortedMigrations = [];

		for (const migration in migrations) {
			const migrationVersion = migrations[migration].version;

			this.latestVersion = migrationVersion > this.latestVersion
				? migrationVersion
				: this.latestVersion;

			if (migrationVersion > this.currentVersion) {
				unsortedMigrations.push(new migrations[migration]());
			}
		}

		this.allMigrations = unsortedMigrations.sort((a, b) => {
			return a.version - b.version;
		});
	}

	get currentVersion() {
		return game.settings.get(SYSTEM_ID$1, "worldSchemaVersion");
	}

	async migrateCompendium(pack) {
		const documentName = pack.documentName;

		if (!["Actor", "Item"].includes(documentName)) {
			return;
		}

		// Unlock the pack for editing
		const wasLocked = pack.locked;
		await pack.configure({locked: false});

		// Begin by requesting service-side migration
		await pack.migrate();
		const documents = await pack.getDocuments();

		// Iterate over compendium entries - apply migration functions
		for (let doc of documents) {
			let updateData = {};
			try {
				const objectData = doc.toObject();
				switch (documentName) {
					case "Actor":
						updateData = await this.currentMigrationTask.updateActor(objectData);
						break;
					case "Item":
						updateData = await this.currentMigrationTask.updateItem(objectData);
						break;
				}

				// Save the entry if data was updated
				if (foundry.utils.isEmpty(updateData)) {
					continue;
				}

				await doc.update(updateData);

				fallout.log(`Migrated ${documentName} document "${doc.name}" in Compendium "${pack.collection}"`);
			}
			catch(err) {
				err.message = `Failed system migration for document "${doc.name}" in pack "${pack.collection}": ${err.message}`;
				console.error(err);
			}
		}

		// Apply the original locked status for the pack
		await pack.configure({locked: wasLocked});

		fallout.log(`Migrated all "${documentName}" documents from Compendium "${pack.collection}"`);
	}

	async migrateSceneTokens(scene) {
		for (const token of scene.tokens) {
			try {
				// if the token is linked or has no actor, we don"t need to do anything
				if (token.actorLink || !game.actors.has(token.actorId)) {
					continue;
				}

				const actorData = foundry.utils.duplicate(game.actors.get(token.actorId));

				const delta = token.delta;

				if (delta?.system) {
					actorData.system = foundry.utils.mergeObject(
						actorData.system,
						delta.system,
						{inplace: false}
					);
				}

				const updateData = await this.currentMigrationTask.updateActor(actorData);

				if (!foundry.utils.isEmpty(updateData)) {
					fallout.log(`Migrating Token document "${token.name}"`);

					updateData._id = token.id;

					await scene.updateEmbeddedDocuments(
						"Token",
						[updateData],
						{enforceTypes: false}
					);
				}
			}
			catch(err) {
				err.message = `Failed system migration for Token "${token.name}": ${err.message}`;
				fallout.error(err);
			}
		}
	}

	async migrateSettings() {
		await this.currentMigrationTask.updateSettings();
	}

	get migrateSystemCompendiumsDisabled() {
		return !this.migrateSystemCompendiumsEnabled;
	}

	get migrateSystemCompendiumsEnabled() {
		return game.settings.get(SYSTEM_ID$1, "migrateSystemCompendiums");
	}

	async migrateWorldCompendiums() {
		for (let pack of game.packs) {
			// Don't migrate system packs unless the proper debug setting is
			// enabled
			//
			if (this.migrateSystemCompendiumsDisabled) {
				if (pack.metadata.packageType === "system") {
					continue;
				}
			}

			await this.migrateCompendium(pack);
		}
	}

	async migrateWorldActors() {
		const actors = game.actors.map(a => [a, true])
			.concat(Array.from(game.actors.invalidDocumentIds).map(
				id => [game.actors.getInvalid(id), false]
			));

		for (const [actor, valid] of actors) {
			try {
				const actorSource = valid
					? actor.toObject()
					: game.actors.find(a => a._id === actor.id);

				const updateData = await this.currentMigrationTask.updateActor(actorSource);

				if (!foundry.utils.isEmpty(updateData)) {
					fallout.log(`Migrating Actor document "${actor.name}"`);
					await actor.update(updateData);
				}

				const items = actor.items.map(a => [a, true])
					.concat(Array.from(actor.items.invalidDocumentIds).map(
						id => [actor.items.getInvalid(id), false]
					));

				for (const [item, validItem] of items) {
					const itemSource = validItem
						? item.toObject()
						: actor.items.find(a => a._id === item.id);

					const updateData = await this.currentMigrationTask.updateItem(
						itemSource,
						actorSource
					);

					if (!foundry.utils.isEmpty(updateData)) {
						fallout.log(`Migrating Actor Item document "${item.name}"`);
						await item.update(updateData);
					}
				}
			}
			catch(err) {
				err.message = `Failed system migration for Actor "${actor.name}": ${err.message}`;
				console.error(err);
			}
		}
	}

	async migrateWorldItems() {
		const items = game.items.map(a => [a, true])
			.concat(Array.from(game.items.invalidDocumentIds).map(
				id => [game.items.getInvalid(id), false]
			));

		for (const [item, valid] of items) {
			try {
				const source = valid
					? item.toObject()
					: game.items.find(a => a._id === item.id);

				const updateData = await this.currentMigrationTask.updateItem(source);

				if (!foundry.utils.isEmpty(updateData)) {
					fallout.log(`Migrating Item document "${item.name}"`);
					item.update(updateData);
				}
			}
			catch(err) {
				err.message = `Failed system migration for Item "${item.name}": ${err.message}`;
				console.error(err);
			}
		}
	}

	async migrateWorldScenes() {
		for (const scene of game.scenes) {
			await this.migrateSceneTokens(scene);
		}
	}

	async migrateWorld() {
		const version = this.currentMigrationTask.version;

		const startMessage = game.i18n.format("FALLOUT.MIGRATION.begin_schema", {version});

		fallout.log(startMessage);
		ui.notifications.info(startMessage, {permanent: false});

		await this.migrateSettings();
		await this.migrateWorldActors();
		await this.migrateWorldItems();
		await this.migrateWorldScenes();
		await this.migrateWorldCompendiums();

		fallout.log(
			game.i18n.format("FALLOUT.MIGRATION.completed_schema", {version})
		);
	}

	needsMigration() {
		return this.latestVersion > this.currentVersion;
	}

	async run() {
		fallout.log(`Current schema version ${this.currentVersion}`);

		await this.buildMigrations();

		// If this is a brand new world then we don't need to do any migrations.
		//
		if (game.world.playtime === 0) {
			fallout.log(`Setting new world schema version to ${this.latestVersion}`);

			await game.settings.set(
				SYSTEM_ID$1, "worldSchemaVersion",
				this.latestVersion
			);
		}

		if (!this.needsMigration()) {
			return;
		}

		const startMessage = game.i18n.localize("FALLOUT.MIGRATION.begin_migration");

		fallout.log(startMessage);
		ui.notifications.info(startMessage, {permanent: false});

		for (const migration of this.allMigrations) {
			if (this.currentVersion < migration.version) {
				this.currentMigrationTask = migration;

				await this.migrateWorld();

				await game.settings.set(SYSTEM_ID$1, "worldSchemaVersion", migration.version);
			}
		}

		const endMessage = game.i18n.localize("FALLOUT.MIGRATION.completed_migration");

		fallout.log(endMessage);
		ui.notifications.info(endMessage, {permanent: false});
	}
}

const readyHook = {
	attach: () => {
		fallout.debug("Attaching ready hook");

		Hooks.once("ready", async () => {
			fallout.debug("Running ready hook");

			if (game.user.isGM) {
				await new FalloutMigrationRunner().run();
			}

			fallout.APTrackerV2.initialise();
			fallout.utils.showNewReleaseNotes();
		});
	},
};

class FalloutChat {

	static async _renderChatMessage(
		actor,
		data,
		template,
		mode
	) {
		const html = await foundry.applications.handlebars.renderTemplate(template, data);

		if (!mode) {
			mode = game.settings.get("core", "rollMode");
		}

		const messageStyles = fallout.utils.getMessageStyles();

		const chatData = {
			user: game.user.id,
			speaker: ChatMessage.getSpeaker({
				actor: actor,
			}),
			rollMode: mode,
			content: html,
			type: messageStyles.OTHER,
		};

		ChatMessage.applyRollMode(chatData, mode);

		await ChatMessage.create(chatData);
	}

	static async renderGeneralMessage(actor, data, mode) {
		this._renderChatMessage(actor, data,
			"systems/fallout/templates/chat/general.hbs",
			mode
		);
	}

	static async renderConditionChangeMessage(actor, data, mode) {
		this._renderChatMessage(actor, data,
			"systems/fallout/templates/chat/condition-change.hbs",
			mode
		);
	}

	static async renderConsumptionMessage(actor, data, mode) {
		this._renderChatMessage(actor, data,
			"systems/fallout/templates/chat/consumption.hbs",
			mode
		);
	}

	static async renderPartySleepMessage(data, mode) {
		this._renderChatMessage(null, data,
			"systems/fallout/templates/chat/party-sleep.hbs",
			mode
		);
	}

	static async renderReadMagazineMessage(actor, data, mode) {
		this._renderChatMessage(actor, data,
			"systems/fallout/templates/chat/read-magazine.hbs",
			mode
		);
	}

	static async renderResetLuckPointsMessage(data, mode) {
		this._renderChatMessage(null, data,
			"systems/fallout/templates/chat/reset-luck-points.hbs",
			mode
		);
	}

	static async onRenderChatMessageHTML(message, html, context) {
		fallout.debug("Running renderChatMessage hook");

		html.querySelectorAll(".reroll-button").forEach(element => {
			element.addEventListener("click", async event => {
				const rerollIndex = [];

				const selectedDice = html.querySelectorAll(".dice-selected");
				for (const die of selectedDice) {
					rerollIndex.push(die.dataset.index);
				}

				if (!rerollIndex.length) {
					return ui.notifications.notify(
						"Select Dice you want to Reroll"
					);
				}

				let falloutRoll = message.flags.falloutroll;

				if (falloutRoll.diceFace === "d20") {
					fallout.Roller2D20.rerollD20({
						complicationTreshold: falloutRoll.complicationTreshold,
						critTreshold: falloutRoll.critTreshold,
						dicesRolled: falloutRoll.dicesRolled,
						rerollIndexes: rerollIndex,
						rollname: falloutRoll.rollname,
						successTreshold: falloutRoll.successTreshold,
					});
				}
				else if (falloutRoll.diceFace === "d6") {
					let weapon = message.flags.weapon;
					if (message.flags.weapon) {
						weapon = await fromUuid(message.flags.weapon.uuid);
					}

					fallout.Roller2D20.rerollD6({
						actor: message.flags.actor,
						dicesRolled: falloutRoll.dicesRolled,
						rerollIndexes: rerollIndex,
						rollname: falloutRoll.rollname,
						weapon,
					});
				}
				else {
					ui.notifications.notify("No dice face recognised");
				}

			});
		});

		html.querySelectorAll(".dice-icon").forEach(element => {
			element.addEventListener("click", async event => {
				const target = event.currentTarget;
				if (target.classList.contains("dice-selected")) {
					target.classList.remove("dice-selected");
				}
				else {
					target.classList.add("dice-selected");
				}
			});
		});

		html.querySelectorAll(".add-button").forEach(element => {
			element.setAttribute("data-messageId", message.id);

			element.addEventListener("click", ev => {
				const actor = message.flags.actor;
				const falloutRoll = message.flags.falloutroll;
				const weapon = message.flags.weapon;

				fallout.DialogD6.createDialog({
					rollname: falloutRoll.rollname,
					diceNum: 1,
					falloutRoll: falloutRoll,
					weapon: weapon,
					actor: actor.actor,
				});
			});
		});
	}
}

const renderChatMessageHTMLHook = {
	attach: () => {
		fallout.debug("Attaching renderChatMessageHTML hook");

		Hooks.on("renderChatMessageHTML", FalloutChat.onRenderChatMessageHTML);
	},
};

const settlementActorUpdateHooks = {

	attach: () => {
		fallout.debug("Attaching settlementActorUpdateHooks hook");

		Hooks.on("deleteActor", async (actor, options, userId) => {
			fallout.debug("Running settlementActorUpdateHooks::deleteActor hook");

			FalloutActor.updateLinkedSettlementSheets(actor, options, userId);
		});
	},
};

const setupHook = {
	attach: () => {
		Hooks.once("setup", () => {

			fallout.moduleArt.registerModuleArt();

			// Go through the CONFIG object and attempt to localize any Strings
			// up front
			for (const obj in CONFIG.FALLOUT) {
				if ({}.hasOwnProperty.call(CONFIG.FALLOUT, obj)) {
					for (const el in CONFIG.FALLOUT[obj]) {
						if ({}.hasOwnProperty.call(CONFIG.FALLOUT[obj], el)) {
							if (typeof CONFIG.FALLOUT[obj][el] === "string") {
								CONFIG.FALLOUT[obj][el] = game.i18n.localize(
									CONFIG.FALLOUT[obj][el]
								);
							}
						}
					}
				}
			}

			generateEnrichedTooltips();
			discoverAvailableAmmoTypes();
		});
	},
};

const FalloutHooks = {
	attach: () => {
		fallout.debug("Attaching hooks");

		const listeners = [
			conditionTrackerHook,
			diceSoNiceReadyHook,
			getChatLogEntryContextHook,
			hotbarDropHook,
			initiativeHooks,
			itemPilesReadyHook,
			preCreateItemHook,
			readyHook,
			renderChatMessageHTMLHook,
			settlementActorUpdateHooks,
			setupHook,
		];

		for (const listener of listeners) {
			listener.attach();
		}
	},
};

class FalloutModuleArt {
	constructor() {
		/**
		 * The stored map of item UUIDs to their art information.
		 * @type {Map<string, ModuleArtInfo>}
		 */
		Object.defineProperty(this, "map", {value: new Map(), writable: false});
	}

	/* -------------------------------------------- */

	/**
	 * Set to true to temporarily prevent actors from loading module art.
	 * @type {boolean}
	 */
	suppressArt = false;

	static getModuleArtPath(module) {
		const flags = module.flags?.[module.id];
		const artPath = flags?.["fallout-art"];
		if (!artPath || !module.active) {
			return null;
		}
		return artPath;
	}

	async parseArtMapping(moduleId, mapping) {
		let settings = game.settings.get(
			SYSTEM_ID, "moduleArtConfiguration"
		)?.[moduleId];

		settings ??= {items: true};

		for (const [packName, items] of Object.entries(mapping)) {
			const pack = game.packs.get(packName);

			if (!pack) {
				continue;
			}

			for (let [itemId, info] of Object.entries(items))  {
				const entry = pack.index.get(itemId);

				if (!entry) {
					continue;
				}

				if (settings.items) {
					entry.img = info.img;
				}
				else {
					delete info.img;
				}

				delete info.__ITEM_NAME__;

				const uuid = pack.getUuid(itemId);

				info = Object.assign(this.map.get(uuid) ?? {}, info);

				this.map.set(uuid, info);
			}
		}
	}

	async registerModuleArt() {
		this.map.clear();

		for (const module of game.modules) {
			const artPath = this.constructor.getModuleArtPath(module);

			if (!artPath) {
				continue;
			}

			try {
				const mapping = await foundry.utils.fetchJsonWithTimeout(artPath);
				await this.parseArtMapping(module.id, mapping);
			}
			catch(e) {
				console.error(e);
			}
		}
	}
}

class Roller2D20 {
	dicesRolled = [];

	successTreshold = 0;

	critTreshold = 1;

	complicationTreshold = 20;

	successes = 0;

	static async rollD20({
		actor = null,
		attribute = 0,
		complication = 20,
		dicenum = 2,
		difficulty = 1,
		item = null,
		rollLocation = false,
		rollname = "Roll xD20",
		skill = 0,
		tag = false,
	}={}) {
		let successTreshold = parseInt(attribute) + parseInt(skill);
		let critTreshold = tag ? parseInt(skill) : 1;
		let complicationTreshold = parseInt(complication);
		let formula = `${dicenum}d20`;
		let roll = new Roll(formula);

		await roll.evaluate();

		this.showDiceSoNice(roll);

		let hitLocation = undefined;
		let hitLocationResult = undefined;

		if (rollLocation) {
			let hitLocationRoll = await new Roll("1dh").evaluate();
			// try initiating Dice So Nice Roll
			this.showDiceSoNice(hitLocationRoll);

			hitLocation = hitLocationRoll.terms[0].getResultLabel(
				hitLocationRoll.terms[0].results[0]
			);

			hitLocationResult = hitLocationRoll.total;
		}

		const dicesRolled = await Roller2D20.parseD20Roll({
			actor: actor,
			complicationTreshold,
			critTreshold,
			hitLocation,
			hitLocationResult,
			item: item,
			roll: roll,
			rollname: rollname,
			successTreshold,
		});
		return {roll: roll, dicesRolled: dicesRolled};
	}

	static async parseD20Roll({
		actor = null,
		complicationTreshold = 20,
		critTreshold = 1,
		dicesRolled = [],
		hitLocation=null,
		hitLocationResult=null,
		item = null,
		rerollIndexes = [],
		roll = null,
		rollname = "Roll xD20",
		successTreshold = 0,
	}={}) {
		let i = 0;
		roll.dice.forEach(d => {
			d.results.forEach(r => {
				let diceSuccess = 0;
				let diceComplication = 0;

				if (r.result <= successTreshold) {
					diceSuccess++;
				}

				critTreshold = Math.max(critTreshold, 1);

				if (r.result <= critTreshold) {
					diceSuccess++;
				}

				if (r.result >= complicationTreshold) {
					diceComplication = 1;
				}

				// If there are no rollIndexes sent then it is a new roll.
				// Otherwise it's a re-roll and we should replace dices at given
				// indexes
				if (!rerollIndexes.length) {
					dicesRolled.push({
						success: diceSuccess,
						reroll: false,
						result: r.result,
						complication: diceComplication,
					});
				}
				else {
					dicesRolled[rerollIndexes[i]] = {
						success: diceSuccess,
						reroll: true,
						result: r.result,
						complication: diceComplication,
					};

					i++;
				}
			});
		});

		await Roller2D20.sendToChat({
			actor: actor,
			complicationTreshold: complicationTreshold,
			critTreshold: critTreshold,
			dicesRolled: dicesRolled,
			hitLocation: hitLocation,
			hitLocationResult: hitLocationResult,
			item: item,
			rerollIndexes: rerollIndexes,
			roll: roll,
			rollname: rollname,
			successTreshold: successTreshold,
		});
		return dicesRolled;
	}

	static async rerollD20({
		complicationTreshold = 20,
		critTreshold = 1,
		dicesRolled = [],
		rerollIndexes = [],
		roll = null,
		rollname = "Roll xD20",
		successTreshold = 0,
	}={}) {
		if (!rerollIndexes.length) {
			ui.notifications.notify("Select Dice you want to Reroll");
			return;
		}

		let numOfDice = rerollIndexes.length;
		let formula = `${numOfDice}d20`;
		let _roll = new Roll(formula);

		await _roll.evaluate();

		this.showDiceSoNice(_roll);

		await Roller2D20.parseD20Roll({
			rollname: `${rollname} re-roll`,
			roll: _roll,
			successTreshold: successTreshold,
			critTreshold: critTreshold,
			complicationTreshold: complicationTreshold,
			dicesRolled: dicesRolled,
			rerollIndexes: rerollIndexes,
		});
	}

	static async sendToChat({
		actor = null,
		complicationTreshold = 20,
		critTreshold = 1,
		dicesRolled = [],
		hitLocation=null,
		hitLocationResult=null,
		item = null,
		rerollIndexes = [],
		roll = null,
		rollname = "Roll xD20",
		successTreshold = 0,
	}={}) {
		let successesNum = Roller2D20.getNumOfSuccesses(dicesRolled);
		let complicationsNum = Roller2D20.getNumOfComplications(dicesRolled);

		let rollData = {
			actor: actor,
			complications: complicationsNum,
			hitLocation: hitLocation,
			hitLocationResult: hitLocationResult,
			item: item,
			results: dicesRolled,
			rollname,
			successes: successesNum,
			successTreshold,
		};

		const html = await foundry.applications.handlebars.renderTemplate("systems/fallout/templates/chat/roll2d20.hbs", rollData);

		let falloutRoll = {};
		falloutRoll.complicationTreshold = complicationTreshold;
		falloutRoll.critTreshold = critTreshold;
		falloutRoll.diceFace = "d20";
		falloutRoll.dicesRolled = dicesRolled;
		falloutRoll.hitLocation= hitLocation;
		falloutRoll.hitLocationResult = hitLocationResult;
		falloutRoll.rerollIndexes = rerollIndexes;
		falloutRoll.rollname = rollname;
		falloutRoll.successTreshold = successTreshold;

		let chatData = {
			content: html,
			flags: { falloutroll: falloutRoll },
			roll,
			rollMode: game.settings.get("core", "rollMode"),
			speaker: ChatMessage.getSpeaker({actor: actor}),
			user: game.user.id,
		};

		ChatMessage.applyRollMode(chatData, game.settings.get("core", "rollMode"));

		await ChatMessage.create(chatData);
	}

	static getNumOfSuccesses(results) {
		let s = 0;
		results.forEach(d => {
			s += d.success;
		});
		return s;
	}

	static getNumOfComplications(results) {
		let r = 0;
		results.forEach(d => {
			r += d.complication;
		});
		return r;
	}

	static async rollD6({
		actor = null,
		dicenum = 2,
		rollname = "Roll D6",
		weapon = null,
	}={}) {
		let formula = `${dicenum}dc`;
		let roll = new Roll(formula);

		await roll.evaluate();

		this.showDiceSoNice(roll);

		return Roller2D20.parseD6Roll({
			rollname: rollname,
			roll: roll,
			weapon: weapon,
			actor: actor,
		});
	}

	static async parseD6Roll({
		actor = null,
		addDice = [],
		dicesRolled = [],
		rerollIndexes = [],
		roll = null,
		rollname = "Roll D6",
		weapon = null,
	}={}) {
		let diceResults = [
			{ result: 1, effect: 0 },
			{ result: 2, effect: 0 },
			{ result: 0, effect: 0 },
			{ result: 0, effect: 0 },
			{ result: 1, effect: 1 },
			{ result: 1, effect: 1 },
		];

		let i = 0;
		roll.dice.forEach(d => {
			d.results.forEach(r => {
				let diceResult = diceResults[r.result - 1];
				diceResult.face = r.result;
				// if there are no rollIndexes sent then it is a new roll.
				// Otherwise it's a re-roll and we should replace dices at given
				// indexes
				if (!rerollIndexes.length) {
					dicesRolled.push(diceResult);
				}
				else {
					dicesRolled[rerollIndexes[i]] = diceResult;
					i++;
				}
			});
		});

		if (addDice.length) {
			dicesRolled = addDice.concat(dicesRolled);
		}

		await Roller2D20.sendD6ToChat({
			actor: actor,
			dicesRolled: dicesRolled,
			rerollIndexes: rerollIndexes,
			roll: roll,
			rollname: rollname,
			weapon: weapon,
		});

		return dicesRolled;
	}

	static async rerollD6({
		actor = null,
		dicesRolled = [],
		rerollIndexes = [],
		roll = null,
		rollname = "Roll D6",
		weapon = null,
	}={}) {
		if (!rerollIndexes.length) {
			ui.notifications.notify("Select Dice you want to Reroll");
			return;
		}
		let numOfDice = rerollIndexes.length;
		let formula = `${numOfDice}dc`;
		let _roll = new Roll(formula);

		await _roll.evaluate();

		this.showDiceSoNice(_roll);

		return Roller2D20.parseD6Roll({
			actor: actor,
			dicesRolled: dicesRolled,
			rerollIndexes: rerollIndexes,
			roll: _roll,
			rollname: `${rollname} [re-roll]`,
			weapon: weapon,
		});
	}

	static async addD6({ rollname = "Roll D6", dicenum = 2, falloutRoll = null, dicesRolled = [], weapon = null, actor = null } = {}) {
		let formula = `${dicenum}dc`;
		let _roll = new Roll(formula);

		await _roll.evaluate();

		this.showDiceSoNice(_roll);

		let newRollName = `${falloutRoll.rollname} [+ ${dicenum} DC]`;
		let oldDiceRolled = falloutRoll.dicesRolled;

		return Roller2D20.parseD6Roll({
			rollname: newRollName,
			roll: _roll,
			dicesRolled: dicesRolled,
			addDice: oldDiceRolled,
			weapon: weapon,
			actor: actor,
		});
	}

	static async sendD6ToChat({
		actor = null,
		dicesRolled = [],
		rerollIndexes = [],
		roll = null,
		rollname = "Roll D6",
		weapon = null,
	}={}) {
		let damage = dicesRolled.reduce(
			(a, b) => ({ result: a.result + b.result })
		).result;

		let effects = dicesRolled.reduce(
			(a, b) => ({ effect: a.effect + b.effect })
		).effect;

		let weaponDamageTypesList = [];

		if (weapon != null) {
			weaponDamageTypesList = Object.keys(
				weapon.system.damage.damageType
			).filter(
				dt => weapon.system.damage.damageType[dt]
			);

			// Check for Vicious damage effect and add to damage for each effect
			// rolled
			for (let de in weapon.system.damage.damageEffect) {
				const effect = weapon.system.damage.damageEffect[de];

				if (effect.value && de === "vicious") {
					damage += effects;
					break;
				}
			}
		}

		let rollData = {
			damage,
			effects,
			results: dicesRolled,
			rollname,
			weapon,
			weaponDamageTypesList,
		};

		const html = await foundry.applications.handlebars.renderTemplate(
			"systems/fallout/templates/chat/rollD6.hbs",
			rollData
		);

		let falloutRoll = {};
		falloutRoll.damage = damage;
		falloutRoll.diceFace = "d6";
		falloutRoll.dicesRolled = dicesRolled;
		falloutRoll.effects = effects;
		falloutRoll.rerollIndexes = rerollIndexes;
		falloutRoll.rollname = rollname;

		const weaponData = foundry.utils.duplicate(weapon) ?? {};
		weaponData.uuid = weapon?.uuid;

		const flags = {
			actor: {actor},
			falloutroll: falloutRoll,
			weapon: weaponData,
		};

		const { whisper, blind } = this.getRollModeSettings();

		const chatData = {
			blind,
			content: html,
			flags,
			roll,
			rollMode: game.settings.get("core", "rollMode"),
			speaker: ChatMessage.getSpeaker({actor: actor}),
			user: game.user.id,
			whisper,
		};

		await ChatMessage.create(chatData);
	}

	/**
	 * Add support for the Dice So Nice module
	 * @param {Object} roll
	 * @param {String} rollMode
	 */
	static async showDiceSoNice(roll) {
		if (game.modules.get("dice-so-nice")
			&& game.modules.get("dice-so-nice").active
		) {
			const { whisper, blind } = Roller2D20.getRollModeSettings();

			await game.dice3d.showForRoll(roll, game.user, true, whisper, blind);
		}
	}

	static getRollModeSettings() {
		const rollMode = game.settings.get("core", "rollMode");

		let blind = false;
		let whisper = null;

		switch (rollMode) {
			case "blindroll": {
				blind = true;
			}
			case "gmroll": {
				const gmList = game.users.filter(user => user.isGM);
				const gmIDList = [];
				gmList.forEach(gm => gmIDList.push(gm.id));
				whisper = gmIDList;
				break;
			}
			case "roll": {
				const userList = game.users.filter(user => user.active);
				const userIDList = [];
				userList.forEach(user => userIDList.push(user.id));
				whisper = userIDList;
				break;
			}
			case "selfroll": {
				whisper = [game.user.id];
				break;
			}
		}
		return { whisper, blind };
	}
}

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

class APTrackerV2
	extends HandlebarsApplicationMixin(ApplicationV2) {

	static #instance;

	static #maxClosed;

	constructor(options = {}) {
		if (APTrackerV2.#instance) {
			throw new Error("Attempted to create multiple instances of the APTrackerV2 singleton.");
		}

		super(options);

		APTrackerV2.#instance = this;
		APTrackerV2.#maxClosed = true;
	}


	static get instance() {
		if (!APTrackerV2.#instance) {
			new APTrackerV2(APTrackerV2.DEFAULT_OPTIONS);
		}

		return APTrackerV2.#instance;
	}


	static DEFAULT_OPTIONS = {
		actions: {
			decrementPool: APTrackerV2._onDecrementPool,
			incrementPool: APTrackerV2._onIncrementPool,
			toggleMaxAP: APTrackerV2._onToggleMaxAP,
		},
		id: "ap-tracker-app",
		form: {
			closeOnSubmit: false,
			submitOnChange: true,
			handler: APTrackerV2.#onSubmit,
		},
		tag: "form",
		classes: ["fallout", "ap-tracker"],
		window: {
			frame: false,
			positioned: false,
		},
	};


	static PARTS = {
		form: {
			root: true,
			template: templatePath("apps/ap-tracker"),
		},
	};


	async #onChange(event, form, formData) {
		const type = event.target.dataset?.type;
		const value = parseInt(event.target.value);

		await APTrackerV2.setAP(type, value);

		return this.render(true);
	}


	static async #onSubmit(event, form, formData) {
		if (event.type === "change") {
			return this.#onChange(event, form, formData);
		}
	}


	static async _onDecrementPool(event, target) {
		const {type} = target?.dataset ?? undefined;

		if (type) {
			APTrackerV2.adjustAP(type, -1);
		}
	}


	async _onFirstRender(context, options) {
		await super._onFirstRender(context, options);

		// Move the element into the ui-left stack.
		const uiBottom = document.querySelector("#ui-bottom");
		if (!uiBottom) {
			fallout.error("Error: Could not find #ui-bottom!");
			return;
		}

		const hotbar = uiBottom.querySelector("#hotbar");
		if (!hotbar) {
			fallout.warn(
				"Could not find hotbar HTML element, appending Momentum Tracker to end of ui-bottom."
			);
			uiBottom.appendChild(this.element);
			return;
		}

		uiBottom.insertBefore(this.element, hotbar);
	}


	static async _onIncrementPool(event, target) {
		const {type} = target?.dataset ?? undefined;

		if (type) {
			APTrackerV2.adjustAP(type, 1);
		}
	}


	async _onRender(context, options) {
		const maxAP = this.element.querySelector(".maxAP-box");
		if (maxAP) {
			maxAP.hidden = APTrackerV2.#maxClosed;
		}
	}


	static async _onToggleMaxAP(event, target) {
		APTrackerV2.#maxClosed = !APTrackerV2.#maxClosed;
		this.element.querySelector(".maxAP-box").hidden = APTrackerV2.#maxClosed;
	}


	async _prepareContext(options={}) {
		const context = await super._prepareContext(options);

		context.gmAP = game.settings.get(SYSTEM_ID$1, "gmAP");
		context.isGM = game.user.isGM;
		context.maxAP = game.settings.get(SYSTEM_ID$1, "maxAP");
		context.partyAP = game.settings.get(SYSTEM_ID$1, "partyAP");

		context.showGMMomentumToPlayers = game.user.isGM
			? true
			: game.settings.get(SYSTEM_ID$1, "gmMomentumShowToPlayers");

		context.maxAppShowToPlayers = game.user.isGM
			? true
			: game.settings.get(SYSTEM_ID$1, "maxAppShowToPlayers");

		return context;
	}


	static async adjustAP(type, diff) {
		if (!game.user.isGM) {
			game.socket.emit("system.fallout", {
				operation: "adjustAP",
				data: { diff, type },
			});
			return;
		}

		diff = Math.round(diff);

		let momentum = game.settings.get(SYSTEM_ID$1, type);
		momentum += diff;

		this.setAP(type, momentum);
	}


	static async initialise() {
		fallout.debug("Initialising APTrackerV2");

		if (this.instance) {
			this.renderApTracker();
			this.registerSocketEvents();
		}

	}


	static async registerSocketEvents() {
		fallout.debug("Registering APTracker socket events");

		game.socket.on("system.fallout", ev => {
			if (ev.operation === "adjustAP") {
				if (game.user.isGM) {
					APTrackerV2.adjustAP(ev.data.type, ev.data.diff);
				}
			}

			if (ev.operation === "setAP") {
				if (game.user.isGM) {
					this.setAP(ev.data.type, ev.data.value);
				}
			}

			if (ev.operation === "updateAP") {
				this.updateAP();
			}
		});
	}


	static renderApTracker() {
		if (APTrackerV2.#instance) {
			APTrackerV2.#instance.render(true);
		}
	}


	static async setAP(type, value) {
		if (!game.user.isGM) {
			game.socket.emit("system.fallout", {
				operation: "setAP",
				data: { value: value, type: type },
			});
			return;
		}

		value = Math.round(value);
		value = Math.max(0, value);

		const maxAP = await game.settings.get(SYSTEM_ID$1, "maxAP");

		if (type === "partyAP") {
			value = Math.min(value, maxAP);
		}

		if (type === "maxAP") {
			const currentPartyAP =
				await game.settings.get(SYSTEM_ID$1, "partyAP");

			const newPartyAP = Math.min(value, currentPartyAP);

			await game.settings.set(SYSTEM_ID$1, "partyAP", newPartyAP);
		}

		await game.settings.set(SYSTEM_ID$1, type, value);

		APTrackerV2.renderApTracker();

		// emit socket event for the players to update
		game.socket.emit("system.fallout", { operation: "updateAP" });
	}


	static updateAP() {
		APTrackerV2.renderApTracker();
	}
}

class FalloutCompendiums {

	static _collectionFromArray(array) {
		const collection = new Collection();
		for (let d of array) {
			collection.set(d._id, d);
		}
		return collection;
	 }

	static async _documents(type, subtype=null, filterSources=true) {
		let sources = [];

		if (subtype === null) {
			fallout.debug(`[FalloutCompendiums] Collecting '${type}' objects from compendiums`);
		}
		else {
			fallout.debug(`[FalloutCompendiums] Collecting '${type}' objects with subtype '${subtype}' from compendiums`);
		}

		if (filterSources === true) {
			sources = game.settings.get("fallout", "sourceFilters") ?? [];

			if (sources.length > 0) {
				fallout.debug("[FalloutCompendiums] Compendium documents will be filtered by source");
				fallout.debug(`[FalloutCompendiums] ${sources.length} source filters currently configured:`, sources.join(", "));
			}
			else {
				fallout.debug("[FalloutCompendiums] No source filters have been configured");
			}
		}

		const sourcesSet = sources.length > 0;

		let docs = [];

		for (let pack of game.packs) {
			if (pack.metadata.type !== type) {
				continue;
			}

			let documents = await pack.getIndex({fields: ["system"]});

			if (subtype !== null) {
				documents = documents.filter(d => d.type === subtype);
			}

			for (const doc of documents) {
				docs.push(doc);
			}
		}

		fallout.debug(`[FalloutCompendiums] ${docs.length} total documents found`);

		if (sourcesSet) {
			docs = docs.filter(
				d => {
					const source = d.system?.source ?? "";
					return source === "" || sources.includes(source);
				}
			);

			fallout.debug(`[FalloutCompendiums] ${docs.length} documents remain after applying source filters`);
		}
		else {
			fallout.debug("[FalloutCompendiums] Compendium documents will be unfiltered");
		}

		// De-duplicate and sort the list alphabetically
		if (docs.length > 0) {
			fallout.debug("[FalloutCompendiums] De-duplicating and sorting documents");

			docs = Array.from(new Set(docs)).sort(
				(a, b) => a.name.localeCompare(b.name)
			);
		}

		fallout.debug(`[FalloutCompendiums] ${docs.length} documents being returned`);

		return this._collectionFromArray(docs);
	}

	static async addictions(filterSources=true) {
		return FalloutCompendiums._documents("Item", "addiction", filterSources);
	}

	static async ammo(filterSources=true) {
		return FalloutCompendiums._documents("Item", "ammo", filterSources);
	}

	static async apparel_mods(filterSources=true) {
		return FalloutCompendiums._documents("Item", "apparel_mod", filterSources);
	}

	static async apparel(subtypes=[], filterSources=true) {
		const noSubtypes = subtypes.length === 0;

		if (noSubtypes) {
			return FalloutCompendiums._documents("Item", "apparel", filterSources);
		}
		else {
			const documents = await FalloutCompendiums._documents(
				"Item", "apparel", filterSources
			);

			return this._collectionFromArray(documents.filter(document =>
				subtypes.includes(document.system.apparelType)
			));
		}
	}

	static async armor(filterSources=true) {
		return FalloutCompendiums.apparel(["armor"], filterSources);
	}

	static async armor_robot(filterSources=true) {
		return FalloutCompendiums.robot_armor(["armor"], filterSources);
	}

	static async books_and_magz(filterSources=true) {
		return FalloutCompendiums._documents("Item", "books_and_magz", filterSources);
	}

	static async clothing(filterSources=true) {
		return FalloutCompendiums.apparel(["clothing"], filterSources);
	}

	static async consumables(filterSources=true) {
		return FalloutCompendiums._documents("Item", "consumable", filterSources);
	}

	static async diseases(filterSources=true) {
		return FalloutCompendiums._documents("Item", "disease", filterSources);
	}

	static async headgear(filterSources=true) {
		return FalloutCompendiums.apparel(["headgear"], filterSources);
	}

	static async miscellany(filterSources=true) {
		return FalloutCompendiums._documents("Item", "miscellany", filterSources);
	}

	static async npcs(filterSources=true) {
		return FalloutCompendiums._documents("Actor", "npc", filterSources);
	}

	static async outfit(filterSources=true) {
		return FalloutCompendiums.apparel(["outfit"], filterSources);
	}

	static async plating_robot(filterSources=true) {
		return FalloutCompendiums.robot_armor(["plating"], filterSources);
	}

	static async perks(filterSources=true) {
		return FalloutCompendiums._documents("Item", "perk", filterSources);
	}

	static async powerArmor(filterSources=true) {
		return FalloutCompendiums.apparel(["powerArmor"], filterSources);
	}

	static async robot_armor(subtypes=[], filterSources=true) {
		const noSubtypes = subtypes.length === 0;

		if (noSubtypes) {
			return FalloutCompendiums._documents("Item", "robot_armor", filterSources);
		}
		else {
			const documents = await FalloutCompendiums._documents(
				"Item", "robot_armor", filterSources
			);

			return this._collectionFromArray(
				documents.filter(
					document => subtypes.includes(document.system.apparelType)
				)
			);
		}
	}

	static async robot_mods(filterSources=true) {
		return FalloutCompendiums._documents("Item", "robot_mod", filterSources);
	}

	static async rolltables(filterSources=true) {
		return FalloutCompendiums._documents("RollTable", null, false);
	}

	static async scavengingRolltables() {
		const compendiumId = game.settings.get(SYSTEM_ID, "scavengingCompendium") ?? "";

		if (compendiumId !== "") {
			const compendium = game.packs.get(compendiumId);

			let documents = await compendium.getIndex({fields: ["system"]});

			return documents.contents;
		}
		else {
			return this.rolltables();
		}
	}

	static async skills(filterSources=true) {
		return FalloutCompendiums._documents("Item", "skill", filterSources);
	}

	static async sources() {
		if (Array.isArray(CONFIG.FALLOUT.ALL_SOURCES)) {
			return CONFIG.FALLOUT.ALL_SOURCES;
		}

		const allSources = [];

		for (const source of Object.keys(CONFIG.FALLOUT.OFFICIAL_SOURCES)) {
			allSources.push({
				uuid: source,
				name: game.i18n.localize(
					CONFIG.FALLOUT.OFFICIAL_SOURCES[source]
				),
			});
		}

		let moduleSourceCount = 0;
		for (const module of game.modules) {
			if (!module.active) {
				continue;
			}

			const flags = module.flags?.[module.id];
			const moduleSources = flags?.["fallout-sources"] ?? {};

			for (const moduleSource of Object.keys(moduleSources)) {
				moduleSourceCount++;

				const name = game.i18n.localize(moduleSources[moduleSource]);

				fallout.debug(`[FalloutCompendiums] Adding source '${name}' with id '${moduleSource} from module '${module.id}'`);

				allSources.push({
					name,
					uuid: moduleSource,
				});
			}
		}

		fallout.debug(`[FalloutCompendiums] ${moduleSourceCount} custom source/s found in enabled modules`);

		CONFIG.FALLOUT.ALL_SOURCES = allSources.sort(
			(a, b) => a.name.localeCompare(b.name)
		);

		return CONFIG.FALLOUT.ALL_SOURCES;
	}

	static async special_abilities(filterSources=true) {
		return FalloutCompendiums._documents("Item", "special_ability", filterSources);
	}

	static async structures(filterSources=true) {
		return FalloutCompendiums._documents("Item", "object_or_structure", filterSources);
	}

	static async traits(filterSources=true) {
		return FalloutCompendiums._documents("Item", "trait", filterSources);
	}

	static async weapon_mods(filterSources=true) {
		return FalloutCompendiums._documents("Item", "weapon_mod", filterSources);
	}

	static async weapons(filterSources=true) {
		return FalloutCompendiums._documents("Item", "weapon", filterSources);
	}

}

class FalloutConditionTracker {
	constructor() {
		this.lastWorldTime = 0;
		this.updateIntervalSecs = 60;
	}

	get isDisabled() {
		return !this.isEnabled;
	}

	get isEnabled() {
		return game.settings.get(SYSTEM_ID, "syncConditionsWithWorldClock");
	}

	_checkConditions(worldTime) {
		fallout.debug("Condition Tracker: running checks");

		const actors = game.actors.filter(
			a => a.hasPlayerOwner && a.type === "character"
		).sort(
			(a, b) => a.name.localeCompare(b.name)
		);

		const skipMissingPlayers = game.settings.get(
			SYSTEM_ID, "conditionsSkipMissingPlayers"
		);
		const skipStatus = skipMissingPlayers ? "will" : "will not";

		if (skipMissingPlayers) {
			fallout.debug(`Condition Tracker: ${skipStatus} skip missing players`);
		}

		for (const actor of actors) {
			if (skipMissingPlayers && actor.ownerIsOffline) {
				fallout.log(`Condition Tracker: skipping character ${actor.name} as owner is offline`);
				continue;
			}

			fallout.log(`Condition Tracker: checking conditions for character ${actor.name}`);
			actor.checkConditions(worldTime);
		}
	}

	onUpdateWorldTime(worldTime, worldDelta) {
		if (this.isDisabled) {
			return;
		}
		if (!game.user.isGM) {
			return;
		}

		const secondsSinceLastTick = Math.abs(worldTime - this.lastWorldTime);

		if (secondsSinceLastTick >= this.updateIntervalSecs) {
			this.lastWorldTime = worldTime;
			this._checkConditions(worldTime);
		}
	}
}

class FalloutLoading extends Application {

	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["fallout"],
			resizable: false,
			width: "auto",
		});
	}

	get template() {
		return "systems/fallout/templates/apps/loading.hbs";
	}

	get title() {
		return game.i18n.localize("FALLOUT.APP.Loading.title");
	}

	async close(options={}) {
		// Occasionally the loading dialog will try to close before it has fully
		// rendered.
		//
		// If this happens Foundry will not remove the window correctly, so we
		// make sure to only try and properly close the window once it has
		// finished rendering.
		//
		while (!this.rendered) {
			await fallout.utils.sleep(100); // millisecs
		}

		super.close(options);
	}
}

const LBS_TO_KGS = 0.4535924;

class FalloutUtils {

	static calculateXpReward(level=1, category="normal") {
		if (level <= 0) {
			return 0;
		}

		let base;
		let levelAdjust;
		let perLevel;

		switch (category) {
			case "minion":
			case "normal":
				perLevel = 7;

				if (level < 8) {
					base = 10;
					levelAdjust = 1;
				}
				else {
					base = 60;
					levelAdjust = 8;
				}

				break;
			case "mighty":
			case "notable":
				perLevel = 14;

				if (level < 8) {
					base = 20;
					levelAdjust = 1;
				}
				else {
					base = 120;
					levelAdjust = 8;
				}

				break;
			case "legendary":
			case "major":
				perLevel = 21;

				if (level < 8) {
					base = 30;
					levelAdjust = 1;
				}
				else {
					base = 180;
					levelAdjust = 8;
				}

				break;
		}

		let xpReward = base + (perLevel * (level - levelAdjust));

		if (category === "minion") {
			xpReward = Math.round(xpReward / 3);
		}

		return xpReward;
	}


	static checkForTimeJump(lastChange) {
		const maxConditionCheckTimeJump = game.settings.get(
			SYSTEM_ID, "maxConditionCheckTimeJump"
		);

		const maxTimeSkip =
			maxConditionCheckTimeJump * CONFIG.FALLOUT.ONE_HOUR_IN_SECONDS;

		return Math.abs(game.time.worldTime - lastChange) > maxTimeSkip;
	}


	static foundryMinVersion(version) {
		const majorVersion = parseInt(game.version.split(".")[0]);
		return majorVersion >= version;
	}


	// Attempts to get the current actor for a user.  If the current user is the
	// GM then the currently selected token actor will be used if possible,
	// otherwise
	static async getActorForUser() {
		let actor = null;

		if (game.user.isGM) {
			const controlledTokenCount = canvas.tokens.controlled.length;
			if (controlledTokenCount > 0) {
				if (controlledTokenCount !== 1) {
					ui.notifications.warn(
						game.i18n.format("FALLOUT.MACRO.Error.TooManyTokensSelected", {
							max: 1,
						})
					);
				}
				else {
					actor = canvas.tokens.controlled[0].actor;
				}
			}
			else {
				ui.notifications.warn(
					game.i18n.format("FALLOUT.ERRORS.NoCharacterTokenSelected")
				);
			}
		}
		else if (game.user.character) {
			actor = game.user.character;
		}
		else {
			ui.notifications.warn(
				game.i18n.format("FALLOUT.ERRORS.NoPLayerCharacterAssigned")
			);
		}

		return actor;
	}


	/**
	 * Creates de-duplicated lists of Selected and Unselected Items.
	 *
	 * @param {allItems} Array A list of all available items
	 * @param {items} Array A list of currently selected items
	 *
	 * @returns {Promise} Promise which represents an array containing both the
	 * selected and unselected item arrays
	 */
	static async getDedupedSelectedItems(allItems, items) {
		const unselectedItems = [];
		const selectedItems = [];

		allItems.forEach(item => {
			if (!items.includes(item.uuid)) {
				unselectedItems.push(item);
			}
		});

		for (const itemUuid of items) {
			selectedItems.push(await this.getFromUuid(itemUuid));
		}

		selectedItems.sort((a, b) => a.name.localeCompare(b.name));

		return [selectedItems, unselectedItems];
	}

	static async getFromUuid(uuid) {
		const itemObj = await fromUuid(uuid);
		if (itemObj) {
			return itemObj;
		}
		else {
			return {name: "[Invalid ID]", uuid: uuid};
		}
	}

	static getLocalizedSkillAttribute(skill) {
		return game.i18n.localize(
			`FALLOUT.AbilityAbbr.${skill.system.defaultAttribute}`
		);
	}

	static getLocalizedSkillName(skill) {
		// Get the localized name of a skill, if there is no
		// localization then it is likely a custom skill, in which
		// case we will just use it's original name
		//
		const nameKey = `FALLOUT.SKILL.${skill.name}`;
		let localizedName = game.i18n.localize(nameKey);

		if (localizedName === nameKey) {
			localizedName = skill.name;
		}

		return localizedName;
	}

	static getMessageStyles() {
		const messageStyles = this.foundryMinVersion(12)
			? CONST.CHAT_MESSAGE_STYLES
			: CONST.CHAT_MESSAGE_TYPES;

		return messageStyles;
	}

	static getPlayerCharacters() {
		const characters = [];

		for (const player of game.users.players) {
			const actor = player.character;

			if (!actor) {
				fallout.warn(
					`[FalloutUtils::getPlayerCharacters] ${player.name} does not have an associated character`
				);

				continue;
			}

			characters.push(actor);
		}

		characters.sort((a, b) => a.name.localeCompare(b.name));

		return characters;
	}

	static isCompendiumTableResult(result) {
		return this.foundryMinVersion(12)
			? result.type === "pack"
			: result.type === CONST.TABLE_RESULT_TYPES.COMPENDIUM;
	}

	static lbsToKgs(value) {
		return value * LBS_TO_KGS;
	}


	static async loadLegacyArtMappings() {
		// search modules for legacy art mappings and convert to new format
		for (const module of game.modules) {
			if (!module.active) {
				continue;
			}
			const flags = module.flags?.[module.id];
			if (flags?.["fallout-art"]) {
				module.flags.compendiumArtMappings = {
					fallout: {
						mapping: flags["fallout-art"],
					},
				};
			}
		}
	}


	static minsToString(mins) {
		const MINS_PER_DAY = 1440;
		const MINS_PER_HOUR = 60;

		const stringParts = [];

		if (mins >= MINS_PER_DAY) {
			const days = Math.floor(mins / MINS_PER_DAY);
			mins -= (days * MINS_PER_DAY);

			if (days > 1) {
				stringParts.push(
					game.i18n.format("FALLOUT.TIME.DAYS_PLURAL", {days})
				);
			}
			else {
				stringParts.push(
					game.i18n.format("FALLOUT.TIME.DAYS_SINGULAR", {days})
				);
			}
		}

		if (mins >= MINS_PER_HOUR) {
			const hours = Math.floor(mins / MINS_PER_HOUR);
			mins -= (hours * MINS_PER_HOUR);

			if (hours > 1) {
				stringParts.push(
					game.i18n.format("FALLOUT.TIME.HOURS_PLURAL", {hours})
				);
			}
			else {
				stringParts.push(
					game.i18n.format("FALLOUT.TIME.HOURS_SINGULAR", {hours})
				);
			}
		}

		if (mins === 0 || mins > 1) {
			stringParts.push(
				game.i18n.format("FALLOUT.TIME.MINUTES_PLURAL", {mins})
			);
		}
		else {
			stringParts.push(
				game.i18n.format("FALLOUT.TIME.MINUTES_PLURAL", {mins})
			);
		}

		return stringParts.join(", ");
	}


	static playDiceSound() {
		const sounds = [CONFIG.sounds.dice];
		const src = sounds[0];
		game.audio.play(src);
	}


	static async sleep(millisecs=1000) {
		return new Promise((resolve, reject) => {
  			setTimeout(resolve, millisecs);
		});
	}


	// If this is a new release, show the release notes to the GM the first time
	// they login
	static async showNewReleaseNotes() {
		if (game.user.isGM) {
			const savedVersion = game.settings.get("fallout", "systemVersion");
			const systemVersion = game.system.version;

			if (systemVersion !== savedVersion) {
				this.toggleDocumentSheet(
					CONFIG.FALLOUT.JOURNAL_UUIDS.releaseNotes
				);

				game.settings.set(
					"fallout", "systemVersion",
					systemVersion
				);
			}
		}
	}


	static async toggleDocumentSheet(uuid) {
		const document = await fromUuid(uuid);

		if (!document) {
			return fallout.error(`Unable to find document with uuid '${uuid}'`);
		}

		if (document.sheet.rendered) {
			await document.sheet.close();
		}
		else {
			await document.sheet.render(true);
		}
	}
}

class Logger {
	static DEBUG_ENABLED = null;

	static debug(...args) {
		if (this.DEBUG_ENABLED === null) {
			this.DEBUG_ENABLED = game.settings.get(SYSTEM_ID, "debugEnabled");
		}

		if (this.DEBUG_ENABLED) {
			console.debug(`${SYSTEM_NAME} |`, ...args);
		}
	}

	static error(...args) {
		console.error(`${SYSTEM_NAME} |`, ...args);
	}

	static log(...args) {
		console.log(`${SYSTEM_NAME} |`, ...args);
	}

	static warn(...args) {
		console.warn(`${SYSTEM_NAME} |`, ...args);
	}
}

/**
 * Define a set of template paths to pre-load.
 *
 * Pre-loaded templates are compiled and cached for fast access when rendering
 *
 * @export
 * @async
 * @returns {Promise}
 */
async function preloadHandlebarsTemplates() {
	const partials = [
		"systems/fallout/templates/actor/_shared-partials/ammo.hbs",
		"systems/fallout/templates/actor/_shared-partials/biography.hbs",
		"systems/fallout/templates/actor/_shared-partials/data-tab.hbs",
		"systems/fallout/templates/actor/_shared-partials/effects-tab.hbs",
		"systems/fallout/templates/actor/_shared-partials/header.hbs",
		"systems/fallout/templates/actor/_shared-partials/material.hbs",
		"systems/fallout/templates/actor/_shared-partials/materials.hbs",
		"systems/fallout/templates/actor/_shared-partials/npc_body.hbs",
		"systems/fallout/templates/actor/_shared-partials/npc_defense.hbs",
		"systems/fallout/templates/actor/_shared-partials/npc_hp.hbs",
		"systems/fallout/templates/actor/_shared-partials/npc_initiative.hbs",
		"systems/fallout/templates/actor/_shared-partials/npc_special-abilities.hbs",
		"systems/fallout/templates/actor/_shared-partials/simple-expandable-item.hbs",
		"systems/fallout/templates/actor/_shared-partials/skills.hbs",
		"systems/fallout/templates/actor/_shared-partials/weapons.hbs",
		"systems/fallout/templates/actor/creature/partials/attributes.hbs",
		"systems/fallout/templates/actor/creature/partials/butchery.hbs",
		"systems/fallout/templates/actor/creature/partials/carried-weight.hbs",
		"systems/fallout/templates/actor/creature/partials/salvage.hbs",
		"systems/fallout/templates/actor/creature/tabs/abilities.hbs",
		"systems/fallout/templates/actor/creature/tabs/butchery.hbs",
		"systems/fallout/templates/actor/creature/tabs/salvage.hbs",
		"systems/fallout/templates/actor/npc/partials/attributes.hbs",
		"systems/fallout/templates/actor/npc/partials/carried-weight.hbs",
		"systems/fallout/templates/actor/npc/partials/carry-weight.hbs",
		"systems/fallout/templates/actor/npc/partials/inventory.hbs",
		"systems/fallout/templates/actor/npc/partials/melee-bonus.hbs",
		"systems/fallout/templates/actor/npc/partials/settlement.hbs",
		"systems/fallout/templates/actor/npc/tabs/abilities.hbs",
		"systems/fallout/templates/actor/npc/tabs/gear.hbs",
		"systems/fallout/templates/actor/npc/tabs/skills.hbs",
		"systems/fallout/templates/actor/pc/partials/addictions.hbs",
		"systems/fallout/templates/actor/pc/partials/apparel-item-row.hbs",
		"systems/fallout/templates/actor/pc/partials/apparel.hbs",
		"systems/fallout/templates/actor/pc/partials/attributes.hbs",
		"systems/fallout/templates/actor/pc/partials/body-location-status.hbs",
		"systems/fallout/templates/actor/pc/partials/conditions.hbs",
		"systems/fallout/templates/actor/pc/partials/currency.hbs",
		"systems/fallout/templates/actor/pc/partials/derived.hbs",
		"systems/fallout/templates/actor/pc/partials/diseases.hbs",
		"systems/fallout/templates/actor/pc/partials/encumbrance.hbs",
		"systems/fallout/templates/actor/pc/partials/favorite-weapons.hbs",
		"systems/fallout/templates/actor/pc/partials/health.hbs",
		"systems/fallout/templates/actor/pc/partials/injuries.hbs",
		"systems/fallout/templates/actor/pc/partials/inventory-block.hbs",
		"systems/fallout/templates/actor/pc/partials/perks.hbs",
		"systems/fallout/templates/actor/pc/partials/pip-boy.hbs",
		"systems/fallout/templates/actor/pc/partials/power-armor.hbs",
		"systems/fallout/templates/actor/pc/partials/radiation.hbs",
		"systems/fallout/templates/actor/pc/partials/resistances.hbs",
		"systems/fallout/templates/actor/pc/partials/robot-mods.hbs",
		"systems/fallout/templates/actor/pc/partials/statuses-robot.hbs",
		"systems/fallout/templates/actor/pc/partials/statuses.hbs",
		"systems/fallout/templates/actor/pc/partials/traits.hbs",
		"systems/fallout/templates/actor/pc/tabs/abilities.hbs",
		"systems/fallout/templates/actor/pc/tabs/apparel.hbs",
		"systems/fallout/templates/actor/pc/tabs/inventory.hbs",
		"systems/fallout/templates/actor/pc/tabs/status.hbs",
		"systems/fallout/templates/actor/pc/tabs/weapons.hbs",
		"systems/fallout/templates/actor/scavenging_location/partials/categories.hbs",
		"systems/fallout/templates/actor/scavenging_location/partials/category.hbs",
		"systems/fallout/templates/actor/scavenging_location/partials/found-items.hbs",
		"systems/fallout/templates/actor/scavenging_location/partials/header.hbs",
		"systems/fallout/templates/actor/scavenging_location/tabs/details.hbs",
		"systems/fallout/templates/actor/scavenging_location/tabs/items.hbs",
		"systems/fallout/templates/actor/scavenging_location/tabs/notes.hbs",
		"systems/fallout/templates/actor/settlement/partials/action-tallies.hbs",
		"systems/fallout/templates/actor/settlement/partials/action-tally.hbs",
		"systems/fallout/templates/actor/settlement/partials/attribute.hbs",
		"systems/fallout/templates/actor/settlement/partials/header.hbs",
		"systems/fallout/templates/actor/settlement/partials/leader.hbs",
		"systems/fallout/templates/actor/settlement/partials/settler.hbs",
		"systems/fallout/templates/actor/settlement/partials/settlers.hbs",
		"systems/fallout/templates/actor/settlement/partials/stockpile.hbs",
		"systems/fallout/templates/actor/settlement/partials/structure-item.hbs",
		"systems/fallout/templates/actor/settlement/partials/structure-items.hbs",
		"systems/fallout/templates/actor/settlement/partials/structures.hbs",
		"systems/fallout/templates/actor/settlement/tabs/status.hbs",
		"systems/fallout/templates/actor/settlement/tabs/stockpile.hbs",
		"systems/fallout/templates/actor/vehicle/partials/attributes.hbs",
		"systems/fallout/templates/actor/vehicle/partials/body.hbs",
		"systems/fallout/templates/actor/vehicle/partials/carried-weight.hbs",
		"systems/fallout/templates/actor/vehicle/partials/conditions.hbs",
		"systems/fallout/templates/actor/vehicle/partials/favorite-weapons.hbs",
		"systems/fallout/templates/actor/vehicle/partials/header.hbs",
		"systems/fallout/templates/actor/vehicle/partials/inventory.hbs",
		"systems/fallout/templates/actor/vehicle/partials/qualities.hbs",
		"systems/fallout/templates/actor/vehicle/partials/speed.hbs",
		"systems/fallout/templates/actor/vehicle/partials/weapons.hbs",
		"systems/fallout/templates/actor/vehicle/tabs/abilities.hbs",
		"systems/fallout/templates/actor/vehicle/tabs/cargo.hbs",
		"systems/fallout/templates/actor/vehicle/tabs/weapons.hbs",
		"systems/fallout/templates/item/_shared-partials/choice-selector.hbs",
		"systems/fallout/templates/item/_shared-partials/description-tab.hbs",
		"systems/fallout/templates/item/_shared-partials/effects-tab.hbs",
		"systems/fallout/templates/item/_shared-partials/header.hbs",
		"systems/fallout/templates/item/_shared-partials/source.hbs",
		"systems/fallout/templates/item/addiction/attributes-tab.hbs",
		"systems/fallout/templates/item/ammo/attributes-tab.hbs",
		"systems/fallout/templates/item/apparel_mod/attributes-tab.hbs",
		"systems/fallout/templates/item/apparel/_partials/mod-item-row.hbs",
		"systems/fallout/templates/item/apparel/_partials/mod.hbs",
		"systems/fallout/templates/item/apparel/_partials/power-armor-piece.hbs",
		"systems/fallout/templates/item/apparel/_partials/power-armor-pieces.hbs",
		"systems/fallout/templates/item/apparel/_partials/power-armor.hbs",
		"systems/fallout/templates/item/apparel/attributes-tab.hbs",
		"systems/fallout/templates/item/apparel/frame-tab.hbs",
		"systems/fallout/templates/item/apparel/mods-tab.hbs",
		"systems/fallout/templates/item/books_and_magz/attributes-tab.hbs",
		"systems/fallout/templates/item/consumable/_partials/addictive.hbs",
		"systems/fallout/templates/item/consumable/_partials/alcoholic.hbs",
		"systems/fallout/templates/item/consumable/_partials/butchery.hbs",
		"systems/fallout/templates/item/consumable/_partials/duration.hbs",
		"systems/fallout/templates/item/consumable/_partials/hp-healed.hbs",
		"systems/fallout/templates/item/consumable/_partials/irradiated-damage.hbs",
		"systems/fallout/templates/item/consumable/_partials/irradiated.hbs",
		"systems/fallout/templates/item/consumable/_partials/prepared.hbs",
		"systems/fallout/templates/item/consumable/_partials/provides-cap.hbs",
		"systems/fallout/templates/item/consumable/_partials/radiation-healed.hbs",
		"systems/fallout/templates/item/consumable/_partials/thirst-reduction.hbs",
		"systems/fallout/templates/item/consumable/attributes-tab.hbs",
		"systems/fallout/templates/item/consumable/type/beverage.hbs",
		"systems/fallout/templates/item/consumable/type/chem.hbs",
		"systems/fallout/templates/item/consumable/type/food.hbs",
		"systems/fallout/templates/item/consumable/type/other.hbs",
		"systems/fallout/templates/item/disease/attributes-tab.hbs",
		"systems/fallout/templates/item/miscellany/attributes-tab.hbs",
		"systems/fallout/templates/item/object_or_structure/attributes-tab.hbs",
		"systems/fallout/templates/item/origin/attributes-tab.hbs",
		"systems/fallout/templates/item/perk/_partials/attributes.hbs",
		"systems/fallout/templates/item/perk/attributes-tab.hbs",
		"systems/fallout/templates/item/robot_armor/attributes-tab.hbs",
		"systems/fallout/templates/item/robot_mod/attributes-tab.hbs",
		"systems/fallout/templates/item/skill/attributes-tab.hbs",
		"systems/fallout/templates/item/special_ability/attributes-tab.hbs",
		"systems/fallout/templates/item/weapon_mod/_partials/effects.hbs",
		"systems/fallout/templates/item/weapon_mod/_partials/qualities.hbs",
		"systems/fallout/templates/item/weapon_mod/attributes-tab.hbs",
		"systems/fallout/templates/item/weapon_mod/qualities-and-effects-tab.hbs",
		"systems/fallout/templates/item/weapon/_partials/effects.hbs",
		"systems/fallout/templates/item/weapon/_partials/mod-item-row.hbs",
		"systems/fallout/templates/item/weapon/_partials/mod.hbs",
		"systems/fallout/templates/item/weapon/_partials/qualities.hbs",
		"systems/fallout/templates/item/weapon/attributes-tab.hbs",
		"systems/fallout/templates/item/weapon/mods-tab.hbs",
		"systems/fallout/templates/item/weapon/qualities-and-effects-tab.hbs",
	];

	const paths = {};
	for (const path of partials) {
		const [key] = path.split("/").slice(3).join("/").split(".");
		paths[key] = path;
	}

	return foundry.applications.handlebars.loadTemplates(paths);
}

function registerHandlebarsHelpers() {
	/* -------------------------------------------- */
	/*  GENERAL HELPERS                             */
	/* -------------------------------------------- */
	Handlebars.registerHelper("activeEffectIcon", effect => {
		return fallout.utils.foundryMinVersion(12)
			? effect.img
			: effect.icon;
	});

	Handlebars.registerHelper("concat", function() {
		let outStr = "";
		for (let arg in arguments) {
			if (typeof arguments[arg] != "object") {
				outStr += arguments[arg];
			}
		}
		return outStr;
	});

	Handlebars.registerHelper("diseaseStatus", function(disease) {
		if (disease.system.infectionActive) {
			return game.i18n.format("FALLOUT.TEMPLATES.DiseaseProgress", {
				day: disease.system.daysInfected,
				days: disease.system.duration,
			});
		}
		else {
			return game.i18n.localize("FALLOUT.TEMPLATES.DiseaseIncubating");
		}
	});

	Handlebars.registerHelper("listDamageEffects", function(effects) {
		const elements = [];

		for (const key in effects) {
			if (!CONFIG.FALLOUT.DAMAGE_EFFECTS.hasOwnProperty(key)) {
				continue;
			}

			const effect = effects[key];

			if (effect.value <= 0) {
				continue;
			}

			let effectName = CONFIG.FALLOUT.DAMAGE_EFFECTS[key];
			if (effect.rank > 0) {
				effectName += ` ${effect.rank}`;
			}

			const tooltip = CONFIG.FALLOUT.DAMAGE_EFFECT_TOOLTIPS[key];

			const resultHtml = document.createElement("span");
			resultHtml.classList.add("effect", "hover");
			resultHtml.dataset.key = key;
			resultHtml.dataset.tooltip = tooltip;
			resultHtml.innerHTML = effectName;

			elements.push(resultHtml.outerHTML);
		}

		let listString = "";

		if (elements.length > 0) {
			listString = elements.join(",&nbsp;");
		}
		else {
			listString = "&mdash;";
		}

		return listString;
	});

	Handlebars.registerHelper("listPerkRequirements", function(requirements) {
		const elements = [];

		for (const key in requirements) {
			const resultHtml = document.createElement("span");
			if (key === "attributes") {
				for (const att in requirements[key]) {
					if (requirements[key][att].value <= 0) {
						continue;
					}

					let attAbbrName = game.i18n.localize(
						`FALLOUT.AbilityAbbr.${att}`
					);


					resultHtml.dataset.key = key;
					resultHtml.innerHTML = `${attAbbrName.toUpperCase()}&nbsp${requirements[key][att].value}`;
					elements.push(resultHtml.outerHTML);
				}
			}
			else {
				const requirement = requirements[key];

				if (!requirement) {
					continue;
				}

				let requirementName = game.i18n.localize(
					`FALLOUT.Item.Perk.${key}`
				);

				if ((typeof requirement) === "number" && requirement >= 1) {
					requirementName += ` ${requirement}`;
				}


				resultHtml.dataset.key = key;
				resultHtml.innerHTML = requirementName;
				elements.push(resultHtml.outerHTML);
			}
		}

		let listString = "";

		if (elements.length > 0) {
			listString = elements.join(",&nbsp;");
		}
		else {
			listString = "&mdash;";
		}

		return listString;
	});

	Handlebars.registerHelper("listWeaponQualities", function(qualities) {
		const elements = [];

		for (const key in qualities) {
			if (!CONFIG.FALLOUT.WEAPON_QUALITIES.hasOwnProperty(key)) {
				continue;
			}

			const quality = qualities[key];

			if (quality.value <= 0) {
				continue;
			}

			let qualityName = CONFIG.FALLOUT.WEAPON_QUALITIES[key];
			if (quality.rank > 0) {
				qualityName += `&nbsp;${quality.rank}`;
			}

			const tooltip = CONFIG.FALLOUT.WEAPON_QUALITY_TOOLTIPS[key];

			const resultHtml = document.createElement("span");
			resultHtml.classList.add("effect", "hover");
			resultHtml.dataset.key = key;
			resultHtml.dataset.tooltip = tooltip;
			resultHtml.innerHTML = qualityName;

			elements.push(resultHtml.outerHTML);
		}

		let listString = "";

		if (elements.length > 0) {
			listString = elements.join(", ");
		}
		else {
			listString = "&mdash;";
		}

		return listString;
	});

	Handlebars.registerHelper("listWeaponMods", function(weaponMods) {
		const elements = [];

		for (const key in weaponMods) {
			if (!weaponMods[key].system?.attached) {
				continue;
			}


			const resultHtml = document.createElement("span");
			resultHtml.classList.add("effect", "hover");
			resultHtml.dataset.key = key;
			resultHtml.dataset.tooltip = weaponMods[key].system.modEffects.summary;
			resultHtml.innerHTML = weaponMods[key].name;

			elements.push(resultHtml.outerHTML);
		}

		let listString = "";

		if (elements.length > 0) {
			listString = elements.join(",&nbsp;");
		}
		else {
			listString = "&mdash;";
		}

		return listString;
	});


	Handlebars.registerHelper("toLowerCase", function(str) {
		return str.toLowerCase();
	});

	Handlebars.registerHelper("toUpperCase", function(str) {
		return str.toUpperCase();
	});

	Handlebars.registerHelper("subString", function(str, s, e) {
		return str.substring(s, e);
	});

	Handlebars.registerHelper("ifCond", function(v1, operator, v2, options) {
		switch (operator) {
			case "==":
				// eslint-disable-next-line eqeqeq
				return v1 == v2 ? options.fn(this) : options.inverse(this);
			case "===":
				return v1 === v2 ? options.fn(this) : options.inverse(this);
			case "!=":
				// eslint-disable-next-line eqeqeq
				return v1 != v2 ? options.fn(this) : options.inverse(this);
			case "!==":
				return v1 !== v2 ? options.fn(this) : options.inverse(this);
			case "<":
				return v1 < v2 ? options.fn(this) : options.inverse(this);
			case "<=":
				return v1 <= v2 ? options.fn(this) : options.inverse(this);
			case ">":
				return v1 > v2 ? options.fn(this) : options.inverse(this);
			case ">=":
				return v1 >= v2 ? options.fn(this) : options.inverse(this);
			case "&&":
				return v1 && v2 ? options.fn(this) : options.inverse(this);
			case "||":
				return v1 || v2 ? options.fn(this) : options.inverse(this);
			default:
				return options.inverse(this);
		}
	});

	Handlebars.registerHelper("math", function(
		lvalue,
		operator,
		rvalue,
		options
	) {
		lvalue = parseFloat(lvalue);
		rvalue = parseFloat(rvalue);
		return {
			"+": lvalue + rvalue,
			"-": lvalue - rvalue,
			"*": lvalue * rvalue,
			"/": lvalue / rvalue,
			"%": lvalue % rvalue,
		}[operator];
	});

	Handlebars.registerHelper("range", function(start, stop) {
		let result = [];
		for (let i = start; i <= stop; i++) {
			result.push(i);
		}
		return result;
	});

	/* -------------------------------------------- */
	/*  FALLOUT HELPERS                             */
	/* -------------------------------------------- */

	Handlebars.registerHelper("damageFaIconClass", function(str) {
		switch (str) {
			case "physical":
				return "fas fa-fist-raised";
			case "energy":
				return "fas fa-bolt";
			case "radiation":
				return "fas fa-radiation";
			case "poison":
				return "fas fa-biohazard";
			default:
				return "";
		}
	});

	Handlebars.registerHelper("fromConfig", function(arg1, arg2) {
		return CONFIG.FALLOUT[arg1][arg2] ? CONFIG.FALLOUT[arg1][arg2] : arg2;
	});

	Handlebars.registerHelper("fromSettings", function(arg1) {
		return game.settings.get(SYSTEM_ID, arg1);
	});

	Handlebars.registerHelper("log", function(something) {
		console.log(something);
	});

	// Handlebars.registerHelper("incrementCounter", function(counter) {
	// 	return ++counter;
	// });

	// Handlebars.registerHelper("isCreaturesWeapon", function(weapon) {
	// 	const isCreatureAttack = weapon.system.weaponType === "creatureAttack";
	// 	const isCreature = weapon.actor?.type === "creature";

	// 	return (isCreatureAttack || isCreature);
	// });

	Handlebars.registerHelper("isWeaponUsingMeleeBonus", function(weapon, actor) {
		if ((weapon.system.weaponType === "unarmed" || weapon.system.weaponType === "meleeWeapons") && actor?.type !== "creature") {
			return true;
		}
		else {
			return false;
		}
	});

	Handlebars.registerHelper("isWeaponDamaged", function(weapon) {
		if (!weapon.tear) {
			return false;
		}
		else {
			return true;
		}
	});

	// * Use with #if
	// {{#if (or
	// (eq section1 "foo")
	// (ne section2 "bar"))}}e
	// .. content
	// {{/if}}
	Handlebars.registerHelper({
		eq: (v1, v2) => v1 === v2,
		ne: (v1, v2) => v1 !== v2,
		lt: (v1, v2) => v1 < v2,
		gt: (v1, v2) => v1 > v2,
		lte: (v1, v2) => v1 <= v2,
		gte: (v1, v2) => v1 >= v2,
		and() {
			return Array.prototype.every.call(arguments, Boolean);
		},
		or() {
			return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
		},
	});

	Handlebars.registerHelper("enrichHtmlHelper", function(rawText) {
		return foundry.applications.ux.TextEditor.enrichHTML(rawText, { async: false });
	});

	// coloring input fields
	Handlebars.registerHelper("colorIfValue", function(num, compare, color, color2) {
		return num === compare
			? `color:#${color};`
			: `color:#${color2};`;
	});

	Handlebars.registerHelper("levelPadding", function(level) {
		let str = "";
		for (let i = 0; i < level; i++) {
			str += "&nbsp;&nbsp;&nbsp;&nbsp;";
		}
		return str;
	});

	Handlebars.registerHelper("round", function(number) {
		return Math.round(number);
	});

	Handlebars.registerHelper("select", function(selected, options) {
		const escapedValue = RegExp.escape(Handlebars.escapeExpression(selected));
		const rgx = new RegExp(` value=["']${escapedValue}["']`);
		const html = options.fn(this);
		return html.replace(rgx, "$& selected");
	});

}

class FalloutModuleArtConfig extends FormApplication {

	/** @inheritdoc */
	constructor(object={}, options={}) {
		object = foundry.utils.mergeObject(
			game.settings.get(SYSTEM_ID, "moduleArtConfiguration"),
			object,
			{inplace: false}
		);
		super(object, options);
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			title: game.i18n.localize("FALLOUT.APP.ModuleArtConfig.title"),
			template: "systems/fallout/templates/apps/module-art-config.hbs",
			popOut: true,
			width: 600,
			height: "auto",
		});
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	getData(options={}) {
		const context = super.getData(options);

		context.config = [];

		for (const module of game.modules) {
			if (!FalloutModuleArt.getModuleArtPath(module)) {
				continue;
			}
			const settings = this.object[module.id] ?? {portraits: true, tokens: true};
			context.config.push({label: module.title, id: module.id, ...settings});
		}

		context.config.sort((a, b) => a.label.localeCompare(b.label, game.i18n.lang));

		context.config.unshift({
			label: game.system.title,
			id: game.system.id,
			...this.object.fallout,
		});

		return context;
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	async _updateObject(event, formData) {
		await game.settings.set(
			SYSTEM_ID, "moduleArtConfiguration",
			foundry.utils.expandObject(formData)
		);
		return SettingsConfig.reloadConfirm({world: true});
	}
}

function registerSettings() {
	// -------------------
	//  INTERNAL SETTINGS
	// -------------------
	//
	game.settings.register(SYSTEM_ID, "partyAP", {
		name: "Party AP",
		scope: "world",
		config: false,
		default: 0,
		type: Number,
	});

	game.settings.register(SYSTEM_ID, "gmAP", {
		name: "GM AP",
		scope: "world",
		config: false,
		default: 0,
		type: Number,
	});

	game.settings.register(SYSTEM_ID, "maxAP", {
		name: "Max AP",
		scope: "world",
		config: false,
		default: 6,
		type: Number,
	});

	// ====================
	//  SETTINGS SUB-MENUS
	// ====================

	// -----------------
	//  DYNAMIC ARTWORK
	// -----------------
	//
	game.settings.registerMenu(SYSTEM_ID, "moduleArtConfiguration", {
		name: "Module-provided Art",
		label: "Configure Art",
		hint: "Configure which module-provided art should be used",
		icon: "fa-solid fa-palette",
		type: FalloutModuleArtConfig,
		restricted: true,
	});

	game.settings.register(SYSTEM_ID, "moduleArtConfiguration", {
		name: "Module Art Configuration",
		scope: "world",
		config: false,
		type: Object,
		default: {
			fallout: {
				items: true,
			},
		},
	});

	// ---------------------
	//  SCAVENGING SETTINGS
	// ---------------------
	//
	game.settings.registerMenu(SYSTEM_ID, "scavenging", {
		name: "Scavenging Settings",
		hint: "Configuration settings related to the roll tables used for Scavenging Locations",
		label: "Configure Scavenging Settings",
		icon: "fa-solid fa-magnifying-glass",
		type: fallout.apps.ScavengingTableSettings,
		restricted: true,
	});
	fallout.apps.ScavengingTableSettings.registerSetting();

	// ----------------
	//  SOURCE FILTERS
	// ----------------
	//
	game.settings.registerMenu(SYSTEM_ID, "sources", {
		name: "Source Filter",
		hint: "If populated, only sources included in this list will be used by any part of the system which automatically pulls items from Compendiums. Items with no Source set will always be included.",
		label: "Configure Source Filter",
		icon: "fa-solid fa-book",
		type: fallout.apps.SourceFilterSettings,
		restricted: true,
	});
	fallout.apps.SourceFilterSettings.registerSetting();

	// -----------------
	//  PUBLIC SETTINGS
	// -----------------
	//
	game.settings.register(SYSTEM_ID, "gmMomentumShowToPlayers", {
		name: "Show Overseer AP To Players",
		hint: "Shows the Overseer's AP window to everyone. Requires refresh on the players side.",
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});

	game.settings.register(SYSTEM_ID, "maxAppShowToPlayers", {
		name: "Players Can Setup Max AP",
		hint: "Allows players to settup the Party's MAX AP. Requires refresh on the players side.",
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
	});

	game.settings.register(SYSTEM_ID, "automaticAmmunitionCalculation", {
		name: "Ammunition Calculation",
		hint: "Automatically decreases the ammunition count on the character sheet for weapon Items that have the Ammo field populated. Ammunition is decreased: 1. on the initial shot (d20 roll dialog) 2. when adding more dice to the DC (d6 roll dialog) 3. when adding more dice to a previously-rolled DC result (-Add- button in Chat Dialog). It takes in to the account Gatling (x10 ammo consumed) quality. It does NOT automatically reduce the ammo for the Burst effects, Gun-Fu perk, nor for the Accurate qulity.",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});

	game.settings.register(SYSTEM_ID, "applyWearAndTearToWeaponDamage", {
		name: "Apply Wear and Tear to Weapon Damage",
		hint: "Automatically decrease weapon damage dice by the amount of Wear and Tear on the weapon. Weapons become broken if their Base Damage, minus any Wear and Tear, is reduced to zero.",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});

	game.settings.register(SYSTEM_ID, "syncConditionsWithWorldClock", {
		name: "Sync Conditions with World Clock",
		hint: "If enabled player Hunger, Thirst and Rested conditions will be synced with game time. For this to work fully you must have installed/enabled a 3rd party world time module, such as Simple Calendar, which can be used to adjust the game time.  Otherwise time will only be advanced by the Party Sleep tool.",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});

	game.settings.register(SYSTEM_ID, "maxConditionCheckTimeJump", {
		name: "Max Time Jump (hours)",
		hint: "If the game time changes by more than this amount of hours in one step, then ignore it and set the last Hunger, Thirst and Sleep timestamps to the new time.",
		scope: "world",
		config: true,
		default: 13,
		type: Number,
	});

	game.settings.register(SYSTEM_ID, "conditionsSkipMissingPlayers", {
		name: "Conditions Skip Missing Players",
		hint: "Skip characters owned by players who are not logged in when changing party condition levels.",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
	});

	game.settings.register(SYSTEM_ID, "useVariableInitiative", {
		name: "Use Variable Initiative",
		hint: "If enabled the Variable Initiative method as detailed in the Gamemaster's Guide will be used instead of the base game's fixed initiative method.",
		scope: "world",
		config: true,
		default: false,
		type: Boolean,
		requiresReload: true,
	});


	// -----------------------------------
	//  HOMEBREW / CUSTOMISATION SETTINGS
	// -----------------------------------
	//
	game.settings.register(SYSTEM_ID, "carryUnit", {
		name: "Weight unit",
		hint: "The weight calculation formula will be different depending on the unit chosen",
		scope: "world",
		config: true,
		default: "lbs",
		type: String,
		choices: {
			lbs: "Lbs",
			kgs: "Kgs",
		},
		requiresReload: true,
	});

	game.settings.register(SYSTEM_ID, "carryBase", {
		name: "Base Carry Weight (Characters)",
		hint: "The base carry weight for characters before any STR modifiers are applied",
		scope: "world",
		config: true,
		default: 150,
		type: Number,
		requiresReload: true,
	});

	game.settings.register(SYSTEM_ID, "carryBaseRobot", {
		name: "Base Carry Weight (Robots)",
		hint: "The base carry weight for robots before any STR modifiers are applied",
		scope: "world",
		config: true,
		default: 150,
		type: Number,
		requiresReload: true,
	});

	game.settings.register(SYSTEM_ID, "baseSettlementStorage", {
		name: "Base Storage for Settlements",
		hint: "The base storage available at settlements before any modifiers from structures are applied",
		scope: "world",
		config: true,
		default: 300,
		type: Number,
		requiresReload: true,
	});

	game.settings.register(SYSTEM_ID, "deleteExhaustedConsumables", {
		name: "Delete consumed items that are reduced to quantity zero",
		hint: "By default the system will not delete items that are reduced to a quantity of zero when consumed.  Check this option if you prefer the old behaviour of deleting exhausted items.",
		scope: "world",
		type: Boolean,
		config: true,
		default: false,
		requiresReload: false,
	});

	game.settings.register(SYSTEM_ID, "disableAutoXpTarget", {
		name: "Disable Auto-calculated Player Level XP",
		hint: "By default the system will auto-calculate the next level target XP for player characters based on the core rulebook.  Check this if would prefer to populate these values manually.",
		scope: "world",
		type: Boolean,
		config: true,
		default: false,
		requiresReload: true,
	});

	game.settings.register(SYSTEM_ID, "disableAutoDerivedStats", {
		name: "Disable Auto-calculated Player Derived Stats",
		hint: "By default the system will auto-calculate derived stats for player characters based on the core rulebook.  Check this if would prefer to populate these values manually.",
		scope: "world",
		type: Boolean,
		config: true,
		default: false,
		requiresReload: true,
	});

	game.settings.register(SYSTEM_ID, "disableAutoXpReward", {
		name: "Disable Auto-calculated NPC XP Reward",
		hint: "By default the system will auto-calculate the XP reward level of an NPC based on the core rulebook.  Check this if would prefer to populate these values manually.",
		scope: "world",
		type: Boolean,
		config: true,
		default: false,
		requiresReload: true,
	});

	// ------------------
	// GENERAL SETTINGS
	// ------------------

	// TODO Implement sourceFilters fully once background items and character
	// creation are implemented
	//
	game.settings.register(SYSTEM_ID, "sourceFilters", {
		name: game.i18n.localize("FALLOUT.SETTINGS.sourceFilters.title"),
		hint: game.i18n.localize("FALLOUT.SETTINGS.sourceFilters.hint"),
		config: false,
		scope: "world",
		type: Array,
		requiresReload: true,
		default: [],
	});

	// ----------------
	//  DEBUG SETTINGS
	// ----------------
	//
	game.settings.register(SYSTEM_ID, "debugEnabled", {
		name: "Enable/Disable Debug",
		hint: "Enable or Disable additional debug features",
		scope: "world",
		type: Boolean,
		config: true,
		default: false,
		requiresReload: true,
	});

	game.settings.register(SYSTEM_ID, "worldSchemaVersion", {
		name: "Schema Version",
		hint: "Records the current schema version for the Fallout RPG system data. (don't modify this unless you know what you are doing)",
		scope: "world",
		config: game.settings.get(SYSTEM_ID, "debugEnabled"),
		default: -1,
		type: Number,
	});

	game.settings.register(SYSTEM_ID, "systemVersion", {
		name: "System Version",
		hint: "Records the current Fallout RPG system version number (don't modify this unless you know what you are doing)",
		scope: "world",
		config: game.settings.get(SYSTEM_ID, "debugEnabled"),
		default: "",
		type: String,
	});

	game.settings.register(SYSTEM_ID, "migrateSystemCompendiums", {
		name: "Migrate System Compendiums",
		hint: "Perform data migration on the built in Fallout RPG system compendiums (don't modify this unless you know what you are doing)",
		scope: "world",
		type: Boolean,
		config: game.settings.get(SYSTEM_ID, "debugEnabled"),
		default: false,
		requiresReload: true,
	});
}

function registerTextEditorEnrichers() {
	CONFIG.TextEditor.enrichers = CONFIG.TextEditor.enrichers.concat([
		{
			pattern: /@fos\[(.+?)\]/gm,
			enricher: async (match, options) => {
				const i = document.createElement("i");

				switch (match[1]) {
					case "CD":
					case "DC":
						i.classList.add("fo-pip-boy");
						break;
					case "CDC":
					case "DCC":
						i.classList.add("fo-pip-boy", "fo-blue");
						break;
					case "EN":
						i.classList.add("fo-energy");
						break;
					case "PH":
						i.classList.add("fo-physical");
						break;
					case "PO":
						i.classList.add("fo-poison");
						break;
					case "RA":
						i.classList.add("fo-radiation");
						break;
				}

				return i;
			},
		},
		{
			pattern: /((\+|-)?\d+)?\s?D?(CD|DC)[CD]?/g,
			enricher: async (match, options) => {
				const i = document.createElement("i");
				i.classList.add("fo-pip-boy");

				const outerSpan = document.createElement("span");
				if (match[1]) {
					outerSpan.innerHTML = `${match[1]}&nbsp;`;
				}
				else if (match[0].charAt(0) === " ") {
					outerSpan.innerHTML = "&nbsp;";
				}

				outerSpan.appendChild(i);

				return outerSpan;
			},
		},
	]);
}

async function initHook() {
	console.debug(`${SYSTEM_NAME$1} | Running init hook`);

	// CONFIG.debug.hooks = true;

	// Add custom constants for configuration.
	CONFIG.FALLOUT = FALLOUT;

	// Override the default status effects
	CONFIG.statusEffects = CONFIG.FALLOUT.statusEffects;

	globalThis.SYSTEM_ID = SYSTEM_ID$1;
	globalThis.SYSTEM_NAME = SYSTEM_NAME$1;

	// Add utility classes to the global game object so that they're more easily
	// accessible in global contexts.
	globalThis.fallout = {
		APTrackerV2,
		Dialog2d20,
		DialogD6,
		FalloutLoading,
		Roller2D20,
		apps,
		chat: FalloutChat,
		compendiums: FalloutCompendiums,
		conditionTracker: new FalloutConditionTracker(),
		debug: Logger.debug,
		error: Logger.error,
		log: Logger.log,
		macros: FalloutMacros,
		moduleArt: new FalloutModuleArt(),
		utils: FalloutUtils,
		warn: Logger.warn,
	};

	registerSettings();

	const useVariableInitiative = game.settings.get(SYSTEM_ID$1, "useVariableInitiative");
	CONFIG.Combat.initiative = {
		formula: useVariableInitiative ? "(@initiative.value)dc" : "@initiative.value",
		decimals: 0,
	};

	CONFIG.ActiveEffect.legacyTransferral = false;

	registerDocumentClasses();
	registerDocumentSheets();

	registerDiceSettings();

	registerHandlebarsHelpers();
	registerTextEditorEnrichers();

	preloadHandlebarsTemplates();

	FalloutHooks.attach();
}

function registerDiceSettings() {
	CONFIG.Dice.terms.c = DieFalloutDamage;
	CONFIG.Dice.terms.h = DieFalloutLocation;

	const dieModifiers = fallout.utils.foundryMinVersion(12)
		? foundry.dice.terms.Die.MODIFIERS
		: Die.MODIFIERS;

	// eslint-disable-next-line func-names
	dieModifiers.ef = function minResult(modifier) {
		this.results = this.results.flatMap(result => {
			if (result.result < 5) {
				result.active = false;
				result.discarded = true;
			}
			DiceTerm._applyCount(this.results, ">", 4, { flagSuccess: true });
			return [result];
		});
	};

	// eslint-disable-next-line func-names
	dieModifiers.sum = function minResult(modifier) {
		this.results = this.results.flatMap(result => {
			if (result.result === 1 || result.result === 5 || result.result === 6) {
				result.active = true;
				result.discarded = false;
				result.success = true;
				result.count = 1;
			}
			else if (result.result === 2) {
				result.active = true;
				result.discarded = false;
				result.success = true;
				result.count = 2;
			}
			else {
				result.active = true;
				result.discarded = true;
				result.success = false;
				result.count = 0;
			}

			return [result];
		});
	};
}

function registerDocumentClasses() {
	CONFIG.Actor.documentClass = FalloutActor;
	CONFIG.Item.documentClass = FalloutItem;
}

function registerDocumentSheets() {
	const documentCollections = foundry.documents.collections;

	documentCollections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
	documentCollections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);

	documentCollections.Actors.registerSheet("fallout", FalloutCreatureSheet, {
		makeDefault: true,
		types: ["creature"],
	});

	documentCollections.Actors.registerSheet("fallout", FalloutNpcSheet, {
		makeDefault: true,
		types: ["npc"],
	});

	documentCollections.Actors.registerSheet("fallout", FalloutPcSheet, {
		makeDefault: true,
		types: ["character", "robot"],
	});

	documentCollections.Actors.registerSheet("fallout", FalloutScavengingLocationSheet, {
		makeDefault: true,
		types: ["scavenging_location"],
	});

	documentCollections.Actors.registerSheet("fallout", FalloutSettlementSheet, {
		makeDefault: true,
		types: ["settlement"],
	});

	documentCollections.Actors.registerSheet("fallout", FalloutVehicleSheet, {
		makeDefault: true,
		types: ["vehicle"],
	});

	documentCollections.Items.registerSheet("fallout", FalloutItemSheet, { makeDefault: true });
}

Hooks.once("init", initHook);
//# sourceMappingURL=fallout-compiled.mjs.map
