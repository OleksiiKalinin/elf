import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/AdvertScreens/MainScreen';
import AdvertEditorScreen, { AdvertEditorStepType } from '../screens/AdvertScreens/AdvertEditorScreen';
import AdvertScreen from '../screens/AdvertScreens/AdvertScreen';
import CandidatesScreen from '../screens/AdvertScreens/CandidatesScreen';
import { PathConfigMap } from '@react-navigation/native';
import { JobCategoryScreenProps } from '../screens/JobCategoryScreen';
import { GoogleMapScreenProps } from '../screens/GoogleMapScreen';
import { ItemSelectorScreenProps } from '../screens/ItemSelectorScreen';
import { CompanyDescriptionScreenProps } from '../screens/CompanyDescriptionScreen';
import PaymentReturnScreen from '../screens/AdvertScreens/PaymentReturnScreen';
import { EditableItemSelectorScreenProps } from '../screens/EditableItemSelectorScreen';

type SubView<T extends keyof AdvertStackParamList['extended']> = ({ subView: T } & AdvertStackParamList['extended'][T]) | { subView?: never };

export type AdvertStackParamList = {
  default: {
    MainScreen:
    | undefined
    | { subView?: 'options' }
    ;
    AdvertScreen: { id: string },
    AdvertEditorScreen:
    | undefined
    | {
      id?: string,
      step?: AdvertEditorStepType,
      isMainMenuSender?: 'true' | 'false',
    } & (
      | SubView<'GoogleMapScreen'>
      | SubView<'JobCategoryScreen'>
      | SubView<'ItemSelectorScreen'>
      | SubView<'EditableItemSelectorScreen'>
      | SubView<'CompanyDescriptionScreen'>
    ),
    PaymentReturnScreen: undefined,
    CandidatesScreen: { id: string },
  },
  extended: {
    GoogleMapScreen: GoogleMapScreenProps,
    JobCategoryScreen: JobCategoryScreenProps,
    ItemSelectorScreen: ItemSelectorScreenProps,
    EditableItemSelectorScreen: EditableItemSelectorScreenProps,
    CompanyDescriptionScreen: CompanyDescriptionScreenProps,
  }
};

export const AdvertStackLinking: PathConfigMap<AdvertStackParamList['default']> = {
  MainScreen: '',
  AdvertScreen: 'AdvertScreen',
  AdvertEditorScreen: 'AdvertEditorScreen',
  CandidatesScreen: 'CandidatesScreen',
  PaymentReturnScreen: 'PaymentReturnScreen',
}

const AdvertStack = createNativeStackNavigator<AdvertStackParamList['default']>();

const AdvertNavigator: React.FC = () => {
  return (
    <AdvertStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <AdvertStack.Screen name="MainScreen" component={MainScreen} />
      <AdvertStack.Screen name="AdvertEditorScreen" component={AdvertEditorScreen} />
      <AdvertStack.Screen name="AdvertScreen" component={AdvertScreen} />
      <AdvertStack.Screen name="CandidatesScreen" component={CandidatesScreen} />
      <AdvertStack.Screen name="PaymentReturnScreen" component={PaymentReturnScreen} />
    </AdvertStack.Navigator>
  );
};

export default AdvertNavigator;
