export default {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tests/tsconfig.json',
      useESM: true,
      isolatedModules: true,
    },
  },
  testEnvironment: 'miniflare',
  testEnvironmentOptions: {
    scriptPath: 'dist/index.mjs',
    modules: true
  },
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  testTimeout: 10000
}
