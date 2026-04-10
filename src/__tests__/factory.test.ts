import { describe, expect, test } from 'bun:test'
import type { Linter } from 'eslint'

import joy from '../factory'
import { findConfigWithPlugin } from './helpers'

describe('joy factory', () => {
  test('returns configs with defaults (typescript on, no react/next/node)', () => {
    const configs = joy()

    expect(configs.length).toBeGreaterThanOrEqual(4)
    expect(configs[0].ignores).toBeDefined()
    expect(findConfigWithPlugin(configs, '@stylistic')).toBeDefined()
    expect(findConfigWithPlugin(configs, '@typescript-eslint')).toBeDefined()
    expect(findConfigWithPlugin(configs, 'simple-import-sort')).toBeDefined()

    // Cycle detection enabled by default
    const cycleConfig = configs.find((c) => c.rules && 'import-x/no-cycle' in c.rules)
    expect(cycleConfig).toBeDefined()
  })

  test('disables typescript when typescript: false', () => {
    const configs = joy({
      typescript: false,
    })
    expect(findConfigWithPlugin(configs, '@typescript-eslint')).toBeUndefined()
  })

  test('disables cycle detection when cycles: false', () => {
    const configs = joy({
      cycles: false,
    })
    const cycleConfig = configs.find((c) => c.rules && 'import-x/no-cycle' in c.rules)
    expect(cycleConfig).toBeUndefined()
  })

  test('merges extra ignores', () => {
    const configs = joy({
      ignores: ['**/custom/**'],
    })
    expect(configs[0].ignores).toContain('**/custom/**')
    expect(configs[0].ignores).toContain('**/dist/**')
  })

  test('appends overrides at the end', () => {
    const override: Linter.Config = {
      files: ['**/*.test.ts'],
      rules: {
        'no-console': 'off',
      },
    }
    const configs = joy({
      overrides: [override],
    })
    const last = configs[configs.length - 1]
    expect(last).toBe(override)
  })

  test('default config does not include react plugin', () => {
    const configs = joy()
    expect(findConfigWithPlugin(configs, 'react')).toBeUndefined()
  })

  test('empty options equals default options', () => {
    const defaultConfigs = joy()
    const emptyConfigs = joy({})
    expect(defaultConfigs.length).toBe(emptyConfigs.length)
  })
})
