import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
// import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import Colors from '../../colors/Colors';
// import Typography from '../../atoms/Typography/Typography';
// import AnimatedColorView from 'react-native-animated-colors';
import { Button as TamaButton, Spinner } from 'tamagui';
import Typography from '../atoms/Typography';
import { ArrowRight } from '@tamagui/lucide-icons';
import SvgIcon from '../atoms/SvgIcon';
import { Separator } from 'tamagui';
// import SvgIcon, { IconTypes } from '../SvgIcon/SvgIcon';

type VariantType = 'primary' | 'secondary' | 'light' | 'info' | 'info_alter' | 'text' | 'disabled' | 'active' | 'white';

type ButtonProps = {
  variant?: VariantType,
  contentColor?: string,
  contentWeight?: 'CAPS' | 'Black' | 'ExtraBold' | 'Bold' | 'SemiBold' | 'Medium' | 'Regular' | 'Light',
  contentVariant?: 'small' | 'main' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
  withLoading?: boolean,
  fullwidth?: boolean,
  borderTop?: boolean,
  borderBottom?: boolean,
  children?: React.ReactNode,
  arrowRight?: boolean,
} & React.ComponentProps<typeof TamaButton>;

const variants: { [k in VariantType]: {
  activeColor: string,
  disabledColor: string,
  contentColor: string,
  hoverColor: string,
} } = {
  primary: {
    activeColor: Colors.Basic900,
    disabledColor: Colors.Basic600,
    contentColor: Colors.Basic100,
    hoverColor: Colors.Basic800,
  },
  secondary: {
    activeColor: Colors.Basic400,
    disabledColor: Colors.Basic400,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Basic300,
  },
  light: {
    activeColor: Colors.Basic200,
    disabledColor: Colors.Basic200,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Basic100,
  },
  white: {
    activeColor: Colors.White,
    disabledColor: Colors.White,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Basic200,
  },
  info: {
    activeColor: Colors.Sea200,
    disabledColor: 'transparent',
    contentColor: Colors.Basic900,
    hoverColor: Colors.Sea300,
  },
  info_alter: {
    activeColor: Colors.Sea300,
    disabledColor: 'transparent',
    contentColor: Colors.Basic900,
    hoverColor: Colors.Sea200,
  },
  text: {
    activeColor: 'transparent',
    disabledColor: 'transparent',
    contentColor: Colors.Basic600,
    hoverColor: Colors.Basic200,
  },
  disabled: {
    activeColor: Colors.Basic400,
    disabledColor: Colors.Basic400,
    contentColor: Colors.White,
    hoverColor: Colors.Basic300,
  },
  active: {
    activeColor: Colors.Basic300,
    disabledColor: Colors.Basic400,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Basic200,
  },
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  contentWeight = 'CAPS',
  contentVariant = 'main',
  color = null,
  contentColor = null,
  withLoading = false,
  fullwidth = true,
  arrowRight,
  borderTop,
  borderBottom,
  ...props
}) => {

  return (
    <>
      {borderTop && <Separator borderColor={Colors.Basic300} alignSelf="stretch" />}
      <TamaButton
        hoverStyle={{ bg: variants[variant].hoverColor }} pressStyle={{ bg: variants[variant].hoverColor, opacity: .5 }}
        height={props.h ?? (arrowRight ? 58 : 50)}
        borderRadius={0}
        bg={props.bg || props.backgroundColor || props.disabled ? variants[variant].disabledColor : variants[variant].activeColor}
        icon={withLoading ? <Spinner size='large' /> : undefined}
        iconAfter={arrowRight ? <SvgIcon icon='arrowRightSmall' /> : undefined}
        width={props.w ?? (fullwidth ? '100%' : undefined)}
        focusStyle={{ borderColor: 'none' }}
        {...props}
      >
        {!!children &&
          <Typography
            variant={contentVariant}
            weight={contentWeight}
            color={contentColor || variants[variant].contentColor}
            {...(arrowRight ? { style: { flex: 1, textAlign: 'left' } } : {})}
          >
            {children}
          </Typography>}
      </TamaButton>
      {borderBottom && <Separator borderColor={Colors.Basic300} alignSelf="stretch" />}
    </>
  );
};

const styles = StyleSheet.create({

});

export default Button;