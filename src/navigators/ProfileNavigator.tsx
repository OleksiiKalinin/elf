import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/ProfileScreens/MainScreen';
import CompanyScreen from '../screens/ProfileScreens/CompanyScreen';
import AccountDataScreen from '../screens/ProfileScreens/AccountDataScreen';
import PaymentScreen from '../screens/ProfileScreens/PaymentScreen';
import EditPaymentScreen from '../screens/ProfileScreens/EditPaymentScreen';
import AddPaymentScreen from '../screens/ProfileScreens/AddPaymentScreen';
import NotificationScreen from '../screens/ProfileScreens/NotificationScreen';
import PrivacyScreen from '../screens/ProfileScreens/PrivacyScreen';
import SendingOffers from '../screens/ProfileScreens/permissions/SendingOffers';
import ShareLocation from '../screens/ProfileScreens/permissions/ShareLocation';
import ShareContacts from '../screens/ProfileScreens/permissions/ShareContacts';
import ShareCamera from '../screens/ProfileScreens/permissions/ShareCamera';
import RODO from '../screens/ProfileScreens/permissions/RODO';
import CookieScreen from '../screens/ProfileScreens/CookieScreen';
import HelpCenterScreen from '../screens/ProfileScreens/HelpCenterScreen';
import CreateCompanyProfile from '../screens/ProfileScreens/helpcenter hints/CreateCompanyProfile';
import AddAdvert from '../screens/ProfileScreens/helpcenter hints/AddAdvert';
import AddCall from '../screens/ProfileScreens/helpcenter hints/AddCall';
import Register from '../screens/ProfileScreens/helpcenter hints/Register';
import PaymentMethods from '../screens/ProfileScreens/helpcenter hints/PaymentMethods';
import AddEvent from '../screens/ProfileScreens/helpcenter hints/AddEvent';
import PointsScreen from '../screens/ProfileScreens/PointsScreen';
import AddCompanyScreen from '../screens/ProfileScreens/AddCompanyScreen';
import JobScreen from '../screens/ProfileScreens/JobScreen';
import JobCategoryScreen from '../screens/ProfileScreens/JobCategoryScreen';
import LanguageScreen from '../screens/ProfileScreens/LanguageScreen';
import MapScreen from '../screens/ProfileScreens/MapScreen';
import MethodsScreen from '../screens/ProfileScreens/MethodsScreen';
import ToolsScreen from '../screens/ProfileScreens/ToolsScreen';
import { AddressType, CompanyDataType, ContactPersonType } from '../store/reducers/types';
import AddConractPersonsScreen from '../screens/ProfileScreens/AddConractPersonsScreen';
import NoCompanyScreen from '../screens/ProfileScreens/NoCompanyScreen';
import CompanyDescriptionScreen from '../screens/ProfileScreens/CompanyDescriptionScreen';
import CompanyInvoiceScreen from '../screens/ProfileScreens/CompanyInvoiceScreen';
import PackagesScreen from '../screens/ProfileScreens/PackagesScreen';
import SettingsScreen from '../screens/ProfileScreens/SettingsScreen';
import PaymentTemporalScreen from '../screens/ProfileScreens/PaymentTemporalScreen';

export type ProfileStackParamList = {
  MainScreen: undefined,
  PaymentTemporalScreen: undefined,
  AddCompanyScreen: {editMode: boolean};
  NoCompanyScreen: undefined;
  CompanyScreen: undefined | { index: number };
  PackagesScreen: undefined;
  SettingsScreen: undefined,
  AccountDataScreen: undefined,
  PaymentScreen: undefined,
  EditPaymentScreen: undefined,
  AddPaymentScreen: undefined,
  NotificationScreen: undefined,
  PrivacyScreen: undefined,
  PointsScreen: undefined,
  JobScreen: { index: any, languages: any, category: any, subcategories: any, methods: any, tools: any };
  JobCategoryScreen: { callback: (id: number) => void };
  LanguageScreen: undefined | { languages: any, category: any, subcategories: any, methods: any, tools: any };
  MethodsScreen: undefined | { category: any, subcategories: any, languages: any, methods: any, tools: any };
  ToolsScreen: undefined | { category: any, subcategories: any, languages: any, methods: any, tools: any };
  MapScreen: { callback: (address: AddressType) => void, initialAddress: AddressType | null },
  SendingOffers: undefined,
  RODO: undefined,
  ShareCamera: undefined,
  ShareContacts: undefined,
  ShareLocation: undefined,
  CookieScreen: undefined,
  HelpCenterScreen: undefined,
  CreateCompanyProfile: undefined,
  AddAdvert: undefined,
  AddCall: undefined,
  AddEvent: undefined,
  PaymentMethods: undefined,
  Register: undefined,
  AddConractPersonsScreen: {
    contactPersons: ContactPersonType[], 
    setContactPersons: React.Dispatch<React.SetStateAction<ContactPersonType[]>>, 
    companyData: CompanyDataType,
    changeCompanyDataHandler: (name: keyof CompanyDataType, value: string | number | AddressType, replaceSpaces?: boolean) => void
  },
  CompanyDescriptionScreen: {description: string | null, callback: (p: string) => void, title?: string},
  CompanyInvoiceScreen: {
    address: AddressType | null, 
    NIP: string | null, 
    full_name: string | null,
    title?: string,
    callback: (address: AddressType | null, NIP: string, full_name: string ) => void, 
  }
}

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen
      name="MainScreen"
      component={() => null}
    />
      {/* <ProfileStack.Screen name="MainScreen" component={MainScreen} />
      <ProfileStack.Screen name="CompanyScreen" component={CompanyScreen} />
      <ProfileStack.Screen name="AccountDataScreen" component={AccountDataScreen} />
      <ProfileStack.Screen name="AddConractPersonsScreen" component={AddConractPersonsScreen} />
      <ProfileStack.Screen name="NoCompanyScreen" component={NoCompanyScreen} />
      <ProfileStack.Screen name="CompanyDescriptionScreen" component={CompanyDescriptionScreen} />
      <ProfileStack.Screen name="CompanyInvoiceScreen" component={CompanyInvoiceScreen} />
      <ProfileStack.Screen name="PackagesScreen" component={PackagesScreen} />
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <ProfileStack.Screen name="PaymentScreen" component={PaymentScreen} />
      <ProfileStack.Screen name="EditPaymentScreen" component={EditPaymentScreen} />
      <ProfileStack.Screen name="AddPaymentScreen" component={AddPaymentScreen} />
      <ProfileStack.Screen name="NotificationScreen" component={NotificationScreen} />
      <ProfileStack.Screen name="PrivacyScreen" component={PrivacyScreen} />
      <ProfileStack.Screen name="PointsScreen" component={PointsScreen} />
      <ProfileStack.Screen name="AddCompanyScreen" component={AddCompanyScreen} />
      <ProfileStack.Screen name="SendingOffers" component={SendingOffers} />
      <ProfileStack.Screen name="RODO" component={RODO} />
      <ProfileStack.Screen name="ShareCamera" component={ShareCamera} />
      <ProfileStack.Screen name="ShareContacts" component={ShareContacts} />
      <ProfileStack.Screen name="ShareLocation" component={ShareLocation} />
      <ProfileStack.Screen name="CookieScreen" component={CookieScreen} />
      <ProfileStack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
      <ProfileStack.Screen name="LanguageScreen" component={LanguageScreen} />
      <ProfileStack.Screen name="MapScreen" component={MapScreen} />
      <ProfileStack.Screen name="CreateCompanyProfile" component={CreateCompanyProfile} />
      <ProfileStack.Screen name="AddAdvert" component={AddAdvert} />
      <ProfileStack.Screen name="AddCall" component={AddCall} />
      <ProfileStack.Screen name="AddEvent" component={AddEvent} />
      <ProfileStack.Screen name="PaymentMethods" component={PaymentMethods} />
      <ProfileStack.Screen name="Register" component={Register} />
      <ProfileStack.Screen name="JobScreen" component={JobScreen}/>
      <ProfileStack.Screen name="JobCategoryScreen" component={JobCategoryScreen}/>
      <ProfileStack.Screen name="MethodsScreen" component={MethodsScreen} />
      <ProfileStack.Screen name="ToolsScreen" component={ToolsScreen} />
      <ProfileStack.Screen name="PaymentTemporalScreen" component={PaymentTemporalScreen} /> */}
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;