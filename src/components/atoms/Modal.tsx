import React, { ComponentProps, FC, useEffect, useRef, useState } from 'react';
import ScrollLock from './ScrollLock';
import { Platform, Modal as RNModal, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import windowExists from '../../hooks/windowExists';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import useShadow from '../../hooks/useShadow';
import { isArray } from 'lodash';
import { useRouter } from 'solito/router';

const MARGIN = 15;

type ModalProps = {
	onClose: () => void,
	withoutUrl?: boolean,
	resetStyles?: boolean,
	disableDefaultWrapper?: boolean,
	contentContainerStyle?: StyleProp<ViewStyle>
} & Omit<ComponentProps<typeof RNModal>, 'onDismiss'>;

/** Custom Modal with good web support
 * @todo back event bugs
 */
const Modal: FC<ModalProps> = ({ onClose, withoutUrl = true, children, resetStyles = false, disableDefaultWrapper = false, contentContainerStyle, ...props }) => {
	const { windowSizes } = useTypedSelector(s => s.general);
	const [sizes, setSizes] = useState({ height: 0, width: 0 });
	const wasVisible = useRef<boolean>(false);
	const router = useRouter();

	const closeRequest = () => {
		onClose();
		if (Platform.OS === 'web' && windowExists() && !withoutUrl) {
			if (wasVisible.current) {
				window.history.back();
			} else {
				const uri = window.location.toString();
				if (uri.indexOf("#") > 0) {
					const clean_uri = uri.substring(0, uri.indexOf("#"));
					router.replace(clean_uri, undefined, { shallow: true });
				}
			}
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
				{...props}
				onDismiss={undefined}
			>
				{disableDefaultWrapper ? children : <>
					{Platform.OS === 'web' ?
						<Button
							variant='TouchableOpacity'
							activeOpacity={1}
							containerStyle={{ flex: 1 }}
							style={{ flex: 1, backgroundColor: Colors.Black50, cursor: 'default' }}
							onPress={onClose}
						/>
						:
						<TouchableOpacity
							activeOpacity={1}
							style={{ flex: 1, backgroundColor: Colors.Black50 }}
							onPress={onClose}
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
							opacity: sizes.height ? 1 : 0,
							top: windowSizes.height / 2 - MARGIN - (sizes.height > 0 ? sizes.height / 2 : sizes.height),
							left: windowSizes.width / 2 - MARGIN - (sizes.width > 0 ? sizes.width / 2 : sizes.width),
						}, resetStyles ? {} : {
							backgroundColor: Colors.White,
							borderRadius: 4,
							overflow: 'hidden',
							maxWidth: 450,
							...useShadow(15),
						},
						...(isArray(contentContainerStyle) ? contentContainerStyle : [contentContainerStyle]),
						]}
					>
						{children}
					</View>
				</>}
			</RNModal>
		</ScrollLock>
	);
};

export default Modal;