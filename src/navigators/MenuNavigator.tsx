import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MenuScreens/MainScreen';
import CallsScreen from '../screens/MenuScreens/CallsScreen';
import EventsScreen from '../screens/MenuScreens/EventsScreen';
import NewsScreen from '../screens/MenuScreens/NewsScreen';
import NewsDetailsScreen from '../screens/MenuScreens/NewsDetailsScreen';
import QuestionsScreen from '../screens/MenuScreens/QuestionsScreen';
import { CandidateDataType } from '../store/reducers/types';
import ProfileScreen from '../screens/CandidatesScreens/ProfileScreen';
import VideoScreen from '../screens/CandidatesScreens/VideoScreen';

export type MenuStackParamList = {
  MainScreen: undefined;
  CallsScreen: undefined;
  EventsScreen: undefined;
  NewsScreen: undefined;
  NewsDetailsScreen: undefined;
  QuestionsScreen: undefined;
  ProfileScreen: { candidateData: CandidateDataType };
  VideoScreen: { candidateData: CandidateDataType };
};

const MenuStack = createNativeStackNavigator<MenuStackParamList>();

const MenuNavigator: React.FC = () => {
  return (
    <MenuStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <MenuStack.Screen name="MainScreen" component={MainScreen} />
      {/* <MenuStack.Screen name="CallsScreen" component={CallsScreen} />
      <MenuStack.Screen name="EventsScreen" component={EventsScreen} />
      <MenuStack.Screen name="NewsScreen" component={NewsScreen} />
      <MenuStack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />
      <MenuStack.Screen name="QuestionsScreen" component={QuestionsScreen} />
      <MenuStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <MenuStack.Screen name="VideoScreen" component={VideoScreen} /> */}
    </MenuStack.Navigator>
  );
};

export default MenuNavigator;
