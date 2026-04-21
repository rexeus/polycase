# polycase

## 1.1.0

### Minor Changes

- c55adf2: Add case detection helpers: `isCamelCase`, `isPascalCase`, `isSnakeCase`,
  `isKebabCase`, `isConstantCase`, `isHeaderCase`, `isCapitalCase`,
  `isLowerCase`, `isUpperCase`, `isSentenceCase`, `isTitleCase` — plus
  `whichCases()` which returns every case an input is already in. Detection
  uses round-trip semantics (`C(s) === s`), so detectors inherit their
  definition from the existing case functions and cannot drift.

## 1.0.0

### Major Changes

- 301fb52: Initial release of polycase — a small, dependency-free, TypeScript-first toolkit for predictable string case conversion.

  - 11 case functions: `camelCase`, `pascalCase`, `snakeCase`, `kebabCase`, `constantCase`, `headerCase`, `capitalCase`, `lowerCase`, `upperCase`, `sentenceCase`, `titleCase`
  - `toCase()` dispatcher with type-safe options per case name
  - `tokenize()` for direct access to the Unicode-aware tokenizer
  - `PolycaseError` for invalid runtime usage
  - ESM and CommonJS entry points with bundled type definitions
