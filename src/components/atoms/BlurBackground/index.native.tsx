import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { BlurBackgroundProps } from '.';

const BlurBackground: FC<BlurBackgroundProps> = ({ blurAmount = 4 }) => {
	return (
		<BlurView
			blurType="light"
			blurAmount={blurAmount}
			style={styles.Blur}
		/>
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