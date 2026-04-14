// Foundry VTT export utility for Fallout 2d20 system
// Matches Foundry 13.351 / fallout system 11.16.6 actor document shape

// --- Stable skill IDs matching Foundry compendium entries ---
// Stable skill IDs matching Foundry Fallout system compendium entries (confirmed from working exports)
const SKILL_IDS = {
  'Unarmed':        '5xAG0eRrcvDeJAFk',
  'Athletics':      'F4uIprrKWh9ApMaU',
  'Science':        'G3mN15diMiTCDZ0U',
  'Sneak':          'HEegw2EUmmEzfdDM',
  'Pilot':          'PEN70F6ovA3g5HI2',
  'Survival':       'R8YnBNUwhZhG89iQ',
  'Lockpick':       'SH09XavazYU9CqY4',
  'Throwing':       'UQ4TLtVUR2kRlYkb',
  'Small Guns':     'UZDBirrZeUxrAk7b',
  'Medicine':       'UrVd0BmoXkAxmrvv',
  'Repair':         'ZQw4TLZbaLm5F0BW',
  'Speech':         'dOTrlwZ60XWqegQA',
  'Explosives':     'ejKiqeUyjkahCjQf',
  'Energy Weapons': 'jAJPNJpHYawNBp2h',
  'Melee Weapons':  'kCGaEuF27yXyE04i',
  'Big Guns':       'p3GhRmIwrYTJmuhr',
  'Barter':         'vf1Qszkq1om2Xgmn',
};

function generateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function safeParseJson(str, fallback) {
  try { return JSON.parse(str || ''); } catch { return fallback; }
}

// --- Metadata helpers ---

function buildActorStats() {
  const now = Date.now();
  return {
    compendiumSource: null,
    duplicateSource: null,
    exportSource: {
      worldId: 'fallout',
      uuid: `Actor.${generateId()}`,
      coreVersion: '13.351',
      systemId: 'fallout',
      systemVersion: '11.16.6',
    },
    coreVersion: '13.351',
    systemId: 'fallout',
    systemVersion: '11.16.6',
    createdTime: now,
    modifiedTime: now,
    lastModifiedBy: null,
  };
}

function buildItemStats() {
  return {
    compendiumSource: null,
    duplicateSource: null,
    exportSource: null,
    coreVersion: '13.351',
    systemId: 'fallout',
    systemVersion: '11.16.6',
    lastModifiedBy: null,
  };
}

function makeItemBase(id, name, type, imgPath) {
  return {
    _id: id || generateId(),
    _stats: buildItemStats(),
    effects: [],
    flags: {},
    folder: null,
    img: imgPath || `systems/fallout/assets/icons/items/${type}.webp`,
    name,
    sort: 0,
    system: {},
    type,
    ownership: { default: 0 },
  };
}

// --- Skill data ---

const SKILL_KEY_MAP = {
  unarmed: 'Unarmed', athletics: 'Athletics', science: 'Science', sneak: 'Sneak',
  pilot: 'Pilot', survival: 'Survival', lockpick: 'Lockpick', throwing: 'Throwing',
  small_guns: 'Small Guns', medicine: 'Medicine', repair: 'Repair', speech: 'Speech',
  explosives: 'Explosives', energy_weapons: 'Energy Weapons', melee_weapons: 'Melee Weapons',
  big_guns: 'Big Guns', barter: 'Barter',
};

const SKILL_DEFAULTS = {
  'Unarmed': 'str', 'Athletics': 'str', 'Science': 'int', 'Sneak': 'agi',
  'Pilot': 'per', 'Survival': 'end', 'Lockpick': 'per', 'Throwing': 'agi',
  'Small Guns': 'agi', 'Medicine': 'int', 'Repair': 'int', 'Speech': 'cha',
  'Explosives': 'per', 'Energy Weapons': 'per', 'Melee Weapons': 'str',
  'Big Guns': 'end', 'Barter': 'cha',
};

// Plain text — no HTML tags (matching working examples)
const SKILL_DESCRIPTIONS = {
  'Unarmed': "The Unarmed skill covers your ability to fight with your fists.\nIts default S.P.E.C.I.A.L. attribute is Strength but you might also use Agility, or Charisma when threatening or intimidating someone. You use the Unarmed skill to make unarmed attacks in combat.",
  'Athletics': "Athletics describes your ability to apply your physical strength and agility, know your limits, but also how to focus during physical exertion.\nIts default S.P.E.C.I.A.L. attribute is Strength but it can also be used with Agility or Endurance when facing physical adversity. You might use Athletics when trying to push, pull, or lift objects, jump, climb, swim, or run.",
  'Science': "The Science skill covers academic and practical knowledge, but is practically applied in the wasteland through computer coding, robotic programming, and brewing chems.\nIts default S.P.E.C.I.A.L. attribute is Intelligence but you might use it with Perception to observe a test subject, or Charisma to convince people of something using your scientific knowledge. You use Science to hack computers, brew chems, and solve problems with science!",
  'Sneak': "The Sneak skill covers stealthy movement and any physical actions you take not to be noticed.\nIts default S.P.E.C.I.A.L. attribute is Agility but you might use it with Perception to find enemies hiding in ambush, or Intelligence to case a building. You use Sneak to move silently or stay hidden.",
  'Pilot': "The Pilot skill covers your ability to operate vehicles, from buggies and motorcycles, to Vertibirds and tanks.\nIts default S.P.E.C.I.A.L. attribute is Perception but you might use Strength to pull a buggy out of a skid, or Agility to land a Vertibird within a tight landing zone. You use Pilot to drive any ground vehicles, or pilot any flying vehicles.",
  'Survival': "The Survival skill covers all manner of practical bush craft, like hunting, foraging, fishing, building makeshift shelters, and lighting fires.\nIts default S.P.E.C.I.A.L. attribute is Endurance but you might also use it with Perception to figure out how long you have until nightfall, or Charisma to charm animals. You might use Survival to build a base camp, or test your resilience against malnourishment or dehydration.",
  'Lockpick': "The Lockpick skill reflects your knowledge of manipulating physical locks and opening them without a key.\nIts default S.P.E.C.I.A.L. attribute is Perception but could be used with Agility, or Strength if you're trying to force a door open without breaking the lock. You might use Lockpick to break into a safe, or open a locked door.",
  'Throwing': "The Throwing skill describes your ability to effectively make attacks with thrown weapons like javelins, knives, and improvised weapons.\nIts default S.P.E.C.I.A.L. attribute is Agility but you might also use Strength with heavy objects or Perception to judge distance. You use Throwing to make thrown attacks with specific weapons.",
  'Small Guns': "The Small Guns skill describes your ability to effectively use small firearms, such as pistols, rifles, and shotguns.\nIts default S.P.E.C.I.A.L. attribute is Agility but you might use Perception to make a tricky shot, or Strength to handle the recoil of a powerful rifle. You use Small Guns to make ranged attacks with small firearms.",
  'Medicine': "The Medicine skill covers knowledge of medical practices, first aid, and emergency treatment.\nIts default S.P.E.C.I.A.L. attribute is Intelligence but you might use Perception to diagnose a condition, or Agility to perform delicate surgery. You use Medicine to heal injuries, treat illness, and administer chems.",
  'Repair': "The Repair skill covers maintaining, fixing, and modifying equipment and structures.\nIts default S.P.E.C.I.A.L. attribute is Intelligence but you might use Strength for heavy mechanical work, or Perception to spot a fault. You use Repair to fix broken equipment, patch armor, and maintain weapons.",
  'Speech': "The Speech skill covers all forms of social interaction including persuasion, deception, and negotiation.\nIts default S.P.E.C.I.A.L. attribute is Charisma but you might use Intelligence to out-argue someone, or Strength to intimidate. You use Speech to convince, deceive, or negotiate.",
  'Explosives': "The Explosives skill covers placing, disarming, and using explosive devices.\nIts default S.P.E.C.I.A.L. attribute is Perception but you might also use Agility to plant a charge quickly. You use Explosives to throw grenades, set mines, and disarm bombs.",
  'Energy Weapons': "The Energy Weapons skill covers laser, plasma, and other energy-based weapons.\nIts default S.P.E.C.I.A.L. attribute is Perception but you might use Agility for fast targeting. You use Energy Weapons to make ranged attacks with energy-based firearms.",
  'Melee Weapons': "The Melee Weapons skill covers combat with hand-held melee weapons.\nIts default S.P.E.C.I.A.L. attribute is Strength but you might use Agility for speed or Perception to find openings. You use Melee Weapons to attack with swords, knives, and clubs.",
  'Big Guns': "The Big Guns skill covers heavy weapons such as miniguns, missile launchers, and flamers.\nIts default S.P.E.C.I.A.L. attribute is Endurance but you might use Strength to handle recoil. You use Big Guns to operate heavy weapons.",
  'Barter': "The Barter skill covers trade, commerce, and negotiating prices.\nIts default S.P.E.C.I.A.L. attribute is Charisma but you might use Intelligence to assess value. You use Barter to buy, sell, and trade goods.",
};

// --- Build skill items ---

function buildSkillItems(character) {
  const rawSkills = safeParseJson(character.skills, {});
  const rawTagSkills = safeParseJson(character.tag_skills, []);

  // Build lookup: display name → { rank, tag }
  const skillLookup = {};

  if (Array.isArray(rawSkills)) {
    rawSkills.forEach(s => {
      const displayName = SKILL_KEY_MAP[s.key] || s.label || s.key;
      skillLookup[displayName] = { rank: s.rank ?? 0, tag: false };
    });
  } else if (rawSkills && typeof rawSkills === 'object') {
    Object.entries(rawSkills).forEach(([k, v]) => {
      const displayName = SKILL_KEY_MAP[k] || k;
      const rank = typeof v === 'number' ? v : (v?.rank ?? 0);
      skillLookup[displayName] = { rank, tag: false };
    });
  }

  // Apply tag skills
  if (Array.isArray(rawTagSkills)) {
    rawTagSkills.forEach(k => {
      const displayName = SKILL_KEY_MAP[k] || k;
      if (!skillLookup[displayName]) skillLookup[displayName] = { rank: 0, tag: true };
      else skillLookup[displayName].tag = true;
    });
  }

  return Object.entries(SKILL_DEFAULTS).map(([skillName, defaultAttr]) => {
    const appSkill = skillLookup[skillName] || { rank: 0, tag: false };
    const item = makeItemBase(SKILL_IDS[skillName], skillName, 'skill', 'systems/fallout/assets/icons/items/skill.webp');
    item.system = {
      description: SKILL_DESCRIPTIONS[skillName] || '',
      favorite: false,
      source: 'core_rulebook',
      defaultAttribute: defaultAttr,
      summary: '',
      tag: appSkill.tag || false,
      value: appSkill.rank || 0,
    };
    return item;
  });
}

// --- Weapon helpers ---

// Foundry uses integers 0/1 for value fields, NOT booleans
function b(v) { return v ? 1 : 0; }

function parseDamageEffects(effectsStr) {
  const str = (effectsStr || '').toLowerCase();
  const piercingMatch = str.match(/piercing\s*(\d+)/);
  const hasPiercing = !!piercingMatch;
  return {
    arc:          { rank: 0, value: b(str.includes('arc')) },
    breaking:     { rank: 0, value: b(str.includes('breaking')) },
    burst:        { rank: 0, value: b(str.includes('burst')) },
    freeze:       { rank: 0, value: b(str.includes('freeze')) },
    persistent:   { rank: 0, value: b(str.includes('persistent')) },
    piercing_x:   { rank: piercingMatch ? parseInt(piercingMatch[1]) : 1, value: b(hasPiercing) },
    radioactive:  { rank: 0, value: b(str.includes('radioactive')) },
    spread:       { rank: 0, value: b(str.includes('spread')) },
    stun:         { rank: 0, value: b(str.includes('stun')) },
    tranquilize_x:{ rank: 1, value: 0 },
    vicious:      { rank: 0, value: b(str.includes('vicious')) },
  };
}

function parseWeaponQualities(qualStr) {
  const str = (qualStr || '').toLowerCase();
  const recoilMatch = str.match(/recoil\s*\((\d+)\)/);
  const ammoHungryMatch = str.match(/ammo.hungry\s*\((\d+)\)/);
  return {
    accurate:           { rank: 0, value: b(str.includes('accurate') && !str.includes('inaccurate')) },
    aquatic:            { rank: 0, value: 0 },
    ammo_hungry_x:      { rank: ammoHungryMatch ? parseInt(ammoHungryMatch[1]) : 1, value: b(!!ammoHungryMatch) },
    blast:              { rank: 0, value: b(str.includes('blast')) },
    bombard:            { rank: 0, value: 0 },
    close_quarters:     { rank: 0, value: b(str.includes('close quarters')) },
    concealed:          { rank: 0, value: b(str.includes('concealed')) },
    debilitating:       { rank: 0, value: b(str.includes('debilitating')) },
    delay_x:            { rank: 1, value: b(str.includes('delay')) },
    gatling:            { rank: 0, value: b(str.includes('gatling')) },
    fuel_x:             { rank: 1, value: 0 },
    inaccurate:         { rank: 0, value: b(str.includes('inaccurate')) },
    limited:            { rank: 0, value: 0 },
    mine:               { rank: 0, value: b(str.includes('mine')) },
    night_vision:       { rank: 0, value: 0 },
    parry:              { rank: 0, value: b(str.includes('parry')) },
    placed:             { rank: 0, value: b(str.includes('placed')) },
    recoil_x:           { rank: recoilMatch ? parseInt(recoilMatch[1]) : 1, value: b(!!recoilMatch) },
    recon:              { rank: 0, value: 0 },
    reliable:           { rank: 0, value: b(str.includes('reliable') && !str.includes('unreliable')) },
    slow_load:          { rank: 0, value: b(str.includes('slow load')) },
    suppressed:         { rank: 0, value: b(str.includes('suppressed')) },
    surge:              { rank: 0, value: 0 },
    thrown:             { rank: 0, value: b(str.includes('thrown')) },
    two_handed:         { rank: 0, value: b(str.includes('two-handed') || str.includes('two handed')) },
    unreliable:         { rank: 0, value: b(str.includes('unreliable')) },
    unstable_radiation: { rank: 0, value: 0 },
    wrangle:            { rank: 0, value: 0 },
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

// --- Build all embedded items ---

function buildEmbeddedItems(character) {
  const items = buildSkillItems(character);

  // Weapons
  const appWeapons = safeParseJson(character.equipment, []);
  if (Array.isArray(appWeapons)) {
    appWeapons.forEach(w => {
      if (!w || typeof w !== 'object' || w.source === 'starting_equipment') return;
      const isMelee = ['Melee', 'Unarmed'].includes(w.type);
      const damageRating = parseInt((w.damage || '0').toString().replace(/[^0-9]/g, '')) || 0;
      const item = makeItemBase(null, w.name || 'Unknown Weapon', 'weapon', 'systems/fallout/assets/icons/items/weapon.svg');
      item.system = {
        description: w.notes ? `<p>${w.notes}</p>` : '',
        favorite: false,
        source: 'custom',
        cost: w.cost || 0,
        quantity: 1,
        rarity: w.rarity || 0,
        stashed: false,
        weight: parseFloat(w.weight) || 0,
        equippable: true,
        equipped: false,
        canBeScrapped: true,
        isJunk: false,
        ammo: w.ammoType || w.ammo || '',
        ammoPerShot: 1,
        attribute: '',
        condition: '',
        consumedOnUse: false,
        creatureAttribute: 'body',
        creatureSkill: isMelee ? 'melee' : 'guns',
        damage: {
          damageEffect: parseDamageEffects(w.damageEffect || ''),
          damageType: {
            energy: /energy/i.test(w.damageType || ''),
            physical: /physical/i.test(w.damageType || '') || !w.damageType,
            poison: /poison/i.test(w.damageType || ''),
            radiation: /radiation/i.test(w.damageType || ''),
          },
          originalDamageType: { energy: false, physical: false, poison: false, radiation: false },
          originalRating: 0,
          rating: damageRating,
          weaponQuality: parseWeaponQualities(w.qualities || ''),
        },
        fireRate: w.fireRate ?? w.fire_rate ?? 0,
        melee: isMelee,
        mods: { current: 0, installedMods: '', list: '', max: 0, modded: false },
        naturalWeapon: false,
        originalAmmoPerShot: 0,
        quantityRoll: '',
        range: mapRange(w.range),
        skill: '',
        tear: 0,
        weaponType: mapWeaponType(w.type),
      };
      items.push(item);
    });
  }

  // Ammo
  const appAmmo = safeParseJson(character.ammo_inventory, []);
  if (Array.isArray(appAmmo)) {
    appAmmo.forEach(a => {
      if (!a || a.source === 'starting_equipment') return;
      const qty = parseInt(a.quantity) || 0;
      const item = makeItemBase(null, a.type || a.label || a.name || 'Ammo', 'ammo', 'systems/fallout/assets/icons/items/ammo.webp');
      item.system = {
        description: '',
        favorite: false,
        source: 'custom',
        cost: 1,
        quantity: qty,
        rarity: 1,
        stashed: false,
        weight: 0.1,
        charges: { current: qty, max: qty },
        effect: '',
        fusionCore: false,
        shots: { current: qty, max: qty },
        quantityRoll: '',
        multishot: true,
        type: '',
      };
      items.push(item);
    });
  }

  // Apparel / Armor
  const appArmor = safeParseJson(character.armor_equipped, []);
  if (Array.isArray(appArmor)) {
    appArmor.forEach(a => {
      if (!a || typeof a !== 'object') return;
      const locationsRaw = a.locations
        ? (typeof a.locations === 'string' ? a.locations.split(',').map(s => s.trim()) : a.locations)
        : [];
      const hp = a.hp || 0;
      const item = makeItemBase(null, a.name || 'Apparel', 'apparel', 'systems/fallout/assets/icons/items/apparel.svg');
      item.system = {
        description: a.special ? `<p>${a.special}</p>` : '',
        favorite: false,
        source: 'custom',
        cost: parseInt(a.cost) || 0,
        quantity: 1,
        rarity: parseInt(a.rarity) || 0,
        stashed: false,
        weight: parseFloat(a.weight) || 0,
        equippable: true,
        equipped: false,
        canBeScrapped: true,
        isJunk: false,
        apparelType: mapApparelType(a.type || ''),
        health: { max: hp, min: 0, mod: 0, value: hp },
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
  }

  // Perks — stored as array of perk key strings OR perk objects
  const rawPerks = safeParseJson(character.perks, []);
  if (Array.isArray(rawPerks)) {
    rawPerks.forEach(p => {
      // Can be a key string or an object
      const label = typeof p === 'string'
        ? p.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : (p.label || p.name || 'Perk');
      const description = typeof p === 'object' ? (p.description || '') : '';
      const item = makeItemBase(null, label, 'perk', 'systems/fallout/assets/icons/items/perk.webp');
      item.system = {
        description: description ? `<p>${description}</p>` : '',
        favorite: false,
        source: 'core_rulebook',
        rank: { max: 1, value: 1, levelIncrease: 0, levelStart: 1 },
        requirements: '',
        requirementsEx: {
          level: 1,
          levelIncrease: 0,
          attributes: {
            str: { value: 0 }, per: { value: 0 }, end: { value: 0 },
            cha: { value: 0 }, int: { value: 0 }, agi: { value: 0 }, luc: { value: 0 },
          },
        },
      };
      items.push(item);
    });
  }

  // Chems
  const appChems = safeParseJson(character.chems_inventory, []);
  if (Array.isArray(appChems)) {
    appChems.forEach(c => {
      if (!c) return;
      const item = makeItemBase(null, c.label || c.name || 'Consumable', 'consumable', 'systems/fallout/assets/icons/items/consumable.webp');
      item.system = {
        description: c.effect ? `<p>${c.effect}</p>` : '',
        favorite: false,
        source: 'core_rulebook',
        cost: c.cost || 0,
        quantity: c.quantity || 1,
        rarity: c.rarity || 0,
        stashed: false,
        weight: parseFloat(c.weight) || 0.1,
        canBeScrapped: false,
        isJunk: false,
        effect: c.effect || '',
        quantityRoll: '',
        addictive: c.addictive || false,
        addiction: { value: false },
        duration: c.duration || 'lasting',
      };
      items.push(item);
    });
  }

  // Food
  const appFood = safeParseJson(character.food_inventory, []);
  if (Array.isArray(appFood)) {
    appFood.forEach(f => {
      if (!f) return;
      const item = makeItemBase(null, f.label || f.name || 'Food', 'consumable', 'systems/fallout/assets/icons/items/consumable.webp');
      item.system = {
        description: f.effect ? `<p>Heals ${f.hp || 0} HP. ${f.effect}</p>` : `<p>Heals ${f.hp || 0} HP.</p>`,
        favorite: false,
        source: 'core_rulebook',
        cost: f.cost || 0,
        quantity: f.quantity || 1,
        rarity: f.rarity || 0,
        stashed: false,
        weight: parseFloat(f.weight) || 0.5,
        canBeScrapped: false,
        isJunk: false,
        effect: f.effect || '',
        quantityRoll: '',
        addictive: false,
        addiction: { value: false },
        duration: 'instant',
      };
      items.push(item);
    });
  }

  return items;
}

// --- Prototype token ---

function buildPrototypeToken(name, actorType, imgSrc) {
  return {
    name,
    displayName: 20,
    actorLink: true,
    texture: {
      src: imgSrc,
      scaleX: 1,
      scaleY: 1,
      offsetX: 0,
      offsetY: 0,
      rotation: 0,
      tint: null,
    },
    width: 1,
    height: 1,
    lockRotation: false,
    rotation: 0,
    alpha: 1,
    disposition: 1,
    displayBars: 20,
    bar1: { attribute: 'health' },
    bar2: { attribute: null },
    light: {
      alpha: 0.5, angle: 360, bright: 0, color: null,
      coloration: 1, dim: 0, attenuation: 0.5, luminosity: 0.5,
      saturation: 0, contrast: 0, shadows: 0,
      animation: { type: null, speed: 5, intensity: 5, reverse: false },
      darkness: { min: 0, max: 1 },
    },
    sight: {
      enabled: false, range: 0, angle: 360,
      visionMode: 'basic', color: null,
      attenuation: 0.1, brightness: 0, saturation: 0, contrast: 0,
    },
    detectionModes: [],
    hexagonalShape: 0,
    occludable: { radius: 0 },
    ring: {
      enabled: false,
      colors: { ring: null, background: null },
      effect: 0,
      subject: { scale: 1, texture: null },
    },
    flags: {},
    randomImg: false,
  };
}

// --- Body part helper ---

function makeBodyPart() {
  return {
    injuries: [0, 0, 0, 0, 0],
    injuryOpenCount: 0,
    injuryTreatedCount: 0,
    resistance: { energy: 0, physical: 0, poison: 0, radiation: 0 },
    status: 'healthy',
  };
}

// --- Sanitize output ---

function sanitizeForFoundryExport(data) {
  // Ensure required top-level keys
  const required = ['_stats', 'effects', 'flags', 'folder', 'img', 'items', 'name', 'prototypeToken', 'system', 'type', 'ownership'];
  for (const key of required) {
    if (!(key in data)) {
      console.warn(`[FoundryExport] Missing required top-level key: ${key}`);
    }
  }
  if (!Array.isArray(data.effects)) data.effects = [];
  if (!data.flags || typeof data.flags !== 'object') data.flags = {};
  if (!Array.isArray(data.items)) data.items = [];

  // Validate embedded items
  data.items.forEach((item, idx) => {
    const itemRequired = ['_id', 'name', 'type', 'system'];
    for (const key of itemRequired) {
      if (!item[key]) {
        console.warn(`[FoundryExport] Item[${idx}] "${item.name}" missing required field: ${key}`);
      }
    }
    if (!Array.isArray(item.effects)) item.effects = [];
    if (!item.flags || typeof item.flags !== 'object') item.flags = {};
  });

  return data;
}

// --- Main export function ---

export function exportToFoundry(character) {
  const origin = character.origin || '';
  const isRobot = ['Protectron', 'Robobrain', 'Securitron', 'Mister Handy', 'Assaultron'].includes(origin);
  const actorType = isRobot ? 'robot' : 'character';

  const str = parseInt(character.strength) || 5;
  const per = parseInt(character.perception) || 5;
  const end = parseInt(character.endurance) || 5;
  const cha = parseInt(character.charisma) || 5;
  const int_ = parseInt(character.intelligence) || 5;
  const agi = parseInt(character.agility) || 5;
  const luc = parseInt(character.luck) || 5;

  const maxHP = parseInt(character.hp_max) || (end + luc);
  const currentHP = parseInt(character.hp_current) ?? maxHP;
  const carryWeight = 150 + (str * 10);

  // Actor image — character.webp vs robot.webp (matching working examples)
  const actorImg = isRobot
    ? 'systems/fallout/assets/tokens/robot.webp'
    : 'systems/fallout/assets/tokens/character.webp';

  const items = buildEmbeddedItems(character);

  const systemData = {
    biography: character.background || '',
    complication: 20,
    description: '',
    level: {
      currentXP: parseInt(character.xp) || 0,
      nextLevelXP: 0,
      rewardXP: 0,
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
    defense: { bonus: 0, value: 1 },
    health: { bonus: 0, max: maxHP, value: currentHP },
    initiative: { bonus: 0, value: per + agi },
    luckPoints: parseInt(character.luck_points) || luc,
    meleeDamage: { bonus: 0, value: Math.max(0, Math.floor((str - 5) / 2)) },
    radiation: parseInt(character.radiation) || 0,
    resistance: {
      energy: parseInt(character.resistance_energy) || 0,
      physical: parseInt(character.resistance_physical) || 0,
      poison: parseInt(character.resistance_poison) || 0,
      radiation: parseInt(character.resistance_radiation) || 0,
    },
    carryWeight: {
      base: carryWeight,
      encumbranceLevel: 0,
      mod: 0,
      total: carryWeight,
      value: parseInt(character.encumbrance) || 0,
    },
    attributes: {
      agi: { value: agi }, cha: { value: cha }, end: { value: end },
      int: { value: int_ }, luc: { value: luc }, per: { value: per }, str: { value: str },
    },
    skill: { tags: { additionalTags: [], bonus: 0, max: 3 } },
    currency: { caps: parseInt(character.caps) || 0, other: '' },
    materials: { junk: 0, common: 0, rare: 0, uncommon: 0 },
    tinkeredWith: false,
  };

  // Human-only fields
  if (!isRobot) {
    systemData.conditions = {
      alcoholic: character.is_alcoholic || false,
      fatigue: parseInt(character.fatigue) || 0,
      hunger: 0,
      lastChanged: { hunger: 0, sleep: 0, thirst: 0 },
      intoxication: parseInt(character.intoxication) || 0,
      sleep: 0,
      thirst: 0,
      wellRested: character.is_well_rested || false,
      tinkeredWith: false,
    };
    systemData.readMagazines = [];
  }

  const doc = {
    _stats: buildActorStats(),
    effects: [],
    flags: {},
    folder: null,
    img: actorImg,
    items,
    name: character.name || 'Unnamed Character',
    prototypeToken: buildPrototypeToken(character.name || 'Unnamed Character', actorType, actorImg),
    system: systemData,
    type: actorType,
    ownership: { default: 0 },
  };

  return sanitizeForFoundryExport(doc);
}