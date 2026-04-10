import { describe, expect, test } from 'bun:test'

import { imports } from '../../configs/imports'

describe('imports', () => {
  test('returns import config with cycle detection by default', () => {
    const configs = imports()
    expect(configs).toHaveLength(2)

    // First config: import sorting + unused imports + joy plugin
    const main = configs[0]
    expect(main.plugins).toHaveProperty('simple-import-sort')
    expect(main.plugins).toHaveProperty('unused-imports')
    expect(main.plugins).toHaveProperty('import-x')
    expect(main.plugins).toHaveProperty('joy')
    expect(main.rules).toHaveProperty('simple-import-sort/imports')
    expect(main.rules).toHaveProperty('unused-imports/no-unused-imports')
    expect(main.rules).toHaveProperty('joy/import-specifier-newline')

    // Second config: cycle detection
    expect(configs[1].rules).toHaveProperty('import-x/no-cycle')
  })

  test('omits cycle detection when cycles is false', () => {
    const configs = imports({
      cycles: false,
    })
    expect(configs).toHaveLength(1)
    expect(configs[0].rules).not.toHaveProperty('import-x/no-cycle')
  })

  test('joy plugin contains import-specifier-newline rule', () => {
    const configs = imports()
    const joyPlugin = configs[0].plugins?.['joy'] as Record<string, unknown>
    const rules = joyPlugin.rules as Record<string, unknown>
    expect(rules).toHaveProperty('import-specifier-newline')
  })

  test('cycle detection uses finite maxDepth', () => {
    const configs = imports()
    const cycleConfig = configs[1]
    const ruleConfig = cycleConfig.rules?.['import-x/no-cycle'] as [string, Record<string, unknown>]
    expect(ruleConfig[1].maxDepth).toBe(10)
  })
})
