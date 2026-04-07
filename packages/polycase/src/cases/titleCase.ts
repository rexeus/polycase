import { capitalize } from "../capitalize";
import { tokenize } from "../tokenize";

const DEFAULT_MINOR_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "en",
  "for",
  "if",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "vs",
  "via",
]);

export type TitleCaseOptions = {
  readonly minorWords?: readonly string[];
};

/**
 * Converts text to title case using a fixed English minor-word list heuristic.
 *
 * This is not a universal linguistic rule set. Minor words stay lowercase unless
 * they appear at the beginning or end of the phrase. Provide
 * `options.minorWords` to override the built-in minor-word list. Custom
 * minor words are lowercased internally so they can be matched
 * case-insensitively against the normalized tokens produced by `tokenize`.
 *
 * @example
 * ```ts
 * titleCase("the lord of the rings")
 * //=> "The Lord of the Rings"
 * ```
 */
export function titleCase(input: string, options?: TitleCaseOptions): string {
  const tokens = tokenize(input);
  const minorWords = options?.minorWords
    ? new Set(options.minorWords.map(word => word.toLowerCase()))
    : DEFAULT_MINOR_WORDS;

  return tokens
    .map((token, index) => {
      const isBoundaryToken = index === 0 || index === tokens.length - 1;
      return isBoundaryToken || !minorWords.has(token)
        ? capitalize(token)
        : token;
    })
    .join(" ");
}
