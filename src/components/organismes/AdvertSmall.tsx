import React, { ComponentProps, FC, useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacityBase, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { isNumber } from 'lodash';
import { UserAdvertType } from '../../store/reducers/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Colors from '../../colors/Colors';
import Typography from '../atoms/Typography';
import SvgIcon from '../atoms/SvgIcon';
import Button from '../molecules/Button';
import useRouter from '../../hooks/useRouter';
import Popover from '../molecules/Popover';
import { Separator } from 'tamagui';

type AdvertSmallProps = {
  onChooseButton?: (advert: UserAdvertType) => void;
  containerStyle?: StyleProp<ViewStyle>,
  hideOptions?: boolean,
  hideCandidatesButton?: boolean,
  hideExtendActivityButton?: boolean,
  hideFooter?: boolean,
} & UserAdvertType;

const AdvertSmall: FC<AdvertSmallProps> = (advert) => {
  const { onChooseButton, hideOptions = false, hideCandidatesButton = false, hideExtendActivityButton = false, hideFooter = false, is_active, containerStyle, benefits_ids, company_id, description, duties_ids, expiration_time, job_experience_id, job_mode_id, job_position_id, job_start_id, known_languages_id, location, requirements_ids, salary_amount_low, salary_amount_up, salary_tax_type_id, salary_time_type_id, trial_time_id, trial_type_id, type_of_contract_id, working_hour_down, working_hour_up, id, num_views, candidate_data } = advert;
  const { jobSalaryModes, jobSalaryTaxes, jobIndustries, userCompany } = useTypedSelector(state => state.general);
  const router = useRouter();
  // const [optionsVisible, setOptionsVisible] = useState(false);
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
        {!hideOptions &&
          <Popover
            placement='left-start'
            triggerComponent={(open) => (
              <View style={{ marginTop: -8 }}>
                <Button
                  variant='text'
                  circular
                  icon={<SvgIcon icon="threeDots" />}
                  onPress={open}
                />
              </View>
            )}
          >
            {(close) => (<>
              <TouchableOpacity
                style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  close();
                  router.push({ stack: 'AdvertStack', screen: 'AdvertEditorScreen', params: { id: id.toString() } })
                }}
              >
                <SvgIcon icon="pencil" style={{marginRight: 10}} />
                <Typography variant='h4'>
                  Edytuj
                </Typography>
              </TouchableOpacity>
              <Separator borderColor={Colors.Basic500} />
              <TouchableOpacity
                style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  close();
                  //delete
                }}
              >
                <SvgIcon icon="closeX" fill={Colors.Danger} style={{marginRight: 10}} />
                <Typography variant='h4' color={Colors.Danger}>Usuń</Typography>
              </TouchableOpacity>
            </>)}
          </Popover>
        }
      </View>
      {!!onChooseButton && <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 12,
        }}
      >
        <Button
          borderRadius={4}
          contentVariant='h5'
          contentWeight='Bold'
          onPress={() => onChooseButton(advert)}
        >
          Wybierz
        </Button>
      </View>}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
      >
        {!hideCandidatesButton && <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 12 }}>
          <Button
            contentWeight="Bold"
            contentVariant='h5'
            br={4}
            onPress={() => router.push({ stack: 'AdvertStack', screen: 'CandidatesScreen', params: { id: id.toString() } })}
          >
            Kandydaci: {candidate_data.length}
          </Button>
        </View>}
        {!hideExtendActivityButton && <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 12 }}>
          <Button
            contentWeight="Bold"
            contentVariant='h5'
            variant={expired ? 'primary' : 'light'}
            br={4}
            onPress={() => console.log('extend')}
          >
            Przedłuż
          </Button>
        </View>}
      </View>
      {!hideFooter && <View
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
      </View>}
    </View>
  );
};

// const extendAdvertHandler = (data: any) => {
//   setSwipeablePanelProps({
//     title: 'Pakiety',
//     children: (
//       <View>
//         <View style={{ paddingHorizontal: 19 }}>
//           <Typography variant="h5">
//             Ups! Skończyły Ci się darmowe ogłoszenia.
//           </Typography>
//         </View>
//         <View
//           style={{
//             backgroundColor: Colors.Sea300,
//             marginTop: 16,
//             padding: 19
//           }}>
//           <Typography color={Colors.Basic600} variant="h5" weight='Bold'>
//             PAKIET - MEDIUM
//           </Typography>
//           <Typography variant="h2" weight='Bold'>
//             50zł <Typography variant="main" weight='Medium'>tydzień</Typography>
//           </Typography>
//           <Typography variant="small" color={Colors.Danger}>
//             Pakiet wygasł
//           </Typography>
//         </View>
//       </View>
//     ),
//     buttons: [
//       {
//         variant: "primary",
//         contentVariant: 'h5',
//         contentWeight: 'Bold',
//         contentColor: Colors.White,
//         children: 'Przedłuż pakiet',
//         onPress: () => { },
//       },
//       {
//         children: 'Zobacz pakiety',
//         contentVariant: 'h5',
//         onPress: () => { }//navigation.navigate("ProfileStack", { screen: "MainScreen" }),
//       },
//     ]
//   })
// }

const styles = StyleSheet.create({});

export default AdvertSmall;
