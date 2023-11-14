import React, {FC} from 'react';
import Colors from '../../colors/Colors';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Typography from '../atoms/Typography';
import SvgIcon, { IconTypes } from '../atoms/SvgIcon';

type HorizontalMenuButtonProps = {
  name?: any;
  count?: number;
  selectedColor?: string;
  backgroundColor?: string;
  icon?: IconTypes;
  fill?: string;
  noIcon?: boolean;
  filter?: any;
  setFilter?: any;
  weight?: string;
  onPress?: () => void;
  selected?: boolean;
  variant?: 'primary' | 'underline' | 'bookmark' | 'secondary' | "validation";
  cross?: boolean;
  star?: boolean;
  style?: any;
};

const variants = {
  primary: {
    backgroundColor: Colors.Basic300,
    backgroundColorSelected: Colors.Basic500,
    paddingBottom: 12,
    borderRadius: 5,
  },
  bookmark: {
    backgroundColor: Colors.White,
    backgroundColorSelected: Colors.Transparent,
    paddingBottom: 12,
    borderRadius: 5,
  },
  underline: {
    backgroundColor: Colors.Transparent,
    backgroundColorSelected: Colors.Transparent,
    paddingBottom: 2,
    borderRadius: 0,
  },
  secondary: {
    backgroundColor: Colors.White,
    backgroundColorSelected: Colors.Basic300,
    paddingBottom: 12,
    borderRadius: 5,
  },
  validation: {
    backgroundColor: Colors.Basic300,
    backgroundColorSelected: Colors.Green500,
    paddingBottom: 12,
    borderRadius: 5,
  },
};

const HorizontalMenuButton: FC<HorizontalMenuButtonProps> = ({
  icon = 'future',
  noIcon = false,
  weight,
  selected = false,
  variant = 'primary',
  cross = false,
  star = false,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.Button,
          {
            backgroundColor: 
            props.backgroundColor ? props.backgroundColor :
            (!selected
              ? variants[variant].backgroundColor
              : props.selectedColor
              ? props.selectedColor
              : variants[variant].backgroundColorSelected)
          },
          {
            paddingBottom: variants[variant].paddingBottom,
            borderBottomWidth: variant === 'underline' && selected ? 2 : 0,
            borderRadius: variants[variant].borderRadius,
          },
          {
            marginRight: variant === 'underline' ? 0 : 16,
          },
          props.style,
        ]}>
        {!noIcon && variant === 'bookmark' && (
          <View style={{alignSelf: 'center', paddingRight: 10}}>
            <SvgIcon icon={icon} fill={props.fill} />
          </View>
        )}

        <Typography weight={selected ? 'ExtraBold' : 'SemiBold'}>
          {props.name}
          {star && <Typography color={Colors.Danger}>*</Typography>}
          {props.count && '(' + props.count + ')'}
        </Typography>

        {cross && (
          <View style={{alignSelf: 'center', paddingLeft: 10}}>
            <SvgIcon icon="crossBig" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    textAlignVertical: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default HorizontalMenuButton;