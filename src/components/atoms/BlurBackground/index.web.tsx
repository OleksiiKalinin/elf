import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurBackgroundProps } from '.';
import Colors from '../../../colors/Colors';

const BlurBackground: FC<BlurBackgroundProps> = ({ blurAmount = 4 }) => {
	return (
		<View style={[{
			//@ts-ignore
			WebkitBackdropFilter: `blur(${blurAmount}px)`,
			backdropFilter: `blur(${blurAmount}px)`,
			background: Colors.White10,
			filter: 'blur(0)',
			zIndex: 0,
		}, styles.Blur]} />
	);
};

const styles = StyleSheet.create({
	Blur: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	}
})

export default BlurBackground;