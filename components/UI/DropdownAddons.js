import React from "react";
import { Icon } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../../constants/styles";
import { useDispatch, useSelector } from "react-redux";

import LoadingOverlay from "./LoadingOverlay";
import { useGetAddonsQuery } from "../../util/addonsSlice";
import { addItem } from "../../Features/cart/cartSlice";

function DropdownAddons({ addonsHandler }) {
  const { items } = useSelector((store) => store.cart);
  //////////////////////// add item into menu mutation   /////////////

  ////////////// get all addons Query //////////////////
  const {
    data: allAddons,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAddonsQuery();
  const dispatch = useDispatch();
  function onSelectHandler(selectedItem, index) {
    let itemId = allAddons.data.filter((item) => item.name === index);
    addonsHandler(itemId[0]);
  }

  ///////  change content according to data   ////////////
  ////////// also set condition for new menu and add item ///
  ///////// into old menu //////////////////////////////
  let content;
  if (isSuccess) {
    const data = allAddons.data;
    const filteredNames = data.map((item) => item.name);
    const filteredIds = data.map((item) => item._id);

    content = (
      <SelectDropdown
        data={filteredNames}
        onSelect={onSelectHandler.bind(this, filteredIds)}
        buttonStyle={{
          backgroundColor: Colors.primary800,
          margin: 10,
        }}
        buttonTextStyle={{ color: "white" }}
        rowStyle={{ backgroundColor: Colors.primary100 }}
        renderDropdownIcon={() => <Icon name="add" size={20} color="white" />}
        dropdownStyle={{ color: "white" }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return "Add Item";
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        defaultButtonText="Add Item"
      />
    );
  } else if (isError) {
    content = <Text>{error}</Text>;
    console.log(error);
  } else if (isLoading) {
    content = <LoadingOverlay />;
    console.log("data is in loading");
  }
  return <>{content}</>;
}

export default DropdownAddons;
