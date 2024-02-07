import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../colors/Colors';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Switch from '../../components/atoms/Switch';
import { ScrollView } from '../../components/molecules/ScrollView';
import { Separator } from 'tamagui';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Button from '../../components/molecules/Button';
import { useActions } from '../../hooks/useActions';
import useRouter from '../../hooks/useRouter';
import { isEqual } from 'lodash';

const NotificationScreen: React.FC = () => {
  const { userSettings, notificationConsents } = useTypedSelector(state => state.general);
  const { setUserSettings, setBlockedScreen } = useActions();
  const [oldFormData, setOldFormData] = useState<number[]>(userSettings?.notifications || []);
  const [formData, setFormData] = useState<number[]>(userSettings?.notifications || []);
  const [unsavedData, setUnsavedData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setOldFormData(userSettings?.notifications || []);
    setFormData(userSettings?.notifications || []);
  }, [userSettings]);

  useEffect(() => {
    setUnsavedData(!isEqual(oldFormData, formData));
  }, [oldFormData, formData]);

  useEffect(() => {
    setBlockedScreen({ blockedExit: unsavedData, blockedBack: unsavedData});
  }, [unsavedData]);

  const handleSelectedItems = (id: number) => {
    const mySet = new Set([...formData]);
    if (mySet.has(id)) {
      mySet.delete(id);
    } else {
      mySet.add(id);
    };
    
    setFormData([...mySet].sort((a, b) => a - b));
  };

  const changeHandler = () => {
    setLoading(true);
    if(userSettings){
      setUserSettings({ ...userSettings, notifications: formData });
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
      <ScrollView contentContainerStyle={{paddingTop: 50}} style={styles.Content}>
        <Separator />
        <Switch
          checked={!formData.length}
          onCheckedChange={(isOn) => isOn ? setFormData([]) : setFormData(notificationConsents.map(notification => notification.id))}
          containerStyle={styles.HoldAllSwitch}
          leftTextView={
            <Typography style={styles.NotificationText} size={18}>
              Wstrzymaj wszystkie
            </Typography>
          }
        />
        <Separator />
        <View style={{ marginTop: 24 }}>
          {notificationConsents.map((item, index) => (
            <>
              {index === 0 &&
                <Separator />
              }
              <Switch
                key={index}
                checked={formData.includes(item.id)}
                onCheckedChange={() => handleSelectedItems(item.id)}
                containerStyle={styles.NotificationSwitch}
                leftTextView={
                  <>
                    <Typography style={styles.NotificationText} size={18} textAlign='left'>
                      {item.name}
                    </Typography>
                    <Typography style={styles.NotificationText} variant="h5" textAlign='left' color={Colors.Basic600}>
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
  Content: {
    flex: 1,
  },
  HoldAllSwitch: {
    paddingHorizontal: 19, 
    height: 58
  },
  NotificationSwitch: {
    paddingHorizontal: 19,
    paddingVertical: 16,
  },
  NotificationText: {
    width: '85%'
  },
});

export default NotificationScreen;