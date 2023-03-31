import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { menuSlice } from "./menuSlice";

// const rootReducer = combineReducers({
//   users: userReducer,
//   menuReducer: menuReducer,
// });
export const api = {
  users: userSlice,
  menus: menuSlice,
};
// export default rootReducer;
