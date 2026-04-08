import { describe, expect, it } from "vitest";
import {
  capitalCase,
  lowerCase,
  sentenceCase,
  titleCase,
  upperCase,
} from "../src";
import { caseFunctions, sourceCorpus } from "./sharedCorpus";

describe("case function idempotency", () => {
  for (const [caseName, caseFunction] of Object.entries(caseFunctions) as Array<
    [keyof typeof caseFunctions, (input: string) => string]
  >) {
    it(`${caseName} is idempotent`, () => {
      for (const input of sourceCorpus) {
        const once = caseFunction(input);
        const twice = caseFunction(once);
        expect(twice).toBe(once);
      }
    });
  }

  it("capital case remains idempotent with a custom separator", () => {
    const once = capitalCase("helloWorld", { separator: "-" });
    const twice = capitalCase(once, { separator: "-" });

    expect(twice).toBe(once);
  });

  it("sentence case remains idempotent with a custom separator", () => {
    const once = sentenceCase("helloWorldAgain", { separator: "-" });
    const twice = sentenceCase(once, { separator: "-" });

    expect(twice).toBe(once);
  });

  it("title case remains idempotent with custom minor words", () => {
    const options = { minorWords: ["and", "of"] };
    const once = titleCase("lord of war and peace", options);
    const twice = titleCase(once, options);

    expect(twice).toBe(once);
  });

  it("lower case remains idempotent with a custom separator", () => {
    const once = lowerCase("helloWorld", { separator: "-" });
    const twice = lowerCase(once, { separator: "-" });

    expect(twice).toBe(once);
  });

  it("upper case remains idempotent with a custom separator", () => {
    const once = upperCase("helloWorld", { separator: "-" });
    const twice = upperCase(once, { separator: "-" });

    expect(twice).toBe(once);
  });
});
