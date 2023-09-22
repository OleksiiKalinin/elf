import React, { ComponentProps, FC } from 'react';
import { View, StyleSheetProperties } from 'react-native';
import { Check } from '@tamagui/lucide-icons';
import { Label, Checkbox as TamaCheckBox, useTheme } from 'tamagui';
import Colors from '../../colors/Colors';
import Typography from './Typography';

type Props = {
    leftTextView?: React.ReactNode,
    rightTextView?: React.ReactNode,
    leftText?: string,
    rightText?: string,
    removeSpaces?: boolean,
}

const CheckBox: FC<ComponentProps<typeof TamaCheckBox> & Props> = ({ rightTextView, leftTextView, leftText, rightText, flexDirection, removeSpaces = false, ...props }) => {
    const isFlexDirectionRow = !flexDirection || (flexDirection === 'row') || (flexDirection === 'row-reverse');

    return (
        // <TamaCheckBox
        //     style={[{ flex: 1 }, props.style]}
        //     leftTextStyle={{
        //         color: Colors.Basic900,
        //         fontSize: 16,
        //         fontWeight: '600',
        //     }}
        //     rightTextStyle={{
        //         color: Colors.Basic900,
        //         fontSize: 16,
        //         fontWeight: '600',
        //     }}
        //     checkBoxColor={Colors.Basic600}
        //     checkedCheckBoxColor={Colors.Basic900}
        //     {...props}
        // />
        <View style={{ flexDirection: flexDirection || 'row' }}>
            {(leftText || leftTextView) && <Label htmlFor={'CheckBox'} style={{ height: 'auto', flex: 1, lineHeight: 12, ...(!removeSpaces ? (isFlexDirectionRow ? { marginRight: 12 } : { marginBottom: 12 }) : {}) }}>
                {leftText && <Typography variant='small'>{leftText}</Typography>}
                {leftTextView && leftTextView}
            </Label>}
            <TamaCheckBox
                br='$1' bw='$1'
                {...(props.checked ? {
                    borderColor: '$color12',
                    backgroundColor: '$color12'
                } : {
                    borderColor: '$color8',
                    backgroundColor: '$color1'
                })}
                id='CheckBox'
                {...props}
            >
                <TamaCheckBox.Indicator>
                    <Check width='16' height='16' color={Colors.White} />
                </TamaCheckBox.Indicator>
            </TamaCheckBox>
            {(rightText || rightTextView) && <Label htmlFor={'CheckBox'} style={{ height: 'auto', flex: 1, lineHeight: 12, ...(!removeSpaces ? (isFlexDirectionRow ? { marginLeft: 12 } : { marginTop: 12 }) : {}) }}>
                {rightText && <Typography variant='small'>{rightText}</Typography>}
                {rightTextView && rightTextView}
            </Label>}
        </View>
    );
};

export default CheckBox;
