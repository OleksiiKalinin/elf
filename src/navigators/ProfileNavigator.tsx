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
import PointsScreen from '../screens/ProfileScreens/PointsScreen';
import CompanyEditorScreen from '../screens/ProfileScreens/CompanyEditorScreen';
import MethodsScreen from '../screens/ProfileScreens/MethodsScreen';
import ToolsScreen from '../screens/ProfileScreens/ToolsScreen';
import { AddressType, CompanyDataType, ContactPersonType } from '../store/reducers/types';
import NoCompanyScreen from '../screens/ProfileScreens/NoCompanyScreen';
import PackagesScreen from '../screens/ProfileScreens/PackagesScreen';
import SettingsScreen from '../screens/ProfileScreens/SettingsScreen';
import { PathConfigMap } from '@react-navigation/native';
import { AddContactPersonsScreenProps } from '../screens/AddContactPersonsScreen';
import { CompanyDescriptionScreenProps } from '../screens/CompanyDescriptionScreen';
import { CompanyInvoiceScreenProps } from '../screens/CompanyInvoiceScreen';
import { GoogleMapScreenProps } from '../screens/GoogleMapScreen';
import { JobCategoryScreenProps } from '../screens/JobCategoryScreen';
import { ItemSelectorScreenProps } from '../screens/ItemSelectorScreen';
import { SocialMediaScreenProps } from '../screens/SocialMediaScreen';

type SubView<T extends keyof ProfileStackParamList['extended']> = { subView: T } & ProfileStackParamList['extended'][T] | { subView?: never };

export type ProfileStackParamList = {
  default: {
    MainScreen: undefined,
    // PaymentTemporalScreen: undefined,
    CompanyEditorScreen:
    & (
      | SubView<'GoogleMapScreen'>
      | SubView<'CompanyInvoiceScreen'>
      | SubView<'JobCategoryScreen'>
      | SubView<'ItemSelectorScreen'>
      | SubView<'AddContactPersonsScreen'>
      | SubView<'CompanyDescriptionScreen'>
      | SubView<'ItemSelectorScreen'>
      | SubView<'SocialMediaScreen'>
    ) | undefined
    ,
    NoCompanyScreen: undefined;
    CompanyScreen: { newProfile?: string, subView?: 'options' } | undefined,
    PackagesScreen: undefined,
    SettingsScreen: undefined,
    AccountDataScreen: SubView<'ChangePasswordScreeen'> | undefined,
    PaymentScreen: undefined,
    EditPaymentScreen: undefined,
    AddPaymentScreen: undefined,
    NotificationScreen: undefined,
    PrivacyScreen: undefined,
    PointsScreen: undefined,
    MethodsScreen: undefined,
    ToolsScreen: undefined,
    // ?????
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
    //??????
  },
  extended: {
    GoogleMapScreen: GoogleMapScreenProps,
    AddContactPersonsScreen: AddContactPersonsScreenProps,
    CompanyDescriptionScreen: CompanyDescriptionScreenProps,
    CompanyInvoiceScreen: CompanyInvoiceScreenProps,
    JobCategoryScreen: JobCategoryScreenProps,
    ItemSelectorScreen: ItemSelectorScreenProps,
    SocialMediaScreen: SocialMediaScreenProps,
    ChangePasswordScreeen: any,
  }
}

export const ProfileStackLinking: PathConfigMap<ProfileStackParamList['default']> = {
  MainScreen: '',
  AccountDataScreen: 'AccountDataScreen',
  CompanyEditorScreen: 'CompanyEditorScreen',
  AddPaymentScreen: 'AddPaymentScreen',
  CompanyScreen: 'CompanyScreen',
  EditPaymentScreen: 'EditPaymentScreen',
  MethodsScreen: 'MethodsScreen',
  NoCompanyScreen: 'NoCompanyScreen',
  NotificationScreen: 'NotificationScreen',
  PackagesScreen: 'PackagesScreen',
  PaymentScreen: 'PaymentScreen',
  PointsScreen: 'PointsScreen',
  PrivacyScreen: 'PrivacyScreen',
  SettingsScreen: 'SettingsScreen',
  ToolsScreen: 'ToolsScreen',
  //?????
  // PaymentMethods: 'PaymentMethods',
  // PaymentTemporalScreen: 'PaymentTemporalScreen',

  //?????
  // AddAdvert: 'AddAdvert',
  // AddCall: 'AddCall',
  // AddEvent: 'AddEvent',
  // CookieScreen: 'CookieScreen',
  // CreateCompanyProfile: 'CreateCompanyProfile',
  // HelpCenterScreen: 'HelpCenterScreen',
  // Register: 'Register',
  // RODO: 'RODO',
  // SendingOffers: 'SendingOffers',
  // ShareCamera: 'ShareCamera',
  // ShareContacts: 'ShareContacts',
  // ShareLocation: 'ShareLocation',
}

const ProfileStack = createNativeStackNavigator<ProfileStackParamList['default']>();

const ProfileNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="MainScreen" component={MainScreen} />
      {/* <ProfileStack.Screen name="PaymentTemporalScreen" component={PaymentTemporalScreen} /> */}
      <ProfileStack.Screen name="CompanyEditorScreen" component={CompanyEditorScreen} />
      <ProfileStack.Screen name="NoCompanyScreen" component={NoCompanyScreen} />
      <ProfileStack.Screen name="CompanyScreen" component={CompanyScreen} />
      <ProfileStack.Screen name="PackagesScreen" component={PackagesScreen} />
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <ProfileStack.Screen name="AccountDataScreen" component={AccountDataScreen} />
      <ProfileStack.Screen name="PaymentScreen" component={PaymentScreen} />
      <ProfileStack.Screen name="EditPaymentScreen" component={EditPaymentScreen} />
      <ProfileStack.Screen name="AddPaymentScreen" component={AddPaymentScreen} />
      <ProfileStack.Screen name="NotificationScreen" component={NotificationScreen} />
      <ProfileStack.Screen name="PrivacyScreen" component={PrivacyScreen} />
      <ProfileStack.Screen name="PointsScreen" component={PointsScreen} />
      <ProfileStack.Screen name="MethodsScreen" component={MethodsScreen} />
      <ProfileStack.Screen name="ToolsScreen" component={ToolsScreen} />
      {/* <ProfileStack.Screen name="SendingOffers" component={SendingOffers} />
      <ProfileStack.Screen name="RODO" component={RODO} />
      <ProfileStack.Screen name="ShareCamera" component={ShareCamera} />
      <ProfileStack.Screen name="ShareContacts" component={ShareContacts} />
      <ProfileStack.Screen name="ShareLocation" component={ShareLocation} />
      <ProfileStack.Screen name="CookieScreen" component={CookieScreen} />
      <ProfileStack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
      <ProfileStack.Screen name="CreateCompanyProfile" component={CreateCompanyProfile} />
      <ProfileStack.Screen name="AddAdvert" component={AddAdvert} />
      <ProfileStack.Screen name="AddCall" component={AddCall} />
      <ProfileStack.Screen name="AddEvent" component={AddEvent} />
      <ProfileStack.Screen name="PaymentMethods" component={PaymentMethods} />
      <ProfileStack.Screen name="Register" component={Register} /> */}
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;