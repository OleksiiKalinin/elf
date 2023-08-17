import { View, ScrollView as SV, Platform } from 'react-native';

type Props = React.ComponentProps<typeof SV> & {
    /** disableWindowScroll will accept parent height as wrapper */
    disableWindowScroll?: boolean
}

export function ScrollView({ disableWindowScroll = false, ...props }: Props) {
    const Component = Platform.select({
        web: disableWindowScroll ? SV : (View as unknown as typeof SV),
        default: SV,
    })
    return <Component {...props} />
}