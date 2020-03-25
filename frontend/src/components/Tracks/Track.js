import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { AudioPlayer } from '../Shared/AudioPlayer';
import { LikeTrack } from './LikeTrack';
import { DeleteTrack } from './DeleteTrack';
import { UpdateTrack } from './UpdateTrack';

export const Track = ({ track }) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
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
    </>
  );
};

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
    outline: none;
  }
`;
