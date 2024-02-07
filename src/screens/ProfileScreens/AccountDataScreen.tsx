import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../colors/Colors';
import authServices from '../../services/authServices';
import validateMail from '../../hooks/validateMail';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import generalServices from '../../services/generalServices';
import { useActions } from '../../hooks/useActions';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { ScrollView } from '../../components/molecules/ScrollView';
import useRouter from '../../hooks/useRouter';
import { createParam } from 'solito';
import { isEqual } from 'lodash';

export type RegistDataType = {
  email: string,
  first_name: string,
  last_name: string,
  mobile_number: string | null,
};

const { useParam } = createParam<NonNullable<ProfileStackParamList['default']['AccountDataScreen']>>();

const AccountDataScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { userData, token } = useTypedSelector(state => state.general);
  const { setSwipeablePanelProps, setBlockedScreen, setSnackbarMessage } = useActions();
  const [subView] = useParam('subView');
  const router = useRouter();
  const initialFormData = {
    email: userData ? userData.email : '',
    first_name: userData ? userData.first_name : '',
    last_name: userData ? userData.last_name : '',
    mobile_number: userData ? userData.mobile_number : '',
  };
  const [oldFormData, setOldFormData] = useState<RegistDataType>(initialFormData);
  const [formData, setFormData] = useState<RegistDataType>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [unsavedData, setUnsavedData] = useState<boolean>(false);

  const changeFormDataHandler = (name: keyof RegistDataType, text: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: typeof text === 'string' ? text.replace(/\s/g, '') : text }));
  };

  useEffect(() => {
    if (userData) {
      setOldFormData(initialFormData);
      setFormData(initialFormData);
    };
  }, [userData]);

  useEffect(() => {
    const { email, first_name, last_name, mobile_number } = formData;
    setIsDataValid(Boolean(
      validateMail(email) &&
      first_name &&
      last_name &&
      (mobile_number?.length === 0 || formData.mobile_number?.length === 3 || mobile_number?.length === 12)
    ))
  }, [formData]);

  useEffect(() => {
    console.log(oldFormData);
    setUnsavedData(!isEqual(oldFormData, formData));
  }, [oldFormData, formData]);

  useEffect(() => {
    setBlockedScreen({ blockedExit: unsavedData, blockedBack: unsavedData });
  }, [unsavedData]);

  useEffect(() => {
    if (subView !== 'ChangePasswordScreen') {
      setSwipeablePanelProps((() => {
        if (subView === 'options') return {
          title: 'Co robimy tym razem?',
          closeButton: true,
          buttons: [
            {
              children: 'Zmień hasło',
              onPress: () => goToChangePasswordScreen(),
              closeAction: 'props-null',
            },
            {
              children: 'Usuń konto',
              contentVariant: 'h5',
              contentColor: Colors.Danger,
              closeAction: 'none',
              onPress: () => setSwipeablePanelProps({
                title: 'Na pewno chcesz usunąć konto?',
                closeButton: true,
                buttons: [
                  {
                    children: 'TAK',
                    contentColor: Colors.Danger,
                    onPress: async () => {
                      await dispatch(authServices.deleteAccount());
                      setSwipeablePanelProps({
                        title: 'Twoje konto zostało usunięte!',
                        closeButton: false,
                        buttons: [
                          {
                            children: 'OK',
                            contentColor: Colors.Basic600,
                            onPress: () => goHomeScreen(),
                          }
                        ]
                      })
                    }
                  }
                ]
              })
            },
          ]
        }
        return null;
      })());
    }
  }, [subView]);

  const changeHandler = async () => {
    if (isDataValid) {
      setLoading(true);
      if (unsavedData) {
        const isOk = await dispatch(generalServices.setUserData(formData, 'put'));
        if (!!isOk) {
          setSnackbarMessage({ type: 'success', text: 'Dane konta zostały zaktualizowane' });
          goToProfile();
        };
      } else {
        goToProfile();
      };
      setLoading(false);
    } else setShowTips(true);
  }

  const setOptions = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'AccountDataScreen',
      params: { subView: 'options' }
    });
  };

  const goToChangePasswordScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'AccountDataScreen',
      params: {
        subView: 'ChangePasswordScreen',
      }
    });
  };

  const goToProfile = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'MainScreen',
      params: undefined,
    });
  };

  const goHomeScreen = () => {
    router.push({
      stack: 'MenuStack',
      screen: 'MainScreen',
      params: undefined,
    });
  };

  return (
    <ScreenHeaderProvider
      actions={[{
        icon: 'threeDots',
        onPress: setOptions,
      }]}
      {...(!userData ? { title: 'Przykładowe dane' } : {})}
      backgroundContent={Colors.Basic100}
    >
      <ScrollView style={styles.Content}>
        <View style={[styles.TextField, { marginTop: 45 }]}>
          <TextField
            label='Email'
            value={formData.email}
            inputStyles={{ backgroundColor: Colors.Basic300, borderRadius: 4, color: Colors.TextDark, padding: 10 }}
            underline={false}
            editable={false}
            selectTextOnFocus={false}
            caretHidden
          />
        </View>
        <View style={styles.TextField}>
          <TextField
            label='Imię'
            textContentType='name'
            value={formData.first_name}
            onChangeText={text => changeFormDataHandler('first_name', text)}
            {...(showTips && !formData.first_name && { bottomText: 'Nie zostało podane imię' })}
          />
        </View>
        <View style={styles.TextField}>
          <TextField
            label='Nazwisko'
            textContentType='name'
            value={formData.last_name}
            onChangeText={text => changeFormDataHandler('last_name', text)}
            {...(showTips && !formData.last_name && { bottomText: 'Nie zostało podane nazwisko' })}
          />
        </View>
        <View style={styles.TextField}>
          <TextField
            label='Telefon (opcjonalne)'
            textContentType='telephoneNumber'
            keyboardType='phone-pad'
            mask={['+', '4', '8', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
            activeLabel
            value={formData.mobile_number || ''}
            onChangeText={text => changeFormDataHandler('mobile_number', text)}
            {...(showTips && !(formData.mobile_number?.length === 0 || formData.mobile_number?.length === 3 || formData.mobile_number?.length === 12) && { bottomText: 'Niepoprawny numer telefonu' })}
          />
        </View>
      </ScrollView>
      <Button
        stickyBottom
        withLoading={!!token}
        disabled={!token || loading}
        onPress={changeHandler}>Zaktualizuj
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.Basic200,
  },
  Content: {
    flex: 1,
  },
  TextField: {
    marginVertical: 12,
    marginHorizontal: 19
  },
})

export default AccountDataScreen;