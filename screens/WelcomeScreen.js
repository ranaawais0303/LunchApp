import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import GridTile from "../components/UI/GridTile";

function WelcomeScreen({ item }) {
  function pressHandler() {
    console.log("pressHandler for grid");
  }
  const list = [
    {
      id: 1,
      name: "user",
    },
    {
      id: 2,
      name: "Menu",
    },
    {
      id: 3,
      name: "User Verification",
    },
    {
      id: 4,
      name: "orders",
    },
    {
      id: 5,
      name: "addons",
    },
    {
      id: 6,
      name: "notifications",
    },
  ];
  return (
    // <View style={styles.container}>
    <FlatList
      data={list}
      renderItem={({ item }) => (
        <GridTile item={item.name} onPress={pressHandler} />
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
