import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { nativeStore } from '../../store';
import { advertActionTypes } from '../../store/actions';
import { useActions } from '../../hooks/useActions';
import { SceneMap } from 'react-native-tab-view';
import { useDispatch } from 'react-redux';
import advertsServices from '../../services/advertsServices';
import { UserAdvertType } from '../../store/reducers/types';
import TabbarMenu, { TabbarRoute } from '../../components/organismes/TabbarMenu';
import Typography from '../../components/atoms/Typography';
import AdvertSmall from '../../components/organismes/AdvertSmall';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import LoadingScreen from '../../components/atoms/LoadingScreen';
import SvgIcon from '../../components/atoms/SvgIcon';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useRouter } from 'solito/router';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import { Separator } from 'tamagui';

const MainScreen: React.FC = () => {
  const SectionListRef = useRef<SectionList>(null);
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { token, userCompany, userAdverts } = useTypedSelector(state => state.general);
  const { setSwipeablePanelProps } = useActions();
  const [tabbarIndex, setTabbarIndex] = React.useState<number>(0);
  const [routes] = React.useState<TabbarRoute[]>([
    { key: '0', title: 'Aktywne' },
    { key: '1', title: 'W edycji' },
    { key: '2', title: 'Wygasłe' },
  ]);
  const [selectedAdvertIndex, setSelectedAdvertIndex] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const advertsRequested = useRef(false);

  const getUserAdverts = async (granted?: boolean) => {
    if (token && userCompany?.id && (!advertsRequested.current || granted)) {
      advertsRequested.current = true;
      setLoading(true);
      await dispatch(advertsServices.getUserAdverts(token, userCompany.id));
    }
    setLoading(false);
  }

  // console.log(Object.keys(userCompany));


  useEffect(() => {
    getUserAdverts();
  }, [userCompany, token]);

  const changeSectionHandler = (sectionIndex: number, withScroll: boolean = true) => {
    setTabbarIndex(sectionIndex);
    if (withScroll) SectionListRef.current?.scrollToLocation({ sectionIndex, itemIndex: 0, animated: false });
  }

  const moreOptionsHandler = (data: any) => {
    setSwipeablePanelProps({
      title: 'Czy chcesz zmienić to ogłoszenie?',
      buttons: [
        {
          children: 'Edytuj',
          onPress: () => router.push(`/adverts/AdvertEditorScreen?id=${selectedAdvertIndex}`)
        },
        {
          children: 'Usuń',
          contentColor: Colors.Danger,
          contentVariant: 'h5',
          closeAction: 'none',
          onPress: () => setSwipeablePanelProps({
            title: 'Naprawdę chcesz usunąć?',
            buttons: [
              {
                children: 'Tak',
                contentColor: Colors.Danger,
                contentVariant: 'h5',
                onPress: () => {
                  // nativeStore.dispatch({
                  //   type: advertActionTypes.REMOVE_ADVERT,
                  //   payload: {
                  //     pushedIndex: selectedAdvertIndex,
                  //   },
                  // });
                },
              },
            ]
          }),
        },
      ]
    })
  }

  const extendAdvertHandler = (data: any) => {
    setSwipeablePanelProps({
      title: 'Pakiety',
      children: (
        <View>
          <View style={{ paddingHorizontal: 19 }}>
            <Typography variant="h5">
              Ups! Skończyły Ci się darmowe ogłoszenia.
            </Typography>
          </View>
          <View
            style={{
              backgroundColor: Colors.Sea300,
              marginTop: 16,
              padding: 19
            }}>
            <Typography color={Colors.Basic600} variant="h5" weight='Bold'>
              PAKIET - MEDIUM
            </Typography>
            <Typography variant="h2" weight='Bold'>
              50zł <Typography variant="main" weight='Medium'>tydzień</Typography>
            </Typography>
            <Typography variant="small" color={Colors.Danger}>
              Pakiet wygasł
            </Typography>
          </View>
        </View>
      ),
      buttons: [
        {
          variant: "primary",
          contentVariant: 'h5',
          contentWeight: 'Bold',
          contentColor: Colors.White,
          children: 'Przedłuż pakiet',
          onPress: () => { },
        },
        {
          children: 'Zobacz pakiety',
          contentVariant: 'h5',
          onPress: () => { }//navigation.navigate("ProfileStack", { screen: "MainScreen" }),
        },
      ]
    })
  }

  const CandidatesList = useMemo(() => (<View style={{ flex: 1, backgroundColor: Colors.Basic100 }}>
    <SectionList
      ref={SectionListRef}
      initialNumToRender={userAdverts.length}
      onScrollToIndexFailed={() => { }}
      viewabilityConfig={{
        minimumViewTime: 500,
        itemVisiblePercentThreshold: 100
      }}
      onViewableItemsChanged={({ viewableItems }) => changeSectionHandler(viewableItems[0]?.section.index, false)}
      sections={[
        { title: 'Aktywne', data: userAdverts, index: 0 },
        { title: 'W edycji', data: [], index: 1 },
        { title: 'Wygasłe', data: [], index: 2 }
      ]}
      // ListHeaderComponent={
      //   <View style={styles.AdCounterBackground}>
      //     <MatchCircle
      //       fullCircle={true}
      //       percent={15}
      //       height={48}
      //       width={48}
      //       fontSize={30}
      //       backgroundColor={Colors.White}
      //     />
      //     <Typography style={{ lineHeight: 48, marginLeft: 10 }}>
      //       Masz 15 darmowych ogłoszeń.
      //     </Typography>
      //   </View>
      // }
      renderSectionHeader={({ section: { title, index } }) => (
        <Typography weight="Bold" style={styles.Title}>{title}</Typography>
      )}
      renderItem={({ item: i }) => {
        const item = i as UserAdvertType;
        return (
          <View style={{ marginBottom: 12 }}>
            <AdvertSmall
              {...item}
              options={() => (moreOptionsHandler(item), setSelectedAdvertIndex(item.id))}
              onPressButton0={() => router.push(`/adverts/CandidatesScreen?id=${item.id}`)}
              onPressButton1={() => extendAdvertHandler(item)}
              onPressDetails={() => item.id && router.push(`/adverts/AdvertScreen?id=${item.id}`)}
            />
          </View>
        )
      }
      }
      renderSectionFooter={({ section: { index, data } }) => {
        const titles = ['Brak ofert aktywnych', 'Brak ofert w edycji', 'Brak ofert wygasłych'];
        return !data.length ? (<>
          {/* <Separator /> */}
          <View style={{ paddingVertical: 5, marginHorizontal: 16 }}>
            <Typography variant='h5' weight='SemiBold' color={Colors.Basic600} textAlign='center'>{titles[index]}</Typography>
          </View>
          {/* <Separator /> */}
        </>) : null
      }}
    />
  </View>), [userAdverts]);//!!!!!deps!!!!!

  return (<>
    <ScreenHeaderProvider mode="mainTitle" actions={!loading ? [{
      icon: 'refresh',
      onPress: () => getUserAdverts(true)
    }] : undefined}>
      {loading ? <LoadingScreen /> : <>
        <View style={{ height: 45 }}>
          <TabbarMenu
            backgroundColor={Colors.White}
            navigationState={{ index: tabbarIndex, routes }}
            onIndexChange={changeSectionHandler}
            renderScene={SceneMap({ 0: () => null, 1: () => null, 2: () => null })}
          />
        </View>
        {!!userAdverts.length ?
          CandidatesList :
          <Typography style={{ marginHorizontal: 19, marginVertical: 20 }}>Nie masz ofert</Typography>
        }
      </>}
    </ScreenHeaderProvider>
    <CornerCircleButton onPress={() => router.push('/adverts/AdvertEditorScreen')} />
  </>);
};

const styles = StyleSheet.create({
  Title: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 16,
  },
  nullAd: {
    textAlign: 'center',
    paddingVertical: 31,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Basic300,
    borderTopColor: Colors.Basic300,
  },
  AdCounterBackground: {
    flexDirection: 'row',
    paddingVertical: 11,
    marginTop: 12,
    paddingLeft: 19,
  },
  createIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default MainScreen;
