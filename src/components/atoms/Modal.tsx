import React, { ComponentProps, FC, useEffect, useRef, useState } from 'react';
import ScrollLock from './ScrollLock';
import { Platform, Modal as RNModal, StyleSheet, TouchableOpacity, View } from 'react-native';
import windowExists from '../../hooks/windowExists';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const MARGIN = 15;

/** Custom Modal with good web support, including support onClose event (web history back button, dismiss, native hardware back button, etc.) */
const Modal: FC<ComponentProps<typeof RNModal> & { onClose: () => void }> = ({ onClose, children, ...props }) => {
	const { windowSizes } = useTypedSelector(s => s.general);
	const [sizes, setSizes] = useState({ height: 0, width: 0 });
	const wasVisible = useRef<boolean>(false);

	const closeRequest = () => {
		onClose();
		if (Platform.OS === 'web' && windowExists()) {
			if (wasVisible.current) {
				window.history.back();
			} else {
				window.location.hash = '';
			}
		}
	}

	useEffect(() => {
		if (Platform.OS === 'web' && windowExists()) {
			if (props.visible) {
				wasVisible.current = true;

				window.location.hash = 'modal';
				window.addEventListener('popstate', onClose);

				return () => {
					window.removeEventListener('popstate', onClose);
				}
			} else {
				if (window.location.hash === '#modal') closeRequest();
			}
		}
	}, [props.visible]);

	return (
		<ScrollLock enabled={props.visible}>
			<RNModal
				animationType="fade"
				transparent
				{...props}
				onRequestClose={onClose}
				onDismiss={() => { }}
			>
				<Button
					variant='TouchableOpacity'
					activeOpacity={1}
					containerStyle={{ flex: 1 }}
					style={[StyleSheet.absoluteFill, { flex: 1, backgroundColor: Colors.Black50, zIndex: 1, cursor: 'default' }]}
					onPress={onClose}
				/>
				<View
					onLayout={({ nativeEvent: { layout } }) => {
						const { height, width } = layout;
						setSizes({ height, width });
					}}
					pointerEvents='box-none'
					style={{
						margin: MARGIN,
						zIndex: 2,
						position: 'absolute',
						maxHeight: '100%',
						maxWidth: '100%',
						top: windowSizes.height / 2 - MARGIN - (sizes.height > 0 ? sizes.height / 2 : sizes.height),
						left: windowSizes.width / 2 - MARGIN - (sizes.width > 0 ? sizes.width / 2 : sizes.width),
					}}
				>
					{children}
				</View>
			</RNModal>
		</ScrollLock>
	);
};

export default Modal;