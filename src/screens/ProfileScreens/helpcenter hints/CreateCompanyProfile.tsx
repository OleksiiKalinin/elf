import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigators/RootNavigator';
import Colors from '../../../colors/Colors';
import Typography from '../../../components/atoms/Typography';
import ScreenHeaderProvider from '../../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../../navigators/ProfileNavigator';

type CreateCompanyProfileProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'CreateCompanyProfile'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const CreateCompanyProfile: React.FC<CreateCompanyProfileProps> = ({ navigation }) => {


  const steps = [
    <Typography weight="Regular">
      Kliknij na <Typography weight="Bold">„ludzika”</Typography> w prawym,
      dolnym rogu.
    </Typography>,
    <Typography weight="Regular">
      Wybierz <Typography weight="Bold">„Profil firmy”</Typography> z zakładek u góry.
    </Typography>,
    <Typography weight="Regular">
      Wciśnij <Typography weight="Bold">„Dodaj firmę”</Typography>.
    </Typography>,
    <Typography weight="Regular">
      Uzupełnij informacje, klikając na puste pola lub zaznaczając opcje.
    </Typography>,
    <Typography weight="Regular">
      Dodaj logo firmy i zdjęcia, np. wnętrza lokalu lub eventu.
    </Typography>,
    <Typography weight="Regular">
      Udostępnij certyfikaty.
    </Typography>,
    <Typography weight="Regular">
      Zaznacz lokalizację firmy na mapie.
    </Typography>,
    <Typography weight="Regular">
      Pamiętaj o ustawieniu silnego hasła.
    </Typography>,
    <Typography weight="Regular">
      Kliknij <Typography weight="Bold">„Potwierdź”</Typography>.
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
            Jak założyć profil firmy?
          </Typography>

          <View style={styles.marginHorizontal}>
            <Typography weight="Regular" style={{ marginBottom: 19 }}>
              Aby korzystać z aplikacji, musisz założyć profil swojej firmy.
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

          <Typography
            variant="h5"
            weight="Bold"
            style={{ marginTop: 14, marginLeft: 19, marginBottom: 12 }}>
            Powiązane pytanie:
          </Typography>

          {/* <ButtonArrowSelector text={'Jak dodać ogłoszenie?'} onPress={() => navigation.navigate("AddAdvert")} /> */}

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

export default CreateCompanyProfile;
