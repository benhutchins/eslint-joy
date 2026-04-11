import type { Linter } from 'eslint'

import { base } from './configs/base'
import { ignores } from './configs/ignores'
import { imports } from './configs/imports'
import { next } from './configs/next'
import { node } from './configs/node'
import { react } from './configs/react'
import type { JoyOptions } from './types'

export default function joy (options: JoyOptions = {}): Linter.Config[] {
  const {
    typescript = true,
    react: useReact = false,
    next: useNext = false,
    node: useNode = false,
    cycles = true,
    tsconfigRootDir,
    project,
    ignores: extraIgnores = [],
    overrides = [],
  } = options

  const configs: Linter.Config[] = [
    ...ignores(extraIgnores),
    ...base({
      typescript,
      tsconfigRootDir,
      project,
    }),
    ...imports({
      cycles,
    }),
  ]

  if (useReact || useNext) {
    configs.push(...react())
  }

  if (useNext) {
    configs.push(...next())
  }

  if (useNode) {
    configs.push(...node())
  }

  configs.push(...overrides)

  return configs
}
