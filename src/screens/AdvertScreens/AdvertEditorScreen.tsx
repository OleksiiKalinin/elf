import { CommonActions, CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
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
import { TimePickerModal } from '../../components/modified_modules/react-native-paper-dates/Time/TimePickerModal';
import { languages } from '../ProfileScreens/CompanyEditorScreen';

const stepsOrder = ['fillData', 'paymentPlan', 'paymentMethods', 'summary', 'result'] as const;
export type AdvertEditorStepType = typeof stepsOrder[number];

type Props = NonNullable<AdvertStackParamList['default']['AdvertEditorScreen']>;
const { useParam } = createParam<Props>();

const AdvertEditorScreen: React.FC<InitialPropsFromParams<Props>> = ({ idInitial, stepInitial }) => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { jobIndustries, userCompany, jobSalaryModes, jobSalaryTaxes, jobStartFrom, jobTrials, jobModes, jobContractTypes, jobTrialTimes, jobExperiences, token, userAdverts } = useTypedSelector(state => state.general);
  const currentPositions = userCompany?.job_industry ? getJobPositionsFrom(jobIndustries, userCompany.job_industry) : [];
  const [stepInitialParam, setStepInitialParam] = useParam('step', { initial: stepInitial });
  const [step, setStep] = useState<AdvertEditorStepType | null>(null);
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
    // to fix on server
    known_languages_id: [],
    // to add on server
    // withoutCV: false,
    description: null,
    job_mode_id: null,
    job_start_id: null,
    trial_time_id: null,
    trial_type_id: null,
    type_of_contract_id: null,
    working_hour_down: '08:00',
    working_hour_up: '16:00',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [woCV, setwoCV] = useState<boolean>(false);
  // ssr fix
  const [advertExists, setAdvertExists] = useState<boolean>(false);
  const [id] = useParam('id', { initial: idInitial })
  const [showTimepicker, setShowTimepicker] = useState<'start' | 'end' | false>(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  // const [isMainMenuSender] = useParam('isMainMenuSender');
  // const { setSwipeablePanelProps } = useActions();

  const selectedLanguages = useMemo(() => {
    return languages.filter(item => advertData.known_languages_id.includes(item.id));
  }, [advertData.known_languages_id, languages]);

  useEffect(() => {
    console.log(advertData);
  }, [advertData]);

  useEffect(() => {
    if (stepInitialParam && stepsOrder.includes(stepInitialParam)) {
      setStep(stepInitialParam);
    } else {
      setStepInitialParam('fillData', { webBehavior: 'replace' });
    }
  }, [stepInitialParam]);

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

  const changeAdvertDataHandler = (name: keyof UserAdvertType, value: string | number | number[] | AddressType | null, replaceSpaces: boolean = true) => {
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

  const goToSelectLanguagesScreen = () => {
    router.push({
      stack: 'AdvertStack',
      screen: 'AdvertEditorScreen',
      params: {
        subView: 'ItemSelectorScreen',
        mode: 'multiple',
        highlightPopularItems: true,
        list: languages,
        callback: (languages) => changeAdvertDataHandler('known_languages_id', languages),
        labels: {
          searchLabel: 'Znajdź język',
          itemsLabel: 'Pozostałe języki',
          popularItemsLabel: 'Popularne języki',
        },
        headerProps: { title: 'Preferowane języki' },
        initialSelected: advertData.known_languages_id,
        allowReturnEmptyList: true,
      },
    });
  };

  const goToCompanyDescriptionScreen = () => {
    router.push({
      stack: 'AdvertStack',
      screen: 'AdvertEditorScreen',
      params: {
        subView: 'CompanyDescriptionScreen',
        callback: (value) => changeAdvertDataHandler('description', value, false),
        description: advertData.description,
        title: 'Dodaj opis'
      },
    });
  };

  return !userCompany ? <Typography>Nie masz firmy</Typography> : (
    <ScreenHeaderProvider
      title={advertExists ? 'Edytuj ogłoszenie' : 'Nowe ogłoszenie'}
      backgroundContent={Colors.Basic100}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {step === 'fillData' && <>
          <View style={{ marginLeft: 19, marginTop: 32, marginBottom: 16 }}>
            <Typography weight="Bold" size={20}>Podstawowe</Typography>
          </View>
          {!isNumber(advertData.job_position_id) && <Separator />}
          <TouchableOpacity
            onPress={() => router.push({
              stack: 'AdvertStack',
              screen: 'AdvertEditorScreen',
              params: { subView: 'JobCategoryScreen', mode: 'singlePosition', initialIndustry: userCompany.job_industry || undefined, callback: (_, id) => changeAdvertDataHandler('job_position_id', id) }
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
              <Typography variant='h5'>Doświadczenie*</Typography>
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
              <Typography variant='h5'>Tryb pracy*</Typography>
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
              <Typography variant='h5'>Termin rozpoczęcia pracy*</Typography>
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
              <Typography variant='h5'>Stawka*</Typography>
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
          {advertData.description ?
            <>
              <View style={{ paddingHorizontal: 19, paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <Typography variant='h5' weight='Bold'>
                    Opis
                  </Typography>
                  <TouchableOpacity
                    onPress={() => goToCompanyDescriptionScreen()}
                  >
                    <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                      Edytuj
                    </Typography>
                  </TouchableOpacity>
                </View>
                <Typography
                  numberOfLines={descriptionExpanded ? undefined : 3}
                  color={Colors.Basic600}
                >
                  {advertData.description}
                </Typography>
                <Button
                  variant='text'
                  size='small'
                  onPress={() => setDescriptionExpanded(prev => !prev)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgIcon icon={descriptionExpanded ? "arrowTop" : "arrowBottom"} fill={Colors.Basic500} />
                    <Typography>
                      {descriptionExpanded ? 'Ukryj' : 'Zobacz cały opis'}
                    </Typography>
                  </View>
                </Button>
              </View>
            </>
            :
            <Button
              variant='text'
              arrowRight
              onPress={() => goToCompanyDescriptionScreen()}
            >
              <Typography variant='h5'>
                Opis
              </Typography>
            </Button>
          }
          <Separator />
          <Accordion
            title={<View style={{ flexDirection: "row", alignItems: 'center' }}>
              <Typography variant='h5'>Okres próbny</Typography>
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
              <Typography variant='h5'>Rodzaj umowy</Typography>
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
          <Accordion
            title={<View style={{ flexDirection: "row", alignItems: 'center' }}>
              <Typography variant='h5'>Godziny pracy</Typography>
              {/* {isNumber(advertData.type_of_contract_id) && <View style={{ marginLeft: 10 }}>
              <SvgIcon icon='doneCircleGreen' />
            </View>} */}
            </View>}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 19, maxWidth: 320, marginBottom: 24 }}>
              <View style={{ flex: 1 }}>
                <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>od</Typography>
                <Button
                  size='medium'
                  contentWeight='SemiBold'
                  contentVariant='h5'
                  variant="secondary"
                  onPress={() => setShowTimepicker('start')}
                  borderRadius={4}
                >
                  {advertData.working_hour_down}
                </Button>
              </View>
              <View style={{ justifyContent: 'center', height: 44, alignSelf: 'flex-end' }}>
                <Typography weight='Bold' variant='h4' color={Colors.Basic500}>{'   -   '}</Typography>
              </View>
              <View style={{ flex: 1 }}>
                <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>do</Typography>
                <Button
                  size='medium'
                  contentWeight='SemiBold'
                  contentVariant='h5'
                  variant="secondary"
                  onPress={() => setShowTimepicker('end')}
                  borderRadius={4}
                >
                  {advertData.working_hour_up}
                </Button>
              </View>
            </View>
            <TimePickerModal
              visible={!!showTimepicker}
              onDismiss={() => setShowTimepicker(false)}
              onConfirm={({ hours, minutes }) => {
                changeAdvertDataHandler(
                  showTimepicker === 'start' ? 'working_hour_down' : 'working_hour_up',
                  `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}`
                );
                setShowTimepicker(false);
              }}
              hours={Number(showTimepicker === 'start' ? advertData.working_hour_down?.split(':')[0] : advertData.working_hour_up?.split(':')[0])}
              minutes={Number(showTimepicker === 'start' ? advertData.working_hour_down?.split(':')[1] : advertData.working_hour_up?.split(':')[1])}
            />
          </Accordion>
          <Separator />
          {advertData.duties_ids.length ?
            <>
              <View style={{ paddingHorizontal: 19, paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <Typography variant='h5' weight='Bold'>
                    Zakres obowiązków
                  </Typography>
                  <TouchableOpacity
                    onPress={() => goToSelectLanguagesScreen()}
                  >
                    <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                      Edytuj
                    </Typography>
                  </TouchableOpacity>
                </View>
                <Typography color={Colors.Basic600}>
                  {selectedLanguages.map(({ name }) => name).join(', ')}
                </Typography>
              </View>
            </>
            :
            <Button
              variant='text'
              arrowRight
              onPress={() => goToSelectLanguagesScreen()}
            >
              <Typography variant='h5'>
                Zakres obowiązków
              </Typography>
            </Button>
          }
          <Separator />
          {advertData.known_languages_id.length ?
            <View style={{ paddingHorizontal: 19, paddingVertical: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Typography variant='h5' weight='Bold'>
                  Preferowane języki w komunikacji
                </Typography>
                <TouchableOpacity
                  onPress={() => goToSelectLanguagesScreen()}
                >
                  <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                    Edytuj
                  </Typography>
                </TouchableOpacity>
              </View>
              <Typography color={Colors.Basic600}>
                {selectedLanguages.map(({ name }) => name).join(', ')}
              </Typography>
            </View>
            :
            <Button
              variant='text'
              arrowRight
              onPress={() => goToSelectLanguagesScreen()}
            >
              <Typography variant='h5'>
                Preferowane języki w komunikacji
              </Typography>
            </Button>
          }
          <Separator />
          {advertData.requirements_ids.length ?
            <>
              <View style={{ paddingHorizontal: 19, paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <Typography variant='h5' weight='Bold'>
                    Wymagania
                  </Typography>
                  <TouchableOpacity
                    onPress={() => goToSelectLanguagesScreen()}
                  >
                    <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                      Edytuj
                    </Typography>
                  </TouchableOpacity>
                </View>
                <Typography color={Colors.Basic600}>
                  {selectedLanguages.map(({ name }) => name).join(', ')}
                </Typography>
              </View>
            </>
            :
            <Button
              variant='text'
              arrowRight
              onPress={() => goToSelectLanguagesScreen()}
            >
              <Typography variant='h5'>
                Wymagania
              </Typography>
            </Button>
          }
          <Separator />
          {advertData.benefits_ids.length ?
            <>
              <View style={{ paddingHorizontal: 19, paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <Typography variant='h5' weight='Bold'>
                    Benefity
                  </Typography>
                  <TouchableOpacity
                    onPress={() => goToSelectLanguagesScreen()}
                  >
                    <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                      Edytuj
                    </Typography>
                  </TouchableOpacity>
                </View>
                <Typography color={Colors.Basic600}>
                  {selectedLanguages.map(({ name }) => name).join(', ')}
                </Typography>
              </View>
            </>
            :
            <Button
              variant='text'
              arrowRight
              onPress={() => goToSelectLanguagesScreen()}
            >
              <Typography variant='h5'>
                Benefity
              </Typography>
            </Button>
          }
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
          <Separator />
        </>}
      </ScrollView>
      <Button
        onPress={createAdvertHandler}
        disabled={loading}
        withLoading
        stickyBottom
      >
        {advertExists ? 'Zapisz' : 'Dalej'}
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