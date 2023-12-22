import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, Platform } from 'react-native';
import Colors from '../../colors/Colors';
import { SceneMap } from 'react-native-tab-view';
import { nativeStore } from '../../store';
import AboutCard from './CompanyScreenRoutes/AboutCard/AboutCard';
import OpinionCard from './CompanyScreenRoutes/OpinionCard/OpinionCard';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CompanyDataType, MediaType, ContactPersonType, LanguageType } from '../../store/reducers/types';
import { useDispatch } from 'react-redux';
import generalServices from '../../services/generalServices';
import { baseURL } from '../../services';
import companyServices from '../../services/companyServices';
import MainDataCard from './CompanyScreenRoutes/MainDataCard/MainDataCard';
import SvgIcon from '../../components/atoms/SvgIcon';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import useRouter from '../../hooks/useRouter';
import { ScrollView } from '../../components/molecules/ScrollView';
import Carousel from '../../components/organismes/Carousel';
import TabbarMenu, { TabbarRoute } from '../../components/organismes/TabbarMenu';
import Typography from '../../components/atoms/Typography';
import { Separator } from 'tamagui';
import Accordion from '../../components/molecules/Accordion';
import Button from '../../components/molecules/Button';
import { Linking } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createParam } from 'solito';

const companyExample: CompanyDataType = {
  id: -1,
  account_facebook: 'www.google.pl',
  account_instagram: 'www.google.pl',
  account_linkedIn: 'www.google.pl',
  contact_hours: "08:05-14:25",
  employees_amount: "61-80",
  full_decription: `Prowadzimy kameralną restaurację w centrum Wrocławia, w której serwujemy oryginalne dania kuchni włoskiej. Przyrządzając je wyłącznie z wysokiej jakości składników, pozwalamy naszym klientom odkrywać wyjątkowe smaki Półwyspu Apenińskiego.

  Zatrudniamy 12 wykwalifikowanych pracowników, którzy dbają nie tylko o profesjonalną obsługę, lecz również odpowiednią atmosferę. Oferujemy usługi cateringowe, umożliwiając zamawianie jedzenia za pomocą najpopularniejszych aplikacji kurierskich.
  `,
  full_name: "blablablabla",
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
  short_decription: "null",
  short_name: "Firma testowa",
  square_footage: null,
  website: 'www.google.pl',
  languages: [4, 5, 7],
  services: [4, 5, 7],
  photos: [
    {
      path: 'https://img.freepik.com/darmowe-zdjecie/biale-wnetrze-niewyrazne-krzeslo_1203-4272.jpg?2&w=740&t=st=1703256759~exp=1703257359~hmac=0625895100579764d94fdd94d98648b7687f3da1582ee9eca8f361465d1a72ed',
    },
    {
      path: 'https://img.freepik.com/darmowe-zdjecie/stol-z-kwiatami-w-doniczkach-w-restauracji_181624-24428.jpg?size=626&ext=jpg&uid=R72634302&semt=sph',
    },
    {
      path: 'https://img.freepik.com/darmowe-zdjecie/widok-z-boku-kucharz-robi-pyszne-makarony_23-2150690631.jpg?w=740&t=st=1703256778~exp=1703257378~hmac=bbe493ee21e71585841968eadc4956e5b7dcf9797e3d4fe22ce341cf83c14453',
    },
    {
      path: 'https://img.freepik.com/darmowe-zdjecie/wnetrze-restauracji_1127-3394.jpg?w=740&t=st=1703256915~exp=1703257515~hmac=b2d67622c95ac2b5120aeb938c2cdb5959a993eb71b3273d3fee992e6ceca9a2',
    },
    {
      path: 'https://img.freepik.com/darmowe-zdjecie/widok-z-boku-danie-flambeing-mezczyzna-szefa-kuchni_23-2148763217.jpg?w=740&t=st=1703256916~exp=1703257516~hmac=256216eb4df3a1af764260db0ef4655e86d60f7e35472b91628814b4b78dde9c',
    },
  ],
  certificates: [
    {
      path: 'https://img.freepik.com/darmowe-wektory/elegancki-swiadectwo-uznania_23-2147612119.jpg?w=740&t=st=1703257013~exp=1703257613~hmac=13e806aa65fb0f13893d7c55312fb41f43a31bf855197450978c5c15e0f84d96',
    },
    {
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

const { useParam } = createParam<NonNullable<ProfileStackParamList['default']['CompanyScreen']>>();

const CompanyScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { setSwipeablePanelProps, setUserCompany } = useActions();
  const { userCompany, token, jobIndustries } = useTypedSelector(state => state.general);
  const [companyData, setCompanyData] = useState<CompanyDataType | null>(/* userCompany || */ companyExample);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [languagesExpanded, setLanguagesExpanded] = useState(false);
  const router = useRouter();
  const [subView] = useParam('subView');

  useEffect(() => {
    setSwipeablePanelProps((() => {
      if (subView === 'options') return {
        title: 'Czy chcesz usunąć tę firmę?',
        closeButton: true,
        buttons: [
          {
            children: 'Edytuj',
            onPress: () => goToCompanyEditorScreen(),
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

  /*   useEffect(() => {
      console.log(JSON.stringify(userCompany, null, 4));
      if (userCompany) setCompanyData(userCompany);
    }, [userCompany]); */

  const goToCompanyEditorScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: { editMode: 'false' }
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

  return (
    <ScreenHeaderProvider 
      transparent
      actions={userCompany ? [{
        icon: 'threeDots',
        onPress: setOptions,
      }] : []}
      headerItemsColor={Colors.White}
    >
      <ScrollView style={{ backgroundColor: Colors.Basic100, flex: 1 }}>
        {companyData &&
          <>
            {companyData.photos?.length &&
              <Carousel
                data={companyData.photos.map(item => item.path)}
                style={{ width: '100%', aspectRatio: '3/2', height: undefined }}
                renderItem={({ item }) => (
                  <View style={{ width: '100%', aspectRatio: '3/2', height: undefined, backgroundColor: Colors.Basic500 }}>
                    <Image
                      source={{ uri: item }}
                      style={{ height: '100%', width: 'auto' }}
                    />
                  </View>
                )}
              />
            }
            <MainDataCard {...companyData} />
            <Typography variant='h5' weight='Bold' style={[styles.CategoryHeader, { marginTop: 40 }]}>
              O firmie
            </Typography>
            <View style={styles.CompanyAmountsContainer}>
              <View style={styles.CompanyAmounts}>
                <Typography size={20} weight='Bold' textAlign='center'>
                  {companyData.employees_amount}
                </Typography>
                <Typography textAlign='center'>
                  Liczba pracowników
                </Typography>
              </View>
              <View style={styles.CompanyAmounts}>
                <Typography size={20} weight='Bold' textAlign='center'>
                  {companyData.employees_amount}
                </Typography>
                <Typography textAlign='center'>
                  Metraż miejsca pracy
                </Typography>
              </View>
            </View>
            <Separator marginTop={16} />
            <Accordion
              onPress={() => setDescriptionExpanded(prev => !prev)}
              expanded={descriptionExpanded}
              title={
                <Typography variant='h5' weight={descriptionExpanded ? 'Bold' : 'Medium'}>
                  Opis firmy
                </Typography>
              }
            >
              <Typography variant='h5' style={{ marginHorizontal: 19, color: Colors.Basic600, marginBottom: 16 }}>
                {companyData.full_decription}
              </Typography>
            </Accordion>
            <Separator />
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
                  <Typography key={id} style={{ marginHorizontal: 19, color: Colors.Basic600, marginBottom: 16 }}>
                    {name}
                  </Typography>
                )}
              </Accordion>
              <Separator />
            </>

            {companyData.certificates &&
              <>
                <Typography variant='h5' weight='Bold' style={[styles.CategoryHeader, { marginTop: 24 }]}>
                  Certyfikaty
                </Typography>
                <Carousel
                  data={companyData.certificates.map(item => item.path)}
                  style={{ width: '100%', aspectRatio: '3/2', height: undefined, marginTop: 16 }}
                  renderItem={({ item }) => (
                    <View style={{ width: '100%', aspectRatio: '3/2', height: undefined, backgroundColor: Colors.Basic500 }}>
                      <Image
                        resizeMode={'contain'}
                        source={{ uri: item }}
                        style={{ height: '100%', width: 'auto' }}
                      />
                    </View>
                  )}
                />
              </>
            }
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
            {companyData.languages &&
              <View style={{ marginTop: 32, marginBottom: 100 }}>
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
                    <Typography key={id} style={{ marginHorizontal: 19, color: Colors.Basic600, marginBottom: 16 }}>
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
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
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
  SocialMedia: {
    marginLeft: 16,
    marginRight: 19,
    flexDirection: 'row',
    gap: 24,
    marginTop: 20,
  },
});

export default CompanyScreen;
