import { lowerCase } from "../cases/lowerCase";
import { tokenize } from "../tokenize";
import type { LowerCaseOptions } from "../cases/lowerCase";

/**
 * Checks whether `input` is already in lower case with the expected separator.
 *
 * Returns `true` when `lowerCase(input, options) === input` and the input
 * contains at least one token. Empty and whitespace-only inputs always return
 * `false`. Pass `options.separator` to match a non-default separator.
 *
 * @example
 * ```ts
 * isLowerCase("hello world")
 * //=> true
 * ```
 *
 * @example
 * ```ts
 * isLowerCase("hello.world", { separator: "." })
 * //=> true
 * ```
 */
export function isLowerCase(
  input: string,
  options?: LowerCaseOptions
): boolean {
  if (tokenize(input).length === 0) {
    return false;
  }

  return lowerCase(input, options) === input;
}
