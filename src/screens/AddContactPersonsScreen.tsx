import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
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
import Modal from '../components/atoms/Modal';
import CheckBox from '../components/atoms/CheckBox';
import { Separator } from 'tamagui';
import { isString } from 'lodash';

const emptyPerson: ContactPersonType  = {
  email: null,
  mobile_number: null,
  contact_hours: '08:00-18:00',
  preferred_mobile_number: false,
  preferred_email: false,
};

export type AddContactPersonsScreenProps = {
  contactPersons: ContactPersonType[],
  setContactPersons: React.Dispatch<React.SetStateAction<ContactPersonType[]>>,
};

const AddContactPersonsScreen: React.FC<AddContactPersonsScreenProps> = (props) => {
  const { contactPersons: initContactPersons, setContactPersons: changeContactPersonsHandler } = props;
  const [contactPersons, setContactPersons] = useState<ContactPersonType[]>(initContactPersons.length ?  [...initContactPersons].sort((a, b) => {
    const orderA = a.id ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.id ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  }) : [emptyPerson]);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [showTimepicker, setShowTimepicker] = useState<'start' | 'end' | false>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const { backToRemoveParams } = useRouter();
  
  useEffect(() => {
    setIsDataValid(validateContactPersons());
  }, [contactPersons]);

  const validateContactPersons = (index?: number) => {
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
  };

  const addNewContactPerson = () => {
    setContactPersons(prev => [...prev, emptyPerson])

    if (isDataValid) {
      setShowTips(false);
    };
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

  const handleConfirm = () => {
    if (isDataValid) {
      changeContactPersonsHandler(contactPersons);
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

  return (
    <ScreenHeaderProvider title='Dane do kontaktu'>
      <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingTop: 25 }}>
        {contactPersons.map(({ email, mobile_number, id, contact_hours, preferred_mobile_number, preferred_email }, index) => (
          <View style={styles.ContactPerson} key={id}>
            <View style={styles.ContactPersonHeader}>
              <Typography size={18} weight='Bold' style={{ marginVertical: 10 }}>Osoba {index + 1}</Typography>
              {(index !== 0 || contactPersons.length > 1) && <TouchableOpacity onPress={() => deleteContactPerson(index)}>
                <Typography color={Colors.Danger}>usuń</Typography>
              </TouchableOpacity>}
            </View>
            <View style={{ marginBottom: 30 }}>
              <TextField
                label="Email"
                value={email || ''}
                onChangeText={text => editContactPersons('email', text, index)}
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
                onChangeText={(text) => editContactPersons('mobile_number', text, index)}
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
                onCheckedChange={(value) => editContactPersons('preferred_mobile_number', value, index,)}
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
                onCheckedChange={(value) => editContactPersons('preferred_email', value, index,)}
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
            {index + 1 === contactPersons.length && (email && mobile_number) &&
              <Button
                variant='text'
                onPress={() => validateContactPersons(index) ? addNewContactPerson() : setShowTips(true)}
              >
                <Typography color={Colors.Blue500} weight='Bold'>Dodaj kolejną osobę</Typography>
              </Button>
            }
            {contact_hours &&
              <TimePickerModal
                visible={!!showTimepicker}
                onDismiss={() => setShowTimepicker(false)}
                hours={startHours(contact_hours)}
                minutes={startMinutes(contact_hours)}
                onConfirm={({ hours, minutes }) => {
                  const time = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
                  if (showTimepicker === 'start') {
                    const newStartTime = new Date(0, 0, 0, hours, minutes)
                    const endTime = new Date(0, 0, 0, parseInt(contact_hours?.substring(6, 8)), parseInt(contact_hours?.substring(9, 11)));
                    if (newStartTime >= endTime) {
                      setErrorModal('Godzina początkowa nie może być późniejsza niż godzina końcowa');
                    } else {
                      editContactPersons('contact_hours', (time + contact_hours.substring(5)), index);
                      setShowTimepicker(false);
                    };
                  } else {
                    const newEndTime = new Date(0, 0, 0, hours, minutes)
                    const startTime = new Date(0, 0, 0, parseInt(contact_hours.substring(0, 2)), parseInt(contact_hours.substring(3, 5)));
                    if (newEndTime <= startTime) {
                      setErrorModal('Godzina końcowa nie może być wcześniejsza niż godzina początkowa');
                    } else {
                      editContactPersons('contact_hours', (contact_hours.substring(0, contact_hours.length - 5) + time), index);
                      setShowTimepicker(false);
                    }
                  }
                }}
              />
            }
          </View>))}
      </ScrollView>
      <Modal
        transparent={true}
        visible={!!errorModal}
        onClose={() => setErrorModal(null)}
      >
        <View style={styles.ErrorModalContainer}>
          <View style={styles.ErrorModalContent}>
            <Typography>
              {errorModal}
            </Typography>
            <Button
              style={{ height: 30 }}
              variant='text'
              onPress={() => setErrorModal(null)}
            >
              Ok
            </Button>
          </View>
        </View>
      </Modal>
      <View>
        <Button onPress={() => handleConfirm()}>
          Potwierdź
        </Button>
      </View>
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

export default AddContactPersonsScreen;