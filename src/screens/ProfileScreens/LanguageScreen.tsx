import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Typography from '../../components/atoms/Typography/Typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, useIsFocused, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import TextField from '../../components/molecules/TextField/TextField';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import CheckBox from '../../components/atoms/CheckBox/CheckBox';
import { Divider } from 'native-base';

type LanguageScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'LanguageScreen'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const LanguageScreen: React.FC<LanguageScreenProps> = ({ navigation, route }) => {
  const [index, setIndex] = useState(0);

  const { languages, category, subcategories, methods, tools } = route.params;

  const [languageState, setLanguageState] = useState(languages);

  const languagesList = [
    { language: "Polski", flag: "polish" },
    { language: "Angielski", flag: "english" },
    { language: "Rosyjski", flag: "russian" },
    { language: "Ukraiński", flag: "ukrainian" },
    { language: "Czeski", flag: "czech" },
  ]

  return (
    <ScreenHeaderProvider currentStack="ProfileStack">
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>
          <View style={{ marginHorizontal: 19 }}>
            <TextField
              left={<SvgIcon icon="search" />}
              placeholder="Znajdź język"
              onChangeText={() => console.log('aaa')}
            />
          </View>

          <Typography
            style={{ marginTop: 35, marginLeft: 19, marginBottom: 9 }}
            color={Colors.Basic600}>
            Popularne języki
          </Typography>

          {languagesList.map((item, index) => (<>
            <Divider />
            <CheckBox
              leftTextView={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SvgIcon icon={item.flag} />
                  <Typography style={{ marginLeft: 7 }}>{item.language}</Typography>
                </View>
              }
              isChecked={languageState.includes(index)}
              onClick={() =>
                !languageState.includes(index)
                  ? setLanguageState((state: any) => [...state, index])
                  : setLanguageState((state: any[]) =>
                    state.filter(item => item !== index),
                  )
              }
              style={{ padding: 16 }}
            />
          </>))}

        </ScrollView>
        <ButtonRipple onPress={() => {}}>Potwierdź</ButtonRipple>

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
});

export default LanguageScreen;
