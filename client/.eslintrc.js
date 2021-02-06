module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _core: './src/core',
          _assets: './src/assets',
          _resources: './src/assets/Resources.tsx',
          _contexts: './src/contexts',
          _components: './src/components',
          _atoms: './src/components/atoms',
          _molecules: './src/components/molecules',
          _organisms: './src/components/organisms',
          _models: './src/models',
          _navigation: './src/navigation',
          _scenes: './src/scenes',
          _apiServices: './src/services/api',
          _controllerServices: './src/services/controller',
          _styles: './src/styles',
          _utils: './src/utils',
        },
      },
    },
  },
};
