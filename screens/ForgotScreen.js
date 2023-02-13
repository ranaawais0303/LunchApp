import React, { useState } from "react";

import { View, StyleSheet, Alert } from "react-native";
import Input from "../components/Auth/Input";
import Button from "../components/UI/Button";
import { forgotPassword, resendOTP, varifyUser } from "../util/auth";
import StarterContainer from "../components/UI/StarterContainer";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useAuth } from "../store/auth-context";

function ForgotScreen({ navigation, route }) {
  ///////////////////   set States    //////////////////////////
  const [data, setData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useAuth();

  //////////////////  Submit  Handler    //////////////////////////
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
    if (valid) {
      forgotHandler();
    }
  }

  ////////////////    Input handler   ////////////////////////////
  function handleInput(name, input) {
    console.log(name, input);
    setData((prevState) => ({ ...prevState, [name]: input }));
  }

  ////////////////   Error Handler   /////////////
  function handleError(errorMessage, input) {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  //////////////    Forgot Password    //////////////////////////////////////
  function forgotHandler() {
    setIsAuthenticating(true);
    forgotPassword({
      email: data.email,
    })
      .then((res) => {
        console.log(res.data, "Forgot password");

        authCtx.addForgot(res.data._id);
        navigation.navigate("Login");
        Alert.alert("password sent to this email");
        setIsAuthenticating(false);
      })
      .catch((err) => {
        setIsAuthenticating(false);
        if (err.message.split(" ").pop() === "401") {
          Alert.alert(err.message, "email is incorrect");
        }
        Alert.alert(err.code, "Invalid Request");
      });
  }

  //////////////    Main Component    ////////////////////
  return (
    <>
      {isAuthenticating && <LoadingOverlay message="Forgot Password...." />}
      <StarterContainer>
        {/* <Input label="Email Address" value={email} editable={false} /> */}
        <Input
          onUpdateValue={handleInput.bind(null, "email")}
          label="Email"
          value={data.email}
          error={errors.email}
          onFocus={() => {
            handleError(null, "email");
          }}
        />

        <View style={styles.buttons}>
          <Button onPress={onSubmitHandler}> Submit Email</Button>
        </View>
      </StarterContainer>
    </>
  );
}
export default ForgotScreen;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
