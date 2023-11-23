import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, View, Platform, Dimensions, StatusBar } from 'react-native';
import Button from '../molecules/Button';
import Colors from '../../colors/Colors';
import Typography from '../atoms/Typography';
import { Sheet } from 'tamagui';
import { SwipeablePanelParamsType } from '../../hooks/useSwipeablePanelParams';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import BottomSheet from '@gorhom/bottom-sheet';
import useRouter from '../../hooks/useRouter';

const BAR_HEIGHT = 20;

type CloseActionType = 'history-replace&props-null' | 'props-null' | 'none';

export type SwipeablePanelProps = {
	children?: React.ReactNode;
	closeButton?: boolean;
	title?: string;
	subTitle?: string;
	backgroundColor?: string;
	hideBar?: boolean;
	buttons?: (React.ComponentProps<typeof Button> & { closeAction?: CloseActionType })[];
	mode?: SwipeablePanelParamsType['subViewMode'],
	defaultCloseAction?: CloseActionType,
};

const SwipeablePanel: React.FC = () => {
	const { backToRemoveParams } = useRouter();
	const { swipeablePanelProps, windowSizes } = useTypedSelector(s => s.general);
	const { setSwipeablePanelProps } = useActions();
	const { buttons, title, children, subTitle, hideBar = false, mode = 'options', defaultCloseAction = 'history-replace&props-null' } = swipeablePanelProps || {};
	const [height, setHeight] = useState<number>(0);

	const close = (closeAction: CloseActionType | undefined = defaultCloseAction) => {
		if (closeAction === 'history-replace&props-null') {
			backToRemoveParams();
			return;
		}
		if (closeAction === 'props-null') {
			setSwipeablePanelProps(null);
			return;
		}
		if (closeAction === 'none') {
			return;
		}
	}

	useEffect(() => {
		const style = window.document?.body?.style;

		if (!!swipeablePanelProps) {
			if (style) style.overflowY = mode === 'options' ? 'auto' : 'hidden';
			const handler = BackHandler.addEventListener('hardwareBackPress', () => {
				close();
				return true;
			});

			return () => {
				handler.remove();
			}
		} else {
			if (style) style.overflowY = 'auto';
		}
	}, [swipeablePanelProps]);

	return (
		<>
			{mode !== 'screen' && <View
				//to count inner height first
				onLayout={e => {
					if (!!buttons?.length || !!title || !!children || !!subTitle) {
						const windowHeight = windowSizes.height;
						setHeight((e.nativeEvent.layout.height / (windowHeight - (StatusBar.currentHeight || 0)) + (hideBar ? 0 : BAR_HEIGHT / windowHeight)) * 100);
					} else {
						setHeight(0);
					}
				}}
				//hide
				style={{
					position: 'absolute',
					display: 'flex',
					flexDirection: 'column',
					top: -100000,
					left: -100000,
					visibility: 'hidden',
				}}>
				<Content {...swipeablePanelProps} close={close} />
			</View>}
			{Platform.OS === 'web' && <View
				//workaround - wrapper to provide context like redux
				style={{
					position: Platform.select({ web: 'fixed', native: 'absolute' }),
					top: mode === 'screen' && !!swipeablePanelProps ? 0 : '100%',
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(255,255,255,.5)'
				}}
			>
				<Sheet
					//CAN provide context like redux 
					open={mode === 'screen' && !!swipeablePanelProps}
					snapPoints={[100]}
					disableDrag
				>
					<Sheet.Frame br={0} userSelect='none' maxWidth={768}>
						<Sheet.ScrollView>
							{mode === 'screen' && <Content {...swipeablePanelProps} close={close} />}
						</Sheet.ScrollView>
					</Sheet.Frame>
				</Sheet>
			</View>}
			{(Platform.OS === 'android' || Platform.OS === 'ios') && mode === 'screen' && !!swipeablePanelProps &&
				<BottomSheet
					index={0}
					snapPoints={['100%']}
					handleComponent={null}
					enableContentPanningGesture={false}
				>
					<Content {...swipeablePanelProps} close={close} />
				</BottomSheet>
			}
			<Sheet
				modal //can NOT provide context like redux 
				open={mode === 'options' && !!swipeablePanelProps && !!height}
				onOpenChange={() => close()}
				snapPoints={[Math.min(height, 100)]}
				dismissOnSnapToBottom={false}
				dismissOnOverlayPress={false}
				disableDrag
			>
				{!hideBar && <Sheet.Handle h={4} bg={Colors.White} opacity={1} mx='45%' my={8} />}
				{mode === 'options' && !!swipeablePanelProps && !!height && <Sheet.Overlay />}
				<Sheet.Frame br={0} userSelect='none' style={{ maxWidth: 768, alignSelf: 'center' }}>
					{mode === 'options' && <Content {...swipeablePanelProps} close={close} />}
				</Sheet.Frame>
			</Sheet>
		</>
	);
};

const Content = (props: SwipeablePanelProps & { close: (closeAction?: CloseActionType) => void }) => {
	const { buttons, title, children, subTitle, closeButton = false, close, mode } = props;

	return (<>
		{title && (
			<View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
				{title && <Typography variant="h5" style={{ textAlign: 'center' }} weight="Bold">{title}</Typography>}
				{subTitle && <Typography style={{ marginTop: 12 }}>{subTitle}</Typography>}
			</View>
		)}
		<View style={mode === 'screen' ? { flex: 1, maxWidth: 768 } : {}}>
			{children}
			{buttons?.map(
				({
					children,
					borderTop = true,
					contentWeight = 'SemiBold',
					contentVariant = 'h5',
					variant = 'text',
					onPress = () => { },
					contentColor = Colors.Basic900,
					closeAction,
					...propsBtn
				}, i) => (
					<Button
						key={i}
						{...{ borderTop, contentWeight, contentVariant, variant, contentColor }}
						onPress={e => {
							onPress?.(e);
							close(closeAction);
						}}
						{...propsBtn}
					>
						{children}
					</Button>
				),
			)}
			{closeButton && (
				<Button
					borderTop
					contentWeight="SemiBold"
					contentVariant="h5"
					onPress={() => close()}
					variant="text"
				>
					Anuluj
				</Button>
			)}
		</View>
	</>)
};

export default SwipeablePanel;