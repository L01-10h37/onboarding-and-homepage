// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const jestPlugin = require('eslint-plugin-jest'); // Import plugin jest

module.exports = defineConfig([
  ...expoConfig,
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*'],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      },
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
    },
  },
  {
    ignores: ['dist/*'],
  },
]);