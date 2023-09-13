import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import CheckBox from '../../components/atoms/CheckBox';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import Button from '../../components/molecules/Button';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'JobScreen'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const JobScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const [search, setSearch] = useState<string>('');
  const { index, languages, methods, category, subcategories, tools } = route.params;
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const data = useTypedSelector(state => state.company);

  return (
    <ScreenHeaderProvider
      currentStack="ProfileStack"
      mainTitlePosition="flex-start"
      actions={[]}
    >
      <ScrollView
        style={{
          backgroundColor: Colors.Basic100,
          paddingTop: 16,
        }}
      >
        {/* <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate("JobCategoryScreen")}
          >
          <SvgIcon icon={data.jobs[index].icon} style={{ alignSelf: "center", marginHorizontal: 19 }} />
          <Typography variant="h4" style={{ textAlignVertical: "center" }}>{data.jobs[index].text}</Typography>
        </TouchableOpacity> */}

        <View style={styles.Textfield}>
          <TextField
            placeholder="Znajdź specjalizację"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* {data.jobs[index].list.map((item, index) => (
          <View>
            <Divider />
            <CheckBox
              leftText={item}
              isChecked={selectedItems.includes(index)}
              onClick={() =>
                !selectedItems.includes(index)
                  ? setSelectedItems((state: any) => [...state, index])
                  : setSelectedItems((state: any[]) =>
                    state.filter(item => item !== index),
                  )
              }
              style={{ padding: 16 }}
            />
          </View>
        ))} */}

        <View style={{ marginBottom: 40 }}></View>
      </ScrollView>
      <Button onPress={() => { }}>Zatwierdź</Button>

    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Button: {
    height: 80,
    width: 'auto',
    justifyContent: 'flex-start',
    backgroundColor: Colors.White,
    flexDirection: "row"
  },
  Textfield: {
    marginVertical: 56,
    marginHorizontal: 16,

  },
  Category: {
    justifyContent: 'flex-start',
    padding: 0,
    marginVertical: 16,
  },
});

export default JobScreen;
function useTypedSelector(arg0: (state: any) => any) {
  throw new Error('Function not implemented.');
}

