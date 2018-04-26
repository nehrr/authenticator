import React from "react";
import { StyleSheet, Dimensions, Platform } from "react-native";

//UI
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        backgroundColor: "#FFFFFF"
      },
      android: {
        backgroundColor: "#21252B"
      }
    })
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
  },

  image: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 52
  },

  textBlack: {
    color: "#000",
    fontWeight: "bold",
    marginTop: 152
  }
});

export default styles;
