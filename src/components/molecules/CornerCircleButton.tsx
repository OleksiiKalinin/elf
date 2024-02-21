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
        }}>
            <Button
                variant='TouchableOpacity'
                onPress={onPress}
                style={{
                    width: 49,
                    height: 49,
                    borderRadius: 49 / 2,
                    ...useShadow(10)
                }}
            >
                <SvgIcon icon='addBig' />
            </Button>
        </View>
    );
};

export default CornerCircleButton;