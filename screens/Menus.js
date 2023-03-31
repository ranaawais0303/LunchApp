import React, { useState } from "react";
// import { ListItem } from "react-native-elements";
import { FlatList, View, Alert } from "react-native";
import MenuExpand from "../components/UI/MenuExpand";
import { useGetMenusQuery, useUpdateCurrentMutation } from "../util/menuSlice";
import LoadingOverlay from "../components/UI/LoadingOverlay";
function Menus() {
  const [load, setLoad] = useState(false);
  const {
    data: menus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery();
  const [updateCurrent, {}] = useUpdateCurrentMutation();
  let content;
  if (isSuccess) {
    console.log(JSON.stringify(menus.data), "these are my menus from slice");
    content = (
      <FlatList
        data={menus.data}
        renderItem={renderList}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
    );
    // setMenuName(menus.name);r
  } else if (isLoading) {
    content = <LoadingOverlay />;
  } else if (isError) {
    content = <Text>{error}</Text>;
  }

  function checkHandler(id) {
    setLoad(true);
    updateCurrent(id)
      .then((res) => {
        setLoad(false);
        console.log(res);
      })
      .catch((err) => console.log(err, "here is an erroer"));
  }
  if (load) {
    return <LoadingOverlay />;
  }

  function renderList(itemData) {
    return (
      <MenuExpand
        itemData={itemData}
        key={itemData.item._id}
        checkhandle={checkHandler}
      />
    );
  }

  return <>{content}</>;
}
export default Menus;
