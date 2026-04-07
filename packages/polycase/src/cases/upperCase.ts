import { tokenize } from "../tokenize";

export type UpperCaseOptions = {
  readonly separator?: string;
};

/**
 * Converts text to uppercase with space-separated words.
 *
 * Use `options.separator` to join words with a custom separator instead of a
 * space.
 *
 * @example
 * ```ts
 * upperCase("helloWorld")
 * //=> "HELLO WORLD"
 * ```
 *
 * @example
 * ```ts
 * upperCase("helloWorld", { separator: "." })
 * //=> "HELLO.WORLD"
 * ```
 */
export function upperCase(input: string, options?: UpperCaseOptions): string {
  return tokenize(input)
    .map(token => token.toUpperCase())
    .join(options?.separator ?? " ");
}
