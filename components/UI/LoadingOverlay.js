import { ActivityIndicator, StyleSheet, Text, View, Modal } from "react-native";

function LoadingOverlay({ message }) {
  return (
    <Modal transparent={true} animationType="none" visible={true}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `rgba(0,0,0,0.6)`,
        }}
      >
        <View
          style={{
            padding: 13,
            backgroundColor: `rgba(0,0,0)`,
            borderRadius: 13,
          }}
        >
          <ActivityIndicator animating={true} color="black" size="large" />
          <Text style={{ color: `white` }}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    // position: "absolute",

    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
