import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
import Colors from '../colors/Colors';
import { SceneMap } from 'react-native-tab-view';
import { nativeStore } from '../store';
import { advertActionTypes, companyActionTypes } from '../store/actions';
import AboutCard from './ProfileScreens/CompanyScreenRoutes/AboutCard/AboutCard';
import OpinionCard from './ProfileScreens/CompanyScreenRoutes/OpinionCard/OpinionCard';
import { ProfileStackParamList } from '../navigators/ProfileNavigator';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import { AddressType } from '../store/reducers/types';
import Button from '../components/molecules/Button';
import useRouter from '../hooks/useRouter';

export type CompanyInvoiceScreenProps = {
  address: AddressType | null,
  NIP: string | null,
  full_name: string | null,
  title?: string,
  callback: (address: AddressType | null, NIP: string, full_name: string) => void,
};

const CompanyInvoiceScreen: React.FC<CompanyInvoiceScreenProps> = (props) => {
  const { callback, address: initAddress, NIP: initNIP, full_name: initFull_name, title } = props;
  const [address, setAddress] = useState<AddressType | null>(initAddress);
  const [NIP, setNIP] = useState<string>(initNIP || '');
  const [full_name, setFull_name] = useState<string>(initFull_name || '');
  const { backToRemoveParams } = useRouter();

  return (
    <ScreenHeaderProvider title={title}>
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
          {/* <SmallMap
            label='Adres do faktury'
            place={address?.formattedAddress}
            onPress={() => navigation.navigate('MapScreen', {
              callback: setAddress,
              initialAddress: address
            })}
          /> */}
        </View>
        {/* {companyData.main_address && <View style={{ marginHorizontal: 19, marginBottom: 15 }}>
          <TextField
            label="Numer mieszkania/biura (opcjonalne)"
          // value={companyData.full_name || ''}
          // onChangeText={text => changeCompanyDataHandler('full_name', text, false)}
          />
        </View>} */}
      </ScrollView>
      <Button
        onPress={() => {
          callback(address, NIP, full_name);
          backToRemoveParams();
        }}
      >
        Zapisz
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({});

export default CompanyInvoiceScreen;