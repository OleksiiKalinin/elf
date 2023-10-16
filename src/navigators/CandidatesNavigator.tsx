import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/CandidatesScreens/MainScreen';
import FilterScreen from '../screens/CandidatesScreens/FilterScreen';
import FavouritesScreen from '../screens/CandidatesScreens/FavouritesScreen';
import ProfileScreen from '../screens/CandidatesScreens/ProfileScreen';
import FavSettingsScreen from '../screens/CandidatesScreens/FavSettingsScreen';
import VideoScreen from '../screens/CandidatesScreens/VideoScreen';
import { AddressType, CandidateDataType } from '../store/reducers/types';
import { PathConfigMap } from '@react-navigation/native';

export type CandidatesStackParamList = {
  default: {
    MainScreen: undefined,
    FavouritesScreen: undefined,
    FavSettingsScreen: undefined,
    ProfileScreen: { id: string },
    VideoScreen: { id: string },
    FilterScreen: undefined,
  },
  extended: {}
};

export const CandidatesStackLinking: PathConfigMap<CandidatesStackParamList['default']> = {
  MainScreen: '',
  FavouritesScreen: 'FavouritesScreen',
  FavSettingsScreen: 'FavSettingsScreen',
  ProfileScreen: 'ProfileScreen',
  VideoScreen: 'VideoScreen',
  FilterScreen: 'FilterScreen',
}

const CandidatesStack = createNativeStackNavigator<CandidatesStackParamList['default']>();

const CandidatesNavigator: React.FC = () => {
  return (
    <CandidatesStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <CandidatesStack.Screen name="MainScreen" component={MainScreen} />
      <CandidatesStack.Screen name="VideoScreen" component={VideoScreen} />
      <CandidatesStack.Screen name="FavouritesScreen" component={FavouritesScreen} />
      <CandidatesStack.Screen name="FavSettingsScreen" component={FavSettingsScreen} />
      <CandidatesStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <CandidatesStack.Screen name="FilterScreen" component={FilterScreen} />
    </CandidatesStack.Navigator>
  );
};

export default CandidatesNavigator;
