import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../colors/Colors';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import { RootStackParamList } from '../../navigators/RootNavigator';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoder-reborn';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CandidatesStackParamList, 'MapScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CandidatesStack'>
>;

const MapScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const [location, setLocation] = useState({
    latitude: 52.225606,
    longitude: 21.012229,
    name: 'Marszałkowska 126',
  });
  const [inputLocation, setInputLocation] = useState('Marszałkowska 126');
  const [locationInfo, setLocationInfo] = useState();

  // Geocoder.fallbackToGoogle('AIzaSyC6FAZTrWv4dwjwurr-UMLVFa2k22AT16g');

  useEffect(() => {
    Geocoder.geocodeAddress(inputLocation)
      .then(res => {
        setLocationInfo(res);
      })
      .catch(err => console.log(err));
  }, [inputLocation]);

  // console.log(location.name);

  return (
    <View style={{ backgroundColor: Colors.Basic100 }}>
      <View
        style={{
          backgroundColor: Colors.White,
          position: 'absolute',
          top: 34,
          width: '100%',
          zIndex: 100,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 19,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.Basic200,
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <SvgIcon icon="arrowLeft" />
        </TouchableOpacity>

        <GooglePlacesAutocomplete
          placeholder="Wpisz lokalizację"
          onPress={(data, details) => {
            details &&
              setLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                name: data.terms[3]
                  ? data.terms[2].value
                  : data.terms[2] && !data.terms[3]
                    ? data.terms[1].value
                    : data.terms[0].value,
              });
          }}
          fetchDetails={true}
          query={{
            key: 'AIzaSyC6FAZTrWv4dwjwurr-UMLVFa2k22AT16g',
            language: 'pl',
            components: 'country:pl',
          }}
          enablePoweredByContainer={false}
          currentLocation={true}
          currentLocationLabel="Current location"
          styles={{
            textInputContainer: {
              left: 16,
            },
            textInput: {
              color: Colors.Basic900,
              fontSize: 16,
              fontWeight: '400',
              height: 55,
            },
            description: {
              color: Colors.Basic900,
              fontSize: 16,
              fontWeight: '600',
              textAlignVertical: 'center',
            },
            row: {
              padding: 0,
              height: 48,
            },
          }}
        />
        <SvgIcon icon="search" style={{ top: 18 }} />
      </View>

      <MapView
        zoomControlEnabled
        customMapStyle={[
          {
            featureType: 'poi',
            stylers: [
              {
                visibility: 'on',
              },
            ],
          },
          {
            featureType: 'transit',
            stylers: [
              {
                visibility: 'on',
              },
            ],
          },
        ]}
        style={styles.Map}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          image={require('../../assets/images/marker.png')}
          coordinate={location}
        />
        <SvgIcon icon="mapMarker2" />
      </MapView>

      <ButtonRipple
        variant="primary"
        onPress={() =>
          navigation.navigate('FilterScreen', {
            latitude: location.latitude,
            longitude: location.longitude,
            place: location.name,
          })
        }>
        Potwierdź
      </ButtonRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  Map: {
    height: '91.5%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default MapScreen;
