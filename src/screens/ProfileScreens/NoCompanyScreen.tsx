import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import SvgIcon from '../../components/atoms/SvgIcon';
import useRouter from '../../hooks/useRouter';
import { createParam } from 'solito';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useActions } from '../../hooks/useActions';

const { useParam } = createParam<NonNullable<ProfileStackParamList['default']['NoCompanyScreen']>>();

const NoCompanyScreen: React.FC = () => {
  const { token } = useTypedSelector(state => state.general);
  const { replace } = useRouter();
  const router = useRouter();
  const [subView] = useParam('subView');
  const { setSwipeablePanelProps } = useActions();

  useEffect(() => {
    setSwipeablePanelProps((() => {
      if (subView === 'options') return {
        children:
          <View style={styles.Options}>
            <View style={styles.OptionsTitle}>
              <Typography size={24} weight='Bold'>
                Zaloguj się
              </Typography>
              <Typography>
                Czy chcesz zalogować się, żeby korzystać z pełnych usług aplikacji ELF?
              </Typography>
            </View>
          </View>,
        closeButton: true,
        buttons: [
          {
            children: 'Tak, chcę się zalogować',
            onPress: () => goToAuthScreen(),
            closeAction: 'props-null',
          },
        ]
      }
      return null;
    })());
  }, [subView]);

  const goToAuthScreen = () => {
    replace({ 
      stack: 'AuthStack', 
      screen: 'MainScreen' 
    });
  };

  const goToCompanyEditorScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: undefined
    });
  };

  const goToCompanyScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyScreen',
      params: { newProfile: 'true' }
    });
  };

  const setOptions = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'NoCompanyScreen',
      params: { subView: 'options' }
    });
  };

  return (
    <ScreenHeaderProvider>
      <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingVertical: 30 }}>
        <View style={styles.PointsBanner}>
          <View style={styles.PointsBannerIconContainer}>
            <View style={styles.PointsBannerIcon}>
              <SvgIcon icon='bag' />
            </View>
          </View>
          <Typography style={{ marginBottom: 5 }} textAlign='center' color={Colors.Blue500} size={20} weight='Bold'>100 punktów</Typography>
          <Typography style={{ marginBottom: 5 }} textAlign='center' variant='h5' weight='Bold'>
            Odbierz i uzupełnij profil swojej firmy
          </Typography>
          <Typography textAlign='center'>
            74% Respondentów deklaruje, że uzupełnione profile bardziej przyciągają ich uwagę.
          </Typography>
        </View>
        <View style={styles.AddProfileButton}>
          <Button
            icon={<SvgIcon icon='createCircleSmall' />}
            borderRadius={4}
            variant='secondary'
            contentWeight='Medium'
            contentVariant='h5'
            style={{ paddingVertical: 5 }}
            onPress={() => token ? goToCompanyEditorScreen() : setOptions()}
          >
            Dodaj profil firmy
          </Button>
        </View>
        <Button
          variant='text'
          arrowRight
          borderTop
          borderBottom
          onPress={() => goToCompanyScreen()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../assets/images/Barber.png')} resizeMode='contain' style={{ width: 66, height: 44 }} />
            <View style={{ marginLeft: 10 }}>
              <Typography weight='SemiBold' variant='h5'>Przykładowy profil firmy</Typography>
              <Typography weight='Regular' color={Colors.Basic600}>Marszałkowska 126, Warszawa</Typography>
            </View>
          </View>
        </Button>
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: Colors.Basic100,
  },
  PointsBanner: {
    marginHorizontal: 19,
    backgroundColor: Colors.White,
    borderRadius: 4,
    padding: 16,
    marginBottom: 20,
  },
  PointsBannerIconContainer: {
    alignItems: 'center', marginBottom: 12
  },
  PointsBannerIcon: {
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 31,
    backgroundColor: Colors.Sea300
  },
  AddProfileButton: {
    paddingHorizontal: 19,
    marginBottom: 34
  },
  Options: {
    alignItems: 'center',
    paddingVertical: 42
  },
  OptionsTitle: {
    maxWidth: 252,
    gap: 12,
  },
});

export default NoCompanyScreen;
