import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import SvgIcon from './SvgIcon';
import Color from 'color';

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
        warning ?
          <View style={styles.OutlineCircleWrapper} >
            <View style={[styles.OutlineCircle, {backgroundColor: Colors.Danger70}]}>
              <SvgIcon icon='alert' fill={Colors.White} style={{marginTop: - 2}}/>
            </View>
          </View>

          :

          <View style={styles.OutlineCircleWrapper} >
            <View style={[styles.OutlineCircle, { borderColor: warning ? Colors.Danger70 : Colors.Basic400, borderWidth: 2, }]} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FieldStatusCircle;