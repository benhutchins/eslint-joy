import { describe, expect, test } from 'bun:test'

import { interopDefault, requirePlugin, tryRequire } from '../utils'

describe('interopDefault', () => {
  test('returns mod.default when it exists', () => {
    const inner = { rules: { foo: 'bar' } }
    const mod = {
      default: inner,
      __esModule: true,
    }
    expect(interopDefault(mod as unknown as Record<string, unknown>)).toBe(inner)
  })

  test('returns mod itself when no default export', () => {
    const mod = { rules: { foo: 'bar' } }
    expect(interopDefault(mod as Record<string, unknown>)).toBe(mod)
  })

  test('returns mod when default is undefined', () => {
    const mod = {
      default: undefined,
      rules: {},
    }
    expect(interopDefault(mod as unknown as Record<string, unknown>)).toBe(mod)
  })
})

describe('tryRequire', () => {
  test('returns module when it exists', () => {
    const result = tryRequire('node:path')
    expect(result).toBeDefined()
    expect(typeof result).toBe('object')
  })

  test('returns undefined when module does not exist', () => {
    const result = tryRequire('nonexistent-module-that-does-not-exist')
    expect(result).toBeUndefined()
  })
})

describe('requirePlugin', () => {
  test('returns module when it exists', () => {
    const result = requirePlugin('node:path', 'test')
    expect(result).toBeDefined()
    expect(typeof result).toBe('object')
  })

  test('throws with descriptive message when module does not exist', () => {
    expect(() => requirePlugin('nonexistent-plugin', 'test-feature')).toThrow(
      '[@benhutchins/eslint-joy] nonexistent-plugin is required for test-feature support',
    )
  })

  test('error message includes install instruction', () => {
    expect(() => requirePlugin('some-missing-pkg', 'foo')).toThrow(
      'Install it: bun add -d some-missing-pkg',
    )
  })
})
