import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../colors/Colors';
import HorizontalMenuButton from '../../components/atoms/HorizontalMenuButton/HorizontalMenuButton';
import LoadingScreen from '../../components/atoms/LoadingScreen/LoadingScreen';
import Typography from '../../components/atoms/Typography/Typography';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import CandidateCard from '../../components/organisms/CandidateCard/CandidateCard';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import advertsServices from '../../services/advertsServices';
import { CandidateDataType } from '../../store/reducers/types';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CalendarStackParamList, 'ChooseCandidateScreen'>,
  NativeStackScreenProps<RootStackParamList, 'CalendarStack'>
>;

const CandidatesScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { candidates: candidatesWithRating, callback } = route.params;
  const { token } = useTypedSelector(s => s.general);
  const [loading, setLoading] = useState<boolean>(true);
  const [candidates, setCandidates] = useState<CandidateDataType[]>([]);

  useEffect(() => {
    (async () => {
      if (candidatesWithRating.length) {
        const res = await dispatch(advertsServices.getAdvertCandidates(token, candidatesWithRating.map(e => e.candidate_id)));
        setCandidates(res as unknown as CandidateDataType[]);
      }
      setLoading(false);
    })();
  }, []);

  const CandidatesList = useMemo(() => (<View style={{ flex: 1, backgroundColor: Colors.Basic100 }}>
    <SectionList
      initialNumToRender={5}
      sections={[{ title: '', data: candidates }]}
      renderSectionHeader={() => (
        <View style={{ paddingTop: 20, paddingBottom: 5, }}>
          <Typography style={{ paddingLeft: 20 }} color={Colors.Basic600}>
            Masz {candidates.length} kandydatów
          </Typography>
        </View>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('ProfileScreen', { candidateData: item })}>
          <CandidateCard {...item}
            rating={candidatesWithRating.find(e => e.candidate_id === item.id)?.fit_rating}
            onChoose={() => {
              callback(item);
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
      )
      } />
  </View>), [candidates]);//!!!!!deps!!!!!

  return loading ? <LoadingScreen /> : (
    <ScreenHeaderProvider
      currentStack="CalendarStack"
      mainTitlePosition="flex-start"
    >
      {CandidatesList}
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  jobCategories: {
    marginTop: 9,
    marginLeft: 10,
    marginBottom: 15
  },
});

export default CandidatesScreen;
