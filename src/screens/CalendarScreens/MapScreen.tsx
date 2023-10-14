import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
// import GoogleMap from '../../components/organisms/GoogleMap/GoogleMap';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';

const MapScreen: React.FC<CalendarStackParamList['MapScreen']> = ({callback, initialAddress}) => {
  // const { callback, initialAddress } = route.params;

  return <></>
  // return <GoogleMap {...{ callback, initialAddress }} />;
};

export default MapScreen;