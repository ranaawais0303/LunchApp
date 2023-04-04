import React from "react";
import { Icon } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../../constants/styles";
import {
  useAddItemIntoMenuMutation,
  useGetAllItemsQuery,
} from "../../util/menuSlice";
import LoadingOverlay from "./LoadingOverlay";

function Dropdown({ id, items, addItemIdIntoNewMenu }) {
  //////////////////////// add item into menu mutation   /////////////
  const [addItemIntoMenu, {}] = useAddItemIntoMenuMutation();

  ////////////// get all item Query //////////////////
  const {
    data: allitems,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllItemsQuery();
  function onSelectHandler(selectedItem, index) {
    const itemId = selectedItem[selectedItem.length - 1];
    /////////////for add item into  menu  //////////
    if (id) {
      addItemIntoMenu({ menuId: id, itemId })
        .then((res) => console.log("success", res))
        .catch((err) => console.log("here is an error", err));
    }
    ////////////////////// for item into new menu  ////////
    else {
      addItemIdIntoNewMenu(itemId);
    }
    console.log(selectedItem, index);
  }

  ///////  change content according to data   ////////////
  ////////// also set condition for new menu and add item ///
  ///////// into old menu //////////////////////////////
  let content;
  if (isSuccess) {
    const data = allitems.data;
    const filteredItems = id
      ? data.filter(
          (item) => !items.some((menuItem) => menuItem._id === item._id)
        )
      : data;
    const filteredNames = filteredItems.map((item) => item.name);
    const filteredIds = filteredItems.map((item) => item._id);
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
    console.log(filteredItems, "here is filtered items");
  } else if (isError) {
    content = <Text>{error}</Text>;
    console.log(error);
  } else if (isLoading) {
    content = <LoadingOverlay />;
    console.log("data is in loading");
  }
  return <>{content}</>;
}

export default Dropdown;
