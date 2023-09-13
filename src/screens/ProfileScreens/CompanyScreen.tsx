import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
import { RootStackParamList } from '../../navigators/RootNavigator';
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

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'CompanyScreen'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const CompanyScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  // const [routes] = useState<TabbarRoute[]>([
  //   { key: '0', title: 'O firmie' },
  //   { key: '1', title: 'Opinie' },
  // ]);
  const dispatch = useDispatch();
  const [tabbarIndex, setTabbarIndex] = useState(0);
  const { setSwipeablePanelProps, setUserCompany } = useActions();
  const { userCompany, token, jobIndustries } = useTypedSelector(state => state.general);
  const [companyData, setCompanyData] = useState<CompanyDataType | null>(userCompany || companyExample);

  const moreOptionsHandler = () => {
    setSwipeablePanelProps({
      title: 'Czy chcesz usunąć tę firmę?',
      buttons: [
        {
          children: 'Edytuj',
          onPress: () => navigation.navigate("AddCompanyScreen", { editMode: true }),
        },
        {
          children: 'Usuń',
          contentVariant: 'h5',
          contentColor: Colors.Danger,
          noCloseAction: true,
          onPress: () => setSwipeablePanelProps({
            title: 'Naprawdę chcesz usunąć?',
            buttons: [
              {
                children: 'TAK',
                contentWeight: 'SemiBold',
                contentColor: Colors.Danger,
                noCloseAction: true,
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
    <ScreenHeaderProvider currentStack="ProfileStack" transparent
      actions={userCompany ? [{
        icon: 'moreVert',
        onPress: moreOptionsHandler,
      }] : []}
    >
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        {companyData && <>
          <MainDataCard {...companyData} />
          {/* <TabbarMenu
          navigationState={{ index: tabbarIndex, routes }}
          onIndexChange={setTabbarIndex}
          renderScene={SceneMap({ 0: () => null, 1: () => null })}
        /> */}
          <View>{{
            0: <AboutCard {...companyData} />,
            // 1: <OpinionCard />
          }[tabbarIndex]}</View>
        </>}
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({});

export default CompanyScreen;
