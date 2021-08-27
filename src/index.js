import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './app';

const client = new ApolloClient({
  headers: {
    contentType: 'application/json',
    'x-hasura-admin-secret':
      'mnneKhGbtKepu1h2Qw8rPqgZa8bQmcV07YEKIoPIXy0o1c4bn5AJbyYvD4GUodU4',
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
