// Foundry VTT export utility for Fallout 2d20 system
// Matches Foundry 13.351 / fallout system 11.16.6 actor document shape
// Item system objects are built by cloning from embedded template data.
import {
  CORE_AMMO,
  CORE_APPAREL,
  CORE_ARMOR,
  CORE_CHEMS,
  CORE_FOOD,
  CORE_MISCELLANY,
  CORE_OTHER_CONSUMABLES,
  CORE_PERKS,
  CORE_POWER_ARMOR,
  CORE_ROBOT_MODS,
  CORE_WEAPON_MODS,
  CORE_WEAPON_MOD_COMPATIBILITY,
  CORE_WEAPONS,
} from "./sourceTruthData.js";
import { getEffectiveSkillRank, getSkillRankCapForCharacter, getMergedTagSkills, isNightkinCharacter } from "./falloutData.js";

// ─────────────────────────────────────────────────────────────────────────────
// Embedded template fragments (sourced from Foundry system template.json)
// Only the Item types we actually export are included.
// ─────────────────────────────────────────────────────────────────────────────

const ITEM_TEMPLATES = {
  // Shared template blocks
  _base:      { description: '', favorite: false, source: '' },
  _physical:  { cost: 0, quantity: 1, rarity: 0, stashed: false, weight: 0 },
  _equipable: { equippable: true, equipped: false },
  _scrappable:{ canBeScrapped: true, isJunk: false },

  // Item type schemas (verbatim from template.json Item section)
  weapon: {
    ammo: '',
    ammoPerShot: 1,
    attribute: '',
    condition: '',
    consumedOnUse: false,
    creatureAttribute: '',
    creatureSkill: '',
    damage: {
      damageEffect: {
        arc:          { rank: 0, value: 0 },
        breaking:     { rank: 0, value: 0 },
        burst:        { rank: 0, value: 0 },
        freeze:       { rank: 0, value: 0 },
        persistent:   { rank: 0, value: 0 },
        piercing_x:   { rank: 1, value: 0 },
        radioactive:  { rank: 0, value: 0 },
        spread:       { rank: 0, value: 0 },
        stun:         { rank: 0, value: 0 },
        tranquilize_x:{ rank: 1, value: 0 },
        vicious:      { rank: 0, value: 0 },
      },
      damageType: { energy: false, physical: false, poison: false, radiation: false },
      originalDamageType: { energy: false, physical: false, poison: false, radiation: false },
      originalRating: 0,
      rating: 1,
      weaponQuality: {
        accurate:           { rank: 0, value: 0 },
        aquatic:            { rank: 0, value: 0 },
        ammo_hungry_x:      { rank: 1, value: 0 },
        blast:              { rank: 0, value: 0 },
        bombard:            { rank: 0, value: 0 },
        close_quarters:     { rank: 0, value: 0 },
        concealed:          { rank: 0, value: 0 },
        debilitating:       { rank: 0, value: 0 },
        delay_x:            { rank: 1, value: 0 },
        gatling:            { rank: 0, value: 0 },
        fuel_x:             { rank: 1, value: 0 },
        inaccurate:         { rank: 0, value: 0 },
        limited:            { rank: 0, value: 0 },
        mine:               { rank: 0, value: 0 },
        night_vision:       { rank: 0, value: 0 },
        parry:              { rank: 0, value: 0 },
        placed:             { rank: 0, value: 0 },
        recoil_x:           { rank: 1, value: 0 },
        recon:              { rank: 0, value: 0 },
        reliable:           { rank: 0, value: 0 },
        slow_load:          { rank: 0, value: 0 },
        suppressed:         { rank: 0, value: 0 },
        surge:              { rank: 0, value: 0 },
        thrown:             { rank: 0, value: 0 },
        two_handed:         { rank: 0, value: 0 },
        unreliable:         { rank: 0, value: 0 },
        unstable_radiation: { rank: 0, value: 0 },
        wrangle:            { rank: 0, value: 0 },
      },
    },
    fireRate: 0,
    melee: false,
    mods: { current: 0, installedMods: '', list: '', max: 0, modded: false },
    naturalWeapon: false,
    originalAmmoPerShot: 0,
    quantityRoll: '',
    range: '',
    skill: '',
    tear: 0,
    templates: ['base', 'physical', 'equipable', 'scrappable'],
    weaponType: '',
  },

  apparel: {
    apparelType: 'armor',
    health: { max: 0, min: 0, mod: 0, value: 0 },
    location: { armL: false, armR: false, head: false, legL: false, legR: false, torso: false },
    mods: { current: 0, installedMods: '', list: '', max: 0, modded: false },
    powerArmor: { frameId: '', isFrame: false, powered: false },
    resistance: { energy: 0, physical: 0, radiation: 0 },
    shadowed: false,
    templates: ['base', 'physical', 'equipable', 'scrappable'],
  },

  robot_armor: {
    apparelType: '',
    carry: 0,
    location: { armL: false, armR: false, head: false, legL: false, legR: false, torso: false },
    perks: '',
    resistance: { energy: 0, physical: 0, radiation: 0 },
    templates: ['base', 'physical', 'equipable', 'scrappable'],
  },

  skill: {
    defaultAttribute: 'str',
    summary: '',
    tag: false,
    templates: ['base'],
    value: 0,
  },

  perk: {
    rank: { max: 1, value: 0 },
    requirements: '',
    requirementsEx: {
      level: 1,
      levelIncrease: 0,
      attributes: {
        str: { value: 0 }, per: { value: 0 }, end: { value: 0 },
        cha: { value: 0 }, int: { value: 0 }, agi: { value: 0 }, luc: { value: 0 },
      },
      isCompanion: false,
      magazineUuids: [],
      notGhoul: false,
      notHuman: false,
      notRadiationImmune: false,
      notRobot: false,
      notSupermutant: false,
    },
    templates: ['base'],
  },

  ammo: {
    charges: { current: 0, max: 0 },
    effect: '',
    fusionCore: false,
    shots: { current: 1, max: 1 },
    quantityRoll: '',
    templates: ['base', 'physical'],
  },

  consumable: {
    addiction: 0,
    addictive: false,
    alcoholic: false,
    butchery: false,
    group: '',
    consumableType: 'food',
    duration: 'instant',
    effect: '',
    hp: 0,
    irradiated: false,
    prepared: false,
    providesCap: false,
    quantityRoll: '',
    radiation: 0,
    radiationDamage: 1,
    thirstReduction: 0,
    templates: ['base', 'physical'],
  },

  miscellany: {
    effect: '',
    quantityRoll: '',
    templates: ['base', 'physical', 'scrappable'],
  },

  robot_mod: {
    effect: '',
    perks: '',
    templates: ['base', 'physical', 'equipable', 'scrappable'],
  },

  weapon_mod: {
    attachable: true,
    attached: false,
    modEffects: '@{ammo=; ammoPerShot=0; damage=; effect=; fireRate=0; info=; summary=; damageEffect=; damageRating=0}',
    modType: '',
    namePrefix: '',
    perks: '',
    qualities: '',
    weaponType: 'meleeWeapons',
    templates: ['base', 'physical'],
  },

  addiction: {
    templates: ['base'],
  },

  disease: {
    daysInfected: 0,
    duration: 1,
    infectionActive: false,
    templates: ['base'],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// createSystemFromTemplate
// Deep-clones the base template for `type`, expands shared template blocks,
// then merges caller-supplied overrides (only modifies existing paths).
// Logs a warning if a required template key is missing from the result.
// ─────────────────────────────────────────────────────────────────────────────

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function expandTemplates(typeKey) {
  const schema = ITEM_TEMPLATES[typeKey];
  if (!schema) {
    console.warn(`[FoundryExport] createSystemFromTemplate: unknown type "${typeKey}"`);
    return {};
  }

  // Start from the merged shared template blocks that this type uses
  const templateNames = schema.templates || [];
  let base = {};
  const SHARED_MAP = {
    base: ITEM_TEMPLATES._base,
    physical: ITEM_TEMPLATES._physical,
    equipable: ITEM_TEMPLATES._equipable,
    scrappable: ITEM_TEMPLATES._scrappable,
  };
  for (const tName of templateNames) {
    if (SHARED_MAP[tName]) {
      base = Object.assign({}, base, deepClone(SHARED_MAP[tName]));
    }
  }

  // Merge the type-specific schema on top (templates array is preserved)
  return Object.assign({}, base, deepClone(schema));
}

/**
 * Build a fully template-complete system object for `type`.
 * `overrides` is a flat or nested object; each key is merged into the clone.
 *
 * Special paths handled explicitly:
 *   - damage.rating, damage.damageType, damage.damageEffect, damage.weaponQuality (weapon)
 *   - resistance, health, location (apparel / robot_armor)
 */
export function createSystemFromTemplate(type, overrides = {}) {
  const system = expandTemplates(type);

  // Apply overrides using path-aware merge for nested objects
  for (const [key, val] of Object.entries(overrides)) {
    if (val !== null && typeof val === 'object' && !Array.isArray(val) &&
        typeof system[key] === 'object' && system[key] !== null && !Array.isArray(system[key])) {
      system[key] = Object.assign({}, system[key], val);
    } else {
      system[key] = val;
    }
  }

  // Validate: warn if any top-level template key is absent
  const schema = ITEM_TEMPLATES[type];
  if (schema) {
    for (const k of Object.keys(schema)) {
      if (!(k in system)) {
        console.warn(`[FoundryExport] system["${type}"].${k} is missing from output — template integrity check failed`);
      }
    }
  }

  return system;
}

// ─────────────────────────────────────────────────────────────────────────────
// Stable skill IDs (confirmed from working Foundry exports)
// ─────────────────────────────────────────────────────────────────────────────

const SKILL_IDS = {
  'Unarmed':        '5xAG0eRrcvDeJAFk',
  'Athletics':      'F4uIprrKWh9ApMaU',
  'Science':        'G3mN15diMiTCDZ0U',
  'Sneak':          'HEegw2EUmmEzfdDM',
  'Pilot':          'PEN70F6ovA3g5HI2',
  'Survival':       'R8YnBNUwhZhG89iQ',
  'Lockpick':       'SH09XavazYU9CqY4',
  'Throwing':       'UQ4TLtVUR2kRlYkb',
  'Small Guns':     'UZDBirrZeUxrAk7b',
  'Medicine':       'UrVd0BmoXkAxmrvv',
  'Repair':         'ZQw4TLZbaLm5F0BW',
  'Speech':         'dOTrlwZ60XWqegQA',
  'Explosives':     'ejKiqeUyjkahCjQf',
  'Energy Weapons': 'jAJPNJpHYawNBp2h',
  'Melee Weapons':  'kCGaEuF27yXyE04i',
  'Big Guns':       'p3GhRmIwrYTJmuhr',
  'Barter':         'vf1Qszkq1om2Xgmn',
};

// ─────────────────────────────────────────────────────────────────────────────
// Utility helpers
// ─────────────────────────────────────────────────────────────────────────────

function generateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function safeParseJson(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

// Foundry uses integers 0/1 for damageEffect/weaponQuality value fields
function b(v) { return v ? 1 : 0; }

function isDefined(v) {
  return v !== undefined && v !== null && !(typeof v === 'string' && v.trim() === '');
}

function pickFirst(...values) {
  for (const value of values) {
    if (isDefined(value)) return value;
  }
  return undefined;
}

function normalizeKey(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function normalizeName(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[+]/g, ' ')
    .replace(/[()]/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripHtml(input) {
  return String(input || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function buildLookup(items, labelField = 'label') {
  const map = new Map();
  for (const item of items || []) {
    if (!item || typeof item !== 'object') continue;
    const key = normalizeKey(item.key);
    const label = normalizeName(item[labelField] || item.name || item.type);
    if (key) map.set(`key:${key}`, item);
    if (label) map.set(`name:${label}`, item);
  }
  return map;
}

function findInLookup(map, candidates = []) {
  for (const candidate of candidates) {
    if (!candidate) continue;
    const byKey = map.get(`key:${normalizeKey(candidate)}`);
    if (byKey) return byKey;
    const byName = map.get(`name:${normalizeName(candidate)}`);
    if (byName) return byName;
  }
  return null;
}

function safeQty(value, fallback = 1) {
  const qty = parseInt(value, 10);
  return Number.isFinite(qty) && qty > 0 ? qty : fallback;
}

function defaultShotsPerUnit(ammoName = '') {
  const map = {
    'fusion cell': 20,
  };
  return map[String(ammoName || '').trim().toLowerCase()] || 1;
}

function cleanPerkKeyLabel(key) {
  // Remove generated lookup suffixes like "_wc8tgvkf6ohfy9xr" from display labels.
  const normalized = String(key || '')
    .replace(/_[a-z0-9]{10,}$/i, '')
    .replace(/_/g, ' ')
    .trim();
  return normalized.replace(/\b\w/g, c => c.toUpperCase());
}

function robotModLookupCandidates(entry = {}) {
  const base = [entry.key, entry.name, entry.label].filter(Boolean);
  const normalizedName = normalizeName(entry.name || entry.label || '');
  const mappedLabel = ROBOT_MOD_ALIAS_MAP[normalizedName];
  if (mappedLabel) base.push(mappedLabel);
  return base;
}

const WEAPON_LOOKUP = buildLookup(CORE_WEAPONS);
const AMMO_LOOKUP = buildLookup(CORE_AMMO);
const APPAREL_LOOKUP = buildLookup([...CORE_APPAREL, ...CORE_ARMOR, ...CORE_POWER_ARMOR]);
const ALL_APPAREL_ITEMS = [...CORE_APPAREL, ...CORE_ARMOR, ...CORE_POWER_ARMOR];
const CHEM_LOOKUP = buildLookup(CORE_CHEMS);
const FOOD_LOOKUP = buildLookup(CORE_FOOD);
const OTHER_CONSUMABLE_LOOKUP = buildLookup(CORE_OTHER_CONSUMABLES);
const PERK_LOOKUP = buildLookup(CORE_PERKS);
const ROBOT_MOD_LOOKUP = buildLookup(CORE_ROBOT_MODS);
const WEAPON_MOD_LOOKUP = buildLookup(CORE_WEAPON_MODS);
const MISCELLANY_LOOKUP = buildLookup(CORE_MISCELLANY);
const ROBOT_MOD_ALIAS_MAP = {
  'behavioral analysis module': 'Behavioral Analysis Mod',
  'behavioral analysis mod': 'Behavioral Analysis Mod',
  'recon sensors mod': 'Recon Sensors',
  'recon sensors': 'Recon Sensors',
  'protectron sensors': 'Sensor Array',
};

function isPowerArmorText(value = '') {
  return /power\s*armor|powerarmor/.test(String(value || '').toLowerCase());
}

function isPowerArmorRef(item = {}) {
  return (
    isPowerArmorText(item.type) ||
    isPowerArmorText(item.set) ||
    isPowerArmorText(item.label)
  );
}

function findBestApparelReference(entry = {}) {
  const candidates = [entry.key, entry.name, entry.label, entry.linkedArmorName].filter(Boolean);
  if (!candidates.length) return null;

  const wantedPower = candidates.some(isPowerArmorText) || isPowerArmorText(entry.type);
  const normalizedCandidates = candidates.map((c) => normalizeName(c));
  const matched = [];

  for (const item of ALL_APPAREL_ITEMS) {
    const itemLabel = normalizeName(item?.label || item?.name || '');
    const itemKey = normalizeKey(item?.key || '');
    const hasMatch = normalizedCandidates.some((c) => itemLabel === c || itemKey === normalizeKey(c));
    if (hasMatch) matched.push(item);
  }
  if (!matched.length) return null;

  const filtered = matched.filter((item) => isPowerArmorRef(item) === wantedPower);
  if (filtered.length === 1) return filtered[0];
  if (filtered.length > 1) {
    return filtered.sort((a, b) => (String(a.label || '').length - String(b.label || '').length))[0];
  }
  if (matched.length === 1) return matched[0];
  return matched.sort((a, b) => (String(a.label || '').length - String(b.label || '').length))[0];
}

// ─────────────────────────────────────────────────────────────────────────────
// Metadata builders
// ─────────────────────────────────────────────────────────────────────────────

function buildActorStats() {
  const now = Date.now();
  return {
    compendiumSource: null, duplicateSource: null,
    exportSource: { worldId: 'fallout', uuid: `Actor.${generateId()}`, coreVersion: '13.351', systemId: 'fallout', systemVersion: '11.16.6' },
    coreVersion: '13.351', systemId: 'fallout', systemVersion: '11.16.6',
    createdTime: now, modifiedTime: now, lastModifiedBy: null,
  };
}

function buildItemStats() {
  return {
    compendiumSource: null, duplicateSource: null, exportSource: null,
    coreVersion: '13.351', systemId: 'fallout', systemVersion: '11.16.6', lastModifiedBy: null,
  };
}

function makeItemBase(id, name, type, imgPath) {
  return {
    _id: id || generateId(),
    _stats: buildItemStats(),
    effects: [],
    flags: {},
    folder: null,
    img: imgPath || `systems/fallout/assets/icons/items/${type}.webp`,
    name,
    sort: 0,
    system: {},
    type,
    ownership: { default: 0 },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Parsing helpers for weapon strings
// ─────────────────────────────────────────────────────────────────────────────

function parseDamageEffects(effectsStr) {
  const str = (effectsStr || '').toLowerCase();
  const piercingMatch = str.match(/piercing\s*(\d+)/);
  // Clone the template's damageEffect block, then set values
  const effects = deepClone(ITEM_TEMPLATES.weapon.damage.damageEffect);
  effects.arc.value          = b(str.includes('arc'));
  effects.breaking.value     = b(str.includes('breaking'));
  effects.burst.value        = b(str.includes('burst'));
  effects.freeze.value       = b(str.includes('freeze'));
  effects.persistent.value   = b(str.includes('persistent'));
  effects.piercing_x.rank    = piercingMatch ? parseInt(piercingMatch[1]) : 1;
  effects.piercing_x.value   = b(!!piercingMatch);
  effects.radioactive.value  = b(str.includes('radioactive'));
  effects.spread.value       = b(str.includes('spread'));
  effects.stun.value         = b(str.includes('stun'));
  effects.vicious.value      = b(str.includes('vicious'));
  return effects;
}

function parseWeaponQualities(qualStr) {
  const str = (qualStr || '').toLowerCase();
  const recoilMatch    = str.match(/recoil\s*\((\d+)\)/);
  const ammoHungryMatch = str.match(/ammo.hungry\s*\((\d+)\)/);
  // Clone the template's weaponQuality block, then set values
  const q = deepClone(ITEM_TEMPLATES.weapon.damage.weaponQuality);
  q.accurate.value       = b(str.includes('accurate') && !str.includes('inaccurate'));
  q.ammo_hungry_x.rank   = ammoHungryMatch ? parseInt(ammoHungryMatch[1]) : 1;
  q.ammo_hungry_x.value  = b(!!ammoHungryMatch);
  q.blast.value          = b(str.includes('blast'));
  q.close_quarters.value = b(str.includes('close quarters'));
  q.concealed.value      = b(str.includes('concealed'));
  q.debilitating.value   = b(str.includes('debilitating'));
  q.delay_x.value        = b(str.includes('delay'));
  q.gatling.value        = b(str.includes('gatling'));
  q.inaccurate.value     = b(str.includes('inaccurate'));
  q.mine.value           = b(str.includes('mine'));
  q.parry.value          = b(str.includes('parry'));
  q.placed.value         = b(str.includes('placed'));
  q.recoil_x.rank        = recoilMatch ? parseInt(recoilMatch[1]) : 1;
  q.recoil_x.value       = b(!!recoilMatch);
  q.reliable.value       = b(str.includes('reliable') && !str.includes('unreliable'));
  q.slow_load.value      = b(str.includes('slow load'));
  q.suppressed.value     = b(str.includes('suppressed'));
  q.thrown.value         = b(str.includes('thrown'));
  q.two_handed.value     = b(str.includes('two-handed') || str.includes('two handed'));
  q.unreliable.value     = b(str.includes('unreliable'));
  return q;
}

function mapWeaponType(type) {
  const direct = String(type || '').trim();
  if (['smallGuns', 'energyWeapons', 'bigGuns', 'meleeWeapons', 'unarmed', 'throwing', 'explosives'].includes(direct)) {
    return direct;
  }
  const map = {
    'Small Guns': 'smallGuns', 'Energy Weapons': 'energyWeapons',
    'Big Guns': 'bigGuns', 'Melee': 'meleeWeapons', 'Unarmed': 'unarmed',
    'Throwing': 'throwing', 'Explosive': 'explosives', 'Bow': 'smallGuns',
  };
  return map[type] || 'meleeWeapons';
}

function mapWeaponModType(type = '') {
  const t = String(type || '').trim().toLowerCase();
  if (!t) return '';
  if (t === 'melee') return 'melee';
  return t.replace(/\s+/g, '_');
}

function findWeaponModReference(entry = {}, fallbackWeaponType = '') {
  const candidates = [
    entry?.key,
    entry?.value,
    entry?.name,
    entry?.label,
    entry?.sourceName,
  ].filter(Boolean);

  const direct = findInLookup(WEAPON_MOD_LOOKUP, candidates);
  if (direct) return direct;

  const wantedWeaponType = mapWeaponType(fallbackWeaponType || '');
  const wantedLabel = normalizeName(entry?.value || entry?.name || entry?.label || '');
  if (!wantedLabel) return null;

  const matches = CORE_WEAPON_MODS.filter((mod) => normalizeName(mod?.label) === wantedLabel);
  if (!matches.length) return null;
  if (!wantedWeaponType) return matches[0];

  return matches.find((mod) => mapWeaponType(mod?.weaponType) === wantedWeaponType) || matches[0];
}

function findWeaponCompatibilityMap(ref = null, weapon = {}) {
  const candidates = [
    ref?.label,
    ref?.name,
    weapon?.sourceName,
    weapon?.name,
    weapon?.label,
  ].filter(Boolean);
  const normalized = candidates.map((name) => normalizeName(name));
  for (const [weaponName, slotMap] of Object.entries(CORE_WEAPON_MOD_COMPATIBILITY || {})) {
    const key = normalizeName(weaponName);
    if (normalized.includes(key)) return slotMap || {};
  }
  return {};
}

function mapWeaponQualityKey(label = '') {
  const norm = normalizeName(label);
  const map = {
    accurate: 'accurate',
    aquatic: 'aquatic',
    'ammo hungry': 'ammo_hungry_x',
    blast: 'blast',
    bombard: 'bombard',
    'close quarters': 'close_quarters',
    concealed: 'concealed',
    debilitating: 'debilitating',
    delay: 'delay_x',
    gatling: 'gatling',
    'fuel': 'fuel_x',
    inaccurate: 'inaccurate',
    limited: 'limited',
    mine: 'mine',
    'night vision': 'night_vision',
    parry: 'parry',
    placed: 'placed',
    recoil: 'recoil_x',
    recon: 'recon',
    reliable: 'reliable',
    'slow load': 'slow_load',
    suppressed: 'suppressed',
    surge: 'surge',
    thrown: 'thrown',
    'two handed': 'two_handed',
    unreliable: 'unreliable',
    'unstable radiation': 'unstable_radiation',
    wrangle: 'wrangle',
  };
  return map[norm] || null;
}

function buildWeaponModEffects(ref = {}, fallback = {}) {
  const damageDelta = Number(ref?.damageDelta ?? fallback?.damageDelta ?? 0) || 0;
  const fireRateDelta = Number(ref?.fireRateDelta ?? fallback?.fireRateDelta ?? 0) || 0;
  const rangeDelta = Number(ref?.rangeDelta ?? fallback?.rangeDelta ?? 0) || 0;
  const summary = String(ref?.summary ?? fallback?.summary ?? '');
  const effect = String(ref?.effect ?? fallback?.effect ?? '');
  const info = String(ref?.note ?? fallback?.note ?? '');
  const quality = deepClone(ITEM_TEMPLATES.weapon.damage.weaponQuality);

  const addQualities = Array.isArray(ref?.addQualities) ? ref.addQualities : [];
  const removeQualities = Array.isArray(ref?.removeQualities) ? ref.removeQualities : [];
  for (const q of addQualities) {
    const key = mapWeaponQualityKey(q);
    if (key && quality[key]) quality[key].value = 1;
  }
  for (const q of removeQualities) {
    const key = mapWeaponQualityKey(q);
    if (key && quality[key]) quality[key].value = -1;
  }

  return {
    ammo: '',
    ammoPerShot: 0,
    damage: {
      damageEffect: deepClone(ITEM_TEMPLATES.weapon.damage.damageEffect),
      damageType: { energy: false, physical: false, poison: false, radiation: false },
      overrideDamage: 'modify',
      rating: damageDelta,
      weaponQuality: quality,
    },
    effect,
    fireRate: fireRateDelta,
    info,
    range: rangeDelta,
    summary,
    damageEffect: '',
    damageRating: 0,
  };
}

function buildWeaponModItem(entry = {}, options = {}) {
  const { attached = false, quantity = 1, fallbackWeaponType = '' } = options;
  const ref = findWeaponModReference(entry, fallbackWeaponType);
  const name = pickFirst(entry?.name, entry?.label, entry?.value, ref?.label, 'Weapon Mod');
  const description = String(pickFirst(entry?.note, ref?.note, '') || '');
  const modType = String(pickFirst(entry?.modType, ref?.modType, '') || '');
  const namePrefix = String(pickFirst(entry?.namePrefix, ref?.namePrefix, '') || '');
  const perks = String(pickFirst(entry?.perks, ref?.perks, '') || '');
  const qualities = String(pickFirst(entry?.qualities, ref?.qualities, '') || '');
  const item = makeItemBase(null, name, 'weapon_mod', 'systems/fallout/assets/icons/items/weapon_mod.svg');
  item.system = createSystemFromTemplate('weapon_mod', {
    description: description ? `<p>${stripHtml(description)}</p>` : '',
    source: ref?.foundryUuid ? 'core_rulebook' : 'custom',
    cost: parseInt(pickFirst(entry?.cost, ref?.cost, 0), 10) || 0,
    quantity: safeQty(entry?.quantity, quantity),
    rarity: parseInt(pickFirst(entry?.rarity, ref?.rarity, 0), 10) || 0,
    weight: parseFloat(pickFirst(entry?.weight, ref?.weight, 0)) || 0,
    attachable: true,
    attached: Boolean(attached),
    modEffects: buildWeaponModEffects(ref, entry),
    modType: mapWeaponModType(modType),
    namePrefix,
    perks,
    qualities,
    weaponType: mapWeaponType(pickFirst(entry?.weaponType, ref?.weaponType, fallbackWeaponType || 'Melee')),
  });
  if (ref?.foundryUuid) item._stats.compendiumSource = ref.foundryUuid;
  return item;
}

function mapRange(range) {
  const r = (range || '').toLowerCase();
  if (r === 'long') return 'long';
  if (r === 'medium') return 'medium';
  return 'close';
}

function mapApparelLocations(locationsArray) {
  const locs = Array.isArray(locationsArray) ? locationsArray : [locationsArray || ''];
  const all = locs.some(l => (l || '').toLowerCase() === 'all');
  return {
    head: all || locs.some(l => /head/i.test(l)),
    armL: all || locs.some(l => /arm/i.test(l)),
    armR: all || locs.some(l => /arm/i.test(l)),
    torso: all || locs.some(l => /torso/i.test(l)),
    legL: all || locs.some(l => /leg/i.test(l)),
    legR: all || locs.some(l => /leg/i.test(l)),
  };
}

function mapApparelType(type) {
  const t = (type || '').toLowerCase();
  if (t.includes('power armor') || t.includes('power_armor')) return 'powerArmor';
  if (t.includes('outfit')) return 'outfit';
  if (t.includes('headgear') || t.includes('clothing')) return 'clothing';
  return 'armor';
}

// ─────────────────────────────────────────────────────────────────────────────
// Skill data
// ─────────────────────────────────────────────────────────────────────────────

const SKILL_KEY_MAP = {
  unarmed: 'Unarmed', athletics: 'Athletics', science: 'Science', sneak: 'Sneak',
  pilot: 'Pilot', survival: 'Survival', lockpick: 'Lockpick', throwing: 'Throwing',
  small_guns: 'Small Guns', medicine: 'Medicine', repair: 'Repair', speech: 'Speech',
  explosives: 'Explosives', energy_weapons: 'Energy Weapons', melee_weapons: 'Melee Weapons',
  big_guns: 'Big Guns', barter: 'Barter',
};

const SKILL_DEFAULTS = {
  'Unarmed': 'str', 'Athletics': 'str', 'Science': 'int', 'Sneak': 'agi',
  'Pilot': 'per', 'Survival': 'end', 'Lockpick': 'per', 'Throwing': 'agi',
  'Small Guns': 'agi', 'Medicine': 'int', 'Repair': 'int', 'Speech': 'cha',
  'Explosives': 'per', 'Energy Weapons': 'per', 'Melee Weapons': 'str',
  'Big Guns': 'end', 'Barter': 'cha',
};

const SKILL_DESCRIPTIONS = {
  'Unarmed': 'The Unarmed skill covers your ability to fight with your fists. Its default S.P.E.C.I.A.L. attribute is Strength.',
  'Athletics': 'Athletics describes your ability to apply physical strength and agility. Its default attribute is Strength.',
  'Science': 'The Science skill covers academic and practical knowledge. Its default attribute is Intelligence.',
  'Sneak': 'The Sneak skill covers stealthy movement. Its default attribute is Agility.',
  'Pilot': 'The Pilot skill covers operating vehicles. Its default attribute is Perception.',
  'Survival': 'Survival covers practical bush craft. Its default attribute is Endurance.',
  'Lockpick': 'Lockpick reflects knowledge of manipulating locks. Its default attribute is Perception.',
  'Throwing': 'Throwing describes effective attacks with thrown weapons. Its default attribute is Agility.',
  'Small Guns': 'Small Guns covers pistols, rifles, and shotguns. Its default attribute is Agility.',
  'Medicine': 'Medicine covers medical practices and first aid. Its default attribute is Intelligence.',
  'Repair': 'Repair covers maintaining and fixing equipment. Its default attribute is Intelligence.',
  'Speech': 'Speech covers social interaction and persuasion. Its default attribute is Charisma.',
  'Explosives': 'Explosives covers placing and using explosive devices. Its default attribute is Perception.',
  'Energy Weapons': 'Energy Weapons covers laser, plasma, and energy-based arms. Its default attribute is Perception.',
  'Melee Weapons': 'Melee Weapons covers hand-held melee combat. Its default attribute is Strength.',
  'Big Guns': 'Big Guns covers heavy weapons such as miniguns and missile launchers. Its default attribute is Endurance.',
  'Barter': 'Barter covers trade and negotiating prices. Its default attribute is Charisma.',
};

// ─────────────────────────────────────────────────────────────────────────────
// Item builders — all use createSystemFromTemplate
// ─────────────────────────────────────────────────────────────────────────────

function buildSkillItems(character) {
  const rawSkills   = safeParseJson(character.skills, {});
  const rawTagSkills = getMergedTagSkills(character, safeParseJson(character.tag_skills, []));

  const skillLookup = {};
  if (Array.isArray(rawSkills)) {
    rawSkills.forEach(s => {
      const name = SKILL_KEY_MAP[s.key] || s.label || s.key;
      skillLookup[name] = { rank: s.rank ?? 0, tag: false };
    });
  } else if (rawSkills && typeof rawSkills === 'object') {
    Object.entries(rawSkills).forEach(([k, v]) => {
      const name = SKILL_KEY_MAP[k] || k;
      skillLookup[name] = { rank: typeof v === 'number' ? v : (v?.rank ?? 0), tag: false };
    });
  }
  if (Array.isArray(rawTagSkills)) {
    rawTagSkills.forEach(k => {
      const name = SKILL_KEY_MAP[k] || k;
      if (!skillLookup[name]) skillLookup[name] = { rank: 0, tag: true };
      else skillLookup[name].tag = true;
    });
  }

  return Object.entries(SKILL_DEFAULTS).map(([skillName, defaultAttr]) => {
    const appSkill = skillLookup[skillName] || { rank: 0, tag: false };
    const appSkillKey = SKILL_KEY_MAP[skillName] || skillName;
    const cap = getSkillRankCapForCharacter(character, appSkillKey);
    const effectiveRank = getEffectiveSkillRank(appSkill.rank || 0, appSkill.tag || false, cap);
    const item = makeItemBase(SKILL_IDS[skillName], skillName, 'skill', 'systems/fallout/assets/icons/items/skill.webp');
    item.system = createSystemFromTemplate('skill', {
      description: SKILL_DESCRIPTIONS[skillName] || '',
      source: 'core_rulebook',
      defaultAttribute: defaultAttr,
      tag: appSkill.tag || false,
      value: effectiveRank,
    });
    return item;
  });
}

function buildWeaponItem(w) {
  const ref = findInLookup(WEAPON_LOOKUP, [w.key, w.name, w.label]);
  const resolved = {
    name: pickFirst(w.name, w.label, ref?.label, 'Weapon'),
    type: pickFirst(w.type, ref?.type, 'Melee'),
    damage: pickFirst(w.damage, ref?.damage, '0'),
    damageType: pickFirst(w.damageType, ref?.damageType, 'Physical'),
    damageEffect: pickFirst(w.damageEffect, ref?.damageEffect, ''),
    qualities: pickFirst(w.qualities, ref?.qualities, ''),
    range: pickFirst(w.range, ref?.range, 'Close'),
    fireRate: pickFirst(w.fireRate, w.fire_rate, ref?.fireRate, 0),
    ammo: pickFirst(w.ammoType, w.ammo, ref?.ammo, ''),
    cost: pickFirst(w.cost, ref?.cost, 0),
    rarity: pickFirst(w.rarity, ref?.rarity, 0),
    weight: pickFirst(w.weight, ref?.weight, 0),
    quantity: safeQty(w.quantity, 1),
    notes: pickFirst(w.note, w.notes, ref?.note, ''),
  };

  const isMelee     = ['Melee', 'Unarmed'].includes(resolved.type);
  const damageRating = parseInt(String(resolved.damage || '0').replace(/[^0-9]/g, ''), 10) || 0;
  const dtStr        = resolved.damageType || '';
  const isEnergy     = /energy/i.test(dtStr);
  const isRadiation  = /radiation/i.test(dtStr);
  const isPoison     = /poison/i.test(dtStr);
  const isPhysical   = /physical/i.test(dtStr) || (!isEnergy && !isRadiation && !isPoison);

  const item = makeItemBase(null, resolved.name, 'weapon', 'systems/fallout/assets/icons/items/weapon.svg');

  // Build via template, then patch nested objects that need deep mutation
  const system = createSystemFromTemplate('weapon', {
    description:      resolved.notes ? `<p>${resolved.notes}</p>` : '',
    source:           ref ? 'core_rulebook' : 'custom',
    cost:             parseInt(resolved.cost, 10) || 0,
    quantity:         resolved.quantity,
    rarity:           parseInt(resolved.rarity, 10) || 0,
    weight:           parseFloat(resolved.weight) || 0,
    ammo:             resolved.ammo || '',
    ammoPerShot:      1,
    creatureSkill:    isMelee ? 'melee' : 'guns',
    fireRate:         parseInt(resolved.fireRate, 10) || 0,
    melee:            isMelee,
    range:            mapRange(resolved.range),
    weaponType:       mapWeaponType(resolved.type),
  });

  // Patch damage sub-object individually (nested merge)
  system.damage.rating = damageRating;
  system.damage.damageType = { energy: isEnergy, physical: isPhysical, poison: isPoison, radiation: isRadiation };
  system.damage.damageEffect  = parseDamageEffects(resolved.damageEffect || '');
  system.damage.weaponQuality = parseWeaponQualities(resolved.qualities || '');

  const compatibility = findWeaponCompatibilityMap(ref, w);
  const installedRaw = w?.installedMods && typeof w.installedMods === 'object' ? w.installedMods : {};
  const installedNames = [];
  const modEntriesByName = new Map();
  const addModEntry = (modRef, attached = false) => {
    if (!modRef) return;
    const key = normalizeName(modRef.label || modRef.name || '');
    if (!key) return;
    const existing = modEntriesByName.get(key);
    if (existing) {
      if (attached) existing.system.attached = true;
      return;
    }
    modEntriesByName.set(key, buildWeaponModItem(modRef, { attached, quantity: 1, fallbackWeaponType: resolved.type }));
  };

  for (const modLabels of Object.values(compatibility || {})) {
    for (const modLabel of Array.isArray(modLabels) ? modLabels : []) {
      const modRef = findWeaponModReference({ label: modLabel, value: modLabel }, resolved.type);
      if (modRef) addModEntry(modRef, false);
    }
  }
  for (const value of Object.values(installedRaw || {})) {
    const modRef = findWeaponModReference({ value, label: value, name: value }, resolved.type);
    if (!modRef) continue;
    addModEntry(modRef, true);
    installedNames.push(modRef.label || modRef.name || String(value));
  }
  if (modEntriesByName.size > 0 || installedNames.length > 0) {
    system.mods = { ...system.mods };
    for (const modItem of modEntriesByName.values()) {
      system.mods[modItem._id] = modItem;
    }
    system.mods.modded = installedNames.length > 0;
    system.mods.installedMods = installedNames.join(', ');
  }

  item.system = system;
  if (ref?.foundryUuid) item._stats.compendiumSource = ref.foundryUuid;
  return item;
}

function buildApparelItem(a) {
  const ref = findBestApparelReference(a) || findInLookup(APPAREL_LOOKUP, [a.key, a.name, a.label, a.linkedArmorName]);
  const source = {
    name: pickFirst(a.name, a.label, a.linkedArmorName, ref?.label, 'Apparel'),
    type: pickFirst(a.type, ref?.type, 'Armor'),
    special: pickFirst(a.special, ref?.special, ''),
    cost: pickFirst(a.cost, ref?.cost, 0),
    rarity: pickFirst(a.rarity, ref?.rarity, 0),
    weight: pickFirst(a.weight, ref?.weight, 0),
    quantity: safeQty(a.quantity, 1),
    physRes: pickFirst(a.physRes, a.physDR, ref?.physRes, 0),
    enerRes: pickFirst(a.enerRes, a.energyDR, ref?.enerRes, 0),
    radRes: pickFirst(a.radRes, a.radDR, ref?.radRes, 0),
    hp: pickFirst(a.hp, ref?.hp, 0),
    locations: pickFirst(a.locations, ref?.locations, []),
  };

  const locationsRaw = source.locations
    ? (typeof source.locations === 'string' ? source.locations.split(',').map(s => s.trim()) : source.locations)
    : (Array.isArray(source.locations) ? source.locations : []);
  const hp = parseInt(source.hp, 10) || 0;
  const normalizedType = String(source.type || '').toLowerCase();
  const itemType = normalizedType.includes('robot') ? 'robot_armor' : 'apparel';
  const item = makeItemBase(null, source.name, itemType, 'systems/fallout/assets/icons/items/apparel.svg');
  const system = createSystemFromTemplate(itemType, {
    description:  source.special ? `<p>${source.special}</p>` : '',
    source:       ref ? 'core_rulebook' : 'custom',
    cost:         parseInt(source.cost, 10) || 0,
    quantity:     source.quantity,
    rarity:       parseInt(source.rarity, 10) || 0,
    weight:       parseFloat(source.weight) || 0,
    apparelType:  mapApparelType(source.type || ''),
    shadowed:     false,
  });

  // Patch nested objects
  system.health     = { max: hp, min: 0, mod: 0, value: hp };
  system.location   = mapApparelLocations(locationsRaw);
  system.resistance = {
    energy: parseInt(source.enerRes, 10) || 0,
    physical: parseInt(source.physRes, 10) || 0,
    radiation: parseInt(source.radRes, 10) || 0,
  };

  item.system = system;
  if (ref?.foundryUuid) item._stats.compendiumSource = ref.foundryUuid;
  return item;
}

function buildPerkItem(p) {
  const key = typeof p === 'string' ? p : p?.key;
  const ref = findInLookup(PERK_LOOKUP, [key, p?.label, p?.name]);
  const label       = pickFirst(
    ref?.label,
    p?.label,
    p?.name,
    typeof p === 'string' ? cleanPerkKeyLabel(p) : undefined,
    'Perk'
  );
  const description = pickFirst(p?.description, ref?.description, '');
  const requirements = pickFirst(p?.requirements, ref?.requirements, {});
  const rankMax = parseInt(pickFirst(p?.ranks, p?.maxRanks, ref?.ranks, 1), 10) || 1;

  const item = makeItemBase(null, label, 'perk', 'systems/fallout/assets/icons/items/perk.webp');
  item.system = createSystemFromTemplate('perk', {
    description: description ? `<p>${description}</p>` : '',
    source:      ref ? 'core_rulebook' : 'custom',
  });
  // Set rank value to 1 (character has this perk)
  item.system.rank.value = 1;
  item.system.rank.max = rankMax;
  item.system.requirementsEx.level = parseInt(requirements.level, 10) || 1;
  const attrMap = { STR: 'str', PER: 'per', END: 'end', CHA: 'cha', INT: 'int', AGI: 'agi', LCK: 'luc' };
  for (const [abbr, field] of Object.entries(attrMap)) {
    const req = parseInt(requirements[abbr], 10);
    if (req > 0) item.system.requirementsEx.attributes[field].value = req;
  }
  if (ref?.foundryUuid) item._stats.compendiumSource = ref.foundryUuid;
  return item;
}

function buildAmmoItem(a) {
  const ref = findInLookup(AMMO_LOOKUP, [a.key, a.type, a.label, a.name]);
  const name = pickFirst(a.type, a.label, a.name, ref?.label, 'Ammo');
  const qty = safeQty(a.quantity, 1);
  const shotsPerUnit = safeQty(a.shotsPerUnit ?? a.shots_per_unit ?? a.shots, defaultShotsPerUnit(name));
  const item = makeItemBase(null, name, 'ammo', ref?.foundryUuid ? 'systems/fallout/assets/icons/items/ammo.svg' : 'systems/fallout/assets/icons/items/ammo.webp');
  item.system = createSystemFromTemplate('ammo', {
    source:   ref?.foundryUuid ? 'core_rulebook' : 'custom',
    cost:     parseInt(pickFirst(a.cost, ref?.cost, 1), 10) || 1,
    quantity: qty,
    rarity:   parseInt(pickFirst(a.rarity, ref?.rarity, 1), 10) || 1,
    weight:   parseFloat(pickFirst(a.weight, ref?.weight, 0.1)) || 0.1,
    effect:   pickFirst(a.effect, ref?.effect, ''),
    fusionCore: false,
  });
  if (ref?.foundryUuid) {
    item._stats.compendiumSource = ref.foundryUuid;
  }
  item.system.charges = { current: shotsPerUnit, max: shotsPerUnit };
  item.system.shots   = { current: shotsPerUnit, max: shotsPerUnit };
  return item;
}

function buildConsumableItem(c, type = 'chem') {
  const lookup = type === 'chem' ? CHEM_LOOKUP : type === 'food' ? FOOD_LOOKUP : OTHER_CONSUMABLE_LOOKUP;
  const ref = findInLookup(lookup, [c.key, c.label, c.name]);
  const name = pickFirst(c.label, c.name, ref?.label, type === 'food' ? 'Food' : 'Consumable');
  const quantity = safeQty(c.quantity, 1);
  const cost = parseInt(pickFirst(c.cost, ref?.cost, 0), 10) || 0;
  const rarity = parseInt(pickFirst(c.rarity, ref?.rarity, 0), 10) || 0;
  const weight = parseFloat(pickFirst(c.weight, ref?.weight, type === 'food' ? 0.5 : 0.1)) || (type === 'food' ? 0.5 : 0.1);
  const effectText = pickFirst(c.effect, ref?.effect, '');
  const hp = parseInt(pickFirst(c.hp, ref?.hp, 0), 10) || 0;
  const isAddictive = Boolean(pickFirst(c.addictive, ref?.addictive, false));
  const duration = pickFirst(c.duration, ref?.duration, type === 'food' ? 'instant' : 'lasting');
  const consumableType = type === 'food' ? 'food' : type === 'chem' ? 'chem' : 'other';
  const irradiated = Boolean(pickFirst(c.irradiated, ref?.irradiated, false));
  const desc = type === 'food'
    ? `<p>Heals ${hp} HP.${effectText ? ` ${effectText}` : ''}</p>`
    : (effectText ? `<p>${effectText}</p>` : '');

  const item = makeItemBase(null, name, 'consumable', 'systems/fallout/assets/icons/items/consumable.webp');
  item.system = createSystemFromTemplate('consumable', {
    description:     desc,
    source:          ref?.foundryUuid ? 'core_rulebook' : 'custom',
    cost,
    quantity,
    rarity,
    weight,
    consumableType,
    duration:        String(duration).toLowerCase(),
    effect:          effectText || '',
    hp,
    addictive:       isAddictive,
    irradiated,
  });

  const addictionRating = parseInt(pickFirst(c.addictionNumber, ref?.addictionNumber, c.addiction, 0), 10);
  if (addictionRating > 0) item.system.addiction = addictionRating;
  if (ref?.foundryUuid) item._stats.compendiumSource = ref.foundryUuid;

  return item;
}

function buildMiscellanyItem(entry) {
  const ref = findInLookup(MISCELLANY_LOOKUP, [entry.key, entry.name, entry.label]);
  const name = pickFirst(entry.name, entry.label, ref?.label, 'Miscellany');
  const qty = safeQty(entry.quantity, 1);
  const effect = pickFirst(entry.effect, ref?.effect, entry.note, entry.notes, '');
  const description = pickFirst(entry.note, entry.notes, ref?.note, '');
  const item = makeItemBase(null, name, 'miscellany', 'systems/fallout/assets/icons/items/miscellany.svg');
  item.system = createSystemFromTemplate('miscellany', {
    description: description ? `<p>${stripHtml(description)}</p>` : (effect ? `<p>${stripHtml(effect)}</p>` : ''),
    source: ref?.foundryUuid ? 'core_rulebook' : 'custom',
    cost: parseInt(pickFirst(entry.cost, ref?.cost, 0), 10) || 0,
    quantity: qty,
    rarity: parseInt(pickFirst(entry.rarity, ref?.rarity, 0), 10) || 0,
    weight: parseFloat(pickFirst(entry.weight, ref?.weight, 0)) || 0,
    effect: effect || '',
  });
  if (ref?.foundryUuid) item._stats.compendiumSource = ref.foundryUuid;
  return item;
}

function buildRobotModItem(entry) {
  const ref = findInLookup(ROBOT_MOD_LOOKUP, robotModLookupCandidates(entry));
  const name = pickFirst(entry.name, entry.label, ref?.label, 'Robot Mod');
  const qty = safeQty(entry.quantity, 1);
  const effect = pickFirst(entry.effect, ref?.effect, entry.note, entry.notes, '');
  const description = pickFirst(entry.note, entry.notes, ref?.note, '');
  const item = makeItemBase(null, name, 'robot_mod', 'systems/fallout/assets/icons/items/robot_mod.svg');
  item.system = createSystemFromTemplate('robot_mod', {
    description: description ? `<p>${stripHtml(description)}</p>` : (effect ? `<p>${stripHtml(effect)}</p>` : ''),
    source: ref ? 'core_rulebook' : pickFirst(entry.source, 'custom'),
    cost: parseInt(pickFirst(entry.cost, ref?.cost, 0), 10) || 0,
    quantity: qty,
    rarity: parseInt(pickFirst(entry.rarity, ref?.rarity, 0), 10) || 0,
    weight: parseFloat(pickFirst(entry.weight, ref?.weight, 0)) || 0,
    effect: effect || '',
    perks: pickFirst(entry.perks, ref?.perks, ''),
  });
  if (ref?.foundryUuid) {
    item._stats.compendiumSource = ref.foundryUuid;
  }
  return item;
}

function buildAddictionItem(entry) {
  const name = pickFirst(entry.label, entry.name, entry.key, 'Addiction');
  const effect = pickFirst(entry.effect, '');
  const item = makeItemBase(null, name, 'addiction', 'systems/fallout/assets/icons/items/addiction.svg');
  item.system = createSystemFromTemplate('addiction', {
    description: effect ? `<p>${stripHtml(effect)}</p>` : '',
    source: 'custom',
  });
  return item;
}

function buildDiseaseItem(entry) {
  const name = pickFirst(entry.label, entry.name, entry.key, 'Disease');
  const effect = pickFirst(entry.effect, entry.notes, '');
  const item = makeItemBase(null, name, 'disease', 'systems/fallout/assets/icons/items/disease.svg');
  item.system = createSystemFromTemplate('disease', {
    description: effect ? `<p>${stripHtml(effect)}</p>` : '',
    source: 'custom',
    duration: parseInt(entry.duration, 10) || 1,
    daysInfected: parseInt(entry.daysInfected, 10) || 0,
    infectionActive: Boolean(entry.infectionActive ?? true),
  });
  return item;
}

// ─────────────────────────────────────────────────────────────────────────────
// Build all embedded items for an actor
// ─────────────────────────────────────────────────────────────────────────────

function buildEmbeddedItems(character) {
  const items = buildSkillItems(character);

  // Weapons
  const appWeapons = safeParseJson(character.equipment, []);
  if (Array.isArray(appWeapons)) {
    appWeapons.forEach(w => {
      if (!w || typeof w !== 'object') return;
      items.push(buildWeaponItem(w));
    });
  }

  // Weapon mods (inventory + installed)
  const weaponModItemsByKey = new Map();
  const upsertWeaponModItem = (entry, options = {}) => {
    const item = buildWeaponModItem(entry, options);
    const dedupeKey = `${normalizeName(item.name)}::${item.system?.attached ? 'attached' : 'inventory'}`;
    const existing = weaponModItemsByKey.get(dedupeKey);
    if (!existing) {
      weaponModItemsByKey.set(dedupeKey, item);
      return;
    }
    const existingQty = parseInt(existing.system?.quantity, 10) || 0;
    const nextQty = parseInt(item.system?.quantity, 10) || 0;
    existing.system.quantity = Math.max(existingQty, nextQty);
  };

  const appGearMods = safeParseJson(character.gear_mods, []);
  if (Array.isArray(appGearMods)) {
    appGearMods.forEach((mod) => {
      if (!mod || typeof mod !== 'object') return;
      const category = String(mod.modCategory || 'weapon').toLowerCase();
      if (category === 'apparel') return;
      const qty = parseInt(mod.quantity, 10) || 0;
      if (qty <= 0) return;
      upsertWeaponModItem(mod, { attached: false, quantity: qty, fallbackWeaponType: mod.weaponType || '' });
    });
  }
  if (Array.isArray(appWeapons)) {
    appWeapons.forEach((weapon) => {
      if (!weapon || typeof weapon !== 'object') return;
      const installed = weapon.installedMods && typeof weapon.installedMods === 'object' ? weapon.installedMods : {};
      Object.values(installed).forEach((value) => {
        if (!value) return;
        upsertWeaponModItem({ value, name: value, label: value }, { attached: true, quantity: 1, fallbackWeaponType: weapon.type || '' });
      });
    });
  }
  items.push(...weaponModItemsByKey.values());

  // Ammo
  const appAmmo = safeParseJson(character.ammo_inventory, []);
  if (Array.isArray(appAmmo)) {
    appAmmo.forEach(a => {
      if (!a) return;
      items.push(buildAmmoItem(a));
    });
  }

  // Apparel / Armor
  const appArmor = safeParseJson(character.armor_equipped, []);
  if (Array.isArray(appArmor)) {
    appArmor.forEach(a => {
      if (!a || typeof a !== 'object') return;
      items.push(buildApparelItem(a));
    });
  }

  // Perks
  const rawPerks = safeParseJson(character.perks, []);
  if (Array.isArray(rawPerks)) {
    rawPerks.forEach(p => items.push(buildPerkItem(p)));
  }

  // Chems
  const appChems = safeParseJson(character.chems_inventory, []);
  if (Array.isArray(appChems)) {
    appChems.forEach(c => { if (c) items.push(buildConsumableItem(c, 'chem')); });
  }

  // Food
  const appFood = safeParseJson(character.food_inventory, []);
  if (Array.isArray(appFood)) {
    appFood.forEach(f => { if (f) items.push(buildConsumableItem(f, 'food')); });
  }

  // Other consumables
  const appOtherConsumables = safeParseJson(character.other_consumables_inventory, []);
  if (Array.isArray(appOtherConsumables)) {
    appOtherConsumables.forEach(c => { if (c) items.push(buildConsumableItem(c, 'other')); });
  }

  // Generic inventory -> miscellany
  const appInventory = safeParseJson(character.inventory, []);
  if (Array.isArray(appInventory)) {
    appInventory.forEach(i => { if (i) items.push(buildMiscellanyItem(i)); });
  }

  // Explicit miscellany list
  const appMiscellany = safeParseJson(character.miscellany, []);
  if (Array.isArray(appMiscellany)) {
    appMiscellany.forEach(i => { if (i) items.push(buildMiscellanyItem(i)); });
  }

  // Robot mods
  const appRobotMods = safeParseJson(character.robot_mods, []);
  if (Array.isArray(appRobotMods)) {
    appRobotMods.forEach(mod => { if (mod) items.push(buildRobotModItem(mod)); });
  }

  // Active addictions
  const appAddictions = safeParseJson(character.character_addictions, []);
  if (Array.isArray(appAddictions)) {
    appAddictions.forEach(addiction => { if (addiction) items.push(buildAddictionItem(addiction)); });
  }

  // Diseases
  const appDiseases = safeParseJson(character.diseases, []);
  if (Array.isArray(appDiseases)) {
    appDiseases.forEach(disease => { if (disease) items.push(buildDiseaseItem(disease)); });
  }

  return items;
}

// ─────────────────────────────────────────────────────────────────────────────
// Prototype token
// ─────────────────────────────────────────────────────────────────────────────

function buildPrototypeToken(name, actorType, imgSrc) {
  return {
    name,
    displayName: 20,
    actorLink: true,
    texture: { src: imgSrc, scaleX: 1, scaleY: 1, offsetX: 0, offsetY: 0, rotation: 0, tint: null },
    width: 1, height: 1, lockRotation: false, rotation: 0, alpha: 1,
    disposition: 1, displayBars: 20,
    bar1: { attribute: 'health' }, bar2: { attribute: null },
    light: {
      alpha: 0.5, angle: 360, bright: 0, color: null, coloration: 1,
      dim: 0, attenuation: 0.5, luminosity: 0.5, saturation: 0, contrast: 0, shadows: 0,
      animation: { type: null, speed: 5, intensity: 5, reverse: false },
      darkness: { min: 0, max: 1 },
    },
    sight: { enabled: false, range: 0, angle: 360, visionMode: 'basic', color: null, attenuation: 0.1, brightness: 0, saturation: 0, contrast: 0 },
    detectionModes: [], hexagonalShape: 0, occludable: { radius: 0 },
    ring: { enabled: false, colors: { ring: null, background: null }, effect: 0, subject: { scale: 1, texture: null } },
    flags: {}, randomImg: false,
  };
}

function makeBodyPart() {
  return {
    injuries: [0, 0, 0, 0, 0],
    injuryOpenCount: 0, injuryTreatedCount: 0,
    resistance: { energy: 0, physical: 0, poison: 0, radiation: 0 },
    status: 'healthy',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Output validation
// ─────────────────────────────────────────────────────────────────────────────

function sanitizeForFoundryExport(data) {
  const required = ['_stats', 'effects', 'flags', 'folder', 'img', 'items', 'name', 'prototypeToken', 'system', 'type', 'ownership'];
  for (const key of required) {
    if (!(key in data)) console.warn(`[FoundryExport] Missing required top-level key: ${key}`);
  }
  if (!Array.isArray(data.effects)) data.effects = [];
  if (!data.flags || typeof data.flags !== 'object') data.flags = {};
  if (!Array.isArray(data.items)) data.items = [];

  data.items.forEach((item, idx) => {
    for (const key of ['_id', 'name', 'type', 'system']) {
      if (!item[key]) console.warn(`[FoundryExport] Item[${idx}] "${item.name}" missing required field: ${key}`);
    }
    if (!Array.isArray(item.effects)) item.effects = [];
    if (!item.flags || typeof item.flags !== 'object') item.flags = {};
  });

  return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export function
// ─────────────────────────────────────────────────────────────────────────────

export function exportToFoundry(character) {
  const origin   = character.origin || '';
  const isRobot  = ['Protectron', 'Robobrain', 'Securitron', 'Mister Handy', 'Assaultron'].includes(origin);
  const actorType = isRobot ? 'robot' : 'character';

  const str  = parseInt(character.strength)    || 5;
  const per  = parseInt(character.perception)  || 5;
  const end  = parseInt(character.endurance)   || 5;
  const cha  = parseInt(character.charisma)    || 5;
  const int_ = parseInt(character.intelligence)|| 5;
  const agi  = parseInt(character.agility)     || 5;
  const luc  = parseInt(character.luck)        || 5;

  const maxHP       = parseInt(character.hp_max) || (end + luc);
  const currentHP   = parseInt(character.hp_current) ?? maxHP;
  const carryWeight = 150 + (str * 10);

  const actorImg = isRobot
    ? 'systems/fallout/assets/tokens/robot.webp'
    : 'systems/fallout/assets/tokens/character.webp';

  const items = buildEmbeddedItems(character);
  const isNightkin = isNightkinCharacter(character);

  const systemData = {
    biography: character.background || '',
    complication: 20,
    description: '',
    level: {
      currentXP: parseInt(character.xp) || 0,
      nextLevelXP: 0, rewardXP: 0,
      value: parseInt(character.level) || 1,
    },
    origin,
    trait: '',
    body_parts: {
      armL: makeBodyPart(), armR: makeBodyPart(),
      head: makeBodyPart(), legL: makeBodyPart(),
      legR: makeBodyPart(), torso: makeBodyPart(),
    },
    bodyType: isRobot ? 'robot' : 'humanoid',
    immunities: {
      poison:    isRobot || isNightkin || ['Ghoul', 'Super Mutant'].includes(origin),
      radiation: isRobot || isNightkin || ['Ghoul', 'Super Mutant', 'Child of Atom'].includes(origin),
    },
    defense:     { bonus: 0, value: 1 },
    health:      { bonus: 0, max: maxHP, value: currentHP },
    initiative:  { bonus: 0, value: per + agi },
    luckPoints:  parseInt(character.luck_points) || luc,
    meleeDamage: { bonus: 0, value: Math.max(0, Math.floor((str - 5) / 2)) },
    radiation:   parseInt(character.radiation) || 0,
    resistance: {
      energy:    parseInt(character.resistance_energy)   || 0,
      physical:  parseInt(character.resistance_physical) || 0,
      poison:    parseInt(character.resistance_poison)   || 0,
      radiation: parseInt(character.resistance_radiation)|| 0,
    },
    carryWeight: { base: carryWeight, encumbranceLevel: 0, mod: 0, total: carryWeight, value: parseInt(character.encumbrance) || 0 },
    attributes: {
      agi: { value: agi }, cha: { value: cha }, end: { value: end },
      int: { value: int_ }, luc: { value: luc }, per: { value: per }, str: { value: str },
    },
    skill: { tags: { additionalTags: [], bonus: 0, max: 3 } },
    currency:  { caps: parseInt(character.caps) || 0, other: '' },
    materials: { junk: 0, common: 0, rare: 0, uncommon: 0 },
    tinkeredWith: false,
  };

  if (!isRobot) {
    systemData.conditions = {
      alcoholic: character.is_alcoholic || false,
      fatigue:   parseInt(character.fatigue) || 0,
      hunger: 0,
      lastChanged: { hunger: 0, sleep: 0, thirst: 0 },
      intoxication: parseInt(character.intoxication) || 0,
      sleep: 0, thirst: 0,
      wellRested: character.is_well_rested || false,
      tinkeredWith: false,
    };
    systemData.readMagazines = [];
  }

  const doc = {
    _stats: buildActorStats(),
    effects: [], flags: {}, folder: null,
    img: actorImg, items,
    name: character.name || 'Unnamed Character',
    prototypeToken: buildPrototypeToken(character.name || 'Unnamed Character', actorType, actorImg),
    system: systemData,
    type: actorType,
    ownership: { default: 0 },
  };

  return sanitizeForFoundryExport(doc);
}
