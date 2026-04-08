import { describe, expect, it } from "vitest";
import { capitalCase } from "../src";

describe("capitalCase", () => {
  it("uses a custom separator", () => {
    expect(capitalCase("helloWorld", { separator: "-" })).toBe("Hello-World");
  });

  it("uses a space separator by default", () => {
    expect(capitalCase("helloWorld")).toBe("Hello World");
  });

  it("joins with no gap when separator is empty", () => {
    expect(capitalCase("hello world", { separator: "" })).toBe("HelloWorld");
  });
});
