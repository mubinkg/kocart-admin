'use client'

import React from 'react'
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const prod_url = "http://35.208.204.126/api/graphql/"
const local_url = "http://localhost:3001/graphql"

const link = createUploadLink({
  uri: local_url,
})

const client = new ApolloClient({
  link: link,
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