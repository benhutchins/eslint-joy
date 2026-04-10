import type { Rule } from 'eslint'

/* eslint-disable @typescript-eslint/no-non-null-assertion -- Rule.Node types loc/range as optional but they are always present */
export const importSpecifierNewline: Rule.RuleModule = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
    messages: {
      specifierOnOwnLine: 'Each import/export specifier must be on its own line when multiline.',
    },
  },
  create (context) {
    function check (node: Rule.Node) {
      const specifiers = (node as unknown as { specifiers?: Rule.Node[] }).specifiers ?? []
      if (specifiers.length < 2) {
        return
      }

      // Only apply when the import is already multiline
      if (node.loc!.start.line === node.loc!.end.line) {
        return
      }

      const { sourceCode } = context

      // Collect all violations first, then report once with a single fixer
      // to avoid overlapping fix ranges when multiple specifiers share a line.
      const violations = specifiers.filter((curr, i) =>
        i > 0 && specifiers[i - 1].loc!.end.line === curr.loc!.start.line,
      )

      if (violations.length === 0) {
        return
      }

      // Derive indent from the first specifier's column position
      const firstSpecifier = specifiers[0]
      const indent = ' '.repeat(firstSpecifier.loc!.start.column)

      context.report({
        node: violations[0],
        messageId: 'specifierOnOwnLine',
        fix (fixer) {
          const fixes = violations.map((curr) => {
            const tokenBefore = sourceCode.getTokenBefore(curr)
            if (!tokenBefore) {
              return null
            }

            return fixer.replaceTextRange(
              [tokenBefore.range![1], curr.range![0]],
              `\n${indent}`,
            )
          })

          return fixes.filter(Boolean) as ReturnType<typeof fixer.replaceTextRange>[]
        },
      })
    }

    return {
      ImportDeclaration: check,
      ExportNamedDeclaration: check,
    }
  },
}
