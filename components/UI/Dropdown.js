import React from "react";
import { Icon } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../../constants/styles";

function Dropdown(props) {
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];

  return (
    <SelectDropdown
      data={countries}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      buttonStyle={{
        backgroundColor: Colors.primary800,
        margin: 10,
      }}
      buttonTextStyle={{ color: "white" }}
      rowStyle={{ backgroundColor: Colors.primary100 }}
      renderDropdownIcon={() => <Icon name="add" size={20} color="white" />}
      dropdownStyle={{ color: "white" }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return "Add item ";
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
    />
  );
}

export default Dropdown;
