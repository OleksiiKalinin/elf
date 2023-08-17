import 'raf/polyfill';
import '@tamagui/core/reset.css';
// import '@tamagui/font-silkscreen/css/400.css';
// import '@tamagui/font-inter/css/400.css';
// import '@tamagui/font-inter/css/700.css';
// import '@tamagui/font-inter/css/800.css';
// import '@tamagui/font-inter/css/900.css';
import '../../public/fonts/style.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import config from '../../tamagui';
// import { LocaleConfig as CalendarLocaleConfig } from '../../node_modules_modified/react-native-calendars-new/src';
// import { LocaleConfig as CalendarLocaleConfig } from 'react-native-calendars';

// CalendarLocaleConfig.locales['pl'] = {
//   monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
//   monthNamesShort: ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU'],
//   dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
//   dayNamesShort: ['Ndz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'],
//   // dayNamesShort: ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'],
//   // today: "Dzisiaj"
// };
// CalendarLocaleConfig.defaultLocale = 'pl';

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
    <NextThemeProvider onChangeTheme={setTheme}>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        disableRootThemeClass
        defaultTheme={theme}
      >
        <SafeAreaProvider
          initialMetrics={initialMetrics} //https://github.com/th3rdwave/react-native-safe-area-context#web-ssr
        >
          <GestureHandlerRootView style={styles.container}>
            {children}
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </TamaguiProvider>
    </NextThemeProvider>
  );
};

export default function MyApp({ Component, pageProps }: AppProps) {
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
      <script
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
