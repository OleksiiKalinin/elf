import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, View, Platform } from 'react-native';
import Button from '../molecules/Button';
import Colors from '../../colors/Colors';
import Typography from '../atoms/Typography';
// import { SwipeablePanel as Panel } from 'rn-swipeable-panel';
import { SwipeablePanel as Panel } from '../../../node_modules_modified/rn-swipeable-panel/src'//../../node_modules_modified/rn-swipeable-panel/dist';
import { platform } from 'os';

type GeneralProps = {
    children?: React.ReactNode;
    closeButton?: boolean;
    title?: string;
    subTitle?: string;
    backgroundColor?: string;
    buttons?: (React.ComponentProps<typeof Button> & { noCloseAction?: boolean })[];
};

export type SwipeablePanelProps = GeneralProps & React.ComponentProps<typeof Panel>;
export type SwipeablePanelNoControlProps = Omit<SwipeablePanelProps, "isActive" | "onClose">;

const SwipeablePanel: React.FC<SwipeablePanelProps> = props => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        if (props.isActive) {
            if(Platform.OS === 'web') window.document.body.style.overflowY = 'hidden';
            setShow(true);
        } else {
            setTimeout(() => setShow(false), 100);
            if(Platform.OS === 'web') window.document.body.style.overflowY = 'auto';
        }
    }, [props.isActive]);

    return <>{show && <SwipeablePanelInner {...props} />}</>;
};

const SwipeablePanelInner: React.FC<SwipeablePanelProps> = props => {
    const [height, setHeight] = useState<number>(0);
    const [showHelper, setShowHelper] = useState<boolean>(true);

    useEffect(() => {
        const handler = BackHandler.addEventListener('hardwareBackPress', () => {
            props.onClose();
            return true;
        });

        return () => {
            handler.remove();
        }
    }, []);

    useEffect(() => {
        if (!!props.buttons || !!props.title || !!props.children || !!props.subTitle) setShowHelper(true);
    }, [props]);

    if (showHelper && props.onlySmall) {
        return (
            <View
                onLayout={e => {
                    setHeight(e.nativeEvent.layout.height);
                    setShowHelper(false);
                }}
                style={{
                    position: 'absolute',
                    top: 100000,
                    opacity: 0,
                }}>
                <Content {...props} />
            </View>
        );
    }

    return (
        <>
            <Panel
                fullWidth={props.fullWidth || true}
                closeOnTouchOutside={props.closeOnTouchOutside || true}
                style={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    backgroundColor: 'transparent',
                    shadowColor: 'transparent',
                }}
                barStyle={{ backgroundColor: Colors.White }}
                barContainerStyle={{ backgroundColor: 'transparent' }}
                // smallPanelHeight={(props.onlySmall ? height : 250)}
                smallPanelHeight={height}
                panelHeight={height}
                {...props}
            >
                <View
                    onLayout={e => setHeight(e.nativeEvent.layout.height)}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: props.backgroundColor || Colors.White,
                    }}>
                    <Content {...props} />
                </View>
            </Panel>
        </>
    );
};

const Content = (props: { onClose: () => void } & GeneralProps) => (<>
    {props.title && (
        <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
            {props.title && <Typography variant="h5" style={{ textAlign: 'center' }} weight="Bold">{props.title}</Typography>}
            {props.subTitle && <Typography style={{ marginTop: 12 }}>{props.subTitle}</Typography>}
        </View>
    )}
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {props.children}
        {props.buttons?.map(
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
                        !noCloseAction && props.onClose();
                    }}
                    {...propsBtn}
                >
                    {children}
                </Button>
            ),
        )}
        {props.closeButton && (
            <Button
                borderTop
                contentWeight="SemiBold"
                contentVariant="h5"
                onPress={props.onClose}
                variant="text"
            >
                Anuluj
            </Button>
        )}
    </View>
</>);

export default SwipeablePanel;