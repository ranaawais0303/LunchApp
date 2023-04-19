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
    increaseAmount: (state, action) => {
      state.totalAmount += 1;
      state.totalPrice = state.totalPrice + action.payload.price;
      const exsistingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedItems = [...state.items];
      if (exsistingCartItemIndex !== -1) {
        const existingCartItem = state.items[exsistingCartItemIndex];
        // let updatedItem;
        const updatedItem = {
          ...existingCartItem,
          amount: action.payload.amount,
        };
        state.items[exsistingCartItemIndex] = updatedItem;
      } else {
        state.items = updatedItems.concat(action.payload);
      }
    },

    decreaseAmount: (state, action) => {
      // state.totalPrice =
      //   state.totalPrice - state.items.price - action.items.amount;
      const exsistingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (exsistingCartItemIndex !== -1) {
        state.totalAmount -= 1;

        const existingCartItem = state.items[exsistingCartItemIndex];
        state.totalPrice = state.totalPrice - existingCartItem.price;

        let updatedItem;
        updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };

        state.items[exsistingCartItemIndex] = updatedItem;
      }
    },
  },
});
export const { increaseAmount, decreaseAmount } = cartSlice.actions;
export default cartSlice.reducer;
