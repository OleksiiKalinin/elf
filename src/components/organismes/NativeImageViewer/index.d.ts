import { ComponentProps, FC } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';

declare const NativeImageViewer: FC<ComponentProps<typeof ImageViewer>>

export default NativeImageViewer;