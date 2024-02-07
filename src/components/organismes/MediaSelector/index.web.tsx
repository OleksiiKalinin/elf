import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MediaFileType, MediaSelectorProps } from '.';
import ReactCrop, { type Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Colors from '../../../colors/Colors';
import Button from '../../molecules/Button';
import imageCompression from 'browser-image-compression';
import Modal from '../../atoms/Modal';
import { useActions } from '../../../hooks/useActions';

const defaultImageSettings = {
	maxWidth: 1920,
	maxHeight: 1080,
	maxInputFileSize: 20,
	maxOutputFileSize: 3,
};

const defaultVideoSettings = {
	maxInputFileSize: 20,
};

const MediaSelector: FC<MediaSelectorProps> = ({
	type,
	multiple = false,
	selectionLimit = 0,
	initialSelected = [],
	crop = false,
	cropResolution,
	imageSettings = {},
	videoSettings,
	callback,
	render,
}) => {
	const [files, setFiles] = useState<MediaFileType[]>([]);
	const [beforeCropData, setBeforeCropData] = useState<File>();
	const [cropModal, setCropModal] = useState(false);
	const [cropData, setCropData] = useState<Crop>();
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
	const { setSnackbarMessage } = useActions();
	const imgRef = useRef<HTMLImageElement>(null);

	const mergedImageSettings = { ...defaultImageSettings, ...imageSettings };
	const { maxWidth, maxHeight, maxInputFileSize, maxOutputFileSize, compressionProgress } = mergedImageSettings;
	const mergedVideoSettings = { ...defaultVideoSettings, ...videoSettings };
	const maxFileSize = type === 'image' ? mergedImageSettings.maxInputFileSize : mergedVideoSettings.maxInputFileSize;

	useEffect(() => {
		if (files.length) {
			if (type === 'image') {
				if (!multiple && crop) {
					setCropModal(true);
				} else {
					console.log(initialSelected);
					const filteredFiles: MediaFileType[] = [];
					files.forEach(item => {
						if (!initialSelected.some(image => image.path === item.path)) {
							filteredFiles.push(item);
						};
					});
					if (compressionProgress) compressionProgress(1);
					callback([...initialSelected, ...filteredFiles]);
				};
			} else if (type === 'video') {
				callback(files);
			}
		};
	}, [files]);

	const handleFilePick = () => {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = `${type}/*`;
		fileInput.multiple = multiple;
		fileInput.style.display = 'none';
		document.body.append(fileInput);

		fileInput.addEventListener('change', async (event) => {
			try {
				const files = (event.target as any)?.files;

				if (multiple && files.length > (selectionLimit - initialSelected.length)) {
					setSnackbarMessage({ type: 'error', text: `Maksymalna liczba obrazów to ${selectionLimit}` });
				} else {

					const base64Array = await processFiles(files);
					if (base64Array) {
						setFiles(base64Array as MediaFileType[]);
					};
				};
			} catch (error) {
				setSnackbarMessage({ type: 'error', text: 'Błąd przesyłania!' });
			};

			fileInput.remove();
		});

		fileInput.click();
	};

	const processFiles = async (files: File[]) => {
		const base64Array: MediaFileType[] = [];
		let progress = 0;
		let counter = 0;

		for (const file of files) {
			if (!file.type.startsWith(`${type}/`)) {
				return setSnackbarMessage({ type: 'error', text: `Niepoprawny format. Możesz wybrać tylko pliki ${type === 'image' ? 'graficzne' : 'wideo.'}` });
			} else if (file.size > megabytesToBytes(maxFileSize)) {
				return setSnackbarMessage({ type: 'error', text: `Maksymalny rozmiar jednego pliku wynosi ${maxInputFileSize} MB` });
			};
		};

		for (const file of files) {
			try {
				if (type === 'video') {
					const base64Data = await convertToBase64(file);
					base64Array.push({ mime: file.type, path: base64Data, name: file.name });
				} else if (type === 'image' && !crop) {
					const isHorizontal = await isImageHorizontal(file);
					const options = {
						maxSizeMB: maxOutputFileSize,
						useWebWorker: true,
						maxWidthOrHeight: isHorizontal ? maxWidth : maxHeight,
						onProgress: compressionProgress ?
							(value: number) => {
								const updatedValue = (((counter * 100 / files.length) + (value / files.length)) / 100)
								progress = updatedValue < 0.97 ? updatedValue : 0.97;
								compressionProgress(progress);
								if (value === 100) {
									counter++
								};
							}

							:

							undefined
					};

					const compressedFile = await imageCompression(file, options);
					const base64Data = await convertToBase64(compressedFile);
					base64Array.push({ mime: file.type, path: base64Data, name: file.name });
				} else if (type === 'image' && crop) {
					setBeforeCropData(file);
					const base64Data = await convertToBase64(file);
					base64Array.push({ mime: file.type, path: base64Data, name: file.name });
				}
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

	const convertToBase64 = (file: File): Promise<string> => {
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
						maxSizeMB: maxOutputFileSize,
						maxWidthOrHeight: cropResolution?.width,
						useWebWorker: true,
						onProgress: compressionProgress ?
							(progress: number) => {
								if (progress < 97) compressionProgress(progress / 100);
							}

							:

							undefined
					};

					const canvasToFile = await imageCompression.canvasToFile(croppedCanvas, beforeCropData.type, beforeCropData.name, beforeCropData.lastModified);
					const compressedFile = await imageCompression(canvasToFile, options);
					const base64Data = await convertToBase64(compressedFile);
					if (compressionProgress) compressionProgress(1);

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

	const megabytesToBytes = (mb: number) => {
		const bytes = mb * 1024 * 1024;
		return bytes;
	};

	return (
		<View>
			{render(handleFilePick)}
			{crop &&
				<Modal
					transparent={true}
					visible={cropModal}
					onClose={() => setCropModal(false)}
					withoutUrl
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
								{files.length &&
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
		</View>
	);
};

const styles = StyleSheet.create({
	Modal: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
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