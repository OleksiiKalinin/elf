import { Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '../../components/atoms/Typography/Typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, useIsFocused, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import ButtonArrowSelector from '../../components/atoms/ButtonArrowSelector/ButtonArrowSelector';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Clipboard, { useClipboard } from '@react-native-clipboard/clipboard';
import TextField from '../../components/molecules/TextField/TextField';
import { useDispatch } from 'react-redux';
import advertsServices from '../../services/advertsServices';
import { InvoiceType } from '../../store/reducers/types';
import LoadingScreen from '../../components/atoms/LoadingScreen/LoadingScreen';

type PaymentTemporalScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'PaymentTemporalScreen'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const bankNumber = '72 1140 2004 0000 3402 7920 9976';
const bankOwnerName = 'JobAssistant Sp. z o.o.';
const bankOwnerAddress = 'ul. Ignacego Mościckiego 1, 24-100 Puławy';

const PaymentTemporalScreen: React.FC<PaymentTemporalScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userCompany, userInvoices, token } = useTypedSelector(s => s.general);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [nip, setNIP] = useState<string>('');
  const [lastPaidInvoice, setLastPaidInvoice] = useState<InvoiceType | null>(null);
  const [lastNotPaidInvoice, setLastNotPaidInvoice] = useState<InvoiceType | null>(null);
  const invoicesRequested = useRef(false);

  const getUserInvoices = async (granted?: boolean) => {
    if (token && userCompany?.id && (!invoicesRequested.current || granted)) {
      invoicesRequested.current = true;
      setLoading(true);
      await dispatch(advertsServices.getUserInvoices());
    }
    setLoading(false);
  }

  useEffect(() => {
    getUserInvoices();
  }, [userCompany, token]);

  useEffect(() => {
    if (lastNotPaidInvoice) {
      setEmail(lastNotPaidInvoice.email);
      setNIP(lastNotPaidInvoice.nip);
    }
  }, [lastNotPaidInvoice]);

  useEffect(() => {
    // console.log(JSON.stringify(userInvoices, null, 4));
    const sortedInvoicesByNewest = userInvoices.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    console.log(JSON.stringify(sortedInvoicesByNewest, null, 4));
    setLastPaidInvoice(sortedInvoicesByNewest.find(e => e.is_paid && e.updated_at && ((Date.now() - new Date(e.updated_at).getTime()) < 30 * 24 * 60 * 60 * 1000)) || null);
    setLastNotPaidInvoice(sortedInvoicesByNewest.find(e => !e.is_paid) || null);
  }, [userInvoices]);

  const createUserInvoice = async () => {
    setLoading(true);
    const isOk = await dispatch(advertsServices.createUserInvoice({ email: email || null, nip: nip || null, company_id: userCompany?.id }));
    if (!isOk) Alert.alert('Błąd', 'Nieprawidłowy numer NIP');
    setLoading(false);
  }

  return (
    <ScreenHeaderProvider currentStack="ProfileStack" actions={!loading ? [{
      icon: 'refresh',
      onPress: () => getUserInvoices(true)
    }] : undefined}>
      {loading ? <LoadingScreen /> : <ScrollView style={styles.Wrapper} contentContainerStyle={{ padding: 19 }}>
        {!!userCompany ?
          !!lastPaidInvoice ?
            <Typography variant='h4'>Już masz wykupiony pakiet!</Typography>
            :
            <View>
              {!!lastNotPaidInvoice ?
                <View>
                  <Typography style={{ marginBottom: 5 }} variant='h4' weight='Bold'>Przekaż przelewem tradycyjnym 200 zł podając poniższe dane konta oraz twój kod płatności w tytule.</Typography>
                  <Typography style={{ marginBottom: 32 }} variant='h4'>Potwierdzenie dokonania operacji wyślemy na twój email.</Typography>
                  <Typography variant='h5' weight='Bold'>Dane do faktury (opcjonalne)</Typography>
                  <Typography style={{ marginBottom: 10 }}>Będzie wygenerowany nowy kod płatności!</Typography>
                  <View style={{ marginBottom: 10 }}>
                    <TextField
                      label="NIP"
                      value={nip}
                      onChangeText={setNIP}
                    />
                  </View>
                  <View style={{ marginBottom: 32 }}>
                    <TextField
                      label="Email"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                  <ButtonRipple onPress={createUserInvoice} disabled={loading} withLoading borderRadius={4}>Zapisz</ButtonRipple>
                  <Typography style={{ marginBottom: 10, marginTop: 24 }} variant='h5' weight='Bold'>Numer konta odbiorcy płatności:</Typography>
                  <Typography variant='h4'>{bankNumber}</Typography>
                  <TouchableOpacity style={{ marginBottom: 24 }} onPress={() => Clipboard.setString(bankNumber)}>
                    <Typography variant='h5' color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>Skopiuj</Typography>
                  </TouchableOpacity>
                  <Typography style={{ marginBottom: 10 }} variant='h5' weight='Bold'>Nazwa odbiorcy płatności:</Typography>
                  <Typography variant='h4'>{bankOwnerName}</Typography>
                  <TouchableOpacity style={{ marginBottom: 32 }} onPress={() => Clipboard.setString(bankOwnerName)}>
                    <Typography variant='h5' color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>Skopiuj</Typography>
                  </TouchableOpacity>
                  <Typography style={{ marginBottom: 10 }} variant='h5' weight='Bold'>Adres odbiorcy płatności:</Typography>
                  <Typography variant='h4'>{bankOwnerAddress}</Typography>
                  <TouchableOpacity style={{ marginBottom: 32 }} onPress={() => Clipboard.setString(bankOwnerAddress)}>
                    <Typography variant='h5' color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>Skopiuj</Typography>
                  </TouchableOpacity>
                  <Typography variant='h5' weight='Bold'>Twój kod płatności (do tytułu):</Typography>
                  <Typography style={{ marginBottom: 10 }}>Koniecznie podaj go w tytule przelewu żebyśmy mogli cię zidentyfikować!</Typography>
                  <Typography variant='h4'>{lastNotPaidInvoice.payment_code}</Typography>
                  <TouchableOpacity style={{ marginBottom: 32 }} onPress={() => Clipboard.setString(lastNotPaidInvoice.payment_code)}>
                    <Typography variant='h5' color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>Skopiuj</Typography>
                  </TouchableOpacity>
                </View>
                :
                <View>
                  <Typography style={{ marginBottom: 32 }} variant='h4' weight='Bold'>Kup pakiet, tylko 200 zł!</Typography>
                  <Typography style={{ marginBottom: 10 }} variant='h5' weight='Bold'>Dane do faktury (opcjonalne)</Typography>
                  <View style={{ marginBottom: 10 }}>
                    <TextField
                      label="NIP"
                      value={nip}
                      onChangeText={setNIP}
                    />
                  </View>
                  <View style={{ marginBottom: 32 }}>
                    <TextField
                      label="Email"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                  <ButtonRipple onPress={createUserInvoice} disabled={loading} withLoading borderRadius={4}>Kupuję</ButtonRipple>
                </View>
              }
            </View>
          :
          <Typography variant='h4'>Nie masz utworzonej firmy!</Typography>
        }
      </ScrollView>}
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.Basic200,
  },
});

export default PaymentTemporalScreen;
