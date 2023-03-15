import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [forgot, setForgot] = useState();
  const [role, setRole] = useState();

  function authenticate(token) {
    AsyncStorage.setItem("token", token);
    setAuthToken(token);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("role");
  }
  function addForgot(forgot) {
    setForgot(forgot);
    AsyncStorage.setItem("forgot", forgot);
  }
  function removeForgot() {
    setForgot(null);
    AsyncStorage.removeItem("forgot");
  }
  function setUserRole(role) {
    AsyncStorage.setItem("role", role);
    setRole(role);
  }
  const value = {
    role: setUserRole,
    getRole: role,
    token: authToken,
    // !!conver into boolean give the same result as token if token then true if not then false.
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    forgot: forgot,
    isForgot: !!forgot,
    addForgot: addForgot,
    removeForgot: removeForgot,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
