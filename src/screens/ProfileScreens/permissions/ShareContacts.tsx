import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { CompositeScreenProps, useRoute } from '@react-navigation/native';
import Colors from '../../../colors/Colors';
import Switch from '../../../components/atoms/Switch';
import Typography from '../../../components/atoms/Typography';
import ScreenHeaderProvider from '../../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../../navigators/ProfileNavigator';
import { ScrollView } from '../../../components/molecules/ScrollView';

const ShareContacts: React.FC = () => {
  const [switchState, setSwitchState] = useState(false);

  return (
    <ScreenHeaderProvider>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>

          <View style={styles.notificationItem}>
            <View style={{ width: '80%' }}>
              <Typography variant="h5" style={{ marginBottom: 11 }}>Zgoda na dostęp do kontaktów </Typography>
              <Typography variant="small" color={Colors.Basic600} style={{ width: 280 }}>
                Jobassistant daje możliwość szybkiego i sprawnego kontaktowania się z pracodawcami oraz kandydatami. Jeżeli nie zgodzisz się na dostęp do kontaktów, bezpośrednie połączenia z aplikacji nie będą tutaj możliwe, a ich historia - wyświetlana.
              </Typography>
            </View>
            <View style={{ alignSelf: "flex-start" }}>
              <Switch
                isOn={switchState}
                onToggle={() =>
                  switchState ? setSwitchState(false) : setSwitchState(true)
                }
              />
            </View>
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

export default ShareContacts;
