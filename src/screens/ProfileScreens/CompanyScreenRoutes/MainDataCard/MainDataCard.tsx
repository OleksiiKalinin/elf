import React, { FC } from 'react';
import { View, Dimensions, Image, TouchableOpacity, Linking } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SvgUri } from 'react-native-svg';
import Colors from '../../../../colors/Colors';
import Typography from '../../../../components/atoms/Typography/Typography';
import Carousel from '../../../../components/organisms/Carousel/Carousel';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { CompanyDataType } from '../../../../store/reducers/types';

const screenWidth = Dimensions.get('window').width;

const ImagesPortfolio: any[] = [
    require('../../../../assets/images/company.png'),
    require('../../../../assets/images/company.png'),
    require('../../../../assets/images/company.png'),
];

const MainDataCard: FC<CompanyDataType> = (companyData) => {
    const { jobIndustries } = useTypedSelector(state => state.general);
    const currentIndustry = jobIndustries.find(curr => curr.id === companyData?.job_industry) || null;

    return (
        <>
            <Carousel
                data={companyData?.id ? [
                    ...(companyData.logo ? [companyData.logo.path] : []),
                    ...(companyData.photos?.length ? companyData.photos.sort((a, b) => Number(a.order) - Number(b.order)).map(el => el.path) : []),
                ] : ImagesPortfolio}
                inactiveSlideScale={1}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: Colors.Basic300, alignItems: 'center' }}>
                        <Image source={companyData?.id ? { uri: item } : item} style={{ height: screenWidth / 1.5, width: screenWidth }} />
                    </View>
                )}
            />
            <View style={{ marginTop: 30, paddingHorizontal: 19 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                    <View style={{ width: 34, height: 34, position: 'relative' }}>
                        <View style={{ position: 'absolute' }}>
                            <SkeletonPlaceholder borderRadius={17}>
                                <View style={{ width: 34, height: 34 }} />
                            </SkeletonPlaceholder>
                        </View>
                        {currentIndustry?.icon && <SvgUri width={34} height={34} uri={currentIndustry?.icon} />}
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <Typography variant='h5' weight='SemiBold'>{currentIndustry?.name}</Typography>
                    </View>
                </View>
                <Typography size={20} weight='Bold'>{companyData?.short_name}</Typography>
                <Typography color={Colors.Basic600}>{companyData?.other_address?.formattedAddress}</Typography>
                {/* <TouchableOpacity style={{marginVertical: 10}} onPress={() => companyData.video?.path && Linking.openURL(companyData.video?.path)}>
                    <Typography color={Colors.Blue500} style={{textDecorationLine: 'underline'}}>Oglądaj film o firmie</Typography>
                </TouchableOpacity> */}
            </View>
        </>
    );
};

export default MainDataCard;