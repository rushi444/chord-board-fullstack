import React from 'react';
import styled from '@emotion/styled';

import { Track } from './Track';

export const TrackList = ({ tracks }) => {
  return (
    <TrackListUl>
      {tracks.map(track => (
        <li key={track.id}>
          <Track track={track} />
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
