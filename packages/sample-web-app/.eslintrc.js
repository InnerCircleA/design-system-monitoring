module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {},
  plugins: [
    'react',
    'inner-circle'
  ],
  ignorePatterns: ["**/build/*", "node_modules/", "**/stories/*"],
  rules: {
    'inner-circle/page-component-should-have-anotation': 'error'
  }
}
