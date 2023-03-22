import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
function StarterContainer({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

export default StarterContainer;

const styles = StyleSheet.create({
  container: {
    marginTop: 64, //64
    marginHorizontal: 32, //32
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});
