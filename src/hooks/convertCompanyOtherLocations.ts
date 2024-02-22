import { AddressType, ContactPersonType, OtherCompanyLocationType } from "../store/reducers/types";
import { convertToBackEndAddress, convertToFrontEndAddress } from "./convertAddress";

export function convertToBackEndCompanyOtherLocations(otherLocations: OtherCompanyLocationType[], contactPersons: ContactPersonType[]): OtherCompanyLocationType[] {
    const updatedLocations: OtherCompanyLocationType[] = [];

    otherLocations.forEach(location => {
        const matchedId: number[] = [];

        location.tempContactPersons.forEach(tempPerson => {
            const matchingPerson = contactPersons.find(person => person.email === tempPerson.email);
            if (matchingPerson) {
                matchedId.push(matchingPerson.id || 0);
            }
        });

        const updatedLocation: OtherCompanyLocationType = {
            name: location.name,
            location: convertToBackEndAddress(location.location),
            contact_persons: matchedId,
            tempContactPersons: location.tempContactPersons
        };

        updatedLocations.push(updatedLocation);
    });

    return updatedLocations;
};

export function convertToFrontEndCompanyOtherLocations(otherLocations: OtherCompanyLocationType[], contactPersons: ContactPersonType[]): OtherCompanyLocationType[] {
    const updatedLocations: OtherCompanyLocationType[] = [];

    otherLocations.forEach(location => {

        const matchingPersons: ContactPersonType[] = [];

        if (!!location.contact_persons) {
            location?.contact_persons.forEach(personId => {
                const matchingPerson = contactPersons.find(person => person.id === personId);
                if (matchingPerson) {
                    matchingPersons.push(matchingPerson);
                }
            });
        };

        const updatedLocation: OtherCompanyLocationType = {
            name: location.name,
            location: convertToFrontEndAddress(location.location as any),
            tempContactPersons: matchingPersons
        };

        updatedLocations.push(updatedLocation);
    });

    return updatedLocations;
};