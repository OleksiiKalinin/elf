import { CommonActions, CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Colors from '../../colors/Colors';
import HorizontalMenuButton from '../../components/atoms/HorizontalMenuButton/HorizontalMenuButton';
import Typography from '../../components/atoms/Typography/Typography';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import DatePicker from 'react-native-date-picker';
import SmallMap from '../../components/organisms/SmallMap/SmallMap';
import { useActions } from '../../hooks/useActions';
import SplashScreen from '../../components/atoms/Splashscreen/SplashScreen';
import { Divider, Radio, Switch } from 'native-base';
import Calendar from '../../components/organisms/Calendar/Calendar';
import LoadingScreen from '../../components/atoms/LoadingScreen/LoadingScreen';
import { AddressType, CandidateDataType, UserAdvertType } from '../../store/reducers/types';
import AdvertSmall from '../../components/molecules/AdvertSmall/AdvertSmall';
import { useDispatch } from 'react-redux';
import calendarServices from '../../services/calendarServices';
import CandidateCard from '../../components/organisms/CandidateCard/CandidateCard';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CalendarStackParamList, 'EventScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CalendarStack'>
>;

const normalizeTimeForPicker = (mode: 'start' | 'end'): Date => {
  const now = Date.now()// - new Date().getTimezoneOffset()*60*1000;
  const date = new Date(now);
  const minutes = date.getMinutes();
  let calcMinutes = minutes;
  while (true) {
    if (!(calcMinutes++ % 5)) break;
  }

  return new Date(
    Math.floor((
      now + //now
      ((calcMinutes - 1 - minutes) * 60 * 1000) + //diff rounded by 5
      10 * 60 * 1000 + //start and end time 10 minutes to future
      (mode === 'end' ? 30 * 60 * 1000 : 0) //end time 30 minutes to future
    ) / (60 * 1000)) * (60 * 1000) //round to minutes
  );
}

const EventScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [eventType, setEventType] = useState<'meeting' | 'call'>('call');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().replace(/T.*$/, ''));
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().replace(/T.*$/, ''));
  const [showTimepicker, setShowTimepicker] = useState<'start' | 'end' | false>(false);
  const [showCalendar, setShowCalendar] = useState<'start' | 'end' | false>(false);
  const [startTime, setStartTime] = useState<Date>(normalizeTimeForPicker('start'));
  const [endTime, setEndTime] = useState<Date>(normalizeTimeForPicker('end'));
  const [displayStartHours, displayStartMinutes] = [startTime.getHours(), startTime.getMinutes()];
  const [displayEndHours, displayEndMinutes] = [endTime.getHours(), endTime.getMinutes()];
  const [selectedAdvert, setSelectedAdvert] = useState<UserAdvertType | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateDataType | null>(null);
  const [location, setLocation] = useState<AddressType | null>(null);

  const { token, userCompany, userEvents } = useTypedSelector(state => state.general);

  // const [selectedPersonsExtra, setSelectedPersonsExtra] = useState([]);
  // const [splashscreen, toggleSplashscreen] = useState<boolean>(false);
  // const [selectedPersons, setSelectedPersons] = useState([]);
  // const [selectedJobCategory, setSelectedJobCategory] = useState<number>(0);
  // const [personRemove, personRemoveToggle] = useState(false);
  const { setSwipeablePanelProps } = useActions();
  const isFirstLoad = useRef(true);
  // const isFocused = useIsFocused();

  useEffect(() => {
    isFirstLoad.current = false;
  }, []);

  // useEffect(() => {
  //   if (!isFocused && route.params?.isMainMenuSender) {
  //     navigation.dispatch(CommonActions.reset({
  //       routes: [{ name: "MainScreen" }],
  //     }));
  //   }
  // }, [isFocused]);

  // useEffect(() => {
  //   selectedPersons.length < 1 && personRemoveToggle(false);
  // }, [selectedPersons]);

  useEffect(() => {
    if (startTime.getTime() > endTime.getTime()) setEndTime(new Date(startTime.getTime() + 30 * 60 * 1000));
  }, [startTime, endTime]);

  useEffect(() => {
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) setEndDate(startDate);
  }, [startDate, endDate]);

  const addEventHandler = async () => {
    if (selectedCandidate && selectedAdvert) {
      setLoading(true);
      await dispatch(calendarServices.createUserEvent({
        is_phone: eventType === 'call',
        location,
        candidate_id: selectedCandidate?.id,
        candidate_first_name: selectedCandidate?.first_name,
        candidate_second_name: selectedCandidate?.last_name,
        company_name: userCompany?.short_name as string,
        start_time: startDate + 'T' + startTime.toISOString().split('T')[1],
        end_time: endDate + 'T' + endTime.toISOString().split('T')[1],
        job_offer: selectedAdvert?.id as number,
        job_position: selectedAdvert?.job_position_id as number,
      }, token, userEvents));
      navigation.goBack();
    }

    // setSwipeablePanelProps({
    //   title: 'Czy chcesz dodać to wydarzenie do Twojego kalendarza?',
    //   buttons: [
    //     {
    //       children: 'Dodaj spotkanie',
    //       icon: 'meeting',
    //       onPress: () => toggleSplashscreen(true),
    //     },
    //   ],
    // })
  }

  return (
    <ScreenHeaderProvider currentStack="CalendarStack">
      <ScrollView style={styles.Wrapper}>
        <Typography weight="Bold" variant='h5' style={styles.Title}>
          Data i godzina*
        </Typography>
        <View style={{ margin: 18 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <ButtonRipple
                style={{ paddingHorizontal: 6, paddingVertical: 5 }}
                contentWeight='SemiBold'
                contentVariant='h5'
                variant="secondary"
                onPress={() => {
                  setShowCalendar(prev => prev === 'start' ? false : 'start');
                  setShowTimepicker(false);
                }}
                containerStyles={{ borderRadius: 4, overflow: 'hidden', marginVertical: 5, }}
              >
                {startDate}
              </ButtonRipple>
              <ButtonRipple
                style={{ paddingHorizontal: 6, paddingVertical: 5 }}
                contentWeight='SemiBold'
                contentVariant='h5'
                variant="secondary"
                onPress={() => {
                  setShowTimepicker(prev => prev === 'start' ? false : 'start');
                  setShowCalendar(false);
                }}
                containerStyles={{ borderRadius: 4, overflow: 'hidden', marginVertical: 5, }}
              >
                {(displayStartHours < 10 ? `0${displayStartHours}` : displayStartHours)}
                {':'}
                {(displayStartMinutes < 10 ? `0${displayStartMinutes}` : displayStartMinutes)}
              </ButtonRipple>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <SvgIcon icon='arrowRight' fill={Colors.Basic500} />
            </View>
            <View>
              <ButtonRipple
                style={{ paddingHorizontal: 6, paddingVertical: 5 }}
                contentWeight='SemiBold'
                contentVariant='h5'
                variant="secondary"
                onPress={() => {
                  setShowCalendar(prev => prev === 'end' ? false : 'end');
                  setShowTimepicker(false);
                }}
                containerStyles={{ borderRadius: 4, overflow: 'hidden', marginVertical: 5, }}
              >
                {endDate}
              </ButtonRipple>
              <ButtonRipple
                style={{ paddingHorizontal: 6, paddingVertical: 5 }}
                contentWeight='SemiBold'
                contentVariant='h5'
                variant="secondary"
                onPress={() => {
                  setShowTimepicker(prev => prev === 'end' ? false : 'end');
                  setShowCalendar(false);
                }}
                containerStyles={{ borderRadius: 4, overflow: 'hidden', marginVertical: 5, }}
              >
                {(displayEndHours < 10 ? `0${displayEndHours}` : displayEndHours)}
                {':'}
                {(displayEndMinutes < 10 ? `0${displayEndMinutes}` : displayEndMinutes)}
              </ButtonRipple>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: showTimepicker || showCalendar ? 25 : 0 }}>
          {showTimepicker && <View>
            <DatePicker
              date={showTimepicker === 'start' ? startTime : endTime}
              onDateChange={date => showTimepicker === 'start' ? setStartTime(date) : setEndTime(date)}
              fadeToColor='none'
              mode="time"
              theme='light'
              dividerHeight={4}
              is24hourSource="locale"
              locale="pl"
              minuteInterval={5}
              style={{ width: Dimensions.get('screen').width }}
            />
          </View>}
          {!isFirstLoad.current && <View>
            {/* there was a problem with rerendering - the only way below */}
            <Calendar
              dateInit={startDate}
              isVisible={showCalendar === 'start'}
              onDateChanged={setStartDate}
              renderOnly='month' backgroundColor={Colors.Basic100}
            />
            <Calendar
              dateInit={endDate}
              isVisible={showCalendar === 'end'}
              onDateChanged={setEndDate}
              renderOnly='month' backgroundColor={Colors.Basic100}
            />
          </View>}
        </View>
        <Divider />
        <View style={{ marginVertical: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <Typography weight="Bold" variant='h5' style={[styles.Title, { marginTop: 0 }]}>
              Ogłoszenie*
            </Typography>
            {selectedAdvert && <TouchableOpacity style={{ marginRight: 18 }} onPress={() => navigation.navigate('ChooseAdvertScreen', { callback: setSelectedAdvert })}>
              <Typography style={{ textDecorationLine: 'underline' }} color={Colors.Blue500}>
                Zmień wybór
              </Typography>
            </TouchableOpacity>}
          </View>
          {selectedAdvert ?
            <AdvertSmall {...selectedAdvert} />
            :
            <ButtonRipple variant='secondary' onPress={() => navigation.navigate('ChooseAdvertScreen', { callback: setSelectedAdvert })}>
              Wybierz Ogłoszenie
            </ButtonRipple>
          }
        </View>
        {!!selectedAdvert && <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <Typography weight="Bold" variant='h5' style={[styles.Title, { marginTop: 0 }]}>
              Kandydat*
            </Typography>
            {selectedCandidate && <TouchableOpacity style={{ marginRight: 18 }} onPress={() => navigation.navigate('ChooseAdvertScreen', { callback: setSelectedAdvert })}>
              <Typography style={{ textDecorationLine: 'underline' }} color={Colors.Blue500}>
                Zmień wybór
              </Typography>
            </TouchableOpacity>}
          </View>
          {selectedCandidate ?
            <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('ProfileScreen', { candidateData: selectedCandidate })}>
              <CandidateCard {...selectedCandidate} />
            </TouchableOpacity>
            :
            <ButtonRipple variant='secondary' onPress={() => navigation.navigate('ChooseCandidateScreen', { callback: setSelectedCandidate, candidates: selectedAdvert.candidate_data })}>
              Wybierz Kandydata
            </ButtonRipple>
          }
        </View>}
        <Divider />
        <View>
          <Typography weight="Bold" variant='h5' style={[styles.Title, { marginTop: 24 }]}>
            Wybierz rodzaj wydarzenia
          </Typography>
          <Radio.Group
            name='eventType' colorScheme='trueGray' ml='18px' mt='10px' mb='15px'
            value={eventType} onChange={nextValue => setEventType(nextValue as 'meeting' | 'call')}
          >
            <Radio value="call" my={1}>Połaczenie telefoniczne</Radio>
            <Radio value="meeting" my={1}>Spotkanie pod adresem</Radio>
          </Radio.Group>
        </View>
        {eventType === 'meeting' && <>
          <Divider />
          <Typography weight="Bold" style={{ marginBottom: 8, marginLeft: 18, marginTop: 25 }} variant="h4">
            Lokalizacja*
          </Typography>
          <View style={{ marginBottom: 30 }}>
            <SmallMap
              place={location?.formattedAddress}
              latitude={location?.position?.lat}
              longitude={location?.position?.lng}
              onPress={() => navigation.navigate('MapScreen', {
                callback: (address) => setLocation(address),
                initialAddress: location
              })}
            />
          </View>
        </>}
      </ScrollView>
      <ButtonRipple disabled={!token || loading} withLoading={!!token} variant="primary" onPress={addEventHandler}>Zaplanuj</ButtonRipple>

      {/* {splashscreen && (
        <SplashScreen
          infoText={'Zapisano wydarzenie!'}
          buttonText={'Potwierdź'}
          onPress={() => navigation.navigate('MainScreen')}
        />
      )} */}
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: Colors.Basic100,
  },
  Title: {
    color: Colors.Basic600,
    marginLeft: 18,
    marginTop: 24,
  },
  Date: {
    marginLeft: 18,
    marginTop: 4,
    backgroundColor: Colors.Basic300,
    color: Colors.Basic900,
    paddingHorizontal: 12,
    paddingVertical: 10,
    textAlign: 'center',
  },
  Bookmark: {
    position: 'absolute',
    right: 15,
  },
  jobCategories: {
    marginTop: 9,
    marginLeft: 10,
  },
  Map: {
    height: 180,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapIcon: {
    paddingRight: 16,
    marginRight: 16,
    borderRightWidth: 1,
    borderColor: Colors.Basic300,
    justifyContent: 'center',
  },
  addIcon: {
    marginTop: 9,
    width: 85,
    borderRightWidth: 1,
    borderColor: Colors.Basic400,
  },
  candidatesSlider: {
    paddingBottom: 27,
  },
});

export default EventScreen;
