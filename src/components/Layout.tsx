import { ReactNode, FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import BottomTabs from './organismes/BottomTabs';
import Typography from './atoms/Typography';
import Colors from '../colors/Colors';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [profileFocused, setProfileFocused] = useState(false);

  return (
    <View>
      <View style={{
        paddingBottom: 45
      }}>
        {children}
      </View>
      <View style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        // height: 50,
        backgroundColor: Colors.White
      }}>
        <BottomTabs {...{ profileFocused, setProfileFocused }} state={{
          index: 1,
          routes: [
            {name: 'MenuStack'},
            {name: 'CandidatesStack'},
            {name: 'CalendarStack'},
            {name: 'AdvertStack'},
            {name: 'MessengerStack'},
            {name: 'ProfileStack'},
            {name: 'AuthStack'},
          ]
        }} />
      </View>
    </View>
  );
};
