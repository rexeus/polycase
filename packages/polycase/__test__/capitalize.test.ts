import { describe, expect, it } from "vitest";
import { capitalize } from "../src/capitalize";

describe("capitalize", () => {
  it("capitalizes the first character", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("returns an empty string for empty input", () => {
    expect(capitalize("")).toBe("");
  });

  it("handles a single character", () => {
    expect(capitalize("a")).toBe("A");
  });

  it("leaves an already capitalized word unchanged", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("capitalizes accented characters", () => {
    expect(capitalize("café")).toBe("Café");
  });

  it("leaves digit-leading words unchanged", () => {
    expect(capitalize("42")).toBe("42");
  });
});
