import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { CandidateDataType } from '../../store/reducers/types';
import advertsServices from '../../services/advertsServices';
import { useDispatch } from 'react-redux';
import LoadingScreen from '../../components/atoms/LoadingScreen';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import CandidateCard from '../../components/organismes/CandidateCard';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useRouter } from 'solito/router';

const MainScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { setSwipeablePanelProps } = useActions();
  const [loading, setLoading] = useState<boolean>(true);
  const { userAdverts, token, userCompany } = useTypedSelector(state => state.general);
  const [candidates, setCandidates] = useState<CandidateDataType[]>([]);
  const router = useRouter();

  // const [switchToggle, setSwitchToggle] = useState<boolean>(false);
  // const [selectedJobCategory, setSelectedJobCategory] = useState<any>(null);
  // const dataBookmarks = useTypedSelector(state => state.bookmark);

  // const dataCompany = useTypedSelector(state => state.company);

  // const { filters } = route.params;

  // const [distanceFilter, setDistanceFilter] = useState<boolean>(false);
  // const [experienceFilter, setExperienceFilter] = useState<boolean>(false);
  // const [workloadFilter, setWorkloadFilter] = useState<boolean>(false);
  // const [contractFilter, setContractFilter] = useState<boolean>(false);
  // const [jobFilter, setJobFilter] = useState<boolean>(false);
  // const [availabilityFilter, setAvailabilityFilter] = useState<boolean>(false);
  // const [noCVFilter, setNoCVFilter] = useState<boolean>(false);
  // const [ukraineFilter, setUkraineFilter] = useState<boolean>(false);
  // const [locationFilter, setLocationFilter] = useState<boolean>(false);

  // const [searchText, setSearchText] = useState<string>('');
  // const [searchTextConfirm, setSearchTextConfirm] = useState<string>('');

  // const [sortingToggle, setSortingToggle] = useState<boolean>(false);

  // const [isPanelActive, setIsPanelActive] = useState<boolean>(false);
  // const [isPanelActive1, setIsPanelActive1] = useState<boolean>(false);

  // const jobsCategories = dataBookmarks.persons.map(a => a.job);
  // const unique: any = {};
  // const jobsCategoriesUnique = jobsCategories.filter(
  //   item => !unique[item] && (unique[item] = true),
  // );

  // useEffect(() => {
  //   filters[0] !== undefined && setDistanceFilter(true);
  //   filters[1].length > 0 && setExperienceFilter(true);
  //   filters[2].length > 0 && setWorkloadFilter(true);
  //   filters[3].length > 0 && setContractFilter(true);
  //   filters[4] !== null && filters.length > 0 && setJobFilter(true);
  //   filters[5] === true && setAvailabilityFilter(true);
  //   filters[6] === true && setNoCVFilter(true);
  //   filters[7] === true && setUkraineFilter(true);
  //   filters[8] !== null && 0 && setLocationFilter(true);
  // }, [filters]);

  // useEffect(() => {
  //   searchText.length === 0 && setSearchTextConfirm('');
  // });

  const getUserAdverts = async () => {
    if (token && userCompany?.id) {
      setLoading(true);
      await dispatch(advertsServices.getUserAdverts(userCompany.id));
    }
  }

  useEffect(() => {
    (async () => {
      if (userAdverts.length) {
        setLoading(true);
        const candidatesId = Array.from(new Set(userAdverts.reduce<number[]>((prev, curr) => [...prev, ...curr.candidate_data.map(e => e.candidate_id)], [])));
        if (candidatesId.length) {
          const res = await dispatch(advertsServices.getAdvertCandidates(candidatesId));
          setCandidates(res as unknown as CandidateDataType[]);
        }
      }
      setLoading(false)
    })();
  }, [userAdverts]);

  // useEffect(() => {
  //   console.log(JSON.stringify(candidates, null, 4));
  // }, [candidates]);


  const candidateContactsHandler = (data: any) => {
    setSwipeablePanelProps({
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
      ]
    })
  }

  const CandidatesList = useMemo(() => (<View style={{ flex: 1, backgroundColor: Colors.Basic100 }}>
    <SectionList
      initialNumToRender={5}
      sections={[{ title: '', data: candidates }]}
      renderSectionHeader={() => (
        <View style={{ paddingTop: 20, paddingBottom: 5, }}>
          {/* <View>
            {(experienceFilter === false &&
              contractFilter === false &&
              workloadFilter === false &&
              distanceFilter === false &&
              jobFilter === false &&
              availabilityFilter === false &&
              noCVFilter === false &&
              ukraineFilter === false &&
              locationFilter === false) === true && (
                <View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {dataCompany.professions.map(
                      (item, i) =>
                        dataBookmarks.persons.filter(
                          person => person.category === item.text,
                        ).length > 0 && (
                          <TouchableOpacity
                            style={{
                              alignItems: 'center',
                              marginLeft: 18
                              // width: 70,
                            }}
                            onPress={() =>
                              navigation.navigate('JobScreen', {
                                index: i,
                              })
                            }>
                            <SvgIcon icon={item.icon} />
                            <Typography
                              variant="small"
                              style={{ textTransform: 'capitalize' }}>
                              {item.text.length > 9
                                ? item.text.slice(0, 9) + '...'
                                : item.text}
                            </Typography>
                          </TouchableOpacity>
                        ),
                    )}
                    <View style={{ width: 18 }}></View>
                  </ScrollView>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('SearchScreen')}
                    style={{
                      // height: 70,
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginVertical: 15,
                      // marginLeft: 19,
                      paddingLeft: 20,
                    }}>

                    <Typography style={{ marginRight: 8 }}>
                      Zobacz wszystkie kategorie
                    </Typography>
                    <SvgIcon icon="arrowBackground" />
                  </TouchableOpacity>

                </View>
              )}

            {(experienceFilter === true ||
              contractFilter === true ||
              workloadFilter === true ||
              distanceFilter === true ||
              jobFilter === true ||
              availabilityFilter === true ||
              noCVFilter === true ||
              ukraineFilter === true ||
              locationFilter === true) && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginLeft: 19 }}>
                  {locationFilter === true && (
                    <HorizontalMenuButton
                      name={filters[8]}
                      selected={locationFilter}
                      backgroundColor={Colors.Basic300}
                      cross={true}
                      onPress={() =>
                        locationFilter === true
                          ? setLocationFilter(false)
                          : setLocationFilter(true)
                      }
                    />
                  )}

                  {distanceFilter === true && (
                    <HorizontalMenuButton
                      name={filters[0]}
                      selected={distanceFilter}
                      backgroundColor={Colors.Basic300}
                      cross={true}
                      onPress={() =>
                        distanceFilter === true
                          ? setDistanceFilter(false)
                          : setDistanceFilter(true)
                      }
                    />
                  )}

                  {experienceFilter === true && (
                    <HorizontalMenuButton
                      name={filters[1].map(item => item + "... ")}
                      selected={experienceFilter}
                      backgroundColor={Colors.Basic300}
                      cross={true}
                      onPress={() =>
                        experienceFilter === true
                          ? setExperienceFilter(false)
                          : setExperienceFilter(true)
                      }
                    />
                  )}

                  {workloadFilter === true && (
                    <HorizontalMenuButton
                      name={filters[2].map(item => item + "... ")}
                      selected={workloadFilter}
                      backgroundColor={Colors.Basic300}
                      cross={true}
                      onPress={() =>
                        workloadFilter === true
                          ? setWorkloadFilter(false)
                          : setWorkloadFilter(true)
                      }
                    />
                  )}

                  {contractFilter === true && (
                    <HorizontalMenuButton
                      name={filters[3].map(item => item + "... ")}
                      selected={contractFilter}
                      backgroundColor={Colors.Basic300}
                      cross={true}
                      onPress={() =>
                        contractFilter === true
                          ? setContractFilter(false)
                          : setContractFilter(true)
                      }
                    />
                  )}

                  {jobFilter === true && (
                    <HorizontalMenuButton
                      name={filters[4]}
                      selected={jobFilter}
                      backgroundColor={Colors.Basic300}
                      cross={true}
                      onPress={() =>
                        jobFilter === true
                          ? setJobFilter(false)
                          : setJobFilter(true)
                      }
                    />
                  )}

                  {availabilityFilter === true && (
                    <HorizontalMenuButton
                      name={'Praca od zaraz'}
                      selected={availabilityFilter}
                      backgroundColor={Colors.Basic300}
                      cross={true}
                      onPress={() =>
                        availabilityFilter === true
                          ? setAvailabilityFilter(false)
                          : setAvailabilityFilter(true)
                      }
                    />
                  )}

                  {noCVFilter === true && (
                    <HorizontalMenuButton
                      name={'Bez CV'}
                      selected={noCVFilter}
                      backgroundColor={Colors.Basic300}
                      cross={true}
                      onPress={() =>
                        noCVFilter === true
                          ? setNoCVFilter(false)
                          : setNoCVFilter(true)
                      }
                    />
                  )}

                  {ukraineFilter === true && (
                    <HorizontalMenuButton
                      name={'Praca dla Ukrainy'}
                      selected={ukraineFilter}
                      backgroundColor={Colors.Basic300}
                      cross={true}
                      onPress={() =>
                        ukraineFilter === true
                          ? setUkraineFilter(false)
                          : setUkraineFilter(true)
                      }
                    />
                  )}
                </ScrollView>
              )}
          </View> */}
          <Typography style={{ marginHorizontal: 19 }}>
            {!!candidates.length ? `Masz ${candidates.length} kandydatów` : 'Nie masz kandydatów!'}
          </Typography>
        </View>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => router.push(`/candidates/ProfileScreen?id=${item.id}`)}>
          <CandidateCard {...item} />
        </TouchableOpacity>
      )
      } />
  </View>), [candidates]);//!!!!!deps!!!!!

  // const swipePanels: SwipeablePanelProps[] = [
  //   {
  //     isActive: isPanelActive1,
  //     onClose: () => setIsPanelActive1(false),
  //     title: 'Dostosuj listę kandydatów',
  //     subTitle:
  //       'Pomóż ELF-owi znaleźć idealnych kandydatów - ustaw odpowiednie filtry 🤓',
  //     buttons: [
  //       {
  //         children: 'Ustaw filtry',
  //         onPress: () =>
  //           navigation.navigate('FilterScreen', { filters: filters }),
  //       },
  //       {
  //         children: 'Użyj poprzednich filtrów',
  //         onPress: () => console.log('aaa'),
  //       },
  //     ],
  //   },
  // ];

  return (
    <ScreenHeaderProvider
      mode="mainTitle"
      mainTitlePosition="flex-start"
      actions={!loading ? [{
        icon: 'refresh',
        onPress: getUserAdverts
      }] : undefined}
    // alterTitle={
    //   <View style={{ justifyContent: 'center' }}>
    //     <TextField
    //       placeholder="Kogo szukasz?"
    //       underline={false}
    //       inputStyles={[styles.textField]}
    //       containerStyles={[styles.textFieldContainer, { width: screenWidth * 0.5 }]}
    //       value={searchText}
    //       onChangeText={item => setSearchText(item)}
    //       onSubmitEditing={() => setSearchTextConfirm(searchText)}
    //       left={<SvgIcon icon='search' />}
    //     />
    //   </View>
    // }
    // actions={[
    //   {
    //     icon: <Typography color={Colors.Blue500}>Filtry</Typography>,
    //     onPress: () => navigation.navigate('FilterScreen'),
    //   },
    //   {
    //     icon: <SvgIcon icon="cardOutlined" />,
    //     onPress: () => navigation.navigate('FavouritesScreen'),
    //   },
    // ]}
    >
      {loading ? <LoadingScreen /> : <>
        {CandidatesList}
      </>}
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  FilterSwitch: {
    alignContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'Colors.Basic100',
    marginBottom: 16,
    marginLeft: 6,
  },
  sortingBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    backgroundColor: Colors.Basic100,
  },
  filterBar: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    backgroundColor: Colors.Basic100,
    height: 182,
  },
  textField: {
    color: Colors.Basic900,
    paddingTop: 0,
    paddingBottom: 0,
  },
  textFieldContainer: {
    backgroundColor: Colors.Basic200,
    height: 35,
    borderRadius: 5,
    paddingLeft: 10,
    justifyContent: 'center'
  }
});

export default MainScreen;
