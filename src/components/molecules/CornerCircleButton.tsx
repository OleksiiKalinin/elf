import { View, TouchableOpacity, Platform, GestureResponderEvent } from 'react-native';
import SvgIcon from '../atoms/SvgIcon';
import { BOTTOM_TABS_HEIGHT } from '../organismes/BottomTabs';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const CornerCircleButton: React.FC<{ onPress: (event: GestureResponderEvent) => void }> = ({ onPress }) => {
    const { isTabbarVisible } = useTypedSelector(s => s.general);

    return (
        <View style={{
            position: Platform.select({
                native: 'absolute',
                web: 'fixed'
            }),
            bottom: Platform.select({
                native: 20,
                web: 20 + (isTabbarVisible ? BOTTOM_TABS_HEIGHT : 0),
            }),
            right: 20,
        }}>
            <TouchableOpacity onPress={onPress}>
                <SvgIcon icon='addBig' />
            </TouchableOpacity>
        </View>
    );
};

export default CornerCircleButton;