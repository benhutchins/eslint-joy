import { describe, expect, test } from 'bun:test'

import { node } from '../../configs/node'

describe('node', () => {
  test('returns node config when plugin is available', () => {
    const configs = node()
    expect(configs).toHaveLength(1)
    expect(configs[0].plugins).toHaveProperty('n')
    expect(configs[0].rules).toHaveProperty('n/no-deprecated-api')
    expect(configs[0].rules).toHaveProperty('n/no-path-concat')
    expect(configs[0].rules).toHaveProperty('n/prefer-promises/fs')
    expect(configs[0].files).toEqual(['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'])
  })
})
