const {
  withTamagui
} = require('@tamagui/next-plugin');

/** @type {import('next').NextConfig.transpilePackages} */
const transpilePackages = [
  'solito',
  'react-native-safe-area-context',
  'react-native-reanimated',
  'react-native-gesture-handler',
  'react-native-swipe-gestures',
  'toggle-switch-react-native',
  'recyclerlistview',
  'moment',
  'react-native-calendars',
  './node_modules_modified/react-native-calendars',
  'node_modules_modified/react-native-calendars',
  '/node_modules_modified/react-native-calendars',
];

const plugins = [
  withTamagui({
    config: './tamagui',
    components: ['tamagui'],
    excludeReactNativeWebExports: [
      'Switch',
      'ProgressBar',
      'Picker',
      'CheckBox',
      'Touchable',
    ],
  }),
];

module.exports = function () {
  /** @type {import('next').NextConfig} */
  let config = {
    transpilePackages,
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true
    },
    experimental: {
      forceSwcTransforms: true,
      //   swcPlugins: [['react-native-reanimated-swc-plugin']],
    },
  };

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    };
  }

  return config;
};