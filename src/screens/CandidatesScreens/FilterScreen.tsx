import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Touchable, View, Text } from 'react-native';
import { Divider, IconButton, ScrollView } from 'native-base';
import Typography from '../../components/atoms/Typography/Typography';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import HorizontalMenuButton from '../../components/atoms/HorizontalMenuButton/HorizontalMenuButton';
import ButtonArrowSelector from '../../components/atoms/ButtonArrowSelector/ButtonArrowSelector';
import HorizontalSelector from '../../components/molecules/HorizontalSelector/HorizontalSelector';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CheckBox from '../../components/atoms/CheckBox/CheckBox';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CandidatesStackParamList, 'FilterScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CandidatesStack'>
>;

const Distance: Array<string> = [
  '+1 km',
  '+3 km',
  '+5 km',
  '+7 km',
  '+9 km',
  '+11 km',
];

const Experience: Array<string> = [
  'Bez doświadczenia',
  'Do roku',
  '2 lata',
  '3 lata',
  '4 lata',
  '5 lat lub więcej',
];

const Workload: Array<string> = [
  'Pełny etat',
  'Tymczasowa',
  '3/4 etatu',
  '1/2 etatu',
  '1/4 etatu',
];

const contractType: Array<string> = [
  'Umowa o pracę',
  'B2B',
  'Umowa zlecenie',
  'Umowa o dzieło',
  'Staż',
  'Praktyki',
];

const sortingTypes: Array<string> = ['Najnowsi', 'Najbliżsi', 'Najdroższe'];

const FilterScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const dataCompanies = useTypedSelector(state => state.company);
  const dataBookmarks = useTypedSelector(state => state.bookmark);
  const [checkbox0, setCheckbox0] = useState(false);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [sorting, setSorting] = useState<any>();
  const [selectedDistance, setSelectedDistance] = useState<any>();
  const [selectedExperience, setSelectedExperience] = useState<any>([]);
  const [selectedWorkload, setSelectedWorkload] = useState<any>([]);
  const [selectedContractType, setSelectedContractType] = useState<any>([]);
  const { index, pushedJob, place } = route.params;
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [salaryMin, setSalaryMin] = useState<number>();
  const [salaryMax, setSalaryMax] = useState<number>();

  useEffect(() => {
    index !== null && setSelectedJob(pushedJob);
  });

  useEffect(() => {
    place && setSelectedPlace(place);
  });

  useEffect(() => {
    checkbox0 && (setSelectedPlace(null), setSelectedDistance(null));
  });

  return (
    <ScreenHeaderProvider currentStack="CandidatesStack">
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        <Typography variant="h4" weight="Bold" style={{ marginLeft: 19, marginBottom: 10, marginTop: 30 }}>
          Sortuj po
        </Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 19, marginBottom: 30 }}>
          {sortingTypes.map((item, i) => (
            <HorizontalMenuButton
              name={item}
              selected={sorting === i ? true : false}
              onPress={() => (sorting !== i ? setSorting(i) : setSorting(null))}
            />
          ))}
        </ScrollView>
        <ButtonArrowSelector
          text={selectedJob === null ? (
            'Wybierz stanowisko'
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <SvgIcon
                icon={dataCompanies.jobs[index].icon}
                style={{ alignSelf: 'center', marginRight: 20 }}
              />
              <View>
                <Typography
                  variant="h4"
                  style={{ textTransform: 'capitalize' }}>
                  {selectedJob}
                </Typography>
                <Typography
                  color={Colors.Basic600}
                  style={{ textTransform: 'capitalize' }}>
                  {dataCompanies.jobs[index].text}
                </Typography>
              </View>
            </View>
          )
          }
          jobTemplate={pushedJob && true}
          onPress={() => navigation.navigate('SearchScreen')}
        />

        <ButtonArrowSelector
          text={selectedPlace ? selectedPlace : 'Lokalizacja'}
          onPress={() => navigation.navigate('MapScreen')}
        />

        {/* <HorizontalSelector
          title={'Odległość'}
          star={false}
          buttons={Distance.map((item, index) => (
            <HorizontalMenuButton
              selected={selectedDistance === index ? true : false}
              name={item}
              onPress={() =>
                selectedDistance !== index
                  ? setSelectedDistance(index)
                  : setSelectedDistance(null)
              }
            />
          ))}
        /> */}

        <View style={{ marginBottom: 36 }}>
          <CheckBox
            leftText='Cała Polska'
            isChecked={checkbox0}
            onClick={() => setCheckbox0(prev => !prev)}
            style={{ padding: 16 }}
          />
          <Divider />
        </View>

        <HorizontalSelector
          title={'Doświadczenie'}
          star={false}
          buttons={Experience.map((item, j) => (
            <HorizontalMenuButton
              selected={selectedExperience.includes(item) ? true : false}
              name={
                <View style={{ flexDirection: 'row' }}>
                  <Typography style={{ marginRight: 4 }}>{item}</Typography>
                  <Typography color={Colors.Basic600}>
                    {
                      dataBookmarks.persons.filter(i => i.experience === item)
                        .length
                    }
                  </Typography>
                </View>
              }
              onPress={() =>
                selectedExperience.includes(item)
                  ? setSelectedExperience(
                    selectedExperience.filter(q => q !== item),
                  )
                  : setSelectedExperience(state => [...state, item])
              }
            />
          ))}
        />

        <HorizontalSelector
          title={'Wymiar pracy'}
          star={false}
          buttons={Workload.map((item, j) => (
            <HorizontalMenuButton
              selected={selectedWorkload.includes(item) ? true : false}
              name={
                <View style={{ flexDirection: 'row' }}>
                  <Typography style={{ marginRight: 4 }}>{item}</Typography>
                  <Typography color={Colors.Basic600}>
                    {
                      dataBookmarks.persons.filter(i => i.workload === item)
                        .length
                    }
                  </Typography>
                </View>
              }
              onPress={() =>
                selectedWorkload.includes(item)
                  ? setSelectedWorkload(
                    selectedWorkload.filter(q => q !== item),
                  )
                  : setSelectedWorkload(state => [...state, item])
              }
            />
          ))}
        />

        <HorizontalSelector
          title={'Rodzaj umowy'}
          star={false}
          buttons={contractType.map((item, j) => (
            <HorizontalMenuButton
              selected={selectedContractType.includes(item) ? true : false}
              name={
                <View style={{ flexDirection: 'row' }}>
                  <Typography style={{ marginRight: 4 }}>{item}</Typography>
                  <Typography color={Colors.Basic600}>
                    {
                      dataBookmarks.persons.filter(i => i.contract === item)
                        .length
                    }
                  </Typography>
                </View>
              }
              onPress={() =>
                selectedContractType.includes(item)
                  ? setSelectedContractType(
                    selectedContractType.filter(q => q !== item),
                  )
                  : setSelectedContractType(state => [...state, item])
              }
            />
          ))}
        />

        {/* <ButtonArrowSelector text="Znajomość języków" /> */}

        <CheckBox
          leftTextView={
            <View style={{ flexDirection: 'row' }}>
              <Typography style={{ marginRight: 4 }}>Praca od zaraz</Typography>
              <Typography color={Colors.Basic600}>
                {dataBookmarks.persons.filter(i => i.available === true).length}
              </Typography>
            </View>
          }
          isChecked={checkbox1}
          onClick={() => setCheckbox1(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
        <CheckBox
          leftTextView={
            <View style={{ flexDirection: 'row' }}>
              <Typography style={{ marginRight: 4 }}>Bez CV</Typography>
              <Typography color={Colors.Basic600}>
                {dataBookmarks.persons.filter(i => i.withoutResume === true).length}
              </Typography>
            </View>
          }
          isChecked={checkbox2}
          onClick={() => setCheckbox2(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
        <CheckBox
          leftTextView={
            <View style={{ flexDirection: 'row' }}>
              <Typography style={{ marginRight: 4 }}>Ukraina 🇺🇦</Typography>
              <Typography color={Colors.Basic600}>
                {dataBookmarks.persons.filter(i => i.forUkraine === true).length}
              </Typography>
            </View>
          }
          isChecked={checkbox3}
          onClick={() => setCheckbox3(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
      </ScrollView>
      <View >
        <ButtonRipple
          variant="primary"
          onPress={() =>
            navigation.navigate('MainScreen', {
              filters: [
                Distance[selectedDistance],
                selectedExperience,
                selectedWorkload,
                selectedContractType,
                selectedJob,
                checkbox1,
                checkbox2,
                checkbox3,
                selectedPlace,
                parseInt(salaryMin),
                parseInt(salaryMax),
              ],
            })
          }>
          SZUKAJ
        </ButtonRipple>
      </View>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 81,
    height: 44,
    backgroundColor: Colors.Basic300,
    borderRadius: 4,
    textAlign: 'center',
  },
});

export default FilterScreen;
