import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Image } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../colors/Colors';
import Typography from '../../components/atoms/Typography/Typography';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import { RootStackParamList } from '../../navigators/RootNavigator';
import {
  CompositeScreenProps,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

type MenuScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MenuStackParamList, 'NewsScreen'>,
  NativeStackScreenProps<RootStackParamList, 'MenuStack'>
>;

const NewsScreen: React.FC<MenuScreenProps> = ({ navigation }) => {
  const articles = [
    {
      title: 'Urlop na żądanie',
      content:
        'Czy jest płatny? Możliwość zgłoszenia urlopu na żądanie zależy od rodzaju podpisanej...',
      id: 461,
    },
    {
      title: 'AAAAAAAAAA',
      content:
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...',
      id: 462,
    },
    {
      title: 'BBBBBB',
      content:
        'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb...',
      id: 463,
    },
  ];

  const [articleRead, toggleArticleRead] = useState([]);

  // console.log(articleRead);

  return (
    <View style={styles.Wrapper}>
      <ScreenHeaderProvider
                currentStack="MenuStack"
        actions={[]}>
        <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
          <View style={{ height: 20 }}></View>

          {articles.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NewsDetailsScreen', { title: item.title, content: item.content }),
                  articleRead.includes(item.id)
                    ? ''
                    : toggleArticleRead(state => [...state, item.id]);
              }}
              style={styles.newsItem}>
              <Typography
                variant="h5"
                weight="ExtraBold"
                style={{ marginBottom: 4 }}>
                {item.title}
              </Typography>
              <Typography weight="Regular">{item.content}</Typography>
              {!articleRead.includes(item.id) && (
                <Typography style={styles.badge} weight="Regular">
                  Nowe
                </Typography>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScreenHeaderProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.Basic200,
  },
  newsItem: {
    height: 105,
    backgroundColor: Colors.White,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 18,
  },
  badge: {
    position: 'absolute',
    fontSize: 12,
    color: Colors.White,
    backgroundColor: Colors.Yellow500,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    right: 8,
    top: 8,
  },
});

export default NewsScreen;
