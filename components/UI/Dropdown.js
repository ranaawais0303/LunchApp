import React from "react";
import { Icon } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../../constants/styles";

function Dropdown({ id }) {
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];
  console.log(id, "id");
  function onSelectHandler(selectedItem, index) {
    console.log(selectedItem, index);
    // return "add item";
  }
  return (
    <SelectDropdown
      data={countries}
      onSelect={onSelectHandler}
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
}

export default Dropdown;
