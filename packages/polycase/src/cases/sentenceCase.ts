import { capitalize } from "../capitalize";
import { tokenize } from "../tokenize";

export type SentenceCaseOptions = {
  readonly separator?: string;
};

/**
 * Converts text to sentence case.
 *
 * Use `options.separator` to join words with a custom separator instead of a
 * space.
 *
 * @example
 * ```ts
 * sentenceCase("helloWorld")
 * //=> "Hello world"
 * ```
 *
 * @example
 * ```ts
 * sentenceCase("helloWorldAgain", { separator: "." })
 * //=> "Hello.world.again"
 * ```
 */
export function sentenceCase(
  input: string,
  options?: SentenceCaseOptions
): string {
  const [firstToken = "", ...remainingTokens] = tokenize(input);

  if (firstToken === "") {
    return "";
  }

  return [capitalize(firstToken), ...remainingTokens].join(
    options?.separator ?? " "
  );
}
