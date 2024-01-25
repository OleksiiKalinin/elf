import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Switch from '../../components/atoms/Switch';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../../components/molecules/ScrollView';
import Button from '../../components/molecules/Button';
import { useActions } from '../../hooks/useActions';
import useRouter from '../../hooks/useRouter';

const consents = [
  {
    id: 1,
    name: 'Niezbędne pliki cookie',
    content:
      'Niezbędne pliki cookie są konieczne do funkcjonowania witryny i umożliwiają dostęp do jej bezpiecznych obszarów oraz wybór funduszy w celu dokonania inwestycji. Są to przede wszystkim pliki cookie sesji i są one usuwane po opuszczeniu witryny lub zakończeniu transakcji.',
  },
  {
    id: 2,
    name: 'Funkcjonalne pliki cookie',
    content:
      'Funkcjonalne pliki cookie sprawiają, że aplikacja jest wygodniejsza w nawigacji, a niektóre z jej obszarów - spersonalizowane.  Jeżeli je wyłączysz, nie będziemy w stanie zapewnić prawidłowego wykonania wszystkich usług, Funkcjonalne pliki cookie są ustawiane przez nas lub zewnętrznych dostawców.',
  },
  {
    id: 3,
    name: 'Pliki cookie social media',
    content:
      'Pliki cookie powiązane z social media są ustawiane przez portale społecznościowe. Aplikacja potrzebuje tych plików, aby użytkownicy mogli kontaktować się np. przez Facebook Messenger i udostępniać treści na zewnątrz (m.in. oferty pracy).',
  },
];

const CookieScreen: React.FC = () => {
  const { userSettings } = useTypedSelector(state => state.general);
  const { setUserSettings } = useActions();
  const [selectedConsents, setSelectedConsents] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setSelectedConsents(userSettings?.cookies || []);
  }, [userSettings]);

  const handleSelectedItems = (id: number) => {
    const mySet = new Set([...selectedConsents]);
    if (mySet.has(id)) {
      mySet.delete(id);
    } else {
      mySet.add(id);
    }
    setSelectedConsents([...mySet]);
  };

  const changeHandler = () => {
    setLoading(true);
    if (userSettings) {
      setUserSettings({ ...userSettings, cookies: selectedConsents });
    };
    goToSettingsScreen();
  };

  const goToSettingsScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'SettingsScreen',
      params: undefined
    });
  };

  return (
    <ScreenHeaderProvider backgroundContent={Colors.Basic100}>
      <ScrollView style={styles.ScrollView}>
        <Typography variant='h5' style={styles.Description}>
          Aplikacja wykorzystuje pliki cookie. Możesz nimi zarządzać w dowolnym momencie, zmieniając wybrane opcje.
        </Typography>
        <Typography variant='h5' style={styles.Description}>
          Dowiedz się więcej na temat plików cookie i sposobu ich wykorzystywania w naszej aplikacji.
        </Typography>
        <View style={styles.Buttons}>
          <Button
            w='100%'
            variant='text'
            borderTop
            style={[styles.ConsentButton, { height: 60 }]}
            pressStyle={styles.ConsentButtonPress}
            onPress={() => selectedConsents.length === consents.length ? setSelectedConsents([1]) : setSelectedConsents(consents.map(item => item.id))}
          >
            <View style={styles.ConsentButtonContent}>
              <View style={styles.TitleAndSwitch}>
                <Typography style={styles.ConsentTitle} size={18} textAlign='left'>
                  Akceptuję wszystkie
                </Typography>
                <Switch
                  isOn={selectedConsents.length === consents.length}
                  onToggle={(isOn) => isOn ? setSelectedConsents(consents.map(item => item.id)) : setSelectedConsents([1])}
                />
              </View>
            </View>
          </Button>
          {consents.map((item, index) => (
            <Button
              w='100%'
              borderTop={index === 0}
              borderBottom
              variant='text'
              disabled={item.id === 1}
              style={[styles.ConsentButton, { height: 'auto' }]}
              pressStyle={styles.ConsentButtonPress}
              onPress={() => handleSelectedItems(item.id)}
            >
              <View style={styles.ConsentButtonContent}>
                <View style={styles.TitleAndSwitch}>
                  <Typography style={styles.ConsentTitle} size={18} textAlign='left'>
                    {item.name}
                  </Typography>
                  <Switch
                    onToggle={() => handleSelectedItems(item.id)}
                    disabled={item.id === 1}
                    isOn={item.id === 1 || selectedConsents.includes(item.id)}
                  />
                </View>
                <Typography
                  style={styles.ConsentTitle}
                  variant="h5"
                  textAlign='left'
                  color={Colors.Basic600}
                >
                  {item.content}
                </Typography>
              </View>
            </Button>
          ))}
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
      <Button
        stickyBottom
        withLoading
        disabled={loading}
        onPress={() => changeHandler()}
      >
        Zaktualizuj
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    marginTop: 20,
    width: '100%',
  },
  Description: {
    marginHorizontal: 19,
    marginVertical: 12,
    color: Colors.Basic700,
  },
  Buttons: {
    marginTop: 24,
  },
  ConsentButton: {
    paddingHorizontal: 19,
    paddingVertical: 16,
  },
  ConsentButtonContent: {
    paddingVertical: 16,
    width: '100%'
  },
  ConsentButtonPress: {
    opacity: 1,
    bg: Colors.Basic200,
  },
  TitleAndSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  ConsentTitle: {
    width: '85%',
  },
  Switch: {
    width: '15%'
  },
});

export default CookieScreen;
