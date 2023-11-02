import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/CalendarScreens/MainScreen';
import EventScreen from '../screens/CalendarScreens/EventScreen';
import { AddressType, CandidateDataType, UserAdvertType } from '../store/reducers/types';
import { PathConfigMap } from '@react-navigation/native';
import { GoogleMapProps } from '../components/organismes/GoogleMap';
import { JobCategoryScreenProps } from '../screens/JobCategoryScreen';

type SubView<T extends keyof CalendarStackParamList['extended']> = { subView: T } & CalendarStackParamList['extended'][T]

export type CalendarStackParamList = {
  default: {
    MainScreen: undefined,
    EventScreen:
    | undefined
    | SubView<'GoogleMap'>
    | SubView<'ChooseAdvertScreen'>
    | SubView<'ChooseCandidateScreen'>
    | SubView<'JobCategoryScreen'>
  },
  extended: {
    GoogleMap: GoogleMapProps,
    ChooseAdvertScreen: { callback: (advert: UserAdvertType) => void },
    ChooseCandidateScreen: { candidates: UserAdvertType['candidate_data'], callback: (candidate: CandidateDataType) => void },
    // Test
    JobCategoryScreen: JobCategoryScreenProps,
  },
};

export const CalendarStackLinking: PathConfigMap<CalendarStackParamList['default']> = {
  MainScreen: '',
  EventScreen: 'EventScreen',
}

const CalendarStack = createNativeStackNavigator<CalendarStackParamList['default']>();

const CalendarNavigator: React.FC = () => {
  return (
    <CalendarStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen name="MainScreen" component={MainScreen} />
      <CalendarStack.Screen name="EventScreen" component={EventScreen} />
    </CalendarStack.Navigator>
  );
};

export default CalendarNavigator;