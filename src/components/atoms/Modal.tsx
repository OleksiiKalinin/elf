import React, { ComponentProps, FC, useEffect, useRef, useState } from 'react';
import ScrollLock from './ScrollLock';
import { Platform, Modal as RNModal, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import windowExists from '../../hooks/windowExists';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import useShadow from '../../hooks/useShadow';
import { isArray } from 'lodash';

const MARGIN = 15;

/** Custom Modal with good web support, including support onClose event (web history back button, dismiss, native hardware back button, etc.) */
const Modal: FC<ComponentProps<typeof RNModal> & { onClose: () => void, withoutUrl?: boolean, resetStyles?: boolean, contentContainerStyle?: StyleProp<ViewStyle> }> = ({ onClose, withoutUrl = false, children, resetStyles = false, contentContainerStyle, ...props }) => {
	const { windowSizes } = useTypedSelector(s => s.general);
	const [sizes, setSizes] = useState({ height: 0, width: 0 });
	const wasVisible = useRef<boolean>(false);

	const closeRequest = () => {
		onClose();
		if (Platform.OS === 'web' && windowExists() && !withoutUrl) {
			// if (wasVisible.current) {
			// 	window.history.back();
			// } else {
			// 	window.location.hash = '';
			// }
			window.location.hash = '';
		}
	}

	useEffect(() => {
		if (Platform.OS === 'web' && windowExists() && !withoutUrl) {
			if (props.visible) {
				wasVisible.current = true;

				window.location.hash = 'modal';
				window.addEventListener('popstate', onClose);
			} else {
				if (window.location.hash === '#modal') closeRequest();
			}

			return () => {
				window.removeEventListener('popstate', onClose);
			}
		}
	}, [props.visible]);

	return (
		<ScrollLock enabled={props.visible}>
			<RNModal
				animationType="fade"
				transparent
				onRequestClose={closeRequest}
				onDismiss={closeRequest}
				{...props}
			>
				{Platform.OS === 'web' ?
					<Button
						variant='TouchableOpacity'
						activeOpacity={1}
						containerStyle={{ flex: 1 }}
						style={{ flex: 1, backgroundColor: Colors.Black50, cursor: 'default' }}
						onPress={closeRequest}
					/>
					:
					<TouchableOpacity
						activeOpacity={1}
						style={{ flex: 1, backgroundColor: Colors.Black50 }}
						onPress={closeRequest}
					/>
				}
				<View
					onLayout={({ nativeEvent: { layout } }) => {
						const { height, width } = layout;
						setSizes({ height, width });
					}}
					style={[{
						margin: MARGIN,
						position: 'absolute',
						maxHeight: '100%',
						maxWidth: '100%',
						visibility: sizes.height ? 'visible' : 'hidden',
						top: windowSizes.height / 2 - MARGIN - (sizes.height > 0 ? sizes.height / 2 : sizes.height),
						left: windowSizes.width / 2 - MARGIN - (sizes.width > 0 ? sizes.width / 2 : sizes.width),
					}, resetStyles ? {} : {
						backgroundColor: Colors.White,
						borderRadius: 4,
						maxWidth: 450,
						...useShadow(15),
					},
					...(isArray(contentContainerStyle) ? contentContainerStyle : [contentContainerStyle]),
					]}
				>
					{children}
				</View>
			</RNModal>
		</ScrollLock>
	);
};

export default Modal;