// import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import OTPScreen from "./screens/OTPScreen";
import AuthContextProvider, { useAuth } from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "./components/UI/IconButton";
import ForgotScreen from "./screens/ForgotScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";

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
      {!authCtx.isForgot && (
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
        />
      )}
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
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
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
        <Root />
      </AuthContextProvider>
    </>
  );
}
