import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../colors/Colors';
import { RootStackParamList } from '../../navigators/RootNavigator';
import {
  CompositeScreenProps,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
// import { LocaleConfig as CalendarLocaleConfig } from '../../../node_modules_modified/react-native-calendars/src';
import { CandidateDataType, JobPositionType } from '../../store/reducers/types';
import { useDispatch } from 'react-redux';
import advertsServices from '../../services/advertsServices';
import LoadingScreen from '../../components/atoms/LoadingScreen';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';

type MenuScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MenuStackParamList, 'EventsScreen'>,
  NativeStackScreenProps<RootStackParamList, 'MenuStack'>
>;

const EventsScreen: React.FC<MenuScreenProps> = ({ navigation }) => {
  const dispatch = useTypedDispatch();
  const { userEvents, jobIndustries, token } = useTypedSelector(state => state.general);
  const [jobPositions, setJobPositions] = useState<JobPositionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setJobPositions(jobIndustries.reduce<JobPositionType[]>((prev, curr) => [...prev, ...curr.job_positions], []));
  }, [jobIndustries]);

  const openProfile = async (id: number) => {
    // setLoading(true);
    // const res = await dispatch(advertsServices.getAdvertCandidates(token, [id])) as unknown as CandidateDataType[];
    // setLoading(false);
    // if (res[0]) navigation.navigate('ProfileScreen', { candidateData: res[0] })
  }

  return (
    <View style={styles.Wrapper}>
      <ScreenHeaderProvider>
        {loading ? <LoadingScreen /> :
          <ScrollView contentContainerStyle={{paddingBottom: 24}} style={{ backgroundColor: Colors.Basic100 }}>
            {!!userEvents.length ? userEvents.sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime()).map((event, index, array) => {
              const timeStart = new Date(event.start_time);
              if (timeStart.getTime() > Date.now()) return null;

              const timeEnd = new Date(event.end_time);
              const [startHours, startMinutes] = [timeStart.getHours(), timeStart.getMinutes()];
              const [endHours, endMinutes] = [timeEnd.getHours(), timeEnd.getMinutes()];
              const streetName = event.location?.streetName || '';
              const streetNumber = event.location?.streetNumber || '';
              const city = event.location?.subAdminArea || '';
              return (
                <View style={{marginTop: 16}}>
                  {timeStart.getDate() !== new Date(array[index-1]?.start_time).getDate() && <Typography
                    variant="h5"
                    weight="Bold"
                    color={Colors.Basic600}
                    style={{ marginVertical: 8, paddingHorizontal: 19 }}
                  >
                    {/* {CalendarLocaleConfig.locales['pl'].dayNames[new Date(event.start_time).getDay()]}
                    {', '}
                    {new Date(event.start_time).getDate()} {CalendarLocaleConfig.locales['pl'].monthNamesShort[new Date(event.start_time).getMonth()].toLowerCase()} */}
                  </Typography>}
                  <TouchableOpacity onPress={() => openProfile(event.attendees[0].candidate.candidate_id)} style={{
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
                  </TouchableOpacity>
                </View>
              )
            }) : (
              <Typography style={{padding: 19}}>Nie masz wydarzeń!</Typography>
            )}
          </ScrollView>}
      </ScreenHeaderProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.Basic200,
  },
  horizontalButton: {
    backgroundColor: Colors.White,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 5,
  },
  gridButton: {
    backgroundColor: Colors.White,
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: Colors.Basic600,
    shadowOpacity: 1,
    elevation: 15,
  },
  tag: {
    position: 'absolute',
    backgroundColor: Colors.Basic900,
    paddingHorizontal: 4,
    fontSize: 9,
    borderRadius: 10,
    right: 7,
    top: -2,
  },
  tagAlter: {
    position: 'absolute',
    backgroundColor: Colors.Basic900,
    paddingHorizontal: 8,
    borderRadius: 20,
    fontSize: 14,
    left: 4,
    top: 4,
  },
  badge: {
    position: 'absolute',
    fontSize: 10,
    backgroundColor: Colors.Yellow500,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    right: 4,
    top: 4,
  },
  horizontalButtonText: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginRight: 7,
  },
  Event: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: Colors.Basic300,
  },
});

export default EventsScreen;
