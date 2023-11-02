import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, BackHandler } from 'react-native';
import Colors from '../colors/Colors';
import { useTypedSelector } from '../hooks/useTypedSelector';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../components/molecules/ScrollView';
import TextField from '../components/molecules/TextField';
import SvgIcon from '../components/atoms/SvgIcon';
import Typography from '../components/atoms/Typography';
import { Separator } from 'tamagui';
import { SkeletonContainer, Skeleton } from 'react-native-skeleton-component';
import  useRouter from '../hooks/useRouter';
import { JobPositionType } from '../store/reducers/types';
import Button from '../components/molecules/Button';

export type JobCategoryScreenProps = {
  mode: 'industry',
  callback: (industryId: number) => void,
  } | {
  mode: 'industryAndPosition',
  callback: (industryId: number, positionId: number) => void,
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

  useEffect(() => {
    if (mode === 'industry' && industryId) {
      callback(industryId);
      backToRemoveParams();
    } else if(mode === 'industryAndPosition' && industryId && positionId){
      callback(industryId, positionId);
      backToRemoveParams();
    };
  }, [positionId, industryId]);

  useEffect(() => {
    setSearch('');

    if (industryId && mode === 'industryAndPosition') {
      const handler = BackHandler.addEventListener('hardwareBackPress', () => {
        backToIndustry();
        return true;
      });

      return () => {
        handler.remove();
      }
    }
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
  
  return (
    <ScreenHeaderProvider 
      mainTitlePosition="flex-start" 
      mode='backAction'
      title={industryId ? 'Stanowiska' : 'Kategorie'}
      callback={industryId ? backToIndustry : undefined}
    >
      <View style={styles.Wrapper}>
        <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
          { industryId === null || mode === 'industry' ?
            <>
              <View style={styles.Textfield}>
                <TextField
                  placeholder="Kogo szukasz?"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  value={search}
                  onChangeText={setSearch}
                  left={<SvgIcon icon='search' />}
                  right={ search &&
                    <Button
                      height={21}
                      variant='text'
                      icon={<SvgIcon icon='crossBig' fill={Colors.Basic500} style={{ marginRight: -15}}/>}
                      onPress={() => setSearch('')}
                    />         
                  }
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
              <View style={styles.ActiveCategory}>
                <View style={styles.ActiveCategoryName}>
                  <Image style={{ height: 34, width: 34 }} source={{uri: industryIcon}}/>
                  <Typography variant="h4" style={{ alignSelf: "center" }}>
                    {industryName}
                  </Typography>
                </View>
                <Button
                  variant='text'
                  style={{ width: 60, marginRight: -20}}
                  icon={<SvgIcon icon='crossBig' fill={Colors.Basic500} />}
                  onPress={() => backToIndustry()}
                />    
              </View>
              <View style={styles.Textfield}>
                <TextField
                  placeholder="Kogo szukasz?"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  value={search}
                  onChangeText={setSearch}
                  left={<SvgIcon icon='search' />}
                  right={ search &&
                    <Button
                      height={21}
                      variant='text'
                      icon={<SvgIcon icon='crossBig' fill={Colors.Basic500} style={{ marginRight: -15}}/>}
                      onPress={() => setSearch('')}
                    />          
                  }
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
      </View>
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
  }
});

export default JobCategoryScreen;
