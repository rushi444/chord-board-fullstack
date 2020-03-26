import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { AudioPlayer } from '../Shared/AudioPlayer';
import { LikeTrack } from './LikeTrack';
import { DeleteTrack } from './DeleteTrack';

export const Track = ({ track }) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <Title style={{ display: 'inline-block' }}>
        {track.title}
      </Title>
      <NonExpandInfo>
        {<LikeTrack trackId={track.id} likeCount={track.likes.length} />}
        <AudioPlayer url={track.url} />
        <div>
          By:{' '}
          <StyledLink to={`/profile/${track.postedBy.id}`}>
            {track.postedBy.username}
          </StyledLink>
        </div>
        <ExpandButton onClick={() => setExpand(!expand)}>
          {!expand ? '+' : '-'}
        </ExpandButton>
      </NonExpandInfo>
      <NonExpandInfo>
        {expand && (
          <>
            <div style={{ paddingLeft: '5%', alignContent: 'center' }}>
              Description: {track.description}
            </div>
            <DeleteTrack track={track} />
          </>
        )}
      </NonExpandInfo>
    </>
  );
};

const Title = styled.h2`
  margin-block-start: 0;
  margin-block-end: 0;
`;

const NonExpandInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
  transition: all 2s ease;
`;

const ExpandButton = styled.button`
  border: none;
  background-color: #c5c6c7;
  font-size: 2rem;
  :focus {
    outline: none;
  }
`;

const StyledLink = styled(Link)`
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: underline;
  }
`;
