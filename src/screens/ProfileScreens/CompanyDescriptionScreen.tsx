import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { ScrollView } from 'native-base';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import TabbarMenu, {
  TabbarRoute,
} from '../../components/organisms/TabbarMenu/TabbarMenu';
import { SceneMap } from 'react-native-tab-view';
import { nativeStore } from '../../store';
import { advertActionTypes, companyActionTypes } from '../../store/actions';
import AboutCard from './CompanyScreenRoutes/AboutCard/AboutCard';
import OpinionCard from './CompanyScreenRoutes/OpinionCard/OpinionCard';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Carousel from '../../components/organisms/Carousel/Carousel';
import TextField from '../../components/molecules/TextField/TextField';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'CompanyDescriptionScreen'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const CompanyDescriptionScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const {callback, description, title} = route.params;
  const [value, setValue] = useState<string>(description || '');

  return (
    <ScreenHeaderProvider currentStack="ProfileStack" title={title}>
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
      <ButtonRipple
        onPress={() => {
          callback(value);
          navigation.goBack();
        }}
      >
        Zapisz
      </ButtonRipple>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({});

export default CompanyDescriptionScreen;
