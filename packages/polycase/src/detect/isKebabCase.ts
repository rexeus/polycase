import { kebabCase } from "../cases/kebabCase";
import { tokenize } from "../tokenize";

/**
 * Checks whether `input` is already in `kebab-case`.
 *
 * Returns `true` when `kebabCase(input) === input` and the input contains at
 * least one token. Empty and whitespace-only inputs always return `false`.
 *
 * @example
 * ```ts
 * isKebabCase("hello-world")
 * //=> true
 * ```
 *
 * @example
 * ```ts
 * isKebabCase("hello_world")
 * //=> false
 * ```
 */
export function isKebabCase(input: string): boolean {
  if (tokenize(input).length === 0) {
    return false;
  }

  return kebabCase(input) === input;
}
