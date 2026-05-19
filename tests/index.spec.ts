import { describe, expect, it } from "vitest";
import {
  getEnglishFemaleNames,
  getEnglishMaleNames,
  getEnglishNames,
  getEnglishSurnames,
  getRussianFemaleNames,
  getRussianFemaleSurnames,
  getRussianMaleNames,
  getRussianMaleSurnames,
  getRussianNames,
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
