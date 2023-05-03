import React, { useState } from "react";
import { View } from "react-native";
import { Modal } from "react-native";
import StarterContainer from "../UI/StarterContainer";
import Input from "../Auth/Input";
import Button from "../UI/Button";
import LoadingOverlay from "../UI/LoadingOverlay";

function Add_addons({ onPress, addData }) {
  const [data, setData] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [errors, setErrors] = useState({});

  function handleInput(name, input) {
    setData((prevState) => ({ ...prevState, [name]: input }));
  }
  ///Error Handler/////////////
  function handleError(errorMessage, input) {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  function cancelHandler() {
    onPress(false);
  }
  function addHandler() {
    let valid = true;
    if (!data.name) {
      handleError("please input name", "name");
      valid = false;
    }
    if (!data.price) {
      handleError("please input price", "price");
      valid = false;
    }

    if (valid) {
      addDataIntoSlice();
    }
  }
  function addDataIntoSlice() {
    const response = addData(data);
    if (response) {
      onPress(false);
    } else {
      return <LoadingOverlay />;
    }
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
            onUpdateValue={handleInput.bind(null, "price")}
            label="Price"
            value={data.price}
            error={errors.price}
            onFocus={() => {
              handleError(null, "price");
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
            <Button onPress={addHandler}>Add Menu</Button>
          </View>
        </StarterContainer>
      </View>
    </Modal>
  );
}

export default Add_addons;
