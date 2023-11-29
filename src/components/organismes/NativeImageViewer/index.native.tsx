import { ComponentProps, FC } from 'react';
import NativeImageViewer from 'react-native-image-zoom-viewer';

const index: FC<ComponentProps<typeof NativeImageViewer>> = (props) => {
    return <NativeImageViewer {...props} />
};

export default index;