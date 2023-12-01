import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MediaFileType, MediaSelectorProps } from '.';
import { useActions } from '../../../hooks/useActions';
import Typography from '../../atoms/Typography';

const MediaSelector: FC<MediaSelectorProps> = ({
	type,
	multiple = false,
	selectionLimit,
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
	const [files, setFiles] = useState<any[]>();
	const { setSwipeablePanelProps } = useActions();

	useEffect(() => {
		console.log(files);
		const handleCallback = async () => {
			if (files) {

			};
		};
		handleCallback();
	}, [files]);

	const handleFilePick = (source: 'device' | 'camera') => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.multiple = multiple;
		if(source === 'device'){
			fileInput.capture = 'environment';
		}

    // fileInput.addEventListener('change', (event) => {
    //   const files = event.target?.files;
    //   setFiles(Array.from(files));
    // });

    fileInput.click();
  };

	const handlePress = () => {
		setSwipeablePanelProps({
			title: 'W jaki sposób chcesz dodać media?',
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
		});
	};

	const compressor = async (file: any, type: 'image' | 'video') => {

	};

	return (
		<View>
			{render(handlePress)}
		</View>
	);
};

const styles = StyleSheet.create({

})

export default MediaSelector;