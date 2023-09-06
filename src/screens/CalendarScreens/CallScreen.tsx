import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
import { nativeStore } from '../../store';
import { calendarActionTypes } from '../../store/actions';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CalendarStackParamList, 'CallScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CalendarStack'>
>;

const CallScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const dataBookmark = useTypedSelector(state => state.bookmark);
  const dataCalendar = useTypedSelector(state => state.calendar);
  const [selectedPersons, setSelectedPersons] = useState([]);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showTimepicker, setShowTimepicker] = useState(false);
  const [selectedTimeChange, setSelectedTimeChange] = useState('start');
  const [selectedDay, setSelectedDay] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [selectedJobCategory, setSelectedJobCategory] = useState<number>(0);
  const [deletePersonsActive, setDeletePersonsActive] = useState(false);
  const [isPanelActive4, setIsPanelActive4] = useState(false);
  const [isPanelActive5, setIsPanelActive5] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    selectedPersons.length < 1 && setDeletePersonsActive(false),
      endTime < startTime && setEndTime(startTime);
  });

  const selectedPersonsNames = dataBookmark.persons
    .filter(item => selectedPersons.includes(item.index))
    .map(item => item.name);

  const jobsCategories = dataBookmark.persons
    .filter(item => item.bookmark !== 'blank')
    .map(a => a.job);
  const unique = {};
  const jobsCategoriesFiltered = jobsCategories.filter(
    item => !unique[item] && (unique[item] = true),
  );

  const StartHours = startTime.getHours();
  const StartMinutes = startTime.getMinutes();

  const EndHours = endTime.getHours();
  const EndMinutes = endTime.getMinutes();

  const [passDate, setPassDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const childToParent = childData => {
    setPassDate(childData.toISOString().split('T')[0]);
  };


  const swipePanels: SwipeablePanelProps[] = [
    {
      isActive: isPanelActive4,
      onClose: () => setIsPanelActive4(false),
      title: 'Czy chcesz dodać to wydarzenie do Twojego kalendarza?',
      buttons: [
        {
          children: (
            <>
              <View style={{ flexDirection: 'row' }}>
                <SvgIcon icon="phoneCall1" />
                <Typography
                  style={{
                    marginLeft: 12,
                    alignSelf: 'center',
                  }}>
                  Dodaj połączenie
                </Typography>
              </View>
            </>
          ),
          onPress: () =>
            passDate &&
            selectedPersons.length > 0 &&
            StartHours &&
            (nativeStore.dispatch({
              type: calendarActionTypes.ADD_EVENT,
              payload: {
                type: 'Połączenie',
                name: selectedPersonsNames,
                date: passDate,
                job: jobsCategoriesFiltered[selectedJobCategory],
                start: startTime,
                end: endTime,
                time:
                  StartHours.toString() +
                  ':' +
                  (StartMinutes < 10
                    ? '0' + StartMinutes.toString()
                    : StartMinutes.toString()) +
                  ' - ' +
                  EndHours.toString() +
                  ':' +
                  (EndMinutes < 10
                    ? '0' + EndMinutes.toString()
                    : EndMinutes.toString()),
              },
            }),
              navigation.navigate('MainScreen')),
        },
      ],
    },
    {
      isActive: isPanelActive5,
      onClose: () => setIsPanelActive5(false),
      title: 'Zaplanuj w kalendarzu',
      subTitle: 'Jaki rodzaj wydarzenia chcesz zaplanować?',
      buttons: [
        {
          children: (
            <>
              <View style={{ flexDirection: 'row' }}>
                <SvgIcon icon="meeting" />
                <Typography
                  style={{
                    marginLeft: 12,
                    alignSelf: 'center',
                  }}>
                  Zaplanuj spotkanie
                </Typography>
              </View>
            </>
          ),
          onPress: () => navigation.navigate('EventScreen'),
        },
        {
          children: (
            <>
              <View style={{ flexDirection: 'row' }}>
                <SvgIcon icon="phoneCall1" />
                <Typography
                  style={{
                    marginLeft: 12,
                    alignSelf: 'center',
                  }}>
                  Zaplanuj połączenie
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
    <ScreenHeaderProvider
      currentStack="CalendarStack"
            mainTitlePosition="flex-start"
      alterTitle={
        <View style={{ flexDirection: 'row' }}>
          <SvgIcon icon="meeting" />
          <Typography
            style={{
              marginLeft: 12,
              alignSelf: 'center',
            }}>
            Zaplanuj połączenie
          </Typography>
        </View>
      }
      actions={[
        {
          icon: <SvgIcon icon="threeDots" />,
          onPress: () => setIsPanelActive5(true),
        },
      ]}>
      <ScrollView style={styles.Wrapper}>
        <View>
          <Typography weight="Bold" style={[styles.Title, { marginTop: 24 }]}>
            Wybierz ogłoszenia
            <Typography style={{ color: Colors.Danger }}>*</Typography>
          </Typography>
          <ScrollView
            style={styles.jobCategories}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {jobsCategoriesFiltered.map((item, index) => (

              <HorizontalMenuButton
                name={item}
                selected={selectedJobCategory === index ? true : false}
                onPress={() =>
                  selectedJobCategory !== index
                    ? setSelectedJobCategory(index)
                    : setSelectedJobCategory(null)
                }
              />

            ))}
          </ScrollView>
        </View>

        <View style={styles.candidatesSlider}>
          <Typography weight="Bold" style={styles.Title}>
            Wybierz kandydatów
            <Typography style={{ color: Colors.Danger }}>*</Typography>
          </Typography>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.addIcon}>
              <SvgIcon icon="blankCandidate" style={{ alignSelf: 'center' }} />
              <Typography
                variant="small"
                style={{ alignSelf: 'center', color: Colors.Basic600 }}>
                Dodaj
              </Typography>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 9 }}>
              {dataBookmark.persons.map(
                (item, index) =>

                  item.bookmark !== 'blank' &&

                  (selectedJobCategory !== null
                    ? jobsCategoriesFiltered[selectedJobCategory].includes(item.job)
                    : item) &&

                  selectedPersons.includes(index + 1) === false &&

                  (
                    <TouchableOpacity
                      onPress={() =>
                        selectedPersons.includes(index + 1) === false &&
                        setSelectedPersons([...selectedPersons, index + 1])
                      }>
                      <View style={{ marginRight: 12, width: 85 }}>
                        <SvgIcon icon="woman" style={{ alignSelf: 'center' }} />
                        <Typography
                          variant="small"
                          style={{ alignSelf: 'center', textAlign: 'center' }}>
                          {item.name}
                        </Typography>
                        <SvgIcon
                          style={styles.Bookmark}
                          icon={item.bookmark === 'blank' ? "cardOutlined" : "cardFilled"}
                          fill={
                            dataBookmark.bookmarks[
                              dataBookmark.bookmarks
                                .map(item => item.category)
                                .indexOf(item.bookmark)
                            ].color
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  ),
              )}
            </ScrollView>
          </View>
        </View>

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
          {selectedPersons.length < 1 ? (
            <Typography
              weight="Regular"
              style={[styles.Title, { marginTop: 4 }]}>
              Brak kandydatów
            </Typography>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 9 }}>
              {dataBookmark.persons
                .map((item, index) => (

                  (selectedPersons.includes(item.index)) &&
                  <TouchableOpacity
                    onPress={
                      deletePersonsActive
                        ? () =>
                          setSelectedPersons(
                            selectedPersons.filter(i => i !== index + 1),
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
                        {item.name}
                      </Typography>
                      <SvgIcon
                        style={styles.Bookmark}
                        icon={deletePersonsActive ? 'remove' : item.bookmark === "blank" ? "cardOutlined" : 'cardFilled'}
                        fill={item.bookmark === "blank" ? Colors.Transparent :
                          dataBookmark.bookmarks[
                            dataBookmark.bookmarks
                              .map(item => item.category)
                              .indexOf(item.bookmark)
                          ].color
                        }
                      />
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          )}
        </View>

        <View style={{ marginTop: 24 }}>
          <ButtonRipple
            variant="secondary"
            onPress={() =>
              navigation.navigate('ResumesScreen', {
                selectedPersons: selectedPersons,
              })
            }>
            Zobacz CV kandydatów
          </ButtonRipple>
        </View>

        <View style={{ marginBottom: 19 }}>
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
                {passDate !== new Date().toISOString().split('T')[0]
                  ? passDate
                  : 'Dzisiaj'}
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
                  {StartHours +
                    ':' +
                    (StartMinutes > 9 ? StartMinutes : '0' + StartMinutes)}
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
                  {EndHours +
                    ':' +
                    (EndMinutes > 9 ? EndMinutes : '0' + EndMinutes)}
                </Typography>
              </View>
            </View>
          </View>
        </View>

        {showTimepicker && (
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
        )}
        <ButtonRipple
          variant="primary"
          onPress={() =>
            setIsPanelActive4(true)
          }>
          Potwierdź
        </ButtonRipple>
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

export default CallScreen;
