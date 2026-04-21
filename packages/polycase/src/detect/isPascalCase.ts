import { pascalCase } from "../cases/pascalCase";
import { tokenize } from "../tokenize";

/**
 * Checks whether `input` is already in `PascalCase`.
 *
 * Returns `true` when `pascalCase(input) === input` and the input contains at
 * least one token. Empty and whitespace-only inputs always return `false`.
 *
 * @example
 * ```ts
 * isPascalCase("HelloWorld")
 * //=> true
 * ```
 *
 * @example
 * ```ts
 * isPascalCase("helloWorld")
 * //=> false
 * ```
 */
export function isPascalCase(input: string): boolean {
  if (tokenize(input).length === 0) {
    return false;
  }

  return pascalCase(input) === input;
}
