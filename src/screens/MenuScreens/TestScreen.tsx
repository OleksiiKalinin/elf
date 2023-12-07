import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import { ScrollView } from '../../components/molecules/ScrollView';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { createParam } from 'solito';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Snackbar } from 'react-native-paper';
import SvgIcon from '../../components/atoms/SvgIcon';
import { InitialPropsFromParams } from '../../hooks/types';
import useRouter from '../../hooks/useRouter';
import Carousel from '../../components/organismes/Carousel';
import im1 from '../../assets/images/certificate.png';
import im2 from '../../assets/images/certificate1.png';
import im3 from '../../assets/images/certificate2.png';
import im4 from '../../assets/images/portfolio1.png';

type Params = NonNullable<MenuStackParamList['default']['TestScreen']>;

const { useParam } = createParam<Params>();

const TestScreen: React.FC<InitialPropsFromParams<Params>> = () => {
  const router = useRouter();

  const TestJobCategoryDataMode1 = (industryId: number) => {
    console.log(`Kategoria: ${industryId}`);
  };

  const TestJobCategoryDataMode2 = (industryId: number, positionId: number) => {
    console.log(`Kategoria: ${industryId}, Stanowisko: ${positionId}`);
  };

  const TestJobCategoryDataMode3 = (industryId: number, positionId: number[]) => {
    console.log(`Kategoria: ${industryId}, Stanowisko: ${positionId}`);
  };

  // Test
  const goToCandidatesFilters = () => {
    router.push({ stack: 'CandidatesStack', screen: 'FilterScreen', params: undefined });
  };
  const goToJobCategoryScreenMode1 = () => {
    router.push({ stack: 'MenuStack', screen: 'TestScreen', params: { subView: 'JobCategoryScreen', mode: 'industry', callback: TestJobCategoryDataMode1 } });
  };
  const goToJobCategoryScreenMode2 = () => {
    router.push({ stack: 'MenuStack', screen: 'TestScreen', params: { subView: 'JobCategoryScreen', mode: 'singlePosition', callback: TestJobCategoryDataMode2, initialPosition: [21] } });
  };
  const goToJobCategoryScreenMode3 = () => {
    router.push({ stack: 'MenuStack', screen: 'TestScreen', params: { subView: 'JobCategoryScreen', mode: 'multiplePosition', callback: TestJobCategoryDataMode3 } });
  };
  const goToJobCategoryScreenMode4 = () => {
    router.push({ stack: 'MenuStack', screen: 'TestScreen', params: { subView: 'JobCategoryScreen', mode: 'singlePosition', callback: TestJobCategoryDataMode2, initialIndustry: 2 } });
  };

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <ScrollView style={styles.ScrollView}>
        <Carousel
          // innerPagination
          data={[im4, im2, im1, im3]}
          renderItem={({ index, item }) => (
            <View style={{ flex: 1 }}>
              <Image
                source={Platform.select({ native: item, web: item.src })}
                style={{ height: '100%' }}
              />
            </View>
          )}
        />
        <Button
          onPress={goToCandidatesFilters}
          style={{ marginTop: 30 }}
        >
          Kandydaci - filtry
        </Button>
        <Button
          onPress={goToJobCategoryScreenMode1}
          style={{ marginTop: 30 }}
        >
          Job category - mode 1
        </Button>
        <Button
          onPress={goToJobCategoryScreenMode2}
          style={{ marginTop: 30 }}
        >
          Job category - mode 2 (single)
        </Button>
        <Button
          onPress={goToJobCategoryScreenMode3}
          style={{ marginTop: 30 }}
        >
          Job category - mode 2 (multiple)
        </Button>
        <Button
          onPress={goToJobCategoryScreenMode4}
          style={{ marginTop: 30 }}
        >
          Job category - mode 2 (initial id)
        </Button>
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.Basic100,
    minHeight: '100%',
    flex: 1,
  },
});

export default TestScreen;
