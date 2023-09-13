import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { nativeStore } from '../../store';
import { bookmarkActionTypes } from '../../store/actions';
import { useActions } from '../../hooks/useActions';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../../components/molecules/ScrollView';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CandidatesStackParamList, 'FavSettingsScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CandidatesStack'>
>;

const FavSettingsScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  // const data = useTypedSelector(state => state.bookmark);

  const colors = [
    Colors.Green500,
    '#70EEFF',
    Colors.Blue500,
    '#CD16D9',
    Colors.Danger,
    '#FF834E',
    '#FFD500',
    Colors.Basic800,
  ];

  const selectedColors = [
    'rgba(3, 214, 176, 0.2)',
    'rgba(112, 238, 255, 0.2)',
    'rgba(74, 50, 205, 0.2)',
    'rgba(205, 22, 217, 0.2)',
    'rgba(237, 9, 91, 0.2)',
    'rgba(255, 131, 78, 0.2)',
    'rgba(255, 213, 0, 0.2)',
    'rgba(23, 25, 55, 0.2)',
  ];

  // const [color0, setColor0] = useState(colors.indexOf(data.bookmarks[0].color));
  // const [color1, setColor1] = useState(colors.indexOf(data.bookmarks[1].color));
  // const [color2, setColor2] = useState(colors.indexOf(data.bookmarks[2].color));


  return (
    <ScreenHeaderProvider currentStack="CandidatesStack" mainTitlePosition="flex-start">
      <ScrollView style={{ flex: 1, backgroundColor: Colors.Basic100 }}>
        <View style={{ marginTop: 25 }}></View>
        <View>
          <View style={[styles.categoryContainer]}>
            {/* <SvgIcon
              icon="cardFilled"
              fill={colors[color0] ? colors[color0] : data.bookmarks[0].color}
            />
            <Typography color={Colors.Basic600} variant='h5' style={styles.categoryText}>
              {data.bookmarks[0].name}
            </Typography> */}
          </View>
          <View style={styles.colorPicker}>
            {/* {colors.map((item, i) => (
              <SvgIcon
                style={[styles.color]}
                icon={i === color0 ? 'colorCircleSelected' : 'colorCircle'}
                fill={item}
                onPress={() => {
                  setColor0(i);
                }}
              />
            ))} */}
          </View>
        </View>
        <View>
          <View style={[styles.categoryContainer]}>
            {/* <SvgIcon
              icon="cardFilled"
              fill={colors[color1] ? colors[color1] : data.bookmarks[1].color}
            />
            <Typography color={Colors.Basic600} variant='h5' style={styles.categoryText}>
              {data.bookmarks[1].name}
            </Typography> */}
          </View>
          <View style={styles.colorPicker}>
            {/* {colors.map((item, i) => (
              <SvgIcon
                style={[styles.color]}
                icon={i === color1 ? 'colorCircleSelected' : 'colorCircle'}
                fill={item}
                onPress={() => {
                  setColor1(i);
                }}
              />
            ))} */}
          </View>
        </View>

        <View>
          <View style={[styles.categoryContainer]}>
            {/* <SvgIcon
              icon="cardFilled"
              fill={colors[color2] ? colors[color2] : data.bookmarks[2].color}
            />
            <Typography color={Colors.Basic600} variant='h5' style={styles.categoryText}>
              {data.bookmarks[2].name}
            </Typography> */}
          </View>
          <View style={styles.colorPicker}>
            {/* {colors.map((item, i) => (
              <SvgIcon
                style={[styles.color]}
                icon={i === color2 ? 'colorCircleSelected' : 'colorCircle'}
                fill={item}
                onPress={() => {
                  setColor2(i);
                }}
              />
            ))} */}
          </View>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: Colors.Basic100 }}>
        <View style={{ marginBottom: 19, alignItems: 'center' }}>
          <Button
            variant='white'
            // onPress={() => { setColor0(0), setColor1(6), setColor2(1) }}
            style={{ paddingHorizontal: 16 }}
            borderRadius={4}
          // containerStyles={{borderRadius: 4, overflow: 'hidden'}}
          >
            Przywróć domyślne
          </Button>
        </View>
        <Button
          onPress={() => {
            // navigation.navigate('FavouritesScreen'),
            //   nativeStore.dispatch({
            //     type: bookmarkActionTypes.SET_COLOR,
            //     payload: {
            //       colors: [colors[color0], colors[color1], colors[color2]],
            //       selectedColors: [
            //         selectedColors[color0],
            //         selectedColors[color1],
            //         selectedColors[color2],
            //       ],
            //     },
            //   });
          }}
        >
          Zapisz
        </Button>
      </View>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: Colors.White,
    flexDirection: 'row',
    paddingVertical: 16,
    paddingLeft: 21,
  },
  categoryText: {
    marginLeft: 13,
  },
  colorPicker: {
    borderTopWidth: 1,
    borderColor: Colors.Basic300,
    backgroundColor: Colors.White,
    marginBottom: 25,
    paddingLeft: 12,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  color: {
    width: 20,
    height: 20,
    borderRadius: 100,
    marginRight: 23,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: 'red',
    width: 200,
    height: 50,
  },
});

export default FavSettingsScreen;
