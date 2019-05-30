module.exports = {
  extends: [
    // "plugin:vue/recommended",
    // "plugin:vue/base",
    "eslint:recommended"
    // "prettier/vue",
    // "plugin:prettier/recommended"
  ],
  rules: {
    "no-console": "off",
    parserOptions: {
      parser: "babel-eslint",
      ecmaFeatures: {
        sourceType: "module"
      }
    }
  },
  globals: { Promise: true, console: true }
}
