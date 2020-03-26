import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from '@emotion/styled';

import { SearchTrack } from '../Tracks/SearchTrack';
import { CreateTrack } from '../Tracks/CreateTrack';
import { TrackList } from '../Tracks/TrackList';
import { Error } from '../Shared/Error';

export const Dashboard = () => {
  const [searchResults, setSearchResults] = useState([]);

  const { data, loading, error } = useQuery(GET_TRACKS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <Error error={error} />;

  const tracks = searchResults.length > 0 ? searchResults : data.tracks;

  return (
    <DashBoardContainer>
      <SearchTrack setSearchResults={setSearchResults} />
      <CreateTrack />
      <TrackList tracks={tracks} />
    </DashBoardContainer>
  );
};

export const GET_TRACKS_QUERY = gql`
  query getTracksQuery {
    tracks {
      id
      title
      description
      url
      likes {
        id
      }
      postedBy {
        id
        username
      }
    }
  }
`;

const DashBoardContainer = styled.div`
  margin-top: 100px;
  width: 80vw;
  padding: 1%;
  justify-content: center;
  text-align: center;
`;
