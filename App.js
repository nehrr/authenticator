import React from "react";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";

import _ from "lodash";
import Home from "./screen/home";
import Scan from "./screen/scan";

console.disableYellowBox = true;

const initState = {
  user: []
};

function reducer(prevState = initState, action) {
  switch (action.type) {
    case "add":
      if (!_.some(prevState.user, action.payload.newCode)) {
        // console.log(action.payload);
        return Object.assign({}, prevState, {
          user: [...prevState.user, action.payload.newCode]
        });
      } else {
        alert("This code has already been scanned!");
        return prevState;
      }
    case "clear":
      return Object.assign({}, prevState, {
        user: []
      });
    case "removeOne":
      let array = [...prevState.user];
      array.splice(action.payload.index, 1);
      return Object.assign({}, prevState, {
        user: array
      });
    default:
      return prevState;
  }
}

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
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
