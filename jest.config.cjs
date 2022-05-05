
module.exports = {
  'globals': {
    'ts-jest': {
      'useESM': true,
    },
  },
  'preset': 'ts-jest/presets/js-with-ts-esm',
  'roots': [
    '<rootDir>/src',
  ],
  'testMatch': [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  'transformIgnorePatterns': ['/node_modules/(?!get-urls)/'],

};
