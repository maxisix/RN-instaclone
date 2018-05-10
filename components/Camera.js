import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera as ExpoCamera, Permissions } from "expo";
import { Icon } from "native-base";

export default class Camera extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Camera",
    headerLeft: (
      <Icon
        style={{ color: "#262626", marginLeft: 15 }}
        name={"ios-arrow-back"}
        onPress={() => {
          navigation.goBack();
        }}
      />
    )
  });

  state = {
    hasCameraPermission: null,
    type: ExpoCamera.Constants.Type.back,
    pictureTaken: false,
    picture: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  _takePhoto = async () => {
    const { pictureTaken } = this.state;
    if (!pictureTaken) {
      const takenPhoto = await this.camera.takePictureAsync({
        quality: 0.2,
        exif: true
      });
      this.setState({ picture: takenPhoto.uri, pictureTaken: true });
    }
    this.props.navigation.navigate("NewPost", {
      keyCameraScreen: this.props.navigation.state.key,
      picture: this.state.picture
    });
  };

  render() {
    //console.log(this.props, this.navigation);

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <ExpoCamera
            ref={camera => (this.camera = camera)}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  flexDirection: "row",
                  marginBottom: 20
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1
                  }}
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === ExpoCamera.Constants.Type.back
                          ? ExpoCamera.Constants.Type.front
                          : ExpoCamera.Constants.Type.back
                    });
                  }}
                >
                  <Icon
                    style={{ color: "#FFF", alignSelf: "center" }}
                    name={"md-reverse-camera"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPressOut={this._takePhoto}
                >
                  <View style={styles.btn} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
              </View>
            </View>
          </ExpoCamera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: "center",
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderColor: "#bbb",
    borderWidth: 15,
    borderRadius: 50
  }
});
