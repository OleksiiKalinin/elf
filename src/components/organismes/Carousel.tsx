import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import RNCarousel, { ICarouselInstance, TCarouselProps } from 'react-native-reanimated-carousel';
import { FC, useRef, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Colors from '../../colors/Colors';
import { PartialBy } from '../../hooks/types';

const Carousel: FC<
    {
        hidePagination?: boolean,
        innerPagination?: boolean,
        stylePaginationContainer?: StyleProp<ViewStyle>,
        stylePaginationDotContainer?: StyleProp<ViewStyle>,
        stylePaginationDot?: StyleProp<ViewStyle>,
    } &
    PartialBy<TCarouselProps, 'width'>
> = ({ hidePagination = false, innerPagination = false, stylePaginationContainer, stylePaginationDot, stylePaginationDotContainer, ...props }) => {
    const { windowSizes } = useTypedSelector(s => s.general);
    const [currIndex, setCurrIndex] = useState<number>(0);
    const ref = useRef<ICarouselInstance>(null);

    return (
        <View style={{ position: 'relative' }}>
            <RNCarousel
                ref={ref}
                height={200}
                scrollAnimationDuration={1000}
                onSnapToItem={setCurrIndex}
                {...props as any}
                width={props.width || windowSizes.width}
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
        </View>
    );
}

export default Carousel;