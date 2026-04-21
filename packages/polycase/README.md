# polycase

A small, dependency-free, TypeScript-first toolkit for predictable string case conversion.

- **Zero dependencies** — nothing to audit, nothing to break
- **~3 kB gzip** — ESM and CommonJS, with bundled types
- **Predictable tokenization** — separators, camelCase, PascalCase, acronym runs, and numeric
  boundaries all handled by one deterministic algorithm
- **Idempotent** — applying the same case twice always returns the same result

## Installation

```bash
npm install polycase
```

```bash
pnpm add polycase
```

```bash
yarn add polycase
```

The package ships ESM and CommonJS entry points with bundled type definitions.

## Quick start

### ESM

```ts
import { camelCase, headerCase, titleCase, toCase, tokenize } from "polycase";

camelCase("hello world");
//=> "helloWorld"

headerCase("getHTTPSUrl");
//=> "Get-Https-Url"

titleCase("the lord of the rings");
//=> "The Lord of the Rings"

toCase("constant", "item3D");
//=> "ITEM_3_D"

// "Café" written with a combining acute accent — NFC-normalized before tokenization
tokenize("Cafe\u0301Noir");
//=> ["café", "noir"]
```

### CommonJS

```js
const { camelCase, toCase } = require("polycase");

camelCase("hello world");
//=> "helloWorld"

toCase("snake", "getHTTPSUrl");
//=> "get_https_url"
```

## API reference

### Direct case functions

Every case function takes a `string` and returns a `string`. Some additionally accept an options
object as second argument.

#### `camelCase(input)`

Converts to `camelCase`.

```ts
camelCase("hello world"); //=> "helloWorld"
camelCase("getHTTPSUrl"); //=> "getHttpsUrl"
```

#### `pascalCase(input)`

Converts to `PascalCase`.

```ts
pascalCase("hello world"); //=> "HelloWorld"
pascalCase("getHTTPSUrl"); //=> "GetHttpsUrl"
```

#### `snakeCase(input)`

Converts to `snake_case`.

```ts
snakeCase("helloWorld"); //=> "hello_world"
```

#### `kebabCase(input)`

Converts to `kebab-case`.

```ts
kebabCase("helloWorld"); //=> "hello-world"
```

#### `constantCase(input)`

Converts to `CONSTANT_CASE`.

```ts
constantCase("helloWorld"); //=> "HELLO_WORLD"
```

#### `headerCase(input)`

Converts to `Header-Case` (capitalized tokens joined by `-`).

```ts
headerCase("hello world"); //=> "Hello-World"
headerCase("getHTTPSUrl"); //=> "Get-Https-Url"
```

#### `capitalCase(input, options?)`

Converts to `Capital Case`.

```ts
capitalCase("helloWorld"); //=> "Hello World"
capitalCase("helloWorld", { separator: "." }); //=> "Hello.World"
```

- `separator?: string` — token separator (default: `" "`)

#### `lowerCase(input, options?)`

Converts to lowercase tokens separated by spaces.

```ts
lowerCase("helloWorld"); //=> "hello world"
lowerCase("helloWorld", { separator: "-" }); //=> "hello-world"
```

- `separator?: string` — token separator (default: `" "`)

#### `upperCase(input, options?)`

Converts to uppercase tokens separated by spaces.

```ts
upperCase("helloWorld"); //=> "HELLO WORLD"
upperCase("helloWorld", { separator: "." }); //=> "HELLO.WORLD"
```

- `separator?: string` — token separator (default: `" "`)

#### `sentenceCase(input, options?)`

Converts to sentence case (first token capitalized, rest lowercase).

```ts
sentenceCase("helloWorldAgain"); //=> "Hello world again"
sentenceCase("helloWorldAgain", { separator: "-" }); //=> "Hello-world-again"
```

- `separator?: string` — token separator (default: `" "`)

#### `titleCase(input, options?)`

Converts to title case using an English minor-word heuristic. Minor words stay lowercase unless they
are the first or last token.

Built-in minor words: `a`, `an`, `and`, `as`, `at`, `but`, `by`, `en`, `for`, `if`, `in`, `of`,
`on`, `or`, `the`, `to`, `vs`, `via`

```ts
titleCase("the lord of the rings");
//=> "The Lord of the Rings"

// Override the minor-word list entirely
titleCase("war and peace", { minorWords: ["war", "peace"] });
//=> "War And Peace"
```

- `minorWords?: readonly string[]` — replaces the built-in minor-word list (values are
  case-insensitive)

### `toCase(caseName, input, options?)`

Dispatches to any of the direct case functions by name. TypeScript narrows the allowed `options`
based on `caseName`.

```ts
toCase("camel", "hello world");
//=> "helloWorld"

toCase("upper", "helloWorld", { separator: "-" });
//=> "HELLO-WORLD"

toCase("title", "the lord of the rings", { minorWords: ["and", "of", "the"] });
//=> "The Lord of the Rings"
```

Supported case names and their options:

| `caseName`   | Direct function | Options          |
| ------------ | --------------- | ---------------- |
| `"camel"`    | `camelCase`     | none             |
| `"capital"`  | `capitalCase`   | `{ separator }`  |
| `"constant"` | `constantCase`  | none             |
| `"header"`   | `headerCase`    | none             |
| `"kebab"`    | `kebabCase`     | none             |
| `"lower"`    | `lowerCase`     | `{ separator }`  |
| `"pascal"`   | `pascalCase`    | none             |
| `"sentence"` | `sentenceCase`  | `{ separator }`  |
| `"snake"`    | `snakeCase`     | none             |
| `"title"`    | `titleCase`     | `{ minorWords }` |
| `"upper"`    | `upperCase`     | `{ separator }`  |

Passing an unsupported case name at runtime throws `PolycaseError`:

```ts
toCase("invalid" as never, "hello world");
// throws PolycaseError: "Unsupported case name: invalid"
```

### Detecting a string's case

Every case format has a matching boolean helper, plus a general `whichCases` that returns every case
a string is already in. Detection is defined as a **round-trip**: an input `s` is considered to be
in case `C` when `C(s) === s` and `s` contains at least one token. Empty and whitespace-only inputs
always return `false` (or `[]`).

#### `isCamelCase(input)` · `isPascalCase(input)` · `isSnakeCase(input)` · `isKebabCase(input)` · `isConstantCase(input)` · `isHeaderCase(input)`

```ts
isCamelCase("helloWorld"); //=> true
isCamelCase("HelloWorld"); //=> false

isPascalCase("HelloWorld"); //=> true
isSnakeCase("hello_world"); //=> true
isKebabCase("hello-world"); //=> true
isConstantCase("HELLO_WORLD"); //=> true
isHeaderCase("Hello-World"); //=> true
```

#### `isCapitalCase(input, options?)` · `isLowerCase(input, options?)` · `isUpperCase(input, options?)` · `isSentenceCase(input, options?)`

Each accepts the same options as its case-conversion counterpart.

```ts
isCapitalCase("Hello World"); //=> true
isCapitalCase("Hello.World", { separator: "." }); //=> true

isLowerCase("hello world"); //=> true
isLowerCase("hello-world", { separator: "-" }); //=> true

isUpperCase("HELLO WORLD"); //=> true
isSentenceCase("Hello world"); //=> true
```

#### `isTitleCase(input, options?)`

Accepts the same `minorWords` option as `titleCase`.

```ts
isTitleCase("The Lord of the Rings"); //=> true
isTitleCase("War And Peace", { minorWords: ["war", "peace"] }); //=> true
```

#### `whichCases(input)`

Returns every polycase case style `input` is already in, using default options. Because single-token
inputs like `"hello"` satisfy multiple cases, the result is an ordered `readonly CaseName[]` rather
than a single name. To check against custom options, use the dedicated `isXCase` helpers.

```ts
whichCases("helloWorld"); //=> ["camel"]
whichCases("HelloWorld"); //=> ["pascal"]
whichCases("hello_world"); //=> ["snake"]
whichCases("hello-world"); //=> ["kebab"]
whichCases("HELLO_WORLD"); //=> ["constant"]
whichCases("Hello-World"); //=> ["header"]
whichCases("hello world"); //=> ["lower"]
whichCases("HELLO WORLD"); //=> ["upper"]
whichCases("Hello world"); //=> ["sentence"]
whichCases("Hello World"); //=> ["capital", "title"]

// Single-token inputs match multiple compatible cases.
whichCases("hello"); //=> ["camel", "kebab", "lower", "snake"]
whichCases("Hello"); //=> ["capital", "header", "pascal", "sentence", "title"]
whichCases("HELLO"); //=> ["constant", "upper"]

// Inputs that are not canonical in any case return an empty array.
whichCases("XMLParser"); //=> []
whichCases("  multiple   separators---here__now  "); //=> []
whichCases(""); //=> []
```

### `tokenize(input)`

Splits input into normalized lowercase tokens. Use this when you need polycase's tokenization
without applying a case format.

```ts
tokenize("helloWorld42"); //=> ["hello", "world", "42"]
tokenize("getHTTPSUrl"); //=> ["get", "https", "url"]
tokenize("XMLHttpRequest2"); //=> ["xml", "http", "request", "2"]
```

Returns `readonly string[]`.

### `PolycaseError`

Custom error class for invalid runtime usage (e.g. unsupported case names passed to `toCase`).

```ts
import { PolycaseError, toCase } from "polycase";

try {
  toCase("invalid" as never, "hello world");
} catch (error) {
  if (error instanceof PolycaseError) {
    console.error(error.message);
  }
}
```

### Exported types

```ts
import type {
  CaseName, // "camel" | "capital" | ... | "upper"
  CaseNameWithOptions, // "capital" | "lower" | "sentence" | "title" | "upper"
  CaseNameWithoutOptions, // "camel" | "constant" | "header" | "kebab" | "pascal" | "snake"
  CaseOptionsMap, // Maps each CaseName to its options type (or never)
  CapitalCaseOptions,
  LowerCaseOptions,
  SentenceCaseOptions,
  TitleCaseOptions,
  UpperCaseOptions,
} from "polycase";
```

## Tokenization

All case functions share the same tokenizer. Understanding its rules helps predict output:

1. Input is NFC-normalized (combining marks like `\u0301` are composed into `é`)
2. Boundaries are detected at:
   - Lowercase-to-uppercase transitions: `helloWorld` -> `hello` + `World`
   - Acronym-to-word transitions: `XMLParser` -> `XML` + `Parser`
   - Letter-to-digit and digit-to-letter: `item3D` -> `item` + `3` + `D`
   - Any non-alphanumeric character: `rock'n'roll` -> `rock` + `n` + `roll`
3. All tokens are lowercased before the target case format is applied

```ts
tokenize("Cafe\u0301Noir"); //=> ["café", "noir"]
tokenize("XMLHttpRequest2"); //=> ["xml", "http", "request", "2"]
tokenize("rock'n'roll"); //=> ["rock", "n", "roll"]
snakeCase("mañanaSerá2026"); //=> "mañana_será_2026"
```

### Edge cases

- Empty strings and whitespace-only input return `""` (or `[]` from `tokenize`)
- Emoji and other non-alphanumeric characters act as token separators
- Digit-only input is preserved as a single token: `camelCase("42")` returns `"42"`

## Contributing

Contributions are very welcome — from docs and examples to bug fixes, new plugins and features.

## Feedback & Issues

We’d love to hear your feedback — on API design, DX, docs, issues and ideas. Report them
[here](https://github.com/rexeus/polycase/issues).

## License

Apache-2.0 — see [LICENSE](https://github.com/rexeus/polycase/blob/main/LICENSE)
