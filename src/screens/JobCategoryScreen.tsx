import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, BackHandler} from 'react-native';
import Colors from '../colors/Colors';
import {useTypedSelector} from '../hooks/useTypedSelector';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import {ScrollView} from '../components/molecules/ScrollView';
import TextField from '../components/molecules/TextField';
import SvgIcon from '../components/atoms/SvgIcon';
import Typography from '../components/atoms/Typography';
import {Separator} from 'tamagui';
import {SkeletonContainer, Skeleton} from 'react-native-skeleton-component';
import useRouter from '../hooks/useRouter';
import {JobIndustryType, JobPositionType} from '../store/reducers/types';
import Button from '../components/molecules/Button';
import SvgUriImage from '../components/atoms/SvgUriImage';

export type JobCategoryScreenProps =
  | {
      mode: 'industry';
      callback: (industryId: number) => void;
      initialIndustry?: undefined;
    }
  | {
      mode: 'industryAndPosition';
      callback: (industryId: number, positionId: number) => void;
      initialIndustry?: number;
    };

const JobCategoryScreen: React.FC<JobCategoryScreenProps> = ({
  mode,
  callback,
  initialIndustry,
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] =
    useState<JobIndustryType | null>(null);
  const [selectedPosition, setSelectedPositions] =
    useState<JobPositionType | null>(null);
  const {jobIndustries} = useTypedSelector(state => state.general);
  const {backToRemoveParams} = useRouter();

  useEffect(() => {
    if (initialIndustry !== undefined) {
      const getIndustry = jobIndustries.find(
        industry => industry.id === initialIndustry,
      );
      if (getIndustry) {
        setSelectedIndustry(getIndustry);
      };
    };
  }, []);

  useEffect(() => {
    if (mode === 'industry' && selectedIndustry) {
      callback(selectedIndustry.id);
      backToRemoveParams();
    } else if (
      mode === 'industryAndPosition' &&
      selectedIndustry &&
      selectedPosition
    ) {
      callback(selectedIndustry.id, selectedPosition.id);
      backToRemoveParams();
    }
  }, [selectedPosition, selectedIndustry]);

  useEffect(() => {
    setSearch('');

    if (selectedIndustry && mode === 'industryAndPosition') {
      const handler = BackHandler.addEventListener('hardwareBackPress', () => {
        if(initialIndustry){
          backToFilterScreen();
        } else{
          backToIndustry();
        }
        return true;
      });

      return () => {
        handler.remove();
      };
    }
  }, [selectedIndustry]);

  const backToIndustry = () => {
    setSelectedIndustry(null);
  };

  const backToFilterScreen = () => {
    backToRemoveParams();
  };

  const SearchField = (
    <View style={styles.Textfield}>
      <TextField
        placeholder="Kogo szukasz?"
        textContentType="emailAddress"
        keyboardType="email-address"
        value={search}
        onChangeText={setSearch}
        left={<SvgIcon icon="search" />}
        right={
          search && (
            <Button
              height={21}
              variant="text"
              icon={
                <SvgIcon
                  icon="crossBig"
                  fill={Colors.Basic500}
                  style={{marginRight: -15}}
                />
              }
              onPress={() => setSearch('')}
            />
          )
        }
      />
    </View>
  );

  return (
    <ScreenHeaderProvider
      mainTitlePosition="flex-start"
      mode="backAction"
      title={selectedIndustry ? 'Stanowiska' : 'Kategorie'}
      callback={initialIndustry ? backToFilterScreen : selectedIndustry ? backToIndustry : undefined}
      backgroundColor={Colors.Basic100}>
      <ScrollView style={{backgroundColor: Colors.Basic100}}>
        {selectedIndustry === null || mode === 'industry' ? (
          <>
            {SearchField}
            <Typography
              color={Colors.Basic600}
              style={{marginTop: 16, marginBottom: 10, marginLeft: 19}}>
              Popularne kategorie
            </Typography>
            <View style={{marginBottom: 20}}>
              {jobIndustries
                .filter(({name}) =>
                  name.toLowerCase().includes(search.toLowerCase()),
                )
                .map(({icon, id, name, job_positions}) => (
                  <Fragment key={id}>
                    <TouchableOpacity
                      style={styles.Button}
                      onPress={() =>
                        setSelectedIndustry({id, job_positions, icon, name})
                      }>
                      <View
                        style={{width: 34, height: 34, position: 'relative'}}>
                        <View style={{position: 'absolute'}}>
                          <SkeletonContainer animation="wave" speed={600}>
                            <Skeleton
                              style={{width: 34, height: 34, borderRadius: 17}}
                            />
                          </SkeletonContainer>
                        </View>
                        <SvgUriImage style={styles.IndustryIcon} src={icon} />
                      </View>
                      <View style={{flex: 1, marginLeft: 8}}>
                        <Typography variant="h5" weight="SemiBold">
                          {name}
                        </Typography>
                      </View>
                      <View>
                        <SvgIcon
                          icon="arrowRightSmall"
                          style={{alignSelf: 'center'}}
                        />
                      </View>
                    </TouchableOpacity>
                    <Separator />
                  </Fragment>
                ))}
            </View>
          </>
        ) : (
          <>
            <View style={styles.ActiveCategory}>
              <View style={styles.ActiveCategoryName}>
                <SvgUriImage
                  style={styles.IndustryIcon}
                  src={selectedIndustry.icon}
                />
                <Typography variant="h4" style={{alignSelf: 'center'}}>
                  {selectedIndustry.name}
                </Typography>
              </View>
              {!initialIndustry &&
                <Button
                  variant="text"
                  circular
                  style={{marginRight: -10}}
                  icon={<SvgIcon icon="crossBig" fill={Colors.Basic500} />}
                  onPress={backToIndustry}
                />
              }
            </View>
            {SearchField}
            {selectedIndustry.job_positions.map(
              ({id, name}) =>
                !!name.includes(search) && (
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: Colors.Basic300,
                    }}>
                    <TouchableOpacity
                      style={styles.Category}
                      onPress={() => setSelectedPositions({id, name})}>
                      <Typography color={Colors.Basic900}>{name}</Typography>
                    </TouchableOpacity>
                  </View>
                ),
            )}
          </>
        )}
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: Colors.Basic100,
    height: '100%',
  },
  Button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 19,
  },
  Textfield: {
    marginVertical: 16,
    marginHorizontal: 19,
  },
  Category: {
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  IndustryIcon: {
    width: 34,
    height: 34,
  },
  IndustryButton: {
    height: 80,
    width: 'auto',
    justifyContent: 'flex-start',
    backgroundColor: Colors.White,
    flexDirection: 'row',
  },
  ActiveCategory: {
    marginTop: 44,
    height: 80,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  ActiveCategoryName: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default JobCategoryScreen;
