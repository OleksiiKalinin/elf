import { CompositeScreenProps } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import TextField from '../../components/molecules/TextField';
import Button from '../../components/molecules/Button';

const AddPersonScreen: React.FC = () => {
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
    <ScreenHeaderProvider mainTitlePosition="flex-start">
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

      <Button 
      // onPress={() => navigation.navigate('EventScreen', {
      //   name: formData.fullName,
      //   phone: formData.phone
      // })}
      >
        Potwierdź
      </Button>
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
