import { describe, expect, test } from 'bun:test'

import { base } from '../../configs/base'

describe('base', () => {
  test('returns stylistic + TS configs by default', () => {
    const configs = base()
    expect(configs).toHaveLength(2)

    // First config: stylistic + base rules
    expect(configs[0].plugins).toHaveProperty('@stylistic')
    expect(configs[0].rules).toHaveProperty('@stylistic/indent')
    expect(configs[0].rules).toHaveProperty('prefer-const')
    expect(configs[0].rules).toHaveProperty('eqeqeq')

    // Second config: TypeScript
    expect(configs[1].plugins).toHaveProperty('@typescript-eslint')
    expect(configs[1].languageOptions?.parser).toBeDefined()
    expect(configs[1].rules).toHaveProperty('@typescript-eslint/no-unused-vars')
    expect(configs[1].rules).toHaveProperty('@typescript-eslint/consistent-type-imports')
  })

  test('returns only stylistic config when typescript is false', () => {
    const configs = base({
      typescript: false,
    })
    expect(configs).toHaveLength(1)
    expect(configs[0].plugins).toHaveProperty('@stylistic')
    expect(configs[0].plugins).not.toHaveProperty('@typescript-eslint')
  })

  test('TypeScript config disables base rules it replaces', () => {
    const configs = base({
      typescript: true,
    })
    const tsConfig = configs[1]
    expect(tsConfig.rules).toHaveProperty('no-unused-vars', 'off')
    expect(tsConfig.rules).toHaveProperty('no-redeclare', 'off')
    expect(tsConfig.rules).toHaveProperty('no-dupe-class-members', 'off')
    expect(tsConfig.rules).toHaveProperty('no-useless-constructor', 'off')
    expect(tsConfig.rules).toHaveProperty('no-throw-literal', 'off')
    expect(tsConfig.rules).toHaveProperty('no-implied-eval', 'off')
    expect(tsConfig.rules).toHaveProperty('camelcase', 'off')
  })

  test('TypeScript config enables TS-aware replacements', () => {
    const configs = base({
      typescript: true,
    })
    const tsConfig = configs[1]
    expect(tsConfig.rules).toHaveProperty('@typescript-eslint/only-throw-error', 'error')
    expect(tsConfig.rules).toHaveProperty('@typescript-eslint/no-implied-eval', 'error')
    expect(tsConfig.rules).toHaveProperty('@typescript-eslint/prefer-nullish-coalescing', 'warn')
  })

  test('stylistic config targets correct file types', () => {
    const configs = base()
    expect(configs[0].files).toEqual(['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'])
  })

  test('TypeScript config targets only TS files', () => {
    const configs = base()
    expect(configs[1].files).toEqual(['**/*.ts', '**/*.tsx'])
  })

  test('tsconfigRootDir is passed through to parserOptions', () => {
    const configs = base({
      typescript: true,
      tsconfigRootDir: '/my/project',
    })
    const tsConfig = configs[1]
    const parserOptions = tsConfig.languageOptions?.parserOptions as Record<string, unknown>
    expect(parserOptions.tsconfigRootDir).toBe('/my/project')
  })

  test('tsconfigRootDir is omitted from parserOptions when not provided', () => {
    const configs = base({
      typescript: true,
    })
    const tsConfig = configs[1]
    const parserOptions = tsConfig.languageOptions?.parserOptions as Record<string, unknown>
    expect(parserOptions).not.toHaveProperty('tsconfigRootDir')
  })

  test('object-curly-newline uses multiline mode for ObjectExpression', () => {
    const configs = base()
    const rules = configs[0].rules as Record<string, unknown>
    const ruleConfig = rules['@stylistic/object-curly-newline'] as [string, Record<string, unknown>]
    const objectExpr = ruleConfig[1].ObjectExpression as Record<string, unknown>
    expect(objectExpr.multiline).toBe(true)
    expect(objectExpr).not.toHaveProperty('minProperties')
  })
})
