import { StyleSheet, StatusBar, LogBox, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, useTheme, Stack, H4 } from 'tamagui';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import config from './tamagui';
import { Provider } from 'react-redux';
import Colors from './src/colors/Colors';
import { nativeStore } from './src/store';
import RootNavigator, { navigationLinking } from './src/navigators/RootNavigator';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import SwipeablePanel from './src/components/organismes/SwipeablePanel';
import AppUnifiedProvider from './src/components/organismes/AppUnifiedProvider';

LogBox.ignoreAllLogs();

const App = () => {
  // const colorScheme = useColorScheme() || 'light';
  // const isDarkMode = colorScheme === 'dark';
  const colorScheme = 'light';
  const isDarkMode = false;

  return (
    <TamaguiProvider config={config} disableInjectCSS defaultTheme={colorScheme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GestureHandlerRootView style={styles.Flex1}>
          <Provider store={nativeStore}>
            <NavigationContainer
              theme={isDarkMode ? DarkTheme : DefaultTheme}
              linking={navigationLinking}
            >
              <StatusBar
                animated
                showHideTransition="slide"
                backgroundColor={Colors.White}
                barStyle='dark-content'
              // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <AppUnifiedProvider>
                <View style={styles.Flex1}>
                  <RootNavigator />
                  <SwipeablePanel />
                </View>
              </AppUnifiedProvider>
            </NavigationContainer>
          </Provider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
};

const styles = StyleSheet.create({
  Flex1: {
    flex: 1,
  },
});

export default App;
