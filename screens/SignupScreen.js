import { useState } from "react";
import { createUser } from "../util/auth";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../constants/styles";
import Input from "../components/Auth/Input";
import FlatButton from "../components/UI/FlatButton";
import Button from "../components/UI/Button";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function SignupScreen({ navigation }) {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errors, setErrors] = useState({});

  /////////////////// On Submit button and check validations//////////////////////
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

    if (!data.firstName) {
      handleError("please input name", "firstName");
      valid = false;
    }
    if (!data.lastName) {
      handleError("please input name", "lastName");
      valid = false;
    }

    if (!data.passwordConfirm) {
      handleError("please input confirm Password", "passwordConfirm");
    } else if (data.passwordConfirm !== data.password) {
      handleError(
        "please confirm Password must be same as password",
        "passwordConfirm"
      );
    }
    if (valid) {
      signupHandler();
    }
  }
  ///////////////////////////////////////////////////////////////
  ////Input handler
  function handleInput(name, input) {
    console.log(name, input);
    setData((prevState) => ({ ...prevState, [name]: input }));
  }
  ///Error Handler/////////////
  function handleError(errorMessage, input) {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  ///////////Signup handler Create user in database..............................
  async function signupHandler() {
    setIsAuthenticating(true);
    try {
      const res = await createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
        .then((res) => res.data)
        .catch((err) => {
          console.log(err.message);
          if (err.message.split(" ").pop() === "409") {
            Alert.alert(
              err.message,
              "User is already exsist please varify mail"
            );
          }
        });
      if (res) {
        setIsAuthenticating(false);
        navigation.navigate("OTPScreen", {
          email: data.email,
        });
      }
    } catch (error) {
      Alert.alert(error);
      setIsAuthenticating(false);
    }
    setIsAuthenticating(false);
  }

  //////////////Loading Overlay//////////////////////////////////
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging user in...." />;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Input
          onUpdateValue={handleInput.bind(null, "firstName")}
          label="firstName"
          value={data.firstName}
          error={errors.firstName}
          onFocus={() => {
            handleError(null, "firstName");
          }}
        />
        <Input
          onUpdateValue={handleInput.bind(null, "lastName")}
          label="lastName"
          value={data.lastName}
          error={errors.lastName}
          onFocus={() => {
            handleError(null, "lastName");
          }}
        />
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
        <Input
          label="Confirm Password"
          onUpdateValue={handleInput.bind(null, "passwordConfirm")}
          secure
          value={data.passwordConfirm}
          error={errors.passwordConfirm}
          onFocus={() => {
            handleError(null, "passwordConfirm");
          }}
        />

        <View style={styles.buttons}>
          <Button onPress={onSubmitHandler}> Sign Up</Button>
        </View>
        <View style={styles.buttons}>
          <FlatButton>Log in instead</FlatButton>
        </View>
      </View>
    </ScrollView>
  );
}

export default SignupScreen;
const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 12,
  },
});
