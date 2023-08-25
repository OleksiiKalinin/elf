import React from 'react';
import { StyleSheet } from 'react-native';
import NativeVideo from 'react-native-video';
import { VideoPlayerProps } from '.';

const index = ({
    paused
}: VideoPlayerProps) => {

    return (
        <NativeVideo
            source={{ uri: 'https://www.wondarbag.com/media/campaigns/videos/Untitled_design.mp4' }}
            // onLoad={({ duration }) => setDuration(duration)}
            onError={err => console.log(err)}
            paused={paused}
            // paused={paused || !!swipeablePanelProps}
            style={styles.Video}
            repeat
            resizeMode="contain"
            // ref={VideoRef}
            // onProgress={({ currentTime }) => setProgress(currentTime)}
            progressUpdateInterval={100}
        />
    );
};

const styles = StyleSheet.create({
    Video: {
        height: '100%',
        width: '100%',
    },
});

export default index;