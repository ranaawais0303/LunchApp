import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useGetMenusQuery } from "../util/menuSlice";
import { Badge } from "@rneui/base";
import MenuCard from "../components/UI/MenuCard";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import IconButton from "../components/UI/IconButton";
import { Colors } from "../constants/styles";
import { useSelector } from "react-redux";
function Menu({ navigation }) {
  const { totalAmount } = useSelector((store) => store.cart);

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
    console.log(getActiveMenu[0].name);
    console.log(getActiveMenu[0].items, "these are the items");
    getActiveMenu[0].items.map((item) => {
      console.log("item in menu", item);
      content = (
        <FlatList
          data={getActiveMenu[0].items}
          renderItem={({ item }) => <MenuCard item={item} />}
          keyExtractor={(item) => item._id}
          numColumns={1}
        />
      );
    });

    return <>{content}</>;
  }
}
export default Menu;
