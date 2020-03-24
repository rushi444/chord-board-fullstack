import React from 'react';
import { Link } from 'react-router-dom';

import { AudioPlayer } from '../Shared/AudioPlayer';
import { LikeTrack } from './LikeTrack';
import { DeleteTrack } from './DeleteTrack';
import { UpdateTrack } from './UpdateTrack';

export const TrackList = ({ tracks }) => {
  return (
    <div>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
            <div>{track.title}</div>
            <Link to={`/profile/${track.postedBy.id}`}>
              {track.postedBy.username}
            </Link>
            <LikeTrack />
            <AudioPlayer />
            <DeleteTrack />
            <UpdateTrack />
          </li>
        ))}
      </ul>
    </div>
  );
};
