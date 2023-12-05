import React, { FC, useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { MediaFileType, MediaSelectorProps } from '.';
import { useActions } from '../../../hooks/useActions';
import Typography from '../../atoms/Typography';
import { MenuStackParamList } from '../../../navigators/MenuNavigator';
import { createParam } from 'solito';
import useRouter from '../../../hooks/useRouter';
import ReactCrop, { type Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Colors from '../../../colors/Colors';
import Button from '../../molecules/Button';
import imageCompression from 'browser-image-compression';

const { useParam } = createParam<NonNullable<MenuStackParamList['default']['MainScreen']>>();

const MediaSelector: FC<MediaSelectorProps> = ({
	type,
	multiple = false,
	selectionLimit = 20,
	crop = false,
	cropResolution,
	imageCompressionSettings = {
		maxWidth: 1920,
		maxHeight: 1080,
	},
	compressionProgress,
	callback,
	render,
}) => {
	const [subView] = useParam('subView');
	const { setSwipeablePanelProps } = useActions();
	const router = useRouter();
	const [files, setFiles] = useState<MediaFileType[]>();
	const [beforeCropData, setBeforeCropData] = useState<File>();
	const [cropModal, setCropModal] = useState(false);
	const [errorModal, setErrorModal] = useState<string | null>();
	const [cropData, setCropData] = useState<Crop>();
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
	const imgRef = useRef<HTMLImageElement>(null);
	const maxFileSize = 20971520;

	useEffect(() => {
		if (files) {
			console.log(type);
			console.log(multiple);
			if (type === 'image') {
				if (!multiple && crop) {
					setCropModal(true);
				} else if (!multiple) {
					callback(files);
				} else {
					callback(files);
				};
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
			};
			return null;
		})());
	}, [subView]);

	const handleFilePick = (source: 'device' | 'camera') => {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = 'image/*';
		fileInput.multiple = multiple;
		if (source === 'camera') {
			// fileInput.accept = 'image/*;capture=camera';
			fileInput.capture = 'camera';
		};
		fileInput.style.display = 'none';
		document.body.append(fileInput);

		fileInput.addEventListener('change', async (event) => {
			try {
				const files = (event.target as any)?.files;

				if (multiple && files.length > selectionLimit) {
					setErrorModal(`Maksymalna liczba plików to ${selectionLimit}`);
				} else {
					const base64Array = await processImages(files);
					setFiles(base64Array as MediaFileType[]);
				};
			} catch (error) {
				setErrorModal('Błąd przesyłania!');
			};

			fileInput.remove();
		});

		fileInput.click();
	};

	const processImages = async (files: File[]) => {
		const base64Array: MediaFileType[] = [];
		let i = 0;

		for (const file of files) {
			try {
				if (file.type.startsWith('image/') && file.size < maxFileSize) {
					if (!crop) {

						const isHorizontal = await isImageHorizontal(file);

						const options = {
							maxSizeMB: 5,
							useWebWorker: true,
							maxWidthOrHeight: isHorizontal ? imageCompressionSettings.maxWidth : imageCompressionSettings.maxHeight,
							onProgress: (progress: number) => console.log(`Plik progress ${i}:`, progress),
						};

						i++;
						const compressedFile = await imageCompression(file, options);
						const base64Data = await convertToBase64(compressedFile);
						base64Array.push({ mime: file.type, path: base64Data as string, name: file.name });
					} else {
						setBeforeCropData(file);
						const base64Data = await convertToBase64(file);
						base64Array.push({ mime: file.type, path: base64Data as string, name: file.name });
					}
				} else if (!file.type.startsWith('image/')) {
					return setErrorModal(`Niepoprawny format. Możesz wybrać tylko pliku graficzne.`);
				} else if (file.size > maxFileSize) {
					return setErrorModal(`Maksymalny rozmiar jednego pliku wynosi ${Math.round(maxFileSize / (1024 * 1024) * 100) / 100} MB`);
				};
			} catch (error) {
				return error;
			};
		};

		return base64Array;
	};

	const isImageHorizontal = async (file: File): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
	
			reader.onload = (e) => {
				const image = new Image();
				image.src = e.target?.result as string;
	
				image.onload = () => {
					const isHorizontal = image.width > image.height;
					resolve(isHorizontal);
				};
			};
	
			reader.onerror = (error) => {
				reject(error);
			};
	
			reader.readAsDataURL(file);
		});
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

	function onImageLoad(e: React.SyntheticEvent<HTMLImageElement, Event>) {
		if (cropResolution) {
			const { naturalWidth: width, naturalHeight: height } = e.currentTarget

			const crop = centerCrop(
				makeAspectCrop(
					{
						unit: '%',
						width: 90,
					},
					cropResolution?.width / cropResolution?.height,
					width,
					height
				),
				width,
				height
			);

			setCropData(crop);
		};
	};

	const getCroppedCanvas = (image: any, crop: Crop) => {
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		const canvas = document.createElement("canvas");

		canvas.width = Math.ceil(crop.width * scaleX);
		canvas.height = Math.ceil(crop.height * scaleY);

		const ctx = canvas.getContext("2d");

		if (ctx) {
			ctx.drawImage(
				image,
				crop.x * scaleX,
				crop.y * scaleY,
				crop.width * scaleX,
				crop.height * scaleY,
				0,
				0,
				crop.width * scaleX,
				crop.height * scaleY
			);

			return canvas;
		};
	};

	const handleConfirmCrop = async () => {
		try {
			if (imgRef.current && completedCrop && beforeCropData) {
				const croppedCanvas = getCroppedCanvas(imgRef.current, completedCrop);

				if (croppedCanvas) {
					const options = {
						maxSizeMB: 5,
						maxWidthOrHeight: cropResolution?.width,
						useWebWorker: true,
						onProgress: (progress: number) => console.log(progress),
					};

					const canvasToFile = await imageCompression.canvasToFile(croppedCanvas, beforeCropData.type, beforeCropData.name, beforeCropData.lastModified);
					const compressedFile = await imageCompression(canvasToFile, options);
					const base64Data = await convertToBase64(compressedFile);

					setCropModal(false);
					callback([{
						mime: beforeCropData.type,
						path: base64Data as string,
						name: beforeCropData.name,
					}]);
				};
			};
		} catch (error) {
			console.error('Wystąpił błąd:', error);
		};
	};

	const handlePress = () => {
		if (!multiple) {
			router.push({
				stack: 'MenuStack',
				screen: 'ImageScreen',
				params: { subView: 'options' },
			});
		} else {
			handleFilePick('device');
		};
	};

	return (
		<View>
			{render(handlePress)}
			{crop &&
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
								onComplete={(c) => setCompletedCrop(c)}
								aspect={cropResolution && cropResolution?.width / cropResolution?.height}
								style={styles.ReactCrop}
							>
								{files &&
									<img
										ref={imgRef}
										src={files[0].path}
										style={styles.Image as any}
										onLoad={(e) => onImageLoad(e)}
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
			}
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