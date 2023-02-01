import { View, Text, TextInput, StyleSheet } from "react-native";

import { Colors } from "../../constants/styles";
import { useState } from "react";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  editable,
  onFocus = () => {},
  error,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, error && styles.labelInvalid]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error
              ? "red"
              : isFocused
              ? Colors.primary500
              : "#c4d0fb",
          },
        ]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        editable={editable}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      {error && (
        <Text style={{ color: "red", fontSize: 12, marginBottom: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
