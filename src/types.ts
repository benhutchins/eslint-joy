import type { Linter } from 'eslint'

export interface JoyOptions {
  /** Enable TypeScript rules (default: true) */
  typescript?: boolean
  /** Enable React + React Hooks rules (default: false) */
  react?: boolean
  /** Enable Next.js rules — implies react: true (default: false) */
  next?: boolean
  /** Enable Node.js rules (default: false) */
  node?: boolean
  /** Enable circular dependency detection via import-x/no-cycle (default: true) */
  cycles?: boolean
  /** Root directory for TypeScript project resolution (helps monorepo setups) */
  tsconfigRootDir?: string
  /** Additional glob patterns to ignore (merged with defaults) */
  ignores?: string[]
  /** Additional config objects appended last (project-specific overrides) */
  overrides?: Linter.Config[]
}
