import React from "react";
import {
  Header as NbHeader,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Title
} from "native-base";

export default class Header extends React.Component {
  navToCamera = () => {
    this.props.navigation.navigate("Camera");
  };

  render() {
    console.log(this.props);
    return (
      <NbHeader>
        <Left>
          <Button transparent onPress={this.navToCamera}>
            <Icon style={{ color: "#262626" }} name="camera" />
          </Button>
        </Left>
        <Body>
          <Title>Instaclone</Title>
        </Body>
        <Right />
      </NbHeader>
    );
  }
}
