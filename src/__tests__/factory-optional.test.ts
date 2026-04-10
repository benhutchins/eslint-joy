import { describe, expect, test } from 'bun:test'

import joy from '../factory'
import { findConfigWithPlugin } from './helpers'

describe('joy factory (optional configs)', () => {
  test('react: true enables react configs', () => {
    const configs = joy({
      react: true,
    })
    expect(findConfigWithPlugin(configs, 'react')).toBeDefined()
    expect(findConfigWithPlugin(configs, 'react-hooks')).toBeDefined()
  })

  test('next: true enables both react and next configs', () => {
    const configs = joy({
      next: true,
    })
    expect(findConfigWithPlugin(configs, 'react')).toBeDefined()
    expect(findConfigWithPlugin(configs, '@next/next')).toBeDefined()
  })

  test('next: true without react: true still includes react', () => {
    const configs = joy({
      next: true,
      react: false,
    })
    expect(findConfigWithPlugin(configs, 'react')).toBeDefined()
    expect(findConfigWithPlugin(configs, '@next/next')).toBeDefined()
  })

  test('node: true enables node configs', () => {
    const configs = joy({
      node: true,
    })
    expect(findConfigWithPlugin(configs, 'n')).toBeDefined()
  })

  test('all optional configs enabled', () => {
    const configs = joy({
      react: true,
      next: true,
      node: true,
    })
    expect(findConfigWithPlugin(configs, 'react')).toBeDefined()
    expect(findConfigWithPlugin(configs, '@next/next')).toBeDefined()
    expect(findConfigWithPlugin(configs, 'n')).toBeDefined()
  })
})
