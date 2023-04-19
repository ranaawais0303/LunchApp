import React, { useState } from "react";
// import { ListItem } from "react-native-elements";
import { FlatList, View, Alert } from "react-native";
import MenuExpand from "../components/Menu/MenuExpand";
import { useGetMenusQuery, useUpdateCurrentMutation } from "../util/menuSlice";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import AddMenu from "../components/Menu/AddMenu";
function Menus({ navigation }) {
  navigation.setOptions({
    headerRight: ({ tintColor }) => (
      <IconButton
        icon="add"
        size={24}
        color={tintColor}
        onPress={openMenuModal}
      />
    ),
  });

  /////////////   stats    /////////////////////////
  const [load, setLoad] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  ///////////////// open add menu modal   /////////////
  function openMenuModal() {
    setOpenModal(!openModal);
  }
  ///////////////// modal handle from add manu  /////////
  function addMenuModalHandler(val) {
    setOpenModal(val);
  }
  ///////////////////   get All Menus   ////////////////////
  const {
    data: menus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery();

  //////////////    update Current    ///////////////////////
  const [updateCurrent, {}] = useUpdateCurrentMutation();
  let content;
  if (isSuccess) {
    content = (
      <>
        <FlatList
          data={menus.data}
          renderItem={renderList}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
        {openModal && <AddMenu onPress={addMenuModalHandler} />}
      </>
    );

    // setMenuName(menus.name);r
  } else if (isLoading) {
    content = <LoadingOverlay />;
  } else if (isError) {
    content = <Text>{error}</Text>;
  }

  ///////// load for check handler  /////////
  function checkHandler(id) {
    setLoad(true);
    updateCurrent(id)
      .then((res) => {
        setLoad(false);
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
