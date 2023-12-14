import { View, TouchableOpacity, Platform, GestureResponderEvent } from 'react-native';
import SvgIcon from '../atoms/SvgIcon';
import { BOTTOM_TABS_HEIGHT } from '../organismes/BottomTabs';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const CornerCircleButton: React.FC<{ onPress: (event: GestureResponderEvent) => void }> = ({ onPress, ...props }) => {
    const { isTabbarVisible, windowSizes } = useTypedSelector(s => s.general);

    return (
        <View style={{
            position: Platform.select({
                native: 'absolute',
                web: 'fixed',
            }),
            bottom: Platform.select({
                native: 20,
                web: 20 + (isTabbarVisible ? BOTTOM_TABS_HEIGHT : 0),
            }),
            right: Platform.select({
                native: 20,
                web: 20 + (windowSizes.width > 768 ? (windowSizes.width - 768) / 2 : 0),
            }),
            zIndex: 1,
        }}>
            <TouchableOpacity onPress={onPress} {...props}>
                <SvgIcon icon='addBig' />
            </TouchableOpacity>
        </View>
    );
};

export default CornerCircleButton;