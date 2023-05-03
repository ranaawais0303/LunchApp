import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import IconButton from "../components/UI/IconButton";
import Add_addons from "../components/items/Add_addons";
import {
  useGetAddonsQuery,
  useUpdateAddonsMutation,
  useDeleteAddonsDataMutation,
} from "../util/addonsSlice";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ContainerForMenus from "../components/Menu/ContainerForMenus";
import Items from "../components/items/Items";
function Addons({ navigation }) {
  const [openModal, setOpenModal] = useState(false);
  const [updateAddons, {}] = useUpdateAddonsMutation();
  const {
    data: addons,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAddonsQuery();
  const [deleteAddonsData, {}] = useDeleteAddonsDataMutation();

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

  //===============// Handlers  //======================
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
        {openModal && <Add_addons onPress={openModalHandler} addons={true} />}
      </>
    );
  }

  return <View>{content}</View>;
}

export default Addons;
