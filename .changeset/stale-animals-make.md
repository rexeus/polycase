---
"polycase": minor
---

Add case detection helpers: `isCamelCase`, `isPascalCase`, `isSnakeCase`,
`isKebabCase`, `isConstantCase`, `isHeaderCase`, `isCapitalCase`,
`isLowerCase`, `isUpperCase`, `isSentenceCase`, `isTitleCase` — plus
`whichCases()` which returns every case an input is already in. Detection
uses round-trip semantics (`C(s) === s`), so detectors inherit their
definition from the existing case functions and cannot drift.
