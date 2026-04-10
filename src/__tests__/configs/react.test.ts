import { describe, expect, test } from 'bun:test'

import { react } from '../../configs/react'

describe('react', () => {
  test('returns react and react-hooks configs when plugins are available', () => {
    const configs = react()
    expect(configs).toHaveLength(2)

    // React JSX config
    expect(configs[0].plugins).toHaveProperty('react')
    expect(configs[0].settings).toEqual({
      react: {
        version: 'detect',
      },
    })
    expect(configs[0].files).toEqual(['**/*.tsx', '**/*.jsx'])
    expect(configs[0].rules).toHaveProperty('react/react-in-jsx-scope', 'off')
    expect(configs[0].rules).toHaveProperty('react/self-closing-comp')

    // React hooks config
    expect(configs[1].plugins).toHaveProperty('react-hooks')
    expect(configs[1].rules).toHaveProperty('react-hooks/rules-of-hooks')
    expect(configs[1].rules).toHaveProperty('react-hooks/exhaustive-deps')
  })

  test('hooks config targets only JSX file types', () => {
    const configs = react()
    expect(configs[1].files).toEqual(['**/*.tsx', '**/*.jsx'])
  })
})
