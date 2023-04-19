import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useGetMenusQuery } from "../util/menuSlice";
import { Badge } from "@rneui/base";
import MenuCard from "../components/UI/MenuCard";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import IconButton from "../components/UI/IconButton";
import { Colors } from "../constants/styles";
import { useSelector } from "react-redux";
import DropdownAddons from "../components/UI/DropdownAddons";
import Button from "../components/UI/Button";
function Menu({ navigation }) {
  const { totalAmount } = useSelector((store) => store.cart);
  const { totalPrice } = useSelector((store) => store.cart);
  const [addons, setAddons] = useState();

  function addonsData(item) {
    setAddons((prev) => {
      const newAddons = prev ? [...prev, item] : [item];
      return newAddons;
    });
  }
  //=========// set screen options //======//
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
          status="primary"
          value={totalAmount} // Set the value of the badge
          textStyle={{ color: "white" }} // Set the text style for the badge
          badgeStyle={{ backgroundColor: Colors.primary800 }} // Set the badge style
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
  // let itemsList;
  if (isLoading) {
    content = <LoadingOverlay />;
  } else if (isError) {
    <Text>{error}</Text>;
  } else if (isSuccess) {
    //======// IF menus successfully loaded then select current menu //=====//

    const getActiveMenu = menus.data.filter((menu) => menu.current === true);

    let itemsList = [...getActiveMenu[0].items];

    //========// if addons then add into list //========//
    if (addons) {
      itemsList.push(...addons);
    }

    //===========// render the items list //========//
    content = (
      <FlatList
        data={itemsList}
        renderItem={({ item }) => <MenuCard item={item} />}
        keyExtractor={(item) => item._id}
        numColumns={1}
      />
    );

    return (
      <>
        {content}
        <Text style={{ fontSize: 24, marginBottom: 20 }}>
          Total Price :{totalPrice}
        </Text>
        <DropdownAddons addonsHandler={addonsData} itemsList={itemsList} />
        <View style={{ marginVertical: 90, marginHorizontal: 20 }}>
          <Button>Order</Button>
        </View>
      </>
    );
  }
}
export default Menu;
