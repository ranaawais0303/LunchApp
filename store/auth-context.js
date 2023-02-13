import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [forgot, setForgot] = useState();

  function authenticate(token) {
    AsyncStorage.setItem("token", token);
    setAuthToken(token);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }
  function addForgot(forgot) {
    setForgot(forgot);
    AsyncStorage.setItem("forgot", forgot);
  }
  function removeForgot() {
    setForgot(null);
    AsyncStorage.removeItem("forgot");
  }
  const value = {
    token: authToken,
    // !!conver into boolean give the same result as token if token then true if not then false.
    isAuthenticated: !!authToken,
    isForgot: !!forgot,
    authenticate: authenticate,
    logout: logout,
    addForgot: addForgot,
    removeForgot: removeForgot,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
