import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MenuScreens/MainScreen';
import CallsScreen from '../screens/MenuScreens/CallsScreen';
import EventsScreen from '../screens/MenuScreens/EventsScreen';
import NewsScreen from '../screens/MenuScreens/NewsScreen';
import NewsDetailsScreen from '../screens/MenuScreens/NewsDetailsScreen';
import QuestionsScreen from '../screens/MenuScreens/QuestionsScreen';
import { PathConfigMap } from '@react-navigation/native';

export type MenuStackParamList = {
  MainScreen: {subView: 'options' | 'blabla'};
  CallsScreen: undefined;
  EventsScreen: undefined;
  NewsScreen: undefined;
  NewsDetailsScreen: undefined;
  QuestionsScreen: undefined;
};

export const MenuStackLinking: PathConfigMap<MenuStackParamList> = {
  MainScreen: '',
  CallsScreen: 'CallsScreen',
  EventsScreen: 'EventsScreen',
  NewsDetailsScreen: 'NewsDetailsScreen',
  NewsScreen: 'NewsScreen',
  QuestionsScreen: 'QuestionsScreen',
}

const MenuStack = createNativeStackNavigator<MenuStackParamList>();

const MenuNavigator: React.FC = () => {
  return (
    <MenuStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <MenuStack.Screen name="MainScreen" component={MainScreen} />
      <MenuStack.Screen name="CallsScreen" component={CallsScreen} />
      <MenuStack.Screen name="EventsScreen" component={EventsScreen} />
      <MenuStack.Screen name="NewsScreen" component={NewsScreen} />
      <MenuStack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />
      <MenuStack.Screen name="QuestionsScreen" component={QuestionsScreen} />
    </MenuStack.Navigator>
  );
};

export default MenuNavigator;
