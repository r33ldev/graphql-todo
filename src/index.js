import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  headers: {
    contentType: 'application/json',

    // 'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_KEY,
    'x-hasura-admin-secret': 'WiUZOCJW4hYxuC7ikClR2ElwZhTlRDo0htRXBDJ0afw7b6QVPHzc3nhNt7IKzFZZ',
    // 'put your hasura admin secret here 😎  ',
  },
  uri: 'https://graphqh-and-apollo-with-react-todo-app.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
});

const rootNode = document.getElementById('root');
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootNode
);
