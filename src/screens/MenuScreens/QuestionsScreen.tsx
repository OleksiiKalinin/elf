import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import { ScrollView } from '../../components/molecules/ScrollView';
import useRouter from '../../hooks/useRouter';
import { UserQuestionsType } from '../../store/reducers/types';
import { Separator } from 'tamagui';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { createParam } from 'solito';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import SvgIcon from '../../components/atoms/SvgIcon';
import { useActions } from '../../hooks/useActions';

const { useParam } =
  createParam<NonNullable<MenuStackParamList['default']['QuestionsScreen']>>();

const QuestionsScreen: React.FC = () => {
  const { replace } = useRouter();
  const router = useRouter();
  const [id] = useParam('id');
  const [subView] = useParam('subView');
  const [index, setIndex] = useState<number | null>(null);
  const [subViewMode, setSubViewMode] = useState<'optionsMenu' | 'deleteMenu'>('optionsMenu');
  const [selectedList, setSelectedList] = useState<UserQuestionsType>();
  const { userQuestions } = useTypedSelector(state => state.general);
  const { setSwipeablePanelProps, setUserQuestions } = useActions();

  useEffect(() => {
    if (id) {
      const index = userQuestions.findIndex(item => item.id === id);
      if (index >= 0) {
        setIndex(index);
      } else {
        router.push({
          stack: 'MenuStack',
          screen: 'QuestionsListScreen',
          params: undefined,
        });
      }
    }
  }, [id]);

  useEffect(() => {
    if (subViewMode === 'optionsMenu') {
      editModeSubView();
    } else if (subViewMode === 'deleteMenu') {
      deleteModeSubView();
    }
  }, [subView, subViewMode]);

  useEffect(() => {
    const index = userQuestions.findIndex(item => item.id === id);
    setSelectedList(userQuestions[index]);
  }, []);

  const editModeSubView = () => {
    if (id) {
      setSwipeablePanelProps(
        (() => {
          if (subView === 'options')
            return {
              title: 'Co robimy tym razem?',
              closeButton: true,
              buttons: [
                {
                  children: 'Edytuj listę',
                  icon: <SvgIcon icon="pencil" />,
                  closeAction: 'props-null',
                  onPress: () =>
                    replace({
                      stack: 'MenuStack',
                      screen: 'QuestionEditorScreen',
                      params: { id },
                    }),
                },
                {
                  children: 'Usuń listę',
                  contentColor: Colors.Danger,
                  contentVariant: 'h5',
                  icon: <SvgIcon icon="crossBig" fill={Colors.Danger} />,
                  closeAction: 'none',
                  onPress: () => setSubViewMode('deleteMenu'),
                },
              ],
            };
          return null;
        })(),
      );
    }
  };

  const deleteModeSubView = () => {
    if (id) {
      setSwipeablePanelProps(
        (() => {
          if (subView === 'options')
            return {
              title: 'Czy chcesz usunąć pytanie?',
              closeButton: true,
              buttons: [
                {
                  children: 'Tak',
                  contentColor: Colors.Danger,
                  contentVariant: 'h5',
                  closeAction: 'props-null',
                  onPress: () => {
                    deleteList(),
                      replace({
                        stack: 'MenuStack',
                        screen: 'QuestionsListScreen',
                        params: undefined,
                      });
                  },
                },
                {
                  children: 'Nie',
                  closeAction: 'none',
                  onPress: () => setSubViewMode('optionsMenu'),
                },
              ],
            };
          return null;
        })(),
      );
    }
  };

  const deleteList = () => {
    if (index !== null) {
      setUserQuestions([
        ...userQuestions.slice(0, index),
        ...userQuestions.slice(index + 1),
      ]);
    }
  };

  const handleSubView = () => {
    if (id) {
      setSubViewMode('optionsMenu');
      router.push({
        stack: 'MenuStack',
        screen: 'QuestionsScreen',
        params: { id, subView: 'options' },
      });
    }
  };

  return !!id && index !== null && (
    <ScreenHeaderProvider
      title={selectedList ? selectedList.name : ''}
      mainTitlePosition="flex-start"
      actions={[{ icon: 'threeDots', onPress: handleSubView }]}
    >
      <ScrollView style={styles.ScrollView}>
        <View style={styles.ListContainer}>
          {selectedList?.list.map(({ id, category, questions }) => (
            <View key={id} style={styles.CategoryContainer}>
              <Typography size={20} weight="Bold">
                {category}
              </Typography>
              <View style={styles.Questions}>
                {questions.map(({ id, question }, i) => (<>
                  {i === 0 && <Separator />}
                  <View key={id} style={styles.Question}>
                    <Typography
                      weight="Bold"
                      style={styles.QuestionNumber}>
                      {i + 1}
                    </Typography>
                    <Typography>{question}</Typography>
                  </View>
                  <Separator />
                </>))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenHeaderProvider>
  )
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.Basic100,
    minHeight: '100%',
    flex: 1,
  },
  ListContainer: {
    marginTop: 50,
    paddingHorizontal: 16,
  },
  CategoryContainer: {
    marginBottom: 24,
  },
  Questions: {
    marginTop: 10,
  },
  Question: {
    flexDirection: 'row',
    paddingVertical: 17,
  },
  QuestionNumber: {
    width: 15,
  },
  QuestionContent: {},
});

export default QuestionsScreen;
