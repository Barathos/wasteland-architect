// Starting equipment application logic
import { ORIGIN_PACKS, TAG_SKILL_ITEMS } from './falloutData';
import { CORE_WEAPONS } from './sourceTruthData';
import { CORE_APPAREL, CORE_ARMOR, CORE_POWER_ARMOR } from './sourceTruthData';
import { CORE_ROBOT_MODS } from './sourceTruthData';
import { CORE_CHEMS, CORE_FOOD, CORE_MISCELLANY, CORE_OTHER_CONSUMABLES } from './sourceTruthData';

function safeJson(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

function normalizeDedupText(value = '') {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function dedupeArmorEntries(entries = []) {
  const map = new Map();
  for (const entry of entries) {
    const key = [
      normalizeDedupText(entry?.name),
      normalizeDedupText(entry?.locations),
      normalizeDedupText(entry?.type),
    ].join('|');
    if (!key.replace(/\|/g, '').trim()) continue;
    if (!map.has(key)) map.set(key, entry);
  }
  return [...map.values()];
}

function dedupeByName(entries = [], keyFields = ['name']) {
  const map = new Map();
  for (const entry of entries) {
    const key = keyFields
      .map((field) => normalizeDedupText(entry?.[field]))
      .join('|');
    if (!key.replace(/\|/g, '').trim()) continue;
    if (!map.has(key)) map.set(key, entry);
  }
  return [...map.values()];
}

function rollDiceExpression(expr) {
  const text = String(expr || '').trim().toLowerCase();
  const match = text.match(/^(\d+)d(\d+)$/);
  if (!match) return 0;
  const count = Math.max(0, parseInt(match[1], 10) || 0);
  const sides = Math.max(0, parseInt(match[2], 10) || 0);
  if (!count || !sides) return 0;
  let total = 0;
  for (let i = 0; i < count; i += 1) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total;
}

function resolveItemQuantity(item) {
  if (typeof item?.quantity === 'number') return item.quantity;
  if (typeof item?.quantity === 'string') {
    const parsed = parseInt(item.quantity, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  if (typeof item?.quantityDice === 'string') {
    return rollDiceExpression(item.quantityDice);
  }
  return 1;
}

// ─── Weapon lookup helpers ────────────────────────────────────────────────────

const ALL_WEAPONS = [...CORE_WEAPONS];
const SMALL_GUNS_AMMO_TYPES = Array.from(
  new Set(
    CORE_WEAPONS
      .filter(w => String(w?.type || '').toLowerCase() === 'small guns')
      .map(w => String(w?.ammo || '').trim())
      .filter(Boolean)
  )
);
const LEGACY_WEAPON_NAME_MAP = {
  'laser pistol': 'laser gun',
  'laser rifle': 'laser gun',
  'pipe rifle': 'pipe gun',
  'throwing knives': 'throwing knife',
  'tomahawks': 'tomahawk',
  'molotov cocktails': 'molotov cocktail',
  'baseball grenades': 'baseball grenade',
};
const LEGACY_APPAREL_NAME_MAP = {
  "brotherhood scribe's armor": 'brotherhood scribes armor',
  "brotherhood scribe's hat": 'brotherhood scribes hat',
  'vault-tec security armor': 'vault tec security armor',
  'vault-tec security helmet': 'vault tec security helmet',
};
const LEGACY_ROBOT_MOD_NAME_MAP = {
  'behavioral analysis module': 'behavioral analysis mod',
  'recon sensors mod': 'recon sensors',
  'protectron sensors': 'sensor array',
};
const LEGACY_CHEM_NAME_MAP = {
  'stimpacks': 'stimpak',
};
const LEGACY_FOOD_NAME_MAP = {
  'iguana on a stick': 'iguana bits',
};
const LEGACY_MISC_NAME_MAP = {
  'multitool': 'multi-tool',
  'brotherhood holotags': 'holotags',
  'purified water': 'purified water',
};
const ALL_APPAREL = [...CORE_APPAREL, ...CORE_ARMOR, ...CORE_POWER_ARMOR];
const ALL_ROBOT_MODS = [...CORE_ROBOT_MODS];
const ALL_CHEMS = [...CORE_CHEMS];
const ALL_FOOD = [...CORE_FOOD];
const ALL_MISCELLANY = [...CORE_MISCELLANY, ...CORE_OTHER_CONSUMABLES];

function parseQuantityPrefix(rawName = '') {
  const text = String(rawName || '').trim();
  const match = text.match(/^(\d+)\s+(.+)$/);
  if (!match) return { quantity: 1, name: text };
  return { quantity: parseInt(match[1], 10) || 1, name: match[2].trim() };
}

function normalizeLookupName(rawName = '') {
  const base = String(rawName || '')
    .split('+')[0]
    .split('(')[0]
    .trim()
    .toLowerCase();
  return LEGACY_WEAPON_NAME_MAP[base] || base;
}

function normalizeApparelLookupName(rawName = '') {
  const base = String(rawName || '')
    .split('+')[0]
    .split('(')[0]
    .trim()
    .toLowerCase()
    .replace(/[']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
  return LEGACY_APPAREL_NAME_MAP[base] || base;
}

function isPowerArmorText(value = '') {
  return /power\s*armor|powerarmor/.test(String(value || '').toLowerCase());
}

function isPowerArmorApparel(item = {}) {
  return (
    isPowerArmorText(item.type) ||
    isPowerArmorText(item.set) ||
    isPowerArmorText(item.label)
  );
}

function findWeaponByName(name) {
  const clean = normalizeLookupName(name);
  let best = null;
  let bestScore = -1;

  for (const weapon of ALL_WEAPONS) {
    const label = String(weapon?.label || '').toLowerCase();
    const aliases = Array.isArray(weapon?.aliases) ? weapon.aliases.map(a => String(a).toLowerCase()) : [];
    let score = -1;

    if (label === clean) score = 100;
    else if (aliases.includes(clean)) score = 95;
    else if (label.includes(clean)) score = 80;
    else if (aliases.some(a => a.includes(clean))) score = 75;
    else if (clean.includes(label)) score = 60;
    else if (aliases.some(a => clean.includes(a))) score = 55;

    if (score < 0) continue;

    // Prefer the most specific match when scores tie.
    const currentSpecificity = Math.max(label.length, ...aliases.map(a => a.length), 0);
    const bestLabel = String(best?.label || '').toLowerCase();
    const bestAliases = Array.isArray(best?.aliases) ? best.aliases.map(a => String(a).toLowerCase()) : [];
    const bestSpecificity = Math.max(bestLabel.length, ...bestAliases.map(a => a.length), 0);

    if (score > bestScore || (score === bestScore && currentSpecificity > bestSpecificity)) {
      best = weapon;
      bestScore = score;
    }
  }

  const result = best;
  return result;
}

function findApparelByName(name) {
  const clean = normalizeApparelLookupName(name);
  const wantsPowerArmor = isPowerArmorText(name);
  let best = null;
  let bestScore = -1;

  for (const apparel of ALL_APPAREL) {
    const isPower = isPowerArmorApparel(apparel);
    if (isPower !== wantsPowerArmor) continue;

    const label = normalizeApparelLookupName(apparel?.label || apparel?.name || '');
    const aliases = Array.isArray(apparel?.aliases)
      ? apparel.aliases.map(a => normalizeApparelLookupName(a))
      : [];
    let score = -1;

    if (label === clean) score = 100;
    else if (aliases.includes(clean)) score = 95;
    else if (label.includes(clean)) score = 80;
    else if (aliases.some(a => a.includes(clean))) score = 75;
    else if (clean.includes(label)) score = 60;
    else if (aliases.some(a => clean.includes(a))) score = 55;

    if (score < 0) continue;

    const currentSpecificity = Math.max(label.length, ...aliases.map(a => a.length), 0);
    const bestLabel = normalizeApparelLookupName(best?.label || best?.name || '');
    const bestAliases = Array.isArray(best?.aliases)
      ? best.aliases.map(a => normalizeApparelLookupName(a))
      : [];
    const bestSpecificity = Math.max(bestLabel.length, ...bestAliases.map(a => a.length), 0);

    if (score > bestScore || (score === bestScore && currentSpecificity > bestSpecificity)) {
      best = apparel;
      bestScore = score;
    }
  }

  if (best) return best;

  // Fallback pass if strict power/non-power filtering found nothing.
  for (const apparel of ALL_APPAREL) {
    const label = normalizeApparelLookupName(apparel?.label || apparel?.name || '');
    if (label === clean) return apparel;
  }

  return null;
}

function normalizeRobotModLookupName(rawName = '') {
  const base = String(rawName || '')
    .split('+')[0]
    .split('(')[0]
    .trim()
    .toLowerCase()
    .replace(/[']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
  return LEGACY_ROBOT_MOD_NAME_MAP[base] || base;
}

function normalizeGenericLookupName(rawName = '', legacyMap = {}) {
  const base = String(rawName || '')
    .split('+')[0]
    .split('(')[0]
    .trim()
    .toLowerCase()
    .replace(/[']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
  return legacyMap[base] || base;
}

function findByLabel(collection = [], name = '', legacyMap = {}) {
  const clean = normalizeGenericLookupName(name, legacyMap);
  let best = null;
  let bestScore = -1;

  for (const entry of collection) {
    const label = normalizeGenericLookupName(entry?.label || entry?.name || '', legacyMap);
    const aliases = Array.isArray(entry?.aliases)
      ? entry.aliases.map((a) => normalizeGenericLookupName(a, legacyMap))
      : [];
    let score = -1;

    if (label === clean) score = 100;
    else if (aliases.includes(clean)) score = 95;
    else if (label.includes(clean)) score = 80;
    else if (aliases.some((a) => a.includes(clean))) score = 75;
    else if (clean.includes(label)) score = 60;
    else if (aliases.some((a) => clean.includes(a))) score = 55;

    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  return best;
}

function findRobotModByName(name) {
  const clean = normalizeRobotModLookupName(name);
  let best = null;
  let bestScore = -1;

  for (const mod of ALL_ROBOT_MODS) {
    const label = normalizeRobotModLookupName(mod?.label || mod?.name || '');
    const aliases = Array.isArray(mod?.aliases)
      ? mod.aliases.map((a) => normalizeRobotModLookupName(a))
      : [];
    let score = -1;

    if (label === clean) score = 100;
    else if (aliases.includes(clean)) score = 95;
    else if (label.includes(clean)) score = 80;
    else if (aliases.some((a) => a.includes(clean))) score = 75;
    else if (clean.includes(label)) score = 60;
    else if (aliases.some((a) => clean.includes(a))) score = 55;

    if (score < 0) continue;
    if (score > bestScore) {
      best = mod;
      bestScore = score;
    }
  }

  return best;
}

function buildRobotModEntry(itemName, quantity = 1) {
  const parsed = parseQuantityPrefix(itemName);
  const resolvedQuantity = Math.max(1, Number(quantity || 1)) * Math.max(1, parsed.quantity || 1);
  const found = findRobotModByName(parsed.name);
  if (!found) return null;
  return {
    name: found.label || parsed.name,
    quantity: resolvedQuantity,
    source: 'starting_equipment',
    effect: found.effect || '',
    note: found.note || '',
    perks: found.perks || '',
    rarity: Number(found.rarity || 0),
    cost: Number(found.cost || 0),
    weight: Number(found.weight || 0),
    key: found.key || '',
  };
}

function buildChemEntry(itemName, quantity = 1, note = '') {
  const parsed = parseQuantityPrefix(itemName);
  const resolvedQuantity = Math.max(1, Number(quantity || 1)) * Math.max(1, parsed.quantity || 1);
  const found = findByLabel(ALL_CHEMS, parsed.name, LEGACY_CHEM_NAME_MAP);
  return {
    name: found?.label || parsed.name,
    label: found?.label || parsed.name,
    quantity: resolvedQuantity,
    source: 'starting_equipment',
    note: note || found?.note || '',
  };
}

function buildFoodEntry(itemName, quantity = 1, note = '') {
  const parsed = parseQuantityPrefix(itemName);
  const resolvedQuantity = Math.max(1, Number(quantity || 1)) * Math.max(1, parsed.quantity || 1);
  const found = findByLabel(ALL_FOOD, parsed.name, LEGACY_FOOD_NAME_MAP);
  return {
    name: found?.label || parsed.name,
    label: found?.label || parsed.name,
    quantity: resolvedQuantity,
    source: 'starting_equipment',
    note: note || found?.note || '',
  };
}

function buildMiscEntry(itemName, quantity = 1, note = '') {
  const parsed = parseQuantityPrefix(itemName);
  const resolvedQuantity = Math.max(1, Number(quantity || 1)) * Math.max(1, parsed.quantity || 1);
  const found = findByLabel(ALL_MISCELLANY, parsed.name, LEGACY_MISC_NAME_MAP);
  return {
    name: found?.label || parsed.name,
    quantity: resolvedQuantity,
    source: 'starting_equipment',
    note: note || found?.note || '',
    effect: found?.effect || '',
  };
}

function buildWeaponEntry(itemName, quantity = 1) {
  const parsed = parseQuantityPrefix(itemName);
  const resolvedQuantity = Math.max(1, Number(quantity || 1)) * Math.max(1, parsed.quantity || 1);
  const found = findWeaponByName(parsed.name);
  if (found) {
    return {
      id: Date.now() + Math.random(),
      name: found.label,
      damage: found.damage || '',
      damageType: found.damageType || 'Physical',
      damageEffect: found.damageEffect || '',
      type: found.type || '',
      fireRate: found.fireRate || 0,
      range: found.range || 'Melee',
      qualities: found.qualities || '',
      weight: found.weight || 0,
      cost: found.cost || 0,
      rarity: found.rarity || 0,
      ammo: found.ammo || '',
      fireModes: found.fireModes || [],
      quantity: resolvedQuantity,
      source: 'starting_equipment',
      note: found.note || '',
    };
  }
  return null;
}

function buildApparelEntry(itemName, explicitType = 'apparel') {
  const found = findApparelByName(itemName);
  if (found) {
    return {
      name: found.label || itemName,
      physRes: Number(found.physRes || 0),
      enerRes: Number(found.enerRes || 0),
      radRes: Number(found.radRes || 0),
      locations: Array.isArray(found.locations) ? found.locations.join(', ') : (found.locations || ''),
      special: found.special || '',
      hp: found.hp || null,
      source: found.source || 'Core',
      type: explicitType === 'robot_armor' ? 'Robot Armor' : (found.type || found.set || ''),
      grantedBy: 'starting_equipment',
    };
  }
  return null;
}

function findAmmoTypeForSmallGuns(weapons = [], ammoInventory = []) {
  const ammoByQuantity = [...ammoInventory]
    .filter(a => String(a?.type || '').trim())
    .map(a => ({ type: String(a.type).trim(), quantity: Number(a.quantity || 0) }))
    .sort((a, b) => b.quantity - a.quantity);

  // Prefer ammo the character already has for a Small Guns weapon.
  for (const entry of ammoByQuantity) {
    if (SMALL_GUNS_AMMO_TYPES.some(t => t.toLowerCase() === entry.type.toLowerCase())) {
      return entry.type;
    }
  }

  // Next best: any ammo already possessed.
  if (ammoByQuantity.length > 0) return ammoByQuantity[0].type;

  // Fallback: infer from a currently-owned Small Guns weapon.
  for (const w of weapons) {
    const type = String(w?.type || '').toLowerCase();
    const ammo = String(w?.ammo || '').trim();
    if (type === 'small guns' && ammo) return ammo;
  }

  return null;
}

/**
 * Parse an option string that may bundle a weapon + ammo together.
 * e.g. "Laser Pistol + Fusion Cell (10+5CD shots)"
 * Returns { weaponName, ammoName, ammoQty } — ammoName/ammoQty may be null.
 */
function parseWeaponOption(optionStr) {
  const parts = optionStr.split(' + ');
  const weaponName = parts[0].trim();
  let ammoName = null;
  let ammoQty = 1;
  if (parts[1]) {
    const ammoInfo = parts[1].trim();
    ammoName = ammoInfo.split('(')[0].trim();
    const qtyMatch = ammoInfo.match(/(\d+)/);
    if (qtyMatch) ammoQty = parseInt(qtyMatch[1]);
  }
  return { weaponName, ammoName, ammoQty };
}

function applyChoiceGrantToInventory(grant, state) {
  if (!grant || typeof grant !== 'object') return;
  const quantity = resolveItemQuantity(grant);
  const name = grant.name || '';

  switch (grant.type) {
    case 'weapon': {
      const { weaponName, ammoName, ammoQty } = parseWeaponOption(name);
      const weaponEntry = buildWeaponEntry(weaponName, quantity);
      if (weaponEntry) {
        state.weapons.push(weaponEntry);
      } else {
        state.misc.push({
          name: weaponName,
          quantity,
          source: 'starting_equipment',
          note: grant.note || 'Could not resolve to source truth weapon data.',
        });
      }
      if (ammoName) state.ammo.push({ type: ammoName, quantity: ammoQty, source: 'starting_equipment' });
      break;
    }
    case 'ammo':
      state.ammo.push({ type: name, quantity, source: 'starting_equipment', note: grant.note || '' });
      break;
    case 'apparel':
    case 'robot_armor':
      {
        const apparelEntry = buildApparelEntry(name, grant.type);
        if (apparelEntry) {
          state.armor.push(apparelEntry);
        } else {
          state.misc.push({
            name,
            quantity,
            source: 'starting_equipment',
            note: grant.note || 'Could not resolve to source truth armor data.',
          });
        }
      }
      break;
    case 'consumable':
      state.chems.push(buildChemEntry(name, quantity, grant.note || ''));
      break;
    case 'food':
      state.food.push(buildFoodEntry(name, quantity, grant.note || ''));
      break;
    case 'miscellany':
      state.misc.push(buildMiscEntry(name, quantity, grant.note || ''));
      break;
    case 'robot_mod':
      {
        const robotModEntry = buildRobotModEntry(name, quantity);
        if (robotModEntry) {
          state.robotMods.push(robotModEntry);
        } else {
          state.robotMods.push({ name, quantity, source: 'starting_equipment', note: grant.note || '' });
        }
      }
      break;
    case 'currency':
      state.caps += quantity;
      break;
    default:
      break;
  }
}

// ─── Main export: buildStartingEquipment ─────────────────────────────────────

export function buildStartingEquipment(character, packKey, tagSkillKeys = []) {
  const packs = ORIGIN_PACKS[character.origin] || [];
  const pack = packs.find(p => p.key === packKey);
  if (!pack) return null;

  const allItems = [...pack.equipment];
  tagSkillKeys.forEach(sk => {
    const displayName = sk.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const bonus = TAG_SKILL_ITEMS[displayName] || TAG_SKILL_ITEMS[sk];
    if (bonus) allItems.push(...bonus);
  });

  const autoItems = allItems.filter(i => !i.optional);
  const pendingChoices = allItems
    .filter(i => i.optional)
    .map(i => ({ ...i, resolved: false, resolvedValue: null }));

  // Deterministic rebuild for builder flow:
  // always re-generate from a clean baseline to prevent duplicated auto gear
  // when origin/tag selections trigger multiple rebuild passes.
  const weapons = [];
  const ammo    = [];
  const armor   = [];
  const chems   = [];
  const food    = [];
  const robotMods = [];
  const misc    = [];
  let caps = 0;

  autoItems.forEach(item => {
    const quantity = resolveItemQuantity(item);
    switch (item.type) {
      case 'weapon':
        {
          const weaponEntry = buildWeaponEntry(item.name, quantity);
          if (weaponEntry) {
            weapons.push(weaponEntry);
          } else {
            misc.push({
              name: item.name,
              quantity,
              source: 'starting_equipment',
              note: item.note || 'Could not resolve to source truth weapon data.',
            });
          }
        }
        break;
      case 'ammo':
        if (String(item.name || '').toLowerCase() === 'small guns ammo') {
          const ammoType = findAmmoTypeForSmallGuns(weapons, ammo);
          if (ammoType) {
            ammo.push({ type: ammoType, quantity, source: 'starting_equipment', note: item.note || '' });
          } else {
            pendingChoices.push({
              type: 'ammo',
              optional: true,
              optionKey: 'tag_small_guns_ammo',
              optionLabel: 'Choose additional Small Guns ammo type',
              options: SMALL_GUNS_AMMO_TYPES,
              quantity,
              note: item.note || '',
              resolved: false,
              resolvedValue: null,
            });
          }
        } else {
          ammo.push({ type: item.name, quantity, source: 'starting_equipment' });
        }
        break;
      case 'apparel':
      case 'robot_armor':
        {
          const apparelEntry = buildApparelEntry(item.name, item.type);
          if (apparelEntry) {
            armor.push(apparelEntry);
          } else {
            misc.push({
              name: item.name,
              quantity,
              source: 'starting_equipment',
              note: item.note || 'Could not resolve to source truth armor data.',
            });
          }
        }
        break;
      case 'consumable':
        chems.push(buildChemEntry(item.name, quantity, item.note || ''));
        break;
      case 'food':
        food.push(buildFoodEntry(item.name, quantity, item.note || ''));
        break;
      case 'robot_mod':
        {
          const robotModEntry = buildRobotModEntry(item.name, quantity);
          if (robotModEntry) {
            robotMods.push(robotModEntry);
          } else {
            robotMods.push({ name: item.name, quantity, source: 'starting_equipment', note: item.note || '' });
          }
        }
        break;
      case 'miscellany':
        misc.push(buildMiscEntry(item.name, quantity, item.note || ''));
        break;
      case 'currency':
        caps += quantity;
        break;
    }
  });

  return {
    updates: {
      equipment: JSON.stringify(dedupeByName(weapons, ['name', 'type', 'ammo', 'source'])),
      ammo_inventory: JSON.stringify(dedupeByName(ammo, ['type', 'source', 'note'])),
      armor_equipped: JSON.stringify(dedupeArmorEntries(armor)),
      chems_inventory: JSON.stringify(dedupeByName(chems, ['name', 'label', 'source', 'note'])),
      food_inventory: JSON.stringify(dedupeByName(food, ['name', 'label', 'source', 'note'])),
      robot_mods: JSON.stringify(dedupeByName(robotMods, ['name', 'source', 'note'])),
      miscellany: JSON.stringify(dedupeByName(misc, ['name', 'source', 'note'])),
      caps,
      sub_origin: packKey,
      pending_equipment_choices: JSON.stringify(pendingChoices),
    },
    pendingChoices,
  };
}

// ─── resolveEquipmentChoice ───────────────────────────────────────────────────

export function resolveEquipmentChoice(character, choiceKey, chosenValue) {
  const pending = safeJson(character.pending_equipment_choices, []);
  const choiceIdx = pending.findIndex(c => c.optionKey === choiceKey);
  if (choiceIdx === -1) return null;

  const choice = pending[choiceIdx];

  const weapons   = safeJson(character.equipment, []);
  const ammo      = safeJson(character.ammo_inventory, []);
  const armor     = dedupeArmorEntries(safeJson(character.armor_equipped, []));
  const chems     = safeJson(character.chems_inventory, []);
  const food      = safeJson(character.food_inventory, []);
  const misc      = safeJson(character.miscellany, []);
  const robotMods = safeJson(character.robot_mods, []);
  let caps = parseInt(character.caps) || 0;

  const state = { weapons, ammo, armor, chems, food, misc, robotMods, caps };
  const mappedGrants = choice.optionItems?.[chosenValue];
  if (Array.isArray(mappedGrants) && mappedGrants.length > 0) {
    mappedGrants.forEach(grant => applyChoiceGrantToInventory(grant, state));
  } else if ((choice.type === 'apparel' || choice.type === 'robot_armor') && String(chosenValue || '').includes(' + ')) {
    String(chosenValue)
      .split(' + ')
      .map(part => part.trim())
      .filter(Boolean)
      .forEach(part => applyChoiceGrantToInventory({ type: choice.type, name: part, quantity: choice.quantity || 1, note: choice.note || '' }, state));
  } else {
    applyChoiceGrantToInventory({ type: choice.type, name: chosenValue, quantity: choice.quantity || 1, note: choice.note || '' }, state);
  }
  caps = state.caps;

  const updated = pending.map((c, i) =>
    i === choiceIdx ? { ...c, resolved: true, resolvedValue: chosenValue } : c
  );

  return {
    equipment: JSON.stringify(weapons),
    ammo_inventory: JSON.stringify(ammo),
    armor_equipped: JSON.stringify(dedupeArmorEntries(armor)),
    chems_inventory: JSON.stringify(chems),
    food_inventory: JSON.stringify(food),
    miscellany: JSON.stringify(misc),
    robot_mods: JSON.stringify(robotMods),
    caps,
    pending_equipment_choices: JSON.stringify(updated),
  };
}
