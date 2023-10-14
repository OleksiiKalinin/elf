import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
// import GoogleMap from '../../components/organisms/GoogleMap/GoogleMap';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';

const MapScreen: React.FC<CandidatesStackParamList['MapScreen']> = ({ callback, initialAddress, hideControls }) => {
  // const { callback, initialAddress, hideControls } = route.params;

  return <></>
  // return <GoogleMap {...{ callback, initialAddress, hideControls }} />;
};

export default MapScreen;