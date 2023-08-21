import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Modal, ScrollView } from 'native-base';
import Typography from '../../components/atoms/Typography/Typography';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import CandidateCardLarge from '../../components/organisms/CandidateCardLarge/CandidateCardLarge';
import TabbarMenu, {
  TabbarRoute,
} from '../../components/organisms/TabbarMenu/TabbarMenu';
import { SceneMap } from 'react-native-tab-view';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { store } from '../../store';
import { bookmarkActionTypes } from '../../store/actions';
import ResumeCard from './ProfileScreenRoutes/ResumeCard/ResumeCard';
import OpinionCard from './ProfileScreenRoutes/OpinionCard/OpinionCard';
import { useActions } from '../../hooks/useActions';
import LoadingScreen from '../../components/atoms/LoadingScreen/LoadingScreen';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import { NoteDataType } from '../../store/reducers/types';
import { useDispatch } from 'react-redux';
import candidatesServices from '../../services/candidatesServices';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CandidatesStackParamList, 'ProfileScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CandidatesStack'>
>;


const noteTitles: { title: string, field_type: NoteDataType['field_type'], color: string }[] = [
  {
    title: 'Pozytywne',
    field_type: 'positive',
    color: Colors.Green500
  },
  {
    title: 'Neutralne',
    field_type: 'neutral',
    color: Colors.Basic700
  },
  {
    title: 'Negatywne',
    field_type: 'negative',
    color: Colors.Blue500
  },
];

const ProfileScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { token, candidateNotes: initNotes, candidateMarks: initMarks, marksData, notesData, userCompany } = useTypedSelector(s => s.general);
  const [tabbarIndex, setTabbarIndex] = React.useState<number>(0);
  const [routes] = React.useState<TabbarRoute[]>([
    { key: '0', title: 'CV' },
    { key: '1', title: 'Opinia' },
  ]);
  const { candidateData } = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const { setSwipeablePanelProps } = useActions();
  const [openNotes, setOpenNotes] = useState<boolean>(false);
  const existedNotes = initNotes.find(e => e.candidate_id === candidateData.id);
  const existedMark = initMarks.find(e => e.candidate_id === candidateData.id);
  const [candidateNotes, setCandidateNotes] = useState<number[]>(existedNotes?.note_ids || []);
  const [candidateMark, setCandidateMark] = useState<number | null>(existedMark?.score_id || null);
  const firstLoad = useRef(true);
  const prevMark = useRef<number | null | undefined>(undefined);
  const prevNotes = useRef<number[] | null>(null);

  useEffect(() => {
    if (firstLoad.current) firstLoad.current = false;
    else if (prevMark.current !== candidateMark) {
      dispatch(candidatesServices.setCandidateMarks(
        token,
        candidateMark,
        { candidate_id: candidateData.id, company_id: userCompany?.id as number },
        initMarks,
        existedMark?.id
      ));
      prevMark.current = candidateMark;
    }
  }, [candidateMark, initNotes]);

  const saveNotes = () => {
    setOpenNotes(false);
    if (prevNotes.current?.length !== candidateNotes.length) {
      dispatch(candidatesServices.setCandidateNotes(
        token,
        candidateNotes,
        { candidate_id: candidateData.id, company_id: userCompany?.id as number },
        initNotes,
        existedNotes?.id
      ));
      prevNotes.current = candidateNotes;
    }
  }

  // const sendClaimHandler = (data: any) => {
  //   setSwipeablePanelProps({
  //     title: 'Dlaczego zgłaszasz ten komentarz?',
  //     buttons: [
  //       {
  //         children: 'SPAM',
  //         onPress: () => console.log('Kalkulator'),
  //       },
  //       {
  //         children: 'Mowa nienawiści',
  //         onPress: () => console.log('Kalkulator'),
  //       },
  //       {
  //         children: 'Nieuczciwa konkurencja',
  //         onPress: () => console.log('Kalkulator'),
  //       },
  //     ],
  //   })
  // }

  // const moreOptionsHandler = (data: any) => {
  //   setSwipeablePanelProps({
  //     buttons: [
  //       {
  //         children: 'Zaplanuj spotkanie',
  //         icon: 'meeting',
  //         onPress: () => navigation.navigate('CalendarStack', {
  //           screen: 'EventScreen', params: {
  //             profileIndex: profileIndex,
  //           }
  //         }),
  //       },
  //       {
  //         children: 'Zaplanuj połączenie',
  //         icon: 'phoneCall1',
  //         onPress: () => navigation.navigate('CalendarStack', {
  //           screen: 'CallScreen', params: {
  //             profileIndex: profileIndex,
  //           }
  //         }),
  //       },
  //       {
  //         children: 'Udostępnij',
  //         icon: 'share',
  //         onPress: () => console.log('Kalkulator'),
  //       },
  //     ],
  //   })
  // }

  return (
    <ScreenHeaderProvider currentStack="CandidatesStack" transparent={false}
      otherActions={<View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
        <Menu>
          <MenuTrigger>
            <SvgIcon
              icon={!candidateMark ? 'cardOutlined' : 'cardFilled'}
              fill={!candidateMark ? Colors.Basic900 : marksData.find(e => e.id === candidateMark)?.color}
              style={{ transform: [{ scale: 1.5 }] }}
            />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ marginLeft: -30, marginTop: -10 }}>
            {marksData.map(({ color, title, id }) => (
              <MenuOption style={styles.menuOption} onSelect={() => setCandidateMark(id)}>
                <SvgIcon
                  style={{ marginRight: 8, alignSelf: 'center' }}
                  icon="cardFilled"
                  fill={color}
                />
                <Typography weight='Bold'>{title}</Typography>
              </MenuOption>
            ))}
            {/* <MenuOption style={styles.menuOption}
              onSelect={() => setCandidateMark(null)}>
              <SvgIcon
                fill={Colors.Danger}
                style={{ marginRight: 12, marginLeft: 5, alignSelf: 'center' }}
                icon="crossBig"
              />
              <Typography weight='Bold' color={Colors.Danger}>Usuń ocenę</Typography>
            </MenuOption> */}
          </MenuOptions>
        </Menu>
        <TouchableOpacity style={{ marginHorizontal: 16 }} onPress={() => setOpenNotes(true)}>
          <SvgIcon icon="pinBig" />
        </TouchableOpacity>
      </View>}
    >
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        <CandidateCardLarge
          {...candidateData}
          onPressBackground={() => navigation.navigate('VideoScreen', { candidateData })}
        />
        {/* <TabbarMenu
          navigationState={{ index: tabbarIndex, routes }}
          onIndexChange={setTabbarIndex}
          renderScene={SceneMap({ 0: () => null, 1: () => null })}
        /> */}
        <View style={{ paddingBottom: 15, paddingTop: 5 }}>{{
          0: <ResumeCard {...candidateData} />,
          // 1: <OpinionCard onPress={() => sendClaimHandler()} />
        }[tabbarIndex]}</View>
      </ScrollView>
      <Modal isOpen={openNotes} onClose={() => setOpenNotes(false)}>
        <Modal.Header width='full' style={{ backgroundColor: Colors.White }}>
          <Typography variant='h4' weight='Bold' textAlign='center'>Twoje notatki</Typography>
        </Modal.Header>
        {!!candidateNotes.length &&
          <View style={{ borderBottomWidth: 1, width: '100%', borderColor: Colors.Basic400, backgroundColor: Colors.White }}>
            <View style={[styles.noteContainer]}>
              {candidateNotes.map(id => {
                const note = notesData.find(e => e.id === id);
                const color = noteTitles.find(e => e.field_type === note?.field_type)?.color;
                return (
                  <TouchableOpacity style={styles.note} onPress={() => setCandidateNotes(prev => prev.filter(eid => eid !== id))}>
                    <Typography color={noteTitles.find(e => e.field_type === note?.field_type)?.color}>
                      {note?.title}
                    </Typography>
                    <SvgIcon icon="crossBig" style={{ marginLeft: 8 }} fill={color} />
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        }
        <ScrollView style={{ backgroundColor: Colors.White, width: '100%' }}>
          {noteTitles.map(({ title, field_type, color }) => (
            <View>
              <Typography variant="h5" weight="Bold" style={[styles.noteHeader, { color: Colors.Green500 }]}>
                {title}
              </Typography>
              <View style={styles.noteContainer}>
                {notesData.filter(e => e.field_type === field_type).map(({ id, title }) => (
                  <Typography color={color} style={styles.note} onPress={() => setCandidateNotes(prev => Array.from(new Set([...prev, id])))}>
                    {title}
                  </Typography>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
        <Modal.Footer width='full' p={0}>
          <ButtonRipple containerStyles={{ flex: 1 }} contentVariant='h5' contentWeight='Bold' variant='white' onPress={saveNotes}>
            Zapisz i zamknij
          </ButtonRipple>
        </Modal.Footer>
      </Modal>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  menuOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: Colors.Basic300,
    flexDirection: 'row',
    alignItems: 'center'
  },
  noteHeader: {
    marginLeft: 19,
    marginTop: 28,
    marginBottom: 4,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Basic200,
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 20,
    margin: 4,
  },
  noteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 12,
  },
});

export default ProfileScreen;
