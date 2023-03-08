import React from "react";
import { Modal, View } from "react-native";
import Input from "../Auth/Input";
import StarterContainer from "./StarterContainer";
function EditModal({ user }) {
  return (
    <Modal transparent={true} animationType="none" visible={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: `rgba(0,0,0,0.6)`,
        }}
      >
        <View
          style={{
            padding: 13,
            backgroundColor: `rgba(0,0,0)`,
            borderRadius: 13,
          }}
        >
          <StarterContainer>
            <Input label="first Name" value={user.firstName} />
          </StarterContainer>
        </View>
      </View>
    </Modal>
  );
}

export default EditModal;
