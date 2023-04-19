import React, { useState } from "react";
import { Icon, ListItem } from "@rneui/themed";
import { Colors } from "../../constants/styles";
import ContainerForMenus from "./ContainerForMenus";
import Dropdown from "../dropdown/Dropdown";

function MenuExpand({ itemData, checkhandle }) {
  const [expanded, setExpanded] = useState(false);

  function onPressHandler() {
    setExpanded(!expanded);
  }

  function checkboxHandler() {
    checkhandle(itemData.item._id);
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
            <ListItem.CheckBox
              checked={itemData.item.current}
              onPress={checkboxHandler}
            ></ListItem.CheckBox>
            <ListItem.Content>
              <ListItem.Title style={{ color: "white", marginLeft: 10 }}>
                {itemData.item.name}
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={onPressHandler.bind(this, itemData.item._id)}
      >
        <Dropdown id={itemData.item._id} items={itemData.item.items} />
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
