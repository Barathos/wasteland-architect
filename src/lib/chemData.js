export const CHEMS = [
  { id: "berry_mentats", name: "Berry Mentats", duration: "lasting", addictive: true, addictionRating: 2, summary: "Reduce INT test difficulty by 2", effects: [{ type: "difficulty_reduction", stat: "INT", value: 2 }] },
  { id: "buffjet", name: "Buffjet", duration: "brief", addictive: true, addictionRating: 1, summary: "Gain 3 AP immediately; extra actions cost 1 less AP", effects: [{ type: "ap_gain_immediate", value: 3 }, { type: "extra_action_ap_cost_reduction", value: 1 }] },
  { id: "buffout", name: "Buffout", duration: "lasting", addictive: true, addictionRating: 2, summary: "Re-roll 1d20 on STR and END tests; +3 Max HP", effects: [{ type: "reroll", stat: "STR", value: 1 }, { type: "reroll", stat: "END", value: 1 }, { type: "max_hp", value: 3 }] },
  { id: "bufftats", name: "Bufftats", duration: "lasting", addictive: true, addictionRating: 1, summary: "Reduce STR, PER, and END difficulty by 1; +4 Max HP", effects: [{ type: "difficulty_reduction", stat: "STR", value: 1 }, { type: "difficulty_reduction", stat: "PER", value: 1 }, { type: "difficulty_reduction", stat: "END", value: 1 }, { type: "max_hp", value: 4 }] },
  { id: "calmex", name: "Calmex", duration: "lasting", addictive: true, addictionRating: 1, summary: "Re-roll 1d20 on PER and AGI tests; +2 CD sneak attack damage", effects: [{ type: "reroll", stat: "PER", value: 1 }, { type: "reroll", stat: "AGI", value: 1 }, { type: "sneak_attack_bonus_cd", value: 2 }] },
  { id: "daddy_o", name: "Daddy-O", duration: "lasting", addictive: true, addictionRating: 1, summary: "Reduce PER and INT difficulty by 1; increase CHA difficulty by 1", effects: [{ type: "difficulty_reduction", stat: "PER", value: 1 }, { type: "difficulty_reduction", stat: "INT", value: 1 }, { type: "difficulty_increase", stat: "CHA", value: 1 }] },
  { id: "day_tripper", name: "Day Tripper", duration: "lasting", addictive: true, addictionRating: 1, summary: "Reduce CHA and LCK difficulty by 1; increase STR difficulty by 1", effects: [{ type: "difficulty_reduction", stat: "CHA", value: 1 }, { type: "difficulty_reduction", stat: "LCK", value: 1 }, { type: "difficulty_increase", stat: "STR", value: 1 }] },
  { id: "fury", name: "Fury", duration: "lasting", addictive: true, addictionRating: 2, summary: "+3 Physical DR; +3 CD melee damage; +2 difficulty to PER tests", effects: [{ type: "physical_dr", value: 3 }, { type: "damage_bonus_melee", value: 3 }, { type: "difficulty_increase", stat: "PER", value: 2 }] },
  { id: "grape_mentats", name: "Grape Mentats", duration: "lasting", addictive: true, addictionRating: 1, summary: "Reduce CHA difficulty by 2; re-roll 1d20 on Barter tests", effects: [{ type: "difficulty_reduction", stat: "CHA", value: 2 }, { type: "skill_reroll", skill: "Barter", value: 1 }] },
  { id: "healing_salve", name: "Healing Salve", duration: "instant", addictive: false, addictionRating: null, summary: "Heal 2 HP", effects: [{ type: "heal_hp", value: 2 }] },
  { id: "jet", name: "Jet", duration: "brief", addictive: true, addictionRating: 2, summary: "Extra actions cost 1 less AP", effects: [{ type: "extra_action_ap_cost_reduction", value: 1 }] },
  { id: "jet_fuel", name: "Jet Fuel", duration: "lasting", addictive: true, addictionRating: 1, summary: "Gain 1 AP at the start of each turn", effects: [{ type: "ap_gain_each_turn", value: 1 }] },
  { id: "med_x", name: "Med-X", duration: "lasting", addictive: true, addictionRating: 2, summary: "+3 Physical DR", effects: [{ type: "physical_dr", value: 3 }] },
  { id: "mentats", name: "Mentats", duration: "lasting", addictive: true, addictionRating: 1, summary: "Re-roll 1d20 on PER and INT tests", effects: [{ type: "reroll", stat: "PER", value: 1 }, { type: "reroll", stat: "INT", value: 1 }] },
  { id: "orange_mentats", name: "Orange Mentats", duration: "lasting", addictive: true, addictionRating: 1, summary: "Reduce PER difficulty by 2; Aim grants one additional d20 re-roll", effects: [{ type: "difficulty_reduction", stat: "PER", value: 2 }, { type: "aim_extra_reroll", value: 1 }] },
  { id: "overdrive", name: "Overdrive", duration: "lasting", addictive: true, addictionRating: 2, summary: "+3 CD damage to all attacks; may re-roll up to 3 CD per damage roll", effects: [{ type: "damage_bonus_all", value: 3 }, { type: "reroll_damage_cd", value: 3 }] },
  { id: "psycho", name: "Psycho", duration: "lasting", addictive: false, addictionRating: null, summary: "+2 CD damage to all attacks; +3 Physical DR", effects: [{ type: "damage_bonus_all", value: 2 }, { type: "physical_dr", value: 3 }] },
  { id: "psycho_jet", name: "Psycho Jet", duration: "brief", addictive: false, addictionRating: null, summary: "+2 CD damage to all attacks; +4 Physical DR; gain 4 AP immediately", effects: [{ type: "damage_bonus_all", value: 2 }, { type: "physical_dr", value: 4 }, { type: "ap_gain_immediate", value: 4 }] },
  { id: "psychobuff", name: "Psychobuff", duration: "lasting", addictive: false, addictionRating: null, summary: "+2 CD damage to all attacks; +4 Max HP; reduce STR and END difficulty by 1", effects: [{ type: "damage_bonus_all", value: 2 }, { type: "max_hp", value: 4 }, { type: "difficulty_reduction", stat: "STR", value: 1 }, { type: "difficulty_reduction", stat: "END", value: 1 }] },
  { id: "psychotats", name: "Psychotats", duration: "lasting", addictive: false, addictionRating: null, summary: "+2 CD damage to all attacks; +2 Physical DR; reduce PER difficulty by 1", effects: [{ type: "damage_bonus_all", value: 2 }, { type: "physical_dr", value: 2 }, { type: "difficulty_reduction", stat: "PER", value: 1 }] },
  { id: "rad_x", name: "Rad-X", duration: "lasting", addictive: false, addictionRating: null, summary: "+6 Radiation DR", effects: [{ type: "radiation_dr", value: 6 }] },
  { id: "rad_x_diluted", name: "Rad-X (Diluted)", duration: "lasting", addictive: false, addictionRating: null, summary: "+3 Radiation DR", effects: [{ type: "radiation_dr", value: 3 }] },
  { id: "radaway", name: "RadAway", duration: "instant", addictive: false, addictionRating: null, summary: "Heal 4 Radiation damage", effects: [{ type: "heal_radiation", value: 4 }] },
  { id: "radaway_diluted", name: "RadAway (Diluted)", duration: "instant", addictive: false, addictionRating: null, summary: "Heal 2 Radiation damage", effects: [{ type: "heal_radiation", value: 2 }] },
  { id: "skeeto_spit", name: "Skeeto Spit", duration: "lasting", addictive: false, addictionRating: null, summary: "+2 Max HP", effects: [{ type: "max_hp", value: 2 }] },
  { id: "stimpak", name: "Stimpak", duration: "instant", addictive: false, addictionRating: null, summary: "Heal 4 HP or treat 1 Injury", effects: [{ type: "heal_hp", value: 4 }, { type: "treat_injury", value: 1 }] },
  { id: "stimpak_diluted", name: "Stimpak (Diluted)", duration: "instant", addictive: false, addictionRating: null, summary: "Heal 2 HP or treat 1 Injury", effects: [{ type: "heal_hp", value: 2 }, { type: "treat_injury", value: 1 }] },
  { id: "super_stimpak", name: "Super Stimpak", duration: "instant", addictive: false, addictionRating: null, summary: "Heal 8 HP or treat up to 2 Injuries", effects: [{ type: "heal_hp", value: 8 }, { type: "treat_injury", value: 2 }] },
  { id: "stimpak_diffuser", name: "Stimpak Diffuser", duration: "instant", addictive: false, addictionRating: null, summary: "Heal 4 HP to all within Close range", effects: [{ type: "heal_group_close", value: 4 }] },
  { id: "ultra_jet", name: "Ultra Jet", duration: "brief", addictive: true, addictionRating: 3, summary: "Gain 6 AP immediately; extra actions cost 1 less AP", effects: [{ type: "ap_gain_immediate", value: 6 }, { type: "extra_action_ap_cost_reduction", value: 1 }] },
  { id: "x_cell", name: "X-Cell", duration: "lasting", addictive: true, addictionRating: 1, summary: "First d20 bought on all tests is free", effects: [{ type: "first_bought_d20_free", value: 1 }] },
];

export function getChemModifiers(chems = []) {
  return chems.reduce((acc, chem) => {
    if (!Array.isArray(chem.effects)) return acc;
    chem.effects.forEach(effect => {
      switch (effect.type) {
        case "physical_dr":      acc.physicalDR += effect.value || 0; break;
        case "radiation_dr":     acc.radiationDR += effect.value || 0; break;
        case "max_hp":           acc.maxHP += effect.value || 0; break;
        case "damage_bonus_all": acc.damageBonusAll += effect.value || 0; break;
        case "damage_bonus_melee": acc.damageBonusMelee += effect.value || 0; break;
        default: break;
      }
    });
    return acc;
  }, { physicalDR: 0, radiationDR: 0, maxHP: 0, damageBonusAll: 0, damageBonusMelee: 0 });
}