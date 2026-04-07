import { capitalize } from "../capitalize";
import { tokenize } from "../tokenize";

/**
 * Converts text to Header-Case.
 *
 * @example
 * ```ts
 * headerCase("hello world")
 * //=> "Hello-World"
 * ```
 */
export function headerCase(input: string): string {
  return tokenize(input).map(capitalize).join("-");
}
