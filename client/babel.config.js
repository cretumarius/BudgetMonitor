module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
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
    ],
  ],
};
