const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  globalIgnores(['dist/*', '.expo/*', 'expo-env.d.ts', '_old/*', 'ml/*']),
  expoConfig,
  prettierRecommended,
]);
