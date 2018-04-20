import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import _ from "lodash";

const { width, height } = Dimensions.get("window");

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: []
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:list");
      if (value !== null) {
        this.setState({ user: JSON.parse(value) });
        console.log(JSON.parse(value));
      } else {
        console.log("no storage");
      }
    } catch (error) {
      // Error retrieving data
    }
  }

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

  async update() {
    try {
      await AsyncStorage.setItem(
        "@MySuperStore:list",
        JSON.stringify(this.state.user)
      );
    } catch (error) {
      // Error saving data
    }
  }

  //call update method (async) to use setItem
  add = data => {
    let test = false;
    if (_.isEmpty(this.state.user)) {
      console.log("isempty");
      this.setState(prevState => ({
        user: [...prevState.user, data]
      }));
      this.update();
      return;
    }

    for (const aUser of this.state.user) {
      if (aUser.secret == data.secret) {
        console.log(aUser.secret == data.secret);
        test = false;
      } else {
        test = true;
      }
    }

    if (test) {
      this.setState(prevState => ({
        user: [...prevState.user, data]
      }));
      this.update();
    }
    if (!test) {
      alert("This code has already been scanned!");
    }
  };

  clear() {
    //removeItem
    this.setState({
      user: []
    });
  }

  render() {
    const list = this.state.user.map((aUser, idx) => {
      return (
        <View key={idx} style={styles.cell}>
          <Text style={styles.textScroll}>
            {aUser.secret} |
            {aUser.issuer} |
            {aUser.host}
          </Text>
        </View>
      );
    });

    return (
      <View style={styles.container}>
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
        <ScrollView>{list}</ScrollView>
      </View>
    );
  }
}

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

export default Home;
