import React, { PropTypes, Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Post from "./Post";

class Posts extends Component {
  render() {
    const { loading, allPosts } = this.props;
    if (loading) return <ActivityIndicator size="large" />;
    return (
      <FlatList
        data={allPosts}
        renderItem={({ item }) => <Post data={item} />}
        keyExtractor={item => item.id}
      />
    );
  }
}

const postsQuery = gql`
  query postsQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      location
      title
      image
    }
  }
`;

export default graphql(postsQuery, {
  props: ({ data }) => ({ ...data })
})(Posts);
