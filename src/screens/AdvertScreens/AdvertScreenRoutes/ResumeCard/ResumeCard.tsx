import React, { ComponentProps, FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../../../colors/Colors';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
// import SmallMap from '../../../../components/organisms/SmallMap/SmallMap';
import { UserAdvertType } from '../../../../store/reducers/types';
import { IconTypes } from '../../../../components/atoms/SvgIcon';
import Typography from '../../../../components/atoms/Typography';

const ResumeCard: FC<UserAdvertType> = (props) => {
  const { benefits_ids, company_id, description, duties_ids, expiration_time, job_experience_id, job_mode_id, job_position_id, job_start_id, known_languages_id, location, requirements_ids, salary_amount_low, salary_amount_up, salary_tax_type_id, salary_time_type_id, trial_time_id, trial_type_id, type_of_contract_id, working_hour_down, working_hour_up, id } = props;
  const { jobIndustries, userCompany, jobSalaryTaxes, jobExperiences } = useTypedSelector(state => state.general);
  // const data = useTypedSelector(state => state.adverts);
  const socialMediaLinks = [userCompany?.account_facebook, userCompany?.account_instagram, userCompany?.website];
  const socialMediaIcons: IconTypes[] = ['facebook', 'instagram', 'telegram', 'internet'];

  const socialMedia: { icon: IconTypes, url: string | null | undefined }[] = new Array(socialMediaLinks.length).fill(null).map((_, i) => ({
    icon: socialMediaIcons[i],
    url: socialMediaLinks[i]
  })).filter(el => !!el.url);

  return (
    <View style={{ backgroundColor: Colors.Basic100, marginTop: 16 }}>
      {/* <SmallMap
        place={location?.formattedAddress}
        //@ts-ignore
        onPress={() => navigation.navigate('MapScreen', {
          callback: () => {},
          initialAddress: location,
          hideControls: true
        })}
        latitude={location?.position?.lat}
        longitude={location?.position?.lng}
      /> */}
      <View style={{ marginLeft: 19, marginBottom: 5 }}>
        <Typography style={styles.Header}>
          Wymagania
        </Typography>

        {!!job_experience_id && (<>
          <Typography style={styles.subHeader}>Doświadczenie</Typography>
          <Typography color={Colors.Basic600}>{jobExperiences.find(curr => curr.id === job_experience_id)?.name}</Typography>
        </>)}

        {/* {props.duties.length > 0 && (
          <>
            <Typography style={styles.subHeader}>
              Zakres obowiązków
            </Typography>

            {data.options[0].duties
              .filter((item, index) => props.duties.includes(index))
              .map(item => (
                <Typography
                  color={Colors.Basic600}
                  style={{ marginBottom: 24, marginLeft: 19 }}>
                  {item}
                </Typography>
              ))}
          </>
        )} */}

        {/* {props.job === 'fryzjer' && (
          <Typography style={styles.subHeader}>
            Wykorzystywane narzędzia
          </Typography>
        )}

        {props.requirements.length > 0 && (
          <>
            <Typography style={styles.subHeader}>
              Wymagania
            </Typography>

            {data.options[0].languages
              .filter((item, index) => props.languages.includes(index))
              .map(item => (
                <Typography
                  color={Colors.Basic600}
                  style={{ marginBottom: 24, marginLeft: 19 }}>
                  {item}
                </Typography>
              ))}

            {data.options[0].requirements
              .filter((item, index) => props.requirements.includes(index))
              .map(item => (
                <Typography
                  color={Colors.Basic600}
                  style={{ marginBottom: 24, marginLeft: 19 }}>
                  {item}
                </Typography>
              ))}
          </>
        )} */}

        {/* <Typography style={styles.subHeader}>
          Godziny pracy
        </Typography>
        <Typography
          color={Colors.Basic600}
          style={styles.subHeaderText}>
          {props.workingHours[0] + ':00'} - {props.workingHours[1] + ':00'}
        </Typography> */}

        {/* <Typography style={styles.Header}>
          Dodatkowe informacje
        </Typography>

        {props.probation && (
          <>
            <Typography style={styles.subHeader}>
              Okres próbny
            </Typography>

            <Typography
              color={Colors.Basic600}
              style={styles.subHeaderText}>
              {props.probation}
            </Typography>
          </>
        )} */}

        {/* {props.benefits.length > 0 && (
          <>
            <Typography style={styles.subHeader}>
              Benefity
            </Typography>

            {data.options[0].benefits
              .filter((item, index) => props.benefits.includes(index))
              .map(item => (
                <Typography
                  color={Colors.Basic600}
                  style={{ marginBottom: 24, marginLeft: 19 }}>
                  {item}
                </Typography>
              ))}
          </>
        )} */}

        {/* {props.withoutResume && (
          <Typography style={styles.subHeader}>
            Bez CV
          </Typography>
        )} */}
        {!!socialMedia.length && <View style={{ paddingHorizontal: 19 }}>
          <Typography variant='h5' weight='Bold'>Social media</Typography>
          <View style={{ flexDirection: "row", marginLeft: -14 }}>
            {/* {socialMedia.map(({ icon, url }) =>
              <IconButton mr='5px' onPress={() => url && Linking.openURL("http://" + url)} icon={<SvgIcon icon={icon} />} />
            )} */}
          </View>
        </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    marginTop: 24,
    fontWeight: '700',
    fontSize: 20
  },
  subHeader: {
    marginTop: 15,
    marginBottom: 10,
    fontWeight: '700',
    fontSize: 16
  },
});

export default ResumeCard;
