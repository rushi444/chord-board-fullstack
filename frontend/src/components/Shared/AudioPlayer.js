import React from 'react';
import ReactPlayer from 'react-player';

export const AudioPlayer = ({ url }) => {
    const playerStyle = {
      width: '10px'
    }
  return (
    <div>
      <ReactPlayer
        url={url}
        height='30px'
        width='500px'
        controls={true}
        style={playerStyle}
      />
    </div>
  );
};
