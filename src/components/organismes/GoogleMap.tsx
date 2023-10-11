import { useNavigation } from '@react-navigation/native';
import React, { FC, HTMLFactory, useEffect, useRef, useState } from 'react';
import { Dimensions, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import geocoder from 'react-native-geocoder-reborn';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { AddressType } from '../../store/reducers/types';
import SvgIcon from '../atoms/SvgIcon';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Autocomplete from "react-google-autocomplete";

const Map = MapView as (typeof MapView & {Marker: typeof MapMarker})
if (Platform.OS === 'android' || Platform.OS === 'ios') {
    Map.Marker = Marker;
}

const markerIcon: any = 'https://drive.google.com/uc?id=18XoaiN-bJE9zslCbZNk6xpRCVLdikwGr&export=download';

const GoogleMap: FC<{ callback: (address: AddressType) => void, initialAddress: AddressType | null, hideControls?: boolean }> = ({ callback, initialAddress, hideControls = false }) => {
    const [location, setLocation] = useState(initialAddress);
    const [webInputValue, setWebInputValue] = useState<string>(location?.formattedAddress || '');
    const NativeInputRef = useRef<any>(null);
    const WebInputRef = useRef<HTMLInputElement | null>(null);
    const { windowSizes } = useTypedSelector(s => s.general);
    // const navigation = useNavigation();

    useEffect(() => {
        if (location) NativeInputRef.current?.setAddressText(location.formattedAddress);
    }, []);

    useEffect(() => {
        console.log(location);
    }, [location]);

    // useEffect(() => {
    //     console.log(windowSizes);
    // }, [windowSizes]);

    return (
        <View style={{ backgroundColor: Colors.Basic100, flex: 1, height: 700 }}>
            <View style={styles.Wrapper}>
                {(Platform.OS === 'ios' || Platform.OS === 'android') && <GooglePlacesAutocomplete
                    ref={NativeInputRef}
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
                            onPress={!!NativeInputRef.current?.getAddressText() ? () => {
                                NativeInputRef.current?.setAddressText('');
                                setLocation(null);
                            } : undefined}
                        >
                            <SvgIcon icon={!!NativeInputRef.current?.getAddressText() ? "crossBig" : 'search'} />
                        </TouchableOpacity>
                    )}
                    // fetchDetails
                    query={{
                        key: 'AIzaSyBLA1spwwoOjY2rOvMliOBc2C87k6ZOJ_s',
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
                />}
                {Platform.OS === 'web' && <View style={{ flexDirection: 'row', width: '100%', height: 42 }}>
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
                    <Autocomplete
                        ref={WebInputRef}
                        style={{ flex: 1, height: '100%', border: 0, fontSize: 16, fontWeight: '600', paddingLeft: 15 }}
                        onPlaceSelected={(place) => {
                            geocoder.geocodeAddress(place.formatted_address)
                                .then(res => setLocation(res[0] as unknown as AddressType))
                                .catch(err => console.log(err));
                        }}
                        defaultValue={webInputValue}
                        options={{
                            types: ['address'],
                            componentRestrictions: { country: 'pl' }
                        }}
                        //@ts-ignore
                        onChange={(e) => setWebInputValue(e.target.value || '')}
                    />
                    <TouchableOpacity
                        style={{
                            height: 42,
                            width: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                            paddingRight: 10
                        }}
                        onPress={!!webInputValue ? () => {
                            //@ts-ignore
                            if(WebInputRef.current) WebInputRef.current.value = '';
                            setWebInputValue('');
                            setLocation(null);
                        } : undefined}
                    >
                        <SvgIcon icon={!!webInputValue ? "crossBig" : 'search'} />
                    </TouchableOpacity>
                </View>}
            </View>
            <Map
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
                style={[styles.Map, { height: 700 }]}
                // style={[styles.Map, { height: windowSizes.height }]}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                region={{
                    latitude: location?.position?.lat || 52.087696,
                    longitude: location?.position?.lng || 19.708369,
                    latitudeDelta: location?.position ? 0.02 : 2.2,
                    longitudeDelta: location?.position ? 0.02 : 2.2,
                }}>
                {!!location?.position?.lat && !!location?.position?.lng && <Map.Marker
                    image={markerIcon}
                    icon={markerIcon}
                    draggable={!hideControls}
                    coordinate={{
                        latitude: location?.position.lat,
                        longitude: location?.position.lng
                    }}
                    onDragEnd={(e: any) => {
                        let [lat, lng]: (number | null)[] = [null, null];
                        if (Platform.OS === 'android' || Platform.OS === 'ios') {
                            const { nativeEvent: { coordinate: { latitude, longitude } } } = e;
                            [lat, lng] = [latitude, longitude];
                        } else if (Platform.OS === 'web' && e.latLng) {
                            [lat, lng] = [e.latLng?.lat() || null, e.latLng?.lng() || null];
                        }
                        console.log([lat, lng]);
                        if (lat && lng) {
                            geocoder.geocodePosition({lat, lng})
                            .then(res => console.log(res[0]))
                            // .then(res => setLocation(res[0] as unknown as AddressType))
                            // .catch(err => console.log(err));
                        }
                        // if (location) {
                        //     setLocation({
                        //         ...location,
                        //         position: { lat: latitude, lng: longitude }
                        //     });
                        // }
                    }}
                    // onDragEnd={(e) => console.log(e.latLng?.lng())}
                />}
            </Map>
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
        width: '100%',
        paddingTop: 42,
        paddingBottom: 50,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
});

export default GoogleMap;