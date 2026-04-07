import { describe, expect, it } from "vitest";
import { titleCase } from "../src";

describe("titleCase", () => {
  it("keeps minor words lowercase unless they are boundaries", () => {
    expect(titleCase("the lord of the rings")).toBe("The Lord of the Rings");
    expect(titleCase("in the end")).toBe("In the End");
  });

  it("allows overriding minor words", () => {
    expect(
      titleCase("the lord of the rings", { minorWords: ["lord", "rings"] })
    ).toBe("The lord Of The Rings");
  });

  it("treats an empty custom minor-word list as no minor words", () => {
    expect(titleCase("the lord of the rings", { minorWords: [] })).toBe(
      "The Lord Of The Rings"
    );
  });

  it("normalizes custom minor words to lowercase", () => {
    expect(
      titleCase("the lord of the rings", { minorWords: ["LORD", "RINGS"] })
    ).toBe("The lord Of The Rings");
  });

  it("always capitalizes boundary tokens even when they are minor words", () => {
    expect(titleCase("hello world", { minorWords: ["hello", "world"] })).toBe(
      "Hello World"
    );
  });

  it("keeps the default minor-word behavior when no override is provided", () => {
    expect(titleCase("war and peace")).toBe("War and Peace");
  });
});
