import React, { ComponentProps, FC, useState } from 'react';
import { Radio, TextField } from 'native-base';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from 'native-base/lib/typescript/theme/base/colors';
import { ScrollView } from 'native-base';
import StarRating from 'react-native-star-rating';
import Typography from '../../../../components/atoms/Typography/Typography';
import Colors from '../../../../colors/Colors';
import SvgIcon from '../../../../components/molecules/SvgIcon/SvgIcon';
import ButtonRipple from '../../../../components/molecules/ButtonRipple/ButtonRipple';
import Svg from 'react-native-svg';

type OpinionCardProps = {
  onPress: () => void;
};

const OpinionCard: FC<OpinionCardProps> = ({ ...props }) => {

  const Ratings: Array<{ name: string; rating: number; }> = [
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
    likes: number;
  }> = [
      {
        name: 'Beauty sp. z o.o.',
        time: '1 mies.',
        text: 'Pani Gosia to doskonały pracownik! Nie dość, że ma świetny kontakt z naszymi klientami, to świetnie sobie radzi w swoim zawodzie - każdy makijaż to po prostu mistrzostwo :)',
        likes: 9,
      },
      {
        name: 'Beauty sp. z o.o.',
        time: '1 mies.',
        text: 'Pani Gosia to doskonały pracownik! Nie dość, że ma świetny kontakt z naszymi klientami, to świetnie sobie radzi w swoim zawodzie - każdy makijaż to po prostu mistrzostwo :)',
        likes: 12,
      },
      {
        name: 'Beauty sp. z o.o.',
        time: '1 mies.',
        text: 'Pani Gosia to doskonały pracownik! Nie dość, że ma świetny kontakt z naszymi klientami, to świetnie sobie radzi w swoim zawodzie - każdy makijaż to po prostu mistrzostwo :)',
        likes: 7,
      },
      {
        name: 'Beauty sp. z o.o.',
        time: '1 mies.',
        text: 'Pani Gosia to doskonały pracownik! Nie dość, że ma świetny kontakt z naszymi klientami, to świetnie sobie radzi w swoim zawodzie - każdy makijaż to po prostu mistrzostwo :)',
        likes: 15,
      },
      {
        name: 'Beauty sp. z o.o.',
        time: '1 mies.',
        text: 'Pani Gosia to doskonały pracownik! Nie dość, że ma świetny kontakt z naszymi klientami, to świetnie sobie radzi w swoim zawodzie - każdy makijaż to po prostu mistrzostwo :)',
        likes: 13,
      },
    ];

  const [likesArray, toggleLikesArray] = useState([]);
  const [text, setText] = useState('');
  const [answer, toggleAnswer] = useState<boolean>(false);
  const [template, toggleTemplate] = useState<boolean>(false);
  const [index, setIndex] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<boolean>(false);

  const templates = [
    'Dziękujemy za opinię! Pozdrawiamy.',
    'Dziękujemy! Cieszymy się, że mogliśmy nawiązać owocną współpracę.',
    'Cieszymy się, że mogliśmy stworzyć dla Ciebie odpowiednie warunki pracy. Życzymy powodzenia na nowej ścieżce zawodowej! ',
    'Wszystkiego dobrego! Mamy nadzieję, że będziesz nas wspominać z uśmiechem :)',
    'Wszystkiego dobrego! Mamy nadzieję, że będziesz nas wspominać z uśmiechem :)',
  ];

  // console.log(likesArray);

  return (
    <View style={{ backgroundColor: Colors.Basic100 }}>
      <Typography weight="Bold" style={{ textAlign: 'center', marginTop: 30, fontSize: 30 }}>
        4.6
      </Typography>
      <Typography style={{ textAlign: 'center', color: Colors.Basic600 }}>
        23 opinie
      </Typography>
      <View style={{ marginTop: 38, marginHorizontal: 20 }}>
        {Ratings.map(({ name, rating }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography style={{ marginBottom: 18 }}>{name}</Typography>
            <View style={{ flexDirection: 'row' }}>
              <StarRating
                starSize={18}
                disabled={false}
                maxStars={5}
                rating={rating}
              />
              <View style={{ width: 40 }}>
                <Typography style={{ textAlign: 'right' }}>{rating}</Typography>
              </View>
            </View>
          </View>
        ))}
      </View>
      {Comments.map((item, i) => (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.White,
            marginTop: 15,
            // paddingVertical: 15,
            width: '100%'
          }}>
          {/* <Image source={require('../../../../assets/images/logo.png')} style={{ marginRight: 15 }}/> */}
          <View style={{ flexDirection: 'column', paddingHorizontal: 20, paddingVertical: 12, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Typography weight="Bold">{item.name}</Typography>
                <Typography>{item.time}</Typography>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() =>
                    likesArray.includes(index)
                      ? toggleLikesArray(likesArray.filter(item => item !== index))
                      : toggleLikesArray(state => [...state, index])
                  }>
                  <SvgIcon
                    icon="like"
                    fill={
                      likesArray.includes(index) === true
                        ? Colors.Basic900
                        : Colors.Basic400
                    }
                  />
                </TouchableOpacity>
                <Typography
                  style={{
                    fontSize: 14,
                    textAlignVertical: 'center',
                    marginLeft: 10,
                  }}>
                  {item.likes + (likesArray.includes(index) ? 1 : 0)}
                </Typography>
              </View>
            </View>
            <Typography style={{ marginTop: 6 }}>{item.text}</Typography>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
              <TouchableOpacity onPress={() => {
                answer === false ? toggleAnswer(true) : '', setIndex(i);
              }}>
                <Typography style={{ color: Colors.Basic600 }}>Odpowiedz</Typography>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.onPress}>
                <Typography style={{ color: Colors.Basic600 }}>Zgłoś</Typography>
              </TouchableOpacity>
            </View>
          </View>

          {i === index && answer && (
            <View
              style={{
                width: '100%',
                position: 'absolute',
                backgroundColor: Colors.White,
                bottom: 0,
                zIndex: 1000,
              }}>
              <View
                style={{
                  bottom: 0,
                  backgroundColor: Colors.Basic300,
                  height: 40,
                  paddingLeft: 19,
                  justifyContent: 'center',
                }}>
                <Typography color={Colors.Basic700}>
                  Odpowiedź dla {item.name}
                </Typography>
                <SvgIcon
                  icon="crossBig"
                  style={{ position: 'absolute', right: 20, alignSelf: "center" }}
                  onPress={() => toggleAnswer(false)}
                />
              </View>
              <View style={{ height: 46 }}>
                <TextField
                  fontSize={14}
                  placeholder="Zostaw odpowiedź"
                  value={text}
                  onChangeText={item => setText(item)}
                  keyboardType={'web-search'}
                />
              </View>
              <TouchableOpacity
                onPress={() => (template === false ? toggleTemplate(true) : '')}
                style={{
                  backgroundColor: Colors.White,
                  height: 60,
                  paddingLeft: 19,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <SvgIcon icon="fileDocument" />

                <Typography color={Colors.Basic700} style={{ marginLeft: 10 }}>
                  Skorzystaj z szablonów odpowiedzi
                </Typography>
                {template === true &&
                  <SvgIcon
                    icon="crossBig"
                    style={{ position: 'absolute', right: 20, alignSelf: "center" }}
                    onPress={() => toggleTemplate(false)}
                  />}
              </TouchableOpacity>
              {template && (
                <View style={{ backgroundColor: Colors.Basic200 }}>
                  <View style={{ height: 12 }}></View>
                  {templates.map((item, i) => (
                    <TouchableOpacity
                      onPress={() => setSelectedTemplate(i)}
                      style={{
                        paddingVertical: 13,
                        backgroundColor: Colors.White,
                        paddingLeft: 19,
                        marginBottom: 12,
                      }}>
                      <Typography style={{ width: '85%' }}>{item}</Typography>
                      {selectedTemplate === i &&
                        <SvgIcon icon="check" style={{ position: "absolute", right: 15, top: 15 }} />
                      }
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <ButtonRipple onPress={() => toggleAnswer(false)}>
                Potwierdź
              </ButtonRipple>
            </View>
          )}
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
});

export default OpinionCard;
