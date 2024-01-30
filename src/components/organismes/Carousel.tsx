import { LayoutChangeEvent, Platform, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import RNCarousel, { ICarouselInstance, TCarouselProps } from 'react-native-reanimated-carousel';
import { FC, useEffect, useRef, useState } from 'react';
import Colors from '../../colors/Colors';
import { PartialBy } from '../../hooks/types';
import ImageViewer from './ImageViewer';
import Button from '../molecules/Button';

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
    const ref = useRef<ICarouselInstance>(null);

    useEffect(() => {
        getCurrentIndex?.(currIndex);
    }, [currIndex]);

    const onLayout = (event: LayoutChangeEvent) => {
        setItemWidth(event.nativeEvent.layout.width || 1);
    };

    return (
        <View onLayout={onLayout} style={{ position: 'relative' }}>
            <Button
                variant='TouchableOpacity'
                activeOpacity={1}
                onPress={() => {
                    if (Platform.OS !== 'web' || !scrolling.current) {
                        setViewerIndex(currIndex);
                    } else {
                        scrolling.current = false;
                    }
                }}
            >
                <RNCarousel
                    onScrollBegin={() => scrolling.current = true}
                    onScrollEnd={() => scrolling.current = false}
                    height={200}
                    width={itemWidth}
                    {...props as any}
                    ref={ref}
                    onSnapToItem={setCurrIndex}
                />
            </Button>
            {!hidePagination && <View style={[
                { width: '100%', paddingVertical: 5, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' },
                innerPagination && { position: 'absolute', bottom: 0, left: 0 },
                stylePaginationContainer
            ]}>
                {props.data.map((_, index) => <Button
                    variant='TouchableOpacity'
                    onPress={() => ref.current?.scrollTo({ index, animated: true, onFinished: () => setCurrIndex(index) })}
                    containerStyle={[{
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
                </Button>)}
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