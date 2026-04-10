import type { Linter } from 'eslint'
import importX from 'eslint-plugin-import-x'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'

import { importSpecifierNewline } from '../rules/import-specifier-newline'

export interface ImportsOptions {
  cycles?: boolean
}

export function imports (options: ImportsOptions = {}): Linter.Config[] {
  const { cycles = true } = options

  const configs: Linter.Config[] = [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
      plugins: {
        'simple-import-sort': simpleImportSort as unknown as Record<string, unknown>,
        'unused-imports': unusedImports as unknown as Record<string, unknown>,
        'import-x': importX as unknown as Record<string, unknown>,
        'joy': {
          rules: {
            'import-specifier-newline': importSpecifierNewline,
          },
        } as unknown as Record<string, unknown>,
      },
      rules: {
        // Import sorting
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',

        // Unused imports (auto-fixable)
        'unused-imports/no-unused-imports': 'error',

        // Import hygiene
        'import-x/no-self-import': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/first': 'error',
        'import-x/newline-after-import': 'error',

        // Custom: one specifier per line in multiline imports
        'joy/import-specifier-newline': 'error',
      },
    },
  ]

  if (cycles) {
    configs.push({
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
      rules: {
        'import-x/no-cycle': ['error', {
          maxDepth: 10,
        }],
      },
    })
  }

  return configs
}
