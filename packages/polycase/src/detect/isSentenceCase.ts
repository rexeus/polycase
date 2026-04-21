import { sentenceCase } from "../cases/sentenceCase";
import { tokenize } from "../tokenize";
import type { SentenceCaseOptions } from "../cases/sentenceCase";

/**
 * Checks whether `input` is already in sentence case.
 *
 * Returns `true` when `sentenceCase(input, options) === input` and the input
 * contains at least one token. Empty and whitespace-only inputs always return
 * `false`. Pass `options.separator` to match a non-default separator.
 *
 * @example
 * ```ts
 * isSentenceCase("Hello world")
 * //=> true
 * ```
 *
 * @example
 * ```ts
 * isSentenceCase("Hello.world", { separator: "." })
 * //=> true
 * ```
 */
export function isSentenceCase(
  input: string,
  options?: SentenceCaseOptions
): boolean {
  if (tokenize(input).length === 0) {
    return false;
  }

  return sentenceCase(input, options) === input;
}
