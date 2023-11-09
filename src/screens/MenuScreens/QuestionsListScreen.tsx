import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import { ScrollView } from '../../components/molecules/ScrollView';
import useRouter from '../../hooks/useRouter';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { createParam } from 'solito';

const QuestionsList/* : QuestionsList[] */ = [
  {
    id: '1',
    name: 'Fryzjer'
  },
  {
    id: '2',
    name: 'Kucharz'
  },
  {
    id: '3',
    name: 'Kelner'
  },
];

const { useParam } = createParam<NonNullable<MenuStackParamList['default']['QuestionsListScreen']>>();

const QuestionsListScreen: React.FC = () => {

  const {useLink} = useRouter();
  const router = useRouter();

  const goToQuestionsScreen = (id: string) => {
    router.push({ stack: 'MenuStack', screen: 'QuestionsScreen', params: {id}});
  };

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        <View style={styles.ListContainer}>
          {QuestionsList.map(({id, name}, i)=>
            <Button
              key={id}
              variant='text'
              arrowRight
              borderTop={i === 0 ? true : false}
              borderBottom
              onPress={()=> goToQuestionsScreen(id)}
            >
              <Typography>
                {name}
              </Typography>
            </Button>
          )}
        </View>
      </ScrollView>
      <CornerCircleButton {...useLink({ href: { stack: 'MenuStack', screen: 'QuestionEditorScreen', params: undefined } })} />
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ListContainer: {
    marginTop: 30,
    flex: 1,
  },
  Button: {
    color: Colors.Basic900
  },
});

export default QuestionsListScreen;
