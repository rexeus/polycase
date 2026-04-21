import { camelCase } from "../cases/camelCase";
import { tokenize } from "../tokenize";

/**
 * Checks whether `input` is already in `camelCase`.
 *
 * Returns `true` when `camelCase(input) === input` and the input contains at
 * least one token. Empty and whitespace-only inputs always return `false`.
 *
 * @example
 * ```ts
 * isCamelCase("helloWorld")
 * //=> true
 * ```
 *
 * @example
 * ```ts
 * isCamelCase("HelloWorld")
 * //=> false
 * ```
 */
export function isCamelCase(input: string): boolean {
  if (tokenize(input).length === 0) {
    return false;
  }

  return camelCase(input) === input;
}
