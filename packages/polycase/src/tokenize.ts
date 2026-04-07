const LOWER_TO_UPPER_BOUNDARY = /(\p{Ll})(\p{Lu})/gu;
const UPPER_RUN_BOUNDARY = /(\p{Lu}+)(\p{Lu}\p{Ll})/gu;
const LETTER_TO_DIGIT_BOUNDARY = /(\p{L})(\p{N})/gu;
const DIGIT_TO_LETTER_BOUNDARY = /(\p{N})(\p{L})/gu;
const TOKEN_SEPARATOR = /[^\p{L}\p{M}\p{N}]+/u;

/**
 * Splits text into normalized lowercase word tokens.
 *
 * @example
 * ```ts
 * tokenize("helloWorld42")
 * //=> ["hello", "world", "42"]
 * ```
 */
export function tokenize(input: string): readonly string[] {
  if (input === "") {
    return [];
  }

  const normalizedInput = input
    .normalize("NFC")
    .replace(LOWER_TO_UPPER_BOUNDARY, "$1 $2")
    .replace(UPPER_RUN_BOUNDARY, "$1 $2")
    .replace(LETTER_TO_DIGIT_BOUNDARY, "$1 $2")
    .replace(DIGIT_TO_LETTER_BOUNDARY, "$1 $2");

  return normalizedInput
    .split(TOKEN_SEPARATOR)
    .filter(token => token !== "")
    .map(token => token.toLowerCase());
}
