import { useNavigation } from '@react-navigation/native';
import React, { ComponentProps, FC, HTMLFactory, useEffect, useRef, useState } from 'react';
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

const Map = MapView as unknown as FC<ComponentProps<typeof MapView> & { options: any }> & { Marker: typeof MapMarker };
if (Platform.OS === 'android' || Platform.OS === 'ios') {
    Map.Marker = Marker;
}

const markerIcon: any = 'https://drive.google.com/uc?id=18XoaiN-bJE9zslCbZNk6xpRCVLdikwGr&export=download';

const GoogleMap: FC<{ callback: (address: AddressType) => void, initialAddress: AddressType | null, hideControls?: boolean }> = ({ callback, initialAddress, hideControls = false }) => {
    const [location, setLocation] = useState(initialAddress);
    const [webInputValue, setWebInputValue] = useState<string>(location?.formattedAddress || '');
    const NativeInputRef = useRef<any>(null);
    const WebInputRef = useRef<HTMLInputElement | null>(null);
    // const navigation = useNavigation();

    useEffect(() => {
        if (window.document?.body) window.document.body.style.overflowY = 'hidden';
    }, []);

    useEffect(() => {
        if (location) {
            NativeInputRef.current?.setAddressText(location.formattedAddress);
            setWebInputValue(location.formattedAddress || '');
            if (WebInputRef.current) WebInputRef.current.value = location.formattedAddress || '';
        }
    }, [location]);

    return (
        <View style={{ backgroundColor: Colors.Basic100, flex: 1, position: 'relative' }}>
            <View style={styles.InputWrapper}>
                {(Platform.OS === 'ios' || Platform.OS === 'android') && <GooglePlacesAutocomplete
                    ref={NativeInputRef}
                    placeholder="Wpisz lokalizację"
                    onPress={(data) => {
                        geocoder.geocodeAddress(data.description)
                            .then(res => setLocation(res[0] as unknown as AddressType))
                            .catch(err => console.log(err));
                    }}
                    onFail={(e) => console.log(e)}
                    renderLeftButton={() => (
                        <TouchableOpacity
                            style={styles.BackButton}
                        // onPress={() => navigation.goBack()}
                        >
                            <SvgIcon icon="arrowLeft" />
                        </TouchableOpacity>
                    )}
                    renderRightButton={() => hideControls ? <></> : (
                        <TouchableOpacity
                            style={styles.ClearButton}
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
                        textInput: styles.InputNative,
                        description: styles.InputNativeDesc,
                    }}
                />}
                {Platform.OS === 'web' && <View style={{ flexDirection: 'row', width: '100%', height: 42 }}>
                    <TouchableOpacity
                        style={styles.BackButton}
                    // onPress={() => navigation.goBack()}
                    >
                        <SvgIcon icon="arrowLeft" />
                    </TouchableOpacity>
                    <Autocomplete
                        ref={WebInputRef}
                        style={styles.InputWeb}
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
                        onChange={(e) => setWebInputValue((e.target as any).value || '')}
                    />
                    <TouchableOpacity
                        style={styles.ClearButton}
                        onPress={!!webInputValue ? () => {
                            if (WebInputRef.current) WebInputRef.current.value = '';
                            setWebInputValue('');
                            setLocation(null);
                        } : undefined}
                    >
                        <SvgIcon icon={!!webInputValue ? "crossBig" : 'search'} />
                    </TouchableOpacity>
                </View>}
            </View>
            <Map
                style={[styles.Map]}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: location?.position?.lat || 52.087696,
                    longitude: location?.position?.lng || 19.708369,
                    latitudeDelta: location?.position ? 0.02 : 2.2,
                    longitudeDelta: location?.position ? 0.02 : 2.2,
                }}
                options={{ gestureHandling: "greedy" }}
            >
                {!!location?.position?.lat && !!location?.position?.lng &&
                    <Map.Marker
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
                                [lat, lng] = [e.latLng.lat?.() || null, e.latLng.lng?.() || null];
                            }
                            if (lat && lng) {
                                geocoder.geocodePosition({ lat, lng })
                                    .then(res => setLocation({ ...(res[0] as unknown as AddressType), position: lat && lng ? { lat, lng } : res[0].position }))
                                    .catch(err => console.log(err));
                            }
                        }}
                    />
                }
            </Map>
            {!hideControls && <View style={styles.Button}>
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
    BackButton: {
        height: 42,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    InputWrapper: {
        backgroundColor: Colors.White,
        width: '100%',
        position: Platform.select({ web: 'fixed', native: 'absolute' }),
        top: 0,
        left: 0,
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    ClearButton: {
        height: 42,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingRight: 10
    },
    InputNative: {
        color: Colors.Basic900,
        fontSize: 16,
        fontWeight: '400',
        height: '100%',
        marginBottom: 0,
        paddingVertical: 7
    },
    InputNativeDesc: {
        color: Colors.Basic900,
        fontSize: 16,
        fontWeight: '600',
        textAlignVertical: 'center',
    },
    InputWeb: {
        flex: 1,
        height: '100%',
        border: 0,
        fontSize: 16,
        fontWeight: '600',
        paddingLeft: 15
    },
    Map: {
        paddingTop: 42,
        paddingBottom: 50,
        position: Platform.select({ web: 'fixed', native: 'absolute' }),
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    Button: {
        position: Platform.select({ web: 'fixed', native: 'absolute' }),
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 2,
    }
});

export default GoogleMap;