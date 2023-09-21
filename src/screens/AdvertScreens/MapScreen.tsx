import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';

import { RootStackParamList } from '../../navigators/RootNavigator';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
// import GoogleMap from '../../components/organisms/GoogleMap/GoogleMap';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';

const MapScreen: React.FC<AdvertStackParamList['MapScreen']> = ({ callback, initialAddress, hideControls }) => {
  // const { callback, initialAddress, hideControls } = route.params;

  return <></>
  // return <GoogleMap {...{ callback, initialAddress, hideControls }} />;
};

export default MapScreen;