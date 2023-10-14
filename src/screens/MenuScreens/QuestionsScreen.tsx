import { CompositeScreenProps } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { nativeStore } from '../../store';
import { calendarActionTypes } from '../../store/actions';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import CheckBox from '../../components/atoms/CheckBox';
import Button from '../../components/molecules/Button';
import { Separator } from 'tamagui';

const Questions = [
  'Jakie jest Pana/Pani ostatnie miejsce pracy?',
  'Czy pracował/a Pan/i na podobnym stanowisku?',
  'Gdzie dotychczas Pan/i pracował/a?',
  'Ile lat pracuje Pan/i w zawodzie?',
  'W jak dużych zespołach Pan/i pracował/a?',
  'Czy ma Pan/i wykształcenie kierunkowe?',
  'Czy brał/a Pan/i udział w szkoleniach/kursach? Jakich?',
  'W jaki sposób aktualnie zdobywa Pan/i wiedzę?',
  'Czy zdobył/a Pan/i certyfikaty?',
  'Jak ocenia Pan/i poziom swoich umiejętności?',
  'Jakich narzędzi używał/a Pan/i w pracy?',
  'Jakie zabiegi Pan/i wykonywała?',
  'Jakich metod używał/a Pan/i w pracy?',
  'Czy ma Pan/i portfolio swoich prac?',
  'Jakim rodzajem umowy jest Pan/i zainteresowany/a?',
  'Kiedy możemy rozpocząć współpracę?',
  'Jaki wymiar godzin Pana/ią interesuje?',
  'Jakie są Pan/i oczekiwania finansowe?',
  'Co jest Pana/i mocną stroną?',
  'Czy ma Pan/i ważne dokumenty pobytowe?',
  'Czy płynnie rozmawia Pan/i po polsku?',
  'Jak długo mieszka Pan/i w Polsce?',
  'W jak dużych zespołach Pan/i pracował/a?',
];

const QuestionsScreen: React.FC = () => {
  // const data = useTypedSelector(state => state.calendar);
  // const [questionsState, setQuestionsState] = useState<any>(data.questions);

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        <View>
          <Typography weight="Bold" style={styles.Title}>
            Doświadczenie
          </Typography>
          {/* {Questions.map(
            (item, index) => index < 5 && (<>
              <CheckBox
                leftText={item}
                checked={questionsState.includes(index)}
                onCheckedChange={(checked) =>
                  !questionsState.includes(index)
                    ? setQuestionsState((state: any) => [...state, index])
                    : setQuestionsState((state: any[]) =>
                      state.filter(item => item !== index),
                    )
                }
                style={{ padding: 16 }}
              />
              <Separator />
            </>))} */}
        </View>

        <View>
          <Typography weight="Bold" style={styles.Title}>
            Wykształcenie
          </Typography>
          {/* {Questions.map(
            (item, index) => index > 4 && index < 9 && (<>
              <CheckBox
                leftText={item}
                checked={questionsState.includes(index)}
                onCheckedChange={(checked) =>
                  !questionsState.includes(index)
                    ? setQuestionsState((state: any) => [...state, index])
                    : setQuestionsState((state: any[]) =>
                      state.filter(item => item !== index),
                    )
                }
                style={{ padding: 16 }}
              />
              <Separator />
            </>))} */}
        </View>

        <View>
          <Typography weight="Bold" style={styles.Title}>
            Umiejętności
          </Typography>
          {/* {Questions.map(
            (item, index) => index > 8 && index < 14 && (<>
              <CheckBox
                leftText={item}
                checked={questionsState.includes(index)}
                onCheckedChange={(checked) =>
                  !questionsState.includes(index)
                    ? setQuestionsState((state: any) => [...state, index])
                    : setQuestionsState((state: any[]) =>
                      state.filter(item => item !== index),
                    )
                }
                style={{ padding: 16 }}
              />
              <Separator />
            </>))} */}
        </View>

        <View>
          <Typography weight="Bold" style={styles.Title}>
            Współpraca
          </Typography>
          {/* {Questions.map(
            (item, index) => index > 13 && index < 18 && (<>
              <CheckBox
                leftText={item}
                checked={questionsState.includes(index)}
                onCheckedChange={(checked) =>
                  !questionsState.includes(index)
                    ? setQuestionsState((state: any) => [...state, index])
                    : setQuestionsState((state: any[]) =>
                      state.filter(item => item !== index),
                    )
                }
                style={{ padding: 16 }}
              />
              <Separator />
            </>))} */}
        </View>

        <View>
          <Typography weight="Bold" style={styles.Title}>
            Dodatkowe
          </Typography>
          {/* {Questions.map(
            (item, index) => index > 17 && (<>
              <CheckBox
                leftText={item}
                checked={questionsState.includes(index)}
                onCheckedChange={(checked) =>
                  !questionsState.includes(index)
                    ? setQuestionsState((state: any) => [...state, index])
                    : setQuestionsState((state: any[]) =>
                      state.filter(item => item !== index),
                    )
                }
                style={{ padding: 16 }}
              />
              <Separator />
            </>))} */}
        </View>

        <View style={{ marginBottom: 40 }}>

        </View>
      </ScrollView>

      <Button
        // onPress={() => (
        //   nativeStore.dispatch({
        //     type: calendarActionTypes.SAVE_QUESTIONS,
        //     payload: {
        //       questionsState: questionsState,
        //     },
        //   }),
        //   navigation.navigate('MainScreen')
        // )}
        >
        Potwierdź wybory
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Title: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 4,
    left: 20,
  },
  Text: {
    color: Colors.Basic900,
    fontSize: 16,
    flexWrap: 'wrap',
    marginRight: 20,
  },
});

export default QuestionsScreen;
