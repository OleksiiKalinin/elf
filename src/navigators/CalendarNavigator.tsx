import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/CalendarScreens/MainScreen';
import EventScreen from '../screens/CalendarScreens/EventScreen';
import { PathConfigMap } from '@react-navigation/native';
import { GoogleMapScreenProps } from '../screens/GoogleMapScreen';
import { ChooseAdvertScreenProps } from '../screens/ChooseAdvertScreen';
import { ChooseCandidateScreenProps } from '../screens/ChooseCandidateScreen';
import EventEditorScreen from '../screens/CalendarScreens/EventEditorScreen';

type SubView<T extends keyof CalendarStackParamList['extended']> = ({ subView: T } & CalendarStackParamList['extended'][T]) | { subView?: never };

export type CalendarStackParamList = {
  default: {
    MainScreen: undefined,
    EventEditorScreen:
    | undefined
    | { id?: string }
    & (
      | SubView<'GoogleMapScreen'>
      | SubView<'ChooseAdvertScreen'>
      | SubView<'ChooseCandidateScreen'>
    )
    ,
    EventScreen: { id: string, subView?: 'options' },
  },
  extended: {
    GoogleMapScreen: GoogleMapScreenProps,
    ChooseAdvertScreen: ChooseAdvertScreenProps,
    ChooseCandidateScreen: ChooseCandidateScreenProps,
  },
};

export const CalendarStackLinking: PathConfigMap<CalendarStackParamList['default']> = {
  MainScreen: '',
  EventScreen: 'EventScreen',
  EventEditorScreen: 'EventEditorScreen',
}

const CalendarStack = createNativeStackNavigator<CalendarStackParamList['default']>();

const CalendarNavigator: React.FC = () => {
  return (
    <CalendarStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen name="MainScreen" component={MainScreen} />
      <CalendarStack.Screen name="EventScreen" component={EventScreen} />
      <CalendarStack.Screen name="EventEditorScreen" component={EventEditorScreen} />
    </CalendarStack.Navigator>
  );
};

export default CalendarNavigator;