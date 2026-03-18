/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */

const config = {
  // Simuler un DOM navigateur pour tester les composants React, nécessaire avec React Testing Library
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/test-utils/setupTests.ts"],

  // Indiquer à Jest que les formats de fichiers ci dessous sont aussi des tests
  testMatch: [
    "**/*.steps.ts",
    "**/*.steps.tsx",
    "**/*.test.ts",
    "**/*.test.tsx",
  ],

  // Permettre à Jest de comprendre les imports TypeScript
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  // Si un fichier est .ts ou .tsx, Jest le compile en JavaScript puis l'execute
  transform: {
    // "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true, // Indiquer à ts-jest de traiter les fichiers .ts et .tsx comme des modules ES, nécessaire pour les tests avec React Testing Library
      },
    ],
  },

  // Permettre à Jest de simuler les imports de fichiers CSS en utilisant une bibliothèque qui retourne un objet vide
  // Permettre à Jest de simuler les imports de composants Next.js (comme Link) en utilisant un mock personnalisé qui retourne un composant simple
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^next/link$": require.resolve("./test-utils/mockNextLink.js"),
  },

  // Permettre à Jest de traiter les fichiers .ts et .tsx comme des modules ES, nécessaire pour les tests avec React Testing Library
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

module.exports = config;
