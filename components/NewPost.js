import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Form, Item, Input, Label, Icon, Button } from "native-base";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class NewPost extends Component {
  state = {
    title: "",
    location: "",
    image: "",
    loading: false
  };

  componentDidMount() {
    this.props.navigation.setParams({
      submitForm: this.submitForm,
      uploadPhoto: this.uploadPhoto
    });
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Icon
        style={{ color: "#262626", marginLeft: 15 }}
        name={"ios-arrow-back"}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
    title: "New Post",
    headerRight: (
      <Button
        transparent
        style={{ marginRight: 15 }}
        onPress={() => {
          const { params } = navigation.state;

          params.uploadPhoto(navigation.state.params.picture);
        }}
      >
        <Text>Send</Text>
      </Button>
    )
  });

  uploadPhoto = files => {
    this.setState({ loading: true });

    const formData = new FormData();
    const data = {
      uri: files,
      name: `${files}.jpg`,
      type: "image/jpeg"
    };

    formData.append("data", data);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    };

    fetch("https://api.graph.cool/file/v1/cjgxjuvie0apn01997paaz2vg", options)
      .then(response => {
        return response.json();
      })
      .then(image => {
        this.setState({ image: image.url });
        this.submitForm();
        return image;
      })
      .catch(error => console.error(`Error uploading image`));
  };

  submitForm = () => {
    const { title, location, image } = this.state;
    const { newPost, navigation } = this.props;
    const { params } = navigation.state;

    newPost({
      variables: {
        title,
        location,
        image
      }
    })
      .then(() => {
        navigation.goBack(params.keyCameraScreen);
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  render() {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Form>
            <Item floatingLabel>
              <Label>Write a caption...</Label>
              <Input
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Add Location</Label>
              <Input
                value={this.state.location}
                onChangeText={location => this.setState({ location })}
              />
            </Item>
          </Form>
        )}
      </View>
    );
  }
}

const newPost = gql`
  mutation newPost($title: String!, $location: String!, $image: String!) {
    createPost(title: $title, location: $location, image: $image) {
      id
    }
  }
`;

export default graphql(newPost, {
  name: "newPost",
  options: {
    refetchQueries: ["postsQuery"]
  }
})(NewPost);
