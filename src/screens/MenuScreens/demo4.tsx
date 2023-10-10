import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import im1 from '../../assets/images/certificate.png';
import im2 from '../../assets/images/certificate1.png';
import im3 from '../../assets/images/certificate2.png';
import { Image } from 'tamagui';

function CarouselDemo() {
    const width = Dimensions.get('window').width;
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        //@ts-ignore
        if (window !== undefined) {
            setShow(true);
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {show && <Carousel
                loop
                width={width}
                height={width / 2}
                data={[im1, im2, im3]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index, item }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                        <Image
                            src={item.src}
                            height={item.height}
                            width={item.width}
                        />
                    </View>
                )}
            />}
        </View>
    );
}

export default CarouselDemo;