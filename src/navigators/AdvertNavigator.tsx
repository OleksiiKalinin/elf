import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/AdvertScreens/MainScreen';
import AdvertEditorScreen from '../screens/AdvertScreens/AdvertEditorScreen';
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
  AdvertScreen: { id: string };
  AdvertEditorScreen: { id: string };
  CandidatesScreen: { id: string };
  JobScreen: { callback: (id: number) => void, job_positions: JobPositionType[] };
  JobCategoryScreen: { callback: (props: JobCategoryScreenCallbackProps) => void };
  MapScreen: { callback: (address: AddressType) => void, initialAddress: AddressType | null, hideControls?: boolean },
};

export const AdvertStackLinking: PathConfigMap<AdvertStackParamList> = {
  MainScreen: '',
  AdvertScreen: 'AdvertScreen',
  AdvertEditorScreen: 'AdvertEditorScreen',
  CandidatesScreen: 'CandidatesScreen',
  // JobScreen: 'JobScreen',
  // JobCategoryScreen: 'JobCategoryScreen',
  // MapScreen: 'MapScreen',
}

const AdvertStack = createNativeStackNavigator<AdvertStackParamList>();

const AdvertNavigator: React.FC = () => {
  return (
    <AdvertStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <AdvertStack.Screen name="MainScreen" component={MainScreen} />
      <AdvertStack.Screen name="AdvertEditorScreen" component={AdvertEditorScreen} />
      <AdvertStack.Screen name="AdvertScreen" component={AdvertScreen} />
      <AdvertStack.Screen name="CandidatesScreen" component={CandidatesScreen} />
      {/* <AdvertStack.Screen name="JobScreen" component={JobScreen} />
      <AdvertStack.Screen name="JobCategoryScreen" component={JobCategoryScreen} />
      <AdvertStack.Screen name="MapScreen" component={MapScreen} initialParams={{ hideControls: false }} /> */}
    </AdvertStack.Navigator>
  );
};

export default AdvertNavigator;
