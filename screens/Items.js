import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import IconButton from "../components/UI/IconButton";
import Add_Item from "../components/items/Add_Item";
import {
  useGetAllItemsQuery,
  useUpdateItemMutation,
  useDeleteItemDataMutation,
  useAddItemMutation,
} from "../util/menuSlice";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import Item from "../components/items/Item";
function Items({ navigation }) {
  const [openModal, setOpenModal] = useState(false);

  //===================// Addons API's  //==============//
  const [updateItem, {}] = useUpdateItemMutation();
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllItemsQuery();
  const [deleteItemData, {}] = useDeleteItemDataMutation();

  const [addItem, {}] = useAddItemMutation();
  //===============//  Here set the options //====================//
  navigation.setOptions({
    headerRight: ({ tintColor }) => (
      <IconButton
        icon="add"
        size={24}
        color={tintColor}
        onPress={openModalHandler}
      />
    ),
  });

  //===============// Handlers  //======================//
  function openModalHandler() {
    setOpenModal(!openModal);
  }

  //=========// Render List send data to Item component  //=============//
  function renderList(itemData) {
    //======//  here are update and deleteData are the slice/API's  //========//
    return (
      <>
        <Item
          id={itemData.item._id}
          name={itemData.item.name}
          price={itemData.item.price}
          description={itemData.item.description}
          update={updateItem}
          deleteData={deleteItemData}
        />
      </>
    );
  }

  //============// Set content according to state of data //============//
  let content;
  if (isLoading) {
    content = <LoadingOverlay />;
  } else if (isError) {
    content = <Text>{error}</Text>;
  }
  if (isSuccess) {
    content = (
      <>
        <FlatList
          data={items.data}
          renderItem={renderList}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
        />
        {openModal && <Add_Item onPress={openModalHandler} addData={addItem} />}
      </>
    );
  }

  return <View>{content}</View>;
}

export default Items;
