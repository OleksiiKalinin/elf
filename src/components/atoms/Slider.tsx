import React, { ComponentProps, FC } from 'react';
import { Slider as TamaSlider } from 'tamagui'
import Colors from '../../colors/Colors';

const TRACK_HEIGHT = 4;
const THUMB_SIZE = 20;
const MARGIN = (THUMB_SIZE - TRACK_HEIGHT) / 2;

const Track: FC<ComponentProps<typeof TamaSlider.Track>> = (props) => (
    <TamaSlider.Track
        backgroundColor={Colors.Basic400}
        height={TRACK_HEIGHT}
        {...props}
    />
);

const TrackActive: FC<ComponentProps<typeof TamaSlider.TrackActive>> = (props) => (
    <TamaSlider.TrackActive
        backgroundColor={Colors.Basic900}
        {...props}
    />
);

const Thumb: FC<Omit<ComponentProps<typeof TamaSlider.Thumb>, 'index'> & {
    /** if undefined - points to default index = 0 */
    index?: number
}> = ({ index = 0, ...props }) => (
    <TamaSlider.Thumb
        circular
        size='$1.5'
        backgroundColor={Colors.Basic900}
        index={index}
        {...props}
    />
);

const Slider: FC<ComponentProps<typeof TamaSlider>> & {
    Track: typeof Track,
    TrackActive: typeof TrackActive,
    Thumb: typeof Thumb,
} = ({ children = (<>
    <Track>
        <TrackActive />
    </Track>
    <Thumb />
</>), ...props }) => (
        <TamaSlider
            userSelect='none'
            {...(!props.orientation || props.orientation === 'horizontal') ? {
                marginVertical: MARGIN
            } : {
                marginHorizontal: MARGIN
            }}
            {...props}
        >
            {children}
        </TamaSlider>
    );

Slider.Track = Track;
Slider.TrackActive = TrackActive;
Slider.Thumb = Thumb;

export default Slider;