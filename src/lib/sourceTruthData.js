import {
  SOURCE_WEAPONS,
  SOURCE_AMMO,
  SOURCE_APPAREL,
  SOURCE_ARMOR,
  SOURCE_POWER_ARMOR,
  SOURCE_FOOD,
  SOURCE_CHEMS,
  SOURCE_OTHER_CONSUMABLES,
  SOURCE_CORE_PERKS,
  SOURCE_ROBOT_MODS,
  SOURCE_MISCELLANY,
} from './sourceTruthData.generated.js';
import {
  PDF_WEAPONS,
  PDF_AMMO,
  PDF_APPAREL,
  PDF_ARMOR,
  PDF_POWER_ARMOR,
  PDF_FOOD,
  PDF_CHEMS,
  PDF_OTHER_CONSUMABLES,
  PDF_PERK_CANDIDATES,
} from './pdfSupplementData.generated.js';
import { PERKS, WANDERERS_PERKS } from './falloutData.js';

function mergeByLabel(baseRows = [], supplementRows = []) {
  const map = new Map();

  const keyOf = (row) => String(row?.label || row?.name || '').trim().toLowerCase();

  for (const row of baseRows) {
    const key = keyOf(row);
    if (!key) continue;
    map.set(key, row);
  }

  for (const row of supplementRows) {
    const key = keyOf(row);
    if (!key) continue;
    if (!map.has(key)) {
      map.set(key, row);
    }
  }

  return [...map.values()];
}

function cleanText(value) {
  return String(value || '').trim();
}

function buildWeaponFallbackNote(weapon) {
  const parts = [];
  const type = cleanText(weapon.type) || 'Weapon';
  const damage = cleanText(weapon.damage) || 'unknown damage';
  const damageType = cleanText(weapon.damageType) || 'Physical';
  const range = cleanText(weapon.range) || 'Close';
  const fireRate = Number.isFinite(Number(weapon.fireRate)) ? Number(weapon.fireRate) : 0;
  const qualities = cleanText(weapon.qualities).replace(/^-+$/, '');
  const effects = cleanText(weapon.damageEffect).replace(/^-+$/, '');
  const ammo = cleanText(weapon.ammo);

  parts.push(`${type} weapon dealing ${damage} ${damageType} damage at ${range} range.`);
  if (fireRate > 0) parts.push(`Fire Rate ${fireRate}.`);
  if (effects) parts.push(`Damage effects: ${effects}.`);
  if (qualities) parts.push(`Qualities: ${qualities}.`);
  if (ammo) parts.push(`Uses ${ammo}.`);

  return parts.join(' ');
}

function withWeaponNotes(weapons = []) {
  return weapons.map((weapon) => {
    if (cleanText(weapon?.note)) return weapon;
    return { ...weapon, note: buildWeaponFallbackNote(weapon) };
  });
}

function normalizeLegacySupplementPerks() {
  const settlersPerks = PERKS
    .filter((perk) => String(perk?.source || '').toLowerCase() === 'settlers')
    .map((perk) => ({
      key: perk.key,
      label: perk.label,
      ranks: perk.maxRanks || perk.ranks || 1,
      requirements: perk.requirements || perk.requirement || {},
      source: perk.source || 'Settlers',
      description: perk.description || '',
    }));

  const wanderersPerks = WANDERERS_PERKS.map((perk) => ({
    key: perk.key,
    label: perk.label,
    ranks: perk.ranks || perk.maxRanks || 1,
    requirements: perk.requirements || perk.requirement || {},
    source: perk.source || 'Wanderers',
    description: perk.description || '',
  }));

  return [...settlersPerks, ...wanderersPerks];
}

const SUPPLEMENT_PERKS = normalizeLegacySupplementPerks();

// Canonical data exported from the Foundry VTT Reference system.
export const CORE_WEAPONS = withWeaponNotes(mergeByLabel(SOURCE_WEAPONS, PDF_WEAPONS));
export const CORE_AMMO = mergeByLabel(SOURCE_AMMO, PDF_AMMO);
export const CORE_APPAREL = mergeByLabel(SOURCE_APPAREL, PDF_APPAREL);
export const CORE_ARMOR = mergeByLabel(SOURCE_ARMOR, PDF_ARMOR);
export const CORE_POWER_ARMOR = mergeByLabel(SOURCE_POWER_ARMOR, PDF_POWER_ARMOR);
export const CORE_FOOD = mergeByLabel(SOURCE_FOOD, PDF_FOOD);
export const CORE_CHEMS = mergeByLabel(SOURCE_CHEMS, PDF_CHEMS);
export const CORE_OTHER_CONSUMABLES = mergeByLabel(SOURCE_OTHER_CONSUMABLES, PDF_OTHER_CONSUMABLES);
export const CORE_PERKS = mergeByLabel(SOURCE_CORE_PERKS, [...PDF_PERK_CANDIDATES, ...SUPPLEMENT_PERKS]);
export const CORE_ROBOT_MODS = [...SOURCE_ROBOT_MODS];
export const CORE_MISCELLANY = [...SOURCE_MISCELLANY];
