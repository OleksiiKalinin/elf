import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, StyleProp, StyleSheet } from 'react-native';
import Colors from '../../colors/Colors';
import { Button as TamaButton, Spinner } from 'tamagui';
import Typography, { TypographyProps } from '../atoms/Typography';
import SvgIcon from '../atoms/SvgIcon';
import { Separator } from 'tamagui';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isArray } from 'lodash';

type VariantType = 'primary' | 'transparent' | 'secondary' | 'secondarySelected' | 'light' | 'info' | 'info_alter' | 'text' | 'disabled' | 'active' | 'white';
type Sizes = 'small' | 'medium' | 'large';

export type ButtonPropsOriginal = {
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
  activeOpacity?: number,
  stickyBottom?: boolean,
  size?: Sizes,
} & Omit<React.ComponentProps<typeof TamaButton>, 'size'>;

export type ButtonPropsTouchableOpacity = {
  variant: 'TouchableOpacity',
} & React.ComponentProps<typeof TouchableOpacity>;

export type ButtonPropsGeneral = ButtonPropsOriginal | ButtonPropsTouchableOpacity;

const variants: { [k in VariantType]: {
  activeColor: string,
  disabledColor: string,
  disabledContentColor: string,
  contentColor: string,
  hoverColor: string,
} } = {
  primary: {
    activeColor: Colors.Basic900,
    disabledColor: Colors.Basic600,
    disabledContentColor: Colors.Basic100,
    contentColor: Colors.Basic100,
    hoverColor: Colors.Basic800,
  },
  secondary: {
    activeColor: Colors.Basic400,
    disabledColor: Colors.Basic300,
    disabledContentColor: Colors.Basic500,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Basic300,
  },
  secondarySelected: {
    activeColor: Colors.Basic500,
    disabledColor: Colors.Basic300,
    disabledContentColor: Colors.Basic500,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Basic400,
  },
  light: {
    activeColor: Colors.Basic200,
    disabledColor: Colors.Basic200,
    disabledContentColor: Colors.Basic900,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Basic100,
  },
  white: {
    activeColor: Colors.White,
    disabledColor: Colors.White,
    disabledContentColor: Colors.Basic900,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Basic200,
  },
  info: {
    activeColor: Colors.Sea200,
    disabledColor: 'transparent',
    disabledContentColor: Colors.Basic900,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Sea300,
  },
  info_alter: {
    activeColor: Colors.Sea300,
    disabledColor: 'transparent',
    disabledContentColor: Colors.Basic900,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Sea200,
  },
  text: {
    activeColor: 'transparent',
    disabledColor: 'transparent',
    disabledContentColor: Colors.Basic600,
    contentColor: Colors.Basic600,
    hoverColor: Colors.Basic200,
  },
  transparent: {
    activeColor: 'transparent',
    disabledColor: 'transparent',
    disabledContentColor: Colors.White,
    contentColor: Colors.White,
    hoverColor: Colors.Black30,
  },
  disabled: {
    activeColor: Colors.Basic400,
    disabledColor: Colors.Basic400,
    disabledContentColor: Colors.White,
    contentColor: Colors.White,
    hoverColor: Colors.Basic300,
  },
  active: {
    activeColor: Colors.Basic300,
    disabledColor: Colors.Basic400,
    disabledContentColor: Colors.Basic900,
    contentColor: Colors.Basic900,
    hoverColor: Colors.Basic200,
  },
}

const sizes: { [k in Sizes]: number } = {
  small: 30,
  medium: 44,
  large: 50,
}

const Button: React.FC<ButtonPropsGeneral> = (props) => {

  if (props.variant === 'TouchableOpacity') {
    return (
      <TouchableOpacity
        {...props}
        style={[
          {
            cursor: 'pointer',
          },
          ...(isArray(props.style) ? props.style : [props.style])
        ]}
      />
    );
  }

  const {
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
    activeOpacity = 0.8,
    ...rest
  } = props;

  return (
    <>
      {borderTop && <Separator borderColor={Colors.Basic300} alignSelf="stretch" />}
      <TamaButton
        hoverStyle={{
          bg: hoverColor || variants[variant].hoverColor,
          borderBottomColor: props.borderBottomColor,
          // opacity: activeOpacity + 0.2,
        }}
        pressStyle={{
          bg: hoverColor || variants[variant].hoverColor,
          opacity: activeOpacity
        }}
        height={props.h ?? (sizes[size] + (arrowRight ? 8 : 0))}
        width={props.w ?? (fullwidth ? '100%' : undefined)}
        borderRadius={0}
        bg={props.bg || props.backgroundColor || (props.disabled ? variants[variant].disabledColor : variants[variant].activeColor)}
        icon={props.disabled && withLoading ? <Spinner size='large' /> : undefined}
        iconAfter={arrowRight ? <SvgIcon icon='arrowRightSmall' /> : undefined}
        focusStyle={{ borderColor: 'none' }}
        {...(stickyBottom && Platform.OS === 'web') ? {
          position: 'sticky' as any,
          bottom: 0
        } : {}}
        {...rest}
      >
        {!!children && (
          <Typography
            variant={contentVariant}
            weight={contentWeight}
            color={contentColor || (props.disabled ? variants[variant].disabledContentColor : variants[variant].contentColor)}
            {...(arrowRight ? { style: { flex: 1, textAlign: 'left', width: '100%'} } : {style: { width: props.w || undefined as any}})}
          >
            {children}
          </Typography>
        )}
      </TamaButton>
      {borderBottom && <Separator borderColor={Colors.Basic300} alignSelf="stretch" />}
    </>
  );
};

const styles = StyleSheet.create({

});

export default Button;