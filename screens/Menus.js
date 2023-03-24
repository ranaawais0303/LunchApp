import React, { useState, useEffect } from "react";
// import { ListItem } from "react-native-elements";
import { getAllMenus } from "../util/auth";
import { FlatList, View, Alert } from "react-native";
import MenuExpand from "../components/UI/MenuExpand";
import { useMenu } from "../store/menu-context";
import { currentval } from "../util/auth";
function Menus(props) {
  const [menuName, setMenuName] = useState();
  const menuCtx = useMenu();
  function getMenus() {
    getAllMenus()
      .then((res) => {
        setMenuName(res.data);

        menuCtx.addmenu(res.data);
      })
      .catch((err) => console.log(err, "there is an error"));
  }

  function checkHandler(id) {
    currentval({
      id: id,
    })
      .then((res) => {
        getMenus();
      })
      .catch((err) => console.log(err.code));
  }
  useEffect(() => {
    getMenus();
  }, []);
  function renderList(itemData) {
    return (
      <MenuExpand
        itemData={itemData}
        key={itemData.item._id}
        checkhandle={checkHandler}
      />
    );
  }

  return (
    <FlatList
      data={menuName}
      renderItem={renderList}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
    />
  );
}
export default Menus;
