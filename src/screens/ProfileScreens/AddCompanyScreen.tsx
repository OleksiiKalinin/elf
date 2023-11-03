import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert
} from 'react-native';
import React, { Fragment, useCallback, useEffect, useState, useRef } from 'react';
import {
  CompositeScreenProps,
} from '@react-navigation/native';
import Colors from '../../colors/Colors';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { nativeStore } from '../../store';
import { companyActionTypes } from '../../store/actions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import tip1 from '../../assets/images/tip1.png';
import tip2 from '../../assets/images/tip2.png';
import tip3 from '../../assets/images/tip3.png';
import tip4 from '../../assets/images/tip4.png';
import tip5 from '../../assets/images/tip5.png';
import tip6 from '../../assets/images/tip6.png';
import { useActions } from '../../hooks/useActions';
import { SvgUri } from 'react-native-svg';
import minutesToHours from '../../hooks/minutesToHours';
import { AddressType, CompanyDataType, MediaType, ContactPersonType } from '../../store/reducers/types';
// import ImageCropPicker, { Options as OptionsType } from 'react-native-image-crop-picker';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import generalServices from '../../services/generalServices';
import { useDispatch } from 'react-redux';
import DraggableFlatList, { ScaleDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import companyServices from '../../services/companyServices';
import { isNumber } from 'lodash';
import SvgIcon, { IconTypes } from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { createParam } from 'solito';
import { Skeleton, SkeletonContainer } from 'react-native-skeleton-component';

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

const { useParam } = createParam<ProfileStackParamList['default']['AddCompanyScreen']>();

const AddCompanyScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  // const { editMode } = route.params;
  const [editMode] = useParam('editMode');
  const [loading, setLoading] = useState<boolean>(false);
  const { jobIndustries, token, userCompany, windowSizes } = useTypedSelector(state => state.general);
  const { setSwipeablePanelProps } = useActions();
  const [companyData, setCompanyData] = useState<CompanyDataType>(userCompany || {
    short_name: null,
    full_name: 'blabla',
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
    account_twitter: null,
    account_youtube: null,
    job_industry: null,
  });
  const [contactPersons, setContactPersons] = useState<ContactPersonType[]>(userCompany?.contactPersons || [{
    account_facebook: null,
    account_instagram: null,
    account_twitter: null,
    account_youtube: null,
    email: null,
    link: null,
    mobile_number: null,
    id: Date.now()
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
  const companyDataRefreshAccess = useRef(true);

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

  const changeCompanyDataHandler = (name: keyof CompanyDataType, value: string | number | AddressType | null, replaceSpaces: boolean = true) => {
    setCompanyData(prev => ({
      ...prev,
      [name]: value ?
        (typeof value === 'string') && replaceSpaces ?
          value.replace(/\s/g, '')
          :
          value
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

  const attachMediaHandler = (mode: 'logo' | 'photos' | 'certificates' | 'video') => {
    // if (mode) {
    //   const initOptions: OptionsType = {
    //     width: windowSizes.width,
    //     height: windowSizes.width / 1.5,
    //     cropperStatusBarColor: 'black',
    //     cropperToolbarTitle: 'Wytnij fragment',
    //     mediaType: 'photo',
    //     cropperActiveWidgetColor: 'black',
    //     cropperToolbarColor: 'white',
    //     cropperToolbarWidgetColor: 'black',
    //     hideBottomControls: true,
    //     enableRotationGesture: true,
    //   }
    //   const setUniqueImages = (prevImages: MediaType[]) => (newImages: MediaType[]): MediaType[] => {
    //     const slicedNewImages = newImages.slice(0, 20);
    //     if (prevImages.length >= 20) return prevImages;
    //     if (!prevImages.length) return slicedNewImages;
    //     const existedImages = prevImages.map(image => image.path);
    //     const filtered = slicedNewImages.filter(curr => !existedImages.includes(curr.path));
    //     return [...prevImages, ...filtered].slice(0, 20);
    //   }

    //   const data: { [k in typeof mode]: { options: OptionsType, callback: any } } = {
    //     logo: {
    //       callback: setCompanyLogo,
    //       options: { cropping: true, }
    //     },
    //     certificates: {
    //       callback: (images: MediaType[]) => setCompanyCertificates(prev => setUniqueImages(prev)(images)),
    //       options: { multiple: true }
    //     },
    //     photos: {
    //       callback: (images: MediaType[]) => setCompanyPhotos(prev => setUniqueImages(prev)(images)),
    //       options: { multiple: true }
    //     },
    //     video: {
    //       callback: setCompanyVideo,
    //       options: { mediaType: 'video' }
    //     }
    //   }
    //   const options: OptionsType = { ...initOptions, ...data[mode].options };
    //   const open = (thing: 'Camera' | 'Picker') => {
    //     ImageCropPicker[`open${thing}`](options).then(data[mode].callback).catch(() => { });
    //   }
    //   if (mode === 'logo' || mode === 'video')
    //     setSwipeablePanelProps({
    //       title: 'W jaki sposób chcesz dodać media?',
    //       buttons: [{
    //         children: 'Zrób teraz',
    //         onPress: () => open('Camera')
    //       },
    //       {
    //         children: 'Wybierz z galerii',
    //         onPress: () => open('Picker')
    //       },]
    //     });
    //   else if (mode === 'photos' || mode === 'certificates') open('Picker');
    // }
  }

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

  const showTipsHandler = () => {
    setSwipeablePanelProps({
      closeButton: false,
      children: (
        <ScrollView style={styles.tipsView}>
          <View style={styles.tipsHeader}>
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
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1} onLongPress={drag} disabled={isActive}
          style={{ opacity: isActive ? 0.5 : 1, marginRight: 19, position: 'relative' }}
        >
          <View style={{ position: 'absolute', top: -12, right: -12, zIndex: 1 }}>
            <Button p='5px' circular
              onPress={() => index !== undefined && deletePhotoHandler(index, mode)}
              icon={<SvgIcon icon='crossSmall' />}
            />
          </View>
          {index !== undefined && <View style={{ position: 'absolute', top: -6, left: -5, zIndex: 1, backgroundColor: Colors.White, width: 20, height: 20, borderRadius: 10 }}>
            <Typography weight='Bold' textAlign='center'>{index + 1}</Typography>
          </View>}
          <Image style={{ width: 80, height: 80, borderRadius: 7 }} source={{ uri: item.path }} />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  }, []);

  return (
    <ScreenHeaderProvider {...(editMode ? { title: 'Edytuj profil firmy' } : {})}>
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
        <View style={{ marginHorizontal: 19, marginBottom: 30 }}>
          <Typography style={styles.Header} weight="Bold" variant="h5">
            Twoja firma
          </Typography>
          <TextField
            label="Nazwa firmy*"
            value={companyData.short_name || ''}
            onChangeText={text => changeCompanyDataHandler('short_name', text, false)}
          />
        </View>
        <View style={{ marginBottom: 24 }}>
          {/* <SmallMap
            label='Lokalizacja*'
            place={companyData.other_address?.formattedAddress}
            onPress={() => navigation.navigate('MapScreen', {
              callback: (address) => changeCompanyDataHandler('other_address', address),
              initialAddress: companyData.other_address
            })}
          /> */}
          {/* {companyData.other_address && <View style={{ marginHorizontal: 19, marginVertical: 15 }}>
            <TextField
              label="Numer mieszkania/biura (opcjonalne)"
            // value={companyData.full_name || ''}
            // onChangeText={text => changeCompanyDataHandler('full_name', text, false)}
            />
          </View>} */}
        </View>
        <View style={{ marginBottom: 32 }}>
          {/* <ButtonArrowSelector
            text='Dane do kontaktu'
            onPress={() => navigation.navigate('AddContactPersonsScreen', {
              contactPersons,
              setContactPersons,
              companyData,
              changeCompanyDataHandler
            })}
          /> */}
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
          {!!companyLogo ?
            <>
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 9 }}>
                <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => setCompanyLogo(null)}>
                  <Typography variant='h5' weight="Bold" color={Colors.Basic600} style={{ textDecorationLine: 'underline' }}>
                    Usuń wybrane
                  </Typography>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => attachMediaHandler('logo')}>
                  <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
                    Dodaj ponownie
                  </Typography>
                </TouchableOpacity>
              </View>
              <Image
                style={{ width: windowSizes.width, height: windowSizes.width / 1.5 }}
                source={{ uri: companyLogo.path }}
              />
            </>
            :
            <TouchableOpacity onPress={() => attachMediaHandler('logo')}>
              <View style={styles.addPhotoButton}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <SvgIcon icon="createCircleSmall" fill={Colors.Basic900} />
                  <Typography variant="h5" weight='Bold'>{'  '}Dodaj logo</Typography>
                </View>
              </View>
            </TouchableOpacity>
          }
        </View>
        <View style={{ marginHorizontal: 19, marginBottom: 5 }}>
          <Typography weight="Bold" variant="h5">
            Zdjęcia firmy{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
        </View>
        {!!companyPhotos.length ?
          <View style={{ backgroundColor: Colors.Basic300, marginBottom: 24 }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 9 }}>
              <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => setCompanyPhotos([])}>
                <Typography variant='h5' weight="Bold" color={Colors.Basic600} style={{ textDecorationLine: 'underline' }}>
                  Usuń wszystkie
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => attachMediaHandler('photos')}>
                <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
                  Dodaj kolejne
                </Typography>
              </TouchableOpacity>
            </View>
            {/* quick fix ScrollView onContentSizeChange for DraggableFlatList - constant height wrapper, wtf sht mzfk? */}
            <View style={{ height: 100, flexDirection: 'row', marginBottom: 9 }}>
              <DraggableFlatList
                horizontal
                showsHorizontalScrollIndicator
                contentContainerStyle={{ paddingLeft: 19, paddingVertical: 10 }}
                style={{ flex: 1 }}
                data={companyPhotos}
                onDragEnd={({ data }) => setCompanyPhotos(data)}
                keyExtractor={({ path }) => path}
                renderItem={props => renderScrollPhotoItem({ ...props, mode: 'photos' })}
              />
            </View>
          </View>
          :
          <TouchableOpacity onPress={() => attachMediaHandler('photos')} style={{ marginBottom: 24 }}>
            <View style={[styles.addPhotoButton, { height: 118 },]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -14 }}>
                <View style={{ flex: 1 }}>
                  <Typography variant='h5' weight='SemiBold' color={Colors.Basic600}>Dodaj do 20 zdjęć.</Typography>
                </View>
                <TouchableOpacity style={{ padding: 15 }} onPress={() => showTipsHandler()}>
                  <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
                    {/* Zobacz wskazówki */}
                  </Typography>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <SvgIcon icon="createCircleSmall" />
                <Typography variant="h5" weight='Bold'>{'  '}Dodaj zdjęcia</Typography>
              </View>
            </View>
          </TouchableOpacity>
        }
        {/* <View style={{ marginLeft: 19, marginBottom: 5 }}>
          <Typography weight="Bold" variant="h5">
            Inne zdjęcia{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
          <Typography weight="Regular" color={Colors.Basic600}>Certyfikaty, dyplomy, wyniki finansowe itp.</Typography>
        </View> */}
        {!!companyCertificates.length ? <></>
          // <View style={{ backgroundColor: Colors.Basic300, marginBottom: 24 }}>
          //   <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 9 }}>
          //     <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => setCompanyCertificates([])}>
          //       <Typography variant='h5' weight="Bold" color={Colors.Basic600} style={{ textDecorationLine: 'underline' }}>
          //         Usuń wszystkie
          //       </Typography>
          //     </TouchableOpacity>
          //     <TouchableOpacity style={{ padding: 10, marginVertical: 10 }} onPress={() => attachMediaHandler('certificates')}>
          //       <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
          //         Dodaj kolejne
          //       </Typography>
          //     </TouchableOpacity>
          //   </View>
          //   {/* quick fix ScrollView onContentSizeChange for DraggableFlatList - constant height wrapper, wtf sht mzfk? */}
          //   <View style={{ height: 100, flexDirection: 'row', marginBottom: 9 }}>
          //     <DraggableFlatList
          //       horizontal
          //       showsHorizontalScrollIndicator
          //       contentContainerStyle={{ paddingLeft: 19, paddingVertical: 10 }}
          //       style={{ flex: 1 }}
          //       data={companyCertificates}
          //       onDragEnd={({ data }) => setCompanyCertificates(data)}
          //       keyExtractor={({ path }) => path}
          //       renderItem={props => renderScrollPhotoItem({ ...props, mode: 'certificates' })}
          //     />
          //   </View>
          // </View>
          :
          <></>
          // <TouchableOpacity onPress={() => attachMediaHandler('certificates')} style={{ marginBottom: 24 }}>
          //   <View style={[styles.addPhotoButton, { height: 118 },]}>
          //     <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -14 }}>
          //       <View style={{ flex: 1 }}>
          //         <Typography variant='h5' weight='SemiBold' color={Colors.Basic600}>Dodaj do 20 zdjęć.</Typography>
          //       </View>
          //       <TouchableOpacity style={{ padding: 15 }} onPress={() => showTipsHandler()}>
          //         <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
          //           {/* Zobacz wskazówki */}
          //         </Typography>
          //       </TouchableOpacity>
          //     </View>
          //     <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          //       <SvgIcon icon="createCircleSmall" />
          //       <Typography variant="h5" weight='Bold'>{'  '}Dodaj zdjęcia</Typography>
          //     </View>
          //   </View>
          // </TouchableOpacity>
        }
        <View style={{ marginLeft: 19, marginBottom: 5 }}>
          <Typography weight="Bold" variant="h5">
            Krótki film{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
          <Typography weight="Regular" color={Colors.Basic600}>Przedstawiający i zachęcający do pracy w firmie</Typography>
        </View>
        {!!companyVideo ?
          <View style={{ marginBottom: 24 }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 9 }}>
              <TouchableOpacity style={{ padding: 10, marginBottom: 10 }} onPress={() => setCompanyVideo(null)}>
                <Typography variant='h5' weight="Bold" color={Colors.Basic600} style={{ textDecorationLine: 'underline' }}>
                  Usuń wybrany
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 10, marginBottom: 10 }} onPress={() => attachMediaHandler('video')}>
                <Typography variant='h5' weight="Bold" color={Colors.Blue500} style={{ textDecorationLine: 'underline' }}>
                  Dodaj ponownie
                </Typography>
              </TouchableOpacity>
            </View>
            <Typography style={{ paddingHorizontal: 19 }} variant='h5'>
              Nazwa filmu:{' '}
              <Typography variant='h5' weight='Bold'>{companyVideo.path.slice(companyVideo.path.lastIndexOf('/') + 1)}</Typography>
            </Typography>
          </View>
          :
          <TouchableOpacity onPress={() => attachMediaHandler('video')} style={{ marginBottom: 24 }}>
            <View style={styles.addPhotoButton}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SvgIcon icon="createCircleSmall" fill={Colors.Basic900} />
                <Typography variant="h5" weight='Bold'>{'  '}Dodaj film</Typography>
              </View>
            </View>
          </TouchableOpacity>
        }
        <View style={{ marginLeft: 19, marginBottom: 10 }}>
          <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
            O firmie
          </Typography>
        </View>
        <TouchableOpacity
          // onPress={() => navigation.navigate('JobCategoryScreen', { callback: (id) => changeCompanyDataHandler('job_industry', id) })}
          style={{
            flexDirection: 'row', padding: 19,
            ...(!!Number(companyData.job_industry) ?
              { backgroundColor: Colors.White } :
              { borderColor: Colors.Basic300, borderTopWidth: 1, borderBottomWidth: 1 })
          }}
        >
          {isNumber(companyData.job_industry) && <View style={{ width: 34, height: 34, position: 'relative', marginRight: 19 }}>
            <View style={{ position: 'absolute' }}>
              <SkeletonContainer animation='wave' speed={600}>
                <Skeleton style={{ width: 34, height: 34, borderRadius: 17 }} />
              </SkeletonContainer>
            </View>
            <SvgUri width={34} height={34} uri={jobIndustries.find(curr => curr.id === companyData.job_industry)?.icon || null} />
          </View>}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Typography variant='h5' weight='SemiBold'>{jobIndustries.find(curr => curr.id === companyData.job_industry)?.name || 'Branża*'}</Typography>
          </View>
          <View style={{ justifyContent: 'center' }}>
            {/* <SvgIcon icon={!!Number(companyData.job_industry) ? 'crossBig' : 'arrowRightSmall'} fill={Colors.Basic500} /> */}
            <SvgIcon icon={'arrowRightSmall'} fill={Colors.Basic500} />
          </View>
        </TouchableOpacity>
        {/* <ButtonArrowSelector
          text='Usługi'
          marginTop={false}
          marginBottom={false}
          borderTop={false}
        /> */}
        {/* <ButtonArrowSelector
          text='Opis firmy*'
          marginTop={false}
          marginBottom={false}
          borderTop={false}
          onPress={() => navigation.navigate('CompanyDescriptionScreen', {
            callback: value => changeCompanyDataHandler('full_decription', value, false),
            description: companyData.full_decription,
            title: 'Dodaj opis firmy'
          })}
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
        <View style={{ marginHorizontal: 19, marginBottom: 32, flexDirection: 'row', alignItems: 'center' }}>
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
        <View style={{ marginHorizontal: 19, marginBottom: 16 }}>
          <Typography weight="Bold" variant="h5">
            Metraż miejsca pracy{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
        </View>
        <View style={{ marginHorizontal: 19, marginBottom: 34 }}>
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
        <View style={{ marginHorizontal: 19, marginBottom: 15 }}>
          <Typography weight="Bold" variant="h5">
            Social media{' '}
            <Typography weight="Bold" variant="h5" color={Colors.Basic600}>
              (opcjonalne)
            </Typography>
          </Typography>
        </View>

        {socialLinksData.map(({ icon, label, value }) => (
          <View style={styles.textField}>
            <TextField
              left={<SvgIcon icon={icon} />}
              label={label}
              rowStyles={{ alignItems: 'flex-end' }}
              value={companyData[value] as string || ''}
              onChangeText={text => changeCompanyDataHandler(value, text)}
            />
          </View>
        ))}
      </ScrollView>
      <View>
        <Button withLoading disabled={loading} onPress={submitCompanyCreation}>
          {editMode ? 'Zaktualizuj' : 'Utwórz'}
        </Button>
      </View>
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
  textField: {
    marginHorizontal: 19,
    marginBottom: 16
  },
  addPhotoButton: {
    backgroundColor: Colors.Basic300,
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 19,
    padding: 14,
  },
  Label: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: Colors.Basic300,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  tipsView: {
    // position: 'absolute',
    backgroundColor: 'white',
    // height: '100%',
    // width: '100%',
    // top: 0,
    // left: 0,
    // zIndex: 1000,
  },
  tipsHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.Basic400,
  },
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddCompanyScreen;
