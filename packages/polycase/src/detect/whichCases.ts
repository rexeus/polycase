// oxlint-disable import/max-dependencies
import { camelCase } from "../cases/camelCase";
import { capitalCase } from "../cases/capitalCase";
import { constantCase } from "../cases/constantCase";
import { headerCase } from "../cases/headerCase";
import { kebabCase } from "../cases/kebabCase";
import { lowerCase } from "../cases/lowerCase";
import { pascalCase } from "../cases/pascalCase";
import { sentenceCase } from "../cases/sentenceCase";
import { snakeCase } from "../cases/snakeCase";
import { titleCase } from "../cases/titleCase";
import { upperCase } from "../cases/upperCase";
import { tokenize } from "../tokenize";
import type { CaseName } from "../types";

const DETECTORS: ReadonlyArray<readonly [CaseName, (input: string) => string]> =
  [
    ["camel", camelCase],
    ["capital", capitalCase],
    ["constant", constantCase],
    ["header", headerCase],
    ["kebab", kebabCase],
    ["lower", lowerCase],
    ["pascal", pascalCase],
    ["sentence", sentenceCase],
    ["snake", snakeCase],
    ["title", titleCase],
    ["upper", upperCase],
  ];

/**
 * Returns every polycase case style `input` is already in.
 *
 * A string `s` is considered to be in case `C` when `C(s) === s`. Because
 * single-token inputs like `"hello"` satisfy multiple cases, the result is an
 * array rather than a single name. Default options are used for every case;
 * to check against custom options, use the dedicated `isXCase` helpers.
 *
 * Returns `[]` for empty or whitespace-only input.
 *
 * @example
 * ```ts
 * whichCases("helloWorld")
 * //=> ["camel"]
 * ```
 *
 * @example
 * ```ts
 * whichCases("hello")
 * //=> ["camel", "kebab", "lower", "snake"]
 * ```
 *
 * @example
 * ```ts
 * whichCases("HELLO_WORLD")
 * //=> ["constant"]
 * ```
 */
export function whichCases(input: string): readonly CaseName[] {
  if (tokenize(input).length === 0) {
    return [];
  }

  return DETECTORS.filter(
    ([, caseFunction]) => caseFunction(input) === input
  ).map(([name]) => name);
}
