import { View, ScrollView as ScrollViewNative, Platform } from 'react-native';
import { LegacyRef } from 'react';

type Props = React.ComponentProps<typeof ScrollViewNative> & {
    /** disableWindowScroll will accept parent height as wrapper instead of window/document object */
    disableWindowScroll?: boolean,
    ref?: LegacyRef<ScrollViewNative>
}

export function ScrollView({ disableWindowScroll = false, ...props }: Props) {
    const Component = Platform.select({
        web: disableWindowScroll ? ScrollViewNative : (View as unknown as typeof ScrollViewNative),
        default: ScrollViewNative,
    })
    return <Component {...props} />
}