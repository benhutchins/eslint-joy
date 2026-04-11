import { createRequire } from 'node:module'

// `tsup`'s `shims: true` option provides `import.meta.url` in the CJS build,
// so resolving from this module's location works in both ESM and CJS and lets
// Node walk `node_modules` normally.
const _require = createRequire(import.meta.url)

/**
 * Normalise a CJS module that may wrap its real export under `.default`
 * (common when an ESM-authored package is loaded via `require()`).
 */
export function interopDefault (mod: Record<string, unknown>): Record<string, unknown> {
  return (mod.default as Record<string, unknown>) ?? mod
}

export function tryRequire (id: string): Record<string, unknown> | undefined {
  try {
    return interopDefault(_require(id))
  } catch {
    return undefined
  }
}

export function requirePlugin (id: string, feature: string): Record<string, unknown> {
  const plugin = tryRequire(id)
  if (!plugin) {
    throw new Error(
      `[@benhutchins/eslint-joy] ${id} is required for ${feature} support. `
      + `Install it: bun add -d ${id}`,
    )
  }
  return plugin
}
