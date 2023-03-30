import React, { useState } from "react";
import { Modal, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Input from "../Auth/Input";
import StarterContainer from "./StarterContainer";
import { useUpdateUserMutation } from "../../util/userSlice";
import Button from "./Button";
import { Colors } from "../../constants/styles";
function EditModal({ user, onPress }) {
  const [data, setData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    tokenExp: user.tokenExp.slice(0, -1),
  });
  console.log("user inside the edit modal", user._id);

  // update user from user slice
  const [updateUser, { isLoading, error, isSuccess }] = useUpdateUserMutation();
  const [errors, setErrors] = useState({});
  const [selectedValue, setSelectedValue] = useState(user.isActive);

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

  ///////////////////////Update Handler ///////////////////
  function updateHandler() {
    let valid = true;
    if (!data.firstName) {
      handleError("please input name", "firstName");
      valid = false;
    }
    if (!data.lastName) {
      handleError("please input name", "lastName");
      valid = false;
    }
    if (!data.tokenExp) {
      handleError("please input token expiry", "tokenExp");
      valid = false;
    }
    if (isNaN(data.tokenExp)) {
      handleError("token expiry must be a number ", "tokenExp");
      valid = false;
    }
    if (valid) {
      editUser();
    }
  }
  ///////////////////Here is the update user api use///////
  async function editUser() {
    const UpdatedUserData = data;
    const userId = user._id;
    const response = await updateUser({ userId, UpdatedUserData });
    if (!response) {
      return <Text>{error}</Text>;
    }
    console.log("here is response inside the edit modal", response);
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
            onUpdateValue={handleInput.bind(null, "firstName")}
            label="firstName"
            value={data.firstName}
            error={errors.firstName}
            onFocus={() => {
              handleError(null, "firstName");
            }}
          />
          <Input
            label="lastName"
            value={data.lastName}
            onUpdateValue={handleInput.bind(null, "lastName")}
            error={errors.lastName}
            onFocus={() => {
              handleError(null, "lastName");
            }}
          />
          <Input
            label="token expiry"
            value={data.tokenExp}
            onUpdateValue={handleInput.bind(null, "tokenExp")}
            error={errors.tokenExp}
            onFocus={() => {
              handleError(null, "tokenExp");
            }}
            keyboardType="numeric"
          />
          <Text style={{ color: "white" }}>Is Active</Text>
          <Picker
            selectedValue={selectedValue}
            style={{
              height: 50,
              width: 150,
              backgroundColor: Colors.primary100,
              padding: 10,
            }}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue);
            }}
          >
            <Picker.Item label="true" value="true" />
            <Picker.Item label="false" value="false" />
          </Picker>
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
            <Button onPress={updateHandler}>update</Button>
          </View>
        </StarterContainer>
      </View>
    </Modal>
  );
}

export default EditModal;
