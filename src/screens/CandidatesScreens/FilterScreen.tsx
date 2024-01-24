import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../../components/molecules/ScrollView';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import { Separator } from 'tamagui';
import useRouter from '../../hooks/useRouter';
import {
  AddressType,
  CandidatesFiltersType,
  JobAvailabilityType,
  JobContractType,
  JobSortingModeType,
  JobWorkModeType,
  LanguageType,
} from '../../store/reducers/types';
import SvgIcon from '../../components/atoms/SvgIcon';
import CheckBox from '../../components/atoms/CheckBox';
import { isArray, isBoolean, isNaN, isNumber, isString } from 'lodash';
import Accordion from '../../components/molecules/Accordion';
import Slider from '../../components/atoms/Slider';
import { useActions } from '../../hooks/useActions';

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

const languages: LanguageType[] = [
  {
    id: 1,
    name: 'Polski',
  },
  {
    id: 2,
    name: 'Angielski',
  },
  {
    id: 3,
    name: 'Włoski',
  },
  {
    id: 4,
    name: 'Francuski',
  },
  {
    id: 5,
    name: 'Ukraiński',
  },
  {
    id: 6,
    name: 'Hiszpański',
  },
  {
    id: 7,
    name: 'Niemiecki',
  },
];

const initFilters: CandidatesFiltersType = {
  sorting_id: 1,
  positions_id: [],
  locations_id: [],
  distance: 0,
  availability_id: [],
  workModes_id: [],
  contracts_id: [],
  languages_id: [],
  only_with_cv: false,
};

const FilterScreen: React.FC = () => {
  const { jobIndustries, userCompany, candidatesFilters } = useTypedSelector(
    state => state.general,
  );
  const [filters, setFilters] = useState<CandidatesFiltersType>(initFilters);
  const router = useRouter();
  const { setCandidatesFilters } = useActions();
  const userIndustry = 2;

  useEffect(() => {
    if (candidatesFilters) {
      setFilters(candidatesFilters);
    };
  }, [candidatesFilters]);

  const selectedPositions = useMemo(() => {
    return jobIndustries
      .find(item => item.id === userIndustry)
      ?.job_positions.filter(item => filters.positions_id.includes(item.id));
  }, [filters.positions_id, jobIndustries]);

  const selectedLanguages = useMemo(() => {
    return languages.filter(item => filters.languages_id.includes(item.id));
  }, [filters.languages_id, languages]);

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
        if (isNumber(value)) {
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
        } else if (isArray(value)) {
          setFilters(prev => ({
            ...prev,
            [name]: value,
          }));
        }
      }
    }
  };

  const handleJobPositions = (industryId: number, positionId: number[]) => {
    changeFiltersHandler('positions_id', positionId);
  };

  const addLocation = (location: AddressType) => {
    changeFiltersHandler('locations_id', location);
  };

  const handleLanguages = (id: number[]) => {
    changeFiltersHandler('languages_id', id);
  };

  const goToJobCategoryScreen = () => {
    router.push({
      stack: 'CandidatesStack',
      screen: 'FilterScreen',
      params: {
        subView: 'JobCategoryScreen',
        mode: 'multiplePosition',
        callback: handleJobPositions,
        initialIndustry: userIndustry,
        initialPosition: filters.positions_id
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
        optionsType: 'geocode'
      },
    });
  };

  const goToSelectLanguagesMultiple = () => {
    router.push({
      stack: 'CandidatesStack',
      screen: 'FilterScreen',
      params: {
        subView: 'ItemSelectorScreen',
        mode: 'multiple',
        list: languages,
        callback: handleLanguages,
        labels: {
          searchLabel: 'Znajdź język',
          itemsLabel: 'Popularne języki',
        },
        headerProps: { title: 'Wybór języków' },
        initialSelected: filters.languages_id,
      },
    });
  };

  const searchButton = () => {
    setCandidatesFilters(filters);
    router.push({
      stack: 'MenuStack',
      screen: 'MainScreen',
      params: undefined,
    });
  };

  return (
    <ScreenHeaderProvider>
      <View style={{ flex: 1, backgroundColor: Colors.Basic100 }}>
        <ScrollView style={styles.ScrollView}>
          <Typography style={styles.Title} size={18} weight="Bold">
            Sortuj po
          </Typography>
          <ScrollView
            horizontal
            disableWindowScroll
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 30 }}
          >
            {sortingModes.map(({ id, name }, i) => (
              <Button
                variant='TouchableOpacity'
                style={[
                  styles.HorizontalButton,
                  {
                    backgroundColor: filters.sorting_id === id ? Colors.Basic500 : Colors.Basic300,
                    marginLeft: i === 0 ? 19 : 0,
                  },
                ]}
                onPress={() => changeFiltersHandler('sorting_id', id)}
                activeOpacity={0.8}
              >
                <Typography size={16}>{name}</Typography>
              </Button>
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
              style={styles.SelectedItems}
            >
              {selectedPositions?.map(({ id, name }) => (
                <Button
                  variant='TouchableOpacity'
                  onPress={() => changeFiltersHandler('positions_id', id)}
                  key={id}
                  style={styles.SelectedItem}
                >
                  <Typography size={14}>{name}</Typography>
                  <SvgIcon icon="closeCircleAlt" fill={Colors.Basic200} />
                </Button>
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
            <ScrollView
              horizontal
              disableWindowScroll
              showsHorizontalScrollIndicator={false}
              style={styles.SelectedItems}
            >
              {filters.locations_id?.map(({ locality }) => (
                <Button
                  variant='TouchableOpacity'
                  onPress={() => changeFiltersHandler('locations_id', null)}
                  style={styles.SelectedItem}
                >
                  <Typography size={14}>{locality}</Typography>
                  <SvgIcon icon="closeCircleAlt" fill={Colors.Basic200} />
                </Button>
              ))}
            </ScrollView>
          )}
          <Separator />
          <View style={{ paddingHorizontal: 19 }}>
            <Typography size={16} weight="SemiBold" style={{ paddingTop: 19 }}>
              Odległość od wybranej lokalizacji: +
              {filters.distance === 1 ? 0 : filters.distance} km
            </Typography>
            <View style={{ marginVertical: 10 }}>
              <Slider
                min={0} max={100} step={5}
                value={[filters.distance]}
                onValueChange={([value]) => changeFiltersHandler('distance', !isNaN(value) ? value : 0)}
              />
            </View>
          </View>
          <Separator />
          <Accordion
            title='Dostępność'
            initialExpanded={filters.availability_id.length > 0}
          >
            <ScrollView
              horizontal
              disableWindowScroll
              showsHorizontalScrollIndicator={false}
              style={{ paddingBottom: 8 }}
            >
              {availability.map(({ id, name }, i) => (
                <Button
                  variant='TouchableOpacity'
                  key={id}
                  style={[
                    styles.HorizontalButton,
                    {
                      backgroundColor: filters.availability_id.includes(id) ? Colors.Basic500 : Colors.Basic300,
                      marginLeft: i === 0 ? 19 : 0,
                    },
                  ]}
                  onPress={() => changeFiltersHandler('availability_id', id)}
                  activeOpacity={0.8}
                >
                  <Typography size={16}>{name}</Typography>
                </Button>
              ))}
            </ScrollView>
          </Accordion>
          <Separator />
          <Accordion
            title="Tryb pracy"
            initialExpanded={filters.workModes_id.length > 0}
          >
            <ScrollView
              horizontal
              disableWindowScroll
              showsHorizontalScrollIndicator={false}
              style={{ paddingBottom: 8 }}
            >
              {workModes.map(({ id, name }, i) => (
                <Button
                  variant='TouchableOpacity'
                  key={id}
                  style={[
                    styles.HorizontalButton,
                    {
                      backgroundColor: filters.workModes_id.includes(id) ? Colors.Basic500 : Colors.Basic300,
                      marginLeft: i === 0 ? 19 : 0,
                    },
                  ]}
                  onPress={() => changeFiltersHandler('workModes_id', id)}
                  activeOpacity={0.8}
                >
                  <Typography size={16}>{name}</Typography>
                </Button>
              ))}
            </ScrollView>
          </Accordion>
          <Separator />
          <Accordion
            title='Rodzaj umowy'
            initialExpanded={filters.contracts_id.length > 0}
          >
            <ScrollView
              horizontal
              disableWindowScroll
              showsHorizontalScrollIndicator={false}
              style={{ paddingBottom: 8 }}
            >
              {contracts.map(({ id, name }, i) => (
                <Button
                  variant='TouchableOpacity'
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
                  activeOpacity={0.8}
                >
                  <Typography size={16}>{name}</Typography>
                </Button>
              ))}
            </ScrollView>
          </Accordion>
          <Button
            arrowRight
            variant="text"
            borderTop
            onPress={() => goToSelectLanguagesMultiple()}
          >
            <Typography size={16} weight="SemiBold">
              Znajomość języków
            </Typography>
          </Button>
          {filters.languages_id.length > 0 && (
            <ScrollView
              horizontal
              disableWindowScroll
              showsHorizontalScrollIndicator={false}
              style={styles.SelectedItems}
            >
              {selectedLanguages?.map(({ id, name }) => (
                <Button
                  variant='TouchableOpacity'
                  onPress={() => changeFiltersHandler('languages_id', id)}
                  key={id}
                  style={styles.SelectedItem}
                >
                  <Typography size={14}>{name}</Typography>
                  <SvgIcon icon="closeCircleAlt" />
                </Button>
              ))}
            </ScrollView>
          )}
          <Separator />
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
          <Separator style={{ marginBottom: 15 }} />
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
    marginTop: 10,
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
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    height: 30,
    width: 'auto',
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
