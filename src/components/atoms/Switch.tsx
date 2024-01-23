// import React, { ComponentProps, FC } from 'react';
// import ToggleSwitch from 'toggle-switch-react-native';
// import Colors from '../../colors/Colors';


// type SwitchProps = {
//     // label?: string,
// } & ComponentProps<typeof ToggleSwitch>;

// const Switch: FC<SwitchProps> = ({...props}) => {
//     return (
//         <ToggleSwitch
//             onColor={props.offColor || props.disabled ? Colors.Basic600 : Colors.Basic900}
//             offColor={props.offColor || Colors.Basic400}
//             animationSpeed={props.animationSpeed || 200}
//             {...props} 
//         />
//     );
// };

// export default Switch;

import React, { ComponentProps, FC, useState } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Check } from '@tamagui/lucide-icons';
import { Switch as TamaSwitch } from 'tamagui';
import Colors from '../../colors/Colors';
import Typography from './Typography';
import Button from '../molecules/Button';

type Props = {
    leftTextView?: React.ReactNode,
    rightTextView?: React.ReactNode,
    leftText?: string,
    rightText?: string,
    removeSpaces?: boolean,
    containerStyle?: StyleProp<ViewStyle>
}

const Switch: FC<ComponentProps<typeof TamaSwitch> & Props> = ({ rightTextView, leftTextView, leftText, rightText, flexDirection, removeSpaces = false, checked, onCheckedChange, containerStyle, ...props }) => {
    const isFlexDirectionRow = !flexDirection || (flexDirection === 'row') || (flexDirection === 'row-reverse');

    return (
        <Button
            variant='TouchableOpacity'
            activeOpacity={.9}
            style={[{ flexDirection: flexDirection || 'row', alignItems: 'center' }, containerStyle]}
            onPress={() => onCheckedChange?.(!checked)}
        >
            {(leftText || leftTextView) && <View style={{ flex: 1, ...(!removeSpaces ? (isFlexDirectionRow ? { marginRight: 12 } : { marginBottom: 12 }) : {}) }}>
                {leftText && <Typography variant='small'>{leftText}</Typography>}
                {leftTextView && leftTextView}
            </View>}
            <TamaSwitch
                br={12.5} 
                bw='$1'
                size='$2.5'
                {...(checked ? {
                    borderColor: Colors.Basic900,
                    backgroundColor: Colors.Basic900
                } : {
                    borderColor: Colors.Basic600,
                    backgroundColor: Colors.Basic600
                })}
                focusStyle={{ borderColor: checked ? Colors.Basic900 : Colors.Basic600 }}
                {...props}
                checked={checked}
            >
                <TamaSwitch.Thumb backgroundColor={Colors.White} animation="quick" />
            </TamaSwitch>
            {(rightText || rightTextView) && <View style={{ flex: 1, ...(!removeSpaces ? (isFlexDirectionRow ? { marginLeft: 12 } : { marginTop: 12 }) : {}) }}>
                {rightText && <Typography variant='small'>{rightText}</Typography>}
                {rightTextView && rightTextView}
            </View>}
        </Button>
    );
};

export default Switch;
