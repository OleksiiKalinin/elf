import React, { ComponentProps, FC, useState } from 'react';
import { View, StyleSheet, Image, Linking, Dimensions } from 'react-native';
import Colors from '../../../../colors/Colors';
import SvgIcon, { IconTypes } from '../../../../components/molecules/SvgIcon/SvgIcon';
import Typography from '../../../../components/atoms/Typography/Typography';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Divider, IconButton } from 'native-base';
import Carousel from '../../../../components/organisms/Carousel/Carousel';
import { CompanyDataType } from '../../../../store/reducers/types';

const ImagesCerts: any[] = [
  require('../../../../assets/images/certificate.png'),
  require('../../../../assets/images/certificate1.png'),
  require('../../../../assets/images/certificate2.png'),
];

const AboutCard: FC<CompanyDataType> = (props) => {
  const { account_facebook, account_instagram, account_youtube, website, employees_amount, square_footage, full_decription } = props;
  const socialMediaLinks = [account_facebook, account_instagram, account_youtube, website];
  const socialMediaIcons: IconTypes[] = ['facebook', 'instagram', 'telegram', 'internet'];
  const employeesAndsquare = !!(employees_amount && square_footage);

  const socialMedia: { icon: IconTypes, url: string | null }[] = new Array(socialMediaLinks.length).fill(null).map((_, i) => ({
    icon: socialMediaIcons[i],
    url: socialMediaLinks[i]
  })).filter(el => !!el.url);

  return (
    <View style={{ backgroundColor: Colors.Basic100, marginTop: 24 }}>
      <View style={{
        flexDirection: employeesAndsquare ? 'row' : 'column',
        paddingHorizontal: 19,
        marginBottom: employees_amount || square_footage ? 12 : 0
      }}>
        {!!employees_amount &&
          <View
            style={{
              backgroundColor: Colors.Basic300,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
              flex: 1,
              flexDirection: employeesAndsquare ? 'column' : 'row',
              borderRadius: 4,
              marginRight: employeesAndsquare ? 7.5 : 0
            }}
          >
            <View style={{ marginRight: employeesAndsquare ? 0 : 15 }}>
              <Typography variant="h3" style={{ textAlign: 'center' }}>
                {employees_amount}
              </Typography>
            </View>
            <View>
              <Typography>Liczba pracowników</Typography>
            </View>
          </View>
        }
        {!!square_footage &&
          <View
            style={{
              backgroundColor: Colors.Basic300,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
              flex: 1,
              flexDirection: employeesAndsquare ? 'column' : 'row',
              borderRadius: 4,
              marginLeft: employeesAndsquare ? 7.5 : 0
            }}
          >
            <View style={{ marginRight: employeesAndsquare ? 0 : 15, flexDirection: 'row' }}>
              <Typography variant="h3" style={{ textAlign: 'center' }}>
                {square_footage.split('.')[0]}{square_footage.split('.')[1] !== '00' && `.${square_footage.split('.')[1]}`} m
              </Typography>
              <Typography weight='Bold' size={10} style={{ marginTop: 6 }}>2</Typography>
            </View>
            <View>
              <Typography>Powierzchnia firmy</Typography>
            </View>
          </View>
        }
      </View>

      <Divider />
      <View style={{ paddingHorizontal: 19 }}>
        <Typography style={{ marginTop: 12, marginBottom: 10 }} variant='h5' weight='Bold'>Opis</Typography>
        <Typography style={{ marginBottom: 12 }} variant="h5" color={Colors.Basic600}>
          {full_decription}
        </Typography>
      </View>

      {/* <Divider /> */}

      {/* <Typography variant='h5' weight='Bold' style={{ marginVertical: 14, marginHorizontal: 19 }}>Certyfikaty</Typography>
      <Carousel
        data={ImagesCerts}
        containerCustomStyle={{ backgroundColor: Colors.Basic300 }}
        inactiveSlideScale={1}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center' }}>
            <Image source={item} />
          </View>
        )}
      /> */}
      {!!socialMedia.length && <View style={{ paddingHorizontal: 19 }}>
        <Typography variant='h5' weight='Bold'>Social media</Typography>
        <View style={{ flexDirection: "row", marginLeft: -14 }}>
          {socialMedia.map(({ icon, url }) =>
            <IconButton mr='5px' onPress={() => url && Linking.openURL("http://" + url)} icon={<SvgIcon icon={icon} />} />
          )}
        </View>
      </View>}
    </View >
  );
};

const styles = StyleSheet.create({
  Category: {
    justifyContent: 'center',
    borderColor: Colors.Basic300,
    marginVertical: 10
  },
  Header: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 11,
  },
});

export default AboutCard;
