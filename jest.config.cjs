module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/*.{ts,tsx}',
    '!src/lib/*.ts',
    '!src/app/*.ts',
    '!src/context/**/*.{ts,tsx}'
  ],
  moduleNameMapper: {
    '^.+\\.(svg?react)$': '<rootDir>/test/mock/icon.mock.tsx',
  },
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.tsx?$',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/test/window.mock.ts'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
