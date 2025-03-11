"use client"

import type React from "react"

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
  uri: "https://api.aryshare.com/graphql", // Replace with actual AryShare GraphQL endpoint
})

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("auth_token")

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

