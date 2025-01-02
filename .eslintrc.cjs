/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'sort-exports'],
  rules: {
    'sort-imports': [
      'error',
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
    'sort-exports/sort-exports': ['error', { sortExportKindFirst: 'type' }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'memberLike',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
          accessors: 'no-public',
        },
      },
    ],
    // Disallow traditional method definitions in classes
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ClassBody > MethodDefinition[kind="method"]',
        message: 'Use arrow functions instead of traditional class methods.',
      },
    ],
  },
  root: true,
  env: {
    browser: true,
    node: true,
  },
};
