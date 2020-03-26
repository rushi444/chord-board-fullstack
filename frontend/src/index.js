import * as React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import './index.css';

import { App } from './App';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('token');
    token &&
      operation.setContext({
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
  },
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem('token'),
    },
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
