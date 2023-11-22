import { ComponentProps, FC } from 'react';
import { Label, RadioGroup as TamaRadioGroup, XStack } from 'tamagui';
import Typography from './Typography';
import Colors from '../../colors/Colors';

const Item: FC<ComponentProps<typeof TamaRadioGroup.Item> & {
    label?: string,
    hideSpace?: boolean,
    spaceProps?: React.ComponentProps<typeof XStack>
    containerProps?: React.ComponentProps<typeof XStack>
}> = ({ label, hideSpace = false, spaceProps, containerProps, ...props }) => {
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
};

const RadioGroup: FC<ComponentProps<typeof TamaRadioGroup>> & { Item: typeof Item } = (props) => {
    return <TamaRadioGroup {...props} />;
};

RadioGroup.Item = Item;

export default RadioGroup;