import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { CompositeScreenProps, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigators/RootNavigator';
import Colors from '../../../colors/Colors';
import Typography from '../../../components/atoms/Typography';
import ScreenHeaderProvider from '../../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../../navigators/ProfileNavigator';

const PaymentMethods: React.FC = () => {
  const steps = [
    <Typography weight="Regular">karty bankowej,</Typography>,
    <Typography weight="Regular">
      wymiany punktów, które uzyskuje się m.in. będąc aktywnym w aplikacji.
    </Typography>,
  ];

  return (
    <ScreenHeaderProvider>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>
          <Typography
            variant="h5"
            weight="Bold"
            style={{ marginTop: 14, marginLeft: 19, marginBottom: 12 }}>
            Jakie metody płatności są dostępne?
          </Typography>

          <View style={styles.marginHorizontal}>
            <Typography weight="Regular" style={{ marginBottom: 19 }}>
              Możesz zapłacić za pakiet PRO za pomocą:
            </Typography>

            {steps.map((item, index) => (
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: 25 }}>
                  <Typography weight="Regular" style={{ textAlign: 'center' }}>
                    {'•'}
                  </Typography>
                </View>
                <View>{item}</View>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 150 }}>
            <Typography
              variant="h5"
              weight="Bold"
              style={{ marginLeft: 19, marginBottom: 12 }}>
              Powiązane pytanie:
            </Typography>
            {/* <ButtonArrowSelector text={'Jak założyć profil firmy?'} onPress={() => navigation.navigate("CreateCompanyProfile")} /> */}
            <View style={[styles.marginHorizontal, { marginBottom: 30 }]}>
              <Typography color={Colors.Basic600} weight="Bold">
                Czy ta odpowiedź była pomocna?
              </Typography>
              <View style={{ flexDirection: 'row', marginTop: 14 }}>
                <Typography color={Colors.Blue500} weight="Bold">
                  Tak
                </Typography>
                <Typography color={Colors.Basic600} weight="Bold">
                  {' '}
                  lub{' '}
                </Typography>
                <Typography color={Colors.Blue500} weight="Bold">
                  Nie
                </Typography>
              </View>
            </View>
          </View>
        </ScrollView>
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
  marginHorizontal: { marginLeft: 19, marginRight: 35 },
});

export default PaymentMethods;
