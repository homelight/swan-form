// const { defaults } = require('jest-config');

module.exports = {
  projects: [
    '<rootDir>/packages/extra-fields',
    '<rootDir>/packages/field',
    '<rootDir>/packages/form',
    '<rootDir>/packages/helpers',
    '<rootDir>/packages/slider',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': './babel-jest.transformer.js',
    // '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
  unmockedModulePathPatterns: ['react', 'enzyme', 'jest-enzyme'],
  testMatch: ['*.test.js', '**/?(*.)(spec|test).js?(x)'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/', '<rootDir>/example/'],
  verbose: true,
};
