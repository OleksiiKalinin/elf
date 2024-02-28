import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler, Platform } from 'react-native';
import { AddressType, ContactPersonType, OtherCompanyLocationType } from '../store/reducers/types';
import Typography from '../components/atoms/Typography';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import Button from '../components/molecules/Button';
import Colors from '../colors/Colors';
import useRouter from '../hooks/useRouter';
import { ScrollView } from '../components/molecules/ScrollView';
import CheckBox from '../components/atoms/CheckBox';
import { Separator } from 'tamagui';
import { isEqual, isString } from 'lodash';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import MapPreview from '../components/molecules/MapPreview';
import GoogleMapScreen from './GoogleMapScreen';
import { AtSign, Pencil, Phone, Trash2 } from '@tamagui/lucide-icons';
import AddContactPersonsScreen from './AddContactPersonsScreen';
import { createParam } from 'solito';
import SvgIcon from '../components/atoms/SvgIcon';
import Modal from '../components/atoms/Modal';

type LocationItemType = ({
  mode: 'new',
  index?: never,
} | {
  mode: 'edit',
  index: number,
}) & OtherCompanyLocationType;

const emptyLocation: OtherCompanyLocationType = {
  name: '',
  location: null,
  contact_persons: [],
  tempContactPersons: [],
};

export type AddOtherCompanyLocationsScreenProps = ({
  mode: 'edit',
  selectedLocationsCallback?: never,
} | {
  mode: 'select',
  selectedLocationsCallback: (selectedLocations: number[]) => void,
}) & {
  contactPersons: ContactPersonType[],
  initialLocations: OtherCompanyLocationType[],
  isSubView?: boolean,
  locationsCallback: (locations: OtherCompanyLocationType[]) => void,
  contactPersonsCallback: (contactPersons: ContactPersonType[]) => void,
};

const stepsOrder = ['locations', 'map', 'contactPersons'] as const;
export type StepType = typeof stepsOrder[number];

const { useParam } = createParam<{ subViewMode: StepType }>();

const AddOtherCompanyLocationsScreen: React.FC<AddOtherCompanyLocationsScreenProps> = ({
  contactPersons,
  initialLocations,
  locationsCallback,
  contactPersonsCallback,
  selectedLocationsCallback,
  mode,
}) => {
  const oldLocations = initialLocations && initialLocations.length ? [...initialLocations].sort((a, b) => {
    const orderA = a.id ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.id ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  }) : [];
  const [locations, setLocations] = useState<OtherCompanyLocationType[]>(initialLocations && initialLocations.length ? [...initialLocations].sort((a, b) => {
    const orderA = a.id ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.id ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  }) : []);
  const [unsavedData, setUnsavedData] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<StepType>('locations');
  const [stepInitialParam, setStepInitialParam] = useParam('subViewMode', { initial: 'locations' });
  const [newLocation, setNewLocation] = useState<OtherCompanyLocationType | null>(null);
  const [newLocationEditing, setNewLocationEditing] = useState<boolean>(false);
  const [inEditing, setInEditing] = useState<number[]>([]);
  const [beforeEditing, setBeforeEditing] = useState<OtherCompanyLocationType[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [currentContactPersons, setCurrentContactPersons] = useState<ContactPersonType[]>(contactPersons);
  const [deleteModal, setDeleteModal] = useState<{ active: boolean, index?: number }>({ active: false });
  const { backToRemoveParams } = useRouter();
  const { blockedScreen } = useTypedSelector(s => s.general);
  const { setBlockedScreen, setSnackbarMessage } = useActions();

  useEffect(() => {
    setStepInitialParam('locations', { webBehavior: 'replace' });
    setStep('locations');
  }, []);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  useEffect(() => {
    if (step === 'locations') {
      setNewLocationEditing(false);
    };

    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      backHandler();
      return true;
    });

    return () => {
      handler.remove();
    };
  }, [step]);

  useEffect(() => {
    if (stepsOrder.includes(stepInitialParam as any)) {
      setStep(stepInitialParam as any);
    };
  }, [stepInitialParam]);

  useEffect(() => {
    setIsDataValid(validateLocations('list'));
  }, [locations]);

  useEffect(() => {
    setUnsavedData(!isEqual(oldLocations, locations));
  }, [oldLocations, locations]);

  useEffect(() => {
    if (!!contactPersons && contactPersons.length) {
      const updatedLocations = locations.map(location => {
        const filteredTempContactPersons = location.tempContactPersons.filter(tempId => {
          return currentContactPersons.some(person => person.tempId === tempId);
        });
        return { ...location, tempContactPersons: filteredTempContactPersons };
      });
      setLocations(updatedLocations);
    };
  }, [currentContactPersons]);

  /*   useEffect(() => {
      setBlockedScreen({ ...blockedScreen, blockedBack: unsavedData });
    }, [unsavedData]); */

  const backHandler = () => {
    if ((step === 'map' || step === 'contactPersons') && Platform.OS !== 'web') {
      setStepInitialParam('locations');
    } else {
      backToRemoveParams();
    };
  };

  const validateLocations = (mode: 'newLocation' | 'list', index?: number) => {
    if (mode === 'newLocation') {
      return !!(
        !!newLocation
        && (newLocation.name && newLocation.name.length > 2 && newLocation.name.length <= 100)
        && !!newLocation.location
        && !!newLocation.tempContactPersons.length
      )
    } else {
      const array = index ? [locations[index]] : locations;

      for (const location of array) {
        if (
          !!(location.name && location.name.length > 2 && location.name.length <= 100)
          && !!location.location
          && !!location.tempContactPersons.length
        ) {
          continue;
        } else {
          return false;
        };
      };

      return true;
    };
  };

  const displayWarning = () => {
    setShowTips(true);
    setSnackbarMessage({ type: 'error', text: 'Wypełnij wszystkie pola' });
  };

  const addNewLocation = () => {
    if (!!newLocation) {
      if (!validateLocations('newLocation')) {
        displayWarning();
      } else {
        setLocations(prev => [...prev, { ...newLocation, tempId: Math.floor(Math.random() * 100000000000) }]);
        setNewLocation(null);
      };
    };
  };

  const confirmEditingLocation = (index: number) => {
    if (!validateLocations('list', index)) {
      displayWarning();
    } else {
      setInEditing(prevState => prevState.filter(value => value !== index));
    };
  };

  const editNewLocation = (key: keyof OtherCompanyLocationType, value: any) => {
    const editedLocation = { ...newLocation, [key]: !isString(value) ? value : value ? value.replace(/\s/g, '') : null };
    setNewLocation(editedLocation as any)
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

  const cancelEditing = (tempIdToFind: number, index: number) => {
    const beforeEditingIndex = beforeEditing.findIndex(item => item.tempId === tempIdToFind);

    if (beforeEditingIndex !== -1) {
      const updatedLocations = [...locations];
      const objectToReplace = beforeEditing[beforeEditingIndex];
      const indexOfObjectToReplace = updatedLocations.findIndex(item => item.tempId === tempIdToFind);
      if (indexOfObjectToReplace !== -1) {
        updatedLocations[indexOfObjectToReplace] = objectToReplace;
        const updatedBeforeEditing = beforeEditing.filter(item => item.tempId !== tempIdToFind);
        setLocations(updatedLocations);
        setBeforeEditing(updatedBeforeEditing);
      };
    };

    setInEditing(prevState => prevState.filter(value => value !== index));
  };

  const googleMapCallback = (address: AddressType) => {
    if (newLocationEditing) {
      editNewLocation('location', address);
    } else {
      editLocations('location', address, currentIndex);
    };
  };

  const selectedContactPersonsCallback = (selectedContactPersons: number[]) => {
    if (newLocationEditing) {
      editNewLocation('tempContactPersons', selectedContactPersons);
    } else {
      editLocations('tempContactPersons', selectedContactPersons, currentIndex);
    };
  };

  const handleSelectedLocations = (id: number) => {
    const mySet = new Set([...selectedLocations]);
    if (mySet.has(id)) {
      mySet.delete(id);
    } else {
      mySet.add(id);
    };
    setSelectedLocations([...mySet]);
  };

  const handleConfirm = () => {
    if (!!newLocation) {
      setSnackbarMessage({ type: 'error', text: 'Dokończ tworzenie lokalizacji' });
    } else if (!!inEditing.length) {
      setSnackbarMessage({ type: 'error', text: 'Dokończ edytowanie lokalizacji' });
    } else if (mode === 'select' && !selectedLocations.length) {
      setSnackbarMessage({ type: 'error', text: 'Wybierz co najmniej jedną lokalizację' });
    } else if (!locations.length) {
      setSnackbarMessage({ type: 'error', text: 'Musisz dodać co najmniej jedną lokalizację' });
    } else if (isDataValid) {
      if (!isEqual(oldLocations, locations)) {
        locationsCallback(locations);
        setSnackbarMessage({ type: 'success', text: 'Zaktualizowano listę lokalizacji' });
      };
      if (mode === 'select') {
        selectedLocationsCallback(selectedLocations);
      };
      backToRemoveParams();
    };
  };

  const locationListItem = (name: string, location: AddressType, index: number) => {
    return (
      <>
        <View style={{ gap: 10, padding: 20 }}>
          <Typography variant='h5'>
            {name}
          </Typography>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <SvgIcon icon='mapMarker' />
            <Typography variant='h5' color={Colors.Basic600}>
              {location.locality}
            </Typography>
          </View>
        </View>
        <View style={styles.EditButtons}>
          <Button
            variant='TouchableOpacity'
            style={styles.EditButton}
            onPress={() => {
              setDeleteModal({ active: true, index: index });
            }}
          >
            <Trash2 />
          </Button>
          <Button
            variant='TouchableOpacity'
            style={styles.EditButton}
            onPress={() => {
              setInEditing(prev => [...prev, index]);
              setBeforeEditing(prev => [...prev, locations[index]]);
            }}
          >
            <Pencil />
          </Button>
        </View>
      </>
    )
  };

  const locationFormItem = (data: LocationItemType) => {
    const { tempId, mode, index, name, location, tempContactPersons } = data;
    return (
      <View style={styles.Location} key={tempId}>
        <View style={styles.LocationHeader}>
          <Typography size={18} weight='Bold' style={{ marginVertical: 20 }}>
            {mode === 'new' ? 'Nowa lokalizacja' : `Edytowanie lokalizacji ${index + 1}`}
          </Typography>
          {mode === 'edit' &&
            <Button
              variant='TouchableOpacity'
              onPress={() => setDeleteModal({ active: true, index: index })}
            >
              <Trash2 />
            </Button>
          }
        </View>
        <View style={{ marginBottom: 30, paddingHorizontal: 19 }}>
          <TextField
            label="Nazwa lokalizacji*"
            value={name || ''}
            onChangeText={text => mode === 'new' ? editNewLocation('name', text) : editLocations('name', text, index as number)}
            {...(showTips && (!name || !(name && name.length > 2 && name.length <= 100)) && {
              bottomText: 'Nazwa firmy musi zawierać od 3 do 100 znaków',
            })}
          />
        </View>
        <View >
          <Separator />
          <MapPreview
            rightIcon='arrowRightSmall'
            label='Lokalizacja*'
            place={location?.formattedAddress}
            bgColor={Colors.White}
            onPress={() => {
              mode === 'new' ? setNewLocationEditing(true) : setCurrentIndex(index as number);
              setStepInitialParam('map', { webBehavior: 'push' })
            }}
          />
          <Separator />
        </View>
        {!!tempContactPersons.length ?
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
                      mode === 'new' ? setNewLocationEditing(true) : setCurrentIndex(index as number);
                      setStepInitialParam('contactPersons', { webBehavior: 'push' })
                    }}
                  >
                    <Pencil />
                  </Button>
                </View>
              </View>
              <View >
                {currentContactPersons.filter(person => tempContactPersons.includes(person.tempId as number)).map(({ id, email, mobile_number }, i) =>
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
              mode === 'new' ? setNewLocationEditing(true) : setCurrentIndex(index as number);
              setStepInitialParam('contactPersons', { webBehavior: 'push' })
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '40%' }}>
            <Button
              fullwidth={false}
              variant='text'
              onPress={() => mode === 'new' ?
                addNewLocation()
                : confirmEditingLocation(index)
              }
            >
              <Typography color={Colors.Blue500} weight='Bold'>
                {mode === 'new' ? 'Utwórz lokalizację' : 'Zaktualizuj'}
              </Typography>
            </Button>
          </View>
          <View style={{ width: '40%' }}>
            <Button
              fullwidth={false}
              variant='text'
              onPress={() => mode === 'new' ? setNewLocation(null) : cancelEditing(tempId as number, index)}
            >
              <Typography color={Colors.Blue500} weight='Bold'>
                Anuluj
              </Typography>
            </Button>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {step === 'locations' &&
        <ScreenHeaderProvider
          title='Dodatkowe lokalizacje'
          backgroundContent={'none'}
        >
          <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingTop: 25 }}>
            {!newLocation ?
              <Button
                variant='TouchableOpacity'
                onPress={() => setNewLocation(emptyLocation)}
                style={{ marginTop: 20 }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <SvgIcon icon="createCircleSmall" />
                  <Typography variant="h5" weight='Bold'>
                    {'  '}Dodaj lokalizację
                  </Typography>
                </View>
              </Button>

              :

              <View style={{ paddingHorizontal: 19 }}>
                {locationFormItem({
                  mode: 'new',
                  name: newLocation.name,
                  location: newLocation.location,
                  tempContactPersons: newLocation.tempContactPersons,
                })}
              </View>
            }
            {!!locations.length &&
              <View style={{ marginVertical: 30, marginHorizontal: 19 }}>
                <Typography size={18} weight='Bold'>
                  Lista lokalizacji
                </Typography>
                <View style={{ marginTop: 20, gap: 20 }}>
                  {locations.map(({ tempId, name, location, tempContactPersons }, index) =>
                    !inEditing.includes(index) && validateLocations('list', index) ?
                      mode === 'edit' ?
                        <View
                          key={index}
                          style={{ backgroundColor: Colors.White, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 4 }}
                        >
                          {locationListItem(name as string, location as any, index)}
                        </View>

                        :

                        <CheckBox
                          key={index}
                          checked={selectedLocations.includes(tempId as number)}
                          onCheckedChange={() => handleSelectedLocations(tempId as number)}
                          containerStyle={{ backgroundColor: Colors.White, paddingLeft: 10, paddingRight: 19, borderRadius: 4 }}
                          leftTextView={
                            <View style={{ backgroundColor: Colors.White, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, alignItems: 'center' }}>
                              {locationListItem(name as string, location as any, index)}
                            </View>
                          }
                        />

                      :

                      <>
                        {locationFormItem({
                          tempId,
                          mode: 'edit',
                          index,
                          name,
                          location,
                          tempContactPersons,
                        })}
                      </>
                  )}
                </View>
              </View>
            }
          </ScrollView>
          <Button
            stickyBottom
            onPress={() => handleConfirm()}
          >
            Potwierdź
          </Button>
        </ScreenHeaderProvider>
      }
      {step === 'map' &&
        <View>
          <GoogleMapScreen
            callback={(address) => googleMapCallback(address)}
            initialAddress={newLocationEditing ? newLocation?.location : locations[currentIndex].location as any}
          /* closeCallback={() => { backHandler() }} */
          />
        </View>
      }
      {step === 'contactPersons' &&
        <AddContactPersonsScreen
          mode='select'
          initialContactPersons={currentContactPersons}
          initialSelected={(newLocationEditing && !!newLocation) ? newLocation.tempContactPersons : locations[currentIndex].tempContactPersons}
          selectedContactPersonsCallback={(contacts) => selectedContactPersonsCallback(contacts)}
          contactPersonsCallback={(contactPersons) => { contactPersonsCallback(contactPersons), setCurrentContactPersons(contactPersons) }}
        />
      }
      {deleteModal.active &&
        <Modal
          onClose={() => setDeleteModal({ active: false })}
        >
          <View style={{ padding: 40, gap: 30 }}>
            <View style={{ alignItems: 'center' }}>
              <Typography variant='h5' >
                Na pewno chcesz usunąć lokalizację?
              </Typography>
              <Typography variant='h5'>
                Lokalizacja może być powiązana z ofertami pracy.
              </Typography>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                fullwidth={false}
                size='medium'
                borderRadius={4}
                style={{ width: 120 }}
                onClick={() => {
                  deleteLocation(deleteModal.index as number)
                  setDeleteModal({ active: false })
                }}
              >
                Usuń
              </Button>
              <Button
                fullwidth={false}
                size='medium'
                variant='secondary'
                borderRadius={4}
                style={{ width: 120 }}
                onClick={() => setDeleteModal({ active: false })}
              >
                Anuluj
              </Button>
            </View>
          </View>
        </Modal>
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
    borderRadius: 4,
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
    gap: 15,
    padding: 10
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