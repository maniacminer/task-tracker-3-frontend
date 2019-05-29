module.exports = {
  extends: [
    // "plugin:vue/recommended",
    "eslint:recommended",
    "prettier/vue",
    "plugin:prettier/recommended"
  ],
  parser: "babel-eslint",
  rules: {
    "no-console": "off",
    parserOptions: {
      parser: "babel-eslint",
      ecmaFeatures: {
        sourceType: "module"
      }
    }
  }
}
