import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Input from "../components/Auth/Input";
import Button from "../components/UI/Button";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import StarterContainer from "../components/UI/StarterContainer";
import { useAuth } from "../store/auth-context";
import { changePassword } from "../util/auth";

/////////////////////////////////////////////////////////////////////
function ChangePasswordScreen({ navigation }) {
  ///////////////////   Set States    /////////////////////////

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [errors, setErrors] = useState({});

  const authCtx = useAuth();

  ///Email set by async storage
  const email = authCtx.forgot;

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

    if (!data.password) {
      handleError("please input Password", "password");
      valid = false;
    } else if (data.password.length < 5) {
      handleError("Min password length of 5", "password");
      valid = false;
    }
    if (!data.confirmPassword) {
      handleError("please input confirm Password", "confirmPassword");
    } else if (data.confirmPassword !== data.password) {
      handleError(
        "please confirm Password must be same as password",
        "confirmPassword"
      );
    }

    if (valid) {
      changePasswordHandler();
    }
  }

  ///////////////   Login handler Generate token    //////////////////////
  function changePasswordHandler() {
    setIsAuthenticating(true);
    console.log("forgotHandler handler");
    changePassword({
      email: email,
      password: data.password,
    })
      .then((res) => {
        console.log(res.data, "Change password data");
        Alert.alert("password successfully changed");
        authCtx.removeForgot();
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

  ////////////////////////  Main  Component   ///////////////////////
  return (
    <>
      {isAuthenticating && <LoadingOverlay message="Logging user in...." />}
      <StarterContainer>
        <Input
          label=" New Password"
          onUpdateValue={handleInput.bind(null, "password")}
          secure
          value={data.password}
          error={errors.password}
          onFocus={() => {
            handleError(null, "password");
          }}
        />
        <Input
          label="Confirm New Password"
          onUpdateValue={handleInput.bind(null, "confirmPassword")}
          secure
          value={data.confirmPassword}
          error={errors.confirmPassword}
          onFocus={() => {
            handleError(null, "confirmPassword");
          }}
        />
        <View style={styles.buttons}>
          <Button onPress={onSubmitHandler}> change Password</Button>
        </View>
      </StarterContainer>
    </>
  );
}
export default ChangePasswordScreen;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  buttons2: {
    marginTop: 30,
    marginRight: 0,
    marginLeft: 158,
  },
});
