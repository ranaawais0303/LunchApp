// import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import AuthContextProvider, { useAuth } from "./store/auth-context";
import { Provider } from "react-redux";
import { store } from "./util/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
//
import { StatusBar } from "expo-status-bar";
import { Colors } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
//
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import OTPScreen from "./screens/OTPScreen";
import ForgotScreen from "./screens/ForgotScreen";
import Users from "./screens/Users";
import Menus from "./screens/Menus";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import Menu from "./screens/Menu";
import Addons from "./screens/Addons";
import Items from "./screens/Items";
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => false,
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="Forgot" component={ForgotScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      {!authCtx.isForgot && [
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                size={24}
                color={tintColor}
                onPress={authCtx.logout}
              />
            ),
          }}
        />,
        <Stack.Screen name="Users" component={Users} />,
        <Stack.Screen name="Menus" component={Menus} />,
        <Stack.Screen name="Menu" component={Menu} />,
        <Stack.Screen name="Addons" component={Addons} />,
        <Stack.Screen name="Items" component={Items} />,
        //   <Stack.Screen name="Orders" />
        // )(<Stack.Screen name="Notifications" />)(<Stack.Screen name="User" />),
      ]}
      {authCtx.isForgot && (
        <Stack.Screen name="changePassword" component={ChangePasswordScreen} />
      )}
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useAuth();
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(false);
  const authCtx = useAuth();
  useEffect(() => {
    async function fetchToken() {
      // const date = new Date().toLocaleString("en-US", {
      //   timeZone: "Asia/karachi",
      // });
      // console.log(date);
      const storedToken = await AsyncStorage.getItem("token");
      console.log("storedToken", storedToken);
      await axios
        .get("http://192.168.1.124:8000/api/users/tokenVerify", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          authCtx.authenticate(storedToken);

          console.log(response.data, "this is our data of token verify");
        })
        .catch((error) => {
          console.log(error);
          authCtx.logout();
        });

      // if (storedToken) {
      //   // authCtx.authenticate(storedToken);
      // }
      setIsTryingLogin(false);
    }
    async function fetchForgot() {
      const storedForgot = await AsyncStorage.getItem("forgot");
      if (storedForgot) {
        authCtx.addForgot(storedForgot);
      }
    }
    fetchForgot();
    fetchToken();
  }, []);
  if (isTryingLogin) {
    return <AppLoading />;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Provider store={store}>
          {/* <ApiProvider api={[userSlice, menuSlice]}> */}
          <Root />
          {/* </ApiProvider> */}
        </Provider>
      </AuthContextProvider>
    </>
  );
}
