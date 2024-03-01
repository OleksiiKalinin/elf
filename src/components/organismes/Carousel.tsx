import { LayoutChangeEvent, Platform, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import RNCarousel, { ICarouselInstance, TCarouselProps } from 'react-native-reanimated-carousel';
import { FC, useEffect, useRef, useState } from 'react';
import Colors from '../../colors/Colors';
import { PartialBy } from '../../hooks/types';
import ImageViewer from './ImageViewer';
import Button from '../molecules/Button';
import SvgIcon from '../atoms/SvgIcon';

type Props = {
    hidePagination?: boolean,
    hideArrows?: boolean,
    innerPagination?: boolean,
    disableImageViewer?: boolean,
    getCurrentIndex?: (index: number) => void,
    stylePaginationContainer?: StyleProp<ViewStyle>,
    stylePaginationDotContainer?: StyleProp<ViewStyle>,
    stylePaginationDot?: StyleProp<ViewStyle>,
} & PartialBy<TCarouselProps, 'width'>;

const Carousel: FC<Props> = ({
    hidePagination = false,
    hideArrows = false,
    innerPagination = false,
    disableImageViewer = false,
    stylePaginationContainer,
    stylePaginationDot,
    stylePaginationDotContainer,
    getCurrentIndex,
    data,
    ...props
}) => {
    const [itemWidth, setItemWidth] = useState<number>(1);
    const [currIndex, setCurrIndex] = useState<number>(0);
    const [isOpenedViewer, setIsOpenedViewer] = useState<boolean>(false);
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
            <View style={{ position: 'relative', flex: 1 }}>
                <Button
                    variant='TouchableOpacity'
                    activeOpacity={1}
                    onPress={() => {
                        if (Platform.OS !== 'web' || !scrolling.current) {
                            setIsOpenedViewer(true);
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
                        data={data}
                        ref={ref}
                        onSnapToItem={setCurrIndex}
                    />
                </Button>
                {!hideArrows && Platform.OS === 'web' && <>
                    <Button
                        variant='TouchableOpacity'
                        onPress={ref.current?.prev}
                        containerStyle={styles.ButtonLeftWrapper}
                        style={styles.ButtonLeft}
                    >
                        <SvgIcon icon='arrowLeft' fill={Colors.White} />
                    </Button>
                    <Button
                        variant='TouchableOpacity'
                        onPress={ref.current?.next}
                        containerStyle={styles.ButtonRightWrapper}
                        style={styles.ButtonRight}
                    >
                        <SvgIcon icon='arrowRight' fill={Colors.White} />
                    </Button>
                </>}
            </View>
            {!hidePagination && (
                <View
                    style={[
                        styles.PaginationContainer,
                        innerPagination && { position: 'absolute', bottom: 0, left: 0 },
                        stylePaginationContainer
                    ]}
                >
                    {data.map((_, index) => <Button
                        variant='TouchableOpacity'
                        onPress={() => ref.current?.scrollTo({ index, animated: index !== data.length - 1, onFinished: () => setCurrIndex(index) })}
                        containerStyle={[{
                            padding: 2.5,
                            opacity: currIndex === index ? 1 : 0.6
                        }, stylePaginationDotContainer]}
                    >
                        <View style={[styles.PaginationDot, stylePaginationDot]} />
                    </Button>)}
                </View>
            )}
            {!disableImageViewer && <ImageViewer
                visible={isOpenedViewer}
                close={() => setIsOpenedViewer(false)}
                index={currIndex}
                onChange={(index) => ref.current?.scrollTo({ index, animated: false, onFinished: () => setCurrIndex(index) })}
                data={data}
                hideArrows={hideArrows}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    PaginationContainer: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    PaginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.Basic700,
    },
    ButtonLeftWrapper: {
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: [{ translateY: -20.5 }],
        zIndex: 10,
    },
    ButtonLeft: {
        padding: 10,
        paddingRight: 13,
        backgroundColor: Colors.Black20,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    ButtonRightWrapper: {
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: [{ translateY: -20.5 }],
        zIndex: 10,
    },
    ButtonRight: {
        padding: 10,
        paddingLeft: 13,
        backgroundColor: Colors.Black20,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
})

export default Carousel;