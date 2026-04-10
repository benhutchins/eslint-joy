import type { Linter } from 'eslint'

export function findConfigWithPlugin (configs: Linter.Config[], pluginName: string) {
  return configs.find((c) => c.plugins && pluginName in c.plugins)
}
