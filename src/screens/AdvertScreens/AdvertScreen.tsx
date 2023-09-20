import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
// import TabbarMenu, { TabbarRoute, } from '../../components/organisms/TabbarMenu/TabbarMenu';
import { SceneMap } from 'react-native-tab-view';
import { useTypedSelector } from '../../hooks/useTypedSelector';
// import AdvertLarge from '../../components/organisms/AdvertLarge/AdvertLarge';
import { nativeStore } from '../../store';
import { advertActionTypes } from '../../store/actions';
import OpinionCard from './AdvertScreenRoutes/OpinionCard/OpinionCard';
import ResumeCard from './AdvertScreenRoutes/ResumeCard/ResumeCard';
import { useActions } from '../../hooks/useActions';
import MainDataCard from '../ProfileScreens/CompanyScreenRoutes/MainDataCard/MainDataCard';
import AboutCard from '../ProfileScreens/CompanyScreenRoutes/AboutCard/AboutCard';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../../components/molecules/ScrollView';
import Typography from '../../components/atoms/Typography';
import AdvertLarge from '../../components/organismes/AdvertLarge';
import TabbarMenu, { TabbarRoute } from '../../components/organismes/TabbarMenu';
import { useLink } from 'solito/link';
import { createParam } from 'solito';

const { useParam } = createParam<AdvertStackParamList['AdvertScreen']>();

const AdvertScreen: React.FC = () => {
  const { userAdverts, userCompany } = useTypedSelector(state => state.general);
  const [tabbarIndex, setTabbarIndex] = React.useState(0);
  const [routes] = React.useState<TabbarRoute[]>([
    { key: '0', title: 'Informacje' },
    { key: '1', title: 'O firmie' },
    // { key: '2', title: 'Opinie' },
  ]);
  const { setSwipeablePanelProps } = useActions();
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [isPanelActive2, setIsPanelActive2] = useState(false);

  const [id] = useParam('id')
  console.log(id);
  
  const advert = userAdverts.find(curr => curr.id === Number(id));

  // const data = useTypedSelector(state => state.adverts);

  const moreOptionsHandler = () => {
    setSwipeablePanelProps({
      title: 'Czy chcesz zmienić to ogłoszenie?',
      buttons: [
        {
          children: 'Edytuj',
          // onPress: () => navigation.navigate('EditAdvertScreen', { advertIndex: advertIndex }),
        },
        {
          children: 'Usuń',
          contentColor: Colors.Danger,
          contentVariant: 'h5',
          onPress: deleteHandler,
          closeAction: 'none',
        },
      ]
    })
  }

  const deleteHandler = () => {
    setSwipeablePanelProps({
      title: 'Naprawdę chcesz usunąć?',
      buttons: [
        {
          children: 'Tak',
          contentColor: Colors.Danger,
          contentVariant: 'h5',
          ...useLink({
            href: '/adverts',
          }),
          // nativeStore.dispatch({
          //   type: advertActionTypes.REMOVE_ADVERT,
          //   payload: {
          //     // pushedIndex: advertIndex,
          //   },
          // });
        },
      ]
    })
  }

  return (
    <ScreenHeaderProvider
      mode='backAction'
      transparent
    // actions={[
    //   {
    //     icon: <SvgIcon icon="moreVert" />,
    //     onPress: moreOptionsHandler,
    //   },
    // ]}
    >
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        {advert ? <AdvertLarge {...advert} /> : <Typography>Nie ma informacji</Typography>}
        <TabbarMenu
          navigationState={{ index: tabbarIndex, routes }}
          onIndexChange={setTabbarIndex}
          renderScene={SceneMap({ 0: () => null, 1: () => null })}
        // renderScene={SceneMap({ 0: () => null, 1: () => null, 2: () => null })}
        />
        <View>{{
          0: advert ? <ResumeCard {...advert} /> : <Typography>Nie ma informacji</Typography>,
          1: userCompany ? <View style={{ marginTop: 16 }}>
            <MainDataCard {...userCompany} />
            <AboutCard {...userCompany} />
          </View> : <Typography>Nie ma informacji</Typography>
          // 1: <AboutCard />,
          // 2: <OpinionCard />
        }[tabbarIndex]}</View>
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({});

export default AdvertScreen;
