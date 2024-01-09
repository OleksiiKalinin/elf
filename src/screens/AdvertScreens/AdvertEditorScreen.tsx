import { CommonActions, CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../colors/Colors';
// import SmallMap from '../../components/organisms/SmallMap/SmallMap';
import { nativeStore } from '../../store';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { AddressType, NewUserAdvertType, UserAdvertType } from '../../store/reducers/types';
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
import { Separator } from 'tamagui';
import { InitialPropsFromParams, PartialBy } from '../../hooks/types';
import useRouter from '../../hooks/useRouter';
import MapPreview from '../../components/molecules/MapPreview';
import getJobPositionsFrom from '../../hooks/getJobPositionsFrom';
import Accordion from '../../components/molecules/Accordion';
import { isNumber } from 'lodash';
import CheckBox from '../../components/atoms/CheckBox';

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

type Props = NonNullable<AdvertStackParamList['default']['AdvertEditorScreen']>;
const { useParam } = createParam<Props>();

const AdvertEditorScreen: React.FC<InitialPropsFromParams<Props>> = ({ idInitial }) => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { jobIndustries, userCompany, jobSalaryModes, jobSalaryTaxes, jobStartFrom, jobTrials, jobModes, jobContractTypes, jobTrialTimes, jobExperiences, token, userAdverts } = useTypedSelector(state => state.general);
  const currentPositions = userCompany?.job_industry ? getJobPositionsFrom(jobIndustries, userCompany.job_industry) : [];
  const [advertData, setAdvertData] = useState<NewUserAdvertType>({
    job_experience_id: null,
    job_position_id: null,
    location: null,
    salary_amount_low: null,
    salary_amount_up: null,
    salary_tax_type_id: 2,
    salary_time_type_id: null,
    benefits_ids: [],
    requirements_ids: [],
    duties_ids: [],
    description: null,
    job_mode_id: null,
    job_start_id: null,
    known_language_id: null,
    trial_time_id: null,
    trial_type_id: null,
    type_of_contract_id: null,
    working_hour_up: null,
    working_hour_down: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [woCV, setwoCV] = useState<boolean>(false);
  // ssr fix
  const [advertExists, setAdvertExists] = useState<boolean>(false);
  const [id] = useParam('id', { initial: idInitial })
  // const [isMainMenuSender] = useParam('isMainMenuSender');
  // const { setSwipeablePanelProps } = useActions();

  useEffect(() => {
    console.log(advertData);
  }, [advertData]);

  useEffect(() => {
    if (id) {
      const advert = userAdverts.find(e => e.id.toString() === id);
      if (advert) {
        const { candidate_data, ...data } = advert;
        setAdvertExists(true);
        setAdvertData(data);
      }
    }
  }, [id, userAdverts]);

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
      const isOk = await dispatch(advertsServices[advertExists ? 'updateUserAdvert' : 'createUserAdvert'](advertData));
      console.log(!!isOk);

      setLoading(false);
      if (!!isOk) router.replace({ stack: 'AdvertStack' });
      else Alert.alert('Błąd', 'Wykorzystałeś 5 darmowych ogłoszeń, kup pakiet!');
    } else Alert.alert('Błąd', 'Podaj wszystkie dane!');
  }

  return (
    <ScreenHeaderProvider
      title={advertExists ? 'Edytuj ogłoszenie' : 'Nowe ogłoszenie'}
      backgroundContent={Colors.Basic100}
    >
      <ScrollView>
        <View style={{ marginLeft: 19, marginTop: 32, marginBottom: 16 }}>
          <Typography weight="Bold" size={20}>Podstawowe</Typography>
        </View>
        {!isNumber(advertData.job_position_id) && <Separator />}
        <TouchableOpacity
          onPress={() => userCompany?.job_industry && router.push({
            stack: 'AdvertStack',
            screen: 'AdvertEditorScreen',
            params: { subView: 'JobCategoryScreen', mode: 'singlePosition', initialIndustry: userCompany.job_industry, callback: (_, id) => changeAdvertDataHandler('job_position_id', id) }
          })}
          style={{
            flexDirection: 'row', padding: 19,
            ...(isNumber(advertData.job_position_id) ? { backgroundColor: Colors.White } : {})
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Typography variant='h4' weight='SemiBold'>{currentPositions.find(curr => curr.id === advertData.job_position_id)?.name || 'Wybierz stanowisko*'}</Typography>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <SvgIcon icon={'arrowRightSmall'} fill={Colors.Basic500} />
          </View>
        </TouchableOpacity>
        {!isNumber(advertData.job_position_id) && <Separator />}
        <View style={{ marginBottom: 24 }}>
          <MapPreview
            hideMap
            rightIcon='arrowRightSmall'
            place={advertData.location?.formattedAddress}
            latitude={advertData.location?.position?.lat}
            longitude={advertData.location?.position?.lng}
            onPress={() => router.push({
              stack: 'AdvertStack', screen: 'AdvertEditorScreen', params: {
                subView: 'GoogleMapScreen',
                callback: (address) => changeAdvertDataHandler('location', address),
                initialAddress: advertData.location,
                optionsType: 'address'
              }
            })}
          />
          <Separator />
        </View>
        <Separator />
        <Accordion
          title={<View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Typography>Doświadczenie*</Typography>
            {isNumber(advertData.job_experience_id) && <View style={{ marginLeft: 10 }}>
              <SvgIcon icon='doneCircleGreen' />
            </View>}
          </View>}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 19, marginBottom: 24 }}>
            {jobExperiences.map(({ id, name }) => (
              <View style={{ marginRight: 19 }}>
                <Button
                  size='medium'
                  variant={advertData.job_experience_id === id ? 'secondarySelected' : 'secondary'}
                  contentWeight={advertData.job_experience_id === id ? 'Bold' : 'SemiBold'}
                  contentVariant='h5'
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
        </Accordion>
        <Separator />
        <Accordion
          title={<View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Typography>Tryb pracy*</Typography>
            {isNumber(advertData.job_mode_id) && <View style={{ marginLeft: 10 }}>
              <SvgIcon icon='doneCircleGreen' />
            </View>}
          </View>}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 19, marginBottom: 24 }}>
            {jobModes.map(({ id, name }) => (
              <View style={{ marginRight: 16 }}>
                <Button
                  size='medium'
                  variant={advertData.job_mode_id === id ? 'secondarySelected' : 'secondary'}
                  contentWeight={advertData.job_mode_id === id ? 'Bold' : 'SemiBold'}
                  contentVariant='h5'
                  contentColor={Colors.Basic900}
                  style={{ paddingVertical: 6, paddingHorizontal: 8 }}
                  onPress={() => changeAdvertDataHandler('job_mode_id', id)}
                  borderRadius={4}
                >
                  {name}
                </Button>
              </View>
            ))}
          </ScrollView>
        </Accordion>
        <Separator />
        <Accordion
          title={<View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Typography>Termin rozpoczęcia pracy*</Typography>
            {isNumber(advertData.job_start_id) && <View style={{ marginLeft: 10 }}>
              <SvgIcon icon='doneCircleGreen' />
            </View>}
          </View>}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 19, marginBottom: 24 }}>
            {jobStartFrom.map(({ id, name }) => (
              <View style={{ marginRight: 16 }}>
                <Button
                  size='medium'
                  variant={advertData.job_start_id === id ? 'secondarySelected' : 'secondary'}
                  contentWeight={advertData.job_start_id === id ? 'Bold' : 'SemiBold'}
                  contentVariant='h5'
                  contentColor={Colors.Basic900}
                  style={{ paddingVertical: 6, paddingHorizontal: 8 }}
                  onPress={() => changeAdvertDataHandler('job_start_id', id)}
                  borderRadius={4}
                >
                  {name}
                </Button>
              </View>
            ))}
          </ScrollView>
        </Accordion>
        <Separator />
        <Accordion
          title={<View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Typography>Stawka*</Typography>
            {/* {isNumber(advertData.job_start_id) && <View style={{ marginLeft: 10 }}>
              <SvgIcon icon='doneCircleGreen' />
            </View>} */}
          </View>}
        >
          <View style={{ marginBottom: 24 }}>
            <ScrollView horizontal contentContainerStyle={{ paddingLeft: 19 }}>
              {jobSalaryModes.map(({ id, name }) => (
                <View style={{ marginRight: 20 }}>
                  <Button
                    borderRadius={2.5}
                    size='small'
                    paddingHorizontal={0}
                    contentVariant='h5'
                    contentColor={Colors.Basic900}
                    contentWeight={advertData.salary_time_type_id === id ? 'Bold' : 'SemiBold'}
                    variant='text'
                    borderBottomWidth={4}
                    borderBottomColor={advertData.salary_time_type_id === id ? Colors.Basic900 : 'transparent'}
                    onPress={() => changeAdvertDataHandler('salary_time_type_id', id)}
                  >
                    {name}
                  </Button>
                </View>
              ))}
            </ScrollView>
            {(advertData.salary_time_type_id === 2 || advertData.salary_time_type_id === 3) && <>
              <View style={{ paddingLeft: 19, marginVertical: 16, flexDirection: 'row' }}>
                {jobSalaryTaxes.map(({ id, name }, index) => (
                  <View style={{ marginRight: 16, flex: 1, maxWidth: 150 }}>
                    <Button
                      size='medium'
                      variant={advertData.salary_tax_type_id === id ? 'secondarySelected' : 'secondary'}
                      contentWeight={advertData.salary_tax_type_id === id ? 'Bold' : 'SemiBold'}
                      contentVariant='h5'
                      contentColor={Colors.Basic900}
                      borderRadius={4}
                      onPress={() => changeAdvertDataHandler('salary_tax_type_id', id)}
                    >
                      {name}
                    </Button>
                  </View>
                ))}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 19, maxWidth: 320 }}>
                <View style={{ flex: 1 }}>
                  <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>od</Typography>
                  <TextField
                    placeholder={advertData.salary_time_type_id === 2 ? '3000' : '20'}
                    placeholderTextColor={Colors.Basic600}
                    containerStyles={{ backgroundColor: Colors.Basic300, borderRadius: 4, paddingHorizontal: 16 }}
                    height={44}
                    keyboardType='decimal-pad'
                    right={<Typography variant='h5'>zł</Typography>}
                    value={advertData.salary_amount_low || ''}
                    onChangeText={value => changeAdvertDataHandler('salary_amount_low', value)}
                  />
                </View>
                <View style={{ justifyContent: 'center', height: 44, alignSelf: 'flex-end' }}>
                  <Typography weight='Bold' variant='h4' color={Colors.Basic500}>{'   -   '}</Typography>
                </View>
                <View style={{ flex: 1 }}>
                  <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>do</Typography>
                  <TextField
                    placeholder={advertData.salary_time_type_id === 2 ? '4000' : '30'}
                    placeholderTextColor={Colors.Basic600}
                    containerStyles={{ backgroundColor: Colors.Basic300, borderRadius: 4, paddingHorizontal: 16 }}
                    height={44}
                    keyboardType='decimal-pad'
                    right={<Typography variant='h5'>zł</Typography>}
                    value={advertData.salary_amount_up || ''}
                    onChangeText={value => changeAdvertDataHandler('salary_amount_up', value)}
                  />
                </View>
              </View>
            </>}
          </View>
        </Accordion>
        <Separator />

        <View style={{ marginLeft: 19, marginTop: 32, marginBottom: 16 }}>
          <Typography weight="Bold" size={20}>Dodatkowe</Typography>
        </View>

        <Separator />
        <Accordion
          title={<View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Typography>Okres próbny</Typography>
            {isNumber(advertData.trial_type_id) && <View style={{ marginLeft: 10 }}>
              <SvgIcon icon='doneCircleGreen' />
            </View>}
          </View>}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 19, marginBottom: 24 }}>
            {jobTrials.map(({ id, name }) => (
              <View style={{ marginRight: 20 }}>
                <Button
                  borderRadius={2.5}
                  size='small'
                  paddingHorizontal={0}
                  contentVariant='h5'
                  contentColor={Colors.Basic900}
                  contentWeight={advertData.trial_type_id === id ? 'Bold' : 'SemiBold'}
                  variant='text'
                  borderBottomWidth={4}
                  borderBottomColor={advertData.trial_type_id === id ? Colors.Basic900 : 'transparent'}
                  onPress={() => changeAdvertDataHandler('trial_type_id', id)}
                >
                  {name}
                </Button>
              </View>
            ))}
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 19, marginBottom: 24 }}>
            {jobTrialTimes.map(({ id, name }) => (
              <View style={{ marginRight: 16 }}>
                <Button
                  size='medium'
                  variant={advertData.trial_time_id === id ? 'secondarySelected' : 'secondary'}
                  contentWeight={advertData.trial_time_id === id ? 'Bold' : 'SemiBold'}
                  contentVariant='h5'
                  contentColor={Colors.Basic900}
                  style={{ paddingVertical: 6, paddingHorizontal: 8 }}
                  onPress={() => changeAdvertDataHandler('trial_time_id', id)}
                  borderRadius={4}
                >
                  {name}
                </Button>
              </View>
            ))}
          </ScrollView>
        </Accordion>
        <Separator />
        <Accordion
          title={<View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Typography>Rodzaj umowy</Typography>
            {isNumber(advertData.type_of_contract_id) && <View style={{ marginLeft: 10 }}>
              <SvgIcon icon='doneCircleGreen' />
            </View>}
          </View>}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 19, marginBottom: 24 }}>
            {jobContractTypes.map(({ id, name }) => (
              <View style={{ marginRight: 16 }}>
                <Button
                  size='medium'
                  variant={advertData.type_of_contract_id === id ? 'secondarySelected' : 'secondary'}
                  contentWeight={advertData.type_of_contract_id === id ? 'Bold' : 'SemiBold'}
                  contentVariant='h5'
                  contentColor={Colors.Basic900}
                  style={{ paddingVertical: 6, paddingHorizontal: 8 }}
                  onPress={() => changeAdvertDataHandler('type_of_contract_id', id)}
                  borderRadius={4}
                >
                  {name}
                </Button>
              </View>
            ))}
          </ScrollView>
        </Accordion>
        <Separator />
        {/* <Accordion
          title={<View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Typography>Rodzaj umowy</Typography>
            {isNumber(advertData.type_of_contract_id) && <View style={{ marginLeft: 10 }}>
              <SvgIcon icon='doneCircleGreen' />
            </View>}
          </View>}
        >
          <View style={styles.ContactHoursButtons}>
            <View style={styles.HourButton}>
              <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>od</Typography>
              <Button
                contentWeight='SemiBold'
                contentVariant='h5'
                variant="secondary"
                onPress={() => setShowTimepicker('start')}
                borderRadius={4}
              >
                {contact_hours?.substring(0, contact_hours.length - 6)}
              </Button>
            </View>
            <View style={{ justifyContent: 'center', height: 100 }}>
              <Typography weight='Bold' variant='h4' color={Colors.Basic500}>{'  -  '}</Typography>
            </View>
            <View style={styles.HourButton}>
              <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>do</Typography>
              <Button
                contentWeight='SemiBold'
                contentVariant='h5'
                variant="secondary"
                onPress={() => setShowTimepicker('end')}
                borderRadius={4}
              >
                {contact_hours?.substring(6)}
              </Button>
            </View>
          </View>
        </Accordion> */}
        <Separator />

        <View style={{ paddingHorizontal: 19 }}>
          <CheckBox
            checked={woCV}
            onCheckedChange={checked => setwoCV(!!checked)}
            leftTextView={
              <Typography style={{ paddingVertical: 20 }}>
                Bez CV
              </Typography>
            }
            style={{ marginTop: 20 }}
          />
        </View>
        <Separator style={{ marginBottom: 15 }} />
        {/* <Accordion
          title={<View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Typography>Godziny pracy</Typography>
          </View>}
        >
          
        </Accordion>
        <Separator /> */}

        {/* 
        <CheckBox
          leftText='Praca zmianowa'
          checked={shiftJob}
          onCheckedChange={(checked) => setShiftJob(checked)}
          style={{ padding: 19 }}
        />
        <Separator />
        <CheckBox
          leftText='Praca w weekendy'
          checked={weekendJob}
          onCheckedChange={(checked) => setWeekendJob(checked)}
          style={{ padding: 19 }}
        />
        <Separator />
        <CheckBox
          leftText='Elastyczny czas pracy'
          checked={flexibleTime}
          onCheckedChange={(checked) => setFlexibleTime(checked)}
          style={{ padding: 19 }}
        />
        <Separator />
        <CheckBox
          leftText='Możliwość pracy zdalnej'
          checked={withoutResume}
          onCheckedChange={(checked) => setWithoutResume(checked)}
          style={{ padding: 19 }}
        />
        <Separator />
        
 */}



        {/* 


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
          style={{ padding: 19 }}
        />
        <Separator />
        <CheckBox
          leftText='Без знання польської мови 🇺🇦'
          checked={noPolish}
          onCheckedChange={(checked) => setNoPolish(checked)}
          style={{ padding: 19 }}
        />
        <Separator />
        <CheckBox
          leftText='Bez CV'
          checked={withoutResume}
          onCheckedChange={(checked) => setWithoutResume(checked)}
          style={{ padding: 19 }}
        />
        <Separator />
        <CheckBox
          leftText='Prawo jazdy'
          checked={drivingLicense}
          onCheckedChange={(checked) => setDrivingLicense(checked)}
          style={{ padding: 19 }}
        />
        <Separator />
        <CheckBox
          leftText='Rekrutacja online'
          checked={onlineRecruitment}
          onCheckedChange={(checked) => setOnlineRecruitment(checked)}
          style={{ padding: 19 }}
        /> */}








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
      <Button
        onPress={createAdvertHandler}
        disabled={loading}
        withLoading
        stickyBottom
      >
        {advertExists ? 'Zapisz' : 'Dodaj'}
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
  },
  ContactHoursButtons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  HourButton: {
    width: '35%',
    maxWidth: 200
  },
});

export default AdvertEditorScreen;