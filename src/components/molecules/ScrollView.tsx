import { View, ScrollView, Platform } from 'react-native';

type Props = React.ComponentProps<typeof ScrollView> & {
    disableWindowScroll?: boolean
}

export function ScreenScrollView({ disableWindowScroll = false, ...props }: Props) {
    const Component = Platform.select({
        web: disableWindowScroll ? ScrollView : (View as unknown as typeof ScrollView),
        default: ScrollView,
    })
    return <Component {...props} />
}