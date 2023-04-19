import React from "react";
import { Icon } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../../constants/styles";
import LoadingOverlay from "./LoadingOverlay";
import { useGetAddonsQuery } from "../../util/addonsSlice";

function DropdownAddons({ addonsHandler, itemsList }) {
  //////////////////////// add item into menu mutation   /////////////

  ////////////// get all addons Query //////////////////
  const {
    data: allAddons,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAddonsQuery();

  //===========// Select handler when select any item from dropdown //=========//

  function onSelectHandler(selectedItem, index) {
    let itemId = allAddons.data.filter((item) => item.name === index);
    addonsHandler(itemId[0]);
  }

  ///////  change content according to data   ////////////
  ///////// into old menu //////////////////////////////
  let content;
  if (isSuccess) {
    const data = allAddons.data;
    const filteredAddons = data.filter(
      (item) => !itemsList.some((menuItem) => menuItem._id === item._id)
    );
    const filteredNames = filteredAddons.map((item) => item.name);
    const filteredIds = filteredAddons.map((item) => item._id);

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
          return "Addons";
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        defaultButtonText="Addons"
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
