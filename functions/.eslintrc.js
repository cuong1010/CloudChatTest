module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'quotes': ['error', 'single'],
    'import/no-unresolved': 0,
    'indent': ['error', 2],
    'linebreak-style': 0,
    'object-curly-spacing': ['error', 'always'],
    'require-jsdoc': 0,
    'no-constant-condition': 0,
    'operator-linebreak': 0,
    'max-len': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'new-cap': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
  },
};
