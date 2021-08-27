import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './app';

const client = new ApolloClient({
  headers: {
    contentType: 'application/json',

    'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_KEY,
    // 'put your hasura admin secret here 😎  ',
  },
  uri: 'https://reactjs-graphql-todo.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
});

const rootNode = document.getElementById('root');
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootNode
);
