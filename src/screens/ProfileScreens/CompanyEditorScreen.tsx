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
import { useActions } from '../../hooks/useActions';
import minutesToHours from '../../hooks/minutesToHours';
import { AddressType, CompanyDataType, MediaType, ContactPersonType, LanguageType } from '../../store/reducers/types';
// import ImageCropPicker, { Options as OptionsType } from 'react-native-image-crop-picker';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import generalServices from '../../services/generalServices';
import { useDispatch } from 'react-redux';
import { RenderItemParams } from 'react-native-draggable-flatlist';
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
import style from '../../components/modified_modules/react-native-calendars/src/calendar/header/style';

export const languages: LanguageType[] = [
  {
    id: 1,
    name: 'Polski',
    isPopular: true,
  },
  {
    id: 2,
    name: 'Angielski',
    isPopular: true,
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
    isPopular: true,
  },
  {
    id: 6,
    name: 'Hiszpański',
  },
  {
    id: 7,
    name: 'Niemiecki',
  },
  {
    id: 8,
    name: 'Rosyjski',
  },
  {
    id: 9,
    name: 'Szwedzki',
  },
  {
    id: 10,
    name: 'Duński',
  },
  {
    id: 11,
    name: 'Norweski',
  },
  {
    id: 12,
    name: 'Fiński',
  },
  {
    id: 13,
    name: 'Węgierski',
  },
  {
    id: 14,
    name: 'Grecki',
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
    job_industry: null,
    short_name: null,
    full_name: null,
    nip: null,
    main_address: null,
    other_address: null,
    description: null,
    employees_amount: null,
    square_footage: null,
    contactPersons: null,
    website: null,
    account_facebook: null,
    account_instagram: null,
    account_linkedIn: null,
    languages: null,
    services: null,
  });
  const [contactPersons, setContactPersons] = useState<ContactPersonType[] | null>(null);
  const [displayData, setDisplayData] = useState<{ [k in DisplayDataKeysType]?: boolean }>({
    description: false,
    square_footage: false,
    employees_amount: false,
    social_media: false,
    contact_persons: false,
  });
  const [companyLogo, setCompanyLogo] = useState<MediaType | null>(userCompany?.logo || null);
  const [companyPhotos, setCompanyPhotos] = useState<MediaType[]>(userCompany?.photos || []);
  const [companyCertificates, setCompanyCertificates] = useState<MediaType[]>(userCompany?.certificates || []);
  const [logoProgress, setLogoProgress] = useState<number | null>(null);
  const [photosProgress, setPhotosProgress] = useState<number | null>(null);
  const [certificatesProgress, setCertificatesProgress] = useState<number | null>(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  const companyDataRefreshAccess = useRef(true);
  const router = useRouter();
  const companyPhotosLimit = 20;
  const companyCertificatesLimit = 20;

  const handleDescriptionLayout = (event: { nativeEvent: { layout: { width: number; height: number; }; }; }) => {
    const { height } = event.nativeEvent.layout;
    setDescriptionHeight(height);
  };

  const submitCompanyCreation = async () => {
    const { other_address, job_industry, short_name, description } = companyData;
    if (other_address && job_industry && short_name && description) {
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
        id: Math.random(),
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
      id: Math.random(),
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
      },
    });
  };

  const goToCompanyDescriptionScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        subView: 'CompanyDescriptionScreen',
        callback: (value) => changeCompanyDataHandler('description', value, false),
        description: companyData.description,
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
        highlightPopularItems: true,
        list: languages,
        callback: (languages) => changeCompanyDataHandler('languages', languages),
        labels: {
          searchLabel: 'Znajdź język',
          itemsLabel: 'Pozostałe języki',
          popularItemsLabel: 'Popularne języki',
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

  const renderScrollPhotoItem = useCallback(({ item, drag, isActive, getIndex, mode }: RenderItemParams<MediaType> & { mode: 'photos' | 'certificates' }) => {
    const index = getIndex();

    return (
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={drag}
        disabled={isActive}
        style={[styles.DraggableItem, { opacity: isActive ? 0.5 : 1 }]}
      >
        <View style={styles.DraggableItemDeleteButton}>
          <Button
            p={5}
            variant='text'
            circular
            icon={<SvgIcon icon='crossSmall' />}
            onPress={() => index !== undefined && deletePhotoHandler(index, mode)}
          />
        </View>
        {index !== undefined &&
          <View style={styles.DraggableItemOrderNumber}>
            <Typography weight='Bold' textAlign='center'>
              {index + 1}
            </Typography>
          </View>
        }
        <Image style={styles.DraggableItemImage} source={{ uri: item.path }} />
      </TouchableOpacity>
    );
  }, []);

  useEffect(() => {
    console.log(companyPhotos);
  }, [companyPhotos])

  return (
    <ScreenHeaderProvider title={editMode === 'true' ? 'Edytuj profil firmy' : 'Utwórz profil firmy'}>
      <ScrollView style={styles.Content} contentContainerStyle={{ paddingVertical: 20 }}>
        <Typography
          size={20}
          weight='Bold'
          style={[styles.SectionHeader, { marginTop: 15 }]}
        >
          Podstawowe
        </Typography>
        <View style={styles.CompanyName}>
          <TextField
            label="Nazwa firmy*"
            value={companyData.short_name || ''}
            onChangeText={text => changeCompanyDataHandler('short_name', text, false)}
          />
        </View>
        <View style={styles.CompanyLogoTitle}>
          <Typography weight="Bold" variant="h5">
            Logo firmy{' '}
          </Typography>
        </View>
        <View style={styles.CompanyLogo}>
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
                {(!!logoProgress && (logoProgress < 100)) ?

                  <View style={styles.LoadingImages}>
                    <Typography size={16} weight='SemiBold' style={styles.LoadingImagesText}>
                      Ładowanie zdjęć: {Math.round(logoProgress * 100)}%
                    </Typography>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[Math.round(logoProgress * 100)]}
                    >
                      <Slider.Track>
                        <Slider.TrackActive />
                      </Slider.Track>
                    </Slider>
                  </View>

                  :

                  !!companyLogo ?
                    <View style={styles.LoadedImages}>
                      <View style={styles.LoadedImagesButtons}>
                        <TouchableOpacity
                          style={styles.LoadedImagesButton}
                          onPress={() => setCompanyLogo(null)}
                        >
                          <Typography variant='h5' weight="Bold" style={styles.DeleteImagesButton}>
                            Usuń wybrane
                          </Typography>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.LoadedImagesButton}
                          onPress={() => onPress()}
                        >
                          <Typography variant='h5' weight="Bold" style={styles.AddMoreImages}>
                            Dodaj ponownie
                          </Typography>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.LoadedLogoContainer}>
                        <Image
                          style={styles.LoadedLogo}
                          source={{ uri: companyLogo.path }}
                        />
                      </View>
                    </View>

                    :

                    <TouchableOpacity onPress={() => onPress()}>
                      <View style={styles.ImageLoaderContent}>
                        <View style={styles.AddImageText}>
                          <SvgIcon icon="createCircleSmall" fill={Colors.Basic900} />
                          <Typography variant="h5" weight='Bold'>
                            {'  '}Dodaj logo
                          </Typography>
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
            place={companyData.main_address?.formattedAddress}
            onPress={() => router.push({
              stack: 'ProfileStack',
              screen: 'CompanyEditorScreen',
              params: {
                editMode: editMode || '',
                subView: 'GoogleMapScreen',
                callback: (address) => changeCompanyDataHandler('main_address', address),
                initialAddress: companyData.main_address
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
            <View style={styles.JobIndustry}>
              <View style={styles.JobIndustryIcon}>
                <View style={{ position: 'absolute' }}>
                  <SkeletonContainer animation='wave' speed={600}>
                    <Skeleton style={styles.JobIndustryIconSkeleton} />
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
            <View style={styles.SelectedItemsContainer}>
              <View style={styles.SelectedItemsHeader}>
                <Typography variant='h5' weight='Bold'>
                  Usługi
                </Typography>
                <Button
                  variant='text'
                  style={styles.EditButton}
                  onPress={() => goToSelectServicesScreen()}
                >
                  <Typography variant='h5' weight='Bold' style={styles.EditButtonText}>
                    Edytuj
                  </Typography>
                </Button>
              </View>
              <Typography style={styles.SelectedItems}>
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
          </Button>
        }
        {contactPersons ?
          <>
            <View style={styles.ContactPersonsFilled}>
              <View style={styles.ContactPersonsFilledTitle}>
                <SvgIcon icon='doneCircleGreen' />
                <Typography variant='h5' weight='Bold'>
                  Dane do kontaktu uzupełnione
                </Typography>
              </View>
              <Button
                variant='text'
                style={styles.EditButton}
                onPress={() => goToAddPersonsContactScreen()}
              >
                <Typography variant='h5' weight='Bold' style={styles.EditButtonText} >
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
        {companyData.description ?
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

              <Typography
                numberOfLines={descriptionExpanded ? undefined : 3}
                color={Colors.Basic600}
                onLayout={handleDescriptionLayout}
              >
                {companyData.description}
              </Typography>
              
              {((!descriptionExpanded && descriptionHeight > 56) || descriptionExpanded && descriptionHeight !== 57) &&
                <Button
                  variant='text'
                  onPress={() => setDescriptionExpanded(prev => !prev)}
                >

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgIcon icon={descriptionExpanded ? "arrowTop" : "arrowBottom"} fill={Colors.Basic500} />
                    {/* <Typography>
                    Zobacz cały opis
                  </Typography> */}
                  </View>
                </Button>
              }
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
          </Typography>
        </View>
        <MediaSelector
          type='image'
          multiple
          selectionLimit={companyPhotosLimit}
          initialSelected={companyPhotos as any}
          imageSettings={{
            compressionProgress: (progress) => (Math.round(progress * 100)) === 100 ? setPhotosProgress(null) : setPhotosProgress(progress),
          }}
          callback={(images) => setCompanyPhotos(handleMultipleFiles(images))}
          render={(onPress) =>
            <>
              {!!photosProgress && photosProgress < 100 ?
                <View style={styles.LoadingImages}>
                  <Typography size={16} weight='SemiBold' style={styles.LoadingImagesText}>
                    Ładowanie zdjęć: {Math.round(photosProgress * 100)}%
                  </Typography>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[Math.round(photosProgress * 100)]}
                  >
                    <Slider.Track>
                      <Slider.TrackActive />
                    </Slider.Track>
                  </Slider>
                </View>

                :

                !!companyPhotos.length ?
                  <View style={styles.LoadedImages}>
                    <View style={styles.LoadedImagesButtons}>
                      <TouchableOpacity
                        style={styles.LoadedImagesButton}
                        onPress={() => setCompanyPhotos([])}
                      >
                        <Typography variant='h5' weight="Bold" style={styles.DeleteImagesButton}>
                          Usuń wszystkie
                        </Typography>
                      </TouchableOpacity>
                      {(companyPhotos.length < companyPhotosLimit) &&
                        <TouchableOpacity
                          style={styles.LoadedImagesButton}
                          onPress={() => onPress()}
                        >
                          <Typography variant='h5' weight="Bold" style={styles.AddMoreImages}>
                            Dodaj kolejne
                          </Typography>
                        </TouchableOpacity>
                      }
                    </View>
                    <View style={styles.DraggableImagesContainer}>
                      <DraggableList
                        horizontal
                        data={companyPhotos}
                        onDragEnd={({ data }) => setCompanyPhotos(data)}
                        keyExtractor={({ path }) => path}
                        renderItem={(props: RenderItemParams<MediaType>) => renderScrollPhotoItem({ ...props, mode: 'photos' })}
                        contentContainerStyle={styles.DraggableImagesContent}
                        style={styles.DraggableImages}
                      />
                    </View>
                  </View>

                  :

                  <TouchableOpacity
                    onPress={() => onPress()}
                    style={styles.ImageLoader}
                  >
                    <View style={[styles.ImageLoaderContent, { height: 118 }]}>
                      <View style={styles.ImagesAmountLabel}>
                        <View style={styles.ImagesAmountLabelTextContainer}>
                          <Typography variant='h5' weight='SemiBold' style={styles.ImagesAmountLabelText}>
                            Dodaj do 20 zdjęć
                          </Typography>
                        </View>
                      </View>
                      <View style={styles.AddImageText}>
                        <SvgIcon icon="createCircleSmall" />
                        <Typography variant="h5" weight='Bold'>
                          {'  '}Dodaj zdjęcia
                        </Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
              }
            </>
          }
        />
        <View style={{ marginLeft: 19, marginBottom: 5 }}>
          <Typography weight="Bold" variant="h5">
            Certyfikaty{' '}
          </Typography>
        </View>
        <MediaSelector
          type='image'
          multiple
          selectionLimit={companyCertificatesLimit}
          initialSelected={companyCertificates as any}
          imageSettings={{
            compressionProgress: (progress) => (Math.round(progress * 100)) === 100 ? setCertificatesProgress(null) : setCertificatesProgress(progress),
          }}
          callback={(images) => setCompanyCertificates(handleMultipleFiles(images))}
          render={(onPress) =>
            <>
              {(!!certificatesProgress && (certificatesProgress < 100)) ?

                <View style={styles.LoadingImages}>
                  <Typography size={16} weight='SemiBold' style={styles.LoadingImagesText}>
                    Ładowanie zdjęć: {Math.round(certificatesProgress * 100)}%
                  </Typography>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[Math.round(certificatesProgress * 100)]}
                  >
                    <Slider.Track>
                      <Slider.TrackActive />
                    </Slider.Track>
                  </Slider>
                </View>

                :

                !!companyCertificates.length ?
                  <View style={styles.LoadedImages}>
                    <View style={styles.LoadedImagesButtons}>
                      <TouchableOpacity
                        style={styles.LoadedImagesButton}
                        onPress={() => setCompanyCertificates([])}
                      >
                        <Typography variant='h5' weight="Bold" style={styles.DeleteImagesButton}>
                          Usuń wszystkie
                        </Typography>
                      </TouchableOpacity>
                      {(companyCertificates.length < companyCertificatesLimit) &&
                        <TouchableOpacity
                          style={styles.LoadedImagesButton}
                          onPress={() => onPress()}
                        >
                          <Typography variant='h5' weight="Bold" style={styles.AddMoreImages}>
                            Dodaj kolejne
                          </Typography>
                        </TouchableOpacity>
                      }
                    </View>
                    <View style={styles.DraggableImagesContainer}>
                      <DraggableList
                        horizontal
                        data={companyCertificates}
                        onDragEnd={({ data }) => setCompanyCertificates(data)}
                        keyExtractor={({ path }) => path}
                        renderItem={(props: RenderItemParams<MediaType>) => renderScrollPhotoItem({ ...props, mode: 'photos' })}
                        contentContainerStyle={styles.DraggableImagesContent}
                        style={styles.DraggableImages}
                      />
                    </View>
                  </View>

                  :

                  <TouchableOpacity
                    onPress={() => onPress()}
                    style={styles.ImageLoader}
                  >
                    <View style={[styles.ImageLoaderContent, { height: 118 }]}>
                      <View style={styles.ImagesAmountLabel}>
                        <View style={styles.ImagesAmountLabelTextContainer}>
                          <Typography variant='h5' weight='SemiBold' style={styles.ImagesAmountLabelText}>
                            Dodaj do 20 zdjęć
                          </Typography>
                        </View>
                      </View>
                      <View style={styles.AddImageText}>
                        <SvgIcon icon="createCircleSmall" />
                        <Typography variant="h5" weight='Bold'>
                          {'  '}Dodaj zdjęcia
                        </Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
              }
            </>
          }
        />
        <Separator marginTop={16} />
        <View style={styles.CompanyAmountTitle}>
          <Typography weight="Bold" variant="h5">
            Liczba pracowników{' '}
          </Typography>
        </View>
        <View style={styles.CompanyAmount}>
          <View style={styles.CompanyAmountLabel}>
            <Typography style={styles.CompanyAmountLabelText} variant='h5' weight='SemiBold'>
              od
            </Typography>
            <TextField
              placeholder='10'
              placeholderTextColor={Colors.Basic600}
              containerStyles={styles.CompanyAmountTextField}
              height={44}
              keyboardType='decimal-pad'
              value={companyData.employees_amount?.split('-')[0]}
              onChangeText={(number) => setCompanyData(prev => ({ ...prev, employees_amount: `${number.replace(/^0/, '').replace(/[^0-9]/g, '')}-${prev.employees_amount?.split('-')[1]}` }))}
            />
          </View>
          <View style={{ justifyContent: 'center', height: 44, alignSelf: 'flex-end' }}>
            <Typography weight='Bold' variant='h4' color={Colors.Basic500}>
              {'  -  '}
            </Typography>
          </View>
          <View style={styles.CompanyAmountLabel}>
            <Typography style={styles.CompanyAmountLabelText} variant='h5' weight='SemiBold'>
              do
            </Typography>
            <TextField
              placeholder='70'
              placeholderTextColor={Colors.Basic600}
              containerStyles={styles.CompanyAmountTextField}
              height={44}
              keyboardType='decimal-pad'
              value={companyData.employees_amount?.split('-')[1]}
              onChangeText={(number) => setCompanyData(prev => ({ ...prev, employees_amount: `${prev.employees_amount?.split('-')[0]}-${number.replace(/^0/, '').replace(/[^0-9]/g, '')}` }))}
            />
          </View>
        </View>
        <Separator marginTop={16} />
        <View style={styles.SquareFootageTitle}>
          <Typography weight="Bold" variant="h5">
            Metraż miejsca pracy{' '}
          </Typography>
        </View>
        <View style={styles.SquareFootage}>
          <TextField
            placeholder='70'
            placeholderTextColor={Colors.Basic600}
            containerStyles={styles.SquareFootageTextField}
            height={44}
            keyboardType='decimal-pad'
            right={<Typography>m²</Typography>}
            value={companyData.square_footage || ''}
            onChangeText={(text) => changeCompanyDataHandler('square_footage', text.replace(/^0/, '').replace(/[^0-9]/g, ''))}
          />
        </View>
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
  CompanyName: {
    marginHorizontal: 19,
    marginBottom: 30,
  },
  CompanyLogoTitle: {
    marginHorizontal: 19,
    marginBottom: 5,
  },
  CompanyLogo: {
    marginBottom: 24
  },
  LoadedLogoContainer: {
    alignItems: 'center',
    backgroundColor: Colors.Basic300,
    marginHorizontal: 19,
    padding: 19,
    borderRadius: 4,
  },
  LoadedLogo: {
    aspectRatio: 1 / 1,
    width: '100%',
    maxWidth: 400,
    borderRadius: 4,
  },
  LoadingImages: {
    height: 118,
    padding: 20,
    backgroundColor: Colors.Basic300,
    marginHorizontal: 19,
    borderRadius: 4,
    marginBottom: 24,
    justifyContent: 'center'
  },
  LoadingImagesText: {
    color: Colors.Basic600,
    textAlign: 'center',
  },
  LoadedImages: {
    backgroundColor: Colors.Basic300,
    marginBottom: 24,
    marginHorizontal: 19,
    borderRadius: 4
  },
  LoadedImagesButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
  },
  LoadedImagesButton: {
    padding: 10,
    marginVertical: 10,
  },
  DeleteImagesButton: {
    color: Colors.Basic600,
    textDecorationLine: 'underline',
  },
  AddMoreImages: {
    color: Colors.Blue500,
    textDecorationLine: 'underline',
  },
  DraggableImagesContainer: {
    height: 105,
    flexDirection: 'row'
  },
  DraggableImagesContent: {
    paddingLeft: 19, paddingVertical: 10
  },
  DraggableImages: {
    flex: 1
  },
  DraggableItem: {
    marginRight: 19, position: 'relative',
  },
  DraggableItemDeleteButton: {
    position: 'absolute',
    top: -17,
    right: -17,
    zIndex: 1,
  },
  DraggableItemOrderNumber: {
    position: 'absolute',
    top: -6,
    left: -5,
    zIndex: 1,
    backgroundColor: Colors.White,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  DraggableItemImage: {
    width: 80,
    height: 80,
    borderRadius: 7,
  },
  ImageLoader: {
    marginBottom: 24,
  },
  ImageLoaderContent: {
    backgroundColor: Colors.Basic300,
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 19,
    padding: 14,
  },
  ImagesAmountLabel: {
    position: 'absolute',
    left: 16,
    top: 13,
  },
  ImagesAmountLabelTextContainer: {
    flex: 1,
  },
  ImagesAmountLabelText: {
    color: Colors.Basic600,
  },
  AddImageText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  CompanyAmountTitle: {
    marginHorizontal: 19,
    marginBottom: 5,
    marginTop: 30,
  },
  CompanyAmount: {
    marginHorizontal: 19, flexDirection: 'row', alignItems: 'center'
  },
  CompanyAmountLabel: {
    width: '35%',
  },
  CompanyAmountLabelText: {
    marginBottom: 5,
    colors: Colors.Basic600,
  },
  CompanyAmountTextField: {
    maxWidth: 200,
    backgroundColor: Colors.Basic300,
    borderRadius: 4,
    paddingHorizontal: 16
  },
  SquareFootageTitle: {
    marginHorizontal: 19,
    marginBottom: 16,
    marginTop: 24
  },
  SquareFootage: {
    marginHorizontal: 19,
    marginBottom: 16
  },
  SquareFootageTextField: {
    width: '40%',
    maxWidth: 200,
    backgroundColor: Colors.Basic300,
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  JobIndustry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  JobIndustryIcon: {
    width: 34,
    height: 34,
    position: 'relative',
  },
  JobIndustryIconSkeleton: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  SelectedItemsContainer: {
    paddingHorizontal: 19
  },
  SelectedItemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SelectedItems: {
    color: Colors.Basic600,
  },
  EditButton: {
    width: 'auto',
    padding: 0,
  },
  EditButtonText: {
    color: Colors.Blue500
  },
  ContactPersonsFilled: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
    height: 58,
  },
  ContactPersonsFilledTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
