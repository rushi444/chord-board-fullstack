import React from 'react';
import './App.css';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

export const App = () => <Query query={GET_TRACKS_QUERY}>
  {({data, loading, error}) => {
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error</div>
    return <div>{JSON.stringify(data)}</div>
  }}
</Query>;

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
