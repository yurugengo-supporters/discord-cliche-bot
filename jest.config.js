
export default  {
  preset: 'ts-jest/presets/default-esm',
  'roots': [
    '<rootDir>/src',
  ],
  'testMatch': [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  globals: {
    'ts-jest': {
        useESM: true,
    },
  },
};
