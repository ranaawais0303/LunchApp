import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import IconButton from "../UI/IconButton";
import UpdateModal from "../items/UpdateModal";
import { updateHOC } from "../items/updateHOC";

//==================//  Coming from Items component  //==============//
function ContainerBasic({
  id,
  name,
  price,
  description,
  items,
  updateData,
  deleteData,
}) {
  //============//  Higher order component  //========//
  const UpdateItem = updateHOC(UpdateModal);

  //===========//  State for item which update and modal open close  //==========//
  const [showEdit, setShowEdit] = useState(false);
  const [item, setItem] = useState(false);

  //==========//  Update handler here set Item that shows in fields //==========//
  function updateHandler() {
    setItem({
      id: id,
      name: name,
      price: price,
      description: description,
    });
    setShowEdit(true);
  }

  //=========// for modal open or close send from updata modal  //===================//
  function editHandler(val) {
    setShowEdit(val);
  }

  //=============//      Delete handler delete record    //==========================//
  function deleteHandler() {
    Alert.alert("DELETE", `Are You Sure You want to delete ${name} ?`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await deleteData(id)
            .then((res) => {
              Alert.alert("data deleted successfully");
            })
            .catch((err) => console.log(err));
        },
      },
    ]);
  }

  //=============// Basic container view //=========================================//
  return (
    <>
      {[
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              //   borderLeftWidth: 1,
              borderColor: "white",
            }}
          >
            <Text style={{ color: "white" }}>{name}</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              borderLeftWidth: 1,
              borderColor: "white",
            }}
          >
            <Text style={{ color: "white" }}>{price}</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              borderLeftWidth: 1,
              borderColor: "white",
            }}
          >
            <Text style={{ color: "white" }}>
              {description ? description : "NA"}
            </Text>
          </View>

          {/* //=========  if Items then show this view otherwise hide  //======// */}
          {items && (
            <>
              <IconButton
                icon="pencil"
                size={24}
                color="light-blue"
                onPress={updateHandler}
              />

              <IconButton
                icon="trash-bin"
                size={24}
                color="red"
                onPress={deleteHandler.bind(null, id)}
              />
            </>
          )}
        </View>,

        //==========//  Show Edit true then open modal  //================//
        showEdit && (
          <UpdateItem
            item={item}
            onPress={editHandler}
            updatedData={updateData}
          />
        ),
      ]}
    </>
  );
}

export default ContainerBasic;
