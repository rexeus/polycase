import { tokenize } from "../tokenize";

export type LowerCaseOptions = {
  readonly separator?: string;
};

/**
 * Converts text to lowercase words separated by spaces.
 *
 * Use `options.separator` to join words with a custom separator instead of a
 * space.
 *
 * @example
 * ```ts
 * lowerCase("helloWorld")
 * //=> "hello world"
 * ```
 *
 * @example
 * ```ts
 * lowerCase("helloWorld", { separator: "." })
 * //=> "hello.world"
 * ```
 */
export function lowerCase(input: string, options?: LowerCaseOptions): string {
  return tokenize(input).join(options?.separator ?? " ");
}
