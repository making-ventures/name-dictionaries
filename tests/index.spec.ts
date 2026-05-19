import { describe, expect, it } from "vitest";
import {
  generateRussianFemalePatronymic,
  generateRussianMalePatronymic,
  generateRussianPatronymics,
  getEnglishFemaleNames,
  getEnglishMaleNames,
  getEnglishNames,
  getEnglishSurnames,
  getRussianFemaleNames,
  getRussianFemalePatronymics,
  getRussianFemaleSurnames,
  getRussianMaleNames,
  getRussianMalePatronymics,
  getRussianMaleSurnames,
  getRussianNames,
  getRussianPatronymics,
  getRussianSurnames,
} from "../src/index.js";

describe("Russian names", () => {
  it("returns non-empty male and female first names", () => {
    const male = getRussianMaleNames();
    const female = getRussianFemaleNames();
    expect(male.length).toBeGreaterThan(100);
    expect(female.length).toBeGreaterThan(100);
    expect(male).toContain("Александр");
    expect(female).toContain("Анна");
  });

  it("getRussianNames returns gendered lists", () => {
    const all = getRussianNames();
    expect(all.male.length).toBeGreaterThan(0);
    expect(all.female.length).toBeGreaterThan(0);
  });
});

describe("Russian surnames", () => {
  it("returns non-empty male and female surnames with unisex in both", () => {
    const male = getRussianMaleSurnames();
    const female = getRussianFemaleSurnames();
    expect(male.length).toBeGreaterThan(1000);
    expect(female.length).toBeGreaterThan(1000);
    expect(male).toContain("Иванов");
  });

  it("getRussianSurnames returns gendered lists", () => {
    const all = getRussianSurnames();
    expect(all.male.length).toBeGreaterThan(0);
    expect(all.female.length).toBeGreaterThan(0);
  });
});

describe("English names", () => {
  it("returns non-empty male and female first names", () => {
    const male = getEnglishMaleNames();
    const female = getEnglishFemaleNames();
    expect(male.length).toBeGreaterThan(100);
    expect(female.length).toBeGreaterThan(100);
  });

  it("getEnglishNames returns gendered lists", () => {
    const all = getEnglishNames();
    expect(all.male.length).toBeGreaterThan(0);
    expect(all.female.length).toBeGreaterThan(0);
  });
});

describe("English surnames", () => {
  it("returns non-empty surnames", () => {
    const surnames = getEnglishSurnames();
    expect(surnames.length).toBeGreaterThan(1000);
  });
});

describe("caching", () => {
  it("returns the same array reference on repeated calls", () => {
    expect(getRussianMaleNames()).toBe(getRussianMaleNames());
    expect(getEnglishSurnames()).toBe(getEnglishSurnames());
  });
});

describe("Russian patronymics — generator rules", () => {
  it("handles hard-consonant endings (-ович / -овна)", () => {
    expect(generateRussianMalePatronymic("Иван")).toBe("Иванович");
    expect(generateRussianFemalePatronymic("Иван")).toBe("Ивановна");
    expect(generateRussianMalePatronymic("Александр")).toBe("Александрович");
    expect(generateRussianFemalePatronymic("Владимир")).toBe("Владимировна");
  });

  it("handles -й endings (-евич / -евна)", () => {
    expect(generateRussianMalePatronymic("Сергей")).toBe("Сергеевич");
    expect(generateRussianFemalePatronymic("Сергей")).toBe("Сергеевна");
    expect(generateRussianMalePatronymic("Андрей")).toBe("Андреевич");
    expect(generateRussianMalePatronymic("Николай")).toBe("Николаевич");
  });

  it("handles soft -ь endings (-евич / -евна)", () => {
    expect(generateRussianMalePatronymic("Игорь")).toBe("Игоревич");
    expect(generateRussianFemalePatronymic("Игорь")).toBe("Игоревна");
  });

  it("handles classic exceptions", () => {
    expect(generateRussianMalePatronymic("Илья")).toBe("Ильич");
    expect(generateRussianFemalePatronymic("Илья")).toBe("Ильинична");
    expect(generateRussianMalePatronymic("Лука")).toBe("Лукич");
    expect(generateRussianFemalePatronymic("Кузьма")).toBe("Кузьминична");
    expect(generateRussianMalePatronymic("Никита")).toBe("Никитич");
    expect(generateRussianFemalePatronymic("Никита")).toBe("Никитична");
  });

  it("generateRussianPatronymics returns both forms", () => {
    expect(generateRussianPatronymics("Иван")).toEqual({
      male: "Иванович",
      female: "Ивановна",
    });
  });
});

describe("Russian patronymics — full lists", () => {
  it("returns non-empty male and female patronymic lists", () => {
    const male = getRussianMalePatronymics();
    const female = getRussianFemalePatronymics();
    expect(male.length).toBeGreaterThan(100);
    expect(female.length).toBeGreaterThan(100);
    expect(male).toContain("Иванович");
    expect(female).toContain("Ивановна");
    expect(male).toContain("Сергеевич");
    expect(female).toContain("Ильинична");
  });

  it("getRussianPatronymics returns gendered lists", () => {
    const all = getRussianPatronymics();
    expect(all.male.length).toBe(getRussianMalePatronymics().length);
    expect(all.female.length).toBe(getRussianFemalePatronymics().length);
  });

  it("caches patronymic results", () => {
    expect(getRussianMalePatronymics()).toBe(getRussianMalePatronymics());
  });
});
