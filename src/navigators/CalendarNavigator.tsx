import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/CalendarScreens/MainScreen';
import EventScreen from '../screens/CalendarScreens/EventScreen';
import { AddressType, CandidateDataType, UserAdvertType } from '../store/reducers/types';
import { PathConfigMap } from '@react-navigation/native';
import { GoogleMapScreenProps } from '../screens/GoogleMapScreen';
import { JobCategoryScreenProps } from '../screens/JobCategoryScreen';
import { ChooseAdvertScreenProps } from '../screens/ChooseAdvertScreen';
import { ChooseCandidateScreenProps } from '../screens/ChooseCandidateScreen';

type SubView<T extends keyof CalendarStackParamList['extended']> = { subView: T } & CalendarStackParamList['extended'][T]

export type CalendarStackParamList = {
  default: {
    MainScreen: undefined,
    EventScreen:
    | undefined
    | SubView<'GoogleMapScreen'>
    | SubView<'ChooseAdvertScreen'>
    | SubView<'ChooseCandidateScreen'>
    | SubView<'JobCategoryScreen'>
  },
  extended: {
    GoogleMapScreen: GoogleMapScreenProps,
    ChooseAdvertScreen: ChooseAdvertScreenProps,
    ChooseCandidateScreen: ChooseCandidateScreenProps,
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