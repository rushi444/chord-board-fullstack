import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export const App = () => {
  const { loading, error, data } = useQuery(GET_TRACKS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return <div>{JSON.stringify(data)}</div>;
};
const GET_TRACKS_QUERY = gql`
  {
    tracks {
      id
      title
      description
      url
    }
  }
`;
