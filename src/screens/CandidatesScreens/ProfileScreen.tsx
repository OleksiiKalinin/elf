import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import Colors from '../../colors/Colors';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CompanyDataType } from '../../store/reducers/types';
import companyServices from '../../services/companyServices';
import SvgIcon from '../../components/atoms/SvgIcon';
import ScreenHeaderProvider, { SCREEN_HEADER_HEIGHT } from '../../components/organismes/ScreenHeaderProvider';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import useRouter from '../../hooks/useRouter';
import { ScrollView } from '../../components/molecules/ScrollView';
import Carousel from '../../components/organismes/Carousel';
import Typography from '../../components/atoms/Typography';
import { Separator } from 'tamagui';
import Accordion from '../../components/molecules/Accordion';
import { Linking } from "react-native";
import { createParam } from 'solito';
import { InitialPropsFromParams } from '../../hooks/types';
import { Snackbar } from 'react-native-paper';
import Button from '../../components/molecules/Button';
import { Linkedin } from '@tamagui/lucide-icons';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const companyExample: CompanyDataType = {
  id: -1,
  account_facebook: 'www.google.pl',
  account_instagram: 'www.google.pl',
  account_linkedIn: 'www.google.pl',
  employees_amount: 3,
  description: `Prowadzimy kameralną restaurację w centrum Wrocławia, w której serwujemy oryginalne dania kuchni włoskiej. Przyrządzając je wyłącznie z wysokiej jakości składników, pozwalamy naszym klientom odkrywać wyjątkowe smaki Półwyspu Apenińskiego.

  Zatrudniamy 12 wykwalifikowanych pracowników, którzy dbają nie tylko o profesjonalną obsługę, lecz również odpowiednią atmosferę. Oferujemy usługi cateringowe, umożliwiając zamawianie jedzenia za pomocą najpopularniejszych aplikacji kurierskich.
  `,
  job_industry: 3,
  logo: {
    id: 1,
    path: 'https://i.etsystatic.com/11979725/r/il/2af489/1431674872/il_fullxfull.1431674872_d74y.jpg',
  },
  nip_info: null,
  address: {
    adminArea: "Dolnośląskie",
    country: "Polska",
    countryCode: "PL",
    flat_number: null,
    formattedAddress: "Stok góry Jaworowa, 58-424 Czarnów, Polska",
    locale: "pl",
    locality: "Czarnów",
    position: {
      lat: 50.7920869,
      lng: 15.934280999999999
    },
    postalCode: "58-424",
    streetName: null,
    streetNumber: null,
    subAdminArea: "Powiat kamiennogórski",
    subLocality: null
  },
  name: "Firma testowa",
  square_footage: '50 - 100',
  website: 'www.google.pl',
  contactPersons: [],
  languages: [4, 5, 7],
  services: [4, 5, 7],
  photos: [
    {
      id: 1,
      path: 'https://img.freepik.com/darmowe-zdjecie/biale-wnetrze-niewyrazne-krzeslo_1203-4272.jpg?2&w=740&t=st=1703256759~exp=1703257359~hmac=0625895100579764d94fdd94d98648b7687f3da1582ee9eca8f361465d1a72ed',
    },
    {
      id: 2,
      path: 'https://img.freepik.com/darmowe-zdjecie/stol-z-kwiatami-w-doniczkach-w-restauracji_181624-24428.jpg?size=626&ext=jpg&uid=R72634302&semt=sph',
    },
    {
      id: 3,
      path: 'https://img.freepik.com/darmowe-zdjecie/widok-z-boku-kucharz-robi-pyszne-makarony_23-2150690631.jpg?w=740&t=st=1703256778~exp=1703257378~hmac=bbe493ee21e71585841968eadc4956e5b7dcf9797e3d4fe22ce341cf83c14453',
    },
    {
      id: 4,
      path: 'https://img.freepik.com/darmowe-zdjecie/wnetrze-restauracji_1127-3394.jpg?w=740&t=st=1703256915~exp=1703257515~hmac=b2d67622c95ac2b5120aeb938c2cdb5959a993eb71b3273d3fee992e6ceca9a2',
    },
    {
      id: 5,
      path: 'https://img.freepik.com/darmowe-zdjecie/widok-z-boku-danie-flambeing-mezczyzna-szefa-kuchni_23-2148763217.jpg?w=740&t=st=1703256916~exp=1703257516~hmac=256216eb4df3a1af764260db0ef4655e86d60f7e35472b91628814b4b78dde9c',
    },
  ],
  certificates: [
    {
      id: 6,
      path: 'https://img.freepik.com/darmowe-wektory/elegancki-swiadectwo-uznania_23-2147612119.jpg?w=740&t=st=1703257013~exp=1703257613~hmac=13e806aa65fb0f13893d7c55312fb41f43a31bf855197450978c5c15e0f84d96',
    },
    {
      id: 7,
      path: 'https://img.freepik.com/darmowe-wektory/szablon-certyfikatu_1035-3901.jpg?w=740&t=st=1703257065~exp=1703257665~hmac=0d096cb9f494ed42f182f7b4360eb554f2eb14efc8b3f753a80c0072a4ab29ec',
    },
  ],
  other_locations: []
};

/* type InitialParams = NonNullable<ProfileStackParamList['default']['ProfileScreen']>; */

const { useParam } = createParam<NonNullable<CandidatesStackParamList['default']['ProfileScreen']>>();

const ProfileScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { setSwipeablePanelProps, setSnackbarMessage } = useActions();
  const { userCompany, services, languages, employeesAmount } = useTypedSelector(state => state.general);
  const [companyData, setCompanyData] = useState<CompanyDataType | null>(companyExample);
  const [descriptionExpanded, setDescriptionExpanded] = useState(true);
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const [languagesExpanded, setLanguagesExpanded] = useState(true);
  const [carouselHeight, setCarouselHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);
  const router = useRouter();
  const { replace } = useRouter();
  const [subView] = useParam('subView');

  const { jobIndustries } = useTypedSelector(state => state.general);
  const currentIndustry = jobIndustries.find(curr => curr.id === companyData?.job_industry) || null;

  useEffect(() => {
    console.log(userCompany)
    if (userCompany && userCompany.is_active) setCompanyData(userCompany);
  }, [userCompany]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > carouselHeight - SCREEN_HEADER_HEIGHT) {
      setIsHeaderTransparent(false);
    } else {
      setIsHeaderTransparent(true);
    };
  }, [carouselHeight, scrollPosition]);

  useEffect(() => {
    setSwipeablePanelProps((() => {
      if (subView === 'options') return {
        title: 'Czy chcesz usunąć tę firmę?',
        closeButton: true,
        buttons: [
          {
            children: 'Edytuj',
            onPress: () => goToCompanyEditorScreen(),
            closeAction: 'props-null',
          },
          {
            children: 'Usuń',
            contentVariant: 'h5',
            contentColor: Colors.Danger,
            closeAction: 'none',
            onPress: () => setSwipeablePanelProps({
              title: 'Naprawdę chcesz usunąć?',
              closeButton: true,
              buttons: [
                {
                  children: 'TAK',
                  contentWeight: 'SemiBold',
                  contentColor: Colors.Danger,
                  closeAction: 'props-null',
                  onPress: () => {
                    (async () => {
                      if (companyData?.id) {
                        const isOk = await dispatch(companyServices.deleteUserCompany(companyData.id));
                        if (!!isOk) {
                          setSnackbarMessage({ type: 'success', text: 'Profil firmy został usunięty' });
                          goToNoCompanyScreen();
                        }
                      }
                    })();
                  }
                }
              ]
            }),
          },
        ]
      }
      return null;
    })());
  }, [subView]);

  const handleLayout = (event: { nativeEvent: { layout: { width: number; height: number; }; }; }) => {
    const { height } = event.nativeEvent.layout;
    setCarouselHeight(height);
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: number; }; }; }) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(Math.round(offsetY));
  };

  const filteredEmployeesAmount = employeesAmount.find(item => companyData?.employees_amount === item.id);

  const basicLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBRo59C4lpyB_h0LvmiSSZjOrgSMAwaz-mRw&usqp=CAU';
  const basicCompanyPhoto = 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png';

  const goToCompanyEditorScreen = () => {
    replace({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: undefined,
    });
  };

  const goToNoCompanyScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'NoCompanyScreen',
    });
  };

/*   const setOptions = () => {
    router.push({
      stack: 'CandidatesStack',
      screen: 'ProfileScreen',
      params: { subView: 'options' }
    });
  };
 */
  const goToPointsScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'PointsScreen',
    });
  };

  return (
    <ScreenHeaderProvider
      transparent
      /* actions={[{
        icon: 'threeDots',
        onPress: setOptions,
      }]} */
      headerItemsColor={isHeaderTransparent ? Colors.White : Colors.Black}
      backgroundHeader={isHeaderTransparent ? 'rgba(0, 0, 0, .3)' : Colors.White}
      title='Kandydat CV'
      otherActions={<View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
        <Menu>
          <MenuTrigger>
            <SvgIcon
              /* icon={!candidateMark ? 'cardOutlined' : 'cardFilled'} */
              icon={'cardOutlined'}
              /*               fill={!candidateMark ? Colors.Basic900 : marksData.find(e => e.id === candidateMark)?.color} */
              fill={Colors.Basic900}
              style={{ transform: [{ scale: 1.5 }] }}
            />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ marginLeft: -30, marginTop: -10 }}>
            {/* {marksData.map(({ color, title, id }) => (
              <MenuOption style={styles.menuOption} onSelect={() => setCandidateMark(id)}>
                <SvgIcon
                  style={{ marginRight: 8, alignSelf: 'center' }}
                  icon="cardFilled"
                  fill={color}
                />
                <Typography weight='Bold'>{title}</Typography>
              </MenuOption>
            ))} */}
            {/* <MenuOption style={styles.menuOption}
              onSelect={() => setCandidateMark(null)}>
              <SvgIcon
                fill={Colors.Danger}
                style={{ marginRight: 12, marginLeft: 5, alignSelf: 'center' }}
                icon="crossBig"
              />
              <Typography weight='Bold' color={Colors.Danger}>Usuń ocenę</Typography>
            </MenuOption> */}
          </MenuOptions>
        </Menu >
        <Button
          variant='TouchableOpacity'
          style={{ marginHorizontal: 16 }}
        /* onPress={() => setOpenNotes(true)} */
        >
          <SvgIcon icon="pinBig" />
        </Button>
      </View >}
    >
      <View></View>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.Basic100,
    flex: 1,
  },
  Carousel: {
    width: '100%',
    aspectRatio: '3/2',
    height: undefined,
  },
  CarouselImageContainer: {
    width: '100%',
    aspectRatio: '3/2',
    height: undefined,
    backgroundColor: Colors.Basic500,
  },
  CarouselImage: {
    height: '100%',
    width: 'auto',
  },
  BasicCompanyData: {
    marginTop: 30, paddingHorizontal: 19
  },
  CompanyLogo: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  IndustryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  IndustryLogoContainer: {
    width: 34,
    height: 34,
    position: 'relative'
  },
  Skeleton: {
    width: 34,
    height: 34,
    borderRadius: 17
  },
  CompanyAmountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
    gap: 8,
    marginTop: 20,
  },
  CompanyAmounts: {
    height: 60,
    backgroundColor: Colors.Basic300,
    borderRadius: 4,
    minWidth: 160,
    width: '40%',
    justifyContent: 'center',
  },
  CategoryHeader: {
    marginTop: 15,
    marginHorizontal: 19,
  },
  AccordionText: {
    marginHorizontal: 19,
    color: Colors.Basic600,
    marginBottom: 16,
  },
  SocialMedia: {
    marginLeft: 16,
    marginRight: 19,
    flexDirection: 'row',
    gap: 24,
    marginTop: 20,
    alignItems: 'center'
  },
  LinkedInIcon: {
    borderWidth: 2,
    borderColor: Colors.Blue500,
    borderRadius: 4,
    padding: 1,
  },
  Languages: {
    marginTop: 32,
  },
  SnackbarWrapper: {
    zIndex: 9999999,
    backgroundColor: 'transparent',
    maxWidth: 768,
    height: 70,
  },
  Snackbar: {
    backgroundColor: Colors.Green500,
    padding: 0,
    margin: 0,
    borderRadius: 0,
    boxShadow: 'none',
  },
  SnackbarContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.Green500,
    transform: 'translateY(-5px)',
  },
  Points: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  ExchangePointsButton: {
    width: 'auto',
    alignSelf: 'flex-end',
    height: 26,
    marginRight: -19,
  },
});

export default ProfileScreen;
