import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CompositeScreenProps, useIsFocused, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import CheckBox from '../../components/atoms/CheckBox';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import Button from '../../components/molecules/Button';
import { Separator } from 'tamagui';

const LanguageScreen: React.FC = () => {
  const [index, setIndex] = useState(0);

  // const { languages, category, subcategories, methods, tools } = route.params;

  // const [languageState, setLanguageState] = useState(languages);

  const languagesList = [
    { language: "Polski", flag: "polish" },
    { language: "Angielski", flag: "english" },
    { language: "Rosyjski", flag: "russian" },
    { language: "Ukraiński", flag: "ukrainian" },
    { language: "Czeski", flag: "czech" },
  ]

  return (
    <ScreenHeaderProvider>
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
            <Separator />
            {/* <CheckBox
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
            /> */}
          </>))}

        </ScrollView>
        <Button onPress={() => {}}>Potwierdź</Button>

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
