import React from 'react';
import Carousel from '../../components/organismes/Carousel';
import { Image } from 'tamagui';
import { Platform, View } from 'react-native';
import im1 from '../../assets/images/certificate.png';
import im2 from '../../assets/images/certificate1.png';
import im3 from '../../assets/images/certificate2.png';
import im4 from '../../assets/images/portfolio1.png';

const Demo4 = () => {
    return (
        <Carousel
            innerPagination
            data={[im4, im2, im1, im3]}
            renderItem={({ index, item }) => (
                <View style={{ flex: 1 }}>
                    <Image
                        //@ts-ignore
                        src={Platform.select({ native: item, web: item.src })}
                        height='100%'
                        width='auto'
                    />
                </View>
            )} />
    );
};

export default Demo4;