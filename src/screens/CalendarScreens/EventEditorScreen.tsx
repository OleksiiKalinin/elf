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
import { InitialPropsFromParams } from '../../hooks/types';
import FieldStatusCircle from '../../components/atoms/FieldStatusCircle';
import HorizontalButtonsSelector from '../../components/molecules/HorizontalButtonsSelector';
// import CandidateCard from '../../components/organisms/CandidateCard/CandidateCard';

const START_END_MINUTES_SPACE = 30;

const normalizeTimeForPicker = (mode: 'start' | 'end'): Date => {
  const now = Date.now();
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
      (mode === 'end' ? START_END_MINUTES_SPACE * 60 * 1000 : 0) //end time 30 minutes to future
    ) / (60 * 1000)) * (60 * 1000) //round to minutes
  );
}

type Props = NonNullable<CalendarStackParamList['default']['EventEditorScreen']>;

const { useParam } = createParam<Props>();

const EventEditorScreen: React.FC<InitialPropsFromParams<Props>> = ({ idInitial }) => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  // const [id] = useParam('id', { initial: idInitial });
  const { token, userCompany, userEvents } = useTypedSelector(state => state.general);
  const [loading, setLoading] = useState<boolean>(false);
  const [eventType, setEventType] = useState<'meeting' | 'call'>('meeting');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(normalizeTimeForPicker('start'));
  const [endTime, setEndTime] = useState<Date>(normalizeTimeForPicker('end'));
  const [showTimepicker, setShowTimepicker] = useState<'start' | 'end' | false>(false);
  const [showCalendar, setShowCalendar] = useState<'start' | 'end' | false>(false);
  const [selectedAdvert, setSelectedAdvert] = useState<UserAdvertType | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateDataType | null>(null);
  const [location, setLocation] = useState<AddressType | null>(null);
  const { setSwipeablePanelProps, setSnackbarMessage } = useActions();
  const [showTips, setShowTips] = useState<boolean>(true);

  const [displayStartHours, displayStartMinutes] = [startTime.getHours(), startTime.getMinutes()];
  const [displayEndHours, displayEndMinutes] = [endTime.getHours(), endTime.getMinutes()];

  const phoneNumber = true ? '+48 456 789 987' : null;

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
    if (startTime.getTime() > endTime.getTime()) {
      let minutesOffset = START_END_MINUTES_SPACE;
      const newDate = new Date(startTime.getTime() + minutesOffset * 60 * 1000);
      const [newHours, newMinutes] = [newDate.getHours(), newDate.getMinutes()];

      if (startTime.getHours() === 23 && newHours === 0) {
        minutesOffset = START_END_MINUTES_SPACE - newMinutes - 1;
      }

      setEndTime(new Date(startTime.getTime() + minutesOffset * 60 * 1000));
    }
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
        candidate_first_name: selectedCandidate?.first_name, //to delete
        candidate_second_name: selectedCandidate?.last_name, //to delete
        company_name: userCompany?.name as string, //to delete
        start_time: new Date(startDate.toISOString().split('T')[0] + 'T' + startTime.toISOString().split('T')[1]).toISOString(),
        end_time: new Date(endDate.toISOString().split('T')[0] + 'T' + endTime.toISOString().split('T')[1]).toISOString(),
        job_offer: selectedAdvert?.id as number,
        job_position: selectedAdvert?.job_position_id as number, //to delete
      }, userEvents));

      setLoading(false);

      setSnackbarMessage({ type: 'success', text: 'Wydarzenie zostało stworzone!' });
      router.replace({ stack: 'CalendarStack' });
      // setSwipeablePanelProps({
      //   title: 'Wydarzenie zostało stworzone!',
      //   defaultCloseAction: 'none',
      //   buttons: [
      //     {
      //       children: 'OK',
      //       closeAction: 'props-null',
      //       icon: <SvgIcon icon='check' />,
      //       onPress: () => router.replace({ stack: 'CalendarStack' }),
      //     },
      //   ],
      // })
    }
  }

  const goToChooseAdvertScreen = () => {
    router.push({ stack: 'CalendarStack', screen: 'EventEditorScreen', params: { subView: 'ChooseAdvertScreen', callback: setSelectedAdvert } });
  }

  const goToChooseCandidateScreen = () => {
    router.push({ stack: 'CalendarStack', screen: 'EventEditorScreen', params: { subView: 'ChooseCandidateScreen', callback: setSelectedCandidate, candidates: selectedAdvert?.candidate_data || [] } });
  };

  return (
    <ScreenHeaderProvider backgroundContent={Colors.Basic100}>
      <ScrollView>
        <View style={styles.Title}>
          <FieldStatusCircle
            status={true}
          />
          <View style={{ flex: 1 }}>
            <Typography weight="Bold" variant='h5' color='inherit'>
              Data i godzina
            </Typography>
            <Typography color={Colors.Basic600}>
              {new Date().toString().replace(/^.*(GMT)/i, '$1')}
            </Typography>
          </View>
        </View>
        <View style={{ margin: 18, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Button
              mb={7.5}
              contentWeight='SemiBold'
              contentVariant='h5'
              variant="secondary"
              onPress={() => setShowCalendar('start')}
              borderRadius={4}
            >
              {startDate.toLocaleDateString('pl')}
            </Button>
            <Button
              mt={7.5}
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
          <View style={{ justifyContent: 'center', marginHorizontal: 12 }}>
            <SvgIcon icon='arrowRight' fill={Colors.Basic500} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              mb={7.5}
              contentWeight='SemiBold'
              contentVariant='h5'
              variant="secondary"
              onPress={() => setShowCalendar('end')}
              borderRadius={4}
            >
              {endDate.toLocaleDateString('pl')}
            </Button>
            <Button
              mt={7.5}
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
        <View style={{ marginBottom: 19 }}>
          <View style={styles.Title}>
            <FieldStatusCircle
              status={!!selectedAdvert}
              warning={showTips && !selectedAdvert}
            />
            <Typography weight="Bold" variant='h5' color='inherit' style={{ flex: 1 }}>
              Ogłoszenie
            </Typography>
            <Button
              variant='TouchableOpacity'
              onPress={goToChooseAdvertScreen}
            >
              <Typography style={{ textDecorationLine: 'underline' }} color={Colors.Blue500}>
                {selectedAdvert ? 'Zmień wybór' : 'Dodaj'}
              </Typography>
            </Button>
          </View>
          {selectedAdvert && (
            <View style={{ marginHorizontal: 18, marginTop: 15, borderRadius: 4, overflow: 'hidden' }}>
              <AdvertSmall
                hideOptions
                hideCandidatesButton
                hideExtendActivityButton
                hideFooter
                {...selectedAdvert}
              />
            </View>
          )}
        </View>
        <Separator />
        <View style={{ marginBottom: 19 }}>
          <View style={styles.Title}>
            <FieldStatusCircle
              status={!!selectedCandidate}
              warning={showTips && !selectedCandidate}
            />
            <Typography weight="Bold" variant='h5' color='inherit' style={{ flex: 1 }}>
              Kandydat
            </Typography>
            <Button
              variant='TouchableOpacity'
              onPress={() => !!selectedAdvert ? goToChooseCandidateScreen() : setSnackbarMessage({ type: 'error', text: 'Najpierw wybierz ogłoszenie!' })}
            >
              <Typography style={{ textDecorationLine: 'underline' }} color={Colors.Blue500}>
                {selectedCandidate ? 'Zmień wybór' : 'Dodaj'}
              </Typography>
            </Button>
          </View>
          {selectedCandidate && (<>
            <View style={{ marginHorizontal: 18, marginTop: 15, borderRadius: 4, overflow: 'hidden' }}>
              <Button
                variant='TouchableOpacity'
              // onPress={() => navigation.navigate('ProfileScreen', { candidateData: selectedCandidate })}
              >
                <CandidateCard {...selectedCandidate} />
              </Button>
            </View>
            <View style={{ marginHorizontal: 18, marginTop: 10 }}>
              {!!phoneNumber ? (
                <Typography>
                  {'Numer kontaktowy: '}
                  <Typography weight='Bold'>
                    {phoneNumber}
                  </Typography>
                </Typography>
              ) : (
                <Typography color={Colors.Danger70}>
                  Brak numeru kontaktowego
                </Typography>
              )}
            </View>
          </>)}
        </View>
        <Separator />
        <View>
          <View style={styles.Title}>
            <FieldStatusCircle
              status={!!eventType}
              warning={showTips && !selectedCandidate}
            />
            <Typography weight="Bold" variant='h5' color='inherit' style={{ flex: 1 }}>
              Rodzaj wydarzenia
            </Typography>
          </View>
          <HorizontalButtonsSelector
            data={[
              { id: 'call', name: 'Telefonicznie', disabled: !phoneNumber },
              { id: 'meeting', name: 'Na miejscu' }
            ]}
            selected={eventType}
            onSelect={(id) => setEventType(id as 'meeting' | 'call')}
            contentContainerStyle={{ marginVertical: 19 }}
          />
          {/* <RadioGroup
            name='eventType' mx={18} mt={10} mb={15}
            value={eventType} onValueChange={value => setEventType(value as 'meeting' | 'call')}
          >
            <RadioGroup.Item containerProps={{ flexDirection: 'row-reverse' }} value="call" my={1} label='Połaczenie telefoniczne' />
            <RadioGroup.Item containerProps={{ flexDirection: 'row-reverse' }} value="meeting" my={1} label='Spotkanie pod adresem' />
          </RadioGroup> */}
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
                stack: 'CalendarStack', screen: 'EventEditorScreen', params: {
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
    // color: Colors.Basic600,
    marginHorizontal: 19,
    marginTop: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default EventEditorScreen;
