import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../colors/Colors';
import { useActions } from '../hooks/useActions';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import { CompanyRegistrationDataType } from '../store/reducers/types';
import Button from '../components/molecules/Button';
import useRouter from '../hooks/useRouter';
import { ScrollView } from '../components/molecules/ScrollView';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import companyServices from '../services/companyServices';
import Typography from '../components/atoms/Typography';
import { Spinner } from 'tamagui';
import { isEqual } from 'lodash';

const emptyFormData = {
  Regon: null,
  Nip: null,
  StatusNip: null,
  Nazwa: null,
  Wojewodztwo: null,
  Powiat: null,
  Gmina: null,
  Miejscowosc: null,
  KodPocztowy: null,
  Ulica: null,
  NrNieruchomosci: null,
  NrLokalu: null,
  Typ: null,
  SilosID: null,
  DataZakonczeniaDzialalnosci: null,
  MiejscowoscPoczty: null,
};

export type CompanyInvoiceScreenProps = {
  initialData?: CompanyRegistrationDataType | null;
  callback: (data: CompanyRegistrationDataType) => void,
};

const CompanyInvoiceScreen: React.FC<CompanyInvoiceScreenProps> = ({
  initialData,
  callback
}) => {
  const dispatch = useTypedDispatch();
  const { setSnackbarMessage } = useActions();
  const [dataFromGus, setDataFromGus] = useState<CompanyRegistrationDataType | null>(null);
  const [formData, setFormData] = useState<CompanyRegistrationDataType>(initialData || emptyFormData);
  const [showForm, setShowForm] = useState(false);
  const [showNipTips, setShowNipTips] = useState<boolean>(false);
  const [showFormTips, setShowFormTips] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { backToRemoveParams } = useRouter();
  const { Nip, Nazwa, Ulica, NrNieruchomosci, NrLokalu, KodPocztowy, Miejscowosc } = formData;

  const changeFormDataHandler = (name: keyof CompanyRegistrationDataType, text: string) => {
    setFormData(prev => ({ ...prev, [name]: name === 'KodPocztowy' ? formatPostalCode(text) : text }));
  };

  const formatPostalCode = (text: string) => {
    let formattedValue = text.replace(/[^0-9-]/g, '');
    formattedValue = formattedValue
      .split('')
      .map((char, index) => (index === 2 ? char : char === '-' ? '' : char))
      .join('');
    if (formattedValue.length >= 2 && !!KodPocztowy && KodPocztowy[2] !== '-') {
      formattedValue = formattedValue.slice(0, 2) + '-' + formattedValue.slice(2);
      return formattedValue;
    } else {
      return formattedValue;
    };
  };

  const getCompanyDataFromGUS = async () => {
    if (!!Nip && Nip.length === 10) {
      setLoading(true);
      const data = await dispatch(companyServices['getCompanyRegistrationData'](Nip));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      if (data) {
        setDataFromGus(data);
        setFormData(data);
        setSnackbarMessage({ type: 'success', text: 'Dane firmy zostały pobrane' })
      } else {
        setFormData({ ...emptyFormData, Nip });
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
      (!!Nip && Nip.length === 10)
      && (!!Nazwa && Nazwa.length >= 2 && Nazwa.length <= 200)
      && (!!Ulica && Ulica.length >= 2 && Ulica.length <= 100)
      && (!!NrNieruchomosci && NrNieruchomosci.length >= 1 && NrNieruchomosci.length <= 50)
      && ((!!NrLokalu && NrLokalu.length <= 50) || NrLokalu === null)
      && (!!KodPocztowy && KodPocztowy.length === 6)
      && (!!Miejscowosc && Miejscowosc.length >= 2 && Miejscowosc.length <= 50)
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
      setSnackbarMessage({ type: 'success', text: initialData ? 'Dane do faktury zostały zaktualizowane' : 'Dane do faktury zostały uzupełnione' });
      if (!!dataFromGus && isEqual(dataFromGus, formData)) {
        callback(formData);
      } else {
        callback({
          ...emptyFormData,
          Nip,
          Nazwa,
          Miejscowosc,
          KodPocztowy,
          Ulica,
          NrNieruchomosci,
          NrLokalu,
        });
      };
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
                value={Nip || ''}
                onChangeText={text => changeFormDataHandler('Nip', text.replace(/^0/, '').replace(/[^0-9]/g, ''))}
              />
            </View>
            <Button
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
          {(showNipTips && !Nip || (Nip && Nip.length < 10)) &&
            <Typography size={12} color={Colors.Danger}>
              Wprowadź poprawnie nr NIP
            </Typography>
          }
        </View>
        {((showForm || initialData) && !loading) &&
          <>
            <View style={[styles.TextField]}>
              <TextField
                label="Nazwa firmy"
                value={Nazwa || ''}
                maxLength={200}
                onChangeText={text => changeFormDataHandler('Nazwa', text)}
                {...(showFormTips && (!Nazwa || (!!Nazwa && Nazwa.length < 2 || Nazwa.length > 200)) && { bottomText: 'Nazwa firmy musi zawierać od 2 do 200 znaków' })}
              />
            </View>
            <View style={styles.TextField}>
              <TextField
                label='Ulica'
                value={Ulica || ''}
                maxLength={100}
                onChangeText={text => changeFormDataHandler('Ulica', text)}
                {...(showFormTips && (!Ulica || (!!Ulica && Ulica.length < 2 || Ulica.length > 100)) && { bottomText: 'Nazwa ulicy musi zawierać od 2 do 100 znaków' })}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.TextField, { width: '50%' }]}>
                <TextField
                  label='Nr domu'
                  value={NrNieruchomosci || ''}
                  maxLength={50}
                  onChangeText={text => changeFormDataHandler('NrNieruchomosci', text)}
                  {...(showFormTips && (!NrNieruchomosci || (!!NrNieruchomosci && NrNieruchomosci.length < 1 || NrNieruchomosci.length > 50)) && { bottomText: 'Nr domu musi zawierać od 1 do 50 znaków' })}
                />
              </View>
              <View style={[styles.TextField, { width: '50%' }]}>
                <TextField
                  label='Nr lokalu'
                  value={NrLokalu || ''}
                  maxLength={50}
                  onChangeText={text => changeFormDataHandler('NrLokalu', text)}
                  {...(showFormTips && (!!NrLokalu && NrLokalu.length > 50) && { bottomText: 'Nr lokalu musi zawierać od 1 do 50 znaków' })}
                />
              </View>
            </View>
            <View style={styles.TextField}>
              <TextField
                maxLength={6}
                label="Kod pocztowy"
                value={KodPocztowy || ''}
                onChangeText={text => changeFormDataHandler('KodPocztowy', text)}
                {...(showFormTips && KodPocztowy?.length !== 6 && { bottomText: 'Niepoprawny kod pocztowy' })}
              />
            </View>
            <View style={styles.TextField}>
              <TextField
                maxLength={50}
                label="Miejscowość"
                value={Miejscowosc || ''}
                onChangeText={text => changeFormDataHandler('Miejscowosc', text)}
                {...(showFormTips && (!Miejscowosc || (!!Miejscowosc && Miejscowosc.length < 2 || Miejscowosc.length > 50)) && { bottomText: 'Nazwa miejscowości musi zawierać od 2 do 50 znaków' })}
              />
            </View>
          </>
        }
        {loading &&
          <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 15 }}>
            <Spinner />
            <Typography size={16} >
              Pobieranie danych
            </Typography>
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
  },

});