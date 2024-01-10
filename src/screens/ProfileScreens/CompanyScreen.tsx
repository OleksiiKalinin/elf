import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import Colors from '../../colors/Colors';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CompanyDataType, LanguageType } from '../../store/reducers/types';
import companyServices from '../../services/companyServices';
import MainDataCard from './CompanyScreenRoutes/MainDataCard/MainDataCard';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createParam } from 'solito';
import { InitialPropsFromParams } from '../../hooks/types';
import { Snackbar } from 'react-native-paper';
import Button from '../../components/molecules/Button';
import { Skeleton, SkeletonContainer } from 'react-native-skeleton-component';
import SvgUriImage from '../../components/atoms/SvgUriImage';

const companyExample: CompanyDataType = {
  id: -1,
  account_facebook: 'www.google.pl',
  account_instagram: 'www.google.pl',
  account_linkedIn: 'www.google.pl',
  employees_amount: '15',
  description: `Prowadzimy kameralną restaurację w centrum Wrocławia, w której serwujemy oryginalne dania kuchni włoskiej. Przyrządzając je wyłącznie z wysokiej jakości składników, pozwalamy naszym klientom odkrywać wyjątkowe smaki Półwyspu Apenińskiego.

  Zatrudniamy 12 wykwalifikowanych pracowników, którzy dbają nie tylko o profesjonalną obsługę, lecz również odpowiednią atmosferę. Oferujemy usługi cateringowe, umożliwiając zamawianie jedzenia za pomocą najpopularniejszych aplikacji kurierskich.
  `,
  full_name: "blablablabla",
  nip: '777-888-88-11',
  job_industry: 3,
  main_address: {
    adminArea: "Podlaskie",
    country: "Polska",
    countryCode: "PL",
    flat_number: null,
    formattedAddress: "Wigry 11, 16-402 Suwałki, Polska",
    locale: "pl",
    locality: "Suwałki",
    position: {
      lat: 54.0690485,
      lng: 23.0864083
    },
    postalCode: "16-402",
    streetName: null,
    streetNumber: null,
    subAdminArea: "Powiat suwalski",
    subLocality: null
  },
  other_address: {
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
  short_name: "Firma testowa",
  square_footage: '50 - 100',
  website: 'www.google.pl',
  contactPersons: null,
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
};

const services: LanguageType[] = [
  {
    id: 1,
    name: 'Manicure',
  },
  {
    id: 2,
    name: 'Pedicure',
  },
  {
    id: 3,
    name: 'Przedłużanie rzęs',
  },
  {
    id: 4,
    name: 'Regulacja i henna brwi',
  },
  {
    id: 5,
    name: 'Zabiegi na twarz',
  },
  {
    id: 6,
    name: 'Zabiegi na ciało',
  },
  {
    id: 7,
    name: 'Usługi fryzjerskie',
  },
];

const languages: LanguageType[] = [
  {
    id: 1,
    name: 'Polski',
  },
  {
    id: 2,
    name: 'Angielski',
  },
  {
    id: 3,
    name: 'Włoski',
  },
  {
    id: 4,
    name: 'Francuski',
  },
  {
    id: 5,
    name: 'Ukraiński',
  },
  {
    id: 6,
    name: 'Hiszpański',
  },
  {
    id: 7,
    name: 'Niemiecki',
  },
];

type InitialParams = NonNullable<ProfileStackParamList['default']['CompanyScreen']>;

const { useParam } = createParam<NonNullable<ProfileStackParamList['default']['CompanyScreen']>>();

const CompanyScreen: React.FC<InitialPropsFromParams<InitialParams>> = ({ newProfileInitial }) => {
  const dispatch = useTypedDispatch();
  const { setSwipeablePanelProps } = useActions();
  const { userCompany } = useTypedSelector(state => state.general);
  const [companyData, setCompanyData] = useState<CompanyDataType | null>(userCompany || companyExample);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [languagesExpanded, setLanguagesExpanded] = useState(false);
  const [carouselHeight, setCarouselHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);
  const [snackbar, setSnackbar] = React.useState(false);
  const router = useRouter();
  const { replace } = useRouter();
  const [subView] = useParam('subView');
  const [newProfile] = useParam('newProfile', { initial: newProfileInitial });

  const { jobIndustries } = useTypedSelector(state => state.general);
  const currentIndustry = jobIndustries.find(curr => curr.id === companyData?.job_industry) || null;

  useEffect(() => {
    if (newProfile) {
      setSnackbar(true);
      replace({
        stack: 'ProfileStack',
        screen: 'CompanyScreen',
        params: undefined,
      });
    };
  }, [newProfile]);

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
    if (userCompany) setCompanyData(userCompany);
  }, [userCompany]);

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
                          setSwipeablePanelProps({
                            title: 'Firma została usunięta!',
                            closeButton: false,
                            buttons: [
                              {
                                children: 'OK',
                                onPress: () => { }
                              }
                            ]
                          });
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

  const setOptions = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyScreen',
      params: { subView: 'options' }
    });
  };

  const goToPointsScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'PointsScreen',
    });
  };

  return (
    <ScreenHeaderProvider
      transparent
      actions={userCompany ? [{
        icon: 'threeDots',
        onPress: setOptions,
      }] : []}
      headerItemsColor={isHeaderTransparent ? Colors.White : Colors.Black}
      backgroundHeader={isHeaderTransparent ? 'rgba(0, 0, 0, .3)' : Colors.White}
    >
      <ScrollView
        style={styles.ScrollView}
        onScroll={handleScroll}
      >
        {companyData &&
          <>
            {companyData.photos?.length &&
              <Carousel
                data={companyData.photos.map(item => item.path)}
                style={styles.Carousel}
                renderItem={({ item }) => (
                  <View
                    style={styles.CarouselImageContainer}
                    onLayout={handleLayout}
                  >
                    <Image
                      source={{ uri: item }}
                      style={styles.CarouselImage}
                    />
                  </View>
                )}
              />
            }
            <View style={styles.BasicCompanyData}>
              <View style={styles.IndustryContainer}>
                <View style={styles.IndustryLogoContainer}>
                  <View style={{ position: 'absolute' }}>
                    <SkeletonContainer animation='wave' speed={600}>
                      <Skeleton style={styles.Skeleton} />
                    </SkeletonContainer>
                  </View>
                  {currentIndustry?.icon && <SvgUriImage width={34} height={34} src={currentIndustry?.icon} />}
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Typography variant='h5' weight='SemiBold'>{currentIndustry?.name}</Typography>
                </View>
              </View>
              <Typography size={20} weight='Bold'>{companyData?.short_name}</Typography>
              <Typography color={Colors.Basic600}>{companyData?.other_address?.formattedAddress}</Typography>
            </View>
            {(companyData.employees_amount || companyData.square_footage) &&
              <>
                <Typography variant='h5' weight='Bold' style={[styles.CategoryHeader, { marginTop: 40 }]}>
                  O firmie
                </Typography>
                <View style={styles.CompanyAmountsContainer}>
                  {companyData.employees_amount &&
                    <View style={styles.CompanyAmounts}>
                      <Typography size={20} weight='Bold' textAlign='center'>
                        {companyData.employees_amount}
                      </Typography>
                      <Typography textAlign='center'>
                        Liczba pracowników
                      </Typography>
                    </View>
                  }
                  {companyData.square_footage &&
                    <View style={styles.CompanyAmounts}>
                      <Typography size={20} weight='Bold' textAlign='center'>
                        {companyData.square_footage} m²
                      </Typography>
                      <Typography textAlign='center'>
                        Metraż miejsca pracy
                      </Typography>
                    </View>
                  }
                </View>
              </>
            }
            <Separator marginTop={(companyData.employees_amount || companyData.square_footage) ? 16 : 30} />
            {companyData.description &&
              <>
                <Accordion
                  onPress={() => setDescriptionExpanded(prev => !prev)}
                  expanded={descriptionExpanded}
                  title={
                    <Typography variant='h5' weight={descriptionExpanded ? 'Bold' : 'Medium'}>
                      Opis firmy
                    </Typography>
                  }
                >
                  <Typography variant='h5' style={styles.AccordionText}>
                    {companyData.description}
                  </Typography>
                </Accordion>
                <Separator />
              </>
            }
            {companyData.services &&
              <>
                <Accordion
                  onPress={() => setServicesExpanded(prev => !prev)}
                  expanded={servicesExpanded}
                  title={
                    <Typography variant='h5' weight={servicesExpanded ? 'Bold' : 'Medium'}>
                      Usługi
                    </Typography>
                  }
                >
                  {services.filter(item => companyData.services?.includes(item.id)).map(({ id, name }) =>
                    <Typography key={id} style={styles.AccordionText}>
                      {name}
                    </Typography>
                  )}
                </Accordion>
                <Separator />
              </>
            }
            {companyData.certificates &&
              <>
                <Typography variant='h5' weight='Bold' style={[styles.CategoryHeader, { marginTop: 24 }]}>
                  Certyfikaty
                </Typography>
                <Carousel
                  data={companyData.certificates.map(item => item.path)}
                  style={[styles.Carousel, { marginTop: 16 }]}
                  renderItem={({ item }) => (
                    <View style={styles.CarouselImageContainer}>
                      <Image
                        resizeMode={'contain'}
                        source={{ uri: item }}
                        style={styles.CarouselImage}
                      />
                    </View>
                  )}
                />
              </>
            }
            {(companyData.account_instagram || companyData.account_facebook || companyData.account_linkedIn || companyData.website) &&
              <>
                <Typography variant='h5' weight='Bold' style={[styles.CategoryHeader, { marginTop: 24 }]}>
                  Social media
                </Typography>
                <View style={styles.SocialMedia}>
                  {companyData.account_instagram &&
                    <TouchableOpacity
                      onPress={() => Linking.openURL(companyData.account_instagram as string)}
                      activeOpacity={.5}
                      style={{ cursor: 'pointer' }}
                    >
                      <SvgIcon icon={'instagram'} fill={Colors.Blue500} />
                    </TouchableOpacity>
                  }
                  {companyData.account_facebook &&
                    <TouchableOpacity
                      onPress={() => Linking.openURL(companyData.account_facebook as string)}
                      activeOpacity={.5}
                      style={{ cursor: 'pointer' }}
                    >
                      <SvgIcon icon={'facebook'} fill={Colors.Blue500} />
                    </TouchableOpacity>
                  }
                  {companyData.website &&
                    <TouchableOpacity
                      onPress={() => Linking.openURL(companyData.website as string)}
                      activeOpacity={.5}
                      style={{ cursor: 'pointer' }}
                    >
                      <SvgIcon icon={'internet'} fill={Colors.Blue500} />
                    </TouchableOpacity>
                  }
                </View>
              </>
            }
            {companyData.languages &&
              <View style={styles.Languages}>
                <Separator />
                <Accordion
                  onPress={() => setLanguagesExpanded(prev => !prev)}
                  expanded={languagesExpanded}
                  title={
                    <Typography variant='h5' weight={languagesExpanded ? 'Bold' : 'Medium'}>
                      Preferowane języki w komunikacji
                    </Typography>
                  }
                >
                  {languages.filter(item => companyData.languages?.includes(item.id)).map(({ id, name }) =>
                    <Typography key={id} style={styles.AccordionText}>
                      {name}
                    </Typography>
                  )}
                </Accordion>
                <Separator />
              </View>
            }
          </>
        }
      </ScrollView>
      <Snackbar
        visible={snackbar}
        duration={5000}
        onDismiss={() => setSnackbar(false)}
        wrapperStyle={[
          styles.SnackbarWrapper,
          { position: Platform.OS === 'web' ? 'fixed' : 'absolute' },
        ]}
        style={styles.Snackbar}>
        <View style={styles.SnackbarContent}>
          <View>
            <Typography size={18} weight={'Bold'} style={{ color: Colors.White50 }}>
              Stworzone!
            </Typography>
            <View style={styles.Points}>
              <Typography size={24} weight={'Bold'} style={{ color: Colors.White }}>
                100
              </Typography>
              <Typography size={14} weight={'Bold'} style={{ color: Colors.White }}>
                pkt
              </Typography>
            </View>
          </View>
          <Button
            onPress={() => goToPointsScreen()}
            variant='text'
            hoverColor='none'
            style={styles.ExchangePointsButton}
          >
            <Typography size={18} weight={'Bold'} style={{ color: Colors.Blue500 }}>
              Wymień punkty
            </Typography>
          </Button>
        </View>
      </Snackbar>
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
  IndustryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
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
  },
  Languages: {
    marginTop: 32,
    marginBottom: 100,
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

export default CompanyScreen;
