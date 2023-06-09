/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testMatch: ["**/spec/**/*.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest"],
  },
};
