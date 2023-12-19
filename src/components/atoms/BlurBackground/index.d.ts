export interface BlurBackgroundProps {
    /** 
     * - max 32 
     * - default 4 
     * */
    blurAmount?: number
}

declare const BlurBackground: React.FC<BlurBackgroundProps>;

export default BlurBackground;