import { ContactPersonType, OtherCompanyLocationType } from "../store/reducers/types";

export function convertToBackEndCompanyOtherLocations(locations: OtherCompanyLocationType[], tempContactPersons: ContactPersonType[], contactPersons: ContactPersonType[], company_id: number): OtherCompanyLocationType[] {
    locations.forEach(location => {
        location.contact_persons = [];
        location.company_id = company_id;
        location.tempContactPersons.forEach(tempId => {
            const tempPerson = tempContactPersons.find(person => person.tempId === tempId);
            if (tempPerson) {
                const personWithEmail = contactPersons.find(person => person.email === tempPerson.email);
                if (personWithEmail?.id && location.contact_persons) {
                    location.contact_persons.push(personWithEmail.id);
                };
            };
        });
    });

    return locations;
};

export function convertToFrontEndCompanyOtherLocations(otherLocations: OtherCompanyLocationType[], contactPersons: ContactPersonType[]): OtherCompanyLocationType[] {
    const contactPersonsMap: { [key: number]: ContactPersonType } = {};
    contactPersons.forEach(person => {
        if (person.id !== undefined) {
            contactPersonsMap[person.id] = person;
        };
    });

    otherLocations.forEach(location => {
        location.tempContactPersons = [];
        if (location.contact_persons && Array.isArray(location.contact_persons)) {
            location.contact_persons.forEach(personId => {
                const matchedPerson = contactPersonsMap[personId];
                if (matchedPerson) {
                    location.tempContactPersons.push(matchedPerson.tempId || 0);
                };
            });
        };
    });

    return otherLocations;
};