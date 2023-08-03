import { useEffect, useState } from 'react';
import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  XStack,
  YStack,
} from 'tamagui';
import { View, Text, TouchableOpacity, Alert, Platform, Dimensions } from "react-native";
import { ArrowDown, ArrowUp, Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useLink } from 'solito/link';
import CheckBox from '../../components/atoms/CheckBox/CheckBox';
import Switch from '../../components/atoms/Switch/Switch';
import Colors from '../../colors/Colors';
import { Agenda } from '../../../node_modules_modified/react-native-calendars/src';
// import { Agenda, AgendaEntry, AgendaSchedule, DateData } from '../../../node_modules_modified/react-native-calendars/src';
// import { Agenda, AgendaEntry, AgendaSchedule, DateData } from 'react-native-calendars';

export function Home() {
  const [items, setitems] = useState<any>({})
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [loaded, setloaded] = useState<boolean>(false);

  useEffect(() => {
    setloaded(true);
  }, [])

  const linkProps = useLink({
    href: '/user/nate',
  });

  const loadItems = (day: any) => {

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }

      const newItems: any = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setitems(newItems)
    }, 1000);
  };

  const rowHasChanged = (r1: any, r2: any) => {
    return r1.name !== r2.name;
  };

  function timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  return (
    <XStack style={{ height: Platform.OS === 'web' ? Dimensions.get('window').height : undefined }} f={1}>
      {loaded && <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        markingType='multi-dot'
        markedDates={Object.keys(items).reduce((prev, date) => ({
          ...prev,
          [date]: { dots: new Array(Math.min(items[date].length, 3)).fill(0).map(() => ({ color: Colors.Basic600 })) }
        }), {})}
        onCalendarToggled={setIsOpened}
        selected={'2023-08-03'}
        pastScrollRange={6}
        futureScrollRange={12}
        rowHasChanged={rowHasChanged}
        renderItem={(item, firstItemInDay) => {
          // const { timeStart, timeEnd, isPhoneCall, address, firstName, lastName, jobPosition, id } = item as ItemType;
          return (
            <TouchableOpacity
              // onPress={() => options(id)} 
              style={{
                flex: 1,
                height: 110,
                backgroundColor: Colors.White,
                // borderRadius: 10,
                padding: 10,
                marginRight: 14,
                marginTop: firstItemInDay ? 25 : 15
              }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ height: '100%', flex: 1 }}>
                  {/* <Typography variant='h5'>{timeStart} - {timeEnd}</Typography>
                  <Typography numberOfLines={1} variant='h5' weight='SemiBold'>{firstName} {lastName}</Typography>
                  <Typography numberOfLines={1} variant='h5' weight='SemiBold' color={Colors.Basic700} style={{ marginTop: 'auto' }}>{jobPosition}</Typography>
                  <Typography numberOfLines={1}>{isPhoneCall ? 'Połączenie' : address}</Typography> */}
                  <Text>{`{timeStart} - {timeEnd}`}</Text>
                  <Text numberOfLines={1}>{`{firstName} {lastName}`}</Text>
                  <Text numberOfLines={1} style={{ marginTop: 'auto' }}>{`{jobPosition}`}</Text>
                  <Text numberOfLines={1}>{`{isPhoneCall ? 'Połączenie' : address}`}</Text>
                </View>
                <View style={{ alignItems: 'center', height: '100%' }}>
                  <View style={{ width: 45, height: 45, borderRadius: 45, overflow: 'hidden', backgroundColor: Colors.Basic400, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Typography size={20} color={Colors.Basic600}>{firstName[0]?.toUpperCase() || ''}{lastName[0]?.toUpperCase() || ''}</Typography> */}
                  </View>
                  <View style={{ paddingTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <SvgIcon icon={isPhoneCall ? 'phoneCall1' : 'meeting'} style={{ transform: [{ scale: 1.3 }] }} /> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
        calendarInitialOffset={130}
        renderKnob={() => isOpened ? <ArrowUp color='black' /> : <ArrowDown color='black' />}
        // renderEmptyDate={() => <View style={{ flex: 1, paddingTop: 45, paddingRight: 14 }}>
        //     <Divider height='2px' />
        // </View>}
        // renderKnob={() => <SvgIcon fill={Colors.Basic500} icon={isOpened ? 'arrowTop' : 'arrowBottom'} />}
        showClosingKnob
        firstDay={1}
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
            marginTop: 8,
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
              paddingLeft: 24,
              paddingRight: 24,
              paddingBottom: 5,
              backgroundColor: Colors.White,
            },
            reservations: {
              flex: 1,
              marginTop: 124,
              backgroundColor: Colors.Basic100,
            },
          }
        }}
      // onDayChange={date => getCurrentDate(`${LocaleConfig.locales['pl'].monthNames[date.month - 1]} ${date.year}`)}
      // onDayPress={date => getCurrentDate(`${LocaleConfig.locales['pl'].monthNames[date.month - 1]} ${date.year}`)}
      // {...props}
      />}
    </XStack>
  );
}

// export function Home() {
//   const linkProps = useLink({
//     href: '/user/nate',
//   });

//   return (
//     <YStack f={1} jc="center" ai="center" p="$4" space>
//       <YStack space="$4" maw={600}>
//         <H1 ta="center" fontFamily={'$silkscreen'}>
//           Welcome to Tamagui.
//         </H1>
//         <Paragraph ta="center">
//           Here&apos;s a basic starter to show navigating from one screen to
//           another. This screen uses the same code on Next.js and React Native.
//         </Paragraph>

//         <Separator />
//         <Paragraph ta="center">
//           Made by{' '}
//           <Anchor
//             color="$color12"
//             href="https://twitter.com/natebirdman"
//             target="_blank">
//             @natebirdman
//           </Anchor>
//           ,{' '}
//           <Anchor
//             color="$color12"
//             href="https://github.com/tamagui/tamagui"
//             target="_blank"
//             rel="noreferrer">
//             give it a ⭐️
//           </Anchor>
//         </Paragraph>
//       </YStack>

//       <XStack>
//         <Button {...linkProps}>Link to user</Button>
//       </XStack>

//       <SheetDemo />
//     </YStack>
//   );
// }

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'white',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30
//   },
//   customDay: {
//     margin: 10,
//     fontSize: 24,
//     color: 'green'
//   },
//   dayItem: {
//     marginLeft: 34
//   }
// });

function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  return (
    <>
      <Button
        aria-label={'toggle-sheet-button'}
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen(x => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom>
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <H1 ta="center">What is Lorem Ipsum?</H1>

          <Button
            size="$6"
            circular
            icon={ChevronDown}
            aria-label={'close-sheet-button'}
            onPress={() => {
              setOpen(false);
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
