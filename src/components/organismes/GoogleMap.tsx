import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import geocoder from 'react-native-geocoder-reborn';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import markerIcon from '../../assets/images/marker.png';
import { AddressType } from '../../store/reducers/types';
import SvgIcon from '../atoms/SvgIcon';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';

const GoogleMap: FC<{ callback: (address: AddressType) => void, initialAddress: AddressType | null, hideControls?: boolean }> = ({ callback, initialAddress, hideControls = false }) => {
    const [location, setLocation] = useState(initialAddress);
    const GoogleInputRef = useRef<any>(null);
    // const navigation = useNavigation();

    useEffect(() => {
        geocoder.geocodeAddress('Powsińska 31, 02-903 Warszawa, Polska')
            .then(res => console.log(res))
            .catch(err => console.log(err));
        if (location) GoogleInputRef.current?.setAddressText(location.formattedAddress);
    }, []);

    return (
        <View style={{ backgroundColor: Colors.Basic100, flex: 1 }}>
            <View style={styles.Wrapper}>
                <GooglePlacesAutocomplete
                    ref={GoogleInputRef}
                    placeholder="Wpisz lokalizację"
                    onPress={(data) => {
                        console.log(data);
                        
                        geocoder.geocodeAddress(data.description)
                            .then(res => setLocation(res[0] as unknown as AddressType))
                            .catch(err => console.log(err));
                    }}
                    onFail={(e) => console.log(e)}
                    renderLeftButton={() => (
                        <TouchableOpacity
                            style={{
                                height: 42,
                                width: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-start',
                            }}
                            // onPress={() => navigation.goBack()}
                        >
                            <SvgIcon icon="arrowLeft" />
                        </TouchableOpacity>
                    )}
                    renderRightButton={() => hideControls ? <></> : (
                        <TouchableOpacity
                            style={{
                                height: 42,
                                width: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-start',
                                paddingRight: 10
                            }}
                            onPress={!!GoogleInputRef.current?.getAddressText() ? () => {
                                GoogleInputRef.current?.setAddressText('');
                                setLocation(null);
                            } : undefined}
                        >
                            <SvgIcon icon={!!GoogleInputRef.current?.getAddressText() ? "crossBig" : 'search'} />
                        </TouchableOpacity>
                    )}
                    fetchDetails
                    query={{
                        key: 'AIzaSyC6FAZTrWv4dwjwurr-UMLVFa2k22AT16g',
                        language: 'pl',
                        components: 'country:pl',
                    }}
                    enablePoweredByContainer={false}
                    // currentLocation={true}
                    // currentLocationLabel="Current location"
                    textInputProps={{
                        placeholderTextColor: Colors.Basic600,
                        editable: !hideControls
                    }}
                    styles={{
                        textInput: {
                            color: Colors.Basic900,
                            fontSize: 16,
                            fontWeight: '400',
                            height: '100%',
                            marginBottom: 0,
                            paddingVertical: 7
                        },
                        description: {
                            color: Colors.Basic900,
                            fontSize: 16,
                            fontWeight: '600',
                            textAlignVertical: 'center',
                        },
                    }}
                />
            </View>
            {/* <MapView
                customMapStyle={[
                    {
                        featureType: 'poi',
                        stylers: [{ visibility: 'on' }],
                    },
                    {
                        featureType: 'transit',
                        stylers: [{ visibility: 'on' }],
                    },
                ]}
                style={styles.Map}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                region={{
                    latitude: location?.position?.lat || 52.229838,
                    longitude: location?.position?.lng || 21.011713,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}>
                {!!location?.position?.lat && !!location?.position?.lng && <Marker
                    image={markerIcon}
                    draggable={!hideControls}
                    coordinate={{
                        latitude: location?.position.lat,
                        longitude: location?.position.lng
                    }}
                    onDragEnd={({ nativeEvent: { coordinate: { latitude, longitude } } }) => {
                        if (location) {
                            setLocation({
                                ...location,
                                position: { lat: latitude, lng: longitude }
                            });
                        }
                    }}
                />}
            </MapView> */}
            {!hideControls && <View style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 100, width: '100%' }}>
                <Button
                    variant="primary"
                    disabled={!location}
                    onPress={() => {
                        if (location) {
                            callback(location);
                            // navigation.goBack();
                        }
                    }}
                >
                    Potwierdź
                </Button>
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    Wrapper: {
        backgroundColor: Colors.White,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    Map: {
        height: Dimensions.get('screen').height,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default GoogleMap;