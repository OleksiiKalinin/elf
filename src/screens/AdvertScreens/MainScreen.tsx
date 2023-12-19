import React, { ComponentProps, PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
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
import { ScrollView } from '../../components/molecules/ScrollView';

type Props = NonNullable<AdvertStackParamList['default']['MainScreen']>;
const { useParam } = createParam<Props>();

const MainScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { token, userCompany, userAdverts } = useTypedSelector(state => state.general);
  const [tabbarIndex, setTabbarIndex] = React.useState<number>(0);
  const [routes] = React.useState<TabbarRoute[]>([
    { key: '0', title: 'Aktywne' },
    { key: '1', title: 'W edycji' },
    { key: '2', title: 'Wygasłe' },
  ]);

  const adverts = useMemo(() => {
    const adverts: {
      active: UserAdvertType[],
      notActive: UserAdvertType[],
      expired: UserAdvertType[],
    } = {
      active: [],
      notActive: [],
      expired: [],
    }

    userAdverts.forEach((advert) => {
      if (new Date(advert.expiration_time).getTime() < Date.now()) {
        adverts.expired.push(advert);
      } else if (advert.is_active) {
        adverts.active.push(advert);
        adverts.active.push(advert);
        adverts.active.push(advert);
        adverts.active.push(advert);
        adverts.active.push(advert);
        adverts.active.push(advert);
        adverts.active.push(advert);
        adverts.active.push(advert);
        adverts.active.push(advert);
        adverts.active.push(advert);
        adverts.active.push(advert);
        adverts.active.push(advert);
      } else {
        adverts.notActive.push(advert);
      }
    });

    const props = (type: 'active' | 'notActive' | 'expired'): ComponentProps<typeof FlatList<UserAdvertType>> & { key: string } => ({
      key: type,
      data: adverts[type],
      renderItem: ({ item }) => <AdvertSmall {...item} />,
      ItemSeparatorComponent: () => <View style={{
        borderColor: Colors.Basic300,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        padding: 6
      }} />,
      ListHeaderComponent: !!adverts[type].length ? () => <View style={{
        borderColor: Colors.Basic300,
        borderBottomWidth: 1,
        padding: 10
      }} /> : undefined,
      ListFooterComponent: !!adverts[type].length ? () => <View style={{
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
      active: <FlatList {...props('active')} />,
      notActive: <FlatList {...props('notActive')} />,
      expired: <FlatList {...props('expired')} />,
    }
  }, [userAdverts]);

  return (<>
    <ScreenHeaderProvider
      mode="mainTitle"
      backgroundContent={Colors.Basic100}
    >
      <TabbarMenu
        stickyTop={SCREEN_HEADER_HEIGHT}
        backgroundColor={Colors.White}
        animationEnabled={false}
        navigationState={{ index: tabbarIndex, routes }}
        onIndexChange={setTabbarIndex}
        renderScene={SceneMap({ 0: () => null, 1: () => null, 2: () => null })}
      />
      <ScrollView>
        {{
          0: adverts.active,
          1: adverts.notActive,
          2: adverts.expired
        }[tabbarIndex]}
      </ScrollView>
    </ScreenHeaderProvider>
    <CornerCircleButton onPress={() => router.push({ stack: 'AdvertStack', screen: 'AdvertEditorScreen', params: undefined })} />
  </>);
};

const styles = StyleSheet.create({
});

export default MainScreen;
