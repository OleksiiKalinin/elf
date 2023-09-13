import React, { ComponentProps, FC } from 'react';
import { View, StyleSheet, Image, TouchableOpacityBase, TouchableOpacity } from 'react-native';
import { isNumber } from 'lodash';
import { UserAdvertType } from '../../store/reducers/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Colors from '../../colors/Colors';
import Typography from '../atoms/Typography';
import SvgIcon from '../atoms/SvgIcon';
import Button from '../molecules/Button';

type AdvertSmallProps = {
  options?: () => void;
  onPressButton0?: () => void;
  onPressButton1?: () => void;
  onPressDetails?: () => void;
  onChoose?: () => void;
} & UserAdvertType;

const AdvertSmall: FC<AdvertSmallProps> = (props) => {
  const { onPressButton0, onPressButton1, onPressDetails, options, onChoose, benefits_ids, company_id, description, duties_ids, expiration_time, job_experience_id, job_mode_id, job_position_id, job_start_id, known_language_id, location, requirements_ids, salary_amount_low, salary_amount_up, salary_tax_type_id, salary_time_type_id, trial_time_id, trial_type_id, type_of_contract_id, working_hour_down, working_hour_up, id, num_views, candidate_data } = props;
  const { jobSalaryModes, jobSalaryTaxes, jobIndustries, userCompany } = useTypedSelector(state => state.general);

  return (
    <View
      style={{
        backgroundColor: expiration_time
          ? Colors.Basic200
          : /*props.active*/true
            ? Colors.White
            : Colors.Basic100,
        paddingVertical: 20,
        borderColor: Colors.Basic300,
        borderBottomWidth: 1,
        borderTopWidth: 1,
      }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onPressDetails} style={{ flexDirection: 'row', flex: 1, paddingLeft: 20 }}>
          {/* <Image
            source={require('../../../assets/images/logo.png')}
            style={{ marginRight: 5, height: 50, width: 70 }}
          /> */}
          <View>
            <Typography weight="Bold" variant="h4" color={!true || expiration_time ? Colors.Basic700 : Colors.Basic900}>
              {jobIndustries.find(curr => curr.id === userCompany?.job_industry)?.job_positions.find(curr => curr.id === job_position_id)?.name}
            </Typography>
            <Typography weight='SemiBold' variant='h5' color={!true || expiration_time ? Colors.Basic700 : Colors.Blue500}>
              {salary_time_type_id !== 1 && salary_amount_low && salary_amount_up ?
                `${salary_amount_low} - ${salary_amount_up} zł ${{ 2: 'msc', 3: 'godz' }[salary_time_type_id || 2] || 'msc'} ${jobSalaryTaxes.find(el => el.id === salary_tax_type_id)?.name || 'brutto'}`
                :
                'Stawka nieustalona'
              }
            </Typography>
            <Typography color={!true || expiration_time ? Colors.Basic500 : Colors.Basic700}>
              {props.location?.formattedAddress}
            </Typography>
          </View>
        </TouchableOpacity>
        {options && <View>
          {/* <IconButton mt='-13px' colorScheme={Colors.White} onPress={options} icon={<SvgIcon icon="threeDots" />} /> */}
        </View>}
      </View>
      {onChoose && <View>
        <Button
          // containerStyles={{ marginTop: 12, marginHorizontal: 20 }}
          style={{ paddingVertical: 5 }} borderRadius={4} contentVariant='h5' contentWeight='Bold'
          onPress={onChoose}
        >
          Wybierz
        </Button>
      </View>}
      {onPressButton0 && onPressButton1 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 12,
            // paddingBottom: 8,
          }}>
          <View style={{ flex: 1, marginRight: 0 }}>
            <Button
              contentWeight="Bold"
              contentVariant='h5'
              variant={expiration_time ? 'disabled' : 'primary'}
              style={{ paddingVertical: 5 }}
              onPress={onPressButton0}
            >
              Kandydaci: {candidate_data.length}
            </Button>
            {/* {isNumber(num_views) && <Typography
              color={Colors.Basic600}
              style={{ textAlign: 'right', marginTop: 8 }}>
              Wyświetlenia:{' '}{num_views}
            </Typography>} */}
          </View>
          {/* <View style={{ flex: 1, marginLeft: 10 }}>
            <ButtonRipple
              contentWeight="Bold"
              contentVariant='h5'
              variant={expiration_time ? 'primary' : 'light'}
              style={{ paddingVertical: 5 }}
              onPress={onPressButton1}
            >
              Przedłuż
            </ButtonRipple>
            <Typography
              color={!expiration_time ? Colors.Basic600 : Colors.Danger}
              style={{ textAlign: 'left', marginTop: 8 }}>
              {!expiration_time
                ? 'Wygasa za ' + 30 + ' dni'
                : 'Wygasło'}
            </Typography>
          </View> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default AdvertSmall;
