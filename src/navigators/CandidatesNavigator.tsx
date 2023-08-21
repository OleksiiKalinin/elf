import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/CandidatesScreens/MainScreen';
import SearchScreen from '../screens/CandidatesScreens/SearchScreen';
import FilterScreen from '../screens/CandidatesScreens/FilterScreen';
import FavouritesScreen from '../screens/CandidatesScreens/FavouritesScreen';
import JobScreen from '../screens/CandidatesScreens/JobScreen';
import ProfileScreen from '../screens/CandidatesScreens/ProfileScreen';
import FavSettingsScreen from '../screens/CandidatesScreens/FavSettingsScreen';
import VideoScreen from '../screens/CandidatesScreens/VideoScreen';
import MapScreen from '../screens/CandidatesScreens/MapScreen';
import { CandidateDataType } from '../store/reducers/types';

export type CandidatesStackParamList = {
  MainScreen: { filters?: any } | undefined;
  FilterScreen: {
    pushedJob?: any;
    index?: any;
    latitude?: any;
    longitude?: any;
    place?: any;
    filters?: any;
  } | undefined;
  SearchScreen: undefined;
  JobScreen: { index: number };
  FavouritesScreen: undefined;
  FavSettingsScreen: undefined;
  ProfileScreen: { candidateData: CandidateDataType };
  VideoScreen: { candidateData: CandidateDataType };
  MapScreen: undefined;
};

const CandidatesStack = createNativeStackNavigator<CandidatesStackParamList>();

const CandidatesNavigator: React.FC = () => {
  return (
    <CandidatesStack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{ headerShown: false }}
    >
      <CandidatesStack.Screen
        name="MainScreen"
        component={() => null}
      />
      {/* <CandidatesStack.Screen
        name="MainScreen"
        component={MainScreen}
        initialParams={{
          filters: [undefined, [], [], [], null, false, false, false, null, NaN, NaN],
        }}
      />
      <CandidatesStack.Screen
        name="SearchScreen"
        component={SearchScreen}
      />
      <CandidatesStack.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
      />
      <CandidatesStack.Screen
        name="FavSettingsScreen"
        component={FavSettingsScreen}
      />
      <CandidatesStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <CandidatesStack.Screen
        name="JobScreen"
        component={JobScreen}
      />
      <CandidatesStack.Screen
        name="FilterScreen"
        component={FilterScreen}
        initialParams={{
          pushedJob: null,
          filters: [undefined, [], [], [], null, false, false, false, null, NaN, NaN]
        }}
      />
      <CandidatesStack.Screen
        name="VideoScreen"
        component={VideoScreen}
      />
      <CandidatesStack.Screen
        name="MapScreen"
        component={MapScreen}
      /> */}
    </CandidatesStack.Navigator>
  );
};

export default CandidatesNavigator;
