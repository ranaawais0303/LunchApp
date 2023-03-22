import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import IconButton from "../components/UI/IconButton";
import { deleteUser, getAllUsers } from "../util/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import StarterContainer from "../components/UI/StarterContainer";
import EditModal from "../components/UI/EditModal";
function Users(props) {
  const [list, setList] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState();

  function editHandler(val) {
    setShowEdit(val);
  }
  function updateHandler(myUser) {
    console.log("update Handler");
    setUser(myUser);
    console.log(myUser);
    setShowEdit(true);
  }
  function deleteHandler(id) {
    console.log("here is the id", id);
    Alert.alert("DELETE", "Are You Sure You want to delete user?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteUser({
            id: id,
          })
            .then((res) => {
              Alert.alert("data deleted successfully");
              getUsers();
            })
            .catch((err) => console.log(err));
        },
      },
    ]);
  }
  async function getUsers() {
    await getAllUsers()
      .then((res) => setList(res.data))
      .catch((err) => console.log("no data", err));
  }
  useEffect(() => {
    getUsers();
  }, []);

  function MyList(itemData) {
    return (
      <SafeAreaView>
        <Grid>
          <Col size={25}>
            <Row style={styles.cell}>
              <Text style={{ color: "white" }}>{itemData.item.firstName}</Text>
            </Row>
          </Col>
          <Col size={25}>
            <Row style={styles.cell}>
              <Text style={{ color: "white" }}>{itemData.item.lastName}</Text>
            </Row>
          </Col>

          <Col size={25}>
            <Row style={styles.cell}>
              <IconButton
                icon="trash-bin"
                size={24}
                color="red"
                onPress={deleteHandler.bind(null, itemData.item._id)}
              />
            </Row>
          </Col>
          <Col size={25}>
            <Row style={styles.cell}>
              <IconButton
                icon="pencil"
                size={24}
                color="light-blue"
                onPress={updateHandler.bind(null, itemData.item)}
              />
            </Row>
          </Col>
        </Grid>
      </SafeAreaView>
    );
  }
  return (
    <>
      {!showEdit}
      {!list && <LoadingOverlay />}
      {list && [
        <StarterContainer style={{ marginHorizontal: 5 }}>
          <FlatList
            style={styles.com}
            data={list}
            renderItem={MyList}
            keyExtractor={(item) => item._id}
            numColumns={1}
          />
        </StarterContainer>,
        showEdit && <EditModal user={user} onPress={editHandler} />,
      ]}
    </>
  );
}

export default Users;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    padding: 16,
    paddingTop: 100,
    backgroundColor: "#fff",
  },
  cell: {
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //   com: {
  //     margin: 10,
  //   },
  //   container: {
  //     flex: 1,

  //     // backgroundColor: Colors.primary100,
  //     // alignItems: "center",
  //     // justifyContent: "center",
  //   },

  //   rowHead: {
  //     flex: 1,
  //     flexDirection: "row",
  //     marginBottom: 10,
  //     backgroundColor: Colors.primary800,
  //     justifyContent: "flex-start",
  //     alignItems: "center",
  //     paddingHorizental: 10,
  //   },
  //   column: {
  //     // flex: 1,
  //     // borderWidth: 0.5,
  //     // borderColor: "#00003B",
  //     // width: 300,
  //     // height: 300,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     padding: 10,
  //   },
});
