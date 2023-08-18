import React, { ComponentProps, FC } from 'react';
import { Check } from '@tamagui/lucide-icons';
import { Checkbox as TamaCheckBox, useTheme } from 'tamagui';

const CheckBox: FC<ComponentProps<typeof TamaCheckBox>> = (props) => {
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
                <Check width='16' height='16' />
            </TamaCheckBox.Indicator>
        </TamaCheckBox>
    );
};

export default CheckBox;
