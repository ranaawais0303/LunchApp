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
    error,
  } = useGetUsersQuery();
  const [deleteUserData, {}] = useDeleteUserDataMutation();

  //==================//  Content according to the state of data  //================//
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
  }

  //===================// modal open or close set from Edid Modal  //============//
  function editHandler(val) {
    setShowEdit(val);
  }

  //================// Update Handler and set user to send update/Edit Modal  //===========//
  function updateHandler(myUser) {
    console.log("update Handler");
    setUser(myUser);
    console.log(myUser);
    setShowEdit(true);
  }

  //=============//  Delete Handler delete User'API Use //==================//
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
          await deleteUserData(id)
            .then((res) => {
              Alert.alert("data deleted successfully");
            })
            .catch((err) => console.log(err));
        },
      },
    ]);
  }

  //==================// Render List //====================//
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

  //============// Content Render  //==================//
  return <>{content}</>;
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
});
