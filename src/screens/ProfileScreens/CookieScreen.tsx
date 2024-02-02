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
import { Separator } from 'tamagui';

const CookieScreen: React.FC = () => {
  const { userSettings, cookieConsents } = useTypedSelector(state => state.general);
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
      <ScrollView contentContainerStyle={{ paddingTop: 20 }} style={styles.ScrollView}>
        <Typography variant='h5' style={styles.Description}>
          Aplikacja wykorzystuje pliki cookie. Możesz nimi zarządzać w dowolnym momencie, zmieniając wybrane opcje.
        </Typography>
        <Typography variant='h5' style={styles.Description}>
          Dowiedz się więcej na temat plików cookie i sposobu ich wykorzystywania w naszej aplikacji.
        </Typography>
        <View style={styles.Buttons}>
          <Separator />
          <Switch
            checked={selectedConsents.length === cookieConsents.length}
            onCheckedChange={(isOn) => isOn ? setSelectedConsents(cookieConsents.map(item => item.id)) : setSelectedConsents([1])}
            containerStyle={styles.AcceptAllSwitch}
            leftTextView={
              <Typography style={styles.SwitchText} size={18}>
                Akceptuję wszystkie
              </Typography>
            }
          />
          {cookieConsents.map((item, index) => (
            <>
              {index === 0 &&
                <Separator />
              }
              <Switch
                key={index}
                checked={item.id === 0 || selectedConsents.includes(item.id)}
                onCheckedChange={() => item.id !== 1 && handleSelectedItems(item.id)}
                containerStyle={styles.ConsentSwitch}
                style={{opacity: item.id === 1 ? .7 : 1}}
                leftTextView={
                  <>
                    <Typography style={styles.SwitchText} size={18} textAlign='left'>
                      {item.name}
                    </Typography>
                    <Typography style={styles.SwitchText} variant="h5" textAlign='left' color={Colors.Basic600}>
                      {item.content}
                    </Typography>
                  </>
                }
              />
              <Separator />
            </>
          ))}
        </View>
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
  AcceptAllSwitch: {
    paddingHorizontal: 19, 
    height: 58
  },
  SwitchText: {
    width: '85%'
  },
  ConsentSwitch: {
    paddingHorizontal: 19,
    paddingVertical: 16,
  },
});

export default CookieScreen;
