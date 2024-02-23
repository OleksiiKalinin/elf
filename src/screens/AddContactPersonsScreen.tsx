import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler, Platform } from 'react-native';
import { ContactPersonType } from '../store/reducers/types';
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
import { uuidv4 } from 'react-native-compressor';
import { Pencil, Trash2 } from '@tamagui/lucide-icons';
import SvgIcon from '../components/atoms/SvgIcon';


const emptyPerson: ContactPersonType = {
  email: null,
  mobile_number: null,
  contact_hours: '08:00-18:00',
  preferred_mobile_number: false,
  preferred_email: false,
};

type ContactPersonItemType = ({
  mode: 'new',
  index?: never,
} | {
  mode: 'edit',
  index: number,
}) & ContactPersonType;

export type AddContactPersonsScreenProps = {
  initialContactPersons: ContactPersonType[],
  callback: (contactPersons: ContactPersonType[]) => void,
};

const AddContactPersonsScreen: React.FC<AddContactPersonsScreenProps> = ({
  initialContactPersons,
  callback,
}) => {
  const oldContactPersons = initialContactPersons && initialContactPersons.length ? [...initialContactPersons].sort((a, b) => {
    const orderA = a.id ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.id ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  }) : [emptyPerson];
  const [contactPersons, setContactPersons] = useState<ContactPersonType[]>(initialContactPersons && initialContactPersons.length ? [...initialContactPersons].sort((a, b) => {
    const orderA = a.id ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.id ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  }) : [emptyPerson]);
  const [unsavedData, setUnsavedData] = useState<boolean>(false);
  const [mode, setMode] = useState<'edit' | 'select'>('select');
  const [inEditing, setInEditing] = useState<number[]>([]);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [showTimepicker, setShowTimepicker] = useState<'start' | 'end' | false>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [newPerson, setNewPerson] = useState<ContactPersonType | null>(null);
  const [selectedPersons, setSelectedPersons] = useState<number[]>([]);
  const { backToRemoveParams } = useRouter();
  const { blockedScreen } = useTypedSelector(s => s.general);
  const { setBlockedScreen, setSnackbarMessage } = useActions();

  useEffect(() => {
    setIsDataValid(validateContactPersons('list'));
  }, [contactPersons]);

  useEffect(() => {
    console.log(inEditing);
  }, [inEditing]);

  useEffect(() => {
    setUnsavedData(!isEqual(oldContactPersons, contactPersons));
  }, [oldContactPersons, contactPersons]);

  useEffect(() => {
    setBlockedScreen({ ...blockedScreen, blockedBack: unsavedData });
  }, [unsavedData]);

  const validateContactPersons = (mode: 'newPerson' | 'list', index?: number) => {
    if (mode === 'newPerson') {
      if (
        !!newPerson
        && newPerson.email && validateMail(newPerson.email)
        && newPerson.mobile_number && newPerson.mobile_number.length === 12
        && (newPerson.preferred_mobile_number || newPerson.preferred_email)
      ) return true;
      return false;
    } else {
      const array = index ? [contactPersons[index]] : contactPersons;

      for (const contact of array) {
        if (
          contact.email && validateMail(contact.email)
          && contact.mobile_number && contact.mobile_number.length === 12
          && (contact.preferred_mobile_number || contact.preferred_email)
        ) {
          continue;
        } else {
          return false;
        };
      };

      return true;
    };
  };

  const addNewContactPerson = () => {
    if (!!newPerson) {
      setContactPersons(prev => [...prev, newPerson]);
      setNewPerson(null);
    };
  };

  const editNewPerson = (key: keyof ContactPersonType, value: any) => {
    const editedPerson = { ...newPerson, [key]: !isString(value) ? value : value ? value.replace(/\s/g, '') : null }
    setNewPerson(editedPerson as any)
  };

  const editContactPersons = (key: keyof ContactPersonType, value: any, index: number) => {
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
  };

  const deleteContactPerson = (index: number) => {
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
  };

  const handleSelectedPersons = (id: number) => {
    const mySet = new Set([...selectedPersons]);
    if (mySet.has(id)) {
      mySet.delete(id);
    } else {
      mySet.add(id);
    }
    setSelectedPersons([...mySet]);
  };

  const handleConfirm = () => {
    if (inEditing.length) {
      setSnackbarMessage({ type: 'error', text: 'Dokończ edytowanie kontaktów' })
    } else if (isDataValid) {
      const updatedContactPersons = contactPersons.map(contact => ({
        ...contact,
        tempId: contact.tempId || Math.floor(Math.random() * 100000000000)
      }));
      callback(updatedContactPersons);
      backToRemoveParams();
    } else {
      setShowTips(true);
    };
  };

  const startHours = (contactHours: string) => {
    return showTimepicker === 'start' ?
      parseInt(contactHours.substring(0, 1) === '0' ? contactHours.substring(1, 2) : contactHours.substring(0, 2))
      :
      parseInt(contactHours.substring(6, 7) === '0' ? contactHours.substring(7, 8) : contactHours.substring(6, 8));
  };

  const startMinutes = (contactHours: string) => {
    return showTimepicker === 'start' ?
      parseInt(contactHours.substring(3, 4) === '0' ? contactHours.substring(4, 5) : contactHours.substring(3, 5))
      :
      parseInt(contactHours.substring(9, 10) === '0' ? contactHours.substring(10, 11) : contactHours.substring(9, 11));
  };

  const contactListItem = (email: string, mobile_number: string, index: number) => {
    return (
      <>
        <View>
          <Typography>
            {email}
          </Typography>
          <Typography>
            {mobile_number}
          </Typography>
        </View>
        <View style={styles.EditButtons}>
          <Button
            variant='TouchableOpacity'
            style={styles.EditButton}
            onPress={() => deleteContactPerson(index)}
          >
            <Trash2 />
          </Button>
          <Button
            variant='TouchableOpacity'
            style={styles.EditButton}
            onPress={() => { setInEditing(prev => [...prev, index]) }}
          >
            <Pencil />
          </Button>
        </View>
      </>
    )
  };

  const contactPersonItem = (data: ContactPersonItemType) => {
    const { mode, index, email, mobile_number, preferred_mobile_number, preferred_email, contact_hours } = data;
    return (
      <View style={styles.ContactPerson}>
        <View style={styles.ContactPersonHeader}>
          <Typography size={18} weight='Bold' style={{ marginVertical: 20 }}>
            {mode === 'new' ? 'Nowy kontakt' : `Edytowanie kontaktu ${index + 1}`}
          </Typography>
          <Button
            variant='TouchableOpacity'
            onPress={() => mode === 'new' ? setNewPerson(null) : deleteContactPerson(index)}
          >
            <Typography color={Colors.Danger}>
              <Trash2 />
            </Typography>
          </Button>
        </View>
        <View style={{ marginBottom: 30 }}>
          <TextField
            label="Email"
            value={email || ''}
            onChangeText={text => mode === 'new' ? editNewPerson('email', text) : editContactPersons('email', text, index)}
            {...(showTips && (!email || !validateMail(email)) && {
              bottomText: !email ? 'Wprowadź adres email' : 'Niepoprawny adres email',
            })}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextField
            label='Telefon'
            textContentType='telephoneNumber'
            keyboardType='phone-pad'
            mask={['+', '4', '8', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
            activeLabel
            value={mobile_number || ''}
            onChangeText={(text) => mode === 'new' ? editNewPerson('mobile_number', text) : editContactPersons('mobile_number', text, index)}
            {...(showTips && (!mobile_number || mobile_number.length < 12) && {
              bottomText: !mobile_number ? 'Wprowadź nr telefonu' : 'Niepoprawny nr telefonu',
            })}
          />
        </View>
        <Typography weight="Bold" variant="h5" style={{ marginTop: 20 }}>
          Preferowane formy kontaktu
        </Typography>
        <View style={{ marginTop: 20 }}>
          <Separator />
          <CheckBox
            checked={preferred_mobile_number}
            onCheckedChange={(value) => mode === 'new' ? editNewPerson('preferred_mobile_number', value) : editContactPersons('preferred_mobile_number', value, index)}
            leftTextView={
              <Typography size={16} style={{ paddingVertical: 19 }}>
                Telefon
              </Typography>
            }
            style={{ marginTop: 20 }}
          />
          <Separator />
          <CheckBox
            checked={preferred_email}
            onCheckedChange={(value) => mode === 'new' ? editNewPerson('preferred_email', value) : editContactPersons('preferred_email', value, index)}
            leftTextView={
              <Typography size={16} style={{ paddingVertical: 19 }}>
                Email
              </Typography>
            }
            style={{ marginTop: 20 }}
          />
          <Separator />
          {(showTips && (!preferred_email && !preferred_mobile_number)) &&
            <Typography size={12} color={Colors.Danger}>
              Zaznacz co najmniej jedno z pól
            </Typography>
          }
        </View>
        <View style={styles.ContactHoursHeader}>
          <Typography weight="Bold" variant="h5">
            Godziny kontaktu
          </Typography>
        </View>
        <View style={styles.ContactHoursButtons}>
          <View style={styles.HourButton}>
            <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>od</Typography>
            <Button
              contentWeight='SemiBold'
              contentVariant='h5'
              variant="secondary"
              onPress={() => setShowTimepicker('start')}
              borderRadius={4}
            >
              {contact_hours?.substring(0, contact_hours.length - 6)}
            </Button>
          </View>
          <View style={{ justifyContent: 'center', height: 100, width: 30, alignItems: 'center' }}>
            <Typography weight='Bold' variant='h4' color={Colors.Basic500}>{'  -  '}</Typography>
          </View>
          <View style={styles.HourButton}>
            <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>do</Typography>
            <Button
              contentWeight='SemiBold'
              contentVariant='h5'
              variant="secondary"
              onPress={() => setShowTimepicker('end')}
              borderRadius={4}
            >
              {contact_hours?.substring(6)}
            </Button>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: mode === 'new' ? '100%' : '40%' }}>
            <Button
            fullwidth={false}
              variant='text'
              onPress={() => mode === 'new' ?
                validateContactPersons('newPerson') ? addNewContactPerson() : setShowTips(true)
                : validateContactPersons('list', index) ? setInEditing(prevState => prevState.filter(value => value !== index)) : setShowTips(true)
              }
            >
              <Typography color={Colors.Blue500} weight='Bold'>
                {mode === 'new' ? 'Dodaj kontakt' : 'Zaktualizuj'}
              </Typography>
            </Button>
          </View>

          {mode === 'edit' &&
            <View style={{ width: '40%' }}>
              <Button
              fullwidth={false}
                variant='text'
              /* onPress={() => mode === 'new' ?
                validateContactPersons('newPerson') ? addNewContactPerson() : setShowTips(true)
                : validateContactPersons('list', index) ? setInEditing(prevState => prevState.filter(value => value !== index)) : setShowTips(true)
              } */
              >
                <Typography color={Colors.Blue500} weight='Bold'>
                  Anuluj
                </Typography>
              </Button>
            </View>
          }
        </View>
        <TimePickerModal
          visible={!!showTimepicker}
          onDismiss={() => setShowTimepicker(false)}
          hours={startHours(contact_hours as any) ?? '08:00-18:00'}
          minutes={startMinutes(contact_hours as any) ?? '08:00-18:00'}
          onConfirm={({ hours, minutes }) => {
            const time = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            if (showTimepicker === 'start') {
              mode === 'new' ? editNewPerson('contact_hours', (time + contact_hours?.substring(5))) : editContactPersons('contact_hours', (time + contact_hours?.substring(5)), index);
              setShowTimepicker(false);
            } else {
              mode === 'new' ? editNewPerson('contact_hours', (contact_hours?.substring(0, contact_hours.length - 5) + time)) : editContactPersons('contact_hours', (contact_hours?.substring(0, contact_hours.length - 5) + time), index);
              setShowTimepicker(false);
            };
          }}
        />
      </View >
    )
  }

  return (
    <ScreenHeaderProvider title='Dane do kontaktu'>
      <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingTop: 25 }}>
        {!newPerson &&
          <Button
            variant='TouchableOpacity'
            onPress={() => setNewPerson(emptyPerson)}
            style={{ marginTop: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <SvgIcon icon="createCircleSmall" />
              <Typography variant="h5" weight='Bold'>
                {'  '}Dodaj kontakt
              </Typography>
            </View>
          </Button>
        }
        {!!newPerson &&
          <>
            {contactPersonItem({
              mode: 'new',
              email: newPerson.email,
              mobile_number: newPerson.mobile_number,
              preferred_mobile_number: newPerson.preferred_mobile_number,
              preferred_email: newPerson.preferred_email,
              contact_hours: newPerson.contact_hours,
            })}
          </>
        }
        {!!contactPersons.length &&
          <View style={{ marginTop: 30, marginHorizontal: 19 }}>
            <Typography size={18} weight='Bold'>
              Lista kontaktów
            </Typography>
            <View style={{ marginTop: 20, gap: 20 }}>
              {contactPersons.map(({ email, mobile_number, tempId, contact_hours, preferred_mobile_number, preferred_email }, index) =>
                !inEditing.includes(index) ?

                  mode === 'edit' ?
                    <View style={{ backgroundColor: Colors.White, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                      {contactListItem(email as string, mobile_number as string, index)}
                    </View>

                    :

                    <CheckBox
                      checked={selectedPersons.includes(tempId as number)}
                      onCheckedChange={() => handleSelectedPersons(tempId as number)}
                      containerStyle={{ backgroundColor: Colors.White, paddingHorizontal: 19, borderRadius: 4 }}
                      leftTextView={
                        <View style={{ backgroundColor: Colors.White, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
                          {contactListItem(email as string, mobile_number as string, index)}
                        </View>
                      }
                    />

                  :

                  <>
                    {contactPersonItem({
                      mode: 'edit',
                      index,
                      email,
                      mobile_number,
                      preferred_mobile_number,
                      preferred_email,
                      contact_hours,
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
  EditButtons: {
    flexDirection: 'row',
    gap: 15
  },
  EditButton: {
    width: 'auto',
    padding: 0,
    height: 50,
    justifyContent: 'center'
  }
});

export default AddContactPersonsScreen;