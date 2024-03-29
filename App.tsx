import { StyleSheet, StatusBar, LogBox, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider } from 'tamagui';
import {
  initialWindowMetrics,
  SafeAreaProvider,
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
  const colorScheme = 'light';
  const isDarkMode = false;

  return (
    <TamaguiProvider config={config} disableInjectCSS defaultTheme={colorScheme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
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
            />
            <AppUnifiedProvider>
              <GestureHandlerRootView style={styles.Container}>
                <View style={styles.Content}>
                  <RootNavigator />
                  <SwipeablePanel />
                </View>
              </GestureHandlerRootView>
            </AppUnifiedProvider>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e3e3e3'
  },
  Content: {
    maxWidth: 768,
    width: '100%',
    flex: 1
  }
});

export default App;
