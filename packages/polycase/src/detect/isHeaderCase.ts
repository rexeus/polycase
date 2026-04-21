import { headerCase } from "../cases/headerCase";
import { tokenize } from "../tokenize";

/**
 * Checks whether `input` is already in `Header-Case`.
 *
 * Returns `true` when `headerCase(input) === input` and the input contains at
 * least one token. Empty and whitespace-only inputs always return `false`.
 *
 * @example
 * ```ts
 * isHeaderCase("Hello-World")
 * //=> true
 * ```
 *
 * @example
 * ```ts
 * isHeaderCase("hello-world")
 * //=> false
 * ```
 */
export function isHeaderCase(input: string): boolean {
  if (tokenize(input).length === 0) {
    return false;
  }

  return headerCase(input) === input;
}
