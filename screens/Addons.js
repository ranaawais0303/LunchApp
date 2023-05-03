import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import IconButton from "../components/UI/IconButton";
import Add_Item from "../components/items/Add_Item";
import {
  useGetAddonsQuery,
  useUpdateAddonsMutation,
  useDeleteAddonsDataMutation,
  useAddAddonsMutation,
} from "../util/addonsSlice";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ContainerForMenus from "../components/Menu/ContainerForMenus";
import Items from "../components/items/Items";
function Addons({ navigation }) {
  const [openModal, setOpenModal] = useState(false);

  //===================// Addons API's  //==============//
  const [updateAddons, {}] = useUpdateAddonsMutation();
  const {
    data: addons,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAddonsQuery();
  const [deleteAddonsData, {}] = useDeleteAddonsDataMutation();

  const [addAddons, {}] = useAddAddonsMutation();
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

  //=========// Render List send data to Items component  //=============//
  function renderList(itemData) {
    //======//  here are update and deleteData are the slice/API's  //========//
    return (
      <>
        <Items
          id={itemData.item._id}
          name={itemData.item.name}
          price={itemData.item.price}
          description={itemData.item.description}
          update={updateAddons}
          deleteData={deleteAddonsData}
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
          data={addons.data}
          renderItem={renderList}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
        />
        {openModal && (
          <Add_Item onPress={openModalHandler} addData={addAddons} />
        )}
      </>
    );
  }

  return <View>{content}</View>;
}

export default Addons;
