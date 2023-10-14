import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CompositeScreenProps, useIsFocused, useRoute } from '@react-navigation/native';
import Colors from '../../colors/Colors';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Switch from '../../components/atoms/Switch';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';

const CookieScreen: React.FC = () => {
  const notifications = [
    {
      name: 'Funkcjonalne pliki cookie',
      content:
        'Funkcjonalne pliki cookie sprawiają, że aplikacja jest wygodniejsza w nawigacji, a niektóre z jej obszarów - spersonalizowane.  Jeżeli je wyłączysz, nie będziemy w stanie zapewnić prawidłowego wykonania wszystkich usług, Funkcjonalne pliki cookie są ustawiane przez nas lub zewnętrznych dostawców.',
    },
    {
      name: 'Pliki cookie social media',
      content:
        'Pliki cookie powiązane z social media są ustawiane przez portale społecznościowe. Aplikacja potrzebuje tych plików, aby użytkownicy mogli kontaktować się np. przez Facebook Messenger i udostępniać treści na zewnątrz (m.in. oferty pracy).',
    },
  ];

  const [acceptAll, setAcceptAll] = useState(false);
  const [acceptNecessary, setAcceptNecessary] = useState(false);

  const [switchState, setSwitchState] = useState([
    false,
    false,
  ]);

  useEffect(() => {
    (switchState[0] === false || switchState[1] === false) && setAcceptAll(false)
  });

  useEffect(() => {
    switchState[0] === false && setAcceptNecessary(false)
  });


  return (
    <ScreenHeaderProvider>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>

          <Typography color={Colors.Basic700} style={{ marginHorizontal: 19, marginVertical: 12 }}>
            Aplikacja wykorzystuje pliki cookie. Możesz nimi zarządzać w dowolnym momencie, zmieniając wybrane opcje.
          </Typography>
          <Typography color={Colors.Basic700} style={{ marginHorizontal: 19, marginVertical: 12 }}>
            Dowiedz się więcej na temat plików cookie i sposobu ich wykorzystywania w naszej aplikacji.
          </Typography>



          <View
            style={[
              styles.notificationItem,
              { borderTopWidth: 1, marginTop: 25 },
            ]}>
            <Typography>Akceptuję wszystkie</Typography>
            <Switch isOn={acceptAll} onToggle={() => acceptAll ? (setAcceptAll(false), setSwitchState([false, false])) : (setAcceptAll(true), setSwitchState([true, true]))} />
          </View>

          <View
            style={[
              styles.notificationItem,
              { borderTopWidth: 1, marginBottom: 25 },
            ]}>
            <Typography>Akceptuję wyłącznie niezbędne cookies</Typography>
            <Switch disabled={acceptAll} isOn={acceptNecessary} onToggle={() => acceptNecessary ? (setAcceptNecessary(false), setSwitchState([false, false])) : (setAcceptNecessary(true), setSwitchState([true, false]))} />
          </View>

          <View
            style={{ borderBottomWidth: 1, borderColor: Colors.Basic300 }}></View>
          {notifications.map((item, index) => (
            <View style={styles.notificationItem}>
              <View style={{ width: '80%' }}>
                <Typography>{item.name}</Typography>
                <Typography variant="small" color={Colors.Basic600}>
                  {item.content}
                </Typography>
              </View>
              <Switch
                isOn={switchState[index]}
                onToggle={() =>
                  setSwitchState(prevState => {
                    const newState = [...prevState];
                    newState[index] === true ? newState[index] = false : newState[index] = true;
                    return newState;
                  })
                }
              />
            </View>
          ))}
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Colors.Basic300,
              marginBottom: 50,
            }}></View>
        </ScrollView>
      </View>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.Basic200,
  },
  Content: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 19,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: Colors.Basic300,
  },
});

export default CookieScreen;
