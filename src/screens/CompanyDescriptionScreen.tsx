import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Colors from '../colors/Colors';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import Button from '../components/molecules/Button';
import useRouter from '../hooks/useRouter';

export type CompanyDescriptionScreenProps = {
  description: string | null,
  callback: (p: string) => void,
  title?: string,
};

const CompanyDescriptionScreen: React.FC<CompanyDescriptionScreenProps> = (props) => {
  const { callback, description, title } = props;
  const [value, setValue] = useState<string>(description || '');
  const { backToRemoveParams } = useRouter();

  return (
    <ScreenHeaderProvider title={title}>
      <View style={{ backgroundColor: Colors.Basic100, flex: 1, padding: 19 }}>
        <TextField
          placeholder="Opis firmy"
          multiline
          height='100%'
          returnKeyType='none'
          maxLength={5000}
          containerStyles={{ borderWidth: 1, padding: 10, paddingBottom: 15, borderRadius: 4 }}
          value={value}
          onChangeText={setValue}
        />
      </View>
      <Button
        onPress={() => {
          callback(value);
          backToRemoveParams();
        }}
      >
        Zapisz
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({});

export default CompanyDescriptionScreen;
