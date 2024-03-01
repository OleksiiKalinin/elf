import React, { FC } from 'react';
import { ScrollView } from './ScrollView';
import { StyleProp, View, ViewStyle } from 'react-native';
import Button, { ButtonPropsOriginal } from './Button';
import Colors from '../../colors/Colors';
import { isArray } from 'lodash';

type Props<T = number> = {
    data: { id: T, name: string, disabled?: boolean }[],
    onSelect: (id: T | null) => void,
    selected: T | null,
    contentContainerStyle?: StyleProp<ViewStyle>,
    buttonProps?: (props: { selected: boolean }) => ButtonPropsOriginal,
};

function HorizontalButtonsSelector<T = number>({ data, selected, onSelect, contentContainerStyle, buttonProps }: Props<T>) {
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
            {data.map(({ id, name, disabled }) => {
                const props = buttonProps?.({ selected: selected === id });
                return (
                    <Button
                        size='medium'
                        fullwidth={false}
                        variant={selected === id ? 'secondarySelected' : 'secondary'}
                        contentWeight={selected === id ? 'Bold' : 'SemiBold'}
                        contentVariant='h5'
                        borderRadius={4}
                        disabled={disabled}
                        {...props}
                        style={[
                            {
                                marginRight: 19,
                                paddingVertical: 6,
                                paddingHorizontal: 8,
                            },
                            ...(isArray(props?.style) ? props?.style : [props?.style])
                        ]}
                        onPress={() => onSelect(disabled || selected === id ? null : id)}
                    >
                        {name}
                    </Button>
                )
            })}
        </ScrollView>
    );
};

export default HorizontalButtonsSelector;