import React, { ComponentProps, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Platform,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
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
import ScreenHeaderProvider, { SCREEN_HEADER_HEIGHT } from '../../components/organismes/ScreenHeaderProvider';
import LoadingScreen from '../../components/atoms/LoadingScreen';
import SvgIcon from '../../components/atoms/SvgIcon';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import useRouter from '../../hooks/useRouter';
import { Spinner } from 'tamagui';
import { createParam } from 'solito';

type Props = NonNullable<AdvertStackParamList['default']['MainScreen']>;
const { useParam } = createParam<Props>();

const MainScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const [subView] = useParam('subView');
  const { token, userCompany, userAdverts } = useTypedSelector(state => state.general);
  const { setSwipeablePanelProps } = useActions();
  const [tabbarIndex, setTabbarIndex] = React.useState<number>(0);
  const [selectedAdvertId, setSelectedAdvertId] = React.useState<number | null>(null);
  const [routes] = React.useState<TabbarRoute[]>([
    { key: '0', title: 'Aktywne' },
    { key: '1', title: 'W edycji' },
    { key: '2', title: 'Wygasłe' },
  ]);

  useEffect(() => {
    setSwipeablePanelProps((() => {
      if (subView === 'options') return {
        title: 'Co chcesz zrobić z ogłoszeniem?',
        closeButton: true,
        buttons: [
          {
            children: 'Edytuj',
            closeAction: 'props-null',
            onPress: () => selectedAdvertId && router.replace({ stack: 'AdvertStack', screen: 'AdvertEditorScreen', params: { id: selectedAdvertId.toString() } })
          },
          {
            children: 'Usuń',
            contentColor: Colors.Danger,
            contentVariant: 'h5',
            closeAction: 'none',
            onPress: () => setSwipeablePanelProps({
              title: 'Naprawdę chcesz usunąć?',
              closeButton: true,
              buttons: [
                {
                  children: 'Tak',
                  contentColor: Colors.Danger,
                  contentVariant: 'h5',
                  onPress: () => {
                    ///delete
                  },
                },
              ]
            }),
          },
        ]
      }
      return null;
    })());
  }, [subView, selectedAdvertId]);

  const moreOptionsHandler = (advert: UserAdvertType) => {
    setSelectedAdvertId(advert.id);
    router.push({stack: 'AdvertStack', screen: 'MainScreen', params: {subView: 'options'}});
  }

  // const extendAdvertHandler = (data: any) => {
  //   setSwipeablePanelProps({
  //     title: 'Pakiety',
  //     children: (
  //       <View>
  //         <View style={{ paddingHorizontal: 19 }}>
  //           <Typography variant="h5">
  //             Ups! Skończyły Ci się darmowe ogłoszenia.
  //           </Typography>
  //         </View>
  //         <View
  //           style={{
  //             backgroundColor: Colors.Sea300,
  //             marginTop: 16,
  //             padding: 19
  //           }}>
  //           <Typography color={Colors.Basic600} variant="h5" weight='Bold'>
  //             PAKIET - MEDIUM
  //           </Typography>
  //           <Typography variant="h2" weight='Bold'>
  //             50zł <Typography variant="main" weight='Medium'>tydzień</Typography>
  //           </Typography>
  //           <Typography variant="small" color={Colors.Danger}>
  //             Pakiet wygasł
  //           </Typography>
  //         </View>
  //       </View>
  //     ),
  //     buttons: [
  //       {
  //         variant: "primary",
  //         contentVariant: 'h5',
  //         contentWeight: 'Bold',
  //         contentColor: Colors.White,
  //         children: 'Przedłuż pakiet',
  //         onPress: () => { },
  //       },
  //       {
  //         children: 'Zobacz pakiety',
  //         contentVariant: 'h5',
  //         onPress: () => { }//navigation.navigate("ProfileStack", { screen: "MainScreen" }),
  //       },
  //     ]
  //   })
  // }

  const renderAdvert = ({ item }: ListRenderItemInfo<UserAdvertType>) => (
    <AdvertSmall
      {...item}
      onPressOptions={(advert) => moreOptionsHandler(advert)}
      onPressExtendActivity={(advert) => console.log(advert)}
    />
  )

  const adverts = useMemo(() => {
    const active: UserAdvertType[] = [];
    const notActive: UserAdvertType[] = [];
    const expired: UserAdvertType[] = [];

    userAdverts.forEach((advert) => {
      if (new Date(advert.expiration_time).getTime() < Date.now()) {
        expired.push(advert);
      } else if (advert.is_active) {
        active.push(advert);
        active.push(advert);
        active.push(advert);
        active.push(advert);
        active.push(advert);
        active.push(advert);
        active.push(advert);
        active.push(advert);
        active.push(advert);
        active.push(advert);
        active.push(advert);
        active.push(advert);
      } else {
        notActive.push(advert);
      }
    });

    const props = (data: ComponentProps<typeof FlatList<UserAdvertType>>['data']): ComponentProps<typeof FlatList<UserAdvertType>> => ({
      data,
      renderItem: renderAdvert,
      ItemSeparatorComponent: () => <View style={{
        borderColor: Colors.Basic300,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        padding: 6
      }} />,
      ListHeaderComponent: !!data?.length ? () => <View style={{
        borderColor: Colors.Basic300,
        borderBottomWidth: 1,
        padding: 10
      }} /> : undefined,
      ListFooterComponent: !!data?.length ? () => <View style={{
        borderColor: Colors.Basic300,
        borderTopWidth: 1,
        padding: 10
      }} /> : undefined,
      ListEmptyComponent: () => (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Typography color={Colors.Basic600} variant='h4'>Nie masz ofert tej kategorii</Typography>
        </View>
      )
    })

    return {
      active: (() => <FlatList {...props(active)} />),
      notActive: (() => <FlatList {...props(notActive)} />),
      expired: (() => <FlatList {...props(expired)} />),
    }
  }, [userAdverts]);

  return (<>
    <ScreenHeaderProvider
      mode="mainTitle"
      backgroundContent={Colors.Basic100}
      staticContentHeightOnWeb
    >
      <TabbarMenu
        renderLazyPlaceholder={() => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color={Colors.Basic900} size='large' />
        </View>}
        backgroundColor={Colors.White}
        navigationState={{ index: tabbarIndex, routes }}
        onIndexChange={setTabbarIndex}
        renderScene={SceneMap({
          0: adverts.active,
          1: adverts.notActive,
          2: adverts.expired
        })}
      />
    </ScreenHeaderProvider>
    <CornerCircleButton onPress={() => router.push({ stack: 'AdvertStack', screen: 'AdvertEditorScreen', params: undefined })} />
  </>);
};

const styles = StyleSheet.create({
  Tabs: {
    height: 45,
    position: Platform.select({
      native: 'absolute',
      web: 'fixed'
    }),
    top: SCREEN_HEADER_HEIGHT,
    width: '100%',
    zIndex: 1,
    maxWidth: 768,
  },
});

export default MainScreen;
