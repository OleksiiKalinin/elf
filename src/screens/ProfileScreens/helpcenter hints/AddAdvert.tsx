import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigators/RootNavigator';
import Colors from '../../../colors/Colors';
import ScreenHeaderProvider from '../../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../../navigators/ProfileNavigator';
import Typography from '../../../components/atoms/Typography/Typography';
import ButtonArrowSelector from '../../../components/atoms/ButtonArrowSelector/ButtonArrowSelector';

type AddAdvertProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'AddAdvert'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const AddAdvert: React.FC<AddAdvertProps> = ({ navigation }) => {
  const steps = [
    <Typography weight="Regular">
      Wejdź na stronę główną (<Typography weight="Bold">„Homepage”</Typography>
      ).
    </Typography>,
    <Typography weight="Regular">
      Kliknij <Typography weight="Bold">„Dodaj ogłoszenie”</Typography>.
    </Typography>,
    <Typography weight="Regular">
      Uzupełnij informacje, zaznaczając opcje.
    </Typography>,
    <Typography weight="Regular">
      Wybierz <Typography weight="Bold">„Potwierdź”</Typography>.
    </Typography>,
  ];

  return (
    <ScreenHeaderProvider currentStack="ProfileStack">
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>
          <Typography
            variant="h5"
            weight="Bold"
            style={{ marginTop: 14, marginLeft: 19, marginBottom: 12 }}>
            Jak dodać nowe ogłoszenie?
          </Typography>

          <View style={styles.marginHorizontal}>
            <Typography weight="Regular" style={{ marginBottom: 19 }}>
              Możesz dodać trzy bezpłatne ogłoszenia lub wykupić pakiet na
              więcej. Aby opublikować ogłoszenie:
            </Typography>

            {steps.map((item, index) => (
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: 25 }}>
                  <Typography weight="Regular" style={{ textAlign: 'center' }}>
                    {index + 1 + '.'}
                  </Typography>
                </View>
                <View>{item}</View>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 50 }}>
            <Typography
              variant="h5"
              weight="Bold"
              style={{ marginTop: 14, marginLeft: 19, marginBottom: 12 }}>
              Powiązane pytanie:
            </Typography>
            <ButtonArrowSelector text={'Jakie metody płatności są dostępne?'} onPress={() => navigation.navigate("PaymentMethods")} />
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
  marginHorizontal: { marginLeft: 19, marginRight: 25 },
});

export default AddAdvert;
