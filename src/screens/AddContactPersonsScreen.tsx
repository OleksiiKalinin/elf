import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AddressType, CompanyDataType, ContactPersonType } from '../store/reducers/types';
import Typography from '../components/atoms/Typography';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import Button from '../components/molecules/Button';
import Colors from '../colors/Colors';
import useRouter from '../hooks/useRouter';
import { ScrollView } from '../components/molecules/ScrollView';
import SvgIcon from '../components/atoms/SvgIcon';
import TimePickerModal from '../components/modified_modules/react-native-paper-dates/Time/TimePickerModal';
import validateMail from '../hooks/validateMail';
import Modal from '../components/atoms/Modal';

export type AddContactPersonsScreenProps = {
  contactPersons: ContactPersonType[],
  setContactPersons: React.Dispatch<React.SetStateAction<ContactPersonType[]>>,
  companyData: CompanyDataType,
  changeCompanyDataHandler: (name: keyof CompanyDataType, value: string | number | AddressType, replaceSpaces?: boolean) => void
};

const AddContactPersonsScreen: React.FC<AddContactPersonsScreenProps> = (props) => {
  const { companyData, changeCompanyDataHandler, contactPersons: initContactPersons, setContactPersons: changeContactPersonsHandler } = props;
  const [contactHours, setContactHours] = useState<string>(companyData.contact_hours || '08:00-18:00');
  const [contactPersons, setContactPersons] = useState<ContactPersonType[]>(initContactPersons);
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
        !contact.account_instagram || (contact.account_instagram && urlPattern.test(contact.account_instagram)) &&
        !contact.account_facebook || (contact.account_facebook && urlPattern.test(contact.account_facebook))
      ) {
        continue;
      } else {
        return false;
      };
    };

    return true;
  };

  const addNewContactPerson = () => {
    setContactPersons(prev => [...prev, {
      account_facebook: null,
      account_instagram: null,
      account_twitter: null,
      account_youtube: null,
      email: null,
      link: null,
      mobile_number: null,
      id: Date.now()
    }])

    if (isDataValid) {
      setShowTips(false);
    };
  };

  const editContactPersons = (key: keyof ContactPersonType, value: string | null, index: number) => {
    setContactPersons(contactPersons => {
      const currPerson: ContactPersonType | undefined = contactPersons[index];
      if (currPerson) {
        return [
          ...contactPersons.slice(0, index),
          { ...currPerson, [key]: value ? value.replace(/\s/g, '') : null },
          ...contactPersons.slice(index + 1)
        ];
      } else {
        return contactPersons;
      }
    })
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
      }
    })
  };

  const handleConfirm = () => {
    if (isDataValid) {
      changeContactPersonsHandler(contactPersons);
      changeCompanyDataHandler('contact_hours', contactHours);
      backToRemoveParams();
    } else {
      setShowTips(true);
    };
  };

  const startHours = showTimepicker === 'start' ?
    parseInt(contactHours.substring(0, 1) === '0' ? contactHours.substring(1, 2) : contactHours.substring(0, 2))
    :
    parseInt(contactHours.substring(6, 7) === '0' ? contactHours.substring(7, 8) : contactHours.substring(6, 8));

  const startMinutes = showTimepicker === 'start' ?
    parseInt(contactHours.substring(3, 4) === '0' ? contactHours.substring(4, 5) : contactHours.substring(3, 5))
    :
    parseInt(contactHours.substring(9, 10) === '0' ? contactHours.substring(10, 11) : contactHours.substring(9, 11));

  const urlPattern = /^(http|https):\/\/[^ "]+$/;

  return (
    <ScreenHeaderProvider title='Dane do kontaktu'>
      <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingTop: 25 }}>
        {contactPersons.map(({ account_facebook, account_instagram, email, mobile_number, id }, index) => (
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
            <View style={{ marginBottom: 20 }}>
              <TextField
                left={<SvgIcon icon='instagram' />}
                label="Instagram"
                value={account_instagram || ''}
                onChangeText={text => editContactPersons('account_instagram', text, index)}
                {...(showTips && account_instagram?.length && !urlPattern.test(account_instagram) && {
                  bottomText: 'Niepoprawny adres url',
                })}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <TextField
                left={<SvgIcon icon='facebook' />}
                label="Facebook"
                value={account_facebook || ''}
                onChangeText={text => editContactPersons('account_facebook', text, index)}
                {...(showTips && account_facebook?.length && !urlPattern.test(account_facebook) && {
                  bottomText: 'Niepoprawny adres url',
                })}
              />
            </View>
            {index + 1 === contactPersons.length && (email && mobile_number) &&
              <Button
                variant='text'
                onPress={() => validateContactPersons(index) ? addNewContactPerson() : setShowTips(true)}
              >
                <Typography color={Colors.Blue500} weight='Bold'>Dodaj kolejną osobę</Typography>
              </Button>
            }
          </View>))}
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
              {contactHours.substring(0, contactHours.length - 6)}
            </Button>
          </View>
          <View style={{ justifyContent: 'center', height: 100 }}>
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
              {contactHours.substring(6)}
            </Button>
          </View>
        </View>
      </ScrollView>
      <TimePickerModal
        visible={!!showTimepicker}
        onDismiss={() => setShowTimepicker(false)}
        hours={startHours}
        minutes={startMinutes}
        onConfirm={({ hours, minutes }) => {
          const time = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
          if (showTimepicker === 'start') {
            const newStartTime = new Date(0, 0, 0, hours, minutes)
            const endTime = new Date(0, 0, 0, parseInt(contactHours.substring(6, 8)), parseInt(contactHours.substring(9, 11)));
            if (newStartTime >= endTime) {
              setErrorModal('Godzina początkowa nie może być późniejsza niż godzina końcowa');
            } else {
              setContactHours(time + contactHours.substring(5));
              setShowTimepicker(false);
            };
          } else {
            const newEndTime = new Date(0, 0, 0, hours, minutes)
            const startTime = new Date(0, 0, 0, parseInt(contactHours.substring(0, 2)), parseInt(contactHours.substring(3, 5)));
            if (newEndTime <= startTime) {
              setErrorModal('Godzina końcowa nie może być wcześniejsza niż godzina początkowa');
            } else {
              setContactHours(contactHours.substring(0, contactHours.length - 5) + time);
              setShowTimepicker(false);
            }
          }
        }}
      />
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
    marginHorizontal: 19,
    marginBottom: 5,
    marginTop: 32,
    flexDirection: 'row'
  },
  ContactHoursButtons: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 19,
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