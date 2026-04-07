import { tokenize } from "../tokenize";

/**
 * Converts text to kebab-case.
 *
 * @example
 * ```ts
 * kebabCase("helloWorld")
 * //=> "hello-world"
 * ```
 */
export function kebabCase(input: string): string {
  return tokenize(input).join("-");
}
