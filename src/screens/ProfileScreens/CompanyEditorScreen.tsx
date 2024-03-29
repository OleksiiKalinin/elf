import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, { Fragment, useCallback, useEffect, useState, useMemo, useLayoutEffect } from 'react';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AddressType, CompanyDataType, MediaType, ContactPersonType, CompanyRegistrationDataType, OtherCompanyLocationType } from '../../store/reducers/types';
import { RenderItemParams } from 'react-native-draggable-flatlist';
import companyServices from '../../services/companyServices';
import { isArray, isEqual, isNumber, uniqueId } from 'lodash';
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
import { useActions } from '../../hooks/useActions';
import FormProgressBar, { FormFieldType } from '../../components/organismes/FormProgressBar';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { createParam } from 'solito';
import { Linkedin, Pencil, PlusCircle, Trash2 } from '@tamagui/lucide-icons';
import FieldStatusCircle from '../../components/atoms/FieldStatusCircle';
import { uuidv4 } from 'react-native-compressor';
import Popover from '../../components/molecules/Popover';

const emptyCompanyData = {
  id: -1,
  job_industry: null,
  name: null,
  nip_info: null,
  address: null,
  description: null,
  employees_amount: null,
  square_footage: null,
  contactPersons: [],
  website: null,
  account_facebook: null,
  account_instagram: null,
  account_linkedIn: null,
  languages: [],
  services: [],
  logo: null,
  photos: [],
  certificates: [],
  is_active: false,
  other_locations: [],
};

const { useParam } = createParam<NonNullable<ProfileStackParamList['default']['CompanyEditorScreen']>>();

const CompanyEditorScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { setSnackbarMessage, setBlockedScreen, setShowDraftFormModal, setSwipeablePanelProps } = useActions();
  const [subView] = useParam('subView');
  const { backToRemoveParams } = useRouter();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { jobIndustries, userCompany, languages, services, employeesAmount, windowSizes } = useTypedSelector(state => state.general);
  const [companyData, setCompanyData] = useState<CompanyDataType>(userCompany || emptyCompanyData);
  const [oldCompanyData, setOldCompanyData] = useState<CompanyDataType>(userCompany || emptyCompanyData);
  const [logoProgress, setLogoProgress] = useState<number | null>(null);
  const [photosProgress, setPhotosProgress] = useState<number | null>(null);
  const [certificatesProgress, setCertificatesProgress] = useState<number | null>(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [mode, setMode] = useState<'draft' | 'edit' | 'new'>('new');
  const [fields, setFields] = useState<FormFieldType[]>([]);
  const [unsavedData, setUnsavedData] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<'toSaveDraft' | 'toCreateCompany' | false>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [formSent, setFormSent] = useState<boolean>(false);
  const [deleteSubView, setDeleteSubView] = useState<{ name: keyof CompanyDataType | 'social_media', value: any, text: string } | null>(null);
  const { name, address, job_industry, description, nip_info, employees_amount, square_footage, account_instagram, account_facebook, account_linkedIn, website, logo, photos, certificates, contactPersons, other_locations } = companyData;

  const companyPhotosLimit = 20;
  const companyCertificatesLimit = 20;
  const squareFootageIndustries = [2, 3, 5];

  useEffect(() => {
    if (userCompany && !formSent) {
      const newUserCompany = { ...userCompany, photos: userCompany.photos?.length ? companyData.photos : [], certificates: userCompany.certificates?.length ? userCompany.certificates : [] };
      setCompanyData(newUserCompany);
      setOldCompanyData(newUserCompany);
      console.log(newUserCompany);
      if (userCompany.is_active) {
        setMode('edit');
      } else {
        setMode('draft');
      };
    };
  }, [userCompany, formSent]);

  useEffect(() => {
    if (mode === 'draft' && !unsavedData && !formSent) {
      setShowDraftFormModal({
        type: 'info',
        textInfo: 'Wypełnij obowiązkowe pola aby dokończyć proces zakładania profilu firmy.'
      });
    };
  }, [mode, unsavedData]);

  useEffect(() => {
    const fields: FormFieldType[] = [
      { name: 'name', value: name, isValid: !!(name && name.length > 2 && name.length <= 100), required: true },
      { name: 'address', value: address, isValid: !!address, required: true },
      { name: 'job_industry', value: job_industry, isValid: !!job_industry, required: true },
      { name: 'services', value: services, isValid: !!companyData.services?.length, required: true },
      { name: 'contactPersons', value: contactPersons, isValid: (!!contactPersons && !!contactPersons.length), required: true },
      { name: 'description', value: description, isValid: !!description, required: true },
      { name: 'nip_info', value: nip_info, isValid: !!nip_info },
      { name: 'logo', value: logo, isValid: !!logo },
      { name: 'photos', value: photos, isValid: !!photos?.length },
      { name: 'certificates', value: certificates, isValid: !!certificates?.length },
      { name: 'employees_amount', value: employees_amount, isValid: !!employees_amount },
      { name: 'languages', value: languages, isValid: !!companyData.languages?.length },
      { name: 'socialMedia', value: !!(account_instagram || account_facebook || account_linkedIn || website) ?? null, isValid: !!(account_instagram || account_facebook || account_linkedIn || website) },
      { name: 'other_locations', value: other_locations, isValid: !!(!!other_locations && other_locations.length), unpromoted: true },
    ];

    const squareFootage = { name: 'square_footage', value: square_footage, isValid: !!(square_footage && square_footage.length && square_footage.length <= 8) };

    console.log(fields);

    if (job_industry && squareFootageIndustries.includes(job_industry)) {
      setFields([...fields, squareFootage]);
    } else {
      setFields(fields);
    };
  }, [companyData]);

  useEffect(() => {
    if (!!other_locations && other_locations.length) {
      const validOtherLocations = () => {
        if (!contactPersons || (contactPersons && !contactPersons.length)) {
          return false
        };

        let isValid = true;

        other_locations.forEach(location => {
          location.tempContactPersons.forEach(tempId => {
            if (!contactPersons.some(person => person.tempId === tempId)) {
              isValid = false;
            }
          });
        });

        return isValid;
      };

      const index = fields.findIndex(field => field.name === 'other_locations');
      if (index !== -1) {
        setFields(prevFields => {
          const updatedFields = [...prevFields];
          updatedFields[index] = { ...updatedFields[index], isValid: validOtherLocations() };
          return updatedFields;
        });
      };
    };
  }, [contactPersons, other_locations])

  useEffect(() => {
    setUnsavedData(!isEqual(oldCompanyData, companyData));
  }, [oldCompanyData, companyData]);

  useEffect(() => {
    setBlockedScreen({ blockedExit: unsavedData, blockedBack: unsavedData });
  }, [unsavedData, subView]);

  useEffect(() => {
    if (validateDataToCreateCompany()) {
      setIsValid('toCreateCompany');
      setIsActive(true);
    } else if (validateDataToCreateDraft() && !companyData.is_active) {
      setIsValid('toSaveDraft');
      setIsActive(false);
    } else {
      setIsValid(false);
      setIsActive(false);
    };
  }, [fields]);

  useEffect(() => {
    if (subView === undefined) {
      setDeleteSubView(null);
    };
  }, [subView]);

  useEffect(() => {
    if (!!deleteSubView) {
      router.push({
        stack: 'ProfileStack',
        screen: 'CompanyEditorScreen',
        params: { subView: 'options' }
      });
    }
  }, [deleteSubView]);

  useEffect(() => {
    if (!!deleteSubView) {
      setSwipeablePanelProps((() => {
        if (subView === 'options') return {
          title: deleteSubView.text,
          closeButton: true,
          buttons: [
            {
              children: 'TAK',
              contentColor: Colors.Danger,
              onPress: () => {
                if (deleteSubView.name === 'social_media') {
                  setCompanyData({ ...companyData, account_instagram: null, account_facebook: null, account_linkedIn: null, website: null });
                } else {
                  changeCompanyDataHandler(deleteSubView.name, deleteSubView.value, false);
                }
                setDeleteSubView(null);
              },
              closeAction: 'props-null',
            },
          ]
        }
        return null;
      })());
    };
  }, [deleteSubView, subView]);

  const isFieldValid = (fieldName: keyof typeof companyData) => {
    const fieldIndex = fields.findIndex(item => item.name === fieldName);
    return fieldIndex !== -1 && fields[fieldIndex].isValid;
  };

  const validateDataToCreateDraft = () => {
    if (!fields.every(item => item.isValid || (item.value === null || [])) || !fields.some(item => item.isValid)) {
      return false;
    } else {
      return true;
    };
  };

  const validateDataToCreateCompany = () => {
    if (!fields.filter(field => field.required).every(item => item.isValid)) {
      return false;
    } else {
      return true;
    };
  };

  const submitCompanyData = () => {
    if (
      !(
        !isNumber(logoProgress)
        && !isNumber(photosProgress)
        && !isNumber(certificatesProgress)
      )
    ) {
      setSnackbarMessage({ type: 'error', text: 'Trwa ładowanie zdjęć' });
    } else {
      if (isValid === 'toCreateCompany') {
        saveForm();
      } else if (isValid === 'toSaveDraft') {
        setShowDraftFormModal({
          type: 'saveDraft',
          saveDraftCallback: () => saveForm()
        });
        setShowTips(true);
      } else {
        if (companyData.is_active) {
          setSnackbarMessage({ type: 'error', text: 'Wypełnij wszystkie wymagane pola' });
        } else {
          setSnackbarMessage({ type: 'error', text: 'Wypełnij poprawnie pola' });
        };
        setShowTips(true);
      };
    };
  };

  const saveForm = async () => {
    const newCompanyData = { ...companyData, is_active: isActive };
    setLoading(true);
    const isOk = await dispatch(companyServices[companyData.id !== -1 ?
      'editUserCompany' :
      'createUserCompany'
    ]({
      companyData: newCompanyData, companyLogo: companyData.logo ? companyData.logo : null, companyPhotos: companyData.photos?.length ? companyData.photos : [], companyCertificates: companyData.certificates?.length ? companyData.certificates : [], contactPersons: companyData.contactPersons, oldCompanyData: oldCompanyData, companyOtherLocations: other_locations?.length ? other_locations : [],
    })
    );
    setLoading(false);
    if (!!isOk) {
      setFormSent(true);
      setShowDraftFormModal(null);
      setBlockedScreen({ blockedBack: false, blockedExit: false });
      if (isValid === 'toCreateCompany' && (mode === 'new' || mode === 'draft')) {
        setSnackbarMessage({ type: 'success', text: 'Utworzono profil' });
        goToCompanyScreen();
      } else if (isValid === 'toSaveDraft') {
        setSnackbarMessage({ type: 'success', text: 'Zapisano wersję roboczą' });
        goToNoCompanyScreen();
      } else if (isValid === 'toCreateCompany' && mode === 'edit') {
        setSnackbarMessage({ type: 'success', text: 'Zaktualizowano profil' });
        goToCompanyScreen();
      };
    };
  };

  const changeCompanyDataHandler = (name: keyof CompanyDataType, value: string | number | number[] | AddressType | CompanyRegistrationDataType | MediaType | MediaType[] | ContactPersonType[] | OtherCompanyLocationType[] | null, replaceSpaces: boolean = true) => {
    setCompanyData(prev => ({
      ...prev,
      [name]: value ?
        (typeof value === 'string') && replaceSpaces ?
          value.replace(/\s/g, '')
          :
          !isArray(value) ? value : value.length === 0 ? companyData.id === -1 ? null : [] : value

        :

        null
    }));

    if (subView === 'options') {
      backToRemoveParams();
    };
  };

  const deletePhotoHandler = (index: number, mode: 'photos' | 'certificates') => {
    const images = companyData[mode];
    let newImages: MediaType[] = [];

    if (!!images?.length) {
      if (images[index]) {
        if (images.length > 1) {
          newImages = [
            ...images.slice(0, index),
            ...images.slice(index + 1)
          ];
        };
      } else {
        newImages = images;
      };
    };

    changeCompanyDataHandler(mode, updateOrder(newImages), false);
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
      id: Number(uniqueId()),
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

    return newArray
  };

  const selectedServices = useMemo(() => {
    return services.filter(item => companyData.services?.includes(item.id));
  }, [companyData.services, services]);

  const selectedLanguages = useMemo(() => {
    return languages.filter(item => companyData.languages?.includes(item.id));
  }, [companyData.languages, languages]);

  const selectedEmployeesAmount = useMemo(() => {
    return employeesAmount.find(item => employees_amount === item.id);
  }, [employees_amount, employeesAmount]);

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
        mode: 'edit',
        initialContactPersons: contactPersons,
        contactPersonsCallback: (contactPersons) => changeCompanyDataHandler('contactPersons', contactPersons, false),
      },
    });
  };

  const goToCompanyDescriptionScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        subView: 'FullscreenTextFieldScreen',
        callback: (value) => changeCompanyDataHandler('description', value, false),
        value: description,
        inputPlaceholder: 'Opis firmy',
        headerProviderProps: {
          title: 'Dodaj opis firmy',
          otherActions: (
            <Popover
              hideBlur
              placement='left-start'
              triggerComponent={(open) => (
                <Button
                  variant='text'
                  circular
                  icon={<SvgIcon icon="threeDots" />}
                  onPress={open}
                />
              )}
              contentContainerStyle={{ width: windowSizes.width * 0.85, maxWidth: 500, marginTop: 60, backgroundColor: Colors.White }}
            >
              <View style={{ padding: 19, }}>
                <Typography variant='h5' weight='Bold'>
                  Przykładowy opis
                </Typography>
                <Typography style={{ marginTop: 20 }}>
                  Prowadzimy kameralną restaurację w centrum Wrocławia, w której serwujemy oryginalne dania kuchni włoskiej. Przyrządzając je wyłącznie z wysokiej jakości składników, pozwalamy naszym klientom odkrywać wyjątkowe smaki Półwyspu Apenińskiego.
                </Typography>
                <Typography style={{ marginTop: 20 }}>
                  Zatrudniamy 12 wykwalifikowanych pracowników, którzy dbają nie tylko o profesjonalną obsługę, lecz również odpowiednią atmosferę. Oferujemy usługi cateringowe, umożliwiając zamawianie jedzenia za pomocą najpopularniejszych aplikacji kurierskich.
                </Typography>
              </View>
            </Popover>
          )
        }
      },
    });
  };

  const goToCompanyInvoiceScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        subView: 'CompanyInvoiceScreen',
        callback: (data) => changeCompanyDataHandler('nip_info', data, false),
        initialData: nip_info
      }
    });
  };

  const goToAddOtherCompanyLocationsScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'CompanyEditorScreen',
      params: {
        mode: 'edit',
        subView: 'AddOtherCompanyLocationsScreen',
        initialLocations: other_locations || [],
        contactPersons: contactPersons || [],
        locationsCallback: (locations) => changeCompanyDataHandler('other_locations', locations, false),
        contactPersonsCallback: (contactPersons) => changeCompanyDataHandler('contactPersons', contactPersons, false),
      },
    });
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
        initialSelected: [employees_amount as number] ?? undefined,
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
        callback: (languages) => languages.length ? changeCompanyDataHandler('languages', languages) : setCompanyData(prev => ({ ...prev, languages: [] })),
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
          facebook: account_facebook,
          instagram: account_instagram,
          linkedIn: account_linkedIn,
          website: website,
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

  const goToNoCompanyScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'NoCompanyScreen',
      params: undefined,
    });
  };

  const renderScrollPhotoItem = useCallback(({ item, drag, isActive, getIndex, mode }: RenderItemParams<MediaType> & { mode: 'photos' | 'certificates' }) => {
    const index = getIndex();

    return (
      <View style={[styles.DraggableItem, { opacity: isActive ? .5 : 1 }]}>
        <Button
          variant='TouchableOpacity'
          onLongPress={drag}
          style={{ cursor: 'grab' }}
        >
          <Image style={styles.DraggableItemImage} source={{ uri: item.path }} />
        </Button>
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
      </View>
    );
  }, [photos, certificates]);

  return (
    <ScreenHeaderProvider
      title={mode === 'new' ? 'Utwórz profil firmy' : mode === 'edit' ? 'Edytuj profil firmy' : 'Utwórz profil firmy (wersja robocza)'}
      backgroundContent={Colors.Basic100}
    >
      <FormProgressBar
        fields={fields}
        giftInfoText={{
          requiredFields: 'Uzupełnij podstawowe pola, aby zakończyć proces tworzenia profilu firmy.',
          optionalFields: 'Uzupełnij dodatkowe pola, aby otrzymać prezent w postaci możliwości dodania darmowego ogłoszenia.',
        }}
      />
      <ScrollView style={styles.Content} contentContainerStyle={{ paddingTop: 20 }}>
        <Typography
          size={20}
          weight='Bold'
          style={[styles.SectionHeader, { marginTop: 15 }]}
        >
          Podstawowe
        </Typography>
        <View style={styles.CompanyName}>
          <FieldStatusCircle
            status={isFieldValid('name')}
            warning={showTips && !isFieldValid('name')}
            style={{ transform: Platform.OS !== 'web' ? [{ translateX: 0 }, { translateY: (showTips && !isFieldValid('name')) ? -16 : 0 }] : `translateY(${(showTips && !isFieldValid('name')) ? '-16px' : 0})` }}
          />
          <View style={{ flex: 1 }}>
            <TextField
              label="Nazwa firmy*"
              value={name || ''}
              maxLength={100}
              onChangeText={text => changeCompanyDataHandler('name', text, false)}
              {...(showTips && !isFieldValid('name') && {
                bottomText: 'Nazwa firmy musi zawierać od 3 do 100 znaków',
              })}
            />
          </View>
        </View>
        <View style={{ marginBottom: 24 }}>
          <MapPreview
            rightIcon='arrowRightSmall'
            label='Lokalizacja*'
            place={address?.formattedAddress}
            statusCircle
            statusWarning={showTips}
            onPress={() => router.push({
              stack: 'ProfileStack',
              screen: 'CompanyEditorScreen',
              params: {
                subView: 'GoogleMapScreen',
                callback: (address) => changeCompanyDataHandler('address', address),
                initialAddress: address
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
          {job_industry ?
            <View style={styles.JobIndustry}>
              <View style={styles.JobIndustryIcons}>
                <FieldStatusCircle status={true} />
                <View style={styles.JobIndustryIcon}>
                  <View style={{ position: 'absolute' }}>
                    <SkeletonContainer animation='wave' speed={600}>
                      <Skeleton style={styles.JobIndustryIconSkeleton} />
                    </SkeletonContainer>
                  </View>
                  <SvgUriImage width={34} height={34} src={jobIndustries.find(curr => curr.id === job_industry)?.icon || ''} />
                </View>
              </View>
              <Typography variant='h5' weight='SemiBold'>{jobIndustries.find(curr => curr.id === job_industry)?.name || ''}</Typography>
            </View>

            :

            <View style={styles.UnfilledFieldTitle}>
              <FieldStatusCircle
                status={isFieldValid('job_industry')}
                warning={showTips && !isFieldValid('job_industry')}
              />
              <Typography
                variant='h5'
              >
                Branża
              </Typography>
              <Typography style={{ color: Colors.Red }}>
                *
              </Typography>
            </View>
          }
        </Button>
        {companyData.services?.length ?
          <>
            <View style={styles.SelectedItemsContainer}>
              <View style={styles.SelectedItemsHeader}>
                <View style={styles.FilledFieldTitle}>
                  <FieldStatusCircle status={true} />
                  <Typography variant='h5' weight='Bold'>
                    Usługi
                  </Typography>
                </View>
                <View style={styles.EditButtons}>
                  <Button
                    variant='TouchableOpacity'
                    style={styles.EditButton}
                    onPress={() => {
                      setDeleteSubView({ name: 'services', value: null, text: 'Czy na pewno chcesz usunąć usługi?' });
                    }}
                  >
                    <Trash2 />
                  </Button>
                  <Button
                    variant='TouchableOpacity'
                    style={styles.EditButton}
                    onPress={() => goToSelectServicesScreen()}
                  >
                    <Pencil />
                  </Button>
                </View>
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
            <View style={styles.UnfilledFieldTitle}>
              <FieldStatusCircle
                status={isFieldValid('services')}
                warning={showTips && !isFieldValid('services')}
              />
              <Typography
                variant='h5'
              >
                Usługi
              </Typography>
              <Typography style={{ color: Colors.Red }}>
                *
              </Typography>
            </View>
          </Button>
        }
        {description ?
          <>
            <View style={styles.FilledDescription}>
              <View style={styles.FilledDescriptionHeader}>
                <View style={styles.FilledFieldTitle}>
                  <FieldStatusCircle status={true} />
                  <Typography variant='h5' weight='Bold'>
                    Opis firmy
                  </Typography>
                </View>
                <View style={styles.EditButtons}>
                  <Button
                    variant='TouchableOpacity'
                    style={styles.EditButton}
                    onPress={() => {
                      setDeleteSubView({ name: 'description', value: null, text: 'Czy na pewno chcesz usunąć opis firmy?' });
                    }}
                  >
                    <Trash2 />
                  </Button>
                  <Button
                    variant='TouchableOpacity'
                    style={styles.EditButton}
                    onPress={() => goToCompanyDescriptionScreen()}
                  >
                    <Pencil />
                  </Button>
                </View>
              </View>

              <Typography
                numberOfLines={descriptionExpanded ? undefined : 3}
                color={Colors.Basic600}
                onLayout={handleDescriptionLayout}
              >
                {description}
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
            <View style={styles.UnfilledFieldTitle}>
              <FieldStatusCircle
                status={isFieldValid('description')}
                warning={showTips && !isFieldValid('description')}
              />
              <Typography variant='h5'>
                Opis firmy
              </Typography>
              <Typography style={{ color: Colors.Red }}>
                *
              </Typography>
            </View>
          </Button>
        }
        {!!contactPersons && !!contactPersons.length ?
          <>
            <View style={styles.FilledField}>
              <View style={styles.FilledFieldTitle}>
                <FieldStatusCircle status={true} />
                <Typography variant='h5' weight='Bold'>
                  Dane do kontaktu
                </Typography>
              </View>
              <View style={styles.EditButtons}>
                <Button
                  variant='TouchableOpacity'
                  style={styles.EditButton}
                  onPress={() => {
                    setDeleteSubView({ name: 'contactPersons', value: null, text: 'Czy na pewno chcesz dane do kontaktu?' });
                  }}
                >
                  <Trash2 />
                </Button>
                <Button
                  variant='TouchableOpacity'
                  style={styles.EditButton}
                  onPress={() => goToAddPersonsContactScreen()}
                >
                  <Pencil />
                </Button>
              </View>
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
            <View style={styles.UnfilledFieldTitle}>
              <FieldStatusCircle
                status={isFieldValid('contactPersons')}
                warning={showTips && !isFieldValid('contactPersons')}
              />
              <Typography variant='h5'>
                Dane do kontaktu
              </Typography>
              <Typography style={{ color: Colors.Red }}>
                *
              </Typography>
            </View>
          </Button>
        }
        {!!nip_info ?
          <>
            <View style={styles.FilledField}>
              <View style={styles.FilledFieldTitle}>
                <FieldStatusCircle status={true} />
                <Typography variant='h5' weight='Bold'>
                  Dane do faktury
                </Typography>
              </View>
              <View style={styles.EditButtons}>
                <Button
                  variant='TouchableOpacity'
                  style={styles.EditButton}
                  onPress={() => {
                    setDeleteSubView({ name: 'nip_info', value: null, text: 'Czy na pewno chcesz usunąć dane do faktury?' });
                  }}
                >
                  <Trash2 />
                </Button>
                <Button
                  variant='TouchableOpacity'
                  style={styles.EditButton}
                  onPress={() => goToCompanyInvoiceScreen()}
                >
                  <Pencil />
                </Button>
              </View>
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
            <View style={styles.UnfilledFieldTitle}>
              <FieldStatusCircle status={false} />
              <Typography
                variant='h5'
              >
                Dane do faktury
              </Typography>
            </View>
          </Button>
        }
        {!!other_locations?.length ?
          <>
            <View style={styles.FilledField}>
              <View style={styles.FilledFieldTitle}>
                <FieldStatusCircle status={isFieldValid('other_locations')} warning={showTips} />
                <Typography variant='h5' weight='Bold'>
                  Dodatkowe lokalizacje
                </Typography>
              </View>
              <View style={styles.EditButtons}>
                <Button
                  variant='TouchableOpacity'
                  style={styles.EditButton}
                  onPress={() => {
                    setDeleteSubView({ name: 'other_locations', value: null, text: 'Czy na pewno chcesz usunąć dodatkowe lokalizacje?' });
                  }}
                >
                  <Trash2 />
                </Button>
                <Button
                  variant='TouchableOpacity'
                  style={styles.EditButton}
                  onPress={() => goToAddOtherCompanyLocationsScreen()}
                >
                  <Pencil />
                </Button>
              </View>
            </View>
            <Separator />
          </>

          :

          <Button
            variant='text'
            arrowRight
            borderBottom
            onPress={() => {
              goToAddOtherCompanyLocationsScreen();
            }}
          >
            <View style={styles.UnfilledFieldTitle}>
              <FieldStatusCircle status={false} />
              <Typography
                variant='h5'
              >
                Dodatkowe lokalizacje
              </Typography>
            </View>
          </Button>
        }
        <Typography
          size={20}
          weight='Bold'
          style={[styles.SectionHeader, { marginTop: 26 }]}
        >
          Dodatkowe
        </Typography>
        <View style={styles.ImageField}>
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
            callback={(images) => changeCompanyDataHandler('logo', handleSingleFile(images), false)}
            render={(onPress) =>
              <>
                <View style={styles.ImagesHeader}>
                  <View style={styles.ImagesTitle}>
                    <FieldStatusCircle status={isFieldValid('logo')} />
                    <Typography weight="Bold" variant="h5">
                      Logo firmy
                    </Typography>
                  </View>
                  {!!logo &&
                    <View style={styles.LoadedImagesButtons}>
                      <Button
                        variant='TouchableOpacity'
                        onPress={() => {
                          setDeleteSubView({ name: 'logo', value: null, text: 'Czy na pewno chcesz usunąć logo' });
                        }}
                      >
                        <Trash2 />
                      </Button>
                      <Button
                        variant='TouchableOpacity'

                        onPress={() => onPress()}
                      >
                        <PlusCircle />
                      </Button>
                    </View>
                  }
                </View>
                {
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

                      !!logo ?
                        <View style={styles.LoadedImages}>
                          <View style={styles.LoadedLogoContainer}>
                            <Image
                              style={styles.LoadedLogo}
                              source={{ uri: logo.path }}
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
              </>
            }
          />
        </View>
        <View style={styles.ImageField}>
          <MediaSelector
            type='image'
            multiple
            selectionLimit={companyPhotosLimit}
            initialSelected={photos?.length ? photos as any : []}
            imageSettings={{
              compressionProgress: (progress) => (Math.round(progress * 100)) === 100 ? setPhotosProgress(null) : setPhotosProgress(progress),
            }}
            callback={(images) => changeCompanyDataHandler('photos', handleMultipleFiles(images), false)}
            render={(onPress) =>
              <>
                <View style={styles.ImagesHeader}>
                  <View style={styles.ImagesTitle}>
                    <FieldStatusCircle status={isFieldValid('photos')} />
                    <Typography weight="Bold" variant="h5">
                      Zdjęcia firmy
                    </Typography>
                  </View>
                  {!!(photos && photos.length) &&
                    <View style={styles.LoadedImagesButtons}>
                      <Button
                        variant='TouchableOpacity'
                        onPress={() => {
                          setDeleteSubView({ name: 'photos', value: [], text: 'Czy na pewno chcesz wszystkie zdjęcia firmy?' });
                        }}
                      >
                        <Trash2 />
                      </Button>
                      <Button
                        variant='TouchableOpacity'
                        onPress={() => {
                          (photos.length < companyPhotosLimit) ?
                            onPress()
                            :
                            setSnackbarMessage({ type: 'error', text: 'Dodałeś maksymalną ilość zdjęć.' })
                        }}
                      >
                        <PlusCircle />
                      </Button>
                    </View>
                  }
                </View>
                {
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

                      (!!photos && photos.length) ?
                        <View style={styles.LoadedImages}>
                          <DraggableList
                            horizontal
                            data={photos?.sort((a, b) => {
                              const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
                              const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

                              return orderA - orderB;
                            }) || []}
                            onDragEnd={({ data }) => changeCompanyDataHandler('photos', handleMultipleFiles(data), false)}
                            keyExtractor={({ path }) => path}
                            renderItem={(props: RenderItemParams<MediaType>) => renderScrollPhotoItem({ ...props, mode: 'photos' })}
                            contentContainerStyle={styles.DraggableImagesContent}
                            style={styles.DraggableImages}
                          />
                        </View>

                        :

                        <Button
                          variant='TouchableOpacity'
                          onPress={() => onPress()}
                        >
                          <View style={[styles.ImageLoaderContent, { height: 110 }]}>
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
              </>
            }
          />
        </View>
        <View style={styles.ImageField}>
          <MediaSelector
            type='image'
            multiple
            selectionLimit={companyCertificatesLimit}
            initialSelected={certificates?.length ? certificates as any : []}
            imageSettings={{
              compressionProgress: (progress) => (Math.round(progress * 100)) === 100 ? setCertificatesProgress(null) : setCertificatesProgress(progress),
            }}
            callback={(certificates) => changeCompanyDataHandler('certificates', handleMultipleFiles(certificates), false)}
            render={(onPress) =>
              <>
                <View style={styles.ImagesHeader}>
                  <View style={styles.ImagesTitle}>
                    <FieldStatusCircle status={isFieldValid('certificates')} />
                    <Typography weight="Bold" variant="h5">
                      Certyfikaty
                    </Typography>
                  </View>
                  {!!(certificates && certificates.length) &&
                    <View style={styles.LoadedImagesButtons}>
                      <Button
                        variant='TouchableOpacity'
                        onPress={() => {
                          setDeleteSubView({ name: 'certificates', value: [], text: 'Czy na pewno chcesz wszystkie certyfikaty?' });
                        }}
                      >
                        <Trash2 />
                      </Button>
                      <Button
                        variant='TouchableOpacity'
                        onPress={() => {
                          (certificates.length < companyCertificatesLimit) ?
                            onPress()
                            : setSnackbarMessage({ type: 'error', text: 'Dodałeś maksymalną ilość certyfikatów.' })
                        }}
                      >
                        <PlusCircle />
                      </Button>
                    </View>
                  }
                </View>
                {
                  <>
                    {!!certificatesProgress && certificatesProgress < 100 ?
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

                      (!!certificates && certificates.length) ?
                        <View style={styles.LoadedImages}>
                          <DraggableList
                            horizontal
                            data={certificates?.sort((a, b) => {
                              const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
                              const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

                              return orderA - orderB;
                            }) || []}
                            onDragEnd={({ data }) => changeCompanyDataHandler('certificates', handleMultipleFiles(data), false)}
                            keyExtractor={({ path }) => path}
                            renderItem={(props: RenderItemParams<MediaType>) => renderScrollPhotoItem({ ...props, mode: 'certificates' })}
                            contentContainerStyle={styles.DraggableImagesContent}
                            style={styles.DraggableImages}
                          />
                        </View>

                        :

                        <Button
                          variant='TouchableOpacity'
                          onPress={() => onPress()}
                        >
                          <View style={[styles.ImageLoaderContent, { height: 110 }]}>
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
                                {'  '}Dodaj certyfikaty
                              </Typography>
                            </View>
                          </View>
                        </Button>
                    }
                  </>
                }
              </>
            }
          />
        </View>
        {job_industry && squareFootageIndustries.includes(job_industry) &&
          <>
            <Separator marginTop={16} />
            <View style={styles.SquareFootageTitle}>
              <FieldStatusCircle status={isFieldValid('square_footage')} />
              <Typography weight="Bold" variant="h5">
                Metraż miejsca pracy
              </Typography>
            </View>
            <View style={styles.SquareFootage}>
              <TextField
                placeholder='0'
                maxLength={5}
                placeholderTextColor={Colors.Basic600}
                containerStyles={styles.SquareFootageTextField}
                height={44}
                keyboardType='number-pad'
                right={<Typography>m²</Typography>}
                value={square_footage || ''}
                onChangeText={(text) => changeCompanyDataHandler('square_footage', text.replace(/^0/, '').replace(/[^0-9]/g, ''))}
              />
            </View>
          </>
        }
        {employees_amount ?
          <>
            <View style={styles.SelectedItemsContainer}>
              <View style={styles.SelectedItemsHeader}>
                <View style={styles.FilledFieldTitle}>
                  <FieldStatusCircle status={true} />
                  <Typography variant='h5' weight='Bold'>
                    Liczba pracowników
                  </Typography>
                </View>
                <View style={styles.EditButtons}>
                  <Button
                    variant='TouchableOpacity'
                    style={styles.EditButton}
                    onPress={() => {
                      setDeleteSubView({ name: 'employees_amount', value: null, text: 'Czy na pewno chcesz usunąć liczbę pracowników?' });
                    }}
                  >
                    <Trash2 />
                  </Button>
                  <Button
                    variant='TouchableOpacity'
                    style={styles.EditButton}
                    onPress={() => goToSelectEmployeesAmountScreen()}
                  >
                    <Pencil />
                  </Button>
                </View>
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
            <View style={styles.UnfilledFieldTitle}>
              <FieldStatusCircle status={false} />
              <Typography
                variant='h5'
              >
                Liczba pracowników
              </Typography>
            </View>
          </Button>
        }
        {companyData.languages?.length ?
          <>
            <View style={styles.SelectedItemsContainer}>
              <View style={styles.SelectedItemsHeader}>
                <View style={styles.FilledFieldTitle}>
                  <FieldStatusCircle status={true} />
                  <Typography variant='h5' weight='Bold'>
                    Preferowane języki w komunikacji
                  </Typography>
                </View>
                <View style={styles.EditButtons}>
                  <Button
                    variant='TouchableOpacity'
                    style={styles.EditButton}
                    onPress={() => {
                      setDeleteSubView({ name: 'languages', value: null, text: 'Czy na pewno chcesz usunąć języki?' });
                    }}
                  >
                    <Trash2 />
                  </Button>
                  <Button
                    variant='TouchableOpacity'
                    style={styles.EditButton}
                    onPress={() => goToSelectLanguagesScreen()}
                  >
                    <Pencil />
                  </Button>
                </View>
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
            <View style={styles.UnfilledFieldTitle}>
              <FieldStatusCircle status={false} />
              <Typography
                variant='h5'
              >
                Preferowane języki w komunikacji
              </Typography>
            </View>
          </Button>
        }
        {(account_facebook || account_instagram || account_linkedIn || website) ?
          <>
            <View style={styles.FilledSocialMedia}>
              <View style={styles.FilledFieldTitle}>
                <FieldStatusCircle status={true} />
                <Typography variant='h5' weight='Bold'>
                  Social media
                </Typography>
              </View>
              <View style={styles.EditButtons}>
                <Button
                  variant='TouchableOpacity'
                  style={styles.EditButton}
                  onPress={() => {
                    setDeleteSubView({ name: 'social_media', value: null, text: 'Czy na pewno chcesz usunąć social media?' });
                  }}
                >
                  <Trash2 />
                </Button>
                <Button
                  variant='TouchableOpacity'
                  style={styles.EditButton}
                  onPress={() => goToSocialMediaScreen()}
                >
                  <Pencil />
                </Button>
              </View>
            </View>
            <View style={styles.SocialMediaIcons}>
              <View style={[styles.LinkedInIcon, { borderColor: account_linkedIn ? Colors.Basic900 : Colors.Basic600 }]}>
                <Linkedin color={account_linkedIn ? Colors.Basic900 : Colors.Basic600} />
              </View>
              <SvgIcon icon={'instagram'} fill={account_instagram ? Colors.Basic900 : Colors.Basic600} />
              <SvgIcon icon={'facebook'} fill={account_facebook ? Colors.Basic900 : Colors.Basic600} />
              <SvgIcon icon={'internet'} fill={website ? Colors.Basic900 : Colors.Basic600} />
            </View>
            <Separator marginTop={24} />
          </>

          :

          <View>
            <Button
              variant='text'
              borderBottom
              arrowRight
              onPress={() => goToSocialMediaScreen()}
            >
              <View style={styles.UnfilledFieldTitle}>
                <FieldStatusCircle status={false} />
                <Typography
                  variant='h5'
                >
                  Social media
                </Typography>
              </View>
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
        {mode === 'edit' ? 'Zaktualizuj' : 'Utwórz'}
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Content: {
    flex: 1,
  },
  CompanyName: {
    flexDirection: 'row',
    marginHorizontal: 19,
    marginBottom: 30,
    alignItems: 'flex-end',
  },
  CompanyLogoTitle: {
    marginHorizontal: 19,
    flexDirection: 'row',
    marginBottom: 5,
  },
  LoadedLogoContainer: {
    alignItems: 'center',
    backgroundColor: Colors.Basic300,
    marginHorizontal: 19,
    padding: 19,
    borderRadius: 4,
  },
  ImageField: {
    marginBottom: 24,
  },
  ImagesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 19,
    paddingVertical: 9,
  },
  ImagesTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  LoadedLogo: {
    aspectRatio: 1 / 1,
    width: '100%',
    maxWidth: 400,
    borderRadius: 4,
  },
  LoadingImages: {
    height: 110,
    padding: 20,
    backgroundColor: Colors.Basic300,
    marginHorizontal: 19,
    borderRadius: 4,
    justifyContent: 'center'
  },
  LoadingImagesText: {
    color: Colors.Basic600,
    textAlign: 'center',
  },
  LoadedImages: {
    backgroundColor: Colors.Basic300,
    marginHorizontal: 19,
    borderRadius: 4
  },
  LoadedImagesButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginRight: 19,
    gap: 15
  },
  DeleteImagesButton: {
    color: Colors.Basic600,
    textDecorationLine: 'underline',
  },
  AddMoreImages: {
    color: Colors.Blue500,
    textDecorationLine: 'underline',
  },
  DraggableImagesContent: {
    paddingLeft: 19,
    paddingVertical: 15,
  },
  DraggableImages: {
    flex: 1
  },
  DraggableItem: {
    marginRight: 19,
    position: 'relative',
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
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center'
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
  JobIndustryIcons: {
    flexDirection: 'row',
    alignItems: 'center'
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
    /*     marginLeft: 40 */
  },
  EditButtons: {
    flexDirection: 'row',
    gap: 15
  },
  EditButton: {
    width: 'auto',
    padding: 0,
    height: 50,
    justifyContent: 'center'
  },
  EditButtonText: {
    color: Colors.Blue500
  },
  FilledField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
    height: 58,
  },
  FilledDescription: {
    paddingHorizontal: 19
  },
  FilledDescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    alignItems: 'center',
  },
  LinkedInIcon: {
    borderWidth: 2,
    borderRadius: 4,
    padding: 1,
    width: 31,
    height: 31,
    alignItems: 'center'
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
  UnfilledFieldTitle: {
    flexDirection: 'row',
  },
  FilledFieldTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  OutlineCircleWrapper: {
    width: 25,
    height: 25,
    marginRight: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  OutlineCircle: {
    borderRadius: 50,
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.Basic400,
  },
  DoneCircle: {
    marginRight: 11
  }
});

export default CompanyEditorScreen;