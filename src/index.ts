import * as fs from "node:fs";
import * as path from "node:path";

import { generateRussianPatronymics } from "./patronymics.js";

export {
  generateRussianFemalePatronymic,
  generateRussianMalePatronymic,
  generateRussianPatronymics,
} from "./patronymics.js";

export interface GenderedLists {
  male: string[];
  female: string[];
}

let cachedRussianSurnames: GenderedLists | null = null;
let cachedRussianNames: GenderedLists | null = null;
let cachedEnglishSurnames: string[] | null = null;
let cachedEnglishNames: GenderedLists | null = null;
let cachedRussianPatronymics: GenderedLists | null = null;

function getDataPath(filename: string): string {
  // Works both in development (src/) and published (dist/) because
  // `data/` sits one level above both folders.
  const dataPath = path.join(__dirname, "..", "data", filename);
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Dictionary file not found: ${filename}`);
  }
  return dataPath;
}

function loadCsvList(filename: string): string[] {
  const filePath = getDataPath(filename);
  const names: string[] = [];
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  // Skip header (Name,Frequency)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (line) {
      const name = line.split(",")[0];
      if (name) {
        names.push(name);
      }
    }
  }

  return names;
}

function loadGenderedCsv(filename: string, includeUnisex: boolean): GenderedLists {
  const filePath = getDataPath(filename);
  const male: string[] = [];
  const female: string[] = [];

  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  // Skip header (Name,Frequency,Gender)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (line) {
      const parts = line.split(",");
      const name = parts[0];
      const gender = parts[2];
      if (name && gender === "m") {
        male.push(name);
      } else if (name && gender === "f") {
        female.push(name);
      } else if (name && includeUnisex && gender === "u") {
        male.push(name);
        female.push(name);
      }
    }
  }

  return { male, female };
}

// Russian surnames
function getRussianSurnamesInternal(): GenderedLists {
  cachedRussianSurnames ??= loadGenderedCsv("russian_surnames.csv", true);
  return cachedRussianSurnames;
}

export function getRussianMaleSurnames(): string[] {
  return getRussianSurnamesInternal().male;
}

export function getRussianFemaleSurnames(): string[] {
  return getRussianSurnamesInternal().female;
}

export function getRussianSurnames(): GenderedLists {
  return getRussianSurnamesInternal();
}

// Russian names
function getRussianNamesInternal(): GenderedLists {
  cachedRussianNames ??= loadGenderedCsv("russian_names.csv", false);
  return cachedRussianNames;
}

export function getRussianMaleNames(): string[] {
  return getRussianNamesInternal().male;
}

export function getRussianFemaleNames(): string[] {
  return getRussianNamesInternal().female;
}

export function getRussianNames(): GenderedLists {
  return getRussianNamesInternal();
}

// Russian patronymics (generated from male first names)
function getRussianPatronymicsInternal(): GenderedLists {
  if (cachedRussianPatronymics === null) {
    const fathers = getRussianMaleNames();
    const male = new Set<string>();
    const female = new Set<string>();
    for (const father of fathers) {
      const pair = generateRussianPatronymics(father);
      male.add(pair.male);
      female.add(pair.female);
    }
    cachedRussianPatronymics = {
      male: [...male],
      female: [...female],
    };
  }
  return cachedRussianPatronymics;
}

export function getRussianMalePatronymics(): string[] {
  return getRussianPatronymicsInternal().male;
}

export function getRussianFemalePatronymics(): string[] {
  return getRussianPatronymicsInternal().female;
}

export function getRussianPatronymics(): GenderedLists {
  return getRussianPatronymicsInternal();
}

// English surnames
export function getEnglishSurnames(): string[] {
  cachedEnglishSurnames ??= loadCsvList("english_surnames.csv");
  return cachedEnglishSurnames;
}

// English names
function getEnglishNamesInternal(): GenderedLists {
  cachedEnglishNames ??= loadGenderedCsv("english_names.csv", false);
  return cachedEnglishNames;
}

export function getEnglishMaleNames(): string[] {
  return getEnglishNamesInternal().male;
}

export function getEnglishFemaleNames(): string[] {
  return getEnglishNamesInternal().female;
}

export function getEnglishNames(): GenderedLists {
  return getEnglishNamesInternal();
}
