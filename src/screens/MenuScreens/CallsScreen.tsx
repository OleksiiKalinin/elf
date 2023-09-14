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
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
// import { LocaleConfig as CalendarLocaleConfig } from '../../../node_modules_modified/react-native-calendars/src';

type MenuScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MenuStackParamList, 'CallsScreen'>,
  NativeStackScreenProps<RootStackParamList, 'MenuStack'>
>;

const CallsScreen: React.FC<MenuScreenProps> = ({ navigation }) => {
  // const dataCalendar = useTypedSelector(state => state.calendar);
  const {userEvents} = useTypedSelector(state => state.general);

  return (
    <View style={styles.Wrapper}>
      <ScreenHeaderProvider>
        <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
          {userEvents.sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime()).map((item) => (
            <View>
              <Typography
                variant="h5"
                weight="Bold"
                color={Colors.Basic600}
                style={{ marginTop: 16, marginLeft: 19 }}
              >
                {/* {CalendarLocaleConfig.locales['pl'].dayNames[new Date(item.start_time).getDay()]}
                {', '}
                {new Date(item.start_time).getDate()} {CalendarLocaleConfig.locales['pl'].monthNamesShort[new Date(item.start_time).getMonth()].toLowerCase()} */}
              </Typography>

              {/* {dataCalendar.calendar
                .filter(k => k.date === item)
                .filter(a => a.details[0].type === 'Połączenie')
                .map(i => (
                  <TouchableOpacity
                    onPress={() => {}}>
                    <View style={styles.Event}>
                      <View style={{ flexDirection: 'row' }}>
                        <SvgIcon icon="woman" />
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            marginLeft: 12,
                          }}>
                          <Typography weight="SemiBold" color={Colors.Basic700}>
                            {i.details[0].type}
                          </Typography>
                          <Typography
                            variant="small"
                            weight="SemiBold"
                            color={Colors.Basic700}>
                            {i.details[0].job}
                          </Typography>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                        <Typography
                          weight="SemiBold"
                          color={Colors.Basic900}
                          style={{ textAlign: 'right' }}>
                          {i.details[0].time}
                        </Typography>
                        <Typography
                          weight="SemiBold"
                          variant="small"
                          color={Colors.Basic900}
                          style={{ textAlign: 'right' }}>
                          {i.details[0].name.length > 1
                            ? i.details[0].name[0] + ', ...'
                            : i.details[0].name}
                        </Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))} */}
            </View>
          ))}
        </ScrollView>
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

export default CallsScreen;
