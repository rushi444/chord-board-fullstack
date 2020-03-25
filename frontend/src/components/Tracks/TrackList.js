import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { AudioPlayer } from '../Shared/AudioPlayer';
import { LikeTrack } from './LikeTrack';
import { DeleteTrack } from './DeleteTrack';
import { UpdateTrack } from './UpdateTrack';

export const TrackList = ({ tracks }) => {
  const [expand, setExpand] = useState(false);

  return (
    <TrackListUl>
      {tracks.map(track => (
        <li key={track.id}>
          <NonExpandInfo>
            <LikeTrack />
            <AudioPlayer url={track.url} />
            <div>
              {track.title} {track.id}
            </div>
            <div>
              By:{' '}
              <Link to={`/profile/${track.postedBy.id}`}>
                {track.postedBy.username}
              </Link>
            </div>
            <ExpandButton onClick={() => setExpand(!expand)}>
              {!expand ? '+' : '-'}
            </ExpandButton>
          </NonExpandInfo>
          <NonExpandInfo>
            {expand && <div>Description: {track.description}</div>}
            {expand && <UpdateTrack />}
            {expand && <DeleteTrack />}
          </NonExpandInfo>
        </li>
      ))}
    </TrackListUl>
  );
};

const TrackListUl = styled.ul`
  list-style: none;
  width: 90%;
  margin: 0 auto;
  li {
    color: black;
    margin-top: 2%;
    display: block;
    justify-content: space-between;
    border: 1px solid #c5c6c7;
    background-color: #c5c6c7;
    border-radius: 5px;
    margin: 1%:
  }
`;

const NonExpandInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
`;

const ExpandButton = styled.button`
border: none;
background-color: #c5c6c7;
font-size: 2rem;
:focus {
  outline: none
}
`
