/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
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
    // map specific components first so they don't get shadowed by the generic alias
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
};
