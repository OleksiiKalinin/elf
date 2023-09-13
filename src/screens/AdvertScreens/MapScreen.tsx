import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
// import GoogleMap from '../../components/organisms/GoogleMap/GoogleMap';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';

type MapScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AdvertStackParamList, 'MapScreen'>,
  NativeStackScreenProps<RootStackParamList, 'AdvertStack'>
>;

const MapScreen: React.FC<MapScreenProps> = ({ navigation, route }) => {
  const { callback, initialAddress, hideControls } = route.params;

  return <></>
  // return <GoogleMap {...{ callback, initialAddress, hideControls }} />;
};

export default MapScreen;