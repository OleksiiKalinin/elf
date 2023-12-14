import React, { ComponentProps, FC } from 'react';
import { View, StyleSheet, Image, TouchableOpacityBase, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { isNumber } from 'lodash';
import { UserAdvertType } from '../../store/reducers/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Colors from '../../colors/Colors';
import Typography from '../atoms/Typography';
import SvgIcon from '../atoms/SvgIcon';
import Button from '../molecules/Button';
import useRouter from '../../hooks/useRouter';

type AdvertSmallProps = {
  onPressOptions?: (advert: UserAdvertType) => void;
  onPressExtendActivity?: (advert: UserAdvertType) => void;
  onChoose?: (advert: UserAdvertType) => void;
  containerStyle?: StyleProp<ViewStyle>,
} & UserAdvertType;

const AdvertSmall: FC<AdvertSmallProps> = (advert) => {
  const { onPressExtendActivity, onPressOptions, onChoose, containerStyle, benefits_ids, company_id, description, duties_ids, expiration_time, job_experience_id, job_mode_id, job_position_id, job_start_id, known_language_id, location, requirements_ids, salary_amount_low, salary_amount_up, salary_tax_type_id, salary_time_type_id, trial_time_id, trial_type_id, type_of_contract_id, working_hour_down, working_hour_up, id, num_views, candidate_data } = advert;
  const { jobSalaryModes, jobSalaryTaxes, jobIndustries, userCompany } = useTypedSelector(state => state.general);
  const router = useRouter();
  const expiresIn = Math.ceil(new Date(new Date(expiration_time).getTime() - Date.now()).getTime() / 1000 / 60 / 60 / 24);
  const expired = expiresIn < 0;

  return (
    <View
      style={[{
        backgroundColor: expired ?
          Colors.Basic200
          :
          advert.is_active ?
            Colors.White
            :
            Colors.Basic100,
        paddingVertical: 20,
      }, containerStyle]}
    >
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => router.push({ stack: 'AdvertStack', screen: 'AdvertScreen', params: { id: id.toString() } })}
          style={{ flexDirection: 'row', flex: 1, paddingLeft: 20 }}
        >
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
      {onChoose && <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 12,
        }}
      >
        <Button
          style={{ paddingVertical: 5 }} 
          borderRadius={4} 
          contentVariant='h5' 
          contentWeight='Bold'
          onPress={() => onChoose(advert)}
        >
          Wybierz
        </Button>
      </View>}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingTop: 12,
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Button
            contentWeight="Bold"
            contentVariant='h5'
            br={4}
            onPress={() => router.push({ stack: 'AdvertStack', screen: 'CandidatesScreen', params: { id: id.toString() } })}
          >
            Kandydaci: {candidate_data.length}
          </Button>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          {onPressExtendActivity && <Button
            contentWeight="Bold"
            contentVariant='h5'
            variant={expired ? 'primary' : 'light'}
            br={4}
            onPress={() => onPressExtendActivity(advert)}
          >
            Przedłuż
          </Button>}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingTop: 8,
        }}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          {isNumber(num_views) && <Typography
            variant='h5'
            color={Colors.Basic600}
            style={{ textAlign: 'right' }}
          >
            {'Wyświetlenia: '}{num_views}
          </Typography>}
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Typography
            variant='h5'
            color={expiresIn > 7 ? Colors.Basic600 : Colors.Danger}
            style={{ textAlign: 'left' }}>
            {!expired
              ? `Wygasa za ${expiresIn} ${expiresIn > 1 ? 'dni' : 'dzień'}`
              : 'Wygasło'}
          </Typography>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AdvertSmall;
