import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CompositeScreenProps, useIsFocused, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import Switch from '../../components/atoms/Switch';

const NotificationScreen: React.FC = () => {
  const notifications = [
    {
      name: 'Wiadomości',
      content:
        'Otrzymuj powiadomienia za każdym razem, gdy dostaniesz nową wiadomość.',
    },
    {
      name: 'Kalendarz',
      content:
        'Powiadomimy Cię o umówionych spotkaniach oraz ich modyfikacjach.',
    },
    {
      name: 'Statusy kandydatów',
      content: 'Damy Ci znać, gdy status kandydata ulegnie zmianie.',
    },
    {
      name: 'Inne oferty',
      content: 'Bądź na bieżąco z konkurencyjnymi ofertami pracy w pobliżu.',
    },
    {
      name: 'Wiedza',
      content:
        'Otrzymuj komunikaty dotyczące publikacji nowych artykułów, materiałów i informacji w bazie wiedzy.',
    },
    {
      name: 'Aplikacje',
      content: 'Nie przegap nowych aplikacji na Twoje oferty pracy.',
    },
  ];

  const [holdNotifies, setHoldNotifies] = useState(false);
  const [turnAll, setTurnAll] = useState(false);

  const [switchState, setSwitchState] = useState([
    false,
    false,
    false,
    true,
    false,
    true,
  ]);

  // console.log(switchState);

  return (
    <ScreenHeaderProvider>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>
          <View
            style={[
              styles.notificationItem,
              { marginTop: 33, borderTopWidth: 1 },
            ]}>
            <Typography>Wstrzymaj wszystkie</Typography>
            <Switch isOn={holdNotifies} onToggle={() => holdNotifies ? setHoldNotifies(false) : (setHoldNotifies(true))} />
          </View>

          <View
            style={[
              styles.notificationItem,
              { marginBottom: 25, borderTopWidth: 1 },
            ]}>
            <Typography>Wyłącz/Włącz wszystkie</Typography>
            <Switch disabled={holdNotifies} isOn={turnAll} onToggle={() => turnAll ? (setTurnAll(false), setSwitchState([false, false, false, false, false, false])) : (setTurnAll(true), setSwitchState([true, true, true, true, true, true]))} />
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
                disabled={holdNotifies}
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

export default NotificationScreen;
