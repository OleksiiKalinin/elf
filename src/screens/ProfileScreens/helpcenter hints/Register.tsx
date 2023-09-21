import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { CompositeScreenProps, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigators/RootNavigator';
import Colors from '../../../colors/Colors';
import Typography from '../../../components/atoms/Typography';
import ScreenHeaderProvider from '../../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../../navigators/ProfileNavigator';

const Register: React.FC = () => {
  const steps = [
    <Typography weight="Regular">
      Kliknij na <Typography weight="Bold">„ludzika”</Typography> w prawym,
      dolnym rogu.
    </Typography>,
    <Typography weight="Regular">
      Wybierz <Typography weight="Bold">„Ustawienia”</Typography> z zakładek u
      góry.
    </Typography>,
    <Typography weight="Regular">
      Wciśnij <Typography weight="Bold">„Twoje dane”</Typography>.
    </Typography>,
    <Typography weight="Regular">
      Uzupełnij informacje, klikając na puste pola lub zaznaczając opcje.
    </Typography>,
    <Typography weight="Regular">
      Pamiętaj o ustawieniu silnego hasła.
    </Typography>,
    <Typography weight="Regular">
      Kliknij <Typography weight="Bold">„Potwierdź”</Typography>.
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
            Jak zmienić twoje dane?
          </Typography>

          <View style={styles.marginHorizontal}>
            <Typography weight="Regular" style={{ marginBottom: 19 }}>
              Aby korzystać z aplikacji musisz zalogować się.
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
            {/* <ButtonArrowSelector text={'Jak dodać ogłoszenie?'} onPress={() => navigation.navigate("AddAdvert")} /> */}
            <View style={styles.marginHorizontal}>
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

export default Register;
