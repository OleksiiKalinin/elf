import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Colors from '../../colors/Colors';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import authServices from '../../services/authServices';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import Button from '../../components/molecules/Button';
import useRouter from '../../hooks/useRouter';
import Slider from '../../components/atoms/Slider';
import { createParam } from 'solito';

const pointCards = [
  { points: 25, name: 'Nowe ogłoszenie' },
  { points: 250, name: 'Nowe ogłoszenie' },
  { points: 500, name: 'Nowe ogłoszenie' },
];

const { useParam } = createParam<NonNullable<ProfileStackParamList['default']['MainScreen']>>();

const MainScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { userCompany, token } = useTypedSelector(state => state.general);
  const { setSwipeablePanelProps, setSnackbarMessage } = useActions();
  const router = useRouter();
  const [subView] = useParam('subView');

  useEffect(() => {
    setSwipeablePanelProps((() => {
      if (subView === 'options') return {
        title: 'Czy na pewno chcesz się wylogować?',
        closeButton: true,
        buttons: [
          {
            children: 'TAK',
            contentVariant: 'h5',
            contentColor: Colors.Danger,
            closeAction: 'none',
            onPress: async () => {
              await dispatch(authServices.logout());
              setSnackbarMessage({ type: 'success', text: 'Zostałeś wylogowany' });
              goHomeScreen();
            }
          },
        ]
      }
      return null;
    })());
  }, [subView])

  const logoutHandler = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'MainScreen',
      params: { subView: 'options' }
    });
  };

  const goToPointsScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'PointsScreen'
    });
  };

  const goToAccoundDataScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'AccountDataScreen',
      params: undefined
    });
  };

  const goToCompanyScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyScreen',
      params: undefined
    });
  };

  const goToNoCompanyScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'NoCompanyScreen'
    });
  };

  const goToSettingsScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'SettingsScreen'
    });
  };

  const goHomeScreen = () => {
    router.push({
      stack: 'MenuStack',
      screen: 'MainScreen',
      params: undefined,
    });
  };

  return (
    <ScreenHeaderProvider backgroundContent={Colors.Basic100}>
      <ScrollView contentContainerStyle={{ paddingTop: 24 }} style={styles.ScrollView}>
        <Typography weight='Bold' size={20} style={[styles.GroupHeader, { marginTop: 24 }]}>
          Twoje punkty
        </Typography>
        <Button
          variant='text'
          arrowRight
          onPress={() => goToPointsScreen()}
          style={styles.PointsButton}
        >
          <View style={styles.PointsContent}>
            <View style={styles.PointsNumber}>
              <Typography size={24} weight='Bold'>
                {10}
              </Typography>
              <Typography weight='Bold'>
                pkt
              </Typography>
            </View>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[10]}
            >
              <Slider.Track >
                <Slider.TrackActive backgroundColor={Colors.Green500} />
              </Slider.Track>
            </Slider>
          </View>
        </Button>
        <View style={styles.PointCards}>
          <Typography weight='Bold' size={20}>
            Twoje korzyści
          </Typography>
          <Button
            variant='text'
            style={styles.SeeAllPointCardsButton}
          >
            <Typography variant='h5' weight="Bold" style={styles.SeeAllPointsCardsText}>
              Zobacz wszystko
            </Typography>
          </Button>
        </View>
        <ScrollView
          horizontal
          style={styles.PointCardsScrollView}
        >
          {pointCards.map(({ points, name }, index) =>
            <View
              key={index}
              style={[styles.PointCardItem, { marginLeft: index === 0 ? 19 : 8 }]}
            >
              <View style={styles.PointCardContent}>
                <View style={styles.PointCardText}>
                  <Typography size={18} >
                    {points}
                  </Typography>
                  <Typography>
                    pkt
                  </Typography>
                </View>
                <Typography variant='h5' weight='Bold'>
                  {name}
                </Typography>
              </View>
              <Button style={styles.PointCardButton}>
                Wymień
              </Button>
            </View>
          )}
        </ScrollView>
        <Typography weight='Bold' size={20} style={[styles.GroupHeader, { marginTop: 40 }]}>
          Moje dane
        </Typography>
        <Button
          variant='text'
          arrowRight
          borderTop
          borderBottom
          onPress={() => goToAccoundDataScreen()}
        >
          <View style={styles.ArrowButton}>
            <View style={styles.ButtonIconContainer}>
              <SvgIcon icon='user' />
            </View>
            <Typography weight='SemiBold' variant='h5' style={styles.ButtonText}>
              Dane konta
            </Typography>
          </View>
        </Button>
        <Button
          variant='text'
          arrowRight
          borderBottom
          onPress={() => {
            userCompany?.is_active ? goToCompanyScreen() : goToNoCompanyScreen()
          }}
        >
          <View style={styles.ArrowButton}>
            <View style={styles.ButtonIconContainer}>
              <SvgIcon icon='work' />
            </View>
            <Typography weight='SemiBold' variant='h5' style={styles.ButtonText}>
              Profil firmy
            </Typography>
          </View>
        </Button>
        <Button
          variant='text'
          arrowRight
          borderBottom
          onPress={() => goToSettingsScreen()}
        >
          <View style={styles.ArrowButton}>
            <View style={styles.ButtonIconContainer}>
              <SvgIcon icon='settings' />
            </View>
            <Typography weight='SemiBold' variant='h5' style={styles.ButtonText}>
              Ustawienia
            </Typography>
          </View>
        </Button>
        {!!token &&
          <Button
            variant='text'
            arrowRight
            borderBottom
            onPress={() => logoutHandler()}
          >
            <View style={styles.ArrowButton}>
              <View style={styles.ButtonIconContainer}>
                <SvgIcon icon='closeX' />
              </View>
              <Typography weight='SemiBold' variant='h5' style={[styles.ButtonText, { color: Colors.Danger }]}>
                Wyloguj się
              </Typography>
            </View>
          </Button>
        }
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
  PointsButton: {
    height: 80,
    backgroundColor: Colors.Basic200,
  },
  PointsContent: {
    width: '80%',
  },
  PointsNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  PointCards: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 19,
    marginTop: 40
  },
  SeeAllPointCardsButton: {
    width: 'auto',
    height: 30
  },
  SeeAllPointsCardsText: {
    color: Colors.Blue500,
    textDecorationLine: 'underline',
  },
  PointCardsScrollView: {
    height: 170,
    marginTop: 16
  },
  PointCardItem: {
    backgroundColor: Colors.Sea300,
    height: 150,
    width: 190,
    justifyContent: 'space-between',
  },
  PointCardContent: {
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  PointCardButton: {
    height: 40
  },
  PointCardText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  GroupHeader: {
    marginBottom: 10,
    paddingHorizontal: 19,
  },
  ArrowButton: {
    flexDirection: 'row',
    gap: 5,
  },
  ButtonIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: Colors.Basic300,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    alignSelf: 'center',
  }
});

export default MainScreen;
