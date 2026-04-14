// Starting equipment application logic
import { ORIGIN_PACKS, TAG_SKILL_ITEMS } from './falloutData';

function safeJson(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

/**
 * Given a character and selected pack key + tag skills,
 * builds the inventory updates and pending choices to apply.
 * Returns { updates, pendingChoices }
 */
export function buildStartingEquipment(character, packKey, tagSkillKeys = []) {
  const packs = ORIGIN_PACKS[character.origin] || [];
  const pack = packs.find(p => p.key === packKey);
  if (!pack) return null;

  // Gather all items: pack items + tag skill bonus items
  const allItems = [...pack.equipment];
  tagSkillKeys.forEach(sk => {
    // Normalize tag skill key to display name for lookup
    const displayName = sk.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const bonus = TAG_SKILL_ITEMS[displayName] || TAG_SKILL_ITEMS[sk];
    if (bonus) allItems.push(...bonus);
  });

  // Separate optional (choice) from auto-add items
  const autoItems = allItems.filter(i => !i.optional);
  const pendingChoices = allItems
    .filter(i => i.optional)
    .map(i => ({ ...i, resolved: false, resolvedValue: null }));

  // Build inventory arrays by appending to existing
  const weapons = safeJson(character.equipment, []);
  const ammo = safeJson(character.ammo_inventory, []);
  const armor = safeJson(character.armor_equipped, []);
  const chems = safeJson(character.chems_inventory, []);
  const food = safeJson(character.food_inventory, []);
  const robotMods = safeJson(character.robot_mods, []);
  const misc = safeJson(character.miscellany, []);
  let caps = parseInt(character.caps) || 0;

  autoItems.forEach(item => {
    const base = { name: item.name, quantity: item.quantity, source: 'starting_equipment', note: item.note || '' };
    switch (item.type) {
      case 'weapon':
        weapons.push({ name: item.name, quantity: item.quantity, damage: '', damageType: 'Physical', range: 'Melee', qualities: '', source: 'starting_equipment' });
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

/**
 * Resolve a single pending choice — add the chosen item to inventory.
 * Returns updated character field updates.
 */
export function resolveEquipmentChoice(character, choiceKey, chosenValue) {
  const pending = safeJson(character.pending_equipment_choices, []);
  const choiceIdx = pending.findIndex(c => c.optionKey === choiceKey);
  if (choiceIdx === -1) return null;

  const choice = pending[choiceIdx];

  // Add the chosen item to inventory based on type
  const weapons = safeJson(character.equipment, []);
  const ammo = safeJson(character.ammo_inventory, []);
  const armor = safeJson(character.armor_equipped, []);
  const chems = safeJson(character.chems_inventory, []);
  const food = safeJson(character.food_inventory, []);
  const misc = safeJson(character.miscellany, []);
  const robotMods = safeJson(character.robot_mods, []);
  let caps = parseInt(character.caps) || 0;

  const base = { name: chosenValue, quantity: choice.quantity || 1, source: 'starting_equipment' };

  switch (choice.type) {
    case 'weapon':
      weapons.push({ name: chosenValue, quantity: 1, damage: '', damageType: 'Physical', range: 'Melee', qualities: '', source: 'starting_equipment' });
      break;
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

  // Mark resolved
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