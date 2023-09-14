import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../../components/molecules/ScrollView';
import TextField from '../../components/molecules/TextField';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CandidatesStackParamList, 'SearchScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CandidatesStack'>
>;

const SearchScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const [search, setSearch] = useState<string>('');
  // const dataCompanies = useTypedSelector(state => state.company);
  // const dataBookmarks = useTypedSelector(state => state.bookmark);

  // console.log(
  //   dataBookmarks.persons.filter(item => item.category === 'restauracja')
  //     .length,
  // );

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <ScrollView
        style={{
          backgroundColor: Colors.Basic100,
          paddingTop: 16,
        }}>
        <View style={styles.Textfield}>
          <TextField
            placeholder="Kogo szukasz?"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
          />
        </View>

        <View style={{ height: 40 }}></View>

        {/* <View style={{ paddingBottom: 40 }}>
          {dataCompanies.professions.map(
            (category, index) =>
              category.text.includes(search) &&
              category && (
                <View style={styles.Button}>
                  <ButtonArrowSelector
                    onPress={() =>
                      dataBookmarks.persons.filter(
                        person => person.category === category.text,
                      ).length === 0
                        ? ''
                        : navigation.navigate('JobScreen', {
                          index: index,
                        })
                    }
                    text={
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SvgIcon
                          icon={category.icon}
                          style={{ marginRight: 15 }}
                        />
                        <Typography
                          style={{ textTransform: 'capitalize' }}
                          color={
                            dataBookmarks.persons.filter(
                              person => person.category === category.text,
                            ).length === 0
                              ? Colors.Basic400
                              : Colors.Basic900
                          }>
                          {category.text +
                            ' (' +
                            dataBookmarks.persons.filter(
                              person => person.category === category.text,
                            ).length +
                            ')'}
                        </Typography>
                      </View>
                    }
                    marginBottom={false}
                    marginTop={false}
                    borderTop={false}
                    borderBottom={true}
                  />
                </View>
              ),
          )}
        </View> */}
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Button: {
    width: 'auto',
  },
  buttonText: {
    color: Colors.Basic700,
    textAlignVertical: 'center',
    marginLeft: 12,
  },
  Textfield: {
    marginVertical: 16,
    marginLeft: 19,
  },
});

export default SearchScreen;
