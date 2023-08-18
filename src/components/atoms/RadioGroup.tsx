import React, { useEffect, useState } from 'react';
import { Label, RadioGroup as TamaRadioGroup, XStack } from 'tamagui';
import Typography from './Typography';
import Colors from '../../colors/Colors';

/** example:
 * 
        <RadioGroup value={value} onValueChange={setValue}>
            <RadioGroup.Item value="2" label="Second value" containerProps={{flexDirection: 'row-reverse'}} />
            <RadioGroup.Item value="3" label="Third value" />
            <RadioGroup.Item value="4" label="Fourth value" />
        </RadioGroup>
 */

const RadioGroup:
    React.FC<React.ComponentProps<typeof TamaRadioGroup>>
    &
    {
        Item: React.FC<
            React.ComponentProps<typeof TamaRadioGroup.Item>
            &
            {
                label?: string,
                hideSpace?: boolean,
                spaceProps?: React.ComponentProps<typeof XStack>
                containerProps?: React.ComponentProps<typeof XStack>
            }
        >
    } = (props) => {
        return <TamaRadioGroup {...props} />;
    };
// } = ({value: v, ...props}) => {
//     const [value, setValue] = useState<string | undefined>(v);

//     useEffect(() => {
//         setValue(v);
//     }, [v]);

//     return <TamaRadioGroup value={value} onValueChange={setValue} {...props} />;
// };

RadioGroup.Item = ({ label, hideSpace = false, spaceProps, containerProps, ...props }) => {
    const id = `radiogroup-${props.value}`

    return (
        <XStack alignItems="center" {...containerProps}>
            <TamaRadioGroup.Item id={id}
                borderWidth={2} borderColor={Colors.Basic600}
                hoverStyle={{ borderColor: Colors.Basic900 }}
                focusStyle={{ borderColor: Colors.Basic900 }}
                {...props}
            >
                <TamaRadioGroup.Indicator backgroundColor={Colors.Basic900} height='70%' width='70%' />
            </TamaRadioGroup.Item>

            {!!label && <Label htmlFor={id} flex={1} flexDirection={containerProps?.flexDirection}>
                {!hideSpace && <XStack width={10} {...spaceProps} />}
                <Typography style={{ width: '100%' }}>{label}</Typography>
            </Label>}
        </XStack>
    )
}

export default RadioGroup;