import type { CapitalCaseOptions } from "./cases/capitalCase";
import type { LowerCaseOptions } from "./cases/lowerCase";
import type { SentenceCaseOptions } from "./cases/sentenceCase";
import type { TitleCaseOptions } from "./cases/titleCase";
import type { UpperCaseOptions } from "./cases/upperCase";

/**
 * Supported case names accepted by {@link toCase}.
 */
export type CaseName =
  | "camel"
  | "capital"
  | "constant"
  | "header"
  | "kebab"
  | "lower"
  | "pascal"
  | "sentence"
  | "snake"
  | "title"
  | "upper";

export type CaseNameWithOptions =
  | "capital"
  | "lower"
  | "sentence"
  | "title"
  | "upper";

export type CaseNameWithoutOptions = Exclude<CaseName, CaseNameWithOptions>;

export type CaseOptionsMap = {
  readonly capital: CapitalCaseOptions;
  readonly lower: LowerCaseOptions;
  readonly sentence: SentenceCaseOptions;
  readonly title: TitleCaseOptions;
  readonly upper: UpperCaseOptions;
};
