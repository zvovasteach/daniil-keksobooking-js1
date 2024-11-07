const stylistic = require('@stylistic/eslint-plugin');

const customized = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: true,
  jsx: true,
});

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'plugin:compat/recommended',
    'eslint:recommended',
    'htmlacademy/vanilla',
    'plugin:@stylistic/recommended-extends',
  ],
  plugins: [
    'compat',
    '@stylistic',
    'prefer-arrow',
  ],
  rules: {
    ...customized.rules,
    '@stylistic/brace-style': ['error', '1tbs'],
    '@stylistic/arrow-parens': ['error', 'always'],
    '@stylistic/max-len': ['error', {
      code: 80,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignorePattern: 'd=.*|<!--.*|class=.*|src=.*',
    }],
    'indent': 0,
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxBOF: 0,
        maxEOF: 1,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-alert': 0,
    'check-file/folder-naming-convention': 0,
    'check-file/filename-naming-convention': 0,
    'curly': ['error', 'all'],
    'quotes': [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    'no-unused-vars': ['error', { varsIgnorePattern: '_.*' }],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: true },
    ],
    'func-style': [
      'error',
      'expression',
      { allowArrowFunctions: true },
    ],
  },
};
