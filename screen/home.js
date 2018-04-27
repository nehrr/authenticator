import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  Alert,
  Image
} from "react-native";
import { connect } from "react-redux";
import TOTP from "../lib/totp_js";

import {
  QRCODE_ERROR,
  QRCODE_INIT,
  QRCODE_LOADING,
  QRCODE_CLEAR,
  QRCODE_REMOVE_AT,
  QRCODE_UPDATE_TOKEN
} from "../constants/actions";

import _ from "lodash";
import styles from "../style/styles";

class Home extends React.Component {
  static navigationOptions = {
    title: "Authenticator",
    headerStyle: {
      backgroundColor: "#598DEF"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  //DATA RETRIEVAL/MODIFICATION/REMOVAL
  componentWillMount() {
    console.log("will mount");
    this.props.dispatch({ type: QRCODE_LOADING });
    try {
      AsyncStorage.getItem("@Storage:list").then(res => {
        if (res) {
          const list = JSON.parse(res);
          this.props.dispatch({ type: QRCODE_INIT, payload: { list } });
        }
      });
    } catch (error) {
      this.props.dispatch({ type: QRCODE_ERROR });
    }
  }

  //FUNCTIONS MODIFYING STATE
  clear = () => {
    try {
      AsyncStorage.removeItem("@Storage:list").then(() => {
        this.props.dispatch({ type: QRCODE_CLEAR });
      });
    } catch (error) {
      console.log(error);
    }
    this.props.dispatch({ type: QRCODE_CLEAR });
  };

  remove_at = index => {
    try {
      let array = [...this.props.qr];
      array.splice(index, 1);
      AsyncStorage.setItem("@Storage:list", JSON.stringify(array)).then(() => {
        this.props.dispatch({ type: QRCODE_REMOVE_AT, payload: { array } });
      });
    } catch (error) {
      console.log(error);
    }
  };

  renew_code = secret => {
    let token = new TOTP(secret, 5);
    setInterval(function() {
      var newToken = token.generate();
      console.log(newToken);
    }, 5000);
  };

  //RENDER
  render() {
    if (this.props.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (this.props.qr.length == 0) {
      return (
        <View>
          <TouchableOpacity
            style={styles.image}
            onPress={() => this.props.navigation.navigate("Modal")}
          >
            <Image source={require("../assets/empty.jpg")} />
            <Text style={styles.textBlack}>
              Tap the picture to scan your first QR code
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    const list = this.props.qr.map((item, idx) => {
      // var token = this.renew_code(item.secret);
      // console.log(this.renew_code(item.secret));
      return (
        <View key={idx} style={styles.cell}>
          <TouchableOpacity
            onLongPress={() =>
              Alert.alert(
                "Warning",
                `Do you really want to delete the code for ${
                  this.props.qr[idx].host
                } ?`,
                [
                  {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => this.remove_at(idx)
                  },
                  {
                    text: "Cancel",
                    style: "cancel"
                  }
                ],
                { cancelable: true }
              )
            }
          >
            {/* <Text style={styles.textScroll}>{token}</Text> */}
            {/* <Text style={styles.textScroll}>{item.secret} </Text> */}
            <Text style={styles.textScroll}>{decodeURI(item.issuer)} </Text>
            <Text style={styles.textScroll}>{decodeURI(item.host)} </Text>
          </TouchableOpacity>
        </View>
      );
    });

    if (this.props.qr.length > 0) {
      return (
        <View style={styles.container}>
          {list.length > 0 && <ScrollView>{list}</ScrollView>}
          <TouchableOpacity
            style={styles.buttonGreen}
            onPress={() => this.props.navigation.navigate("Modal")}
          >
            <Text style={styles.text}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRed}
            onPress={() => this.clear()}
          >
            <Text style={styles.text}>Clear</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    qr: state.qr
  };
};

export default connect(mapStateToProps)(Home);
