import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import cartReducer from "../Features/cart/cartSlice";

export const store = configureStore({
  //   reducer: rootReducer,
  reducer: {
    cart: cartReducer,

    [api.users.reducerPath]: api.users.reducer,
    [api.menus.reducerPath]: api.menus.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.users.middleware, api.menus.middleware),
});
