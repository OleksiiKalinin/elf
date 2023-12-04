import React, { FC, useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { MediaFileType, MediaSelectorProps } from '.';
import { useActions } from '../../../hooks/useActions';
import Typography from '../../atoms/Typography';
import { MenuStackParamList } from '../../../navigators/MenuNavigator';
import { createParam } from 'solito';
import useRouter from '../../../hooks/useRouter';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop, type Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Colors from '../../../colors/Colors';
import Button from '../../molecules/Button';

const { useParam } = createParam<NonNullable<MenuStackParamList['default']['MainScreen']>>();

const MediaSelector: FC<MediaSelectorProps> = ({
	type,
	multiple = false,
	selectionLimit = 20,
	crop = false,
	initialSelected,
	cropResolution,
	imageCompressionSettings,
	videoCompressionSettings,
	minSizeToCompress = 20971520,
	maxAllowedFileSize = 104857600,
	compressionProgress,
	callback,
	render,
}) => {
	const [subView] = useParam('subView');
	const { setSwipeablePanelProps } = useActions();
	const router = useRouter();
	const [files, setFiles] = useState<MediaFileType[]>();
	const [cropModal, setCropModal] = useState(false);
	const [errorModal, setErrorModal] = useState<string | null>();
	const [cropData, setCropData] = useState<Crop>({
		unit: '%',
		x: 25,
		y: 25,
		width: 50,
		height: 50,
	});
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (files) {
			console.log(files);
			console.log(type);
			console.log(multiple);
			if (type === 'image') {
				if (!multiple && crop) {
					setCropModal(true);
				} else if (!multiple) {

				} else {
					callback(files);
				}
			};
		};
	}, [files]);

	useEffect(() => {
		setSwipeablePanelProps((() => {
			if (subView === 'options') return {
				title: 'Co robimy tym razem?',
				closeButton: true,
				buttons: [
					{
						children: 'Wybierz z dysku',
						onPress: () => handleFilePick('device'),
					},
					{
						children: 'Aparat',
						onPress: () => handleFilePick('camera'),
					},
				],
			}
			return null;
		})());
	}, [subView]);

	const processImages = async (files: File[]) => {
		const base64Array = [];

		for (const file of files) {
			try {
				if (file.type.startsWith('image/')) {
					const base64Data = await convertToBase64(file);
					base64Array.push({ mime: file.type, path: base64Data, name: file.name });
				} else {
					return setErrorModal(`Niepoprawny format. Możesz wybrać tylko pliku graficzne.`);
				};
			} catch (error) {
				return error;
			};
		};

		return base64Array;
	};

	const convertToBase64 = (file: File) => {
		return new Promise((resolve) => {
			const reader = new FileReader();

			reader.onload = () => {
				const base64Data = reader.result?.toString() || "";
				resolve(base64Data);
			};

			reader.readAsDataURL(file);
		});
	};

	const handleFilePick = (source: 'device' | 'camera') => {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = 'image/*';
		fileInput.multiple = multiple;
		if (source === 'device') {
			fileInput.capture = 'environment';
		};

		fileInput.addEventListener('change', (event) => {
			const files = (event.target as any)?.files;
			if (multiple && files.length > selectionLimit) {
				setErrorModal(`Maksymalna liczba plików to ${selectionLimit}`);
			} else {
				processImages(files)
					.then((base64Array) => {
						setFiles(base64Array as MediaFileType[]);
					})
					.catch((error) => {
						return setErrorModal(`Błąd przesyłania!`);
					});
			};
		});

	/**
	 * @author Oleksii
	 * 
	 * Łukasz musisz dodać poniższe linni kodu przed metodą "click" bo bez tego nie zadziała na mac oraz ios
	 * 
	 * fileInput.style.display = 'none';
	 * document.body.append(fileInput);
	 * 
	 * a także:
	 * 
	 * fileInput.addEventListener('change', (event) => {
	 * 		// jakaś logika...
	 * 		fileInput.remove();
	 * });
	 * 
	 * :)
	 */

    fileInput.click();
  };

	const handlePress = () => {
		router.push({
			stack: 'MenuStack',
			screen: 'ImageScreen',
			params: { subView: 'options' },
		});
	};

	const handleConfirmCrop = () => {
		if (imgRef.current && completedCrop) {
			const croppedCanvas = getCroppedCanvas(imgRef.current, completedCrop);
			if (croppedCanvas) {
				const base64Data = croppedCanvas.toDataURL();
				setCropModal(false);
				callback([{
					mime: '',
					path: base64Data,
				}]);
			};
		};
	};

	const getCroppedCanvas = (image: any, crop: Crop) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (ctx) {
			const scaleX = image.naturalWidth / image.width;
			const scaleY = image.naturalHeight / image.height;

			canvas.width = crop.width;
			canvas.height = crop.height;

			ctx.imageSmoothingQuality = 'high';
			canvas.style.imageRendering = 'auto';

			ctx.drawImage(
				image,
				crop.x * scaleX,
				crop.y * scaleY,
				crop.width * scaleX,
				crop.height * scaleY,
				0,
				0,
				crop.width,
				crop.height
			);

			return canvas;
		};
	};

	const compressor = async (file: any, type: 'image' | 'video') => {

	};

	return (
		<View>
			{render(handlePress)}

			<Modal
				transparent={true}
				visible={cropModal}
				onRequestClose={() => setCropModal(false)}
			>
				<View style={styles.Modal}>
					<View style={styles.CropContainer}>
						<ReactCrop
							crop={cropData}
							onChange={c => setCropData(c)}
							// minHeight={cropResolution?.height}
							// minWidth={cropResolution?.width}
							// maxWidth={cropResolution?.width}
							// maxHeight={cropResolution?.height}
							onComplete={(c) => setCompletedCrop(c)}
							aspect={cropResolution && cropResolution?.width / cropResolution?.height}
							style={styles.ReactCrop}
						>
							{files &&
								<img
									ref={imgRef}
									src={files[0].path}
									style={styles.Image as any}
								/>
							}
						</ReactCrop>
						<Button
							onPress={() => handleConfirmCrop()}
						>
							Potwierdź
						</Button>
					</View>
				</View>
			</Modal>
			<Modal
				transparent={true}
				visible={!!errorModal}
			>
				<View style={styles.ErrorModalContainer}>
					<View style={styles.ErrorModalContent}>
						<Typography>
							{errorModal}
						</Typography>
						<Button
							style={{ height: 30 }}
							variant='text'
							onPress={() => setErrorModal(null)}
						>
							Ok
						</Button>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	Modal: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		padding: 30,
	},
	CropContainer: {
		backgroundColor: Colors.White,
		borderRadius: 4,
		padding: 20,
		width: 'auto',
		gap: 20,
	},
	ReactCrop: {
		maxWidth: '100%',
		maxHeight: '80vh',
	},
	ErrorModalContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	ErrorModalContent: {
		width: 300,
		backgroundColor: Colors.White,
		borderRadius: 4,
		padding: 20,
		justifyContent: 'space-between',
		gap: 20,
	},
	Image: {
		maxWidth: '100%',
		objectFit: 'contain',
	}
});

export default MediaSelector;