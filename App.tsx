import { StyleSheet, StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, useTheme, Stack, H4 } from 'tamagui';
import { SolitoImageProvider } from 'solito/image';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import config from './tamagui';
import { Provider } from 'react-redux';
import Colors from './src/colors/Colors';
import { nativeStore } from './src/store';
import RootNavigator from './src/navigators/RootNavigator';

const App = () => {
  // const colorScheme = useColorScheme() || 'light';
  // const isDarkMode = colorScheme === 'dark';
  const colorScheme = 'light';
  const isDarkMode = false;

  return (
    <SolitoImageProvider>
      <TamaguiProvider config={config} disableInjectCSS defaultTheme={colorScheme}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GestureHandlerRootView style={styles.container}>
            <Provider store={nativeStore}>
              <StatusBar
                animated
                showHideTransition="slide"
                backgroundColor={Colors.White}
                barStyle='dark-content'
              // backgroundColor={theme.borderColor?.val}
              // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <SafeAreaView style={styles.container}>
                <RootNavigator />
              </SafeAreaView>
            </Provider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </TamaguiProvider>
    </SolitoImageProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    height: 50,
    width: 50,
  },
  routeName: {
    flex: 1,
    textAlign: 'right',
    marginRight: 15,
  },
});

export default App;
