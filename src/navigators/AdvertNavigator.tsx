import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/AdvertScreens/MainScreen';
import NewAdvertScreen from '../screens/AdvertScreens/NewAdvertScreen';
import JobScreen from '../screens/AdvertScreens/JobScreen';
import JobCategoryScreen from '../screens/AdvertScreens/JobCategoryScreen';
import MapScreen from '../screens/AdvertScreens/MapScreen';
import AdvertScreen from '../screens/AdvertScreens/AdvertScreen';
import OptionsDrawerScreen from '../screens/AdvertScreens/OptionsDrawerScreen';
import EditAdvertScreen from '../screens/AdvertScreens/EditAdvertScreen';
import CandidatesScreen from '../screens/AdvertScreens/CandidatesScreen';
import { AddressType, CandidateDataType, JobPositionType, UserAdvertType } from '../store/reducers/types';
import ProfileScreen from '../screens/CandidatesScreens/ProfileScreen';
import VideoScreen from '../screens/CandidatesScreens/VideoScreen';
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
  NewAdvertScreen: {
    latitude?: any; longitude?: any; place?: any;
    selectedJob?: any; jobCategory?: any; iconCategory?: any;
    selectedRequirements?: any;
    selectedDuties?: any;
    selectedLanguages?: any;
    selectedBenefits?: any;
    isMainMenuSender?: boolean
  } | undefined;
  AdvertScreen: { id: number };
  OptionsDrawerScreen:
  | undefined
  | {
    selectedRequirements?: any;
    selectedDuties?: any;
    selectedLanguages?: any;
    selectedBenefits?: any;
    category?: string;
    path?: string;
  };
  EditAdvertScreen:
  | undefined
  | { latitude: any; longitude: any; place: any }
  | { selectedJob: any; jobCategory: any; iconCategory: any }
  | {
    selectedRequirements?: any;
    selectedDuties?: any;
    selectedLanguages?: any;
    selectedBenefits?: any;
    advertIndex?: number;
  };
  CandidatesScreen: { candidates: UserAdvertType['candidate_data'] };
  ProfileScreen: { candidateData: CandidateDataType };
  VideoScreen: { candidateData: CandidateDataType };
};

export const AdvertStackLinking: PathConfigMap<AdvertStackParamList> = {
  MainScreen: '',
  AdvertScreen: 'AdvertScreen',
  CandidatesScreen: 'CandidatesScreen',
  EditAdvertScreen: 'EditAdvertScreen',
  JobCategoryScreen: 'JobCategoryScreen',
  JobScreen: 'JobScreen',
  MapScreen: 'MapScreen',
  NewAdvertScreen: 'NewAdvertScreen',
  OptionsDrawerScreen: 'OptionsDrawerScreen',
  ProfileScreen: 'ProfileScreen',
  VideoScreen: 'VideoScreen',
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
      <AdvertStack.Screen name="OptionsDrawerScreen" component={OptionsDrawerScreen} />
      <AdvertStack.Screen name="EditAdvertScreen" component={EditAdvertScreen} />
      <AdvertStack.Screen name="CandidatesScreen" component={CandidatesScreen} />
      <AdvertStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <AdvertStack.Screen name="VideoScreen" component={VideoScreen} />
    </AdvertStack.Navigator>
  );
};

export default AdvertNavigator;
