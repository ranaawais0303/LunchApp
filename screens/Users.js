import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import { Colors } from "../constants/styles";
import { deleteUser, getAllUsers } from "../util/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import Button from "../components/UI/Button";
function Users(props) {
  const [list, setList] = useState([]);

  async function deleteHandler(id) {
    console.log("here is the id", id);
    deleteUser({
      id: id,
    })
      .then((res) => console.log(res))
      .catch(console.log("no data"));
  }
  useEffect(() => {
    async function getUsers() {
      await getAllUsers()
        .then((res) => setList(res.data))
        .catch(console.log("no data"));
    }
    getUsers();
  }, []);

  function MyList(itemData) {
    console.log(itemData.item);
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.rowHead}>
            <View style={styles.column}>
              <Text style={{ color: "white" }}>{itemData.item.firstName}</Text>
            </View>
            <View style={styles.column}>
              <Button onPress={deleteHandler.bind(null, itemData.item._id)}>
                Delete
              </Button>
            </View>
            <View style={styles.column}>
              <Button style={{ color: "white" }}>Edit</Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      {!list && <LoadingOverlay />}
      {list && (
        <FlatList
          style={styles.com}
          data={list}
          renderItem={MyList}
          keyExtractor={(item) => item.id}
          numColumns={1}
        />
      )}
    </>
  );
}

export default Users;
const styles = StyleSheet.create({
  com: {
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  row: {
    flexDirection: "row",
    // marginBottom: 5,
    backgroundColor: Colors.primary800,
  },
  rowHead: {
    flexDirection: "row",
    // marginBottom: 5,
    backgroundColor: Colors.primary800,
  },
  column: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#00003B",
    padding: 10,
  },
});
