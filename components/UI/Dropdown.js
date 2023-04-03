import React from "react";
import { Icon } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../../constants/styles";
import { useGetAllItemsQuery } from "../../util/menuSlice";
import LoadingOverlay from "./LoadingOverlay";

function Dropdown({ id, items }) {
  let countries = ["Egypt", "Canada", "Australia", "Ireland"];
  console.log(id, "id");
  function onSelectHandler(selectedItem, index) {
    console.log(selectedItem, index);
    // return "add item";
  }
  console.log(items, "filtered items");
  const {
    data: allitems,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    error,
  } = useGetAllItemsQuery();
  let content;
  if (isSuccess) {
    const data = allitems.data;
    console.log(allitems.data, "all items");
    const filteredItems = data.filter(
      (item) => !items.some((menuItem) => menuItem._id === item._id)
    );
    const filteredName = filteredItems.map((item) => item.name);
    const filteredId = filteredItems.map((item) => item._id);

    content = (
      <SelectDropdown
        data={filteredName}
        onSelect={onSelectHandler.bind(this, filteredId)}
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
