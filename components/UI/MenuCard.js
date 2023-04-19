import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import { increaseAmount, decreaseAmount } from "../../Features/cart/cartSlice";
import IconButton from "./IconButton";
import { useDispatch, useSelector } from "react-redux";
function MenuCard({ item }) {
  const { items } = useSelector((store) => store.cart);

  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  //==========// check existing item and then set amount //==========
  const itemid = items && items.filter((curItem) => curItem.name === item.name);

  useEffect(() => {
    if (itemid.length >= 1) {
      setAmount(itemid[0].amount);
    }
  }, [itemid]);

  //========// increament amount //==========//
  function increase() {
    setAmount((prevState) => {
      const newAmount = prevState + 1;
      dispatch(
        increaseAmount({
          id: item._id,
          name: item.name,
          price: item.price,
          amount: newAmount,
        })
      );
      return newAmount;
    });
  }

  //=========// Decreament of amount by 1  //================//
  function decrease() {
    setAmount((prevState) => {
      if (prevState === 0) {
        return prevState;
      }
      const newAmount = prevState - 1;
      console.log("item id in menu card", item._id, "_______");
      dispatch(decreaseAmount({ id: item._id }));
      return newAmount;
    });
  }
  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
            marginLeft: "30%",
          }}
        >
          <View style={styles.buttonContainer}>
            <IconButton
              icon="remove"
              size={24}
              color="white"
              onPress={decrease}
            />
          </View>
          <Text style={{ fontSize: 24, color: "white", margin: 8 }}>
            {amount}
          </Text>
          <View style={styles.buttonContainer}>
            <IconButton onPress={increase} icon="add" size={24} color="white" />
          </View>
        </View>
      </View>
      <Text style={styles.price}>{item.price} Rs</Text>
    </View>
  );
}

export default MenuCard;
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: Colors.primary800,
    borderRadius: 10,

    elevation: 5,
  },

  details: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    // color: "white",
    fontSize: 18,
    margin: 40,
    color: "#888",
  },
  buttonContainer: {
    backgroundColor: Colors.primary500,
    borderRadius: 50,
  },
});
