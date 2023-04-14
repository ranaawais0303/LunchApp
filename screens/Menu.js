import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useGetMenusQuery } from "../util/menuSlice";
import { Badge } from "@rneui/base";
import MenuCard from "../components/UI/MenuCard";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import IconButton from "../components/UI/IconButton";
import Dropdown from "../components/UI/Dropdown";
import { Colors } from "../constants/styles";
import { useSelector } from "react-redux";
import DropdownAddons from "../components/UI/DropdownAddons";
function Menu({ navigation }) {
  const { totalAmount } = useSelector((store) => store.cart);
  const [addons, setAddons] = useState();

  function addonsData(item) {
    console.log("____________", item, "____addonsdata______");
    setAddons(item);
  }
  navigation.setOptions({
    headerRight: ({ tintColor }) => (
      <View>
        <IconButton
          icon="cart"
          size={24}
          color={tintColor}
          // onPress={openMenuModal}
        />
        <Badge
          value={totalAmount} // Set the value of the badge
          textStyle={{ color: "white" }} // Set the text style for the badge
          badgeStyle={{ backgroundColor: Colors.primary800, width: 5 }} // Set the badge style
          containerStyle={{ position: "absolute", top: 0, right: 0 }}
        />
      </View>
    ),
  });
  const {
    data: menus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery();
  let content;
  if (isLoading) {
    content = <LoadingOverlay />;
  } else if (isError) {
    <Text>{error}</Text>;
  } else if (isSuccess) {
    const getActiveMenu = menus.data.filter((menu) => menu.current === true);

    let itemsList = [...getActiveMenu[0].items];
    if (addons) {
      itemsList.push(addons);
    }
    itemsList.map((item) => {
      content = (
        <FlatList
          data={itemsList}
          renderItem={({ item }) => <MenuCard item={item} />}
          keyExtractor={(item) => item._id}
          numColumns={1}
        />
      );
    });

    return (
      <>
        <Text>Addons</Text>
        <DropdownAddons addonsHandler={addonsData} />
        {content}
      </>
    );
  }
}
export default Menu;
