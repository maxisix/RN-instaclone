import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body
} from "native-base";

// [] CREATE POST VIEW (IMG, CAPTION, ADD LOCATION, BUTTON SEND)

export default class Post extends Component {
  render() {
    return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg"
              }}
            />
            <Body>
              <Text>Maxime Beaudoin</Text>
              <Text note>{this.props.data.location}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Image
              source={{ uri: this.props.data.image }}
              style={{ height: 400, width: "100%", flex: 1 }}
            />
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{this.props.data.title}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
