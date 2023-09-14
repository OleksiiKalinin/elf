import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, useIsFocused, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';

type PrivacyScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'PrivacyScreen'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ navigation }) => {
  const permissions = [
    { text: "Zgoda na przesyłanie ofert", route: "SendingOffers" },
    { text: "Zgoda na udostępnianie swojej lokalizacji", route: "ShareLocation" },
    { text: "Zgoda RODO", route: "RODO" },
    { text: "Zgoda na dostęp do aparatu", route: "ShareCamera" },
    { text: "Zgoda na dostęp do kontaktów", route: "ShareContacts" },
  ]

  return (
    <ScreenHeaderProvider>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>

          <Typography color={Colors.Basic700} style={{ marginHorizontal: 19, marginVertical: 12 }}>
            ELF dokłada wszelkich starań, aby zapewnić ochronę prywatności użytkowników podczas korzystania z naszych usług. Zarządzaj informacjami, które udostępniasz w aplikacji.
          </Typography>

          <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.Basic300, marginTop: 45 }}></View>
          {/* {permissions.map(item =>

            <ButtonArrowSelector
              text={item.text}
              marginBottom={false}
              marginTop={false}
              borderTop={false}
              onPress={() => navigation.navigate(item.route)}
            />

          )} */}


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
  margin: {
    marginVertical: 12,
    marginHorizontal: 24,
  },
  cardType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 19,
    marginHorizontal: 19,
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.Basic300,
    height: 60,
    alignItems: "center",
    justifyContent: "center"
  },
});

export default PrivacyScreen;
