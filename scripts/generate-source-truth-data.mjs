import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { Level } from 'level';

const ROOT = process.cwd();
const REF_PACKS = path.join(ROOT, 'Reference', 'packs');
const OUT_FILE = path.join(ROOT, 'src', 'lib', 'sourceTruthData.generated.js');

function compendiumUuid(packName, itemId) {
  return `Compendium.fallout.${packName}.Item.${itemId}`;
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'item';
}

function decodeHtmlEntities(str) {
  if (!str) return '';
  return String(str)
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&rsquo;|&#8217;/gi, "'")
    .replace(/&lsquo;|&#8216;/gi, "'")
    .replace(/&ldquo;|&#8220;/gi, '"')
    .replace(/&rdquo;|&#8221;/gi, '"')
    .replace(/&ndash;|&#8211;/gi, '-')
    .replace(/&mdash;|&#8212;/gi, '-')
    .replace(/&hellip;/gi, '...')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&fos\[DC\]/gi, 'CD')
    .replace(/@fos\[DC\]/gi, 'CD');
}

function stripHtml(input) {
  return decodeHtmlEntities(String(input || ''))
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toTitleCase(str) {
  return String(str || '')
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function sourceLabel(raw) {
  const s = String(raw || '').toLowerCase();
  if (!s || s === 'core_rulebook') return 'Core';
  if (s.includes('wanderer')) return 'Wanderers';
  if (s.includes('settler')) return 'Settlers';
  if (s.includes('core')) return 'Core';
  return toTitleCase(s);
}

async function readPackItems(packName) {
  const packPath = path.join(REF_PACKS, packName);
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), `fallout-pack-${packName}-`));
  const tempPackPath = path.join(tempRoot, packName);
  fs.cpSync(packPath, tempPackPath, { recursive: true });

  const currentPath = path.join(tempPackPath, 'CURRENT');
  if (fs.existsSync(currentPath)) {
    const currentRaw = fs.readFileSync(currentPath, 'utf8');
    fs.writeFileSync(currentPath, currentRaw.replace(/\r\n/g, '\n'));
  }

  const db = new Level(tempPackPath, { valueEncoding: 'utf8' });
  const out = [];

  try {
    for await (const [key, value] of db.iterator({ gte: '!items!', lte: '!items!~' })) {
      try {
        const parsed = JSON.parse(value);
        parsed.__key = String(key);
        out.push(parsed);
      } catch {
      }
    }
  } finally {
    await db.close();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }

  return out;
}

const DAMAGE_EFFECT_MAP = {
  arc: 'Arc',
  breaking: 'Breaking',
  burst: 'Burst',
  freeze: 'Freeze',
  persistent: 'Persistent',
  piercing_x: 'Piercing',
  radioactive: 'Radioactive',
  spread: 'Spread',
  stun: 'Stun',
  tranquilize_x: 'Tranquilize',
  vicious: 'Vicious',
};

const WEAPON_QUALITY_MAP = {
  accurate: 'Accurate',
  aquatic: 'Aquatic',
  ammo_hungry_x: 'Ammo-Hungry',
  blast: 'Blast',
  bombard: 'Bombard',
  close_quarters: 'Close Quarters',
  concealed: 'Concealed',
  debilitating: 'Debilitating',
  delay_x: 'Delay',
  gatling: 'Gatling',
  fuel_x: 'Fuel',
  inaccurate: 'Inaccurate',
  limited: 'Limited',
  mine: 'Mine',
  night_vision: 'Night Vision',
  parry: 'Parry',
  placed: 'Placed',
  recoil_x: 'Recoil',
  recon: 'Recon',
  reliable: 'Reliable',
  slow_load: 'Slow Load',
  suppressed: 'Suppressed',
  surge: 'Surge',
  thrown: 'Thrown',
  two_handed: 'Two-Handed',
  unreliable: 'Unreliable',
  unstable_radiation: 'Unstable Radiation',
  wrangle: 'Wrangle',
};

const WEAPON_TYPE_MAP = {
  smallGuns: 'Small Guns',
  energyWeapons: 'Energy Weapons',
  bigGuns: 'Big Guns',
  explosives: 'Explosive',
  meleeWeapons: 'Melee',
  unarmed: 'Unarmed',
  throwing: 'Throwing',
  bow: 'Bow',
};

const MOD_EFFECT_MAP = {
  arc: 'Arc',
  breaking: 'Breaking',
  burst: 'Burst',
  freeze: 'Freeze',
  persistent: 'Persistent',
  piercing_x: 'Piercing',
  radioactive: 'Radioactive',
  spread: 'Spread',
  stun: 'Stun',
  tranquilize_x: 'Tranquilize',
  vicious: 'Vicious',
};

const MOD_QUALITY_MAP = {
  accurate: 'Accurate',
  aquatic: 'Aquatic',
  ammo_hungry_x: 'Ammo-Hungry',
  blast: 'Blast',
  bombard: 'Bombard',
  close_quarters: 'Close Quarters',
  concealed: 'Concealed',
  debilitating: 'Debilitating',
  delay_x: 'Delay',
  fuel_x: 'Fuel',
  gatling: 'Gatling',
  inaccurate: 'Inaccurate',
  limited: 'Limited',
  mine: 'Mine',
  night_vision: 'Night Vision',
  parry: 'Parry',
  placed: 'Placed',
  recoil_x: 'Recoil',
  recon: 'Recon',
  reliable: 'Reliable',
  slow_load: 'Slow Load',
  suppressed: 'Suppressed',
  surge: 'Surge',
  thrown: 'Thrown',
  two_handed: 'Two-Handed',
  unreliable: 'Unreliable',
  unstable_radiation: 'Unstable Radiation',
  wrangle: 'Wrangle',
};

function buildDamageTypeString(dt) {
  if (!dt || typeof dt !== 'object') return 'Physical';
  const list = [];
  if (dt.physical) list.push('Physical');
  if (dt.energy) list.push('Energy');
  if (dt.radiation) list.push('Radiation');
  if (dt.poison) list.push('Poison');
  return list.length ? list.join('/') : 'Physical';
}

function keyedFlagsToString(flags, mapping) {
  if (!flags || typeof flags !== 'object') return '-';
  const out = [];
  for (const [key, label] of Object.entries(mapping)) {
    const entry = flags[key];
    if (!entry || !entry.value) continue;
    if (key.endsWith('_x')) {
      const rank = Number(entry.rank) || 1;
      out.push(`${label} ${rank}`);
    } else {
      out.push(label);
    }
  }
  return out.length ? out.join(', ') : '-';
}

function mapWeapon(item) {
  const system = item.system || {};
  const dmg = system.damage || {};
  return {
    key: slugify(`${item.name}_${item._id}`),
    label: item.name,
    type: WEAPON_TYPE_MAP[system.weaponType] || toTitleCase(system.weaponType || 'Weapon'),
    damage: `${Number(dmg.rating || 0)} CD`,
    damageEffect: keyedFlagsToString(dmg.damageEffect, DAMAGE_EFFECT_MAP),
    damageType: buildDamageTypeString(dmg.damageType),
    fireRate: Number(system.fireRate ?? 0),
    range: toTitleCase(system.range || 'Close'),
    qualities: keyedFlagsToString(dmg.weaponQuality, WEAPON_QUALITY_MAP),
    weight: Number(system.weight || 0),
    cost: Number(system.cost || 0),
    rarity: Number(system.rarity || 0),
    ammo: system.ammo || '',
    source: sourceLabel(system.source),
    note: stripHtml(system.description || ''),
    foundryUuid: compendiumUuid('weapons', item._id),
  };
}

function mapLocationFlagsToList(location) {
  if (!location || typeof location !== 'object') return [];
  const out = [];
  if (location.head) out.push('Head');
  if (location.torso) out.push('Torso');
  if (location.armL) out.push('Left Arm');
  if (location.armR) out.push('Right Arm');
  if (location.legL) out.push('Left Leg');
  if (location.legR) out.push('Right Leg');
  return out;
}

function inferArmorSet(name) {
  if (/^T-45\b/i.test(name)) return 'T-45';
  if (/^T-51\b/i.test(name)) return 'T-51';
  if (/^T-60\b/i.test(name)) return 'T-60';
  if (/^X-01\b/i.test(name)) return 'X-01';
  if (/^Raider\s+Power\b/i.test(name)) return 'Raider Power';
  if (/^Armor Frame\b/i.test(name)) return 'Frame';
  if (/\bVault-Tec Security\b/i.test(name)) return 'Vault-Tec Security';
  if (/\bSynth\b/i.test(name)) return 'Synth';
  if (/\bCombat\b/i.test(name)) return 'Combat';
  if (/\bLeather\b/i.test(name)) return 'Leather';
  if (/\bMetal\b/i.test(name)) return 'Metal';
  if (/\bRaider\b/i.test(name)) return 'Raider';
  return toTitleCase(name.split(' ')[0] || 'Armor');
}

function mapApparel(item) {
  const system = item.system || {};
  const locations = mapLocationFlagsToList(system.location);
  const isPower = system.apparelType === 'powerArmor' || Boolean(system.powerArmor?.isFrame);
  const payload = {
    key: slugify(`${item.name}_${item._id}`),
    label: item.name,
    type: toTitleCase(system.apparelType || 'Armor'),
    set: inferArmorSet(item.name),
    physRes: Number(system.resistance?.physical || 0),
    enerRes: Number(system.resistance?.energy || 0),
    radRes: Number(system.resistance?.radiation || 0),
    hp: Number(system.health?.value ?? system.health?.max ?? 0),
    locations,
    weight: Number(system.weight || 0),
    cost: Number(system.cost || 0),
    rarity: Number(system.rarity || 0),
    source: sourceLabel(system.source),
    special: stripHtml(system.description || ''),
    isPower,
    foundryType: item.type,
    foundryUuid: compendiumUuid('apparel', item._id),
  };

  if (!payload.locations.length && isPower) payload.locations = ['All'];
  return payload;
}

function mapAmmo(item) {
  const system = item.system || {};
  return {
    key: slugify(`${item.name}_${item._id}`),
    label: item.name,
    weight: Number(system.weight || 0),
    cost: Number(system.cost || 0),
    rarity: Number(system.rarity || 0),
    effect: stripHtml(system.effect || ''),
    source: sourceLabel(system.source),
    foundryUuid: compendiumUuid('ammunition', item._id),
  };
}

function mapMiscellany(item) {
  const system = item.system || {};
  return {
    key: slugify(`${item.name}_${item._id}`),
    label: item.name,
    effect: stripHtml(system.effect || ''),
    note: stripHtml(system.description || ''),
    weight: Number(system.weight || 0),
    cost: Number(system.cost || 0),
    rarity: Number(system.rarity || 0),
    source: sourceLabel(system.source),
    foundryUuid: compendiumUuid('miscellany', item._id),
  };
}

function normalizeDuration(duration) {
  const d = String(duration || '').trim().toLowerCase();
  if (!d) return 'Instant';
  if (d === 'instant') return 'Instant';
  if (d === 'brief') return 'Brief';
  if (d === 'lasting') return 'Lasting';
  return toTitleCase(d);
}

function mapConsumable(item, addictionLookup) {
  const system = item.system || {};
  const key = slugify(`${item.name}_${item._id}`);
  const type = String(system.consumableType || '').toLowerCase();
  const effect = stripHtml(system.effect || '');
  const common = {
    key,
    label: item.name,
    effect: effect || '-',
    weight: Number(system.weight || 0),
    cost: Number(system.cost || 0),
    rarity: Number(system.rarity || 0),
    source: sourceLabel(system.source),
    foundryUuid: compendiumUuid('consumables', item._id),
  };

  if (type === 'chem') {
    const addictionEffect = addictionLookup[item.name] || addictionLookup[item.name.replace(/\s*\(.+\)$/, '')] || '';
    return {
      group: 'chem',
      value: {
        ...common,
        duration: normalizeDuration(system.duration),
        addictive: Boolean(system.addictive),
        addictionNumber: Number(system.addiction || 0),
        addictionEffect,
      },
    };
  }

  if (type === 'food') {
    return {
      group: 'food',
      value: {
        ...common,
        hp: Number(system.hp || 0),
        irradiated: Boolean(system.irradiated),
      },
    };
  }

  return {
    group: 'other',
    value: {
      ...common,
      note: stripHtml(system.description || ''),
    },
  };
}

function mapPerk(item) {
  const system = item.system || {};
  const reqEx = system.requirementsEx || {};
  const attrs = reqEx.attributes || {};
  const requirements = {
    level: Number(reqEx.level || 1),
  };

  const attrMap = {
    str: 'STR',
    per: 'PER',
    end: 'END',
    cha: 'CHA',
    int: 'INT',
    agi: 'AGI',
    luc: 'LCK',
  };

  for (const [k, outKey] of Object.entries(attrMap)) {
    const val = Number(attrs[k]?.value || 0);
    if (val > 0) requirements[outKey] = val;
  }

  return {
    key: slugify(`${item.name}_${item._id}`),
    label: item.name,
    ranks: Number(system.rank?.max || 1),
    requirements,
    source: sourceLabel(system.source),
    description: stripHtml(system.description || ''),
    foundryUuid: compendiumUuid('perks', item._id),
  };
}

function mapRobotMod(item) {
  const system = item.system || {};
  return {
    key: slugify(`${item.name}_${item._id}`),
    label: item.name,
    effect: stripHtml(system.effect || ''),
    perks: stripHtml(system.perks || ''),
    weight: Number(system.weight || 0),
    cost: Number(system.cost || 0),
    rarity: Number(system.rarity || 0),
    source: sourceLabel(system.source),
    note: stripHtml(system.description || ''),
    foundryUuid: compendiumUuid('robot_modules', item._id),
  };
}

function parseFlagChanges(flags, mapping) {
  const add = [];
  const remove = [];
  if (!flags || typeof flags !== 'object') return { add, remove };
  for (const [key, label] of Object.entries(mapping)) {
    const entry = flags[key];
    if (!entry) continue;
    const value = Number(entry.value || 0);
    if (!value) continue;
    const suffix = key.endsWith('_x') ? ` ${Math.max(1, Number(entry.rank) || 1)}` : '';
    const formatted = `${label}${suffix}`;
    if (value > 0) add.push(formatted);
    else if (value < 0) remove.push(formatted);
  }
  return { add, remove };
}

function mapWeaponMod(item) {
  const system = item.system || {};
  const modEffects = system.modEffects || {};
  const damage = modEffects.damage || {};
  const damageType = damage.damageType || {};
  const { add: addEffects, remove: removeEffects } = parseFlagChanges(damage.damageEffect, MOD_EFFECT_MAP);
  const { add: addQualities, remove: removeQualities } = parseFlagChanges(damage.weaponQuality, MOD_QUALITY_MAP);
  return {
    key: slugify(`${item.name}_${item._id}`),
    label: item.name,
    namePrefix: stripHtml(system.namePrefix || ''),
    modType: toTitleCase(system.modType || 'Mod'),
    weaponType: WEAPON_TYPE_MAP[system.weaponType] || toTitleCase(system.weaponType || 'Weapon'),
    perks: stripHtml(system.perks || ''),
    effect: stripHtml(modEffects.effect || system.effect || ''),
    summary: stripHtml(modEffects.summary || system.summary || ''),
    weight: Number(system.weight || 0),
    cost: Number(system.cost || 0),
    rarity: Number(system.rarity || 0),
    source: sourceLabel(system.source),
    damageDelta: Number(damage.rating || 0),
    fireRateDelta: Number(modEffects.fireRate || 0),
    rangeDelta: Number(modEffects.range || 0),
    addEffects,
    removeEffects,
    addQualities,
    removeQualities,
    damageTypeFlags: {
      physical: Boolean(damageType.physical),
      energy: Boolean(damageType.energy),
      radiation: Boolean(damageType.radiation),
      poison: Boolean(damageType.poison),
    },
    note: stripHtml(system.description || ''),
    foundryUuid: compendiumUuid('weapon_mods', item._id),
  };
}

function mapApparelMod(item) {
  const system = item.system || {};
  return {
    key: slugify(`${item.name}_${item._id}`),
    label: item.name,
    modType: toTitleCase(system.modType || 'Mod'),
    apparelType: toTitleCase(system.apparelType || 'Armor'),
    location: stripHtml(system.location || ''),
    perks: stripHtml(system.perks || ''),
    effect: stripHtml(system.effect || ''),
    summary: stripHtml(system.summary || ''),
    weight: Number(system.weight || 0),
    cost: Number(system.cost || 0),
    rarity: Number(system.rarity || 0),
    source: sourceLabel(system.source),
    healthDelta: Number(system.health?.value || 0),
    resistanceDelta: {
      physical: Number(system.resistance?.physical || 0),
      energy: Number(system.resistance?.energy || 0),
      radiation: Number(system.resistance?.radiation || 0),
    },
    shadowed: Boolean(system.shadowed),
    note: stripHtml(system.description || ''),
    foundryUuid: compendiumUuid('apparel_mods', item._id),
  };
}

function extractCompatibilityMap(rows) {
  const out = {};
  for (const row of rows) {
    const mods = row?.system?.mods;
    if (!mods || typeof mods !== 'object') continue;
    const slots = {};
    for (const [key, value] of Object.entries(mods)) {
      if (['current', 'installedMods', 'list', 'max', 'modded'].includes(key)) continue;
      if (!value || typeof value !== 'object') continue;
      const modName = String(value.name || '').trim();
      const modTypeRaw = String(value.system?.modType || '').trim();
      const modType = toTitleCase(modTypeRaw || 'Mod');
      if (!modName) continue;
      if (!slots[modType]) slots[modType] = [];
      if (!slots[modType].includes(modName)) slots[modType].push(modName);
    }
    const sortedSlots = Object.fromEntries(
      Object.entries(slots)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([slot, names]) => [slot, [...names].sort((a, b) => a.localeCompare(b))])
    );
    if (Object.keys(sortedSlots).length > 0) {
      out[row.name] = sortedSlots;
    }
  }
  return out;
}

function stableSortByLabel(a, b) {
  return String(a.label).localeCompare(String(b.label));
}

async function main() {
  const [weaponsRaw, apparelRaw, ammoRaw, consumablesRaw, perksRaw, addictionsRaw, robotModsRaw, miscellanyRaw, weaponModsRaw, apparelModsRaw] = await Promise.all([
    readPackItems('weapons'),
    readPackItems('apparel'),
    readPackItems('ammunition'),
    readPackItems('consumables'),
    readPackItems('perks'),
    readPackItems('addictions'),
    readPackItems('robot_modules'),
    readPackItems('miscellany'),
    readPackItems('weapon_mods'),
    readPackItems('apparel_mods'),
  ]);

  const addictionLookup = {};
  for (const row of addictionsRaw) {
    const plain = stripHtml(row.system?.description || row.system?.effect || '');
    const key = String(row.name || '').replace(/\s+addiction$/i, '').trim();
    if (key && plain) addictionLookup[key] = plain;
  }

  const sourceWeapons = weaponsRaw.map(mapWeapon).sort(stableSortByLabel);

  const mappedApparel = apparelRaw.map(mapApparel);
  const sourcePowerArmor = mappedApparel
    .filter((a) => a.foundryType === 'apparel' && a.isPower)
    .map(({ isPower, foundryType, ...rest }) => rest)
    .sort(stableSortByLabel);

  const sourceApparel = mappedApparel
    .filter((a) => a.foundryType === 'apparel' && !a.isPower && ['headgear', 'clothing', 'outfit'].includes(String(a.type).toLowerCase()))
    .map(({ isPower, foundryType, ...rest }) => rest)
    .sort(stableSortByLabel);

  const sourceArmor = mappedApparel
    .filter((a) => a.foundryType === 'apparel' && !a.isPower && !['headgear', 'clothing', 'outfit'].includes(String(a.type).toLowerCase()))
    .map(({ isPower, foundryType, ...rest }) => rest)
    .sort(stableSortByLabel);

  const sourceAmmo = ammoRaw.map(mapAmmo).sort(stableSortByLabel);

  const consumables = consumablesRaw.map((c) => mapConsumable(c, addictionLookup));
  const sourceFood = consumables.filter((c) => c.group === 'food').map((c) => c.value).sort(stableSortByLabel);
  const sourceChems = consumables.filter((c) => c.group === 'chem').map((c) => c.value).sort(stableSortByLabel);
  const sourceOtherConsumables = consumables.filter((c) => c.group === 'other').map((c) => c.value).sort(stableSortByLabel);

  const sourceCorePerks = perksRaw.map(mapPerk).sort(stableSortByLabel);
  const sourceRobotMods = robotModsRaw.map(mapRobotMod).sort(stableSortByLabel);
  const sourceMiscellany = miscellanyRaw.map(mapMiscellany).sort(stableSortByLabel);
  const sourceWeaponMods = weaponModsRaw.map(mapWeaponMod).sort(stableSortByLabel);
  const sourceApparelMods = apparelModsRaw.map(mapApparelMod).sort(stableSortByLabel);
  const sourceWeaponModCompatibility = extractCompatibilityMap(weaponsRaw);
  const sourceApparelModCompatibility = extractCompatibilityMap(apparelRaw);

  const header = `// AUTO-GENERATED FILE. DO NOT EDIT BY HAND.\n// Generated from Foundry source-of-truth packs in ./Reference/packs\n\n`;
  const payload = {
    SOURCE_WEAPONS: sourceWeapons,
    SOURCE_AMMO: sourceAmmo,
    SOURCE_APPAREL: sourceApparel,
    SOURCE_ARMOR: sourceArmor,
    SOURCE_POWER_ARMOR: sourcePowerArmor,
    SOURCE_FOOD: sourceFood,
    SOURCE_CHEMS: sourceChems,
    SOURCE_OTHER_CONSUMABLES: sourceOtherConsumables,
    SOURCE_CORE_PERKS: sourceCorePerks,
    SOURCE_ROBOT_MODS: sourceRobotMods,
    SOURCE_MISCELLANY: sourceMiscellany,
    SOURCE_WEAPON_MODS: sourceWeaponMods,
    SOURCE_APPAREL_MODS: sourceApparelMods,
    SOURCE_WEAPON_MOD_COMPATIBILITY: sourceWeaponModCompatibility,
    SOURCE_APPAREL_MOD_COMPATIBILITY: sourceApparelModCompatibility,
  };

  let content = header;
  for (const [name, value] of Object.entries(payload)) {
    content += `export const ${name} = ${JSON.stringify(value, null, 2)};\n\n`;
  }

  fs.writeFileSync(OUT_FILE, content, 'utf8');

  console.log('Generated source truth data:');
  Object.entries(payload).forEach(([k, v]) => console.log(`- ${k}: ${v.length}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
