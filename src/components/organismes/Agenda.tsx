import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Agenda as Agnd, LocaleConfig } from '../modified_modules/react-native-calendars/src';
import Colors from '../../colors/Colors';
import SvgIcon from '../atoms/SvgIcon';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { JobPositionType, UserEventType } from '../../store/reducers/types';
import { AgendaEntry, DateData } from '../modified_modules/react-native-calendars/src/types';
import { useActions } from '../../hooks/useActions';
import Lodash from "lodash";
import Typography from '../atoms/Typography';
import useRouter from '../../hooks/useRouter';
import Button from '../molecules/Button';

type ScheduleType = {
    [k: string]: ItemType[]
}

type ItemType = {
    id: number,
    address: string,
    timeStart: string,
    timeEnd: string,
    isPhoneCall: string,
    firstName: string,
    lastName: string,
    jobPosition: string,
} & AgendaEntry;

const Agenda: React.FC<{ getCurrentDate: (s: string) => void, events: UserEventType[] }> = ({ getCurrentDate, events }) => {
    const [date] = useState<string>(new Date().toISOString().replace(/T.*$/, ''));
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const calendarLocale = LocaleConfig.locales['pl'];
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = React.useState<ScheduleType>({});
    const { jobIndustries } = useTypedSelector(s => s.general);
    const [jobPositions, setJobPositions] = useState<JobPositionType[]>([]);
    const { setSwipeablePanelProps } = useActions();
    const { push } = useRouter();

    useEffect(() => {
        const [year, month] = date.split('-');
        getCurrentDate && getCurrentDate(`${calendarLocale.monthNames?.[Number(month) - 1]} ${Number(year)}`);
    }, []);

    // useEffect(() => {
    //     setloaded(true);
    // }, [])

    useEffect(() => {
        setJobPositions(jobIndustries.reduce<JobPositionType[]>((prev, curr) => [...prev, ...curr.job_positions], []));
    }, [jobIndustries]);

    useEffect(() => {
        !!jobPositions.length && setItems((prev: any) => ({
            ...prev,
            ...events.reduce<{ [k: string]: any[] }>((prev, curr) => {
                const currDay = curr.start_time.split('T')[0];
                const timeStart = new Date(curr.start_time);
                const timeEnd = new Date(curr.end_time);
                const [startHours, startMinutes] = [timeStart.getHours(), timeStart.getMinutes()];
                const [endHours, endMinutes] = [timeEnd.getHours(), timeEnd.getMinutes()];
                const streetName = curr.location?.streetName || '';
                const streetNumber = curr.location?.streetNumber || '';
                const city = curr.location?.subAdminArea || '';
                return {
                    ...prev,
                    [currDay]: [...(prev[currDay] ? prev[currDay] : []), {
                        id: curr.id,
                        address: `${streetName}${streetName && streetNumber ? ' ' : ''}${streetNumber}${(streetName || streetNumber) && city ? ', ' : ''}${city}`,
                        timeStart: `${startHours > 9 ? startHours : `0${startHours}`}:${startMinutes > 9 ? startMinutes : `0${startMinutes}`}`,
                        timeEnd: `${endHours > 9 ? endHours : `0${endHours}`}:${endMinutes > 9 ? endMinutes : `0${endMinutes}`}`,
                        isPhoneCall: curr.is_phone,
                        firstName: curr.candidate_first_name,
                        lastName: curr.candidate_second_name,
                        jobPosition: jobPositions.find(e => e.id === curr.job_position)?.name,
                        sortBy: timeStart.getTime()
                    }].sort((a, b) => a.sortBy - b.sortBy)
                }
            }, {})
        }))
    }, [events, jobPositions]);

    const loadItems = ({ timestamp }: DateData) => {
        const newItems = Lodash.clone(items);
        for (let i = -15; i < 85; i++) {
            const startDay = new Date(timestamp + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            if (!newItems[startDay]) newItems[startDay] = [];
        }
        setItems(newItems);
    }

    return (
        <Agnd
            items={items}
            loadItemsForMonth={loadItems}
            markingType='multi-dot'
            markedDates={Object.keys(items).reduce((prev, date) => ({
                ...prev,
                [date]: { dots: new Array(Math.min(items[date].length, 3)).fill(0).map(() => ({ color: Colors.Basic600 })) }
            }), {})}
            onCalendarToggled={setIsOpened}
            selected={date}
            pastScrollRange={6}
            futureScrollRange={12}
            renderItem={(item, firstItemInDay) => {
                const { timeStart, timeEnd, isPhoneCall, address, firstName, lastName, jobPosition, id } = item as ItemType;
                return (
                    <Button 
                        variant='TouchableOpacity'
                        onPress={() => push({ stack: 'CalendarStack', screen: 'EventScreen', params: { id: id.toString() } })}
                        style={{
                            minHeight: 110,
                            backgroundColor: Colors.White,
                            // borderRadius: 10,
                            marginRight: 14,
                            marginTop: firstItemInDay ? 25 : 15
                        }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, padding: 10, }}>
                            <View style={{ height: '100%', flex: 1, alignItems: 'flex-start' }}>
                                <Typography variant='h5'>{timeStart} - {timeEnd}</Typography>
                                <Typography variant='h5' weight='SemiBold'>{firstName} {lastName}</Typography>
                                <Typography variant='h5' weight='SemiBold' color={Colors.Basic700} style={{ marginTop: 'auto' }}>{jobPosition}</Typography>
                                <Typography>{isPhoneCall ? 'Połączenie' : address}</Typography>
                            </View>
                            <View style={{ alignItems: 'center', height: '100%' }}>
                                <View style={{ width: 45, height: 45, borderRadius: 45, overflow: 'hidden', backgroundColor: Colors.Basic400, justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography size={20} color={Colors.Basic600}>{firstName[0]?.toUpperCase() || ''}{lastName[0]?.toUpperCase() || ''}</Typography>
                                </View>
                                <View style={{ paddingTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgIcon icon={isPhoneCall ? 'phoneCall1' : 'meeting'} style={{ transform: [{ scale: 1.3 }] }} />
                                </View>
                            </View>
                        </View>
                    </Button>
                )
            }}
            renderEmptyDate={() => <View style={{ paddingTop: 45, paddingRight: 14 }}>
                <View style={{ height: 2, backgroundColor: Colors.Basic400 }} />
            </View>}
            renderKnob={() => <SvgIcon fill={Colors.Basic500} icon={isOpened ? 'arrowTop' : 'arrowBottom'} />}
            showClosingKnob
            firstDay={1}
            day
            theme={{
                agendaDayTextColor: Colors.Basic600,
                agendaDayNumColor: Colors.Basic600,
                agendaTodayColor: Colors.Basic900,
                selectedDayBackgroundColor: Colors.Basic900,
                dotColor: Colors.Basic600,
                textDayFontFamily: 'RedHatDisplay-SemiBold',
                textDayFontWeight: '600',
                textDayFontSize: 17,
                dayTextColor: Colors.Basic700,
                monthTextColor: Colors.Basic900,
                textMonthFontFamily: 'RedHatDisplay-Bold',
                textMonthFontWeight: '700',
                textMonthFontSize: 20,
                textDayHeaderFontFamily: 'RedHatDisplay-Medium',
                todayDotColor: Colors.Basic900,
                selectedDotColor: Colors.Basic900,
                dotStyle: {
                    width: 5,
                    height: 5,
                    borderRadius: 2.5,
                    marginTop: 6,
                },
                //@ts-ignore
                'stylesheet.day.basic': {
                    todayText: {
                        fontFamily: 'RedHatDisplay-Bold',
                        fontWeight: '700',
                        fontSize: 17,
                        color: Colors.Basic900,
                    }
                },
                'stylesheet.agenda.main': {
                    knobContainer: {
                        flex: 1,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: 50,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.White
                    },
                    weekdays: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingBottom: 5,
                        backgroundColor: Colors.White,
                    },
                    dayHeader: {
                        flex: 1,
                        textAlign: 'center',
                        fontFamily: 'RedHatDisplay-Medium',
                        fontWeight: '500',
                        fontSize: 13,
                        color: "#b6c1cd",
                    },
                    reservations: {
                        flex: 1,
                        marginTop: 124,
                        backgroundColor: Colors.Basic100,
                    },
                }
            }}
            onDayChange={date => getCurrentDate(`${calendarLocale.monthNames?.[(date as any).month - 1]} ${(date as any).year}`)}
            onDayPress={date => getCurrentDate(`${calendarLocale.monthNames?.[date.month - 1]} ${date.year}`)}
        />
    );
};

export default Agenda;