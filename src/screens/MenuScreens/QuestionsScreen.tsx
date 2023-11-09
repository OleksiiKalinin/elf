import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import { ScrollView } from '../../components/molecules/ScrollView';
import useRouter from '../../hooks/useRouter';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import { QuestionsCategoryType, QuestionsUserListType } from '../../store/reducers/types';
import { Separator } from 'tamagui';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { createParam } from 'solito';

const UserList: QuestionsUserListType = {
  id: '1',
  name: 'Fryzjer',
  list: [
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
  ],
};
const { useParam } = createParam<NonNullable<MenuStackParamList['default']['QuestionsScreen']>>();

const QuestionsScreen: React.FC = () => {
  const {useLink} = useRouter();
  const router = useRouter();
  const [id] = useParam('id');

  useEffect(()=> {
    console.log(id);
  },[])

  const goToQuestionEditorScreen = (id: string) => {
    router.push({ stack: 'MenuStack', screen: 'QuestionEditorScreen', params: {id}});
  };

  return (
    <ScreenHeaderProvider title={UserList.name} mainTitlePosition="flex-start">
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
      <View style={styles.ListContainer}>
          {UserList.list.map(({ id, category, questions }, categoryIndex) =>
            <View key={id} style={styles.CategoryContainer}>
              <Typography size={20} weight='Bold'>
                {category}
              </Typography>
              <View style={styles.Questions}>
                {questions.map(({ id, question }, i) => 
                  <>
                    {i === 0 && <Separator />}
                    <View key={id} style={styles.Question}>
                      <Typography weight='Bold' variant='small' style={styles.QuestionNumber}>{i+1}</Typography>
                      <Typography variant='small'>{question}</Typography>
                    </View>
                  <Separator />
                </>)}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ListContainer: {
    marginTop: 50,
    paddingHorizontal: 16,
  },
  CategoryContainer: {
    marginBottom: 24
  },
  Questions: {
    marginTop: 10
  },
  Question: {
    flexDirection: 'row', 
    paddingVertical: 17
  },
  QuestionNumber: {
    width: 12
  },
  QuestionContent: {

  },
});

export default QuestionsScreen;