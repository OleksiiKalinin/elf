import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import { ScrollView } from '../../components/molecules/ScrollView';
import useRouter from '../../hooks/useRouter';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { createParam } from 'solito';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Snackbar } from 'react-native-paper';
import SvgIcon from '../../components/atoms/SvgIcon';
import { InitialPropsFromParams } from '../../hooks/types';

type Params = NonNullable<MenuStackParamList['default']['QuestionsListScreen']>;

const { useParam } = createParam<Params>();

const QuestionsListScreen: React.FC<InitialPropsFromParams<Params>> = ({
  newlistInitial,
}) => {
  const { replace, useLink } = useRouter();
  const router = useRouter();
  const [snackbar, setSnackbar] = React.useState(false);
  const { userQuestions, userData } = useTypedSelector(state => state.general);
  const [newList] = useParam('newlist', { initial: newlistInitial });

  const goToQuestionsScreen = (id: string) => {
    router.push({ stack: 'MenuStack', screen: 'QuestionsScreen', params: { id } });
  };

  useEffect(() => {
    console.log(newList);
    if (newList) {
      setSnackbar(true);
      replace({
        stack: 'MenuStack',
        screen: 'QuestionsListScreen',
        params: undefined,
      });
    }
  }, [newList]);

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <ScrollView style={styles.ScrollView}>
        {userQuestions.length > 0 ? (
          <View style={styles.ListContainer}>
            {userQuestions.map(({ id, name }, i) => (
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
      <Snackbar
        visible={snackbar}
        duration={3000}
        onDismiss={() => setSnackbar(false)}
        wrapperStyle={[
          styles.SnackbarWrapper,
          { position: Platform.OS === 'web' ? 'fixed' : 'absolute' },
        ]}
        style={styles.Snackbar}>
        <View style={styles.SnackbarContent}>
          <SvgIcon icon="doneCircle" />
          <Typography size={18} style={styles.SnackbarText}>
            Lista kandydatów stworzona
          </Typography>
        </View>
      </Snackbar>
      {userData && <CornerCircleButton
        {...useLink({
          href: {
            stack: 'MenuStack',
            screen: 'QuestionEditorScreen',
            params: undefined,
          },
        })}
      />}
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
  SnackbarWrapper: {
    zIndex: 9999999,
    backgroundColor: 'transparent',
    maxWidth: 768,
    height: 43,
  },
  Snackbar: {
    backgroundColor: Colors.Green500,
    padding: 0,
    margin: 0,
    borderRadius: 0,
    boxShadow: 'none',
  },
  SnackbarContent: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.Green500,
    gap: 10,
    alignItems: 'center',
    transform: 'translateY(-10px)',
  },
  SnackbarText: {
    color: Colors.White,
  },
});

export default QuestionsListScreen;
