import React from "react";
import { StyleSheet } from "react-native";
import { Container, Button, Icon } from "native-base";
import { createStackNavigator } from "react-navigation";

import Posts from "./components/Posts";
import Camera from "./components/Camera";
import NewPost from "./components/NewPost";
import Footer from "./components/Footer";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent onPress={() => navigation.navigate("Camera")}>
          <Icon style={{ color: "#262626" }} name="camera" />
        </Button>
      ),
      headerTitle: "Instaclone"
    };
  };

  render() {
    return (
      <Container style={styles.container}>
        <Posts />
        <Footer />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between"
  }
});

export default createStackNavigator({
  Home: {
    screen: Home
  },
  Camera: {
    screen: Camera
  },
  NewPost: {
    screen: NewPost
  }
});
