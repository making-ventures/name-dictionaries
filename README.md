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

### Russian Patronymics

Generated dynamically from male first names. Both list getters and a generator function for ad-hoc names are exported.

- `getRussianMalePatronymics()` - male patronymics derived from all male first names (deduplicated)
- `getRussianFemalePatronymics()` - female patronymics derived from all male first names (deduplicated)
- `getRussianPatronymics()` - Returns `{ male: string[], female: string[] }`
- `generateRussianMalePatronymic(fatherName)` - `"Иван"` → `"Иванович"`
- `generateRussianFemalePatronymic(fatherName)` - `"Иван"` → `"Ивановна"`
- `generateRussianPatronymics(fatherName)` - `{ male, female }` from a single father's name

Rules (covers the vast majority of names):

- Hard consonant ending (`Иван`) → `+ович` / `+овна`
- `-й` ending (`Сергей`) → drop, `+евич` / `+евна`
- Soft `-ь` ending (`Игорь`) → drop, `+евич` / `+евна`
- `-а`/`-я` ending (`Никита`) → drop, `+ич` / `+ична`
- Classic exceptions are handled by lookup: `Илья` → `Ильич`/`Ильинична`, `Лука` → `Лукич`/`Лукинична`, `Кузьма` → `Кузьмич`/`Кузьминична`, `Фома`, `Савва`, etc.

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

## Maintenance notes

### `minimumReleaseAgeExclude` in `pnpm-workspace.yaml`

pnpm refuses to install packages younger than its `minimumReleaseAge` threshold. When a freshly-published version is pinned explicitly (e.g. `@types/node@25.9.0`), pnpm records it under `minimumReleaseAgeExclude` so installs remain reproducible.

This entry is temporary: once the listed version is older than the threshold (typically a week or two after publish), remove the corresponding line and run `pnpm install` to confirm the install still succeeds without it.

## License

MIT
