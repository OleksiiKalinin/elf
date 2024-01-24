import { isArray } from 'lodash';
import { View, ScrollView as ScrollViewNative, Platform } from 'react-native';

type Props = React.ComponentProps<typeof ScrollViewNative> & {
    /** disableWindowScroll will accept parent height as wrapper instead of window/document object */
    disableWindowScroll?: boolean,
}

export function ScrollView({ disableWindowScroll = false, ...props }: Props) {
    const Component = Platform.select({
        web: disableWindowScroll || props.horizontal ? ScrollViewNative : (View as unknown as typeof ScrollViewNative),
        default: ScrollViewNative,
    })

    return (<Component
        showsVerticalScrollIndicator={Platform.OS === 'web'}
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
        {...props}
        {...(Platform.OS === 'web' && (!disableWindowScroll || !props.horizontal) ? {
            style: [
                ...(isArray(props.style) ? props.style : [props.style]),
                ...(isArray(props.contentContainerStyle) ? props.contentContainerStyle : [props.contentContainerStyle]),
            ],
            contentContainerStyle: undefined
        } : {})}
    />);
}