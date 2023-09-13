import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, useIsFocused, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';

type HelpCenterScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'HelpCenterScreen'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const HelpCenterScreen: React.FC<HelpCenterScreenProps> = ({ navigation }) => {
  const hints = [
    { text: "Jak zmienić twoje dane?", route: "Register" },
    { text: "Jak założyć profil firmy?", route: "CreateCompanyProfile" },
    { text: "Jak dodać ogłoszenie?", route: "AddAdvert" },
    { text: "Jakie metody płatności są dostępne?", route: "PaymentMethods" },
    { text: "Jak dodać spotkanie w kalendarzu?", route: "AddEvent" },
    { text: "Jak dodać połączenie w kalendarzu?", route: "AddCall" },
  ]

  return (
    <ScreenHeaderProvider currentStack="ProfileStack">
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>

          <View style={{ borderBottomWidth: 1, borderColor: Colors.Basic300, marginTop: 33 }}></View>
          {/* {hints.map(item =>
            <ButtonArrowSelector
              marginBottom={false}
              marginTop={false}
              borderTop={false}
              text={item.text}
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

export default HelpCenterScreen;
