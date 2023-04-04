import React, { useState } from "react";
import { Modal, View, Text } from "react-native";
import Input from "../Auth/Input";
import StarterContainer from "./StarterContainer";
import Button from "./Button";
import LoadingOverlay from "./LoadingOverlay";
import Dropdown from "./Dropdown";
import { useAddMenuMutation } from "../../util/menuSlice";
function AddMenu({ onPress }) {
  ////////// states       ////////////
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [itemId, setItemId] = useState("");

  //////// Add menu Mutation        /////////
  const [addMenu, {}] = useAddMenuMutation();
  // update user from user slice

  const [errors, setErrors] = useState({});

  function handleInput(name, input) {
    setData((prevState) => ({ ...prevState, [name]: input }));
  }
  ///Error Handler/////////////
  function handleError(errorMessage, input) {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  /////////////////////////Cancel Handler///////////////////
  function cancelHandler() {
    onPress(false);
  }

  //////////////// item id set coming from dropdown  ///////////
  function itemIdSetFromDropdown(id) {
    console.log("id from dropdown", id);
    setItemId(id);
  }

  ///////////////////////Update Handler ///////////////////
  function updateHandler() {
    let valid = true;
    if (!data.name) {
      handleError("please input name", "name");
      valid = false;
    }
    if (!data.description) {
      handleError("please input description", "description");
      valid = false;
    }

    if (valid) {
      editUser();
    }
  }
  ///////////////////Here is the update user api use///////
  async function editUser() {
    /////////// add menu api call       ////////
    addMenu({
      name: data.name,
      description: data.description,
      items: itemId ? itemId : "",
    });
    onPress(false);
  }
  return (
    <Modal transparent={true} animationType="none" visible={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: `rgba(0,0,0,0.6)`,
        }}
      >
        <StarterContainer>
          <Input
            onUpdateValue={handleInput.bind(null, "name")}
            label="Name"
            value={data.name}
            error={errors.name}
            onFocus={() => {
              handleError(null, "name");
            }}
          />
          <Input
            label="description"
            value={data.description}
            onUpdateValue={handleInput.bind(null, "description")}
            error={errors.description}
            onFocus={() => {
              handleError(null, "description");
            }}
          />
          <Dropdown addItemIdIntoNewMenu={itemIdSetFromDropdown} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <View style={{ paddingRight: 20 }}>
              <Button onPress={cancelHandler}>Cancel</Button>
            </View>
            <Button onPress={updateHandler}>Add Menu</Button>
          </View>
        </StarterContainer>
      </View>
    </Modal>
  );
}

export default AddMenu;
