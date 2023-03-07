import { StyleSheet, FlatList } from "react-native";
import GridTile from "../components/UI/GridTile";
import { getAllUsers } from "../util/auth";

function WelcomeScreen({ navigation }) {
  function renderList(itemData) {
    function pressHandler() {
      // getAllUsers().then((res) => console.log(res.data));
      navigation.navigate(itemData.item.name);
    }
    {
      return <GridTile item={itemData.item.name} onPress={pressHandler} />;
    }
  }

  const list = [
    {
      id: 1,
      name: "Users",
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
      name: "Orders",
    },
    {
      id: 5,
      name: "Addons",
    },
    {
      id: 6,
      name: "Notifications",
    },
  ];
  return (
    <FlatList
      data={list}
      renderItem={renderList}
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
