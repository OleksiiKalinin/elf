import React, { ComponentProps, FC } from 'react';
import {
    Platform,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SvgIcon, { IconTypes } from '../atoms/SvgIcon';
import Typography from '../atoms/Typography';
import Colors from '../../colors/Colors';
import Button from './Button';

const Map = MapView as unknown as FC<ComponentProps<typeof MapView> & { options: any }> & { Marker: typeof MapMarker };
if (Platform.OS === 'android' || Platform.OS === 'ios') {
    Map.Marker = Marker;
}

const markerIcon: any = 'https://drive.google.com/uc?id=18XoaiN-bJE9zslCbZNk6xpRCVLdikwGr&export=download';

type MapPreviewProps = {
    place?: string | null;
    onPress: () => void;
    latitude?: number;
    longitude?: number;
    label?: string;
    hideMap?: boolean;
    rightIcon?: IconTypes;
};

const MapPreview: React.FC<MapPreviewProps> = ({ latitude, longitude, onPress, place, label, hideMap, rightIcon = 'arrowRight' }) => {
    return (
        <View>
            <Button variant='TouchableOpacity' activeOpacity={.9} onPress={onPress}>
                <View style={{ backgroundColor: Colors.Basic200, flexDirection: 'row', paddingVertical: 14 }}>
                    <View style={styles.mapIcon}>
                        <SvgIcon icon="mapMarker" />
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 14, borderLeftWidth: 1, borderColor: Colors.Basic300, }}>
                        <Typography color={Colors.Basic600} variant='h5'>
                            {label || 'Lokalizacja*'}
                        </Typography>
                        <Typography weight='SemiBold' variant='h5'>
                            {place || 'Wybierz adres'}
                        </Typography>
                    </View>
                    <View style={styles.mapIcon}>
                        <SvgIcon icon={rightIcon} />
                    </View>
                </View>
            </Button>
            {/* <Button variant='TouchableOpacity' activeOpacity={.9} onPress={onPress}>
                <View style={{ backgroundColor: Colors.Basic200, flexDirection: 'row', paddingVertical: 14, alignItems: 'center' }}>
                    <SvgIcon icon='doneCircleGreen' style={{ marginLeft: 19 }} />
                    <View style={styles.mapIcon}>
                        <SvgIcon icon="mapMarker" />
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 14, borderLeftWidth: 1, borderColor: Colors.Basic300, }}>
                        <Typography color={Colors.Basic600} variant='h5'>
                            {label || 'Lokalizacja*'}
                        </Typography>
                        <Typography weight='SemiBold' variant='h5'>
                            {place || 'Wybierz adres'}
                        </Typography>
                    </View>
                    <View style={styles.mapIcon}>
                        <SvgIcon icon={rightIcon} />
                    </View>
                </View>
            </Button> */}
            {!!latitude && !!longitude && !hideMap && (
                <Map
                    style={styles.Map}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    options={{
                        gestureHandling: 'none',
                        disableDefaultUI: true,
                    }}
                    pointerEvents='none'
                >
                    <Map.Marker
                        image={markerIcon}
                        icon={markerIcon}
                        draggable={false}
                        coordinate={{ latitude, longitude }}
                    />
                </Map>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    Title: {
        color: Colors.Basic600,
        marginLeft: 18,
        marginTop: 24,
    },
    Map: {
        height: 180,
        width: '100%',
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    mapIcon: {
        width: 50,
        justifyContent: 'center',
        alignItems: "center",
    },
});

export default MapPreview;