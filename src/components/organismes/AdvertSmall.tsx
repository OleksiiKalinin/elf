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
  onPressOptions?: (advert: UserAdvertType) => void;
  onPressCandidates?: (advert: UserAdvertType) => void;
  onPressExtendActivity?: (advert: UserAdvertType) => void;
  onPress?: (advert: UserAdvertType) => void;
  onChoose?: (advert: UserAdvertType) => void;
} & UserAdvertType;

const AdvertSmall: FC<AdvertSmallProps> = (advert) => {
  const { onPressCandidates, onPressExtendActivity, onPress, onPressOptions, onChoose, benefits_ids, company_id, description, duties_ids, expiration_time, job_experience_id, job_mode_id, job_position_id, job_start_id, known_language_id, location, requirements_ids, salary_amount_low, salary_amount_up, salary_tax_type_id, salary_time_type_id, trial_time_id, trial_type_id, type_of_contract_id, working_hour_down, working_hour_up, id, num_views, candidate_data } = advert;
  const { jobSalaryModes, jobSalaryTaxes, jobIndustries, userCompany } = useTypedSelector(state => state.general);
  const expiresIn = Math.ceil(new Date(new Date(expiration_time).getTime() - Date.now()).getTime() / 1000 / 60 / 60 / 24);
  const expired = expiresIn < 0;

  return (
    <View
      style={{
        backgroundColor: expired ?
          Colors.Basic200
          :
          advert.is_active ?
            Colors.White
            :
            Colors.Basic100,
        paddingVertical: 20,
      }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => onPress?.(advert)} style={{ flexDirection: 'row', flex: 1, paddingLeft: 20 }}>
          <View>
            <Typography weight="Bold" variant="h4" color={expired ? Colors.Basic700 : Colors.Basic900}>
              {jobIndustries.find(curr => curr.id === userCompany?.job_industry)?.job_positions.find(curr => curr.id === job_position_id)?.name}
            </Typography>
            <Typography weight='SemiBold' variant='h5' color={expired ? Colors.Basic700 : Colors.Blue500}>
              {salary_time_type_id !== 1 && salary_amount_low && salary_amount_up ?
                `${salary_amount_low} - ${salary_amount_up} zł ${{ 2: 'msc', 3: 'godz' }[salary_time_type_id || 2] || 'msc'} ${jobSalaryTaxes.find(el => el.id === salary_tax_type_id)?.name || 'brutto'}`
                :
                'Stawka nieustalona'
              }
            </Typography>
            <Typography color={expired ? Colors.Basic500 : Colors.Basic700}>
              {advert.location?.formattedAddress}
            </Typography>
          </View>
        </TouchableOpacity>
        {!!onPressOptions && <View style={{ marginTop: -10 }}>
          <Button
            circular
            variant='text'
            onPress={() => onPressOptions?.(advert)}
            icon={<SvgIcon icon="threeDots" />}
          />
        </View>}
      </View>
      {onChoose && <View>
        <Button
          // containerStyles={{ marginTop: 12, marginHorizontal: 20 }}
          style={{ paddingVertical: 5 }} borderRadius={4} contentVariant='h5' contentWeight='Bold'
          onPress={() => onChoose?.(advert)}
        >
          Wybierz
        </Button>
      </View>}
      {onPressCandidates && onPressExtendActivity && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingTop: 12,
          }}>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Button
              contentWeight="Bold"
              contentVariant='h5'
              py={5} br={4}
              onPress={() => onPressCandidates(advert)}
            >
              Kandydaci: {candidate_data.length}
            </Button>
            {isNumber(num_views) && <Typography
              variant='h5'
              color={Colors.Basic600}
              style={{ textAlign: 'right', marginTop: 8 }}
            >
              {'Wyświetlenia: '}{num_views}
            </Typography>}
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Button
              contentWeight="Bold"
              contentVariant='h5'
              variant={expired ? 'primary' : 'light'}
              py={5} br={4}
              onPress={() => onPressExtendActivity(advert)}
            >
              Przedłuż
            </Button>
            <Typography
              variant='h5'
              color={!expiration_time ? Colors.Basic600 : Colors.Danger}
              style={{ textAlign: 'left', marginTop: 8 }}>
              {!expired
                ? `Wygasa za ${expiresIn} ${expiresIn > 1 ? 'dni' : 'dzień'}`
                : 'Wygasło'}
            </Typography>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default AdvertSmall;
