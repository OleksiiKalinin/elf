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
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CandidatesStackParamList, 'JobScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CandidatesStack'>
>;

const JobScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  // const dataBookmarks = useTypedSelector(state => state.bookmark);

  const [search, setSearch] = useState<string>('');
  const [subcategory, setSubcategory] = useState<string>('');

  // const data = useTypedSelector(state => state.company);

  const { index } = route.params;

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <ScrollView
        style={{
          backgroundColor: Colors.Basic100,
          paddingTop: 16,
        }}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          {/* <SvgIcon
            icon={data.professions[index].icon}
            style={{ alignSelf: 'center', marginHorizontal: 19 }}
          /> */}
          <Typography variant="h4" style={{ alignSelf: 'center', textTransform: 'capitalize' }}>
            {/* {data.professions[index].text} */}
          </Typography>
        </TouchableOpacity>

        <View style={{ height: 40 }}></View>

        {/* {data.professions[index].list.map((item, i) => (
          <View style={{ borderBottomWidth: 1, borderColor: Colors.Basic300 }}>
            <TouchableOpacity
              style={styles.Category}
              onPress={() => {
                dataBookmarks.persons.filter(
                  person => person.job === item,
                ).length === 0 ? "" :
                  navigation.navigate('FilterScreen', {
                    pushedJob: item,
                    index: index,
                  });
              }}>
              <Typography
                style={{ textTransform: 'capitalize' }}
                color={
                  dataBookmarks.persons.filter(
                    person => person.job === item,
                  ).length === 0
                    ? Colors.Basic400
                    : Colors.Basic900
                }>

                {item +
                  ' (' +
                  dataBookmarks.persons.filter(
                    person => person.job === item,
                  ).length +
                  ')'}
              </Typography>
            </TouchableOpacity>
          </View>
        ))} */}

        <View style={{ marginBottom: 40 }}></View>
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Button: {
    height: 60,
    width: 'auto',
    justifyContent: 'flex-start',
    backgroundColor: Colors.White,
    flexDirection: 'row',
  },
  Textfield: {
    marginVertical: 16,
    marginLeft: 19,
  },
  Category: {
    justifyContent: 'flex-start',
    padding: 0,
    marginVertical: 16,
    marginLeft: 19,
  },
});

export default JobScreen;
