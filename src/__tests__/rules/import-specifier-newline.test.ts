import { RuleTester } from 'eslint'

import { importSpecifierNewline } from '../../rules/import-specifier-newline'

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
})

// RuleTester.run creates its own describe/test blocks,
// so we call it at the top level — not inside a test().
ruleTester.run('import-specifier-newline', importSpecifierNewline, {
  valid: [
    // Single-line import (not multiline, skip)
    'import { a, b } from "mod"',

    // Single specifier (skip)
    'import { a } from "mod"',

    // Already one-per-line
    `import {
  a,
  b,
} from "mod"`,

    // Default import only
    'import mod from "mod"',

    // Namespace import
    'import * as mod from "mod"',

    // Single-line export
    'export { a, b } from "mod"',

    // Multiline export already correct
    `export {
  a,
  b,
} from "mod"`,

    // Single-line local export (not multiline, skip)
    'const a = 1, b = 2; export { a, b }',

    // Local export already one-per-line
    `const a = 1
const b = 2
export {
  a,
  b,
}`,
  ],
  invalid: [
    // Multiline import with specifiers on same line
    {
      code: `import {
  a, b,
} from "mod"`,
      output: `import {
  a,
  b,
} from "mod"`,
      errors: [{
        messageId: 'specifierOnOwnLine' as const,
      }],
    },
    // Three specifiers, two on same line — single error with combined fix
    {
      code: `import {
  a, b, c,
} from "mod"`,
      output: `import {
  a,
  b,
  c,
} from "mod"`,
      errors: [
        {
          messageId: 'specifierOnOwnLine' as const,
        },
      ],
    },
    // Multiline export with specifiers on same line (re-export)
    {
      code: `export {
  a, b,
} from "mod"`,
      output: `export {
  a,
  b,
} from "mod"`,
      errors: [{
        messageId: 'specifierOnOwnLine' as const,
      }],
    },
    // Local export (no source) with specifiers on same line
    {
      code: `const a = 1, b = 2
export {
  a, b,
}`,
      output: `const a = 1, b = 2
export {
  a,
  b,
}`,
      errors: [{
        messageId: 'specifierOnOwnLine' as const,
      }],
    },
    // Local export with three specifiers on same line
    {
      code: `const a = 1, b = 2, c = 3
export {
  a, b, c,
}`,
      output: `const a = 1, b = 2, c = 3
export {
  a,
  b,
  c,
}`,
      errors: [
        {
          messageId: 'specifierOnOwnLine' as const,
        },
      ],
    },
  ],
})
