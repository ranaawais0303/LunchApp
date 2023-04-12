import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.totalAmount += 1;
      console.log(action, "action in cart slice");
      state.totalPrice =
        state.totalPrice + action.payload.price * action.payload.amount;
      const exsistingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedItems = [...state.items];
      if (exsistingCartItemIndex !== -1) {
        const existingCartItem = state.items[exsistingCartItemIndex];
        // let updatedItem;
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        state.items[exsistingCartItemIndex] = updatedItem;
        // console.log(state.items, "updated item in if ");
      } else {
        state.items = updatedItems.concat(action.payload);

        // console.log(state.items, "updated item in else ");
      }
    },
    removeItem: (state, action) => {
      const exsistingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[exsistingCartItemIndex];
      state.totalPrice = state.totalPrice - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[exsistingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    },
  },
});
export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
