import { describe, expect, test } from 'bun:test'

import { next } from '../../configs/next'

describe('next', () => {
  test('returns next config when plugin is available', () => {
    const configs = next()
    expect(configs).toHaveLength(1)
    expect(configs[0].plugins).toHaveProperty('@next/next')
    expect(configs[0].rules).toHaveProperty('@next/next/no-html-link-for-pages')
    expect(configs[0].rules).toHaveProperty('@next/next/no-img-element')
    expect(configs[0].files).toEqual(['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'])
  })
})
