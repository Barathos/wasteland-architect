// Foundry VTT export utility for Fallout 2d20 system

function generateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function makeItemBase(name, type) {
  return {
    _id: generateId(),
    _stats: {
      compendiumSource: null, duplicateSource: null, exportSource: null,
      coreVersion: '13.351', systemId: 'fallout', systemVersion: '11.16.6',
      lastModifiedBy: null,
    },
    effects: [], flags: {}, folder: null,
    img: `systems/fallout/assets/icons/items/${type}.webp`,
    name, sort: 0, type,
    ownership: { default: 0 },
  };
}

function parseDamageEffects(effectsStr) {
  const str = (effectsStr || '').toLowerCase();
  const piercingMatch = str.match(/piercing\s*(\d+)/);
  return {
    arc: { rank: 0, value: str.includes('arc') },
    breaking: { rank: 0, value: str.includes('breaking') },
    burst: { rank: 0, value: str.includes('burst') },
    freeze: { rank: 0, value: str.includes('freeze') },
    persistent: { rank: 0, value: str.includes('persistent') },
    piercing_x: { rank: piercingMatch ? parseInt(piercingMatch[1]) : 1, value: !!piercingMatch },
    radioactive: { rank: 0, value: str.includes('radioactive') },
    spread: { rank: 0, value: str.includes('spread') },
    stun: { rank: 0, value: str.includes('stun') },
    tranquilize_x: { rank: 1, value: false },
    vicious: { rank: 0, value: str.includes('vicious') },
  };
}

function parseWeaponQualities(qualStr) {
  const str = (qualStr || '').toLowerCase();
  const recoilMatch = str.match(/recoil\s*\((\d+)\)/);
  const ammoHungryMatch = str.match(/ammo.hungry\s*\((\d+)\)/);
  return {
    accurate: { rank: 0, value: str.includes('accurate') && !str.includes('inaccurate') },
    aquatic: { rank: 0, value: false },
    ammo_hungry_x: { rank: ammoHungryMatch ? parseInt(ammoHungryMatch[1]) : 1, value: !!ammoHungryMatch },
    blast: { rank: 0, value: str.includes('blast') },
    bombard: { rank: 0, value: str.includes('bombard') },
    close_quarters: { rank: 0, value: str.includes('close quarters') },
    concealed: { rank: 0, value: str.includes('concealed') },
    debilitating: { rank: 0, value: str.includes('debilitating') },
    delay_x: { rank: 1, value: str.includes('delay') },
    gatling: { rank: 0, value: str.includes('gatling') },
    fuel_x: { rank: 1, value: 0 },
    inaccurate: { rank: 0, value: str.includes('inaccurate') },
    limited: { rank: 0, value: false },
    mine: { rank: 0, value: str.includes('mine') },
    night_vision: { rank: 0, value: false },
    parry: { rank: 0, value: str.includes('parry') },
    placed: { rank: 0, value: str.includes('placed') },
    recoil_x: { rank: recoilMatch ? parseInt(recoilMatch[1]) : 0, value: !!recoilMatch },
    recon: { rank: 0, value: false },
    reliable: { rank: 0, value: str.includes('reliable') && !str.includes('unreliable') },
    slow_load: { rank: 0, value: str.includes('slow load') },
    suppressed: { rank: 0, value: str.includes('suppressed') },
    surge: { rank: 0, value: str.includes('surge') },
    thrown: { rank: 0, value: str.includes('thrown') },
    two_handed: { rank: 0, value: str.includes('two-handed') || str.includes('two handed') },
    unreliable: { rank: 0, value: str.includes('unreliable') },
    unstable_radiation: { rank: 0, value: false },
    wrangle: { rank: 0, value: false },
  };
}

function mapWeaponType(type) {
  const map = {
    'Small Guns': 'smallGuns', 'Energy Weapons': 'energyWeapons',
    'Big Guns': 'bigGuns', 'Melee': 'meleeWeapons', 'Unarmed': 'unarmed',
    'Throwing': 'throwing', 'Explosive': 'explosives', 'Bow': 'smallGuns',
  };
  return map[type] || 'meleeWeapons';
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

function safeParseJson(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

const SKILL_DEFAULTS = {
  'Unarmed': 'str', 'Athletics': 'str', 'Science': 'int', 'Sneak': 'agi',
  'Pilot': 'per', 'Survival': 'end', 'Lockpick': 'per', 'Throwing': 'agi',
  'Small Guns': 'agi', 'Medicine': 'int', 'Repair': 'int', 'Speech': 'cha',
  'Explosives': 'per', 'Energy Weapons': 'per', 'Melee Weapons': 'str',
  'Big Guns': 'end', 'Barter': 'cha',
};

// Map from app skill keys (snake_case) to display names
const SKILL_KEY_MAP = {
  unarmed: 'Unarmed', athletics: 'Athletics', science: 'Science', sneak: 'Sneak',
  pilot: 'Pilot', survival: 'Survival', lockpick: 'Lockpick', throwing: 'Throwing',
  small_guns: 'Small Guns', medicine: 'Medicine', repair: 'Repair', speech: 'Speech',
  explosives: 'Explosives', energy_weapons: 'Energy Weapons', melee_weapons: 'Melee Weapons',
  big_guns: 'Big Guns', barter: 'Barter',
};

const SKILL_DESCRIPTIONS = {
  'Unarmed': 'The Unarmed skill covers your ability to fight with your fists.',
  'Athletics': 'Athletics describes your ability to apply your physical strength and agility.',
  'Science': 'The Science skill covers academic and practical knowledge.',
  'Sneak': 'The Sneak skill covers stealthy movement and physical actions not to be noticed.',
  'Pilot': 'The Pilot skill covers your ability to operate vehicles.',
  'Survival': 'The Survival skill covers all manner of practical bush craft.',
  'Lockpick': 'The Lockpick skill covers opening locks without the proper key.',
  'Throwing': 'The Throwing skill covers throwing objects and weapons.',
  'Small Guns': 'The Small Guns skill covers pistols, rifles, and shotguns.',
  'Medicine': 'The Medicine skill covers medical knowledge and treatment.',
  'Repair': 'The Repair skill covers fixing and modifying equipment.',
  'Speech': 'The Speech skill covers persuasion, deception, and negotiation.',
  'Explosives': 'The Explosives skill covers bombs, grenades, and mines.',
  'Energy Weapons': 'The Energy Weapons skill covers laser, plasma, and other energy weapons.',
  'Melee Weapons': 'The Melee Weapons skill covers hand-to-hand melee combat.',
  'Big Guns': 'The Big Guns skill covers heavy weapons.',
  'Barter': 'The Barter skill covers trade and commerce.',
};

export function exportToFoundry(character) {
  const items = [];

  // --- SKILLS ---
  // App stores skills as JSON string: [{ key, label, rank, tag }] or { key: { rank, tag } }
  const rawSkills = safeParseJson(character.skills, []);
  const rawTagSkills = safeParseJson(character.tag_skills, []);

  // Build a lookup: display name → { rank, tag }
  const skillLookup = {};
  if (Array.isArray(rawSkills)) {
    rawSkills.forEach(s => {
      // s.key is snake_case like 'small_guns', s.rank is number
      const displayName = SKILL_KEY_MAP[s.key] || s.label || s.key;
      skillLookup[displayName] = { rank: s.rank ?? 0, tag: s.tag ?? false };
    });
  } else if (rawSkills && typeof rawSkills === 'object') {
    Object.entries(rawSkills).forEach(([k, v]) => {
      const displayName = SKILL_KEY_MAP[k] || k;
      const rank = typeof v === 'number' ? v : (v?.rank ?? 0);
      skillLookup[displayName] = { rank, tag: v?.tag ?? false };
    });
  }

  // tag_skills is an array of keys like ['small_guns', 'repair']
  rawTagSkills.forEach(k => {
    const displayName = SKILL_KEY_MAP[k] || k;
    if (!skillLookup[displayName]) skillLookup[displayName] = { rank: 0, tag: true };
    else skillLookup[displayName].tag = true;
  });

  Object.entries(SKILL_DEFAULTS).forEach(([skillName, defaultAttr]) => {
    const appSkill = skillLookup[skillName] || {};
    const item = makeItemBase(skillName, 'skill');
    item.img = 'systems/fallout/assets/icons/items/skill.webp';
    item.system = {
      description: `<p>${SKILL_DESCRIPTIONS[skillName] || ''}</p>`,
      favorite: false, source: 'core_rulebook',
      defaultAttribute: defaultAttr, summary: '',
      tag: appSkill.tag || false,
      value: appSkill.rank || 0,
    };
    items.push(item);
  });

  // --- WEAPONS ---
  // App stores as character.equipment (JSON string of weapon objects)
  const appWeapons = safeParseJson(character.equipment, []);
  appWeapons.forEach(w => {
    const item = makeItemBase(w.name || 'Unknown Weapon', 'weapon');
    item.img = 'systems/fallout/assets/icons/items/weapon.webp';
    const isMelee = ['Melee', 'Unarmed'].includes(w.type);
    const damageRating = parseInt((w.damage || '0').toString().replace(/[^0-9]/g, '')) || 0;
    item.system = {
      description: w.notes ? `<p>${w.notes}</p>` : '',
      favorite: false, source: 'custom',
      cost: w.cost || 0, quantity: 1, rarity: w.rarity || 0,
      stashed: false, weight: w.weight || 0,
      equippable: true, equipped: true,
      canBeScrapped: true, isJunk: false,
      ammo: w.ammoType || w.ammo || '', ammoPerShot: 1,
      attribute: '', condition: '', consumedOnUse: false,
      creatureAttribute: 'body', creatureSkill: isMelee ? 'melee' : 'guns',
      damage: {
        damageEffect: parseDamageEffects(w.damageEffect || ''),
        damageType: {
          energy: /energy/i.test(w.damageType || ''),
          physical: /physical/i.test(w.damageType || '') || !w.damageType,
          poison: /poison/i.test(w.damageType || ''),
          radiation: /radiation/i.test(w.damageType || ''),
        },
        originalDamageType: { energy: false, physical: false, poison: false, radiation: false },
        originalRating: 0, rating: damageRating,
        weaponQuality: parseWeaponQualities(w.qualities || ''),
      },
      fireRate: w.fireRate ?? w.fire_rate ?? 0,
      melee: isMelee,
      mods: { current: 0, installedMods: '', list: '', max: 0, modded: false },
      naturalWeapon: false, originalAmmoPerShot: 0, quantityRoll: '',
      range: mapRange(w.range),
      skill: '', tear: 0,
      weaponType: mapWeaponType(w.type),
    };
    items.push(item);
  });

  // --- AMMO ---
  // App stores as character.ammo_inventory (JSON string)
  const appAmmo = safeParseJson(character.ammo_inventory, []);
  appAmmo.forEach(a => {
    const item = makeItemBase(a.type || a.label || 'Ammo', 'ammo');
    item.img = 'systems/fallout/assets/icons/items/ammo.webp';
    const qty = parseInt(a.quantity) || 0;
    item.system = {
      description: '', favorite: false, source: 'custom',
      cost: 1, quantity: 1, rarity: 1,
      stashed: false, weight: 0.1,
      charges: { current: qty, max: qty },
      effect: '', fusionCore: false,
      shots: { current: qty, max: qty },
      quantityRoll: '', multishot: true, type: '',
    };
    items.push(item);
  });

  // --- APPAREL / ARMOR ---
  // App stores as character.armor_equipped (JSON string array of { name, physRes, enerRes, radRes, locations, ... })
  const appArmor = safeParseJson(character.armor_equipped, []);
  appArmor.forEach(a => {
    const item = makeItemBase(a.name || 'Apparel', 'apparel');
    item.img = 'systems/fallout/assets/icons/items/apparel.webp';
    const locationsRaw = a.locations
      ? (typeof a.locations === 'string' ? a.locations.split(',').map(s => s.trim()) : a.locations)
      : [];
    item.system = {
      description: a.special ? `<p>${a.special}</p>` : '',
      favorite: false, source: 'custom',
      cost: 0, quantity: 1, rarity: 0,
      stashed: false, weight: 0,
      equippable: true, equipped: true,
      canBeScrapped: true, isJunk: false,
      apparelType: mapApparelType(a.type || ''),
      health: { max: a.hp || 0, min: 0, mod: 0, value: a.hp || 0 },
      location: mapApparelLocations(locationsRaw),
      mods: { current: 0, installedMods: '', list: '', max: 0, modded: false },
      powerArmor: { frameId: '', isFrame: false, powered: false },
      resistance: {
        energy: a.enerRes ?? 0,
        physical: a.physRes ?? 0,
        radiation: a.radRes ?? 0,
      },
      shadowed: false,
    };
    items.push(item);
  });

  // --- PERKS ---
  // App stores as character.perks (JSON string of perk objects)
  const appPerks = safeParseJson(character.perks, []);
  appPerks.forEach(p => {
    const item = makeItemBase(p.label || p.name || 'Perk', 'perk');
    item.img = 'systems/fallout/assets/icons/items/perk.webp';
    const rank = p.currentRank ?? p.rank ?? 1;
    const maxRank = p.maxRanks ?? p.ranks ?? rank;
    item.system = {
      description: p.description ? `<p>${p.description}</p>` : '',
      favorite: false, source: p.source === 'Core' ? 'core_rulebook' : 'supplement',
      rank: { max: maxRank, value: rank, levelIncrease: 0, levelStart: p.requirement?.level || 1 },
      requirements: '',
      requirementsEx: {
        level: p.requirement?.level || 1,
        levelIncrease: 0,
        attributes: { str: { value: 0 }, per: { value: 0 }, end: { value: 0 }, cha: { value: 0 }, int: { value: 0 }, agi: { value: 0 }, luc: { value: 0 } },
      },
    };
    items.push(item);
  });

  // --- CONSUMABLES (chems) ---
  const appChems = safeParseJson(character.chems_inventory, []);
  appChems.forEach(c => {
    const item = makeItemBase(c.label || c.name || 'Consumable', 'consumable');
    item.img = 'systems/fallout/assets/icons/items/consumable.webp';
    item.system = {
      description: c.effect ? `<p>${c.effect}</p>` : '',
      favorite: false, source: 'core_rulebook',
      cost: c.cost || 0, quantity: c.quantity || 1,
      rarity: c.rarity || 0, stashed: false, weight: c.weight || 0.1,
      canBeScrapped: false, isJunk: false,
      effect: c.effect || '', quantityRoll: '',
      addictive: c.addictive || false, addiction: { value: false },
      duration: c.duration || 'lasting',
    };
    items.push(item);
  });

  // --- FOOD ---
  const appFood = safeParseJson(character.food_inventory, []);
  appFood.forEach(f => {
    const item = makeItemBase(f.label || f.name || 'Food', 'consumable');
    item.img = 'systems/fallout/assets/icons/items/consumable.webp';
    item.system = {
      description: f.effect ? `<p>Heals ${f.hp || 0} HP. ${f.effect}</p>` : `<p>Heals ${f.hp || 0} HP.</p>`,
      favorite: false, source: 'core_rulebook',
      cost: f.cost || 0, quantity: f.quantity || 1,
      rarity: f.rarity || 0, stashed: false, weight: f.weight || 0.5,
      canBeScrapped: false, isJunk: false,
      effect: f.effect || '', quantityRoll: '',
      addictive: false, addiction: { value: false }, duration: 'instant',
    };
    items.push(item);
  });

  // --- ATTRIBUTES ---
  // App stores SPECIAL as direct fields: character.strength, character.perception, etc.
  const str = parseInt(character.strength) || 5;
  const per = parseInt(character.perception) || 5;
  const end = parseInt(character.endurance) || 5;
  const cha = parseInt(character.charisma) || 5;
  const int_ = parseInt(character.intelligence) || 5;
  const agi = parseInt(character.agility) || 5;
  const luc = parseInt(character.luck) || 5;

  const maxHP = parseInt(character.hp_max) || (end + luc);
  const currentHP = parseInt(character.hp_current) ?? maxHP;
  const defense = 1;
  const initiative = per + agi;
  const carryWeight = 150 + (str * 10);

  const origin = character.origin || '';
  const isRobot = ['Protectron', 'Robobrain', 'Securitron', 'Mister Handy', 'Assaultron'].includes(origin);

  const conditions = {
    alcoholic: character.is_alcoholic || false,
    fatigue: parseInt(character.fatigue) || 0,
    hunger: 0, lastChanged: { hunger: 0, sleep: 0, thirst: 0 },
    intoxication: parseInt(character.intoxication) || 0,
    sleep: 0, thirst: 0,
    wellRested: character.is_well_rested || false,
    tinkeredWith: false,
  };

  function makeBodyPart() {
    return {
      injuries: [0, 0, 0, 0, 0],
      injuryOpenCount: 0, injuryTreatedCount: 0,
      resistance: { energy: 0, physical: 0, poison: 0, radiation: 0 },
      status: 'healthy',
    };
  }

  return {
    _stats: {
      compendiumSource: null, duplicateSource: null,
      exportSource: {
        worldId: 'fallout', uuid: `Actor.${generateId()}`,
        coreVersion: '13.351', systemId: 'fallout', systemVersion: '11.16.6',
      },
      coreVersion: '13.351', systemId: 'fallout', systemVersion: '11.16.6',
      createdTime: Date.now(), modifiedTime: Date.now(),
      lastModifiedBy: 'fallout2d20app',
    },
    effects: [], flags: {}, folder: null,
    img: isRobot
      ? 'systems/fallout/assets/tokens/robot.webp'
      : 'systems/fallout/assets/tokens/human.webp',
    items,
    name: character.name || 'Unnamed Character',
    prototypeToken: {
      name: character.name || 'Unnamed Character',
      displayName: 20, actorLink: true,
      texture: {
        src: isRobot ? 'systems/fallout/assets/tokens/robot.webp' : 'systems/fallout/assets/tokens/human.webp',
        scaleX: 1, scaleY: 1, offsetX: 0, offsetY: 0, rotation: 0, tint: null,
      },
      width: 1, height: 1, lockRotation: false, rotation: 0,
      alpha: 1, disposition: 1, displayBars: 20,
      bar1: { attribute: 'health' }, bar2: { attribute: null },
      light: { alpha: 0.5, angle: 360, bright: 0, color: null, coloration: 1, dim: 0, attenuation: 0.5, luminosity: 0.5, saturation: 0, contrast: 0, shadows: 0, animation: { type: null, speed: 5, intensity: 5, reverse: false }, darkness: { min: 0, max: 1 } },
      sight: { enabled: false, range: 0, angle: 360, visionMode: 'basic', color: null, attenuation: 0.1, brightness: 0, saturation: 0, contrast: 0 },
      detectionModes: [], occludable: { radius: 0 }, ring: { enabled: false },
      flags: {}, randomImg: false,
    },
    system: {
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
        poison: isRobot || ['Ghoul', 'Nightkin', 'Super Mutant'].includes(origin),
        radiation: isRobot || ['Ghoul', 'Nightkin', 'Super Mutant', 'Child of Atom'].includes(origin),
      },
      conditions,
      defense: { bonus: 0, value: defense },
      health: { bonus: 0, max: maxHP, value: currentHP },
      initiative: { bonus: 0, value: initiative },
      luckPoints: parseInt(character.luck_points) || luc,
      meleeDamage: { bonus: 0, value: Math.max(0, Math.floor((str - 5) / 2)) },
      radiation: parseInt(character.radiation) || 0,
      resistance: {
        energy: parseInt(character.resistance_energy) || 0,
        physical: parseInt(character.resistance_physical) || 0,
        poison: parseInt(character.resistance_poison) || 0,
        radiation: parseInt(character.resistance_radiation) || 0,
      },
      carryWeight: { base: carryWeight, encumbranceLevel: 0, mod: 0, total: carryWeight, value: parseInt(character.encumbrance) || 0 },
      readMagazines: [],
      attributes: {
        agi: { value: agi }, cha: { value: cha }, end: { value: end },
        int: { value: int_ }, luc: { value: luc }, per: { value: per }, str: { value: str },
      },
      skill: { tags: { additionalTags: [], bonus: 0, max: 3 } },
      currency: { caps: parseInt(character.caps) || 0, other: '' },
      materials: { junk: 0, common: 0, rare: 0, uncommon: 0 },
      tinkeredWith: false,
    },
    type: 'character',
    ownership: { default: 0 },
  };
}