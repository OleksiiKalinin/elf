import { Image as RNImage, LayoutChangeEvent, Modal, Platform, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import RNCarousel, { ICarouselInstance, TCarouselProps } from 'react-native-reanimated-carousel';
import { FC, useEffect, useRef, useState } from 'react';
import Colors from '../../colors/Colors';
import { PartialBy } from '../../hooks/types';
import ImageViewer from './ImageViewer';

type Props = {
    hidePagination?: boolean,
    innerPagination?: boolean,
    disableImageViewer?: boolean,
    getCurrentIndex?: (index: number) => void,
    stylePaginationContainer?: StyleProp<ViewStyle>,
    stylePaginationDotContainer?: StyleProp<ViewStyle>,
    stylePaginationDot?: StyleProp<ViewStyle>,
} & PartialBy<TCarouselProps, 'width'>;

const Carousel: FC<Props> = ({
    hidePagination = false,
    innerPagination = false,
    disableImageViewer = false,
    stylePaginationContainer,
    stylePaginationDot,
    stylePaginationDotContainer,
    getCurrentIndex,
    ...props
}) => {
    const [itemWidth, setItemWidth] = useState<number>(1);
    const [currIndex, setCurrIndex] = useState<number>(0);
    const [viewerIndex, setViewerIndex] = useState<number | undefined>(undefined);
    const scrolling = useRef<boolean>(false);
    const pressedIn = useRef<{ pageX: number, pageY: number } | null>(null);
    const ref = useRef<ICarouselInstance>(null);

    useEffect(() => {
        getCurrentIndex?.(currIndex);
    }, [currIndex]);

    const onLayout = (event: LayoutChangeEvent) => {
        setItemWidth(event.nativeEvent.layout.width)
    }

    useEffect(() => {
        scrolling.current = false;
        pressedIn.current = null;
    }, [viewerIndex]);

    return (
        <View onLayout={onLayout} style={{ position: 'relative' }}>
            <TouchableOpacity
                activeOpacity={1}
                {...(Platform.OS !== 'web' ? {
                    onPressIn: (e) => {
                        console.log('onPressIn', e.nativeEvent);
                        const { pageX, pageY } = e.nativeEvent;
                        pressedIn.current = { pageX, pageY };
                    },
                    onPressOut: (e) => {
                        const { pageX: pageOutX, pageY: pageOutY } = e.nativeEvent;
                        console.log('onPressOut - in', pressedIn.current);
                        console.log('onPressOut - out', { pageOutX, pageOutY });
                        if (pressedIn.current) {
                            const {pageX, pageY} = pressedIn.current;
                            // if (Math.abs(pageX - pageOutX) < 6 && Math.abs(pageY - pageOutY) < 6) {
                            //     setViewerIndex(currIndex);
                            // }
                            if (scrolling.current) {
                                scrolling.current = false;
                            } else {
                                setViewerIndex(currIndex);
                            }
                        }
                    },
                } : {
                    onPress: (e) => { 
                        console.log('onPress', e.nativeEvent);
                        setViewerIndex(currIndex)
                     },
                })}
            >
                <RNCarousel
                    onScrollBegin={(e: any) => {
                        console.log('onScrollBegin', e);
                        scrolling.current = true
                    }}
                    height={200}
                    width={itemWidth}
                    {...props as any}
                    ref={ref}
                    onSnapToItem={setCurrIndex}
                />
            </TouchableOpacity>
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
            {!disableImageViewer && <ImageViewer
                visible={viewerIndex !== undefined}
                close={() => setViewerIndex(undefined)}
                index={viewerIndex}
                data={props.data}
            />}
        </View>
    );
}

export default Carousel;