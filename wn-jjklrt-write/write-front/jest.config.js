/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */

const config = {
  // Simuler un DOM navigateur pour tester les composants React, nécessaire avec React Testing Library
  testEnvironment: "jsdom",

  // Indiquer à Jest que les formats de fichiers ci dessous sont aussi des tests
  testMatch: ["**/*.steps.ts", "**/*.steps.tsx"],

  // Permettre à Jest de comprendre les imports TypeScript
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  // Si un fichier est .ts ou .tsx, Jest le compile en JavaScript puis l'execute
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  // Permettre à Jest de simuler les imports de fichiers CSS en utilisant une bibliothèque qui retourne un objet vide
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  // Permettre à Jest de simuler les imports de composants Next.js (comme Link) en utilisant un mock personnalisé qui retourne un composant simple
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^next/link$": require.resolve("./test-utils/mockNextLink.js"),
  },
};

module.exports = config;
