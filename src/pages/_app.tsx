import 'raf/polyfill';
import '../../public/fonts/style.css';
import '../../public/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode, memo, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import config from '../../tamagui';
import Script from 'next/script';
import { nextStore } from '../store/nextstore';
import Layout from './Layout';
import AppUnifiedProvider from '../components/organismes/AppUnifiedProvider';
import { useRouter } from 'next/router';
import { CurrentScreenType, WithUrlProps } from '../hooks/withUrl';
import getPathnameFromScreen from '../hooks/getPathnameFromScreen';
import Lottie from "lottie-react";
import windowExists from '../hooks/windowExists';
import splashScreenLogo from "../../android/app/src/main/res/raw/loading_logo.json";
import splashScreenBG from "../../android/app/src/main/res/raw/loading_bg.json";
import { useTypedSelector } from '../hooks/useTypedSelector';

const insets = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const frame = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const initialMetrics = { insets, frame };

const routesToRetain: CurrentScreenType[] = [
  { stack: 'CalendarStack', screen: 'EventEditorScreen' },
  // other routes
];

const ROUTES_TO_RETAIN = routesToRetain.map((route) => getPathnameFromScreen(route));

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { appLoading } = useTypedSelector(s => s.general);
  const retainedComponents = useRef<{ [k: string]: { component: ReactNode } }>({});
  const [theme, setTheme] = useRootTheme();

  const noLayoutPage = Component.displayName === 'PaymentReturnScreen';

  const isRetainableRoute = ROUTES_TO_RETAIN.includes(router.asPath);

  const splittedRoute = router.asPath.split('/');

  if (!splittedRoute[2]) {
    const key = Object.keys(retainedComponents.current).find(key => key.includes(splittedRoute[1], 1));
    if (key) {
      delete retainedComponents.current[key];
    }
  }

  if (isRetainableRoute && !retainedComponents.current[router.asPath]) {
    const MemoComponent = memo(Component);
    retainedComponents.current[router.asPath] = {
      component: <MemoComponent {...pageProps} />,
    };
  }

  return (
    <>
      <Head>
        <title>ELF Biznes</title>
        <meta name="description" content="ELF Biznes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
        <link rel="icon" type="png" href="/favicon.ico" />
      </Head>
      <Script
        key="tamagui-animations-mount"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          // avoid flash of animated things on enter
          __html: "document.documentElement.classList.add('t_unmounted')",
        }}
      />
      {/* don't touch googleapis */}
      {!noLayoutPage && <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuD83IZtlNNM3sxn9Hac4YSOXkRZurb9c&libraries=places&language=pl&region=pl"></script>}
      {/* don't touch googleapis */}

      {appLoading && !noLayoutPage && <View
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000000000,
          alignItems: 'center',
          justifyContent: 'center',
          //@ts-ignore
          background: 'linear-gradient(224deg, rgb(49, 19, 116) -0.09%, rgb(3, 4, 18) 98.73%)',
        }}
      >
        <Lottie
          animationData={splashScreenLogo}
          loop
        />
      </View>}


      <NextThemeProvider enableSystem={false} onChangeTheme={setTheme}>
        <TamaguiProvider
          config={config}
          disableInjectCSS
          // disableRootThemeClass
          defaultTheme={theme}
        >
          <SafeAreaProvider
            initialMetrics={initialMetrics}
            style={styles.safeAreaProvider}
          >
            <GestureHandlerRootView style={styles.container}>
              {noLayoutPage ?
                <Layout hideControls>
                  <Component {...pageProps} />
                </Layout>
                :
                <AppUnifiedProvider>
                  <Layout>
                    {/* __start Retained Components */}
                    <View style={{ display: isRetainableRoute ? 'flex' : 'none', width: '100%', height: '100%' }}>
                      {Object.entries(retainedComponents.current).map(([key, value]) => (
                        <View
                          key={key}
                          style={{ display: router.asPath === key ? 'flex' : 'none', width: '100%', height: '100%' }}
                        >
                          {value.component}
                        </View>
                      ))}
                    </View>
                    {/* __end Retained Components */}
                    {!isRetainableRoute && <Component {...pageProps} />}
                  </Layout>
                </AppUnifiedProvider>
              }
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </TamaguiProvider>
      </NextThemeProvider>
    </>
  );
}

export default nextStore.withRedux(MyApp);

const styles = StyleSheet.create({
  safeAreaProvider: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    // maxWidth: 768
  },
});
