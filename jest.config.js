
module.exports = {
  'preset': 'ts-jest/presets/js-with-babel',
  'roots': [
    '<rootDir>/src',
  ],
  'testMatch': [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  'transformIgnorePatterns': ['/node_modules/(?!get-urls)/'],

};
