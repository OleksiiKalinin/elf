import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../colors/Colors';
import { RootStackParamList } from '../../navigators/RootNavigator';
import {
  CompositeScreenProps,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';

const NewsScreen: React.FC = () => {
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
      <ScreenHeaderProvider>
        <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
          <View style={{ height: 20 }}></View>

          {articles.map((item, index) => (
            <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate('NewsDetailsScreen', { title: item.title, content: item.content }),
              //     articleRead.includes(item.id)
              //       ? ''
              //       : toggleArticleRead(state => [...state, item.id]);
              // }}
              style={styles.newsItem}>
              <Typography
                variant="h5"
                weight="ExtraBold"
                style={{ marginBottom: 4 }}>
                {item.title}
              </Typography>
              <Typography weight="Regular">{item.content}</Typography>
              {/* {!articleRead.includes(item.id) && (
                <Typography style={styles.badge} weight="Regular">
                  Nowe
                </Typography>
              )} */}
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
