import { CommonActions, CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
// import SmallMap from '../../components/organisms/SmallMap/SmallMap';
import { nativeStore } from '../../store';
import { advertActionTypes } from '../../store/actions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { AddressType, UserAdvertType } from '../../store/reducers/types';
import { useDispatch } from 'react-redux';
import advertsServices from '../../services/advertsServices';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../../components/molecules/ScrollView';
import Typography from '../../components/atoms/Typography';
import SvgIcon from '../../components/atoms/SvgIcon';
import Button from '../../components/molecules/Button';
import TextField from '../../components/molecules/TextField';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { createParam } from 'solito';
import { useActions } from '../../hooks/useActions';
import { useSwipeablePanelParams } from '../../hooks/useSwipeablePanelParams';
import { Separator } from 'tamagui';

var width = Dimensions.get('window').width;

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

const { useParam } = createParam<AdvertStackParamList['AdvertEditorScreen']>();

const AdvertEditorScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
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
  const [id] = useParam('id')
  const { subView, subViewMode } = useSwipeablePanelParams();
  const {setSwipeablePanelProps} = useActions();
  
  
  // useEffect(() => {
  //   setSwipeablePanelProps((() => {
  //     if (subView === 'options') return {
    // JobCategoryScreen
    // MapScreen
  //     }
  //     return null;
  //   })());
  // }, [subView, subViewMode]);

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
    // if (userCompany?.id && advertData.job_position_id && advertData.location) {
    //   setLoading(true);
    //   const isOk = await dispatch(advertsServices.createUserAdvert(advertData, token, userCompany?.id, userAdverts));
    //   setLoading(false);
    //   if (!!isOk) navigation.navigate('MainScreen');
    //   else Alert.alert('Błąd', 'Wykorzystałeś 5 darmowych ogłoszeń, kup pakiet!');
    // } else Alert.alert('Błąd', 'Podaj wszystkie dane!');
  }

  return (
    <ScreenHeaderProvider>
      <ScrollView style={{ backgroundColor: Colors.Basic100, flex: 1 }}>
        <View style={{ marginLeft: 16, marginTop: 32, marginBottom: 16 }}>
          <Typography weight="Bold" size={20}>Opis stanowiska</Typography>
        </View>
        <TouchableOpacity
          // onPress={() => navigation.navigate('JobScreen', { callback: (id) => changeAdvertDataHandler('job_position_id', id), job_positions: currentPositions })}
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
              <Button
                color={advertData.job_experience_id === id ? Colors.Basic500 : Colors.Basic300}
                contentVariant='h5'
                contentWeight='SemiBold'
                contentColor={Colors.Basic900}
                style={{ paddingVertical: 6, paddingHorizontal: 8 }}
                onPress={() => changeAdvertDataHandler('job_experience_id', id)}
                borderRadius={4}
              >
                {name}
              </Button>
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
          checked={shiftJob}
          onCheckedChange={(checked) => setShiftJob(checked)}
          style={{ padding: 16 }}
        />
        <Separator />
        <CheckBox
          leftText='Praca w weekendy'
          checked={weekendJob}
          onCheckedChange={(checked) => setWeekendJob(checked)}
          style={{ padding: 16 }}
        />
        <Separator />
        <CheckBox
          leftText='Elastyczny czas pracy'
          checked={flexibleTime}
          onCheckedChange={(checked) => setFlexibleTime(checked)}
          style={{ padding: 16 }}
        />
        <Separator />
        <CheckBox
          leftText='Możliwość pracy zdalnej'
          checked={withoutResume}
          onCheckedChange={(checked) => setWithoutResume(checked)}
          style={{ padding: 16 }}
        />
        <Separator />
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
        <Separator /> */}
        <Typography variant='h5' weight='SemiBold' style={{ paddingHorizontal: 16, marginVertical: 16 }}>Stawka</Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16 }}>
          {jobSalaryModes.map(({ id, name }) => (
            <View style={{ marginRight: 20 }}>
              <Button
                color='transparent'
                contentVariant='h5'
                contentWeight={advertData.salary_time_type_id === id ? 'Bold' : 'SemiBold'}
                contentColor={advertData.salary_time_type_id === id ? Colors.Basic900 : Colors.Basic700}
                style={{ paddingVertical: 2 }}
                // containerStyles={advertData.salary_time_type_id === id ? { borderBottomColor: Colors.Basic900, borderBottomWidth: 2 } : {}}
                onPress={() => changeAdvertDataHandler('salary_time_type_id', id)}
              >
                {name}
              </Button>
            </View>
          ))}
        </ScrollView>
        {advertData.salary_time_type_id !== 1 && <>
          <View style={{ paddingLeft: 16, marginVertical: 16, flexDirection: 'row' }}>
            {jobSalaryTaxes.map(({ id, name }, index) => (
              <View style={{ marginRight: 16, flex: 1 }}>
                <Button
                  color={advertData.salary_tax_type_id === id ? Colors.Basic500 : Colors.Basic300}
                  contentVariant='h5'
                  contentWeight='SemiBold'
                  contentColor={Colors.Basic900}
                  style={{ paddingVertical: 6 }}
                  onPress={() => changeAdvertDataHandler('salary_tax_type_id', id)}
                  borderRadius={4}
                >
                  {name}
                </Button>
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
        <Separator />

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
          checked={forUkraine}
          onCheckedChange={(checked) => setForUkraine(checked)}
          style={{ padding: 16 }}
        />
        <Separator />
        <CheckBox
          leftText='Без знання польської мови 🇺🇦'
          checked={noPolish}
          onCheckedChange={(checked) => setNoPolish(checked)}
          style={{ padding: 16 }}
        />
        <Separator />
        <CheckBox
          leftText='Bez CV'
          checked={withoutResume}
          onCheckedChange={(checked) => setWithoutResume(checked)}
          style={{ padding: 16 }}
        />
        <Separator />
        <CheckBox
          leftText='Prawo jazdy'
          checked={drivingLicense}
          onCheckedChange={(checked) => setDrivingLicense(checked)}
          style={{ padding: 16 }}
        />
        <Separator />
        <CheckBox
          leftText='Rekrutacja online'
          checked={onlineRecruitment}
          onCheckedChange={(checked) => setOnlineRecruitment(checked)}
          style={{ padding: 16 }}
        /> */}



        <View style={{ marginVertical: 32 }}>
          {/* <SmallMap
            place={advertData.location?.formattedAddress}
            latitude={advertData.location?.position?.lat}
            longitude={advertData.location?.position?.lng}
            onPress={() => navigation.navigate('MapScreen', {
              callback: (address) => changeAdvertDataHandler('location', address),
              initialAddress: advertData.location
            })}
          /> */}
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
      <Button variant="primary" onPress={createAdvertHandler} disabled={!token || loading} withLoading={!!token}>
        DODAJ OGŁOSZENIE
      </Button>
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

export default AdvertEditorScreen;