import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/CalendarScreens/MainScreen';
import EventScreen from '../screens/CalendarScreens/EventScreen';
import CallScreen from '../screens/CalendarScreens/CallScreen';
import MapScreen from '../screens/CalendarScreens/MapScreen';
import ResumesScreen from '../screens/CalendarScreens/ResumesScreen';
import EditEventScreen from '../screens/CalendarScreens/EditEventScreen';
import AddPersonScreen from '../screens/CalendarScreens/AddPersonScreen';
import ChooseAdvertScreen from '../screens/CalendarScreens/ChooseAdvertScreen';
import { AddressType, CandidateDataType, UserAdvertType } from '../store/reducers/types';
import ChooseCandidateScreen from '../screens/CalendarScreens/ChooseCandidateScreen';
import ProfileScreen from '../screens/CandidatesScreens/ProfileScreen';
import VideoScreen from '../screens/CandidatesScreens/VideoScreen';

export type CalendarStackParamList = {
  MainScreen: undefined;
  EventScreen: { isMainMenuSender?: boolean } | undefined;
  EditEventScreen:
  | undefined
  | { latitude: any; longitude: any; place: any }
  | { editDay?: any; editIndex: any };
  CallScreen: undefined | { profileIndex: any };
  MapScreen: { callback: (address: AddressType) => void, initialAddress: AddressType | null },
  ResumesScreen: undefined | { selectedPersons: any };
  AddPersonScreen: undefined;
  QuestionsScreen: undefined;
  VacationScreen: undefined;
  ChooseAdvertScreen: { callback: (advert: UserAdvertType) => void };
  ChooseCandidateScreen: {candidates: UserAdvertType['candidate_data'], callback: (candidate: CandidateDataType) => void};
  ProfileScreen: { candidateData: CandidateDataType };
  VideoScreen: { candidateData: CandidateDataType };
};

const CalendarStack = createNativeStackNavigator<CalendarStackParamList>();

const CalendarNavigator: React.FC = () => {
  return (
    <CalendarStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
    <CalendarStack.Screen
      name="MainScreen"
      component={() => null}
    />
      {/* <CalendarStack.Screen name="MainScreen" component={MainScreen} />
      <CalendarStack.Screen name="EventScreen" component={EventScreen} />
      <CalendarStack.Screen name="EditEventScreen" component={EditEventScreen} />
      <CalendarStack.Screen name="CallScreen" component={CallScreen} />
      <CalendarStack.Screen name="MapScreen" component={MapScreen} />
      <CalendarStack.Screen name="ResumesScreen" component={ResumesScreen} />
      <CalendarStack.Screen name="AddPersonScreen" component={AddPersonScreen} />
      <CalendarStack.Screen name="ChooseAdvertScreen" component={ChooseAdvertScreen} />
      <CalendarStack.Screen name="ChooseCandidateScreen" component={ChooseCandidateScreen} />
      <CalendarStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <CalendarStack.Screen name="VideoScreen" component={VideoScreen} /> */}
    </CalendarStack.Navigator>
  );
};

export default CalendarNavigator;