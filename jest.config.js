// jest.config.js
export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.m?js$': 'babel-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Adjust the path based on your project structure
    },
    moduleFileExtensions: ['js', 'mjs'],
  };
  