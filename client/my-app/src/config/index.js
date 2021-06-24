import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "http://localhost:4000",
  uri: "http://34.232.71.40:4000",
  cache: new InMemoryCache(),
});

export default client;
