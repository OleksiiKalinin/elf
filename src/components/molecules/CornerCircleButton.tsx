import { View, Platform, GestureResponderEvent } from 'react-native';
import SvgIcon from '../atoms/SvgIcon';
import { BOTTOM_TABS_HEIGHT } from '../organismes/BottomTabs';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Button from './Button';
import useShadow from '../../hooks/useShadow';
import { isArray } from 'lodash';

const CornerCircleButton: React.FC<{ onPress: ((event: GestureResponderEvent) => void) & (() => void) }> = ({ onPress }) => {
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
            width: 48,
            height: 48,
            borderRadius: 48 / 2,
            overflow: 'hidden',
            ...useShadow(6),
        }}>
            <Button
                variant='TouchableOpacity'
                onPress={onPress}
            >
                <SvgIcon icon='addBig' />
            </Button>
        </View>
    );
};

export default CornerCircleButton;