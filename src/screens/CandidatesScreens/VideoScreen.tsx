import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Video from 'react-native-video';
import Colors from '../../colors/Colors';
// import { useTypedSelector } from '../../hooks/useTypedSelector';
// import { bookmarkActionTypes } from '../../store/actions';
// import {
//   Menu,
//   MenuOption,
//   MenuOptions,
//   MenuTrigger,
// } from 'react-native-popup-menu';
import { nativeStore } from '../../store';
// import { useActions } from '../../hooks/useActions';
import { Dimensions, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity, View, Image } from 'react-native';
/// import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { JobPositionType } from '../../store/reducers/types';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';

import VideoPlayer from '../../components/organismes/VideoPlayer';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CandidatesStackParamList, 'VideoScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CandidatesStack'>
>;

type NotesType = 'negative' | 'positive' | 'neutral';

const notes: {
  id: number,
  title: string,
  type: NotesType,
}[] = [
    {
      id: 1,
      title: 'Mobilny',
      type: 'positive',
    },
    {
      id: 2,
      title: 'Kontaktowy',
      type: 'positive',
    },
    {
      id: 3,
      title: 'Rozmowa na plus',
      type: 'positive',
    },
    {
      id: 4,
      title: 'Zaangażowany',
      type: 'positive',
    },
    {
      id: 5,
      title: 'Doświadczony',
      type: 'positive',
    },
    {
      id: 6,
      title: 'Na przyszłość',
      type: 'positive',
    },
    {
      id: 7,
      title: 'Do podszkolenia',
      type: 'neutral',
    },
    {
      id: 8,
      title: 'Dopytać o metody',
      type: 'neutral',
    },
    {
      id: 9,
      title: 'Dopytać o dojazd',
      type: 'neutral',
    },
    {
      id: 10,
      title: 'Średni',
      type: 'neutral',
    },
    {
      id: 11,
      title: 'Dlaczego zmiana pracy',
      type: 'neutral',
    },
    {
      id: 12,
      title: 'Do negocjacji ceny',
      type: 'neutral',
    },
    {
      id: 13,
      title: 'Umiejętności do weryfikacji',
      type: 'neutral',
    },
    {
      id: 14,
      title: 'Rozmowa na minus',
      type: 'negative',
    },
    {
      id: 15,
      title: 'Nie odbiera',
      type: 'negative',
    },
    {
      id: 16,
      title: 'Zbyt daleko',
      type: 'negative',
    },
    {
      id: 17,
      title: 'Nie przyszedł',
      type: 'negative',
    },
    {
      id: 18,
      title: 'Brak kwalifikacji',
      type: 'negative',
    },
  ];

const noteTitles: { title: string, type: NotesType, color: string }[] = [
  {
    title: 'Pozytywne',
    type: 'positive',
    color: Colors.Green500
  },
  {
    title: 'Neutralne',
    type: 'neutral',
    color: Colors.Basic700
  },
  {
    title: 'Negatywne',
    type: 'negative',
    color: Colors.Blue500
  },
];

// const VideoScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
const VideoScreen: React.FC = () => {
  // const { candidateData } = route.params;
  // const { jobIndustries, jobExperiences, jobSalaryTaxes, swipeablePanelProps } = useTypedSelector(s => s.general);
  const [jobPositions, setJobPositions] = useState<JobPositionType[]>([]);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const VideoRef = useRef<Video>(null);

  // const data = useTypedSelector(state => state.bookmark);
  // const bookmarkCategories = data.bookmarks.map(item => item.category);
  // const selectedBookmark = bookmarkCategories.indexOf(data.persons[1].bookmark);
  // const bookmarkCategory = data.bookmarks[selectedBookmark].category;
  // const bookmarkColor = data.bookmarks[selectedBookmark].color;
  // const { setSwipeablePanelProps } = useActions();
  const [openNotes, setOpenNotes] = useState<boolean>(false);
  const [candidateNotes, setCandidateNotes] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") setOpen(true);
  }, []);


  // useEffect(() => {
  //   setJobPositions(jobIndustries.reduce<JobPositionType[]>((prev, curr) => [...prev, ...curr.job_positions], []));
  // }, [jobIndustries]);

  // const contactsHandler = () => {
  //   setSwipeablePanelProps({
  //     title: 'Skontaktuj się',
  //     buttons: [
  //       {
  //         children: '+48 507 345 679',
  //         icon: 'phoneCall1',
  //         onPress: () => console.log('Kalkulator'),
  //       },
  //       {
  //         children: 'Messenger',
  //         icon: 'messenger',
  //         onPress: () => console.log('Kalkulator'),
  //       },
  //       {
  //         children: 'Email',
  //         icon: 'email',
  //         onPress: () => console.log('Kalkulator'),
  //       },
  //     ],
  //   })
  // };

  return open && (
    <ScreenHeaderProvider currentStack='CandidatesStack' transparent staticContentHeight>
      <TouchableHighlight onPress={() => setPaused(prev => !prev)} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", backgroundColor: Colors.Basic900, position: 'relative' }}>
          {/* {!!candidateData.video && <Video
            source={{ uri: candidateData.video.path }}
            onLoad={({ duration }) => setDuration(duration)}
            onError={err => console.log(err)}
            paused={paused || !!swipeablePanelProps}
            style={styles.Video}
            repeat
            resizeMode="contain"
            ref={VideoRef}
            onProgress={({ currentTime }) => setProgress(currentTime)}
            progressUpdateInterval={100}
          />} */}
          <VideoPlayer paused={paused} />
          {paused && <View style={styles.playIcon} >
            <SvgIcon icon="play" />
          </View>}
          {/* <View style={{ position: 'absolute', bottom: 34, left: 18 }}>
            <Typography style={styles.text} weight="Bold" variant="h4" color={Colors.White}>
              {jobPositions.find(p => p.id === candidateData.job_position_id)?.name}
            </Typography>
            <Typography style={styles.text} color={Colors.White} variant='h5'>
              {candidateData.first_name}{' '}{candidateData.last_name}
            </Typography>
            <Typography style={[styles.text, { marginTop: 9 }]} color={Colors.White} weight='SemiBold' variant='h5'>
              {candidateData.salary_amount_low && candidateData.salary_amount_up ?
                `${candidateData.salary_amount_low} - ${candidateData.salary_amount_up} zł ${{ 2: 'msc', 3: 'godz' }[candidateData.salary_time_type_id || 2] || 'msc'} ${jobSalaryTaxes.find(el => el.id === candidateData.salary_tax_type_id)?.name || 'brutto'}`
                :
                'Stawka nieustalona'
              }
            </Typography> */}
          {/* <View>
              {data.persons[1].available && (
                <Typography style={styles.text} color={Colors.White}>
                  Praca od zaraz
                </Typography>
              )}
            </View> */}
          {/* </View> */}
          <View style={{ position: 'absolute', bottom: 34, right: 18, alignItems: 'center' }}>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={[styles.iconWithText, {marginBottom: 0}]}>
                <View style={{ width: 48, height: 48, borderRadius: 24, overflow: 'hidden' }}>
                  <Image source={{ uri: candidateData.logo?.path }} style={{ width: 48, height: 48 }} resizeMode='center' />
                </View> */}
            {/* <Typography color={Colors.White} variant="small">
                  Profil
                </Typography> */}
            {/* </View>
            </TouchableOpacity> */}
            {/* <Menu style={{ marginBottom: 35 }}>
              <MenuTrigger>
                <SvgIcon
                  icon={
                    data.bookmarks[selectedBookmark].category === 'blank'
                      ? 'cardOutlined'
                      : 'cardFilled'
                  }
                  fill={
                    bookmarkCategory === 'blank' ? Colors.White : bookmarkColor
                  }
                  style={{ transform: [{ scale: 1.5 }] }}
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{ marginLeft: -35, marginTop: -15 }}>
                <MenuOption
                  style={styles.menuOption}
                  onSelect={() =>
                    store.dispatch({
                      type: bookmarkActionTypes.SET_SUPER,
                      payload: 1 + 1,
                    })
                  }>
                  <SvgIcon
                    style={{ marginRight: 8, alignSelf: 'center' }}
                    icon="cardFilled"
                    fill={data.bookmarks[0].color}
                  />
                  <Typography>{data.bookmarks[0].name}</Typography>
                </MenuOption>
                <MenuOption
                  style={styles.menuOption}
                  onSelect={() =>
                    store.dispatch({
                      type: bookmarkActionTypes.SET_CONSIDER,
                      payload: 1 + 1,
                    })
                  }>
                  <SvgIcon
                    style={{ marginRight: 8, alignSelf: 'center' }}
                    icon="cardFilled"
                    fill={data.bookmarks[1].color}
                  />
                  <Typography>{data.bookmarks[1].name}</Typography>
                </MenuOption>
                <MenuOption
                  style={styles.menuOption}
                  onSelect={() =>
                    store.dispatch({
                      type: bookmarkActionTypes.SET_FUTURE,
                      payload: 1 + 1,
                    })
                  }>
                  <SvgIcon
                    style={{ marginRight: 8, alignSelf: 'center' }}
                    icon="cardFilled"
                    fill={data.bookmarks[2].color}
                  />
                  <Typography>{data.bookmarks[2].name}</Typography>
                </MenuOption>
                <MenuOption
                  style={styles.menuOption}
                  onSelect={() =>
                    store.dispatch({
                      type: bookmarkActionTypes.SET_BLANK,
                      payload: 1 + 1,
                    })
                  }>
                  <SvgIcon
                    fill={Colors.Danger}
                    style={{ marginRight: 8, alignSelf: 'center' }}
                    icon="crossBig"
                  />
                  <Typography color={Colors.Danger}>Usuń kandydata</Typography>
                </MenuOption>
              </MenuOptions>
            </Menu> */}
            {/* <TouchableOpacity style={styles.iconWithText} onPress={() => contactsHandler()}>
              <SvgIcon icon="phoneCallBig" fill='none' />
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.iconWithText} onPress={() => setOpenNotes(true)}>
              <SvgIcon icon="pinBig" fill='none' />
              <Typography color={Colors.White} variant="small">Notatki</Typography>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={[styles.iconWithText, { marginBottom: 15 }]} onPress={() => { }}>
              <SvgIcon icon="shareArow" fill='none' />
            </TouchableOpacity> */}
          </View>
        </View>
      </TouchableHighlight>
      {/* {!!duration && <View style={{ position: 'absolute', width: '100%', alignItems: 'center', bottom: -10 }}>
        <MultiSlider
          enabledTwo={false}
          step={0.1}
          sliderLength={Dimensions.get('screen').width - 36}
          min={0} max={duration}
          onValuesChange={(val) => VideoRef.current?.seek(val[0])}
          values={[progress]}
          trackStyle={{ backgroundColor: Colors.Basic400, height: 5 }}
          markerStyle={{ backgroundColor: Colors.White, width: 16, height: 16, top: 2 }}
          selectedStyle={{ backgroundColor: Colors.White, height: 5 }}
        />
      </View>} */}
      {/* <Modal isOpen={openNotes} onClose={() => setOpenNotes(false)}>
        <Modal.Header width='full' style={{ backgroundColor: Colors.White }}>
          <Typography variant='h4' weight='Bold' textAlign='center'>Twoje notatki</Typography>
        </Modal.Header>
        {!!candidateNotes.length &&
          <View style={{ borderBottomWidth: 1, width: '100%', borderColor: Colors.Basic400, backgroundColor: Colors.White }}>
            <View style={[styles.noteContainer]}>
              {candidateNotes.map(id => {
                const note = notes.find(e => e.id === id);
                const color = noteTitles.find(e => e.type === note?.type)?.color;
                return (
                  <TouchableOpacity style={styles.note} onPress={() => setCandidateNotes(prev => prev.filter(eid => eid !== id))}>
                    <Typography color={noteTitles.find(e => e.type === note?.type)?.color}>
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
          {noteTitles.map(({ title, type, color }) => (
            <View>
              <Typography variant="h5" weight="Bold" style={[styles.noteHeader, { color: Colors.Green500 }]}>
                {title}
              </Typography>
              <View style={styles.noteContainer}>
                {notes.filter(e => e.type === type).map(({ id, title }) => (
                  <Typography color={color} style={styles.note} onPress={() => setCandidateNotes(prev => Array.from(new Set([...prev, id])))}>
                    {title}
                  </Typography>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
        <Modal.Footer width='full' p={0}>
          <ButtonRipple containerStyles={{ flex: 1 }} contentVariant='h5' contentWeight='Bold' variant='white' onPress={() => setOpenNotes(false)}>
            Zapisz i zamknij
          </ButtonRipple>
        </Modal.Footer>
      </Modal> */}
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Video: {
    height: '100%',
    width: '100%',
  },
  text: {
    // textShadowColor: 'rgba(0, 0, 0, 1)',
    // textShadowOffset: { width: 0, height: 0 },
    // textShadowRadius: 15,
  },
  shadow: {
    position: 'absolute',
    top: 0,
  },
  playIcon: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
  },
  progressMarker: {
    position: 'absolute',
    top: -7,
    zIndex: 100,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 34,
    right: 18,
    alignItems: 'center',
  },
  iconWithText: {
    alignItems: 'center',
    marginBottom: 35
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
  menuOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: Colors.Basic300,
    flexDirection: 'row',
  },
});

export default VideoScreen;
