import React, { useState, useEffect } from "react";
// import { ListItem } from "react-native-elements";
import { getAllMenus } from "../util/auth";
import { FlatList, View } from "react-native";
import MenuExpand from "../components/UI/MenuExpand";
function Menus(props) {
  const [menuName, setMenuName] = useState();
  function getMenus() {
    getAllMenus()
      .then((res) => setMenuName(res.data))
      .catch((err) => console.log(err, "there is an error"));
    //   .then((res) => {
    //     setMenuName(res);
    //     console.log(res.name);
    //   })
    //   .catch((err) => console.log("no data", err));
  }

  useEffect(() => {
    getMenus();
  }, []);
  function renderList(itemData) {
    return <MenuExpand itemData={itemData} key={itemData.item._id} />;
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
