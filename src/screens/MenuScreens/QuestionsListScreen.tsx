import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import {ScrollView} from '../../components/molecules/ScrollView';
import useRouter from '../../hooks/useRouter';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import {MenuStackParamList} from '../../navigators/MenuNavigator';
import {createParam} from 'solito';
import {useTypedSelector} from '../../hooks/useTypedSelector';

const {useParam} =
  createParam<
    NonNullable<MenuStackParamList['default']['QuestionsListScreen']>
  >();

const QuestionsListScreen: React.FC = () => {
  const {useLink} = useRouter();
  const router = useRouter();
  const {userQuestions} = useTypedSelector(state => state.general);

  const goToQuestionsScreen = (id: string) => {
    router.push({stack: 'MenuStack', screen: 'QuestionsScreen', params: {id}});
  };

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <ScrollView style={styles.ScrollView}>
        {userQuestions.length > 0 ? (
          <View style={styles.ListContainer}>
            {userQuestions.map(({id, name}, i) => (
              <Button
                key={id}
                variant="text"
                arrowRight
                borderTop={i === 0 ? true : false}
                borderBottom
                onPress={() => goToQuestionsScreen(id)}>
                <Typography>{name}</Typography>
              </Button>
            ))}
          </View>
        ) : (
          <Typography style={styles.NoLists} size={20} weight="Bold">
            Utwórz listę pytań
          </Typography>
        )}
      </ScrollView>
      <CornerCircleButton
        {...useLink({
          href: {
            stack: 'MenuStack',
            screen: 'QuestionEditorScreen',
            params: undefined,
          },
        })}
      />
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.Basic100,
    minHeight: '100%',
    flex: 1,
  },
  ListContainer: {
    marginTop: 30,
    flex: 1,
  },
  NoLists: {
    marginTop: 30,
    textAlign: 'center',
    color: Colors.Basic500,
  },
  Button: {
    color: Colors.Basic900,
  },
});

export default QuestionsListScreen;
