// Starting equipment application logic
import { ORIGIN_PACKS, TAG_SKILL_ITEMS, SETTLERS_WEAPONS, WANDERERS_WEAPONS } from './falloutData';
import { CORE_WEAPONS } from './sourceTruthData';

function safeJson(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

// ─── Weapon lookup helpers ────────────────────────────────────────────────────

const ALL_WEAPONS = [...CORE_WEAPONS, ...SETTLERS_WEAPONS, ...WANDERERS_WEAPONS];

function findWeaponByName(name) {
  const clean = name.split('+')[0].split('(')[0].trim().toLowerCase();
  const result = ALL_WEAPONS.find(w => {
    if (w.label.toLowerCase() === clean) return true;
    if (w.label.toLowerCase().includes(clean)) return true;
    if (clean.includes(w.label.toLowerCase())) return true;
    if (w.aliases?.some(a => a.toLowerCase() === clean)) return true;
    if (w.aliases?.some(a => a.toLowerCase().includes(clean))) return true;
    return false;
  });
  console.log('findWeaponByName:', name, '->', result?.label ?? 'NOT FOUND');
  return result;
}

function buildWeaponEntry(itemName, quantity = 1) {
  const found = findWeaponByName(itemName);
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
      quantity,
      source: 'starting_equipment',
      note: found.note || '',
    };
  }
  // Fallback stub
  const cleanName = itemName.split('+')[0].split('(')[0].trim();
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
    quantity,
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
    const base = { name: item.name, quantity: item.quantity, source: 'starting_equipment', note: item.note || '' };
    switch (item.type) {
      case 'weapon':
        weapons.push(buildWeaponEntry(item.name, item.quantity));
        break;
      case 'ammo':
        ammo.push({ type: item.name, quantity: item.quantity, source: 'starting_equipment' });
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
        caps += item.quantity;
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
