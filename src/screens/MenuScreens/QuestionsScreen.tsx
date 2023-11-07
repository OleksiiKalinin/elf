import { CompositeScreenProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import CheckBox from '../../components/atoms/CheckBox';
import Button from '../../components/molecules/Button';
/* import { Accordion, Separator, Square, Paragraph } from 'tamagui'; */
import TextField from '../../components/molecules/TextField';
import { QuestionsCategoryType } from '../../store/reducers/types';
import { ChevronDown } from '@tamagui/lucide-icons';
/* import { Accordion } from '@tamagui/accordion'; */
/* import { Accordion } from '@tamagui/accordion'; */
import { Separator } from 'tamagui';
import style from '../../../node_modules_modified/react-native-calendars/src/calendar/header/style';

const Questions: QuestionsCategoryType[] = [
  {
    id: '',
    category: 'Doświadczenie',
    questions: [
      {
        id: '',
        question: 'Jakie były Pana/Pani doświadczenia na podobnym stanowisku pracy?',
        checked: false,
      },
      {
        id: '',
        question: 'Jaki był Pana/Pani największy sukces na poprzednim stanowisku pracy?',
        checked: false,
      },
      {
        id: '',
        question: 'Jaki projekt zawodowy szczególnie Pana/Panią zainspirował? Z czego to wynikało?',
        checked: false,
      },
    ],
  },
  {
    id: '',
    category: 'Wykształcenie',
    questions: [
      {
        id: '',
        question: 'Jakie posiada Pan/Pani wykształcenie?',
        checked: false,
      },
      {
        id: '',
        question: 'Czy ukończył/a Pan/Pani jakieś szkolenia branżowe?',
        checked: false,
      },
      {
        id: '',
        question: 'Czy posiada Pan/Pani jakieś certyfikaty związane ze swoim stanowiskiem pracy?',
        checked: false,
      },
    ],
  },
  {
    id: '',
    category: 'Umiejętności',
    questions: [
      {
        id: '',
        question: 'Jakie umiejętności uważa Pan/Pani za najważniejsze na swoim stanowisku pracy?',
        checked: false,
      },
      {
        id: '',
        question: 'Z jakich narzędzi korzysta Pan/Pani w pracy?',
        checked: false,
      },
      {
        id: '',
        question: 'Jak biegle włada Pan/Pani językiem angielskim?',
        checked: false,
      },
    ],
  },
  {
    id: '',
    category: 'Dodatkowe pytania',
    questions: [
      {
        id: '',
        question: 'Dlaczego chca Pan/Pani pracować w naszej firmie?',
        checked: false,
      },
      {
        id: '',
        question: 'Jakie są Pana/Pani długoterminowe cele zawodowe?',
        checked: false,
      },
      {
        id: '',
        question: 'Jak reaguje Pan/Pani na pracę pod presją?',
        checked: false,
      },
    ],
  },
];

const QuestionsScreen: React.FC = () => {
  const [list, setList] = useState(Questions)
  const [name, setName] = useState<string>('');

  const handleChange = (categoryIndex: number, questionIndex: number) =>{
    const newList = [...list];
    const currentValue = newList[categoryIndex].questions[questionIndex].checked;
    newList[categoryIndex].questions[questionIndex].checked = !currentValue;
    setList(newList);
  };

  const handleConfirm = () =>{
    const filteredList = [...list]
    .filter(category => category.questions.some(question => question.checked === true))
    .map(category => ({
      ...category,
      questions: category.questions.filter(question => question.checked === true)
    }));

    const removeChecked = filteredList.map(category => ({
      ...category,
      questions: category.questions.map(question => {
        const { checked, ...newQuestion } = question;
        return newQuestion;
      })
    }));

    console.log({name: name, list: removeChecked});
  };

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        <View style={styles.Title}>
          <TextField
            placeholder="Nazwa listy"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.ListContainer}>
          {list.map(({id, category, questions}, categoryIndex) =>
            <View style={styles.CategoryContainer}>
              <Typography id={id} size={20} weight='Bold'>
                {category}
              </Typography>
              <View style={styles.Questions}>
                {questions.map(({id, question, checked}, questionIndex) => 
                  <>
                    {questionIndex === 0 && <Separator />}
                    <CheckBox 
                      checked={checked}
                      onCheckedChange={()=> handleChange(categoryIndex, questionIndex)}
                      leftTextView={
                        <Typography style={{paddingVertical: 21}}>
                          {question}
                        </Typography>
                      }
                      id={id}
                      style={[styles.CheckBox, !checked && {backgroundColor: Colors.Basic100, borderColor: Colors.Basic600}]}
                    />
                    <Separator />
                  </>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <Button onPress={()=> handleConfirm()}>
        Potwierdź wybory
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Title: {
    paddingHorizontal: 16,
    marginTop: 40
  },
  ListContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  CategoryContainer: {
    marginBottom: 24
  },
  Questions: {
    marginTop: 10
  },
  CheckBox: {
    alignItems: 'center',
    paddingVertical: 12,
    alignSelf: 'center',
    /* backgroundColor: Colors.Basic700 */
  },
});

export default QuestionsScreen;
