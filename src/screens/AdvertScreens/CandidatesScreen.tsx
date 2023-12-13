import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../colors/Colors';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import advertsServices from '../../services/advertsServices';
import { CandidateDataType } from '../../store/reducers/types';
import LoadingScreen from '../../components/atoms/LoadingScreen';
import Typography from '../../components/atoms/Typography';
import CandidateCard from '../../components/organismes/CandidateCard';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { createParam } from 'solito';
import { InitialPropsFromParams } from '../../hooks/types';

type Props = NonNullable<AdvertStackParamList['default']['CandidatesScreen']>;
const { useParam } = createParam<Props>();

const CandidatesScreen: React.FC<InitialPropsFromParams<Props>> = ({idInitial}) => {
  const dispatch = useTypedDispatch();
  const { token, userAdverts } = useTypedSelector(s => s.general);
  const [loading, setLoading] = useState<boolean>(true);
  const [candidates, setCandidates] = useState<CandidateDataType[]>([]);
  const [id] = useParam('id', {initial: idInitial})
  const candidatesWithRating = userAdverts.find(e => e.id === Number(id))?.candidate_data;

  useEffect(() => {
    (async () => {
      if (!!candidatesWithRating?.length) {
        const res = await dispatch(advertsServices.getAdvertCandidates(token, candidatesWithRating.map(e => e.candidate_id)));
        setCandidates(res as unknown as CandidateDataType[]);
      }
      setLoading(false);
    })();
  }, [userAdverts]);

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
          <Typography style={{ paddingLeft: 20 }} color={Colors.Basic600}>
            Masz {candidates.length} kandydatów
          </Typography>
        </View>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity style={{ marginBottom: 10 }} 
        // onPress={() => navigation.navigate('ProfileScreen', { candidateData: item })}
        >
          <CandidateCard {...item} rating={candidatesWithRating?.find(e => e.candidate_id === item.id)?.fit_rating} />
        </TouchableOpacity>
      )
      } />
  </View>), [candidates]);//!!!!!deps!!!!!

  return loading ? <LoadingScreen /> : (
    <ScreenHeaderProvider
      mainTitlePosition="flex-start"
    // actions={[
    //   {
    //     icon: <SvgIcon icon="search" />,
    //     onPress: () =>
    //       navigation.navigate('CandidatesStack', { screen: 'MainScreen' }),
    //   },
    //   {
    //     icon: <SvgIcon icon="cardOutlined" />,
    //     onPress: () =>
    //       navigation.navigate('CandidatesStack', {
    //         screen: 'FavouritesScreen',
    //       }),
    //   },
    // ]}
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
