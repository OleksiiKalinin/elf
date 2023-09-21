import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';

const VacationScreen: React.FC = () => {
  return (
    <ScreenHeaderProvider
      mainTitlePosition="flex-start"
    >

      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        <Typography
          weight="Bold"
          variant='h4'
          style={{ left: 18, marginTop: 24, marginBottom: 13 }}>
          Urlop na żądanie. Czy jest płatny?
        </Typography>

        <View style={{ marginLeft: 23, marginRight: 37 }}>
          <View>
            <Typography>
              Możliwość zgłoszenia urlopu na żądanie zależy od rodzaju podpisanej
              umowy. Sprawdź, kiedy pracownikowi przysługuje wynagrodzenie za
              “UŻ-etkę”.
            </Typography>
          </View>

          <View>
            <Typography weight="Bold" style={styles.Title}>
              Urlop na żądanie - co to?
            </Typography>
            <Typography>
              Urlop na żądanie to okres wolny od pracy, z którego można skorzystać
              w nagłych wypadkach. Trwa od 1 do 4 dni.
            </Typography>
          </View>

          <View>
            <Typography weight="Bold" style={styles.Title}>
              Urlop na żądanie - kiedy przysługuje?
            </Typography>
            <Typography>
              “UŻ-etkę” mogą wziąć osoby zatrudnione na podstawie umowy o pracę.
              Wniosek składa się najpóźniej rano.
            </Typography>
          </View>

          <View>
            <Typography weight="Bold" style={styles.Title}>
              Czy urlop na żądanie jest płatny?
            </Typography>
            <Typography>
              Tak - za “UŻ-etkę” dostaje się takie samo wynagrodzenie, jak za
              urlop wypoczynkowy.
            </Typography>
          </View>

          <View>
            <Typography
              style={{ marginTop: 42, marginBottom: 4, color: Colors.Basic600 }}>
              Czy artykuł był pomocny?
            </Typography>
            <View style={{ flexDirection: "row" }}>
              <Typography color={Colors.Blue500}>Tak</Typography>
              <Typography color={Colors.Basic600}>{' '}lub{' '}</Typography>
              <Typography color={Colors.Blue500}>Nie</Typography>
            </View>
          </View>

        </View>
      </ScrollView>

    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Title: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 4,
  },
});

export default VacationScreen;
