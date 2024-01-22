import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
// import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import Colors from '../../colors/Colors';
// import Typography from '../../atoms/Typography/Typography';
// import AnimatedColorView from 'react-native-animated-colors';
import { Button as TamaButton, Spinner } from 'tamagui';
import Typography, { TypographyProps } from '../atoms/Typography';
import { ArrowRight } from '@tamagui/lucide-icons';
import SvgIcon from '../atoms/SvgIcon';
import { Separator } from 'tamagui';
// import SvgIcon, { IconTypes } from '../SvgIcon/SvgIcon';

type VariantType = 'TouchableOpacity' | 'primary' | 'secondary' | 'secondarySelected' | 'light' | 'info' | 'info_alter' | 'text' | 'disabled' | 'active' | 'white';

type ButtonProps = {
  variant?: VariantType,
  contentColor?: string,
  hoverColor?: string,
  contentWeight?: TypographyProps['weight'],
  contentVariant?: TypographyProps['variant'],
  withLoading?: boolean,
  fullwidth?: boolean,
  borderTop?: boolean,
  borderBottom?: boolean,
  arrowRight?: boolean,
  stickyBottom?: boolean,
  size?: 'small' | 'medium' | 'large',
} & Omit<React.ComponentProps<typeof TamaButton>, 'size'>;

const variants: { [k in VariantType]: {
  activeColor: string,
  disabledColor: string,
  contentColor: string,
  hoverColor: string,
} } = {
  TouchableOpacity: {
    activeColor: 'none',
    disabledColor: 'none',
    contentColor: Colors.Basic900,
    hoverColor: 'none',
  },
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
  secondarySelected: {
    activeColor: Colors.Basic500,
    disabledColor: Colors.Basic500,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Basic400,
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

const sizes: { [k in NonNullable<ButtonProps['size']>]: number } = {
  small: 30,
  medium: 44,
  large: 50,
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  contentWeight = 'CAPS',
  contentVariant = 'main',
  contentColor = null,
  hoverColor = null,
  withLoading = false,
  fullwidth = true,
  arrowRight,
  borderTop,
  borderBottom,
  stickyBottom,
  size = 'large',
  ...props
}) => {

  return (
    <>
      {borderTop && <Separator borderColor={Colors.Basic300} alignSelf="stretch" />}
      <TamaButton
        hoverStyle={{
          bg: hoverColor || variants[variant].hoverColor,
          borderBottomColor: props.borderBottomColor,
          opacity: .7
        }}
        pressStyle={{
          bg: hoverColor || variants[variant].hoverColor,
          opacity: .5
        }}
        height={props.h ?? variant === 'TouchableOpacity' ? 'auto' : (sizes[size] + (arrowRight ? 8 : 0))}
        width={props.w ?? variant === 'TouchableOpacity' ? 'auto' : (fullwidth ? '100%' : undefined)}
        borderRadius={0}
        bg={props.bg || props.backgroundColor || props.disabled ? variants[variant].disabledColor : variants[variant].activeColor}
        icon={props.disabled && withLoading ? <Spinner size='large' /> : undefined}
        iconAfter={arrowRight ? <SvgIcon icon='arrowRightSmall' /> : undefined}
        focusStyle={{ borderColor: 'none' }}
        {...(stickyBottom && Platform.OS === 'web') ? {
          position: 'sticky' as any,
          bottom: 0
        } : {}}
        {...(variant === 'TouchableOpacity') ? {
          paddingHorizontal: 0,
          space: '$-0',
        } : {}}
        {...props}
      >
        {!!children && (variant !== 'TouchableOpacity' ?
          <Typography
            variant={contentVariant}
            weight={contentWeight}
            color={contentColor || variants[variant].contentColor}
            {...(arrowRight ? { style: { flex: 1, textAlign: 'left' } } : {})}
          >
            {children}
          </Typography>
          :
          children
        )}
      </TamaButton>
      {borderBottom && <Separator borderColor={Colors.Basic300} alignSelf="stretch" />}
    </>
  );
};

const styles = StyleSheet.create({

});

export default Button;