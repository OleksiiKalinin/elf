import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/CalendarScreens/MainScreen';
import EventScreen from '../screens/CalendarScreens/EventScreen';
import { AddressType, CandidateDataType, UserAdvertType } from '../store/reducers/types';
import { PathConfigMap } from '@react-navigation/native';

export type CalendarStackParamList = {
  MainScreen: undefined;
  EventScreen: { isMainMenuSender?: 'true' | 'false' } | undefined;
  MapScreen: { callback: (address: AddressType) => void, initialAddress: AddressType | null },
  ChooseAdvertScreen: { callback: (advert: UserAdvertType) => void };
  ChooseCandidateScreen: {candidates: UserAdvertType['candidate_data'], callback: (candidate: CandidateDataType) => void};
};

export const CalendarStackLinking: PathConfigMap<CalendarStackParamList> = {
  MainScreen: '',
  EventScreen: 'EventScreen',
  // ChooseAdvertScreen: 'ChooseAdvertScreen',
  // ChooseCandidateScreen: 'ChooseCandidateScreen',
  // MapScreen: 'MapScreen',
}

const CalendarStack = createNativeStackNavigator<CalendarStackParamList>();

const CalendarNavigator: React.FC = () => {
  return (
    <CalendarStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen name="MainScreen" component={MainScreen} />
      <CalendarStack.Screen name="EventScreen" component={EventScreen} />
      {/* <CalendarStack.Screen name="MapScreen" component={MapScreen} />
      <CalendarStack.Screen name="ChooseAdvertScreen" component={ChooseAdvertScreen} />
      <CalendarStack.Screen name="ChooseCandidateScreen" component={ChooseCandidateScreen} /> */}
    </CalendarStack.Navigator>
  );
};

export default CalendarNavigator;