import React from "react";
import { Footer as NbFooter, FooterTab, Button, Icon } from "native-base";

export default class Footer extends React.Component {
  render() {
    const active = true;

    return (
      <NbFooter>
        <FooterTab>
          <Button>
            <Icon
              style={{ color: active ? "#262626" : "inherit" }}
              active
              name="home"
            />
          </Button>
          <Button>
            <Icon name="search" />
          </Button>
          <Button>
            <Icon name="ios-add" />
          </Button>
          <Button>
            <Icon name="ios-heart-outline" />
          </Button>
        </FooterTab>
      </NbFooter>
    );
  }
}
