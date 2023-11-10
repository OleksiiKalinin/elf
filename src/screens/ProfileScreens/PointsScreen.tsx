import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CompositeScreenProps, useIsFocused, useRoute } from '@react-navigation/native';
import Colors from '../../colors/Colors';
import { SceneMap } from 'react-native-tab-view';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import TabbarMenu, { TabbarRoute } from '../../components/organismes/TabbarMenu';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import Button from '../../components/molecules/Button';
import { ScrollView } from '../../components/molecules/ScrollView';

const PointsScreen: React.FC = () => {
  const [tabbarIndex, setTabbarIndex] = React.useState(0);
  const [routes] = React.useState<TabbarRoute[]>([
    { key: '0', title: 'Zdobądź' },
    { key: '1', title: 'Wymień' },
  ]);

  const [pointsCount, setPointsCount] = useState(129)

  return (
    <ScreenHeaderProvider>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>
          <View>
            {/* <ButtonArrowSelector
              noArrow
              pointsTemplate
              text={
                <View>
                  <Typography variant="small" color={Colors.Basic600}>
                    Twoje punkty
                  </Typography>
                  <ProgressBar value={pointsCount} />
                </View>
              }
              onPress={() => navigation.navigate('PointsScreen')}
            /> */}
          </View>
          <TabbarMenu
            navigationState={{ index: tabbarIndex, routes }}
            onIndexChange={setTabbarIndex}
            renderScene={SceneMap({ 0: () => null, 1: () => null })}
          />
          <View style={{ paddingBottom: 15, paddingTop: 5 }}>{{
            0: <FirstRoute />,
            1: <SecondRoute />
          }[tabbarIndex]}</View>
        </ScrollView>
      </View>
    </ScreenHeaderProvider>
  );
};

const FirstRoute = () => {

  const getPointsSlides = [
    { title: "Załóż profil firmy", content: "Załóż profil firmy i uzupełnij wszystkie informacje w profilu.", points: 100 },
    { title: "Wypróbuj pakiet PRO", content: "Przetestuj aplikację w wersji PRO za darmo!", points: 50 },
    { title: "Dodaj ogłoszenie", content: "Podaj wszystkie dane o oferowanej pracy. Punkty wygasają po miesiącu od publikacji.", points: 50 },
    { title: "Oceń aplikację", content: "Daj znać, co myślisz o ELF-ie w Google Play.", points: 50 },
    { title: "Zaproś znajomego", content: "Zachęć kogoś do korzystania z ELF-a. Znajomy musi założyć profil i uzupełnić dane.", points: 50 },
    { title: "Udostępnij post", content: "Pokaż ELF-a na Facebooku, Instagramie lub Linkedinie. Post powinien być publiczny.", points: 50 },
    { title: "Pakiet PRO na msc", content: "Wykup pakiet PRO na miesiąc.", points: 50 },
    { title: "Pakiet PRO na 7 dni", content: "Wykup pakiet PRO na tydzień.", points: 20 },
    { title: "Rozdaj gwiazdki", content: "Oceń kandydata za pomocą gwiazdek, które są dostępne po każdym spotkaniu.", points: 15 },
    { title: "Wystaw opinię", content: "Napisz komentarz na profilu kandydata lub pracownika.", points: 15 },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Basic100, marginTop: 24 }}>

      {getPointsSlides.map(item =>
        <View>
          <View style={styles.getPointsBanner}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, alignItems: "flex-start" }}>
              <Typography variant='h4'>{item.title}</Typography>
              <Typography variant="h2" weight='Bold'>{item.points} <Typography>pkt</Typography></Typography>
            </View>
            <View>
              <Typography variant='main'>{item.content}</Typography>
            </View>
          </View>
          <Button onPress={() => console.log("aaa")}>Zdobądź</Button>
          <View style={{ marginBottom: 16 }}></View>
        </View>
      )}
    </View>
  );
}

const SecondRoute = () => {
  const [pointsCount, setPointsCount] = useState(129)

  const spendPointsSlides = [
    { title: "Reklama na FB", content: "Udostępnienie oferty pracy na Facebooku.", points: 50 },
    { title: "Promowanie", content: "Promowanie Twojej oferty pracy w aplikacji przez tydzień.", points: 100 },
    { title: "Pakiet PRO -20%", content: "Opłata za pakiet PRO na okres 1. miesiąca zostanie obniżona o 10%.", points: 100 },
    { title: "Video CV", content: "Oglądaj Video CV przez tydzień za darmo.", points: 100 },
    { title: "Pakiet PRO -50%", content: "Opłata za pakiet PRO na okres 1. miesiąca zostanie obniżona o 50%.", points: 250 },
    { title: "Pakiet PRO -100%", content: "Pakiet PRO za darmo!", points: 500 },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Basic100, marginTop: 24 }}>
      {spendPointsSlides.map(item =>
        <View>
          <View style={[styles.getPointsBanner, { backgroundColor: Colors.Sea300 }]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, alignItems: "flex-start" }}>
              <Typography variant='h4'>{item.title}</Typography>
              <Typography variant="h2" weight='Bold'>{item.points} <Typography>pkt</Typography></Typography>
            </View>
            <View>
              <Typography variant='main'>{item.content}</Typography>
            </View>
          </View>
          <Button onPress={() => console.log("aaa")} disabled={pointsCount > item.points ? false : true}>
            {pointsCount > item.points ? "Wymień" : "Za mało punktów"}</Button>
          <View style={{ marginBottom: 16 }}></View>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.Basic200,
  },
  Content: {
    flex: 1,
  },
  margin: {
    marginVertical: 12,
    marginHorizontal: 24,
  },
  getPointsBanner: {
    paddingHorizontal: 19,
    paddingVertical: 12,
    backgroundColor: Colors.Blue200,
    height: 141
  }
});

export default PointsScreen;
