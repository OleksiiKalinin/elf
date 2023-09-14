import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Touchable, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { nativeStore } from '../../store';
import { calendarActionTypes } from '../../store/actions';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { SwipeablePanelProps } from '../../components/organismes/SwipeablePanel';
import Button from '../../components/molecules/Button';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CalendarStackParamList, 'EditEventScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CalendarStack'>
>;

const EditEventScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  // const { latitude, longitude, place, editDay, editIndex } = route.params;

  // const dataBookmark = useTypedSelector(state => state.bookmark);
  // const dataCalendar = useTypedSelector(state => state.calendar);

  const [selectedPersons, setSelectedPersons] = useState([]);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showTimepicker, setShowTimepicker] = useState(false);
  const [selectedTimeChange, setSelectedTimeChange] = useState('start');
  // const [selectedDay, setSelectedDay] = useState(editDay);
  // const [changedDay, setChangedDay] = useState(editDay);
  const [deletePersonsActive, setDeletePersonsActive] = useState(false);
  const [isPanelActive, setIsPanelActive] = useState(false);

  // const selectedEvent = dataCalendar.calendar.filter(
  //   item => item.date === editDay,
  // )[editIndex].details[0];

  // console.log(editDay)

  // const [startTime, setStartTime] = useState(selectedEvent.start);
  // const [endTime, setEndTime] = useState(selectedEvent.end);

  // const selectedPersonsNames = dataBookmark.persons
  //   .filter(item => selectedPersons.includes(item.index))
  //   .map(item => item.name);

  // useEffect(() => {
  //   selectedPersons.length < 1 && setDeletePersonsActive(false),
  //     endTime < startTime && setEndTime(startTime);
  // });

  // const jobsCategories = dataBookmark.persons
  //   .filter(item => item.name == selectedEvent.name)
  //   .map(a => a.job);
  // const uniq = {};
  // const jobsCategoriesFiltered = jobsCategories.filter(
  //   obj => !uniq[obj] && (uniq[obj] = true),
  // );

  // const StartHours = startTime.getHours();
  // const StartMinutes = startTime.getMinutes();

  // const EndHours = endTime.getHours();
  // const EndMinutes = endTime.getMinutes();

  const [passDate, setPassDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const childToParent = (childData: any) => {
    setPassDate(childData.toISOString().split('T')[0]);
  };

  const swipePanels: SwipeablePanelProps[] = [
    {
      isActive: isPanelActive,
      onClose: () => setIsPanelActive(false),
      title: 'Czy chcesz usunąć wydarzenie?',
      buttons: [
        {
          children: (
            <>
              <View style={{ flexDirection: 'row' }}>
                <Typography
                  color={Colors.Danger}
                  style={{
                    marginLeft: 12,
                    alignSelf: 'center',
                  }}>
                  Tak
                </Typography>
              </View>
            </>
          ),
          onPress: () => {
            // navigation.navigate('MainScreen'),
            //   nativeStore.dispatch({
            //     type: calendarActionTypes.REMOVE_EVENT,
            //     payload: {
            //       Index: editIndex,
            //       Day: editDay,
            //     },
            //   });
          },
        },
        {
          children: (
            <>
              <View style={{ flexDirection: 'row' }}>
                <Typography
                  style={{
                    marginLeft: 12,
                    alignSelf: 'center',
                  }}>
                  Nie
                </Typography>
              </View>
            </>
          ),
          onPress: () => navigation.navigate('CallScreen'),
        },
      ],
    },
  ];

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start"
      alterTitle={
        <View style={{ flexDirection: 'row' }}>
          <SvgIcon icon="meeting" />
          <Typography
            style={{
              marginLeft: 12,
              alignSelf: 'center',
            }}>
            Edytuj spotkanie
          </Typography>
        </View>
      }
      actions={[
        {
          icon: 'threeDots',
          onPress: () => setIsPanelActive(true),
        },
      ]}
    >
      <ScrollView style={styles.Wrapper}>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography weight="Bold" style={styles.Title}>
              Wybrani kandydaci
            </Typography>
            {selectedPersons.length > 0 && (
              <Typography
                style={[styles.Title, { marginRight: 24, color: Colors.Blue500 }]}
                onPress={
                  deletePersonsActive
                    ? () => setDeletePersonsActive(false)
                    : () => setDeletePersonsActive(true)
                }>
                {deletePersonsActive ? 'Potwierdź' : 'Edytuj'}
              </Typography>
            )}
          </View>
          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 9 }}>
            {dataBookmark.persons

              .map(({ name, bookmark, index }) =>

                (
                  name === selectedEvent.name[0] ||
                  name === selectedEvent.name[1] ||
                  name === selectedEvent.name[2] ||
                  name === selectedEvent.name[3])
                &&
                (
                  <TouchableOpacity
                    onPress={
                      deletePersonsActive
                        ? () =>
                          setSelectedPersons(
                            selectedPersons.filter(i => i !== index),
                          )
                        : () => ''
                    }
                    onLongPress={() => setDeletePersonsActive(true)}
                    delayLongPress={500}>
                    <View style={{ marginRight: 12, width: 85 }}>
                      <SvgIcon icon="woman" style={{ alignSelf: 'center' }} />
                      <Typography
                        variant="small"
                        style={{ alignSelf: 'center', textAlign: 'center' }}>
                        {name}
                      </Typography>
                      {bookmark !== 'blank' && (
                        <SvgIcon
                          style={styles.Bookmark}
                          icon={deletePersonsActive ? 'remove' : 'cardFilled'}
                          fill={dataBookmark.bookmarks[dataBookmark.bookmarks.map(item => item.category).indexOf(bookmark)].color}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
          </ScrollView> */}
        </View>

        <View style={{ marginTop: 24 }}>
          {/* <ButtonRipple
            variant="secondary"
            onPress={() =>
              navigation.navigate('ResumesScreen', {
                selectedPersons: selectedPersons,
              })
            }>
            Zobacz CV kandydatów
          </ButtonRipple> */}
        </View>

        <View>
          <Typography
            weight="Bold"
            style={[
              styles.Title,
              { borderTopWidth: 1, borderColor: Colors.Basic300, paddingTop: 18 },
            ]}>
            Data i godzina
            <Typography style={{ color: Colors.Danger }}>
              <Typography style={{ color: Colors.Danger }}>*</Typography>
            </Typography>
          </Typography>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Typography weight="SemiBold" style={styles.Title}>
                Data
              </Typography>
              <Typography
                weight="SemiBold"
                style={[
                  styles.Date,
                  showCalendar && { backgroundColor: Colors.Basic400 },
                ]}
                onPress={() => (
                  setShowTimepicker(false),
                  showCalendar === false
                    ? setShowCalendar(true)
                    : setShowCalendar(false)
                )}>
                {/* {selectedDay !== new Date().toISOString().split('T')[0]
                  ? selectedDay
                  : 'Dzisiaj'} */}
              </Typography>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 38 }}>
              <View>
                <Typography weight="SemiBold" style={styles.Title}>
                  Początek
                </Typography>
                <Typography
                  weight="SemiBold"
                  style={[
                    styles.Date,
                    { width: 73 },
                    selectedTimeChange === 'start' &&
                    showTimepicker && {
                      backgroundColor: Colors.Basic400,
                    },
                  ]}
                  onPress={() => (
                    setShowCalendar(false),
                    setSelectedTimeChange('start'),
                    showTimepicker && selectedTimeChange === 'start'
                      ? setShowTimepicker(false)
                      : setShowTimepicker(true)
                  )}>
                  {/* {StartHours +
                    ':' +
                    (StartMinutes > 9 ? StartMinutes : '0' + StartMinutes)} */}
                </Typography>
              </View>
              <View>
                <Typography weight="SemiBold" style={styles.Title}>
                  Koniec
                </Typography>
                <Typography
                  weight="SemiBold"
                  style={[
                    styles.Date,
                    { width: 73 },
                    selectedTimeChange === 'end' &&
                    showTimepicker && {
                      backgroundColor: Colors.Basic400,
                    },
                  ]}
                  onPress={() => (
                    setShowCalendar(false),
                    setSelectedTimeChange('end'),
                    showTimepicker && selectedTimeChange === 'end'
                      ? setShowTimepicker(false)
                      : setShowTimepicker(true)
                  )}>
                  {/* {EndHours +
                    ':' +
                    (EndMinutes > 9 ? EndMinutes : '0' + EndMinutes)} */}
                </Typography>
              </View>
            </View>
          </View>
        </View>

        {/* {showTimepicker && (
          <View style={styles.timePicker}>
            <DatePicker
              style={{
                alignSelf: 'center',
              }}
              date={selectedTimeChange === 'start' ? startTime : endTime}
              onDateChange={date => {
                selectedTimeChange === 'start'
                  ? (setStartTime(date), setEndTime(date))
                  : setEndTime(date);
              }}
              mode="time"
              is24hourSource="locale"
              locale="pl"
              minuteInterval={5}
              fadeToColor={Colors.Basic100}
            />
          </View>
        )} */}

        {/* <SmallMap
          place={place}
          onPress={
            (() => navigation.navigate('MapScreen',
              {
                path: 'EditScreen',
                editDay: editDay,
                editIndex: editIndex,
              }))
          }
          latitude={latitude}
          longitude={longitude}
        /> */}
        <Button
          variant="primary"
        // onPress={() =>
        //   selectedDay &&
        //   StartHours &&
        //   (nativeStore.dispatch({
        //     type: calendarActionTypes.EDIT_EVENT,
        //     payload: {
        //       type: 'Spotkanie',
        //       name: selectedPersonsNames,
        //       date: passDate,
        //       job: jobsCategoriesFiltered[0],
        //       start: startTime,
        //       end: endTime,
        //       latitude: latitude,
        //       longitude: longitude,
        //       time:
        //         StartHours.toString() +
        //         ':' +
        //         (StartMinutes < 10
        //           ? '0' + StartMinutes.toString()
        //           : StartMinutes.toString()) +
        //         ' - ' +
        //         EndHours.toString() +
        //         ':' +
        //         (EndMinutes < 10
        //           ? '0' + EndMinutes.toString()
        //           : EndMinutes.toString()),
        //     },
        //   }),
        //     navigation.navigate('MainScreen'))
        // }
        >
          Potwierdź
        </Button>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.Basic300,
    paddingBottom: 27,
  },
  timePicker: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: Colors.Basic300,
    borderTopColor: Colors.Basic300,
    marginVertical: 17,
  },
});

export default EditEventScreen;
