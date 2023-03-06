import React from "react";
import { StyleSheet, Text, View, Pressable, Platform } from "react-native";
import { Colors } from "../../constants/styles";

function GridTile({ onPress, item }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View
          style={[
            styles.innerContainer,
            { backgroundColor: Colors.primary800 },
          ]}
        >
          <Text style={styles.title}>{item}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default GridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    // for IOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    ShadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    // padding: 16,
    alignItems: "center",
    justifyContent: "center",
    // this radius is because no rounded apply on ios so apply here
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
