import { AddressType } from "../store/reducers/types";

export function convertToBackEndAddress(address: AddressType | null): AddressType & { location: { type: 'Point', coordinates: [number | null, number | null] } } | null {
    return address ? {
        ...address,
        location: {
            type: 'Point',
            coordinates: [address.position?.lng || null, address.position?.lat || null]
        }
    } : null;
}

export function convertToFrontEndAddress(location: AddressType & { location: { type: 'Point', coordinates: [number, number] } } | null): AddressType | null {
    return location ? {
        ...location,
        position: { lng: location.location.coordinates[0], lat: location.location.coordinates[1] }
    } : null;
}