import { capitalize } from "../capitalize";
import { tokenize } from "../tokenize";

export type CapitalCaseOptions = {
  readonly separator?: string;
};

/**
 * Converts text to Capital Case with space-separated words.
 *
 * Use `options.separator` to join words with a custom separator instead of a
 * space.
 *
 * @example
 * ```ts
 * capitalCase("helloWorld")
 * //=> "Hello World"
 * ```
 *
 * @example
 * ```ts
 * capitalCase("helloWorld", { separator: "." })
 * //=> "Hello.World"
 * ```
 */
export function capitalCase(
  input: string,
  options?: CapitalCaseOptions
): string {
  return tokenize(input)
    .map(capitalize)
    .join(options?.separator ?? " ");
}
