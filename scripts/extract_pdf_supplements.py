import json
import re
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
REF = ROOT / "Reference"
OUT = ROOT / "src" / "lib" / "pdfSupplementData.generated.js"

PDF_SOURCE_MAP = {
    "fallout core rulebook.pdf": "Core Rulebook PDF",
    "settlers supplement.pdf": "Settlers PDF",
    "wanderer's guide book.pdf": "Wanderers PDF",
    "falloutstarterset_adventure_booklet-20220228.pdf": "Starter Set PDF",
}


def source_label(pdf_name: str) -> str:
    return PDF_SOURCE_MAP.get(pdf_name.lower(), pdf_name)


def norm_header(value):
    return re.sub(r"\s+", " ", (value or "").strip().lower())


def to_float(value, default=0.0):
    if value is None:
        return default
    s = str(value).strip()
    if not s:
        return default
    s = s.replace(",", "")
    if s.startswith("<"):
        return 0.5
    m = re.search(r"-?\d+(?:\.\d+)?", s)
    return float(m.group(0)) if m else default


def to_int(value, default=0):
    return int(round(to_float(value, default)))


def clean_text(value):
    if value is None:
        return ""
    s = str(value)
    s = s.replace("\n", " ")
    s = re.sub(r"\s+", " ", s)
    return s.strip().strip("-").strip()


def slug(text):
    s = re.sub(r"[^a-z0-9]+", "_", clean_text(text).lower()).strip("_")
    return s or "item"


def uniq_by_label(rows):
    seen = set()
    out = []
    for row in rows:
        key = clean_text(row.get("label", "")).lower()
        if not key or key in seen:
            continue
        seen.add(key)
        out.append(row)
    return out


def is_blankish_row(row):
    return all(not clean_text(c) for c in row)


def is_section_row(row):
    cells = [clean_text(c) for c in row if clean_text(c)]
    if not cells:
        return True
    if len(cells) == 1 and cells[0].upper() == cells[0] and len(cells[0]) > 2:
        return True
    return False


def map_range(r):
    v = clean_text(r).lower()
    if v in {"c", "close"}:
        return "Close"
    if v in {"m", "medium"}:
        return "Medium"
    if v in {"l", "long"}:
        return "Long"
    if v in {"e", "extreme"}:
        return "Extreme"
    if v in {"thrown"}:
        return "Thrown"
    return clean_text(r).title() if clean_text(r) else "Close"


def infer_armor_set(name):
    n = name.lower()
    if n.startswith("t-45"):
        return "T-45"
    if n.startswith("t-51"):
        return "T-51"
    if n.startswith("t-60"):
        return "T-60"
    if n.startswith("x-01"):
        return "X-01"
    if n.startswith("raider") and "power" in n:
        return "Raider Power"
    if n.startswith("raider"):
        return "Raider"
    if "leather" in n:
        return "Leather"
    if "metal" in n:
        return "Metal"
    if "combat" in n:
        return "Combat"
    if "synth" in n:
        return "Synth"
    if "vault-tec security" in n:
        return "Vault-Tec Security"
    if "power" in n:
        return "Power Armor"
    if "helmet" in n or "hat" in n or "mask" in n:
        return "Headgear"
    if "outfit" in n:
        return "Outfit"
    if "uniform" in n or "clothing" in n:
        return "Clothing"
    return clean_text(name).split(" ")[0].title()


def infer_apparel_type(name, is_power=False):
    n = name.lower()
    if is_power or "power" in n:
        return "Power Armor"
    if "helmet" in n or "hat" in n or "mask" in n:
        return "Headgear"
    if "uniform" in n or "clothing" in n:
        return "Clothing"
    if "outfit" in n:
        return "Outfit"
    return "Armor"


def parse_weapons_table(table, src):
    header = [norm_header(c) for c in table[0]]
    col = {h: i for i, h in enumerate(header) if h}

    idx_name = col.get("name")
    if idx_name is None:
        for h, i in col.items():
            if "weapon" in h or "gun" in h:
                idx_name = i
                break
    idx_type = col.get("weapon type")
    idx_damage = col.get("damage rating")
    idx_effect = col.get("damage effects")
    idx_dtype = col.get("damage type")
    idx_rate = col.get("fire rate")
    idx_range = col.get("range")
    idx_qualities = col.get("qualities")
    idx_weight = col.get("weight")
    idx_cost = col.get("cost")
    idx_rarity = col.get("rarity")

    out = []
    for row in table[1:]:
        if is_blankish_row(row) or is_section_row(row):
            continue
        name = clean_text(row[idx_name]) if idx_name is not None and idx_name < len(row) else ""
        if not name:
            continue
        damage = clean_text(row[idx_damage]) if idx_damage is not None and idx_damage < len(row) else ""
        if not damage:
            continue
        out.append(
            {
                "key": slug(f"{name}_{src}"),
                "label": name,
                "type": clean_text(row[idx_type]).replace("\n", " ").title() if idx_type is not None and idx_type < len(row) else "Weapon",
                "damage": damage,
                "damageEffect": clean_text(row[idx_effect]) if idx_effect is not None and idx_effect < len(row) else "-",
                "damageType": clean_text(row[idx_dtype]).title() if idx_dtype is not None and idx_dtype < len(row) else "Physical",
                "fireRate": to_int(row[idx_rate], 0) if idx_rate is not None and idx_rate < len(row) else 0,
                "range": map_range(row[idx_range]) if idx_range is not None and idx_range < len(row) else "Close",
                "qualities": clean_text(row[idx_qualities]) if idx_qualities is not None and idx_qualities < len(row) else "-",
                "weight": to_float(row[idx_weight], 0) if idx_weight is not None and idx_weight < len(row) else 0,
                "cost": to_int(row[idx_cost], 0) if idx_cost is not None and idx_cost < len(row) else 0,
                "rarity": to_int(row[idx_rarity], 0) if idx_rarity is not None and idx_rarity < len(row) else 0,
                "ammo": "",
                "source": src,
                "note": "",
            }
        )
    return out


def parse_armor_table(table, src):
    header = [norm_header(c) for c in table[0]]
    start_idx = 1
    if len(table) > 1 and any(norm_header(c) == "physical" for c in table[1]):
        start_idx = 2

    idx_name = 0
    idx_phys = 1
    idx_energy = 2
    idx_rad = 3

    idx_loc = None
    idx_weight = None
    idx_cost = None
    idx_rarity = None
    idx_hp = None
    for i, h in enumerate(header):
        if "location" in h:
            idx_loc = i
        elif h == "weight":
            idx_weight = i
        elif h == "cost":
            idx_cost = i
        elif h == "rarity":
            idx_rarity = i
        elif "health" in h:
            idx_hp = i

    out = []
    for row in table[start_idx:]:
        if is_blankish_row(row) or is_section_row(row):
            continue
        name = clean_text(row[idx_name]) if idx_name < len(row) else ""
        if not name:
            continue
        phys = to_int(row[idx_phys], 0) if idx_phys < len(row) else 0
        ener = to_int(row[idx_energy], 0) if idx_energy < len(row) else 0
        rad = to_int(row[idx_rad], 0) if idx_rad < len(row) else 0
        if phys == ener == rad == 0 and not (idx_hp is not None and idx_hp < len(row) and clean_text(row[idx_hp])):
            continue

        loc_text = clean_text(row[idx_loc]) if idx_loc is not None and idx_loc < len(row) else ""
        locations = [x.strip().title() for x in re.split(r",|/", loc_text) if x.strip()] if loc_text else []
        is_power = "power" in name.lower() or (idx_hp is not None and idx_hp < len(row) and clean_text(row[idx_hp]) != "")

        out.append(
            {
                "key": slug(f"{name}_{src}"),
                "label": name,
                "set": infer_armor_set(name),
                "type": infer_apparel_type(name, is_power=is_power),
                "physRes": phys,
                "enerRes": ener,
                "radRes": rad,
                "hp": to_int(row[idx_hp], 0) if idx_hp is not None and idx_hp < len(row) else 0,
                "locations": locations,
                "weight": to_float(row[idx_weight], 0) if idx_weight is not None and idx_weight < len(row) else 0,
                "cost": to_int(row[idx_cost], 0) if idx_cost is not None and idx_cost < len(row) else 0,
                "rarity": to_int(row[idx_rarity], 0) if idx_rarity is not None and idx_rarity < len(row) else 0,
                "special": "",
                "source": src,
            }
        )
    return out


def parse_chems_table(table, src):
    out = []
    for row in table[1:]:
        if is_blankish_row(row) or is_section_row(row):
            continue
        name = clean_text(row[0]) if len(row) > 0 else ""
        if not name:
            continue
        out.append(
            {
                "key": slug(f"{name}_{src}"),
                "label": name,
                "effect": clean_text(row[1]) if len(row) > 1 else "-",
                "duration": clean_text(row[2]).title() if len(row) > 2 and clean_text(row[2]) else "Lasting",
                "addictive": clean_text(row[3]).lower().startswith("y") if len(row) > 3 else False,
                "addictionNumber": 0,
                "addictionEffect": "",
                "weight": to_float(row[4], 0.5) if len(row) > 4 else 0.5,
                "cost": to_int(row[5], 0) if len(row) > 5 else 0,
                "rarity": to_int(row[6], 0) if len(row) > 6 else 0,
                "source": src,
            }
        )
    return out


def parse_food_table(table, src):
    out = []
    for row in table[1:]:
        if is_blankish_row(row) or is_section_row(row):
            continue
        name = clean_text(row[0]) if len(row) > 0 else ""
        if not name:
            continue
        out.append(
            {
                "key": slug(f"{name}_{src}"),
                "label": name,
                "hp": to_int(row[1], 0) if len(row) > 1 else 0,
                "effect": clean_text(row[2]) if len(row) > 2 else "-",
                "irradiated": clean_text(row[3]).lower().startswith("y") if len(row) > 3 else False,
                "weight": to_float(row[4], 0.5) if len(row) > 4 else 0.5,
                "cost": to_int(row[5], 0) if len(row) > 5 else 0,
                "rarity": to_int(row[6], 0) if len(row) > 6 else 0,
                "source": src,
            }
        )
    return out


def parse_other_item_table(table, src):
    out = []
    for row in table[1:]:
        if is_blankish_row(row) or is_section_row(row):
            continue
        name = clean_text(row[0]) if len(row) > 0 else ""
        if not name:
            continue
        out.append(
            {
                "key": slug(f"{name}_{src}"),
                "label": name,
                "effect": clean_text(row[1]) if len(row) > 1 else "-",
                "note": "",
                "weight": to_float(row[2], 0.5) if len(row) > 2 else 0.5,
                "cost": to_int(row[3], 0) if len(row) > 3 else 0,
                "rarity": to_int(row[4], 0) if len(row) > 4 else 0,
                "source": src,
            }
        )
    return out


def parse_ammo_table(table, src):
    out = []
    for row in table[1:]:
        if is_blankish_row(row) or is_section_row(row):
            continue
        name = clean_text(row[0]) if len(row) > 0 else ""
        if not name:
            continue
        out.append(
            {
                "key": slug(f"{name}_{src}"),
                "label": name,
                "weight": to_float(row[2], 0.1) if len(row) > 2 else 0.1,
                "cost": to_int(row[3], 0) if len(row) > 3 else 0,
                "rarity": to_int(row[4], 0) if len(row) > 4 else 0,
                "effect": "",
                "source": src,
            }
        )
    return out


def parse_all():
    weapons = []
    armor_all = []
    chems = []
    foods = []
    others = []
    ammo = []
    perk_candidates = []

    for pdf in sorted(REF.glob("*.pdf")):
        src = source_label(pdf.name)
        with pdfplumber.open(pdf) as doc:
            for page in doc.pages:
                for table in page.extract_tables() or []:
                    if not table or not table[0]:
                        continue
                    header = [norm_header(c) for c in table[0]]
                    htxt = " | ".join(header)

                    if "weapon type" in htxt and "damage rating" in htxt:
                        weapons.extend(parse_weapons_table(table, src))
                        continue

                    if "damage resistances" in htxt and "locations covered" in htxt:
                        armor_all.extend(parse_armor_table(table, src))
                        continue

                    if htxt.startswith("item | effects | duration") and "addictive" in htxt:
                        chems.extend(parse_chems_table(table, src))
                        continue

                    if htxt.startswith("item | hp healed"):
                        foods.extend(parse_food_table(table, src))
                        continue

                    if htxt.startswith("item | effects | weight | cost | rarity"):
                        others.extend(parse_other_item_table(table, src))
                        continue

                    if htxt.startswith("ammunition type | quantity found"):
                        ammo.extend(parse_ammo_table(table, src))
                        continue

                    if "requirements" in htxt and ("perk" in htxt or "rank" in htxt):
                        for row in table[1:]:
                            if is_blankish_row(row) or is_section_row(row):
                                continue
                            name = clean_text(row[0]) if len(row) > 0 else ""
                            if name:
                                perk_candidates.append(
                                    {
                                        "key": slug(f"{name}_{src}"),
                                        "label": name,
                                        "ranks": 1,
                                        "requirements": {"level": 1},
                                        "source": src,
                                        "description": "",
                                    }
                                )

    apparel = []
    armor = []
    power = []
    for row in armor_all:
        t = row.get("type", "")
        if t in {"Headgear", "Clothing", "Outfit"}:
            apparel.append(row)
        elif t == "Power Armor" or "power" in row.get("set", "").lower():
            power.append(row)
        else:
            armor.append(row)

    weapons = uniq_by_label(weapons)
    ammo = uniq_by_label(ammo)
    apparel = uniq_by_label(apparel)
    armor = uniq_by_label(armor)
    power = uniq_by_label(power)
    foods = uniq_by_label(foods)
    chems = uniq_by_label(chems)
    others = uniq_by_label(others)
    perk_candidates = uniq_by_label(perk_candidates)

    return {
        "PDF_WEAPONS": weapons,
        "PDF_AMMO": ammo,
        "PDF_APPAREL": apparel,
        "PDF_ARMOR": armor,
        "PDF_POWER_ARMOR": power,
        "PDF_FOOD": foods,
        "PDF_CHEMS": chems,
        "PDF_OTHER_CONSUMABLES": others,
        "PDF_PERK_CANDIDATES": perk_candidates,
    }


def write_js(payload):
    lines = [
        "// AUTO-GENERATED FILE. DO NOT EDIT BY HAND.",
        "// Generated from table extraction across all PDFs in ./Reference.",
        "",
    ]
    for key, value in payload.items():
        lines.append(f"export const {key} = {json.dumps(value, indent=2, ensure_ascii=False)};")
        lines.append("")
    OUT.write_text("\n".join(lines), encoding="utf-8")


def main():
    payload = parse_all()
    write_js(payload)
    print("Generated", OUT)
    for k, v in payload.items():
        print(f"- {k}: {len(v)}")


if __name__ == "__main__":
    main()
