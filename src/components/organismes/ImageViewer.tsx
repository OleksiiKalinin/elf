import React, { FC, useEffect, useRef, useState } from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import RNCarousel from 'react-native-reanimated-carousel';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Colors from '../../colors/Colors';
import Modal from '../atoms/Modal';
import Typography from '../atoms/Typography';
import SvgIcon from '../atoms/SvgIcon';
import NativeImageViewer from './NativeImageViewer';

type Props = {
    close: () => void,
    visible: boolean,
    index?: number,
    data: any[]
}

const ImageViewer: FC<Props> = ({ close, visible, index = 0, data }) => {
    const { windowSizes } = useTypedSelector(s => s.general);
    const [currIndex, setCurrIndex] = useState<number>(index);
    const [colorTransparent, setColorTransparent] = useState<boolean>(false);
    const snapCloseRequested = useRef<boolean>(false);
    const [carouselEnabled, setCarouselEnabled] = useState(true);

    const closeOnSnapRequest = () => {
        if (snapCloseRequested.current) {
            close();
        }
    }

    useEffect(() => {
        snapCloseRequested.current = false;
        setCarouselEnabled(true);
        setColorTransparent(false);
    }, [visible]);

    useEffect(() => {
        setCurrIndex(index);
    }, [index]);

    const renderIndicator = (index: number, amount: number) => (
        <View style={styles.Indicator}>
            <Typography color={Colors.White}>{index}{' / '}{amount}</Typography>
        </View>
    );

    const CloseButton = (
        <TouchableOpacity
            onPress={close}
            style={styles.CloseButton}
        >
            <SvgIcon icon='closeX' fill={Colors.White} />
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            transparent
            onClose={close}
        >
            <View style={{ flex: 1, backgroundColor: colorTransparent ? Colors.Black50 : Colors.Basic900 }}>
                {Platform.OS === 'web' ?
                    <>
                        {data.length > 1 && renderIndicator(currIndex + 1, data.length)}
                        {CloseButton}
                        <RNCarousel
                            data={data}
                            onSnapToItem={setCurrIndex}
                            height={windowSizes.height || 1}
                            width={windowSizes.width || 1}
                            enabled={carouselEnabled}
                            loop={false}
                            defaultIndex={currIndex}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ flex: 1 }}>
                                        <TransformWrapper
                                            onPanningStop={closeOnSnapRequest}
                                            onZoomStop={closeOnSnapRequest}
                                            initialScale={1}
                                            onTransformed={(ref, state) => {
                                                if (ref.instance.bounds) {
                                                    const { maxPositionX, minPositionX, minPositionY } = ref.instance.bounds;
                                                    const { positionX, positionY, scale } = state;

                                                    snapCloseRequested.current = (
                                                        (positionY > 99 || positionY < minPositionY - 99) &&
                                                        (positionX >= -35 && positionX <= 35) &&
                                                        scale >= 1
                                                    );
                                                    setColorTransparent(snapCloseRequested.current);

                                                    setCarouselEnabled(
                                                        (positionX > maxPositionX || positionX < minPositionX) &&
                                                        !snapCloseRequested.current &&
                                                        scale >= 1
                                                    );
                                                }
                                            }}
                                        >
                                            <TransformComponent
                                                wrapperStyle={{ width: '100%', height: '100%' }}
                                                contentStyle={{ width: '100%', height: '100%', alignItems: 'center' }}
                                            >
                                                <Image
                                                    source={{ uri: typeof item === 'string' ? item : item.src }}
                                                    resizeMode='contain'
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </TransformComponent>
                                        </TransformWrapper>
                                    </View>
                                )
                            }}
                        />
                    </>
                    :
                    <NativeImageViewer
                        imageUrls={data.map(e => (typeof e === 'string' ? { url: e } : { url: '', props: { source: e } }))}
                        style={{
                            width: windowSizes.width,
                            height: windowSizes.height
                        }}
                        index={currIndex}
                        enableSwipeDown
                        onMove={p => setColorTransparent(p?.positionY ? (p.positionY > 105) : false)}
                        swipeDownThreshold={100}
                        backgroundColor='transparent'
                        onSwipeDown={close}
                        menuContext={{ saveToLocal: 'Pobierz', cancel: 'Anuluj' }}
                        renderIndicator={(index, amount) => !!index && !!amount && amount > 1 ? renderIndicator(index, amount) : <></>}
                        renderHeader={() => CloseButton}
                    />
                }
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    Indicator: {
        position: 'absolute',
        right: 0,
        top: 0,
        alignItems: 'flex-end',
        padding: 10,
        height: 44,
        justifyContent: 'center',
        zIndex: 10000,
        backgroundColor: Colors.Black20,
        borderBottomLeftRadius: 10
    },
    CloseButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
        backgroundColor: Colors.Black20,
        zIndex: 10000,
        borderBottomRightRadius: 10
    }
})

export default ImageViewer;