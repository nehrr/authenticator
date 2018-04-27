import React from "react";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";

import _ from "lodash";
import {
  QRCODE_ADD,
  QRCODE_CLEAR,
  QRCODE_REMOVE_AT,
  QRCODE_ERROR,
  QRCODE_INIT,
  QRCODE_LOADING,
  QRCODE_UPDATE_TOKEN
} from "./constants/actions";
import Home from "./screen/home";
import Scan from "./screen/scan";

console.disableYellowBox = true;

const initState = {
  qr: [],
  isLoading: false,
  isError: false
};

function reducer(prevState = initState, action) {
  switch (action.type) {
    case QRCODE_LOADING:
      return Object.assign({}, prevState, {
        isLoading: true
      });

    case QRCODE_INIT:
      return Object.assign({}, prevState, {
        qr: action.payload.list,
        isLoading: true
      });

    case QRCODE_ERROR:
      return Object.assign({}, prevState, {
        isError: true
      });

    case QRCODE_ADD:
      return Object.assign({}, prevState, {
        qr: action.payload.newCode
      });

    case QRCODE_CLEAR:
      return Object.assign({}, prevState, {
        qr: []
      });

    case QRCODE_REMOVE_AT:
      return Object.assign({}, prevState, {
        qr: action.payload.array
      });

    case QRCODE_UPDATE_TOKEN:
      return Object.assign({}, prevState, {
        qr: action.payload.token
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
    // }
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
