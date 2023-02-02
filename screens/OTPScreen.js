import React, { useState } from "react";

import { View, StyleSheet, Alert } from "react-native";
import Input from "../components/Auth/Input";
import Button from "../components/UI/Button";
import { varifyUser } from "../util/auth";
import StarterContainer from "../components/UI/StarterContainer";

function OTPScreen({ navigation, route }) {
  const email = route.params.email;
  const [data, setData] = useState({
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  function onSubmitHandler() {
    let valid = true;

    if (!data.otp) {
      handleError("please input otp", "otp");
      valid = false;
    } else if (data.otp.length !== 6) {
      handleError("OTP Length must be 6 digit", "otp");
      valid = false;
    }
    if (valid) {
      varify();
    }
  }

  ////Input handler
  function handleInput(name, input) {
    console.log(name, input);
    setData((prevState) => ({ ...prevState, [name]: input }));
  }

  ///Error Handler/////////////
  function handleError(errorMessage, input) {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  async function varify() {
    setIsAuthenticating(true);

    varifyUser({
      email: email,
      otp: data.otp,
    })
      .then((res) => {
        console.log(res.data);
        navigation.navigate("Login");
        //   setIsAuthenticating(false);
      })
      .catch((err) => {
        //   Alert.alert(err.message, "User is already exsist please varify mail");
        if (err.code === "ERR_BAD_REQUEST" || err.code === "ERR_NETWORK") {
          Alert.alert(err.code, "Invalid enteries");
          console.log(err.code);
          return;
        }
      });

    setIsAuthenticating(false);
  }

  //////////////Loading Overlay//////////////////////////////////
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging user in...." />;
  }

  //////////////////////////////////////////////
  return (
    <StarterContainer>
      <Input label="Email Address" value={email} editable={false} />
      <Input
        onUpdateValue={handleInput.bind(null, "otp")}
        label="Generated OTP"
        value={data.otp}
        error={errors.otp}
        onFocus={() => {
          handleError(null, "otp");
        }}
      />
      <View style={styles.buttons}>
        <Button onPress={onSubmitHandler}> varify</Button>
      </View>
    </StarterContainer>
  );
}

export default OTPScreen;

const styles = StyleSheet.create({});
