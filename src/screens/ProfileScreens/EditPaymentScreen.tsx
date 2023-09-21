import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import { useActions } from '../../hooks/useActions';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';

const EditPaymentScreen: React.FC = () => {
  const { setSwipeablePanelProps } = useActions();

  const deleteHandler = () => {
    setSwipeablePanelProps({
      title: 'Usunięcie formy płatności',
      subTitle: 'Czy na pewno chcesz usunąć tę formę płatności?',
      buttons: [
        {
          children: 'Usuń',
          contentColor: Colors.Danger,
          onPress: () => console.log('Kalkulator'),
        },
      ],
    })
  }

  return (
    <ScreenHeaderProvider>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>
          <View style={styles.cardType}>
            <Typography weight="Bold" variant="h2">
              Visa
            </Typography>
            <SvgIcon icon="visa" />
          </View>

          <View>
            <Typography
              variant="h5"
              color={Colors.Basic600}
              style={{ marginLeft: 19 }}>
              **** **** **** 4383
            </Typography>
          </View>

          <View style={{ marginTop: 25, marginBottom: 40, marginLeft: 19 }}>
            <Typography variant="small" color={Colors.Basic600}>
              Data ważności
            </Typography>
            <Typography
              variant="h5"
              color={Colors.Basic600}
              style={{ marginTop: 8 }}>
              03/25
            </Typography>
          </View>

          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteHandler()}>
            <Typography color={Colors.Danger}>Usuń</Typography>
          </TouchableOpacity>
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
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.Basic300,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditPaymentScreen;
