import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { CompositeScreenProps, useRoute } from '@react-navigation/native';
import Colors from '../../../colors/Colors';
import Typography from '../../../components/atoms/Typography';
import ScreenHeaderProvider from '../../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../../navigators/ProfileNavigator';

const AddCall: React.FC = () => {


  const steps = [
    <Typography weight="Regular">
      Wejdź na stronę główną (<Typography weight='Bold'>„Homepage”</Typography>).
    </Typography>,
    <Typography weight="Regular">
      Kliknij „plusik”, który znajduje się pod kalendarzem (z prawej strony).
    </Typography>,
    <Typography weight="Regular">
      Wybierz <Typography weight='Bold'>„Zaplanuj połączenie</Typography>.
    </Typography>,
    <Typography weight="Regular">
      Uzupełnij informacje.
    </Typography>,
    <Typography weight="Regular">
      Wciśnij <Typography weight='Bold'>„Potwierdź”</Typography>.
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
            Jak dodać nowe połączenie w kalendarzu?
          </Typography>

          <View style={styles.marginHorizontal}>
            <Typography weight="Regular" style={{ marginBottom: 19 }}>
              Aby zaplanować spotkanie:
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
            {/* <ButtonArrowSelector text={'Jak zaplanować połączenie w kalendarzu?'} /> */}
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
  marginHorizontal: {
    marginLeft: 19,
    width: "85%",
  },
});

export default AddCall;
