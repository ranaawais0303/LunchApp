import { StyleSheet, FlatList } from "react-native";
import GridTile from "../components/UI/GridTile";
import { getList } from "../util/auth";
import { useAuth } from "../store/auth-context";
import { useEffect, useState } from "react";

function WelcomeScreen({ navigation }) {
  const [list, setList] = useState();
  const authCtx = useAuth();

  const role = authCtx.getRole;

  ///////////////////////// Get Role base List from backend  /////////
  function getListForRole() {
    getList(role).then((res) => {
      setList(res.data);
    });
  }

  //////////////// Render list first when this page load //////////////
  useEffect(() => {
    getListForRole();
  }, []);

  function renderList(itemData) {
    function pressHandler() {
      navigation.navigate(
        itemData.item.name,
        (setOptions = { id: itemData.item._id })
      );
    }
    {
      return (
        <GridTile
          item={itemData.item.name}
          onPress={pressHandler}
          key={itemData.item._id}
        />
      );
    }
  }

  return (
    <FlatList
      data={list}
      renderItem={renderList}
      keyExtractor={(item) => item._id}
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
