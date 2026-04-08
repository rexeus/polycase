import { describe, expect, it } from "vitest";
import { PolycaseError } from "../src";

describe("PolycaseError", () => {
  it("is an instance of Error", () => {
    const error = new PolycaseError("test");
    expect(error).toBeInstanceOf(Error);
  });

  it("has the correct name", () => {
    const error = new PolycaseError("test");
    expect(error.name).toBe("PolycaseError");
  });

  it("preserves the message", () => {
    const error = new PolycaseError("something went wrong");
    expect(error.message).toBe("something went wrong");
  });

  it("has a stack trace", () => {
    const error = new PolycaseError("test");
    expect(error.stack).toBeDefined();
  });
});
