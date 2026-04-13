// Maps armor location strings to apparel slot keys
const LOCATION_SLOT_MAP = {
  'head': 'head',
  'torso': 'torso',
  'left arm': 'left_arm',
  'right arm': 'right_arm',
  'left leg': 'left_leg',
  'right leg': 'right_leg',
  'arm': null, // generic arm — compatible with both
  'leg': null, // generic leg — compatible with both
  'all': 'all',
  'arms': null,
  'legs': null,
  'power armor': 'power_armor',
  'dog': null,
};

// Given an armor item's `locations` (string or array), return compatible slot keys
export function getCompatibleSlots(locations) {
  if (!locations) return [];
  const parts = Array.isArray(locations)
    ? locations
    : String(locations).split(',');
  const slots = new Set();
  parts.forEach(part => {
    const norm = part.trim().toLowerCase();
    if (norm === 'all') {
      ['head','torso','left_arm','right_arm','left_leg','right_leg'].forEach(s => slots.add(s));
    } else if (norm === 'arms') {
      slots.add('left_arm'); slots.add('right_arm');
    } else if (norm === 'legs') {
      slots.add('left_leg'); slots.add('right_leg');
    } else if (norm === 'arm') {
      slots.add('left_arm'); slots.add('right_arm');
    } else if (norm === 'leg') {
      slots.add('left_leg'); slots.add('right_leg');
    } else {
      const mapped = LOCATION_SLOT_MAP[norm];
      if (mapped) slots.add(mapped);
    }
  });
  return [...slots];
}

// Returns all armor items compatible with a given slot key
export function getArmorForSlot(armorList, slotKey) {
  return armorList.filter(item => {
    const compatible = getCompatibleSlots(item.locations);
    return compatible.includes(slotKey);
  });
}

// Given apparel slot map, find which slot name a given armor name is assigned to
export function getAssignedSlot(apparel, armorName) {
  if (!apparel || !armorName) return null;
  const slots = ['head','torso','left_arm','right_arm','left_leg','right_leg','power_armor'];
  for (const slot of slots) {
    if (apparel[slot]?.linkedArmorName === armorName) return slot;
  }
  return null;
}

export const SLOT_LABELS = {
  head: 'Head',
  torso: 'Torso',
  left_arm: 'Left Arm',
  right_arm: 'Right Arm',
  left_leg: 'Left Leg',
  right_leg: 'Right Leg',
  power_armor: 'Power Armor',
};