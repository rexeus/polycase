import { capitalize } from "../capitalize";
import { tokenize } from "../tokenize";

/**
 * Converts text to PascalCase.
 *
 * @example
 * ```ts
 * pascalCase("hello world")
 * //=> "HelloWorld"
 * ```
 */
export function pascalCase(input: string): string {
  return tokenize(input).map(capitalize).join("");
}
