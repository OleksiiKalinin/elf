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
    //@ts-ignore
    return <Component showsVerticalScrollIndicator={Platform.OS === 'web'} {...props} {...(Platform.OS === 'web' && !disableWindowScroll ? {style: {...props.style, ...props.contentContainerStyle}} : {})} />
}