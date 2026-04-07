import { describe, expect, it } from "vitest";
import { lowerCase } from "../src";

describe("lowerCase", () => {
  it("uses a custom separator", () => {
    expect(lowerCase("helloWorld", { separator: "-" })).toBe("hello-world");
  });

  it("uses a space separator by default", () => {
    expect(lowerCase("helloWorld")).toBe("hello world");
  });
});
