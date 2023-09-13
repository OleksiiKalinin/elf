import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigators/RootNavigator';
import Colors from '../../../colors/Colors';
import Typography from '../../../components/atoms/Typography';
import ScreenHeaderProvider from '../../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../../navigators/ProfileNavigator';
import Switch from '../../../components/atoms/Switch';

type ShareCameraProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'ShareCamera'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const ShareCamera: React.FC<ShareCameraProps> = ({ navigation }) => {

  const [switchState, setSwitchState] = useState(false);


  return (
    <ScreenHeaderProvider currentStack="ProfileStack">
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>

          <View style={styles.notificationItem}>
            <View style={{ width: '80%' }}>
              <Typography variant="h5" style={{ marginBottom: 11 }}>Zgoda na dostęp do aparatu </Typography>
              <Typography variant="small" color={Colors.Basic600} style={{ width: 280 }}>
                Jobassistant korzysta z Twojego aparatu w celu robienia zdjęć służących do właściwej obsługi aplikacji. Możesz włączyć lub wyłączyć dostęp w każdej chwili.
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

export default ShareCamera;
