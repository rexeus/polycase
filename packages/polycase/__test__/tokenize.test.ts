import { describe, expect, it } from "vitest";
import { tokenize } from "../src/tokenize";

describe("tokenize", () => {
  it("returns an empty array for blank input", () => {
    expect(tokenize("")).toEqual([]);
    expect(tokenize("   ")).toEqual([]);
  });

  it("splits separator-delimited input", () => {
    expect(tokenize("--hello___world...again--")).toEqual([
      "hello",
      "world",
      "again",
    ]);
  });

  it("splits camelCase words", () => {
    expect(tokenize("helloWorld")).toEqual(["hello", "world"]);
  });

  it("splits acronyms sensibly", () => {
    expect(tokenize("XMLParser")).toEqual(["xml", "parser"]);
    expect(tokenize("getHTTPSUrl")).toEqual(["get", "https", "url"]);
  });

  it("splits around numeric boundaries", () => {
    expect(tokenize("item3D")).toEqual(["item", "3", "d"]);
  });

  it("treats apostrophes as separators", () => {
    expect(tokenize("rock'n'roll")).toEqual(["rock", "n", "roll"]);
  });

  it("supports diacritics", () => {
    expect(tokenize("SíDéRá")).toEqual(["sí", "dé", "rá"]);
  });

  it("normalizes decomposed unicode input", () => {
    expect(tokenize("Cafe\u0301Noir")).toEqual(["café", "noir"]);
  });

  it("treats emoji as separators", () => {
    expect(tokenize("hello🌍world")).toEqual(["hello", "world"]);
  });

  it("returns empty array for emoji-only input", () => {
    expect(tokenize("🎉🎊")).toEqual([]);
  });

  it("treats digit-only strings as a single token", () => {
    expect(tokenize("123")).toEqual(["123"]);
  });

  it("tokenizes version strings", () => {
    expect(tokenize("v1.2.3")).toEqual(["v", "1", "2", "3"]);
  });

  it("handles Arabic text", () => {
    expect(tokenize("مرحبا")).toEqual(["مرحبا"]);
  });
});
