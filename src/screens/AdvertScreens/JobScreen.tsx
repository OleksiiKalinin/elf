import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../../components/molecules/ScrollView';
import TextField from '../../components/molecules/TextField';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import getPathnameFromScreen from '../../hooks/getPathnameFromScreen';
import { useRouter } from 'solito/router';

const JobScreen: React.FC<AdvertStackParamList['JobScreen']> = ({callback, job_positions}) => {
  const [search, setSearch] = useState<string>('');
  // const { callback, job_positions } = route.params;
  const {replace} = useRouter();
  const { userCompany, currentScreen } = useTypedSelector(s => s.general);

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start" title='Kategorie'>
      <ScrollView style={{ backgroundColor: Colors.Basic100 }} contentContainerStyle={{ paddingHorizontal: 19, paddingTop: 19, }}>
        {/* <TouchableOpacity
          style={styles.Button}
          onPress={() => console.log("aaa")}>
          <SvgIcon icon={icon} style={{ alignSelf: "center", marginHorizontal: 19 }} />
          <Typography variant="h4" style={{ textAlignVertical: "center" }}>{category}</Typography>
        </TouchableOpacity> */}
        {!!userCompany ? <>
          <View style={styles.Textfield}>
            <TextField
              placeholder="Kogo szukasz?"
              textContentType="emailAddress"
              keyboardType="email-address"
              value={search}
              onChangeText={setSearch}
              left={<SvgIcon icon='search' />}
              // right={<IconButton
              //   p='7px' mr='-7px' borderRadius={0}
              //   icon={<SvgIcon icon='crossBig' />}
              //   onPress={() => setSearch('')}
              // />}
            />
          </View>

          {job_positions.map(({ id, name }) => !!name.includes(search) && (
            <View style={{ borderBottomWidth: 1, borderColor: Colors.Basic300 }}>
              <TouchableOpacity style={styles.Category}
                onPress={() => {
                  callback(id);
                  replace(getPathnameFromScreen(currentScreen));
                  // navigation.goBack();
                }}
              >
                <Typography color={Colors.Basic900}>{name}</Typography>
              </TouchableOpacity>
            </View>
          ))}
        </>
          :
          <Typography>Nie masz firmy</Typography>
        }
      </ScrollView>
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
    marginVertical: 16,
  },
  Category: {
    justifyContent: 'flex-start',
    padding: 0,
    marginVertical: 16,
  },
});

export default JobScreen;
