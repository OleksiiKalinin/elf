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
import AdvertLarge from '../../components/organismes/AdvertLarge';
import MainDataCard from '../ProfileScreens/CompanyScreenRoutes/MainDataCard/MainDataCard';

const MaxPlanCardWidth = 310;

const packageTypes = [
  { id: 1, price: 50, type: 'Standard' },
  { id: 2, price: 80, type: 'Comfort' },
  { id: 3, price: 99, type: 'Pro' },
];

const packageTimes = [
  '1 tydzień - 80 zł',
  '2 tygodnie - 130zł',
  '1 miesiąc - 230zł',
  'Abonament miesięczny 200zł',
];

const packages = [
  {
    active: [
      'Tworzenie dowolnej liczby profilów firm',
      'Promowanie ogłoszeń na liście 10 firm z okolicy (do 15 km)',
      'Możliwość dodania dowolnej liczby ogłoszeń',
      'Promocja Twoich ogłoszeń na social media',
    ],
    nonactive: ['Wiedza', 'Promowanie', 'Porównywanie kandydatów'],
  },
];

const stepsOrder = ['fillData', 'paymentPlan', 'paymentMethods', 'summary', 'result'] as const;
export type AdvertEditorStepType = typeof stepsOrder[number];

const headers: { [k in AdvertEditorStepType]: string } = {
  fillData: 'Nowe ogłoszenie - dane',
  paymentPlan: 'Nowe ogłoszenie - wybierz plan',
  paymentMethods: 'Nowe ogłoszenie - metoda płatności',
  summary: 'Nowe ogłoszenie - podsumowanie',
  result: 'Nowe ogłoszenie - opublikowane!',
}

const submitButtonText: { [k in AdvertEditorStepType]: string } = {
  fillData: 'Dalej',
  paymentPlan: 'Dalej',
  paymentMethods: 'Podsumowanie',
  summary: 'Akceptuję i płacę',
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
  }],
  5: [{
    salary_tax_type_id: 2,
    salary_time_type_id: 2
  }],
}

const AdvertEditorScreen: React.FC<InitialPropsFromParams<Props>> = ({ idInitial, stepInitial }) => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { jobIndustries, userCompany, jobSalaryModes, jobSalaryTaxes, jobStartFrom, jobTrials, jobModes, jobContractTypes, jobTrialTimes, jobExperiences, windowSizes, userAdverts } = useTypedSelector(state => state.general);
  const currentPositions = userCompany?.job_industry ? getJobPositionsFrom(jobIndustries, userCompany.job_industry) : [];
  const [stepInitialParam, setStepInitialParam] = useParam('step', { initial: stepInitial });
  const [step, setStep] = useState<AdvertEditorStepType | null>(null);
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
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
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

  // const changeAdvertSalaryHandler = (props:
  //   { createNew?: never, toDelete?: never, id: number, name: keyof UserAdvertType['salary'][number], value: string | number | null } |
  //   { toDelete: true, id: number, name?: never, value?: never, createNew?: never } |
  //   { createNew: true, toDelete?: never, id?: never, name?: never, value?: never }
  // ) => {
  //   const { id, name, value, createNew, toDelete } = props;

  //   setAdvertData(prev => {
  //     const index = prev.salary.findIndex(e => e.id === id);

  //     if (id && index === -1) return prev;

  //     const set = name === 'type_of_contract_id' && value ? salarySetsByContractType[value][0] || {} : {};

  //     if (createNew) {
  //       return {
  //         ...prev,
  //         salary: [
  //           ...prev.salary,
  //           {
  //             id: Math.random(),
  //             salary_amount_low: null,
  //             salary_amount_up: null,
  //             salary_tax_type_id: null,
  //             salary_time_type_id: null,
  //             type_of_contract_id: null,
  //           }
  //         ]
  //       }
  //     }

  //     return {
  //       ...prev,
  //       salary: [
  //         ...prev.salary.slice(0, index),
  //         ...(toDelete ?
  //           [] : [{
  //             ...prev.salary[index],
  //             ...set,
  //             [name]: (typeof value === 'string') ?
  //               value.replace(/\s/g, '')
  //               :
  //               value
  //           }]
  //         ),
  //         ...prev.salary.slice(index + 1)
  //       ]
  //     }

  //   });
  // };

  const submitHandler = async (createAdvertNoPayment: boolean = false) => {
    if (step) {
      const order = stepsOrder.indexOf(step);
      const nextStep = order >= 0 ? stepsOrder[order + 1] : undefined;

      if (nextStep) {
        setStepInitialParam(nextStep, { webBehavior: 'push' });
      } else {
        router.replace({ stack: 'AdvertStack' })
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

  return userCompany && step && (
    <ScreenHeaderProvider
      title={advertExists ? 'Edytuj ogłoszenie' : headers[step]}
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
              {advertData.salary.map(({ id: salary_id, salary_amount_low, salary_amount_up, salary_tax_type_id, salary_time_type_id, type_of_contract_id }, index, thisArray) => (<>
                <View key={salary_id} style={{ margin: 16, marginTop: 0, backgroundColor: Colors.White, borderRadius: 10, paddingTop: 16, paddingBottom: 2 }}>
                  <ScrollView horizontal contentContainerStyle={{ paddingLeft: 16, marginBottom: 7, paddingBottom: 7 }}>
                    {jobContractTypes.map(({ id, name }) => (
                      <View style={{ marginRight: 16 }}>
                        <Button
                          size='medium'
                          variant={type_of_contract_id === id ? 'secondarySelected' : 'secondary'}
                          contentWeight={type_of_contract_id === id ? 'Bold' : 'SemiBold'}
                          contentVariant='h5'
                          contentColor={Colors.Basic900}
                          onPress={() => changeAdvertSalaryHandler({ id: salary_id, newValues: { type_of_contract_id: id } })}
                          borderRadius={4}
                        >
                          {name}
                        </Button>
                      </View>
                    ))}
                  </ScrollView>
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
                          <TouchableOpacity
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
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                    <View style={{ alignItems: "flex-start" }}>
                      <TouchableOpacity
                        style={{ paddingHorizontal: 16, paddingBottom: 14 }}
                        onPress={() => changeAdvertSalaryHandler({ id: salary_id, toDelete: true })}
                      >
                        <Typography color={Colors.Danger} weight='SemiBold' style={{ textDecorationLine: 'underline' }}>Usuń stawkę</Typography>
                      </TouchableOpacity>
                    </View>
                  </>}
                </View>
                {(index < thisArray.length - 1) && <View style={{marginHorizontal: 19, marginBottom: 10, marginTop: -6}}>
                  <Typography color={Colors.Basic600} weight='SemiBold' textAlign='center'>{'-lub-'}</Typography>
                </View>}
              </>))}
              <View style={{ alignItems: "flex-start" }}>
                <TouchableOpacity
                  style={{ paddingHorizontal: 19 }}
                  onPress={() => changeAdvertSalaryHandler({ createNew: true })}
                >
                  <Typography color={Colors.Blue500} weight='SemiBold' style={{ textDecorationLine: 'underline' }}>Dodaj kolejną</Typography>
                </TouchableOpacity>
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
          {/* <Accordion
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
          <Separator /> */}
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
        {
          step === 'paymentPlan' && <>
            <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={{ paddingLeft: 20 }}>
              {packageTypes.map((item) =>
                <View style={{
                  maxWidth: MaxPlanCardWidth - (windowSizes.width > MaxPlanCardWidth * 2 ? 40 : 0),
                  width: windowSizes.width - 70,
                  marginVertical: 20,
                  marginRight: 20,
                  backgroundColor: Colors.Basic200
                }}>
                  <Typography variant="h2" weight="Bold" style={{ marginLeft: 19 }}>
                    {item.price}zł <Typography variant="main"> tydzień</Typography>
                  </Typography>
                  <Typography style={{ marginLeft: 19, marginBottom: 6 }}>
                    {item.type}
                  </Typography>
                  <View style={{ paddingVertical: 8, paddingHorizontal: 19 }}>
                    {packages[0].active.map(item => (
                      <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <SvgIcon icon="check" style={{ alignSelf: 'center' }} />
                        <Typography variant="small" style={{ paddingLeft: 11, alignSelf: 'center', flex: 1 }}>
                          {item}
                        </Typography>
                      </View>
                    ))}
                    {packages[0].nonactive.map(item => (
                      <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <SvgIcon icon="closeX" style={{ alignSelf: 'center' }} />
                        <Typography variant="small" style={{ paddingLeft: 11, alignSelf: 'center', flex: 1 }} color={Colors.Basic600}>
                          {item}
                        </Typography>
                      </View>
                    ))}
                  </View>
                  {selectedPaymentPlan === item.id ?
                    <Button
                      size='medium'
                      variant='secondarySelected'
                      icon={<SvgIcon icon='check' />}
                      onPress={() => setSelectedPaymentPlan(null)}
                    >
                      Wybrano
                    </Button>
                    :
                    <Button
                      size='medium'
                      variant='secondary'
                      onPress={() => setSelectedPaymentPlan(item.id)}
                    >
                      Wybierz
                    </Button>
                  }
                </View>
              )}
            </ScrollView>
          </>
        }
        {
          step === 'paymentMethods' && <View style={{ padding: 19, alignItems: 'flex-start' }}>
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
        }
        {
          step === 'summary' && <>
            <View style={{ padding: 19 }}>
              {selectedPaymentPlan && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Typography>{'Pakiet: '}</Typography>
                <Typography variant='h5' weight='SemiBold'>{packageTypes[selectedPaymentPlan].type}</Typography>
                <Typography weight='Bold'>{'  '}{packageTypes[selectedPaymentPlan].price}{' zł'}</Typography>
              </View>}
              {selectedPaymentMethod && <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Typography>{'Metoda płatności: '}</Typography>
                <Typography variant='h5' weight='SemiBold'>{selectedPaymentMethod}</Typography>
              </View>}
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
            </View>
            <Accordion
              title='Podgląd ogłoszenia'
              style={{ backgroundColor: Colors.Basic200, height: 50 }}
            >
              <AdvertLarge {...advertData} />
            </Accordion>
            {/* <MainDataCard {...userCompany} /> */}
          </>
        }
        {
          step === 'result' && <>
            <Typography>result</Typography>
          </>
        }
      </ScrollView >
      <Button
        onPress={() => submitHandler()}
        disabled={loading}
        withLoading
        stickyBottom
      >
        {advertExists ? 'Zapisz' : submitButtonText[step]}
      </Button>
    </ScreenHeaderProvider >
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