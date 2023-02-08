import { useState, useEffect } from "react";
import { login } from "../util/auth";
import { Alert, StyleSheet, View } from "react-native";
import Input from "../components/Auth/Input";
import FlatButton from "../components/UI/FlatButton";
import Button from "../components/UI/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import StarterContainer from "../components/UI/StarterContainer";
import { useAuth } from "../store/auth-context";

/////////////////////////////////////////////////////////////////////
function LoginScreen({ navigation }) {
  ///////////////////   Set States    /////////////////////////
  const [token, setToken] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [errors, setErrors] = useState({});

  const authCtx = useAuth();

  ////////////////////  handle input   ///////////////////////
  function handleInput(name, input) {
    setData((prevState) => ({ ...prevState, [name]: input }));
  }
  ///Error Handler/////////////
  function handleError(errorMessage, input) {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  ///////////////////   submit handler   ////////////////////////////
  function onSubmitHandler() {
    let valid = true;
    if (!data.email) {
      handleError("please input email", "email");
      valid = false;
    } else if (
      !data.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      handleError("Email must include @", "email");
      valid = false;
    }
    if (!data.password) {
      handleError("please input Password", "password");
      valid = false;
    } else if (data.password.length < 5) {
      handleError("Min password length of 5", "password");
      valid = false;
    }

    if (valid) {
      loginHandler();
    }
  }

  ///////////////   Login handler Generate token    //////////////////////
  function loginHandler() {
    setIsAuthenticating(true);

    login({
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        setToken(res.data.token);

        authCtx.authenticate(res.data.token);

        setIsAuthenticating(false);
      })
      .catch((err) => {
        if (err.message.split(" ").pop() === "401") {
          Alert.alert(err.message, "email or password is incorrect");
        }
        if (err.message.split(" ").pop() === "422") {
          Alert.alert(err.message, "Please varify your account");
        }
        console.log(err);
        setIsAuthenticating(false);
      });
  }

  ///////////////////   For signup Screen    ///////////////////////////////
  function screenChangeHandler() {
    navigation.navigate("Signup");
  }

  /////////////////   Loading Overlay   //////////////////////////////////
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging user in...." />;
  }

  ////////////////////////    Component   ///////////////////////
  return (
    <StarterContainer>
      <Input
        label="Email Address"
        onUpdateValue={handleInput.bind(null, "email")}
        keyboardType="email-address"
        value={data.email}
        error={errors.email}
        onFocus={() => {
          handleError(null, "email");
        }}
      />
      <Input
        label="Password"
        onUpdateValue={handleInput.bind(null, "password")}
        secure
        value={data.password}
        error={errors.password}
        onFocus={() => {
          handleError(null, "password");
        }}
      />
      <View style={styles.buttons}>
        <Button onPress={onSubmitHandler}> Login</Button>
      </View>
      <View style={styles.buttons}>
        <FlatButton onPress={screenChangeHandler}>Create a new user</FlatButton>
      </View>
    </StarterContainer>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
