import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/AdvertScreens/MainScreen';
import AdvertEditorScreen from '../screens/AdvertScreens/AdvertEditorScreen';
import AdvertScreen from '../screens/AdvertScreens/AdvertScreen';
import CandidatesScreen from '../screens/AdvertScreens/CandidatesScreen';
import { PathConfigMap } from '@react-navigation/native';
import { JobCategoryScreenProps } from '../screens/JobCategoryScreen';
import { GoogleMapScreenProps } from '../screens/GoogleMapScreen';

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
      isMainMenuSender?: 'true' | 'false',
    } & (
      | SubView<'GoogleMapScreen'>
      | SubView<'JobCategoryScreen'>
    ),
    CandidatesScreen: { id: string },
  },
  extended: {
    GoogleMapScreen: GoogleMapScreenProps,
    JobCategoryScreen: JobCategoryScreenProps,
  }
};

export const AdvertStackLinking: PathConfigMap<AdvertStackParamList['default']> = {
  MainScreen: '',
  AdvertScreen: 'AdvertScreen',
  AdvertEditorScreen: 'AdvertEditorScreen',
  CandidatesScreen: 'CandidatesScreen',
}

const AdvertStack = createNativeStackNavigator<AdvertStackParamList['default']>();

const AdvertNavigator: React.FC = () => {
  return (
    <AdvertStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <AdvertStack.Screen name="MainScreen" component={MainScreen} />
      <AdvertStack.Screen name="AdvertEditorScreen" component={AdvertEditorScreen} />
      <AdvertStack.Screen name="AdvertScreen" component={AdvertScreen} />
      <AdvertStack.Screen name="CandidatesScreen" component={CandidatesScreen} />
    </AdvertStack.Navigator>
  );
};

export default AdvertNavigator;
