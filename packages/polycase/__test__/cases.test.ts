import { describe, expect, it } from "vitest";
import { caseFunctions, expectedByCase, sourceCorpus } from "./sharedCorpus";

describe("case functions", () => {
  for (const [caseName, caseFunction] of Object.entries(caseFunctions) as Array<
    [keyof typeof caseFunctions, (input: string) => string]
  >) {
    it(`converts inputs to ${caseName} case`, () => {
      const outputs = sourceCorpus.map(input => caseFunction(input));
      expect(outputs).toEqual(expectedByCase[caseName]);
    });
  }
});
