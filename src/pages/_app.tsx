import 'raf/polyfill';
import '../../public/fonts/style.css';
import '../../public/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import config from '../../tamagui';
import Script from 'next/script';
import { nextStore } from '../store/nextstore';
import { Layout } from './Layout';

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
        >
          <GestureHandlerRootView style={styles.container}>
            <Layout>
              {children}
            </Layout>
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
      <Providers>{contents}</Providers>
    </>
  );
}

// export default MyApp; 
export default nextStore.withRedux(MyApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
