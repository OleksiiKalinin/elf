import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import GoogleMap from '../../components/organisms/GoogleMap/GoogleMap';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';

type MapScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CalendarStackParamList, 'MapScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CalendarStack'>
>;

const MapScreen: React.FC<MapScreenProps> = ({ navigation, route }) => {
  const { callback, initialAddress } = route.params;

  return <GoogleMap {...{ callback, initialAddress }} />;
};

export default MapScreen;