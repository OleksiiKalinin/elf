import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../colors/Colors';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { SvgUri } from 'react-native-svg';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../components/molecules/ScrollView';
import TextField from '../components/molecules/TextField';
import SvgIcon from '../components/atoms/SvgIcon';
import Typography from '../components/atoms/Typography';
import { Separator } from 'tamagui';
import { SkeletonContainer, Skeleton } from 'react-native-skeleton-component';
import  useRouter from '../hooks/useRouter';
import getPathnameFromScreen from '../hooks/getPathnameFromScreen';
import { CalendarStackParamList } from '../navigators/CalendarNavigator';


const JobCategoryScreen: React.FC = () => {
  // const { callback } = route.params;
  const [search, setSearch] = useState<string>('');
  const [industryId, setIndustryId] = useState<number | null>(null);
  const [positionId, setPositionId] = useState<number | null>(null);
  const [jobPositions, setJobPositions] = useState<[] | null>(null);
  const { jobIndustries } = useTypedSelector(state => state.general);
  const {replace} = useRouter();
  const { userCompany, currentScreen } = useTypedSelector(s => s.general);

  // useEffect(() => {
  //   if (positionId && industryId) {
  //     callback({ industryId, positionId });
  //     navigation.goBack();
  //   }
  // }, [positionId, industryId]);

  useEffect(() => {
    console.log(jobIndustries)
   }, [jobIndustries]);

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start" title={industryId ? 'Stanowiska' : 'Kategorie'}>
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        { industryId === null ?
          <>
            <View style={styles.Textfield}>
              <TextField
                placeholder="Kogo szukasz?"
                textContentType="emailAddress"
                keyboardType="email-address"
                value={search}
                onChangeText={setSearch}
                left={<SvgIcon icon='search' />}
              // right={<IconButton
              //   p='7px' mr='-7px' borderRadius={0}
              //   icon={<SvgIcon icon='crossBig' />}
              //   onPress={() => setSearch('')}
              // />}
              />
            </View>
            <Typography color={Colors.Basic600} style={{ marginTop: 16, marginBottom: 10, marginLeft: 19 }}>
              Popularne kategorie
            </Typography>
            <View style={{ marginBottom: 20 }}>
              {jobIndustries.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())).map(({ icon, id, name, job_positions }) => (<Fragment key={id}>
                <TouchableOpacity style={styles.Button} onPress={() => {
                  setIndustryId(id);
                  // navigation.navigate('JobScreen', { callback: setPositionId, job_positions });
                }}>
                  <View style={{ width: 34, height: 34, position: 'relative' }}>
                    <View style={{ position: 'absolute' }}>
                      <SkeletonContainer animation='wave' speed={600}>
                        <Skeleton style={{ width: 34, height: 34, borderRadius: 17 }} />
                      </SkeletonContainer>
                    </View>
                    <SvgUri width={34} height={34} uri={icon} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Typography variant='h5' weight='SemiBold'>{name}</Typography>
                  </View>
                  <View>
                    <SvgIcon icon="arrowRightSmall" style={{ alignSelf: 'center' }} />
                  </View>
                </TouchableOpacity>
                <Separator />
              </Fragment>))}
            </View>
          </>

          :

          <>
            {!!userCompany ? 
              <>
                <View style={styles.Textfield}>
                  <TextField
                    placeholder="Kogo szukasz?"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    value={search}
                    onChangeText={setSearch}
                    left={<SvgIcon icon='search' />}
                    // right={<IconButton
                    //   p='7px' mr='-7px' borderRadius={0}
                    //   icon={<SvgIcon icon='crossBig' />}
                    //   onPress={() => setSearch('')}
                    // />}
                  />
                </View>

                {/* {jobPositions.map(({ id, name }) => !!name.includes(search) && (
                  <View style={{ borderBottomWidth: 1, borderColor: Colors.Basic300 }}>
                    <TouchableOpacity style={styles.Category}
                      onPress={() => {
                        callback(id);
                        replace(getPathnameFromScreen(currentScreen));
                         navigation.goBack();
                      }}
                    >
                      <Typography color={Colors.Basic900}>{name}</Typography>
                    </TouchableOpacity>
                  </View>
                ))} */}
              </>
              
              :
                
              <Typography>Nie masz firmy</Typography>
            }
          </>
        }
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 19
  },
  Textfield: {
    marginVertical: 16,
    marginHorizontal: 19
  },
  Category: {
    justifyContent: 'flex-start',
    padding: 0,
    marginVertical: 16,
  },
});

export default JobCategoryScreen;
