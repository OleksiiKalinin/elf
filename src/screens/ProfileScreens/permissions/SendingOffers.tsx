import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigators/RootNavigator';
import Colors from '../../../colors/Colors';
import Typography from '../../../components/atoms/Typography';
import ScreenHeaderProvider from '../../../components/organismes/ScreenHeaderProvider';
import Switch from '../../../components/atoms/Switch';
import { ProfileStackParamList } from '../../../navigators/ProfileNavigator';

type SendingOffersProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'SendingOffers'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const SendingOffers: React.FC<SendingOffersProps> = ({ navigation }) => {


  const [switchState, setSwitchState] = useState(false);


  return (
    <ScreenHeaderProvider>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>

          <View style={styles.notificationItem}>
            <View style={{ width: '80%' }}>
              <Typography variant="h5" style={{ marginBottom: 11 }}>Zgoda na przesyłanie ofert </Typography>
              <Typography variant="small" color={Colors.Basic600} style={{ width: 280 }}>
                Otrzymuj komunikaty dotyczące publikacji nowych artykułów, materiałów i informacji w bazie wiedzy.
                Zgoda na przekazywanie użytkownikom informacji handlowych przez Jobassistant na temat oferty Jobassistant za pomocą środków komunikacji elektronicznej, w rozumieniu Ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną oraz na użycie telekomunikacyjnych urządzeń końcowych i automatycznych systemów wywołujących, w tym połączeń głosowych i sms, w rozumieniu Ustawy z dnia 16 lipca 2004 r.
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

export default SendingOffers;
