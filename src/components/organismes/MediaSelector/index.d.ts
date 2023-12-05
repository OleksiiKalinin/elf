export type MediaFileType = {
  mime: string,
  path: string,
  beforePath?: string,
  name?: string,
};
  
export type MediaSelectorProps = ({
  type: 'image', // multiplatform compatibility
  multiple?: true, // multiplatform compatibility
  selectionLimit?: number, // multiplatform compatibility
  crop?: never, // multiplatform compatibility
  initialSelected?: MediaFileType[], // doesn't work on web
  cropResolution?: never, // multiplatform compatibility
  imageCompressionSettings?: {
    maxWidth?: number, // multiplatform compatibility
    maxHeight?: number, // multiplatform compatibility
    quality?: number, // doesn't work on web
    output?: 'jpg' | 'png', // doesn't work on web
    disablePngTransparency?: boolean, // doesn't work on web
  },
  videoCompressionSettings?: never, // not present on web
  compressionProgress?: never, // not present on web
  minSizeToCompress?: never, // not present on web
  maxAllowedFileSize?: never, // not present on web
  } | {
  type: 'image',
  multiple?: false,
  selectionLimit?: never,
  crop?: true,
  initialSelected?: never,
  cropResolution: {
    width: number,
    height: number,
  },
  imageCompressionSettings?: {
    maxWidth?: never,
    maxHeight?: never,
    quality?: number,
    output?: 'jpg' | 'png',
    disablePngTransparency?: boolean,
  },
  videoCompressionSettings?: never,
  compressionProgress?: never,
  minSizeToCompress?: never,
  maxAllowedFileSize?: never,
  } | {
  type: 'image',
  multiple?: false,
  selectionLimit?: never,
  crop?: false,
  initialSelected?: never,
  cropResolution?: never,
  imageCompressionSettings?: {
    maxWidth?: number,
    maxHeight?: number,
    quality?: number,
    output?: 'jpg' | 'png',
    disablePngTransparency?: boolean,
  },
  videoCompressionSettings?: never,
  compressionProgress?: never,
  minSizeToCompress?: never,
  maxAllowedFileSize?: never,
  } | {
  type: 'video',
  multiple?: never,
  selectionLimit?: never,
  crop?: never,
  initialSelected?: never,
  cropResolution?: never,
  imageCompressionSettings?: never,
  videoCompressionSettings?: {
    bitrate?: number,
    maxSize?: number,
  }
  minSizeToCompress?: number,
  maxAllowedFileSize?: number,
  compressionProgress?: (progress: number) => void,
  }) & {
  callback: (images: MediaFileType[]) => void,
  render: (onPress: () => void) => JSX.Element;
};

declare const MediaSelector: React.FC<MediaSelectorProps>;

export default MediaSelector;