const createProject = name => ({
  displayName: name,
  transform: {
    '^.+\\.(ts|js)x?$': './babel-jest.transformer.js',
  },
  testURL: 'http://localhost/',
  setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
  unmockedModulePathPatterns: ['react', 'enzyme', 'jest-enzyme'],
  testMatch: ['*.test.(js|ts)?(x)', `<rootDir>/packages/${name}/**/?(*.)(spec|test).(js|ts)?(x)`],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**'],
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/', '<rootDir>/example/'],
  verbose: true,
});

module.exports = {
  projects: [
    createProject('extra-fields'),
    createProject('field'),
    createProject('form'),
    createProject('helpers'),
    createProject('slider'),
  ],
};
