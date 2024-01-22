import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
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
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import SvgIcon, { IconTypes, icons } from '../../components/atoms/SvgIcon';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import Typography from '../../components/atoms/Typography';
import { ScrollView } from '../../components/molecules/ScrollView';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import { createParam } from 'solito';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import useRouter from '../../hooks/useRouter';

const { useParam } = createParam<NonNullable<MenuStackParamList['default']['MainScreen']>>();

const MainScreen: React.FC = ({ }) => {
  const dispatch = useTypedDispatch();
  const { replace, push, useLink } = useRouter();
  const [subView] = useParam('subView');
  const { isMainMenuFlatList, userData, token, currentScreen } = useTypedSelector(state => state.general);
  const { setIsMainMenuFlatList, setSwipeablePanelProps } = useActions();
  const authLinking = useLink({ href: { stack: 'AuthStack' } });

  useEffect(() => {
    setSwipeablePanelProps((() => {
      if (subView === 'options') return {
        title: 'Co robimy tym razem?',
        closeButton: true,
        buttons: [
          {
            children: 'Stwórz nowe wydarzenie',
            icon: <SvgIcon icon='calendar' />,
            closeAction: 'props-null',
            onPress: () => replace({ stack: 'CalendarStack', screen: 'EventEditorScreen', params: undefined })
          },
          {
            children: 'Stwórz nowe ogłoszenie',
            icon: <SvgIcon icon='work' />,
            closeAction: 'props-null',
            onPress: () => replace({ stack: 'AdvertStack', screen: 'AdvertEditorScreen', params: { isMainMenuSender: 'true' } })
          },
        ],
      }
      return null;
    })());
  }, [subView]);

  const sectionButtons: {
    sectionTitle: string,
    buttons: ({
      title: string,
      backgroundColor: string,
      icon: IconTypes,
      missedEvents: number,
      badge: string,
    } & (ReturnType<typeof useLink> | { onPress: () => void }))[]
  }[] = [
      {
        sectionTitle: 'Aktualności',
        buttons: [
          {
            title: 'Image test',
            backgroundColor: Colors.Sea300,
            icon: 'pencil',
            ...useLink({
              href: { stack: 'MenuStack', screen: 'ImageScreen', params: undefined }
            }),
            missedEvents: 10,
            badge: 'Nowe',
          },
          {
            title: 'Test Screen',
            backgroundColor: Colors.Sea300,
            icon: 'search',
            ...useLink({
              href: { stack: 'MenuStack', screen: 'TestScreen', params: undefined }
            }),
            missedEvents: 10,
            badge: 'Nowe',
          },
          {
            title: 'Historia wydarzeń',
            backgroundColor: Colors.Sea300,
            icon: 'eventsHistory',
            ...useLink({
              href: { stack: 'MenuStack', screen: 'EventsScreen' }
            }),
            missedEvents: 10,
            badge: 'Nowe',
          },
          {
            title: 'Zaplanowane spotkania',
            backgroundColor: Colors.Sea300,
            icon: 'meeting',
            ...useLink({
              href: { stack: 'CalendarStack' }
            }),
            missedEvents: 0,
            badge: ''
          },
          {
            title: 'Kalendarz',
            backgroundColor: Colors.Sea300,
            icon: 'calendar',
            ...useLink({
              href: { stack: 'CalendarStack' }
            }),
            missedEvents: 0,
            badge: ''
          },
          {
            title: 'Powiadomienia',
            backgroundColor: Colors.Sea300,
            icon: 'notification',
            ...useLink({
              href: { stack: 'MenuStack', screen: 'EventsScreen' }
            }),
            missedEvents: 0,
            badge: ''
          },
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
            ...useLink({ href: { stack: 'CandidatesStack' } }),
            badge: ''
          },
          {
            title: 'Twoi ulubieni kandydaci',
            backgroundColor: Colors.Blue100,
            icon: 'cardOutlined',
            ...useLink({
              href: { stack: 'CandidatesStack', screen: 'FavouritesScreen' }
            }),
            missedEvents: 0,
            badge: ''
          },
          {
            title: 'Ogłoszenia',
            backgroundColor: Colors.Blue100,
            icon: 'work',
            ...useLink({
              href: { stack: 'AdvertStack' },
            }),
            missedEvents: 0,
            badge: '',
          },
          {
            title: 'Profil',
            backgroundColor: Colors.Blue100,
            icon: 'user',
            ...useLink({
              href: { stack: 'ProfileStack' },
            }),
            missedEvents: 0,
            badge: ''
          },
          {
            title: 'Pakiety',
            backgroundColor: Colors.Blue100,
            icon: 'bag',
            ...useLink({
              href: { stack: 'ProfileStack', screen: 'PackagesScreen' },
            }),
            missedEvents: 0,
            badge: ''
          },
        ]
      },
      {
        sectionTitle: 'Baza wiedzy',
        buttons: [
          {
            title: 'Kalkulator wynagrodzeń',
            backgroundColor: Colors.Basic200,
            icon: 'calculator',
            ...useLink({
              href: { stack: 'MenuStack' }
            }),
            missedEvents: 0,
            badge: ''
          },
          {
            title: 'Lista pytań',
            backgroundColor: Colors.Basic200,
            icon: 'list',
            ...useLink({
              href: { stack: 'MenuStack', screen: 'QuestionsListScreen', params: undefined }
            }),
            missedEvents: 0,
            badge: ''
          },
          {
            title: 'Artykuły i nowości',
            backgroundColor: Colors.Basic200,
            icon: 'fileDocument',
            ...useLink({
              href: { stack: 'MenuStack' }
            }),
            missedEvents: 0,
            badge: 'Nowe',
          },
          {
            title: 'Wszystkie instrukcje',
            backgroundColor: Colors.Basic200,
            icon: 'fileDocument',
            ...useLink({
              href: { stack: 'MenuStack' }
            }),
            missedEvents: 0,
            badge: ''
          },
        ]
      },
    ];

  useEffect(() => {
    console.log('userData: ', userData);
    if ((currentScreen !== 'AuthStack-FillUserDataScreen') && userData && !(userData.email && userData.first_name && userData.last_name)) {
      setSwipeablePanelProps({
        title: 'Brakuje nam twoich danych po zalogowaniu poprzez media społecznościowe!',
        subTitle: 'Nie będą Ci dostępne większość funkcji aplikacji dopóki nie uzupełnisz te dane.',
        buttons: [
          {
            children: 'Uzupełnij dane',
            onPress: () => push({ stack: 'AuthStack', screen: 'FillUserDataScreen' })
          },
        ]
      })
    }
  }, [userData]);

  return (
    <>
      <ScreenHeaderProvider
        mode="mainTitle"
        mainTitlePosition="flex-start"
        backgroundContent={Colors.Basic200}
        alterTitle={
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
            <View style={{ marginRight: 12 }}>
              <SvgIcon icon="logo" />
            </View>
            {!userData ? <>
              <View style={{ marginRight: 12 }}>
                <Button
                  br={4} h={30} px={8.5} w='auto'
                  contentWeight='Regular'
                  variant="secondary"
                  {...authLinking}
                >
                  Zaloguj
                </Button>
              </View>
            </> : <>
              <View style={{ marginRight: 12 }}>
                <Typography variant='h5' weight='Bold'>Witaj, {userData.first_name}</Typography>
              </View>
              {/* <View style={{ marginLeft: 8 }}>
                <SvgIcon icon="search" />
              </View> */}
            </>}
          </View>
        }
        otherActions={<View style={styles.LayoutToggler}>
          <Button variant='TouchableOpacity'
            onPress={() => setIsMainMenuFlatList(true)}
            style={{
              backgroundColor: isMainMenuFlatList ? Colors.Basic200 : Colors.White,
              width: 28,
              height: 28,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              marginRight: 20
            }}>
            <SvgIcon
              icon="horizontal"
              fill={isMainMenuFlatList ? Colors.Basic900 : Colors.Basic400}
            />
          </Button>
          <Button variant='TouchableOpacity'
            onPress={() => setIsMainMenuFlatList(false)}
            style={{
              backgroundColor: isMainMenuFlatList ? Colors.White : Colors.Basic200,
              width: 28,
              height: 28,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 28,
            }}>
            <SvgIcon
              icon="grid"
              fill={isMainMenuFlatList ? Colors.Basic400 : Colors.Basic900}
            />
          </Button>
        </View>}
      >
        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          style={{ backgroundColor: Colors.Basic100, flex: 1 }}
        >
          {sectionButtons.map(({ buttons, sectionTitle }, i) => (
            <View key={i} style={[styles[isMainMenuFlatList ? 'FlatSectionWrapper' : 'GridSectionWrapper'], i !== 0 && { paddingTop: 15 }, i + 1 === sectionButtons.length && { paddingBottom: 25 }]}>
              <Typography weight='Bold' size={20} style={{ width: '88%', marginLeft: isMainMenuFlatList ? 0 : 20, marginBottom: isMainMenuFlatList ? 5 : 0 }}>
                {sectionTitle}
              </Typography>
              {buttons.map(({ backgroundColor, badge, icon, missedEvents, title, ...clickProps }, index) => (
                <Fragment key={index}>
                  {isMainMenuFlatList ?
                    // <TouchableOpacity activeOpacity={0.8} style={styles.FlatButton} {...clickProps}>
                    <Button variant='TouchableOpacity' style={styles.FlatButton} {...clickProps}>
                      <View style={{ height: '100%', paddingVertical: 10, paddingRight: 15, paddingLeft: 5 }}>
                        <View style={[styles.FlatIconBG, { backgroundColor }]}>
                          <SvgIcon icon={icon} />
                        </View>
                      </View>
                      <Typography variant="h5" weight='Bold'>{title}</Typography>
                      {!!badge &&
                        <View style={{ position: 'absolute', borderRadius: 8, paddingLeft: 5, paddingRight: 5, backgroundColor: Colors.Yellow500, zIndex: 1, right: 4, top: 4 }}>
                          <Typography color={Colors.Basic100} variant='small'>{badge}</Typography>
                        </View>
                      }
                      {!!missedEvents &&
                        <View style={{ position: 'absolute', borderRadius: 8, paddingLeft: 5, paddingRight: 5, backgroundColor: Colors.Basic900, zIndex: 1, left: 20, top: 4 }}>
                          <Typography color={Colors.Basic100} variant='small'>{'  '}{missedEvents > 50 ? '50+' : missedEvents}{'  '}</Typography>
                        </View>
                      }
                    </Button>
                    :
                    <View style={styles.GridButtonWrapper}>
                      {/* <TouchableOpacity activeOpacity={0.8} style={[styles.GridButton]} {...clickProps}> */}
                      <Button variant='TouchableOpacity' style={[styles.GridButton]} {...clickProps}>
                        <View style={[styles.GridIconBG, { backgroundColor }]}>
                          <SvgIcon icon={icon} />
                        </View>
                        <Typography variant="h5" weight='Bold' textAlign="center" style={{ marginHorizontal: 10, marginTop: 7 }}>
                          {title}
                        </Typography>
                        {!!badge &&
                          <View style={{ position: 'absolute', borderRadius: 8, paddingLeft: 5, paddingRight: 5, backgroundColor: Colors.Yellow500, zIndex: 1, right: 4, top: 4 }}>
                            <Typography color={Colors.Basic100} weight='Bold'>{badge}</Typography>
                          </View>
                        }
                        {!!missedEvents &&
                          <View style={{ position: 'absolute', borderRadius: 8, paddingLeft: 5, paddingRight: 5, backgroundColor: Colors.Basic900, zIndex: 1, left: 4, top: 4 }}>
                            <Typography color={Colors.Basic100} weight='Bold'>{missedEvents > 50 ? '50+' : missedEvents}</Typography>
                          </View>
                        }
                      </Button>
                    </View>
                  }
                </Fragment>))}
            </View>
          ))}
        </ScrollView>
      </ScreenHeaderProvider>
      <CornerCircleButton {...useLink({ href: { stack: 'MenuStack', screen: 'MainScreen', params: { subView: 'options' } } })} />
    </>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'flex-start',
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  GridButtonWrapper: {
    padding: 10,
    aspectRatio: 1,
    width: '44%',
    height: 'auto',
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
