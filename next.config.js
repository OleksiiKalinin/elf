const {
  withTamagui
} = require('@tamagui/next-plugin');
const withFonts = require('next-fonts');

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
  'react-native',
  'react-native-mask-input',
  'react-native-dropdown-picker',
  'react-native-skeleton-component',
  'react-native-geocoder-reborn',
  'react-native-google-places-autocomplete',
  'react-native-maps',
  'react-native-vector-icons',
  'expo-linear-gradient',
  'react-native-shadow-2',
  'react-native-web-webview',
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

module.exports = withFonts({
  webpack(config, options) {
    return config;
  }
});

module.exports = function () {
  /** @type {import('next').NextConfig} */
  let config = {
    transpilePackages,
    // images: {
    //   loader: 'akamai',
    //   path: '',
    // },
    // assetPrefix: './',
    pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
    // output: 'standalone',
    // distDir: 'build-web',
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true
    },
    experimental: {
      forceSwcTransforms: true,
      scrollRestoration: true,
      //   swcPlugins: [['react-native-reanimated-swc-plugin']],
    },
    webpack: (config, options) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'react-native-maps': 'react-native-web-maps',
        'react-native-webview': 'react-native-web-webview',
      };

      config.module.rules.push({
        test: /postMock.html$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      })

      return config;
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