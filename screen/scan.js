import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StackNavigator } from "react-navigation";
import { BarCodeScanner, Permissions } from "expo";
import { connect } from "react-redux";

class Scan extends React.Component {
  constructor() {
    super();
    this.isRead = false;
  }

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
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    if (!this.isRead) {
      this.isRead = true;
      //if regex not matched error > does not add
      const regex = /^otpauth:\/\/totp\/(.+)\?secret=(.+)&issuer=(.*)/;
      let array = data.match(regex);

      const [host, secret, issuer] = array.slice(1);
      const res = { host, secret, issuer };

      this.props.dispatch({ type: "add", payload: res });
      this.props.navigation.goBack();
    }
  };
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Scan);
