import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CompositeScreenProps, useIsFocused, useRoute } from '@react-navigation/native';
import Colors from '../../colors/Colors';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { ScrollView } from '../../components/molecules/ScrollView';

const PaymentScreen: React.FC = () => {
  return (
    <ScreenHeaderProvider>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>
          <View
            style={{
              backgroundColor: Colors.Sea200,
              paddingTop: 12,
              paddingBottom: 19,
              paddingLeft: 19,
            }}>
            <Typography
              variant="h5"
              color={Colors.Basic600}
              style={{ marginBottom: 6 }}>
              PAKIET - PREMIUM
            </Typography>
            <Typography variant="main" style={{ marginBottom: 6 }}>
              <Typography variant="h3" weight="Bold">
                80zł{' '}
              </Typography>
              tydzień
            </Typography>
            <Typography variant="small" color={Colors.Danger}>
              Pakiet wygasł
            </Typography>
          </View>

          <View style={styles.Header}>
            <Typography variant="h5" weight="Bold">
              Metody płatności
            </Typography>
          </View>

          {/* <ButtonArrowSelector
            text={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SvgIcon icon="visa" style={{ marginRight: 9 }} />
                <Typography>**** **** **** 4383</Typography>
              </View>
            }
            marginTop={false}
            marginBottom={false}
            onPress={() => navigation.navigate('EditPaymentScreen')}
          />

          <ButtonArrowSelector
            text={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SvgIcon icon="visa" style={{ marginRight: 9 }} />
                <Typography>**** **** **** 5196</Typography>
              </View>
            }
            marginTop={false}
            marginBottom={false}
            borderTop={false}
            onPress={() => navigation.navigate('EditPaymentScreen')}
          />

          <ButtonArrowSelector
            text={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SvgIcon icon="createCircleSmall" style={{ marginRight: 9 }} />
                <Typography>Dodaj kartę</Typography>
              </View>
            }
            marginTop={false}
            marginBottom={false}
            borderTop={false}
            onPress={() => navigation.navigate('AddPaymentScreen')}
          /> */}
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
  Header: {
    marginTop: 11,
    paddingTop: 17,
    paddingBottom: 10,
    paddingLeft: 19,
  },
  margin: {
    marginVertical: 12,
    marginHorizontal: 24,
  },
});

export default PaymentScreen;
