import React, { FC } from 'react';
import { ScrollView } from './ScrollView';
import { StyleProp, View, ViewStyle } from 'react-native';
import Button, { ButtonPropsOriginal } from './Button';
import Colors from '../../colors/Colors';
import { isArray } from 'lodash';

type Props = {
    data: { id: number, name: string }[],
    onSelect: (id: number | null) => void,
    selected: number | null,
    contentContainerStyle?: StyleProp<ViewStyle>,
    buttonProps?: (props: { selected: boolean }) => ButtonPropsOriginal,
};

const HorizontalButtonsSelector: FC<Props> = ({ data, selected, onSelect, contentContainerStyle, buttonProps }) => {
    return (
        <ScrollView
            horizontal
            contentContainerStyle={[
                {
                    paddingLeft: 19,
                },
                ...(isArray(contentContainerStyle) ? contentContainerStyle : [contentContainerStyle])
            ]}
        >
            {data.map(({ id, name }) => {
                const props = buttonProps?.({ selected: selected === id });
                return (
                    <Button
                        size='medium'
                        fullwidth={false}
                        variant={selected === id ? 'secondarySelected' : 'secondary'}
                        contentWeight={selected === id ? 'Bold' : 'SemiBold'}
                        contentVariant='h5'
                        contentColor={Colors.Basic900}
                        borderRadius={4}
                        {...props}
                        style={[
                            {
                                marginRight: 19,
                                paddingVertical: 6,
                                paddingHorizontal: 8,
                            },
                            ...(isArray(props?.style) ? props?.style : [props?.style])
                        ]}
                        onPress={() => onSelect(selected === id ? null : id)}
                    >
                        {name}
                    </Button>
                )
            })}
        </ScrollView>
    );
};

export default HorizontalButtonsSelector;