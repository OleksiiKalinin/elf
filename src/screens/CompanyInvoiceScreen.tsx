import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../colors/Colors';
import { useActions } from '../hooks/useActions';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import { AddressType, CompanyRegistrationAddresType } from '../store/reducers/types';
import Button from '../components/molecules/Button';
import useRouter from '../hooks/useRouter';
import { ScrollView } from '../components/molecules/ScrollView';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import companyServices from '../services/companyServices';
import Typography from '../components/atoms/Typography';

type InvoiceFormType = {
  nip: string,
  name: string,
  street: string,
  postalCode: string,
  locality: string,
};

export type CompanyInvoiceScreenProps = {
  initialData?: InvoiceFormType;
  callback: (nip: string, name: string, address: CompanyRegistrationAddresType) => void,
};

const CompanyInvoiceScreen: React.FC<CompanyInvoiceScreenProps> = ({
  initialData,
  callback
}) => {
  const dispatch = useTypedDispatch();
  const { setSnackbarMessage } = useActions();
  const [formData, setFormData] = useState<InvoiceFormType>(initialData || {
    nip: '',
    name: '',
    street: '',
    postalCode: '',
    locality: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [showNipTips, setShowNipTips] = useState<boolean>(false);
  const [showFormTips, setShowFormTips] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { backToRemoveParams } = useRouter();
  const { nip, name, street, postalCode, locality } = formData;

  const changeFormDataHandler = (name: keyof InvoiceFormType, text: string) => {
    setFormData(prev => ({ ...prev, [name]: name === 'postalCode' ? formatPostalCode(text) : text }));
  };

  const formatPostalCode = (text: string) => {
    let formattedValue = text.replace(/[^0-9-]/g, '');
    formattedValue = formattedValue
      .split('')
      .map((char, index) => (index === 2 ? char : char === '-' ? '' : char))
      .join('');
    if (formattedValue.length >= 2 && postalCode[2] !== '-') {
      formattedValue = formattedValue.slice(0, 2) + '-' + formattedValue.slice(2);
      return formattedValue;
    } else {
      return formattedValue;
    };
  };

  const getCompanyDataFromGUS = async () => {
    if (nip.length === 10) {
      setLoading(true);
      const data = await dispatch(companyServices['getCompanyRegistrationData'](nip));
      setLoading(false);
      if (data) {
        const { Nip, Nazwa, Ulica, NrNieruchomosci, NrLokalu, KodPocztowy, Miejscowosc } = data;
        setFormData({
          nip: Nip,
          name: Nazwa,
          street: `${Ulica} ${NrNieruchomosci} ${NrLokalu ? `/ ${NrLokalu}` : ''}`,
          postalCode: KodPocztowy,
          locality: Miejscowosc,
        })
        setSnackbarMessage({ type: 'success', text: 'Dane firmy zostały pobrane' })
      } else {
        setSnackbarMessage({ type: 'error', text: 'Nie udało się pobrać danych. Spróbuj jeszcze raz lub wprowadź ręcznie dane do faktury' })
      }
      setShowForm(true);
    } else {
      setShowNipTips(true);
      setSnackbarMessage({ type: 'error', text: 'Wprowadź poprawnie nr NIP' });
    };
  };

  const validateData = () => {
    if (
      nip.length === 10
      && name.length > 2 && name.length <= 200
      && street.length > 2 && street.length <= 100
      && postalCode.length === 6
      && locality.length > 2 && street.length <= 50
    ) {
      return true;
    } else {
      setShowFormTips(true);
      setSnackbarMessage({ type: 'error', text: 'Wprowadź poprawnie dane we wszystkich polach' });
      return false;
    };
  };

  const handleConfirm = () => {
    if (validateData()) {
      setSnackbarMessage({ type: 'success', text: initialData ? 'Dane do faktury zostały zaktualizowane' :'Dane do faktury zostały uzupełnione' });
      const address = {street, postalCode, locality};
      callback(nip, name, address);
      backToRemoveParams();
    };
  };

  return (
    <ScreenHeaderProvider title={'Dane do faktury'}>
      <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingTop: 24 }}>
        <View style={styles.NipNumber}>
          <View style={styles.NipNumberForm}>
            <View style={{ width: 160 }}>
              <TextField
                label="NIP"
                keyboardType='number-pad'
                maxLength={10}
                value={nip}
                onChangeText={text => changeFormDataHandler('nip', text.replace(/^0/, '').replace(/[^0-9]/g, ''))}
              />
            </View>
            <Button
              withLoading
              disabled={loading}
              variant='secondary'
              onPress={() => getCompanyDataFromGUS()}
              borderRadius={4}
              style={styles.NipButton}
            >
              <Typography weight='Bold'>
                Pobierz dane
              </Typography>
            </Button>
          </View>
          {(showNipTips && nip.length < 10) &&
            <Typography size={12} color={Colors.Danger}>
              Wprowadź poprawnie nr NIP
            </Typography>
          }
        </View>
        {(showForm || initialData) &&
          <>
            <View style={[styles.TextField]}>
              <TextField
                label="Nazwa firmy"
                value={name}
                maxLength={200}
                onChangeText={text => changeFormDataHandler('name', text)}
                {...(showFormTips && (name.length < 3 || name.length > 200) && { bottomText: 'Nazwa firmy musi zawierać od 3 do 200 znaków' })}
              />
            </View>
            <View style={styles.TextField}>
              <TextField
                label='Ulica i nr'
                value={street}
                maxLength={100}
                onChangeText={text => changeFormDataHandler('street', text)}
                {...(showFormTips && (street.length < 3 || street.length > 100) && { bottomText: 'Nazwa ulicy musi zawierać od 3 do 100 znaków' })}
              />
            </View>
            <View style={styles.TextField}>
              <TextField
                maxLength={6}
                label="Kod pocztowy"
                value={postalCode}
                onChangeText={text => changeFormDataHandler('postalCode', text)}
                {...(showFormTips && postalCode.length !== 6 && { bottomText: 'Niepoprawny kod pocztowy' })}
              />
            </View>
            <View style={styles.TextField}>
              <TextField
                maxLength={50}
                label="Miejscowość"
                value={locality}
                onChangeText={text => changeFormDataHandler('locality', text)}
                {...(showFormTips && (locality.length < 3 || locality.length > 50) && { bottomText: 'Nazwa miejscowości musi zawierać od 3 do 50 znaków' })}
              />
            </View>
          </>
        }
      </ScrollView>
      <Button
        stickyBottom
        onPress={() => handleConfirm()}
      >
        Zapisz
      </Button>
    </ScreenHeaderProvider>
  );
};

export default CompanyInvoiceScreen;

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.Basic100,
    flex: 1
  },
  NipNumber: {
    marginBottom: 50,
    paddingHorizontal: 19,
  },
  NipNumberForm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  NipButton: {
    width: 180,
    height: 40,
    marginTop: 5
  },
  TextField: {
    marginBottom: 24,
    paddingHorizontal: 19
  }
});