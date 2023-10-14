import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';
import Colors from '../../colors/Colors';
// import CandidateCard from '../../components/organisms/CandidateCard/CandidateCard';
import { useTypedSelector } from '../../hooks/useTypedSelector';
// import HorizontalMenuButton from '../../components/atoms/HorizontalMenuButton/HorizontalMenuButton';
import { useActions } from '../../hooks/useActions';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import SvgIcon from '../../components/atoms/SvgIcon';
import { ScrollView } from '../../components/molecules/ScrollView';
import CandidateCard from '../../components/organismes/CandidateCard';

const FavouritesScreen: React.FC = () => {
  const [filter, setFilter] = useState<string>('super');

  const [isPanelActive, setIsPanelActive] = useState<boolean>(false);

  // const data = useTypedSelector(state => state.bookmark);

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start"
      actions={[
        {
          icon: 'settings',
          onPress: () => {}//navigation.navigate('FavSettingsScreen'),
        },
      ]}>
      <ScrollView style={{ flex: 1, backgroundColor: Colors.Basic100 }}>
        <ScrollView
          horizontal
          style={{ flexDirection: 'row', marginLeft: 19, marginVertical: 15 }}
          showsHorizontalScrollIndicator={false}
        >
          {/* {data.bookmarks.map((item, index) => (
            <HorizontalMenuButton
              variant="bookmark"
              icon="cardFilled"
              fill={data.bookmarks[index].color}
              noIcon={data.bookmarks[index].noIcon}
              name={<Typography>{item.name}</Typography>}
              selectedColor={data.bookmarks[index].selectedColor}
              selected={item.category === filter ? true : false}
              onPress={() => setFilter(item.category)}
            />
          ))} */}
        </ScrollView>
        {/* {data.persons
          .filter(item => item.bookmark == filter)
          .map(item => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProfileScreen', {
                  profileIndex: item.index - 1,
                })
              }
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
                  data.bookmarks[data.bookmarks.map(item => item.category).indexOf(item.bookmark)].color
                }
                blank={item.bookmark === "blank" ? true : false}
                videoCV={item.videoCV}
                promoted={item.promoted}
                index={item.index}
                onPress={() => setIsPanelActive(true)}
              />
            </TouchableOpacity>
          ))} */}
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({});

export default FavouritesScreen;
