import * as fs from "fs";
import * as path from "path";

export interface GenderedLists {
  male: string[];
  female: string[];
}

let cachedRussianSurnames: GenderedLists | null = null;
let cachedRussianNames: GenderedLists | null = null;
let cachedEnglishSurnames: string[] | null = null;
let cachedEnglishNames: GenderedLists | null = null;

function getDataPath(filename: string): string {
  // Works both in development (src/) and published (dist/)
  const devPath = path.join(__dirname, "..", "data", filename);
  const distPath = path.join(__dirname, "..", "data", filename);

  if (fs.existsSync(devPath)) {
    return devPath;
  }
  if (fs.existsSync(distPath)) {
    return distPath;
  }
  throw new Error(`Dictionary file not found: ${filename}`);
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

function loadGenderedCsv(
  filename: string,
  includeUnisex: boolean
): GenderedLists {
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
