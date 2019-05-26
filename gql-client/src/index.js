import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = {
  uri: 'http://localhost:4000/graphql',
};

const client = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache()
});

const Root = () => (
  <div className="App">
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </div>
);

ReactDOM.render(<Root />, document.getElementById('root'));
