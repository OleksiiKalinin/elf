import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import React, { Fragment, useCallback, useEffect, useState, useRef, useMemo } from 'react';
import {
  CompositeScreenProps,
} from '@react-navigation/native';
import Colors from '../../colors/Colors';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { nativeStore } from '../../store';
import { useTypedSelector } from '../../hooks/useTypedSelector';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import tip1 from '../../assets/images/tip1.png';
import tip2 from '../../assets/images/tip2.png';
import tip3 from '../../assets/images/tip3.png';
import tip4 from '../../assets/images/tip4.png';
import tip5 from '../../assets/images/tip5.png';
import tip6 from '../../assets/images/tip6.png';
import { useActions } from '../../hooks/useActions';
import minutesToHours from '../../hooks/minutesToHours';
import { AddressType, CompanyDataType, MediaType, ContactPersonType, LanguageType } from '../../store/reducers/types';
// import ImageCropPicker, { Options as OptionsType } from 'react-native-image-crop-picker';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import generalServices from '../../services/generalServices';
import { useDispatch } from 'react-redux';
import DraggableFlatList, { ScaleDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import companyServices from '../../services/companyServices';
import { forEach, isArray, isNumber } from 'lodash';
import SvgIcon, { IconTypes } from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { createParam } from 'solito';
import { Skeleton, SkeletonContainer } from 'react-native-skeleton-component';
import MediaSelector, { MediaFileType } from '../../components/organismes/MediaSelector';
import Slider from '../../components/atoms/Slider';
import useRouter from '../../hooks/useRouter';
import SvgUriImage from '../../components/atoms/SvgUriImage';
import MapPreview from '../../components/molecules/MapPreview';
import { Separator } from 'tamagui';
import DraggableList from '../../components/organismes/DraggableList';

const languages: LanguageType[] = [
  {
    id: 1,
    name: 'Polski',
  },
  {
    id: 2,
    name: 'Angielski',
  },
  {
    id: 3,
    name: 'Włoski',
  },
  {
    id: 4,
    name: 'Francuski',
  },
  {
    id: 5,
    name: 'Ukraiński',
  },
  {
    id: 6,
    name: 'Hiszpański',
  },
  {
    id: 7,
    name: 'Niemiecki',
  },
];

const services: LanguageType[] = [
  {
    id: 1,
    name: 'Manicure',
  },
  {
    id: 2,
    name: 'Pedicure',
  },
  {
    id: 3,
    name: 'Przedłużanie rzęs',
  },
  {
    id: 4,
    name: 'Regulacja i henna brwi',
  },
  {
    id: 5,
    name: 'Zabiegi na twarz',
  },
  {
    id: 6,
    name: 'Zabiegi na ciało',
  },
  {
    id: 7,
    name: 'Usługi fryzjerskie',
  },
];

/*
<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20 }}>
          {WorkersNumber.map((item, index) => (
            <View style={{ marginRight: 20 }}>
              <ButtonRipple
                color={selectedWorkersNumber === index ? Colors.Basic500 : Colors.Basic300}
                contentVariant='main'
                contentWeight='Medium'
                contentColor={Colors.Basic900}
                style={{ paddingVertical: 6, paddingHorizontal: 8 }}
                onPress={() => setSelectedWorkersNumber(index)}
                borderRadius={4}
              >
                {item}
              </ButtonRipple>
            </View>
          ))}
        </ScrollView>
*/

const socialLinksData: {
  icon: IconTypes,
  label: string,
  value: keyof CompanyDataType,
}[] = [
    {
      icon: 'instagram',
      label: 'Link do Instagrama',
      value: 'account_instagram'
    },
    {
      icon: 'facebook',
      label: 'Link do Facebooka',
      value: 'account_facebook'
    },
    // {
    //   icon: 'telegram',
    //   label: 'Link do Youtuba',
    //   value: 'account_youtube'
    // },
    // {
    //   icon: 'viber',
    //   label: 'Link do Twittera',
    //   value: 'account_twitter'
    // },
    {
      icon: 'internet',
      label: 'Link do strony internetowej',
      value: 'website'
    },
  ];

type DisplayDataKeysType = keyof CompanyDataType | 'contact_persons' | 'social_media';

const { useParam } = createParam<ProfileStackParamList['default']['CompanyEditorScreen']>();

const CompanyEditorScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  // const { editMode } = route.params;
  const [editMode] = useParam('editMode');
  const [loading, setLoading] = useState<boolean>(false);
  const { jobIndustries, token, userCompany, windowSizes } = useTypedSelector(state => state.general);
  const { setSwipeablePanelProps } = useActions();
  const [companyData, setCompanyData] = useState<CompanyDataType>(userCompany || {
    id: -1,
    short_name: null,
    full_name: null,
    main_address: null,
    other_address: null,
    short_decription: 'hello hello',
    full_decription: '',
    employees_amount: '-',
    square_footage: null,
    contact_hours: '08:00-18:00',
    website: null,
    account_facebook: null,
    account_instagram: null,
    account_linkedIn: null,
    job_industry: null,
    languages: null,
    services: null,
  });
  const [contactPersons, setContactPersons] = useState<ContactPersonType[]>(userCompany?.contactPersons || [{
    email: null,
    link: null,
    mobile_number: null,
    id: Date.now(),
    contact_hours: '08:00-18:00',
    formsOfContact: {
      phone: false,
      email: false,
    },
  }]);
  const [displayData, setDisplayData] = useState<{ [k in DisplayDataKeysType]?: boolean }>({
    short_decription: false,
    full_decription: false,
    contact_hours: false,
    square_footage: false,
    employees_amount: false,
    social_media: false,
    contact_persons: false,
  });
  const [companyLogo, setCompanyLogo] = useState<MediaType | null>(userCompany?.logo || null);
  const [companyVideo, setCompanyVideo] = useState<MediaType | null>(userCompany?.video || null);
  const [companyPhotos, setCompanyPhotos] = useState<MediaType[]>(userCompany?.photos || []);
  const [companyCertificates, setCompanyCertificates] = useState<MediaType[]>(userCompany?.certificates || []);
  const [logoProgress, setLogoProgress] = useState<number | null>(null);
  const [photosProgress, setPhotosProgress] = useState<number | null>(null);
  const [certificatesProgress, setCertificatesProgress] = useState<number | null>(null);
  const [videoProgress, setVideoProgress] = useState<number | null>(null);
  const companyDataRefreshAccess = useRef(true);
  const router = useRouter();

  const submitCompanyCreation = async () => {
    const { other_address, job_industry, short_name, full_decription } = companyData;
    if (other_address && job_industry && short_name && full_decription) {
      // setLoading(true);
      // const isOk = await dispatch(companyServices[editMode ?
      //   'editUserCompany' :
      //   'createUserCompany'
      // ]({
      //   companyData: { ...companyData, employees_amount: companyData.employees_amount?.split('-').filter(el => el).length === 2 ? companyData.employees_amount : null },
      //   companyLogo, companyVideo, companyPhotos, companyCertificates, contactPersons, oldCompanyData: userCompany || companyData
      // }, token)
      // );
      // setLoading(false);
      // if (!!isOk) navigation.navigate('CompanyScreen');
    } else {
      Alert.alert('Błąd', 'Uzupełnij wszystkie obowiązkowe pola!')
    }
  }

  const selectedLanguages = useMemo(() => {
    return languages.filter(item => companyData.languages?.includes(item.id));
  }, [companyData.languages, languages]);

  const selectedServices = useMemo(() => {
    return services.filter(item => companyData.services?.includes(item.id));
  }, [companyData.services, services]);

  const changeCompanyDataHandler = (name: keyof CompanyDataType, value: string | number | number[] | AddressType | null, replaceSpaces: boolean = true) => {
    setCompanyData(prev => ({
      ...prev,
      [name]: value ?
        (typeof value === 'string') && replaceSpaces ?
          value.replace(/\s/g, '')
          :
          !isArray(value) ? value : value.length === 0 ? null : value
        :
        null
    }));
  }

  const toggleDisplayData = (key: DisplayDataKeysType) => setDisplayData(prev => ({ ...prev, [key]: !prev[key] }));

  // useEffect(() => {
  //   console.log(JSON.stringify(companyData, null, 4));
  //   if (companyDataRefreshAccess.current) {
  //     // if (companyData.main_address && !companyData.other_address) {
  //     //   changeCompanyDataHandler('other_address', companyData.main_address);
  //     //   companyDataRefreshAccess.current = false;
  //     // }
  //     // if (companyData.short_name && !companyData.full_name) {
  //     //   changeCompanyDataHandler('full_name', companyData.short_name, false);
  //     //   companyDataRefreshAccess.current = false;
  //     // }
  //   } else {
  //     companyDataRefreshAccess.current = true;
  //   }
  // }, [companyData]);

  useEffect(() => {
    console.log(JSON.stringify(companyLogo, null, 4));
  }, [companyLogo]);

  // const MainButtons = [
  //   { name: 'Twoja firma', star: true, selected: companyName && true },
  //   {
  //     name: 'Dane do kontaktu',
  //     star: true,
  //     selected: ownerName && phoneNumber && email && true,
  //   },
  //   { name: 'O firmie', star: true, selected: industry && true },
  //   {
  //     name: 'Social media',
  //     star: false,
  //     selected: (instagram || facebook || website) && true,
  //   },
  //   {
  //     name: 'Skontaktuj się',
  //     star: false,
  //     selected: (messengerCheckbox || emailCheckbox || phoneCheckbox) && true,
  //   },
  //   { name: 'Lokalizacja', star: false, selected: industry && true },
  // ];

  const deletePhotoHandler = (index: number, mode: 'photos' | 'certificates') => {
    const callback: React.SetStateAction<MediaType[]> = photos => {
      if (photos[index]) {
        if (photos.length > 1)
          return [
            ...photos.slice(0, index),
            ...photos.slice(index + 1)
          ];
        else return [];
      } else {
        return photos;
      }
    }
    if (mode === 'photos') setCompanyPhotos(callback);
    else if (mode === 'certificates') setCompanyCertificates(callback);
  }

  const handleMultipleFiles = (files: MediaFileType[]) => {
    const newArray: MediaType[] = [];

    files.forEach((item, i) => {
      newArray.push({
        id: i,
        path: item.path,
        mime: item.mime,
        order: i + 1,
        beforePath: item.beforePath,
      })
    });

    return newArray
  };

  const handleSingleFile = (files: MediaFileType[]) => {
    return {
      name: files[0].name,
      path: files[0].path,
      mime: files[0].mime,
    };
  };

  const goToJobCategoryScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        subView: 'JobCategoryScreen',
        mode: 'industry',
        callback: (industry) => changeCompanyDataHandler('job_industry', industry),
      }
    });
  };

  const goToSelectServicesScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        subView: 'ItemSelectorScreen',
        mode: 'multiple',
        list: services,
        callback: (services) => changeCompanyDataHandler('services', services),
        labels: {
          searchLabel: 'Znajdź usługi',
          itemsLabel: 'Popularne usługi',
        },
        headerProps: { title: 'Usługi' },
        initialSelected: companyData.services ?? undefined,
        allowReturnEmptyList: true,
      },
    });
  };

  const goToAddPersonsContactScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        subView: 'AddContactPersonsScreen',
        contactPersons,
        setContactPersons,
        companyData,
        changeCompanyDataHandler
      },
    });
  };

  const goToCompanyDescriptionScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        subView: 'CompanyDescriptionScreen',
        callback: (value) => changeCompanyDataHandler('full_decription', value, false),
        description: companyData.full_decription,
        title: 'Dodaj opis firmy'
      },
    });
  };

  const goToCompanyInvoiceScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        subView: 'CompanyInvoiceScreen',
        callback: (address, NIP, full_name) => {
          changeCompanyDataHandler('full_name', full_name, false);
          changeCompanyDataHandler('main_address', address);
        },
        address: companyData.main_address,
        full_name: companyData.full_name,
        NIP: '',
        title: 'Dodaj dane do faktury'
      }
    })
  };

  const goToSelectLanguagesScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        subView: 'ItemSelectorScreen',
        mode: 'multiple',
        list: languages,
        callback: (languages) => changeCompanyDataHandler('languages', languages),
        labels: {
          searchLabel: 'Znajdź język',
          itemsLabel: 'Popularne języki',
        },
        headerProps: { title: 'Preferowane języki' },
        initialSelected: companyData.languages ?? undefined,
        allowReturnEmptyList: true,
      },
    });
  };

  const goToSocialMediaScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        subView: 'SocialMediaScreen',
        callback: (socialMedia) => setCompanyData(prev => ({
          ...prev,
          account_facebook: socialMedia.facebook,
          account_instagram: socialMedia.instagram,
          account_linkedIn: socialMedia.linkedIn,
          website: socialMedia.website,
        })),
        initialSocialMedia: {
          facebook: companyData.account_facebook,
          instagram: companyData.account_instagram,
          linkedIn: companyData.account_linkedIn,
          website: companyData.website,
        },
      },
    });
  };

  const showTipsHandler = () => {
    setSwipeablePanelProps({
      closeButton: false,
      children: (
        <ScrollView style={styles.TipsView}>
          <View style={styles.TipsHeader}>
            <Typography variant="h5">Podpowiedzi</Typography>
            <TouchableOpacity style={{ position: 'absolute', right: 25 }} onPress={() => setSwipeablePanelProps(null)}>
              <SvgIcon icon="crossBig" />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <View>
              <Typography weight="Bold" variant="h5" style={styles.Header}>
                Zdjęcia swoich prac
              </Typography>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 19,
                }}>
                <Image source={tip1} style={{ marginRight: 8 }} />
                <Image source={tip2} />
              </View>
              <Typography color={Colors.Basic600} style={{ marginHorizontal: 19, marginTop: 8 }}>
                Zdjęcia powinny pokazywać wykonane przez Ciebie prace (np.
                fryzury, manicure czy wyroby cukiernicze).
              </Typography>
            </View>
            <View>
              <Typography weight="Bold" variant="h5" style={styles.Header}>
                Zadbaj o jakość fotografii
              </Typography>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 19,
                }}>
                <Image source={tip3} style={{ marginRight: 8 }} />
                <Image source={tip4} />
              </View>
              <Typography
                color={Colors.Basic600}
                style={{ marginHorizontal: 19, marginTop: 8 }}>
                Zdjęcia powinny pokazywać wykonane przez Ciebie prace (np.
                fryzury, manicure czy wyroby cukiernicze).
              </Typography>
            </View>
            <View>
              <Typography weight="Bold" variant="h5" style={styles.Header}>
                Ogranicz wielkość tła
              </Typography>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 19,
                }}>
                <Image source={tip5} style={{ marginRight: 8 }} />
                <Image source={tip6} />
              </View>
              <Typography
                color={Colors.Basic600}
                style={{ marginHorizontal: 19, marginTop: 8 }}>
                Zdjęcia powinny pokazywać wykonane przez Ciebie prace (np.
                fryzury, manicure czy wyroby cukiernicze).
              </Typography>
            </View>
          </View>
          <View style={{ marginBottom: 40 }}></View>
          <TouchableOpacity
            onPress={() => setSwipeablePanelProps(null)}
            style={{ position: 'absolute', right: 40, bottom: 30 }}>
            <Typography variant="h5" color={Colors.Basic900}>
              Zamknij
            </Typography>
          </TouchableOpacity>
          <View style={{ marginBottom: 30 }}></View>
        </ScrollView>)
    })
  }

  const renderScrollPhotoItem = useCallback(({ item, drag, isActive, getIndex, mode }: RenderItemParams<MediaType> & { mode: 'photos' | 'certificates' }) => {
    const index = getIndex();

    return (
      // <ScaleDecorator>
      <TouchableOpacity
        activeOpacity={1} onLongPress={drag} disabled={isActive}
        style={{ opacity: isActive ? 0.5 : 1, marginRight: 19, position: 'relative' }}
      >
        <View style={{ position: 'absolute', top: -17, right: -17, zIndex: 1 }}>
          <Button p={5} variant='text' circular
            onPress={() => index !== undefined && deletePhotoHandler(index, mode)}
            icon={<SvgIcon icon='crossSmall' />}
          />
        </View>
        {index !== undefined && <View style={{ position: 'absolute', top: -6, left: -5, zIndex: 1, backgroundColor: Colors.White, width: 20, height: 20, borderRadius: 10 }}>
          <Typography weight='Bold' textAlign='center'>{index + 1}</Typography>
        </View>}
        <Image style={{ width: 80, height: 80, borderRadius: 7 }} source={{ uri: item.path }} />
      </TouchableOpacity>
      // </ScaleDecorator>
    );
  }, []);

  useEffect(() => {
    console.log(companyPhotos);
  }, [companyPhotos])

  return (
    <ScreenHeaderProvider {...(editMode === 'true' ? { title: 'Edytuj profil firmy' } : { title: 'Utwórz profil firmy' })}>
      <ScrollView style={styles.Content} contentContainerStyle={{ paddingVertical: 20 }}>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 20 }}>
          {MainButtons.map(item => (
            <HorizontalMenuButton
              variant="validation"
              name={item.name}
              star={!item.selected && item.star}
              selected={item.selected}
            />
          ))}
          <View style={{ width: 60 }}></View>
        </ScrollView> */}
        <Typography
          size={20}
          weight='Bold'
          style={[styles.SectionHeader, { marginTop: 15 }]}
        >
          Podstawowe
        </Typography>
        <View style={{ marginHorizontal: 19, marginBottom: 30 }}>
          <TextField
            label="Nazwa firmy*"
            value={companyData.short_name || ''}
            onChangeText={text => changeCompanyDataHandler('short_name', text, false)}
          />
        </View>
        <View style={{ marginHorizontal: 19, marginBottom: 5 }}>
          <Typography weight="Bold" variant="h5">
            Logo firmy{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
        </View>
        <View style={{ marginBottom: 24 }}>
          <MediaSelector
            type='image'
            crop
            cropResolution={{
              width: 500,
              height: 500,
            }}
            imageSettings={{
              compressionProgress: (progress) => (Math.round(progress * 100)) === 100 ? setLogoProgress(null) : setLogoProgress(progress),
            }}
            callback={(images) => setCompanyLogo(handleSingleFile(images))}
            render={(onPress) =>
              <>
                {!!logoProgress && logoProgress < 100 ?

                  <View style={{ height: 118, padding: 20, backgroundColor: Colors.Basic300, marginHorizontal: 19, borderRadius: 4, marginBottom: 24, justifyContent: 'center' }}>
                    <Typography size={16} weight='SemiBold' style={{ color: Colors.Basic600, textAlign: 'center' }}>
                      Ładowanie zdjęć: {Math.round(logoProgress * 100)}%
                    </Typography>
                    <Slider
                      min={0} max={100} step={1}
                      value={[Math.round(logoProgress * 100)]}
                    >
                      <Slider.Track>
                        <Slider.TrackActive />
                      </Slider.Track>
                    </Slider>
                  </View>

                  :

                  !!companyLogo ?
                    <>
                      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 9 }}>
                        <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => setCompanyLogo(null)}>
                          <Typography variant='h5' weight="Bold" color={Colors.Basic600} style={{ textDecorationLine: 'underline' }}>
                            Usuń wybrane
                          </Typography>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => onPress()}>
                          <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
                            Dodaj ponownie
                          </Typography>
                        </TouchableOpacity>
                      </View>
                      <View style={{ alignItems: 'center', backgroundColor: Colors.Basic300, marginHorizontal: 19, padding: 19, borderRadius: 4 }}>
                        <Image
                          // style={{ width: windowSizes.width, height: windowSizes.width / 1.5 }}
                          style={{ aspectRatio: 1 / 1, width: '100%', maxWidth: 400, borderRadius: 4 }}
                          source={{ uri: companyLogo.path }}
                        />
                      </View>
                    </>

                    :

                    <TouchableOpacity onPress={() => onPress()}>
                      <View style={styles.AddPhotoButton}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <SvgIcon icon="createCircleSmall" fill={Colors.Basic900} />
                          <Typography variant="h5" weight='Bold'>{'  '}Dodaj logo</Typography>
                        </View>
                      </View>
                    </TouchableOpacity>
                }
              </>
            }
          />
        </View>
        <View style={{ marginBottom: 24 }}>
          <MapPreview
            label='Lokalizacja*'
            place={companyData.other_address?.formattedAddress}
            onPress={() => router.push({
              stack: 'ProfileStack',
              screen: 'CompanyEditorScreen',
              params: {
                editMode: editMode || '',
                subView: 'GoogleMapScreen',
                callback: (address) => changeCompanyDataHandler('other_address', address),
                initialAddress: companyData.other_address
              }
            })}
          />
        </View>
        <Button
          variant='text'
          arrowRight
          borderTop
          borderBottom
          onPress={() => goToJobCategoryScreen()}
        >
          {companyData.job_industry ?
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ width: 34, height: 34, position: 'relative' }}>
                <View style={{ position: 'absolute' }}>
                  <SkeletonContainer animation='wave' speed={600}>
                    <Skeleton style={{ width: 34, height: 34, borderRadius: 17 }} />
                  </SkeletonContainer>
                </View>
                <SvgUriImage width={34} height={34} src={jobIndustries.find(curr => curr.id === companyData.job_industry)?.icon || ''} />
              </View>
              <Typography variant='h5' weight='SemiBold'>{jobIndustries.find(curr => curr.id === companyData.job_industry)?.name || ''}</Typography>
            </View>

            :

            <>
              <Typography
                variant='h5'
              >
                Branża
              </Typography>
              <Typography style={{ color: Colors.Red }}>
                *
              </Typography>
            </>
          }
        </Button>
        {companyData.services ?
          <>
            <View style={{ paddingHorizontal: 19 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <Typography variant='h5' weight='Bold'>
                  Usługi
                </Typography>
                <Button
                  variant='text'
                  style={{ width: 'auto', padding: 0 }}
                  onPress={() => goToSelectServicesScreen()}
                >
                  <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                    Edytuj
                  </Typography>
                </Button>
              </View>
              <Typography color={Colors.Basic600}>
                {selectedServices.map(({ id, name }, i) =>
                  <Fragment key={id}>
                    {name}
                    {i !== selectedServices.length - 1 ? ', ' : ''}
                  </Fragment>
                )}
              </Typography>
            </View>
            <Separator marginTop={12} />
          </>

          :

          <Button
            variant='text'
            borderBottom
            arrowRight
            onPress={() => goToSelectServicesScreen()}
          >
            <Typography variant='h5'>
              Usługi
            </Typography>
            <Typography variant='h5' style={styles.Optional}>
              (opcjonalnie)
            </Typography>
          </Button>
        }
        {contactPersons[0].email ?
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 19, height: 58 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <SvgIcon icon='doneCircleGreen' />
                <Typography variant='h5' weight='Bold'>
                  Dane do kontaktu uzupełnione
                </Typography>
              </View>
              <Button
                variant='text'
                style={{ width: 'auto', padding: 0 }}
                onPress={() => goToAddPersonsContactScreen()}
              >
                <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                  Edytuj
                </Typography>
              </Button>
            </View>
            <Separator />
          </>

          :

          <Button
            variant='text'
            arrowRight
            borderBottom
            onPress={() => goToAddPersonsContactScreen()}
          >
            <Typography variant='h5'>
              Dane do kontaktu
            </Typography>
            <Typography style={{ color: Colors.Red }}>
              *
            </Typography>
          </Button>
        }
        {companyData.full_decription ?
          <>
            <View style={{ paddingHorizontal: 19 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <Typography variant='h5' weight='Bold'>
                  Opis firmy
                </Typography>
                <Button
                  variant='text'
                  style={{ width: 'auto', padding: 0 }}
                  onPress={() => goToCompanyDescriptionScreen()}
                >
                  <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                    Edytuj
                  </Typography>
                </Button>
              </View>
              <Typography color={Colors.Basic600}>
                {companyData.full_decription}
              </Typography>

            </View>
            <Separator marginTop={12} />
          </>

          :

          <Button
            variant='text'
            arrowRight
            borderBottom
            onPress={() => goToCompanyDescriptionScreen()}
          >
            <Typography variant='h5'>
              Opis firmy
            </Typography>
          </Button>
        }
        {companyData.full_name ?
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 19, height: 58 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <SvgIcon icon='doneCircleGreen' />
                <Typography variant='h5' weight='Bold'>
                  Dane do faktury uzupełnione
                </Typography>
              </View>
              <Button
                variant='text'
                style={{ width: 'auto', padding: 0 }}
                onPress={() => goToCompanyInvoiceScreen()}
              >
                <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                  Edytuj
                </Typography>
              </Button>
            </View>
            <Separator />
          </>

          :

          <Button
            variant='text'
            arrowRight
            borderBottom
            onPress={() => goToCompanyInvoiceScreen()}
          >
            <Typography variant='h5'>
              Dane do faktury
            </Typography>
            <Typography variant='h5' style={styles.Optional}>
              (opcjonalnie)
            </Typography>
          </Button>
        }
        <Typography
          size={20}
          weight='Bold'
          style={[styles.SectionHeader, { marginTop: 26 }]}
        >
          Dodatkowe
        </Typography>
        <View style={{ marginHorizontal: 19, marginBottom: 5, }}>
          <Typography weight="Bold" variant="h5">
            Zdjęcia firmy{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
        </View>
        <MediaSelector
          type='image'
          multiple
          selectionLimit={20}
          initialSelected={companyPhotos as any}
          imageSettings={{
            compressionProgress: (progress) => (Math.round(progress * 100)) === 100 ? setPhotosProgress(null) : setPhotosProgress(progress),
          }}
          callback={(images) => setCompanyPhotos(handleMultipleFiles(images))}
          render={(onPress) =>
            <>
              {!!photosProgress && photosProgress < 100 ?

                <View style={{ height: 118, padding: 20, backgroundColor: Colors.Basic300, marginHorizontal: 19, borderRadius: 4, marginBottom: 24, justifyContent: 'center' }}>
                  <Typography size={16} weight='SemiBold' style={{ color: Colors.Basic600, textAlign: 'center' }}>
                    Ładowanie zdjęć: {Math.round(photosProgress * 100)}%
                  </Typography>
                  <Slider
                    min={0} max={100} step={1}
                    value={[Math.round(photosProgress * 100)]}
                  >
                    <Slider.Track>
                      <Slider.TrackActive />
                    </Slider.Track>
                  </Slider>
                </View>

                :

                !!companyPhotos.length ?
                  <View style={{ backgroundColor: Colors.Basic300, marginBottom: 24, marginHorizontal: 19 }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 9 }}>
                      <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => setCompanyPhotos([])}>
                        <Typography variant='h5' weight="Bold" color={Colors.Basic600} style={{ textDecorationLine: 'underline' }}>
                          Usuń wszystkie
                        </Typography>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => onPress()}>
                        <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
                          Dodaj kolejne
                        </Typography>
                      </TouchableOpacity>
                    </View>
                    {/* quick fix ScrollView onContentSizeChange for DraggableFlatList - constant height wrapper, wtf sht mzfk? */}
                    <View style={{ height: 100, flexDirection: 'row', marginBottom: 9 }}>
                      <DraggableList
                        horizontal
                        data={companyPhotos}
                        onDragEnd={({ data }) => setCompanyPhotos(data)}
                        keyExtractor={({ path }) => path}
                        renderItem={(props: RenderItemParams<MediaType>) => renderScrollPhotoItem({ ...props, mode: 'photos' })}
                        contentContainerStyle={{ paddingLeft: 19, paddingVertical: 10 }}
                        style={{ flex: 1 }}
                      />
                    </View>
                  </View>

                  :

                  <TouchableOpacity onPress={() => onPress()} style={{ marginBottom: 24 }}>
                    <View style={[styles.AddPhotoButton, { height: 118 },]}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -14 }}>
                        <View style={{ flex: 1 }}>
                          <Typography variant='h5' weight='SemiBold' color={Colors.Basic600}>Dodaj do 20 zdjęć.</Typography>
                        </View>
                        <TouchableOpacity style={{ padding: 15 }} onPress={() => showTipsHandler()}>
                          {/* <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
                            Zobacz wskazówki
                          </Typography> */}
                        </TouchableOpacity>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <SvgIcon icon="createCircleSmall" />
                        <Typography variant="h5" weight='Bold'>{'  '}Dodaj zdjęcia</Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
              }
            </>
          }
        />
        <View style={{ marginLeft: 19, marginBottom: 5 }}>
          <Typography weight="Bold" variant="h5">
            Inne zdjęcia{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
          <Typography weight="Regular" color={Colors.Basic600}>Certyfikaty, dyplomy, wyniki finansowe itp.</Typography>
        </View>
        <MediaSelector
          type='image'
          multiple
          selectionLimit={20}
          initialSelected={companyCertificates as any}
          imageSettings={{
            compressionProgress: (progress) => (Math.round(progress * 100)) === 100 ? setCertificatesProgress(null) : setCertificatesProgress(progress),
          }}
          callback={(images) => setCompanyCertificates(handleMultipleFiles(images))}
          render={(onPress) =>
            <>
              {!!certificatesProgress && certificatesProgress < 100 ?

                <View style={{ height: 118, padding: 20, backgroundColor: Colors.Basic300, marginHorizontal: 19, borderRadius: 4, marginBottom: 24, justifyContent: 'center' }}>
                  <Typography size={16} weight='SemiBold' style={{ color: Colors.Basic600, textAlign: 'center' }}>
                    Ładowanie zdjęć: {Math.round(certificatesProgress * 100)}%
                  </Typography>
                  <Slider
                    min={0} max={100} step={1}
                    value={[Math.round(certificatesProgress * 100)]}
                  >
                    <Slider.Track>
                      <Slider.TrackActive />
                    </Slider.Track>
                  </Slider>
                </View>

                :

                !!companyCertificates.length ?
                  <View style={{ backgroundColor: Colors.Basic300, marginBottom: 24, marginHorizontal: 19 }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 9 }}>
                      <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => setCompanyCertificates([])}>
                        <Typography variant='h5' weight="Bold" color={Colors.Basic600} style={{ textDecorationLine: 'underline' }}>
                          Usuń wszystkie
                        </Typography>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => onPress()}>
                        <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
                          Dodaj kolejne
                        </Typography>
                      </TouchableOpacity>
                    </View>
                    {/* quick fix ScrollView onContentSizeChange for DraggableFlatList - constant height wrapper, wtf sht mzfk? */}
                    <View style={{ height: 100, flexDirection: 'row', marginBottom: 9 }}>
                      <DraggableList
                        horizontal
                        data={companyCertificates}
                        onDragEnd={({ data }) => setCompanyCertificates(data)}
                        keyExtractor={({ path }) => path}
                        renderItem={(props: RenderItemParams<MediaType>) => renderScrollPhotoItem({ ...props, mode: 'photos' })}
                        contentContainerStyle={{ paddingLeft: 19, paddingVertical: 10 }}
                        style={{ flex: 1 }}
                      />
                    </View>
                  </View>

                  :

                  <TouchableOpacity onPress={() => onPress()} style={{ marginBottom: 24 }}>
                    <View style={[styles.AddPhotoButton, { height: 118 },]}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -14 }}>
                        <View style={{ flex: 1 }}>
                          <Typography variant='h5' weight='SemiBold' color={Colors.Basic600}>Dodaj do 20 zdjęć.</Typography>
                        </View>
                        <TouchableOpacity style={{ padding: 15 }} onPress={() => showTipsHandler()}>
                          {/* <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
                            Zobacz wskazówki
                          </Typography> */}
                        </TouchableOpacity>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <SvgIcon icon="createCircleSmall" />
                        <Typography variant="h5" weight='Bold'>{'  '}Dodaj zdjęcia</Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
              }
            </>
          }
        />
        <Separator marginTop={16} />
        {/* <View style={{ marginLeft: 19, marginBottom: 5 }}>
          <Typography weight="Bold" variant="h5">
            Krótki film{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
          <Typography weight="Regular" color={Colors.Basic600}>Przedstawiający i zachęcający do pracy w firmie</Typography>
        </View>
        <MediaSelector
          type='video'
          callback={(images) => setCompanyVideo(handleSingleFile(images))}
          videoSettings={{
            compressionProgress: (progress) => (Math.round(progress * 100)) === 100 ? setVideoProgress(null) : setVideoProgress(progress),
            minSizeToCompress: 0
          }}
          render={(onPress) =>
            <>
              {!!videoProgress && videoProgress < 100 ?

                <View style={{ height: 118, padding: 20, backgroundColor: Colors.Basic300, marginHorizontal: 19, borderRadius: 4, marginBottom: 24, justifyContent: 'center' }}>
                  <Typography size={16} weight='SemiBold' style={{ color: Colors.Basic600, textAlign: 'center' }}>
                    Ładowanie zdjęć: {Math.round(videoProgress * 100)}%
                  </Typography>
                  <Slider
                    min={0} max={100} step={1}
                    value={[Math.round(videoProgress * 100)]}
                  >
                    <Slider.Track>
                      <Slider.TrackActive />
                    </Slider.Track>
                  </Slider>
                </View>

                :

                !!companyVideo ?
                  <View style={{ marginBottom: 24 }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 9 }}>
                      <TouchableOpacity style={{ padding: 10, marginBottom: 10 }} onPress={() => setCompanyVideo(null)}>
                        <Typography variant='h5' weight="Bold" color={Colors.Basic600} style={{ textDecorationLine: 'underline' }}>
                          Usuń wybrany
                        </Typography>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ padding: 10, marginBottom: 10 }} onPress={() => onPress()}>
                        <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
                          Dodaj ponownie
                        </Typography>
                      </TouchableOpacity>
                    </View>
                    <Typography style={{ paddingHorizontal: 19 }} variant='h5'>
                      Nazwa filmu:{' '}
                      <Typography variant='h5' weight='Bold'>{companyVideo.name}</Typography>
                    </Typography>
                  </View>

                  :

                  <TouchableOpacity onPress={() => onPress()} style={{ marginBottom: 24 }}>
                    <View style={styles.AddPhotoButton}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SvgIcon icon="createCircleSmall" fill={Colors.Basic900} />
                        <Typography variant="h5" weight='Bold'>{'  '}Dodaj film</Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
              }
            </>
          }
        /> */}

        {/* <ButtonArrowSelector
          text='Usługi'
          marginTop={false}
          marginBottom={false}
          borderTop={false}
        /> */}
        {/* <ButtonArrowSelector
          text='Dane do faktury'
          marginTop={false}
          marginBottom={false}
          borderTop={false}
          onPress={() => navigation.navigate('CompanyInvoiceScreen', {
            callback: (address, NIP, full_name) => {
              changeCompanyDataHandler('full_name', full_name, false);
              changeCompanyDataHandler('main_address', address);
            },
            address: companyData.main_address,
            full_name: companyData.full_name,
            NIP: '',
            title: 'Dodaj dane do faktury'
          })}
        /> */}
        <View style={{ marginHorizontal: 19, marginBottom: 5, marginTop: 30 }}>
          <Typography weight="Bold" variant="h5">
            Liczba pracowników{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
        </View>
        <View style={{ marginHorizontal: 19, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '35%' }}>
            <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>od</Typography>
            <TextField
              placeholder='51'
              placeholderTextColor={Colors.Basic600}
              containerStyles={{ maxWidth: 200, backgroundColor: Colors.Basic300, borderRadius: 4, paddingHorizontal: 16 }}
              height={44}
              keyboardType='decimal-pad'
              value={companyData.employees_amount?.split('-')[0]}
              onChangeText={(number) => setCompanyData(prev => ({ ...prev, employees_amount: `${number.replace(/^0/, '').replace(/[^0-9]/g, '')}-${prev.employees_amount?.split('-')[1]}` }))}
            />
          </View>
          <View style={{ justifyContent: 'center', height: 44, alignSelf: 'flex-end' }}>
            <Typography weight='Bold' variant='h4' color={Colors.Basic500}>{'  -  '}</Typography>
          </View>
          <View style={{ width: '35%' }}>
            <Typography style={{ marginBottom: 5 }} variant='h5' weight='SemiBold' color={Colors.Basic600}>do</Typography>
            <TextField
              placeholder='70'
              placeholderTextColor={Colors.Basic600}
              containerStyles={{ maxWidth: 200, backgroundColor: Colors.Basic300, borderRadius: 4, paddingHorizontal: 16 }}
              height={44}
              keyboardType='decimal-pad'
              value={companyData.employees_amount?.split('-')[1]}
              onChangeText={(number) => setCompanyData(prev => ({ ...prev, employees_amount: `${prev.employees_amount?.split('-')[0]}-${number.replace(/^0/, '').replace(/[^0-9]/g, '')}` }))}
            />
          </View>
        </View>
        <Separator marginTop={16} />
        <View style={{ marginHorizontal: 19, marginBottom: 16, marginTop: 24 }}>
          <Typography weight="Bold" variant="h5">
            Metraż miejsca pracy{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
        </View>
        <View style={{ marginHorizontal: 19, marginBottom: 16 }}>
          <TextField
            placeholder='60'
            placeholderTextColor={Colors.Basic600}
            containerStyles={{ width: '40%', maxWidth: 200, backgroundColor: Colors.Basic300, borderRadius: 4, paddingHorizontal: 16 }}
            height={44}
            keyboardType='decimal-pad'
            right={<Typography>m2</Typography>}
            value={companyData.square_footage || ''}
            onChangeText={(text) => changeCompanyDataHandler('square_footage', text.replace(/^0/, '').replace(/[^0-9]/g, ''))}
          />
        </View>
        {/* <View style={{ marginHorizontal: 19 }}>
          <Typography weight="Bold" variant="h5">
            Social media{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
        </View>
        <Separator marginTop={16}/>

        {socialLinksData.map(({ icon, label, value }) => (
          <View style={styles.TextField}>
            <TextField
              left={<SvgIcon icon={icon} />}
              label={label}
              rowStyles={{ alignItems: 'flex-end' }}
              value={companyData[value] as string || ''}
              onChangeText={text => changeCompanyDataHandler(value, text)}
            />
          </View>
        ))} */}
        {companyData.languages ?
          <>
            <View style={{ paddingHorizontal: 19 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <Typography variant='h5' weight='Bold'>
                  Preferowane języki w komunikacji
                </Typography>
                <Button
                  variant='text'
                  style={{ width: 'auto', padding: 0 }}
                  onPress={() => goToSelectLanguagesScreen()}
                >
                  <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                    Edytuj
                  </Typography>
                </Button>
              </View>
              <Typography color={Colors.Basic600}>
                {selectedLanguages.map(({ id, name }, i) =>
                  <Fragment key={id}>
                    {name}
                    {i !== selectedLanguages.length - 1 ? ', ' : ''}
                  </Fragment>
                )}
              </Typography>
            </View>
            <Separator marginTop={12} />
          </>

          :

          <Button
            variant='text'
            borderTop
            borderBottom
            arrowRight
            onPress={() => goToSelectLanguagesScreen()}
          >
            <Typography variant='h5'>
              Preferowane języki w komunikacji
            </Typography>
          </Button>
        }
        {(companyData.account_facebook || companyData.account_instagram || companyData.account_linkedIn || companyData.website) ?
          <View style={styles.FilledSocialMediaContainer}>
            <View style={styles.FilledSocialMedia}>
              <Typography variant='h5' weight='Bold'>
                Social media
              </Typography>
              <Button
                variant='text'
                style={{ width: 'auto', padding: 0 }}
                onPress={() => goToSocialMediaScreen()}
              >
                <Typography variant='h5' weight='Bold' color={Colors.Blue500} >
                  Edytuj
                </Typography>
              </Button>
            </View>
            <View style={styles.SocialMediaIcons}>
              <SvgIcon icon={'facebook'} fill={companyData.account_facebook ? Colors.Basic900 : Colors.Basic600} />
              <SvgIcon icon={'instagram'} fill={companyData.account_instagram ? Colors.Basic900 : Colors.Basic600} />
              <SvgIcon icon={'instagram'} fill={companyData.account_linkedIn ? Colors.Basic900 : Colors.Basic600} />
              <SvgIcon icon={'internet'} fill={companyData.website ? Colors.Basic900 : Colors.Basic600} />
            </View>
            <Separator marginTop={12} />
          </View>

          :

          <View style={{ paddingBottom: 60 }}>
            <Button
              variant='text'
              borderBottom
              arrowRight
              onPress={() => goToSocialMediaScreen()}
            >
              <Typography variant='h5'>
                Social media
              </Typography>
            </Button>
          </View>

        }
      </ScrollView>
      <Button
        stickyBottom
        withLoading
        disabled={loading}
        onPress={submitCompanyCreation}
      >
        {editMode ? 'Zaktualizuj' : 'Utwórz'}
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    backgroundColor: Colors.Basic100,
  },
  Header: {
    // marginTop: 32,
    marginBottom: 18,
    // marginLeft: 19,
  },
  TextField: {
    marginHorizontal: 19,
    marginBottom: 16
  },
  AddPhotoButton: {
    backgroundColor: Colors.Basic300,
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 19,
    padding: 14,
  },
  TipsView: {
    // position: 'absolute',
    backgroundColor: 'white',
    // height: '100%',
    // width: '100%',
    // top: 0,
    // left: 0,
    // zIndex: 1000,
  },
  TipsHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.Basic400,
  },
  SectionHeader: {
    paddingHorizontal: 19,
    marginBottom: 30,
  },
  Optional: {
    color: Colors.Basic600,
    marginLeft: 5
  },
  FilledSocialMediaContainer: {
    marginTop: 18, 
    paddingBottom: 60 
  },
  FilledSocialMedia: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 19,
  },
  SocialMediaIcons: {
    flexDirection: 'row', 
    gap: 24, 
    paddingHorizontal: 19,
  },
});

export default CompanyEditorScreen;
