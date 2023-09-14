import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { SvgUri } from 'react-native-svg';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../../components/molecules/ScrollView';
import TextField from '../../components/molecules/TextField';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AdvertStackParamList, 'JobCategoryScreen'>,
  NativeStackScreenProps<RootStackParamList, 'AdvertStack'>
>;

const JobCategoryScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const { callback } = route.params;
  const [search, setSearch] = useState<string>('');
  const [industryId, setIndustryId] = useState<number | null>(null);
  const [positionId, setPositionId] = useState<number | null>(null);
  const { jobIndustries } = useTypedSelector(state => state.general);

  useEffect(() => {
    if (positionId && industryId) {
      callback({ industryId, positionId });
      navigation.goBack();
    }
  }, [positionId, industryId]);

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
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
              navigation.navigate('JobScreen', { callback: setPositionId, job_positions });
            }}>
              <View style={{ width: 34, height: 34, position: 'relative' }}>
                <View style={{ position: 'absolute' }}>
                  {/* <SkeletonPlaceholder borderRadius={17}>
                    <View style={{ width: 34, height: 34 }} />
                  </SkeletonPlaceholder> */}
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
            {/* <Divider /> */}
          </Fragment>))}
        </View>
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
});

export default JobCategoryScreen;
