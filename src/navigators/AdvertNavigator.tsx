import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/AdvertScreens/MainScreen';
import AdvertEditorScreen from '../screens/AdvertScreens/AdvertEditorScreen';
import AdvertScreen from '../screens/AdvertScreens/AdvertScreen';
import CandidatesScreen from '../screens/AdvertScreens/CandidatesScreen';
import { PathConfigMap } from '@react-navigation/native';
import { JobCategoryScreenProps } from '../screens/JobCategoryScreen';

export type AdvertStackParamList = {
  default: {
    MainScreen: undefined;
    AdvertScreen: { id: string },
    AdvertEditorScreen: { 
      id?: string, isMainMenuSender?: 'true' | 'false',
      subView?: 'map',
    } | undefined,
    CandidatesScreen: { id: string },
  },
  extended: {
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
