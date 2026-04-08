import { describe, expect, it } from "vitest";
import { PolycaseError, toCase } from "../src";
import { expectedByCase, sourceCorpus } from "./sharedCorpus";

describe("toCase", () => {
  for (const caseName of Object.keys(expectedByCase) as Array<
    keyof typeof expectedByCase
  >) {
    it(`dispatches ${caseName} case correctly`, () => {
      const outputs = sourceCorpus.map(input => toCase(caseName, input));
      expect(outputs).toEqual(expectedByCase[caseName]);
    });
  }

  it("forwards options to capital case", () => {
    expect(toCase("capital", "helloWorld", { separator: "-" })).toBe(
      "Hello-World"
    );
  });

  it("forwards options to lower case", () => {
    expect(toCase("lower", "helloWorld", { separator: "-" })).toBe(
      "hello-world"
    );
  });

  it("forwards options to sentence case", () => {
    expect(toCase("sentence", "helloWorldAgain", { separator: "-" })).toBe(
      "Hello-world-again"
    );
  });

  it("forwards options to title case", () => {
    expect(
      toCase("title", "war and peace", { minorWords: ["war", "peace"] })
    ).toBe("War And Peace");
  });

  it("forwards options to upper case", () => {
    expect(toCase("upper", "helloWorld", { separator: "-" })).toBe(
      "HELLO-WORLD"
    );
  });

  it("throws PolycaseError for unsupported runtime case names", () => {
    expect(() => toCase("invalid" as never, "hello world")).toThrow(
      PolycaseError
    );
    expect(() => toCase("invalid" as never, "hello world")).toThrow(
      "Unsupported case name: invalid"
    );
  });

  it("thrown error is an instance of PolycaseError with correct name", () => {
    expect(() => toCase("invalid" as never, "hello world")).toThrow(
      expect.objectContaining({ name: "PolycaseError" })
    );
  });
});
