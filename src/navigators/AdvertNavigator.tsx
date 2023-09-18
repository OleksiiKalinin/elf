import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/AdvertScreens/MainScreen';
import NewAdvertScreen from '../screens/AdvertScreens/NewAdvertScreen';
import JobScreen from '../screens/AdvertScreens/JobScreen';
import JobCategoryScreen from '../screens/AdvertScreens/JobCategoryScreen';
import MapScreen from '../screens/AdvertScreens/MapScreen';
import AdvertScreen from '../screens/AdvertScreens/AdvertScreen';
import CandidatesScreen from '../screens/AdvertScreens/CandidatesScreen';
import { AddressType, CandidateDataType, JobPositionType, UserAdvertType } from '../store/reducers/types';
import { PathConfigMap } from '@react-navigation/native';

type JobCategoryScreenCallbackProps = {
  industryId: number,
  positionId: number
}

export type AdvertStackParamList = {
  MainScreen: undefined;
  JobCategoryScreen: { callback: (props: JobCategoryScreenCallbackProps) => void };
  MapScreen: { callback: (address: AddressType) => void, initialAddress: AddressType | null, hideControls?: boolean },
  JobScreen: { callback: (id: number) => void, job_positions: JobPositionType[] };
  NewAdvertScreen: undefined;
  AdvertScreen: { id: number };
  CandidatesScreen: { candidates: UserAdvertType['candidate_data'] };
};

export const AdvertStackLinking: PathConfigMap<AdvertStackParamList> = {
  MainScreen: '',
  AdvertScreen: 'AdvertScreen',
  CandidatesScreen: 'CandidatesScreen',
  JobCategoryScreen: 'JobCategoryScreen',
  JobScreen: 'JobScreen',
  // JobScreen: 'NewAdvertScreen/#JobScreen',
  MapScreen: 'MapScreen',
  NewAdvertScreen: 'NewAdvertScreen',
}

const AdvertStack = createNativeStackNavigator<AdvertStackParamList>();

const AdvertNavigator: React.FC = () => {
  return (
    <AdvertStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <AdvertStack.Screen name="MainScreen" component={MainScreen} />
      <AdvertStack.Screen name="NewAdvertScreen" component={NewAdvertScreen} />
      <AdvertStack.Screen name="JobCategoryScreen" component={JobCategoryScreen} />
      <AdvertStack.Screen name="JobScreen" component={JobScreen} />
      <AdvertStack.Screen name="MapScreen" component={MapScreen} initialParams={{ hideControls: false }} />
      <AdvertStack.Screen name="AdvertScreen" component={AdvertScreen} />
      <AdvertStack.Screen name="CandidatesScreen" component={CandidatesScreen} />
    </AdvertStack.Navigator>
  );
};

export default AdvertNavigator;
