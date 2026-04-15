// Starting equipment application logic
import { ORIGIN_PACKS, TAG_SKILL_ITEMS } from './falloutData';
import { CORE_WEAPONS } from './sourceTruthData';

function safeJson(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
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
const LEGACY_WEAPON_NAME_MAP = {
  'laser pistol': 'laser gun',
  'laser rifle': 'laser gun',
  'pipe rifle': 'pipe gun',
  'throwing knives': 'throwing knife',
  'tomahawks': 'tomahawk',
  'molotov cocktails': 'molotov cocktail',
  'baseball grenades': 'baseball grenade',
};

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
  // Fallback stub
  const cleanName = parsed.name.split('+')[0].split('(')[0].trim();
  return {
    id: Date.now() + Math.random(),
    name: cleanName,
    damage: '',
    damageType: 'Physical',
    damageEffect: '',
    type: '',
    range: 'Melee',
    qualities: '',
    weight: 0,
    ammo: '',
    fireModes: [],
    quantity: resolvedQuantity,
    source: 'starting_equipment',
  };
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

  const weapons = safeJson(character.equipment, []);
  const ammo    = safeJson(character.ammo_inventory, []);
  const armor   = safeJson(character.armor_equipped, []);
  const chems   = safeJson(character.chems_inventory, []);
  const food    = safeJson(character.food_inventory, []);
  const robotMods = safeJson(character.robot_mods, []);
  const misc    = safeJson(character.miscellany, []);
  let caps = parseInt(character.caps) || 0;

  autoItems.forEach(item => {
    const quantity = resolveItemQuantity(item);
    const base = { name: item.name, quantity, source: 'starting_equipment', note: item.note || '' };
    switch (item.type) {
      case 'weapon':
        weapons.push(buildWeaponEntry(item.name, quantity));
        break;
      case 'ammo':
        ammo.push({ type: item.name, quantity, source: 'starting_equipment' });
        break;
      case 'apparel':
      case 'robot_armor':
        armor.push({ name: item.name, physRes: 0, enerRes: 0, radRes: 0, locations: [], source: 'starting_equipment', type: item.type === 'robot_armor' ? 'Robot Armor' : '' });
        break;
      case 'consumable':
        chems.push({ ...base, label: item.name });
        break;
      case 'food':
        food.push({ ...base, label: item.name });
        break;
      case 'robot_mod':
        robotMods.push({ name: item.name, source: 'starting_equipment' });
        break;
      case 'miscellany':
        misc.push(base);
        break;
      case 'currency':
        caps += quantity;
        break;
    }
  });

  return {
    updates: {
      equipment: JSON.stringify(weapons),
      ammo_inventory: JSON.stringify(ammo),
      armor_equipped: JSON.stringify(armor),
      chems_inventory: JSON.stringify(chems),
      food_inventory: JSON.stringify(food),
      robot_mods: JSON.stringify(robotMods),
      miscellany: JSON.stringify(misc),
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
  const armor     = safeJson(character.armor_equipped, []);
  const chems     = safeJson(character.chems_inventory, []);
  const food      = safeJson(character.food_inventory, []);
  const misc      = safeJson(character.miscellany, []);
  const robotMods = safeJson(character.robot_mods, []);
  let caps = parseInt(character.caps) || 0;

  const base = { name: chosenValue, quantity: choice.quantity || 1, source: 'starting_equipment' };

  switch (choice.type) {
    case 'weapon': {
      // Split compound option strings, e.g. "Laser Pistol + Fusion Cell (10+5CD shots)"
      const { weaponName, ammoName, ammoQty } = parseWeaponOption(chosenValue);
      weapons.push(buildWeaponEntry(weaponName, 1));
      if (ammoName) {
        ammo.push({ type: ammoName, quantity: ammoQty, source: 'starting_equipment' });
      }
      break;
    }
    case 'ammo':
      ammo.push({ type: chosenValue, quantity: choice.quantity || 1, source: 'starting_equipment' });
      break;
    case 'apparel':
    case 'robot_armor':
      armor.push({ name: chosenValue, physRes: 0, enerRes: 0, radRes: 0, locations: [], source: 'starting_equipment' });
      break;
    case 'consumable':
      chems.push({ ...base, label: chosenValue });
      break;
    case 'food':
      food.push({ ...base, label: chosenValue });
      break;
    case 'miscellany':
      misc.push(base);
      break;
    case 'robot_mod':
      robotMods.push({ name: chosenValue, source: 'starting_equipment' });
      break;
    case 'currency':
      caps += choice.quantity || 0;
      break;
  }

  const updated = pending.map((c, i) =>
    i === choiceIdx ? { ...c, resolved: true, resolvedValue: chosenValue } : c
  );

  return {
    equipment: JSON.stringify(weapons),
    ammo_inventory: JSON.stringify(ammo),
    armor_equipped: JSON.stringify(armor),
    chems_inventory: JSON.stringify(chems),
    food_inventory: JSON.stringify(food),
    miscellany: JSON.stringify(misc),
    robot_mods: JSON.stringify(robotMods),
    caps,
    pending_equipment_choices: JSON.stringify(updated),
  };
}
