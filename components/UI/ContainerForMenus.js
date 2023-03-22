import React from "react";
import { View, Text, ScrollView } from "react-native";
import StarterContainer from "./StarterContainer";
function ContainerForMenus({ name, price, description }) {
  return (
    <>
      <StarterContainer
        style={{ width: "90%", marginHorizontal: 15, marginTop: 2 }}
      >
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "space-around",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={{ color: "white" }}>{name}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                borderLeftWidth: 1,
                borderColor: "white",
              }}
            >
              <Text style={{ color: "white" }}>{price}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                borderLeftWidth: 1,
                borderColor: "white",
              }}
            >
              <Text style={{ color: "white" }}>
                {description ? description : "NA"}
              </Text>
            </View>
          </View>
        </ScrollView>
      </StarterContainer>
    </>
  );
}

export default ContainerForMenus;
