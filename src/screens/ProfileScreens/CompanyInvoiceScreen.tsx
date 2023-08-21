import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { ScrollView } from 'native-base';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import TabbarMenu, {
  TabbarRoute,
} from '../../components/organisms/TabbarMenu/TabbarMenu';
import { SceneMap } from 'react-native-tab-view';
import { store } from '../../store';
import { advertActionTypes, companyActionTypes } from '../../store/actions';
import AboutCard from './CompanyScreenRoutes/AboutCard/AboutCard';
import OpinionCard from './CompanyScreenRoutes/OpinionCard/OpinionCard';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Carousel from '../../components/organisms/Carousel/Carousel';
import TextField from '../../components/molecules/TextField/TextField';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import { AddressType } from '../../store/reducers/types';
import SmallMap from '../../components/organisms/SmallMap/SmallMap';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'CompanyInvoiceScreen'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const CompanyInvoiceScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const { callback, address: initAddress, NIP: initNIP, full_name: initFull_name, title } = route.params;
  const [address, setAddress] = useState<AddressType | null>(initAddress);
  const [NIP, setNIP] = useState<string>(initNIP || '');
  const [full_name, setFull_name] = useState<string>(initFull_name || '');

  return (
    <ScreenHeaderProvider currentStack="ProfileStack" title={title}>
      <ScrollView style={{ backgroundColor: Colors.Basic100, flex: 1 }} contentContainerStyle={{paddingTop: 24}}>
        <View style={{marginBottom: 10, paddingHorizontal: 19}}>
          <TextField
            label="Nazwa firmy"
            value={full_name}
            onChangeText={setFull_name}
          />
        </View>
        <View style={{marginBottom: 10, paddingHorizontal: 19}}>
          <TextField
            label="NIP"
            value={NIP}
            onChangeText={setNIP}
          />
        </View>
        <View style={{marginBottom: 24, paddingHorizontal: 19}}>
          <TextField
            label="Kod pocztowy"
            value={NIP}
            onChangeText={setNIP}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <SmallMap
            label='Adres do faktury'
            place={address?.formattedAddress}
            onPress={() => navigation.navigate('MapScreen', {
              callback: setAddress,
              initialAddress: address
            })}
          />
        </View>
        {/* {companyData.main_address && <View style={{ marginHorizontal: 19, marginBottom: 15 }}>
          <TextField
            label="Numer mieszkania/biura (opcjonalne)"
          // value={companyData.full_name || ''}
          // onChangeText={text => changeCompanyDataHandler('full_name', text, false)}
          />
        </View>} */}
      </ScrollView>
      <ButtonRipple
        onPress={() => {
          callback(address, NIP, full_name);
          navigation.goBack();
        }}
      >
        Zapisz
      </ButtonRipple>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({});

export default CompanyInvoiceScreen;
