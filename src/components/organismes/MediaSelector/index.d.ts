export type MediaFileType = {
  mime: string,
  path: string,
  beforePath?: string,
  name?: string,
};
  
export type MediaSelectorProps = ({
  type: 'image',
  multiple?: true,
  selectionLimit?: number,
  crop?: never,
  initialSelected?: MediaFileType[],
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