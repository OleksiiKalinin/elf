import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, BackHandler } from 'react-native';
import Colors from '../colors/Colors';
import { useTypedSelector } from '../hooks/useTypedSelector';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import SvgIcon from '../components/atoms/SvgIcon';
import Typography from '../components/atoms/Typography';
import { Separator } from 'tamagui';
import { SkeletonContainer, Skeleton } from 'react-native-skeleton-component';
import useRouter from '../hooks/useRouter';
import { JobIndustryType } from '../store/reducers/types';
import Button from '../components/molecules/Button';
import SvgUriImage from '../components/atoms/SvgUriImage';
import ItemSelectorScreen from './ItemSelectorScreen';

export type JobCategoryScreenProps =
  ({
    mode: 'industry',
    callback: (industryId: number) => void,
  } | {
    mode: 'singlePosition',
    callback: (industryId: number, positionId: number) => void,
  } | {
    mode: 'multiplePosition',
    callback: (industryId: number, positionId: number[]) => void,
  }) & {
    initialIndustry?: undefined | number,
    initialPosition?: number[],
  };

const JobCategoryScreen: React.FC<JobCategoryScreenProps> = ({
  mode,
  callback,
  initialIndustry,
  initialPosition,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<JobIndustryType | null>(null);
  const [industryId, setIndustryId] = useState<number | null>(null);
  const [positionId, setPositionId] = useState<number[] | null>(null);
  const { jobIndustries } = useTypedSelector(state => state.general);
  const { backToRemoveParams } = useRouter();

  useEffect(() => {
    if (initialIndustry !== undefined) {
      const getIndustry = jobIndustries.find(
        industry => industry.id === initialIndustry,
      );
      if (getIndustry) {
        setIndustryId(getIndustry.id)
        setSelectedIndustry(getIndustry);
      };
    };
  }, []);

  useEffect(() => {
    const getIndustry = jobIndustries.find(
      industry => industry.id === industryId,
    );
    if (getIndustry) {
      setSelectedIndustry(getIndustry)
    };
  }, [industryId]);

  useEffect(() => {
    if (mode === 'industry' && industryId) {
      callback(industryId);
      backToRemoveParams();
    } else if (mode === 'singlePosition' && industryId && positionId) {
      callback(industryId, positionId[0]);
      backToRemoveParams();
    } else if (mode === 'multiplePosition' && industryId && positionId) {
      console.log(positionId)
      callback(industryId, positionId);
      backToRemoveParams();
    };
  }, [positionId, industryId]);

  useEffect(() => {
    if (industryId && mode === 'singlePosition') {
      const handler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (initialIndustry) {
          backToFilterScreen();
        } else {
          backToIndustry();
        }
        return true;
      });

      return () => {
        handler.remove();
      };
    }
  }, [industryId]);

  const backToIndustry = () => {
    setIndustryId(null);
  };

  const backToFilterScreen = () => {
    backToRemoveParams();
  };

  const handleIndustry = (id: number) => {
    setIndustryId(id);
  };

  const handleSinglePosition = (id: number) => {
    setPositionId([id]);
  };

  const handleMultiplePosition = (id: number[]) => {
    setPositionId(id);
  };

  const industryButton = (id: number, name: string, i: number, icon: string) => {
    return (
      <Fragment key={i}>
        {i === 0 && <Separator />}
        <Button
          variant='TouchableOpacity'
          style={styles.Button}
          onPress={() => handleIndustry(id)}
        >
          <View
            style={styles.IconContainer}>
            <View style={{ position: 'absolute' }}>
              <SkeletonContainer animation="wave" speed={600}>
                <Skeleton
                  style={styles.SkeletonIcon}
                />
              </SkeletonContainer>
            </View>
            <SvgUriImage style={styles.IndustryIcon} src={icon} />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Typography variant="h5" weight="SemiBold">
              {name}
            </Typography>
          </View>
          <View>
            <SvgIcon
              icon="arrowRightSmall"
              style={{ alignSelf: 'center' }}
            />
          </View>
        </Button>
        <Separator />
      </Fragment>
    );
  };

  return (
    <ScreenHeaderProvider
      mainTitlePosition="flex-start"
      mode="backAction"
      title={industryId ? 'Stanowiska' : 'Kategorie'}
      callback={initialIndustry ? backToFilterScreen : industryId ? backToIndustry : undefined}
      backgroundContent={Colors.Basic100}
    >
      <View style={{ backgroundColor: Colors.Basic100, flex: 1 }}>
        {industryId === null || mode === 'industry' ? (
          <ItemSelectorScreen
            mode='single'
            list={jobIndustries}
            callback={handleIndustry}
            labels={{
              searchLabel: 'Znajdź branżę',
              itemsLabel: 'Popularne branże'
            }}
            render={industryButton as any}
            subViewMode={false}
          />
        ) : (

          selectedIndustry &&
          <>
            <View style={styles.ActiveCategory}>
              <View style={styles.ActiveCategoryName}>
                <SvgUriImage
                  style={styles.IndustryIcon}
                  src={selectedIndustry?.icon as string}
                />
                <Typography variant="h4" style={{ alignSelf: 'center' }}>
                  {selectedIndustry?.name}
                </Typography>
              </View>
              {!initialIndustry &&
                <Button
                  variant="text"
                  circular
                  style={{ marginRight: -10 }}
                  icon={<SvgIcon icon="crossBig" fill={Colors.Basic500} />}
                  onPress={backToIndustry}
                />
              }
            </View>
            <ItemSelectorScreen
              mode={mode === 'singlePosition' ? 'single' : 'multiple' as any}
              list={selectedIndustry.job_positions}
              callback={mode === 'singlePosition' ? handleSinglePosition : handleMultiplePosition as any}
              labels={{
                searchLabel: 'Znajdź stanowisko',
                itemsLabel: 'Popularne stanowiska'
              }}
              initialSelected={initialPosition}
              subViewMode={false}
            />
          </>
        )}
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
  IconContainer: {
    width: 34, height: 34, position: 'relative'
  },
  SkeletonIcon: {
    width: 34,
    height: 34,
    borderRadius: 17
  },
  IndustryIcon: {
    width: 34,
    height: 34,
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
