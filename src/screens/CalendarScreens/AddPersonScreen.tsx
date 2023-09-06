import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import Typography from '../../components/atoms/Typography/Typography';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import TextField from '../../components/molecules/TextField/TextField';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { nativeStore } from '../../store';
import { calendarActionTypes } from '../../store/actions';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CalendarStackParamList, 'AddPersonScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CalendarStack'>
>;

const AddPersonScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  type inputs = 'fullName' | 'phone';

  type formDataTypes = {
    fullName: string;
    phone: string;
  };

  const [formData, setFormData] = useState<formDataTypes>({
    fullName: '',
    phone: '',
  });

  const changeFormDataHandler = (name: inputs, text: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: text }));
  };

  return (
    <ScreenHeaderProvider currentStack="CalendarStack" mainTitlePosition="flex-start">
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        <View>
          <Typography weight="Bold" style={styles.Title}>
            Kandydat
          </Typography>
        </View>

        <View style={styles.margin}>
          <TextField
            placeholder="Imię i nazwisko"
            textContentType="name"
            value={formData.fullName}
            onChangeText={text => changeFormDataHandler('fullName', text)}
          />
        </View>

        <View style={styles.margin}>
          <TextField
            // mask='999 999 999'
            left={<Typography style={{ fontSize: 16, bottom: 2 }}>+48</Typography>}
            placeholder="Numer telefonu"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={text => changeFormDataHandler('phone', text)}
          />
        </View>

        <View style={{ marginBottom: 40 }}></View>
      </ScrollView>

      <ButtonRipple onPress={() => navigation.navigate('EventScreen', {
        name: formData.fullName,
        phone: formData.phone
      })}>
        Potwierdź
      </ButtonRipple>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Title: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 4,
    left: 20,
  },
  Text: {
    color: Colors.Basic900,
    fontSize: 16,
    flexWrap: 'wrap',
    marginRight: 20,
  },
  margin: {
    marginVertical: 12,
    marginHorizontal: 24,
  },
});

export default AddPersonScreen;
