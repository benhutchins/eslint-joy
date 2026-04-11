import stylistic from '@stylistic/eslint-plugin'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import type { Linter } from 'eslint'

export interface BaseOptions {
  typescript?: boolean
  tsconfigRootDir?: string
  project?: string | string[] | boolean
}

const stylisticRules: Linter.RulesRecord = {
  // ── Indentation ──
  '@stylistic/indent': ['error', 2],
  '@stylistic/no-tabs': 'error',
  '@stylistic/no-mixed-spaces-and-tabs': 'error',

  // ── Quotes ──
  '@stylistic/quotes': ['error', 'single', {
    avoidEscape: true,
  }],
  '@stylistic/jsx-quotes': ['error', 'prefer-double'],

  // ── Semicolons ──
  '@stylistic/semi': ['error', 'never'],
  '@stylistic/semi-spacing': ['error', {
    before: false,
    after: true,
  }],

  // ── Commas ──
  '@stylistic/comma-dangle': ['error', 'always-multiline'],
  '@stylistic/comma-spacing': ['error', {
    before: false,
    after: true,
  }],
  '@stylistic/comma-style': ['error', 'last'],

  // ── Spacing ──
  '@stylistic/space-before-function-paren': ['error', 'always'],
  '@stylistic/keyword-spacing': ['error', {
    before: true,
    after: true,
  }],
  '@stylistic/space-infix-ops': 'error',
  '@stylistic/space-before-blocks': 'error',
  '@stylistic/space-in-parens': ['error', 'never'],
  '@stylistic/object-curly-spacing': ['error', 'always'],
  '@stylistic/array-bracket-spacing': ['error', 'never'],
  '@stylistic/block-spacing': ['error', 'always'],
  '@stylistic/key-spacing': ['error', {
    beforeColon: false,
    afterColon: true,
  }],
  '@stylistic/no-whitespace-before-property': 'error',
  '@stylistic/rest-spread-spacing': ['error', 'never'],
  '@stylistic/no-multiple-empty-lines': ['error', {
    max: 1,
    maxBOF: 0,
    maxEOF: 0,
  }],
  '@stylistic/no-trailing-spaces': 'error',
  '@stylistic/no-multi-spaces': 'error',
  '@stylistic/eol-last': ['error', 'always'],
  '@stylistic/function-call-spacing': ['error', 'never'],
  '@stylistic/spaced-comment': ['error', 'always', {
    markers: ['/'],
  }],

  // ── Braces & blocks ──
  '@stylistic/brace-style': ['error', '1tbs', {
    allowSingleLine: false,
  }],
  '@stylistic/padded-blocks': ['error', 'never'],

  // ── Objects & properties ──
  '@stylistic/object-curly-newline': ['error', {
    ObjectExpression: {
      multiline: true,
      consistent: true,
    },
    ObjectPattern: {
      multiline: true,
      consistent: true,
    },
    ImportDeclaration: {
      multiline: true,
      consistent: true,
    },
    ExportDeclaration: {
      multiline: true,
      consistent: true,
    },
  }],
  '@stylistic/object-property-newline': ['error', {
    allowAllPropertiesOnSameLine: false,
  }],

  // ── Operators ──
  '@stylistic/operator-linebreak': ['error', 'before'],
  '@stylistic/dot-location': ['error', 'property'],
  '@stylistic/no-floating-decimal': 'error',
  '@stylistic/no-extra-parens': ['error', 'functions'],

  // ── Line length ──
  '@stylistic/max-len': ['error', {
    code: 160,
    ignoreUrls: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
    ignoreRegExpLiterals: true,
  }],
}

const baseRules: Linter.RulesRecord = {
  // ── Braces ──
  curly: ['error', 'all'],

  // ── Variables ──
  'no-var': 'error',
  'prefer-const': 'error',
  'one-var': ['error', 'never'],
  'no-const-assign': 'error',
  'no-class-assign': 'error',
  'no-redeclare': 'error',
  'no-shadow-restricted-names': 'error',
  camelcase: ['error', {
    properties: 'never',
    ignoreDestructuring: false,
  }],

  // ── Equality ──
  eqeqeq: ['error', 'always', {
    null: 'ignore',
  }],

  // ── Best practices ──
  'object-shorthand': ['error', 'always'],
  'prefer-template': 'error',
  'prefer-destructuring': ['error', {
    object: true,
    array: false,
  }],
  'no-useless-rename': 'error',
  'no-param-reassign': ['error', {
    props: false,
  }],
  'no-console': 'warn',
  'no-debugger': 'error',
  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-extra-boolean-cast': 'error',
  'no-new-wrappers': 'error',
  'no-new-func': 'error',
  'no-obj-calls': 'error',
  'no-octal': 'error',
  'no-octal-escape': 'error',
  'no-proto': 'error',
  'no-with': 'error',
  'no-iterator': 'error',
  'no-sequences': 'error',
  'no-throw-literal': 'error',
  'no-self-assign': 'error',
  'no-self-compare': 'error',
  'no-return-assign': ['error', 'except-parens'],
  'no-useless-call': 'error',
  'no-useless-computed-key': 'error',
  'no-useless-constructor': 'error',
  'no-useless-escape': 'error',
  'no-unneeded-ternary': ['error', {
    defaultAssignment: false,
  }],
  'no-unmodified-loop-condition': 'error',
  'no-template-curly-in-string': 'error',
  'no-multi-str': 'error',

  // ── Constructors ──
  'new-cap': ['error', {
    newIsCap: true,
    capIsNew: false,
  }],
  'new-parens': 'error',
  'no-array-constructor': 'error',

  // ── Error handling ──
  'no-fallthrough': 'error',
  'no-unsafe-finally': 'error',

  // ── Syntax correctness ──
  'no-dupe-args': 'error',
  'no-dupe-class-members': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-empty-character-class': 'error',
  'no-empty-pattern': 'error',
  'no-ex-assign': 'error',
  'no-func-assign': 'error',
  'no-inner-declarations': ['error', 'functions'],
  'no-invalid-regexp': 'error',
  'no-irregular-whitespace': 'error',
  'no-control-regex': 'error',
  'no-regex-spaces': 'error',
  'no-delete-var': 'error',
  'no-sparse-arrays': 'error',
  'no-unreachable': 'error',
  'no-unsafe-negation': 'error',
  'no-constant-condition': ['error', {
    checkLoops: false,
  }],

  // ── Labels ──
  'no-labels': ['error', {
    allowLoop: false,
    allowSwitch: false,
  }],
  'no-label-var': 'error',

}

export function base (options: BaseOptions = {}): Linter.Config[] {
  const { typescript = true, tsconfigRootDir, project } = options

  const configs: Linter.Config[] = [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
      plugins: {
        '@stylistic': stylistic as Record<string, unknown>,
      },
      rules: {
        ...stylisticRules,
        ...baseRules,
      },
    },
  ]

  if (typescript) {
    const typeAwareEnabled = project !== false
    const parserOptions: Record<string, unknown> = {
      ecmaVersion: 'latest',
      sourceType: 'module',
    }
    if (project !== undefined && project !== false) {
      parserOptions.project = project
    } else if (typeAwareEnabled) {
      parserOptions.projectService = true
    }
    if (tsconfigRootDir !== undefined) {
      parserOptions.tsconfigRootDir = tsconfigRootDir
    }

    // Base TypeScript config — no type information required
    configs.push({
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parser: tsParser as Linter.Parser,
        parserOptions,
      },
      plugins: {
        '@typescript-eslint': tsPlugin as unknown as Record<string, unknown>,
      },
      rules: {
        // Disable base rules that TS plugin replaces
        'no-unused-vars': 'off',
        'no-redeclare': 'off',
        'no-dupe-class-members': 'off',
        'no-useless-constructor': 'off',
        camelcase: 'off',

        // TypeScript rules (no type info required)
        '@typescript-eslint/no-unused-vars': ['error', {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        }],
        '@typescript-eslint/consistent-type-imports': ['error', {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        }],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-useless-constructor': 'error',
      },
    })

    if (typeAwareEnabled) {
      // Type-aware rules — require type information from the TS project
      configs.push({
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
          'no-throw-literal': 'off',
          'no-implied-eval': 'off',
          '@typescript-eslint/only-throw-error': 'error',
          '@typescript-eslint/no-implied-eval': 'error',
          '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        },
      })
    }
  }

  return configs
}
