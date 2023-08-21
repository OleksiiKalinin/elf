import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
// import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import Colors from '../../colors/Colors';
// import Typography from '../../atoms/Typography/Typography';
// import AnimatedColorView from 'react-native-animated-colors';
import { Button as TamaButton, Spinner } from 'tamagui';
import Typography from '../atoms/Typography';
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
    children?: React.ReactNode,
} & React.ComponentProps<typeof TamaButton>;

const variants: { [k in VariantType]: {
    activeColor: string,
    disabledColor: string,
    contentColor: string
} } = {
    primary: {
        activeColor: Colors.Basic900,
        disabledColor: Colors.Basic600,
        contentColor: Colors.Basic100
    },
    secondary: {
        activeColor: Colors.Basic400,
        disabledColor: Colors.Basic400,
        contentColor: Colors.Basic900
    },
    light: {
        activeColor: Colors.Basic200,
        disabledColor: Colors.Basic200,
        contentColor: Colors.Basic900
    },
    white: {
        activeColor: Colors.White,
        disabledColor: Colors.White,
        contentColor: Colors.Basic900
    },
    info: {
        activeColor: Colors.Sea200,
        disabledColor: 'transparent',
        contentColor: Colors.Basic900
    },
    info_alter: {
        activeColor: Colors.Sea300,
        disabledColor: 'transparent',
        contentColor: Colors.Basic900
    },
    text: {
        activeColor: 'transparent',
        disabledColor: 'transparent',
        contentColor: Colors.Basic600
    },
    disabled: {
        activeColor: Colors.Basic400,
        disabledColor: Colors.Basic400,
        contentColor: Colors.White
    },
    active: {
        activeColor: Colors.Basic300,
        disabledColor: Colors.Basic400,
        contentColor: Colors.Basic900
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
    borderTop,
    ...props
}) => {

    return (
        <TamaButton
            hoverStyle={{bg: Colors.Basic800}} pressStyle={{bg: Colors.Basic900, opacity: .5}}
            height={props.h ?? 50}
            borderRadius={0}
            bg={props.bg || props.backgroundColor || variants[variant].activeColor}
            {...(borderTop ? { style: { borderTopWidth: 1, borderTopColor: Colors.Basic300 } } : {})}
            icon={withLoading ? <Spinner size='large' /> : undefined}
            width={props.w ?? (fullwidth ? '100%' : undefined)}
            {...props}
        >
            {!!children && <Typography variant={contentVariant} weight={contentWeight} color={contentColor || variants[variant].contentColor}>{children}</Typography>}
        </TamaButton>
    );
};

const styles = StyleSheet.create({
    
});

export default Button;