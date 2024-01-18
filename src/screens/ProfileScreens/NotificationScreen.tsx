import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../colors/Colors';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Switch from '../../components/atoms/Switch';
import { ScrollView } from '../../components/molecules/ScrollView';
import { Separator } from 'tamagui';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Button from '../../components/molecules/Button';

const notifications = [
  {
    id: 1,
    name: 'Wiadomości',
    content: 'Otrzymuj powiadomienia za każdym razem, gdy dostaniesz nową wiadomość.',
  },
  {
    id: 2,
    name: 'Kalendarz',
    content: 'Powiadomimy Cię o umówionych spotkaniach oraz ich modyfikacjach.',
  },
  {
    id: 3,
    name: 'Statusy kandydatów',
    content: 'Damy Ci znać, gdy status kandydata ulegnie zmianie.',
  },
  {
    id: 4,
    name: 'Inne oferty',
    content: 'Bądź na bieżąco z konkurencyjnymi ofertami pracy w pobliżu.',
  },
  {
    id: 5,
    name: 'Wiedza',
    content: 'Otrzymuj komunikaty dotyczące publikacji nowych artykułów, materiałów i informacji w bazie wiedzy.',
  },
  {
    id: 6,
    name: 'Aplikacje',
    content: 'Nie przegap nowych aplikacji na Twoje oferty pracy.',
  },
];

const NotificationScreen: React.FC = () => {
  const { userSettings } = useTypedSelector(state => state.general);
  const [selectedNotifications, setSelectedNotifications] = useState(userSettings?.notifications || notifications.map(notification => notification.id));
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectedItems = (id: number) => {
    const mySet = new Set([...selectedNotifications]);
    if (mySet.has(id)) {
      mySet.delete(id);
    } else {
      mySet.add(id);
    }
    setSelectedNotifications([...mySet]);
  };

  const changeHandler = () =>{

  };

  return (
    <ScreenHeaderProvider backgroundContent={Colors.Basic100}>
      <ScrollView style={styles.Content}>
        <Separator />
        <View style={[styles.NotificationItem]}>
          <Typography size={18} weight='SemiBold'>
            Wstrzymaj wszystkie
          </Typography>
          <Switch
            isOn={!selectedNotifications.length}
            onToggle={(isOn) => isOn ? setSelectedNotifications([]) : setSelectedNotifications(notifications.map(notification => notification.id))}
          />
        </View>
        <Separator />
        <View style={{ marginTop: 24 }}>
          {notifications.map((item, index) => (
            <>
              {index === 0 &&
                <Separator />
              }
              <View style={styles.NotificationItem}>
                <View style={{ width: '80%' }}>
                  <Typography size={18} weight='SemiBold'>
                    {item.name}
                  </Typography>
                  <Typography variant='h5' color={Colors.Basic600}>
                    {item.content}
                  </Typography>
                </View>
                <Switch
                  key={index}
                  isOn={selectedNotifications.includes(item.id)}
                  onToggle={() => handleSelectedItems(item.id)}
                />
              </View>
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
  Content: {
    flex: 1,
    marginTop: 50,
  },
  NotificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 19,
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
});

export default NotificationScreen;
