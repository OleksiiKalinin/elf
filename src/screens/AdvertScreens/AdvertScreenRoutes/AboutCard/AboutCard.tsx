import React, { ComponentProps, FC, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Colors from '../../../../colors/Colors';
// import all, { SliderBox } from "react-native-image-slider-box";
import Typography from '../../../../components/atoms/Typography';
import { IconTypes } from '../../../../components/atoms/SvgIcon';

type ResumeCardProps = {};

const ResumeCard: FC<ResumeCardProps> = ({ ...props }) => {
  const Jobs: Array<{
    name: string;
  }> = [
      {
        name: 'abcd',
      },
    ];

  const Experience: Array<{
    job: string;
    seniority: string;
    company: string;
    time: string;
    period: string;
  }> = [
      {
        job: 'Makijaż',
        seniority: 'zaawansowany',
        company: 'Orchidea',
        time: '03.2020 - 03.2022',
        period: '(2 lata)',
      },
      {
        job: 'Fryzjer/makijaż',
        seniority: 'zaawansowany',
        company: 'Orchidea',
        time: '05.2015 - 03.2020',
        period: '(4 lata 7 mies.)',
      },
      {
        job: 'Fryzjer',
        seniority: 'początkujący',
        company: 'Orchidea',
        time: '05.2015 - 03.2020',
        period: '(4 lata 7 mies.)',
      },
      {
        job: 'Fryzjer',
        seniority: 'początkujący',
        company: 'Orchidea',
        time: '05.2015 - 03.2020',
        period: '(4 lata 7 mies.)',
      },
      {
        job: 'Makijaż',
        seniority: 'początkujący',
        company: 'Orchidea',
        time: '05.2015 - 03.2020',
        period: '(4 lata 7 mies.)',
      },
    ];

  const Education: Array<{
    level: string;
    school: string;
    time: string;
  }> = [
      {
        level: 'Wyższe',
        school: 'Uniwersytet Warszawski',
        time: '03.2020 - 03.2022 - w trakcie',
      },
      {
        level: 'Średnie',
        school: 'Liceum im. Jana Pawła II',
        time: '03.2017 - 03.2020',
      },
    ];

  const Icons: Array<{
    icon: IconTypes;
  }> = [
      {
        icon: 'facebook',
      },
      {
        icon: 'instagram',
      },
      {
        icon: 'telegram',
      },
    ];

  const ImagesPortfolio: Array<{}> = [
    require('../../../../assets/images/company.png'),
    require('../../../../assets/images/company.png'),
    require('../../../../assets/images/company.png'),
  ];

  const ImagesCerts: Array<{}> = [
    require('../../../../assets/images/certificate.png'),
    require('../../../../assets/images/certificate1.png'),
    require('../../../../assets/images/certificate2.png'),
  ];

  return (
    <View style={{ backgroundColor: Colors.Basic100, marginBottom: 20 }}>
      {/* <SliderBox
        sliderBoxHeight={240}
        images={ImagesPortfolio}
        style={{ marginTop: 23, width: '100%' }}
      /> */}
      <Typography weight="Bold" style={styles.Header}>
        Beauty sp. z o.o.
      </Typography>
      <View
        style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
        <View
          style={{
            backgroundColor: Colors.Basic300,
            height: 80,
            width: '44%',
            justifyContent: 'center',
            marginRight: 8,
          }}>
          <Typography variant="h3" style={{ textAlign: 'center' }}>
            6-8
          </Typography>
          <Typography variant="small" style={{ textAlign: 'center' }}>
            Liczba pracowników
          </Typography>
        </View>
        <View
          style={{
            backgroundColor: Colors.Basic300,
            height: 80,
            width: '44%',
            justifyContent: 'center',
          }}>
          <Typography variant="h3" style={{ textAlign: 'center' }}>
            50m2
          </Typography>
          <Typography variant="small" style={{ textAlign: 'center' }}>
            Powierzchnia firmy
          </Typography>
        </View>
      </View>
      <View style={[styles.Category, { marginTop: 25 }]}>
        <Typography style={{ left: 19, marginBottom: 9 }}>Branża</Typography>
        <Typography variant="small" color={Colors.Basic600} style={{ left: 19 }}>
          Beauty
        </Typography>
      </View>
      <View style={styles.Category}>
        <Typography style={{ left: 19, marginBottom: 9 }}>Rodzaj firmy </Typography>
        <Typography variant="small" color={Colors.Basic600} style={{ left: 19 }}>
          Manicure, pedicure, przedłużanie rzęs, regi...
        </Typography>
      </View>
      <View style={styles.Category}>
        <Typography style={{ left: 19, marginBottom: 9 }}>Wykorzystywane metody</Typography>
        <Typography variant="small" color={Colors.Basic600} style={{ left: 19 }}>
          Manicure hybrydowy, manicure odżywczy ...
        </Typography>
      </View>
      <View style={[styles.Category, { borderBottomWidth: 1 }]}>
        <Typography style={{ left: 19, marginBottom: 9 }}>Wykorzystywane narzędzia</Typography>
        <Typography variant="small" color={Colors.Basic600} style={{ left: 19 }}>
          Neonail, semilac, indigo, queen  ardell, a lu...
        </Typography>
      </View>
      <Typography weight="Bold" style={styles.Header}>
        Certyfikaty
      </Typography>
      {/* <SliderBox
        resizeMode="contain"
        sliderBoxHeight={240}
        images={ImagesCerts}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  Category: {
    height: 80,
    justifyContent: 'center',
    borderColor: Colors.Basic300,
    borderTopWidth: 1,
  },
  Header: {
    fontSize: 20,
    marginTop: 16,
    marginLeft: 19,
    marginBottom: 11,
  },
});

export default ResumeCard;
