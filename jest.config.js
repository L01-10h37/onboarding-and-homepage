module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  collectCoverageFrom: [
    "app/(tabs)/index.tsx",
    "app/(tabs)/onboarding.tsx",
    "assests/images/screen1.png",
    "assests/images/screen2.png",
    "assests/images/screen3.png",
    "assests/images/screen4.png",
  ],

  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "cart.test.tsx",
    "explore.test.tsx",
    "profile.test.tsx",
    "review.test.tsx",
    "voucher.test.tsx",
    "_layout.test.tsx",
  ],

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],

  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        outputPath: "test-report/index.html",
      },
    ],
  ],
};
