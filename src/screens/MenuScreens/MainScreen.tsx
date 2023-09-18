import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import Colors from '../../colors/Colors';
// import Typography from '../../components/atoms/Typography/Typography';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { CompositeScreenProps, useIsFocused, useScrollToTop } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
// import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
// import SvgIcon, { IconTypes } from '../../components/molecules/SvgIcon/SvgIcon';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import SvgIcon, { IconTypes } from '../../components/atoms/SvgIcon';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import Typography from '../../components/atoms/Typography';
import { ScrollView } from '../../components/molecules/ScrollView';
import { useLink } from 'solito/link';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import generalServices from '../../services/generalServices';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import { createParam } from 'solito';
import EventsScreen from './EventsScreen';
// import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';

const { useParams } = createParam();

const MainScreen: React.FC = ({ }) => {
  const dispatch = useTypedDispatch();
  const { params } = useParams();
  // const ScrollViewRef = useRef(null);
  // useScrollToTop(ScrollViewRef);
  const { isMainMenuFlatList, userData, token, currentScreen } = useTypedSelector(state => state.general);
  const { setIsMainMenuFlatList, setSwipeablePanelProps } = useActions();

  useEffect(() => {
    console.log(params);
    setSwipeablePanelProps(params?.EventsScreen === 'true' ? {
      closeButton: false,
      hideBar: true,
      children: <EventsScreen />
    } : null)
  }, [params])

  const optionsHandler = () => {
    setSwipeablePanelProps({
      title: 'Co robimy tym razem?',
      buttons: [
        {
          children: 'Stwórz nowe wydarzenie',
          icon: <SvgIcon icon='calendar' />,
          onPress: () => { }//navigation.navigate('CalendarStack', { screen: 'EventScreen', params: { isMainMenuSender: true } })
        },
        {
          children: 'Stwórz nowe ogłoszenie',
          icon: <SvgIcon icon='work' />,
          onPress: () => { }//navigation.navigate('AdvertStack', { screen: 'NewAdvertScreen', params: { isMainMenuSender: true } })
        },
      ],
    })
  }

  const sectionButtons: {
    sectionTitle: string,
    buttons: {
      title: string,
      backgroundColor: string,
      icon: IconTypes,
      onPress: (event: GestureResponderEvent) => void,
      missedEvents: number,
      badge: string
    }[]
  }[] = [
      {
        sectionTitle: 'Aktualności',
        buttons: [
          {
            title: 'Historia wydarzeń',
            backgroundColor: Colors.Sea300,
            icon: 'eventsHistory',
            ...useLink({
              href: '/home?EventsScreen=true'
            }),
            missedEvents: 0,
            badge: '',
          },
          // {
          //   title: 'Zaplanowane spotkania',
          //   backgroundColor: Colors.Sea300,
          //   icon: 'meeting',
          //   onPress: () => {},//navigation.navigate('EventsScreen'),
          //   missedEvents: 0,
          //   badge: ''
          // },
          {
            title: 'Kalendarz',
            backgroundColor: Colors.Sea300,
            icon: 'calendar',
            ...useLink({
              href: '/calendar',
            }),
            missedEvents: 0,
            badge: ''
          },
          // {
          //   title: 'Powiadomienia',
          //   backgroundColor: Colors.Sea300,
          //   icon: 'notification',
          //   onPress: () => {},//navigation.navigate('CalendarStack', { screen: 'MainScreen' }),
          //   missedEvents: 0,
          //   badge: ''
          // },
        ]
      },
      {
        sectionTitle: 'Organizacja',
        buttons: [
          {
            title: 'Kandydaci',
            backgroundColor: Colors.Blue100,
            icon: 'candidates',
            missedEvents: 0,
            ...useLink({
              href: '/candidates',
            }),
            badge: ''
          },
          // {
          //   title: 'Twoi ulubieni kandydaci',
          //   backgroundColor: Colors.Blue100,
          //   icon: 'cardOutlined',
          //   onPress: optionsHandler,
          //   missedEvents: 0,
          //   badge: ''
          // },
          {
            title: 'Ogłoszenia',
            backgroundColor: Colors.Blue100,
            icon: 'work',
            ...useLink({
              href: '/adverts',
            }),
            missedEvents: 0,
            badge: '',
          },
          {
            title: 'Profil',
            backgroundColor: Colors.Blue100,
            icon: 'user',
            ...useLink({
              href: '/profile',
            }),
            missedEvents: 0,
            badge: ''
          },
          {
            title: 'Pakiety',
            backgroundColor: Colors.Blue100,
            icon: 'bag',
            ...useLink({
              href: '/profile/PaymentTemporalScreen',
            }),
            missedEvents: 0,
            badge: ''
          },
        ]
      },
      // {
      //   sectionTitle: 'Baza wiedzy',
      //   buttons: [
      //     {
      //       title: 'Kalkulator wynagrodzeń',
      //       backgroundColor: Colors.Basic200,
      //       icon: 'calculator',
      //       onPress: () => console.log('abc'),
      //       missedEvents: 0,
      //       badge: ''
      //     },
      //     {
      //       title: 'Lista pytań',
      //       backgroundColor: Colors.Basic200,
      //       icon: 'list',
      //       onPress: () => navigation.navigate('QuestionsScreen'),
      //       missedEvents: 0,
      //       badge: ''
      //     },
      //     {
      //       title: 'Artykuły i nowości',
      //       backgroundColor: Colors.Basic200,
      //       icon: 'fileDocument',
      //       onPress: () => navigation.navigate('NewsScreen'),
      //       missedEvents: 0,
      //       badge: 'Nowe',
      //     },
      //     {
      //       title: 'Wszystkie instrukcje',
      //       backgroundColor: Colors.Basic200,
      //       icon: 'fileDocument',
      //       onPress: () => navigation.navigate('ProfileStack', { screen: 'HelpCenterScreen' }),
      //       missedEvents: 0,
      //       badge: ''
      //     },
      //   ]
      // },
    ];

  // useEffect(() => {
  //   console.log('userData: ', userData);
  //   if ((currentScreen !== 'AuthStack-FillUserDataScreen') && userData && !(userData.email && userData.first_name && userData.last_name)) {
  //     setSwipeablePanelProps({
  //       title: 'Brakuje nam twoich danych po zalogowaniu poprzez media społecznościowe!',
  //       subTitle: 'Nie będą Ci dostępne większość funkcji aplikacji dopóki nie uzupełnisz te dane.',
  //       buttons: [
  //         {
  //           children: 'Uzupełnij dane',
  //           onPress: () => {}//navigation.navigate('AuthStack', { screen: 'FillUserDataScreen' })
  //         },
  //       ]
  //     })
  //   }
  // }, [userData]);

  return (
    <View style={styles.Wrapper}>
      <ScreenHeaderProvider
        mode="mainTitle"
        mainTitlePosition="flex-start"
        alterTitle={
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
            {/* <View style={{marginRight: 12}}>
              <SvgIcon icon="logo" />
            </View> */}
            {/* {!!!token && <View style={{ marginRight: 12 }}> */}
            {<View style={{ marginRight: 12 }}>
              <Button
                br={4} h={30} px={8.5} w='auto'
                contentWeight='Regular'
                variant="secondary"
                {...useLink({ href: '/auth' })}
              >
                Zaloguj
              </Button>
            </View>}
            {/* {!!token && <View style={{ marginRight: 12 }}> */}
            {<View style={{ marginRight: 12 }}>
              <Typography variant='h5' weight='Bold'>Witaj, {'userData?.first_name'}</Typography>
            </View>}
            {/* <View style={{marginLeft: 8}}>
              <SvgIcon icon="search" />
            </View> */}
          </View>
        }
      // otherActions={<View style={styles.LayoutToggler}>
      //   <TouchableOpacity
      //     onPress={() => setIsMainMenuFlatList(true)}
      //     style={{
      //       backgroundColor: isMainMenuFlatList ? Colors.Basic200 : Colors.White,
      //       width: 28,
      //       height: 28,
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //       borderRadius: 50,
      //       marginRight: 20
      //     }}>
      //     <SvgIcon
      //       icon="horizontal"
      //       fill={isMainMenuFlatList ? Colors.Basic900 : Colors.Basic400}
      //     />
      //   </TouchableOpacity>
      //   <TouchableOpacity
      //     onPress={() => setIsMainMenuFlatList(false)}
      //     style={{
      //       backgroundColor: isMainMenuFlatList ? Colors.White : Colors.Basic200,
      //       width: 28,
      //       height: 28,
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //       borderRadius: 28,
      //     }}>
      //     <SvgIcon
      //       icon="grid"
      //       fill={isMainMenuFlatList ? Colors.Basic400 : Colors.Basic900}
      //     />
      //   </TouchableOpacity>
      // </View>}
      >
        <ScrollView
          // ref={ScrollViewRef} 
          contentContainerStyle={{ alignItems: 'center' }}
          style={{ backgroundColor: Colors.Basic100, flex: 1 }}
        >
          {sectionButtons.map(({ buttons, sectionTitle }, i) => (
            // <View style={[styles[isMainMenuFlatList ? 'FlatSectionWrapper' : 'GridSectionWrapper'], i !== 0 && { paddingTop: 15 }, i + 1 === sectionButtons.length && { paddingBottom: 25 }]}>
            <View key={i} style={[styles[false ? 'FlatSectionWrapper' : 'GridSectionWrapper'], i !== 0 && { paddingTop: 15 }, i + 1 === sectionButtons.length && { paddingBottom: 25 }]}>
              {/* <Typography weight='Bold' size={20} style={{ width: '88%', marginLeft: isMainMenuFlatList ? 0 : 20, marginBottom: isMainMenuFlatList ? 5 : 0 }}> */}
              <Typography weight='Bold' size={20} style={{ width: '88%', marginLeft: false ? 0 : 20, marginBottom: false ? 5 : 0 }}>
                {sectionTitle}
              </Typography>
              {/* {buttons.map(({ backgroundColor, badge, icon, missedEvents, onPress, title }) => isMainMenuFlatList ? */}
              {buttons.map(({ backgroundColor, badge, icon, missedEvents, onPress, title }, index) => (
                <Fragment key={index}>
                  {isMainMenuFlatList ?
                    <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.FlatButton}>
                      <View style={{ height: '100%', paddingVertical: 10, paddingRight: 15, paddingLeft: 5 }}>
                        <View style={[styles.FlatIconBG, { backgroundColor }]}>
                          <SvgIcon icon={icon} />
                        </View>
                      </View>
                      <Typography variant="h5" weight='Bold'>{title}</Typography>
                      {/* {!!badge &&
                    <Badge position='absolute' top='4px' right='4px' bgColor={Colors.Yellow500} rounded="full">
                      <Typography color={Colors.Basic100} variant='small'>{badge}</Typography>
                    </Badge>
                  }
                  {!!missedEvents &&
                    <Badge padding='0px' position='absolute' top='2px' left='20px' bgColor={Colors.Basic900} rounded="full">
                      <Typography color={Colors.Basic100} variant='small'>{'  '}{missedEvents > 50 ? '50+' : missedEvents}{'  '}</Typography>
                    </Badge>
                  } */}
                    </TouchableOpacity>
                    :
                    <View style={styles.GridButtonWrapper}>
                      <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={[styles.GridButton]}>
                        <View style={[styles.GridIconBG, { backgroundColor }]}>
                          <SvgIcon icon={icon} />
                        </View>
                        <Typography variant="h5" weight='Bold' textAlign="center" style={{ marginHorizontal: 10, marginTop: 7 }}>
                          {title}
                        </Typography>
                        {/* {!!badge &&
                      <Badge position='absolute' top='4px' right='4px' bgColor={Colors.Yellow500} rounded="full">
                        <Typography color={Colors.Basic100} weight='Bold'>{badge}</Typography>
                      </Badge>
                    }
                    {!!missedEvents &&
                      <Badge position='absolute' top='4px' left='4px' bgColor={Colors.Basic900} rounded="full">
                        <Typography color={Colors.Basic100} weight='Bold'>{missedEvents > 50 ? '50+' : missedEvents}</Typography>
                      </Badge>
                    } */}
                      </TouchableOpacity>
                    </View>
                  }
                </Fragment>))}
            </View>
          ))}
        </ScrollView>
      </ScreenHeaderProvider>
      <CornerCircleButton onPress={optionsHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.Basic200,
  },
  FlatSectionWrapper: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
    width: '100%',
    maxWidth: 450
  },
  GridSectionWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 25,
    paddingBottom: 10,
    maxWidth: 450,
    justifyContent: 'center'
  },
  FlatButton: {
    backgroundColor: Colors.White,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 10,
  },
  GridButtonWrapper: {
    padding: 10,
    aspectRatio: 1,
    width: '44%',
    height: '44%',
  },
  GridButton: {
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 14,
    shadowColor: Colors.Basic600,
    shadowOpacity: 1,
    elevation: 15,
    width: '100%',
    height: '100%',
  },
  GridIconBG: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  FlatIconBG: {
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 31
  },
  LayoutToggler: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20
  },
});

export default MainScreen;
