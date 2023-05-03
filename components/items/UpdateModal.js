import React, { useEffect, useState } from "react";
import { Modal, View, Text } from "react-native";
import Input from "../Auth/Input";
import Button from "../UI/Button";
import StarterContainer from "../UI/StarterContainer";
function UpdateModal({ item, onPress, updatedData }) {
  console.log(item, "item from update modal");
  const [data, setData] = useState({
    name: item.name,
    price: item.price.toString(),
    description: item.description,
  });

  const updateData = updateData;
  const [errors, setErrors] = useState({});

  function handleInput(name, input) {
    setData((prevState) => ({ ...prevState, [name]: input }));
  }
  ///Error Handler/////////////
  function handleError(errorMessage, input) {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  //==============//  Cancel Handler //================//
  function cancelHandler() {
    onPress(false);
  }

  //==============//  Update Handler //===============//
  function updateHandler() {
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
      editData();
    }
  }
  //========//  Here is the update api use when click on update button  //===========//
  async function editData() {
    const UpdatedDat = {
      name: data.name,
      price: data.price,
      description: data.description,
    };

    const itemId = item.id;

    //============//  Update API USE here  //===============//
    const response = await updatedData({ itemId, updatedData: UpdatedDat });
    onPress(false);
  }

  //=================//  Render Modal if Item exist  //===============//
  return (
    item && (
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
              label="name"
              value={data.name}
              error={errors.name}
              onFocus={() => {
                handleError(null, "name");
              }}
            />
            <Input
              onUpdateValue={handleInput.bind(null, "price")}
              label="price"
              value={data.price}
              error={errors.price}
              onFocus={() => {
                handleError(null, "price");
              }}
            />
            <Input
              label="Description"
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
              <Button onPress={updateHandler}>update</Button>
            </View>
          </StarterContainer>
        </View>
      </Modal>
    )
  );
}

export default UpdateModal;
