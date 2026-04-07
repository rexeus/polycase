import { tokenize } from "../tokenize";

/**
 * Converts text to snake_case.
 *
 * @example
 * ```ts
 * snakeCase("helloWorld")
 * //=> "hello_world"
 * ```
 */
export function snakeCase(input: string): string {
  return tokenize(input).join("_");
}
