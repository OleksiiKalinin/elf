export type MediaFileType = {
  mime: string,
  path: string,
  beforePath?: string,
  name?: string,
};
  
export type MediaSelectorProps = ({
  /** Type of media files selected. */
  type: 'image',
  /** Available only for type: image and crop: false. */
  multiple?: true,
  /** Limit of the number of selected files. */
  selectionLimit?: number,
  crop?: never,
  /** Works only on Android and iOS. */
  initialSelected?: MediaFileType[],
  cropResolution?: never,
  /** Settings for files of type: image. */
  imageSettings?: {
    /** Width in pixels. */
    maxWidth?: number,
    /** Height in pixels. */
    maxHeight?: number,
    /** The compression factor used when compressing JPEG images. Won't be used in PNG. Works only on Android and iOS. */
    quality?: number,
    /** Maximum allowed file size in MB before compression. Works only on web. */
    maxInputFileSize?: number,
    /** Maximum allowed file size in MB after compression. Works only on web. */
    maxOutputFileSize?: number,
    /** Compression progress of all selected files. The function returns decimal numbers from 0 to 1. Available only for web. */
    compressionProgress?: (progress: number) => void,
  },
  videoSettings?: never,
  } | {
  /** Type of media files selected. */
  type: 'image',
  /** Available only for type: image and crop: false. */
  multiple?: false,
  selectionLimit?: never,
  /** Cuts a fragment of an image. Available for type: image and multiple: false. */
  crop?: true,
  initialSelected?: never,
  /** Resolution of the cropped image fragment. */
  cropResolution: {
    /** Width in pixels. */
    width: number,
    /** Height in pixels. */
    height: number,
  },
  /** Settings for files of type: image. */
  imageSettings?: {
    /** Width in pixels. */
    maxWidth?: number,
    /** Height in pixels. */
    maxHeight?: number,
    /** The compression factor used when compressing JPEG images. Won't be used in PNG. Works only on Android and iOS. */
    quality?: number,
    /** Maximum allowed file size in MB before compression. Works only on web. */
    maxInputFileSize?: number,
    /** Maximum allowed file size in MB after compression. Works only on web. */
    maxOutputFileSize?: number,
    /** Compression progress of all selected files. The function returns decimal numbers from 0 to 1. Available only for web. */
    compressionProgress?: (progress: number) => void,
  },
  videoSettings?: never,
  } | {
  /** Type of media files selected. */
  type: 'image',
  /** Available only for type: image and crop: false. */
  multiple?: false,
  selectionLimit?: never,
   /** Cuts a fragment of an image. Available for type: image and multiple: false. */
  crop?: false,
  initialSelected?: never,
  cropResolution?: never,
  /** Settings for files of type: image. */
  imageSettings?: {
    /** Width in pixels. */
    maxWidth?: number,
    /** Height in pixels. */
    maxHeight?: number,
    /** The compression factor used when compressing JPEG images. Won't be used in PNG. Works only on Android and iOS. */
    quality?: number,
    /** Maximum allowed file size in MB before compression. Works only on web. */
    maxInputFileSize?: number,
    /** Maximum allowed file size in MB after compression. Works only on web. */
    maxOutputFileSize?: number,
    /** Compression progress of all selected files. The function returns decimal numbers from 0 to 1. Available only for web. */
    compressionProgress?: (progress: number) => void,
  },
  videoSettings?: never,
  } | {
  /** Type of media files selected. */
  type: 'video',
  multiple?: never,
  selectionLimit?: never,
  crop?: never,
  initialSelected?: never,
  cropResolution?: never,
  imageSettings?: never,
  videoSettings?: {
    /** Bitrate of the video file after compression. */
    bitrate?: number,
    /** The maximum size can be height in case of portrait video or can be width in case of landscape video. */
    maxSize?: number,
     /** The minimum file size in MB of the video file to be compressed. */
    minSizeToCompress?: number,
    /** The maximum file size in MB of the selected file (before compression). */
    maxAllowedFileSize?: number,
    /** Maximum allowed file size in MB. Works only on web. */
    maxInputFileSize?: number,
    /** Compression progress of all selected files. The function returns decimal numbers from 0 to 1. Available only for Android and iOS. */
    compressionProgress?: (progress: number) => void,
  };
 
  }) & {
  /** Callback returns an array of objects of type MediaFileType. In the case of web path is base64, and Android and iOS is the path to the temporary file. BeforePath is returned only on Android and iOS. */
  callback: (images: MediaFileType[]) => void,
  /** OnPress for web launches a file manager window. In the case of Android and iOS, it is a camera or custom gallery depending on the selected type. */
  render: (onPress: () => void) => JSX.Element;
};

declare const MediaSelector: React.FC<MediaSelectorProps>;

export default MediaSelector;