module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@core': './src/core',
          '@features': './src/features',
          '@infrastructure': './src/infrastructure',
          '@presentation': './src/presentation',
          '@shared': './src/shared',
          '@assets': './assets',
          '@app': './app',
        },
      },
    ],
  ],
};
