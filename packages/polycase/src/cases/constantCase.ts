import { tokenize } from "../tokenize";

/**
 * Converts text to CONSTANT_CASE with underscore-separated uppercase words.
 *
 * Use this instead of {@link upperCase} when you need underscores.
 *
 * @example
 * ```ts
 * constantCase("helloWorld")
 * //=> "HELLO_WORLD"
 * ```
 */
export function constantCase(input: string): string {
  return tokenize(input)
    .map(token => token.toUpperCase())
    .join("_");
}
