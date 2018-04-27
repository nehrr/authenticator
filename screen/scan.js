import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { StackNavigator } from "react-navigation";
import { BarCodeScanner, Permissions } from "expo";
import { connect } from "react-redux";
import { QRCODE_ADD } from "../constants/actions";
import _ from "lodash";

class Scan extends React.Component {
  constructor() {
    super();
    this.isRead = false;
    this.isError = false;
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
    const reg = /^otpauth:\/\/totp\/.+\?secret=.+&issuer=.*/;
    if (!data.match(reg)) {
      if (!this.isError) {
        this.isError = true;
        alert("This is not a valid QRCode");
        this.isRead = true;
        this.props.navigation.goBack();
        return;
      }
    }
    if (!this.isRead) {
      this.isRead = true;
      //if regex not matched error > does not add
      const regex = /^otpauth:\/\/totp\/(.+)\?secret=(.+)&issuer=(.*)/;
      let array = data.match(regex);

      const [host, secret, issuer] = array.slice(1);
      const newCode = { host, secret, issuer };

      const newList = [...this.props.qr, newCode];

      // this.props.dispatch({ type: ADD, payload: { newCode } });
      // this.props.navigation.goBack();

      if (!_.some(this.props.qr, newCode)) {
        try {
          console.log("storage");

          AsyncStorage.setItem("@Storage:list", JSON.stringify(newList)).then(
            () => {
              this.props.dispatch({
                type: QRCODE_ADD,
                payload: { newCode: newList }
              });
              console.log(newList);
              this.props.navigation.goBack();
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("This code has already been scanned!");
        this.props.navigation.goBack();
      }
    }
  };
}

const mapStateToProps = state => {
  return {
    qr: state.qr
  };
};

export default connect(mapStateToProps)(Scan);
