# eslint-joy

Opinionated ESLint flat config with TypeScript, React, and Next.js presets.

One import. Zero friction. Just joy.

## Install

```bash
bun add -d @benhutchins/eslint-joy eslint
```

## Quick Start

Create an `eslint.config.js` (or `eslint.config.ts`) at your project root:

```js
import joy from '@benhutchins/eslint-joy'

export default joy()
```

That's it — you get TypeScript, import sorting, stylistic rules, and cycle detection out of the box.

## Options

```ts
import joy from '@benhutchins/eslint-joy'

export default joy({
  typescript: true,   // TypeScript rules (default: true)
  react: false,       // React + React Hooks rules (default: false)
  next: false,        // Next.js rules — implies react (default: false)
  node: false,        // Node.js rules (default: false)
  cycles: true,       // Circular dependency detection (default: true)
  ignores: [],        // Additional glob patterns to ignore
  overrides: [],      // Additional ESLint config objects appended last
})
```

## Examples

### TypeScript project (default)

```js
import joy from '@benhutchins/eslint-joy'

export default joy()
```

### React project

```bash
bun add -d eslint-plugin-react eslint-plugin-react-hooks
```

```js
import joy from '@benhutchins/eslint-joy'

export default joy({ react: true })
```

### Next.js project

```bash
bun add -d eslint-plugin-react eslint-plugin-react-hooks @next/eslint-plugin-next
```

```js
import joy from '@benhutchins/eslint-joy'

export default joy({ next: true })
```

### Node.js project

```bash
bun add -d eslint-plugin-n
```

```js
import joy from '@benhutchins/eslint-joy'

export default joy({ node: true })
```

### Full-stack Next.js + Node

```js
import joy from '@benhutchins/eslint-joy'

export default joy({
  next: true,
  node: true,
})
```

### With project-specific overrides

```js
import joy from '@benhutchins/eslint-joy'

export default joy({
  react: true,
  ignores: ['**/generated/**'],
  overrides: [
    {
      files: ['**/*.test.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
})
```

### Manual composition

If you prefer full control, import individual configs directly:

```js
import { base, imports, ignores, react } from '@benhutchins/eslint-joy'

export default [
  ...ignores(),
  ...base({ typescript: true }),
  ...imports({ cycles: false }),
  ...react(),
]
```

## What's Included

### Always on

| Category | Details |
|---|---|
| **Stylistic** | 2-space indent, single quotes, no semicolons, trailing commas, 160 char line limit |
| **Best practices** | `prefer-const`, `eqeqeq`, `no-eval`, `object-shorthand`, `prefer-template`, and more |
| **Imports** | Auto-sorted imports/exports, unused import removal, no duplicates, no self-imports |
| **TypeScript** | `consistent-type-imports`, `no-explicit-any` (warn), `prefer-optional-chain`, `switch-exhaustiveness-check` |
| **Cycle detection** | `import-x/no-cycle` (disable with `cycles: false` if slow on large codebases) |

### Opt-in

| Preset | Flag | Peer dependencies |
|---|---|---|
| **React** | `react: true` | `eslint-plugin-react`, `eslint-plugin-react-hooks` |
| **Next.js** | `next: true` | `eslint-plugin-react`, `eslint-plugin-react-hooks`, `@next/eslint-plugin-next` |
| **Node.js** | `node: true` | `eslint-plugin-n` |

## Performance Notes

Cycle detection (`import-x/no-cycle`) runs with unbounded depth by default. On very large codebases this can be slow. Disable it if lint times are a concern:

```js
export default joy({ cycles: false })
```

## Requirements

- Node.js >= 18
- ESLint >= 9 (flat config)
- ESM only (`"type": "module"` in your `package.json`)

## License

MIT
