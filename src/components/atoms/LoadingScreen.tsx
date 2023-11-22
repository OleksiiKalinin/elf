import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import { Spinner } from 'tamagui';
import BlurBackground from './BlurBackground';
import ScrollLock from './ScrollLock';

const LoadingScreen = () => {
  return (
    <ScrollLock>
      <View style={styles.Loading}>
        <BlurBackground blurAmount={5} />
        <Spinner color={Colors.Basic900} size='large' zIndex={2} />
      </View>
    </ScrollLock>
  );
};

const styles = StyleSheet.create({
  Loading: {
    position: Platform.select({ web: 'fixed', native: 'absolute' }),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 999999999
  }
});

export default LoadingScreen;