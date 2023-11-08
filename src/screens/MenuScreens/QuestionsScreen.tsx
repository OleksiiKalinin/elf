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
/* import { Accordion } from '@tamagui/accordion'; */
/* import { Accordion } from '@tamagui/accordion'; */
import { Separator } from 'tamagui';
import style from '../../../node_modules_modified/react-native-calendars/src/calendar/header/style';
import { es } from 'react-native-paper-dates';

const Questions: QuestionsCategoryType[] = [
  {
    id: '',
    category: 'Doświadczenie',
    questions: [
      {
        id: '',
        question: 'Jakie były Pana/Pani doświadczenia na podobnym stanowisku pracy?',
      },
      {
        id: '',
        question: 'Jaki był Pana/Pani największy sukces na poprzednim stanowisku pracy?',
      },
      {
        id: '',
        question: 'Jaki projekt zawodowy szczególnie Pana/Panią zainspirował? Z czego to wynikało?',
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
      },
      {
        id: '',
        question: 'Czy ukończył/a Pan/Pani jakieś szkolenia branżowe?',
      },
      {
        id: '',
        question: 'Czy posiada Pan/Pani jakieś certyfikaty związane ze swoim stanowiskiem pracy?',
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
      },
      {
        id: '',
        question: 'Z jakich narzędzi korzysta Pan/Pani w pracy?',
      },
      {
        id: '',
        question: 'Jak biegle włada Pan/Pani językiem angielskim?',
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
      },
      {
        id: '',
        question: 'Jakie są Pana/Pani długoterminowe cele zawodowe?',
      },
      {
        id: '',
        question: 'Jak reaguje Pan/Pani na pracę pod presją?',
      },
    ],
  },
];

const QuestionsScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [nameValid, setNameValid] = useState(false);
  const [list, setList] = useState(Questions);
  const [listValid, setListValid] = useState(false);
  const [showTips, setShowTips] = useState<boolean>(false);

  useEffect(()=> {
    const newList = Questions.map((category) => ({
      ...category,
      questions: category.questions.map((question) => ({
        ...question,
        checked: false,
      })),
    }));
    setList(newList);
  },[])

  useEffect(() => {
    if(name.length >= 3){
      setNameValid(true);
    } else{
      setNameValid(false);
    };
  }, [name]);

  useEffect(() => {
    const listValid = validateList();
    if(listValid){
      setListValid(true)
    } else {
      setListValid(false);
    };
  }, [list]);

  const handleChange = (categoryIndex: number, questionIndex: number) => {
    const newList = [...list];
    const prevValue = newList[categoryIndex].questions[questionIndex].checked;
    newList[categoryIndex].questions[questionIndex].checked = !prevValue;
    setList(newList);
  };

  const validateList = () => {
    const check = list.some(category => {
      return category.questions.some(question => question.checked);
    });

    return check;
  };

  const filterList = () => {
    const filteredList = [...list]
      .filter(category => category.questions.some(question => question.checked === true))
      .map(category => ({
        ...category,
        questions: category.questions.filter(question => question.checked === true)
      }))
      .map(category => ({
        ...category,
        questions: category.questions.map(question => {
          const { checked, ...newQuestion } = question;
          return newQuestion;
        })
      }));

    return filteredList;
  };

  const handleConfirm = () => {
    if(nameValid && listValid){
      const filteredList = filterList();
      console.log({ name: name, list: filteredList });
    } else{
      if(!nameValid){
        setShowTips(true);
      } else if(!listValid){

      };
    };
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
            {...(showTips && !nameValid && { bottomText: 'Nazwa musi zawierać minimum 3 znaki' })}
          />
        </View>
        <View style={styles.ListContainer}>
          {list.map(({ id, category, questions }, categoryIndex) =>
            <View style={styles.CategoryContainer}>
              <Typography key={id} size={20} weight='Bold'>
                {category}
              </Typography>
              <View style={styles.Questions}>
                {questions.map(({ id, question, checked }, questionIndex) => <>
                  {questionIndex === 0 && <Separator />}
                  <CheckBox
                    key={id}
                    checked={checked}
                    onCheckedChange={() => handleChange(categoryIndex, questionIndex)}
                    leftTextView={
                      <Typography style={styles.Question}>
                        {question}
                      </Typography>
                    }
                    id={id}
                    style={[styles.CheckBox, !checked && { backgroundColor: Colors.Basic100, borderColor: Colors.Basic600 }]}
                  />
                  <Separator />
                </>)}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <Button onPress={() => handleConfirm()}>
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
    alignSelf: 'center',
/*     marginTop: 20,
    marginBottom: 20, */
  },
  Question: {
    /* paddingVertical: 20 */
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default QuestionsScreen;
