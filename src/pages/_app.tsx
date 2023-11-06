import 'raf/polyfill';
import '../../public/fonts/style.css';
import '../../public/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode, useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import config from '../../tamagui';
import Script from 'next/script';
import { nextStore } from '../store/nextstore';
import { Layout } from './Layout';
import AppUnifiedProvider from '../components/organismes/AppUnifiedProvider';
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

const Providers = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useRootTheme();
  const { swipeablePanelProps } = useTypedSelector(s => s.general);

  const scrollBarWidth = '5px';

  return (
    <NextThemeProvider enableSystem={false} onChangeTheme={setTheme}>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        // disableRootThemeClass
        defaultTheme={theme}
      >
        <SafeAreaProvider
          initialMetrics={initialMetrics} //https://github.com/th3rdwave/react-native-safe-area-context#web-ssr
          style={[styles.safeAreaProvider, (Platform.OS === 'web' && swipeablePanelProps !== null) && { transform: swipeablePanelProps?.mode !== 'screen' ? `translateX(-${scrollBarWidth})` : 'none',}]}
        >
          <GestureHandlerRootView style={styles.container}>
            <AppUnifiedProvider>
              <Layout>
                {children}
              </Layout>
            </AppUnifiedProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </TamaguiProvider>
    </NextThemeProvider>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const contents = useMemo(() => {
    return <Component {...pageProps} />;
  }, [pageProps]);

  return (
    <>
      <Head>
        <title>ELF Biznes</title>
        <meta name="description" content="ELF Biznes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="png" href="/favicon.png" />
      </Head>
      <Script
        key="tamagui-animations-mount"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          // avoid flash of animated things on enter
          __html: "document.documentElement.classList.add('t_unmounted')",
        }}
      />
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLA1spwwoOjY2rOvMliOBc2C87k6ZOJ_s&libraries=places&language=pl&region=pl"></script>
      <Providers>{contents}</Providers>
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
    maxWidth: 768,
  },
});
