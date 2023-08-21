import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import GoogleMap from '../../components/organisms/GoogleMap/GoogleMap';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'MapScreen'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const MapScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const { callback, initialAddress } = route.params;

  return <GoogleMap {...{ callback, initialAddress }} />;
};

export default MapScreen;