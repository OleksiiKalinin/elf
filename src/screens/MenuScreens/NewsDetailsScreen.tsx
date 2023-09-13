import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MenuStackParamList, 'NewsDetailsScreen'>,
  NativeStackScreenProps<RootStackParamList, 'MenuStack'>
>;

const NewsDetailsScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  // const { title, content } = route.params;

  // console.log(title, content);

  return (
    <ScreenHeaderProvider
      currentStack="CalendarStack"
      mainTitlePosition="flex-start"
      // title={title}
    >
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        {/* <Typography
          weight="Bold"
          variant="h4"
          style={{ left: 18, marginTop: 24, marginBottom: 13 }}>
          {title}
        </Typography> */}

        <View style={{ marginLeft: 23, marginRight: 37 }}>
          <View>
            {/* <Typography>
              {content}
            </Typography> */}
          </View>
        </View>
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Title: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 4,
  },
});

export default NewsDetailsScreen;
