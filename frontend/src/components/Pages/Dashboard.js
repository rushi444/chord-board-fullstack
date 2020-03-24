import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { SearchTrack } from '../Tracks/SearchTrack';
import { CreateTrack } from '../Tracks/CreateTrack';
import { TrackList } from '../Tracks/TrackList';
import { Error } from '../Shared/Error';

export const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_TRACKS_QUERY);
  if (loading) return <div>Loading...</div>;
  if (error) return <Error error={error} />;
  return (
    <div>
      <SearchTrack />
      <CreateTrack />
      <TrackList tracks={data.tracks}/>
    </div>
  );
};

const GET_TRACKS_QUERY = gql`
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
