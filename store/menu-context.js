import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MenuContext = createContext();

function MenuContextProvider({ children }) {
  //Menu is for all menus
  const [menu, setMenu] = useState();
  const [item, setItem] = useState();

  function addmenu(menu) {
    setMenu(menu);
    const jsonString = JSON.stringify(menu);
    AsyncStorage.setItem("menus", jsonString);
  }
  //   async function removeMenu() {
  //     setMenu(null);
  //     await AsyncStorage.removeItem("menus");
  //   }
  //   function removeItems() {
  //     setItem(null);
  //     AsyncStorage.removeItem("items");
  //   }
  function addItems(items) {
    AsyncStorage.setItem("items", items);
    setItem(items);
  }
  const value = {
    addmenu: addmenu,
    addItems: addItems,
    // removeMenu: removeMenu,
    // removeItems: removeItems,
  };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
export default MenuContextProvider;
export const useMenu = () => useContext(MenuContext);
