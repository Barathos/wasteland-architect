// Shared helper for resolving armor DR values from character.apparel and character.armor_equipped

const APPAREL_SLOTS = ['head', 'torso', 'left_arm', 'right_arm', 'left_leg', 'right_leg', 'power_armor'];

function safeParseJson(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

export function parseCharacterApparel(character) {
  return safeParseJson(character.apparel, {});
}

export function parseCharacterArmorEquipped(character) {
  const raw = safeParseJson(character.armor_equipped, []);
  return Array.isArray(raw) ? raw : [];
}

// Resolve DR values for a single slot key
export function resolveApparelSlot(character, slotKey) {
  const apparel = parseCharacterApparel(character);
  const armorEquipped = parseCharacterArmorEquipped(character);
  const slot = apparel[slotKey];

  if (!slot || !slot.worn) {
    return { physical: 0, energy: 0, radiation: 0, worn: false, name: '' };
  }

  // Try direct slot DR values first
  let physical = parseInt(slot.physDR) || 0;
  let energy = parseInt(slot.energyDR) || 0;
  let radiation = parseInt(slot.radDR) || 0;
  let name = slot.name || slot.linkedArmorName || '';

  // If slot has a linked armor name, try to find it in armor_equipped for fallback/override
  const linkedName = slot.linkedArmorName || slot.name;
  if (linkedName) {
    const linked = armorEquipped.find(a => a.name === linkedName || a.label === linkedName);
    if (linked) {
      // Use linked values if slot doesn't have explicit DR values set
      if (!parseInt(slot.physDR) && !parseInt(slot.energyDR) && !parseInt(slot.radDR)) {
        physical = parseInt(linked.physRes ?? linked.physDR) || 0;
        energy = parseInt(linked.enerRes ?? linked.energyDR) || 0;
        radiation = parseInt(linked.radRes ?? linked.radDR) || 0;
      }
      name = linked.label || linked.name || name;
    }
  }

  return { physical, energy, radiation, worn: true, name };
}

// Returns per-slot DR for all supported slots
export function getPerSlotArmorDR(character) {
  const result = {};
  APPAREL_SLOTS.forEach(k => {
    result[k] = resolveApparelSlot(character, k);
  });
  return result;
}

// Returns summed totals across all worn slots (excluding power_armor to avoid double-count)
export function getTotalApparelDR(character) {
  const slots = getPerSlotArmorDR(character);
  let phys = 0, energy = 0, rad = 0;
  ['head', 'torso', 'left_arm', 'right_arm', 'left_leg', 'right_leg'].forEach(k => {
    const s = slots[k];
    if (s.worn) { phys += s.physical; energy += s.energy; rad += s.radiation; }
  });
  // Include power_armor if worn
  const pa = slots['power_armor'];
  if (pa && pa.worn) { phys += pa.physical; energy += pa.energy; rad += pa.radiation; }
  return { phys, energy, rad };
}