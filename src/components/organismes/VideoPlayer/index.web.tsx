import React, { useState, useEffect } from 'react';
import WebVideo from 'react-player';
import { VideoPlayerProps } from '.';

const index = ({
    paused
}: VideoPlayerProps) => {

    return <WebVideo
        url={'https://www.wondarbag.com/media/campaigns/videos/Untitled_design.mp4'}
        playing={!paused}
        loop
        // onDuration={(duration) => setDuration(duration)}
        onError={err => console.log(err)}
        width='100%'
        height='100%'
        progressInterval={100}
    />
};

export default index;