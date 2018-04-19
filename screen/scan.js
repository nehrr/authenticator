import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StackNavigator } from "react-navigation";
import { BarCodeScanner, Permissions } from "expo";

class Scan extends React.Component {
  state = {
    hasCameraPermission: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            // onBarCodeRead={({ type, data }) => this.props.navigation.goBack()}
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    const regex = /^otpauth:\/\/totp\/(.+)\?secret=(.+)&issuer=(.*)/;
    console.log(data.match(regex));
    this.props.navigation.goBack();
  };
}

export default Scan;
