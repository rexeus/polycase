import { capitalCase } from "../cases/capitalCase";
import { tokenize } from "../tokenize";
import type { CapitalCaseOptions } from "../cases/capitalCase";

/**
 * Checks whether `input` is already in `Capital Case`.
 *
 * Returns `true` when `capitalCase(input, options) === input` and the input
 * contains at least one token. Empty and whitespace-only inputs always return
 * `false`. Pass `options.separator` to match a non-default separator.
 *
 * @example
 * ```ts
 * isCapitalCase("Hello World")
 * //=> true
 * ```
 *
 * @example
 * ```ts
 * isCapitalCase("Hello.World", { separator: "." })
 * //=> true
 * ```
 */
export function isCapitalCase(
  input: string,
  options?: CapitalCaseOptions
): boolean {
  if (tokenize(input).length === 0) {
    return false;
  }

  return capitalCase(input, options) === input;
}
