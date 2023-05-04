import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { menuSlice } from "./menuSlice";
import { addonsSlice } from "./addonsSlice";
import { itemsSlice } from "./ItemsSlice";

// const rootReducer = combineReducers({
//   users: userReducer,
//   menuReducer: menuReducer,
// });
export const api = {
  users: userSlice,
  menus: menuSlice,
  addons: addonsSlice,
  items: itemsSlice,
};
// export default rootReducer;
