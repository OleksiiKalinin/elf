import { isArray } from 'lodash';
import { ComponentProps, forwardRef } from 'react';
import { View, ScrollView as ScrollViewNative, Platform } from 'react-native';

export type ScrollViewProps = ComponentProps<typeof ScrollViewNative> & {
    /** 
     * Only web
     * 
     * Will accept parent tag height as wrapper instead of window/document object 
     * */
    disableWindowScroll?: boolean,
}

export const ScrollView = forwardRef(({ disableWindowScroll = false, ...props }: ScrollViewProps, ref: any) => {
    const Component = Platform.select({
        web: disableWindowScroll || props.horizontal ? ScrollViewNative : (View as unknown as typeof ScrollViewNative),
        default: ScrollViewNative,
    })

    return (<Component
        ref={ref}
        showsVerticalScrollIndicator={Platform.OS === 'web'}
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
        {...props}
        {...(Platform.OS === 'web' && !(disableWindowScroll || props.horizontal) ? {
            style: [
                ...(isArray(props.style) ? props.style : [props.style]),
                ...(isArray(props.contentContainerStyle) ? props.contentContainerStyle : [props.contentContainerStyle]),
            ],
            contentContainerStyle: undefined
        } : {})}
    />);
});