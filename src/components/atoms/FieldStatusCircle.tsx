import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import SvgIcon from './SvgIcon';

export type FieldStatusCircleType = {
  status: boolean,
  warning?: boolean,
  mr?: string,
} & React.ComponentProps<typeof View>;

const FieldStatusCircle: React.FC<FieldStatusCircleType> = ({
  mr = 11,
  warning,
  status,
  ...rest
}) => {

  return (
    <View
      style={[rest.style, { marginRight: mr }]}
    >
      {status ?
        <SvgIcon icon='doneCircleGreen' />

        :

        <View style={styles.OutlineCircleWrapper} >
          <View style={[styles.OutlineCircle, { borderColor: warning ? Colors.Danger70 : Colors.Basic400 }]} />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  OutlineCircleWrapper: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  OutlineCircle: {
    borderRadius: 50,
    width: 20,
    height: 20,
    borderWidth: 2,

  },
});

export default FieldStatusCircle;