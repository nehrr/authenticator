import React from "react";
import { StackNavigator } from "react-navigation";
import Home from "./screen/home";
import Scan from "./screen/scan";

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const MainStack = StackNavigator({
  Home: {
    screen: Home
  }
});

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack
    },
    Modal: {
      screen: Scan
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
