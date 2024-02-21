import React, { Fragment, useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler, Platform } from 'react-native';
import { AddressType, ContactPersonType, OtherCompanyLocationType } from '../store/reducers/types';
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
import MapPreview from '../components/molecules/MapPreview';
import GoogleMapScreen from './GoogleMapScreen';
import { AtSign, Pencil, Phone, Trash2 } from '@tamagui/lucide-icons';
import ItemSelectorScreen from './ItemSelectorScreen';

const emptyLocation: OtherCompanyLocationType = {
  name: '',
  location: null,
  contact_persons: [],
};

export type AddOtherCompanyLocationsScreenProps = {
  contactPersons: ContactPersonType[],
  initialLocations: OtherCompanyLocationType[],
  callback: (locations: OtherCompanyLocationType[]) => void,
};

const AddOtherCompanyLocationsScreen: React.FC<AddOtherCompanyLocationsScreenProps> = ({
  contactPersons,
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<'locations' | 'map' | 'contactPersons'>('locations');
  const { backToRemoveParams } = useRouter();
  const { blockedScreen } = useTypedSelector(s => s.general);
  const { setBlockedScreen, setSnackbarMessage } = useActions();

  useEffect(() => {
    setIsDataValid(validateLocations());
  }, [locations]);

  useEffect(() => {
    setUnsavedData(!isEqual(oldLocations, locations));
  }, [oldLocations, locations]);

  useEffect(() => {
    setBlockedScreen({ ...blockedScreen, blockedBack: unsavedData });
  }, [unsavedData]);

  const validateLocations = (index?: number) => {
    const array = index ? [locations[index]] : locations;

    for (const location of array) {
      if (
        !!(location.name && location.name.length > 2 && location.name.length <= 100)
        && !!location.location
        && !!location.contact_persons.length
      ) {
        continue;
      } else {
        return false;
      };
    };

    return true;
  };

  const displayWarning = () => {
    setShowTips(true);
    setSnackbarMessage({ type: 'error', text: 'Wypełnij wszystkie pola' });
  };

  const getInitialSelectedContacts = (contacts: ContactPersonType[]) => {
    const getTempIds = (array: ContactPersonType[]) => {
      return array.map(item => item.tempId).filter(tempId => tempId !== undefined);
    };

    const tempIds1 = getTempIds(contactPersons);
    const tempIds2 = getTempIds(contacts);

    const filteredId = tempIds1.filter(tempId => tempIds2.includes(tempId));

    return filteredId;
  };

  const addNewLocations = () => {
    setLocations(prev => [...prev, emptyLocation])

    if (isDataValid) {
      setShowTips(false);
    };
  };

  const editLocations = (key: keyof OtherCompanyLocationType, value: any, index: number) => {
    setLocations(locations => {
      const currentLocation: OtherCompanyLocationType | undefined = locations[index];
      if (currentLocation) {
        return [
          ...locations.slice(0, index),
          { ...currentLocation, [key]: !isString(value) ? value : value ? value.replace(/\s/g, '') : null },
          ...locations.slice(index + 1)
        ];
      } else {
        return locations;
      };
    });
  };

  const deleteLocation = (index: number) => {
    setLocations(locations => {
      if (locations[index]) {
        return [
          ...locations.slice(0, index),
          ...locations.slice(index + 1)
        ];
      } else {
        return locations;
      };
    });
  };

  const handleConfirm = () => {
    if (isDataValid) {
      callback(locations);
      backToRemoveParams();
    } else {
      displayWarning();
    };
  };

  return (
    <>
      {mode === 'locations' &&
        <ScreenHeaderProvider
          title='Dodatkowe lokalizacje'
          backgroundContent={'none'}
        >
          <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingTop: 25 }}>
            {locations.map(({ name, location, contact_persons }, index) =>
              <View style={styles.Location} key={index}>
                <View style={styles.LocationHeader}>
                  <Typography size={18} weight='Bold' style={{ marginVertical: 10 }}>Dodatkowa lokalizacja {index + 1}</Typography>
                  {(index !== 0 || locations.length > 1) && (
                    <Button
                      variant='TouchableOpacity'
                      onPress={() => deleteLocation(index)}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </View>
                <View style={{ marginBottom: 30, paddingHorizontal: 19 }}>
                  <TextField
                    label="Nazwa*"
                    value={name || ''}
                    onChangeText={text => editLocations('name', text, index)}
                    {...(showTips && (!name || !(name && name.length > 2 && name.length <= 100)) && {
                      bottomText: 'Nazwa firmy musi zawierać od 3 do 100 znaków',
                    })}
                  />
                </View>
                <View >
                  <Separator />
                  <MapPreview
                    label='Lokalizacja*'
                    place={location?.formattedAddress}
                    bgColor={Colors.White}
                    onPress={() => {
                      setCurrentIndex(index);
                      setMode('map');
                    }}
                  />
                  <Separator />
                </View>
                {!!contact_persons.length ?
                  <>
                    <View style={styles.SelectedItemsContainer}>
                      <View style={styles.SelectedItemsHeader}>
                        <View style={styles.FilledFieldTitle}>
                          <Typography variant='h5' weight='Bold'>
                            Dane do kontaktu
                          </Typography>
                        </View>
                        <View style={styles.EditButtons}>
                          <Button
                            variant='TouchableOpacity'
                            style={styles.EditButton}
                            onPress={() => {
                              setCurrentIndex(index);
                              setMode('contactPersons');
                            }}
                          >
                            <Pencil />
                          </Button>
                        </View>
                      </View>
                      <View >
                        {contact_persons.map(({ id, email, mobile_number }, i) =>
                          <View key={id} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 20 }}>
                            <Typography color={Colors.Basic600}>
                              {i + 1}.
                            </Typography>
                            <View key={id} style={{ gap: 10 }}>
                              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <AtSign size={16} color={Colors.Basic600} />
                                <Typography color={Colors.Basic600}>
                                  {email}
                                </Typography>
                              </View>
                              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Phone size={16} color={Colors.Basic600} />
                                <Typography color={Colors.Basic600}>
                                  {mobile_number}
                                </Typography>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    </View>
                    <Separator marginTop={12} />
                  </>

                  :

                  <Button
                    variant='text'
                    arrowRight
                    borderBottom
                    onPress={() => {
                      setCurrentIndex(index);
                      setMode('contactPersons');
                    }}
                  >
                    <View style={styles.UnfilledFieldTitle}>
                      <Typography
                        variant='h5'
                      >
                        Dane do kontaktu
                      </Typography>
                      <Typography style={{ color: Colors.Red }}>
                        *
                      </Typography>
                    </View>
                  </Button>
                }
                {index + 1 === locations.length && (name && contact_persons) &&
                  <Button
                    variant='text'
                    onPress={() => validateLocations(index) ? addNewLocations() : displayWarning()}
                  >
                    <Typography color={Colors.Blue500} weight='Bold'>
                      Dodaj kolejną lokalizację
                    </Typography>
                  </Button>
                }
              </View>
            )}
          </ScrollView>
          <Button
            stickyBottom
            onPress={() => handleConfirm()}
          >
            Potwierdź
          </Button>
        </ScreenHeaderProvider>
      }
      {mode === 'map' &&
        <View>
          <GoogleMapScreen
            callback={(address) => editLocations('location', address, currentIndex)}
            initialAddress={locations[currentIndex].location}
            closeCallback={() => setMode('locations')}
          />
        </View>
      }
      {mode === 'contactPersons' &&
        <ScreenHeaderProvider
          title='Osoby kontaktowe'
          backgroundContent={'none'}
          callback={() => setMode('locations')}
        >
          <ItemSelectorScreen
            list={contactPersons.map(item => ({ id: item.tempId, name: item.email, icon: item.mobile_number })) as any}
            initialSelected={getInitialSelectedContacts(locations[currentIndex].contact_persons) as any}
            mode='multiple'
            callback={(contacts) => editLocations('contact_persons', contactPersons.filter(contact => contacts.includes(contact.tempId || 0)), currentIndex)}
            closeCallback={() => setMode('locations')}
            labels={{
              searchLabel: 'Znajdź email',
              itemsLabel: 'Kontakty',
            }}
            render={(id, name, i, icon) =>
              <View key={id} style={{ paddingVertical: 15, gap: 10 }}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                  <AtSign size={18} />
                  <Typography variant='h5'>
                    {name}
                  </Typography>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                  <Phone size={18} />
                  <Typography variant='h5'>
                    {icon}
                  </Typography>
                </View>
              </View>
            }
          />
        </ScreenHeaderProvider>
      }
    </>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.Basic100,
    flex: 1
  },
  Location: {
    backgroundColor: Colors.White,
    marginBottom: 24,
  },
  LocationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 19
  },
  FilledField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
    height: 58,
  },
  FilledFieldTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  EditButtons: {
    flexDirection: 'row',
    gap: 15
  },
  EditButton: {
    width: 'auto',
    padding: 0,
    height: 50,
    justifyContent: 'center'
  },
  UnfilledFieldTitle: {
    flexDirection: 'row',
  },
  SelectedItemsContainer: {
    paddingHorizontal: 19
  },
  SelectedItemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AddOtherCompanyLocationsScreen;