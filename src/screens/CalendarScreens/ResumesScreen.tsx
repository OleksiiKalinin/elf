import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import CandidateCard from '../../components/organismes/CandidateCard';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { SwipeablePanelProps } from '../../components/organismes/SwipeablePanel';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CalendarStackParamList, 'ResumesScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CalendarStack'>
>;

const ResumesScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  // const data = useTypedSelector(state => state.bookmark);

  const [isPanelActive, setIsPanelActive] = useState<boolean>(false);

  // const { selectedPersons } = route.params;

  // const jobsCategories = data.persons
  //   .filter(item => selectedPersons.includes(item.index))
  //   .map(a => a.job);

  // const uniq = {};
  // const jobsCategoriesFiltered = jobsCategories.filter(
  //   obj => !uniq[obj] && (uniq[obj] = true),
  // );


  const swipePanels: SwipeablePanelProps[] = [
    {
      isActive: isPanelActive,
      onClose: () => setIsPanelActive(false),
      title: 'Skontaktuj się',
      buttons: [
        {
          children: (
            <View style={{ flexDirection: 'row' }}>
              <SvgIcon icon="phoneCall1" />
              <Typography> +48 662 047 277</Typography>
            </View>
          ),
          onPress: () => console.log('Kalkulator'),
        },
        {
          children: (
            <View style={{ flexDirection: 'row' }}>
              <SvgIcon icon="messenger" />
              <Typography> Link do messengera</Typography>
            </View>
          ),
          onPress: () => console.log('Kalkulator'),
        },
        {
          children: (
            <View style={{ flexDirection: 'row' }}>
              <SvgIcon icon="email" />
              <Typography> Adres e-mail</Typography>
            </View>
          ),
          onPress: () => console.log('Kalkulator'),
        },
      ],
    },
  ];

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start"
      actions={[
        {
          icon: 'search',
          onPress: () => navigation.navigate('CandidatesStack', { screen: 'MainScreen' }),
        },
        {
          icon: 'cardOutlined',
          onPress: () => navigation.navigate('CandidatesStack', { screen: 'FavouritesScreen' }),
        },
      ]}
    >
      {/* <ScrollView style={{ backgroundColor: Colors.Basic100, paddingTop: 19 }}>
        {data.persons
          .map((item, index) =>
            (selectedPersons.includes(item.index)) &&

            (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CandidatesStack', {
                    screen: 'ProfileScreen',
                    params: { profileIndex: index }
                  })}
              >
                <CandidateCard
                  name={item.name}
                  job={item.job}
                  salary={item.salary}
                  experience={item.experience}
                  schedule={item.schedule}
                  available={item.available}
                  distance={item.distance}
                  time={item.time}
                  bookmark={
                    data.bookmarks[
                      data.bookmarks
                        .map(item => item.category)
                        .indexOf(item.bookmark)
                    ].color
                  }
                  blank={item.bookmark === 'blank' ? true : false}
                  videoCV={item.videoCV}
                  promoted={item.promoted}
                  index={item.index}
                  onPress={() => setIsPanelActive(true)}
                />
              </TouchableOpacity>
            ))}
      </ScrollView> */}
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  jobCategories: {
    marginTop: 9,
    marginLeft: 10,
    marginBottom: 15,
  },
});

export default ResumesScreen;
