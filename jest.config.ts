export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,ts,jsx,tsx}"],
  moduleNameMapper: {
    "\\.(git|ttf|eot|svg|png)$": "<rootDir>/src/test/mocks/fileMock.ts",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
};
