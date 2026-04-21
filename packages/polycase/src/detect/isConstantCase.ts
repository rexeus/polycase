import { constantCase } from "../cases/constantCase";
import { tokenize } from "../tokenize";

/**
 * Checks whether `input` is already in `CONSTANT_CASE`.
 *
 * Returns `true` when `constantCase(input) === input` and the input contains at
 * least one token. Empty and whitespace-only inputs always return `false`.
 *
 * @example
 * ```ts
 * isConstantCase("HELLO_WORLD")
 * //=> true
 * ```
 *
 * @example
 * ```ts
 * isConstantCase("hello_world")
 * //=> false
 * ```
 */
export function isConstantCase(input: string): boolean {
  if (tokenize(input).length === 0) {
    return false;
  }

  return constantCase(input) === input;
}
