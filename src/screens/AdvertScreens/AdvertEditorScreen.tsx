import { CommonActions, CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Platform,
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
import ScreenHeaderProvider, { SCREEN_HEADER_HEIGHT } from '../../components/organismes/ScreenHeaderProvider';
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
import AdvertLarge from '../../components/organismes/AdvertLarge';
import MainDataCard from '../ProfileScreens/CompanyScreenRoutes/MainDataCard/MainDataCard';
import { WebView } from 'react-native-webview';
import HorizontalButtonsSelector from '../../components/molecules/HorizontalButtonsSelector';

const MaxPlanCardWidth = 310;

const packageTypes: {
  id: number,
  price: number,
  name: string,
  daysPeriod: number,
  jumpRefresh: number,
  addressesCount: number | 'unlimited',
  candidatesMatch: boolean,
  jobAssistant: boolean,
}[] = [
    {
      id: 1,
      price: 99,
      name: 'Small',
      daysPeriod: 30,
      jumpRefresh: 2,
      addressesCount: 1,
      candidatesMatch: false,
      jobAssistant: false,
    },
    {
      id: 2,
      price: 149,
      name: 'Medium',
      daysPeriod: 45,
      jumpRefresh: 3,
      addressesCount: 'unlimited',
      candidatesMatch: true,
      jobAssistant: false,
    },
    {
      id: 3,
      price: 189,
      name: 'Large',
      daysPeriod: 45,
      jumpRefresh: 5,
      addressesCount: 'unlimited',
      candidatesMatch: true,
      jobAssistant: true,
    },
  ];

const stepsOrder = ['fillData', 'paymentPlan', 'paymentMethods', 'summary', 'payment', 'result'] as const;
export type AdvertEditorStepType = typeof stepsOrder[number];

const newAdvertHeaders: { [k in AdvertEditorStepType]: string } = {
  fillData: 'Nowe ogłoszenie - dane',
  paymentPlan: 'Nowe ogłoszenie - wybierz plan',
  paymentMethods: 'Nowe ogłoszenie - metoda płatności',
  summary: 'Nowe ogłoszenie - podsumowanie',
  payment: 'Nowe ogłoszenie - bramka płatności',
  result: 'Nowe ogłoszenie - gotowe!',
}

const existedAdvertHeaders: { [k in AdvertEditorStepType]: string } = {
  fillData: 'Edytuj ogłoszenie',
  paymentPlan: 'Twoje ogłoszenie - plan',
  paymentMethods: 'Twoje ogłoszenie - metoda płatności',
  summary: 'Twoje ogłoszenie - podsumowanie',
  payment: 'Twoje ogłoszenie - bramka płatności',
  result: 'Twoje ogłoszenie - gotowe!',
}

const newAdvertSubmitButtonText: { [k in AdvertEditorStepType]: string } = {
  fillData: 'Dalej',
  paymentPlan: 'Dalej',
  paymentMethods: 'Podsumowanie',
  summary: 'Akceptuję i płacę',
  payment: '',
  result: 'Na Główną',
}

const existedAdvertSubmitButtonText: { [k in AdvertEditorStepType]: string } = {
  fillData: 'Zapisz',
  paymentPlan: 'Dalej',
  paymentMethods: 'Podsumowanie',
  summary: 'Akceptuję i płacę',
  payment: '',
  result: 'Na Główną',
}

type Props = NonNullable<AdvertStackParamList['default']['AdvertEditorScreen']>;
const { useParam } = createParam<Props>();

const salarySetsByContractType: {
  [k: string]: {
    salary_tax_type_id: number,
    salary_time_type_id: number,
  }[]
} = {
  2: [{
    salary_tax_type_id: 2,
    salary_time_type_id: 2
  }],
  3: [{
    salary_tax_type_id: 1,
    salary_time_type_id: 3
  }, {
    salary_tax_type_id: 1,
    salary_time_type_id: 2
  }],
  4: [{
    salary_tax_type_id: 2,
    salary_time_type_id: 3
  }, {
    salary_tax_type_id: 2,
    salary_time_type_id: 2
  }],
  5: [{
    salary_tax_type_id: 2,
    salary_time_type_id: 3
  }, {
    salary_tax_type_id: 2,
    salary_time_type_id: 2
  }],
}

const contractTypeCategories = [[2, 4], [3], [5]];

const AdvertEditorScreen: React.FC<InitialPropsFromParams<Props>> = ({ idInitial, stepInitial }) => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { jobIndustries, userCompany, jobSalaryModes, jobSalaryTaxes, jobStartFrom, jobTrials, jobModes, jobContractTypes, jobTrialTimes, jobExperiences, windowSizes, userAdverts, languages } = useTypedSelector(state => state.general);
  const currentPositions = userCompany?.job_industry ? getJobPositionsFrom(jobIndustries, userCompany.job_industry) : [];
  const [stepInitialParam, setStepInitialParam] = useParam('step', { initial: stepInitial });
  const [step, setStep] = useState<AdvertEditorStepType>(stepInitialParam || 'fillData');
  const [advertData, setAdvertData] = useState<NewUserAdvertType>({
    //_start to remove
    salary_amount_low: null,
    salary_amount_up: null,
    salary_tax_type_id: 2,
    salary_time_type_id: null,
    type_of_contract_id: null,
    //_end to remove
    salary: [
      {
        id: Math.random(),
        salary_amount_low: null,
        salary_amount_up: null,
        salary_tax_type_id: null,
        salary_time_type_id: null,
        type_of_contract_id: null,
      }
    ],
    job_experience_id: null,
    job_position_id: null,
    location: null,
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
    working_hour_down: null,
    working_hour_up: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [woCV, setwoCV] = useState<boolean>(false);
  // ssr fix
  const [advertExists, setAdvertExists] = useState<boolean>(false);
  const [id] = useParam('id', { initial: idInitial })
  const [showTimepicker, setShowTimepicker] = useState<'start' | 'end' | false>(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);
  const stepHistory = useRef<AdvertEditorStepType[]>([]);
  // const [isMainMenuSender] = useParam('isMainMenuSender');
  // const { setSwipeablePanelProps } = useActions();

  const selectedLanguages = useMemo(() => {
    return languages.filter(item => advertData.known_languages_id.includes(item.id));
  }, [advertData.known_languages_id, languages]);

  // useEffect(() => {
  //   console.log(advertData);
  // }, [advertData]);

  useEffect(() => {
    if (stepInitialParam && stepsOrder.includes(stepInitialParam)) {
      setStep(stepInitialParam);
    } else {
      setStepInitialParam('fillData', { webBehavior: 'replace' });
    }
  }, [stepInitialParam]);

  useEffect(() => {
    if (step) {
      const lastElement = stepHistory.current.at(-1);
      if (!lastElement) {
        stepHistory.current.push(step);
        return;
      }

      const orderOfLastElement = stepsOrder.indexOf(lastElement);
      const orderOfCurrentStep = stepsOrder.indexOf(step);

      if (orderOfLastElement < orderOfCurrentStep) {
        stepHistory.current.push(step);
      }
    }
  }, [step]);

  const nativeBackHandler = () => {
    stepHistory.current.pop();

    const lastHistoryElement = stepHistory.current.at(-1);
    if (lastHistoryElement) {
      setStepInitialParam(lastHistoryElement);
    } else {
      router.back();
    }
  }

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      nativeBackHandler();
      return true;
    });

    return () => {
      handler.remove();
    }
  }, []);

  useEffect(() => {
    if (id) {
      const advert = userAdverts.find(e => e.id.toString() === id);
      if (advert) {
        const { candidate_data, ...data } = advert;
        setAdvertExists(true);
        setAdvertData({
          ...data,
          // to delete
          known_languages_id: [],
          salary: [
            {
              id: Math.random(),
              salary_amount_low: null,
              salary_amount_up: null,
              salary_tax_type_id: null,
              salary_time_type_id: null,
              type_of_contract_id: null,
            }
          ],
          // to delete
        });
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

  const changeAdvertSalaryHandler = (props:
    { createNew?: never, toDelete?: never, id: number, newValues: Partial<UserAdvertType['salary'][number]> } |
    { toDelete: true, id: number, newValues?: never, createNew?: never } |
    { createNew: true, toDelete?: never, id?: never, newValues?: never }
  ) => {
    const { id, newValues, createNew, toDelete } = props;

    setAdvertData(prev => {
      const index = prev.salary.findIndex(e => e.id === id);

      if (id && index === -1) return prev;


      if (createNew) {
        return {
          ...prev,
          salary: [
            ...prev.salary,
            {
              id: Math.random(),
              salary_amount_low: null,
              salary_amount_up: null,
              salary_tax_type_id: null,
              salary_time_type_id: null,
              type_of_contract_id: null,
            }
          ]
        }
      }

      const set = newValues?.type_of_contract_id ? salarySetsByContractType[newValues.type_of_contract_id][0] || {} : {};

      return {
        ...prev,
        salary: [
          ...prev.salary.slice(0, index),
          ...(toDelete ?
            [] : [{
              ...prev.salary[index],
              ...set,
              ...(Object.keys(newValues) as (keyof typeof newValues)[])
                .reduce((prev, curr) => ({
                  ...prev,
                  [curr]: (typeof newValues[curr] === 'string') ?
                    newValues[curr]?.toString().replace(/\s/g, '')
                    :
                    newValues[curr]
                }), {})
            }]
          ),
          ...prev.salary.slice(index + 1)
        ]
      }

    });
  };

  const submitHandler = async (createAdvertNoPayment: boolean = false) => {
    if (id && advertExists && step === 'fillData') {
      // validate and put

      router.replace({ stack: 'AdvertStack', screen: 'AdvertScreen', params: { id } });
      return;
    }

    if (step) {
      const order = stepsOrder.indexOf(step);
      const nextStep = order >= 0 ? stepsOrder[order + 1] : undefined;

      if (nextStep === 'payment' && createAdvertNoPayment) {
        setPaymentSuccess(false);
        setStepInitialParam('result', { webBehavior: 'push' });
      } else if (nextStep) {
        setStepInitialParam(nextStep, { webBehavior: 'push' });
      } else {
        router.replace({ stack: 'AdvertStack' });
      }

      // if (userCompany?.id && advertData.job_position_id && advertData.location) {
      //   setLoading(true);
      //   const isOk = await dispatch(advertsServices[advertExists ? 'updateUserAdvert' : 'createUserAdvert'](advertData));
      //   console.log(!!isOk);

      //   setLoading(false);
      //   if (!!isOk) router.replace({ stack: 'AdvertStack' });
      //   else Alert.alert('Błąd', 'Wykorzystałeś 5 darmowych ogłoszeń, kup pakiet!');
      // } else Alert.alert('Błąd', 'Podaj wszystkie dane!');
    }
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

  return (
    <ScreenHeaderProvider
      title={advertExists ? existedAdvertHeaders[step] : newAdvertHeaders[step]}
      backgroundContent={Colors.Basic100}
      callback={Platform.OS !== 'web' ? nativeBackHandler : undefined}
      {...(step === 'payment' && {
        mode: 'mainTitle',
        staticContentHeightOnWeb: true,
      })}
    >
      <ScrollView
        contentContainerStyle={step === 'payment' ? {
          paddingBottom: 0,
          height: Platform.select({ web: '100%' }),
          flex: Platform.select({ native: 1 })
        } : {
          paddingBottom: 30,
        }}
      >
        {step === 'fillData' && <>
          <View style={{ marginLeft: 19, marginTop: 32, marginBottom: 16 }}>
            <Typography weight="Bold" size={20}>Podstawowe</Typography>
          </View>
          {!isNumber(advertData.job_position_id) && <Separator />}
          <Button
            variant='TouchableOpacity'
            onPress={() => router.push({
              stack: 'AdvertStack',
              screen: 'AdvertEditorScreen',
              params: { subView: 'JobCategoryScreen', mode: 'singlePosition', initialIndustry: userCompany?.job_industry || undefined, callback: (_, id) => changeAdvertDataHandler('job_position_id', id) }
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
          </Button>
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
            <HorizontalButtonsSelector
              data={jobExperiences}
              selected={advertData.job_experience_id}
              onSelect={(id) => changeAdvertDataHandler('job_experience_id', id)}
              contentContainerStyle={{ marginBottom: 24 }}
            />
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
            <HorizontalButtonsSelector
              data={jobModes}
              selected={advertData.job_mode_id}
              onSelect={(id) => changeAdvertDataHandler('job_mode_id', id)}
              contentContainerStyle={{ marginBottom: 24 }}
            />
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
            <HorizontalButtonsSelector
              data={jobStartFrom}
              selected={advertData.job_start_id}
              onSelect={(id) => changeAdvertDataHandler('job_start_id', id)}
              contentContainerStyle={{ marginBottom: 24 }}
            />
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
              {advertData.salary.map(({ id: salary_id, salary_amount_low, salary_amount_up, salary_tax_type_id, salary_time_type_id, type_of_contract_id }, index, thisArray) => (<>
                <View key={salary_id} style={{ margin: 16, marginTop: 0, backgroundColor: Colors.White, borderRadius: 10, paddingTop: 16, paddingBottom: 2 }}>
                  <HorizontalButtonsSelector
                    data={jobContractTypes}
                    selected={type_of_contract_id}
                    onSelect={(id) => changeAdvertSalaryHandler({ id: salary_id, newValues: { type_of_contract_id: id } })}
                    contentContainerStyle={{ paddingLeft: 16, marginBottom: 7, paddingBottom: 7 }}
                  />
                  {salary_time_type_id && salary_tax_type_id && type_of_contract_id && <>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', paddingHorizontal: 6 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', minWidth: 270, flex: 1, flexGrow: 1, paddingHorizontal: 10, paddingBottom: 16 }}>
                        <View style={{ flex: 1 }}>
                          <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>od</Typography>
                          <TextField
                            // style={{ width: '100%' }}
                            placeholder={salary_time_type_id === 2 ? '3000' : '20'}
                            placeholderTextColor={Colors.Basic600}
                            containerStyles={{ backgroundColor: Colors.Basic300, borderRadius: 4, paddingHorizontal: 16 }}
                            height={44}
                            keyboardType='decimal-pad'
                            right={<Typography variant='h5'>zł</Typography>}
                            value={salary_amount_low || ''}
                            onChangeText={value => changeAdvertSalaryHandler({ id: salary_id, newValues: { salary_amount_low: value } })}
                          />
                        </View>
                        <View style={{ justifyContent: 'center', height: 44, alignSelf: 'flex-end' }}>
                          <Typography weight='Bold' variant='h4' color={Colors.Basic500}>{'   -   '}</Typography>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>do</Typography>
                          <TextField
                            // style={{ width: '100%' }}
                            placeholder={salary_time_type_id === 2 ? '4000' : '30'}
                            placeholderTextColor={Colors.Basic600}
                            containerStyles={{ backgroundColor: Colors.Basic300, borderRadius: 4, paddingHorizontal: 16 }}
                            height={44}
                            keyboardType='decimal-pad'
                            right={<Typography variant='h5'>zł</Typography>}
                            value={salary_amount_up || ''}
                            onChangeText={value => changeAdvertSalaryHandler({ id: salary_id, newValues: { salary_amount_up: value } })}
                          />
                        </View>
                      </View>

                      <View style={{ justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 16 }}>
                        {salarySetsByContractType[type_of_contract_id].map((e, i) => (
                          <Button
                            variant='TouchableOpacity'
                            style={{ justifyContent: 'flex-end', marginBottom: i === 0 ? 10 : 0 }}
                            onPress={() => changeAdvertSalaryHandler({ id: salary_id, newValues: { salary_tax_type_id: e.salary_tax_type_id, salary_time_type_id: e.salary_time_type_id } })}
                          >
                            <Typography variant='h5' weight='Bold'>
                              {jobSalaryModes.find(({ id }) => id === e.salary_time_type_id)?.name}{' - '}{jobSalaryTaxes.find(({ id }) => id === e.salary_tax_type_id)?.name}
                            </Typography>
                            <View style={{
                              backgroundColor: e.salary_time_type_id === salary_time_type_id && e.salary_tax_type_id === salary_tax_type_id ? Colors.Basic900 : undefined,
                              height: 4, marginTop: 2, borderRadius: 4
                            }} />
                          </Button>
                        ))}
                      </View>
                    </View>
                    <View style={{ alignItems: "flex-start" }}>
                      <Button
                        variant='TouchableOpacity'
                        style={{ paddingHorizontal: 16, paddingBottom: 14 }}
                        onPress={() => changeAdvertSalaryHandler({ id: salary_id, toDelete: true })}
                      >
                        <Typography color={Colors.Danger} weight='SemiBold' style={{ textDecorationLine: 'underline' }}>
                          Usuń stawkę
                        </Typography>
                      </Button>
                    </View>
                  </>}
                </View>
                {(index < thisArray.length - 1) && <View style={{ marginHorizontal: 19, marginBottom: 10, marginTop: -6 }}>
                  <Typography color={Colors.Basic600} weight='SemiBold' textAlign='center'>{'-lub-'}</Typography>
                </View>}
              </>))}
              <View style={{ alignItems: "flex-start" }}>
                <Button
                  variant='TouchableOpacity'
                  style={{ paddingHorizontal: 19 }}
                  onPress={() => changeAdvertSalaryHandler({ createNew: true })}
                >
                  <Typography color={Colors.Blue500} weight='SemiBold' style={{ textDecorationLine: 'underline' }}>
                    Dodaj kolejną
                  </Typography>
                </Button>
              </View>
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
                  <Button
                    variant='TouchableOpacity'
                    onPress={() => goToCompanyDescriptionScreen()}
                  >
                    <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                      Edytuj
                    </Typography>
                  </Button>
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
            <HorizontalButtonsSelector
              data={jobTrials}
              selected={advertData.trial_type_id}
              onSelect={(id) => changeAdvertDataHandler('trial_type_id', id)}
              contentContainerStyle={{ marginBottom: 24, paddingLeft: 19 }}
              buttonProps={({ selected }) => ({
                size: 'small',
                variant: 'text',
                borderBottomWidth: 4,
                borderBottomColor: selected ? Colors.Basic900 : 'transparent',
                borderRadius: 2.5,
                paddingLeft: 0,
                paddingRight: 0,
              })}
            />
            <HorizontalButtonsSelector
              data={jobTrialTimes}
              selected={advertData.trial_time_id}
              onSelect={(id) => changeAdvertDataHandler('trial_time_id', id)}
              contentContainerStyle={{ marginBottom: 24 }}
            />
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
                  {advertData.working_hour_down || 'dodaj'}
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
                  {advertData.working_hour_up || 'dodaj'}
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
              hours={Number(showTimepicker === 'start' ? advertData.working_hour_down?.split(':')[0] : advertData.working_hour_up?.split(':')[0]) || 8}
              minutes={Number(showTimepicker === 'start' ? advertData.working_hour_down?.split(':')[1] : advertData.working_hour_up?.split(':')[1]) || 0}
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
                  <Button
                    variant='TouchableOpacity'
                    onPress={() => goToSelectLanguagesScreen()}
                  >
                    <Typography variant='h5' weight='Bold' color={Colors.Blue500}>
                      Edytuj
                    </Typography>
                  </Button>
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
                <Button
                  variant='TouchableOpacity'
                  onPress={() => goToSelectLanguagesScreen()}
                >
                  <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                    Edytuj
                  </Typography>
                </Button>
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
                  <Button
                    variant='TouchableOpacity'
                    onPress={() => goToSelectLanguagesScreen()}
                  >
                    <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                      Edytuj
                    </Typography>
                  </Button>
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
                  <Button
                    variant='TouchableOpacity'
                    onPress={() => goToSelectLanguagesScreen()}
                  >
                    <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                      Edytuj
                    </Typography>
                  </Button>
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

          <CheckBox
            containerStyle={{ paddingHorizontal: 19 }}
            checked={woCV}
            onCheckedChange={checked => setwoCV(!!checked)}
            leftTextView={
              <Typography style={{ paddingVertical: 20 }}>
                Bez CV
              </Typography>
            }
          />

          <Separator />
        </>}
        {step === 'paymentPlan' && <>
          <ScrollView contentContainerStyle={{ padding: 19 }}>
            {packageTypes.map((item) =>
              <View style={{
                // maxWidth: MaxPlanCardWidth - (windowSizes.width > MaxPlanCardWidth * 2 ? 40 : 0),
                // width: windowSizes.width - 70,
                marginBottom: 20,
                backgroundColor: selectedPaymentPlan === item.id ? Colors.Basic300 : Colors.Basic200,
                borderRadius: 4
              }}>
                <Typography variant="h2" weight="Bold" style={{ marginLeft: 15, marginTop: 10 }}>
                  {item.price}zł <Typography variant="h4">{item.daysPeriod}{' dni'}</Typography>
                </Typography>
                <Typography variant='h4' style={{ marginLeft: 15, marginBottom: 5 }}>
                  {item.name}
                </Typography>
                <View style={{ paddingVertical: 8, paddingHorizontal: 15 }}>
                  <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <View style={{ width: 30 }}>
                      <Typography variant='h5' weight='Bold'>{isNumber(item.addressesCount) ? item.addressesCount : '∞'}</Typography>
                    </View>
                    <Typography style={{ alignSelf: 'center', flex: 1 }}>
                      lokalizacje oferty
                    </Typography>
                  </View>
                  <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <View style={{ width: 30 }}>
                      <Typography variant='h5' weight='Bold'>{item.jumpRefresh}</Typography>
                    </View>
                    <Typography style={{ alignSelf: 'center', flex: 1 }}>
                      podbić/odświerzeń
                    </Typography>
                  </View>
                  {item.candidatesMatch && <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <View style={{ width: 30 }}>
                      <SvgIcon icon="check" />
                    </View>
                    <Typography style={{ alignSelf: 'center', flex: 1 }}>
                      dopasowanie kandydatów (%)
                    </Typography>
                  </View>}
                  {item.jobAssistant && <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <View style={{ width: 30 }}>
                      <SvgIcon icon="check" />
                    </View>
                    <Typography style={{ alignSelf: 'center', flex: 1 }}>
                      wsparcie Job Assistanta
                    </Typography>
                  </View>}
                </View>
                <View style={{ padding: 15, paddingTop: 0 }}>
                  {selectedPaymentPlan === item.id ?
                    <Button
                      size='medium'
                      borderRadius={4}
                      variant='secondarySelected'
                      icon={<SvgIcon icon='check' fill={Colors.SuccessLight} />}
                      onPress={() => setSelectedPaymentPlan(null)}
                    >
                      Wybrano
                    </Button>
                    :
                    <Button
                      size='medium'
                      borderRadius={4}
                      variant='secondary'
                      onPress={() => setSelectedPaymentPlan(item.id)}
                    >
                      Wybierz
                    </Button>
                  }
                </View>
              </View>
            )}
          </ScrollView>
        </>}
        {step === 'paymentMethods' && (
          <View style={{ padding: 19, alignItems: 'flex-start' }}>
            {['BLIK', 'DZIK', 'KLIK'].map((e) => (
              <Button
                size='medium'
                variant={selectedPaymentMethod === e ? 'secondarySelected' : 'secondary'}
                icon={selectedPaymentMethod === e ? <SvgIcon icon='check' /> : undefined}
                mb={10}
                fullwidth={false}
                onPress={() => setSelectedPaymentMethod(e)}
              >
                {e}
              </Button>
            ))}
          </View>
        )}
        {step === 'summary' && <>
          <View style={{ padding: 19 }}>
            {selectedPaymentPlan && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typography>{'Pakiet: '}</Typography>
              <Typography variant='h5' weight='SemiBold'>{packageTypes[selectedPaymentPlan].name}</Typography>
              <Typography weight='Bold'>{'  '}{packageTypes[selectedPaymentPlan].price}{' zł'}</Typography>
            </View>}
            {selectedPaymentMethod && <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Typography>{'Metoda płatności: '}</Typography>
              <Typography variant='h5' weight='SemiBold'>{selectedPaymentMethod}</Typography>
            </View>}
            {!advertExists && <>
              <View style={{ alignItems: 'flex-start' }}>
                <Button
                  onPress={() => submitHandler(true)}
                  disabled={loading}
                  variant='secondary'
                  size='medium'
                  withLoading
                  stickyBottom
                  fullwidth={false}
                  borderRadius={4}
                >
                  Zapłać później*
                </Button>
              </View>
              <Typography variant='small' color={Colors.Basic600} style={{ paddingVertical: 5 }}>
                *Ogłoszenie będzie zapisane na koncie, ale nie będzie widoczne dla kandydatów. (Zakładka "W edycji")
              </Typography>
            </>}
          </View>
          <Accordion
            title='Podgląd ogłoszenia'
            style={{ backgroundColor: Colors.Basic200, height: 50 }}
          >
            <AdvertLarge {...advertData} />
          </Accordion>
          {/* <MainDataCard {...userCompany} /> */}
        </>}
        {step === 'payment' && <>
          <WebView
            source={{ uri: `https://elf-swart.vercel.app/adverts/PaymentReturnScreen` }}
            style={{ width: '100%', height: '100%' }}
            onMessage={(e) => {
              console.log(e.nativeEvent.data);
              if ((typeof e.nativeEvent.data === 'string') && !!e.nativeEvent.data) {
                try {
                  const data = JSON.parse(e.nativeEvent.data);
                  if (data.isOk) {
                    setPaymentSuccess(true);
                    setStepInitialParam('result', { webBehavior: 'replace' });
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            }}
          />
        </>}
        {step === 'result' && <>
          <View style={{ padding: 19 }}>
            {advertExists && advertData.expiration_time ? <>
              <Typography variant='h4' style={{ marginBottom: 15 }}>Ogłoszenie zostało przedłużone!</Typography>
              <Typography weight='Bold'>Wygasa za {Math.ceil(new Date(new Date(advertData.expiration_time).getTime() - Date.now()).getTime() / 1000 / 60 / 60 / 24)} dni</Typography>
            </> : <>
              <Typography variant='h4' style={{ marginBottom: 15 }}>Ogłoszenie zostało stworzone!</Typography>
              {paymentSuccess !== null && paymentSuccess ? <>
                <Typography>Opłacone ogłoszenie opublikowane i teraz widoczne dla twoich przyszłych pracowników :)</Typography>
              </> : <>
                <Typography>Wybrałeś opcję "Opłać później".</Typography>
                <Typography>Ogłoszenie znajduje się w sekcji "W edycji".</Typography>
                <Typography>Możesz zawsze wrócić i opłacić ogłoszenie!</Typography>
                <Typography weight='Bold'>Teraz twoje ogłoszenie nie jest widoczne dla kandydatów.</Typography>
              </>}
            </>}
          </View>
        </>}
      </ScrollView>
      {!!(advertExists ? existedAdvertSubmitButtonText[step] : newAdvertSubmitButtonText[step]) && <Button
        onPress={() => submitHandler()}
        disabled={loading}
        withLoading
        stickyBottom
      >
        {advertExists ? existedAdvertSubmitButtonText[step] : newAdvertSubmitButtonText[step]}
      </Button>}
    </ScreenHeaderProvider >
  );
};

const styles = StyleSheet.create({
});

export default AdvertEditorScreen;