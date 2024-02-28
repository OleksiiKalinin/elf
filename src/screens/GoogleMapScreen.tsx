import { useNavigation } from '@react-navigation/native';
import React, { ComponentProps, FC, HTMLFactory, useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Dimensions, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import geocoder from 'react-native-geocoder-reborn';
import { AutocompleteRequestType, GooglePlacesAutocomplete as NativeAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { AddressType } from '../store/reducers/types';
import SvgIcon from '../components/atoms/SvgIcon';
import Colors from '../colors/Colors';
import Button from '../components/molecules/Button';
import { useTypedSelector } from '../hooks/useTypedSelector';
import WebAutocomplete from "react-google-autocomplete";
import useRouter from '../hooks/useRouter';

const Map = MapView as unknown as FC<ComponentProps<typeof MapView> & { options: any }> & { Marker: typeof MapMarker };
if (Platform.OS === 'android' || Platform.OS === 'ios') {
    Map.Marker = Marker;
}

const markerIcon: any = 'https://drive.google.com/uc?id=18XoaiN-bJE9zslCbZNk6xpRCVLdikwGr&export=download';

export type GoogleMapScreenProps = {
    callback: (address: AddressType) => void,
    initialAddress: AddressType | null,
    hideControls?: boolean,
    /** 
     * The supported types are:
     * - geocode - instructs the Place Autocomplete service to return only geocoding results, rather than business results. Generally, you use this request to disambiguate results where the location specified may be indeterminate.
     * - address - instructs the Place Autocomplete service to return only geocoding results with a precise address. Generally, you use this request when you know the user will be looking for a fully specified address.
     * - establishment - instructs the Place Autocomplete service to return only business results.
     * - (regions) - type collection instructs the Places service to return any result matching the following types:
     *    - locality
     *    - sublocality
     *    - postal_code
     *    - country
     *    - administrative_area_level_1 (województwo???)
     *    - administrative_area_level_2
     * - (cities) - type collection instructs the Places service to return results that match types:
     *    - locality
     *    - administrative_area_level_3 (dzielnica)
     * 
     * @default geocode
     * @see https://developers.google.com/maps/documentation/places/web-service/supported_types#table3
     * */
    optionsType?: AutocompleteRequestType,
    closeCallback?: () => void,
}

const GoogleMapScreen: FC<GoogleMapScreenProps> = ({ callback, initialAddress, hideControls = false, optionsType = 'geocode', closeCallback }) => {
    const [location, setLocation] = useState(initialAddress);
    const [delta, setDelta] = useState<number>(2.2);
    const [lastCoordinates, setLastCoordinates] = useState({
        lat: 52.087696,
        lng: 19.708369,
    });
    const [webInputValue, setWebInputValue] = useState<string>(location?.formattedAddress || '');
    const NativeInputRef = useRef<any>(null);
    const WebInputRef = useRef<HTMLInputElement | null>(null);
    const { backToRemoveParams } = useRouter();

    useEffect(() => {
        if (location) {
            setDelta(0.02);
            if (location?.position) setLastCoordinates(location?.position);

            NativeInputRef.current?.setAddressText(location.formattedAddress);
            setWebInputValue(location.formattedAddress || '');
            if (WebInputRef.current) WebInputRef.current.value = location.formattedAddress || '';
        }
    }, [location]);

    useEffect(() => {
        if (!!closeCallback) {
            const handler = BackHandler.addEventListener('hardwareBackPress', () => {
                closeCallback();
                return true;
            });

            return () => {
                handler.remove();
            };
        };
    }, [closeCallback]);

    const BackButton = useCallback(() => (
        <Button
            variant='TouchableOpacity'
            style={styles.BackButton}
            onPress={closeCallback || backToRemoveParams}
        >
            <SvgIcon icon="arrowLeft" />
        </Button>
    ), []);

    const changePositionHandler = (e: any) => {
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
    }

    return (
        <View style={{ backgroundColor: Colors.Basic100, flex: 1, position: 'relative' }}>
            <View style={styles.InputWrapper}>
                {(Platform.OS === 'ios' || Platform.OS === 'android') && <NativeAutocomplete
                    ref={NativeInputRef}
                    placeholder="Wpisz lokalizację"
                    onPress={(data) => {
                        geocoder.geocodeAddress(data.description)
                            .then(res => setLocation(res[0] as unknown as AddressType))
                            .catch(err => console.log(err));
                    }}
                    onFail={(e) => console.log(e)}
                    renderLeftButton={() => <BackButton />}
                    renderRightButton={() => hideControls ? <></> : (
                        <Button
                            variant='TouchableOpacity'
                            style={styles.ClearButton}
                            onPress={!!NativeInputRef.current?.getAddressText() ? () => {
                                NativeInputRef.current?.setAddressText('');
                                setLocation(null);
                            } : undefined}
                        >
                            <SvgIcon icon={!!NativeInputRef.current?.getAddressText() ? "crossBig" : 'search'} />
                        </Button>
                    )}
                    // fetchDetails
                    query={{
                        key: 'AIzaSyCuD83IZtlNNM3sxn9Hac4YSOXkRZurb9c',
                        language: 'pl',
                        components: 'country:pl',
                        type: optionsType
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
                {Platform.OS === 'web' && (
                    <View style={{ flexDirection: 'row', width: '100%', height: 42 }}>
                        <BackButton />
                        <WebAutocomplete
                            ref={WebInputRef}
                            style={styles.InputWeb}
                            onPlaceSelected={(place) => {
                                geocoder.geocodeAddress(place.formatted_address)
                                    .then(res => setLocation(res[0] as unknown as AddressType))
                                    .catch(err => console.log(err));
                            }}
                            defaultValue={webInputValue}
                            options={{
                                types: [optionsType],
                                // types: ['address'],
                                componentRestrictions: { country: 'pl' }
                            }}
                            onChange={(e) => setWebInputValue((e.target as any).value || '')}
                        />
                        <Button
                            variant='TouchableOpacity'
                            style={styles.ClearButton}
                            onPress={!!webInputValue ? () => {
                                if (WebInputRef.current) WebInputRef.current.value = '';
                                setWebInputValue('');
                                setLocation(null);
                            } : undefined}
                        >
                            <SvgIcon icon={!!webInputValue ? "crossBig" : 'search'} />
                        </Button>
                    </View>
                )}
            </View>
            <Map
                style={[styles.Map]}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: lastCoordinates.lat,
                    longitude: lastCoordinates.lng,
                    latitudeDelta: delta,
                    longitudeDelta: delta,
                }}
                options={{ gestureHandling: "greedy" }}
                onPress={changePositionHandler}
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
                        onDragEnd={changePositionHandler}
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
                            !!closeCallback ? closeCallback() : backToRemoveParams({ force: true });
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
        paddingLeft: 15,
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

export default GoogleMapScreen;