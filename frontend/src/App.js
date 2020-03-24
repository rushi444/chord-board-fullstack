import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Dashboard } from './components/Pages/Dashboard';
import { Profile } from './components/Pages/Profile';

export const App = () => {
  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/profile/:id' component={Profile} />
      </Switch>
    </Router>
  );
};
// const GET_TRACKS_QUERY = gql`
//   {
//     tracks {
//       id
//       title
//       description
//       url
//     }
//   }
// `;

const ME_QUERY = gql`
  {
    me {
      id
      username
      email
    }
  }
`;
