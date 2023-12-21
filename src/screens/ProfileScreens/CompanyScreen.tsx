import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Colors from '../../colors/Colors';
import { SceneMap } from 'react-native-tab-view';
import { nativeStore } from '../../store';
import { advertActionTypes, companyActionTypes } from '../../store/actions';
import AboutCard from './CompanyScreenRoutes/AboutCard/AboutCard';
import OpinionCard from './CompanyScreenRoutes/OpinionCard/OpinionCard';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CompanyDataType, MediaType, ContactPersonType } from '../../store/reducers/types';
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

const companyExample: CompanyDataType = {
  account_facebook: null,
  account_instagram: null,
  account_twitter: null,
  account_youtube: null,
  contact_hours: "08:05-14:25",
  employees_amount: "61-80",
  full_decription: "nullllll",
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
  website: null
};

const CompanyScreen: React.FC = () => {
  const [routes] = useState<TabbarRoute[]>([
    { key: '0', title: 'O firmie' },
    { key: '1', title: 'Opinie' },
  ]);
  const dispatch = useTypedDispatch();
  const [tabbarIndex, setTabbarIndex] = useState(0);
  const { setSwipeablePanelProps, setUserCompany } = useActions();
  const { userCompany, token, jobIndustries } = useTypedSelector(state => state.general);
  const [companyData, setCompanyData] = useState<CompanyDataType | null>(userCompany || companyExample);
  const router = useRouter();

  const goToCompanyEditorScreen = () => {
    router.push({ stack: 'ProfileStack', screen: 'CompanyEditorScreen', params: { editMode: 'false' } });
  };

  const moreOptionsHandler = () => {
    setSwipeablePanelProps({
      title: 'Czy chcesz usunąć tę firmę?',
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
                  // (async () => {
                  //   if (companyData?.id) {
                  //     const isOk = await dispatch(companyServices.deleteUserCompany(companyData.id, token));
                  //     if (!!isOk) {
                  //       setSwipeablePanelProps({
                  //         title: 'Firma została usunięta!',
                  //         closeButton: false,
                  //         buttons: [
                  //           {
                  //             children: 'OK',
                  //             onPress: () => { }
                  //           }
                  //         ]
                  //       });
                  //       navigation.navigate('NoCompanyScreen');
                  //     }
                  //   }
                  // })();
                }
              }
            ]
          }),
        },
      ]
    })
  }

  useEffect(() => {
    console.log(JSON.stringify(userCompany, null, 4));
    if (userCompany) setCompanyData(userCompany);
  }, [userCompany]);

  return (
    <ScreenHeaderProvider transparent
      actions={userCompany ? [{
        icon: 'threeDots',
        onPress: moreOptionsHandler,
      }] : []}
      headerItemsColor={Colors.White}
    >
      <ScrollView style={{ backgroundColor: Colors.Basic100, flex: 1 }}>
        {companyData &&
          <>
            {companyData.photos?.length &&
              <Carousel
                // innerPagination
                data={companyData.photos}
                style={{ width: '100%', aspectRatio: '3/2', height: undefined }}
                renderItem={({ index, item }) => (
                  <View style={{ width: '100%', aspectRatio: '3/2', height: undefined, backgroundColor: Colors.Basic500 }}>
                    <Image
                      // resizeMode={'contain'}
                      source={item.path}
                      style={{ height: '100%', width: 'auto' }}
                    />
                  </View>
                )}
              />}
            <MainDataCard {...companyData} />
            <Typography variant='h5' weight='Bold' style={[styles.CategoryHeader, { marginTop: 40 }]}>
              O firmie
            </Typography>
            <View style={styles.CompanyAmountsContainer}>
              <View style={styles.CompanyAmounts}>
                <Typography size={20} weight='Bold' textAlign='center'>
                  6-8{companyData.employees_amount}
                </Typography>
                <Typography textAlign='center'>
                  Liczba pracowników
                </Typography>
              </View>
              <View style={styles.CompanyAmounts}>
                <Typography size={20} weight='Bold' textAlign='center'>
                  50 - 100 m2{companyData.employees_amount}
                </Typography>
                <Typography textAlign='center'>
                  Metraż miejsca pracy
                </Typography>
              </View>
            </View>
            <Separator marginTop={16}/>
            <Typography variant='h5' weight='Bold' style={[styles.CategoryHeader, { marginTop: 40 }]}>
              O firmie
            </Typography>





            {/* <TabbarMenu
              navigationState={{ index: tabbarIndex, routes }}
              onIndexChange={setTabbarIndex}
              renderScene={SceneMap({ 0: () => null, 1: () => null })}
            />
            <View>{{
              0:
                <>
                  
                </>,
              1: <OpinionCard />
            }[tabbarIndex]}
            </View> */}
          </>
        }
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  CompanyAmountsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 19,
    gap: 8,
    marginTop: 20
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
  }
});

export default CompanyScreen;
