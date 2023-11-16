import {CompositeScreenProps, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Touchable, View, Text, TouchableOpacity} from 'react-native';
import {CandidatesStackParamList} from '../../navigators/CandidatesNavigator';
import Colors from '../../colors/Colors';
// import HorizontalMenuButton from '../../components/atoms/HorizontalMenuButton/HorizontalMenuButton';
// import ButtonArrowSelector from '../../components/atoms/ButtonArrowSelector/ButtonArrowSelector';
// import HorizontalSelector from '../../components/molecules/HorizontalSelector/HorizontalSelector';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import {ScrollView} from '../../components/molecules/ScrollView';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import {Separator} from 'tamagui';
import useRouter from '../../hooks/useRouter';
import { AddressType, CandidatesFiltersType, JobAvailabilityType, JobContractType, JobPositionType, JobSortingModeType, JobWorkModeType } from '../../store/reducers/types';
import SvgIcon from '../../components/atoms/SvgIcon';
import HorizontalMenuButton from '../../components/molecules/HorizontalMenuButton';
import CheckBox from '../../components/atoms/CheckBox';
import { List } from 'react-native-paper';
import TextField from '../../components/molecules/TextField';
import { isArray } from 'lodash';

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
/*   {
    id: 4,
    name: 'Najbliżsi',
  },
  {
    id: 6,
    name: 'Najnowsi i Najbliżsi',
  },
  {
    id: 7,
    name: 'Najbliżsi',
  },
  {
    id: 8,
    name: 'Najnowsi i Najbliżsi',
  }, */
];


const availability: JobAvailabilityType[]  = [
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
  distance_id: '0',
  availability_id: [],
  workModes_id: [],
  contracts: [],
  languages: [],
}

const FilterScreen: React.FC = () => {
  const [sortingBy, setSortingBy] = useState(1);
  const [filters, setFilters] = useState<CandidatesFiltersType>(initFilters);
/*   const [selectedPositions, setSelectedPositions] = useState<JobPositionType[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<AddressType[]>([]);
  const [distance, setDistance] = useState('0');
  const [selectedAvailability, setSelectedAvailability] = useState<number[]>([]);
  const [selectedWorkModes, setSelectedWorkModes] = useState<number[]>([]);
  const [selectedContracts, setSelectedContracts] = useState<number[]>([]); */
  const [withoutCV, setWithoutCV] = useState(false);
  const router = useRouter();
  const {jobIndustries, userCompany} = useTypedSelector(state => state.general);
  const userIndustry = 2;

  const positions = useMemo(() => {
    return jobIndustries
      .find(item=> item.id === userIndustry)?.job_positions
      .filter(item=> filters.positions_id
      .includes(item.id))
  },[filters.positions_id, jobIndustries]);

  const changeFiltersHandler = (name: keyof CandidatesFiltersType, value: string | number | AddressType | null) => {
    
      setFilters(prev => ({
        ...prev,
        [name]: updateFlatArray(prev[name] as number[], value as number)
      }));

  };

  const updateFlatArray = (array: number[], id: number) =>{
    const mySet1 = new Set([...array]);
    if(mySet1.has(id)){
      mySet1.delete(id)
    } else{
      mySet1.add(id)
    };

    return [...mySet1];
    // if (array.includes(id)) {
    //   const index = array.findIndex(item => item === id);
    //   return ([
    //     ...array.slice(0, index),
    //     ...array.slice(index + 1),
    //   ]);
    // } else {
    //   return ([...array, id]);
    // };
  };

  const handleJobPositions = (industryId: number, positionId: number) =>{
    changeFiltersHandler('positions_id', positionId);
  };

  /* const addJobPosition = (industryId: number, positionId: number) =>{
    const newArray = [...selectedPositions];
    jobIndustries.forEach(industry => {
      const selectedPosition = industry.job_positions.find(position => position.id === positionId);
      if (selectedPosition && !newArray.some(item => item.id === selectedPosition.id)) {
        newArray.push(selectedPosition);
      };
    });
    
    setSelectedPositions(newArray);
  }; */

  // const addLocation = (location: AddressType) =>{
  //   /* console.log(); */
  //   const newArray = [...selectedLocations];
  //   newArray.push(location);
  //   setSelectedLocations(newArray);
  // };

  // const removeJobPosition = (id: number) =>{
  //   const index = selectedPositions.findIndex(item => item.id === id);
  //   setSelectedPositions([
  //     ...selectedPositions.slice(0, index),
  //     ...selectedPositions.slice(index + 1),
  //   ]);
  // };

  const goToJobCategoryScreen = () =>{
    router.push({ stack: 'CandidatesStack', screen: 'FilterScreen', params: { subView: 'JobCategoryScreen', mode: 'industryAndPosition', callback: handleJobPositions, initialIndustry: userIndustry } });
  };

  // const goToJobGoogleMapScreen = () =>{
  //   router.push({ stack: 'CandidatesStack', screen: 'FilterScreen', params: { subView: 'GoogleMapScreen', callback: addLocation, initialAddress: null } });
  // };

  const searchButton = () =>{

  };

  return (
    <ScreenHeaderProvider>
      <View style={{flex: 1, backgroundColor: Colors.Basic100}}>
      <ScrollView style={styles.ScrollView}>
        <Typography style={styles.Title} size={18} weight="Bold">
          Sortuj po
        </Typography>
        <ScrollView horizontal disableWindowScroll showsHorizontalScrollIndicator={false} style={{ marginLeft: 19, marginBottom: 30}}>
          {sortingModes.map(({id, name}, i) => (
           <Typography>Test</Typography>
          ))}
        </ScrollView>
        <Typography style={styles.Title} size={18} weight="Bold">
          Filtruj po
        </Typography>
        <Button
          arrowRight
          variant='text'
          borderTop
          onPress={()=> goToJobCategoryScreen()}
        >
          <Typography size={16} weight='SemiBold'>
            Wybierz stanowisko
          </Typography>
        </Button>
          {filters.positions_id.length > 0 &&
            <View style={styles.SelectedItems}>
              { positions?.map(({id, name})=>
                <TouchableOpacity 
                  onPress={()=> changeFiltersHandler('positions_id', id)}
                  key={id} 
                  style={styles.SelectedItem}
                >
                  <Typography size={14}>
                    {name}
                  </Typography>
                  <SvgIcon icon='closeCircle' fill={Colors.Basic200}/>
                </TouchableOpacity>
              )}
            </View>
          }
        <Separator/>
        <Button
          arrowRight
          variant='text'
          // onPress={()=> goToJobGoogleMapScreen()}
        >
          <Typography size={16} weight='SemiBold'>
            Lokalizacja
          </Typography>
        </Button>
        {/* {[selectedLocations].length > 0 &&
          <View style={styles.SelectedItems}>
            {selectedLocations.map(({locality}, i)=>
              <TouchableOpacity 
                onPress={()=> removeJobPosition(id)}
                key={i} 
                style={styles.SelectedItem}
              >
                <Typography size={14}>
                  {locality}
                </Typography>
                <SvgIcon icon='closeCircle' fill={Colors.Basic200}/>
              </TouchableOpacity>
            )}
          </View>
        } */}
        <Separator/>
        {/* <List.Accordion
          title={<Typography size={16}>Odległość od Twojej lokalizacji</Typography>}
          right={props => <SvgIcon icon='arrowRightSmall' style={{transform: props.isExpanded ? [{ rotate: '-90deg' }] : [{ rotate: '90deg' }]}}/>}
          style={{backgroundColor: Colors.Basic100, height: 58, paddingRight: 19}}
        >
          <View style={{paddingHorizontal: 19, marginBottom: 20}}>
            <TextField
              label="Odległość (km)"
              textContentType='telephoneNumber'
              keyboardType='numeric'
              value={distance}
              maxLength={3}
              onChangeText={setDistance}
              {...(showTips &&
                !nameValid && {
                  bottomText: 'Nazwa musi zawierać od 3 do 50 znaków',
                })}
            />
          </View>
        </List.Accordion> */}
        <Separator/>
        {/* <List.Accordion
          title={<Typography size={16}>Dostępność</Typography>}
          right={props => <SvgIcon icon='arrowRightSmall' style={{transform: props.isExpanded ? [{ rotate: '-90deg' }] : [{ rotate: '90deg' }]}}/>}
          style={{backgroundColor: Colors.Basic100, height: 58, paddingRight: 19}}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 19, marginBottom: 30, flexDirection: 'row', width: '100%' }}>
            {availability.map(({id, name}, i) => (
              <HorizontalMenuButton
                key={id}
                name={name}
                selected={selectedAvailability.some(item => item === id)}
                onPress={() => setSelectedAvailability(updateFlatArray(selectedAvailability, id))}
              />
            ))}
          </ScrollView>
        </List.Accordion> */}
        <Separator/>
        {/* <List.Accordion
          title={<Typography size={16} >Tryb pracy</Typography>}
          right={props => <SvgIcon icon='arrowRightSmall' style={{transform: props.isExpanded ? [{ rotate: '-90deg' }] : [{ rotate: '90deg' }]}}/>}
          style={{backgroundColor: Colors.Basic100, height: 58, paddingRight: 19}}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 19, marginBottom: 30, flexDirection: 'row', width: '100%' }}>
            {workModes.map(({id, name}, i) => (
              <HorizontalMenuButton
                key={id}
                name={name}
                selected={selectedWorkModes.some(item => item === id)}
                onPress={() => setSelectedWorkModes(updateFlatArray(selectedWorkModes, id))}
              />
            ))}
          </ScrollView>
        </List.Accordion> */}

        <Separator/>

        {/* <List.Accordion
          title={<Typography size={16}>Rodzaj umowy</Typography>}
          right={props => <SvgIcon icon='arrowRightSmall' style={{transform: props.isExpanded ? [{ rotate: '-90deg' }] : [{ rotate: '90deg' }]}}/>}
          style={{backgroundColor: Colors.Basic100, height: 58, paddingRight: 19}}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 19, marginBottom: 30, flexDirection: 'row', width: '100%' }}>
            {contracts.map(({id, name}, i) => (
              <HorizontalMenuButton
                key={id}
                name={name}
                selected={selectedContracts.some(item => item === id)}
                onPress={() => setSelectedContracts(updateFlatArray(selectedContracts, id))}
              />
            ))}
          </ScrollView>
        </List.Accordion> */}
        <Button
          arrowRight
          variant='text'
          borderTop
          borderBottom
        >
          <Typography size={16}>
            Znajomość języków
          </Typography>
        </Button>
        <View style={styles.CheckBoxWrapper}>
          <CheckBox
            checked={withoutCV}
            onCheckedChange={checked =>setWithoutCV(!!checked)
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

      <Button
        stickyBottom
        onPress={() => searchButton()}
      >
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
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
    marginBottom: 7
  },
  SelectedItem: {
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
    marginTop: 20,
  },
  CheckBox: {
    marginTop: 20,
  },
  CheckBoxText: {
    paddingVertical: 20,
  }
});

export default FilterScreen;
