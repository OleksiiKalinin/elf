import { Image as RNImage, LayoutChangeEvent, Modal, Platform, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import RNCarousel, { ICarouselInstance, TCarouselProps } from 'react-native-reanimated-carousel';
import { FC, useEffect, useRef, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Colors from '../../colors/Colors';
import { PartialBy } from '../../hooks/types';
// import ImageViewer from 'react-native-image-zoom-viewer';
import Typography from '../atoms/Typography';
import { Image } from 'tamagui';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Carousel: FC<
    {
        hidePagination?: boolean,
        innerPagination?: boolean,
        getCurrentIndex?: (index: number) => void,
        stylePaginationContainer?: StyleProp<ViewStyle>,
        stylePaginationDotContainer?: StyleProp<ViewStyle>,
        stylePaginationDot?: StyleProp<ViewStyle>,
    } &
    PartialBy<TCarouselProps, 'width'>
> = ({ hidePagination = false, innerPagination = false, stylePaginationContainer, stylePaginationDot, stylePaginationDotContainer, getCurrentIndex, ...props }) => {
    const { windowSizes } = useTypedSelector(s => s.general);
    const [itemWidth, setItemWidth] = useState<number>(1);
    const [currIndex, setCurrIndex] = useState<number>(0);
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);
    const ref = useRef<ICarouselInstance>(null);
    const [modalEnabled, setModalEnabled] = useState(true);

    useEffect(() => {
        getCurrentIndex?.(currIndex);
    }, [currIndex]);

    const onLayout = (event: LayoutChangeEvent) => {
        setItemWidth(event.nativeEvent.layout.width)
    }

    return (
        <View onLayout={onLayout} style={{ position: 'relative' }}>
            <RNCarousel
                height={200}
                width={itemWidth}
                scrollAnimationDuration={1000}
                {...props as any}
                ref={ref}
                renderItem={(...args) => (
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={() => setViewerIndex(args[0].index)}
                    >
                        {props.renderItem(...args)}
                    </TouchableOpacity>
                )}
                onSnapToItem={setCurrIndex}
            />
            {!hidePagination && <View style={[
                { width: '100%', paddingVertical: 5, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' },
                innerPagination && { position: 'absolute', bottom: 0, left: 0 },
                stylePaginationContainer
            ]}>
                {props.data.map((_, index) => <TouchableOpacity
                    onPress={() => ref.current?.scrollTo({ index, animated: true, onFinished: () => setCurrIndex(index) })}
                    style={[{
                        padding: 2.5,
                        opacity: currIndex === index ? 1 : 0.6
                    }, stylePaginationDotContainer]}
                >
                    <View
                        style={[{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: Colors.Basic700,
                        }, stylePaginationDot]}
                    />
                </TouchableOpacity>)}
            </View>}
            <Modal
                visible={viewerIndex !== null}
                transparent
                onRequestClose={() => setViewerIndex(null)}
            >
                <RNCarousel
                    data={props.data}
                    height={windowSizes.height || 300}
                    width={windowSizes.width || 1}
                    // enabled={false}
                    enabled={modalEnabled}
                    renderItem={({ index, item }) => {

                        return (
                            <View style={{ flex: 1, backgroundColor: Colors.Basic900 }}>
                                <TransformWrapper
                                    // disablePadding
                                    // maxPositionX={-100}
                                    onTransformed={(ref, state) => {
                                        if (ref.instance.bounds) {
                                            const { maxPositionX, minPositionX } = ref.instance.bounds
                                            const { positionX } = state;
                                            console.log(maxPositionX, positionX, minPositionX);

                                            setModalEnabled((positionX > maxPositionX) || (positionX < minPositionX))
                                        }
                                    }}
                                    initialScale={1} velocityAnimation={{ animationTime: 10 }} centerOnInit
                                >
                                    <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                        <RNImage
                                            source={{ uri: item.src }}
                                            resizeMode='contain'
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </TransformComponent>
                                </TransformWrapper>
                            </View>
                        )
                    }}
                />
                {/* <ImageViewer
                    index={Number(viewerIndex)}
                    enableSwipeDown
                    onSwipeDown={() => setViewerIndex(null)}
                    menuContext={{ saveToLocal: 'Pobierz', cancel: 'Anuluj' }}
                    renderIndicator={(index, amount) => !!amount && (amount > 1) ? (
                        <View style={{ position: 'absolute', right: 0, top: 0, alignItems: 'flex-end', padding: 10 }}>
                            <Typography color={Colors.White}>{index}{' / '}{amount}</Typography>
                        </View>
                    ) : <></>}
                    imageUrls={props.data.map(e => (typeof e === 'string' ? { url: e } : { url: '', props: { source: e } }))}
                /> */}
            </Modal>
        </View>
    );
}

export default Carousel;