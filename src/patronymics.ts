/**
 * Russian patronymic generation from a father's male first name.
 *
 * Rules (simplified, cover the vast majority of names):
 *   1. Classic exceptions (Илья → Ильич/Ильинична, Лука → Лукич/Лукинична, …)
 *      are handled by lookup.
 *   2. Name ends in vowel `а` or `я` → drop, add `ич` / `ична`.
 *      (Никита → Никитич/Никитична)
 *   3. Name ends in `й` → drop, add `евич` / `евна`.
 *      (Сергей → Сергеевич/Сергеевна)
 *   4. Name ends in soft sign `ь` → drop, add `евич` / `евна`.
 *      (Игорь → Игоревич/Игоревна)
 *   5. Name ends in `е`, `э`, `и`, `ы`, `о`, `у`, `ю` → add `вич` / `вна`.
 *      (rare/borrowed; e.g. Уго → Уговна)
 *   6. Otherwise (ends in a hard consonant) → add `ович` / `овна`.
 *      (Иван → Иванович/Ивановна)
 */

interface PatronymicPair {
  male: string;
  female: string;
}

const EXCEPTIONS: Readonly<Record<string, PatronymicPair>> = {
  Илья: { male: "Ильич", female: "Ильинична" },
  Лука: { male: "Лукич", female: "Лукинична" },
  Фома: { male: "Фомич", female: "Фоминична" },
  Кузьма: { male: "Кузьмич", female: "Кузьминична" },
  Савва: { male: "Саввич", female: "Саввична" },
  Никита: { male: "Никитич", female: "Никитична" },
  Иона: { male: "Ионович", female: "Ионовна" },
  Сила: { male: "Силич", female: "Силична" },
  Иеремия: { male: "Иеремиевич", female: "Иеремиевна" },
};

const HARD_HUSHING = new Set(["ж", "ш", "щ", "ч", "ц"]);
const NEUTRAL_VOWELS_END = new Set(["е", "э", "и", "ы", "о", "у", "ю"]);

function patronymicSuffixes(name: string): PatronymicPair {
  const last = name.slice(-1);

  // ends in -а or -я
  if (last === "а" || last === "я") {
    const stem = name.slice(0, -1);
    return { male: `${stem}ич`, female: `${stem}ична` };
  }

  // ends in -й
  if (last === "й") {
    const stem = name.slice(0, -1);
    return { male: `${stem}евич`, female: `${stem}евна` };
  }

  // ends in -ь
  if (last === "ь") {
    const stem = name.slice(0, -1);
    return { male: `${stem}евич`, female: `${stem}евна` };
  }

  // ends in a neutral vowel — just append -вич / -вна
  if (NEUTRAL_VOWELS_END.has(last)) {
    return { male: `${name}вич`, female: `${name}вна` };
  }

  // ends in hushing consonant — still -евич/-евна historically, but
  // modern usage prefers -евич/-евна only after soft stems; default to -ович/-овна.
  if (HARD_HUSHING.has(last)) {
    return { male: `${name}евич`, female: `${name}евна` };
  }

  // default: hard consonant → -ович / -овна
  return { male: `${name}ович`, female: `${name}овна` };
}

/**
 * Generate the male patronymic for the given father's name.
 */
export function generateRussianMalePatronymic(fatherName: string): string {
  const exception = EXCEPTIONS[fatherName];
  if (exception) return exception.male;
  return patronymicSuffixes(fatherName).male;
}

/**
 * Generate the female patronymic for the given father's name.
 */
export function generateRussianFemalePatronymic(fatherName: string): string {
  const exception = EXCEPTIONS[fatherName];
  if (exception) return exception.female;
  return patronymicSuffixes(fatherName).female;
}

/**
 * Generate both male and female patronymics from a father's name.
 */
export function generateRussianPatronymics(fatherName: string): PatronymicPair {
  const exception = EXCEPTIONS[fatherName];
  if (exception) return exception;
  return patronymicSuffixes(fatherName);
}
