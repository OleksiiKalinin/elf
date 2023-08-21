import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, View, Platform, Dimensions } from 'react-native';
import Button from '../molecules/Button';
import Colors from '../../colors/Colors';
import Typography from '../atoms/Typography';
// import { SwipeablePanel as Panel } from 'rn-swipeable-panel';
import { SwipeablePanel as Panel } from '../../../node_modules_modified/rn-swipeable-panel/src'//../../node_modules_modified/rn-swipeable-panel/dist';
import { platform } from 'os';
import { Sheet } from 'tamagui';

const BAR_HEIGHT = 20;

type GeneralProps = {
    children?: React.ReactNode;
    closeButton?: boolean;
    title?: string;
    subTitle?: string;
    backgroundColor?: string;
    onClose: () => void;
    isActive: boolean;
    hideBar?: boolean;
    buttons?: (React.ComponentProps<typeof Button> & { noCloseAction?: boolean })[];
};

export type SwipeablePanelProps = GeneralProps //& React.ComponentProps<typeof Panel>;
export type SwipeablePanelNoControlProps = Omit<SwipeablePanelProps, "isActive" | "onClose">;

const SwipeablePanel: React.FC<SwipeablePanelProps> = (props) => {
    const { buttons, title, children, subTitle, hideBar = false, onClose, isActive } = props;
    const [height, setHeight] = useState<number>(0);
    const contentExists = (!!buttons || !!title || !!children || !!subTitle);

    useEffect(() => {
        const handler = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose();
            return true;
        });

        return () => {
            handler.remove();
        }
    }, [isActive]);

    useEffect(() => {
        if (!contentExists) setHeight(0);
    }, [props]);

    return (
        <>
            <View
                onLayout={e => {
                    if (contentExists) {
                        const windowHeight = Dimensions.get('window').height;
                        setHeight((e.nativeEvent.layout.height / (windowHeight) + (hideBar ? 0 : BAR_HEIGHT / windowHeight)) * 100);
                    }
                }}
                style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    top: -100000,
                    visibility: 'hidden',
                }}>
                <Content {...props} />
            </View>
            <Sheet
                modal
                open={isActive && !!height}
                onOpenChange={onClose}
                snapPoints={[Math.min(height, 100)]}
                dismissOnSnapToBottom
            >
                {!hideBar && <Sheet.Handle h={4} bg={Colors.White} opacity={1} mx='45%' my={8} />}
                <Sheet.Overlay />
                <Sheet.Frame br={0} userSelect='none'>
                    <Sheet.ScrollView>
                        <Content {...props} />
                    </Sheet.ScrollView>
                </Sheet.Frame>
            </Sheet>
        </>
    );
};

const Content = (props: GeneralProps) => {
    const { buttons, title, children, subTitle, hideBar = false, onClose, isActive, closeButton } = props;

    return (<>
        {title && (
            <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
                {title && <Typography variant="h5" style={{ textAlign: 'center' }} weight="Bold">{title}</Typography>}
                {subTitle && <Typography style={{ marginTop: 12 }}>{subTitle}</Typography>}
            </View>
        )}
        <View>
            {children}
            {buttons?.map(
                ({
                    children,
                    borderTop = true,
                    contentWeight = 'SemiBold',
                    contentVariant = 'h5',
                    variant = 'text',
                    onPress = () => { },
                    contentColor = Colors.Basic900,
                    noCloseAction,
                    ...propsBtn
                }, i) => (
                    <Button
                        key={i}
                        {...{ borderTop, contentWeight, contentVariant, variant, contentColor }}
                        onPress={e => {
                            onPress?.(e);
                            !noCloseAction && onClose();
                        }}
                        {...propsBtn}
                    >
                        {children}
                    </Button>
                ),
            )}
            {closeButton && (
                <Button
                    borderTop
                    contentWeight="SemiBold"
                    contentVariant="h5"
                    onPress={onClose}
                    variant="text"
                >
                    Anuluj
                </Button>
            )}
        </View>
    </>)
};

export default SwipeablePanel;