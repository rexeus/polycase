// oxlint-disable import/max-dependencies
import { camelCase } from "./cases/camelCase";
import { capitalCase } from "./cases/capitalCase";
import { constantCase } from "./cases/constantCase";
import { headerCase } from "./cases/headerCase";
import { kebabCase } from "./cases/kebabCase";
import { lowerCase } from "./cases/lowerCase";
import { pascalCase } from "./cases/pascalCase";
import { sentenceCase } from "./cases/sentenceCase";
import { snakeCase } from "./cases/snakeCase";
import { titleCase } from "./cases/titleCase";
import { upperCase } from "./cases/upperCase";
import { PolycaseError } from "./errors/PolycaseError";
import type { CaseName, CaseNameWithOptions, CaseOptionsMap } from "./types";

function assertUnreachable(value: never): never {
  throw new PolycaseError(`Unsupported case name: ${String(value)}`);
}

/**
 * Converts an input string into one of polycase's supported case styles.
 *
 * @example
 * ```ts
 * toCase("camel", "hello world")
 * //=> "helloWorld"
 * ```
 *
 * @example
 * ```ts
 * toCase("upper", "helloWorld")
 * //=> "HELLO WORLD"
 * ```
 *
 * @example
 * ```ts
 * toCase("capital", "hello world", { separator: "." })
 * //=> "Hello.World"
 * ```
 *
 * @example
 * ```ts
 * toCase("invalid" as never, "hello world")
 * //=> throws PolycaseError: "Unsupported case name: invalid"
 * ```
 */
export function toCase<TCaseName extends CaseNameWithOptions>(
  caseName: TCaseName,
  input: string,
  options?: CaseOptionsMap[TCaseName]
): string;
export function toCase(caseName: CaseName, input: string): string;
export function toCase(
  caseName: CaseName,
  input: string,
  options?: CaseOptionsMap[CaseNameWithOptions]
): string {
  switch (caseName) {
    case "camel":
      return camelCase(input);
    case "capital":
      return capitalCase(
        input,
        options as CaseOptionsMap["capital"] | undefined
      );
    case "constant":
      return constantCase(input);
    case "header":
      return headerCase(input);
    case "kebab":
      return kebabCase(input);
    case "lower":
      return lowerCase(input, options as CaseOptionsMap["lower"] | undefined);
    case "pascal":
      return pascalCase(input);
    case "sentence":
      return sentenceCase(
        input,
        options as CaseOptionsMap["sentence"] | undefined
      );
    case "snake":
      return snakeCase(input);
    case "title":
      return titleCase(input, options as CaseOptionsMap["title"] | undefined);
    case "upper":
      return upperCase(input, options as CaseOptionsMap["upper"] | undefined);
    default:
      return assertUnreachable(caseName);
  }
}
