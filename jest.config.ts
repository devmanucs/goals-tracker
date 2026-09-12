import type { Config } from "jest";
import nextJest from "next/jest.js";

// next/jest cuida do SWC, dos aliases do tsconfig (@/...), do CSS e das imagens.
const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["<rootDir>/tests/**/*.test.ts", "<rootDir>/tests/**/*.test.tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/features/**/*.{ts,tsx}",
    "src/lib/**/*.ts",
    "!src/**/*.d.ts",
  ],
};

export default createJestConfig(config);
