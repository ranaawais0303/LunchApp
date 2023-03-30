import React, { useEffect, useState } from "react";
import { useGetUsersQuery, useDeleteUserDataMutation } from "../util/userSlice";
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
import LoadingOverlay from "../components/UI/LoadingOverlay";
import StarterContainer from "../components/UI/StarterContainer";
import EditModal from "../components/UI/EditModal";
function Users(props) {
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState();

  //////////    redux toolkit query implementation  //////////
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    error,
  } = useGetUsersQuery();
  const [deleteUserData, {}] = useDeleteUserDataMutation();

  let content;
  if (isLoading) {
    content = <LoadingOverlay />;
  } else if (isError) {
    content = <Text>{error}</Text>;
  } else if (isSuccess) {
    content = (
      <>
        {!showEdit}
        {[
          <StarterContainer style={{ marginHorizontal: 5 }}>
            <FlatList
              style={styles.com}
              data={users.data}
              renderItem={MyList}
              keyExtractor={(item) => item._id}
              numColumns={1}
            />
          </StarterContainer>,
          showEdit && (
            <EditModal
              user={user}
              onPress={editHandler}
              success={isSuccess}
              isError={isError}
              error={error}
            />
          ),
        ]}
      </>
    );
  } else if (isFetching) {
    <LoadingOverlay />;
  }

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
        onPress: async () => {
          // deleteUser({
          //   id: id,
          // })
          await deleteUserData(id)
            .then((res) => {
              Alert.alert("data deleted successfully");
            })
            .catch((err) => console.log(err));
        },
      },
    ]);
  }

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
      {content}

      {/* {!showEdit}
      {/* {!list && <LoadingOverlay />} */}
      {/* {list && [
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
      ]}{" "}
      */}
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
