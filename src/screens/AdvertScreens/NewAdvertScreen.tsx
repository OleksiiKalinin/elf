import { CommonActions, CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import SmallMap from '../../components/organisms/SmallMap/SmallMap';
import { nativeStore } from '../../store';
import { advertActionTypes } from '../../store/actions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import Slider from '../../components/organisms/Slider/Slider';
import { TextInput } from 'react-native-paper';
import { AddressType, UserAdvertType } from '../../store/reducers/types';
import TextField from '../../components/molecules/TextField/TextField';
import { useDispatch } from 'react-redux';
import advertsServices from '../../services/advertsServices';


var width = Dimensions.get('window').width;


type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AdvertStackParamList, 'NewAdvertScreen'>,
  NativeStackScreenProps<RootStackParamList, 'AdvertStack'>
>;

/*
title="Dostosuj listę kandydatów"
subTitle="Pomóż ELF-owi znaleźć idealnych kandydatów - ustaw odpowiednie filtry 🤓"
buttons={[
  {
    children: 'Sprawdź',
    onPress: () => navigation.navigate('MainScreen'),
  },
]
*/

// export type AdvertDataType = {
//   location: AddressType | null,
//   salary_amount_up: string | null,
//   salary_amount_low: string | null,
//   job_experience_id: number | null,
//   job_position_id: number | null,
//   salary_tax_type_id: number | null,
//   salary_time_type_id: number | null,
// }

const NewAdvertScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { jobIndustries, userCompany, jobSalaryModes, jobSalaryTaxes, jobExperiences, token, userAdverts } = useTypedSelector(state => state.general);
  const currentPositions = jobIndustries.find(({ id }) => id === userCompany?.job_industry)?.job_positions || [];
  const [advertData, setAdvertData] = useState<UserAdvertType>({
    job_experience_id: 2,
    job_position_id: null,
    location: null,
    salary_amount_low: null,
    salary_amount_up: null,
    salary_tax_type_id: 2,
    salary_time_type_id: 2,
    benefits_ids: [],
    requirements_ids: [],
    duties_ids: [],
    candidate_data: [],
    company_id: null,
    description: null,
    expiration_time: null,
    job_mode_id: null,
    job_start_id: null,
    known_language_id: null,
    trial_time_id: null,
    trial_type_id: null,
    working_hour_down: null,
    type_of_contract_id: null,
    working_hour_up: null,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const changeAdvertDataHandler = (name: keyof UserAdvertType, value: string | number | AddressType | null, replaceSpaces: boolean = true) => {
    setAdvertData(prev => ({
      ...prev,
      [name]: value ?
        (typeof value === 'string') && replaceSpaces ?
          value.replace(/\s/g, '')
          :
          value
        :
        null
    }));
  };

  const createAdvertHandler = async () => {
    if (userCompany?.id && advertData.job_position_id && advertData.location) {
      setLoading(true);
      const isOk = await dispatch(advertsServices.createUserAdvert(advertData, token, userCompany?.id, userAdverts));
      setLoading(false);
      if (!!isOk) navigation.navigate('MainScreen');
      else Alert.alert('Błąd', 'Wykorzystałeś 5 darmowych ogłoszeń, kup pakiet!');
    } else Alert.alert('Błąd', 'Podaj wszystkie dane!');
  }

  return (
    <ScreenHeaderProvider currentStack="AdvertStack">
      <ScrollView style={{ backgroundColor: Colors.Basic100, flex: 1 }}>
        <View style={{ marginLeft: 16, marginTop: 32, marginBottom: 16 }}>
          <Typography weight="Bold" size={20}>Opis stanowiska</Typography>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('JobScreen', { callback: (id) => changeAdvertDataHandler('job_position_id', id), job_positions: currentPositions })}
          style={{
            flexDirection: 'row', padding: 19,
            ...(!!Number(advertData.job_position_id) ?
              { backgroundColor: Colors.White } :
              { borderColor: Colors.Basic300, borderTopWidth: 1, borderBottomWidth: 1 }
            )
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Typography variant='h5' weight='SemiBold'>{currentPositions.find(curr => curr.id === advertData.job_position_id)?.name || 'Wybierz stanowisko'}</Typography>
          </View>
          <View style={{ justifyContent: 'center' }}>
            {/* <SvgIcon icon={!!Number(companyData.job_industry) ? 'crossBig' : 'arrowRightSmall'} fill={Colors.Basic500} /> */}
            <SvgIcon icon={'arrowRightSmall'} fill={Colors.Basic500} />
          </View>
        </TouchableOpacity>
        <Typography variant='h5' weight='SemiBold' style={{ paddingHorizontal: 16, marginVertical: 16 }}>Doświadczenie*</Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16 }}>
          {jobExperiences.map(({ id, name }) => (
            <View style={{ marginRight: 16 }}>
              <ButtonRipple
                color={advertData.job_experience_id === id ? Colors.Basic500 : Colors.Basic300}
                contentVariant='h5'
                contentWeight='SemiBold'
                contentColor={Colors.Basic900}
                style={{ paddingVertical: 6, paddingHorizontal: 8 }}
                onPress={() => changeAdvertDataHandler('job_experience_id', id)}
                borderRadius={4}
              >
                {name}
              </ButtonRipple>
            </View>
          ))}
        </ScrollView>

        {/* <HorizontalSelector
          title={'Tryb pracy'}
          buttons={Workload.map((item, index) => (
            <HorizontalMenuButton
              selected={selectedWorkload === index ? true : false}
              name={item}
              onPress={() =>
                selectedWorkload !== index
                  ? setSelectedWorkload(index)
                  : setSelectedWorkload(null)
              }
            />
          ))}
        />
        <CheckBox
          leftText='Praca zmianowa'
          isChecked={shiftJob}
          onClick={() => setShiftJob(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
        <CheckBox
          leftText='Praca w weekendy'
          isChecked={weekendJob}
          onClick={() => setWeekendJob(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
        <CheckBox
          leftText='Elastyczny czas pracy'
          isChecked={flexibleTime}
          onClick={() => setFlexibleTime(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
        <CheckBox
          leftText='Możliwość pracy zdalnej'
          isChecked={withoutResume}
          onClick={() => setWithoutResume(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
        <View>
          <View style={{ margin: 16 }}>
            <Typography weight="Bold" size={20}>Godziny pracy</Typography>
          </View>
          <View
            style={{
              margin: 20,
              marginTop: 50,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Typography>do poprawy</Typography>
          </View>
        </View>

        <HorizontalSelector
          title={'Termin rozpoczęcia pracy'}
          star={false}
          buttons={workStartTime.map((item, index) => (
            <HorizontalMenuButton
              selected={selectedWorkStartTime === index ? true : false}
              name={item}
              onPress={() =>
                selectedWorkStartTime !== index
                  ? setSelectedWorkStartTime(index)
                  : setSelectedWorkStartTime(null)
              }
            />
          ))}
        />
        <Divider /> */}
        <Typography variant='h5' weight='SemiBold' style={{ paddingHorizontal: 16, marginVertical: 16 }}>Stawka</Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16 }}>
          {jobSalaryModes.map(({ id, name }) => (
            <View style={{ marginRight: 20 }}>
              <ButtonRipple
                color='transparent'
                contentVariant='h5'
                contentWeight={advertData.salary_time_type_id === id ? 'Bold' : 'SemiBold'}
                contentColor={advertData.salary_time_type_id === id ? Colors.Basic900 : Colors.Basic700}
                style={{ paddingVertical: 2 }}
                containerStyles={advertData.salary_time_type_id === id ? { borderBottomColor: Colors.Basic900, borderBottomWidth: 2 } : {}}
                onPress={() => changeAdvertDataHandler('salary_time_type_id', id)}
              >
                {name}
              </ButtonRipple>
            </View>
          ))}
        </ScrollView>
        {advertData.salary_time_type_id !== 1 && <>
          <View style={{ paddingLeft: 16, marginVertical: 16, flexDirection: 'row' }}>
            {jobSalaryTaxes.map(({ id, name }, index) => (
              <View style={{ marginRight: 16, flex: 1 }}>
                <ButtonRipple
                  color={advertData.salary_tax_type_id === id ? Colors.Basic500 : Colors.Basic300}
                  contentVariant='h5'
                  contentWeight='SemiBold'
                  contentColor={Colors.Basic900}
                  style={{ paddingVertical: 6 }}
                  onPress={() => changeAdvertDataHandler('salary_tax_type_id', id)}
                  borderRadius={4}
                >
                  {name}
                </ButtonRipple>
              </View>
            ))}
          </View>
          <View style={{ marginHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '35%' }}>
              <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>od</Typography>
              <TextField
                placeholder={advertData.salary_time_type_id === 2 ? '3000' : '20'}
                placeholderTextColor={Colors.Basic600}
                containerStyles={{ maxWidth: 200, backgroundColor: Colors.Basic300, borderRadius: 4, paddingHorizontal: 16 }}
                height={44}
                keyboardType='decimal-pad'
                right={<Typography variant='h5'>zł</Typography>}
                value={advertData.salary_amount_low || ''}
                onChangeText={value => changeAdvertDataHandler('salary_amount_low', value)}
              />
            </View>
            <View style={{ justifyContent: 'center', height: 44, alignSelf: 'flex-end' }}>
              <Typography weight='Bold' variant='h4' color={Colors.Basic500}>{'  -  '}</Typography>
            </View>
            <View style={{ width: '35%' }}>
              <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>do</Typography>
              <TextField
                placeholder={advertData.salary_time_type_id === 2 ? '4000' : '30'}
                placeholderTextColor={Colors.Basic600}
                containerStyles={{ maxWidth: 200, backgroundColor: Colors.Basic300, borderRadius: 4, paddingHorizontal: 16 }}
                height={44}
                keyboardType='decimal-pad'
                right={<Typography variant='h5'>zł</Typography>}
                value={advertData.salary_amount_up || ''}
                onChangeText={value => changeAdvertDataHandler('salary_amount_up', value)}
              />
            </View>
          </View>
        </>}


        {/* <HorizontalSelector
          title={'Rodzaj umowy'}
          buttons={ContractTypes.map((item, index) => (
            <HorizontalMenuButton
              selected={selectedContractType === index ? true : false}
              name={item}
              onPress={() =>
                selectedContractType !== index
                  ? setSelectedContractType(index)
                  : setSelectedContractType(null)
              }
            />
          ))}
        />

        <HorizontalSelector
          title={'Okres próbny'}
          star={false}
          buttons={probationType.map((item, index) => (
            <View>
              <HorizontalMenuButton
                selected={selectedProbationType === index ? true : false}
                name={item}
                style={{ width: width / 3 }}
                variant={'underline'}
                onPress={() =>
                  selectedProbationType !== index
                    ? setSelectedProbationType(index)
                    : setSelectedProbationType(null)
                }
              />
            </View>
          ))}
          content={
            selectedProbationType !== 0 &&
            probationTime.map((item, index) => (
              <HorizontalMenuButton
                selected={selectedProbationTime === index ? true : false}
                name={item}
                onPress={() =>
                  selectedProbationTime !== index
                    ? setSelectedProbationTime(index)
                    : setSelectedProbationTime(null)
                }
              />
            ))
          }
        />
        <Divider />

        <View style={{ marginLeft: 16, marginTop: 4, marginBottom: 16 }}>
          <Typography weight="Bold" size={20}>Dodatkowo</Typography>
        </View>

        <ButtonArrowSelector
          onPress={() =>
            navigation.navigate('OptionsDrawerScreen', {
              selectedDuties: dutiesState,
              category: 'duties',
            })
          }
          marginBottom={false}
          borderBottom={false}

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

        <ButtonArrowSelector
          onPress={() =>
            navigation.navigate('OptionsDrawerScreen', {
              selectedLanguages: languagesState,
              category: 'languages',
            })
          }
          marginBottom={false}
          marginTop={false}
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
              selectedDuties: dutiesState,
              category: 'benefits',
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
          leftText='Osoby z Ukrainy 🇺🇦'
          isChecked={forUkraine}
          onClick={() => setForUkraine(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
        <CheckBox
          leftText='Без знання польської мови 🇺🇦'
          isChecked={noPolish}
          onClick={() => setNoPolish(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
        <CheckBox
          leftText='Bez CV'
          isChecked={withoutResume}
          onClick={() => setWithoutResume(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
        <CheckBox
          leftText='Prawo jazdy'
          isChecked={drivingLicense}
          onClick={() => setDrivingLicense(prev => !prev)}
          style={{ padding: 16 }}
        />
        <Divider />
        <CheckBox
          leftText='Rekrutacja online'
          isChecked={onlineRecruitment}
          onClick={() => setOnlineRecruitment(prev => !prev)}
          style={{ padding: 16 }}
        /> */}
        <View style={{ marginVertical: 32 }}>
          <SmallMap
            place={advertData.location?.formattedAddress}
            latitude={advertData.location?.position?.lat}
            longitude={advertData.location?.position?.lng}
            onPress={() => navigation.navigate('MapScreen', {
              callback: (address) => changeAdvertDataHandler('location', address),
              initialAddress: advertData.location
            })}
          />
        </View>

        {/* <View style={{ marginLeft: 9, marginBottom: 20 }}>
          {!selectedJob && (
            <Typography color={Colors.Danger}>
              * Nie wybrano stanowiska
            </Typography>
          )}
          {!selectedExperience && (
            <Typography color={Colors.Danger}>
              * Nie wybrano doświadczenia
            </Typography>
          )}
          {!selectedWorkload && (
            <Typography color={Colors.Danger}>
              * Nie wybrano trybu pracy
            </Typography>
          )}
          {!selectedContractType && (
            <Typography color={Colors.Danger}>
              * Nie wybrano rodzaju umowy
            </Typography>
          )}
        </View> */}
      </ScrollView>
      <ButtonRipple variant="primary" onPress={createAdvertHandler} disabled={!token || loading} withLoading={!!token}>
        DODAJ OGŁOSZENIE
      </ButtonRipple>
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
  textInput: {
    width: 81,
    height: 44,
    backgroundColor: Colors.Basic300,
    borderRadius: 4,
    textAlign: "center"
  }
});

export default NewAdvertScreen;