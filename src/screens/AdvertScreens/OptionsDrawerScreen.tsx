import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../../components/molecules/ScrollView';
import CheckBox from '../../components/atoms/CheckBox';
import Button from '../../components/molecules/Button';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AdvertStackParamList, 'OptionsDrawerScreen'>,
  NativeStackScreenProps<RootStackParamList, 'AdvertStack'>
>;

const OptionsDrawerScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  // const { category, selectedRequirements, selectedDuties, selectedLanguages, selectedBenefits, path } = route.params;

  // const data = useTypedSelector(state => state.adverts);

  // const selectedOptions = (
  //   category === "requirements" ? data.options[0].requirements :
  //     category === "duties" ? data.options[0].duties :
  //       category === "languages" ? data.options[0].languages :
  //         category === "benefits" ? data.options[0].benefits :
  //           data.options[0].requirements);

  // const [isChecked, setIsChecked] = useState<any>(
  //   category === "requirements" ? selectedRequirements :
  //     category === "duties" ? selectedDuties :
  //       category === "languages" ? selectedLanguages :
  //         category === "benefits" ? selectedBenefits :
  //           null
  // )

  // console.log(isChecked)

  return (
    <ScreenHeaderProvider currentStack="AdvertStack">
      <ScrollView style={{ backgroundColor: Colors.Basic100, flex: 1 }}>
        {/* {selectedOptions.map((item, index) => (<>
          <CheckBox
            leftText={item}
            isChecked={isChecked.includes(index)}
            onClick={() =>
              !isChecked.includes(index)
                ?
                setIsChecked((state: any) => [...state, index])
                :
                setIsChecked((state: any[]) => state.filter((item => item !== index)))
            }
            style={{ padding: 16 }}
          />
          <Divider />
        </>)
        )} */}

      </ScrollView>
      <Button
      // onPress={() => navigation.navigate((path === "EditScreen" ? "EditAdvertScreen" : "NewAdvertScreen"), {
      //   selectedRequirements: category === "requirements" && isChecked,
      //   selectedDuties: category === "duties" && isChecked,
      //   selectedLanguages: category === "languages" && isChecked,
      //   selectedBenefits: category === "benefits" && isChecked
      // })}
      >
        Potwierdź
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({

});

export default OptionsDrawerScreen;
