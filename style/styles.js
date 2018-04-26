import React from "react";
import { StyleSheet, Dimensions } from "react-native";

//UI
const { width, height } = Dimensions.get("window");
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

export default styles;
