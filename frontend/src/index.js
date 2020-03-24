import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import {Auth} from './components/Auth/Auth'

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <App /> */}
    <Auth />
  </ApolloProvider>,
  document.getElementById('root'),
);
