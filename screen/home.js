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
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  async componentWillMount() {
    console.log("will mount");
    try {
      const value = await AsyncStorage.getItem("@Storage:list");
      if (value !== null) {
        this.setState({ isLoading: true });
        console.log("data");
        console.log(JSON.parse(value).user);
      } else {
        console.log("no storage");
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  async update(value) {
    try {
      await AsyncStorage.setItem("@Storage:list", JSON.stringify(value));
      console.log(JSON.parse(value));
    } catch (error) {
      // Error saving data
    }
  }

  async delete() {
    await AsyncStorage.removeItem("@Storage:list");
  }

  //FUNCTIONS MODIFYING STATE
  clear = () => {
    this.props.dispatch({ type: "clear" });
  };

  removeOne = index => {
    this.props.dispatch({ type: "removeOne", payload: { index } });
  };

  //RENDER
  render() {
    const noScan = () => {
      return (
        <View>
          <TouchableOpacity
            style={styles.image}
            onPress={() =>
              this.props.navigation.navigate("Modal", { add: this.add })
            }
          >
            <Image source={require("../assets/empty.jpg")} />
            <Text style={styles.textBlack}>
              Tap the picture to scan your first QR code
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    const list = this.props.user.map((aUser, idx) => {
      return (
        <View key={idx} style={styles.cell}>
          <TouchableOpacity
            onLongPress={() =>
              Alert.alert(
                "Warning",
                "Do you really want to delete this code ?",
                [
                  {
                    text: "Yes",
                    onPress: () => this.removeOne(idx)
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
            <Text style={styles.textScroll}>{aUser.secret} </Text>
            <Text style={styles.textScroll}>{aUser.issuer} </Text>
            <Text style={styles.textScroll}>{aUser.host} </Text>
          </TouchableOpacity>
        </View>
      );
    });

    const listFilled = () => {
      return (
        <View style={styles.container}>
          {list.length > 0 && <ScrollView>{list}</ScrollView>}
          <TouchableOpacity
            style={styles.buttonGreen}
            onPress={() =>
              this.props.navigation.navigate("Modal", { add: this.add })
            }
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
    };

    return (
      <View style={styles.container}>
        {list.length == 0 ? (
          <View style={styles.image}>{noScan()}</View>
        ) : (
          <View style={styles.container}>{listFilled()}</View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Home);
