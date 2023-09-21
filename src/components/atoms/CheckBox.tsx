import React, { ComponentProps, FC } from 'react';
import { View, StyleSheetProperties } from 'react-native';
import { Check } from '@tamagui/lucide-icons';
import { Checkbox as TamaCheckBox, useTheme } from 'tamagui';
import Colors from '../../colors/Colors';
import Typography from './Typography';

type Props = {
    leftTextView?: React.ReactNode,
    rightTextView?: React.ReactNode,
    leftText?: string,
    rightText?: string,
}

const CheckBox: FC<ComponentProps<typeof TamaCheckBox> & Props> = ({ rightTextView, leftTextView, leftText, rightText, flexDirection, ...props }) => {
    const theme = useTheme();

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
        <View style={{ flexDirection }}>
            {leftTextView}
            <View style={{ flex: 1 }}>
                <Typography style={{ marginRight: 12 }} variant='small'>{leftText}</Typography>
            </View>
            <TamaCheckBox
                br='$1' bw='$1'
                {...(props.checked ? {
                    borderColor: '$color12',
                    backgroundColor: '$color12'
                } : {
                    borderColor: '$color8',
                    backgroundColor: '$color1'
                })}

                {...props}
            >
                <TamaCheckBox.Indicator>
                    <Check width='16' height='16' color={Colors.White} />
                </TamaCheckBox.Indicator>
            </TamaCheckBox>
            <View style={{ flex: 1 }}>
                <Typography style={{ marginLeft: 12 }} variant='small'>{rightText}</Typography>
            </View>
            {rightTextView}
        </View>
    );
};

export default CheckBox;
