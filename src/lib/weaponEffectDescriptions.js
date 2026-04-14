export const WEAPON_EFFECT_DESCRIPTIONS = {
  "vicious": "Inflicts additional damage when Effects are rolled on damage dice.",
  "two-handed": "Requires two hands to wield effectively.",
  "inaccurate": "Less precise; harder to use at range. May increase difficulty.",
  "spread": "Affects a wider area or multiple targets depending on fire mode.",
  "persistent": "Continues to deal damage at the start of subsequent turns.",
  "knockdown": "A successful hit may knock the target prone.",
  "stealthy": "Does not reveal the attacker's position when fired.",
  "blast": "Affects an area around the target, potentially hitting nearby characters.",
  "freeze": "A successful hit may leave the target frozen, unable to act.",
  "burst": "Each Effect on the attack roll hits an additional nearby target.",
  "parry": "Can be used to defend against melee attacks as a reaction.",
  "close quarters": "Easier to use in tight spaces; no penalty in Close range.",
  "recoil": "High kick requires sufficient Strength to avoid difficulty penalty.",
  "stun": "A successful hit may leave the target stunned, unable to act.",
  "radioactive": "Deals Radiation damage in addition to its normal damage type.",
  "breaking": "Damages the target's equipment or armor on a successful hit.",
  "hidden": "Keeps the user's location concealed after firing.",
  "suppressed": "Generates minimal noise; does not reveal position.",
  "accurate": "Easier to aim precisely; reduces difficulty when aiming.",
  "ammo-hungry": "Consumes extra ammo with each shot fired.",
  "limited": "Has a restricted number of uses before it must be replaced.",
  "night vision": "No penalty to attacks in low-light or darkness conditions.",
  "slow-load": "Requires a minor action to reload between shots.",
  "unreliable": "Prone to complications; complication range may be increased.",
  "debilitating": "On a hit targeting a specific location, may cause an injury.",
  "gatling": "Requires spinning up before firing; high fire rate.",
  "concealed": "Can be hidden on the body without detection.",
  "piercing": "Ignores a portion of the target's damage resistance.",
  "arc": "Each Effect automatically hits a secondary nearby target.",
};

export function normalizeWeaponEffectLabel(label) {
  return (label || '')
    .trim()
    .toLowerCase()
    .replace(/\s*\(\d+\)/g, '')
    .replace(/\s+\d+$/g, '')
    .trim();
}

export function getWeaponEffectDescription(label) {
  const key = normalizeWeaponEffectLabel(label);
  return WEAPON_EFFECT_DESCRIPTIONS[key] || null;
}
