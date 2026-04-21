import { upperCase } from "../cases/upperCase";
import { tokenize } from "../tokenize";
import type { UpperCaseOptions } from "../cases/upperCase";

/**
 * Checks whether `input` is already in upper case with the expected separator.
 *
 * Returns `true` when `upperCase(input, options) === input` and the input
 * contains at least one token. Empty and whitespace-only inputs always return
 * `false`. Pass `options.separator` to match a non-default separator.
 *
 * @example
 * ```ts
 * isUpperCase("HELLO WORLD")
 * //=> true
 * ```
 *
 * @example
 * ```ts
 * isUpperCase("HELLO.WORLD", { separator: "." })
 * //=> true
 * ```
 */
export function isUpperCase(
  input: string,
  options?: UpperCaseOptions
): boolean {
  if (tokenize(input).length === 0) {
    return false;
  }

  return upperCase(input, options) === input;
}
