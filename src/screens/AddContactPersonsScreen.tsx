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
import Modal from '../components/atoms/Modal';


const emptyPerson: ContactPersonType = {
  first_name: null,
  last_name: null,
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

export type AddContactPersonsScreenProps = ({
  mode: 'edit'
  initialContactPersons: ContactPersonType[],
  selectedContactPersonsCallback?: never,
  initialSelected?: never,
} | {
  mode: 'select'
  initialContactPersons: ContactPersonType[],
  initialSelected: number[],
  selectedContactPersonsCallback: (contactPersons: number[]) => void,
}) & {
  contactPersonsCallback: (contactPersons: ContactPersonType[]) => void,
};

const AddContactPersonsScreen: React.FC<AddContactPersonsScreenProps> = ({
  mode,
  initialSelected,
  initialContactPersons,
  contactPersonsCallback,
  selectedContactPersonsCallback,
}) => {
  const oldContactPersons = initialContactPersons && initialContactPersons.length ? [...initialContactPersons].sort((a, b) => {
    const orderA = a.id ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.id ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  }) : [];
  const [contactPersons, setContactPersons] = useState<ContactPersonType[]>(initialContactPersons && initialContactPersons.length ? [...initialContactPersons].sort((a, b) => {
    const orderA = a.id ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.id ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  }) : []);
  const [unsavedData, setUnsavedData] = useState<boolean>(false);
  const [inEditing, setInEditing] = useState<number[]>([]);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [showTimepicker, setShowTimepicker] = useState<'start' | 'end' | false>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [newPerson, setNewPerson] = useState<ContactPersonType | null>(null);
  const [selectedPersons, setSelectedPersons] = useState<number[]>(initialSelected || []);
  const [beforeEditing, setBeforeEditing] = useState<ContactPersonType[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ active: boolean, index?: number }>({ active: false });
  const { backToRemoveParams } = useRouter();
  const { blockedScreen } = useTypedSelector(s => s.general);
  const { setBlockedScreen, setSnackbarMessage } = useActions();

  useEffect(() => {
    setIsDataValid(validateContactPersons('list'));
  }, [contactPersons]);

  useEffect(() => {
    setUnsavedData(!!(!!newPerson || !isEqual(oldContactPersons, contactPersons) || !!inEditing.length) || (mode === 'select' && !isEqual(initialSelected, selectedPersons)));
  }, [oldContactPersons, contactPersons, newPerson]);

  useEffect(() => {
    setBlockedScreen({ ...blockedScreen, blockedBack: unsavedData });
  }, [unsavedData]);

  const isEmailUnique = (email: string, mode: 'new' | 'edit', index?: number) => {
    if (mode === 'new') {
      return !contactPersons.some(item => item.email === email);
    } else {
      return !contactPersons.some((item, i) => !!(item.email === email && i !== index));
    };
  };

  const validateContactPersons = (mode: 'newPerson' | 'list', index?: number) => {
    if (mode === 'newPerson') {
      return !!(
        !!newPerson
        && (newPerson.first_name && (newPerson.first_name.length >= 2 && newPerson.first_name.length <= 100))
        && (newPerson.last_name && (newPerson.last_name.length >= 2 && newPerson.last_name.length <= 100))
        && !!(newPerson.email && validateMail(newPerson.email) && isEmailUnique(newPerson.email, 'new'))
        && newPerson.mobile_number && newPerson.mobile_number.length === 12
        && (newPerson.preferred_mobile_number || newPerson.preferred_email)
      )
    } else {
      const array = index !== undefined ? [contactPersons[index]] : contactPersons;

      for (const [i, contact] of array.entries()) {
        if (
          (contact.first_name && (contact.first_name.length >= 2 && contact.first_name.length <= 100))
          && (contact.last_name && (contact.last_name.length >= 2 && contact.last_name.length <= 100))
          && !!(contact.email && validateMail(contact.email) && isEmailUnique(contact.email, 'edit', index !== undefined ? index : i))
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
      setContactPersons(prev => [...prev, { ...newPerson, tempId: Math.floor(Math.random() * 100000000000) }]);
      setNewPerson(null);
    };
  };

  const editNewPerson = (key: keyof ContactPersonType, value: any) => {
    if (!!newPerson) {
      const editedPerson = { ...newPerson, [key]: !isString(value) ? value : value ? value.replace(/\s/g, '') : null };
      setNewPerson(editedPerson);
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

  const cancelEditing = (tempIdToFind: number, index: number) => {
    const beforeEditingIndex = beforeEditing.findIndex(item => item.tempId === tempIdToFind);

    if (beforeEditingIndex !== -1) {
      const updatedContactPersons = [...contactPersons];
      const objectToReplace = beforeEditing[beforeEditingIndex];
      const indexOfObjectToReplace = updatedContactPersons.findIndex(item => item.tempId === tempIdToFind);
      if (indexOfObjectToReplace !== -1) {
        updatedContactPersons[indexOfObjectToReplace] = objectToReplace;
        const updatedBeforeEditing = beforeEditing.filter(item => item.tempId !== tempIdToFind);
        setContactPersons(updatedContactPersons);
        setBeforeEditing(updatedBeforeEditing);
      };
    };

    setInEditing(prevState => prevState.filter(value => value !== index));
  };

  const handleSelectedPersons = (id: number) => {
    const mySet = new Set([...selectedPersons]);
    if (mySet.has(id)) {
      mySet.delete(id);
    } else {
      mySet.add(id);
    };
    setSelectedPersons([...mySet]);
  };

  const handleConfirm = () => {
    if (!!newPerson) {
      setSnackbarMessage({ type: 'error', text: 'Dokończ tworzenie kontaktu' });
    } else if (!!inEditing.length) {
      setSnackbarMessage({ type: 'error', text: 'Dokończ edytowanie kontaktu' });
    } else if (mode === 'select' && !selectedPersons.length) {
      setSnackbarMessage({ type: 'error', text: 'Wybierz co najmniej jeden kontakt' });
    } else if (!contactPersons.length) {
      setSnackbarMessage({ type: 'error', text: 'Musisz dodać co najmniej jeden kontakt' });
    } else if (isDataValid) {
      if (!isEqual(contactPersons, oldContactPersons)) {
        contactPersonsCallback(contactPersons);
        setSnackbarMessage({ type: 'success', text: 'Zaktualizowano listę kontaktów' });
      };
      if (mode === 'select') {
        selectedContactPersonsCallback(selectedPersons);
      };
      backToRemoveParams({ force: true });
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

  const contactListItem = (first_name: string, last_name: string, email: string, index: number) => {
    return (
      <>
        <View style={styles.NameAndEmailContainer}>
          <Typography variant='h5'>
            {first_name} {last_name}
          </Typography>
          <Typography variant='h5'>
            {email}
          </Typography>
        </View>
        <View style={[styles.EditButtons, { padding: mode === 'edit' ? 10 : 0, paddingRight: 'edit' ? 19 : 0 }]}>
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
              setBeforeEditing(prev => [...prev, contactPersons[index]]);
            }}
          >
            <Pencil />
          </Button>
        </View>
      </>
    )
  };

  const contactFormItem = (data: ContactPersonItemType) => {
    const { mode, index, first_name, last_name, email, mobile_number, preferred_mobile_number, preferred_email, contact_hours, tempId } = data;
    return (
      <View style={styles.ContactPerson}>
        <View style={styles.ContactPersonHeader}>
          <Typography size={18} weight='Bold' style={styles.FormItemHeader}>
            {mode === 'new' ? 'Nowy kontakt' : `Edytowanie kontaktu ${index + 1}`}
          </Typography>
          {mode === 'edit' &&
            <Button
              variant='TouchableOpacity'
              onPress={() => setDeleteModal({ active: true, index: index })}
            >
              <Typography color={Colors.Danger}>
                <Trash2 />
              </Typography>
            </Button>
          }
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextField
            label='Imię*'
            value={first_name || ''}
            maxLength={100}
            onChangeText={text => mode === 'new' ? editNewPerson('first_name', text) : editContactPersons('first_name', text, index)}
            {...(showTips && (!first_name || (first_name.length < 2 && first_name.length > 100)) && {
              bottomText: 'Imię musi zawierać od 2 do 100 znaków',
            })}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextField
            label='Nazwisko*'
            value={last_name || ''}
            maxLength={100}
            onChangeText={text => mode === 'new' ? editNewPerson('last_name', text) : editContactPersons('last_name', text, index)}
            {...(showTips && (!last_name || (last_name.length < 2 && last_name.length > 100)) && {
              bottomText: 'Nazwisko musi zawierać od 2 do 100 znaków',
            })}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextField
            label='Email*'
            value={email || ''}
            onChangeText={text => mode === 'new' ? editNewPerson('email', text) : editContactPersons('email', text, index)}
            {...(showTips && (!email || !validateMail(email) || !isEmailUnique(email, mode, index)) && {
              bottomText: !email ? 'Wprowadź adres email' : !isEmailUnique(email, mode, index) ? 'Taki adres email już istnieje' : 'Niepoprawny adres email',
            })}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextField
            label='Telefon*'
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
          <View style={styles.HourDivider}>
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
        <View style={styles.FormButtons}>
          <View style={styles.FormButton}>
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
          <View style={styles.FormButton}>
            <Button
              fullwidth={false}
              variant='text'
              onPress={() => mode === 'new' ? setNewPerson(null) : cancelEditing(tempId as number, index as number)}
            >
              <Typography color={Colors.Blue500} weight='Bold'>
                Anuluj
              </Typography>
            </Button>
          </View>
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
        {!newPerson ?
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

          :

          <View style={{ paddingHorizontal: 19 }}>
            {contactFormItem({
              mode: 'new',
              first_name: newPerson.first_name,
              last_name: newPerson.last_name,
              email: newPerson.email,
              mobile_number: newPerson.mobile_number,
              preferred_mobile_number: newPerson.preferred_mobile_number,
              preferred_email: newPerson.preferred_email,
              contact_hours: newPerson.contact_hours,
            })}
          </View>
        }
        {!!contactPersons.length &&
          <View style={styles.ContactListContainer}>
            <Typography size={18} weight='Bold'>
              Lista kontaktów
            </Typography>
            <View style={styles.ContactList}>
              {contactPersons.map(({ first_name, last_name, email, mobile_number, tempId, contact_hours, preferred_mobile_number, preferred_email }, index) =>
                !inEditing.includes(index) ?
                  mode === 'edit' ?
                    (first_name && last_name && email) &&
                    <View
                      key={index}
                      style={styles.ContactItem}
                    >
                      {contactListItem(first_name, last_name, email, index)}
                    </View>

                    :

                    (first_name && last_name && email && tempId) &&
                    <CheckBox
                      key={index}
                      checked={selectedPersons.includes(tempId)}
                      onCheckedChange={() => handleSelectedPersons(tempId)}
                      containerStyle={styles.ContactCheckbox}
                      flexDirection='row-reverse'
                      leftTextView={
                        <View style={styles.ContactCheckboxItem}>
                          {contactListItem(first_name, last_name, email, index)}
                        </View>
                      }
                    />

                  :

                  <>
                    {contactFormItem({
                      mode: 'edit',
                      index,
                      first_name,
                      last_name,
                      email,
                      mobile_number,
                      preferred_mobile_number,
                      preferred_email,
                      contact_hours,
                      tempId
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
      {
        deleteModal.active &&
        <Modal
          onClose={() => setDeleteModal({ active: false })}
        >
          <View style={styles.ModalContent}>
            <View style={styles.ModalTextContainer}>
              <Typography variant='h5' >
                Na pewno chcesz usunąć osobę?
              </Typography>
              <Typography variant='h5' style={styles.ModalText}>
                Kontakt może być przypisany do lokalizacji lub oferty pracy.
              </Typography>
            </View>
            <View style={styles.ModalButtons}>
              <Button
                fullwidth={false}
                size='medium'
                borderRadius={4}
                style={styles.ModalButton}
                onClick={() => {
                  deleteContactPerson(deleteModal.index as number)
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
                style={styles.ModalButton}
                onClick={() => setDeleteModal({ active: false })}
              >
                Anuluj
              </Button>
            </View>
          </View>
        </Modal>
      }
    </ScreenHeaderProvider >
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
    marginBottom: 24,
    borderRadius: 4,
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
    gap: 15,
  },
  EditButton: {
    width: 'auto',
    padding: 0,
    height: 50,
    justifyContent: 'center'
  },
  NameAndEmailContainer: {
    gap: 10,
    padding: 20,
    width: '70%'
  },
  FormItemHeader: {
    marginVertical: 20
  },
  HourDivider: {
    justifyContent: 'center',
    height: 100,
    width: 30,
    alignItems: 'center'
  },
  FormButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  FormButton: {
    width: '40%'
  },
  ContactListContainer: {
    marginVertical: 30,
    marginHorizontal: 19
  },
  ContactList: {
    marginTop: 20, gap: 20,
  },
  ContactItem: {
    backgroundColor: Colors.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  ContactCheckbox: {
    backgroundColor: Colors.White,
    paddingLeft: 19,
    paddingRight: 9,
    borderRadius: 4
  },
  ContactCheckboxItem: {
    backgroundColor: Colors.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ModalContent: {
    padding: 20,
    gap: 30,
  },
  ModalTextContainer: {
    alignItems: 'center'
  },
  ModalText: {
    alignItems: 'center'
  },
  ModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ModalButton: {
    width: 120
  }
});

export default AddContactPersonsScreen;