import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";

const { width, height } = Dimensions.get("window");

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
  // async componentWillMount() {
  //   console.log("will mount");
  //   try {
  //     const value = await AsyncStorage.getItem("@MySuperStore:list");
  //     if (value !== null) {
  //       this.setState({ user: JSON.parse(value).user });
  //       console.log("data");
  //       console.log(JSON.parse(value).user);
  //     } else {
  //       console.log("no storage");
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // }
  //
  // async update(value) {
  //   try {
  //     await AsyncStorage.setItem("@MySuperStore:list", JSON.stringify(value));
  //   } catch (error) {
  //     // Error saving data
  //   }
  // }
  //
  // async delete() {
  //   await AsyncStorage.removeItem("@MySuperStore:list");
  // }

  //FUNCTIONS MODIFYING STATE
  add = data => {
    this.props.dispatch({ type: "add" });
    //   this.update({ user: [...this.state.user, data] });
  };

  clear() {
    this.props.dispatch({ type: "clear" });
    // this.delete();
  }

  removeOne = value => {
    this.props.dispatch({ type: "removeOne" });
  };

  //RENDER
  render() {
    const list = this.props.user.map((aUser, idx) => {
      return (
        <View key={idx} style={styles.cell}>
          <TouchableOpacity onPress={() => this.removeOne(aUser)}>
            <Text style={styles.textScroll}>
              {aUser.secret} |
              {aUser.issuer} |
              {aUser.host}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });

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

        <TouchableOpacity style={styles.buttonRed} onPress={() => this.clear()}>
          <Text style={styles.text}>Clear</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

//UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  buttonGreen: {
    backgroundColor: "#99C27C",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16
  },

  buttonRed: {
    backgroundColor: "#AA4244",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    marginRight: 16,
    marginLeft: 16,
    marginBottom: 32
  },

  text: {
    color: "#fff",
    fontWeight: "bold"
  },

  textScroll: {
    color: "#000"
  },

  cell: {
    borderWidth: 1,
    borderColor: "#828289",
    width: width,
    padding: 20
  }
});

export default connect(mapStateToProps)(Home);
