import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  shims: true,
  sourcemap: false,
  splitting: false,
  treeshake: false,
  external: [
    'eslint',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    '@next/eslint-plugin-next',
    'eslint-plugin-n',
  ],
})
