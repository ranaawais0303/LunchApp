import React, { useState } from "react";
import { ScrollView } from "react-native";
import StarterContainer from "../UI/StarterContainer";
import ContainerBasic from "../containerBasic/ContainerBasic";
function ContainerForMenus({ id, name, price, description }) {
  //============// Container for menus //===========//
  return (
    <>
      <StarterContainer
        style={{ width: "90%", marginHorizontal: 15, marginTop: 2 }}
      >
        <ScrollView>
          <ContainerBasic
            name={name}
            price={price}
            description={description}
            id={id}
          />
        </ScrollView>
      </StarterContainer>
    </>
  );
}

export default ContainerForMenus;
