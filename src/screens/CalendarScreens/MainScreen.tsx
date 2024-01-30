import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { JobPositionType, UserEventType } from '../../store/reducers/types';
import { useActions } from '../../hooks/useActions';
import Colors from '../../colors/Colors';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Agenda from '../../components/organismes/Agenda';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import useRouter from '../../hooks/useRouter';

const MainScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { push } = useRouter();
  const { token, userEvents, jobIndustries, userData } = useTypedSelector(state => state.general);
  const [monthTitle, setMonthTitle] = useState<string>('');
  const { current: remindedEvents } = useRef<number[]>([]);
  const { setSwipeablePanelProps } = useActions();
  const [jobPositions, setJobPositions] = useState<JobPositionType[]>([]);

  useEffect(() => {
    setJobPositions(jobIndustries.reduce<JobPositionType[]>((prev, curr) => [...prev, ...curr.job_positions], []));
  }, [jobIndustries]);

  const remindEvent = (event: UserEventType, minutes?: number) => {
    //add multi reminder feature!!!!!
    if (!remindedEvents.includes(event.id)) {
      remindedEvents.push(event.id);
      const timeStart = new Date(event.start_time);
      const timeEnd = new Date(event.end_time);
      const [startHours, startMinutes] = [timeStart.getHours(), timeStart.getMinutes()];
      const [endHours, endMinutes] = [timeEnd.getHours(), timeEnd.getMinutes()];
      const streetName = event.location?.streetName || '';
      const streetNumber = event.location?.streetNumber || '';
      const city = event.location?.subAdminArea || '';
      setSwipeablePanelProps({
        backgroundColor: Colors.Basic100,
        defaultCloseAction: 'props-null',
        title: `Masz spotkanie za ${minutes ? Math.floor(minutes / 1000 / 60) : '10'} minut!`,
        children: (<View style={{
          flex: 1,
          height: 110,
          backgroundColor: Colors.White,
          paddingHorizontal: 30,
          paddingVertical: 15
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ height: '100%', flex: 1 }}>
              <Typography variant='h5'>
                {`${startHours > 9 ? startHours : `0${startHours}`}:${startMinutes > 9 ? startMinutes : `0${startMinutes}`}`}
                {' - '}
                {`${endHours > 9 ? endHours : `0${endHours}`}:${endMinutes > 9 ? endMinutes : `0${endMinutes}`}`}
              </Typography>
              <Typography numberOfLines={1} variant='h5' weight='SemiBold'>{event.candidate_first_name} {event.candidate_second_name}</Typography>
              <Typography numberOfLines={1} variant='h5' weight='SemiBold' color={Colors.Basic700} style={{ marginTop: 'auto' }}>{jobPositions.find(e => e.id === event.job_position)?.name}</Typography>
              <Typography numberOfLines={1}>{event.is_phone ? 'Połączenie' : `${streetName}${streetName && streetNumber ? ' ' : ''}${streetNumber}${(streetName || streetNumber) && city ? ', ' : ''}${city}`}</Typography>
            </View>
            <View style={{ alignItems: 'center', height: '100%' }}>
              <View style={{ width: 45, height: 45, borderRadius: 45, overflow: 'hidden', backgroundColor: Colors.Basic400, justifyContent: 'center', alignItems: 'center' }}>
                <Typography size={20} color={Colors.Basic600}>{event.candidate_first_name[0]?.toUpperCase() || ''}{event.candidate_second_name[0]?.toUpperCase() || ''}</Typography>
              </View>
              <View style={{ paddingTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                <SvgIcon icon={event.is_phone ? 'phoneCall1' : 'meeting'} style={{ transform: [{ scale: 1.3 }] }} />
              </View>
            </View>
          </View>
        </View>),
        buttons: [{
          children: 'OK',
          borderTop: false,
          onPress: () => { }
        }],
        closeButton: false
      });
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const events = userEvents.filter(e => new Date(e.start_time).getDate() === currentDate.getDate());

    const timers: NodeJS.Timeout[] = [];

    events.forEach(event => {
      const eventDate = new Date(event.start_time);
      const tenMinutes = 10 * 60 * 1000;
      const timeDiff = eventDate.getTime() - currentDate.getTime();
      if (timeDiff > 0) {
        if (timeDiff <= tenMinutes) remindEvent(event, timeDiff);
        else {
          const timerId = setTimeout(() => remindEvent(event), timeDiff - tenMinutes);
          timers.push(timerId);
        }
      }
    });

    return () => timers.forEach(timerId => clearTimeout(timerId));
  }, [userEvents]);

  return (<>
    <ScreenHeaderProvider staticContentHeightOnWeb mode="mainTitle" title={monthTitle}>
      <Agenda getCurrentDate={setMonthTitle} events={userEvents} />
    </ScreenHeaderProvider>
      {userData && <CornerCircleButton onPress={() => push({ stack: 'CalendarStack', screen: 'EventEditorScreen', params: undefined })} />}
  </>);
};

const styles = StyleSheet.create({

});

/*

  const swipePanels: SwipeablePanelProps[] = [
    {
      isActive: isPanelActive,
      onClose: () => setIsPanelActive(false),
      title: 'Kalkulator wynagrodzeń',
      subTitle: 'Trzymaj rękę na pulsie. Sprawdź, aktualne stawki na rynku pracy. 🎉😁 Nastąpi przekierowanie na inną stronę',
      buttons: [
        {
          children: 'Sprawdź',
          onPress: () => console.log('Kalkulator'),
        },
      ],
    },
    {
      isActive: isPanelActive1,
      onClose: () => setIsPanelActive1(false),
      title: 'Lista pytań do kandydata',
      subTitle: 'Nie wiesz, o co zapytać kandydata? Zobacz nasze propozycje! 🎉😁',
      buttons: [
        {
          children: 'Zobacz',
          onPress: () => navigation.navigate('QuestionEditorScreen'),
        },
      ],
    },
    {
      isActive: isPanelActive2,
      onClose: () => setIsPanelActive2(false),
      title: 'Ups! Twój pakiet wygasł. Przedłuż pakiet.',
      subTitle: '80zł/tydzień',
      buttons: [
        {
          children: 'Przedłuż pakiet',
          onPress: () => navigation.navigate('QuestionEditorScreen'),
        },
      ],
    },
    {
      isActive: isPanelActive3,
      onClose: () => setIsPanelActive3(false),
      title: 'Udostępnij kontakty 📞',
      subTitle: 'Halo? To ja, ELF! Pokaż mi swoje kontakty, a umówię Cię na spotkanie.',
      buttons: [
        {
          children: 'Akceptuj',
          onPress: () => navigation.navigate('MainScreen'),
        },
        {
          children: 'Zobacz więcej',
          onPress: () => navigation.navigate('MainScreen'),
        },
      ],
    },
    {
      isActive: isPanelActive4,
      onClose: () => setIsPanelActive4(false),
      title: 'Połącz kalendarze',
      subTitle: 'Połącz kalendarze ELF-a i Google, aby mieć wszystkie spotkania w jednym miejscu! Nastąpi przekierowanie na inną stronę.',
      buttons: [
        {
          children: 'Połącz',
          onPress: () => navigation.navigate('MainScreen'),
        },
      ],
    },
    {
      isActive: isPanelActive5,
      onClose: () => setIsPanelActive5(false),
      title: 'Zaplanuj w kalendarzu',
      buttons: [
        {
          children: (
            <>
              <View style={{ flexDirection: 'row' }}>
                <SvgIcon icon="meeting" />
                <Typography style={{ marginLeft: 12, alignSelf: 'center' }}>
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
*/
export default MainScreen;
