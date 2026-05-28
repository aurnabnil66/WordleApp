// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
// const {
//   wrapWithReanimatedMetroConfig,
// } = require('react-native-reanimated/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */

// // Define your custom Metro configuration if needed
// const config = {};

// // Merge the default configuration with your custom config
// const defaultConfig = mergeConfig(getDefaultConfig(__dirname), config);

// // Wrap the configuration with Reanimated's custom Metro config
// module.exports = wrapWithReanimatedMetroConfig(defaultConfig);

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = {
  resetCache: true,
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: getDefaultConfig(__dirname)
      .resolver.assetExts.filter(ext => ext !== 'svg')
      .concat(['png']),
    sourceExts: getDefaultConfig(__dirname).resolver.sourceExts.concat(['svg']),
  },
};

const defaultConfig = mergeConfig(getDefaultConfig(__dirname), config);

module.exports = wrapWithReanimatedMetroConfig(defaultConfig);
