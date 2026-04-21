import { snakeCase } from "../cases/snakeCase";
import { tokenize } from "../tokenize";

/**
 * Checks whether `input` is already in `snake_case`.
 *
 * Returns `true` when `snakeCase(input) === input` and the input contains at
 * least one token. Empty and whitespace-only inputs always return `false`.
 *
 * @example
 * ```ts
 * isSnakeCase("hello_world")
 * //=> true
 * ```
 *
 * @example
 * ```ts
 * isSnakeCase("helloWorld")
 * //=> false
 * ```
 */
export function isSnakeCase(input: string): boolean {
  if (tokenize(input).length === 0) {
    return false;
  }

  return snakeCase(input) === input;
}
