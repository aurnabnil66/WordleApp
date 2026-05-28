module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Ensure Reanimated is always processed
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
