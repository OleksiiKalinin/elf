import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import CheckBox from '../../components/atoms/CheckBox';
import Button from '../../components/molecules/Button';
import TextField from '../../components/molecules/TextField';
import { QuestionsCategoryType, UserQuestionsType } from '../../store/reducers/types';
import { Separator } from 'tamagui';
import { ScrollView } from '../../components/molecules/ScrollView';
import { cloneDeep } from 'lodash';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { createParam } from 'solito';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import useRouter from '../../hooks/useRouter';

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

const UserQuestions: QuestionsCategoryType[] = [
  {
    id: '1',
    category: 'Doświadczenie',
    questions: [
      {
        id: '11',
        question: 'Jakie były Pana/Pani doświadczenia na podobnym stanowisku pracy?',
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
    id: '4',
    category: 'Dodatkowe pytania',
    questions: [
      {
        id: '1111',
        question: 'Dlaczego chca Pan/Pani pracować w naszej firmie?',
      },
    ],
  },
];

const { useParam,useParams } = createParam<NonNullable<MenuStackParamList['default']['QuestionEditorScreen']>>();

const QuestionEditorScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [nameValid, setNameValid] = useState(false);
  const [list, setList] = useState(Questions);
  const [listValid, setListValid] = useState(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [index, setIndex] = useState<number | null>(null);
  const [id] = useParam('id');
  const {setParams} = useParams();
  const router = useRouter();
  
  const { setUserQuestions } = useActions();
  const { userQuestions } = useTypedSelector(state => state.general);

  useEffect(()=> {
    console.log(id, window.location.search);
    if(id){
      const index = userQuestions.findIndex(item => item.id === id);
      if(index >= 0){
        setIndex(index);
      } else{
        router.push({ stack: 'MenuStack', screen: 'QuestionsListScreen', params: undefined});
 /*        setParams({id: undefined}) */
      }
    } else{
      initialArray();
    }
  },[id]);

  useEffect(()=> {
    compareArrays();
  },[index]);

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

  const compareArrays = () => {
    if(index !== null){
      const userList = userQuestions[index].list;

      const newList = cloneDeep(Questions);
      newList.forEach((category) => {
        const compareCategory = userList.find((userCategory) => userCategory.id === category.id);
        if (compareCategory) {
          category.questions.forEach((question) => {
            const compareQuestion = compareCategory.questions.find((userQuestion) => userQuestion.id === question.id);
            if (compareQuestion) {
              question.checked = true;
            } else {
              question.checked = false;
            }
          });
        } else {
          category.questions.forEach((question) => (question.checked = false));
        };
      });

      setName(userQuestions[index].name)
      setList(newList);
    }
  };

  const initialArray = () => {
    const newList = Questions.map((category) => ({
      ...category,
      questions: category.questions.map((question) => ({
        ...question,
        checked: false,
      })),
    }));
    setList(newList);
  };

  const handleChange = (categoryIndex: number, questionIndex: number, checked: boolean) => {
    const newList = cloneDeep(list);
    newList[categoryIndex].questions[questionIndex].checked = checked;
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
      const newUserQuestions = cloneDeep(userQuestions);
      if(!id){
        newUserQuestions.push({id: Math.random().toString(), name: name, list: filteredList});
        setUserQuestions(newUserQuestions);
        router.push({ stack: 'MenuStack', screen: 'QuestionsListScreen', params: {newlist: true}});
      } else if(id && index !== null){
        newUserQuestions[index] = {id, name: name, list: filteredList}
        setUserQuestions(newUserQuestions);
        router.push({ stack: 'MenuStack', screen: 'QuestionsScreen', params: {id: id}});
      }
    } else{
        if(!nameValid){
          setShowTips(true);
        };
    };
  };

  return (
    <ScreenHeaderProvider  mainTitlePosition="flex-start">
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
            <View key={id} style={styles.CategoryContainer}>
              <Typography size={20} weight='Bold'>
                {category}
              </Typography>
              <View style={styles.Questions}>
                {questions.map(({ id, question, checked }, questionIndex) => 
                  <>
                    {questionIndex === 0 && <Separator />}
                    <CheckBox
                      key={id}
                      checked={checked}
                      onCheckedChange={(checked) => handleChange(categoryIndex, questionIndex, !!checked)}
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

export default QuestionEditorScreen;
