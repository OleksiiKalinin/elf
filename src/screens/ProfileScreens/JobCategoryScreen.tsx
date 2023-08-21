import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, IconButton, ScrollView } from 'native-base';
import Typography from '../../components/atoms/Typography/Typography';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import TextField from '../../components/molecules/TextField/TextField';
import SvgIcon, { IconTypes } from '../../components/molecules/SvgIcon/SvgIcon';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SvgUri } from 'react-native-svg';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'JobCategoryScreen'>,
  NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const JobCategoryScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const { jobIndustries } = useTypedSelector(state => state.general);
  const { callback } = route.params;
  const [search, setSearch] = useState<string>('');

  return (
    <ScreenHeaderProvider currentStack="ProfileStack" mainTitlePosition="flex-start">
      <ScrollView style={{ backgroundColor: Colors.Basic100, }}>
        <View style={styles.Textfield}>
          <TextField
            placeholder="Jaką branżę szukasz?"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={search}
            onChangeText={setSearch}
            left={<SvgIcon icon='search' />}
            right={<IconButton
              p='7px' mr='-7px' borderRadius={0}
              icon={<SvgIcon icon='crossBig' />}
              onPress={() => setSearch('')}
            />}
          />
        </View>
        <Typography color={Colors.Basic600} style={{ marginTop: 16, marginBottom: 10, marginLeft: 19 }}>
          Popularne
        </Typography>
        <Divider />
        <View style={{ marginBottom: 20 }}>
          {jobIndustries.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())).map(({ icon, id, name, job_positions }) => (<Fragment key={id}>
            <TouchableOpacity style={styles.Button} onPress={() => {
              callback(id);
              navigation.goBack()
            }}>
              <View style={{ width: 34, height: 34, position: 'relative' }}>
                <View style={{ position: 'absolute' }}>
                  <SkeletonPlaceholder borderRadius={17}>
                    <View style={{ width: 34, height: 34 }} />
                  </SkeletonPlaceholder>
                </View>
                <SvgUri width={34} height={34} uri={icon} />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Typography variant='h5' weight='SemiBold'>{name}</Typography>
              </View>
            </TouchableOpacity>
            <Divider />
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
