import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CompositeScreenProps, useIsFocused, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import Button from '../../components/molecules/Button';
import { useLink } from 'solito/link';

const AddPaymentScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    phone: '',
    date: '',
    cvv: '',
  });

  const changeFormDataHandler = (name: string, text: string | number) => {
    setFormData(prev => ({ ...prev, [name]: text }));
  };

  return (
    <ScreenHeaderProvider>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>
          <Typography
            weight="Bold"
            variant="h5"
            style={{ marginLeft: 19, marginTop: 27 }}>
            Karta płatnicza
          </Typography>

          <View>
            <Typography style={{ marginLeft: 19, marginTop: 27 }}>
              Numer karty
            </Typography>
            <View style={styles.cardNumberContainer}>
              <TextField
                style={{ height: '100%', width: 300 }}
                textContentType="creditCardNumber"
                keyboardType="phone-pad"
                // mask="9999 9999 9999 9999"
                value={formData.phone}
                onChangeText={text => changeFormDataHandler('phone', text)}
                left={
                  <View style={styles.cardTypeIcon}>
                    <SvgIcon icon="visa" />
                  </View>
                }
                placeholder="0000 0000 0000 0000"
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "flex-start", marginLeft: 15 }}>
            <View style={{ marginRight: 0 }}>
              <Typography style={{ marginTop: 27 }}>
                Data ważności
              </Typography>
              <View style={styles.cardDataContainer}>
                <TextField
                  style={{ height: '100%', width: 100 }}
                  textContentType="creditCardNumber"
                  keyboardType="phone-pad"
                  // mask="99/99"
                  value={formData.date}
                  onChangeText={text => changeFormDataHandler('date', text)}
                  placeholder="MM/RR"
                />
              </View>
            </View>

            <View>
              <Typography style={{ marginTop: 27 }}>
                CVV
              </Typography>
              <View style={styles.cardDataContainer}>
                <TextField
                  style={{ height: '100%', width: 100 }}
                  textContentType="creditCardNumber"
                  keyboardType="phone-pad"
                  // mask="999"
                  value={formData.cvv}
                  onChangeText={text => changeFormDataHandler('cvv', text)}
                  placeholder="123"
                />
              </View>
            </View>
          </View>

        </ScrollView>
        <View style={{ marginVertical: 24 }}>
          <Button {...useLink({href: '/profile/PaymentScreen'})}>
            Zapisz
          </Button>
        </View>
      </View>
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
  margin: {
    marginVertical: 12,
    marginHorizontal: 24,
  },
  cardTypeIcon: {
    borderRightWidth: 1,
    paddingRight: 10,
    marginLeft: 20,
    borderColor: Colors.Basic500,
  },
  cardNumberContainer: {
    backgroundColor: Colors.Basic300,
    height: 50,
    flexDirection: 'row',
    marginTop: 6,
    marginHorizontal: 15,
    alignItems: "center"
  },
  cardDataContainer: {
    backgroundColor: Colors.Basic300,
    height: 50,
    width: 120,
    flexDirection: 'row',
    marginTop: 6,
    marginRight: 24
  },
});

export default AddPaymentScreen;
