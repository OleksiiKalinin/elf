import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import CheckBox from '../../components/atoms/CheckBox';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import Button from '../../components/molecules/Button';
import { Separator } from 'tamagui';

const MethodsScreen: React.FC = () => {
  // const { languages, category, subcategories, methods, tools } = route.params;

  const [search, setSearch] = useState<string>('');
  // const [selectedItems, setSelectedItems] = useState<any>(methods);
  // const data = useTypedSelector(state => state.company);

  return (
    <ScreenHeaderProvider
      mainTitlePosition="flex-start"
      actions={[]}
    >
      <ScrollView
        style={{
          backgroundColor: Colors.Basic100,
          paddingTop: 16,
        }}>

        <View style={styles.Textfield}>
          <TextField
            placeholder="Znajdź metodę"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* {data.methods[0].beauty.map((item, index) => (
          <View>
            <Separator />
            <CheckBox
              leftText={item}
              checked={selectedItems.includes(index)}
              onCheckedChange={(checked) =>
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
      <Button
        // onPress={() => navigation.navigate("ToolsScreen", {
        //   methods: selectedItems,
        //   languages: languages,
        //   category: category,
        //   subcategories: subcategories,
        //   tools: tools
        // })}
      >
        Zatwierdź
      </Button>

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

export default MethodsScreen;
