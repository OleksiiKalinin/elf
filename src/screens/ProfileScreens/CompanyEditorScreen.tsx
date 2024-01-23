import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, { Fragment, useCallback, useEffect, useState, useRef, useMemo, useLayoutEffect } from 'react';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AddressType, CompanyDataType, MediaType, ContactPersonType, LanguageType } from '../../store/reducers/types';
import { RenderItemParams } from 'react-native-draggable-flatlist';
import companyServices from '../../services/companyServices';
import { isArray, isNumber } from 'lodash';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { Skeleton, SkeletonContainer } from 'react-native-skeleton-component';
import MediaSelector, { MediaFileType } from '../../components/organismes/MediaSelector';
import Slider from '../../components/atoms/Slider';
import useRouter from '../../hooks/useRouter';
import SvgUriImage from '../../components/atoms/SvgUriImage';
import MapPreview from '../../components/molecules/MapPreview';
import { Separator } from 'tamagui';
import DraggableList from '../../components/organismes/DraggableList';
import Modal from '../../components/atoms/Modal';
import { Snackbar } from 'react-native-paper';
import { Gift, Check } from '@tamagui/lucide-icons'


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

const employeesAmount: LanguageType[] = [
  {
    id: 1,
    name: '1 - 5',
  },
  {
    id: 2,
    name: '5 - 20',
  },
  {
    id: 3,
    name: '20 - 50',
  },
  {
    id: 4,
    name: '50 - 100',
  },
  {
    id: 5,
    name: '100 - 500',
  },
  {
    id: 6,
    name: '500 - 1000',
  },
  {
    id: 7,
    name: '1000 - 5000',
  },
  {
    id: 8,
    name: '5000+',
  },
];

const CompanyEditorScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { jobIndustries, token, userCompany } = useTypedSelector(state => state.general);
  const [companyData, setCompanyData] = useState<CompanyDataType>(userCompany || {
    id: -1,
    job_industry: null,
    name: null,
    registration_name: null,
    nip: null,
    registration_address: null,
    address: null,
    description: null,
    employees_amount: null,
    square_footage: null,
    contactPersons: [],
    website: null,
    account_facebook: null,
    account_instagram: null,
    account_linkedIn: null,
    languages: null,
    services: null,
  });
  const [contactPersons, setContactPersons] = useState<ContactPersonType[]>(companyData.contactPersons || []);
  const [companyLogo, setCompanyLogo] = useState<MediaType | null>(userCompany?.logo || null);
  const [companyPhotos, setCompanyPhotos] = useState<MediaType[]>(userCompany?.photos || []);
  const [companyCertificates, setCompanyCertificates] = useState<MediaType[]>(userCompany?.certificates || []);
  const [logoProgress, setLogoProgress] = useState<number | null>(null);
  const [photosProgress, setPhotosProgress] = useState<number | null>(null);
  const [certificatesProgress, setCertificatesProgress] = useState<number | null>(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [showTips, setShowTips] = useState<boolean>(false);

  const router = useRouter();
  const { replace } = useRouter();
  const companyPhotosLimit = 20;
  const companyCertificatesLimit = 20;

  useEffect(() => {
    console.log(companyData)
  }, [companyData])

  useLayoutEffect(() => {
    if (userCompany) {
      setEditMode(true);
      setCompanyData(userCompany);
      setCompanyLogo(userCompany?.logo || null);
      setCompanyPhotos(userCompany?.photos || []);
      setCompanyCertificates(userCompany?.certificates || []);
      setContactPersons(userCompany?.contactPersons || []);
    };
    const timer = setTimeout(() => {
      if (!token) {
        goToAuthScreen();
      };
    }, 1000);
    return () => clearTimeout(timer);
  }, [userCompany, token]);

  const validateData = () => {
    const { name, logo, address, job_industry, services, contactPersons, description, registration_name, registration_address, nip, employees_amount, square_footage } = companyData;
    if (
      !(
        !isNumber(logoProgress)
        && !isNumber(photosProgress)
        && !isNumber(certificatesProgress)
      )
    ) {
      setError('Trwa ładowanie zdjęć');
      return false;
    } else if (
      !(
        (name && name.length > 2 && name.length <= 100)
        // && address
        // && isNumber(job_industry)
        // && services
        // && contactPersons.lenght
        // && description
      )
    ) {
      setError('Wypełnij wszystkie obowiązkowe pola z gwiazdką!');
      return false;
    } else if (
      !(
        ((square_footage && square_footage.length <= 8) || null)
        && (isNumber(employees_amount) || null)
      )
    ) {
      setError('Wypełnij poprawnie dodatkowe pola lub pozostaw je puste');
      return false;
    } else {
      return true;
    };
  };

  const submitCompanyData = async () => {
    if (validateData()) {
      setLoading(true);
      const isOk = await dispatch(companyServices[editMode ?
        'editUserCompany' :
        'createUserCompany'
      ]({
        companyData, companyLogo, companyPhotos, companyCertificates, contactPersons, oldCompanyData: userCompany || companyData
      })
      );
      setLoading(false);
      if (!!isOk) goToCompanyScreen();
    } else {
      setShowTips(true);
    }
  };

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
  };

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
  };

  const handleMultipleFiles = (files: MediaFileType[]) => {
    const newArray: MediaType[] = [];

    files.forEach((item, i) => {
      newArray.push({
        id: item.id,
        path: item.path,
        mime: item.mime,
        order: i,
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

  const updateOrder = (files: MediaType[]) => {
    const newArray: MediaType[] = [];

    files.forEach((item, i) => {
      newArray.push({
        ...item,
        order: i,
      })
    });

    console.log('update order:', newArray);

    return newArray
  };

  const selectedServices = useMemo(() => {
    return services.filter(item => companyData.services?.includes(item.id));
  }, [companyData.services, services]);

  const selectedLanguages = useMemo(() => {
    return languages.filter(item => companyData.languages?.includes(item.id));
  }, [companyData.languages, languages]);

  const selectedEmployeesAmount = useMemo(() => {
    return employeesAmount.find(item => companyData.employees_amount === item.id);
  }, [companyData.employees_amount, employeesAmount]);

  const handleDescriptionLayout = (event: { nativeEvent: { layout: { width: number; height: number; }; }; }) => {
    const { height } = event.nativeEvent.layout;
    setDescriptionHeight(height);
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
        callback: (registration_address, NIP, registration_name) => {
          changeCompanyDataHandler('registration_name', registration_name, false);
          changeCompanyDataHandler('registration_address', registration_address);
        },
        address: companyData.registration_address,
        full_name: companyData.registration_name,
        NIP: '',
        title: 'Dodaj dane do faktury'
      }
    })
  };

  const goToSelectEmployeesAmountScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        subView: 'ItemSelectorScreen',
        mode: 'single',
        list: employeesAmount,
        callback: (employeesAmount) => changeCompanyDataHandler('employees_amount', employeesAmount),
        labels: {
          searchLabel: 'Znajdź ilość pracowników',
          itemsLabel: 'Ilość pracowników',
        },
        headerProps: { title: 'Ilość pracowników' },
        initialSelected: [companyData.employees_amount as number] ?? undefined,
        allowReturnEmptyList: true,
      },
    });
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

  const goToCompanyScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyScreen',
      params: undefined,
    });
  };

  const goToAuthScreen = () => {
    replace({
      stack: 'AuthStack',
      screen: 'MainScreen'
    });
  };

  const renderScrollPhotoItem = useCallback(({ item, drag, isActive, getIndex, mode }: RenderItemParams<MediaType> & { mode: 'photos' | 'certificates' }) => {
    const index = getIndex();

    return (
      <Button
        variant='TouchableOpacity'
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
      </Button>
    );
  }, []);

  return (
    <>
      {token &&
        <ScreenHeaderProvider title={editMode ? 'Edytuj profil firmy' : 'Utwórz profil firmy'}>
          {/* <View style={{backgroundColor: Colors.White, position: Platform.select({web: 'sticky' as any}), top: 50, zIndex: 100000}}>
          <Separator />
            <View style={{flexDirection: 'row', paddingVertical: 10,}}>
            <View style={{flexDirection: 'row', flex: 1, marginLeft: 19}}>
            <View style={{flex: 1}}>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[100]}
            >
              <Slider.Track >
                <Slider.TrackActive backgroundColor={Colors.Green500}/>
              </Slider.Track>
            </Slider>
            </View>
            <View style={{width: 50, alignItems: 'center'}}>
            <Check/>
            </View>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[70]}
            >
              <Slider.Track >
                <Slider.TrackActive backgroundColor={Colors.Green500}/>
              </Slider.Track>
            </Slider>
            </View>
            <View style={{width: 50, alignItems: 'center'}}>
              <Gift color={Colors.Basic500}/>
            </View>
          </View>
            </View>
          </View> */}

          <View style={{ backgroundColor: Colors.White, position: Platform.select({ web: 'sticky' as any }), top: 50, zIndex: 100000, paddingLeft: 19 }}>
            <Separator />
            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ flexDirection: 'row', gap: 5, width: '100%', alignItems: 'center' }}>
                  {[true, true, true, true, true, true,].map(item =>
                    <View style={{ height: 4, borderRadius: 50, backgroundColor: item ? Colors.Green500 : Colors.Basic400, flex: 1 }} />
                  )}
                  <View style={{ minWidth: 50, alignItems: 'center' }}>
                    <Check />
                  </View>
                </View>

              </View>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ flexDirection: 'row', gap: 5, width: '100%', alignItems: 'center' }}>
                  {[true, true, true, false, false, false].map(item =>
                    <View style={{ height: 4, borderRadius: 50, backgroundColor: item ? Colors.Green500 : Colors.Basic400, flex: 1 }} />
                  )}
                  <View style={{ minWidth: 50, alignItems: 'center' }}>
                    <Gift color={Colors.Basic500} />
                  </View>
                </View>

              </View>
            </View>
          </View>

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
                value={companyData.name || ''}
                onChangeText={text => changeCompanyDataHandler('name', text, false)}
                {...(showTips && (!companyData.name || companyData.name?.length < 3 || companyData.name.length > 100) && {
                  bottomText: 'Nazwa firmy musi zawierać od 3 do 100 znaków',
                })}
              />
            </View>
            <View style={{ marginBottom: 24 }}>
              <MapPreview
                label='Lokalizacja*'
                place={companyData.address?.formattedAddress}
                onPress={() => router.push({
                  stack: 'ProfileStack',
                  screen: 'CompanyEditorScreen',
                  params: {
                    subView: 'GoogleMapScreen',
                    callback: (address) => changeCompanyDataHandler('address', address),
                    initialAddress: companyData.address
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
                <Typography style={{ color: Colors.Red }}>
                  *
                </Typography>
              </Button>
            }
            {contactPersons.length ?
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
                <View style={styles.FilledDescription}>
                  <View style={styles.FilledDescriptionHeader}>
                    <Typography variant='h5' weight='Bold'>
                      Opis firmy
                    </Typography>
                    <Button
                      variant='text'
                      style={styles.EditButton}
                      onPress={() => goToCompanyDescriptionScreen()}
                    >
                      <Typography variant='h5' weight='Bold' style={styles.EditButtonText}>
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

                  {((!descriptionExpanded && descriptionHeight > 53) || descriptionExpanded && descriptionHeight !== 54) &&
                    <Button
                      variant='text'
                      onPress={() => setDescriptionExpanded(prev => !prev)}
                    >

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SvgIcon icon={descriptionExpanded ? "arrowTop" : "arrowBottom"} fill={Colors.Basic500} />
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
                <Typography style={{ color: Colors.Red }}>
                  *
                </Typography>
              </Button>
            }
            {(companyData.registration_name && companyData.nip && companyData.registration_address) ?
              <>
                <View style={styles.ContactPersonsFilled}>
                  <View style={styles.ContactPersonsFilledTitle}>
                    <SvgIcon icon='doneCircleGreen' />
                    <Typography variant='h5' weight='Bold'>
                      Dane do faktury uzupełnione
                    </Typography>
                  </View>
                  <Button
                    variant='text'
                    style={styles.EditButton}
                    onPress={() => goToCompanyInvoiceScreen()}
                  >
                    <Typography variant='h5' weight='Bold' style={styles.EditButtonText}>
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
            <View style={styles.CompanyLogoTitle}>
              <Typography weight="Bold" variant="h5">
                Logo firmy{' '}
              </Typography>
              {!companyData.logo &&
                <Typography style={{ color: Colors.Red }}>
                  *
                </Typography>
              }
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
                            <Button
                              variant='TouchableOpacity'
                              style={styles.LoadedImagesButton}
                              onPress={() => setCompanyLogo(null)}
                            >
                              <Typography variant='h5' weight="Bold" style={styles.DeleteImagesButton}>
                                Usuń wybrane
                              </Typography>
                            </Button>
                            <Button
                              variant='TouchableOpacity'
                              style={styles.LoadedImagesButton}
                              onPress={() => onPress()}
                            >
                              <Typography variant='h5' weight="Bold" style={styles.AddMoreImages}>
                                Dodaj ponownie
                              </Typography>
                            </Button>
                          </View>
                          <View style={styles.LoadedLogoContainer}>
                            <Image
                              style={styles.LoadedLogo}
                              source={{ uri: companyLogo.path }}
                            />
                          </View>
                        </View>

                        :

                        <Button
                          variant='TouchableOpacity'
                          onPress={() => onPress()}
                        >
                          <View style={styles.ImageLoaderContent}>
                            <View style={styles.AddImageText}>
                              <SvgIcon icon="createCircleSmall" fill={Colors.Basic900} />
                              <Typography variant="h5" weight='Bold'>
                                {'  '}Dodaj logo
                              </Typography>
                            </View>
                          </View>
                        </Button>
                    }
                  </>
                }
              />
            </View>
            <View style={styles.ImagesTitle}>
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
                          <Button
                            variant='TouchableOpacity'
                            style={styles.LoadedImagesButton}
                            onPress={() => setCompanyPhotos([])}
                          >
                            <Typography variant='h5' weight="Bold" style={styles.DeleteImagesButton}>
                              Usuń wszystkie
                            </Typography>
                          </Button>
                          {(companyPhotos.length < companyPhotosLimit) &&
                            <Button
                              variant='TouchableOpacity'
                              style={styles.LoadedImagesButton}
                              onPress={() => onPress()}
                            >
                              <Typography variant='h5' weight="Bold" style={styles.AddMoreImages}>
                                Dodaj kolejne
                              </Typography>
                            </Button>
                          }
                        </View>
                        <View style={styles.DraggableImagesContainer}>
                          <DraggableList
                            horizontal
                            data={companyPhotos.sort((a, b) => {
                              const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
                              const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

                              return orderA - orderB;
                            })}
                            onDragEnd={({ data }) => setCompanyPhotos(updateOrder(data))}
                            keyExtractor={({ path }) => path}
                            renderItem={(props: RenderItemParams<MediaType>) => renderScrollPhotoItem({ ...props, mode: 'photos' })}
                            contentContainerStyle={styles.DraggableImagesContent}
                            style={styles.DraggableImages}
                          />
                        </View>
                      </View>

                      :

                      <Button
                        variant='TouchableOpacity'
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
                      </Button>
                  }
                </>
              }
            />
            <View style={styles.ImagesTitle}>
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
                          <Button
                            variant='TouchableOpacity'
                            style={styles.LoadedImagesButton}
                            onPress={() => setCompanyCertificates([])}
                          >
                            <Typography variant='h5' weight="Bold" style={styles.DeleteImagesButton}>
                              Usuń wszystkie
                            </Typography>
                          </Button>
                          {(companyCertificates.length < companyCertificatesLimit) &&
                            <Button
                              variant='TouchableOpacity'
                              style={styles.LoadedImagesButton}
                              onPress={() => onPress()}
                            >
                              <Typography variant='h5' weight="Bold" style={styles.AddMoreImages}>
                                Dodaj kolejne
                              </Typography>
                            </Button>
                          }
                        </View>
                        <View style={styles.DraggableImagesContainer}>
                          <DraggableList
                            horizontal
                            data={companyCertificates.sort((a, b) => {
                              const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
                              const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

                              return orderA - orderB;
                            })}
                            onDragEnd={({ data }) => setCompanyCertificates(updateOrder(data))}
                            keyExtractor={({ path }) => path}
                            renderItem={(props: RenderItemParams<MediaType>) => renderScrollPhotoItem({ ...props, mode: 'certificates' })}
                            contentContainerStyle={styles.DraggableImagesContent}
                            style={styles.DraggableImages}
                          />
                        </View>
                      </View>

                      :

                      <Button
                        variant='TouchableOpacity'
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
                      </Button>
                  }
                </>
              }
            />
            <Separator marginTop={16} />
            <View style={styles.SquareFootageTitle}>
              <Typography weight="Bold" variant="h5">
                Metraż miejsca pracy{' '}
              </Typography>
            </View>
            <View style={styles.SquareFootage}>
              <TextField
                placeholder='0'
                maxLength={5}
                placeholderTextColor={Colors.Basic600}
                containerStyles={styles.SquareFootageTextField}
                height={44}
                keyboardType='decimal-pad'
                right={<Typography>m²</Typography>}
                value={companyData.square_footage || ''}
                onChangeText={(text) => changeCompanyDataHandler('square_footage', text.replace(/^0/, '').replace(/[^0-9]/g, ''))}
              />
            </View>
            {companyData.employees_amount ?
              <>
                <View style={styles.SelectedItemsContainer}>
                  <View style={styles.SelectedItemsHeader}>
                    <Typography variant='h5' weight='Bold'>
                      Liczba pracowników
                    </Typography>
                    <Button
                      variant='text'
                      style={{ width: 'auto', padding: 0 }}
                      onPress={() => goToSelectEmployeesAmountScreen()}
                    >
                      <Typography variant='h5' weight='Bold' style={styles.EditButtonText}>
                        Edytuj
                      </Typography>
                    </Button>
                  </View>
                  <Typography style={styles.SelectedItems}>
                    {selectedEmployeesAmount?.name}
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
                onPress={() => goToSelectEmployeesAmountScreen()}
              >
                <Typography variant='h5'>
                  Liczba pracowników
                </Typography>
              </Button>
            }
            {companyData.languages ?
              <>
                <View style={styles.SelectedItemsContainer}>
                  <View style={styles.SelectedItemsHeader}>
                    <Typography variant='h5' weight='Bold'>
                      Preferowane języki w komunikacji
                    </Typography>
                    <Button
                      variant='text'
                      style={{ width: 'auto', padding: 0 }}
                      onPress={() => goToSelectLanguagesScreen()}
                    >
                      <Typography variant='h5' weight='Bold' style={styles.EditButtonText}>
                        Edytuj
                      </Typography>
                    </Button>
                  </View>
                  <Typography style={styles.SelectedItems}>
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

              <View style={styles.UnfilledSocialMedia}>
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
            onPress={() => submitCompanyData()}
          >
            {editMode ? 'Zaktualizuj' : 'Utwórz'}
          </Button>
          {/* <Modal
            transparent={true}
            visible={!!errorModal}
            onClose={() => setErrorModal(null)}
          >
            <View style={styles.ErrorModalContainer}>
              <View style={styles.ErrorModalContent}>
                <Typography>
                  {errorModal}
                </Typography>
                <Button
                  style={{ height: 30 }}
                  variant='text'
                  onPress={() => setErrorModal(null)}
                >
                  Ok
                </Button>
              </View>
            </View>
          </Modal> */}
          <Snackbar
            visible={!!error}
            onDismiss={() => setError(null)}
            duration={4000}
            wrapperStyle={{
              maxWidth: 768,
              alignItems: 'center',
              position: Platform.OS === 'web' ? 'fixed' : 'absolute',
            }}
            style={{
              backgroundColor: Colors.Danger,
              maxWidth: 500,
            }}
          >
            {error}
          </Snackbar>
        </ScreenHeaderProvider>
      }
    </>
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
    flexDirection: 'row',
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
    maxWidth: 200
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
    marginBottom: 16,
  },
  SquareFootageTextField: {
    width: '35%',
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
  FilledDescription: {
    paddingHorizontal: 19
  },
  FilledDescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ImagesTitle: {
    marginHorizontal: 19,
    marginBottom: 5,
  },
  TextFieldHyper: {
    justifyContent: 'center',
    height: 44,
    alignSelf: 'flex-end',
    width: 30,
    alignItems: 'center',
  },
  SectionHeader: {
    paddingHorizontal: 19,
    marginBottom: 30,
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
  UnfilledSocialMedia: {
    paddingBottom: 60
  },
  ErrorModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  ErrorModalContent: {
    width: 300,
    backgroundColor: Colors.White,
    borderRadius: 4,
    padding: 20,
    justifyContent: 'space-between',
    gap: 20,
  },
});

export default CompanyEditorScreen;
