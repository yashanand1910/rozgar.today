// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  coverageDirectory: 'reports',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),

  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true,
      tsConfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  // Do not ignore librairies such as ionic, ionic-native or bootstrap to transform them during unit testing.
  transformIgnorePatterns: ['node_modules/(?!(jest-test|@ionic-native|@ng-bootstrap))']
};
