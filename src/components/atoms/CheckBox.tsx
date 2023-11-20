import React, { ComponentProps, FC, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Check } from '@tamagui/lucide-icons';
import { Checkbox as TamaCheckBox } from 'tamagui';
import Colors from '../../colors/Colors';
import Typography from './Typography';

type Props = {
    leftTextView?: React.ReactNode,
    rightTextView?: React.ReactNode,
    leftText?: string,
    rightText?: string,
    removeSpaces?: boolean,
    hideCheckBox?: boolean,
}

const CheckBox: FC<ComponentProps<typeof TamaCheckBox> & Props> = ({ rightTextView, leftTextView, leftText, rightText, flexDirection, removeSpaces = false, hideCheckBox = false, checked, onCheckedChange, ...props }) => {
    const isFlexDirectionRow = !flexDirection || (flexDirection === 'row') || (flexDirection === 'row-reverse');

    return (
        <TouchableOpacity activeOpacity={.9} style={{ flexDirection: flexDirection || 'row' }} onPress={() => onCheckedChange?.(!checked)}>
            {(leftText || leftTextView) && <View style={{ flex: 1, ...(!removeSpaces ? (isFlexDirectionRow ? { marginRight: 12 } : { marginBottom: 12 }) : {}) }}>
                {leftText && <Typography variant='small'>{leftText}</Typography>}
                {leftTextView && leftTextView}
            </View>}
            {!hideCheckBox &&
                <TamaCheckBox
                    br='$1' bw='$1'
                    {...(checked ? {
                        borderColor: Colors.Basic900,
                        backgroundColor: Colors.Basic900
                    } : {
                        borderColor: Colors.Basic600,
                        backgroundColor: Colors.Basic100
                    })}
                    focusStyle={{ borderColor: 'none' }}
                    {...props}
                    checked={checked}
                >
                    <TamaCheckBox.Indicator>
                        <Check width='16' height='16' color={Colors.White} />
                    </TamaCheckBox.Indicator>
                </TamaCheckBox>
            }
            {(rightText || rightTextView) && <View style={{ flex: 1, ...(!removeSpaces ? (isFlexDirectionRow ? { marginLeft: 12 } : { marginTop: 12 }) : {}) }}>
                {rightText && <Typography variant='small'>{rightText}</Typography>}
                {rightTextView && rightTextView}
            </View>}
        </TouchableOpacity>
    );
};

export default CheckBox;
