module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'react-native/no-inline-styles': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            pathGroups: [
              {
                pattern: '@core/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@features/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@infrastructure/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@presentation/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@shared/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@assets/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@app/**',
                group: 'internal',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '@core': './src/core',
          '@features': './src/features',
          '@infrastructure': './src/infrastructure',
          '@presentation': './src/presentation',
          '@shared': './src/shared',
          '@assets': './assets',
          '@app': './app',
        },
      },
    },
  },
};
