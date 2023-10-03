import React, { ComponentProps, FC, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Linking } from 'react-native';
import Colors from '../../../../colors/Colors';
import { CandidateDataType, JobPositionType } from '../../../../store/reducers/types';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { IconTypes } from '../../../../components/atoms/SvgIcon';
import Typography from '../../../../components/atoms/Typography';
// import Carousel from '../../../../components/organisms/Carousel/Carousel';

const ResumeCard: FC<CandidateDataType> = (props) => {
  const { account_facebook, account_instagram, account_twitter, account_youtube, job_experience_id, job_industry, job_position_id, location, salary_amount_low, salary_amount_up, salary_tax_type_id, salary_time_type_id, certificates, id, logo, photos, video } = props;
  const [duration, setDuration] = useState<number | null>(null);
  const { userData, jobIndustries, jobExperiences, jobSalaryModes, jobSalaryTaxes, windowSizes } = useTypedSelector(s => s.general);
  const [jobPositions, setJobPositions] = useState<JobPositionType[]>([]);
  const socialMediaLinks = [account_facebook, account_instagram, account_youtube];
  const socialMediaIcons: IconTypes[] = ['facebook', 'instagram', 'telegram'];

  const socialMedia: { icon: IconTypes, url: string | null }[] = new Array(socialMediaLinks.length).fill(null).map((_, i) => ({
    icon: socialMediaIcons[i],
    url: socialMediaLinks[i]
  })).filter(el => !!el.url);
  
  useEffect(() => {
    setJobPositions(jobIndustries.reduce<JobPositionType[]>((prev, curr) => [...prev, ...curr.job_positions], []));
  }, [jobIndustries]);


  return (
    <View style={{ backgroundColor: Colors.Basic100 }}>
      {photos && <>
        <Typography weight='Bold' style={styles.Header}>Portfolio</Typography>
        {/* <Carousel
          data={photos}
          inactiveSlideScale={1}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: Colors.Basic300, alignItems: 'center' }}>
              <Image source={{ uri: item.path }} style={{ height: windowSizes.width / 1.5, width: windowSizes.width }} />
            </View>
          )}
        /> */}
      </>}
      {/* <Typography weight='Bold' style={styles.Header}>Doświadczenie zawodowe</Typography>
      {Experience.map(({ job, seniority, company, time, period }) =>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <Image source={require("../../../../assets/images/logo.png")} style={{ marginRight: 15, height: "100%" }} />
          <View>
            <Typography style={{ marginBottom: 12 }}><Typography weight="Bold">{job}</Typography>  &bull;  <Typography color={Colors.Basic700}>{seniority}</Typography></Typography>
            <Typography variant="small">{company}</Typography>
            <Typography variant="small">{time}</Typography>
            <Typography variant="small">{period}</Typography>
          </View>
        </View>
      )} */}
      {/* <View
        style={{
          borderTopWidth: 1,
          borderColor: Colors.Basic300,
          marginTop: 41,
        }}>
        <ButtonRipple
          variant="text"
          style={styles.Category}>
          <View style={{ paddingLeft: 16 }}>
            <Typography color={Colors.Basic700}>Metody</Typography>
          </View>
        </ButtonRipple>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: Colors.Basic300,
          marginBottom: 25,
        }}>
        <ButtonRipple
          variant="text"
          style={styles.Category}>
          <View style={{ paddingLeft: 16 }}>
            <Typography color={Colors.Basic700}>Narzędzia</Typography>
          </View>
        </ButtonRipple>
      </View> */}
      {/* <Typography weight='Bold' style={styles.Header}>Wykształcenie</Typography>
      {Education.map(({ level, school, time }) =>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Image source={require("../../../../assets/images/logo.png")} style={{ marginRight: 15, height: "100%" }} />
          <View>
            <Typography weight="Bold" style={{ marginBottom: 12 }}>{level}</Typography>
            <Typography variant="small" style={{ color: Colors.Basic600 }}>{school}</Typography>
            <Typography variant="small" style={{ color: Colors.Basic600 }}>{time}</Typography>
          </View>
        </View>
      )} */}
      {/* <Typography weight='Bold' style={styles.Header}>Certyfikaty</Typography>
      <SliderBox resizeMode="contain" sliderBoxHeight={240} images={ImagesCerts} /> */}
      {/* {!!socialMedia.length && <View style={{ paddingHorizontal: 19 }}>
        <Typography variant='h5' weight='Bold'>Social media</Typography>
        <View style={{ flexDirection: "row", marginLeft: -14 }}>
          {socialMedia.map(({ icon, url }) =>
            <IconButton mr='5px' onPress={() => url && Linking.openURL(url)} icon={<SvgIcon icon={icon} />} />
          )}
        </View>
      </View>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  Category: {
    padding: 0,
    marginVertical: 12,
    color: Colors.Basic700,
    justifyContent: 'flex-start',
  },
  Header: {
    fontSize: 20,
    marginTop: 25,
    marginLeft: 15,
    marginBottom: 10
  },
});

export default ResumeCard;
