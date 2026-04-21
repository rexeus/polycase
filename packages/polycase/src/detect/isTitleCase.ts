import { titleCase } from "../cases/titleCase";
import { tokenize } from "../tokenize";
import type { TitleCaseOptions } from "../cases/titleCase";

/**
 * Checks whether `input` is already in title case.
 *
 * Returns `true` when `titleCase(input, options) === input` and the input
 * contains at least one token. Empty and whitespace-only inputs always return
 * `false`. Pass `options.minorWords` to match against a custom minor-word list.
 *
 * @example
 * ```ts
 * isTitleCase("The Lord of the Rings")
 * //=> true
 * ```
 *
 * @example
 * ```ts
 * isTitleCase("War And Peace", { minorWords: ["war", "peace"] })
 * //=> true
 * ```
 */
export function isTitleCase(
  input: string,
  options?: TitleCaseOptions
): boolean {
  if (tokenize(input).length === 0) {
    return false;
  }

  return titleCase(input, options) === input;
}
