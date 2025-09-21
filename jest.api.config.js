/** @type {import('jest').Config} */
module.exports = {
  transform: {
  "^.+\\.(t|j)sx?$": [
    "@swc/jest",
    {
      jsc: {
        target: "es2022",
      },
    },
  ],
},

  testEnvironment: "node", // perfect for API routes
  testMatch: ["**/app/api/**/*.test.ts"], // only match API tests
  moduleFileExtensions: ["ts", "js"],
};
