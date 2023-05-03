import React from "react";
import { View } from "react-native";
import { Modal } from "react-native";
import StarterContainer from "../UI/StarterContainer";
import Input from "../Auth/Input";
import Button from "../UI/Button";

function Add_addons({ onPress, addons }) {
  function cancelHandler() {
    onPress(false);
  }
  function addHandler() {}
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
