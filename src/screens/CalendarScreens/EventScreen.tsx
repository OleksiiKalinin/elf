import { CommonActions, CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
// import DatePicker from 'react-native-date-picker';
// import SmallMap from '../../components/organisms/SmallMap/SmallMap';
import { useActions } from '../../hooks/useActions';
// import Calendar from '../../components/organisms/Calendar/Calendar';
import { AddressType, CandidateDataType, UserAdvertType } from '../../store/reducers/types';
// import AdvertSmall from '../../components/molecules/AdvertSmall/AdvertSmall';
import { useDispatch } from 'react-redux';
import calendarServices from '../../services/calendarServices';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import SvgIcon from '../../components/atoms/SvgIcon';
import CandidateCard from '../../components/organismes/CandidateCard';
import RadioGroup from '../../components/atoms/RadioGroup';
import AdvertSmall from '../../components/organismes/AdvertSmall';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { ScrollView } from '../../components/molecules/ScrollView';
import { Separator } from 'tamagui';
import { createParam } from 'solito';
import useRouter from '../../hooks/useRouter';
import { DatePickerModal } from '../../components/modified_modules/react-native-paper-dates/Date/DatePickerModal';
import { TimePickerModal } from '../../components/modified_modules/react-native-paper-dates/Time/TimePickerModal';
import MapPreview from '../../components/molecules/MapPreview';
// import CandidateCard from '../../components/organisms/CandidateCard/CandidateCard';

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

const { useParam } = createParam<NonNullable<CalendarStackParamList['default']['EventScreen']>>();

const EventScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { token, userCompany, userEvents } = useTypedSelector(state => state.general);
  const [loading, setLoading] = useState<boolean>(false);
  const [eventType, setEventType] = useState<'meeting' | 'call'>('call');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showTimepicker, setShowTimepicker] = useState<'start' | 'end' | false>(false);
  const [showCalendar, setShowCalendar] = useState<'start' | 'end' | false>(false);
  const [startTime, setStartTime] = useState<Date>(normalizeTimeForPicker('start'));
  const [endTime, setEndTime] = useState<Date>(normalizeTimeForPicker('end'));
  const [displayStartHours, displayStartMinutes] = [startTime.getHours(), startTime.getMinutes()];
  const [displayEndHours, displayEndMinutes] = [endTime.getHours(), endTime.getMinutes()];
  const [selectedAdvert, setSelectedAdvert] = useState<UserAdvertType | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateDataType | null>(null);
  const [location, setLocation] = useState<AddressType | null>(null);

  const { setSwipeablePanelProps } = useActions();

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
    if (startDate.getTime() > new Date(endDate).getTime()) setEndDate(startDate);
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
        start_time: new Date(startDate.toISOString().split('T')[0] + 'T' + startTime.toISOString().split('T')[1]).toISOString(),
        end_time: new Date(endDate.toISOString().split('T')[0] + 'T' + endTime.toISOString().split('T')[1]).toISOString(),
        job_offer: selectedAdvert?.id as number,
        job_position: selectedAdvert?.job_position_id as number,
      }, token, userEvents));

      setLoading(false);

      setSwipeablePanelProps({
        title: 'Wydarzenie zostało stworzone!',
        defaultCloseAction: 'none',
        buttons: [
          {
            children: 'OK',
            closeAction: 'props-null',
            icon: <SvgIcon icon='check' />,
            onPress: () => router.replace({ stack: 'CalendarStack' }),
          },
        ],
      })
    }
  }

  const goToChooseAdvertScreen = () => {
    router.push({ stack: 'CalendarStack', screen: 'EventScreen', params: { subView: 'ChooseAdvertScreen', callback: setSelectedAdvert } });
  }

  const goToChooseCandidateScreen = () => {
    router.push({ stack: 'CalendarStack', screen: 'EventScreen', params: { subView: 'ChooseCandidateScreen', callback: setSelectedCandidate, candidates: selectedAdvert?.candidate_data || [] } });
  };

  return (
    <ScreenHeaderProvider backgroundColor={Colors.Basic100}>
      <ScrollView>
        <Typography weight="Bold" variant='h5' style={styles.Title}>
          Data i godzina*
        </Typography>
        <View style={{ margin: 18 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Button
                my={5}
                contentWeight='SemiBold'
                contentVariant='h5'
                variant="secondary"
                onPress={() => setShowCalendar('start')}
                borderRadius={4}
              >
                {startDate.toLocaleDateString()}
              </Button>
              <Button
                my={5}
                contentWeight='SemiBold'
                contentVariant='h5'
                variant="secondary"
                onPress={() => setShowTimepicker('start')}
                borderRadius={4}
              >
                {`${displayStartHours < 10 ? '0' : ''}${displayStartHours}`}
                {':'}
                {`${displayStartMinutes < 10 ? '0' : ''}${displayStartMinutes}`}
              </Button>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <SvgIcon icon='arrowRight' fill={Colors.Basic500} />
            </View>
            <View>
              <Button
                my={5}
                contentWeight='SemiBold'
                contentVariant='h5'
                variant="secondary"
                onPress={() => setShowCalendar('end')}
                borderRadius={4}
              >
                {endDate.toLocaleDateString()}
              </Button>
              <Button
                my={5}
                contentWeight='SemiBold'
                contentVariant='h5'
                variant="secondary"
                onPress={() => setShowTimepicker('end')}
                borderRadius={4}
              >
                {`${displayEndHours < 10 ? '0' : ''}${displayEndHours}`}
                {':'}
                {`${displayEndMinutes < 10 ? '0' : ''}${displayEndMinutes}`}
              </Button>
            </View>
          </View>
        </View>
        <DatePickerModal
          mode="single"
          visible={!!showCalendar}
          onDismiss={() => setShowCalendar(false)}
          date={showCalendar === 'start' ? startDate : endDate}
          onConfirm={({ date }) => {
            if (date) {
              showCalendar === 'start' ? setStartDate(date) : setEndDate(date);
            }
            setShowCalendar(false);
          }}
        />
        <TimePickerModal
          visible={!!showTimepicker}
          onDismiss={() => setShowTimepicker(false)}
          onConfirm={({ hours, minutes }) => {
            const time = new Date(`${new Date().toISOString().split('T')[0]}T${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:00`);

            showTimepicker === 'start' ? setStartTime(time) : setEndTime(time);
            setShowTimepicker(false);
          }}
          hours={showTimepicker === 'start' ? displayStartHours : displayEndHours}
          minutes={showTimepicker === 'start' ? displayStartMinutes : displayEndMinutes}
        />
        <Separator />
        <View style={{ marginVertical: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <Typography weight="Bold" variant='h5' style={[styles.Title, { marginTop: 0 }]}>
              Ogłoszenie*
            </Typography>
            {selectedAdvert && <TouchableOpacity
              style={{ marginRight: 18 }}
              onPress={goToChooseAdvertScreen}
            >
              <Typography style={{ textDecorationLine: 'underline' }} color={Colors.Blue500}>
                Zmień wybór
              </Typography>
            </TouchableOpacity>}
          </View>
          {selectedAdvert ?
            <AdvertSmall {...selectedAdvert} />
            :
            <Button
              variant='secondary'
              onPress={goToChooseAdvertScreen}
            >
              Wybierz Ogłoszenie
            </Button>
          }
        </View>
        {!!selectedAdvert && <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <Typography weight="Bold" variant='h5' style={[styles.Title, { marginTop: 0 }]}>
              Kandydat*
            </Typography>
            {selectedCandidate && <TouchableOpacity
              style={{ marginRight: 18 }}
              onPress={goToChooseCandidateScreen}
            >
              <Typography style={{ textDecorationLine: 'underline' }} color={Colors.Blue500}>
                Zmień wybór
              </Typography>
            </TouchableOpacity>}
          </View>
          {selectedCandidate ?
            <TouchableOpacity style={{ marginBottom: 10 }}
            // onPress={() => navigation.navigate('ProfileScreen', { candidateData: selectedCandidate })}
            >
              <CandidateCard {...selectedCandidate} />
            </TouchableOpacity>
            :
            <Button
              variant='secondary'
              onPress={goToChooseCandidateScreen}
            >
              Wybierz Kandydata
            </Button>
          }
        </View>}
        <Separator />
        <View>
          <Typography weight="Bold" variant='h5' style={[styles.Title, { marginTop: 24 }]}>
            Wybierz rodzaj wydarzenia
          </Typography>
          <RadioGroup
            name='eventType' ml={18} mt={10} mb={15}
            value={eventType} onValueChange={value => setEventType(value as 'meeting' | 'call')}
          >
            <RadioGroup.Item value="call" my={1} label='Połaczenie telefoniczne' />
            <RadioGroup.Item value="meeting" my={1} label='Spotkanie pod adresem' />
          </RadioGroup>
        </View>
        {eventType === 'meeting' && <>
          <Separator />
          <Typography weight="Bold" style={{ marginBottom: 8, marginLeft: 18, marginTop: 25 }} variant="h4">
            Lokalizacja*
          </Typography>
          <View style={{ marginBottom: 30 }}>
            <MapPreview
              place={location?.formattedAddress}
              latitude={location?.position?.lat}
              longitude={location?.position?.lng}
              onPress={() => router.push({
                stack: 'CalendarStack', screen: 'EventScreen', params: {
                  subView: 'GoogleMapScreen',
                  callback: (address) => setLocation(address),
                  initialAddress: location,
                  optionsType: 'address'
                }
              })}
            />
          </View>
        </>}
      </ScrollView>
      <Button
        disabled={loading || !(selectedCandidate && selectedAdvert)}
        withLoading={loading}
        stickyBottom
        onPress={addEventHandler}
      >
        Zaplanuj
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
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
