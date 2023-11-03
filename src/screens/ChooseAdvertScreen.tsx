import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import Colors from '../colors/Colors';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AdvertSmall from '../components/organismes/AdvertSmall';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import useRouter from '../hooks/useRouter';
import { UserAdvertType } from '../store/reducers/types';

export type ChooseAdvertScreenProps = {
  callback: (advert: UserAdvertType) => void;
};

const ChooseAdvertScreen: FC<ChooseAdvertScreenProps> = ({callback}) => {
  const { userAdverts } = useTypedSelector(state => state.general);
  const {backToRemoveParams} = useRouter();

  return (
    <ScreenHeaderProvider title='Wybierz ogłoszenie'>
      <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
        {userAdverts.map(item => (
          <View style={{ marginTop: 12 }}>
            <AdvertSmall {...item} onChoose={() => {
              callback(item);
              backToRemoveParams();
            }} />
          </View>
        ))}
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

export default ChooseAdvertScreen;