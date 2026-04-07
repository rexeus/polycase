import { describe, expect, it } from "vitest";
import { sentenceCase } from "../src";

describe("sentenceCase", () => {
  it("uses a custom separator", () => {
    expect(sentenceCase("helloWorldAgain", { separator: "-" })).toBe(
      "Hello-world-again"
    );
  });

  it("uses a space separator by default", () => {
    expect(sentenceCase("helloWorldAgain")).toBe("Hello world again");
  });

  it("returns an empty string for empty input with a custom separator", () => {
    expect(sentenceCase("", { separator: "-" })).toBe("");
  });
});
