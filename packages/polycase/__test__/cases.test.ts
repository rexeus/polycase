import { describe, expect, it } from "vitest";
import {
  camelCase,
  capitalCase,
  constantCase,
  headerCase,
  kebabCase,
  lowerCase,
  pascalCase,
  sentenceCase,
  snakeCase,
  titleCase,
  upperCase,
} from "../src";
import { expectedByCase, sourceCorpus } from "./sharedCorpus";

const caseFunctions = {
  camel: camelCase,
  capital: capitalCase,
  constant: constantCase,
  header: headerCase,
  kebab: kebabCase,
  lower: lowerCase,
  pascal: pascalCase,
  sentence: sentenceCase,
  snake: snakeCase,
  title: titleCase,
  upper: upperCase,
} as const;

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
