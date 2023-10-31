import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Colors from '../colors/Colors';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
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
import { SvgUri } from 'react-native-svg';
import { IconButton } from 'react-native-paper';
import { JobPositionType } from '../store/reducers/types';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

export type JobCategoryScreenProps = {
  mode: 1,
  callback: (industryId: number, positionId: number) => void,
  } | {
  mode: 2,
  callback: (industryId: number) => void,
};


const JobCategoryScreen: React.FC<JobCategoryScreenProps> = ({mode, callback}) => {
  const [search, setSearch] = useState<string>('');
  const [industryId, setIndustryId] = useState<number | null>(null);
  const [positionId, setPositionId] = useState<number | null>(null);
  const [industryIcon, setIndustryIcon] = useState<string>('');
  const [industryName, setIndustryName] = useState<string>('');
  const [jobPositions, setJobPositions] = useState<JobPositionType[] | null>(null);
  const { jobIndustries } = useTypedSelector(state => state.general);
  const { backToRemoveParams} = useRouter();
  const { userCompany } = useTypedSelector(s => s.general);

  useEffect(() => {
    console.log(jobIndustries);
  }, [jobIndustries]);

  useEffect(() => {
    if (positionId && industryId) {
      callback(industryId, positionId);
      backToRemoveParams();
    };
  }, [positionId, industryId]);

  useEffect(() => {
    setSearch('');
  }, [industryId]);

  const backToIndustry = () =>{
    setIndustryId(null);
  };

  const handleActiveCategory = (id: number, job_positions: JobPositionType[], icon: string, name: string) =>{
    setIndustryId(id);
    setJobPositions(job_positions);
    setIndustryIcon(icon);
    setIndustryName(name);
    console.log(icon)
  };

  // hardwareBackPress

  return (
    <ScreenHeaderProvider 
      mainTitlePosition="flex-start" 
      mode='backAction'
      title={industryId ? 'Stanowiska' : 'Kategorie'}
      callback={industryId ? backToIndustry : undefined}
      /* actions={[{ icon: 'arrowLeft', onPress: ()=> backToIndustry() }]} */
    >
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
                right={<IconButton
                  p='7px' mr='-7px' borderRadius={0}
                  icon={<SvgIcon icon='crossBig' /> as any}
                  onPress={() => setSearch('')}
                />}
              />
            </View>
            <Typography color={Colors.Basic600} style={{ marginTop: 16, marginBottom: 10, marginLeft: 19 }}>
              Popularne kategorie
            </Typography>
            <View style={{ marginBottom: 20 }}>
              {jobIndustries.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())).map(({ icon, id, name, job_positions }) => (
                <Fragment key={id}>
                  <TouchableOpacity 
                    style={styles.Button} 
                    onPress={() => handleActiveCategory(id, job_positions, icon, name)}
                  >
                    <View style={{ width: 34, height: 34, position: 'relative' }}>
                      <View style={{ position: 'absolute' }}>
                        <SkeletonContainer animation='wave' speed={600}>
                          <Skeleton style={{ width: 34, height: 34, borderRadius: 17 }} />
                        </SkeletonContainer>
                      </View>
                      {/* <SvgUri width={34} height={34} uri={icon} /> */}
                      <Image style={styles.IndustryIcon} source={{uri: icon}}/>
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Typography variant='h5' weight='SemiBold'>{name}</Typography>
                    </View>
                    <View>
                      <SvgIcon icon="arrowRightSmall" style={{ alignSelf: 'center' }} />
                    </View>
                  </TouchableOpacity>
                  <Separator />
                </Fragment>
              ))}
            </View>
          </>

          :

          <>
            <TouchableOpacity
              style={styles.IndustryButton}
              onPress={() => console.log("aaa")}>
              {/* <SvgIcon icon={icon} style={{ alignSelf: "center", marginHorizontal: 19 }} /> */}
              <Image style={{ alignSelf: "center", marginHorizontal: 19, height: 34, width: 34 }} source={{uri: industryIcon}}/>
              <Typography variant="h4" style={{ textAlignVertical: "center" }}>{industryName}</Typography>
            </TouchableOpacity>
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
            { jobPositions &&
              jobPositions.map(({ id, name }) => !!name.includes(search) && (
                <View style={{ borderBottomWidth: 1, borderColor: Colors.Basic300 }}>
                  <TouchableOpacity style={styles.Category}
                    onPress={() => {
                      setPositionId(id)
                    }}
                  >
                    <Typography color={Colors.Basic900}>{name}</Typography>
                  </TouchableOpacity>
                </View>
              ))
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
    flexDirection: "row"
  },
});

export default JobCategoryScreen;
