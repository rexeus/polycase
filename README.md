# polycase

A small, dependency-free, TypeScript-first toolkit for predictable string case conversion.
Unicode-aware tokenization, 11 built-in cases, and a single `toCase()` dispatcher — in under 2 kB
gzip.

## Why polycase?

Most case-conversion libraries treat acronyms as opaque blobs or require manual configuration to
split them. polycase recognizes acronym runs, numeric boundaries, and Unicode combining marks out of
the box:

```ts
import { camelCase, tokenize, toCase } from "polycase";

// Acronym runs split correctly — no configuration needed
camelCase("getHTTPSUrl"); //=> "getHttpsUrl"
toCase("snake", "XMLParser"); //=> "xml_parser"

// Numeric boundaries detected automatically
toCase("kebab", "item3D"); //=> "item-3-d"

// Full Unicode support, including combining marks
tokenize("Cafe\u0301Noir"); //=> ["café", "noir"]  (NFC-normalized)
```

- **Zero dependencies** — nothing to audit, nothing to break
- **< 2 kB gzip** — ESM and CommonJS, with bundled types
- **Predictable tokenization** — separators, camelCase, PascalCase, acronym runs, and numeric
  boundaries all handled by one deterministic algorithm
- **Idempotent** — applying the same case twice always returns the same result

## Quick start

```bash
npm install polycase
pnpm add polycase
yarn add polycase
```

```ts
import { camelCase, titleCase, toCase } from "polycase";

camelCase("hello world");
//=> "helloWorld"

titleCase("the lord of the rings");
//=> "The Lord of the Rings"

toCase("upper", "getHTTPSUrl", { separator: "." });
//=> "GET.HTTPS.URL"
```

For the full API reference, see [`packages/polycase/README.md`](./packages/polycase/README.md).

## Supported cases

| Case       | Function       | `"helloWorld"` | `"getHTTPSUrl"` |
| ---------- | -------------- | -------------- | --------------- |
| `camel`    | `camelCase`    | `helloWorld`   | `getHttpsUrl`   |
| `capital`  | `capitalCase`  | `Hello World`  | `Get Https Url` |
| `constant` | `constantCase` | `HELLO_WORLD`  | `GET_HTTPS_URL` |
| `header`   | `headerCase`   | `Hello-World`  | `Get-Https-Url` |
| `kebab`    | `kebabCase`    | `hello-world`  | `get-https-url` |
| `lower`    | `lowerCase`    | `hello world`  | `get https url` |
| `pascal`   | `pascalCase`   | `HelloWorld`   | `GetHttpsUrl`   |
| `sentence` | `sentenceCase` | `Hello world`  | `Get https url` |
| `snake`    | `snakeCase`    | `hello_world`  | `get_https_url` |
| `title`    | `titleCase`    | `Hello World`  | `Get Https Url` |
| `upper`    | `upperCase`    | `HELLO WORLD`  | `GET HTTPS URL` |

## Repository structure

```text
packages/polycase/   Published package — source, tests, and build output
config/              Shared build and lint configuration
```

## Local development

```bash
pnpm install          # install all dependencies
pnpm build            # build the package
pnpm test             # run all tests (vitest)
pnpm lint             # check code style (oxlint)
pnpm format           # auto-format with prettier
pnpm typecheck        # run tsc --noEmit
```

Build or test the package in isolation:

```bash
pnpm --filter polycase build
pnpm --filter polycase test
```

## Contributing

Contributions are very welcome — from docs and examples to bug fixes, new plugins and features.

## Feedback & Issues

We’d love to hear your feedback — on API design, DX, docs, issues and ideas. Report them
[here](https://github.com/rexeus/polycase/issues).

## License

Apache-2.0 — see [LICENSE](./LICENSE)
