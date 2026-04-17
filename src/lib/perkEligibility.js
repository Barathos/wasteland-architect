import { getEffectiveSpecialStats, isNightkinCharacter, isRobotCharacter } from "./falloutData";

const SPECIAL_KEY_MAP = {
  STR: "strength",
  PER: "perception",
  END: "endurance",
  CHA: "charisma",
  INT: "intelligence",
  AGI: "agility",
  LCK: "luck",
};

function normalizeRequirementKey(key = "") {
  return SPECIAL_KEY_MAP[key] || String(key || "").toLowerCase();
}

function safeArray(value, fallback = []) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function normalizePerkRequirements(requirements = {}) {
  const out = {};
  for (const [key, value] of Object.entries(requirements || {})) {
    if (key === "level" || key === "note") {
      out[key] = value;
      continue;
    }
    out[normalizeRequirementKey(key)] = value;
  }
  return out;
}

export function getPerkLevelRequirement(perk = {}, nextRank = 1) {
  const req = normalizePerkRequirements(perk.requirements || {});
  const flags = perk.requirementFlags || {};
  const startLevel = Number(req.level || 1);
  const step = Number(flags.levelIncrease || 0);
  return startLevel + Math.max(0, nextRank - 1) * Math.max(0, step);
}

function isGhoulCharacter(character = {}) {
  return String(character.origin || "") === "Ghoul";
}

function isSuperMutantCharacter(character = {}) {
  return String(character.origin || "") === "Super Mutant" || isNightkinCharacter(character);
}

function isRadiationImmuneCharacter(character = {}) {
  return isRobotCharacter(character) || isGhoulCharacter(character) || isSuperMutantCharacter(character);
}

function isHumanCharacter(character = {}) {
  if (isRobotCharacter(character)) return false;
  if (isGhoulCharacter(character)) return false;
  if (isSuperMutantCharacter(character)) return false;
  return true;
}

export function getSelectedPerkRank(selectedPerks = [], perkKey = "") {
  return (Array.isArray(selectedPerks) ? selectedPerks : []).filter((k) => k === perkKey).length;
}

export function evaluatePerkEligibility({
  perk = {},
  character = {},
  selectedPerks = [],
  readMagazines = [],
  currentLevel = null,
} = {}) {
  const level = Number(currentLevel ?? character.level ?? 1);
  const currentRank = getSelectedPerkRank(selectedPerks, perk.key);
  const maxRanks = Number(perk.ranks || perk.maxRanks || 1);
  const nextRank = currentRank + 1;
  const req = normalizePerkRequirements(perk.requirements || {});
  const flags = perk.requirementFlags || {};
  const effectiveSpecial = getEffectiveSpecialStats(character);
  const missing = [];

  if (currentRank >= maxRanks) missing.push({ type: "maxRanks", value: maxRanks });

  const levelRequired = getPerkLevelRequirement(perk, nextRank);
  if (level < levelRequired) missing.push({ type: "level", value: levelRequired });

  for (const [key, value] of Object.entries(req)) {
    if (key === "level" || key === "note") continue;
    const actorValue = Number(effectiveSpecial[key] ?? 5);
    const needed = Number(value || 0);
    if (actorValue < needed) {
      missing.push({ type: "special", key, value: needed });
    }
  }

  if (flags.notRobot && isRobotCharacter(character)) missing.push({ type: "notRobot" });
  if (flags.notGhoul && isGhoulCharacter(character)) missing.push({ type: "notGhoul" });
  if (flags.notSupermutant && isSuperMutantCharacter(character)) missing.push({ type: "notSupermutant" });
  if (flags.notHuman && isHumanCharacter(character)) missing.push({ type: "notHuman" });
  if (flags.notRadiationImmune && isRadiationImmuneCharacter(character)) missing.push({ type: "notRadiationImmune" });
  if (flags.isCompanion && !Boolean(character.is_companion)) missing.push({ type: "isCompanion" });

  const requiredMagazines = Array.isArray(flags.magazineUuids) ? flags.magazineUuids : [];
  const knownMagazines = safeArray(readMagazines, []);
  if (requiredMagazines.length) {
    const missingMagazines = requiredMagazines.filter((uuid) => !knownMagazines.includes(uuid));
    if (missingMagazines.length) {
      missing.push({ type: "magazine", value: missingMagazines.length });
    }
  }

  return {
    eligible: missing.length === 0,
    missing,
    currentRank,
    maxRanks,
    nextRank,
    levelRequired,
    requirement: req,
    requirementFlags: flags,
  };
}

