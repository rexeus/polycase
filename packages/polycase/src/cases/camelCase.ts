import { capitalize } from "../capitalize";
import { tokenize } from "../tokenize";

/**
 * Converts text to camelCase.
 *
 * @example
 * ```ts
 * camelCase("hello world")
 * //=> "helloWorld"
 * ```
 */
export function camelCase(input: string): string {
  const [firstToken = "", ...remainingTokens] = tokenize(input);

  return firstToken + remainingTokens.map(capitalize).join("");
}
