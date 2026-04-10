import { describe, expect, test } from 'bun:test'

import { ignores } from '../../configs/ignores'

describe('ignores', () => {
  test('returns default ignores when called with no arguments', () => {
    const configs = ignores()
    expect(configs).toHaveLength(1)
    expect(configs[0].ignores).toContain('**/dist/**')
    expect(configs[0].ignores).toContain('**/node_modules/**')
    expect(configs[0].ignores).toContain('**/.next/**')
    expect(configs[0].ignores).toContain('**/coverage/**')
  })

  test('merges extra ignores with defaults', () => {
    const configs = ignores(['**/custom/**', '**/tmp/**'])
    expect(configs).toHaveLength(1)
    // Still has defaults
    expect(configs[0].ignores).toContain('**/dist/**')
    // Has custom additions
    expect(configs[0].ignores).toContain('**/custom/**')
    expect(configs[0].ignores).toContain('**/tmp/**')
  })

  test('returns empty extra by default', () => {
    const withoutExtra = ignores()
    const withEmpty = ignores([])
    expect(withoutExtra[0].ignores).toEqual(withEmpty[0].ignores)
  })
})
