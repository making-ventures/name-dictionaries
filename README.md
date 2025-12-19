# @mkven/name-dictionaries

Russian and English name dictionaries for data generation.

## Installation

```bash
npm install @mkven/name-dictionaries
# or
pnpm add @mkven/name-dictionaries
```

## Usage

```typescript
import {
  getRussianMaleNames,
  getRussianFemaleNames,
  getRussianMaleSurnames,
  getRussianFemaleSurnames,
  getEnglishMaleNames,
  getEnglishFemaleNames,
  getEnglishSurnames,
} from "@mkven/name-dictionaries";

// Get arrays of names
const maleNames = getRussianMaleNames(); // ["Александр", "Сергей", ...]
const femaleSurnames = getRussianFemaleSurnames(); // ["Иванова", "Кузнецова", ...]

// English names
const englishMaleNames = getEnglishMaleNames(); // ["Jacob", "Michael", ...]
const englishSurnames = getEnglishSurnames(); // ["Smith", "Jones", ...]
```

## Available Functions

### Russian Names

- `getRussianMaleNames()` - 3,357 male first names
- `getRussianFemaleNames()` - 1,434 female first names
- `getRussianNames()` - Returns `{ male: string[], female: string[] }`

### Russian Surnames

- `getRussianMaleSurnames()` - 34,804 male surnames (23,972 + 10,832 unisex)
- `getRussianFemaleSurnames()` - 24,358 female surnames (13,526 + 10,832 unisex)
- `getRussianSurnames()` - Returns `{ male: string[], female: string[] }`

### English Names

- `getEnglishMaleNames()` - ~10,000 male first names
- `getEnglishFemaleNames()` - ~10,000 female first names
- `getEnglishNames()` - Returns `{ male: string[], female: string[] }`

### English Surnames

- `getEnglishSurnames()` - 14,674 surnames (no gender distinction)

## Data Sources

- Russian names: [ngodata.ru](https://ngodata.ru/dataset/russiannames)
- English names: US Baby Names 2000s
- English surnames: England & Wales surnames

## License

MIT
