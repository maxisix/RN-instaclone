import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withApollo } from "react-apollo";

import Navigator from "./Navigator";
import Footer from "./components/Footer";

// INSTACLONE PLAN WITH GRAPHQL + GRAPHCOOL
// [] POSTS VIEW // ORDER BY DATE
// [] BOTTOM MENU
// [] CREATE POST VIEW (IMG, CAPTION, ADD LOCATION, BUTTON SEND)

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.graph.cool/simple/v1/cjgxjuvie0apn01997paaz2vg"
  }),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    );
  }
}
