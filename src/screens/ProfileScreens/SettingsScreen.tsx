import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../colors/Colors';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import useRouter from '../../hooks/useRouter';
import { ScrollView } from '../../components/molecules/ScrollView';
import Button from '../../components/molecules/Button';

const SettingsScreen: FC = () => {
  const router = useRouter();

  const goToNotificationScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'NotificationScreen',
      params: undefined,
    });
  };

  const goToCokieeScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CookieScreen',
      params: undefined,
    });
  };

  return (
    <ScreenHeaderProvider backgroundContent={Colors.Basic100}>
      <ScrollView style={styles.ScrollView}>
        <Button
          variant='text'
          arrowRight
          borderTop
          borderBottom
          onPress={() => goToNotificationScreen()}
        >
          <Typography weight='SemiBold' variant='h5'>
            Powiadomienia
          </Typography>
        </Button>
        <Button
          variant='text'
          arrowRight
          borderBottom
          onPress={() => goToCokieeScreen()}
        >
          <Typography weight='SemiBold' variant='h5'>
            Pliki cookies
          </Typography>
        </Button>
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1, 
    marginTop: 24,
  },
});

export default SettingsScreen;