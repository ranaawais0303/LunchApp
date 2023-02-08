import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    AsyncStorage.setItem("token", token);
    setAuthToken(token);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }
  const value = {
    token: authToken,
    // !!conver into boolean give the same result as token if token then true if not then false.
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
