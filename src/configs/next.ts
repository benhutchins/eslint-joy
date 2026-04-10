import type { Linter } from 'eslint'

import { requirePlugin } from '../utils'

export function next (): Linter.Config[] {
  const nextPlugin = requirePlugin('@next/eslint-plugin-next', 'Next.js')

  return [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      plugins: {
        '@next/next': nextPlugin,
      },
      rules: {
        '@next/next/no-html-link-for-pages': 'error',
        '@next/next/no-img-element': 'error',
        '@next/next/no-head-element': 'error',
        '@next/next/no-unwanted-polyfillio': 'error',
        '@next/next/no-sync-scripts': 'error',
        '@next/next/no-script-component-in-head': 'error',
        '@next/next/google-font-display': 'warn',
        '@next/next/google-font-preconnect': 'warn',
        '@next/next/no-document-import-in-page': 'error',
        '@next/next/no-head-import-in-document': 'error',
        '@next/next/no-page-custom-font': 'warn',
      },
    },
  ]
}
