import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CandidateDataType, JobPositionType } from '../../store/reducers/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import SvgIcon from '../atoms/SvgIcon';
import Typography from '../atoms/Typography';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';

const CandidateCard: React.FC<CandidateDataType & { onChoose?: () => void, rating?: number }> = (props) => {
  const { jobIndustries, jobExperiences, jobSalaryTaxes } = useTypedSelector(s => s.general);
  const [jobPositions, setJobPositions] = useState<JobPositionType[]>([]);

  useEffect(() => {
    setJobPositions(jobIndustries.reduce<JobPositionType[]>((prev, curr): any => [...prev, ...curr.job_positions], []));
  }, [jobIndustries]);

  return (
    <View style={styles.Candidate}>
      <View style={styles.Card}>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', marginRight: 8 }}>
          <View style={{ width: 48, height: 48, borderRadius: 24, overflow: 'hidden' }}>
            <Image source={{ uri: props.logo?.path }} style={{ width: 48, height: 48 }} resizeMode='center' />
          </View>
          {!!props.video && <View style={{ marginTop: 5 }}>
            <SvgIcon icon='video' />
          </View>}
          {/* {props.promoted && (
            <SvgIcon icon={'promotedStar'} style={[styles.Promoted, { backgroundColor: 'transparent' }]} />
          )} */}
        </View>
        <View>
          <Typography>
            <Typography weight="Bold" style={{ textTransform: "capitalize" }}>{jobPositions.find(p => p.id === props.job_position_id)?.name}</Typography>{' '}
            <Typography weight="SemiBold" style={{ color: Colors.Basic600 }}>{jobExperiences.find(p => p.id === props.job_experience_id)?.name}</Typography>
          </Typography>
          <Typography weight="Regular" style={{ marginBottom: 8, color: Colors.Basic600 }}>{props.first_name} {props.last_name}</Typography>
          <View>
            <Typography color={Colors.Blue500}>
              {props.salary_amount_low && props.salary_amount_up ?
                `${props.salary_amount_low} - ${props.salary_amount_up} zł ${{ 2: 'msc', 3: 'godz' }[props.salary_time_type_id || 2] || 'msc'} ${jobSalaryTaxes.find(el => el.id === props.salary_tax_type_id)?.name || 'brutto'}`
                :
                'Stawka nieustalona'
              }
            </Typography>
            {!!props.rating && <Typography>
              <Typography weight='Bold' variant='h5'>{Math.round(props.rating * 100)}{'%  '}</Typography>
              Pasuje do Twojego ogłoszenia
            </Typography>}
          </View>
          {/* <View style={{ flexDirection: 'row' }}>
            <Typography weight="Medium" style={{ color: Colors.Basic900 }}>
              {props.schedule}{'  '}&bull;{'  '}
            </Typography>
            <Typography style={{ color: Colors.Basic600 }}>
              {props.distance}{'  '}&bull;{'  '}
            </Typography>
            <Typography style={{ color: Colors.Basic600 }}>
              {props.time}
            </Typography>
          </View> */}
        </View>
        <View style={{ marginLeft: 'auto', alignItems: 'center', marginRight: -10 }}>
          {/* <View>
            <IconButton _pressed={{backgroundColor: Colors.Basic300}} icon={<SvgIcon icon="moreVert" />} onPress={props.onPress} />
          </View> */}
          {/* <Menu >
            <MenuTrigger>
              <View style={{ paddingHorizontal: 7, paddingVertical: 5 }}>
                <SvgIcon
                  icon={blank ? 'cardOutlined' : 'cardFilled'}
                  fill={blank ? Colors.Basic900 : props.bookmark}
                />
              </View>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={{ marginLeft: -35, marginTop: -15 }}>
              <MenuOption
                style={styles.menuOption}
                onSelect={() =>
                  store.dispatch({
                    type: bookmarkActionTypes.SET_SUPER,
                    payload: props.index,
                  })
                }>
                <SvgIcon
                  style={{ marginRight: 8, alignSelf: 'center' }}
                  icon="cardFilled"
                  fill={data.bookmarks[0].color}
                />
                <Typography>{data.bookmarks[0].name}</Typography>
              </MenuOption>
              <MenuOption
                style={styles.menuOption}
                onSelect={() =>
                  store.dispatch({
                    type: bookmarkActionTypes.SET_CONSIDER,
                    payload: props.index,
                  })
                }>
                <SvgIcon
                  style={{ marginRight: 8, alignSelf: 'center' }}
                  icon="cardFilled"
                  fill={data.bookmarks[1].color}
                />
                <Typography>{data.bookmarks[1].name}</Typography>
              </MenuOption>
              <MenuOption
                style={styles.menuOption}
                onSelect={() =>
                  store.dispatch({
                    type: bookmarkActionTypes.SET_FUTURE,
                    payload: props.index,
                  })
                }>
                <SvgIcon
                  style={{ marginRight: 8, alignSelf: 'center' }}
                  icon="cardFilled"
                  fill={data.bookmarks[2].color}
                />
                <Typography>{data.bookmarks[2].name}</Typography>
              </MenuOption>
              <MenuOption
                style={styles.menuOption}
                onSelect={() =>
                  store.dispatch({
                    type: bookmarkActionTypes.SET_BLANK,
                    payload: props.index,
                  })
                }>
                <SvgIcon
                  fill={Colors.Danger}
                  style={{ marginRight: 8, alignSelf: 'center' }}
                  icon="crossBig"
                />
                <Typography color={Colors.Danger}>Usuń kandydata</Typography>
              </MenuOption>
            </MenuOptions>
          </Menu> */}
        </View>
      </View>
      {props.onChoose && <View>
        <Button
          // containerStyles={{ marginBottom: 12, marginHorizontal: 20 }}
          style={{ paddingVertical: 5 }} borderRadius={4} contentVariant='h5' contentWeight='Bold'
          onPress={props.onChoose}
        >
          Wybierz
        </Button>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  Candidate: {
    backgroundColor: Colors.White,
  },
  Bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    height: 40,
    borderBottomColor: Colors.Basic300,
    borderBottomWidth: 1,
  },
  Card: {
    flexDirection: 'row',
    marginVertical: 16,
    marginHorizontal: 20,
  },
  Avatar: {
    backgroundColor: Colors.Basic300,
    borderRadius: 100,
    alignSelf: 'center',
  },
  Promoted: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  menuOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: Colors.Basic300,
    flexDirection: 'row',
  },
});

export default CandidateCard;
