import React, {ComponentProps, FC, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
// import StarRating from 'react-native-star-rating';
import Typography from '../../../../components/atoms/Typography';
import Colors from '../../../../colors/Colors';
import SvgIcon from '../../../../components/atoms/SvgIcon';
// import { SliderBox } from "react-native-image-slider-box";


type OpinionCardProps = {};

const OpinionCard: FC<OpinionCardProps> = ({...props}) => {
  const Jobs: Array<{
    name: string;
  }> = [
    {
      name: 'abcd',
    },
  ];

  const Ratings: Array<{
    name: string;
    rating: number;
  }> = [
    {
      name: 'Rozmowa',
      rating: 4.6,
    },
    {
      name: 'Punktualność',
      rating: 5.0,
    },
    {
      name: 'Zaangażowanie',
      rating: 4.1,
    },
    {
      name: 'Dobry kontakt',
      rating: 2.3,
    },
    {
      name: 'Kwalifikacje',
      rating: 2.6,
    },
  ];

  const Comments: Array<{
    name: string;
    time: string;
    text: string;
  }> = [
    {
      name: 'Anonimowy',
      time: '1 mies.',
      text: 'Serdecznie polecam',
    },
    {
      name: 'Anonimowy',
      time: '1 mies.',
      text: 'Super!',
    },
    {
      name: 'Anonimowy',
      time: '1 mies.',
      text: 'To świetna firma! Nie dość, że ma świetny kontakt z naszymi klientami, to świetnie sobie radzi w swoim zawodzie - każdy makijaż to po prostu mistrzostwo :)',
    },
    {
      name: 'Anonimowy',
      time: '1 mies.',
      text: 'Serdecznie polecam',
    },
    {
      name: 'Anonimowy',
      time: '1 mies.',
      text: 'Serdecznie polecam',
    },
  ];

  const ImagesPortfolio: Array<{}> = [
    require('../../../../assets/images/company.png'),
    require('../../../../assets/images/company.png'),
    require('../../../../assets/images/company.png'),
  ];

  return (
    <View style={{backgroundColor: Colors.Basic100}}>

{/* <SliderBox
        sliderBoxHeight={240}
        images={ImagesPortfolio}
        style={{marginTop: 23, width: '100%'}}
      /> */}

      <Typography weight="Bold" style={styles.Header}>
        Beauty sp. z o.o.
      </Typography>

      <Typography
        weight="Bold"
        style={{textAlign: 'center', marginTop: 32, fontSize: 30}}>
        4.6
      </Typography>
      <Typography style={{textAlign: 'center', color: Colors.Basic600}}>
        23 opinie
      </Typography>

      <View style={{marginTop: 38, marginHorizontal: 20}}>
        {Ratings.map(({name, rating}) => (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography style={{marginBottom: 18}}>{name}</Typography>
            <View style={{flexDirection: 'row'}}>
              {/* <StarRating
                starSize={18}
                disabled={false}
                maxStars={5}
                rating={rating}
              /> */}
              <View style={{width: 40}}>
                <Typography style={{textAlign: 'right'}}>{rating}</Typography>
              </View>
            </View>
          </View>
        ))}
      </View>

      {Comments.map(({name, time, text}) => (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.White,
            marginVertical: 8,
            paddingVertical: 16,
          }}>
          <Image
            source={require('../../../../assets/images/logo.png')}
            style={{marginRight: 15}}
          />
          <View style={{flexDirection: 'column', width: '68%'}}>
            <Typography weight="Bold">{name}</Typography>
            <Typography>{time}</Typography>
            <Typography style={{marginTop: 6}}>{text}</Typography>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Typography style={{color: Colors.Basic600}}>
                Odpowiedz
              </Typography>
              <Typography style={{color: Colors.Basic600}}>Zgłoś</Typography>
            </View>
          </View>
          <View style={{position: 'absolute', flexDirection:"row", right: 28, top: 21}} >
            <SvgIcon icon="like"/>
            <Typography style={{fontSize: 14, textAlignVertical:"center", marginLeft: 9}}>15</Typography>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  FilterSwitch: {
    alignContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'Colors.Basic100',
    marginBottom: 24,
    marginLeft: 6,
  },
  Header: {
    fontSize: 20,
    marginTop: 16,
    marginLeft: 19,
    marginBottom: 11,
  },
});

export default OpinionCard;
