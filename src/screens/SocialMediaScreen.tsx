import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import Button from '../components/molecules/Button';
import Colors from '../colors/Colors';
import useRouter from '../hooks/useRouter';
import { ScrollView } from '../components/molecules/ScrollView';
import SvgIcon from '../components/atoms/SvgIcon';

type SocialMediaType = {
  facebook?: string | null,
  instagram?: string | null,
  linkedIn?: string | null,
  website?: string | null,
};

export type SocialMediaScreenProps = {
  callback: (socialMedia: SocialMediaType) => void,
  initialSocialMedia?: SocialMediaType,
};

const SocialMediaScreen: React.FC<SocialMediaScreenProps> = ({
  callback,
  initialSocialMedia
}) => {
  const [socialMedia, setSocialMedia] = useState(initialSocialMedia || {
    facebook: null,
    instagram: null,
    linkedIn: null,
    website: null,
  });
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const { backToRemoveParams } = useRouter();

  useEffect(() => {
    setIsDataValid(validateSocialMedia());
  }, [socialMedia]);

  const validateSocialMedia = () => {
    if(
      (socialMedia.facebook?.length && !urlPattern.test(socialMedia.facebook)) ||
      (socialMedia.instagram?.length && !urlPattern.test(socialMedia.instagram)) ||
      (socialMedia.linkedIn?.length && !urlPattern.test(socialMedia.linkedIn)) ||
      (socialMedia.website?.length && !urlPattern.test(socialMedia.website))
    ){
      return false;
    };

    return true;
  };


  const handleConfirm = () => {
    if (isDataValid) {
      callback(socialMedia);
      backToRemoveParams();
    } else {
      setShowTips(true);
    };
  };

  const urlPattern = /^(http|https):\/\/[^ "]+$/;

  return (
    <ScreenHeaderProvider title='Social media'>
      <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingTop: 25}}>
        <View style={styles.TextFieldContainer}>
          <TextField
            left={<SvgIcon icon='facebook' />}
            label="Link do profilu na Facebook"
            value={socialMedia.facebook || ''}
            onChangeText={text => setSocialMedia(prev=> ({...prev, facebook: (text.length ? text : null)}))}
            {...(showTips && socialMedia.facebook?.length && !urlPattern.test(socialMedia.facebook) && {
              bottomText: 'Niepoprawny adres url',
            })}
          />
        </View>
        <View style={styles.TextFieldContainer}>
          <TextField
            left={<SvgIcon icon='instagram' />}
            label="Link do profilu na Instagram"
            value={socialMedia.instagram || ''}
            onChangeText={text => setSocialMedia(prev=> ({...prev, instagram: (text.length ? text : null)}))}
            {...(showTips && socialMedia.instagram?.length && !urlPattern.test(socialMedia.instagram) && {
              bottomText: 'Niepoprawny adres url',
            })}
          />
        </View>
        <View style={styles.TextFieldContainer}>
          <TextField
            left={<SvgIcon icon='instagram' />}
            label="Link do profilu na LinkedIn"
            value={socialMedia.linkedIn || ''}
            onChangeText={text => setSocialMedia(prev=> ({...prev, linkedIn: (text.length ? text : null)}))}
            {...(showTips && socialMedia.linkedIn?.length && !urlPattern.test(socialMedia.linkedIn) && {
              bottomText: 'Niepoprawny adres url',
            })}
          />
        </View>
        <View style={styles.TextFieldContainer}>
          <TextField
            left={<SvgIcon icon='internet' />}
            label="Link do strony internetowej"
            value={socialMedia.website || ''}
            onChangeText={text => setSocialMedia(prev=> ({...prev, website: (text.length ? text : null)}))}
            {...(showTips && socialMedia.website?.length && !urlPattern.test(socialMedia.website) && {
              bottomText: 'Niepoprawny adres url',
            })}
          />
        </View>
      </ScrollView>
      <View>
        <Button onPress={() => handleConfirm()}>
          Potwierdź
        </Button>
      </View>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.Basic100,
    flex: 1
  },
  TextFieldContainer: {
    marginBottom: 20, 
    marginHorizontal: 19,
  }
});

export default SocialMediaScreen;