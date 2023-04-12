import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import { addItem } from "../../Features/cart/cartSlice";
import IconButton from "./IconButton";
import { useDispatch, useSelector } from "react-redux";
function MenuCard({ item }) {
  console.log(item.price, "item from menu page");
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  function amount1() {
    setAmount((prevState) => {
      const newAmount = prevState + 1;
      dispatch(
        addItem({
          id: item._id,
          name: item.name,
          price: item.price,
          amount: 1,
        })
      );
      console.log(newAmount, "________amount ----");
      return newAmount;
    });
    // dispatch(
    //   addItem({
    //     id: item._id,
    //     name: item.name,
    //     price: item.price,
    //     amount: amount,
    //   })
    // );
  }
  function remove1() {
    setAmount(amount - 1);
    dispatch(removeItem(item.id));
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
              onPress={remove1}
            />
          </View>
          <Text style={{ fontSize: 24, color: "white", margin: 8 }}>
            {amount}
          </Text>
          <View style={styles.buttonContainer}>
            <IconButton onPress={amount1} icon="add" size={24} color="white" />
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
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
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
