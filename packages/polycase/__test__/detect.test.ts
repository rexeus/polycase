import { describe, expect, it } from "vitest";
import {
  isCamelCase,
  isCapitalCase,
  isConstantCase,
  isHeaderCase,
  isKebabCase,
  isLowerCase,
  isPascalCase,
  isSentenceCase,
  isSnakeCase,
  isTitleCase,
  isUpperCase,
  whichCases,
} from "../src";
import { caseFunctions, sourceCorpus } from "./sharedCorpus";
import type { CaseName } from "../src";

const detectors = {
  camel: isCamelCase,
  capital: isCapitalCase,
  constant: isConstantCase,
  header: isHeaderCase,
  kebab: isKebabCase,
  lower: isLowerCase,
  pascal: isPascalCase,
  sentence: isSentenceCase,
  snake: isSnakeCase,
  title: isTitleCase,
  upper: isUpperCase,
} as const;

describe("isXCase detectors", () => {
  for (const [caseName, caseFunction] of Object.entries(caseFunctions) as Array<
    [keyof typeof caseFunctions, (input: string) => string]
  >) {
    const isCaseFunction = detectors[caseName];

    it(`recognizes canonical ${caseName}-case output`, () => {
      for (const input of sourceCorpus) {
        const converted = caseFunction(input);
        if (converted === "") {
          continue;
        }
        expect(isCaseFunction(converted)).toBe(true);
      }
    });

    it(`rejects empty and whitespace-only input for ${caseName}`, () => {
      expect(isCaseFunction("")).toBe(false);
      expect(isCaseFunction("   ")).toBe(false);
    });
  }

  it("isCamelCase distinguishes camel from pascal", () => {
    expect(isCamelCase("helloWorld")).toBe(true);
    expect(isCamelCase("HelloWorld")).toBe(false);
  });

  it("isPascalCase distinguishes pascal from camel", () => {
    expect(isPascalCase("HelloWorld")).toBe(true);
    expect(isPascalCase("helloWorld")).toBe(false);
  });

  it("isSnakeCase rejects kebab and constant inputs", () => {
    expect(isSnakeCase("hello_world")).toBe(true);
    expect(isSnakeCase("hello-world")).toBe(false);
    expect(isSnakeCase("HELLO_WORLD")).toBe(false);
  });

  it("isKebabCase rejects snake and header inputs", () => {
    expect(isKebabCase("hello-world")).toBe(true);
    expect(isKebabCase("hello_world")).toBe(false);
    expect(isKebabCase("Hello-World")).toBe(false);
  });

  it("isConstantCase distinguishes constant from upper", () => {
    expect(isConstantCase("HELLO_WORLD")).toBe(true);
    expect(isConstantCase("HELLO WORLD")).toBe(false);
  });

  it("isHeaderCase rejects kebab and capital inputs", () => {
    expect(isHeaderCase("Hello-World")).toBe(true);
    expect(isHeaderCase("hello-world")).toBe(false);
    expect(isHeaderCase("Hello World")).toBe(false);
  });

  it("isCapitalCase honors a custom separator", () => {
    expect(isCapitalCase("Hello.World", { separator: "." })).toBe(true);
    expect(isCapitalCase("Hello.World")).toBe(false);
  });

  it("isLowerCase honors a custom separator", () => {
    expect(isLowerCase("hello.world", { separator: "." })).toBe(true);
    expect(isLowerCase("hello.world")).toBe(false);
  });

  it("isUpperCase honors a custom separator", () => {
    expect(isUpperCase("HELLO.WORLD", { separator: "." })).toBe(true);
    expect(isUpperCase("HELLO.WORLD")).toBe(false);
  });

  it("isSentenceCase honors a custom separator", () => {
    expect(isSentenceCase("Hello.world", { separator: "." })).toBe(true);
    expect(isSentenceCase("Hello.world")).toBe(false);
  });

  it("isTitleCase honors custom minor words", () => {
    expect(isTitleCase("The Lord of the Rings")).toBe(true);
    expect(isTitleCase("War And Peace", { minorWords: ["war", "peace"] })).toBe(
      true
    );
    expect(isTitleCase("war and peace")).toBe(false);
  });
});

describe("whichCases", () => {
  it("returns an empty array for empty input", () => {
    expect(whichCases("")).toEqual([]);
  });

  it("returns an empty array for whitespace-only input", () => {
    expect(whichCases("   ")).toEqual([]);
  });

  it("returns all compatible cases for a single lowercase token", () => {
    expect(whichCases("hello")).toEqual<CaseName[]>([
      "camel",
      "kebab",
      "lower",
      "snake",
    ]);
  });

  it("returns all compatible cases for a single capitalized token", () => {
    expect(whichCases("Hello")).toEqual<CaseName[]>([
      "capital",
      "header",
      "pascal",
      "sentence",
      "title",
    ]);
  });

  it("returns all compatible cases for a single uppercase token", () => {
    expect(whichCases("HELLO")).toEqual<CaseName[]>(["constant", "upper"]);
  });

  it("identifies camelCase uniquely", () => {
    expect(whichCases("helloWorld")).toEqual<CaseName[]>(["camel"]);
  });

  it("identifies PascalCase uniquely", () => {
    expect(whichCases("HelloWorld")).toEqual<CaseName[]>(["pascal"]);
  });

  it("identifies snake_case uniquely", () => {
    expect(whichCases("hello_world")).toEqual<CaseName[]>(["snake"]);
  });

  it("identifies kebab-case uniquely", () => {
    expect(whichCases("hello-world")).toEqual<CaseName[]>(["kebab"]);
  });

  it("identifies CONSTANT_CASE uniquely", () => {
    expect(whichCases("HELLO_WORLD")).toEqual<CaseName[]>(["constant"]);
  });

  it("identifies Header-Case uniquely", () => {
    expect(whichCases("Hello-World")).toEqual<CaseName[]>(["header"]);
  });

  it("identifies lower case with spaces uniquely", () => {
    expect(whichCases("hello world")).toEqual<CaseName[]>(["lower"]);
  });

  it("identifies upper case with spaces uniquely", () => {
    expect(whichCases("HELLO WORLD")).toEqual<CaseName[]>(["upper"]);
  });

  it("identifies sentence case uniquely", () => {
    expect(whichCases("Hello world")).toEqual<CaseName[]>(["sentence"]);
  });

  it("identifies Capital Case and Title Case together", () => {
    expect(whichCases("Hello World")).toEqual<CaseName[]>(["capital", "title"]);
  });

  it("reports no matches for messy input", () => {
    expect(whichCases("  multiple   separators---here__now  ")).toEqual([]);
  });

  it("reports no matches for mixed-case non-canonical input", () => {
    expect(whichCases("XMLParser")).toEqual([]);
    expect(whichCases("getHTTPSUrl")).toEqual([]);
  });
});
