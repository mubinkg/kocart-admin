'use client'

import React from 'react'
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { setContext } from '@apollo/client/link/context';

const prod_url = "http://35.208.204.126/api/graphql/"
const local_url = "http://localhost:3001/graphql"

const link = createUploadLink({
  uri: prod_url,
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

const GraphqlProvider = ({children}:any) => {
  return (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
  )
}

export default GraphqlProvider