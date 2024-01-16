import { CompositeScreenProps, useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import Colors from '../../colors/Colors';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import companyServices from '../../services/companyServices';
import { MediaType, ContactPersonType } from '../../store/reducers/types';
import { useActions } from '../../hooks/useActions';
import authServices from '../../services/authServices';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { TabbarRoute } from '../../components/organismes/TabbarMenu';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import Button from '../../components/molecules/Button';
import useRouter from '../../hooks/useRouter';

const pointCards = [
  { points: 23, type: 'Pakiet Medium', time: 'na tydzień' },
  { points: 250, type: 'Promowanie', time: 'na tydzień' },
  { points: 500, type: 'Pakiet Pro', time: '100%' },
];

const MainScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [tabbarIndex, setTabbarIndex] = React.useState<number>(0);
  const [routes] = React.useState<TabbarRoute[]>([
    { key: '0', title: 'Profil', icon: 'user' },
    { key: '1', title: 'Pakiety', icon: 'bag' },
    { key: '2', title: 'Ustawienia', icon: 'settings' },
    { key: '3', title: 'Punkty', icon: 'coins' },
  ]);
  const { profileHelpScreenDisplayed, userCompany, token, windowSizes } = useTypedSelector(state => state.general);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  // const [showHelp, setShowHelp] = useState<boolean>(!profileHelpScreenDisplayed);
  const helpDots = [0, 1, 2];
  const [helpItemNumber, setHelpItemNumber] = useState<number>(0);
  const { setSwipeablePanelProps } = useActions();
  const router = useRouter();

  const logoutHandler = async () => {
    await dispatch(authServices.logout());
    setSwipeablePanelProps({
      title: 'Pomyślnie się wylogowałeś',
      closeButton: false,
      buttons: [
        {
          children: 'OK',
          contentColor: Colors.Basic600,
          // onPress: () => router.push('/home')
        }
      ]
    })
  }

  const deleteAccountHandler = () => {
    setSwipeablePanelProps({
      title: 'Na pewno chcesz usunąć konto?',
      buttons: [
        {
          children: 'TAK',
          contentColor: Colors.Danger,
          onPress: async () => {
            // await dispatch(authServices.deleteAccount(token));
            setSwipeablePanelProps({
              title: 'Twoje konto usunięte!',
              closeButton: false,
              buttons: [
                {
                  children: 'OK',
                  contentColor: Colors.Basic600,
                  // onPress: () => router.push('/home')
                }
              ]
            })
          }
        }
      ]
    });
  }

  useEffect(() => {
    if (showHelp && !profileHelpScreenDisplayed) AsyncStorage.setItem('profileHelpScreenDisplayed', 'true');
  }, [showHelp]);

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

  return (
    <ScreenHeaderProvider
    // actions={[{
    //   icon: 'help',
    //   onPress: () => {
    //     setShowHelp(true);
    //     setHelpItemNumber(0);
    //   }
    // }]}
    >
      <View style={{ flex: 1, backgroundColor: Colors.Basic100, paddingTop: 24 }}>
        <Typography weight='Bold' size={20} style={styles.GroupHeader}>
          Moje dane
        </Typography>
        <Button
          variant='text'
          arrowRight
          borderTop
          borderBottom
          onPress={() => router.push({ stack: 'ProfileStack', screen: 'AccountDataScreen' })}
        >
          <View style={styles.ArrowButton}>
            <View style={styles.ButtonIconContainer}>
              <SvgIcon icon='user' />
            </View>
            <Typography weight='SemiBold' variant='h5' style={{ alignSelf: 'center' }}>
              Dane konta
            </Typography>
          </View>
        </Button>
        {/* <ButtonArrowSelector
          text={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SvgIcon icon='work' />
            <Typography style={{ marginLeft: 10 }} weight='SemiBold' variant='h5'>Profil firmy</Typography>
          </View>}
          onPress={() => navigation.navigate(!!userCompany ? 'CompanyScreen' : 'NoCompanyScreen')}
          marginBottom={false}
          marginTop={false}
          borderBottom={false}
        /> */}
        <Button
          variant='text'
          arrowRight
          borderBottom
          onPress={() => {
            userCompany ? goToCompanyScreen() : goToNoCompanyScreen()
          }}
        >
          <View style={styles.ArrowButton}>
            <View style={styles.ButtonIconContainer}>
              <SvgIcon icon='work' />
            </View>
            <Typography weight='SemiBold' variant='h5' style={{ alignSelf: 'center' }}>
              Profil firmy
            </Typography>
          </View>
        </Button>
        {/* <ButtonArrowSelector
          text={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SvgIcon icon='bag' />
            <Typography style={{ marginLeft: 10 }} weight='SemiBold' variant='h5'>Pakiety</Typography>
          </View>}
          onPress={() => navigation.navigate('PaymentTemporalScreen')}
          marginBottom={false}
          marginTop={false}
        /> */}
        <Button
          variant='text'
          arrowRight
          borderBottom
        // onPress={()=> router.push({stack: 'ProfileStack', screen: 'PaymentTemporalScreen'})}
        >
          <View style={styles.ArrowButton}>
            <View style={styles.ButtonIconContainer}>
              <SvgIcon icon='payment' />
            </View>
            <Typography weight='SemiBold' variant='h5' style={{ alignSelf: 'center' }}>
              Pakiety płatności
            </Typography>
          </View>
        </Button>
        {!!token && <View style={{ flex: 1, marginVertical: 20, alignItems: 'center', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={logoutHandler}>
            <Typography color={Colors.Danger} variant="h4" weight='SemiBold' style={{ textDecorationLine: 'underline', textAlign: 'center', }}>
              Wyloguj się
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 15 }} onPress={deleteAccountHandler}>
            <Typography color={Colors.Basic600} variant="h4" weight='SemiBold' style={{ textDecorationLine: 'underline', textAlign: 'center', }}>
              Usuń konto
            </Typography>
          </TouchableOpacity>
        </View>}
        {/* <ButtonArrowSelector
          text={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SvgIcon icon='settings' />
            <Typography style={{ marginLeft: 10 }} weight='SemiBold' variant='h5'>Ustawienia</Typography>
          </View>}
          onPress={() => navigation.navigate('SettingsScreen')}
          marginBottom={false}
          marginTop={false}
        /> */}
        <Button
          variant='text'
          arrowRight
          borderBottom
          onPress={() => router.push({ stack: 'ProfileStack', screen: 'SettingsScreen' })}
        >
          <View style={styles.ArrowButton}>
            <View style={styles.ButtonIconContainer}>
              <SvgIcon icon='settings' />
            </View>
            <Typography weight='SemiBold' variant='h5' style={{ alignSelf: 'center' }}>
              Ustawienia
            </Typography>
          </View>
        </Button>
        {/* <View style={{ marginTop: 32, paddingLeft: 19 }}>
          <Typography weight='Bold' size={20}>Twoje punkty</Typography>
        </View>
        <View>
          <ButtonArrowSelector
            pointsTemplate
            text={
              <View>
                <Typography variant="small" color={Colors.Basic600}>
                  Twoje punkty
                </Typography>
                <ProgressBar value={129} />
              </View>
            }
            onPress={() => navigation.navigate('PointsScreen')}
          />
          <HorizontalSelector title="Twoje korzyści" star={false} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8, marginLeft: 12, marginBottom: 20 }}>
            {pointCards.map(item => (
              <View style={styles.pointsCard}>
                <Typography style={{ marginLeft: 19, marginBottom: 9 }} variant="h5">
                  {item.points}{' '}
                  <Typography variant="small">pkt</Typography>
                </Typography>
                <Typography style={{ marginLeft: 19 }} variant="h5">
                  {item.type}
                </Typography>
                <Typography color={Colors.Basic700} style={{ marginLeft: 19, marginBottom: 20 }} variant="small">
                  {item.time}
                </Typography>
                <ButtonRipple>Wymień</ButtonRipple>
              </View>
            ))}

            <View style={[styles.pointsCard, { backgroundColor: Colors.Basic300 },]}>
              <Typography style={{ marginLeft: 19, marginTop: 37 }} variant="h5">
                Więcej korzyści
              </Typography>
              <ButtonRipple>Sprawdź</ButtonRipple>
            </View>
          </ScrollView>
        </View> */}
        {/* <ButtonArrowSelector
          text={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SvgIcon icon='coins' />
            <Typography weight='SemiBold' variant='h5'>Punkty</Typography>
          </View>}
          onPress={() => {}}
          marginBottom={false}
          marginTop={false}
        /> */}
      </View>
      {/* <TabbarMenu
        backgroundColor={Colors.White}
        navigationState={{ index: tabbarIndex, routes }}
        onIndexChange={setTabbarIndex}
        scrollable
        autoWidth
        paddingHorizontal={3}
        renderScene={SceneMap({
          0: FirstRoute,
          1: SecondRoute,
          2: ThirdRoute,
          3: FourthRoute,
        })}
      /> */}
      {/* <Modal isOpen={showHelp} onClose={() => setShowHelp(false)}>
        <ScrollView style={{ backgroundColor: Colors.White, width: '100%' }}>
          <Image
            source={
              helpItemNumber === 0
                ? require('../../assets/images/tipsPoints1.png')
                : helpItemNumber === 1
                  ? require('../../assets/images/tipsPoints2.png')
                  : require('../../assets/images/tipsPoints3.png')
            }
            style={{
              width: windowSizes.width * 0.65,
              height: windowSizes.width * 0.65,
              resizeMode: 'contain',
              alignSelf: 'center',
              borderRadius: 400,
              marginTop: 60,
              marginBottom: 25
            }}
          />
          <Typography variant="h4" weight="Bold" textAlign="center">
            {helpItemNumber === 0
              ? 'System punktów'
              : helpItemNumber === 1
                ? 'Zbieraj punkty za działania'
                : 'Wymieniaj punkty na nagrody'}
          </Typography>
          <View style={{ height: 25 }}></View>
          <Typography variant="h5" weight="SemiBold" textAlign="center" style={{ paddingHorizontal: 15 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </ScrollView>
        <Modal.Footer width='full' justifyContent='center' alignItems='center'>
          <TouchableOpacity onPress={() => setShowHelp(false)}>
            <Typography color={Colors.Basic600} variant="h5">ZAMKNIJ</Typography>
          </TouchableOpacity>
          <View style={{ marginHorizontal: 10, flexDirection: 'row', paddingLeft: 10 }}>
            {helpDots.map((item, index) => (
              <TouchableOpacity
                style={[
                  styles.helpDot,
                  {
                    backgroundColor:
                      helpItemNumber === index
                        ? Colors.Basic900
                        : Colors.Basic300,
                  },
                ]}
                onPress={() => setHelpItemNumber(index)}></TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={() =>
              helpItemNumber < 2
                ? setHelpItemNumber(state => state + 1)
                : setShowHelp(false)
            }>
            <Typography variant="h5">DALEJ</Typography>
          </TouchableOpacity>
        </Modal.Footer>
      </Modal> */}
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  helpDot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.Basic900,
    borderRadius: 10,
    marginRight: 10
  },
  pointsCard: {
    backgroundColor: Colors.Sea300,
    width: 180,
    height: 180,
    marginLeft: 8,
    paddingTop: 10,
    justifyContent: 'space-between',
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
});

export default MainScreen;
