import { describe, expect, it } from "vitest";
import { upperCase } from "../src";

describe("upperCase", () => {
  it("uses a custom separator", () => {
    expect(upperCase("helloWorld", { separator: "-" })).toBe("HELLO-WORLD");
  });

  it("uses a space separator by default", () => {
    expect(upperCase("helloWorld")).toBe("HELLO WORLD");
  });

  it("joins with no gap when separator is empty", () => {
    expect(upperCase("hello world", { separator: "" })).toBe("HELLOWORLD");
  });
});
