import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
// import GoogleMap from '../../components/organisms/GoogleMap/GoogleMap';

const MapScreen: React.FC<ProfileStackParamList['MapScreen']> = ({ callback, initialAddress }) => {
  // const { callback, initialAddress } = route.params;

  return <></>
  // return <GoogleMap {...{ callback, initialAddress }} />;
};

export default MapScreen;