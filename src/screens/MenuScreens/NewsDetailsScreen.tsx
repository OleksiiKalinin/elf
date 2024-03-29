import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../../components/molecules/ScrollView';

const NewsDetailsScreen: React.FC = () => {
  // const { title, content } = route.params;

  // console.log(title, content);

  return (
    <ScreenHeaderProvider
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
