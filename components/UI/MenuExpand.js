import React, { useState } from "react";
import { Icon, ListItem } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../../constants/styles";
import ContainerForMenus from "./ContainerForMenus";
import Dropdown from "./Dropdown";

function MenuExpand({ itemData }) {
  const [expanded, setExpanded] = useState(false);
  function onPressHandler(id) {
    setExpanded(!expanded);
  }
  function pressHandler() {
    console.log("handle this");
  }

  return (
    <>
      <ListItem.Accordion
        icon={
          <Icon name="chevron-down" type="material-community" color="white" />
        }
        containerStyle={{ backgroundColor: Colors.primary800 }}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={{ color: "white" }}>
                {itemData.item.name}
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={onPressHandler.bind(this, itemData.item._id)}
      >
        <Dropdown />
        <ContainerForMenus
          name="Name"
          price="Price"
          description="Description"
        />
        {itemData.item.items.map((items) => (
          <ContainerForMenus
            name={items.name}
            price={items.price}
            description={items.description}
          />
        ))}
      </ListItem.Accordion>
    </>
  );
}

export default MenuExpand;
