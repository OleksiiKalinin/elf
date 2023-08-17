import React from 'react';
import { Text } from 'react-native';
import Colors from '../../../colors/Colors';

type TypographyProps = {
    children: React.ReactNode,
    variant?: 'small' | 'main' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
    weight?: 'CAPS' | 'Black' | 'ExtraBold' | 'Bold' | 'SemiBold' | 'Medium' | 'Regular' | 'Light'
    italic?: boolean,
    color?: string,
    size?: number,
    textAlign?: 'auto' | 'center' | 'justify' | 'left' | 'right',
} & React.ComponentProps<typeof Text>;

const sizes = {
    h1: 40,
    h2: 30,
    h3: 24,
    h4: 18,
    h5: 16,
    main: 14,
    small: 12,
}

const Typography: React.FC<TypographyProps> = ({
    variant = 'main', 
    weight = 'Medium', 
    textAlign = 'auto', 
    italic = false, 
    color = null, 
    size = null, 
    children,
    ...props
}) => {
    return (
        <Text {...props} style={[{
            fontFamily: `RedHatDisplay${weight !== 'CAPS' ? `-${weight}` : '-Bold'}${italic ? 'Italic' : ''}`,
            color: color || Colors.TextDark,
            fontStyle: italic ? 'italic' : 'normal',
            textTransform: weight === 'CAPS' ? 'uppercase' : 'none',
            fontSize: size || sizes[variant],
            textAlign
        }, props.style]}>
            {children}
        </Text>
    );
};

export default Typography;