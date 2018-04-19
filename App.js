import React from "react";
import { StackNavigator } from "react-navigation";
import Home from "./screen/home";
import Scan from "./screen/scan";

export default class App extends React.Component {
  render() {
    return <Root />;
  }
}

const Root = StackNavigator({
  Home: {
    screen: Home
  }
});
