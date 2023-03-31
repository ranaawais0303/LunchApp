import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { menuSlice } from "./menuSlice";

import { api } from "./api";

export const store = configureStore({
  //   reducer: rootReducer,
  reducer: {
    [api.users.reducerPath]: api.users.reducer,
    [api.menus.reducerPath]: api.menus.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.users.middleware, api.menus.middleware),
});
