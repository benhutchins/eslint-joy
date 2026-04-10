import type { Linter } from 'eslint'

import { requirePlugin } from '../utils'

export function node (): Linter.Config[] {
  const nodePlugin = requirePlugin('eslint-plugin-n', 'Node.js')

  return [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
      plugins: {
        'n': nodePlugin,
      },
      rules: {
        'n/handle-callback-err': ['error', '^(err|error)$'],
        'n/no-deprecated-api': 'error',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/prefer-promises/fs': 'error',
        'n/prefer-promises/dns': 'error',
      },
    },
  ]
}
