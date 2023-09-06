import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Divider, ScrollView } from 'native-base';
import Typography from '../../components/atoms/Typography/Typography';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';

import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import HorizontalMenuButton from '../../components/atoms/HorizontalMenuButton/HorizontalMenuButton';
import ButtonArrowSelector from '../../components/atoms/ButtonArrowSelector/ButtonArrowSelector';
import HorizontalSelector from '../../components/molecules/HorizontalSelector/HorizontalSelector';
import CheckBox from '../../components/atoms/CheckBox/CheckBox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SmallMap from '../../components/organisms/SmallMap/SmallMap';
import { nativeStore } from '../../store';
import { advertActionTypes } from '../../store/actions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import { useActions } from '../../hooks/useActions';
import Slider from '../../components/organisms/Slider/Slider';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AdvertStackParamList, 'EditAdvertScreen'>,
  NativeStackScreenProps<RootStackParamList, 'AdvertStack'>
>;

/*
title:"Dostosuj listę kandydatów",
subTitle:"Pomóż ELF-owi znaleźć idealnych kandydatów - ustaw odpowiednie filtry 🤓",
buttons: [
  {
    children: 'Sprawdź',
    onPress: () => navigation.navigate('MainScreen'),
  },
]
*/

const EditAdvertScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const data = useTypedSelector(state => state.adverts);
  const { setSwipeablePanelProps } = useActions();
  const {
    selectedJob,
    jobCategory,
    iconCategory,
    place,
    latitude,
    longitude,
    selectedRequirements,
    selectedDuties,
    selectedLanguages,
    selectedBenefits,
    advertIndex,
  } = route.params;

  const Experience: Array<any> = [
    'Bez doświadczenia',
    'Do roku',
    '2 lata',
    '3 lata',
    '4 lata',
    '5 lata i więcej',
  ];

  const Workload: Array<any> = [
    '1/4 etatu',
    '1/2 etatu',
    '3/4 etatu',
    'Pełny etat',
    'Tymczasowa',
  ];

  const contractTypes: Array<any> = [
    'Nie podawać',
    'Umowa o pracę',
    'B2B',
    'Umowa zlecenie',
    'Umowa o dzieło',
    'Staż',
    'Praktyki',
  ];

  const workStartTime: Array<{}> = [
    'Od zaraz',
    'Za tydzień',
    'Za 2 tygodnie',
    'Za 3 tygodnie',
    'Za miesiąc',
  ];

  const probationTime: Array<{}> = [
    'Dzień',
    'Do trzech dni',
    '1 tydzień',
    '2 tygodnie',
    'Miesiąc',
  ];

  const probationType: Array<{}> = ['Brak', 'Darmowy', 'Płatny'];

  const salaryType: Array<{}> = ['Bez informacji', 'Miesięcznie', 'Na godzinę'];

  const taxType: Array<{}> = ['netto', 'brutto'];

  useEffect(() => {
    (pushedJob === null || selectedJob) &&
      (setPushedJob(selectedJob),
        setPushedJobCategory(jobCategory),
        setPushedIconCategory(iconCategory));
  });

  useEffect(() => {
    selectedRequirements.length > 0 &&
      setRequirementsState(selectedRequirements);
  });

  useEffect(() => {
    selectedDuties.length > 0 && setDutiesState(selectedDuties);
  });

  useEffect(() => {
    selectedLanguages.length > 0 && setLanguagesState(selectedLanguages);
  });

  useEffect(() => {
    selectedBenefits.length > 0 && setBenefitsState(selectedBenefits);
  });

  useEffect(() => {
    advertIndex && setSelectedIndex(advertIndex);
  });

  useEffect(() => {
    place && setSelectedLocation(place);
    latitude && setSelectedLatitude(latitude);
    longitude && setSelectedLongitude(longitude);
  });
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedItem = data.adverts[advertIndex ? advertIndex : selectedIndex];
  const [pushedJob, setPushedJob] = useState(selectedItem.job);
  const [pushedJobCategory, setPushedJobCategory] = useState(
    selectedItem.jobCategory,
  );
  const [pushedIconCategory, setPushedIconCategory] = useState(
    selectedItem.iconCategory,
  );
  const [selectedExperience, setSelectedExperience] = useState<any>(
    Experience.indexOf(selectedItem.experience),
  );
  const [selectedWorkload, setSelectedWorkload] = useState<any>(
    Workload.indexOf(selectedItem.workload),
  );
  const [selectedWorkStartTime, setSelectedWorkStartTime] = useState<any>(
    workStartTime.indexOf(selectedItem.workstart),
  );
  const [selectedProbationTime, setSelectedProbationTime] = useState<any>(
    probationTime.indexOf(selectedItem.probation),
  );
  const [selectedProbationType, setSelectedProbationType] = useState<any>(
    probationType.indexOf(selectedItem.probationType),
  );
  const [selectedContractType, setSelectedContractType] = useState<any>(
    contractTypes.indexOf(selectedItem.contract),
  );
  const [selectedTaxType, setSelectedTaxType] = useState<any>(
    taxType.indexOf(selectedItem.tax),
  );
  const [withoutResume, setWithoutResume] = useState(
    selectedItem.withoutResume,
  );
  const [forUkraine, setForUkraine] = useState(selectedItem.forUkraine);
  const [Salary, setSalary] = useState([
    selectedItem.salary[0],
    selectedItem.salary[1],
  ]);
  const [selectedSalaryType, setSelectedSalaryType] = useState(
    salaryType.indexOf(selectedItem.salaryType),
  );
  const [workingHours, setWorkingHours] = useState([
    selectedItem.workingHours[0],
    selectedItem.workingHours[1],
  ]);
  const [requirementsState, setRequirementsState] = useState(
    selectedItem.requirements,
  );
  const [dutiesState, setDutiesState] = useState(selectedItem.duties);
  const [languagesState, setLanguagesState] = useState(selectedItem.languages);
  const [benefitsState, setBenefitsState] = useState(selectedItem.benefits);
  const [selectedLocation, setSelectedLocation] = useState(
    selectedItem.location,
  );
  const [selectedLatitude, setSelectedLatitude] = useState(
    selectedItem.latitude,
  );
  const [selectedLongitude, setSelectedLongitude] = useState(
    selectedItem.longitude,
  );
  const expireDate = new Date(new Date().setDate(new Date().getDate() + 30));
  const expireDateFormated =
    (expireDate.getDate() < 10 ? '0' : '') +
    expireDate.getDate() +
    '-' +
    ((expireDate.getMonth() < 10 ? '0' : '') + (expireDate.getMonth() + 1)) +
    '-' +
    expireDate.getFullYear();

  return (
    <ScreenHeaderProvider currentStack="AdvertStack" mainTitlePosition="flex-start">
      <ScrollView
        scrollEnabled={scrollEnabled}
        style={{
          backgroundColor: Colors.Basic100,
        }}>
        <View style={{ marginLeft: 16, marginTop: 32 }}>
          <Typography
            weight="Bold"
            style={{ fontSize: 20, marginBottom: 16 }}>
            Opis stanowiska
          </Typography>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('JobCategoryScreen', {
              path: 'EditScreen',
            })
          }>
          <ButtonArrowSelector
            text={
              pushedJob === null ? (
                'Wybierz stanowisko'
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <SvgIcon
                    icon={pushedIconCategory}
                    style={{ alignSelf: 'center', marginRight: 20 }}
                  />
                  <View>
                    <Typography variant="h4">{pushedJob}</Typography>
                    <Typography color={Colors.Basic600}>
                      {pushedJobCategory}
                    </Typography>
                  </View>
                </View>
              )
            }
            jobTemplate={pushedJob && true}
          />
        </TouchableOpacity>

        <HorizontalSelector
          title={'Doświadczenie'}
          buttons={Experience.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                selectedExperience !== index
                  ? setSelectedExperience(index)
                  : setSelectedExperience(null)
              }>
              <HorizontalMenuButton
                selected={selectedExperience === index ? true : false}
                name={item}
              />
            </TouchableOpacity>
          ))}
        />

        <HorizontalSelector
          title={'Tryb pracy'}
          buttons={Workload.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                selectedWorkload !== index
                  ? setSelectedWorkload(index)
                  : setSelectedWorkload(null)
              }>
              <HorizontalMenuButton
                selected={selectedWorkload === index ? true : false}
                name={item}
              />
            </TouchableOpacity>
          ))}
          borderBottom={true}
        />

        <HorizontalSelector
          title={'Termin rozpoczęcia pracy'}
          buttons={workStartTime.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                selectedWorkStartTime !== index
                  ? setSelectedWorkStartTime(index)
                  : setSelectedWorkStartTime(null)
              }>
              <HorizontalMenuButton
                selected={selectedWorkStartTime === index ? true : false}
                name={item}
              />
            </TouchableOpacity>
          ))}
        />

        <HorizontalSelector
          title={'Okres próbny'}
          buttons={probationType.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                selectedProbationType !== index
                  ? setSelectedProbationType(index)
                  : setSelectedProbationType(null)
              }>
              <HorizontalMenuButton
                variant="underline"
                selected={selectedProbationType === index ? true : false}
                name={item}
              />
            </TouchableOpacity>
          ))}
          content={
            selectedProbationType !== 0 &&
            probationTime.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  selectedProbationTime !== index
                    ? setSelectedProbationTime(index)
                    : setSelectedProbationTime(null)
                }>
                <HorizontalMenuButton
                  selected={selectedProbationTime === index ? true : false}
                  name={item}
                />
              </TouchableOpacity>
            ))
          }
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <HorizontalSelector
            title={'Stawka'}
            buttons={salaryType.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  selectedSalaryType !== index
                    ? setSelectedSalaryType(index)
                    : setSelectedSalaryType(null)
                }>
                <HorizontalMenuButton
                  variant="underline"
                  selected={selectedSalaryType === index ? true : false}
                  name={item}
                />
              </TouchableOpacity>
            ))}
            content={
              selectedSalaryType !== 0 &&
              taxType.map((item, index) => (
                <TouchableOpacity
                  onPress={() =>
                    selectedTaxType !== index
                      ? setSelectedTaxType(index)
                      : setSelectedTaxType(null)
                  }>
                  <HorizontalMenuButton
                    selected={selectedTaxType === index ? true : false}
                    name={item}
                  />
                </TouchableOpacity>
              ))
            }
          />
        </View>

        {selectedSalaryType !== 0 && (
          <View
            style={{
              margin: 20,
              marginTop: 50,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <MultiSlider
              onValuesChangeStart={disableScroll}
              onValuesChangeFinish={enableScroll}
              onValuesChange={item => setSalary(item)}
              enabledTwo={true}
              min={selectedSalaryType === 1 ? 2000 : 10}
              max={selectedSalaryType === 1 ? 10000 : 200}
              step={selectedSalaryType === 1 ? 500 : 5}
              values={[Salary[0], Salary[1]]}
              enableLabel={true}
              trackStyle={{ backgroundColor: Colors.Basic400, height: 5 }}
              markerStyle={{
                backgroundColor: Colors.Basic900,
                width: 20,
                height: 20,
                top: 2,
              }}
              selectedStyle={{ backgroundColor: Colors.Basic900, height: 5 }}
              sliderLength={280}
              customLabel={sliderPosition => (
                <>
                  <View
                    style={[
                      styles.Label,
                      {
                        left: sliderPosition.oneMarkerLeftPosition - 60,
                      },
                    ]}>
                    <Typography>
                      {sliderPosition.oneMarkerValue + ' zł'}
                    </Typography>
                  </View>
                  <View
                    style={[
                      styles.Label,
                      {
                        left: sliderPosition.twoMarkerLeftPosition + 0,
                      },
                    ]}>
                    <Typography>
                      {sliderPosition.twoMarkerValue + ' zł'}
                    </Typography>
                  </View>
                </>
              )}
            />
          </View>
        )}

        <HorizontalSelector
          title={'Rodzaj umowy'}
          buttons={contractTypes.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                selectedContractType !== index
                  ? setSelectedContractType(index)
                  : setSelectedContractType(null)
              }>
              <HorizontalMenuButton
                selected={selectedContractType === index ? true : false}
                name={item}
              />
            </TouchableOpacity>
          ))}
        />

        <View style={{ marginLeft: 16, marginTop: 4 }}>
          <Typography
            weight="Bold"
            style={{ fontSize: 20, marginBottom: 16 }}>
            Dodatkowo
          </Typography>
        </View>

        <ButtonArrowSelector
          onPress={() =>
            navigation.navigate('OptionsDrawerScreen', {
              selectedDuties: dutiesState,
              category: 'duties',
              path: 'EditScreen',
            })
          }
          marginBottom={false}
          text={'Zakres obowiązków'}
          infos={
            dutiesState &&
            data.options[0].duties
              .filter((item, index) => dutiesState.includes(index))
              .map(item => (
                <Typography
                  color={Colors.Basic600}
                  variant="small"
                  style={{ marginBottom: 24, marginLeft: 19 }}>
                  {item}
                </Typography>
              ))
          }
        />

        <View style={{ marginLeft: 16, marginTop: 16 }}>
          <Typography
            weight="Bold"
            style={{ fontSize: 20, marginBottom: 16 }}>
            Godziny pracy
          </Typography>
        </View>

        <View
          style={{
            margin: 20,
            marginTop: 50,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
        </View>

        <ButtonArrowSelector
          onPress={() =>
            navigation.navigate('OptionsDrawerScreen', {
              selectedLanguages: languagesState,
              category: 'languages',
              path: 'EditScreen',
            })
          }
          marginBottom={false}
          text={
            <>
              <Typography>Znajomość języków</Typography>
            </>
          }
          infos={
            languagesState &&
            data.options[0].languages
              .filter((item, index) => languagesState.includes(index))
              .map(item => (
                <Typography
                  color={Colors.Basic600}
                  variant="small"
                  style={{ marginBottom: 24, marginLeft: 19 }}>
                  {item}
                </Typography>
              ))
          }
        />


        <ButtonArrowSelector
          onPress={() =>
            navigation.navigate('OptionsDrawerScreen', {
              selectedRequirements: requirementsState,
              category: 'requirements',
              path: 'EditScreen',
            })
          }
          borderTop={false}
          marginBottom={false}
          text={'Wymagania'}
          infos={
            requirementsState &&
            data.options[0].requirements
              .filter((item, index) => requirementsState.includes(index))
              .map(item => (
                <Typography
                  color={Colors.Basic600}
                  variant="small"
                  style={{ marginBottom: 24, marginLeft: 19 }}>
                  {item}
                </Typography>
              ))
          }
        />


        <ButtonArrowSelector
          onPress={() =>
            navigation.navigate('OptionsDrawerScreen', {
              selectedBenefits: benefitsState,
              category: 'benefits',
              path: 'EditScreen',
            })
          }
          borderTop={false}
          marginBottom={false}
          text={'Benefity'}
          infos={
            benefitsState &&
            data.options[0].benefits
              .filter((item, index) => benefitsState.includes(index))
              .map(item => (
                <Typography
                  color={Colors.Basic600}
                  variant="small"
                  style={{ marginBottom: 24, marginLeft: 19 }}>
                  {item}
                </Typography>
              ))
          }
        />
        <CheckBox
          leftText='Bez CV'
          isChecked={withoutResume}
          onClick={() => setWithoutResume(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
        <CheckBox
          leftText='Praca dla Ukrainy 🇺🇦'
          isChecked={forUkraine}
          onClick={() => setForUkraine(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />

        <SmallMap
          place={selectedLocation}
          onPress={() =>
            navigation.navigate('MapScreen', {
              path: 'EditScreen',
            })
          }
          latitude={selectedLatitude}
          longitude={selectedLongitude}
        />

        <View style={{ marginVertical: 40 }}>
          <ButtonRipple
            variant="primary"
            onPress={() => (
              nativeStore.dispatch({
                type: advertActionTypes.EDIT_ADVERT,
                payload: {
                  pushedIndex: selectedIndex,
                  job: pushedJob,
                  jobCategory: pushedJobCategory,
                  iconCategory: pushedIconCategory,
                  salary: [Salary[0], Salary[1]],
                  salaryType: salaryType[selectedSalaryType],
                  tax: taxType[selectedTaxType],
                  location: selectedLocation,
                  latitude: selectedLatitude,
                  longitude: selectedLongitude,
                  experience: Experience[selectedExperience],
                  contract: contractTypes[selectedContractType],
                  workload: Workload[selectedWorkload],
                  workstart: workStartTime[selectedWorkStartTime],
                  probation: probationTime[selectedProbationTime],
                  probationType: probationType[selectedProbationType],
                  workingHours: workingHours,
                  withoutResume: withoutResume,
                  forUkraine: forUkraine,
                  expireDate: expireDateFormated,
                  requirements: requirementsState,
                  duties: dutiesState,
                  languages: languagesState,
                  benefits: benefitsState,
                },
              }),
              navigation.navigate('MainScreen')
            )}>
            POTWIERDŹ ZMIANY
          </ButtonRipple>
        </View>
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Button: {
    height: 50,
    width: 'auto',
    justifyContent: 'flex-start',
  },
  Textfield: {
    marginVertical: 16,
  },
  wideButton: {
    width: '48.5%',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.Basic300,
    height: 44,
    borderRadius: 4,
  },
  Label: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: Colors.Basic300,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
});

export default EditAdvertScreen;
