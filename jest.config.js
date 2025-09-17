/** @type {import('jest').Config} */
module.exports = {
  projects: [
    // Component/UI tests (jsdom environment)
    {
      displayName: "UI",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts", "<rootDir>/jest.ui.setup.ts"],
      testMatch: ["**/*.test.tsx", "**/components/**/*.test.ts", "**/app/**/page.test.ts"],
      moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
      transform: {
        "^.+\\.(t|j)sx?$": [
          "@swc/jest",
          {
            jsc: {
              target: "es2022",
              transform: {
                react: {
                  runtime: "automatic",
                },
              },
            },
          },
        ],
      },
      moduleNameMapper: {
        "^@/components/ui/(.*)$": "<rootDir>/__mocks__/component-stub.tsx",
        "^@/components/(.*)$": "<rootDir>/__mocks__/component-stub.tsx",
        "^@/(.*)$": "<rootDir>/src/$1",
        "^next/image$": "<rootDir>/__mocks__/next/image.tsx",
        "^next/link$": "<rootDir>/__mocks__/next/link.tsx",
        "^next/navigation$": "<rootDir>/__mocks__/next/navigation.ts",
        "^next/font/google$": "<rootDir>/__mocks__/next/font/google.ts",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/__mocks__/fileMock.js",
        "^react-leaflet$": "<rootDir>/__mocks__/react-leaflet.tsx",
      },
      snapshotFormat: { escapeString: true, printBasicPrototype: true },
    },

    // API tests (node environment)
    {
      displayName: "api",
      testEnvironment: "node",
      setupFiles: ["<rootDir>/jest.setup.ts"],
      testMatch: ["**/app/api/**/*.test.ts"],
      moduleFileExtensions: ["ts", "js"],
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
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
  ],
};
