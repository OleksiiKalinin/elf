import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../colors/Colors';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Switch from '../../components/atoms/Switch';
import { ScrollView } from '../../components/molecules/ScrollView';
import { Separator } from 'tamagui';

const NotificationScreen: React.FC = () => {
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

  const [selectedNotifications, setSelectedNotifications] = useState(notifications.map(notification => notification.id));

  const handleSelectedItems = (id: number) => {
    const mySet = new Set([...selectedNotifications]);
    if (mySet.has(id)) {
      mySet.delete(id);
    } else {
      mySet.add(id);
    }
    setSelectedNotifications([...mySet]);
  };

  return (
    <ScreenHeaderProvider>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>
          <Separator />
          <View style={[styles.notificationItem]}>
            <Typography variant='h5' weight='Bold'>
              Wstrzymaj wszystkie
            </Typography>
            <Switch
              isOn={!selectedNotifications.length}
              onToggle={(isOn) => isOn ? setSelectedNotifications([]) : setSelectedNotifications(notifications.map(notification => notification.id))}
            />
          </View>
          <Separator />
          <View style={{ marginTop: 30 }}>
            {notifications.map((item, index) => (
              <>
                {index === 0 &&
                  <Separator />
                }
                <View style={styles.notificationItem}>
                  <View style={{ width: '80%' }}>
                    <Typography variant='h5' weight='Bold'>
                      {item.name}
                    </Typography>
                    <Typography variant="small" color={Colors.Basic600}>
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
          <View
            style={{
              marginBottom: 50,
            }}>
          </View>
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
    marginTop: 50,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 19,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
  },
});

export default NotificationScreen;
