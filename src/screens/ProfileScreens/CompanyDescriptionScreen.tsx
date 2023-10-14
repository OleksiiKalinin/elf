import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Colors from '../../colors/Colors';
import { SceneMap } from 'react-native-tab-view';
import { nativeStore } from '../../store';
import { advertActionTypes, companyActionTypes } from '../../store/actions';
import AboutCard from './CompanyScreenRoutes/AboutCard/AboutCard';
import OpinionCard from './CompanyScreenRoutes/OpinionCard/OpinionCard';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';

const CompanyDescriptionScreen: React.FC<ProfileStackParamList['CompanyDescriptionScreen']> = (props) => {
  const {callback, description, title} = props;
  const [value, setValue] = useState<string>(description || '');

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
          // navigation.goBack();
        }}
      >
        Zapisz
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({});

export default CompanyDescriptionScreen;
