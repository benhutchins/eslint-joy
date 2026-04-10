import type { Linter } from 'eslint'

import { requirePlugin } from '../utils'

export function react (): Linter.Config[] {
  const reactPlugin = requirePlugin('eslint-plugin-react', 'react')
  const reactHooksPlugin = requirePlugin('eslint-plugin-react-hooks', 'react')

  return [
    {
      files: ['**/*.tsx', '**/*.jsx'],
      plugins: {
        'react': reactPlugin,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        // React JSX rules
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/self-closing-comp': 'error',
        'react/jsx-sort-props': ['error', {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          reservedFirst: true,
        }],
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-undef': 'error',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/no-children-prop': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-deprecated': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-string-refs': 'error',
        'react/no-unescaped-entities': 'error',
        'react/no-unknown-property': 'error',
        'react/require-render-return': 'error',
        'react/display-name': 'off',
      },
    },
    {
      files: ['**/*.tsx', '**/*.jsx'],
      plugins: {
        'react-hooks': reactHooksPlugin,
      },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  ]
}
