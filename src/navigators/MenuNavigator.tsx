import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MenuScreens/MainScreen';
import CallsScreen from '../screens/MenuScreens/CallsScreen';
import EventsScreen from '../screens/MenuScreens/EventsScreen';
import NewsScreen from '../screens/MenuScreens/NewsScreen';
import NewsDetailsScreen from '../screens/MenuScreens/NewsDetailsScreen';
import QuestionEditorScreen from '../screens/MenuScreens/QuestionEditorScreen';
import { PathConfigMap } from '@react-navigation/native';
import QuestionsListScreen from '../screens/MenuScreens/QuestionsListScreen';
import QuestionsScreen from '../screens/MenuScreens/QuestionsScreen';
import TestScreen from '../screens/MenuScreens/TestScreen';
import ImageScreen from '../screens/MenuScreens/ImageScreen';
import { JobCategoryScreenProps } from '../screens/JobCategoryScreen';

type SubView<T extends keyof MenuStackParamList['extended']> = ({ subView: T } & MenuStackParamList['extended'][T]) | { subView?: never };

export type MenuStackParamList = {
  default: {
    MainScreen:
    | undefined
    | { subView: 'options' }
    ,
    CallsScreen: undefined,
    EventsScreen: undefined,
    NewsScreen: undefined,
    NewsDetailsScreen: undefined,
    QuestionEditorScreen: { id: string } | undefined,
    QuestionsListScreen: { newlist: string } | undefined,
    QuestionsScreen: { id: string, subView?: 'options' },
    TestScreen:
    | undefined
    | SubView<'JobCategoryScreen'>
    ,
    ImageScreen:
    | undefined
    ,
  },
  extended: {
    JobCategoryScreen: JobCategoryScreenProps
  };
};

export const MenuStackLinking: PathConfigMap<MenuStackParamList['default']> = {
  MainScreen: '',
  CallsScreen: 'CallsScreen',
  EventsScreen: 'EventsScreen',
  NewsDetailsScreen: 'NewsDetailsScreen',
  NewsScreen: 'NewsScreen',
  QuestionEditorScreen: 'QuestionEditorScreen',
  QuestionsListScreen: 'QuestionsListScreen',
  QuestionsScreen: 'QuestionsScreen',
  TestScreen: 'TestScreen',
  ImageScreen: 'ImageScreen',
}

const MenuStack = createNativeStackNavigator<MenuStackParamList['default']>();

const MenuNavigator: React.FC = () => {
  return (
    <MenuStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <MenuStack.Screen name="MainScreen" component={MainScreen} />
      <MenuStack.Screen name="CallsScreen" component={CallsScreen} />
      <MenuStack.Screen name="EventsScreen" component={EventsScreen} />
      <MenuStack.Screen name="NewsScreen" component={NewsScreen} />
      <MenuStack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />
      <MenuStack.Screen name="QuestionEditorScreen" component={QuestionEditorScreen} />
      <MenuStack.Screen name="QuestionsListScreen" component={QuestionsListScreen} />
      <MenuStack.Screen name="QuestionsScreen" component={QuestionsScreen} />
      <MenuStack.Screen name="TestScreen" component={TestScreen} />
      <MenuStack.Screen name="ImageScreen" component={ImageScreen} />
    </MenuStack.Navigator>
  );
};

export default MenuNavigator;
