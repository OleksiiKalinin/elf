import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler, Platform } from 'react-native';
import { ContactPersonType, OtherCompanyLocationType } from '../store/reducers/types';
import Typography from '../components/atoms/Typography';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import Button from '../components/molecules/Button';
import Colors from '../colors/Colors';
import useRouter from '../hooks/useRouter';
import { ScrollView } from '../components/molecules/ScrollView';
import TimePickerModal from '../components/modified_modules/react-native-paper-dates/Time/TimePickerModal';
import validateMail from '../hooks/validateMail';
import CheckBox from '../components/atoms/CheckBox';
import { Separator } from 'tamagui';
import { isEqual, isString } from 'lodash';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const emptyLocation: OtherCompanyLocationType = {
  name: '',
  location: null,
  contact_persons: null,
};

export type AddOtherCompanyLocationsProps = {
  initialLocations: OtherCompanyLocationType[],
  callback: (locations: OtherCompanyLocationType[]) => void,
};

const AddOtherCompanyLocations: React.FC<AddOtherCompanyLocationsProps> = ({
  initialLocations,
  callback,
}) => {
  const oldLocations = initialLocations && initialLocations.length ? [...initialLocations].sort((a, b) => {
    const orderA = a.id ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.id ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  }) : [emptyLocation];
  const [locations, setLocations] = useState<OtherCompanyLocationType[]>(initialLocations && initialLocations.length ? [...initialLocations].sort((a, b) => {
    const orderA = a.id ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.id ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  }) : [emptyLocation]);
  const [unsavedData, setUnsavedData] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const { backToRemoveParams } = useRouter();
  const { blockedScreen } = useTypedSelector(s => s.general);
  const { setBlockedScreen } = useActions();

  useEffect(() => {
    /* setIsDataValid(validateContactPersons()); */
  }, [locations]);

  useEffect(() => {
    setUnsavedData(!isEqual(oldLocations, locations));
  }, [oldLocations, locations]);

  useEffect(() => {
    setBlockedScreen({ ...blockedScreen, blockedBack: unsavedData });
  }, [unsavedData]);

  /* const validateContactPersons = (index?: number) => {
    const array = index ? [contactPersons[index]] : contactPersons;

    for (const contact of array) {
      if (
        contact.email && validateMail(contact.email) &&
        contact.mobile_number && contact.mobile_number.length === 12 &&
        contact.preferred_mobile_number || contact.preferred_email
      ) {
        continue;
      } else {
        return false;
      };
    };

    return true;
  }; */

  const addNewLocations = () => {
    setLocations(prev => [...prev, emptyLocation])

    if (isDataValid) {
      setShowTips(false);
    };
  };

  /* const editContactPersons = (key: keyof ContactPersonType, value: any, index: number) => {
    setContactPersons(contactPersons => {
      const currPerson: ContactPersonType | undefined = contactPersons[index];
      if (currPerson) {
        return [
          ...contactPersons.slice(0, index),
          { ...currPerson, [key]: !isString(value) ? value : value ? value.replace(/\s/g, '') : null },
          ...contactPersons.slice(index + 1)
        ];
      } else {
        return contactPersons;
      };
    });
  }; */

  /* const deleteContactPerson = (index: number) => {
    setContactPersons(contactPersons => {
      if (contactPersons[index]) {
        return [
          ...contactPersons.slice(0, index),
          ...contactPersons.slice(index + 1)
        ];
      } else {
        return contactPersons;
      };
    });
  }; */

  const handleConfirm = () => {
    if (isDataValid) {
      callback(locations);
      backToRemoveParams();
    } else {
      setShowTips(true);
    };
  };

  return (
    <ScreenHeaderProvider
      title='Dodatkowe lokalizacje'
    /* callback={() => { unsavedData ? setShowExitWarningModal({ state: true, callback: backToRemoveParams }) : backToRemoveParams() }} */
    >
      
      <Button
        stickyBottom
        onPress={() => handleConfirm()}
      >
        Potwierdź
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.Basic100,
    flex: 1
  },
  ContactPerson: {
    paddingHorizontal: 19,
    backgroundColor: Colors.White,
    marginBottom: 24
  },
  ContactPersonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ContactHoursHeader: {
    marginBottom: 5,
    marginTop: 32,
    flexDirection: 'row'
  },
  ContactHoursButtons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  HourButton: {
    width: '35%',
    maxWidth: 200
  },
  ErrorModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  ErrorModalContent: {
    width: 300,
    backgroundColor: Colors.White,
    borderRadius: 4,
    padding: 20,
    justifyContent: 'space-between',
    gap: 20,
  },
});

export default AddOtherCompanyLocationsProps;