import type { Linter } from 'eslint'

const DEFAULT_IGNORES = [
  '**/dist/**',
  '**/build/**',
  '**/out/**',
  '**/.next/**',
  '**/.turbo/**',
  '**/node_modules/**',
  '**/coverage/**',
  '**/*.min.js',
  '**/*.d.ts',
]

export function ignores (extra: string[] = []): Linter.Config[] {
  return [
    {
      ignores: [...DEFAULT_IGNORES, ...extra],
    },
  ]
}
