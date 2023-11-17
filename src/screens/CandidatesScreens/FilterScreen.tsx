import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Colors from '../../colors/Colors';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import {ScrollView} from '../../components/molecules/ScrollView';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import {Separator} from 'tamagui';
import useRouter from '../../hooks/useRouter';
import {
  AddressType,
  CandidatesFiltersType,
  JobAvailabilityType,
  JobContractType,
  JobSortingModeType,
  JobWorkModeType,
} from '../../store/reducers/types';
import SvgIcon from '../../components/atoms/SvgIcon';
import CheckBox from '../../components/atoms/CheckBox';
import {isArray, isBoolean, isNaN, isNumber, isString} from 'lodash';
import Accordion from '../../components/molecules/Accordion';
import Slider from '@react-native-community/slider';

const sortingModes: JobSortingModeType[] = [
  {
    id: 1,
    name: 'Najnowsi',
  },
  {
    id: 2,
    name: 'Najbliżsi',
  },
  {
    id: 3,
    name: 'Najnowsi i Najbliżsi',
  },
];

const availability: JobAvailabilityType[] = [
  {
    id: 1,
    name: 'Od zaraz',
  },
  {
    id: 2,
    name: 'Za tydzień',
  },
  {
    id: 3,
    name: 'Za miesiąc',
  },
  {
    id: 4,
    name: 'Za trzy miesiące',
  },
];

const workModes: JobWorkModeType[] = [
  {
    id: 1,
    name: 'Pełny etat',
  },
  {
    id: 2,
    name: 'Tymczasowa',
  },
  {
    id: 3,
    name: '3/4 etatu',
  },
  {
    id: 4,
    name: '1/2 etatu',
  },
  {
    id: 5,
    name: '1/4 etatu',
  },
];

const contracts: JobContractType[] = [
  {
    id: 1,
    name: 'Umowa o pracę',
  },
  {
    id: 2,
    name: 'B2B',
  },
  {
    id: 3,
    name: 'Umowa zlecenie',
  },
  {
    id: 4,
    name: 'Umowa o dzieło',
  },
  {
    id: 5,
    name: 'Staż',
  },
  {
    id: 6,
    name: 'Praktyki',
  },
];

const initFilters: CandidatesFiltersType = {
  sorting_id: 1,
  positions_id: [],
  locations_id: [],
  distance: 30,
  availability_id: [],
  workModes_id: [],
  contracts_id: [],
  languages: [],
  only_with_cv: false,
};

const FilterScreen: React.FC = () => {
  const [filters, setFilters] = useState<CandidatesFiltersType>(initFilters);
  const router = useRouter();
  const {jobIndustries, userCompany} = useTypedSelector(state => state.general);
  const userIndustry = 2;

  const selectedPositions = useMemo(() => {
    return jobIndustries
      .find(item => item.id === userIndustry)
      ?.job_positions.filter(item => filters.positions_id.includes(item.id));
  }, [filters.positions_id, jobIndustries]);

  const changeFiltersHandler = (
    name: keyof CandidatesFiltersType,
    value: any,
  ) => {
    if (
      isNumber(filters[name]) ||
      isString(filters[name]) ||
      isBoolean(filters[name])
    ) {
      setFilters(prev => ({
        ...prev,
        [name]: value,
      }));
    } else if (isArray(filters[name])) {
      if (name === 'locations_id') {
        setFilters(prev => ({
          ...prev,
          [name]: value !== null ? [value] : [],
        }));
      } else {
        setFilters(prev => ({
          ...prev,
          [name]: (() => {
            const array = prev[name] as any;
            const mySet1 = new Set([...array]);
            if (mySet1.has(value)) {
              mySet1.delete(value);
            } else {
              mySet1.add(value);
            }
            return [...mySet1];
          })(),
        }));
      }
    }
  };

  const handleJobPositions = (industryId: number, positionId: number) => {
    changeFiltersHandler('positions_id', positionId);
  };

  const addLocation = (location: AddressType) => {
    changeFiltersHandler('locations_id', location);
  };

  const goToJobCategoryScreen = () => {
    router.push({
      stack: 'CandidatesStack',
      screen: 'FilterScreen',
      params: {
        subView: 'JobCategoryScreen',
        mode: 'industryAndPosition',
        callback: handleJobPositions,
        initialIndustry: userIndustry,
      },
    });
  };

  const goToJobGoogleMapScreen = () => {
    router.push({
      stack: 'CandidatesStack',
      screen: 'FilterScreen',
      params: {
        subView: 'GoogleMapScreen',
        callback: addLocation,
        initialAddress: null,
      },
    });
  };

  const searchButton = () => {};

  return (
    <ScreenHeaderProvider>
      <View style={{flex: 1, backgroundColor: Colors.Basic100}}>
        <ScrollView style={styles.ScrollView}>
          <Typography style={styles.Title} size={18} weight="Bold">
            Sortuj po
          </Typography>
          <ScrollView
            horizontal
            disableWindowScroll
            showsHorizontalScrollIndicator={false}
            style={{marginBottom: 30}}>
            {sortingModes.map(({id, name}, i) => (
              <TouchableOpacity
                style={[
                  styles.HorizontalButton,
                  {
                    backgroundColor:
                      filters.sorting_id === id
                        ? Colors.Basic500
                        : Colors.Basic300,
                    marginLeft: i === 0 ? 19 : 0,
                  },
                ]}
                onPress={() => changeFiltersHandler('sorting_id', id)}
                activeOpacity={0.8}>
                <Typography size={16}>{name}</Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Typography style={styles.Title} size={18} weight="Bold">
            Filtruj po
          </Typography>
          <Button
            arrowRight
            variant="text"
            borderTop
            onPress={() => goToJobCategoryScreen()}>
            <Typography size={16} weight="SemiBold">
              Wybierz stanowisko
            </Typography>
          </Button>
          {filters.positions_id.length > 0 && (
            <ScrollView
              horizontal
              disableWindowScroll
              showsHorizontalScrollIndicator={false}
              style={styles.SelectedItems}>
              {selectedPositions?.map(({id, name}) => (
                <TouchableOpacity
                  onPress={() => changeFiltersHandler('positions_id', id)}
                  key={id}
                  style={styles.SelectedItem}>
                  <Typography size={14}>{name}</Typography>
                  <SvgIcon icon="closeCircle" fill={Colors.Basic200} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          <Separator />
          <Button
            arrowRight
            variant="text"
            onPress={() => goToJobGoogleMapScreen()}>
            <Typography size={16} weight="SemiBold">
              Lokalizacja
            </Typography>
          </Button>
          {filters.locations_id.length > 0 && (
            <View style={styles.SelectedItems}>
              {filters.locations_id?.map(({locality}) => (
                <TouchableOpacity
                  onPress={() => changeFiltersHandler('locations_id', null)}
                  style={styles.SelectedItem}>
                  <Typography size={14}>{locality}</Typography>
                  <SvgIcon icon="closeCircle" fill={Colors.Basic200} />
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Separator />
          <View style={{paddingHorizontal: 19}}>
            <Typography size={16} weight="SemiBold" style={{paddingTop: 19}}>
              Odległość od wybranej lokalizacji: +
              {filters.distance === 1 ? 0 : filters.distance} km
            </Typography>
            <Slider
              value={filters.distance}
              onValueChange={value =>
                changeFiltersHandler('distance', !isNaN(value) ? value : 0)
              }
              style={{height: 60}}
              minimumValue={1}
              maximumValue={100}
              step={5}
              minimumTrackTintColor={Colors.Basic900}
              maximumTrackTintColor={Colors.Basic300}
              thumbTintColor={Colors.Basic900}
            />
          </View>
          <Separator />

          <Accordion title="Dostępność">
            <ScrollView
              horizontal
              disableWindowScroll
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: 30}}>
              {availability.map(({id, name}, i) => (
                <TouchableOpacity
                  key={id}
                  style={[
                    styles.HorizontalButton,
                    {
                      backgroundColor: filters.availability_id.includes(id)
                        ? Colors.Basic500
                        : Colors.Basic300,
                      marginLeft: i === 0 ? 19 : 0,
                    },
                  ]}
                  onPress={() => changeFiltersHandler('availability_id', id)}
                  activeOpacity={0.8}>
                  <Typography size={16}>{name}</Typography>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Accordion>

          <Separator />
          <Accordion title="Tryb pracy">
            <ScrollView
              horizontal
              disableWindowScroll
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: 30}}>
              {workModes.map(({id, name}, i) => (
                <TouchableOpacity
                  key={id}
                  style={[
                    styles.HorizontalButton,
                    {
                      backgroundColor: filters.workModes_id.includes(id)
                        ? Colors.Basic500
                        : Colors.Basic300,
                      marginLeft: i === 0 ? 19 : 0,
                    },
                  ]}
                  onPress={() => changeFiltersHandler('workModes_id', id)}
                  activeOpacity={0.8}>
                  <Typography size={16}>{name}</Typography>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Accordion>
          <Separator />

          <Accordion title="Rodzaj umowy">
            <ScrollView
              horizontal
              disableWindowScroll
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: 30}}>
              {contracts.map(({id, name}, i) => (
                <TouchableOpacity
                  key={id}
                  style={[
                    styles.HorizontalButton,
                    {
                      backgroundColor: filters.contracts_id.includes(id)
                        ? Colors.Basic500
                        : Colors.Basic300,
                      marginLeft: i === 0 ? 19 : 0,
                    },
                  ]}
                  onPress={() => changeFiltersHandler('contracts_id', id)}
                  activeOpacity={0.8}>
                  <Typography size={16}>{name}</Typography>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Accordion>
          <Button arrowRight variant="text" borderTop borderBottom>
            <Typography size={16}>Znajomość języków</Typography>
          </Button>
          <View style={styles.CheckBoxWrapper}>
            <CheckBox
              checked={filters.only_with_cv}
              onCheckedChange={checked =>
                changeFiltersHandler('only_with_cv', !!checked)
              }
              leftTextView={
                <Typography size={16} style={styles.CheckBoxText}>
                  Bez CV
                </Typography>
              }
              style={styles.CheckBox}
            />
          </View>
          <Separator />
        </ScrollView>
      </View>

      <Button stickyBottom onPress={() => searchButton()}>
        Szukaj
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    paddingTop: 15,
  },
  Title: {
    paddingHorizontal: 19,
    marginBottom: 10,
  },
  SelectedItems: {
    paddingHorizontal: 19,
    marginTop: 20,
    marginBottom: 7,
  },
  HorizontalButton: {
    height: 44,
    borderRadius: 4,
    marginRight: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  SelectedItem: {
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: Colors.Basic300,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  CheckBoxWrapper: {
    paddingHorizontal: 19,
  },
  CheckBox: {
    marginTop: 20,
  },
  CheckBoxText: {
    paddingVertical: 20,
  },
});

export default FilterScreen;
