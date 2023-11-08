import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import CheckBox from '../../components/atoms/CheckBox';
import Button from '../../components/molecules/Button';
import TextField from '../../components/molecules/TextField';
import { QuestionsCategoryType } from '../../store/reducers/types';
import { Separator } from 'tamagui';
import { ScrollView } from '../../components/molecules/ScrollView';

const Questions: QuestionsCategoryType[] = [
  {
    id: '1',
    category: 'Doświadczenie',
    questions: [
      {
        id: '11',
        question: 'Jakie były Pana/Pani doświadczenia na podobnym stanowisku pracy?',
      },
      {
        id: '22',
        question: 'Jaki był Pana/Pani największy sukces na poprzednim stanowisku pracy?',
      },
      {
        id: '33',
        question: 'Jaki projekt zawodowy szczególnie Pana/Panią zainspirował? Z czego to wynikało?',
      },
    ],
  },
  {
    id: '2',
    category: 'Wykształcenie',
    questions: [
      {
        id: '44',
        question: 'Jakie posiada Pan/Pani wykształcenie?',
      },
      {
        id: '55',
        question: 'Czy ukończył/a Pan/Pani jakieś szkolenia branżowe?',
      },
      {
        id: '66',
        question: 'Czy posiada Pan/Pani jakieś certyfikaty związane ze swoim stanowiskiem pracy?',
      },
    ],
  },
  {
    id: '3',
    category: 'Umiejętności',
    questions: [
      {
        id: '77',
        question: 'Jakie umiejętności uważa Pan/Pani za najważniejsze na swoim stanowisku pracy?',
      },
      {
        id: '88',
        question: 'Z jakich narzędzi korzysta Pan/Pani w pracy?',
      },
      {
        id: '99',
        question: 'Jak biegle włada Pan/Pani językiem angielskim?',
      },
    ],
  },
  {
    id: '4',
    category: 'Dodatkowe pytania',
    questions: [
      {
        id: '1111',
        question: 'Dlaczego chca Pan/Pani pracować w naszej firmie?',
      },
      {
        id: '2222',
        question: 'Jakie są Pana/Pani długoterminowe cele zawodowe?',
      },
      {
        id: '3333',
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
    if(name.length >= 3 && name.length <= 50 ){
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
      .filter(category => category.questions.some(question => question.checked))
      .map(category => ({
        ...category,
        questions: category.questions.filter(question => question.checked)
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
      };
    };
  };

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        <View style={styles.Title}>
          <TextField
            placeholder="Nazwa listy"
            textContentType="name"
            keyboardType='default'
            value={name}
            maxLength={50}
            onChangeText={setName}
            {...(showTips && !nameValid && { bottomText: 'Nazwa musi zawierać od 3 do 50 znaków' })}
          />
        </View>
        <View style={styles.ListContainer}>
          {list.map(({ id, category, questions }, categoryIndex) =>
            <View style={styles.CategoryContainer}>
              <Typography key={id} size={20} weight='Bold'>
                {category}
              </Typography>
              <View style={styles.Questions}>
                {questions.map(({ id, question, checked }, questionIndex) => 
                  <>
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
                      style={styles.CheckBox}
                    />
                  <Separator />
                </>)}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <Button 
        onPress={() => handleConfirm()} 
        disabled={!listValid}
      >
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
    marginTop: 20,
  },
  Question: {
    paddingVertical: 20,
  },
});

export default QuestionsScreen;
