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
  },
  root: true,
  env: {
    browser: true,
    node: true,
  },
};
